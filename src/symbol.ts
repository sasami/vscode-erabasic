import * as vscode from 'vscode';
import * as fs from 'fs';
import * as iconv from 'iconv-lite';

import {
    Disposable, SymbolInformation, SymbolKind,
    TextDocument, Location, Uri, Range, Position
} from 'vscode';

function* iterlines(input: string): IterableIterator<[number, string]> {
    let lines = input.split(/\r?\n/);
    loop: for (let i = 0; i < lines.length; i++) {
        let text = lines[i];
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

export function readSymbolInformations(uri: Uri, input: string): SymbolInformation[] {
    let symbols: SymbolInformation[] = [];
    let funcStart: SymbolInformation;
    let funcStartName: string;
    let funcEndLine: number;
    let funcEndChar: number;
    for (let [line, text] of iterlines(input)) {
        {
            let match = /^\s*@([^\s\x21-\x2f\x3a-\x40\x5b-\x5e\x7b-\x7e]+)/.exec(text);
            if (match !== null) {
                if (funcStart !== undefined) {
                    funcStart.location.range = new Range(
                        funcStart.location.range.start,
                        new Position(funcEndLine, funcEndChar)
                    );
                }
                funcStart = new SymbolInformation(
                    match[1],
                    SymbolKind.Function,
                    undefined,
                    new Location(uri, new Range(line, 0, line, text.length))
                );
                funcStartName = funcStart.name;
                symbols.push(funcStart);
                continue;
            }
            funcEndLine = line;
            funcEndChar = text.length;
        }
        {
            let match = /^\s*#DIMS?\s+(?:[A-Z]+\s+)*([^\s\x21-\x2f\x3a-\x40\x5b-\x5e\x7b-\x7e]+)/.exec(text);
            if (match !== null) {
                symbols.push(new SymbolInformation(
                    match[1],
                    SymbolKind.Variable,
                    funcStartName,
                    new Location(uri, new Range(line, 0, line, text.length))
                ));
                continue;
            }
        }
    }
    if (funcStart !== undefined) {
        funcStart.location.range = new Range(
            funcStart.location.range.start,
            new Position(funcEndLine, funcEndChar)
        );
    }
    return symbols;
}

class WorkspaceEncoding {
    private encoding: string[][];

    constructor() {
        this.reset();
    }

    find(path: string): string {
        return this.encoding.find((v) => path.startsWith(v[0]))[1];
    }

    reset() {
        this.encoding = [];
        for (let folder of vscode.workspace.workspaceFolders) {
            this.encoding.push([folder.uri.fsPath, this.getConfiguration(folder.uri)]);
        }
    }

    private getConfiguration(uri: Uri): string {
        let encoding: string = vscode.workspace.getConfiguration('files', uri).get('encoding', 'utf8');
        if (encoding === 'utf8bom') {
            return 'utf8';  // iconv-lite はデコード時にデフォルトで bom を削除するためこれで問題ない
        }
        return encoding;
    }
}

export class SymbolInformationRepository implements Disposable {
    private cache: Map<string, SymbolInformation[]> = new Map();
    private dirty: Set<string> = new Set();

    private encoding: WorkspaceEncoding = new WorkspaceEncoding();
    private disposable: Disposable;

    constructor() {
        let subscriptions: Disposable[] = [];

        let watcher = vscode.workspace.createFileSystemWatcher('**/*.[Ee][Rr][BbHh]');
        watcher.onDidCreate((e) => { this.dirty.add(e.fsPath) });
        watcher.onDidChange((e) => { this.dirty.add(e.fsPath) });
        watcher.onDidDelete((e) => { this.dirty.delete(e.fsPath); this.cache.delete(e.fsPath) });
        subscriptions.push(watcher);

        vscode.workspace.onDidChangeConfiguration(this.clear, this, subscriptions);
        vscode.workspace.onDidChangeWorkspaceFolders(this.clear, this, subscriptions);

        this.disposable = Disposable.from(...subscriptions);
    }

    async sync(): Promise<void> {
        if (this.cache.size === 0) {
            for (let uri of await vscode.workspace.findFiles('**/*.[Ee][Rr][BbHh]')) {
                this.dirty.add(uri.fsPath);
            }
        }
        if (this.dirty.size === 0) {
            return;
        }
        for (let path of Array.from(this.dirty)) {
            let input = await new Promise<string>((resolve, reject) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        if (typeof err === 'object' && err.code === 'ENOENT') {
                            resolve();
                        } else {
                            reject(err);
                        }
                    } else {
                        resolve(iconv.decode(data, this.encoding.find(path)));
                    }
                });
            });
            if (input === undefined) {
                this.dirty.delete(path);
                this.cache.delete(path);
                continue;
            }
            if (this.dirty.delete(path)) {
                this.cache.set(path, readSymbolInformations(Uri.file(path), input));
            }
        }
    }

    filter(cb: (s: SymbolInformation) => any): SymbolInformation[] {
        let fresh: Set<string> = new Set();
        let matches: SymbolInformation[] = [];
        for (let document of vscode.workspace.textDocuments) {
            if (document.isDirty && /\.er[bh]/i.test(document.uri.path) && vscode.workspace.getWorkspaceFolder(document.uri) !== undefined) {
                fresh.add(document.uri.fsPath);
                matches.push(...readSymbolInformations(document.uri, document.getText()).filter(cb));
            }
        }
        for (let [path, symbols] of this.cache.entries()) {
            if (!fresh.has(path)) {
                matches.push(...symbols.filter(cb));
            }
        }
        return matches;
    }

    clear() {
        this.dirty.clear();
        this.cache.clear();
        this.encoding.reset();
    }

    dispose() {
        this.disposable.dispose();
    }
}
