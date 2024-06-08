import { ExtensionContext, window } from "vscode";
import { client } from "../../extension";

export async function extractAllQuotes(context: ExtensionContext) {
  const files = await window.showQuickPick(["All project files", "current file"]);
  const types = await window.showQuickPick(["both", "double", "single"]);

  if (files.startsWith("current")) {
    const text = window.activeTextEditor.document.getText();
    const fsPath = window.activeTextEditor.document.uri.fsPath;
    await client.sendRequest("request/extractQuotes", { types, text, fsPath });
    return;
  }
  await client.sendRequest("request/extractQuotes", { types });
}
