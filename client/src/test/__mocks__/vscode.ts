import { jest } from "@jest/globals";

const CancellationError = jest.fn();
const Uri = {
  parse: jest.fn(),
  file: jest.fn(),
};
const window = {
  showInformationMessage: jest.fn(),
  showWarningMessage: jest.fn(),
  showErrorMessage: jest.fn(),
};
const workspace = {
  openTextDocument: jest.fn(),
  applyEdit: jest.fn(),
  getConfiguration: jest.fn().mockReturnValue({
    get: jest.fn(),
    update: jest.fn(),
  }),
};

module.exports = { CancellationError, Uri, window, workspace };
