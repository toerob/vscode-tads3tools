import * as assert from "assert";
import { activate, getDocUri } from "./helper";
import { Position, Selection, commands, window, workspace } from "vscode";
import { client } from "../extension";
import { promisify } from "util";

const awaitParsing = () => {
  return new Promise<void>((resolve) => {
    const disposable = client.onNotification("symbolparsing/allfiles/success", async ({ elapsedTime }) => {
      disposable.dispose();
      resolve();
    });
  });
};

export const asyncSetTimeout = promisify(setTimeout);

// TODO: Work in progress
suite.skip("Go-to-definition Test Suite", () => {
  window.showInformationMessage("Start Go-to-definition tests.");

  test("Test go to definition", async () => {
    const uri = getDocUri("definitions/definitions.t");
    await activate(uri);

    const document = await workspace.openTextDocument(uri);
    const editor = await window.showTextDocument(document);

    editor.selection = new Selection(new Position(9, 10), new Position(9, 14));
    const definitionPosition = editor.selection.active;

    await commands.executeCommand("editor.action.goToTypeDefinition");

    await asyncSetTimeout(2000);
    assert.equal(definitionPosition.line, 5);
  });
});
