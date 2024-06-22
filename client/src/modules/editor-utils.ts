import { window, Range, ViewColumn, TextDocument, workspace } from "vscode";
import { LanguageClient } from "vscode-languageclient/node";
import { ExtensionStateStore } from "./state";

export function showAndScrollToRange(document: TextDocument, range: Range) {
  const activeEditor = window.activeTextEditor;
  window
    .showTextDocument(document, {
      viewColumn: ViewColumn.Beside,
      preserveFocus: true,
      preview: true,
      selection: range,
    })
    .then((shownDoc) => {
      shownDoc.revealRange(range);
      activeEditor.revealRange(range);
    });
}

export function showCurrentAsPrep(client: LanguageClient) {
  const fsPath = window.activeTextEditor.document.uri.fsPath;
  client.sendRequest("request/preprocessed/file", { path: fsPath });
}

export function showPreprocessedFileQP(extensionState: ExtensionStateStore, client) {
  window
    .showQuickPick(extensionState.preprocessedList)
    .then((choice) => client.sendRequest("request/preprocessed/file", { path: choice }));
}

export function openProjectFileQuickPick(extensionState: ExtensionStateStore, workspace) {
  window
    .showQuickPick(extensionState.preprocessedList)
    .then((p) => p && workspace.openTextDocument(p))
    .then(window.showTextDocument);
}
