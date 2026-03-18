import { describe, it, expect } from '@jest/globals';
import { parsePrimary } from './parseHelper';

// ── primary atoms ────────────────────────────────────────────────────────────

describe('primaryExpr → primary atoms', () => {
  it('parses an identifier', () => {
    expect(parsePrimary('myVar')).toMatchObject({ kind: 'Identifier', name: 'myVar' });
  });

  it('parses an integer literal', () => {
    expect(parsePrimary('42')).toMatchObject({ kind: 'Number', value: '42' });
  });

  it('parses a decimal literal', () => {
    expect(parsePrimary('3.14')).toMatchObject({ kind: 'Number', value: '3.14' });
  });

  it('parses a hex literal', () => {
    expect(parsePrimary('0xFF')).toMatchObject({ kind: 'Hex', value: '0xFF' });
  });

  it('parses a single-quoted string', () => {
    expect(parsePrimary("'hello'")).toMatchObject({ kind: 'String', quoteStyle: 'single', value: "'hello'" });
  });

  it('parses a double-quoted string', () => {
    expect(parsePrimary('"hello"')).toMatchObject({ kind: 'String', quoteStyle: 'double', value: '"hello"' });
  });

  it('parses true', () => {
    expect(parsePrimary('true')).toMatchObject({ kind: 'Boolean', value: true });
  });

  it('parses nil', () => {
    expect(parsePrimary('nil')).toMatchObject({ kind: 'Nil' });
  });

  it('parses inherited', () => {
    expect(parsePrimary('inherited')).toMatchObject({ kind: 'Inherited' });
  });

  it('parses a reference atom &foo', () => {
    expect(parsePrimary('&foo')).toMatchObject({ kind: 'Reference', name: 'foo' });
  });
});

// ── compound primaryExpr forms ────────────────────────────────────────────────

describe('primaryExpr → compound forms', () => {
  it('parses a parenthesised expression', () => {
    expect(parsePrimary('(42)')).toMatchObject({ kind: 'Paren', inner: { kind: 'Number', value: '42' } });
  });

  it('parses empty parens', () => {
    expect(parsePrimary('()')).toMatchObject({ kind: 'Paren', inner: null });
  });

  it('parses an empty array literal', () => {
    expect(parsePrimary('[]')).toMatchObject({ kind: 'ArrayLiteral', elements: [] });
  });

  it('parses an array literal with elements', () => {
    expect(parsePrimary('[1, 2, 3]')).toMatchObject({
      kind: 'ArrayLiteral',
      elements: [
        { kind: 'Number', value: '1' },
        { kind: 'Number', value: '2' },
        { kind: 'Number', value: '3' },
      ],
    });
  });

  it('parses a lambda with a body', () => {
    expect(parsePrimary('{ : nil }')).toMatchObject({ kind: 'Lambda', body: { kind: 'Nil' } });
  });

  it('parses an empty lambda', () => {
    expect(parsePrimary('{ : }')).toMatchObject({ kind: 'Lambda', body: null });
  });
});
