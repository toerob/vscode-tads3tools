import { TextDocuments } from 'vscode-languageserver/node';
import { Tads3SymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { connection } from '../server';

export async function onWorkspaceSymbol(handler: any, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager) {

	const lookOnlyForProjectFiles = await connection.workspace.getConfiguration("tads3.enableWorkspaceSymbolsProjectScope");

	return symbolManager.getAllWorkspaceSymbols(lookOnlyForProjectFiles);
}
