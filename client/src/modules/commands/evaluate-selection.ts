import { window } from "vscode";
import { LanguageClient } from "vscode-languageclient/node";

export async function evaluateSelection(client: LanguageClient): Promise<void> {
  const editor = window.activeTextEditor;
  if (!editor) return;

  const selection = editor.selection;
  const text = editor.document.getText(selection.isEmpty ? undefined : selection);
  if (!text?.trim()) {
    window.showWarningMessage("TADS3: No text selected to evaluate.");
    return;
  }

  const { result } = await client.sendRequest<{ result: string }>(
    "request/evaluateSelection",
    { text },
  );

  window.showInformationMessage(`TADS3 eval: ${result}`);
}
