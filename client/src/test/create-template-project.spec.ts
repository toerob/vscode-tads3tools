/* eslint-disable @typescript-eslint/no-var-requires */
import { describe, expect } from "@jest/globals";
import { jest } from "@jest/globals";

jest.mock("vscode");

jest.mock("../modules/state", () => {
  return {
    extensionState: {
      setUsingAdv3LiteStatus: jest.fn(),
    },
  };
});

import { isProjectFolderOpenInWorkspace } from "../modules/commands/create-template-project";

describe("create-template-project", () => {
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
});
