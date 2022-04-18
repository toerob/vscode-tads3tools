import { CompletionParams, Position, TextDocuments, Range, CompletionItem, CompletionList, CompletionItemKind, SymbolKind } from 'vscode-languageserver/node';
import { flattenTreeToArray, TadsSymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { connection } from '../server';
import { symbolManager } from './symbol-manager';

import fuzzysort = require('fuzzysort');
import { getWordAtPosition } from './text-utils';
import { URI } from 'vscode-uri';
import { isUsingAdv3Lite } from '../parse-workers-manager';
import { retrieveDocumentationForKeyword } from './documentation';
import { serverState } from '../state';
import { glob } from 'glob';

let cachedKeyWords: Set<CompletionItem> | undefined = undefined;

export function clearCompletionCache() {
	cachedKeyWords?.clear();
	cachedKeyWords = undefined;
}

const ID = '[a-zA-Z0-9_]+';
const DIR = '(north|south|east|west|northeast|northwest|southeast|southwest|up|down|in|out)';
const WS = '\\s*';
const dirAssignmentRegExp = new RegExp(`^${WS}${DIR}${WS}=${WS}(${ID})?`);
const tads3Keywords = ['grammar', 'switch', 'case', 'default', 'function', 'throw', 'new',
	'template', 'for', 'try', 'catch', 'finally', 'enum', 'class', 'transient',
	'modify', 'replace', 'propertyset', 'if', 'do', 'while', 'else', 'local',
	'true', 'nil', 'intrinsic', 'inherited', 'delegated', 'property',
	'dictionary', 'export', 'extern', 'return', 'static', 'string',
	'foreach', 'in', '...', '..', 'step',
	'not', 'is', 'break', 'continue', 'goto', 'token', 'pragma', 'operator'];

export async function onCompletion(handler: CompletionParams, documents: TextDocuments<TextDocument>, symbolManager: TadsSymbolManager) {
	const suggestions: Set<CompletionItem> = new Set();


	const document = documents.get(handler.textDocument.uri);
	const range = Range.create(handler.position.line, 0, handler.position.line, handler.position.character);
	const lineTillCurrentPos = document?.getText(range) ?? '';

	if (document?.uri.endsWith('.t3m')) {
		return tads3MakefileSuggestions();
	}

	let word = getWordAtPosition(document, handler.position);
	// We might be right at the end of the word, try one character backwards before giving up:
	if (word === undefined) {
		word = getWordAtPosition(document, Position.create(handler.position.line, handler.position.character - 1));
	}

	const currentLineRange = Range.create(handler.position.line, 0, handler.position.line, handler.position.character);
	const currentLineStr = document?.getText(currentLineRange) ?? '';
	//const characterOffset = offsetAt(document, handler.position);

	try {
		// match "self[.](.*)"
		if (currentLineStr.match(`${WS}self.${word}`)) {

			//TODO: default also? 
			const fsPath = URI.parse(handler.textDocument.uri).fsPath;
			const symbol = symbolManager.findContainingObject(fsPath, handler.position);

			const item = CompletionItem.create(symbol.name);
			item.kind = CompletionItemKind.Class;
			suggestions.add(item);
			for (const prop of symbol.children) {
				const item = CompletionItem.create(prop.name);
				switch (prop.kind) {
					case SymbolKind.Property: item.kind = CompletionItemKind.Property; break;
					case SymbolKind.Object: item.kind = CompletionItemKind.Class; break;
					case SymbolKind.Function: item.kind = CompletionItemKind.Function; break;
				}
				suggestions.add(item);
			}

			// Add all inherited properties for the object by checking its heritage and lookup all symbols
			const heritage = symbolManager.mapHeritage(symbol);
			connection.console.log([...heritage].join(','));
			for (const ancestorClass of [...heritage.values()][0] ?? []) {
				const result = symbolManager.findSymbol(ancestorClass);
				if (result.symbol) {
					const item = CompletionItem.create(result.symbol.name);
					item.kind = CompletionItemKind.Class;
					suggestions.add(item);
					for (const prop of result.symbol.children ?? []) {
						const item = CompletionItem.create(prop.name);
						switch (prop.kind) {
							case SymbolKind.Property: item.kind = CompletionItemKind.Property; break;
							case SymbolKind.Object: item.kind = CompletionItemKind.Class; break;
							case SymbolKind.Function: item.kind = CompletionItemKind.Function; break;
						}
						suggestions.add(item);
					}
				}
			}


			const results = fuzzysort.go(word, [...suggestions], { key: 'label' });
			connection.console.log(results.map(x => x.obj.label).join(','));
			return results.map((x: any) => x.obj);

		}

		// An object declaration where the word is a class, show all class alternatives:
		if (currentLineStr.match(`${WS}(class)?${ID}${WS}:${WS}${word}`)
			|| currentLineStr.match(`${WS}(class)?${ID}${WS}:${WS}(${ID}${WS},${WS})*${word}`)
		) {
			connection.console.log(`Matching object declaration for: "${word}"`);
			const classNames = [...symbolManager.inheritanceMap.keys()];
			for (const className of classNames) {
				const item = CompletionItem.create(className);
				item.kind = CompletionItemKind.Class;
				applyDocumentation(item);
				suggestions.add(item);
			}
			if (word === undefined) {
				return [...suggestions];
			}

			const results = fuzzysort.go(word, [...suggestions], { key: 'label' });
			//connection.console.log(results.map(x=>x.obj.label).join(','));
			return results.map((x: any) => x.obj);
		}

		// Matches a direction assignment, collect all symbols inheriting TravelConnector
		// And return all suggestions if no word have been written, otherwise fuzzysort it 
		// on the word written so far:

		const result = dirAssignmentRegExp.exec(currentLineStr);
		if (result && result.length > 0) {
			//word ??= '';
			connection.console.log(`Matching direction assignment for: "${word}"`);
			for (const key of symbolManager.symbols.keys()) {
				for (const symbol of symbolManager.symbols.get(key) ?? []) {
					if (symbol.kind === SymbolKind.Object) {
						const inheritanceMap = symbolManager.mapHeritage(symbol);
						const commonRoomType = isUsingAdv3Lite() ? 'Room' : 'TravelConnector';
						const addSymbol = inheritanceMap.get(symbol.detail)?.includes(commonRoomType);
						if (addSymbol) {
							const item = CompletionItem.create(symbol.name);
							item.kind = CompletionItemKind.Struct;
							applyDocumentation(item);
							suggestions.add(item);
						}
					}
				}
			}
			if (word === undefined) {
				return [...suggestions];
			}
			const results = fuzzysort.go(word, [...suggestions], { key: 'label' });
			connection.console.log(results.map(x => x.obj.label).join(','));
			return results.map((x: any) => x.obj);
		}

	} catch (err) {
		console.error(err);
	}

	const usedUpKeys = new Set();

	if (!cachedKeyWords) {
		for (const file of symbolManager.keywords.keys()) {
			const localKeys = symbolManager.keywords.get(file);
			if (localKeys) {
				for (const key of localKeys?.keys() ?? []) {
					if (usedUpKeys.has(key)) {
						continue;
					}
					usedUpKeys.add(key);
					const item = CompletionItem.create(key);
					item.kind = CompletionItemKind.Keyword;
					if (!suggestions.has(item)) {
						//connection.console.log(`Adding ${key} for ${file}`);
						suggestions.add(item);
					}
				}
			}
		}

		// Add known symbols
		for (const file of symbolManager.symbols.keys()) {
			const localKeys = symbolManager.symbols.get(file);
			if (localKeys) {
				const flattened = flattenTreeToArray(localKeys); //.filter(x=>x.kind === SymbolKind.Object)
				if (flattened) {
					for (const value of flattened?.values() ?? []) {
						if (usedUpKeys.has(value.name)) {
							continue;
						}
						usedUpKeys.add(value.name);
						const item = CompletionItem.create(value.name);
						item.kind = CompletionItemKind.Class;
						applyDocumentation(item);
						suggestions.add(item);
					}
				}
			}
		}

		// Add common tads3 keywords
		for (const keyword of tads3Keywords) {
			const item = CompletionItem.create(keyword);
			item.kind = CompletionItemKind.Keyword;
			suggestions.add(item);
		}

		cachedKeyWords = suggestions;
	}

	const results = fuzzysort.go(word, [...cachedKeyWords], { key: 'label' });
	return results.map((x: any) => x.obj);
}

function applyDocumentation(item: CompletionItem) {
	let documentation = '';
	const symbolSearchResult = symbolManager.findSymbols(item.label, [SymbolKind.Class]);
	if (symbolSearchResult && symbolSearchResult.length > 0) {
		for (const eachPathAndSymbolResult of symbolSearchResult) {
			const filePath = eachPathAndSymbolResult.filePath;
			if (filePath) {
				for (const symbol of eachPathAndSymbolResult.symbols) {
					const classDoc = retrieveDocumentationForKeyword(symbol, filePath);
					if (classDoc) {
						documentation += `${classDoc}\r\n (source: ${filePath})\n\n`;
					}
				}
			}
		}
	}
	if (documentation.length > 0) {
		item.documentation = documentation;
	}
}

function tads3MakefileSuggestions(): CompletionItem[] | CompletionList {
	const suggestions = [...serverState.fileBasePaths?.values() ?? []]
		.flatMap(x => glob.sync('**/*.{t,h}', { cwd: x.fsPath, nodir: true, ignore: '*.{t3s,t3o}'}))
		.map(x => {
			const libraryFile = x.endsWith('.tl');
			const itemPathWithoutExt = x.replace(/[.][th]$/,'');
			const completionItem = CompletionItem.create(libraryFile? '-lib ':'-source ' + itemPathWithoutExt);
			return completionItem;
		});
	suggestions.push(CompletionItem.create("source"))
	suggestions.push(CompletionItem.create("lib"))
	return suggestions;
}

