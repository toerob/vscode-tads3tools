import { TextDocument } from 'vscode-languageserver-textdocument';
import { DocumentFormattingParams, TextDocuments, Range } from 'vscode-languageserver';
import { TextEdit } from 'vscode-languageserver-types';
import { wholeLineRegExp } from '../parser/preprocessor';
import { formatDocument } from './document-range-formatting';

export function onDocumentFormatting(handler: DocumentFormattingParams, documents: TextDocuments<TextDocument>): TextEdit[] {
	const edits: TextEdit[] = [];
	const { textDocument } = handler;
	const currentDocument = documents.get(textDocument.uri);
	const rows = currentDocument?.getText().split(wholeLineRegExp) ?? [];
	const formattedDocumentArray = formatDocument(rows);
	const lastRowLength = rows[rows.length - 1].length;
	const edit = TextEdit.replace(Range.create(0, 0, rows.length, lastRowLength), formattedDocumentArray.join(`\n`));
	edits.push(edit);
	return edits;
}
