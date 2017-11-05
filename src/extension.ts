import * as vscode from 'vscode';

import {
    ExtensionContext, Disposable, CancellationToken,
    CompletionItemProvider, CompletionContext, CompletionItem,
    DocumentSymbolProvider, WorkspaceSymbolProvider, SymbolInformation,
    TextDocument, Position,
} from 'vscode';

import { BuiltinComplationItems } from './completion';
import { SymbolInformationRepository, readSymbolInformations } from './symbol';

export function activate(context: ExtensionContext) {
    let repo = new SymbolInformationRepository();
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'erabasic' }, new EraBasicCompletionItemProvider()));
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider({ language: 'erabasic' }, new EraBasicDocumentSymbolProvider()));
    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(new EraBasicWorkspaceSymbolProvider(repo)));
    context.subscriptions.push(repo);
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
    constructor(private repo: SymbolInformationRepository) {
    }

    provideWorkspaceSymbols(query: string, token: CancellationToken): Promise<SymbolInformation[]> {
        return this.repo.sync().then(() => {
            let pattern = this.compileQuery(query);
            if (pattern !== undefined) {
                return this.repo.filter((s) => pattern.test(s.name));
            }
        });
    }

    private compileQuery(query: string): RegExp {
        if (query.length === 0) {
            return;
        }
        let chars = Array.from(query).map((c) => {
            let uc = c.toUpperCase();
            let lc = c.toLowerCase();
            return uc === lc ? c : `[${uc}${lc}]`;
        });
        return new RegExp(chars.join('.*'));
    }
}
