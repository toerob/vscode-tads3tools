import { DocumentSymbol } from 'vscode-languageserver/node';

export class Tads3SymbolManager {
	symbols: Map<string, DocumentSymbol[]> = new Map();
}
