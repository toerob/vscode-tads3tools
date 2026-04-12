// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import * as assert from "assert";
import * as path from "path";
import { activate, getDocUri } from "./helper";
import { downloadAndInstallExtension } from "../modules/commands/ifarchive-extensions";
import { extensionState } from "../modules/state";
import * as vscode from "vscode";

suite("Ifarchive Extensions Integration", () => {
  teardown(async () => {
    await vscode.commands.executeCommand("workbench.action.closeAllEditors");
    const folders = vscode.workspace.workspaceFolders ?? [];
    if (folders.length > 0) {
      vscode.workspace.updateWorkspaceFolders(0, folders.length);
    }
    extensionState.setChosenMakefileUri(undefined);
  });

  test("happy path installs and unzips selected archive", async () => {
    const makefileUri = getDocUri("definitions/Makefile.t3m");
    await activate(makefileUri);

    extensionState.setUsingTads2(false);
    extensionState.setChosenMakefileUri(makefileUri);
    extensionState.extensionCacheDirectory = "/cache";

    let quickPickCalls = 0;
    let shownInfoMessage = "";
    let shownErrorMessage = "";
    let extractPath = "";
    let unzipZipPath = "";

    const copiedFiles: Array<[string, string]> = [];
    const writerHandlers: Record<string, () => void> = {};

    const runtimeOverrides: any = {
      getConfiguration: () =>
        ({
          get: () => "https://example.com/contrib/",
        }) as any,
      axiosGet: async () => ({
        data: "#demo.zip\nDemo extension",
      }),
      showQuickPick: async () => {
        quickPickCalls++;
        return ["demo.zip"];
      },
      showInformationMessage: async (message: any) => {
        shownInfoMessage = String(message);
        return { title: "Install" } as any;
      },
      showErrorMessage: async (message: any) => {
        shownErrorMessage = String(message);
        return undefined;
      },
      existsSync: () => false,
      ensureDirSync: () => undefined,
      readdirSync: () => [],
      createWriteStream: () =>
        ({
          on: (event: string, handler: () => void) => {
            writerHandlers[event] = handler;
            return undefined as any;
          },
          close: () => undefined,
        }) as any,
      axiosRequest: async () => ({
        data: {
          pipe: () => queueMicrotask(() => writerHandlers.close?.()),
        },
      }),
      copyFileSync: (from: any, to: any) => {
        copiedFiles.push([String(from), String(to)]);
      },
      createReadStream: (zipPath: string) => {
        unzipZipPath = zipPath;
        return {
          on: (event: string, handler: () => void) => {
            if (event === "open") {
              handler();
            }
            return undefined as any;
          },
          pipe: () => undefined,
        } as any;
      },
      extract: (opts: { path: string }) => {
        extractPath = opts.path;
        return {} as any;
      },
    };

    await downloadAndInstallExtension({} as any, runtimeOverrides);

    const makefileDir = path.dirname(makefileUri.fsPath);
    const downloadedFile = path.join(makefileDir, "demo.zip");

    assert.equal(quickPickCalls, 1);
    assert.ok(shownInfoMessage.includes("demo.zip"));
    assert.equal(shownErrorMessage, "");
    assert.deepEqual(copiedFiles, [[downloadedFile, "/cache/demo.zip"]]);
    assert.equal(unzipZipPath, downloadedFile);
    assert.equal(extractPath, path.join(makefileDir, "demo"));
  });
});