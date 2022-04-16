import { parse } from 'path';
import { promisify } from 'util';
import { DocumentSymbolParams, TextDocuments, DocumentSymbol,SymbolKind,Range } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import { connection } from '../server';
import { TadsSymbolManager } from './symbol-manager';

const asyncSetTimeout = promisify(setTimeout);

export async function onDocumentSymbol(handler: DocumentSymbolParams, documents: TextDocuments<TextDocument>, symbolManager: TadsSymbolManager) {
	const fsPath = URI.parse(handler.textDocument.uri).fsPath

	if (fsPath.endsWith('.t3m')) {
		const symbols: DocumentSymbol[] = parseTads3Makefile(documents.get(handler.textDocument.uri)?.getText() ?? "") ?? [];
		if (symbols.length > 0) {
			// TODO: special holder for makefile symbols?
			symbolManager.symbols.set(fsPath, symbols);
			return symbols;
		}
	}

	if (fsPath.endsWith('.t') || fsPath.endsWith('.h')) {
		while (!symbolManager.symbols.has(fsPath)) {
			//connection.console.log(`${fsPath} is waiting for symbols`);
			await asyncSetTimeout(2000);
		}
	}

	const symbols = symbolManager.symbols.get(fsPath) ?? [];
	connection.console.log(`Fetching ${symbols.length} low level symbols for: ${fsPath}`);
	return symbols;
}

function parseTads3Makefile(text: string): DocumentSymbol[] {
	const documentSymbols: DocumentSymbol[] = [];
	const rows = text.split(/\r?\n/) ?? [];
	let rowIdx = 0;
	for (const row of rows) {
		let result;
		try {
			result = row.match(/\s*\-([^ ]+)(?:\s+)?([^ =]+)?[=]?([^ ]+)?/);
			//result = row.match(/\s*\-(.+)(\s+(.+))?/);
		} catch(error) {
			console.error(error);
			continue;
		}

		if (result && result.length >= 3) {
			if(result[2] === undefined && result[3] === undefined) {
				// Compile flags
				const flag = result[1];
				const range = Range.create(rowIdx,0, rowIdx,row.length);
				const symbol = DocumentSymbol.create('compile flag', flag, SymbolKind.Variable, range, range);
				documentSymbols.push(symbol);

			} else if(result[2] && result[3] === undefined) {
				const type = result[1];
				const path = result[2];
				if(type.match(/f[ilyo]/i)) {
					// Library/Include file paths:
					const range = Range.create(rowIdx,0, rowIdx,row.length);
					const symbol = DocumentSymbol.create(type, path, SymbolKind.Module, range, range);
					documentSymbols.push(symbol);
				}
				if(type.match(/lib|source/i)) {
					// Game libraries | source files:
					const range = Range.create(rowIdx,0, rowIdx,row.length);
					const symbol = DocumentSymbol.create(type, path, SymbolKind.Constant, range, range);
					documentSymbols.push(symbol);
				}

			} else if(result[2]  && result[3]) {
				// Environment variables: KEY=VALUE
				const envKey = result[2]
				const envValue = result[3];
				const range = Range.create(rowIdx,0, rowIdx,row.length);
				const symbol = DocumentSymbol.create(envKey, envValue, SymbolKind.Constant, range, range);
				documentSymbols.push(symbol);
			}
		}
		rowIdx++;
	}
	return documentSymbols;
}

