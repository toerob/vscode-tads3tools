import { TextDocumentChangeEvent } from "vscode";
import { LanguageClient } from "vscode-languageclient/node";

export async function offsetSymbols(event: TextDocumentChangeEvent, client: LanguageClient) {
  // Take care of offsetting symbols if a change contains line breaks
  // Start from the bottom going upwards and applying offsets to the already parsed symbols
  for (const change of event.contentChanges) {
    let offset = change.range.start.line - change.range.end.line;
    if (offset === 0) {
      offset = change.text.match(/\r?\n/g)?.length ?? 0;
    }
    if (offset != 0) {
      // window.showInformationMessage(`Apply offset of ${offset} before/after line: ${change.range.start.line + 1}`);
      await client.sendRequest("request/offsetSymbols", {
        filePath: event.document.uri.fsPath,
        line: change.range.start.line,
        offset,
      });
    }
  }
}
