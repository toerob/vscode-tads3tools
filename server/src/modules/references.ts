import { promisify } from 'util';
import { DocumentSymbol, DocumentSymbolParams, ReferenceParams, ResponseError, _, _Connection } from 'vscode-languageserver';
import { URI } from 'vscode-uri';
import { connection } from '../server';
import { Tads3SymbolManager } from '../Tads3SymbolManager';


export async function onReferences(handler: ReferenceParams, symbolManager: Tads3SymbolManager) {
	return [];
}
