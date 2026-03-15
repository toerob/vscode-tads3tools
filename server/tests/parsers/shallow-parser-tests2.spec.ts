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

    const row = 5054 - 1;
    const expectedRawText = "libGlobal.playerChar = actor;";
    expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
    expect(entries[row][1].stateBefore).toEqual({ objectDepth: 0, braceDepth: 1 });
    expect(entries[row][1].stateAfter).toEqual({ objectDepth: 0, braceDepth: 1 });
    expect(entries[row][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
  });

  it("parses maintenanceRoomDoor correctly", ()=> {
    const code = `
        + maintenanceRoomDoor: Door 'metal door'
            "description of the door"
        ;
    `
    

    const tokenizer = new ShallowParser();
    const result = tokenizer.structurize(code);
    const entries = [...result.entries()];

    const row = 2 - 1;
    const expectedRawText = "+ maintenanceRoomDoor: Door 'metal door'";
    expect(entries[row][1].rawText.trim()).toBe(expectedRawText);
    expect(entries[row][1].stateBefore).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(entries[row][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(entries[row][1].events).toEqual({ startsObject: true, endsObject: false, opensBrace: false });

  })
});
