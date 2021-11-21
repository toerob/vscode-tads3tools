import { TextDocuments } from 'vscode-languageserver/node';
import { Tads3SymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';

export async function onWorkspaceSymbol(handler: any, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager) {
	return symbolManager.getAllWorkspaceSymbols();
}
