import { CodeLens, DefinitionParams, TextDocuments , Range, CodeLensParams} from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import { preprocessAndParseFiles } from '../parse-workers-manager';
import { preprocessAllFiles } from '../parser/preprocessor';
import { connection, preprocessedFilesCacheMap } from '../server';
import { Tads3SymbolManager } from './symbol-manager';

export async function onCodeLens({textDocument}: CodeLensParams, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager) {
	const codeLenses: CodeLens[] = [];

	/*if (connection.workspace.getConfiguration("tads3").then(config=> {
		const config.get("enablePreprocessorCodeLens", true);
	}*/

	const fsPath = URI.parse(textDocument.uri).fsPath;
	const currentDoc = documents.get(textDocument.uri);
	
	const preprocessedDocumentArray = preprocessedFilesCacheMap.get(fsPath)?.split(/\r?\n/);

	if(!currentDoc || !preprocessedDocumentArray) {
		return [];
	}
	const currentDocArray = currentDoc?.getText().split(/\r?\n/);


	for(let row=0; row<currentDoc.lineCount; row++) {
		const preprocessedLine = preprocessedDocumentArray[row];
		if(preprocessedLine === undefined) {
			continue;
		}
		if(preprocessedLine.match(/^\s*$/)) {
			continue;
		}

		//const t = currentDoc.lineAt(row).text;
		const t = currentDocArray[row];
		if (t.match('#\\s*include')) {
			continue;
		}
		if(t === preprocessedLine) {
			continue;
		}
		// Skip lines that is broken up into several rows so we won't drown in 
		// CodeLens text.
		if(preprocessedLine.includes(t)) {
			continue;
		}

		if(preprocessedLine !== '' && preprocessedLine !== ';' ) {
			const range = Range.create(row,0,row,t.length);
			if (range) {
				const command = {
					title: `preprocessed to: ${preprocessedLine}`,
					/*tooltip: "Preprocessed tads3 source code",
					
					command: "tads3.showPreprocessedTextAction",
					arguments: [range, currentDoc.uri]*/

					command: "tads3.showPreprocessedTextAction",
					range: range
				};
				codeLenses.push(CodeLens.create(range, command));
			}
		}
	}
	return codeLenses;
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

