import { DocumentSymbol, Position } from 'vscode-languageserver/node';
import { stripComments, strOffsetAt } from './text-utils';
import { readFileSync } from 'fs';

const documentationCachedKeywords = new Map();

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
export function retrieveDocumentationForKeyword(symbol: DocumentSymbol, filePath: string) {
	const keyword = symbol?.name;
	if (keyword) {
		if (documentationCachedKeywords.has(symbol)) {
			return documentationCachedKeywords.get(symbol);
		}
		if (filePath) {
			const originalSourceCode = readFileSync(filePath).toString();
			const startOfClassLine = symbol.range.start.line;
			const offset = strOffsetAt(originalSourceCode, Position.create(startOfClassLine, 0));
			const firstCommentEndBeforeClassIdx = originalSourceCode.toString().lastIndexOf('*/', offset) + 2;
			const firstCommentStartBeforeClassIdx = originalSourceCode.toString().lastIndexOf('/*', firstCommentEndBeforeClassIdx);

			// Assure there's only blanks between the comment and the class, otherwise this comment doesn't belong to the following code
			const spaceBetween = originalSourceCode.substring(firstCommentEndBeforeClassIdx, offset);
			if (spaceBetween.match(/^\s*$/g)) {
				const tads3DocString = originalSourceCode.substr(firstCommentStartBeforeClassIdx, firstCommentEndBeforeClassIdx - firstCommentStartBeforeClassIdx);
				const doc = stripComments(tads3DocString);

				if (doc && doc.length > 0) {
					documentationCachedKeywords.set(symbol, doc);
				}
				return doc;
			}
		}
	}
	return '';
}


