

import { TadsSymbolManager } from './symbol-manager';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { ResponseError, TextDocuments, DocumentRangeFormattingParams } from 'vscode-languageserver';
import { TextEdit } from 'vscode-languageserver-types';
import { wholeLineRegExp } from '../parser/preprocessor';

enum LEVEL { BEGIN_OBJECT, BEGIN_BLOCK, UNCHANGED, EXIT_BLOCK };

let formatStack: LEVEL[] = [];

const tabIndentation = "\t"; 

export function onDocumentRangeFormatting(handler: DocumentRangeFormattingParams, documents: TextDocuments<TextDocument>, symbolManager: TadsSymbolManager): ResponseError<void> | TextEdit[] | PromiseLike<ResponseError<void> | TextEdit[] | null | undefined> | null | undefined {
	const edits: TextEdit[] = [];

	
	const { textDocument, range } = handler;
	const currentDocument = documents.get(textDocument.uri);
	const formattedDocumentArray = [];
	const rows = currentDocument?.getText(range).split(wholeLineRegExp) ?? [];
	formatStack = [];
	
	for (const row of rows) {
		let padding = tabIndentation.repeat(formatStack.length);
		const result = decideNextRowIndentation(row);

		if (result !== LEVEL.UNCHANGED && result !== LEVEL.EXIT_BLOCK) {
			formatStack.push(result);
		} else if (result === LEVEL.EXIT_BLOCK) {
			formatStack.pop();
			padding = tabIndentation.repeat(formatStack.length); // In this case, redo padding
		}

		// FIXME: don't change spaces within strings
		// FIXME: In case of stacked member calls, remove all blanks. 
		// e,g:      new Vector(10)    .fillValue(nil, 1, 10)
		// becomes:  new Vector(10).fillValue(nil, 1, 10)

		// FIXME: In case of stacked member calls, make sure extra indentation is added, e.g:
		// local vec = new Vector(10)
		//				.fillValue(nil, 1, 10)
		//				.applyAll({x: i++});

		const currentTrimmedRow = row.trim().replace(/\s{2,}/g, ' ');

		formattedDocumentArray.push(`${padding + currentTrimmedRow}`);
	}
	edits.push(TextEdit.replace(range, formattedDocumentArray.join(`\n`)));
	return edits;
}

function decideNextRowIndentation(row: string = ''): number {
	// Anything that begins like a class/object and doesn't end with ;
	if (formatStack.length === 0 && row.trimEnd().match(/\s*(class\s*)?(.*)\s*[:]\s*.*[^;]$/)) {
		return LEVEL.BEGIN_OBJECT;
	}
	if (formatStack.length > 0) {
		const topOfStack = formatStack[formatStack.length - 1];
		if (row.match(/[{]\s*$/)) {
			return LEVEL.BEGIN_BLOCK;
		}
		// If at object/class level and semicolon is found. 
		if (topOfStack === LEVEL.BEGIN_OBJECT && row.match(/[;]/)) { return LEVEL.EXIT_BLOCK; }

		if (row.match(/[}]\s*$/)) {
			return LEVEL.EXIT_BLOCK;
		}
	}

	return LEVEL.UNCHANGED;
}

