import { TextDocumentChangeEvent } from "vscode";
import { client } from '../extension';

export async function offsetSymbols(event: TextDocumentChangeEvent) {
  // Take care of offsetting symbols if a change contains line breaks
  // Start from the bottom going upwards and applying offsets to the already parsed symbols
  for (const change of event.contentChanges) {
    let offset = change.range.start.line - change.range.end.line;
    if (offset === 0) {
      offset = change.text.match(/\r?\n/g)?.length ?? 0;
    }
    if (offset != 0) {
      // Note: Keeping this for debugging purposes:
      // const msg =`Apply offset of ${offset} before/after line: ${change.range.start.line + 1}`;
      // window.showInformationMessage(msg);
      await client.sendRequest("request/offsetSymbols", {
        filePath: event.document.uri.fsPath,
        line: change.range.start.line,
        offset,
      });
    }
  }
}
