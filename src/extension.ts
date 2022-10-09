import * as vscode from "vscode";

import {
    CancellationToken, CompletionContext, CompletionItem, CompletionItemProvider, Definition, DefinitionProvider,
    DocumentSelector, DocumentSymbolProvider, ExtensionContext, Position, SymbolInformation, TextDocument, WorkspaceSymbolProvider,
} from "vscode";

import { BuiltinComplationItems, CompletionItemRepository, declToCompletionItem } from "./completion";
import { Declaration, DeclarationProvider, readDeclarations } from "./declaration";
import { DefinitionRepository } from "./definition";
import { EraHoverProvider } from "./hover";
import { readSymbolInformations, SymbolInformationRepository } from "./symbol";

export function activate(context: ExtensionContext) {
    const selector: DocumentSelector = { language: "erabasic" };
    const provider: DeclarationProvider = new DeclarationProvider(context);
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, new EraBasicCompletionItemProvider(provider)));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(selector, new EraBasicDefinitionProvider(provider)));
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(selector, new EraBasicDocumentSymbolProvider()));
    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(new EraBasicWorkspaceSymbolProvider(provider)));
    context.subscriptions.push(vscode.languages.registerHoverProvider(selector, new EraHoverProvider(provider)));
    context.subscriptions.push(provider);
}

export function deactivate() {
    // Nothing to do
}

class EraBasicCompletionItemProvider implements CompletionItemProvider {
    private repo: CompletionItemRepository;
    private option: EraBasicOption;

    constructor(provider: DeclarationProvider) {
        this.repo = new CompletionItemRepository(provider);
        this.option = new EraBasicOption();
    }

    public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Promise<CompletionItem[]> {
        if (!this.option.completionWorkspaceSymbols) {
            return Promise.resolve( BuiltinComplationItems.concat(readDeclarations(document.getText())
                .filter(d=> d.visible(position))
                .map(decreation => {
                    return declToCompletionItem(decreation);
                })
            ));
        }

        return this.repo.sync().then(() => 
            {
                const res = BuiltinComplationItems.concat(...this.repo.find(document, position));
                return res;
            }
        );
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

export class EraBasicOption {
    public get completionWorkspaceSymbols() : boolean {
        return vscode.workspace.getConfiguration("erabasic").get("completionWorkspaceSymbols", false);
    }
}
