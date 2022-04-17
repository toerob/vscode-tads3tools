import { existsSync } from 'fs';
import path = require('path');
import { CodeLens, TextDocuments, Range, CodeLensParams, Command, TextDocumentIdentifier } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI, Utils } from 'vscode-uri';
import { connection, preprocessedFilesCacheMap } from '../server';
import { TadsSymbolManager } from './symbol-manager';

const cachedFileLocation = new Map<string | undefined, string>();

export async function onCodeLens({ textDocument }: CodeLensParams, documents: TextDocuments<TextDocument>, symbolManager: TadsSymbolManager) {
    const codeLenses: CodeLens[] = [];
    const enablePreprocessorCodeLens = await connection.workspace.getConfiguration("tads3.enablePreprocessorCodeLens");
    const showURLCodeLensesInT3Makefile = await connection.workspace.getConfiguration("tads3.showURLCodeLensesInT3Makefile");

    const uri = URI.parse(textDocument.uri);
    const fsPath = uri.fsPath;
    const currentDoc = documents.get(textDocument.uri);

    if (textDocument.uri.endsWith('.t3m')) {
        return getCodeLensesForTads3Makefile(showURLCodeLensesInT3Makefile, symbolManager, fsPath, textDocument, codeLenses);
    }

    if (!enablePreprocessorCodeLens) {
        return await codeLenses;
    }

    const preprocessedDocument = preprocessedFilesCacheMap.get(fsPath);
    const preprocessedDocumentArray = preprocessedDocument?.trimEnd().split(/\r?\n/);

    if (!currentDoc || !preprocessedDocumentArray) {
        return [];
    }

    const currentDocArray = currentDoc?.getText().trimEnd().split(/\r?\n/);

    // If the files has diverged more than the last line in length
    // (happens during preprocessing)
    // then don't send any CodeLenses since the two documents will
    // be out of sync, and the codelens will be seen at incorrect 
    // positions

    if (currentDocArray.length !== preprocessedDocumentArray.length) {
        connection.console.log(`Document number of rows diverging from preprocessed document, skipping codelens this time around`);
        return [];
    }

    for (let row = 0; row < currentDoc.lineCount; row++) {
        const preprocessedLine = preprocessedDocumentArray[row];
        if (preprocessedLine === undefined) {
            continue;
        }
        if (preprocessedLine.match(/^\s*$/)) {
            continue;
        }

        //const t = currentDoc.lineAt(row).text;
        const t = currentDocArray[row];
        if (t.match('#\\s*include')) {
            continue;
        }
        if (t === preprocessedLine) {
            continue;
        }
        // Skip lines that is broken up into several rows so we won't drown in 
        // CodeLens text.
        if (preprocessedLine.includes(t)) {
            continue;
        }

        if (preprocessedLine !== '' && preprocessedLine !== ';') {
            const range = Range.create(row, 0, row, t.length);
            if (range) {
                codeLenses.push({
                    range: range,
                    command:
                        // TODO: find another solution so the preprocessed text
                        // doesn't need to be sent until the player clicks the CodeLens
                        Command.create(
                            `preprocessed to: ${preprocessedLine}`,
                            'tads3.showPreprocessedTextAction',
                            [range, currentDoc.uri, preprocessedDocument]
                        )
                });
            }
        }
    }
    return codeLenses;
}



function getCodeLensesForTads3Makefile(showURLCodeLensesInT3Makefile:boolean, symbolManager: TadsSymbolManager, fsPath: string, textDocument: TextDocumentIdentifier, codeLenses: CodeLens[]): CodeLens[] {
    const symbols = symbolManager.symbols.get(fsPath) ?? [];
    const makefileLocationURI = URI.parse(textDocument.uri);
    const directoryName = Utils.dirname(makefileLocationURI);
    const makefileLocation = URI.file(directoryName.fsPath);
    const fileBasePaths = [
        makefileLocation,
        ...symbols
            .filter(x => x.name.match(/^f[li]$/i))
            .map(x => x.detail && URI.file(x.detail))
            .filter(x => x && existsSync(x.fsPath))
    ];
    codeLenses.push({
        range: Range.create(0,0,0,0),
        command: Command.create(`Toggle CodeLenses [on/off]`, 'tads3.toggleURLCodeLensesInT3Makefile')
    });
    if(!showURLCodeLensesInT3Makefile) {
        return codeLenses;
    }

    for (const symbol of symbols) {
        // TODO: maybe handle LANGUAGE variable also
        const isDirectory = symbol.name.match(/^f[liyo]$/i) ? true : false;
        const relativeSourceFile = symbol.name.match(/source/) ? true : false;
        const relativeLibraryFile = symbol.name.match(/lib/) ? true : false;
        if (isDirectory || relativeSourceFile || relativeLibraryFile) {
            const absolutePath = cachedFileLocation.get(symbol.detail) ?? toAbsoluteUrl(symbol.detail, symbol, fileBasePaths, isDirectory);
            cachedFileLocation.set(symbol.detail ?? '', absolutePath);
            codeLenses.push({
                range: symbol.range,
                command: Command.create(`[File location: ${absolutePath}]`, 'tads3.openFile', absolutePath)
            });
        }
    }
    return codeLenses;
}

/**
 * Determines if input path is relative or absolute, in case it is relative it 
 * uses the makefileLocation uri to determine
 * the absolute path.
 * 
 * @param relativePath the relative or absolute address
 * @param makefileLocation the makefile location uri
 * @returns an absolute path, regardless input was relative or absolute
 */
function toAbsoluteUrl(relativePath = '', symbol: any, basePaths: any, isDirectory: boolean): string {
    if (path.isAbsolute(relativePath) && existsSync(relativePath)) {
        return relativePath;
    }

    const hasExtensionAtEnd = relativePath.match(/[.](lib|tl|t)$/) ? true : false;
    const ext = (hasExtensionAtEnd || isDirectory) ? '' : symbol.name === 'lib' ? '.tl' : '.t';
    const result = basePaths
        .map((basePath: URI) => {
            return Utils.joinPath(basePath, relativePath + ext);
        })
        .find((x: URI) => {
            if (existsSync(x.fsPath)) {
                return x;
            }
        });
    if (result) {
        return result.fsPath;
    }
    return relativePath;
}

































/*import { window } from 'rxjs/operators';
import * as vscode from 'vscode';
import { Range } from 'vscode';
import { SymbolKind } from 'vscode';
import { ExtendedDocumentSymbol } from '../tads3-outliner-listener';
import { flattenTreeToArray, Tads3SymbolManager } from '../tads3-symbol-manager';
*/

/**
 * CodelensProvider
 */
/*export class CodelensProvider implements vscode.CodeLensProvider {

    private regex: RegExp;
    private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

    constructor(private symbolManager: Tads3SymbolManager) {
        this.regex = /(dobjFor)/g;
        vscode.workspace.onDidChangeConfiguration((_) => {
            this._onDidChangeCodeLenses.fire();
        });
    }

    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
        let codeLenses: vscode.CodeLens[] = [];
        if(document.isUntitled) {
            return;
        }

        /*let symbols = this.symbolManager.getSymbols(document.uri.path);
        let flattenedSymbols = flattenTreeToArray(symbols);
        let allObjectSymbols = flattenedSymbols.filter(x => x.kind === SymbolKind.Object);
        let doorSymbols = allObjectSymbols.filter(x => x.detail === 'Door');
        if (doorSymbols) {
            for (let doorSymbol of doorSymbols) {
                // TODO: Go through the parent symbol's properties, and if 
                // the this door cannot be found, suggest to add a dir property 
                // connecting it to this.
                // See if it is possible to remove the suggestion too...
                let doorSymbolParentProperties = (doorSymbol as ExtendedDocumentSymbol)?.parent?.children.filter(x => x.kind === SymbolKind.Property);
                if (doorSymbolParentProperties) {
                    let doorSymbolNameFoundWithinProperties = false;
                    for (let property of doorSymbolParentProperties) {
                        if (property.detail.includes(doorSymbol.name)) {
                            doorSymbolNameFoundWithinProperties = true;
                        }
                    }
                    if (!doorSymbolNameFoundWithinProperties) {
                        // TODO: locate the last property and add a new line under that
                        const rm = (doorSymbol as ExtendedDocumentSymbol)?.parent;
                        const range = new Range(rm.range.end.line,rm.range.end.character, rm.range.end.line, rm.range.end.character);
                        let command = {
                            title: `add direction to the door ${doorSymbol.name}`,
                            tooltip: `Add a direction to the door ${doorSymbol.name} `,
                            command: `tads3.insertDirectionProperty`,
                            arguments: [range, doorSymbol.name, document.uri]
                        };
                        console.error(`1`);
                        // TODO: refresh activeeditor after this
                        codeLenses.push(new vscode.CodeLens(range, command));
                    }

                }
            }
        }*/

