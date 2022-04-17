
import { SymbolKind, TextDocuments, SymbolInformation, Range, Position, Location } from 'vscode-languageserver';

import { ReferenceParams } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import { wholeLineRegExp } from '../parser/preprocessor';
import { connection, preprocessedFilesCacheMap } from '../server';
import { TadsSymbolManager } from './symbol-manager';
import { getWordAtPosition } from './text-utils';

/**
 * Predicate to decide what symbols to allow references to. 
 * 
 * In this case, "properties" are also added to list of references along with keywords.
 * 
 * @param symbol The symbol to decide visibility on
 * @returns true/false
 */

function allowedSymbolAsKeywordPredicate(symbol: SymbolInformation): boolean {
	return symbol.kind === SymbolKind.Property.valueOf();
	//return true;
}

/**
 * Given the word at the position (captured within the ReferenceParams object)
 * returns a list of references of symbol definitions/keywords used inside the project/libraries.
 * 
 * @param handler 
 * @param documents 
 * @param symbolManager 
 * @returns a collection of Locations to project/library files where the keyword at the position is located
 */
export async function onReferences(handler: ReferenceParams, documents: TextDocuments<TextDocument>, symbolManager: TadsSymbolManager, preprocessedFilesCacheMap: Map<string, string>) {
	const { position, textDocument } = handler;
	const currentDocument = documents.get(textDocument.uri);

	const locations: Location[] = [];

	if (currentDocument) {
		const symbolName = getWordAtPosition(currentDocument, position);
		if (symbolName) {

			// Strategy 1:
			connection.console.log(`Find reference(s) for word: ${symbolName}`);
			const locations = symbolManager.getAllWorkspaceKeywordLocations(symbolName, false);

			// Additional references could we added via symbol defintions, e.g if Property's should be allowed. 
			/*symbolManager.getAllWorkspaceSymbols(false)
				.filter(x => allowedSymbolAsKeywordPredicate(x) && x.name === symbolName)
				.forEach(x => locations.push(x.location));*/

			return locations;
			
			/*
			// Strategy 2: scan through all the cached files and look for whole word regexp of the the symbolName:
			const regex = new RegExp(`\\b(${symbolName})\\b`);
			preprocessedFilesCacheMap.forEach((text: string, filePath: string) => {
				const rows = text.split(wholeLineRegExp);
				let rowIdx = 1;
				for (const row of rows) {
					const result = regex.exec(row);
					if (result && result.length === 2) {
						const group = result[1];
						const start = Position.create(rowIdx, result.index);
						const end = Position.create(rowIdx, result.index + result[1].length);
						const fp = process.platform === 'win32' ? URI.file(filePath)?.path : filePath;
						locations.push(Location.create(fp, Range.create(start, end)));
						console.log(group);
					}
					rowIdx++;
				}
			});*/


		}
	}
	return locations;
}