/**
 * Tests for top-level and object-body AST declaration nodes:
 * Program, ObjectDecl, ObjectBody, PropertyDecl, FunctionDecl,
 * OperatorOverride, PropertySet.
 */
import { describe, it, expect } from '@jest/globals';
import { assertParses } from './parseHelper';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { Tads3v2Lexer } from '../../../src/parser/Tads3v2Lexer';
import { Tads3v2Parser } from '../../../src/parser/Tads3v2Parser';
import { Tads3v2AstVisitor } from '../../../src/parser/Tads3v2AstVisitor';
import {
  ProgramNode,
  ObjectDeclNode,
  ObjectBodyNode,
  PropertyDeclNode,
  FunctionDeclNode,
  OperatorOverrideNode,
  PropertySetNode,
  ParamNode,
} from '../../../src/parser/ast/nodes';

function parseProgram(source: string): ProgramNode {
  const lexer  = new Tads3v2Lexer(CharStreams.fromString(source));
  const tokens = new CommonTokenStream(lexer);
  const parser = new Tads3v2Parser(tokens);
  parser.removeErrorListeners();
  const tree = parser.program();
  expect(parser.numberOfSyntaxErrors).toBe(0);
  const node = new Tads3v2AstVisitor().visit(tree);
  expect(node.kind).toBe('Program');
  return node as ProgramNode;
}

// ── Program ───────────────────────────────────────────────────────────────────

describe('Program node', () => {
  it('empty program yields zero directives', () => {
    const prog = parseProgram('');
    expect(prog.directives).toHaveLength(0);
  });

  it('two top-level objects produce two directives', () => {
    const prog = parseProgram('foo: object ; bar: object ;');
    expect(prog.directives).toHaveLength(2);
    expect(prog.directives[0]).toMatchObject({ kind: 'ObjectDecl', id: 'foo' });
    expect(prog.directives[1]).toMatchObject({ kind: 'ObjectDecl', id: 'bar' });
  });
});

// ── ObjectDecl ────────────────────────────────────────────────────────────────

describe('ObjectDecl — named object', () => {
  it('simple named object with one supertype', () => {
    const prog = parseProgram('myRoom: Room ;');
    const decl = prog.directives[0] as ObjectDeclNode;
    expect(decl).toMatchObject({
      kind: 'ObjectDecl',
      id: 'myRoom',
      isClass: false,
      isModify: false,
      isReplace: false,
      isTransient: false,
      level: 0,
      superTypes: ['Room'],
    });
  });

  it('class declaration with multiple supertypes', () => {
    const prog = parseProgram('class Foo: Bar, Baz ;');
    const decl = prog.directives[0] as ObjectDeclNode;
    expect(decl).toMatchObject({
      kind: 'ObjectDecl',
      isClass: true,
      id: 'Foo',
      superTypes: ['Bar', 'Baz'],
    });
  });

  it('modify object', () => {
    const prog = parseProgram('modify myObj { }');
    const decl = prog.directives[0] as ObjectDeclNode;
    expect(decl).toMatchObject({ kind: 'ObjectDecl', isModify: true, isReplace: false, id: 'myObj' });
  });

  it('replace object', () => {
    const prog = parseProgram('replace myObj: object { }');
    const decl = prog.directives[0] as ObjectDeclNode;
    expect(decl).toMatchObject({ kind: 'ObjectDecl', isReplace: true, isModify: false, id: 'myObj' });
  });

  it('level-prefixed object', () => {
    const prog = parseProgram('++ thing: object ;');
    const decl = prog.directives[0] as ObjectDeclNode;
    expect(decl).toMatchObject({ kind: 'ObjectDecl', level: 2, id: 'thing' });
  });

  it('transient object', () => {
    const prog = parseProgram('transient myObj: object ;');
    const decl = prog.directives[0] as ObjectDeclNode;
    expect(decl).toMatchObject({ kind: 'ObjectDecl', isTransient: true });
  });
});

// ── ObjectBody ────────────────────────────────────────────────────────────────

describe('ObjectBody', () => {
  it('body with one property and one method', () => {
    const prog = parseProgram('class Foo: object\n  name = \'hello\'\n  greet() { }\n;');
    const decl = prog.directives[0] as ObjectDeclNode;
    const body = decl.body as ObjectBodyNode;
    expect(body.kind).toBe('ObjectBody');
    expect(body.items).toHaveLength(2);
    expect(body.items[0]).toMatchObject({ kind: 'PropertyDecl', name: 'name' });
    expect(body.items[1]).toMatchObject({ kind: 'FunctionDecl', name: 'greet' });
  });

  it('empty body', () => {
    const prog = parseProgram('foo: object ;');
    const body = (prog.directives[0] as ObjectDeclNode).body;
    expect(body.items).toHaveLength(0);
  });
});

// ── PropertyDecl ─────────────────────────────────────────────────────────────

describe('PropertyDecl — value form', () => {
  it('number value', () => {
    const prog = parseProgram('class X: object\n  count = 0\n;');
    const prop = (prog.directives[0] as ObjectDeclNode).body.items[0] as PropertyDeclNode;
    expect(prop).toMatchObject({ kind: 'PropertyDecl', name: 'count', isStatic: false, nestedSuperType: null });
    expect(prop.value).toMatchObject({ kind: 'Number', value: '0' });
  });

  it('nil value', () => {
    const prog = parseProgram('class X: object\n  target = nil\n;');
    const prop = (prog.directives[0] as ObjectDeclNode).body.items[0] as PropertyDeclNode;
    expect(prop.value).toMatchObject({ kind: 'Nil' });
  });

  it('static modifier', () => {
    const prog = parseProgram('class X: object\n  cache = static [1, 2]\n;');
    const prop = (prog.directives[0] as ObjectDeclNode).body.items[0] as PropertyDeclNode;
    expect(prop.isStatic).toBe(true);
  });
});

describe('PropertyDecl — nested object form', () => {
  it('name: SuperType { }', () => {
    const prog = parseProgram('class X: object\n  interior: Room { }\n;');
    const prop = (prog.directives[0] as ObjectDeclNode).body.items[0] as PropertyDeclNode;
    expect(prop).toMatchObject({
      kind: 'PropertyDecl',
      name: 'interior',
      value: null,
      nestedSuperType: 'Room',
    });
    expect(prop.nestedBody?.kind).toBe('ObjectBody');
  });

  it('name: { } (no supertype)', () => {
    const prog = parseProgram('class X: object\n  slot: { }\n;');
    const prop = (prog.directives[0] as ObjectDeclNode).body.items[0] as PropertyDeclNode;
    expect(prop).toMatchObject({ kind: 'PropertyDecl', name: 'slot', nestedSuperType: null });
  });
});

// ── FunctionDecl ─────────────────────────────────────────────────────────────

describe('FunctionDecl — method inside object', () => {
  it('no-arg method', () => {
    const prog = parseProgram('class X: object\n  doIt() { }\n;');
    const fn = (prog.directives[0] as ObjectDeclNode).body.items[0] as FunctionDeclNode;
    expect(fn).toMatchObject({
      kind: 'FunctionDecl',
      name: 'doIt',
      isModify: false,
      isReplace: false,
      isStatic: false,
      isExtern: false,
    });
    expect(fn.params).toHaveLength(0);
    expect(fn.body?.kind).toBe('Block');
  });

  it('method with parameters', () => {
    const prog = parseProgram('class X: object\n  move(x, y) { }\n;');
    const fn = (prog.directives[0] as ObjectDeclNode).body.items[0] as FunctionDeclNode;
    expect(fn.params).toHaveLength(2);
    expect((fn.params[0] as ParamNode).name).toBe('x');
    expect((fn.params[1] as ParamNode).name).toBe('y');
  });

  it('replace-prefixed method', () => {
    const prog = parseProgram('modify Actor\n  replace greet() { }\n;');
    const fn = (prog.directives[0] as ObjectDeclNode).body.items[0] as FunctionDeclNode;
    expect(fn).toMatchObject({ kind: 'FunctionDecl', isReplace: true, name: 'greet' });
  });

  it('static method', () => {
    const prog = parseProgram('class X: object\n  static helper() { }\n;');
    const fn = (prog.directives[0] as ObjectDeclNode).body.items[0] as FunctionDeclNode;
    expect(fn.isStatic).toBe(true);
  });

  it('method with list param [args]', () => {
    const prog = parseProgram('class X: object\n  callWith(fn, [args]) { }\n;');
    const fn = (prog.directives[0] as ObjectDeclNode).body.items[0] as FunctionDeclNode;
    expect(fn.params).toHaveLength(2);
    expect((fn.params[1] as ParamNode).name).toBe('args');
  });
});

describe('FunctionDecl — top-level function', () => {
  it('plain function with function keyword', () => {
    const prog = parseProgram('function add(x, y) { return x + y; }');
    const fn = prog.directives[0] as FunctionDeclNode;
    expect(fn).toMatchObject({ kind: 'FunctionDecl', name: 'add', isModify: false });
    expect(fn.params).toHaveLength(2);
  });

  it('function without function keyword', () => {
    const prog = parseProgram('add(x, y) { return x + y; }');
    const fn = prog.directives[0] as FunctionDeclNode;
    expect(fn).toMatchObject({ kind: 'FunctionDecl', name: 'add' });
  });

  it('modify function', () => {
    const prog = parseProgram('modify function add(x, y) { return x + y; }');
    const fn = prog.directives[0] as FunctionDeclNode;
    expect(fn).toMatchObject({ kind: 'FunctionDecl', isModify: true, name: 'add' });
  });

  it('replace function', () => {
    const prog = parseProgram('replace function add(x, y) { return x + y; }');
    const fn = prog.directives[0] as FunctionDeclNode;
    expect(fn).toMatchObject({ kind: 'FunctionDecl', isReplace: true, name: 'add' });
  });
});

// ── OperatorOverride ─────────────────────────────────────────────────────────

describe('OperatorOverride', () => {
  it('operator+ with one param', () => {
    const prog = parseProgram('class Vec: object\n  operator+(other) { return self; }\n;');
    const fn = (prog.directives[0] as ObjectDeclNode).body.items[0] as OperatorOverrideNode;
    expect(fn).toMatchObject({ kind: 'OperatorOverride', op: '+' });
    expect(fn.params).toHaveLength(1);
    expect(fn.body.kind).toBe('Block');
  });

  it('operator[] (index read)', () => {
    const prog = parseProgram('class X: object\n  operator[](i) { return nil; }\n;');
    const fn = (prog.directives[0] as ObjectDeclNode).body.items[0] as OperatorOverrideNode;
    expect(fn).toMatchObject({ kind: 'OperatorOverride', op: '[]' });
  });

  it('operator[]= (index write)', () => {
    const prog = parseProgram('class X: object\n  operator[]=(i, v) { }\n;');
    const fn = (prog.directives[0] as ObjectDeclNode).body.items[0] as OperatorOverrideNode;
    expect(fn).toMatchObject({ kind: 'OperatorOverride', op: '[]=' });
  });
});

// ── PropertySet ───────────────────────────────────────────────────────────────

describe('PropertySet', () => {
  it('bare propertyset with pattern only', () => {
    const prog = parseProgram("class Actor: object\n  propertyset '*DobjTake' { verify() { } }\n;");
    const ps = (prog.directives[0] as ObjectDeclNode).body.items[0] as PropertySetNode;
    expect(ps).toMatchObject({ kind: 'PropertySet', pattern: "'*DobjTake'", paramNames: [] });
    expect(ps.body.kind).toBe('ObjectBody');
    expect(ps.body.items).toHaveLength(1);
  });

  it('propertyset with wildcard param list', () => {
    const prog = parseProgram("class X: object\n  propertyset '*Foo' (*) { verify() { } }\n;");
    const ps = (prog.directives[0] as ObjectDeclNode).body.items[0] as PropertySetNode;
    expect(ps.paramNames).toEqual(['*']);
  });

  it('propertyset with named params around wildcard', () => {
    const prog = parseProgram("class X: object\n  propertyset '*Bar' (prep, *, loc) { verify() { } }\n;");
    const ps = (prog.directives[0] as ObjectDeclNode).body.items[0] as PropertySetNode;
    expect(ps.paramNames).toEqual(['prep', '*', 'loc']);
  });
});
