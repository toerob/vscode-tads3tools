import { TextDocument } from "vscode-languageserver-textdocument";
import { DocumentFormattingParams, TextDocuments, Range } from "vscode-languageserver";
import { TextEdit } from "vscode-languageserver-types";
import { wholeLineRegExp } from "../parser/preprocessor";
import { ShallowParser } from "./ShallowParser";
import { URI } from "vscode-uri";
import { serverState } from "../state";

export function onDocumentFormatting(
  handler: DocumentFormattingParams,
  documents: TextDocuments<TextDocument>,
): TextEdit[] {
  const { textDocument } = handler;
  const currentDocument = documents.get(textDocument.uri);
  if (!currentDocument) return [];

  const path = URI.parse(textDocument.uri).fsPath;
  const orgText = currentDocument.getText();
  const preprocessedText = serverState.preprocessedFilesCacheMap.get(path);

  const rows = orgText.split(wholeLineRegExp);
  const formattedLines = formatDocument(orgText, preprocessedText);
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
 * When a preprocessed version of the text is available it is used as input to the
 * ShallowParser instead of the raw source.  The preprocessor guarantees that the
 * preprocessed text has exactly the same number of lines as the original (blank lines
 * are inserted to maintain the correspondence), so depth information from preprocessed
 * line N maps directly to original line N.
 *
 * The benefit is that macros such as
 *   VerbRule(Take)  →  grammar takeVerb(main) : TakeAction ...
 *   DefineTAction(Strike)  →  class StrikeAction : TAction ...
 * are already expanded in the preprocessed text, letting the ShallowParser recognise
 * them as object declarations and assign correct indentation to their bodies.
 *
 * Indentation rule: each line is indented to
 *   min(stateBefore.objectDepth + stateBefore.braceDepth,
 *       stateAfter.objectDepth  + stateAfter.braceDepth)
 *
 * This naturally handles:
 *  - Object / class declarations (min of 0 before and 1 after → indent 0)
 *  - Opening braces (before depth, which is lower than after depth)
 *  - Closing braces / semicolons (after depth, which is lower than before depth)
 *  - Lines inside bodies (before == after → that depth)
 */
export function formatDocument(orgInput: string, preprocessedText?: string): string[] {
  // Use preprocessed text for structural analysis when available; fall back to raw input.
  const textForParsing = preprocessedText ?? orgInput;
  const lineContexts = new ShallowParser().structurize(textForParsing);

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
