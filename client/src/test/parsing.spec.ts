/* eslint-disable @typescript-eslint/no-var-requires */
import { describe, expect, jest } from "@jest/globals";

jest.mock("vscode");
jest.mock("../extension", () => {
  return {
    setErrorDiagnostics: jest.fn(),
    client: {
      info: jest.fn(),
    },
  };
});

const { workspace, window } = require("vscode");

import { shouldAttemptInitialParse } from "../modules/parsing";

describe("parsing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    workspace.workspaceFolders = [{ uri: { fsPath: "/workspace" } }];
    window.activeTextEditor = undefined;
    workspace.findFiles.mockResolvedValue([]);
  });

  test("returns false when no workspace is open", async () => {
    workspace.workspaceFolders = undefined;

    expect(await shouldAttemptInitialParse()).toBeFalsy();
    expect(workspace.findFiles).not.toHaveBeenCalled();
  });

  test("returns true when active editor is a tads3 document", async () => {
    window.activeTextEditor = {
      document: {
        languageId: "tads3",
      },
    };

    expect(await shouldAttemptInitialParse()).toBeTruthy();
    expect(workspace.findFiles).not.toHaveBeenCalled();
  });

  test("returns true when a makefile exists in workspace", async () => {
    workspace.findFiles.mockResolvedValue([{ fsPath: "/workspace/Makefile.t3m" }]);

    expect(await shouldAttemptInitialParse()).toBeTruthy();
    expect(workspace.findFiles).toHaveBeenCalledWith("**/*.t3m", "**/{node_modules,.git}/**", 1);
  });

  test("returns false for non-tads workspace indicators", async () => {
    window.activeTextEditor = {
      document: {
        languageId: "typescript",
      },
    };
    workspace.findFiles.mockResolvedValue([]);

    expect(await shouldAttemptInitialParse()).toBeFalsy();
    expect(workspace.findFiles).toHaveBeenCalledWith("**/*.t3m", "**/{node_modules,.git}/**", 1);
  });
});
