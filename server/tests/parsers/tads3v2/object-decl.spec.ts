import { describe, it } from '@jest/globals';
import { assertParses } from './parseHelper';

// ── named objects ─────────────────────────────────────────────────────────────

describe('objectDeclaration → named object', () => {
  it('parses a named object with one superclass', () => {
    assertParses('myObj: Thing { }');
  });

  it('parses a named object with multiple superclasses', () => {
    assertParses('myObj: Thing, Readable { }');
  });

  it('parses a named object with no superclass', () => {
    assertParses('myObj: { }');
  });

  it('parses a class declaration', () => {
    assertParses('class MyClass: Thing { }');
  });

  it('parses a replace object', () => {
    assertParses('replace myObj: Thing { }');
  });

  it('parses a replace class', () => {
    assertParses('replace class MyClass: Thing { }');
  });

  it('parses a transient object', () => {
    assertParses('transient myObj: Thing { }');
  });

  it('parses a semicolon-ended object', () => {
    assertParses('myObj: Thing;');
  });
});

// ── anonymous objects ─────────────────────────────────────────────────────────

describe('objectDeclaration → anonymous object', () => {
  it('parses an anonymous object with one superclass', () => {
    assertParses('Thing { }');
  });

  it('parses an anonymous object with multiple superclasses', () => {
    assertParses('Thing, Readable { }');
  });

  it('parses an anonymous + object', () => {
    assertParses('+ Thing { }');
  });

  it('parses an anonymous ++ object', () => {
    assertParses('++ Thing { }');
  });
});

// ── modify ────────────────────────────────────────────────────────────────────

describe('objectDeclaration → modify', () => {
  it('parses a modify object (no colon, no superclass list)', () => {
    assertParses('modify myObj { }');
  });

  it('parses a modify object with semicolon body', () => {
    assertParses('modify myObj;');
  });
});

// ── modify / replace functions ────────────────────────────────────────────────
//
// From parse_modify (tcprsprg.cpp 5269):
//   modify function funcName(args) { }   — MODIFY + FUNCTION keyword
//   modify funcName(args) { }            — MODIFY + bare name + ( (no FUNCTION kw)
//
// From parse_replace (tcprsprg.cpp 5301):
//   replace function funcName(args) { }  — REPLACE + FUNCTION keyword
//   replace funcName(args) { }           — REPLACE + bare name (via parse_object_or_func)

describe('functionDeclaration → modify / replace', () => {
  it('modify function with function keyword', () => {
    assertParses('modify function myFunc() { }');
  });

  it('modify function without function keyword', () => {
    assertParses('modify myFunc() { }');
  });

  it('replace function with function keyword', () => {
    assertParses('replace function myFunc() { }');
  });

  it('plain function (no modifier)', () => {
    assertParses('myFunc() { return 1; }');
  });

  it('function with function keyword (no modifier)', () => {
    assertParses('function myFunc(x, y) { return x + y; }');
  });
});

// ── object bodies ─────────────────────────────────────────────────────────────

describe('objectDeclaration → with properties', () => {
  it('parses an object with a simple property', () => {
    assertParses('myObj: Thing { name = \'test\'; }');
  });

  it('parses an object with a method', () => {
    assertParses('myObj: Thing { doSomething() { return 1; } }');
  });
});
