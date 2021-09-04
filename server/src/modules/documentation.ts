import { DocumentSymbol, Position } from 'vscode-languageserver/node';
import { stripComments, strOffsetAt } from './text-utils';
import { readFileSync } from 'fs';
import { connection } from '../server';

const documentationCachedKeywords = new Map();

export function retrieveDocumentationForKeyword(symbol: DocumentSymbol, filePath: string) {
	const keyword = symbol?.name;
	if (keyword) {
		if (documentationCachedKeywords.has(keyword)) {
			return documentationCachedKeywords.get(keyword);
		}
		if (filePath) {
			const originalSourceCode = readFileSync(filePath).toString();
			const startOfClassLine = symbol.range.start.line;
			const offset = strOffsetAt(originalSourceCode, Position.create(startOfClassLine, 0));
			const firstCommentEndBeforeClassIdx = originalSourceCode.toString().lastIndexOf('*/', offset) + 2;
			const firstCommentStartBeforeClassIdx = originalSourceCode.toString().lastIndexOf('/*', firstCommentEndBeforeClassIdx);

			// Assure there's only blanks between the comment and the class, otherwise this information doesn't belong to the following code
			const spaceBetween = originalSourceCode.substring(firstCommentEndBeforeClassIdx, offset);
			if(spaceBetween.match(/\s*/g)) {
				const tads3DocString = originalSourceCode.substr(firstCommentStartBeforeClassIdx, firstCommentEndBeforeClassIdx - firstCommentStartBeforeClassIdx);
				const doc = stripComments(tads3DocString);
				
				if (doc && doc.length > 0) {
					documentationCachedKeywords.set(keyword, doc);
				}
				return doc;
			} else {
				connection.console.log(`Not a comment for ${keyword}, text between: "${spaceBetween}"`);
			}


		}
	}
	return '';
}


