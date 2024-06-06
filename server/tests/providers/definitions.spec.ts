import { setupMockedEnvironment, setupTextDocuments } from "./test-utilities";

setupMockedEnvironment();

import { expect } from "@jest/globals";
import { Range, DocumentSymbol, SymbolKind, Location } from "vscode-languageserver";
import { TadsSymbolManager } from "../../src/modules/symbol-manager";
import { onDefinition } from "../../src/modules/definitions";

const fileContent = `// Row 0
// Row 1
a:Thing; // Row 2
`;

describe("Definition Provider Test Suite", () => {
  describe("Given there is a TextDocument with the contents of the word 'Thing'", () => {
    let textDocuments = setupTextDocuments("/text.txt", fileContent);

    describe("And there is a declared class called 'Thing' registered somewhere in another file", () => {
      let sm: TadsSymbolManager;
      let symbolDefRange = Range.create(5, 0, 80, 1);

      beforeEach(() => {
        // . Prepare a 'Thing' class that can be looked up via the symbol manager:
        const symbol1 = DocumentSymbol.create("Thing", "details", SymbolKind.Class, symbolDefRange, symbolDefRange, []);

        sm = new TadsSymbolManager();
        sm.symbols.set("/thing.t", [symbol1]);
      });

      it("When searching on line 3 the 'Thing' the class definition will be found. ", async () => {
        // Arrange
        // Act
        const result: any[] = await onDefinition(
          { textDocument: { uri: "file:///test.txt" }, position: { line: 2, character: 5 } },
          textDocuments,
          sm,
        );

        // Assert
        const foundSymbol = result[0] as Location;
        expect(result.length).toBe(1);
        expect(foundSymbol.uri).toStrictEqual("/thing.t");
        expect(foundSymbol.range).toStrictEqual(symbolDefRange);
      });

      it("When searching on line 1 the 'Thing' class definition is not found. ", async () => {
        // Arrange
        // Act
        const result: any[] = await onDefinition(
          { textDocument: { uri: "file:///test.txt" }, position: { line: 0, character: 0 } },
          textDocuments,
          sm,
        );

        // Assert
        expect(result.length).toBe(0);
      });
    });
  });
});
