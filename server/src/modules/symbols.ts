import { promisify } from 'util';
import { DocumentSymbolParams, _, _Connection } from 'vscode-languageserver';
import { URI } from 'vscode-uri';
import { connection } from '../server';
import { Tads3SymbolManager } from '../Tads3SymbolManager';

const asyncSetTimeout = promisify(setTimeout);

export async function onDocumentSymbol(handler: DocumentSymbolParams, symbolManager: Tads3SymbolManager) {
	const fsPath = URI.parse(handler.textDocument.uri).fsPath;
	if (fsPath.endsWith('.t') || fsPath.endsWith('.h')) {
		while (!symbolManager.symbols.has(fsPath)) {
			connection.console.log(`${fsPath} is waiting for symbols`);
			await asyncSetTimeout(2000);
		}
	}
	return symbolManager.symbols.get(fsPath) ?? [];
}

