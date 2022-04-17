import { TextDocument } from 'vscode-languageserver-textdocument';
import { DocumentFormattingParams, TextDocuments, Range, combineWindowFeatures } from 'vscode-languageserver';
import { TextEdit } from 'vscode-languageserver-types';
import { wholeLineRegExp } from '../parser/preprocessor';
import { preprocessedFilesCacheMap } from '../server';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import Tads3FormatterSymbolListener from '../parser/Tads3FormatterSymbolListener';
import { Tads3Lexer } from '../parser/Tads3Lexer';
import { Tads3Listener } from '../parser/Tads3Listener';
import { Tads3Parser } from '../parser/Tads3Parser';
import { URI } from 'vscode-uri';

export function onDocumentFormatting(handler: DocumentFormattingParams, documents: TextDocuments<TextDocument>): TextEdit[] {
	const edits: TextEdit[] = [];
	const { textDocument } = handler;
	const currentDocument = documents.get(textDocument.uri);
	const rows = currentDocument?.getText().split(wholeLineRegExp) ?? [];
	const path = URI.parse(textDocument.uri).fsPath;
	const preprocessedText = preprocessedFilesCacheMap.get(path) ?? "";
	const formattedDocumentArray = formatDocument(preprocessedText, currentDocument?.getText() ?? "", currentDocument?.lineCount ?? 0);
	const lastRowLength = rows[rows.length - 1].length;
	const edit = TextEdit.replace(Range.create(0, 0, rows.length, lastRowLength), formattedDocumentArray.join(`\n`));
	edits.push(edit);
	return edits;
}

export function formatDocument(preprocessedText: string, orgInput: string, lineCount: number) {
	const input = CharStreams.fromString(preprocessedText);
	const lexer = new Tads3Lexer(input);
	const tokenStream = new CommonTokenStream(lexer);
	const parser = new Tads3Parser(tokenStream);
	const parseTree = parser.program();
	const listener = new Tads3FormatterSymbolListener();
	const parseTreeWalker = new ParseTreeWalker();
	parseTreeWalker.walk<Tads3Listener>(listener, parseTree);
	let indentation = 0;
	const originalRowsArray = orgInput.split(wholeLineRegExp);
	let withinComment = false;
	const formattedDocumentArray = [];
	for (let row = 0; row < lineCount; row++) {
		indentation += listener.rowIndentation.get(row) ?? 0;
		const originalRow = originalRowsArray[row];

		if (originalRow.match(/[/][*]/)) {
			withinComment = true;
		}
		if (withinComment && originalRow.match(/[*][/]/)) {
			withinComment = false;
		}
		if (withinComment) {
			formattedDocumentArray.push(originalRow);
			continue;
		}

		// Make sure indentation is never less than zero:
		indentation = indentation >= 0 ? indentation : 0;


		const trimmedOriginalRow = originalRow.trim();
		const withinString = listener.withinString.get(row + 1);
		if (withinString) {
			// FIXME: take care of rows with strings better than this, 
			// but for now just ignore formatting spaces between them
			const formattedRow = "\t".repeat(indentation) + trimmedOriginalRow;
			formattedDocumentArray.push(formattedRow);
		} else {
			const prunedWhiteSpaceOriginalRow = trimmedOriginalRow.replace(/\s{2,}/g, ' ');
			const formattedRow = "\t".repeat(indentation) + prunedWhiteSpaceOriginalRow;
			formattedDocumentArray.push(formattedRow);
		}

	}
	return formattedDocumentArray;
}