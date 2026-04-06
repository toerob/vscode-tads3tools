import { basename } from "path";
import { commands, workspace, window, Uri, ViewColumn, DocumentSymbol, WebviewPanel, Range } from "vscode";
import { LanguageClient } from 'vscode-languageclient/node';
import { connectRoomsWithProperties } from "./visual-editor/map-editor-sync";
import { findNouns } from "./commands/find-nouns";
import { getPersistedObjectPositions, getVisualEditor } from "../extension";
import { ExtensionStateStore } from "./state";
import { PREPROCESS_URI, showVirtualDocument } from './virtual-documents';

export function setupClientNotifications(client: LanguageClient, extensionState: ExtensionStateStore) {
  client.onNotification("response/extractQuotes", (payload) => {
    workspace
      .openTextDocument({
        language: "tads3",
        content: payload.resultArray.join("\n"),
      })
      .then((doc) => window.showTextDocument(doc, ViewColumn.Beside));
  });

  client.onNotification("response/makefile/keyvaluemap", ({ makefileStructure, usingAdv3Lite }) => {
    // A map can't be used here since there might be several identical keys
    //extensionState.makefileKeyMapValues = new Map<string,string>(makefileStructure.map(i => [i.key, i.value] ));
    extensionState.makefileKeyMapValues = makefileStructure;
    extensionState.setUsingAdv3LiteStatus(usingAdv3Lite);

    const makefileDefinitionsRaw = makefileStructure
                                    .filter((x) => x.key === "-D")
                                    .map((x) => x.value.split("="));

    extensionState.makefileDefinitions = new Map(makefileDefinitionsRaw);
    
  });

  client.onNotification("response/connectrooms", async ({ fromRoom, toRoom, validDirection1, validDirection2 }) => {
    client.info(
      `Connect from  ${fromRoom.symbol.name}  (${fromRoom.filePath}) to ${toRoom.symbol.name} (${toRoom.filePath}) via ${validDirection1 / validDirection2} to (${toRoom.filePath})?`,
    );
    await connectRoomsWithProperties(fromRoom, toRoom, validDirection1, validDirection2);
  });

  client.onNotification("response/analyzeText/findNouns", findNouns);

  client.onNotification("response/mapsymbols", (symbols) => {
    const visualEditorPanel = getVisualEditor();
    if (visualEditorPanel && symbols && symbols.length > 0) {
      client.info(`Updating webview with new symbols`);
      try {
        overridePositionWithPersistedCoordinates(symbols, extensionState);
        visualEditorPanel.webview.postMessage({
          command: "tads3.addNode",
          objects: symbols,
        });
      } catch (err) {
        console.error(err);
      }
    }
  });

  // This is used by the map handler:
  // If the client has asked the server to locate a symbol,
  // The server responds by sending the client the symbol and filepath back
  // The postAction is something the client originally defines
  // and is supposed to be brought into action here.
  // It is done this way so request/findsymbol can be reused for different purposes
  client.onNotification("response/foundsymbol", async ({ symbol, filePath, postAction }): Promise<void> => {
    if (symbol && filePath) {
      const selectedObject = symbol as DocumentSymbol; // keep track of the last selected object
      extensionState.selectedObject = selectedObject;

      const textDocument = await workspace.openTextDocument(filePath);
      const editor = await window.showTextDocument(textDocument, {
        preserveFocus: true,
        selection: selectedObject.range,
        viewColumn: ViewColumn.One,
      });

      if (postAction === "remove") {
        const doc = editor.document;
        const start = selectedObject.range.start;
        const endLine = Math.min(selectedObject.range.end.line, doc.lineCount - 1);
        const end = doc.lineAt(endLine).rangeIncludingLineBreak.end;
        const deleteRange = new Range(start, end);

        await editor.edit((builder) => builder.delete(deleteRange));
        const saved = await editor.document.save();

        if (saved) {
          await client.sendNotification("request/mapsymbols");
        }
      }
    }
  });

  client.onNotification("response/preprocessed/file", ({ path, text }) => {
    extensionState.preprocessedFilesMap.set(path, text);
    client.info(`Server response for ${path}: ` + text);
    
    showVirtualDocument(PREPROCESS_URI, text, window.activeTextEditor?.selection);
      

    });

  client.onNotification("response/preprocessed/list", (fileNames: string[]) => {
    extensionState.setPreprocessing(false);
    extensionState.preprocessedList = fileNames;
  });

  client.onNotification("symbolparsing/processing", async ([filePath, tracker, totalFiles, poolSize, inFlightFiles]) => {
    const filename = basename(Uri.parse(filePath).path);
    if (extensionState.currentPreprocessAndParseProgress) {
      const inFlightStr = inFlightFiles?.length > 0
        ? ` [active: ${inFlightFiles.join(", ")}]`
        : '';
      extensionState.currentPreprocessAndParseProgress.report({
        message: ` [threads: ${poolSize}] parsing ${tracker + 1}/${totalFiles}: ${filename}...${inFlightStr}`,
      });
    }
  });

  client.onNotification("symbolparsing/success", async ([filePath, tracker, totalFiles, poolSize, inFlightFiles]) => {
    if (extensionState.allFilesBeenProcessed && !extensionState.isLongProcessingInAction()) {
      if (getVisualEditor()) {
        client.info(`Refreshing the map view`);
        await client.sendNotification("request/mapsymbols");
      }
    }
    const filename = basename(Uri.parse(filePath).path);
    if (extensionState.currentPreprocessAndParseProgress) {
      const inFlightStr = inFlightFiles?.length > 0
        ? ` [active: ${inFlightFiles.join(", ")}]`
        : '';
      extensionState.currentPreprocessAndParseProgress.report({
        message: ` [threads: ${poolSize}] processed files => ${tracker}/${totalFiles}: ${filename}${inFlightStr}`,
      });
    }
  });

  client.onNotification("symbolparsing/allfiles/success", async ({ elapsedTime }) => {
    if (extensionState.isLongProcessingInAction()) {
      window.showInformationMessage(`All project and library files are now parsed (elapsed time: ${elapsedTime} ms)`);
    } else {
      client.info(`File parsed (elapsed time: ${elapsedTime} ms)`);
    }
    await client.sendNotification("request/mapsymbols");
    extensionState.setLongProcessing(false);
    extensionState.allFilesBeenProcessed = true;

    // Force VS Code to refresh document symbols (outline) for the active editor,
    // in case the initial request returned empty before parsing completed.
    const activeEditor = window.activeTextEditor;
    if (activeEditor) {
      commands.executeCommand("vscode.executeDocumentSymbolProvider", activeEditor.document.uri);
    }
  });

  client.onNotification("symbolparsing/allfiles/failed", ({ error }) => {
    window.showErrorMessage(
      `Parsing all files via makefile ${basename(extensionState.getChosenMakefileUri().fsPath)} failed: ${error} `,
      { modal: true },
    );
    extensionState.setLongProcessing(false);
    extensionState.setPreprocessing(false);
    extensionState.allFilesBeenProcessed = false;
  });
}

export function overridePositionWithPersistedCoordinates(mapObjects: any[], extensionState: ExtensionStateStore) {
  const itemsToPersist = [];
  for (const node of mapObjects) {
    const persistedPosition = getPersistedObjectPositions().get(node.name);
    if (persistedPosition) {
      //console.log(`${node.name} has persisted position: ${persistedPosition[0]}/${persistedPosition[1]}`);
    }
    if (persistedPosition && persistedPosition.length === 2) {
      const x = persistedPosition[0];
      const y = persistedPosition[1];
      if (x && y) {
        node.x = x;
        node.y = y;
        node.hasAbsolutePosition = true;
        itemsToPersist.push(node);
      }
    }
  }
  if (itemsToPersist.length > 0) {
    extensionState.storageManager.setValue("persistedMapObjectPositions", itemsToPersist);
  }
}
