import { describe, it } from '@jest/globals';
import { assertParses } from './parseHelper';

// ── property definitions ───────────────────────────────────────────────────────
//
// Inside an object body, properties take one of these forms:
//   propName = expr             — simple value assignment (no semicolon inside {})
//   propName = static expr      — static initializer
//   propName : ClassName { }    — nested anonymous object
//   propName(args) { }          — method (parenthesised args)
//   propName { }                — method (no args, bare brace)
//   replace propName(args) { }  — per-property replace (modify objects only)

describe('objectBody → simple property assignments', () => {
  it('assigns a number literal', () => {
    assertParses("myObj: Thing { pts = 5 }");
  });

  it('assigns a single-quoted string', () => {
    assertParses("myObj: Thing { name = 'hello' }");
  });

  it('assigns a double-quoted string (desc)', () => {
    assertParses('myObj: Thing { desc = "A plain room." }');
  });

  it('assigns a list literal', () => {
    assertParses("myObj: Thing { items = [1, 2, 3] }");
  });

  it('assigns a new expression', () => {
    assertParses("myObj: Thing { loc = new Room() }");
  });

  it('assigns a nil literal', () => {
    assertParses("myObj: Thing { cargo = nil }");
  });

  it('assigns a static new expression', () => {
    assertParses("myObj: Thing { loc = static new Room() }");
  });

  it('assigns multiple properties without semicolons', () => {
    assertParses("myObj: Thing { name = 'box'  weight = 10 }");
  });
});

// ── method definitions ─────────────────────────────────────────────────────────

describe('objectBody → method definitions', () => {
  it('defines a no-arg method with braces', () => {
    assertParses("myObj: Thing { doIt() { return 1; } }");
  });

  it('defines a method with one argument', () => {
    assertParses("myObj: Thing { take(actor) { return true; } }");
  });

  it('defines a method with multiple arguments', () => {
    assertParses("myObj: Thing { move(x, y, z) { } }");
  });

  it('defines a bare-brace method (no parens)', () => {
    assertParses('myObj: Thing { desc { "You see a box."; } }');
  });

  it('defines a method with a local variable', () => {
    assertParses("myObj: Thing { foo() { local x = 1; return x; } }");
  });

  it('defines a method with an if statement', () => {
    assertParses("myObj: Thing { check(a) { if (a > 0) return true; return false; } }");
  });
});

// ── replace-prefixed methods (inside modify objects) ──────────────────────────

describe('objectBody → replace-prefixed methods', () => {
  it('replace prefix on a no-arg method', () => {
    assertParses("modify myObj { replace doIt() { return 2; } }");
  });

  it('replace prefix on a method with args', () => {
    assertParses("modify myObj { replace take(actor) { return false; } }");
  });
});

// ── nested object property (prop: ClassName { }) ─────────────────────────────

describe('objectBody → nested object property', () => {
  it('assigns a nested single-class object', () => {
    assertParses("myObj: Thing { loc: Room { } }");
  });

  it('assigns a nested multi-class object', () => {
    assertParses("myObj: Thing { loc: Room, Dark { } }");
  });
});

// ── propertyset ────────────────────────────────────────────────────────────────
//
// Syntax (from TADS3 docs and compiler source):
//   propertyset 'pattern' { propertyList }
//   propertyset 'pattern' (param, *, param) { propertyList }
//
// The pattern is a single-quoted string containing exactly one '*' wildcard.
// If a formal parameter list is present, it must contain exactly one '*'.

describe('objectBody → propertyset', () => {
  it('bare propertyset with no params', () => {
    assertParses("myObj: Thing { propertyset '*Foo' { bar() { } } }");
  });

  it('propertyset with wildcard-only param list', () => {
    assertParses("myObj: Thing { propertyset '*Foo' (*) { bar() { } } }");
  });

  it('propertyset with named params around wildcard', () => {
    assertParses("myObj: Thing { propertyset '*DobjFor' (actor, *, obj) { check() { } } }");
  });
});

// ── operator overrides ─────────────────────────────────────────────────────────

describe('objectBody → operator overrides', () => {
  it('overrides operator +', () => {
    assertParses("myObj: Thing { operator+(other) { return self; } }");
  });

  it('overrides operator []', () => {
    assertParses("myObj: Thing { operator[](idx) { return nil; } }");
  });

  it('overrides operator []=', () => {
    assertParses("myObj: Thing { operator[]=(idx, val) { } }");
  });
});

// ── mixed body ─────────────────────────────────────────────────────────────────

describe('objectBody → mixed properties and methods', () => {
  it('mixes properties and methods', () => {
    assertParses(
      `myRoom: Room {
        name = 'The Office'
        desc = "A plain room."
        north = hall
        enter(actor) { actor.moveInto(self); }
      }`
    );
  });

  it('real-world adv3Lite Thing-like body', () => {
    assertParses(
      `theBall: Thing 'red ball' @startRoom {
        desc = "A shiny red ball."
        weight = 2
        doTake(actor) { actor.addToContents(self); }
      }`
    );
  });
});
