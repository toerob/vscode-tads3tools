import { CompletionParams, TextDocuments, Range, CompletionItem, CompletionList, CompletionItemKind } from 'vscode-languageserver/node';
import { flattenTreeToArray, Tads3SymbolManager } from './modules/symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { connection } from './server';

import fuzzysort = require('fuzzysort');

let cachedKeyWords: Set<CompletionItem> | undefined = undefined;

export function clearCompletionCache() {
	cachedKeyWords?.clear();
	cachedKeyWords = undefined;
}

export function onCompletion(handler: CompletionParams, documents: TextDocuments<TextDocument>, symbolManager: Tads3SymbolManager): CompletionList | CompletionItem[] { 
	const document = documents.get(handler.textDocument.uri);
	const range = Range.create(handler.position.line, 0, handler.position.line, handler.position.character);
	const lineTillCurrentPos = document?.getText(range) ?? '';
	const lastWord = getLastWordFrom(lineTillCurrentPos);

	if(!cachedKeyWords) {
		const suggestions:Set<CompletionItem> = new Set();

		// Add known keywords
		for(const file of symbolManager.keywords.keys()) {
			const localKeys = symbolManager.keywords.get(file);
			if(localKeys) {
				for(const key of localKeys?.keys()) {
					const item = CompletionItem.create(key);
					item.kind = CompletionItemKind.Keyword;
					suggestions.add(item);
				}
			}
		}

		// Add known symbols
		for(const file of symbolManager.symbols.keys()) {
			const localKeys = symbolManager.symbols.get(file);
			if(localKeys) {
				const flattened = flattenTreeToArray(localKeys);
				if(flattened) {
					for(const value of flattened?.values()) {
						const item = CompletionItem.create(value.name);
						item.kind = CompletionItemKind.Class;
						suggestions.add(item);
					}	
				}
			}
		}
		cachedKeyWords = suggestions;
	}
	const results = fuzzysort.go(lastWord, [...cachedKeyWords], {key: 'label'});
	return results.map(x=>x.obj);
}

// TODO: this function needs to get the last word, taking into account
// spaces, dots commas etc... (any non alphanumeric sign should be treated as a delimiter)
function getLastWordFrom(lineTillCurrentPos: string) {
	connection.console.log(`lineTillCurrentPos: ${lineTillCurrentPos}`);
	return lineTillCurrentPos;
}

