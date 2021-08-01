import { promisify } from 'util';
import { DefinitionParams, DocumentSymbolParams, ReferenceParams, _, _Connection } from 'vscode-languageserver';
import { URI } from 'vscode-uri';
import { connection } from '../server';
import { Tads3SymbolManager } from '../Tads3SymbolManager';

export async function onDefinition(handler: DefinitionParams, symbolManager: Tads3SymbolManager) {
	return [];
}
