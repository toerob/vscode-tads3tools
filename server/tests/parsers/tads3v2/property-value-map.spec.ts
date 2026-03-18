import { describe, it, expect } from '@jest/globals';
import { parseProgramAst } from './parseHelper';
import { buildPropertyValueMap } from '../../../src/parser/Tads3v2PropertyValueMap';
import { TadsSymbolManager } from '../../../src/modules/symbol-manager';
import { PropertyValueMap } from '../../../src/modules/types';

// ── Helper ────────────────────────────────────────────────────────────────────

function build(source: string): PropertyValueMap {
  return buildPropertyValueMap(parseProgramAst(source));
}

function propsOf(source: string, objectName: string) {
  return build(source).get(objectName);
}

function valueOf(source: string, objectName: string, propName: string) {
  return propsOf(source, objectName)?.get(propName);
}

// ── Literal values ────────────────────────────────────────────────────────────

describe('buildPropertyValueMap — literal values', () => {
  it('number property', () => {
    expect(valueOf("obj: Thing { weight = 5; }", 'obj', 'weight'))
      .toEqual({ kind: 'number', value: 5 });
  });

  it('hex property', () => {
    expect(valueOf("obj: Thing { flags = 0xff; }", 'obj', 'flags'))
      .toEqual({ kind: 'number', value: 255 });
  });

  it('single-quoted string property', () => {
    expect(valueOf("obj: Thing { name = 'the kitchen'; }", 'obj', 'name'))
      .toEqual({ kind: 'string', value: 'the kitchen' });
  });

  it('double-quoted string property', () => {
    expect(valueOf('obj: Thing { desc = "A dusty room."; }', 'obj', 'desc'))
      .toEqual({ kind: 'string', value: 'A dusty room.' });
  });

  it('true property', () => {
    expect(valueOf("obj: Thing { isFixed = true; }", 'obj', 'isFixed'))
      .toEqual({ kind: 'true' });
  });

  it('nil property', () => {
    expect(valueOf("obj: Thing { location = nil; }", 'obj', 'location'))
      .toEqual({ kind: 'nil' });
  });
});

// ── Identifier references ─────────────────────────────────────────────────────

// Note: in TADS3 curly-brace object bodies, per-property semicolons are NOT used
// (the grammar parses `identifier;` as an extern-style method declaration).
// Real TADS3 source uses either no semicolons (curly form) or a single trailing `;`
// at the end of the whole object (semicolon-terminated form).
describe('buildPropertyValueMap — identifier references', () => {
  it('directional exit (forward reference) — curly-brace form, no property semicolons', () => {
    expect(valueOf("kitchen: Room { north = library }", 'kitchen', 'north'))
      .toEqual({ kind: 'ref', name: 'library' });
  });

  it('location property', () => {
    expect(valueOf("coin: Thing { location = foyer }", 'coin', 'location'))
      .toEqual({ kind: 'ref', name: 'foyer' });
  });

  it('& reference', () => {
    expect(valueOf("obj: Thing { handler = &doThing }", 'obj', 'handler'))
      .toEqual({ kind: 'ref', name: 'doThing' });
  });
});

// ── Constant folding ──────────────────────────────────────────────────────────

describe('buildPropertyValueMap — constant folding', () => {
  it('string concatenation', () => {
    expect(valueOf("obj: Thing { name = 'the ' + 'kitchen'; }", 'obj', 'name'))
      .toEqual({ kind: 'string', value: 'the kitchen' });
  });

  it('number addition', () => {
    expect(valueOf("obj: Thing { weight = 3 + 4; }", 'obj', 'weight'))
      .toEqual({ kind: 'number', value: 7 });
  });

  it('number subtraction', () => {
    expect(valueOf("obj: Thing { n = 10 - 3; }", 'obj', 'n'))
      .toEqual({ kind: 'number', value: 7 });
  });

  it('number multiplication', () => {
    expect(valueOf("obj: Thing { n = 6 * 7; }", 'obj', 'n'))
      .toEqual({ kind: 'number', value: 42 });
  });

  it('integer division', () => {
    expect(valueOf("obj: Thing { n = 7 / 2; }", 'obj', 'n'))
      .toEqual({ kind: 'number', value: 3 });
  });

  it('number + string coercion', () => {
    expect(valueOf("obj: Thing { label = 42 + ' items'; }", 'obj', 'label'))
      .toEqual({ kind: 'string', value: '42 items' });
  });

  it('unary minus on number literal', () => {
    expect(valueOf("obj: Thing { n = -5; }", 'obj', 'n'))
      .toEqual({ kind: 'number', value: -5 });
  });

  it('redundant parens are stripped', () => {
    expect(valueOf("obj: Thing { n = (7); }", 'obj', 'n'))
      .toEqual({ kind: 'number', value: 7 });
  });

  it('?? with nil left returns right', () => {
    expect(valueOf("obj: Thing { n = nil ?? 99; }", 'obj', 'n'))
      .toEqual({ kind: 'number', value: 99 });
  });

  it('?? with non-nil left returns left', () => {
    expect(valueOf("obj: Thing { n = 5 ?? 99; }", 'obj', 'n'))
      .toEqual({ kind: 'number', value: 5 });
  });
});

// ── Unknown (non-reducible) values ────────────────────────────────────────────

describe('buildPropertyValueMap — unknown values', () => {
  it('complex expression with identifier operand → unknown', () => {
    const v = valueOf("obj: Thing { n = x + 1; }", 'obj', 'n');
    expect(v).toEqual({ kind: 'unknown' });
  });

  it('method body property → unknown (skipped)', () => {
    // Method bodies are not scalar values; they should not appear as props
    const props = propsOf("obj: Thing { doIt() { return 1; } }", 'obj');
    expect(props?.has('doIt')).toBeFalsy();
  });
});

// ── Array literals ────────────────────────────────────────────────────────────

describe('buildPropertyValueMap — array literals', () => {
  it('array of numbers', () => {
    expect(valueOf("obj: Thing { dims = [1, 2, 3]; }", 'obj', 'dims'))
      .toEqual({ kind: 'list', elements: [
        { kind: 'number', value: 1 },
        { kind: 'number', value: 2 },
        { kind: 'number', value: 3 },
      ]});
  });

  it('array of strings', () => {
    expect(valueOf("obj: Thing { tags = ['a', 'b']; }", 'obj', 'tags'))
      .toEqual({ kind: 'list', elements: [
        { kind: 'string', value: 'a' },
        { kind: 'string', value: 'b' },
      ]});
  });

  it('mixed array with identifier ref', () => {
    const v = valueOf("obj: Thing { exits = [north, south] }", 'obj', 'exits');
    expect(v).toEqual({ kind: 'list', elements: [
      { kind: 'ref', name: 'north' },
      { kind: 'ref', name: 'south' },
    ]});
  });
});

// ── Inline nested object (colon form) ─────────────────────────────────────────

describe('buildPropertyValueMap — nested inline objects', () => {
  it('name: SuperType { } is recorded as a ref to the supertype', () => {
    expect(valueOf("obj: Thing { loc: Room { } }", 'obj', 'loc'))
      .toEqual({ kind: 'ref', name: 'Room' });
  });
});

// ── Multiple objects in a file ────────────────────────────────────────────────

describe('buildPropertyValueMap — multiple objects', () => {
  it('produces an entry per named object', () => {
    const map = build(`
      kitchen: Room { north = library }
      library: Room { south = kitchen }
    `);
    expect(map.has('kitchen')).toBe(true);
    expect(map.has('library')).toBe(true);
    expect(map.get('kitchen')?.get('north')).toEqual({ kind: 'ref', name: 'library' });
    expect(map.get('library')?.get('south')).toEqual({ kind: 'ref', name: 'kitchen' });
  });

  it('does not produce an entry for anonymous objects', () => {
    const map = build('Room { north = somewhere; }');
    expect(map.size).toBe(0);
  });
});

// ── TadsSymbolManager integration ─────────────────────────────────────────────

describe('TadsSymbolManager — getPropertyValue / getObjectProperties', () => {
  function makeManager(source: string, filePath = '/test/game.t'): TadsSymbolManager {
    const mgr = new TadsSymbolManager();
    mgr.propertyValues.set(filePath, build(source));
    return mgr;
  }

  it('getPropertyValue returns the value for a known object and prop', () => {
    const mgr = makeManager("kitchen: Room { north = library }");
    expect(mgr.getPropertyValue('kitchen', 'north'))
      .toEqual({ kind: 'ref', name: 'library' });
  });

  it('getPropertyValue returns undefined for an unknown object', () => {
    const mgr = makeManager("kitchen: Room { }");
    expect(mgr.getPropertyValue('nowhere', 'north')).toBeUndefined();
  });

  it('getPropertyValue returns undefined for an unknown property', () => {
    const mgr = makeManager("kitchen: Room { north = library; }");
    expect(mgr.getPropertyValue('kitchen', 'south')).toBeUndefined();
  });

  it('getObjectProperties returns all props for a known object', () => {
    const mgr = makeManager("kitchen: Room { north = library  name = 'Kitchen' }");
    const props = mgr.getObjectProperties('kitchen');
    expect(props?.get('north')).toEqual({ kind: 'ref', name: 'library' });
    expect(props?.get('name')).toEqual({ kind: 'string', value: 'Kitchen' });
  });

  it('getObjectProperties returns undefined for an unknown object', () => {
    const mgr = makeManager("kitchen: Room { }");
    expect(mgr.getObjectProperties('nowhere')).toBeUndefined();
  });

  it('getPropertyValue searches across multiple files', () => {
    const mgr = new TadsSymbolManager();
    mgr.propertyValues.set('/a.t', build("kitchen: Room { north = library }"));
    mgr.propertyValues.set('/b.t', build("library: Room { south = kitchen }"));
    expect(mgr.getPropertyValue('library', 'south'))
      .toEqual({ kind: 'ref', name: 'kitchen' });
  });
});
