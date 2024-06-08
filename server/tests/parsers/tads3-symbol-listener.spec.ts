import { Tads3SymbolListener } from "../../src/parser/Tads3SymbolListener";
import { DocumentSymbol, Position, Range } from "vscode-languageserver";
import { describe, expect, test, beforeEach, jest } from "@jest/globals";
import { DocumentSymbolWithScope, ExpressionType } from "../../src/modules/types";
import { AssignmentStatementContext, Tads3Parser } from "../../src/parser/Tads3Parser";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts";
import { fail } from 'assert';

describe("Tads3SymbolListener", () => {
  let sl: Tads3SymbolListener;

  beforeEach(() => {
    sl = new Tads3SymbolListener();
  });
  test("Assert enterIdAtom creates a keyword range and a completion item", () => {
    // Arrange
    const name = "hello";
    const line = 2;
    const ctx: any = createCtxWithIdentifierAtom(name, line);

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
    expect(expressionSymbol).toHaveLength(1);
    expect(expressionSymbol[0].documentSymbol).toStrictEqual(expectedSymbol);
    expect(expressionSymbol[0].expressionType).toStrictEqual(ExpressionType.METHOD_INVOCATION);
  });

  test("enterAssignmentStatement", () => {
    // Arrange
    let ctx: any = new AssignmentStatementContext(undefined, 0);
    ctx.identifierAtom = () => {
      return {
        ID() {
          return { text: "thing" };
        },
      };
    };
    ctx._start = { line: 1, character: 0 };
    ctx._stop = { line: 1, charPositionInLine: 5 };
    ctx.children = [
      new TerminalNode(createMockedToken("local", Tads3Parser.LOCAL)),
      new TerminalNode(createMockedToken("x", Tads3Parser.ID)),
      new TerminalNode(createMockedToken("=", Tads3Parser.EQ)),
      new TerminalNode(createMockedToken("new", Tads3Parser.NEW)),

      // Note: Not really a Terminal token, make a tree here to make sure the traversing of the nodes work too
      new TerminalNode(createMockedToken("Thing", Tads3Parser.RULE_identifierAtom)),
      new TerminalNode(createMockedToken("(", Tads3Parser.LEFT_PAREN)),
      new TerminalNode(createMockedToken(")", Tads3Parser.RIGHT_PAREN)),

      // The semicolon won't be part of detail
      new TerminalNode(createMockedToken(";", Tads3Parser.SEMICOLON)),
    ];

    // Act
    sl.enterAssignmentStatement(ctx);

    // Assert
    expect(sl.currentAssignment).not.toBeUndefined();

    const additionalProperties = sl.additionalProperties.get(sl.currentAssignment as DocumentSymbol);
    expect(additionalProperties).not.toBeUndefined();

    expect(sl.assignmentStatements).toHaveLength(1);
    expect(sl.expressionSymbols.size).toBe(1);

    const expressionSymbol: DocumentSymbolWithScope[] | undefined = sl.expressionSymbols.get("thing");

    expect(expressionSymbol![0].expressionType).toBe(ExpressionType.LOCAL_ASSIGNMENT);
    expect(expressionSymbol![0].documentSymbol?.detail).toBe(" local x = new Thing ( )");
  });

  describe("enterObjectDeclaration variations", () => {
    test("enterObjectDeclaration type object", () => {
      const ctx: any = {};
      //sl.enterObjectDeclaration(ctx);
			fail("Not yet implemented");
    });

    test("enterObjectDeclaration type class", () => {
      const ctx: any = {};
      //sl.enterObjectDeclaration(ctx);
			fail("Not yet implemented");
    });

    test("enterObjectDeclaration curly bracket style", () => {
      const ctx: any = {};
      //sl.enterObjectDeclaration(ctx);
			fail("Not yet implemented");
    });

    test("enterObjectDeclaration level 1", () => {
      const ctx: any = {};
      //sl.enterObjectDeclaration(ctx);
			fail("Not yet implemented");
    });

  });
});

function createCtxWithIdentifierAtom(
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

function createMockedToken(text: string, type: number) {
  const token: Token = {
    text: text,
    type: type,
    // just the defaults, since we aren't testing these properties.
    line: 0,
    charPositionInLine: 0,
    channel: 0,
    tokenIndex: 0,
    startIndex: 0,
    stopIndex: 0,
    tokenSource: undefined,
    inputStream: undefined,
  };
  return token;
}
