import { describe, it, expect } from '@jest/globals';
import { parseProgram } from './parseHelper';

// ── globalEnvironment ─────────────────────────────────────────────────────────

describe('globalEnvironment — named objects', () => {
  it('registers a named object in the global scope', () => {
    const visitor = parseProgram('myObj: Thing { }');
    expect(visitor.globalEnvironment.getSymbol('myObj')).toBeDefined();
  });

  it('registers multiple named objects', () => {
    const visitor = parseProgram(`
      kitchen: Room { }
      livingRoom: Room { }
    `);
    expect(visitor.globalEnvironment.getSymbol('kitchen')).toBeDefined();
    expect(visitor.globalEnvironment.getSymbol('livingRoom')).toBeDefined();
  });

  it('does not register anonymous objects in the global scope', () => {
    const visitor = parseProgram('Thing { }');
    // There is no name to register — global scope should be empty
    expect(Object.keys(visitor.globalEnvironment.envs)).toHaveLength(0);
  });
});

describe('globalEnvironment — object properties and methods', () => {
  it('registers object properties in the object\'s inner scope (not global)', () => {
    const visitor = parseProgram('myObj: Thing { name = \'test\'; }');
    // 'name' is a property inside myObj — should NOT appear in global scope
    expect(visitor.globalEnvironment.getSymbol('name')).toBeUndefined();
    // The object itself IS in global scope
    expect(visitor.globalEnvironment.getSymbol('myObj')).toBeDefined();
  });

  it('registers methods in the object\'s inner scope (not global)', () => {
    const visitor = parseProgram('myObj: Thing { doSomething() { } }');
    expect(visitor.globalEnvironment.getSymbol('doSomething')).toBeUndefined();
    expect(visitor.globalEnvironment.getSymbol('myObj')).toBeDefined();
  });
});

describe('globalEnvironment — top-level functions', () => {
  it('registers a top-level function in global scope', () => {
    const visitor = parseProgram('function myFunc(x) { return x; }');
    expect(visitor.globalEnvironment.getSymbol('myFunc')).toBeDefined();
  });

  it('registers multiple top-level functions', () => {
    const visitor = parseProgram(`
      function add(a, b) { return a + b; }
      function greet() { "Hello."; }
    `);
    expect(visitor.globalEnvironment.getSymbol('add')).toBeDefined();
    expect(visitor.globalEnvironment.getSymbol('greet')).toBeDefined();
  });
});

describe('globalEnvironment — intrinsic declarations', () => {
  it('registers intrinsic declarations in global scope', () => {
    const visitor = parseProgram(`
      intrinsic class StringBuffer 'stringbuffer/030000': Object {
        append(str);
      }
    `);
    expect(visitor.globalEnvironment.getSymbol('StringBuffer')).toBeDefined();
  });

  it('does not leak intrinsic methods into global scope', () => {
    const visitor = parseProgram(`
      intrinsic class StringBuffer 'stringbuffer/030000': Object {
        append(str);
      }
    `);
    expect(visitor.globalEnvironment.getSymbol('append')).toBeUndefined();
  });

  it('does not leak any intrinsic methods into global scope (multiple methods)', () => {
    const visitor = parseProgram(`
      intrinsic class StringBuffer 'stringbuffer/030000': Object {
        append(str);
        appendText(str, count?);
      }
    `);
    expect(visitor.globalEnvironment.getSymbol('append')).toBeUndefined();
    expect(visitor.globalEnvironment.getSymbol('appendText')).toBeUndefined();
  });

  it('keeps top-level function symbols distinct from intrinsic methods with same name', () => {
    const visitor = parseProgram(`
      function append(x) { return x; }
      intrinsic class StringBuffer 'stringbuffer/030000': Object {
        append(str);
      }
    `);
    // Global lookup should resolve to the top-level function, not the intrinsic method.
    expect(visitor.globalEnvironment.getSymbol('append')).toBeDefined();
    expect(visitor.globalEnvironment.getSymbol('StringBuffer')).toBeDefined();
  });
});

// ── mapData / assignedProperties ─────────────────────────────────────────────

describe('mapData — assignedProperties', () => {
  it('records a simple assignment property', () => {
    const visitor = parseProgram("kitchen: Room { north = library; }");
    expect(visitor.mapData.get('kitchen')?.assignedProperties.has('north')).toBe(true);
  });

  it('records multiple directional assignments', () => {
    const visitor = parseProgram("foyer: Room { north = hall; south = exit; east = garden; }");
    const assigned = visitor.mapData.get('foyer')?.assignedProperties;
    expect(assigned?.has('north')).toBe(true);
    expect(assigned?.has('south')).toBe(true);
    expect(assigned?.has('east')).toBe(true);
  });

  it('does not count method bodies as assignments', () => {
    const visitor = parseProgram("myObj: Thing { doSomething() { return 1; } }");
    // methods go through functionDeclaration, not property — assignedProperties should be empty
    expect(visitor.mapData.get('myObj')?.assignedProperties.size).toBe(0);
  });

  it('does not count nested inline objects (COLON) as assignments', () => {
    const visitor = parseProgram("myObj: Thing { loc: Thing { } }");
    expect(visitor.mapData.get('myObj')?.assignedProperties.has('loc')).toBe(false);
  });

  it('records level correctly', () => {
    const visitor = parseProgram("kitchen: Room { }");
    expect(visitor.mapData.get('kitchen')?.level).toBe(0);
  });

  it('records isClass for class declarations', () => {
    const visitor = parseProgram("class MyRoom: Room { }");
    expect(visitor.mapData.get('MyRoom')?.isClass).toBe(true);
  });

  it('records isClass=false for non-class objects', () => {
    const visitor = parseProgram("kitchen: Room { }");
    expect(visitor.mapData.get('kitchen')?.isClass).toBe(false);
  });
});

// ── inheritanceMap ────────────────────────────────────────────────────────────

describe('inheritanceMap — class declarations', () => {
  it('records a class with a single supertype', () => {
    const visitor = parseProgram('class MyRoom: Room { }');
    expect(visitor.inheritanceMap.get('MyRoom')).toBe('Room');
  });

  it('records the last supertype when multiple are given (matches old listener)', () => {
    const visitor = parseProgram('class MyThing: Thing, Readable { }');
    expect(visitor.inheritanceMap.get('MyThing')).toBe('Readable');
  });

  it('records several classes independently', () => {
    const visitor = parseProgram(`
      class Alpha: Thing { }
      class Beta: Alpha { }
    `);
    expect(visitor.inheritanceMap.get('Alpha')).toBe('Thing');
    expect(visitor.inheritanceMap.get('Beta')).toBe('Alpha');
  });
});

describe('inheritanceMap — non-class objects', () => {
  it('does not add named objects (non-class) to inheritanceMap', () => {
    const visitor = parseProgram('myObj: Thing { }');
    expect(visitor.inheritanceMap.has('myObj')).toBe(false);
  });

  it('does not add anonymous objects to inheritanceMap', () => {
    const visitor = parseProgram('Thing { }');
    expect(visitor.inheritanceMap.size).toBe(0);
  });
});

describe('inheritanceMap — intrinsic classes', () => {
  it('records intrinsic class inheritance using the same rule as class declarations', () => {
    const visitor = parseProgram(`
      intrinsic class StringBuffer 'stringbuffer/030000': Object {
      }
    `);
    expect(visitor.inheritanceMap.get('StringBuffer')).toBe('Object');
  });

  it('does not add non-class intrinsics to inheritanceMap', () => {
    const visitor = parseProgram(`
      intrinsic 't3vm/010006' {
      }
    `);
    expect(visitor.inheritanceMap.has('t3vm/010006')).toBe(false);
  });
});
