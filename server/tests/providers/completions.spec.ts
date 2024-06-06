import { setupMockedEnvironment, setupTextDocuments } from "./test-utilities";
import { jest, expect } from "@jest/globals";

setupMockedEnvironment();

import { Range, DocumentSymbol, SymbolKind, CompletionList } from "vscode-languageserver";
import { TadsSymbolManager } from "../../src/modules/symbol-manager";
import { onCompletion } from "../../src/modules/completions";

const fileContent = `// Row 0
// Row 1
Thi // Row 2
`;

describe("Completion Provider Test Suite", () => {

  describe("Given there is a TextDocument with the contents of the word 'Thing'", () => {
    let textDocuments = setupTextDocuments("/text.txt", fileContent);

    describe("And there is a no symbol called 'Thing' declared", () => {
      let sm: TadsSymbolManager;

      beforeEach(() => {
        sm = new TadsSymbolManager();
      });

      it("When starting to type 'Thi' onCompletion doesn't suggest 'Thing'. ", async () => {
        // Arrange, Act
        const suggestions: CompletionList[] = (await onCompletion(
          { textDocument: { uri: "file:///test.txt" }, position: { line: 2, character: 3 } },
          textDocuments,
          sm,
        )) as CompletionList[];

        // Assert
        expect(suggestions).not.toContainEqual({ label: "Thing" });
      });
    });

    describe.skip("And there is a declared class called 'Thing' registered somewhere in another file", () => {
      let sm: TadsSymbolManager;

      beforeEach(() => {
        sm = new TadsSymbolManager();
        // . Prepare a 'Thing' class that can be looked up via the symbol manager:
        let symbolDefRange = Range.create(5, 0, 80, 1);
        const thingClass = DocumentSymbol.create("Thing", "details", SymbolKind.Class, symbolDefRange, symbolDefRange, [])
        sm.symbols.set("/thing.t", [thingClass]);
      });

      it.skip("When starting to type 'Thi' onCompletion suggests 'Thing'. ", async () => {
        // Arrange, Act
        const suggestions: CompletionList[] = (await onCompletion(
          { textDocument: { uri: "file:///test.txt" }, position: { line: 2, character: 3 } },
          textDocuments,
          sm,
        )) as CompletionList[];

        // Assert
        expect(suggestions).toContainEqual({ 'label': "Thing" });
      });
    });
  });
});
