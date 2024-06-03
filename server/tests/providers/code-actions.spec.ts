import { setupMockedEnvironment } from "./mocks-utilities";
setupMockedEnvironment();

import { expect } from "@jest/globals";
import { Range, Position, DocumentSymbol, SymbolKind, CodeAction } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TadsSymbolManager } from "../../src/modules/symbol-manager";
import { onCodeAction } from "../../src/modules/code-actions";

describe("CodeActionProvider", () => {
  let textDocuments: any;
  let sm: TadsSymbolManager;

  beforeEach(() => {
    // . Prepare a 'Thing' class that can be looked up via the symbol manager:
    const range = Range.create(10, 2, 14, 5);
    const symbol1 = DocumentSymbol.create("Thing", "details", SymbolKind.Class, range, range, []);
    sm = new TadsSymbolManager();
    sm.symbols.set("thing.t", [symbol1]);
  });

  it("Code action gets provided for a found class Symbol", async () => {
    // Arrange
    textDocuments = {
      get(uri: string) {
        return TextDocument.create("/text.txt", "tads3", 0, `x = new Thing`);
      },
    };

    // Act
    const result: CodeAction[] = await onCodeAction(
      {
        textDocument: { uri: "file:///test.txt" },
        range: Range.create(Position.create(0, 0), Position.create(0, 13)),
        context: {
          diagnostics: [],
          only: [],
          triggerKind: undefined,
        },
      },
      textDocuments,
      sm,
    );
    expect(result[0].title).toEqual("Complete local assignment statement");
    expect(result[0].kind).toEqual("refactor.extract");

    expect(result[0].command!.title).toEqual("Insert local assignment snippet");
    expect(result[0].command!.command).toEqual("extension.insertLocalAssignmentSnippet");
    expect(result[0].command!.arguments).toStrictEqual(["file:///test.txt", "local ${1:x} = newThing();$0", 0, 0, 13]);
  });

  it("Code action gets provided for an arithmetic operation", async () => {
    // Arrange
    textDocuments = {
      get(uri: string) {
        return TextDocument.create("/text.txt", "tads3", 0, `1+2`);
      },
    };

    // Act
    const result: CodeAction[] = await onCodeAction(
      {
        textDocument: { uri: "file:///test.txt" },
        range: Range.create(Position.create(0, 0), Position.create(0, 13)),
        context: {
          diagnostics: [],
          only: [],
          triggerKind: undefined,
        },
      },
      textDocuments,
      sm,
    );
    expect(result[0].title).toEqual("Complete local assignment (arithmetic) statement");
    expect(result[0].kind).toEqual("refactor.extract");

    expect(result[0].command!.title).toEqual("Insert local assignment snippet");
    expect(result[0].command!.command).toEqual("extension.insertLocalAssignmentSnippet");
    expect(result[0].command!.arguments).toStrictEqual(["file:///test.txt", "local ${1:sum} = 1 + 2;$0", 0, 0, 3]);
  });

  it("Code action gets provided for an array declaration", async () => {
    // Arrange
    textDocuments = {
      get(uri: string) {
        return TextDocument.create("/text.txt", "tads3", 0, `[]`);
      },
    };

    // Act
    const result: CodeAction[] = await onCodeAction(
      {
        textDocument: { uri: "file:///test.txt" },
        range: Range.create(Position.create(0, 0), Position.create(0, 13)),
        context: {
          diagnostics: [],
          only: [],
          triggerKind: undefined,
        },
      },
      textDocuments,
      sm,
    );
    expect(result[0].title).toEqual("Complete local assignment (array) statement");
    expect(result[0].kind).toEqual("refactor.extract");

    expect(result[0].command!.title).toEqual("Insert local assignment snippet");
    expect(result[0].command!.command).toEqual("extension.insertLocalAssignmentSnippet");
    expect(result[0].command!.arguments).toStrictEqual(["file:///test.txt", "local ${1:x} = [];$0", 0, 0, 2]);
  });
});
