import { describe, it, expect } from '@jest/globals';
import { parseProgram } from './parseHelper';
import { MapNodeData } from '../../../src/modules/mapcrawling/MapNodeData';

function mapOf(source: string): Map<string, MapNodeData> {
  return parseProgram(source).mapData;
}

function parentOf(source: string, id: string): string | undefined {
  return mapOf(source).get(id)?.parentName;
}

// ── Single-level containment (+ prefix) ──────────────────────────────────────

describe('map parent tracking — single-level containment', () => {
  it('a lone + object has the preceding level-0 object as parent', () => {
    expect(parentOf(`
      room: Room;
      +thing: Thing;
    `, 'thing')).toBe('room');
  });

  it('sibling + objects both get the same level-0 parent', () => {
    const map = mapOf(`
      room: Room;
      +thing1: Thing;
      +door1: Door;
    `);
    expect(map.get('thing1')?.parentName).toBe('room');
    expect(map.get('door1')?.parentName).toBe('room');
  });

  it('level-0 object has no parent', () => {
    expect(parentOf('room: Room;', 'room')).toBeUndefined();
  });
});

// ── Multi-level containment (++ prefix) ──────────────────────────────────────

describe('map parent tracking — multi-level containment', () => {
  it('a ++ object has the preceding + object as parent', () => {
    expect(parentOf(`
      room: Room;
      +container: Thing;
      ++item: Thing;
    `, 'item')).toBe('container');
  });

  it('sibling ++ objects both get the same + parent', () => {
    const map = mapOf(`
      room: Room;
      +container: Thing;
      ++item1: Thing;
      ++item2: Thing;
    `);
    expect(map.get('item1')?.parentName).toBe('container');
    expect(map.get('item2')?.parentName).toBe('container');
  });

  it('level recorded correctly alongside parent', () => {
    const map = mapOf(`
      room: Room;
      +container: Thing;
      ++item: Thing;
    `);
    expect(map.get('room')?.level).toBe(0);
    expect(map.get('container')?.level).toBe(1);
    expect(map.get('item')?.level).toBe(2);
  });
});

// ── Mixed hierarchy ───────────────────────────────────────────────────────────

describe('map parent tracking — mixed hierarchy', () => {
  it('multiple rooms each own their own children', () => {
    const map = mapOf(`
      kitchen: Room;
      +stove: Thing;
      library: Room;
      +bookshelf: Thing;
    `);
    expect(map.get('stove')?.parentName).toBe('kitchen');
    expect(map.get('bookshelf')?.parentName).toBe('library');
  });

  it('deep chain: room → container → item → subitem', () => {
    const map = mapOf(`
      room: Room;
      +container: Thing;
      ++item: Thing;
      +++subitem: Thing;
    `);
    expect(map.get('container')?.parentName).toBe('room');
    expect(map.get('item')?.parentName).toBe('container');
    expect(map.get('subitem')?.parentName).toBe('item');
  });
});
