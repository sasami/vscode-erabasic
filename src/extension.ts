import * as vscode from 'vscode';
import * as fs from 'fs';
import * as iconv from 'iconv-lite';

import {
    ExtensionContext, Disposable, CancellationToken,
    CompletionItemProvider, CompletionContext, CompletionItem,
    DocumentSymbolProvider, WorkspaceSymbolProvider, SymbolInformation,
    TextDocument, Uri, Position,
} from 'vscode';

import { BuiltinComplationItems } from './completion';
import { readSymbolInformations } from './symbol';

export function activate(context: ExtensionContext) {
    let workspaceSymbolProvider = new EraBasicWorkspaceSymbolProvider();
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'erabasic' }, new EraBasicCompletionItemProvider()));
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider({ language: 'erabasic' }, new EraBasicDocumentSymbolProvider()));
    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(workspaceSymbolProvider));
    context.subscriptions.push(workspaceSymbolProvider);
}

export function deactivate() {
}

class EraBasicCompletionItemProvider implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): CompletionItem[] {
        // 可視範囲のシンボル数がメガテンで 65000 を越えるため諸々見送り
        return BuiltinComplationItems;
    }
}

class EraBasicDocumentSymbolProvider implements DocumentSymbolProvider {
    provideDocumentSymbols(document: TextDocument, token: CancellationToken): SymbolInformation[] {
        return readSymbolInformations(document.uri, document.getText());
    }
}

class EraBasicWorkspaceSymbolProvider implements WorkspaceSymbolProvider {
    private cache: Map<string, SymbolInformation[]> = new Map();
    private dirty: Set<string> = new Set();

    private disposable: Disposable;

    constructor() {
        let watcher = vscode.workspace.createFileSystemWatcher(`${vscode.workspace.rootPath}/**/*.[Ee][Rr][BbHh]`);
        watcher.onDidCreate((e) => { this.dirty.add(e.fsPath) });
        watcher.onDidChange((e) => { this.dirty.add(e.fsPath) });
        watcher.onDidDelete((e) => { this.dirty.delete(e.fsPath); this.cache.delete(e.fsPath) });
        this.disposable = watcher;
    }

    provideWorkspaceSymbols(query: string, token: CancellationToken): Promise<SymbolInformation[]> {
        return this.sync().then(() => {
            let pattern = this.compileQuery(query);
            if (pattern === null) {
                return [];
            }
            let matches: SymbolInformation[] = [];
            for (let path of Array.from(this.cache.keys()).sort()) {
                matches.push(...this.cache.get(path).filter((s) => pattern.test(s.name)));
            }
            return matches;
        });
    }

    dispose() {
        this.disposable.dispose();
    }

    private compileQuery(query: string): RegExp {
        if (query.length === 0) {
            return null;
        }
        let chars = Array.from(query).map((c) => {
            let uc = c.toUpperCase();
            let lc = c.toLowerCase();
            return uc === lc ? c : `[${uc}${lc}]`;
        });
        return new RegExp(chars.join('.*'));
    }

    private async sync(): Promise<void> {
        if (this.cache.size === 0) {
            for (let uri of await vscode.workspace.findFiles('**/*.[Ee][Rr][BbHh]')) {
                this.dirty.add(uri.fsPath);
            }
        }
        if (this.dirty.size === 0) {
            return;
        }
        let encoding = vscode.workspace.getConfiguration('files').get('encoding', 'utf8');
        for (let path of Array.from(this.dirty)) {
            let input = await new Promise<string>((resolve, reject) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        if (err.code === 'ENOENT') {
                            this.dirty.delete(path);
                            this.cache.delete(path);
                        }
                        reject(err);
                    } else {
                        resolve(iconv.decode(data, encoding));
                    }
                });
            });
            if (this.dirty.delete(path)) {
                this.cache.set(path, readSymbolInformations(Uri.file(path), input));
            }
        }
    }
}
