import { jest } from "@jest/globals";
import { TextDocument } from "vscode-languageserver-textdocument";

export function setupTextDocuments(fileName: string, fileContent: string): any {
  return {
    get(uri: string) {
      return TextDocument.create(fileName, "tads3", 0, fileContent);
    },
  };
}

// Mocking needed to run tests isolated
export function setupMockedEnvironment() {
  jest.mock("vscode-languageserver/node", () => {
    return {
      createConnection: jest.fn().mockImplementation(() => {
        return {
          console: {
            debug: jest.fn(),
          },

          onInitialize: jest.fn(),
          onInitialized: jest.fn(),
          onDidChangeConfiguration: jest.fn(),
          onDidChangeWatchedFiles: jest.fn(),
          listen: jest.fn(),
          onRequest: jest.fn(),

          // Providers
          onCodeAction: jest.fn(),
          onWorkspaceSymbol: jest.fn(),
          onDocumentSymbol: jest.fn(),
          onReferences: jest.fn(),
          onDefinition: jest.fn(),
          onCompletion: jest.fn(),
          onDocumentLinks: jest.fn(),
          onCodeLens: jest.fn(),
          onHover: jest.fn(),
          onDocumentFormatting: jest.fn(),
          onDocumentRangeFormatting: jest.fn(),
          onImplementation: jest.fn(),
          onSignatureHelp: jest.fn(),
        };
      }),
      ProposedFeatures: {
        all: jest.fn(),
      },
      TextDocuments: jest.fn().mockImplementation(() => {
        return {
          onDidClose: jest.fn(),
          onDidChangeContent: jest.fn(),
          onWillSave: jest.fn(),
          listen: jest.fn(),
        };
      }),
    };
  });
}
