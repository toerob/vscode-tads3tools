import { describe, it, expect } from '@jest/globals';
import { parseParam, parseParams } from './parseHelper';

const p = (fields: object) => ({ kind: 'Param', ...fields });
const plain    = (name: string)                           => p({ spread: false, label: null, paramType: null, name, optional: false, defaultValue: null });
const optional = (name: string)                           => p({ spread: false, label: null, paramType: null, name, optional: true,  defaultValue: null });
const typed    = (paramType: string, name: string)        => p({ spread: false, label: null, paramType, name, optional: false, defaultValue: null });
const typedOpt = (paramType: string, name: string)        => p({ spread: false, label: null, paramType, name, optional: true,  defaultValue: null });
const withDefault = (name: string, defaultValue: object)  => p({ spread: false, label: null, paramType: null, name, optional: false, defaultValue });
const labeled  = (label: string, name: string)            => p({ spread: false, label, paramType: null, name, optional: false, defaultValue: null });
const spread   = ()                                       => p({ spread: true,  label: null, paramType: null, name: null, optional: false, defaultValue: null });

const num = (value: string) => ({ kind: 'Number', value });
const id  = (name: string)  => ({ kind: 'Identifier', name });

// ── single param forms ────────────────────────────────────────────────────────

describe('param → plain name', () => {
  it('parses x', () => {
    expect(parseParam('x')).toMatchObject(plain('x'));
  });
});

describe('param → optional', () => {
  it('parses x?', () => {
    expect(parseParam('x?')).toMatchObject(optional('x'));
  });
});

describe('param → typed', () => {
  it('parses RuntimeError e', () => {
    expect(parseParam('RuntimeError e')).toMatchObject(typed('RuntimeError', 'e'));
  });

  it('parses Exception e?', () => {
    expect(parseParam('Exception e?')).toMatchObject(typedOpt('Exception', 'e'));
  });
});

describe('param → default value', () => {
  it('parses x := 5', () => {
    expect(parseParam('x := 5')).toMatchObject(withDefault('x', num('5')));
  });

  it('parses x := foo', () => {
    expect(parseParam('x := foo')).toMatchObject(withDefault('x', id('foo')));
  });
});

describe('param → labeled', () => {
  it('parses label: x', () => {
    expect(parseParam('label: x')).toMatchObject(labeled('label', 'x'));
  });
});

describe('param → spread', () => {
  it('parses ...', () => {
    expect(parseParam('...')).toMatchObject(spread());
  });
});

// ── param lists ───────────────────────────────────────────────────────────────

describe('params → flat list', () => {
  it('parses a, b, c', () => {
    expect(parseParams('a, b, c')).toMatchObject([plain('a'), plain('b'), plain('c')]);
  });

  it('parses RuntimeError e, Exception f', () => {
    expect(parseParams('RuntimeError e, Exception f')).toMatchObject([
      typed('RuntimeError', 'e'),
      typed('Exception', 'f'),
    ]);
  });

  it('parses a, b, ...', () => {
    expect(parseParams('a, b, ...')).toMatchObject([plain('a'), plain('b'), spread()]);
  });

  it('parses a, b := 5, c?', () => {
    expect(parseParams('a, b := 5, c?')).toMatchObject([
      plain('a'),
      withDefault('b', num('5')),
      optional('c'),
    ]);
  });
});
