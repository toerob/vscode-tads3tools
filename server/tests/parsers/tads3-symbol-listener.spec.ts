import { Tads3SymbolListener } from "../../src/parser/Tads3SymbolListener";
import { DocumentSymbol, Position, Range } from "vscode-languageserver";
import { describe, expect, test, beforeEach, jest } from "@jest/globals";
import { DocumentSymbolWithScope, ExpressionType } from "../../src/modules/types";
import {
  AssignmentStatementContext,
  ObjectDeclarationContext,
  Tads3Parser,
  TemplateDeclarationContext,
} from "../../src/parser/Tads3Parser";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts";
import { fail } from "assert";

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
      // Arrange
      let ctx: any = new ObjectDeclarationContext(undefined, 0);
      ctx.identifierAtom = () => {
        return {
          text: "namedObjectId",
        };
      };
      ctx._start = { line: 1, character: 0 };
      ctx._stop = { line: 1, charPositionInLine: 5 };
      ctx._level = [];
      ctx.superTypes = () => {
        return {
          payload: {
            text: "superclass",
          },
        };
      };
      // Act
      sl.enterObjectDeclaration(ctx);

      // Assert
      const symbol = sl.symbols[0];
      expect(symbol).not.toBeUndefined();
      expect(sl.lastObjectLevelMap.get(0)).toBe(symbol);
      expect(symbol).toStrictEqual({
        detail: "superclass",
        kind: 19,
        name: "namedObjectId",
        range: Range.create(0, 0, 0, 0),
        selectionRange: Range.create(0, 0, 0, 0),
        children: [],
      });
    });

    test("enterObjectDeclaration type object on second level (with parent node)", () => {
      // Arrange
      // - Create a parent object
      let parentCtx: any = new ObjectDeclarationContext(undefined, 0);
      parentCtx.identifierAtom = () => {
        return {
          text: "parentObjectId",
        };
      };
      parentCtx._start = { line: 1, character: 0 };
      parentCtx._stop = { line: 8, charPositionInLine: 0 };
      parentCtx._level = [];
      parentCtx.superTypes = () => {
        return {
          payload: {
            text: "object",
          },
        };
      };
      sl.enterObjectDeclaration(parentCtx);

      // - Create the the second level object
      let ctx: any = new ObjectDeclarationContext(undefined, 0);
      ctx.identifierAtom = () => {
        return {
          text: "namedObjectId",
        };
      };
      ctx._start = { line: 10, character: 0 };
      ctx._stop = { line: 20, charPositionInLine: 0 };
      ctx._level = [createMockedToken("+", Tads3Parser.PLUS)];
      ctx.superTypes = () => {
        return {
          payload: {
            text: "superclass",
          },
        };
      };
      // Act
      sl.enterObjectDeclaration(ctx);

      // Assert
      expect(sl.symbols).toHaveLength(1);
      const parentSymbol = sl.symbols[0];

      expect(parentSymbol.children).toHaveLength(1);
      const symbol = parentSymbol.children![0];
      expect(symbol).not.toBeUndefined();

      expect(sl.lastObjectLevelMap.get(0)).toBe(parentSymbol);
      expect(sl.lastObjectLevelMap.get(1)).toBe(symbol);

      expect(sl.additionalProperties.get(symbol)!.parent).toBe(parentSymbol);

      expect(parentSymbol).toStrictEqual({
        detail: "object",
        kind: 19,
        name: "parentObjectId",
        range: Range.create(0, 0, 7, 0),
        selectionRange: Range.create(0, 0, 7, 0),
        children: [
          {
            detail: "superclass",
            kind: 19,
            name: "namedObjectId",
            range: Range.create(9, 0, 19, 0),
            selectionRange: Range.create(9, 0, 19, 0),
            children: [],
          },
        ],
      });
    });

    test.skip("enterObjectDeclaration type class", () => {
      const ctx: any = {};
      //sl.enterObjectDeclaration(ctx);
      fail("Not yet implemented");
    });

    test.skip("enterObjectDeclaration curly bracket style", () => {
      const ctx: any = {};
      //sl.enterObjectDeclaration(ctx);
      fail("Not yet implemented");
    });

    test.skip("enterObjectDeclaration level 1", () => {
      const ctx: any = {};
      //sl.enterObjectDeclaration(ctx);
      fail("Not yet implemented");
    });
  });

  describe("TemplateDeclaration", () => {
    test("enterTemplateDeclaration", () => {
      // Arrange
      const name = "Thing";
      const templateText = `Thing template 'vocab' @location? "desc"?;`
      // - Create the template
      let ctx: any = new TemplateDeclarationContext(undefined, 0);
      ctx._className = {
        ID: () => {
          return {
            text: name,
          };
        },
      };
      ctx._start = {
        inputStream: {
          getText: (interval: any) => {
            return templateText;
          },
        },
        startIndex: 0,
        line: 10,
        character: 0,
      };
      ctx._stop = { stopIndex: name.length, line: 1, charPositionInLine: 0 };

      // Act
      sl.enterTemplateDeclaration(ctx);

      // Assert
      expect(sl.symbols[0]).toStrictEqual({
        name: name,
        kind: 26,
        detail: templateText,
        range: Range.create(9, 0, 0, 0),
        selectionRange: Range.create(9, 0, 0, 0),
      });
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
