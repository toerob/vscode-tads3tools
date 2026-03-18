import { TextDocument } from "vscode-languageserver-textdocument";
import { DocumentFormattingParams, TextDocuments, Range } from "vscode-languageserver";
import { TextEdit } from "vscode-languageserver-types";
import { wholeLineRegExp } from "../parser/preprocessor";
import { ShallowParser } from "./ShallowParser";

export function onDocumentFormatting(
  handler: DocumentFormattingParams,
  documents: TextDocuments<TextDocument>,
): TextEdit[] {
  const { textDocument } = handler;
  const currentDocument = documents.get(textDocument.uri);
  if (!currentDocument) return [];

  const text = currentDocument.getText();
  const rows = text.split(wholeLineRegExp);
  const formattedLines = formatDocument(text);
  const lastRow = rows[rows.length - 1];
  const edit = TextEdit.replace(
    Range.create(0, 0, rows.length - 1, lastRow.length),
    formattedLines.join("\n"),
  );
  return [edit];
}

/**
 * Format a TADS3 document using the ShallowParser for structural depth tracking.
 *
 * Indentation rule: each line is indented to
 *   min(stateBefore.objectDepth + stateBefore.braceDepth,
 *       stateAfter.objectDepth  + stateAfter.braceDepth)
 *
 * This naturally handles:
 *  - Object declarations (min of 0 before and 1 after → indent 0)
 *  - Opening braces (min of current depth before and depth+1 after → current depth)
 *  - Closing braces / semicolons (min of depth before and lower depth after → lower depth)
 *  - Lines inside bodies (before == after → that depth)
 */
export function formatDocument(orgInput: string): string[] {
  const lineContexts = new ShallowParser().structurize(orgInput);
  const originalLines = orgInput.split(wholeLineRegExp);
  const result: string[] = [];
  let withinComment = false;

  for (let i = 0; i < originalLines.length; i++) {
    const original = originalLines[i];
    const trimmed = original.trim();

    // Track multi-line /* ... */ comments; preserve their interior unchanged.
    if (original.includes("/*")) withinComment = true;
    if (withinComment && original.includes("*/")) withinComment = false;
    if (withinComment) {
      result.push(original);
      continue;
    }

    // Preserve blank lines without indentation.
    if (trimmed === "") {
      result.push("");
      continue;
    }

    const ctx = lineContexts.get(i + 1); // ShallowParser uses 1-based line numbers
    const before = ctx?.stateBefore
      ? ctx.stateBefore.objectDepth + ctx.stateBefore.braceDepth
      : 0;
    const after = ctx?.stateAfter
      ? ctx.stateAfter.objectDepth + ctx.stateAfter.braceDepth
      : 0;
    const indent = Math.max(0, Math.min(before, after));

    result.push("\t".repeat(indent) + trimmed);
  }

  return result;
}
