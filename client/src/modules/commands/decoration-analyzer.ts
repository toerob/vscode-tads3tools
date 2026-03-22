import { window } from "vscode";
import { client } from "../../extension";

export const findQuoteInStringRegExp = new RegExp(/["](.*)["]|['](.*)[']|["]{3}(.*)["]{3}|[']{3}(.*)[']{3}/);

export function analyzeTextAtPosition() {
  if (window.activeTextEditor.selection.isEmpty) {
    window.showInformationMessage(`Select something to analyse`);
  } else {
    const fsPath = window.activeTextEditor.document.uri.fsPath;
    const selection = window.activeTextEditor.selection;
    const position = selection.active;
    const selectedText = window.activeTextEditor.document.getText(selection);

    window.showInformationMessage(`Analyzing ${selectedText}`);
    client.sendRequest("request/analyzeText/findNouns", {
      path: fsPath,
      position: position,
      text: selectedText,
    });
  }
}
