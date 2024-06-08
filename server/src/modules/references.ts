import { TextDocuments, Location } from "vscode-languageserver";

import { ReferenceParams } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { connection } from "../server";
import { TadsSymbolManager } from "./symbol-manager";
import { getWordAtPosition } from "./text-utils";
import { URI } from "vscode-uri";

const onWindowsPlatform = process.platform === "win32";

/**
 * Predicate to decide what symbols to allow references to.
 *
 * In this case, "properties" are also added to list of references along with keywords.
 *
 * @param symbol The symbol to decide visibility on
 * @returns true/false
 */

/*
function allowedSymbolAsKeywordPredicate(symbol: SymbolInformation): boolean {
	return symbol.kind === SymbolKind.Property.valueOf();
	//return true;
}*/

/**
 * Given the word at the position (captured within the ReferenceParams object)
 * returns a list of references of symbol definitions/keywords used inside the project/libraries.
 *
 * @param handler
 * @param documents
 * @param symbolManager
 * @returns a collection of Locations to project/library files where the keyword at the position is located
 */
export async function onReferences(
  handler: ReferenceParams,
  documents: TextDocuments<TextDocument>,
  symbolManager: TadsSymbolManager,
  preprocessedFilesCacheMap: Map<string, string>,
) {
  const { position, textDocument } = handler;
  const currentDocument = documents.get(textDocument.uri);

  const locations: Location[] = [];

  if (currentDocument) {
    const symbolName = getWordAtPosition(currentDocument, position);
    if (symbolName) {
      connection.console.debug(`Searching reference(s) for word: ${symbolName}`);
      const locations = symbolManager.getAllWorkspaceKeywordLocations(symbolName, false);

      const allOtherSymbols = symbolManager
        .findAllSymbols(symbolName)
        .map((x) => Location.create(onWindowsPlatform ? URI.file(x.filePath)?.path : x.filePath, x.symbol.range));

      locations.push(...allOtherSymbols);

      if (locations.length == 0) {
        connection.console.debug(`No reference(s) found for word: ${symbolName}.`);
      }
      return locations;

      /*
			// Strategy 2: scan through all the cached files and look for whole word regexp of the the symbolName:
			const regex = new RegExp(`\\b(${symbolName})\\b`);
			preprocessedFilesCacheMap.forEach((text: string, filePath: string) => {
				const rows = text.split(wholeLineRegExp);
				let rowIdx = 1;
				for (const row of rows) {
					const result = regex.exec(row);
					if (result && result.length === 2) {
						const group = result[1];
						const start = Position.create(rowIdx, result.index);
						const end = Position.create(rowIdx, result.index + result[1].length);
						const fp = process.platform === 'win32' ? URI.file(filePath)?.path : filePath;
						locations.push(Location.create(fp, Range.create(start, end)));
						console.log(group);
					}
					rowIdx++;
				}
			});*/
    }
  }
  return locations;
}
