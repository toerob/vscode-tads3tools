import { TadsSymbolManager } from "./symbol-manager";
import { TextDocument } from "vscode-languageserver-textdocument";
import {
  ImplementationParams,
  TextDocuments,
  Location,
} from "vscode-languageserver";
import { getWordAtPosition } from "./text-utils";
import { URI } from "vscode-uri";

export async function onImplementation(
  handler: ImplementationParams,
  documents: TextDocuments<TextDocument>,
  symbolManager: TadsSymbolManager
): Promise<Location[]> {
  const locations: Location[] = [];
  const { position, textDocument } = handler;
  const currentDocument = documents.get(textDocument.uri);
  if (currentDocument) {
    const symbolName = getWordAtPosition(currentDocument, position);
    if (symbolName) {
      for (const loc of symbolManager.findSymbolsByDetail(symbolName)) {
        for (const symb of loc.symbols) {
          const path =
            process.platform === "win32"
              ? URI.file(loc.filePath).path
              : loc.filePath;
          locations.push(Location.create(path, symb.range));
        }
      }
    }
  }
  return locations;
}
