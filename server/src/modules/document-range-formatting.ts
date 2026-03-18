import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocuments, DocumentRangeFormattingParams, Range } from "vscode-languageserver";
import { TextEdit } from "vscode-languageserver-types";
import { URI } from "vscode-uri";
import { formatDocument } from "./document-formatting";

export function onDocumentRangeFormatting(
  handler: DocumentRangeFormattingParams,
  documents: TextDocuments<TextDocument>,
): TextEdit[] {
  const { textDocument, range } = handler;
  const currentDocument = documents.get(textDocument.uri);
  if (!currentDocument) return [];

  // Format the whole document so that range indentation is consistent with context.
  const formattedLines = formatDocument(currentDocument.getText());

  // Slice to the requested range (whole-line boundaries only).
  const rangeLines = formattedLines.slice(range.start.line, range.end.line + 1);
  const wholeLineRange = Range.create(range.start.line, 0, range.end.line, range.end.character);
  return [TextEdit.replace(wholeLineRange, rangeLines.join("\n"))];
}
