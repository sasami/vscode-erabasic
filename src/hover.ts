import { CancellationToken, Hover, HoverProvider, MarkdownString, Position, ProviderResult, SymbolKind, TextDocument, workspace } from "vscode";
import { Declaration, DeclarationProvider, readDeclarations } from "./declaration";

export class EraHoverProvider implements HoverProvider{
    private repo: HoverRepository;

    constructor(private provider: DeclarationProvider) {
        this.repo = new HoverRepository(provider);
    }

    provideHover(document: TextDocument, position: Position, token: CancellationToken): Promise<Hover> {
        return this.repo.sync().then(() => this.repo.find(document, position));
    }
}

function declToHover(decl: Declaration): Hover {
    return new Hover(
        new MarkdownString(`(${getName(decl.kind)}) ${decl.name}`.concat("\n\n---\n\n",decl.docmentation)),
        decl.nameRange
    );
}

function getName(kind: SymbolKind) {
    return SymbolKind[kind];
}

class HoverInfo {
    constructor(public name: string, public hover: Hover) {
    }
}


export class HoverRepository {
    private cache: Map<string, HoverInfo[]> = new Map();

    constructor(private provider: DeclarationProvider) {
        provider.onDidChange((e) => {
            this.cache.set(e.uri.fsPath, e.decls.filter((d) => d.isGlobal)
                .map((d) => new HoverInfo( d.name, declToHover(d) )));
        });
        provider.onDidDelete((e) => {
            this.cache.delete(e.uri.fsPath);
        });
        provider.onDidReset((e) => {
            this.cache.clear();
        });
    }

    public sync(): Promise<void> {
        return this.provider.sync();
    }

    public find(document: TextDocument, position: Position): Hover {
        const word = this.getWord(document, position);
        if (word === undefined) {
            return;
        }
        const res = this.findInCurrentDocument(document, position, word);
        if (res) {
            return res;
        }

        const ws = workspace.getWorkspaceFolder(document.uri);
        if (ws === undefined) {
            return;
        }
        for (const doc of workspace.textDocuments) {
            if (!doc.isDirty) {
                continue;
            }
            if (doc === document) {
                continue;
            }
            if (!this.cache.has(doc.uri.fsPath)) {
                continue;
            }
            if (!this.provider.reachable(ws, doc.uri.fsPath)) {
                continue;
            }

            const res = this.findInDocument(doc, word);
            if (res) {
                return res
            }
        }
        for (const [path, defs] of this.cache.entries()) {
            if (!this.provider.reachable(ws, path)) {
                continue;
            }
            
            const res = defs.find((d) => d.name === word);
            if (res) {
                return res.hover;
            }
        }
    }

    private getWord(document: TextDocument, position: Position): string {
        const range = document.getWordRangeAtPosition(position, /[^\s\x21-\x2f\x3a-\x40\x5b-\x5e\x7b-\x7e]+/);
        if (range !== undefined) {
            return document.getText(range);
        }
    }

    private findInCurrentDocument(document: TextDocument, position: Position, word: string): Hover {
        const res = readDeclarations(document.getText())
            .find((d) => d.name === word && d.visible(position));
        if (!res) {
            return undefined;
        }
        return declToHover(res);
    }

    private findInDocument(document: TextDocument, word: string): Hover {
        const res = readDeclarations(document.getText())
            .find((d) => d.name === word && d.isGlobal);
        if (!res) {
            return undefined;
        }
        return declToHover(res);
    }
}
