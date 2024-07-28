/* eslint-disable @typescript-eslint/no-var-requires */

import { expect, describe, jest } from "@jest/globals";
import { resolve } from "path";

jest.mock("../modules/run-command", () => ({
  runCommand: jest.fn(),
}));

const { runCommand } = require("../modules/run-command");

import {
  validateCompilerPath,
  validateMakefile,
  validatePreprocessorPath,
  validateUserSettings,
  validateTads2Settings,
} from "../modules/validations";

import { Uri } from "vscode";
const { window, workspace } = require("vscode");

describe("validations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("validateUserSettings with the wrong/path shows an error message to the user", async () => {
    // Arrange
    const compilerPath = "wrong/path";
    const config = workspace.getConfiguration("tads3");
    config.get.mockReturnValue(compilerPath);
    runCommand.mockResolvedValue("");

    // Act, Assert
    expect(await validateUserSettings()).toBeFalsy();
    expect(window.showErrorMessage).toBeCalledTimes(1);
  });

  test("validateCompilerPath with correct path results succesfully and show success message to the user", async () => {
    // Arrange
    const compilerPath = "correct/path";
    const config = workspace.getConfiguration("tads3");
    config.get.mockReturnValue(compilerPath);

    runCommand.mockResolvedValue(
      "TADS Compiler 3.1.3  Copyright 1999, 2012 Michael J. Roberts... and more text that follows",
    );

    //Act, Assert
    expect(await validateCompilerPath("t3make")).toBeTruthy();
    expect(window.showErrorMessage).not.toBeCalled();
    expect(window.showInformationMessage).toBeCalledTimes(1);
  });

  test("validateCompilerPath with wrong path resulting empty string fails validation", async () => {
    // Arrange
    runCommand.mockResolvedValue("");

    //Act, Assert
    expect(await validateCompilerPath("wrong/path/to/t3make")).toBeFalsy();
    expect(window.showErrorMessage).toBeCalledTimes(1);
    expect(window.showInformationMessage).not.toBeCalled();
  });

  test("validatePreprocessorPath with correct path succeeds validation and shows a info message", async () => {
    // Act, Assert
    runCommand.mockResolvedValue('"Copyright (C) - Got some successful results!"');
    expect(await validatePreprocessorPath("t3make")).toBeTruthy();
    expect(window.showInformationMessage).toBeCalledTimes(1);
    expect(window.showErrorMessage).not.toBeCalled();
  });

  test("validatePreprocessorPath with wrong path fails validation and shows an error message", async () => {
    // Act, Assert
    runCommand.mockResolvedValue("");
    expect(await validatePreprocessorPath("t3make")).toBeFalsy();
    expect(window.showErrorMessage).toBeCalledTimes(1);
    expect(window.showInformationMessage).not.toBeCalled();
  });

  test("validateTads2Settings succeeds validation of preprocessor/compiler path and shows no information messages", async () => {
    // Arrange
    const preprocessorPath = "correct/preprocessor/path";
    const compilerPath = "correct/compiler/path";
    const config1 = workspace.getConfiguration("tads");
    config1.get.mockReturnValue(preprocessorPath);

    const config2 = workspace.getConfiguration("tads2");
    config2.get.mockReturnValue(compilerPath);
    runCommand.mockResolvedValue(
      "TADS Compiler 3.1.3  Copyright 1999, 2012 Michael J. Roberts... and more text that follows",
    );

    // Act, Assert
    expect(await validateTads2Settings()).toBeTruthy();
    expect(window.showInformationMessage).toBeCalledTimes(0);
    expect(window.showErrorMessage).not.toBeCalled();
  });

  describe("validateMakefile", () => {
    const validMakefile = `
    -D LANGUAGE=en_us
    -D MESSAGESTYLE=neu
    -Fy obj
    -Fo obj
    -FI /usr/local/share/frobtads/tads3/include
    -FL /usr/local/share/frobtads/qtads3/lib
    -w0
    -v
    -d
    -source definitions.t

    -res
    GameInfo.txt
    `;

    test("validateMakefile validates with valid makefile", async () => {
      // Arrange
      workspace.openTextDocument.mockResolvedValue({
        getText: jest.fn().mockReturnValue(validMakefile),
      });
      // Act, Assert
      expect(async () => await validateMakefile(Uri.parse("mocking/requires/no/need/for/real/path"))).not.toThrow();
      expect(window.showWarningMessage).not.toBeCalled();
    });

    test("validateMakefile throws CancellationError with invalid makefile missing a '-Fy' row", async () => {
      // Arrange
      function removeRowMatching(match: RegExp, text: string) {
        const rows = text.split(/\n/);
        const newRows = [];
        for (const row of rows) {
          if (!row.match(match)) {
            newRows.push(row);
          }
        }
        return newRows.join("\n");
      }

      const invalidMakefile = removeRowMatching(/\s*[-]Fy/, validMakefile);
      workspace.openTextDocument.mockResolvedValue({
        getText: jest.fn().mockReturnValue(invalidMakefile),
        Uri: jest.fn().mockImplementation(() => {
          return {
            parse: jest.fn().mockReturnValue({ path: "path" }),
          };
        }),
      });

      // Take note that this file contents isn't used within validateMakefile, since that content is mocked
      // but a real path is needed for the error message to work
      const uri: any = { path: resolve("resources/Makefile.t3m") };

      // Act, Assert
      try {
        await validateMakefile(uri);
      } catch (err) {}
      expect(window.showWarningMessage).toBeCalledTimes(1);
    });
  });
});
