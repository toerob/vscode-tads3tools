import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { Tads3Lexer } from "../../src/parser/Tads3Lexer";
import { Tads3Listener } from "../../src/parser/Tads3Listener";
import { Tads3SymbolListener } from "../../src/parser/Tads3SymbolListener";
import {
  ObjectDeclarationContext,
  PropertyContext,
  Tads3Parser,
  TemplateExprContext,
} from "../../src/parser/Tads3Parser";
import * as assert from "assert";
import { Range, SymbolKind } from "vscode-languageserver";
import { expect, it } from "@jest/globals";

function parseTextWithTads3SymbolListener(text: string) {
  const input = CharStreams.fromString(text);
  const lexer = new Tads3Lexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Tads3Parser(tokenStream);
  const parseTreeWalker = new ParseTreeWalker();
  const listener = new Tads3SymbolListener();
  const parseTree = parser.program();
  parseTreeWalker.walk(listener, parseTree);
  return { parseTree, listener };
}

function parseTextWithSimpleErrorListener(text: string) {
  const input = CharStreams.fromString(text);
  const lexer = new Tads3Lexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Tads3Parser(tokenStream);
  const parseTreeWalker = new ParseTreeWalker();
  const listener = new SimpleErrorListener();
  const parseTree = parser.program();
  parseTreeWalker.walk(listener, parseTree);
  return { parseTree, listener };
}

class SimpleErrorListener implements Tads3Listener {
  objects: any = [];
  properties: string[] = [];
  descriptions: string[] = [];

  enterObjectDeclaration(ctx: ObjectDeclarationContext) {
    const roomId: string = ctx.identifierAtom()?.ID()?.text ?? "";
    this.objects.push({ roomId });
  }
  enterTemplateExpr(ctx: TemplateExprContext) {
    const roomName = ctx.SSTR()?.text;
    const roomDesc = ctx.DSTR()?.text;
    const lastAddedObject = this.objects[this.objects.length - 1];
    if (roomName) lastAddedObject.roomName = roomName;
    if (roomDesc) lastAddedObject.roomDesc = roomDesc;
  }

  enterProperty(ctx: PropertyContext) {
    const name: string = ctx._id.ID()?.text ?? "";
    this.properties.push(name);
  }

  visitErrorNode(ctx: any) {
    assert.fail();
  }
}

describe("Tads3 parser tests", () => {
  describe("Sweeping tests", () => {
    it("parses a game object with simple direction properties with no errors", () => {
      const { listener } = parseTextWithSimpleErrorListener(`theHouse: Room 'the house on the hill'
			"the description goes here..."
			south = hill
			east = lake
			west = forest
		;`);

      assert.equal(listener.objects.length, 1);
      assert.equal(listener.properties.length, 3);
      assert.equal(listener.objects[0].roomId, "theHouse");
      assert.equal(listener.objects[0].roomName, "'the house on the hill'");
      assert.equal(listener.objects[0].roomDesc, '"the description goes here..."');
      assert.equal(listener.properties.join(","), "south,east,west");
    });

    it("parses switch cases with no errors ", () => {
      parseTextWithSimpleErrorListener(`function testFunc() {
			local a = 10;
			switch(a) {
				case 10:
					break;
				default:
					return 6;
			}
		}`);

      parseTextWithSimpleErrorListener(`function testFunc() {
			switch(25 - 15) {
				default:
					break;
				case -10:
					return 20;
			}
		}`);
    });

    it("parses templates with no errors ", () => {
      const adv3LiteTemplates = `
			Thing template 'vocab' @location? "desc"?;
			Topic template 'vocab' @familiar?;
			Room template 'roomTitle' 'vocab' "desc"?;
			Room template 'roomTitle' "desc"?;
			Region template [rooms];
			Door template  'vocab' @location? "desc"? ->otherSide;
			Door template  ->otherSide 'vocab' @location? "desc"?;
			TravelConnector template 'vocab'? @location? "desc"? ->destination;
			TravelConnector template ->destination "travelDesc";
			Enterable template inherited ->connector;
			Enterable template ->connector inherited;
			Unthing template 'vocab' @location? 'notHereMsg'?;
			SensoryEmanation template inherited [eventList]?;
			ActorState template "specialDesc" 'stateDesc' | "stateDesc" ?;		
			TopicGroup template +scoreBoost? 'convKeys' | [convKeys] ? ;
			QueryTopic template
				+matchScore? 'qtype'
				@matchObj | [matchObj]
				'matchPattern'
				"topicResponse" | [eventList] ?;
		`;
      parseTextWithSimpleErrorListener(adv3LiteTemplates);
      // TODO: Examine result
    });
  });

  describe("parsing objects", () => {
    it("parses an simple form of an anonymous object correctly", () => {
      const { listener } = parseTextWithTads3SymbolListener(`object;`);

      assert.equal(listener.symbols.length, 1);
      const firstObject = listener.symbols[0];

      assert.notEqual(firstObject, undefined);
      assert.equal(firstObject.name, "anonymous");
      assert.equal(firstObject.detail, "object");
      assert.equal(firstObject.kind, SymbolKind.Object);
      assert.equal(firstObject.range.start.line, 0);
      assert.equal(firstObject.range.end.line, 0);
    });

    it("parses an anonymous object with properties correctly", () => {
      const { listener } = parseTextWithTads3SymbolListener(`object 
  abc = 123
  prop = '123'
;`);
      assert.equal(listener.symbols.length, 1);
      const firstObject = listener.symbols[0];

      assert.equal(firstObject.name, "anonymous");
      assert.equal(firstObject.detail, "object");
      assert.equal(firstObject.kind, SymbolKind.Object);
      assert.equal(firstObject.range.start.line, 0);
      assert.equal(firstObject.range.end.line, 3);
    });

    it("parses a named object with superclass Room correctly", () => {
      let roomDefinition = `
      front: Room 'In front of a white house' 
        east = eastSideOfHouse
      ;
      `;

      const { listener } = parseTextWithTads3SymbolListener(
        `front: Room 'In front of a white house' 
  east = eastSideOfHouse
;`,
      );
      expect(listener.symbols).toHaveLength(1);
      expect(listener.symbols[0]).toStrictEqual({
        name: "front",
        detail: "Room",
        kind: 19,
        range: { start: { line: 0, character: 0 }, end: { line: 2, character: 0 } },
        selectionRange: { start: { line: 0, character: 0 }, end: { line: 2, character: 0 } },
        children: [
          {
            name: "east",
            detail: "eastSideOfHouse",
            kind: 7,
            range: Range.create(1, 2, 1, 9),
            selectionRange: Range.create(1, 2, 1, 9),
            children: [],
          },
        ],
      });

      const firstSymbol = listener.symbols[0];
      assert.equal(firstSymbol.name, "front");
      assert.equal(firstSymbol.detail, "Room");
      assert.equal(firstSymbol.kind, SymbolKind.Object);
      assert.equal(firstSymbol.range.start.line, 0);
      assert.equal(firstSymbol.range.end.line, 2);

      assert.equal(firstSymbol.children!.length, 1);
      const firstProperty = firstSymbol.children![0];

      assert.notEqual(firstProperty, undefined);
      assert.equal(firstProperty.name, "east");
      assert.equal(firstProperty.detail, "eastSideOfHouse");
      assert.equal(firstProperty.kind, SymbolKind.Property);
      assert.deepEqual(firstProperty.range, Range.create(1, 2, 1, 9));
    });

    it("parses an anonymous object with superclasses correctly", () => {
      const { listener } = parseTextWithTads3SymbolListener(`Edible, Food;`);

      assert.equal(listener.symbols.length, 1);
      const firstObject = listener.symbols[0];

      assert.notEqual(firstObject, undefined);
      assert.equal(firstObject.name, "anonymous");
      assert.equal(firstObject.detail, "Edible,Food");
      assert.equal(firstObject.kind, SymbolKind.Object);
    });

    it("parses an anonymous object with superclasses, properties and methods correctly", () => {
      const anonymousObjectStmt = `Edible, Food 
      foodValue = 12
      getFoodValue(param1,param2) {
        return foodValue;
      };`;

      const { listener } = parseTextWithTads3SymbolListener(anonymousObjectStmt);

      expect(listener.symbols).toHaveLength(1);
      const firstObject = listener.symbols[0];

      expect(firstObject).not.toBeUndefined();
      expect(firstObject.name).toBe("anonymous");
      expect(firstObject.detail).toBe("Edible,Food");
      expect(firstObject.kind).toBe(SymbolKind.Object);

      expect(firstObject.children).toHaveLength(2);

      const firstProperty = firstObject.children![0];
      expect(firstProperty).not.toBeUndefined();
      expect(firstProperty.name).toBe("foodValue");
      expect(firstProperty.detail).toBe("12");
      expect(firstProperty.kind).toBe(SymbolKind.Property);
      expect(firstProperty.range.start.line).toBe(1);
      expect(firstProperty.range.end.line).toBe(1);

      const secondProperty = firstObject.children![1];
      expect(secondProperty).not.toBeUndefined();
      expect(secondProperty.name).toBe("getFoodValue");
      expect(secondProperty.detail).toBe("param1,param2");
      expect(secondProperty.kind).toBe(SymbolKind.Method);
      expect(secondProperty.range.start.line).toBe(2);
      expect(secondProperty.range.end.line).toBe(4);
    });
  });

  // TODO: add this style to the tests above
  describe("parsing intrinsic objects", () => {
    it("parses an intrinsic object with a method correctly", () => {
      let intrinsicClassExpr = `
      intrinsic class ByteArray 'bytearray/030002': Object
      {
        subarray(startIndex, length?);
      }`;
      const { listener } = parseTextWithTads3SymbolListener(intrinsicClassExpr);

      expect(listener.symbols).toHaveLength(1);
      const symbol = listener.symbols[0];
      expect(symbol).toStrictEqual({
        name: "ByteArray",
        detail: undefined, // ->TODO: should rather be intrinsic (or perhaps some other detail)
        kind: SymbolKind.Interface,
        range: Range.create(1, 0, 4, 0),
        selectionRange: Range.create(1, 0, 4, 0),
        children: [
          {
            name: "subarray",
            detail: "startIndex,length?",
            kind: SymbolKind.Function, // ->TODO: double check if this is correct
            range: Range.create(3, 0, 3, 0),
            selectionRange: Range.create(3, 0, 3, 0),
            children: [],
          },
        ],
      });
    });
  });

  describe("parsing grammar", () => {
    it("parses grammar expression correctly", () => {
      let grammarExpr = `
      grammar nounConjunction(main):
      ','
      | 'and'
      | ',' 'and'
      : Production
      ;
      `;
      const { listener } = parseTextWithTads3SymbolListener(grammarExpr);

      expect(listener.symbols).toHaveLength(1);
      const symbol = listener.symbols[0];
      expect(symbol).toStrictEqual({
        name: "nounConjunction",
        detail: "grammar",
        kind: 23,
        range: Range.create(1, 0, 6, 0),
        selectionRange: Range.create(1, 0, 6, 0),
        children: [],
      });
    });
  });

  describe("parsing functions", () => {
    it.each([
      {
        functionStmt: `
          function xyzzy(magicNumber) {
            return magicNumber + 3 / ( 7 * 21 );
          }
          `,
        range: Range.create(1, 10, 3, 64),
      },
      {
        functionStmt: `
          xyzzy(magicNumber) {
            return magicNumber + 3 / ( 7 * 21 );
          }
          `,
        range: Range.create(1, 10, 3, 56),
      },
    ])("parses a function (variations) correctly", ({ functionStmt, range }) => {
      const { listener } = parseTextWithTads3SymbolListener(functionStmt);

      expect(listener.symbols).toHaveLength(1);
      const symbol = listener.symbols[0];
      expect(symbol).toStrictEqual({
        name: "xyzzy",
        detail: "magicNumber",
        kind: 12,
        range: range,
        selectionRange: range,
        children: [],
      });

      const expressionSymbol1 = listener.localKeywords.get("magicNumber");
      // TODO: improve validation here
      expect(expressionSymbol1).not.toBeUndefined();
    });
  });

  /*
  TODO: area of improvement, map the control flows
  describe("Control Flows", () => {
    it.only("parses an if-block correctly", () => {
      let ifExpr = `
      if( x >0 ) {
        say('True')
      }
      `;
      const { listener } = parseTextWithTads3SymbolListener(ifExpr);
      console.log("done");
    });
  });*/
});
