import { SymbolInformation, TextDocuments, DocumentSymbol } from 'vscode-languageserver/node';
import { Tads3SymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';

export async function onWorkspaceSymbol(handler: any, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager) {
	const symbols: SymbolInformation[] = [];
	const convertPaths = (process.platform === 'win32') ? true : false;
	for (const filePath of symbolManager.symbols.keys()) {
		const fp = convertPaths ? URI.file(filePath)?.path : filePath; // On non-Unix/Linux we need to convert this path
		symbolManager.symbols.get(filePath)
			?.map(x => convertToSymbolInformation(x, fp))
			.forEach(x => symbols.push(x));
	}
	return symbols;

}
function convertToSymbolInformation(ds: DocumentSymbol, fp: string): SymbolInformation {
	return SymbolInformation.create(ds.name, ds.kind, ds.range, fp);
}

