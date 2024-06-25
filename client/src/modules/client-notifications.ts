import { basename } from "path";
import { workspace, window, Uri, ViewColumn, DocumentSymbol, WebviewPanel } from "vscode";
import { LanguageClient } from "vscode-languageclient/node";
import { connectRoomsWithProperties } from "./visual-editor/map-editor-sync";
import { findNouns } from "./commands/find-nouns";
import { preprocessedFilesMap, getPersistedObjectPositions, getVisualEditor } from "../extension";
import { ExtensionStateStore } from "./state";

export function setupClientNotifications(
  client: LanguageClient,
  extensionState: ExtensionStateStore) {
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
  client.onNotification("response/foundsymbol", ({ symbol, filePath, postAction }): void => {
    if (symbol && filePath) {
      const selectedObject = symbol as DocumentSymbol; // keep track of the last selected object
      extensionState.selectedObject = selectedObject;
      workspace.openTextDocument(filePath).then((textDocument) => {
        window.showTextDocument(textDocument, {
          preserveFocus: true,
          selection: selectedObject.range,
          viewColumn: ViewColumn.One,
        });
      });
      // TODO: there's an issue here, due to all items being triggered with onRemoved whenever the map gets updated,
      // thus all rooms would be deleted in their textdocument's equivalence whenever that happens.
      /*.then(()=> {
                if(postAction === 'remove') {
                    client.info(`Removing via map is not yet implemented. `);
                    //editor.edit(editorBuilder => editorBuilder.delete(selectedObject.range));
                }
            });*/
    }
  });

  client.onNotification("response/preprocessed/file", ({ path, text }) => {
    preprocessedFilesMap.set(path, text);
    client.info(`Server response for ${path}: ` + text);
    workspace
      .openTextDocument({ language: "tads3", content: text })
      .then((doc) => window.showTextDocument(doc, ViewColumn.Beside));
  });

  client.onNotification("response/preprocessed/list", (fileNames: string[]) => {
    extensionState.setPreprocessing(false);
    extensionState.preprocessedList = fileNames;
  });

  client.onNotification("symbolparsing/success", async ([filePath, tracker, totalFiles, poolSize]) => {
    if (extensionState.allFilesBeenProcessed && !extensionState.isLongProcessingInAction()) {
      if (getVisualEditor()) {
        client.info(`Refreshing the map view`);
        await client.sendNotification("request/mapsymbols");
      }
    }
    const filename = basename(Uri.parse(filePath).path);
    if (extensionState.currentPreprocessAndParseProgress) {
      extensionState.currentPreprocessAndParseProgress.report({
        message: ` [threads: ${poolSize}] processed files => ${tracker}/${totalFiles}: ${filename}`,
      });
    }
    //progress.report({ message: ` [threads: ${poolSize}] processed files => ${tracker}/${totalFiles}: ${filename}` });
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
