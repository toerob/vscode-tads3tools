/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-empty-function */
import { TextDocuments, SymbolKind } from "vscode-languageserver/node";

import {
  CancellationTokenSource,
  InitializeParams,
  TextDocumentSyncKind,
  InitializeResult,
  TextDocumentContentChangeEvent,
  DidChangeConfigurationParams,
} from "vscode-languageserver-protocol";

import { createConnection, ProposedFeatures } from "vscode-languageserver/node";

import { symbolManager, TadsSymbolManager } from "./modules/symbol-manager";
import { onDocumentSymbol } from "./modules/symbols";
import { onReferences } from "./modules/references";
import { onDefinition } from "./modules/definitions";
import { preprocessAndParseTads3Files, preprocessAndParseTads2Files } from "./parse-workers-manager";
import { TextDocument } from "vscode-languageserver-textdocument";
import { DefaultMapObject } from "./modules/mapcrawling/DefaultMapObject";
import MapObjectManager from "./modules/mapcrawling/map-mapping";
import { onCodeAction } from "./modules/code-actions";
import { onCodeLens } from "./modules/codelens";
import { onCompletion } from "./modules/completions";
import { tokenizeQuotesWithIndex } from "./modules/text-utils";
import { onDocumentLinks } from "./modules/links";
import { onHover } from "./modules/hover";
import { onWorkspaceSymbol } from "./modules/workspace-symbols";
import { markFileToBeCheckedForMacroDefinitions } from "./parser/preprocessor";
import { URI } from "vscode-uri";
import { serverState } from "./state";
import { onDocumentFormatting } from "./modules/document-formatting";
import { onDocumentRangeFormatting } from "./modules/document-range-formatting";
import { onImplementation } from "./modules/implementation";
import { onSignatureHelp } from "./modules/signature-helper";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const posTagger = require("wink-pos-tagger");

// The tads3 global settings
interface Tads3Settings {
  maxNumberOfProblems: number;
  enablePreprocessorCodeLens: boolean;
  include: string;
  lib: string;
  enableLibraryCache: boolean;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: Tads3Settings = {
  maxNumberOfProblems: 1000,
  enablePreprocessorCodeLens: false,
  include: "/usr/local/share/frobtads/tads3/include/",
  lib: "/usr/local/share/frobtads/tads3/lib/",
  enableLibraryCache: false,
};

let globalSettings: Tads3Settings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<Tads3Settings>> = new Map();

interface BlockArea {
  kind: "method" | "function" | "class" | "object";
  start: number;
  end: number;
}

let snapshot: Record<string, BlockArea[]> = {};

export const mapper = new MapObjectManager(symbolManager);

export default function processMapSymbols(symbolManager: TadsSymbolManager, callback: any) {
  const symbols = mapper.mapGameObjectsToMapObjects();
  callback(symbols);
}

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
export const connection = createConnection(ProposedFeatures.all); // TODO:

/*export function getCurrentDocument() {
	return currentDocument;
}*/

// Create a simple text document manager.
export const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;

connection.onInitialize((params: InitializeParams) => {
  const capabilities = params.capabilities;

  // Does the client support the `workspace/configuration` request?
  // If not, we fall back using global settings.
  hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
  hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
  const hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  );

  const result: InitializeResult = {
    capabilities: {
      documentSymbolProvider: true,
      workspaceSymbolProvider: true,
      referencesProvider: true, // TODO: need to fix the row synchronization issue
      definitionProvider: true,
      documentLinkProvider: {
        resolveProvider: true,
      },
      codeActionProvider: true,
      codeLensProvider: {
        resolveProvider: true,
      },
      textDocumentSync: {
        openClose: true,
        willSave: true,
        save: true,
        change: TextDocumentSyncKind.Incremental,
      },
      hoverProvider: true,
      completionProvider: {
        resolveProvider: false,
      },
      implementationProvider: true,
      documentFormattingProvider: false,
      documentRangeFormattingProvider: false,
      signatureHelpProvider: {
        triggerCharacters: ["(", ","],
      },
    },
  };

  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    };
  }
  return result;
});

export let abortParsingProcess: CancellationTokenSource | undefined;

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    // Register for all configuration changes.
    connection.onDidChangeConfiguration((change: DidChangeConfigurationParams) => {
      documentSettings.clear(); // Reset all cached document settings
      globalSettings = <Tads3Settings>(change.settings.tads3 || defaultSettings);
      // Revalidate all open text documents
      documents.all().forEach(validateTextDocument);
    });
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event: any) => {
      connection.console.debug("Workspace folder change event received.");
    });
  }

  connection.onNotification("symbolparsing/abort", () => {
    abortParsingProcess?.cancel();
  });

  connection.onNotification("request/mapsymbols", (options: any) => {
    if (options?.reset) {
      mapper.newlyCreatedRoomsSet.clear();
      mapper.persistedObjectPositions.clear();
    }

    // TODO: make this async so connection.sendNotification can use await
    processMapSymbols(symbolManager, (symbols: DefaultMapObject[]) => {
      connection.sendNotification("response/mapsymbols", symbols);
    });
  });

  connection.onRequest("request/changestartroom", async (startRoom: any) => {
    mapper.startRoom = startRoom;

    processMapSymbols(symbolManager, (symbols: DefaultMapObject[]) => {
      connection.sendNotification("response/mapsymbols", symbols);
    });
  });

  // In case the client asks for a symbol, locate it and send it back
  connection.onRequest("request/findsymbol", (params: any) => {
    //TODO: fix { name:string, postAction } = x;
    const name = params.name;
    const postAction = params.postAction;

    const symbol = symbolManager.findSymbol(name);
    if (symbol) {
      connection.console.debug(`Found symbol: ${name}`);
      connection.sendNotification("response/foundsymbol", {
        ...symbol,
        postAction,
      });
    }
  });
  connection.onRequest("request/addroom", ({ room }: any) => {
    // Let's the mapping-mapper know it is a new room and render it even if it lacks
    // connections to other rooms
    mapper.newlyCreatedRoomsSet.add(room.name);
    mapper.persistedObjectPositions.set(room.name, room.pos);
  });

  connection.onRequest("request/connectrooms", ({ currentPayload, previousPayload }: any) => {
    const fromObject = {
      roomName: previousPayload.from,
      directionName: previousPayload.directionName,
    };
    const toObject = {
      roomName: currentPayload.from,
      directionName: currentPayload.directionName,
    };

    const fromRoom = symbolManager.findSymbol(fromObject.roomName);
    const toRoom = symbolManager.findSymbol(toObject.roomName);

    const validDirection1 = parseDirection(fromObject.directionName);
    const validDirection2 = parseDirection(toObject.directionName);

    if (fromRoom.symbol?.name && toRoom.symbol?.name && validDirection1 && validDirection2) {
      const response = { fromRoom, toRoom, validDirection1, validDirection2 };
      connection.sendNotification("response/connectrooms", response);
    } else {
      connection.console.error(
        `Cannot connect rooms: ${fromRoom.symbol?.name} with ${toRoom.symbol?.name} via ${validDirection1}/${validDirection2}`,
      );
    }
  });
});

function applyDeltas(fsPath: URI, changes: TextDocumentContentChangeEvent[]) {
  const blocks = snapshot[fsPath.fsPath];
  if (!blocks) return;

  for (const c of changes) {
    /*const lineDelta = c.text.split("\n").length - (c.range.end.line - c.range.start.line + 1);

        for (const block of blocks) {
            // Om förändringen ligger *innan* blocket → skjut blockets linjer
            if (c.range.end.line < block.start) {
                block.start += lineDelta;
                block.end += lineDelta;
            }
            // Om förändringen är *inne i blocket* → bara ändra end tills nästa save korrigerar
            else if (c.range.start.line >= block.start && c.range.start.line <= block.end) {
                block.end += lineDelta;
            }
        }*/
  }
}

// Only keep settings for open documents
documents.onDidClose((e) => {
  documentSettings.delete(e.document.uri);
});

documents.onDidChangeContent(async (params) => {
  // Save every change the user does
  // TODO: Preprocess with a debounce of 200ms
  // NOTE: preprocess is not available for a single file since t3make parses them all.
  serverState.currentDocChanges = params.document.getText();
});

connection.onNotification("client.cursorMoved", (data) => {
  // Keep track of the cursor
  // TODO: needed?
  serverState.currentCursorLocation = { fsPath: data.uri, line: data.line };
});

documents.onWillSave(async (params: any) => {
  const fp = URI.parse(params.document.uri).path;
  markFileToBeCheckedForMacroDefinitions(fp);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics: [] });
}

connection.onCodeAction(async (handler: any) => onCodeAction(handler, documents, symbolManager));
connection.onWorkspaceSymbol(async (handler: any) => onWorkspaceSymbol(handler, documents, symbolManager));
connection.onDocumentSymbol(async (handler: any) => onDocumentSymbol(handler, documents, symbolManager));
connection.onReferences(async (handler: any) =>
  onReferences(handler, documents, symbolManager, serverState.preprocessedFilesCacheMap),
);

connection.onDefinition(async (handler: any) => onDefinition(handler, documents, symbolManager));
connection.onCompletion(async (handler: any) => onCompletion(handler, documents, symbolManager));
connection.onDocumentLinks(async (handler: any) => onDocumentLinks(handler, documents, symbolManager));
connection.onCodeLens(async (handler: any) => onCodeLens(handler, documents, symbolManager));

connection.onHover(async (handler: any) => onHover(handler, documents, symbolManager));
connection.onDocumentFormatting(async (handler: any) => onDocumentFormatting(handler, documents));
connection.onDocumentRangeFormatting(async (handler: any) => onDocumentRangeFormatting(handler, documents));
connection.onImplementation(async (handler: any) => onImplementation(handler, documents, symbolManager));
connection.onSignatureHelp(async (handler: any) => onSignatureHelp(handler, documents, symbolManager));

connection.onRequest("request/extractQuotes", async (params: any) => {
  if (params.fsPath === undefined) {
    let resultArray: string[] = [];
    for (const key of serverState.preprocessedFilesCacheMap.keys()) {
      const prepText = serverState.preprocessedFilesCacheMap.get(key) ?? "";
      const result = tokenizeQuotesWithIndex(prepText);
      const fileResultArray = [...result.values()];
      resultArray = [...resultArray, ...fileResultArray];
    }
    if (params.types === "single") {
      resultArray = resultArray.filter((x) => x.startsWith("'"));
    } else if (params.types === "double") {
      resultArray = resultArray.filter((x) => x.startsWith('"'));
    }

    resultArray = [...new Set([...resultArray])];
    await connection.sendNotification("response/extractQuotes", {
      resultArray,
    });
    return;
  }

  const { text, fsPath } = params;
  const prepText = serverState.preprocessedFilesCacheMap.get(fsPath) ?? "";
  const result = tokenizeQuotesWithIndex(prepText);
  let resultArray = [...result.values()];
  if (params.types === "single") {
    resultArray = resultArray.filter((x) => x.startsWith("'"));
  } else if (params.types === "double") {
    resultArray = resultArray.filter((x) => x.startsWith('"'));
  }

  await connection.sendNotification("response/extractQuotes", { resultArray });
});

connection.onRequest("request/preprocessed/file", async (params: any) => {
  const { path, range } = params;
  const text = serverState.preprocessedFilesCacheMap.get(path);
  await connection.sendNotification("response/preprocessed/file", {
    path,
    text,
  });
});

connection.onRequest("request/analyzeText/findNouns", async (params: any) => {
  const { path, position, text } = params;

  await searchTextForNounsAndReportToClient(path, position, text);
});

connection.onRequest(
  "request/parseDocuments",
  async ({ globalStoragePath, makefileLocation, filePaths, token }: any) => {
    serverState.tadsVersion = 3;
    const useCachedLibrary = globalSettings.enableLibraryCache;
    await preprocessAndParseTads3Files(globalStoragePath, makefileLocation, filePaths, token, useCachedLibrary);
  },
);

connection.onRequest("request/offsetSymbols", ({ filePath, line, offset }: any) => {
  // TODO: this in itself won't be enough
  symbolManager.offsetSymbols(filePath, line, offset);
});

connection.onRequest(
  "request/parseTads2Documents",
  async ({ globalStoragePath, mainFileLocation, filePaths, token }: any) => {
    serverState.tadsVersion = 2;
    await preprocessAndParseTads2Files(globalStoragePath, mainFileLocation, filePaths, token);
  },
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
connection.listen();

export async function searchTextForNounsAndReportToClient(path: any, position: any, text: any) {
  const preprocessedText = serverState.preprocessedFilesCacheMap.get(path);
  const array = preprocessedText?.split(/\r?\n/) ?? [];
  const line = array[position.line];

  connection.console.debug(`Analyzing: ${line} / ${text}`);

  if (line) {
    const tree = analyzeText(text);

    // Calculate where to best put the suggestions
    const symbol = symbolManager.findClosestSymbolKindByPosition(path, [SymbolKind.Object], position);
    if (symbol) {
      const level = symbolManager.additionalProperties.get(path)?.get(symbol)?.level + 1;
      //connection.console.debug(`Closest object symbol: ${symbol.name}, therefore range ${symbol.range}`);
      await connection.sendNotification("response/analyzeText/findNouns", {
        tree,
        range: symbol.range,
        level,
      });
    }
  }
}

function newFunction(handler: any) {
  return onHover(handler, documents, symbolManager);
}

export function analyzeText(text: string) {
  const tagger = posTagger();
  const tagged = tagger.tagSentence(text);
  const nnTagged = tagged.filter((x: any) => x.pos.startsWith("NN"));
  const uniqueValues = new Set(nnTagged.map((x: any) => x.value as string));
  return [...uniqueValues];
}

const regExp = /^(.*)_(in|out)$/;

function parseDirection(directionName: any): string | undefined {
  const result = regExp.exec(directionName);
  if (result) {
    switch (result[1]) {
      case "n":
        return "north";
      case "s":
        return "south";
      case "e":
        return "east";
      case "w":
        return "west";
      case "ne":
        return serverState.tadsVersion === 2 ? "ne" : "northeast";
      case "nw":
        return serverState.tadsVersion === 2 ? "nw" : "northwest";
      case "se":
        return serverState.tadsVersion === 2 ? "se" : "southeast";
      case "sw":
        return serverState.tadsVersion === 2 ? "sw" : "southwest";
    }
  }
  return undefined;
  //throw new Error(`Not a valid direction`);
}
