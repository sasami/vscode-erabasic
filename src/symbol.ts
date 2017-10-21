import { SymbolInformation, SymbolKind, Location, Uri, Range, Position } from 'vscode';

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
                    new Location(uri, new Range(line, 0, line, text.length)))
                );
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
