import * as vscode from "vscode";

import {
    CancellationToken, CompletionContext, CompletionItem, CompletionItemProvider, Definition, DefinitionProvider, Disposable,
    DocumentSelector, DocumentSymbolProvider, ExtensionContext, Position, SymbolInformation, TextDocument, Uri, WorkspaceSymbolProvider,
} from "vscode";

import { BuiltinComplationItems } from "./completion";
import { DeclarationProvider } from "./declaration";
import { DefinitionRepository } from "./definition";
import { readSymbolInformations, SymbolInformationRepository } from "./symbol";

export function activate(context: ExtensionContext) {
    const selector: DocumentSelector = { language: "erabasic" };
    const provider: DeclarationProvider = new DeclarationProvider();
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, new EraBasicCompletionItemProvider()));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(selector, new EraBasicDefinitionProvider(provider)));
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(selector, new EraBasicDocumentSymbolProvider()));
    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(new EraBasicWorkspaceSymbolProvider(provider)));
    context.subscriptions.push(provider);
}

export function deactivate() {
    // Nothing to do
}

class EraBasicCompletionItemProvider implements CompletionItemProvider {
    public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): CompletionItem[] {
        // 可視範囲のシンボル数がメガテンで 65000 を越えるため諸々見送り
        return BuiltinComplationItems;
    }
}

class EraBasicDefinitionProvider implements DefinitionProvider {
    private repo: DefinitionRepository;

    constructor(provider: DeclarationProvider) {
        this.repo = new DefinitionRepository(provider);
    }

    public provideDefinition(document: TextDocument, position: Position, token: CancellationToken): Promise<Definition> {
        return this.repo.sync().then(() => Array.from(this.repo.find(document, position)));
    }
}

class EraBasicDocumentSymbolProvider implements DocumentSymbolProvider {
    public provideDocumentSymbols(document: TextDocument, token: CancellationToken): SymbolInformation[] {
        return readSymbolInformations(document.uri, document.getText());
    }
}

class EraBasicWorkspaceSymbolProvider implements WorkspaceSymbolProvider {
    private repo: SymbolInformationRepository;

    constructor(provider: DeclarationProvider) {
        this.repo = new SymbolInformationRepository(provider);
    }

    public provideWorkspaceSymbols(query: string, token: CancellationToken): Promise<SymbolInformation[]> {
        return this.repo.sync().then(() => Array.from(this.repo.find(query)));
    }
}
