import { URI } from "vscode-uri";
import { dirname } from "path";
import * as path from "path";
import * as languageserver from "vscode-languageserver/node";
import * as languageserverTextdocument from "vscode-languageserver-textdocument";
import { Range } from "vscode-languageserver";
import { connection } from '../server';

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
      stdLibraryBasepaths.add(path.join(dirname(file)));
    }
  }
  const basePathsArray: string[] = Array.from(stdLibraryBasepaths.keys());
  return (
    array.filter((x) => basePathsArray.find((y) => !!x.startsWith(y))) ?? []
  );
}

export function extractCurrentLineFromDocument(
  line: number,
  document: languageserverTextdocument.TextDocument
) {
  const currentLineRange = languageserver.Range.create(line, 0, line + 1, 0);
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


export function isPositionWithinRange(pos: languageserver.Position, range: Range) {
  if(pos.line < range.start.line || pos.line > range.end.line) {
    return false;
  }

  if(pos.line === range.start.line) {
    if(pos.character < range.start.character) {
      return false;
    }
  }

  if(pos.line === range.start.line) {
    if(pos.character > range.end.character) {
      return false;
    }
  }
  return true;
}



export function logElapsedTime(currentTimeUtc: number) {
  connection.console.debug(
    `Finding definition took ${Date.now() - currentTimeUtc} ms`
  );
}
