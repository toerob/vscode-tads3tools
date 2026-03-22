import { describe, it } from '@jest/globals';
import { assertParses } from './parseHelper';

// ── template DEFINITION (top-level templateDeclaration) ───────────────────────
//
// Syntax: ClassName template slot1? | slot2 ... ;
//
// A slot is one of:
//   'propName'            — matched by a single-quoted string value
//   "propName"            — matched by a double-quoted string value
//   [listProp]            — matched by a list value
//   op propName           — matched by op followed by a primary expression
//   inherited             — expand from superclass templates
//
// '?' marks a slot optional; '|' groups the preceding slot with the next
// as alternatives (only one of the group need be supplied).

describe('templateDeclaration → object template definition', () => {
  it('defines a single single-quoted slot', () => {
    // Room template 'name';
    assertParses("Room template 'name';");
  });

  it('defines two slots (single-quoted then double-quoted)', () => {
    // Actor template 'name' "description";
    assertParses("Actor template 'name' \"description\";");
  });

  it('defines an optional slot with ?', () => {
    // Room template 'name' 'description'?;
    assertParses("Room template 'name' 'description'?;");
  });

  it('defines alternative slots with |', () => {
    // Thing template 'name' | "name";
    assertParses("Thing template 'name' | \"name\";");
  });

  it('defines a list slot [propName]', () => {
    // Thing template [vocabWords] 'name';
    assertParses("Thing template [vocabWords] 'name';");
  });

  it('defines an @ operator slot', () => {
    // Actor template @location 'name';
    assertParses("Actor template @location 'name';");
  });

  it('defines a + operator slot', () => {
    // Thing template +containingProp;
    assertParses("Thing template +containingProp;");
  });

  it('defines an arrow (->) operator slot', () => {
    // ConnectorItem template ->destination;
    assertParses("ConnectorItem template ->destination;");
  });

  it('defines an inherited expansion', () => {
    // SubRoom template inherited 'desc';
    assertParses("SubRoom template inherited 'desc';");
  });

  it('defines a complex real-world-style template', () => {
    // Room template 'name' 'description'? @location?;
    assertParses("Room template 'name' 'description'? @location?;");
  });
});

describe('templateDeclaration → string template definition', () => {
  it('defines a string template with no star', () => {
    // string template <<foo>> myFunc;
    assertParses('string template <<foo>> myFunc;');
  });

  it('defines a string template with a star', () => {
    // string template <<* foo>> myFunc;
    assertParses('string template <<* foo>> myFunc;');
  });

  it('defines a string template with is/in tokens', () => {
    // string template <<is foo>> myFunc;
    assertParses('string template <<is foo>> myFunc;');
  });
});

// ── template USAGE (templateExpr inline in object body) ──────────────────────
//
// Syntax: objectName: ClassName templateVal1 templateVal2 { props }
//
// Usage slots:
//   'string value'        — single-quoted
//   "string value"        — double-quoted
//   [a, b, c]             — list
//   op primaryExpr        — op consumed, value is the primary

describe('templateExpr → inline usage in object body', () => {
  it('uses a single-quoted string', () => {
    assertParses("myRoom: Room 'The Office' { }");
  });

  it('uses a double-quoted string', () => {
    assertParses('myRoom: Room "The Office" { }');
  });

  it('uses two string values', () => {
    assertParses("myRoom: Room 'The Office' 'A plain room.' { }");
  });

  it('uses @ operator (location)', () => {
    assertParses('bob: Actor @startRoom { }');
  });

  it('uses -> (arrow) operator', () => {
    assertParses('myDoor: Door ->otherRoom { }');
  });

  it('uses a list value', () => {
    assertParses("myThing: Thing ['ball', 'red ball'] 'name' { }");
  });

  it('uses + operator', () => {
    assertParses("myObj: Thing +carrying { }");
  });

  it('mixes multiple template values', () => {
    // @ location, then two strings
    assertParses("bob: Actor @startRoom 'Bob' \"This is Bob.\" { }");
  });

  it('uses template values before a semicolon-ended body', () => {
    assertParses("myRoom: Room 'The Office';");
  });
});
