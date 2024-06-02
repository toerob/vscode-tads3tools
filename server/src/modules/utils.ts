import { URI } from "vscode-uri";
import { dirname } from "path";
import { join } from "path";
import { Position, Range, SymbolKind } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { wholeLineRegExp } from "../parser/preprocessor";

export const idWithParametersRegexp = /\s*([a-zA-Z][a-zA-Z0-9]*)\s*[(](.*)?[)]/;

export function filterForStandardLibraryFiles(array: string[] = []): string[] {
  if (array.length === 0) {
    return [];
  }
  // Locate a common file used in both an adv3 or adv3Lite project: "tads.h"
  // Comparison needs to be done using URI to match windows file path system also.
  const genericTadsHeaderFile = array.find((x) =>
    URI.file(x).path.match(/include[/]tads.h$/)
  );

  // Locate files used in adv3/adv3Lite
  const adv3HeaderFile = array.find((x) =>
    URI.file(x).path.match(/[/]adv3.h$/)
  );
  const adv3MainLibFile = array.find((x) =>
    URI.file(x).path.match(/tads3[/]lib[/]_main.t$/)
  );
  const adv3LiteHeaderFile = array.find((x) =>
    URI.file(x).path.match(/[/]advlite.h$/)
  );

  // Create a set with folder base paths for:
  // * system include files
  // * adv3 system library files
  // * adv3lite system library
  // And filter out files starting with these paths
  const stdLibraryBasepaths = new Set<string>();
  for (const file of [
    genericTadsHeaderFile,
    adv3HeaderFile,
    adv3MainLibFile,
    adv3LiteHeaderFile,
  ]) {
    if (file) {
      stdLibraryBasepaths.add(join(dirname(file)));
    }
  }
  const basePathsArray: string[] = Array.from(stdLibraryBasepaths.keys());
  return (
    array.filter((x) => basePathsArray.find((y) => !!x.startsWith(y))) ?? []
  );
}

export function extractCurrentLineFromDocument(
  line: number,
  document: TextDocument
) {
  const currentLineRange = Range.create(line, 0, line + 1, 0);
  const currentLineStr = document.getText(currentLineRange) ?? "";
  return currentLineStr.trim();
}

// TODO: this must be missing something
export function isRangeWithin(range: Range, containingRange: Range): boolean {
  if (range.start.line < containingRange.start.line) {
    return false;
  }

  if (range.end.line > containingRange.end.line) {
    return false;
  }

  if (range.start.line === containingRange.start.line) {
    return range.start.character >= containingRange.start.character;
  }

  if (range.end.line === containingRange.end.line) {
    return range.end.character <= containingRange.end.character;
  }
  return true;
}

export function isPositionWithinRange(pos: Position, range: Range) {
  if (pos.line < range.start.line || pos.line > range.end.line) {
    return false;
  }

  if (pos.line === range.start.line) {
    if (pos.character < range.start.character) {
      return false;
    }
  }

  if (pos.line === range.start.line) {
    if (pos.character > range.end.character) {
      return false;
    }
  }
  return true;
}

export function getCurrentLine(currentDoc: TextDocument, line: number): string {
  let currentLine = currentDoc.getText(Range.create(line, 0, line + 1, 0));
  return currentLine.substring(0, currentLine.length - 1);
}

export function isSymbolKindOneOf(
  symbolKind: SymbolKind,
  kinds: SymbolKind[]
): boolean {
  if (symbolKind === undefined) {
    return false;
  }
  for (const kind of kinds) {
    if (symbolKind === kind) {
      return true;
    }
  }
  return false;
}

export function camelCase(symbolName: any) {
  const first = symbolName[0].toLowerCase();
  const rest = symbolName.substring(1);
  return `${first}${rest}`;
}

export function getVariableNameAtPosition(
  text: string,
  position: Position
): string | null {
  const lines = text.split("\n");
  const line = lines[position.line];
  const prefix = line.substring(0, position.character);
  const match = prefix.match(/(\w+)$/);
  return match ? match[0] : null;
}

/**
 * Uses the preprocessed document to find the method declaration and trims it after the last right parenthesis
 * @param filePath
 * @param lineOfDeclaration
 * @returns the method signature line
 */
export function getLineOfMethodDeclaration(
  preprocessedFilesCacheMap: Map<string, string>,
  filePath: string,
  lineOfDeclaration: number
) {
  // Get the preprocessed document for the location
  const preprocessedDoc = preprocessedFilesCacheMap.get(filePath);
  const preprocessedFileAsArray = preprocessedDoc?.split(wholeLineRegExp) ?? [];
  const rawSignatureLine = preprocessedFileAsArray[lineOfDeclaration] ?? "";
  const lastRightParenthesis = rawSignatureLine.lastIndexOf(")") + 1;
  const signatureLine = rawSignatureLine.substring(0, lastRightParenthesis);
  return signatureLine.trimStart();
}

/**
 * Extracts the symbol name and its parameters from a function/method call
 */
export function extractFunctionNameAndParams(
  currentLine: string
): undefined | { symbolName: string; params: string[] } {
  const symbolNameAndParamsMatch = idWithParametersRegexp.exec(currentLine);
  if (symbolNameAndParamsMatch) {
    const symbolName = symbolNameAndParamsMatch[1];
    const params = (symbolNameAndParamsMatch[2] ?? "").split(/,/);
    return {
      symbolName,
      params,
    };
  }
  return undefined;
}
