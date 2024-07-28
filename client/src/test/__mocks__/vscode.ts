import { jest } from "@jest/globals";

const CancellationError = Error // jest.fn()

const Uri = {
  parse: jest.fn(),
  file: jest.fn(),
};
const window = {
  showInformationMessage: jest.fn(),
  showWarningMessage: jest.fn(),
  showErrorMessage: jest.fn(),
  showOpenDialog: jest.fn(),
  showQuickPick: jest.fn()
};
const workspace = {
  openTextDocument: jest.fn(),
  applyEdit: jest.fn(),
  getConfiguration: jest.fn().mockReturnValue({
    get: jest.fn(),
    update: jest.fn(),
  }),
  findFiles: jest.fn()
};

module.exports = { CancellationError, Uri, window, workspace };
