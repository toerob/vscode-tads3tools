import { setupMockedEnvironment, setupTextDocuments } from "./test-utilities";

setupMockedEnvironment();

import { Range, DocumentSymbol, SymbolKind, Position } from "vscode-languageserver";
import { TadsSymbolManager } from "../../src/modules/symbol-manager";
import { onSignatureHelp } from "../../src/modules/signature-helper";
import { preprocessedFilesCacheMap } from "../../src/server";
import { jest, expect } from "@jest/globals";

import { readFileSync } from "fs";
import { resolve } from "path";

jest.mock("../../src/modules/documentation", () => {
  return {
    retrieveDocumentationForKeyword: jest.fn().mockReturnValue("Mocked documentation"),
  };
});

describe("Definition Provider Test Suite", () => {
  let sm: TadsSymbolManager;
  let textDocuments: any;
  let fileName: string;
  let absolutePathToTadsFile: string;
  let fileContent: string;

  beforeEach(() => {
    fileName = "tests/t3testgames/standalone/functions.t";
    absolutePathToTadsFile = resolve(fileName);
    fileContent = readFileSync(absolutePathToTadsFile).toString();

    textDocuments = setupTextDocuments("/text.txt", fileContent);
    preprocessedFilesCacheMap.set(absolutePathToTadsFile, fileContent); // onSignatureHelp uses the preprocessed document, so this needs to be prepped as well, no diff in this case

    // Prepares a 'Thing' class that can be looked up via the symbol manager,
    // this assumes the file has the same position for a defined function called functionHead.
    // (It is located in 'functions.t' on the second line.)
    const { symbol, parameters } = mockSymbolWithParameters("functionHead", 2, "x", "y", "z");

    sm = new TadsSymbolManager();

    sm.symbolParameters.set(absolutePathToTadsFile, new Map([[symbol.name, parameters]]));
    sm.symbols.set(absolutePathToTadsFile, [symbol]);
  });

  it("It suggests a signature based on the where the cursor is located in a parameterless function invocation", async () => {
    const result = await onSignatureHelp(
      { textDocument: { uri: absolutePathToTadsFile }, position: Position.create(7 - 1, 15) },
      textDocuments,
      sm,
    );
    expect(result).toStrictEqual({
      signatures: [
        {
          label: "function functionHead(x,y,z)",
          documentation: "Mocked documentation",
          parameters: [{ label: "x" }, { label: "y" }, { label: "z" }],
        },
      ],
      activeSignature: 0,
      activeParameter: 0, // Cursor currently at no parameter - the method is still empty
    });
  });

  it("It suggests a signature based in a method function invocation of one added parameter", async () => {
    const result = await onSignatureHelp(
      { textDocument: { uri: absolutePathToTadsFile }, position: Position.create(8 - 1, 16) },
      textDocuments,
      sm,
    );
    expect(result).toStrictEqual({
      signatures: [
        {
          label: "function functionHead(x,y,z)",
          documentation: "Mocked documentation",
          parameters: [{ label: "x" }, { label: "y" }, { label: "z" }],
        },
      ],
      activeSignature: 0,
      activeParameter: 1, // Cursor currently at the first parameter - the cursor is located on the ',' after the 1st parameter
    });
  });

  it("It suggests a signature based in a method function invocation of two added parameters", async () => {
    const result = await onSignatureHelp(
      { textDocument: { uri: absolutePathToTadsFile }, position: Position.create(9 - 1, 18) },
      textDocuments,
      sm,
    );
    expect(result).toStrictEqual({
      signatures: [
        {
          label: "function functionHead(x,y,z)",
          documentation: "Mocked documentation",
          parameters: [{ label: "x" }, { label: "y" }, { label: "z" }],
        },
      ],
      activeSignature: 0,
      activeParameter: 2, // Cursor currently at the first parameter - the cursor is located on the ',' after the 2nd parameter
    });
  });
});

function mockSymbolWithParameters(name: string, line: number, ...params: string[]) {
  const symbolDefRange = Range.create(line, 0, line, 0);
  const symbol = DocumentSymbol.create(name, "details", SymbolKind.Method, symbolDefRange, symbolDefRange, []);

  const parameters: DocumentSymbol[] = [];
  let counter = 0;
  for (const param of params) {
    const parameter = DocumentSymbol.create(
      param,
      counter.toString(),
      SymbolKind.Variable,
      symbolDefRange,
      symbolDefRange,
    );
    parameters.push(parameter);
    counter++;
  }
  symbol.detail = parameters.map((x) => x.name).join(",");
  return { symbol, parameters };
}
