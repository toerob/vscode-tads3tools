import * as assert from "assert";
import { activate, getDocPath, getDocUri } from "./helper";
import { Location, Position, Selection, Uri, commands, window, workspace } from "vscode";
import { client } from "../extension";
import { promisify } from "util";
import { ensureSingleRootWorkspace, triggerParseBySave } from "./test-utils";
import { extensionState } from "../modules/state";

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

  teardown(async () => {
    await commands.executeCommand("workbench.action.closeAllEditors");
    const folders = workspace.workspaceFolders ?? [];
    if (folders.length > 0) {
      workspace.updateWorkspaceFolders(0, folders.length);
    }
    extensionState.setChosenMakefileUri(undefined);
  });

  test("Test go to definition", async () => {
    const uri = getDocUri("definitions/definitions.t");
    //await ensureSingleRootWorkspace(Uri.file(getDocPath("definitions")), "definitions");

    await activate(uri);

    extensionState.setUsingTads2(false);
    extensionState.setChosenMakefileUri(getDocUri("definitions/Makefile.t3m"));

    await triggerParseBySave(uri);
    await awaitParsing();

    const document = await workspace.openTextDocument(uri);
    const editor = await window.showTextDocument(document);

    editor.selection = new Selection(new Position(9, 11), new Position(9, 15));
    const targetPosition = new Position(9, 11);

    const definitions = (await commands.executeCommand(
      "vscode.executeDefinitionProvider",
      uri,
      targetPosition,
    )) as Location[];

    assert.ok(definitions && definitions.length > 0, "Expected at least one definition result");
    assert.equal(definitions[0].range.start.line, 5);
  });
});

