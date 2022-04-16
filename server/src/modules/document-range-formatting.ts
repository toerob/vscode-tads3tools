import { TextDocument } from 'vscode-languageserver-textdocument';
import { TextDocuments, DocumentRangeFormattingParams } from 'vscode-languageserver';
import { TextEdit } from 'vscode-languageserver-types';
import { preprocessedFilesCacheMap } from '../server';
import { URI } from 'vscode-uri';
import { formatDocument } from './document-formatting';
import { Range } from 'vscode-languageserver';

export function onDocumentRangeFormatting(handler: DocumentRangeFormattingParams, documents: TextDocuments<TextDocument>): TextEdit[] {
	const edits: TextEdit[] = [];
	const { textDocument, range } = handler;
	const currentDocument = documents.get(textDocument.uri);
	const path = URI.parse(textDocument.uri).path;
	const preprocessedText = preprocessedFilesCacheMap.get(path) ?? "";

	// Only whole lines formatting are (as of yet) supported.
	// So first a complete format of the document is done:
	const formattedDocumentArray = formatDocument(preprocessedText, currentDocument?.getText() ?? "", currentDocument?.lineCount ?? 0);

	// Then a slice per row basis:
	let rangedFormattedDocumentArray = formattedDocumentArray.slice(range.start.line, range.end.line + 1);

	// And then replacement is done on whole rows:
	const wholeLineRange = Range.create(range.start.line, 0, range.end.line, range.end.character);
	edits.push(TextEdit.replace(wholeLineRange, rangedFormattedDocumentArray.join(`\n`)));
	return edits;
}
