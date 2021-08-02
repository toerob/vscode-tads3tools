import { promisify } from 'util';
import { DocumentSymbolParams, TextDocuments } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import { connection } from '../server';
import { Tads3SymbolManager } from './symbol-manager';

const asyncSetTimeout = promisify(setTimeout);

export async function onDocumentSymbol(handler: DocumentSymbolParams, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager) {
	const fsPath = URI.parse(handler.textDocument.uri).fsPath;
	if (fsPath.endsWith('.t') || fsPath.endsWith('.h')) {
		while (!symbolManager.symbols.has(fsPath)) {
			connection.console.log(`${fsPath} is waiting for symbols`);
			await asyncSetTimeout(2000);
		}
	}
	return symbolManager.symbols.get(fsPath) ?? [];
}

