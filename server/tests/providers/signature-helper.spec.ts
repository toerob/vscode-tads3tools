import { setupMockedEnvironment, setupTextDocuments } from "./test-utilities";

setupMockedEnvironment();

import { Range, DocumentSymbol, SymbolKind, Position } from "vscode-languageserver";
import { TadsSymbolManager } from "../../src/modules/symbol-manager";
import { onSignatureHelp } from "../../src/modules/signature-helper";

describe.skip("Definition Provider Test Suite", () => {
  const fileContent = `
		function functionHead(
	`;

  let sm: TadsSymbolManager;
  let textDocuments = setupTextDocuments("/text.txt", fileContent);
  let symbolDefRange = Range.create(1, 0, 1, 24);

  beforeEach(() => {
    // . Prepare a 'Thing' class that can be looked up via the symbol manager:
    const symbol1 = DocumentSymbol.create(
      "functionHead",
      "details",
      SymbolKind.Method,
      symbolDefRange,
      symbolDefRange,
      [],
    );

    sm = new TadsSymbolManager();
    sm.symbols.set("/thing.t", [symbol1]);
  });

  it("...", () => {
    onSignatureHelp(
      { textDocument: { uri: "file:///test.txt" }, position: Position.create(1,24) },
      textDocuments,
      sm,
    );
  });
});
