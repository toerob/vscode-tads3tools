import { TadsSymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { ImplementationParams, TextDocuments, Location } from 'vscode-languageserver';
import { getWordAtPosition } from './text-utils';

export async function onImplementation(handler: ImplementationParams, documents: TextDocuments<TextDocument>, symbolManager: TadsSymbolManager): Promise<Location[]> {
	const locations: Location[] = [];
	const { position, textDocument } = handler;
	const currentDocument = documents.get(textDocument.uri);
	if (currentDocument) {
		const symbolName = getWordAtPosition(currentDocument, position);
		if (symbolName) {
			for(const loc of symbolManager.findSymbolsByDetail(symbolName)) {				
				for(const symb of loc.symbols) {
					locations.push(Location.create(loc.filePath, symb.range));
				}
			}
		}
	}
	return locations;
}
