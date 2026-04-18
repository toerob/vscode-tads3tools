/* eslint-disable @typescript-eslint/no-var-requires */
import { describe, expect } from "@jest/globals";
import { jest } from "@jest/globals";
import { mkdtempSync, writeFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

jest.mock("vscode");

jest.mock("../modules/state", () => {
  return {
    extensionState: {
      setUsingAdv3LiteStatus: jest.fn(),
    },
  };
});

import { isProjectFolderOpenInWorkspace } from "../modules/commands/create-template-project";
import {
  openGameFileWithTemplateSnippet,
  openPendingTemplateProjectFile,
} from "../modules/commands/create-template-project";

const { workspace, window, Uri } = require("vscode");

describe("create-template-project", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("isProjectFolderOpenInWorkspace returns true when folder is already open", () => {
    const projectFolder: any = { fsPath: "/workspace/mygame" };
    const workspaceFolders: any = [{ uri: { fsPath: "/workspace/mygame" } }];

    expect(isProjectFolderOpenInWorkspace(projectFolder, workspaceFolders)).toBeTruthy();
  });

  test("isProjectFolderOpenInWorkspace returns false when folder is not open", () => {
    const projectFolder: any = { fsPath: "/workspace/mygame" };
    const workspaceFolders: any = [{ uri: { fsPath: "/workspace/other" } }];

    expect(isProjectFolderOpenInWorkspace(projectFolder, workspaceFolders)).toBeFalsy();
  });

  test("isProjectFolderOpenInWorkspace returns false when workspace is undefined", () => {
    const projectFolder: any = { fsPath: "/workspace/mygame" };

    expect(isProjectFolderOpenInWorkspace(projectFolder, undefined)).toBeFalsy();
  });

  test("openGameFileWithTemplateSnippet opens file and inserts snippet", async () => {
    const insertSnippet: any = jest.fn().mockImplementation(async () => true);
    workspace.openTextDocument.mockResolvedValue({ uri: { fsPath: "/workspace/mygame/gameMain.t" } });
    window.showTextDocument.mockResolvedValue({ insertSnippet });

    await openGameFileWithTemplateSnippet({ fsPath: "/workspace/mygame/gameMain.t" } as any, "gameMain: ${1:thing}");

    expect(workspace.openTextDocument).toHaveBeenCalledWith("/workspace/mygame/gameMain.t");
    expect(window.showTextDocument).toHaveBeenCalled();
    expect(insertSnippet).toHaveBeenCalled();
  });

  test("openPendingTemplateProjectFile opens pending file and clears state", async () => {
    const testDir = mkdtempSync(join(tmpdir(), "tads3-template-test-"));
    const gameFilePath = join(testDir, "gameMain.t");
    writeFileSync(gameFilePath, "");

    const insertSnippet: any = jest.fn().mockImplementation(async () => true);
    workspace.openTextDocument.mockResolvedValue({ uri: { fsPath: gameFilePath } });
    window.showTextDocument.mockResolvedValue({ insertSnippet });
    Uri.parse.mockReturnValue({ fsPath: gameFilePath });

    const globalState = {
      get: jest.fn().mockReturnValue({
        gameFileUri: "file:///ignored",
        snippet: "gameMain: ${1:thing}",
      }),
      update: jest.fn().mockImplementation(async () => undefined),
    };

    await openPendingTemplateProjectFile({ globalState } as any);

    expect(globalState.update).toHaveBeenCalledWith("tads3.pendingTemplateProjectFileOpen", undefined);
    expect(workspace.openTextDocument).toHaveBeenCalledWith(gameFilePath);
    expect(insertSnippet).toHaveBeenCalled();
  });
});
