import { ShallowParser } from "../../src/modules/ShallowParser";
import { expect, it, describe } from "@jest/globals";

describe("Structurizer", () => {
  it("parses methods", () => {
    const code = `.     // row:1
    function methodA()  // row:2
    {                   // row:3
      local x = 10;     // row:4
      return y = 20;    // row:5
    }                   // row:6     
                        // row:7     
    function methodB()  // row:8
    {                   // row:9
      local z = 10;     // row:10
      return a = 20;    // row:11
    }                   // row:12    
    `;
    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    const entries = [...result.entries()];

    // First method
    {
      const row = 4 - 1;
      const expectedRawText = "local x = 10;     // row:4";
      expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
      expect(entries[row][1].stateBefore).toEqual({ objectDepth: 0, braceDepth: 1 });
      expect(entries[row][1].stateAfter).toEqual({ objectDepth: 0, braceDepth: 1 });
      expect(entries[row][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
    }
    // Second method
    {
      const row = 10 - 1;
      const expectedRawText = "local z = 10;     // row:10";
      expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
      expect(entries[row][1].stateBefore).toEqual({ objectDepth: 0, braceDepth: 1 });
      expect(entries[row][1].stateAfter).toEqual({ objectDepth: 0, braceDepth: 1 });
      expect(entries[row][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
    }
  });

  it("parses methods inside of objects", () => {
    const code = `        // row:1
    room1: Room           // row:2
      methodA()           // row:3
      {                   // row:4
        local x = 10;     // row:5
        return y = 20;    // row:6
      }                   // row:7     
                          // row:8     
      methodB()           // row:9
      {                   // row:10
        local z = 10;     // row:11
        return a = 20;    // row:12
      }                   // row:13    
    ;                     // row:14    
    `;
    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    const entries = [...result.entries()];

    // First method
    {
      const row = 5 - 1;
      const expectedRawText = "local x = 10;     // row:5";
      expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
      expect(entries[row][1].stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
      expect(entries[row][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
      expect(entries[row][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
    }
    // Second method
    {
      const row = 11 - 1;
      const expectedRawText = "local z = 10;     // row:11";
      expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
      expect(entries[row][1].stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
      expect(entries[row][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
      expect(entries[row][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
    }
  });

  it("parses correctly even when semicolons are drifting away from their context", () => {
    const code = `
class PendingResponseInfo: object
    construct(issuer, prop, args)
    {
            if (isPlayerChar)
                ((mainOutputStream.curTranscript).addReport(new DefaultCommandReport(&okayFollowInSightMsg,location.effectiveFollowLocation)))
;
    }
;

setPlayer(actor)
{
    libGlobal.playerChar = actor;
    setRootPOV(actor, actor);
}
`; // 13

    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    const entries = [...result.entries()];

    const row = 13 - 1;
    const expectedRawText = "libGlobal.playerChar = actor;";
    expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
    expect(entries[row][1].stateBefore).toEqual({ objectDepth: 0, braceDepth: 1 });
    expect(entries[row][1].stateAfter).toEqual({ objectDepth: 0, braceDepth: 1 });
    expect(entries[row][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
  });

  it("parses lambdas correctly", () => {
    const code = `  obj: object
                        copyPronounAntecedentsFrom(issuer)
                        {
                            issuer.antecedentTable.forEachAssoc(
                                {key, val: setPronounAntecedent(key, val)});
                        }
                     ;
      function A() {
        "TEST";
      }         
      `;
    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    const entries = [...result.entries()];

    const row = 9 - 1;
    const expectedRawText = '"TEST";';
    expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
    expect(entries[row][1].stateBefore).toEqual({ objectDepth: 0, braceDepth: 1 });
    expect(entries[row][1].stateAfter).toEqual({ objectDepth: 0, braceDepth: 1 });
    expect(entries[row][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
  });

  it("parses actor.t from standard library", () => {
    const fs = require("fs");
    const path = require("path");

    const fixtureFile = path.join(__dirname, "../fixtures/actor.t");
    const code = fs.readFileSync(fixtureFile, "utf8");

    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    const entries = [...result.entries()];

    
    {
      const row = 1251 - 1;
      const expectedRawText = "noteInvocation(fromActor)";
      expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
      expect(entries[row][1].owner?.trim()).toBe("ActorHelloTopic");
      expect(entries[row][1].stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
      expect(entries[row][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
      expect(entries[row][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
    }

    {
      const row = 3832 - 1;
      const expectedRawText = "check()";
      expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
      expect(entries[row][1].owner?.trim()).toBe("Actor");
      expect(entries[row][1].stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
      expect(entries[row][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
      expect(entries[row][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
    }
    {
      const row = 3968 - 1;
      const expectedRawText = "libGlobal.playerChar = actor;";
      expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
      expect(entries[row][1].stateBefore).toEqual({ objectDepth: 0, braceDepth: 1 });
      expect(entries[row][1].stateAfter).toEqual({ objectDepth: 0, braceDepth: 1 });
      expect(entries[row][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
    }
  });

  it("parses maintenanceRoomDoor correctly", () => {
    const code = `
        + maintenanceRoomDoor: Door 'metal door'
            "description of the door"
        ;
    `;

    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    const entries = [...result.entries()];

    const row = 2 - 1;
    const expectedRawText = "+ maintenanceRoomDoor: Door 'metal door'";
    expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
    expect(entries[row][1].stateBefore).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(entries[row][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(entries[row][1].events).toEqual({ startsObject: true, endsObject: false, opensBrace: false });
  });

  it("correctly tracks objectDepth when { is on the next line after declaration", () => {
    // Tests the pendingBraceStack mechanism
    const code = `
outer: Room
{
    north = corridor;
}
inner: Room 'name'
    north = corridor;
`;
    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    // outer has { on line 3 (next line after declaration on line 2)
    // After } on line 5, objectDepth should return to 0
    const outerClose = [...result.entries()].find(([_, d]) => d.objectId === "outer" && d.events.endsObject);
    expect(outerClose).toBeDefined();
    expect(outerClose![1].stateAfter).toEqual({ objectDepth: 0, braceDepth: 0 });
    // inner is inline style (ends with ;), also returns to 0
    const innerClose = [...result.entries()].find(([_, d]) => d.objectId === "inner" && d.events.endsObject);
    expect(innerClose).toBeDefined();
    expect(innerClose![1].stateAfter).toEqual({ objectDepth: 0, braceDepth: 0 });
  });

  it("does not misidentify ternary colon as object declaration", () => {
    // Regression: foo = (bar != nil ? bar.foo : baz) was false-positiving on 'foo :' in the ternary
    const code = `
obj: Room
    foo = (bar != nil ? bar.foo : baz)
    bar = nil
;
next: Room
;
`;
    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    // After obj's ; closes, next should start at objectDepth 0
    const nextDecl = [...result.entries()].find(([_, d]) => d.objectId === "next" && d.events.startsObject);
    expect(nextDecl).toBeDefined();
    expect(nextDecl![1].stateBefore).toEqual({ objectDepth: 0, braceDepth: 0 });
  });

  it("classifies method blocks correctly with { on next line", () => {
    const code = `
obj: Room
    methodA(arg)
    {
        return arg;
    }
;
`;
    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    const entries = [...result.entries()];
    // Row 4 is the { for methodA
    // objectDepth should stay 1 (inside obj), braceDepth becomes 1
    expect(entries[4 - 1][1].rawText.trim()).toBe("{");
    expect(entries[4 - 1][1].stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(entries[4 - 1][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(entries[4 - 1][1].events.opensBrace).toBe(true);
    // Row 6 is the } for methodA — objectDepth stays 1 (just a method close)
    expect(entries[6 - 1][1].rawText.trim()).toBe("}");
    expect(entries[6 - 1][1].stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(entries[6 - 1][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    // Row 7 ; closes obj — objectDepth returns to 0
    expect(entries[7 - 1][1].stateAfter).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(entries[7 - 1][1].events.endsObject).toBe(true);
  });

  it("handles dobjFor-style propertySets as method blocks", () => {
    const code = `
myObj: Thing
    dobjFor(Take)
    {
        action()
        {
            "You take it.";
        }
    }
;
`;
    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    const entries = [...result.entries()];
    // Row 4: { for dobjFor(Take) — objectDepth stays 1
    expect(entries[4 - 1][1].stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(entries[4 - 1][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    // Row 6: { for action() — objectDepth stays 1, braceDepth 2
    expect(entries[6 - 1][1].stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(entries[6 - 1][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 2 });
    // Row 8: } for action()
    expect(entries[8 - 1][1].stateBefore).toEqual({ objectDepth: 1, braceDepth: 2 });
    expect(entries[8 - 1][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    // Row 9: } for dobjFor
    expect(entries[9 - 1][1].stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(entries[9 - 1][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    // Row 10: ; closes myObj
    expect(entries[10 - 1][1].stateAfter).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(entries[10 - 1][1].events.endsObject).toBe(true);
  });

  it("handles nested braced objects with correct objectDepth tracking", () => {
    const code = `
outer: Room
{
    inner: Fixture
    {
        prop = 1;
    }
}
`;
    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    const entries = [...result.entries()];
    // Row 3: { for outer
    expect(entries[3 - 1][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    // Row 5: { for inner — objectDepth 2, braceDepth 2
    expect(entries[5 - 1][1].stateAfter).toEqual({ objectDepth: 2, braceDepth: 2 });
    // Row 7: } for inner — objectDepth back to 1
    expect(entries[7 - 1][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(entries[7 - 1][1].events.endsObject).toBe(true);
    // Row 8: } for outer — objectDepth back to 0
    expect(entries[8 - 1][1].stateAfter).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(entries[8 - 1][1].events.endsObject).toBe(true);
  });
});
