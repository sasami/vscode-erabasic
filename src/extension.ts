import * as vscode from "vscode";

import {
    CancellationToken, CompletionContext, CompletionItem, CompletionItemProvider, Definition, DefinitionProvider,
    DocumentSelector, DocumentSymbolProvider, ExtensionContext, Position, SymbolInformation, TextDocument, WorkspaceSymbolProvider,
} from "vscode";

import { BuiltinComplationItems, CompletionItemRepository, declToCompletionItem } from "./completion";
import { Declaration, DeclarationProvider, readDeclarations } from "./declaration";
import { DefinitionRepository } from "./definition";
import { readSymbolInformations, SymbolInformationRepository } from "./symbol";

export function activate(context: ExtensionContext) {
    const selector: DocumentSelector = { language: "erabasic" };
    const provider: DeclarationProvider = new DeclarationProvider(context);
    const option = getEraBasicOption( vscode.workspace.getConfiguration("erabasic"));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, new EraBasicCompletionItemProvider(provider,option)));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(selector, new EraBasicDefinitionProvider(provider)));
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(selector, new EraBasicDocumentSymbolProvider()));
    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(new EraBasicWorkspaceSymbolProvider(provider)));
    context.subscriptions.push(provider);
}

export function deactivate() {
    // Nothing to do
}

class EraBasicCompletionItemProvider implements CompletionItemProvider {
    private repo: CompletionItemRepository;

    constructor(provider: DeclarationProvider, private option:EraBasicOption) {
        this.repo = new CompletionItemRepository(provider);
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

export interface EraBasicOption {
    completionWorkspaceSymbols:boolean;
}

function getEraBasicOption(config:vscode.WorkspaceConfiguration):EraBasicOption {
    return {
        completionWorkspaceSymbols: config.get("completionWorkspaceSymbols", false),
    };
}
