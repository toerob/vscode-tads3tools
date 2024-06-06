import { Tads3SymbolListener } from "../../src/parser/Tads3SymbolListener";
import { Position, Range } from "vscode-languageserver";
import { describe, expect, test } from "@jest/globals";
import { ExpressionType } from "../../src/modules/types";

function createIdentifierAtom(
  name: string,
  line = 0,
  start = Position.create(line, 0),
  stop = Position.create(line, name.length - 1),
) {
  const ctx: any = {
    identifierAtom() {
      return {
        ID() {
          return { text: name };
        },
      };
    },
    start: { line: start.line, character: start.character },
    stop: { line: stop.line, charPositionInLine: stop.character },
  };
  return ctx;
}

describe("Tads3SymbolListener", () => {
  const sl = new Tads3SymbolListener();

  test("Assert enterIdAtom creates a keyword range and a completion item", () => {
    // Arrange
    const name = "hello";
    const line = 2;
    const ctx: any = createIdentifierAtom(name, line);

    // Act
    sl.enterIdAtom(ctx);

    // Assert
    const keywordRanges = sl.localKeywords.get(name);
    expect(keywordRanges).toHaveLength(1);
    expect(keywordRanges![0].start.line).toBe(line);
    expect(keywordRanges![0].end.line).toBe(line);

    const completionItem = [...sl.completionItems];
    expect(completionItem).toHaveLength(1);
    expect(completionItem[0]).toStrictEqual({ label: name });
  });

  test("enterCallWithParamsExpr", () => {
    // Arrange
    const ctx: any = {
      expr() {
        return { text: "tadsSay" };
      },
      start: { line: 10 },
      stop: { line: 10 },
    };

    // Act
    sl.enterCallWithParamsExpr(ctx);

    // Assert
    const expectedSymbol = {
      children: [],
      detail: "invocation",
      kind: 6,
      name: "tadsSay",
      range: Range.create(9, 0, 9, 0),
      selectionRange: Range.create(9, 0, 9, 0),
    };

    expect(sl.currentAssignment).toStrictEqual(expectedSymbol);

    const expressionSymbol: any = sl.expressionSymbols.get("tadsSay");
    expect(expressionSymbol[0].documentSymbol).toStrictEqual(expectedSymbol);
    expect(expressionSymbol[0].expressionType).toStrictEqual(ExpressionType.METHOD_INVOCATION);
  });
});
