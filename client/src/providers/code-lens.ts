import * as vscode from 'vscode';
import { Range } from 'vscode';
import { SymbolKind } from 'vscode';

/**
 * CodelensProvider
 */
export class CodelensProvider implements vscode.CodeLensProvider {

	private
	private regex: RegExp;
	private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
	public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

	constructor(private preprocessedFilesMap: Map<string, string>) {

		this.regex = /(dobjFor)/g;
		vscode.workspace.onDidChangeConfiguration((_) => {
			this._onDidChangeCodeLenses.fire();
		});
	}

	public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
		const codeLenses: vscode.CodeLens[] = [];
		if (document.isUntitled) {
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

		//if (vscode.workspace.getConfiguration("tads3").get("enablePreprocessorCodeLens", true)) {
		const preprocessedDocument = this.preprocessedFilesMap.get(document.uri.fsPath);
		if (preprocessedDocument) {

			const preprocessedDocumentArray = preprocessedDocument.split(/\r?\n/);
			//this.symbolManager.getPreprocessedText(document.uri.path).split(/\r?\n/);

			for (let row = 0; row < document.lineCount; row++) {
				const preprocessedLine = preprocessedDocumentArray[row];
				if (preprocessedLine === undefined) {
					continue;
				}
				if (preprocessedLine.match(/^\s*$/)) {
					continue;
				}
				const t = document.lineAt(row).text;
				if (t.match(/#\s*include/)) {
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
					const range = new vscode.Range(row, 0, row, t.length);
					if (range) {
						const command = {
							title: `preprocessed to: ${preprocessedLine}`,
							tooltip: "Preprocessed tads3 source code",
							command: "tads3.showPreprocessedTextActionWithRange",
							arguments: [range, document.uri]
						};
						codeLenses.push(new vscode.CodeLens(range, command));
					}
				}
			}
		}
		return codeLenses;
	}
}

