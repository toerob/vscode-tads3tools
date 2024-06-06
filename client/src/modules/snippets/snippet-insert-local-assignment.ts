import {
  window, Position,
  SnippetString, Selection
} from "vscode";

export async function insertLocalAssignment(uri, snippetString, line, startPos, endPos) {
  const snippet = new SnippetString(snippetString);
  const editor = window.activeTextEditor;
  if (editor && editor.document.uri.toString() === uri.toString()) {
    const startPosition = new Position(line, startPos);
    const endPosition = new Position(line, endPos);
    const selection = new Selection(startPosition, endPosition);

    await editor.edit((ed) => ed.delete(selection));
    await editor.insertSnippet(snippet, startPosition);
  }
}
