import * as fs from "fs";
import * as iconv from "iconv-lite";
import { cpus } from "os";
import { join } from "path";
import * as vscode from "vscode";

import { Disposable, Event, EventEmitter, ExtensionContext, Position, Range, SymbolKind, Uri, WorkspaceFolder } from "vscode";
import { Worker } from "worker_threads";
import { WorkerResponse } from "./declarationWorker";

export class Declaration {
    constructor(
        public name: string,
        public kind: SymbolKind,
        public container: Declaration | undefined,
        public nameRange: Range,
        public bodyRange: Range) {
    }

    get isGlobal(): boolean {
        return this.container === undefined;
    }

    public visible(position: Position): boolean {
        return this.container === undefined || this.container.bodyRange.contains(position);
    }
}

function* iterlines(input: string): IterableIterator<[number, string]> {
    const lines = input.split(/\r?\n/);
    loop: for (let i = 0; i < lines.length; i++) {
        const text = lines[i];
        if (/^\s*(?:$|;(?![!#];))/.test(text)) {
            continue;
        }
        if (/^\s*(?:;[!#];\s*)?\[SKIPSTART\]/.test(text)) {
            for (i++; i < lines.length; i++) {
                if (/^\s*(?:;[!#];\s*)?\[SKIPEND\]/.test(lines[i])) {
                    continue loop;
                }
            }
            break;
        }
        yield [i, text];
    }
}

export function readDeclarations(input: string): Declaration[] {
    const symbols: Declaration[] = [];
    let funcStart: Declaration;
    let funcEndLine: number;
    let funcEndChar: number;
    for (const [line, text] of iterlines(input)) {
        {
            const match = /^\s*@([^\s\x21-\x2f\x3a-\x40\x5b-\x5e\x7b-\x7e]+)/.exec(text);
            if (match !== null) {
                if (funcStart !== undefined) {
                    funcStart.bodyRange = funcStart.bodyRange.with({ end: new Position(funcEndLine, funcEndChar) });
                }
                funcStart = new Declaration(
                    match[1],
                    SymbolKind.Function,
                    undefined,
                    new Range(line, match[0].length - match[1].length, line, match[0].length),
                    new Range(line, 0, line, text.length),
                );
                symbols.push(funcStart);
                continue;
            }
            funcEndLine = line;
            funcEndChar = text.length;
        }
        {
            const match = /^\s*#(DIMS?(?:\s+[A-Z]+)*|DEFINE)\s+([^\s\x21-\x2f\x3a-\x40\x5b-\x5e\x7b-\x7e]+)/.exec(text);
            if (match !== null) {
                symbols.push(new Declaration(
                    match[2],
                    match[1].startsWith("DIM") ? SymbolKind.Variable : SymbolKind.Constant,
                    funcStart,
                    new Range(line, match[0].length - match[2].length, line, match[0].length),
                    new Range(line, 0, line, text.length),
                ));
                continue;
            }
        }
    }
    if (funcStart !== undefined) {
        funcStart.bodyRange = funcStart.bodyRange.with({ end: new Position(funcEndLine, funcEndChar) });
    }
    return symbols;
}

class BuiltinDeclarationFiles {
    private files: Uri[];

    constructor(context: ExtensionContext) {
        // 他の拡張でも管理下のファイルを直接開くケースがまま見られるため良しとする
        this.files = [
            Uri.joinPath(context.extensionUri, "emuera", "exmeth.erb"),
            Uri.joinPath(context.extensionUri, "emuera", "exvar.erh"),
        ];
    }

    public has(path: string): boolean {
        return this.files.find((uri) => uri.fsPath === path) !== undefined;
    }

    public uris(): Uri[] {
        return this.files;
    }
}

class WorkspaceEncoding {
    private encoding: string[][];

    constructor() {
        this.reset();
    }

    public detect(path: string, data: Buffer): string {
        if (data[0] === 0xef && data[1] === 0xbb && data[2] === 0xbf) {
            return "utf8";
        }
        if (data[0] === 0xff && data[1] === 0xfe) {
            return "utf16le";
        }
        if (data[0] === 0xfe && data[1] === 0xff) {
            return "utf16be";
        }
        return this.encoding.find((v) => path.startsWith(v[0]))[1];
    }

    public reset() {
        this.encoding = [];
        for (const folder of vscode.workspace.workspaceFolders) {
            this.encoding.push([folder.uri.fsPath, this.getConfiguration(folder.uri)]);
        }
    }

    private getConfiguration(uri: Uri): string {
        const encoding: string = vscode.workspace.getConfiguration("files", uri).get("encoding", "utf8");
        if (encoding === "utf8bom") {
            return "utf8";  // iconv-lite はデコード時にデフォルトで bom を削除するためこれで問題ない
        }
        return encoding;
    }
}

export class DeclarationChangeEvent {
    constructor(public uri: Uri, public decls: Declaration[]) {
    }
}

export class DeclarationDeleteEvent {
    constructor(public uri: Uri) {
    }
}

export class DeclarationProvider implements Disposable {
    private fullscan: boolean = true;

    private dirty: Map<string, Uri> = new Map();

    private syncing: Promise<void>;

    private builtin: BuiltinDeclarationFiles;
    private encoding: WorkspaceEncoding;

    private disposable: Disposable;

    private onDidChangeEmitter: EventEmitter<DeclarationChangeEvent> = new EventEmitter();
    private onDidDeleteEmitter: EventEmitter<DeclarationDeleteEvent> = new EventEmitter();
    private onDidResetEmitter: EventEmitter<void> = new EventEmitter();

    constructor(context: ExtensionContext) {
        this.builtin = new BuiltinDeclarationFiles(context);
        this.encoding = new WorkspaceEncoding();

        const subscriptions: Disposable[] = [];

        const watcher = vscode.workspace.createFileSystemWatcher("**/*.[Ee][Rr][BbHh]");
        watcher.onDidCreate(this.onDidChangeFile, this);
        watcher.onDidChange(this.onDidChangeFile, this);
        watcher.onDidDelete(this.onDidDeleteFile, this);
        subscriptions.push(watcher);

        vscode.workspace.onDidChangeConfiguration(this.onDidChangeWorkspace, this, subscriptions);
        vscode.workspace.onDidChangeWorkspaceFolders(this.onDidChangeWorkspace, this, subscriptions);

        this.disposable = Disposable.from(...subscriptions);
    }

    get onDidChange(): Event<DeclarationChangeEvent> {
        return this.onDidChangeEmitter.event;
    }

    get onDidDelete(): Event<DeclarationDeleteEvent> {
        return this.onDidDeleteEmitter.event;
    }

    get onDidReset(): Event<void> {
        return this.onDidResetEmitter.event;
    }

    public reachable(ws: WorkspaceFolder, path: string): boolean {
        return path.startsWith(ws.uri.fsPath) || this.builtin.has(path);
    }

    public isBuiltin(path):boolean{
        return this.builtin.has(path);
    }

    public sync(): Promise<void> {
        if (this.syncing === undefined) {
            this.syncing = this.flush().then(() => {
                this.syncing = undefined;
            });
        }
        return this.syncing;
    }

    public dispose() {
        this.disposable.dispose();
    }

    private onDidChangeFile(uri: Uri) {
        this.dirty.set(uri.fsPath, uri);
    }

    private onDidDeleteFile(uri: Uri) {
        this.dirty.delete(uri.fsPath);
        this.onDidDeleteEmitter.fire(new DeclarationDeleteEvent(uri));
    }

    private onDidChangeWorkspace() {
        this.fullscan = true;
        this.dirty.clear();
        this.encoding.reset();
        this.onDidResetEmitter.fire();
    }

    private async flush(): Promise<void> {
        if (this.fullscan) {
            this.fullscan = false;
            for (const uri of this.builtin.uris()) {
                this.dirty.set(uri.fsPath, uri);
            }
            for (const uri of await vscode.workspace.findFiles("**/*.[Ee][Rr][BbHh]")) {
                this.dirty.set(uri.fsPath, uri);
            }
        }
        if (this.dirty.size === 0) {
            return;
        }

        // マルチプロセスにしようとした残骸
        
        // const targ = [...this.dirty];
        // const cps = cpus();
        // const bundle = Math.ceil(targ.length / cps.length);
        // const sliced = cps.map((cpu,i)=>{
        //     const path = join(__dirname,"declarationWorker.js");
        //     return new Worker(path, {workerData: {dirty: targ.slice(i*bundle, bundle), encode:this.encoding.detect(path, data)}});
        // })
        
        // await Promise.all( sliced.map((w,i)=>{
        //     return new Promise((resolve, reject)=>{
        //         w.on("message", (res:WorkerResponse[])=>{
        //             for (const rec of res) {
        //                 if (rec.declarations === undefined) {
        //                     this.dirty.delete(rec.path);
        //                     this.onDidDeleteEmitter.fire(new DeclarationDeleteEvent(rec.uri));
        //                     resolve(undefined);
        //                     return;
        //                 }
        //                 if (this.dirty.delete(rec.path)) {
        //                     this.onDidChangeEmitter.fire(new DeclarationChangeEvent(rec.uri, rec.declarations));
        //                     resolve(undefined);
        //                     return;
        //                 }
        //             }
        //         });
        //         w.on("error",(err)=>{
        //             console.log(`${i}:${err}`)
        //         });
        //         w.on("exit",(n)=>{
        //             console.log(`${i}: quit ${n}`)
        //         });
        //     })
        // }));
        // return;

        await Promise.all([...this.dirty].map(async ([path, uri])=>{
            const input = await new Promise<string | undefined>((resolve, reject) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        if (typeof err === "object" && err.code === "ENOENT") {
                            resolve(undefined);
                        } else {
                            reject(err);
                        }
                    } else {
                        resolve(iconv.decode(data, this.encoding.detect(path, data)));
                    }
                });
            });
            if (input === undefined) {
                this.dirty.delete(path);
                this.onDidDeleteEmitter.fire(new DeclarationDeleteEvent(uri));
                return;
            }
            if (this.dirty.delete(path)) {
                this.onDidChangeEmitter.fire(new DeclarationChangeEvent(uri, readDeclarations(input)));
                return;
            }

        }));

    }
}
