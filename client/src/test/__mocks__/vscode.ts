import { jest } from "@jest/globals";

import path = require("path");

const CancellationError = Error; // jest.fn()

const Uri = {
  parse: jest.fn(),
  file: jest.fn(),
  joinPath: jest.fn().mockImplementation(() => {
    return {
      parse: jest.fn(),
    };
  }),
};
class Position {
  constructor(
    public line: number,
    public character: number,
  ) {}
}
class SnippetString {
  value: string;
  constructor(value: string) {
    this.value = value;
  }
}
const window = {
  showInformationMessage: jest.fn(),
  showWarningMessage: jest.fn(),
  showErrorMessage: jest.fn(),
  showOpenDialog: jest.fn(),
  showQuickPick: jest.fn(),
  showTextDocument: jest.fn(),
};
const workspace = {
  openTextDocument: jest.fn(),
  applyEdit: jest.fn(),
  getConfiguration: jest.fn().mockReturnValue({
    get: jest.fn(),
    update: jest.fn(),
  }),
  findFiles: jest.fn(),
};
const commands = {
  executeCommand: jest.fn(),
};

module.exports = { CancellationError, Uri, Position, SnippetString, window, workspace, commands };
