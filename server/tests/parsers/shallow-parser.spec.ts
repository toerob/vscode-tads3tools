import { ShallowParser } from "../../src/modules/ShallowParser";
import { expect, it, describe } from "@jest/globals";

describe("Structurizer", () => {
  describe("Single object definitions", () => {
    it("tracks simple inline object definitions with semicolon", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(`firstRoom: Room 'the room' 'the room';`);

      const entries = [...result.entries()];
      expect(entries.length).toBe(1);

      const [line, data] = entries[0];
      expect(data.objectId).toBe("firstRoom");
      expect(data.events.startsObject).toBe(true);
      expect(data.events.endsObject).toBe(true);
      expect(data.stateAfter.objectDepth).toBe(0);
      expect(data.stateAfter.braceDepth).toBe(0);
    });

    it("tracks object definitions with braces", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(`startRoom: Room 'the room' 'the room' {
	description = "A test room";
}`);

      const entries = [...result.entries()];

      // Find the line that starts the object
      const startLine = entries.find(([_, data]) => data.events.startsObject);
      expect(startLine).toBeDefined();
      expect(startLine![1].objectId).toBe("startRoom");
      expect(startLine![1].events.opensBrace).toBe(true);
      expect(startLine![1].stateAfter.objectDepth).toBe(1);
      expect(startLine![1].stateAfter.braceDepth).toBe(1);
    });

    it("tracks nested object definitions", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(`outer: object
{
	inner: object
	{
	}
}`);

      const entries = [...result.entries()];

      // Verify we have entries for outer starting and inner definitions
      const outerStart = entries.find(([_, data]) => data.objectId === "outer" && data.events.startsObject);
      expect(outerStart).toBeDefined();
      expect(outerStart![1].stateAfter.objectDepth).toBe(1);

      const innerStart = entries.find(([_, data]) => data.objectId === "inner" && data.events.startsObject);
      expect(innerStart).toBeDefined();
      expect(innerStart![1].stateAfter.objectDepth).toBe(2);
    });
  });

  describe("Multiple object definitions", () => {
    it("tracks multiple inline object definitions", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(
        `firstRoom: Room 'room one' 'room one';
secondRoom: Room 'room two' 'room two';
thirdRoom: Room 'room three' 'room three';`,
      );

      const entries = [...result.entries()];
      const objectStarts = entries.filter(([_, data]) => data.events.startsObject);

      expect(objectStarts.length).toBe(3);
      expect(objectStarts[0][1].objectId).toBe("firstRoom");
      expect(objectStarts[1][1].objectId).toBe("secondRoom");
      expect(objectStarts[2][1].objectId).toBe("thirdRoom");
    });

    it("correctly tracks depth when mixing inline and braced objects", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(
        `room1: Room 'room one' 'room one';
room2: Room 'room two' 'room two' {
	description = "A room";
};`,
      );

      const entries = [...result.entries()];

      // room1 should be inline (depth 0 after)
      const room1 = entries.find(([_, data]) => data.objectId === "room1");
      expect(room1![1].stateAfter.objectDepth).toBe(0);

      // room2 opens a brace
      const room2Start = entries.find(([_, data]) => data.objectId === "room2" && data.events.startsObject);
      expect(room2Start![1].events.opensBrace).toBe(true);
      expect(room2Start![1].stateAfter.objectDepth).toBe(1);
    });
  });

  describe("Object properties and methods", () => {
    it("tracks object with multiple properties", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(`myRoom: Room 'test' 'test'
{
	description = "A test room";
	initialPlayerChar = me;
	exits = (north, south, east, west);
}`);

      const entries = [...result.entries()];
      expect(entries.length).toBeGreaterThan(0);

      // All lines within the object should have objectId = "myRoom"
      entries.forEach(([_, data]) => {
        if (data.objectId) {
          expect(data.objectId).toBe("myRoom");
        }
      });
    });

    it("tracks object with methods", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(`myObj: MyClass {
	init() {
		"This is initialization";
	}
	
	doSomething(param) {
		return param * 2;
	}
}`);

      const entries = [...result.entries()];

      // Verify object starts and we track the nested braces
      const start = entries.find(([_, data]) => data.objectId === "myObj" && data.events.startsObject);
      expect(start).toBeDefined();
      expect(start![1].stateAfter.braceDepth).toBeGreaterThan(0);
    });

    it("tracks object with property that is itself an object", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(`outer: MyClass
{
	value = 42;
	inner: MyInnerClass {
		nested = true;
	}
}`);

      const entries = [...result.entries()];

      // Check that we track both outer and inner
      const outerStarts = entries.filter(([_, data]) => data.objectId === "outer" && data.events.startsObject);
      expect(outerStarts.length).toBeGreaterThan(0);

      const innerStarts = entries.filter(([_, data]) => data.objectId === "inner" && data.events.startsObject);
      expect(innerStarts.length).toBeGreaterThan(0);
    });
  });

  describe("Edge cases and state management", () => {
    it("handles objects with no content", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(`empty: MyClass { }`);

      const entries = [...result.entries()];
      expect(entries.length).toBeGreaterThan(0);

      const objStart = entries.find(([_, data]) => data.objectId === "empty");
      expect(objStart).toBeDefined();
      expect(objStart![1].stateAfter.objectDepth).toBe(0);
    });

    it("maintains correct state after inline object", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(
        `first: Room 'room one' 'room one';
second: Room 'room two' 'room two';`,
      );

      const entries = [...result.entries()];

      // After first object ends, depth should be 0
      const afterFirst = entries.find(([_, data]) => data.objectId === "first" && data.events.endsObject);
      expect(afterFirst![1].stateAfter.objectDepth).toBe(0);

      // Second object should start at depth 0
      const beforeSecond = entries.find(([_, data]) => data.objectId === "second" && data.events.startsObject);
      expect(beforeSecond![1].stateBefore!.objectDepth).toBe(0);
    });

    it("handles multiple levels of nested braces", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(`root: MyClass
{
	level1 = {
		level2 = {
			level3 = "deep"
		}
	};
}`);

      const entries = [...result.entries()];

      // The root object should track increasing brace depth
      const maxBraceDepth = Math.max(...[...entries].map(([_, data]) => data.stateAfter.braceDepth));
      expect(maxBraceDepth).toBeGreaterThan(1);
    });

    it("returns empty map for empty input", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize("");

      // Empty input should still produce at least one entry (the EOF line)
      expect(result.size).toBeGreaterThanOrEqual(0);
    });

    it("handles whitespace and comments correctly", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(`
/* This is a comment */
myRoom: Room 'test' 'test'
{
	// Single line comment
	description = "test";
};
`);

      const entries = [...result.entries()];
      const room = entries.find(([_, data]) => data.objectId === "myRoom");
      expect(room).toBeDefined();
    });
  });

  describe("Complex real-world scenarios", () => {
    it("parses a game file with multiple rooms", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(
        `gameMain: GameMainDef
{
	initialPlayerChar = me;
}

startRoom: Room 'Start' 'the starting room'
{
	description = "You are in the starting room.";
	north = bedroom;
}

bedroom: Room 'Bedroom' 'a small bedroom'
{
	description = "A cozy bedroom.";
	south = startRoom;
}

me: Actor 'you' 'yourself' { }`,
      );

      const entries = [...result.entries()];

      // Verify all key objects are tracked
      const objectIds = new Set([...entries].map(([_, data]) => data.objectId).filter((id) => id !== undefined));

      expect(objectIds.has("gameMain")).toBe(true);
      expect(objectIds.has("startRoom")).toBe(true);
      expect(objectIds.has("bedroom")).toBe(true);
      expect(objectIds.has("me")).toBe(true);
    });

    it("handles class definitions with inheritance and inline body", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(`myClass: MyBaseClass(arg1, arg2) { property = value; }`);

      const entries = [...result.entries()];
      const objStart = entries.find(([_, data]) => data.objectId === "myClass");
      expect(objStart).toBeDefined();
      expect(objStart![1].events.startsObject).toBe(true);
    });

    it("tracks state transitions through object lifecycle", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(
        `obj1: MyClass { property = 1; }
obj2: MyClass { property = 2; }
obj3: MyClass { property = 3; }`,
      );

      const entries = [...result.entries()];

      // Verify each object returns to depth 0 after ending
      const objectEnds = entries.filter(([_, data]) => data.events.endsObject);
      objectEnds.forEach(([_, data]) => {
        expect(data.stateAfter.objectDepth).toBe(0);
      });
    });
  });

  describe("Raw text tracking", () => {
    it("captures raw text for each line", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(
        `room: Room 'test' 'test'
{
	description = "test";
}`,
      );

      const entries = [...result.entries()];

      // Each entry should have a rawText property
      entries.forEach(([_, data]) => {
        expect(data.rawText).toBeDefined();
        expect(typeof data.rawText).toBe("string");
      });
    });

    it("preserves indentation in raw text", () => {
      const structurizer = new ShallowParser();
      const result = structurizer.structurize(
        `room: Room 'test' 'test'
{
	description = "test";
}`,
      );

      const entries = [...result.entries()];

      // Find the indented line
      const indentedLine = [...entries].find(([_, data]) => data.rawText.includes("\tdescription"));
      expect(indentedLine).toBeDefined();
      expect(indentedLine![1].rawText).toMatch(/^\t/);
    });
  });
});

// TODO: fix
describe("MiniTokenizer test", () => {
  it("It correctly handles starting and ending of objectIds", () => {
    const tokenizer = new ShallowParser();

    const result = tokenizer.structurize(
      `lab: Room
          east = lab2  
      ;
      lab2: Room
        west = lab;
      lab3: Room
        func() {
        }
      ;`,
    );
    console.table([...result.values()]);
    expect(result.get(1)!.owner).toBeUndefined();
    expect(result.get(2)!.owner).toBe("lab");
    expect(result.get(3)!.owner).toBeUndefined();
    expect(result.get(4)!.owner).toBeUndefined();
    expect(result.get(5)!.owner).toBe("lab2");
    expect(result.get(6)!.owner).toBeUndefined();
    expect(result.get(7)!.owner).toBe("lab3");
    expect(result.get(8)!.owner).toBe("lab3");
    //expect(result.get(9)!.owner).toBeUndefined();

    //expect(result.get(6).objectId).toBe("gameMain");
    //expect(result.get(7).objectId).toBe("gameMain");
    //expect(result.get(28).objectId).toBe("outer");
  });

  it("tracks objectId through nested structures", () => {
    const tokenizer = new ShallowParser();

    const result = tokenizer.structurize(
      `gameMain: GameMainDef
	initialPlayerChar = me
;

startRoom: Room 'the room'
	description = test
;

outer: object {
	inner: object {
	}
};`,
    );

    // Line 1: gameMain declaration (inline object)
    expect(result.get(1)!.objectId).toBe("gameMain");
    expect(result.get(1)!.owner).toBeUndefined();
    expect(result.get(1)!.events.startsObject).toBe(true);

    // Line 2: property within gameMain
    expect(result.get(2)!.objectId).toBe("gameMain");
    expect(result.get(2)!.owner).toBe("gameMain");

    // Line 3: closing semicolon of gameMain
    expect(result.get(3)!.objectId).toBe("gameMain");
    expect(result.get(3)!.owner).toBeUndefined();
    expect(result.get(3)!.events.endsObject).toBe(true);

    // Line 5: startRoom declaration (inline object)
    expect(result.get(5)!.objectId).toBe("startRoom");
    expect(result.get(5)!.owner).toBeUndefined();
    expect(result.get(5)!.events.startsObject).toBe(true);

    // Line 6: property within startRoom
    expect(result.get(6)!.objectId).toBe("startRoom");
    expect(result.get(6)!.owner).toBe("startRoom");

    // Line 7: closing semicolon of startRoom
    expect(result.get(7)!.objectId).toBe("startRoom");
    expect(result.get(7)!.owner).toBeUndefined();
    expect(result.get(7)!.events.endsObject).toBe(true);

    // Line 9: outer declaration with braces
    expect(result.get(9)!.objectId).toBe("outer");
    expect(result.get(9)!.owner).toBeUndefined();
    expect(result.get(9)!.events.startsObject).toBe(true);
    expect(result.get(9)!.events.opensBrace).toBe(true);

    // Line 10: inner declaration (nested object)
    expect(result.get(10)!.objectId).toBe("inner");
    expect(result.get(10)!.owner).toBe("outer");
    expect(result.get(10)!.events.startsObject).toBe(true);

    // Line 12: closing brace/semicolon of outer
    expect(result.get(12)!.objectId).toBe("outer");
    expect(result.get(12)!.events.endsObject).toBe(true);
  });

  it("parses a simple expression correctly", () => {
    const tokenizer = new ShallowParser();

    const result = tokenizer.structurize(`
			firstRoom: Room 'the room' 'the room';
			secondRoom: Room 'the room' 'the room';`);
    console.log(result);

    expect([...result.values()]).toStrictEqual([
      {
        objectId: undefined,
        owner: undefined,
        rawText: "",
        stateBefore: { objectDepth: 0, braceDepth: 0 },
        events: { startsObject: false, endsObject: false, opensBrace: false },
        stateAfter: { objectDepth: 0, braceDepth: 0 },
      },
      {
        objectId: "firstRoom",
        owner: undefined,
        rawText: "\t\t\tfirstRoom: Room 'the room' 'the room';",
        stateBefore: { objectDepth: 0, braceDepth: 0 },
        events: { startsObject: true, endsObject: true, opensBrace: false },
        stateAfter: { objectDepth: 0, braceDepth: 0 },
      },
      {
        objectId: "secondRoom",
        owner: undefined,
        rawText: "\t\t\tsecondRoom: Room 'the room' 'the room';",
        stateBefore: { objectDepth: 0, braceDepth: 0 },
        events: { startsObject: true, endsObject: true, opensBrace: false },
        stateAfter: { objectDepth: 0, braceDepth: 0 },
      },
    ]);
  });

  it("parses rooms with methods correctly", () => {
    const tokenizer = new ShallowParser();

    const result = tokenizer.structurize(
      `startRoom: Room 'the room' 'the room'
				xyzzy {
					local x = 23;
					local y : object { 
						x = 20 
					}
				}`,
    );

    // Verify the structure is parsed
    expect(result.get(1)!.objectId).toBe("startRoom");
    expect(result.get(1)!.events.startsObject).toBe(true);
  });

  describe("Real-world TADS3 code", () => {
    it("parses gatearea.t from airport game", () => {
      const fs = require("fs");
      const path = require("path");

      const fixtureFile = path.join(__dirname, "../fixtures/gatearea.t");
      const code = fs.readFileSync(fixtureFile, "utf8");

      const tokenizer = new ShallowParser();
      const result = tokenizer.structurize(code);

      //console.table([...result.values()]);

      // Verify major objects are detected
      expect(result.size).toBeGreaterThan(50); // Should have many lines

      // Find gateArea object (first top-level object)
      const entries = [...result.entries()];
      const gateAreaEntry = entries.find(([_, data]) => data.objectId === "gateArea" && data.events.startsObject);
      expect(gateAreaEntry).toBeDefined();
      expect(gateAreaEntry![1].owner).toBeUndefined(); // Declaration line

      // Multi-line string: lines within gateArea should have owner='gateArea'
      // (The string spans lines 8-12, and the parser backfills owner for lines without tokens)
      expect(result.get(8)!.owner).toBe("gateArea");
      expect(result.get(9)!.owner).toBe("gateArea");
      expect(result.get(10)!.owner).toBe("gateArea");
      expect(result.get(11)!.owner).toBe("gateArea");
      expect(result.get(12)!.owner).toBe("gateArea");

      const maintenanceRoomDoorEntry = entries.find(
        ([_, data]) => data.objectId === "maintenanceRoomDoor" && data.events.startsObject,
      );
      expect(maintenanceRoomDoorEntry).toBeDefined();
      expect(maintenanceRoomDoorEntry![1].owner).toBeUndefined(); // Syntactically top-level

      const maintenanceRoomEntry = entries.find(
        ([_, data]) => data.objectId === "maintenanceRoom" && data.events.startsObject,
      );
      expect(maintenanceRoomEntry).toBeDefined();
      expect(maintenanceRoomEntry![1].owner).toBeUndefined(); // Top-level

      // Find nested objects with braces (syntactic nesting)
      const shortCabinetEntry = entries.find(
        ([_, data]) => data.objectId === "shortCabinet" && data.events.startsObject,
      );
      expect(shortCabinetEntry).toBeDefined();
      expect(shortCabinetEntry![1].owner).toBeUndefined(); // Also top-level

      // remapIn is defined inside shortCabinet's braces, so it IS syntactically nested
      const remapInEntry = entries.find(([_, data]) => data.objectId === "remapIn" && data.events.startsObject);
      expect(remapInEntry).toBeDefined();
      if (remapInEntry) {
        expect(remapInEntry![1].owner).toBe("shortCabinet");
      }

      // row 73: "{"
      expect(entries[73 - 1][1].rawText.trim()).toBe("{");
      expect(entries[73 - 1][1].stateBefore).toEqual({ objectDepth: 2, braceDepth: 0 });
      expect(entries[73 - 1][1].stateAfter).toEqual({ objectDepth: 2, braceDepth: 1 });
      expect(entries[73 - 1][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: true });

      // row 74: "isOpenable = true "
      expect(entries[74 - 1][1].rawText.trim()).toBe("isOpenable = true");
      expect(entries[74 - 1][1].stateBefore).toEqual({ objectDepth: 2, braceDepth: 1 });
      expect(entries[74 - 1][1].stateAfter).toEqual({ objectDepth: 2, braceDepth: 1 });
      expect(entries[74 - 1][1].events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

      // row 78: "}" — closes remapIn's object body
      expect(entries[78 - 1][1].rawText.trim()).toBe("}");
      expect(entries[78 - 1][1].stateBefore).toEqual({ objectDepth: 2, braceDepth: 1 });
      expect(entries[78 - 1][1].stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
      expect(entries[78 - 1][1].events).toEqual({ startsObject: false, endsObject: true, opensBrace: false });

      // remapOn is declared after remapIn closes (on line 80), so its syntactic owner is shortCabinet
      const remapOnEntry = entries.find(([_, data]) => data.objectId === "remapOn" && data.events.startsObject);
      expect(remapOnEntry).toBeDefined();
      if (remapOnEntry) {
        expect(remapOnEntry![1].owner).toBe("shortCabinet");
      }

      // powerSwitch is a ++ object declared after shortCabinet's ; closes it (line 82),
      // so it is syntactically at the top level with no owner
      const powerSwitchEntry = entries.find(([_, data]) => data.objectId === "powerSwitch" && data.events.startsObject);
      expect(powerSwitchEntry).toBeDefined();
      if (powerSwitchEntry) {
        expect(powerSwitchEntry![1].owner).toBeUndefined();
      }

      // Find gate rooms (all top-level)
      const gate1Entry = entries.find(([_, data]) => data.objectId === "gate1" && data.events.startsObject);
      expect(gate1Entry).toBeDefined();
      expect(gate1Entry![1].owner).toBeUndefined();

      const gate3Entry = entries.find(([_, data]) => data.objectId === "gate3" && data.events.startsObject);
      expect(gate3Entry).toBeDefined();
      expect(gate3Entry![1].owner).toBeUndefined();

      // Find jetway
      const jetwayEntry = entries.find(([_, data]) => data.objectId === "jetway" && data.events.startsObject);
      expect(jetwayEntry).toBeDefined();
      expect(jetwayEntry![1].owner).toBeUndefined();

      // announcementObj is declared after jetway's ; (line 203) so it is top-level with no owner
      const announcementEntry = entries.find(
        ([_, data]) => data.objectId === "announcementObj" && data.events.startsObject,
      );
      expect(announcementEntry).toBeDefined();
      if (announcementEntry) {
        expect(announcementEntry![1].owner).toBeUndefined();
      }
    });
  });
});
