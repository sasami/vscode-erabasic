import { performance } from "perf_hooks";
import * as vscode from "vscode";

import {
    CancellationToken, CompletionContext, CompletionItem, CompletionItemProvider, Definition, DefinitionProvider,
    DocumentSelector, DocumentSymbolProvider, ExtensionContext, Position, SymbolInformation, TextDocument, WorkspaceSymbolProvider,
} from "vscode";

import { BuiltinComplationItems, CompletionItemRepository } from "./completion";
import { Declaration, DeclarationProvider, readDeclarations } from "./declaration";
import { DefinitionRepository } from "./definition";
import { readSymbolInformations, SymbolInformationRepository } from "./symbol";

export function activate(context: ExtensionContext) {
    const selector: DocumentSelector = { language: "erabasic" };
    const provider: DeclarationProvider = new DeclarationProvider(context);
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, new EraBasicCompletionItemProvider(provider)));
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

    constructor(provider: DeclarationProvider) {
        this.repo = new CompletionItemRepository(provider);
    }

    public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Promise<CompletionItem[]> {
        const start = performance.now();
        console.log("start provideCompletionItems:"+(performance.now()-start));

        return this.repo.sync().then(() => 
            {
                console.log("proc1 provideCompletionItems:"+(performance.now()-start));
                const res = BuiltinComplationItems.concat(...this.repo.find(document, position));
                console.log("end provideCompletionItems:"+(performance.now()-start));
                return res
            }
        );
    }


    // public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): CompletionItem[] {

    //     // 可視範囲のシンボル数がメガテンで 65000 を越えるため諸々見送り
    //     return BuiltinComplationItems.concat(readDeclarations(document.getText())
    //         // TODO 関数末尾で変数が見えない
    //         .filter(d=> d.visible(position))
    //         .map(decreation => {
    //             return newFunction(decreation);
    //         })
    //     );

    //     function newFunction(decreation: Declaration) {
    //         const symbolKind = decreation.kind;
    //         let kind: vscode.CompletionItemKind = toCompletionItemKind(symbolKind);

    //         return {
    //             label: decreation.name,
    //             kind: kind,
    //             // TODO 関数の引数情報がほしい
    //             detail: `(${getName(kind)}) ${decreation.name}`,
    //         };
    //     }

    //     function getName(kind: vscode.CompletionItemKind) {
    //         return vscode.CompletionItemKind[kind];
    //     }

    //     function toCompletionItemKind(symbolKind: vscode.SymbolKind):vscode.CompletionItemKind {
    //         switch (symbolKind) {
    //             case vscode.SymbolKind.Variable:
    //                 return vscode.CompletionItemKind.Variable;
    //             case vscode.SymbolKind.Function:
    //                 return vscode.CompletionItemKind.Function;
    //             default:
    //                 return undefined;
    //         }
    //     }
    // }
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
