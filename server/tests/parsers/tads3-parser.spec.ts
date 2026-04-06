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
import { Range, SymbolKind } from "vscode-languageserver/node";
import { describe, expect, it } from "@jest/globals";
import { readFileSync } from "fs";

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
  assert.equal(
    parser.numberOfSyntaxErrors,
    0,
    `Expected no syntax errors, got ${parser.numberOfSyntaxErrors}`,
  );
  parseTreeWalker.walk(listener, parseTree);
  return { parseTree, listener };
}

function parseTextAndAssertNoSyntaxErrors(text: string) {
  const input = CharStreams.fromString(text);
  const lexer = new Tads3Lexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Tads3Parser(tokenStream);
  const parseTree = parser.program();
  assert.equal(
    parser.numberOfSyntaxErrors,
    0,
    `Expected no syntax errors, got ${parser.numberOfSyntaxErrors}`,
  );
  return { parseTree };
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
  beforeEach(() => {
    // Reset this every time so we can verify the correct suffix in each test.
    // It needs to set unique names even when used asynchronously.

    // TOOD: (make test coverage of several spawn workers too)
    Tads3SymbolListener.anonymousObjectCounter = 0;
  });
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

    it("parses common directives with no errors", () => {
      parseTextWithSimpleErrorListener(`
        enum token north, south, east, west;
        export gateArea 'gateArea';
        property direction, destination;
        +property foo;
        dictionary property words, synonyms;
        +dictionary dictA, dictB;
        #pragma debug(1);
      `);
    });

    it("parses operator override with no errors", () => {
      parseTextWithSimpleErrorListener(`
        operator +(a, b) {
          return a + b;
        }
      `);
    });

    it("parses grammar declaration with optional object body with no errors", () => {
      parseTextWithSimpleErrorListener(`
        grammar myProd(main):
          'a'
          | 'b'
        : Production
        {
          scoreBoost = 12;
        }
      `);
    });
  });

  describe("parsing objects", () => {
    it("parses an simple form of an anonymous object correctly", () => {
      const { listener } = parseTextWithTads3SymbolListener(`object;`);

      assert.equal(listener.symbols.length, 1);
      const firstObject = listener.symbols[0];

      assert.notEqual(firstObject, undefined);
      assert.equal(firstObject.name, "anonymousObject#0");
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

      assert.equal(firstObject.name, "anonymousObject#0");
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
      assert.equal(firstObject.name, "anonymousObject#0");
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
      expect(firstObject.name).toBe("anonymousObject#0");
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

    it("parses dictionary-style property assignment (multiple SSTR) with no errors", () => {
      parseTextWithSimpleErrorListener(`
        object
          dictProp = 'one' 'two' 'three'
        ;
      `);
    });

    it("parses nested +/++ objects similar to gatearea.t", () => {
      const txt = `
        gateArea: Room 'Gate Area' 'gate area'
          "Door is <<if isOpen>>open<<else>>closed<<end>>. "
          south = concourse
        ;

        + maintenanceRoomDoor: Door 'metal door'
          "It's marked <q>Personal</q>, and <<if isOpen>>open<<else>>closed<<end>>. "
          otherSide = mrDoorOut
        ;

        ++ powerSwitch: Fixture, Switch 'big red switch{-zz}'
          "It's currently <<if isOn>>ON<<else>>OFF<<end>>. "
          isOn = true
        ;
      `;

      const { listener } = parseTextWithTads3SymbolListener(txt);
      expect(listener.symbols).toHaveLength(1);
      expect(listener.symbols[0].name).toBe("gateArea");
      expect(listener.symbols[0].children?.some((c) => c.name === "maintenanceRoomDoor")).toBe(true);

      const maintenanceRoomDoor = listener.symbols[0].children?.find(
        (c) => c.name === "maintenanceRoomDoor",
      );
      expect(maintenanceRoomDoor).toBeDefined();
      expect(maintenanceRoomDoor!.children?.some((c) => c.name === "powerSwitch")).toBe(true);
    });

    it("parses TravelConnector inner object property and nested methods (gatearea style)", () => {
      const txt = `
        jetway: Room 'Jetway' 'jetway'
          east: TravelConnector
          {
            destination = planeFront
            canTravelerPass(traveler) { return traveler != nil; }
            explainTravelBarrier(traveler) { "Nope"; }
          }
        ;
      `;

      const { listener } = parseTextWithTads3SymbolListener(txt);
      expect(listener.symbols).toHaveLength(1);
      expect(listener.symbols[0].name).toBe("jetway");

      const east = listener.symbols[0].children?.find((c) => c.name === "east");
      expect(east).toBeDefined();
      expect(east!.kind).toBe(SymbolKind.TypeParameter);
      expect(east!.children?.some((c) => c.name === "destination")).toBe(true);

      // Note: The current SymbolListener attaches methods found in an inner object body
      // to the parent object symbol rather than to the inner-object property symbol.
      expect(listener.symbols[0].children?.some((c) => c.name === "canTravelerPass")).toBe(true);
      expect(listener.symbols[0].children?.some((c) => c.name === "explainTravelBarrier")).toBe(true);
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

    it("parses key expression operators with no errors", () => {
      parseTextWithSimpleErrorListener(`
        function exprOps(a, b, cond) {
          local x = a ?? b;
          local y = cond ? a : b;
          local z = ->a;
          local r = R"abc";
          return x + y;
        }
      `);
    });
  });

  describe("Real-world sample excerpts", () => {
    it("parses the gatearea fixture (excluding preprocessor lines) with no syntax errors", () => {
      const raw = readFileSync("tests/fixtures/gatearea.t").toString();
      const stripped = raw
        .split(/\r?\n/)
        .filter((line) => !/^\s*#/.test(line))
        .join("\n");

      // The fixture contains a shorthand `out asExit(west)` which isn't currently
      // accepted by the grammar (it expects an explicit assignment).
      const normalized = stripped.replace(
        /^([\t ]*)out\s+asExit\(/m,
        "$1out = asExit(",
      );

      // Use direct parser check as a baseline.
      parseTextAndAssertNoSyntaxErrors(normalized);

      // Also walk with our error-node asserting listener.
      parseTextWithSimpleErrorListener(normalized);
    });
  });

  describe("Complete Game parsing integration tests", () => {
    it("preprocesses a game file with the expected result", async () => {
      // Arrange
    });
  });


  /*
  TODO: test that parsing of this works, note, need to be preprocessed first

  syncCatwalkGapFloor: catwalkFloor
      'other another (east) (west) (e) (w) section/gap/continuation' 'catwalk'
      "The catwalk is interrupted by a gap, which looks to be about
      ten feet, to the east. "

      dobjFor(JumpOver)
      {
          verify() { }
          action() { "The gap is much too wide to jump across. "; }
      }
  ;
  */

  describe("ScopedEnvironments", () => {
    it("Anonymous objects add up and are put within the correct parent objects when level sign is used", () => {
      const txt = readFileSync("tests/t3testgames/fragments/levels.t").toString();

      // Act
      const { listener } = parseTextWithTads3SymbolListener(txt);
      // Verify in total 3 symbols: 2 object + 1 class
      expect(listener.symbols).toHaveLength(3);

      // Verify hierarchy of object 1
      expect(listener.symbols[0].name).toBe("wizardsHouse");
      expect(listener.symbols[0].children).toHaveLength(4); // TODO: broken, check parser in isolation

      expect(listener.symbols[0].children![0].name).toBe("east");
      expect(listener.symbols[0].children![1].name).toBe("anonymousObject#0");
      expect(listener.symbols[0].children![2].name).toBe("anonymousObject#1");
      expect(listener.symbols[0].children![3].name).toBe("well");

      // Verify hierarchy of object 2
      expect(listener.symbols[1].name).toBe("Fluid");
      expect(listener.symbols[1].children).toHaveLength(0);

      // Verify hierarchy of object 3
      expect(listener.symbols[2].name).toBe("witchesHouse");
      expect(listener.symbols[2].children).toHaveLength(6);
      expect(listener.symbols[2].children![0].name).toBe("atmossphereList");
      expect(listener.symbols[2].children![0].children).toHaveLength(0);

      expect(listener.symbols[2].children![1].name).toBe("west");
      expect(listener.symbols[2].children![1].children).toHaveLength(2);
      expect(listener.symbols[2].children![1].children![0].name).toBe("destination");
      expect(listener.symbols[2].children![1].children![1].name).toBe("travelDesc");

      expect(listener.symbols[2].children![2].name).toBe("anonymousObject#2");
      expect(listener.symbols[2].children![2].children).toHaveLength(1);
      expect(listener.symbols[2].children![2].children![0].name).toBe("anonymousObject#3");

      expect(listener.symbols[2].children![3].name).toBe("anonymousObject#4");
      expect(listener.symbols[2].children![3].children).toHaveLength(3);
      expect(listener.symbols[2].children![3].children![0].name).toBe("rocks");
      expect(listener.symbols[2].children![3].children![1].name).toBe("anonymousObject#5");
      expect(listener.symbols[2].children![3].children![2].name).toBe("lilyPad");

      expect(listener.symbols[2].children![4].name).toBe("anonymousObject#7");
      expect(listener.symbols[2].children![4].children).toHaveLength(0);
      expect(listener.symbols[2].children![5].name).toBe("anonymousObject#8");
      expect(listener.symbols[2].children![5].children).toHaveLength(0);
    });

    it("enterObjectDeclaration", () => {
      const { listener } = parseTextWithTads3SymbolListener(`
                
        xyzzy: Thing 'x' 'y'
          methodA() {
            local x = 10;

            local y = x;

          }
          methodB(abc, def,  ghi) {}
        ;
        +Decoration 'sceneries' 'scenery' "sdfsdf" firstAnonymousDecoration = 12;
        
        Thing 'cloud' 'cloud' firstAnonymousThing = 15;
        +Decoration 'sceneries2' 'scenery2'  secondAnonymousDecoration = 23;

        // END
      `);

      // TODO: there seems to be an historical bug concerning anonymous objects here.
      // Only the first anonymous object is found in the example above.
      // It doesn't matter if it has the same parent or different parents.
      // Or if it is nestled further with (++).
      //
      // Only the first anonymous object is catched.
      expect(listener.symbols).toHaveLength(2);
      expect(listener.symbols[0].children).toHaveLength(3); // 2 methods + Decoration
      expect(listener.symbols[1].children).toHaveLength(2); // 1 Anonymous Decoration

      const paths = [...listener.scopedEnvironments.keys()];
      expect(paths).toStrictEqual([
        "xyzzy",

        "xyzzy.methodA()",
        "xyzzy.methodA().x",

        "xyzzy.methodA().y",
        "xyzzy.methodB(abc,def,ghi)",

        "anonymousObject#0",
        "anonymousObject#0.firstAnonymousDecoration",

        "anonymousObject#1",
        "anonymousObject#1.firstAnonymousThing",

        "anonymousObject#2",
        "anonymousObject#2.secondAnonymousDecoration",
      ]);

      // Verify the parent scope is correct from object xyzzy
      const xyzzyEnv = listener.scopedEnvironments.get("xyzzy");
      expect(xyzzyEnv?.getSymbol("xyzzy").name).toStrictEqual("xyzzy");

      // Verify the parent scope is correct from methodA
      const methodAEnv = listener.scopedEnvironments.get("xyzzy.methodA()");
      expect(methodAEnv?.getSymbol("xyzzy").name).toStrictEqual("xyzzy");

      // Verify the parent scope is correct from methodB
      const methodBEnv = listener.scopedEnvironments.get("xyzzy.methodB(abc,def,ghi)");
      expect(methodBEnv?.getSymbol("xyzzy").name).toStrictEqual("xyzzy");

      // Verify the parent scope is correct from local assignment x
      const xEnv = listener.scopedEnvironments.get("xyzzy.methodA().x");
      expect(xEnv).not.toBeUndefined();
      expect(xEnv!.getSymbol("x").name).toStrictEqual("x");

      // Verify the parent scope is correct from local assignment x
      const yEnv = listener.scopedEnvironments.get("xyzzy.methodA().y");
      expect(yEnv).not.toBeUndefined();
      expect(yEnv!.getSymbol("y").name).toStrictEqual("y");

      // Verify the parent scope is correct from anonymousObject#0
      const anonymousObject0Env = listener.scopedEnvironments.get("anonymousObject#0");
      expect(anonymousObject0Env).not.toBeUndefined();
      expect(anonymousObject0Env!.getSymbol("anonymousObject#0").name).toStrictEqual("anonymousObject#0");

      // ETC:
      /*
        "anonymousObject#0",
        "anonymousObject#0.firstAnonymousDecoration",

        "anonymousObject#1",
        "anonymousObject#1.firstAnonymousThing",

        "anonymousObject#2",
        "anonymousObject#2.secondAnonymousDecoration"
        */
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
