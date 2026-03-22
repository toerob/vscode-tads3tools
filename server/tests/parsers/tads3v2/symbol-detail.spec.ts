import { describe, it, expect } from '@jest/globals';
import { parseSymbols } from './parseHelper';

// ── PropertyDecl detail (value text) ─────────────────────────────────────────

describe('PropertyDecl → detail carries value text', () => {
  it('identifier value: north = kitchen', () => {
    const syms = parseSymbols('myRoom: Room { north = kitchen }');
    const north = syms[0].children?.find(c => c.name === 'north');
    expect(north?.detail).toBe('kitchen');
  });

  it('number value: weight = 5', () => {
    const syms = parseSymbols("myObj: Thing { weight = 5 }");
    const weight = syms[0].children?.find(c => c.name === 'weight');
    expect(weight?.detail).toBe('5');
  });

  it('single-quoted string value: name = \'A Room\'', () => {
    const syms = parseSymbols("myRoom: Room { name = 'A Room' }");
    const name = syms[0].children?.find(c => c.name === 'name');
    // SSTR token text includes the surrounding quotes
    expect(name?.detail).toBe("'A Room'");
  });

  it('complex expression: detail is undefined (not a simple value)', () => {
    const syms = parseSymbols('myObj: Thing { loc = new Room() }');
    const loc = syms[0].children?.find(c => c.name === 'loc');
    expect(loc?.detail).toBeUndefined();
  });

  it('multiple directional exits all get their room name as detail', () => {
    const syms = parseSymbols('foyer: Room { north = hall  south = garden  east = kitchen }');
    const children = syms[0].children ?? [];
    expect(children.find(c => c.name === 'north')?.detail).toBe('hall');
    expect(children.find(c => c.name === 'south')?.detail).toBe('garden');
    expect(children.find(c => c.name === 'east')?.detail).toBe('kitchen');
  });
});

// ── Function / method detail (param list) ────────────────────────────────────

describe('FunctionDecl → detail carries comma-separated param names', () => {
  it('top-level function with params', () => {
    const syms = parseSymbols('function move(actor, obj) { }');
    expect(syms[0].detail).toBe('actor,obj');
  });

  it('top-level function with no params', () => {
    const syms = parseSymbols('function init() { }');
    expect(syms[0].detail).toBe('');
  });

  it('method inside object with params', () => {
    const syms = parseSymbols('myObj: Thing { doTake(actor, verify) { } }');
    const method = syms[0].children?.find(c => c.name === 'doTake');
    expect(method?.detail).toBe('actor,verify');
  });

  it('method with optional param', () => {
    const syms = parseSymbols('myObj: Thing { move(dest?) { } }');
    const method = syms[0].children?.find(c => c.name === 'move');
    expect(method?.detail).toBe('dest?');
  });

  it('method with spread param (TADS3 variadic: ...)', () => {
    // In TADS3, the variadic marker is a bare '...' with no name
    const syms = parseSymbols('myObj: Thing { call(x, ...) { } }');
    const method = syms[0].children?.find(c => c.name === 'call');
    expect(method?.detail).toBe('x,...');
  });

  it('method with no params', () => {
    const syms = parseSymbols('myObj: Thing { reset() { } }');
    const method = syms[0].children?.find(c => c.name === 'reset');
    expect(method?.detail).toBe('');
  });
});

// ── Nested object (COLON form) detail ─────────────────────────────────────────

describe('PropertyDecl → nested object detail carries supertype', () => {
  it('nested object: detail is the supertype name', () => {
    const syms = parseSymbols('myObj: Thing { loc: Room { } }');
    const loc = syms[0].children?.find(c => c.name === 'loc');
    expect(loc?.detail).toBe('Room');
  });

  it('nested object without supertype: detail is undefined', () => {
    const syms = parseSymbols('myObj: Thing { loc: { } }');
    const loc = syms[0].children?.find(c => c.name === 'loc');
    expect(loc?.detail).toBeUndefined();
  });
});
