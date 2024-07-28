/* eslint-disable @typescript-eslint/no-var-requires */
import { expect, describe, jest } from "@jest/globals";
import { basename } from "path";

jest.mock("vscode");
jest.mock("vscode-languageclient", () => {
  return {
    LanguageClientOptions: jest.fn(),
    ServerOptions: jest.fn(),
    TransportKind: jest.fn(),
  };
});
jest.mock("../../src/extension", () => {
  return {
    setErrorDiagnostics: jest.fn(),
    client: {
      info: jest.fn(),
    },
  };
});
jest.mock("../modules/select-makefile-dialog", () => {
  return {
    selectMakefileWithDialog: jest.fn(),
  };
});

const { window, workspace } = require("vscode");
const { selectMakefileWithDialog } = require("../modules/select-makefile-dialog");

import { findAndSelectMakefileUri } from "../modules/makefile-utils";

describe("makefile-utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findAndSelectMakefileUri", () => {
    test("uses the one makefile found without dialogs if the result is singular", async () => {
      // Arrange
      const filename = "foundmakefile";
      workspace.findFiles.mockResolvedValue([filename]);

      // Act
      const result = await findAndSelectMakefileUri();

      // Assert
      expect(window.showInformationMessage).toBeCalledTimes(0);
      expect(window.showInformationMessage).toBeCalledTimes(0);
      expect(window.showErrorMessage).toBeCalledTimes(0);
      expect(selectMakefileWithDialog).toBeCalledTimes(0);
      expect(result).toBe(filename);
    });

    test("uses the shortest path if result is more than one and no default Makefile.t3m is found", async () => {
      // Arrange
      const file1 = { path: "foundmakefile1.t3m", fsPath: "/foundmakefile1.t3m" };
      const file2 = { path: "subjproject/foundmakefile1.t3m", fsPath: "subjproject/foundmakefile1.t3m" };
      workspace.findFiles.mockResolvedValue([file1, file2]);

      // Act
      const result = await findAndSelectMakefileUri();

      // Assert
      expect(window.showInformationMessage).toBeCalledTimes(1);
      expect(window.showInformationMessage).toBeCalledWith(`Using first found makefile in project`);
      expect(selectMakefileWithDialog).toBeCalledTimes(0);
      expect(result).toBe(file1);
    });

    test("uses the Makefile.t3m with the shortest path if found among the result", async () => {
      // Arrange
      const file0 = { path: "Makefile.t3m", fsPath: "Makefile.t3m" };
      const file1 = { path: "subjproject/ExtraMakefile.t3m", fsPath: "subjproject/ExtraMakefile.t3m" };
      const file2 = { path: "subjproject/Makefile.t3m", fsPath: "subjproject/Makefile.t3m" };
      workspace.findFiles.mockResolvedValue([file0, file1, file2]);

      // Act
      const result = await findAndSelectMakefileUri();

      // Assert
      expect(window.showInformationMessage).toBeCalledTimes(1);
      expect(window.showInformationMessage).toBeCalledWith(`Using first found makefile in project`);
      expect(selectMakefileWithDialog).toBeCalledTimes(0);
      expect(result).toBe(file0);
    });

    test("uses the Makefile.t3m with the shortest path (win32) if found among the result", async () => {
      // Arrange
      const file1 = { path: "subjproject\\subcatalog\\Makefile.t3m", fsPath: "subjproject\\subcatalog\\Makefile.t3m" };
      const file2 = { path: "subjproject\\Makefile.t3m", fsPath: "subjproject\\Makefile.t3m" };
      workspace.findFiles.mockResolvedValue([file1, file2]);

      Object.defineProperty(process, "platform", {
        value: "win32",
      });
      // Act
      const result = await findAndSelectMakefileUri();

      // Assert
      expect(window.showInformationMessage).toBeCalledTimes(1);
      expect(window.showInformationMessage).toBeCalledWith(`Using first found makefile in project`);
      expect(selectMakefileWithDialog).toBeCalledTimes(0);
      expect(result).toBe(file2);
    });
  });

  test("asks with modal (if 'ask' is on) if several makefiles is found which file to select", async () => {
    // Arrange
    const file0 = { path: "Makefile.t3m", fsPath: "Makefile.t3m" };
    const file1 = { path: "subjproject/ExtraMakefile.t3m", fsPath: "subjproject/ExtraMakefile.t3m" };
    const file2 = { path: "subjproject/Makefile.t3m", fsPath: "subjproject/Makefile.t3m" };

    workspace.findFiles.mockResolvedValue([file0, file1, file2]);
    window.showQuickPick.mockResolvedValue(basename(file1.path)); // Decide on the file1 option when asked

    // Act
    const result = await findAndSelectMakefileUri(true);

    // Assert
    expect(window.showInformationMessage).toBeCalledWith(`Select which Makefile the project uses`);
    expect(window.showQuickPick).toBeCalledWith(["Makefile.t3m", "ExtraMakefile.t3m"]);
    expect(selectMakefileWithDialog).toBeCalledTimes(0);
    expect(result).toBe(file1);
  });

  test("asks with modal (if 'ask' is on) if several makefile is found", async () => {
    // Arrange
    workspace.findFiles.mockResolvedValue([]);

    const chosenFile = "the chosen one";
    selectMakefileWithDialog.mockResolvedValue(chosenFile);

    // Act
    const result = await findAndSelectMakefileUri(true);

    // Assert
    expect(selectMakefileWithDialog).toBeCalledTimes(1);
    expect(result).toBe(chosenFile);
  });
});
