/* eslint-disable @typescript-eslint/no-var-requires */

import { DocumentSymbol, Position } from 'vscode-languageserver/node';
import { stripComments, strOffsetAt } from './text-utils';
import { readFileSync } from 'fs';
import { basename } from 'path';
import { connection } from '../server';
import LRUCache = require('lru-cache');

const documentationCachedKeywords = new LRUCache({ max: 500 });

const documentationDontCheckCachedKeywords = new LRUCache({ max: 500 });

/**
 * Retrieves a documentation for a symbol and filepath. 
 * It checks if there's a multiline comment above the symbol at hand at that there's only whitespaces 
 * separating it from the symbol name. Then it strips the comment signs off and returns the resuklt. 
 * If it finds anything the result is cached for faster retrieval next time.
 * (This command is used in conjunction with SymbolManager.findSymbols, see completions.ts and hover.ts)
 * 
 * @param symbol DocumentSymbol- the symbol the get documentation for
 * @param filePath string - the filepath to check for information
 * @returns a string - possibly a string of suitable documentation or at least an empty string
 */
export function retrieveDocumentationForKeyword(symbol: DocumentSymbol, filePath: string) : string {
	const keyword = symbol?.name;
	if (keyword) {

		// Create a unique hashed identifier for this symbol, (storing the symbol as key doesn't work)
		const symbolHash = hashSymbol(symbol, filePath);

		// Quickly verify we don't read from disk for an already disqualified symbol entry
		if (documentationDontCheckCachedKeywords.has(symbolHash)) {
			return '';
		}

		if (documentationCachedKeywords.has(symbolHash)) {
			//connection.console.log(`Reading from cache: ${filePath}`);
			return documentationCachedKeywords.get(symbolHash) ?? '';
		}
		if (filePath) {
			//connection.console.log(`Reading from disc: ${filePath}`);
			const originalSourceCode = readFileSync(filePath).toString();
			const startOfClassLine = symbol.range.start.line;
			if(startOfClassLine) {
				try {
					const offset = strOffsetAt(originalSourceCode, Position.create(startOfClassLine, 0));
					const firstCommentEndBeforeClassIdx = originalSourceCode.toString().lastIndexOf('*/', offset) + 2;
					const firstCommentStartBeforeClassIdx = originalSourceCode.toString().lastIndexOf('/*', firstCommentEndBeforeClassIdx);
		
					// Assure there's only blanks between the comment and the class, otherwise this comment doesn't belong to the following code
					const spaceBetween = originalSourceCode.substring(firstCommentEndBeforeClassIdx, offset);
					if (spaceBetween.match(/^\s*$/g)) {
						const tads3DocString = originalSourceCode.substr(firstCommentStartBeforeClassIdx, firstCommentEndBeforeClassIdx - firstCommentStartBeforeClassIdx);
						const doc = stripComments(tads3DocString);
		
						if (doc && doc.length > 0) {
							documentationCachedKeywords.set(symbolHash, doc);
						}
						return doc;
					} else {
						documentationDontCheckCachedKeywords.set(symbolHash, true);
					}
				} catch(err:any) {
					connection.console.error(err.message);
				}
			} 
		}
	}
	return '';
}


/**
 * Create a unique key for each entry so caching is successful
 * @param symbol 
 * @param filePath 
 * @returns 
 */
function hashSymbol(symbol: DocumentSymbol, filePath: string) {
	const hash = symbol.name + '|' + symbol.range.start.line + ':' + symbol.range.start.character + '|' + basename(filePath);
	return hash;

}

