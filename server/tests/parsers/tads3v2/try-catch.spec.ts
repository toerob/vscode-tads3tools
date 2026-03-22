import { describe, it, expect } from '@jest/globals';
import { parseTryCatch } from './parseHelper';
import { AstNode } from '../../../src/parser/ast/nodes';

const num  = (v: string): AstNode => ({ kind: 'Number', value: v });
const decl = (name: string, init: AstNode | null): AstNode => ({ kind: 'LocalDecl', name, init });
const block = (...body: AstNode[]): AstNode => ({ kind: 'Block', body });

const tryCatch = (
  body: AstNode,
  catches: { params: { kind: string }[]; body: AstNode }[],
  finallyBlock: AstNode | null = null,
): AstNode => ({ kind: 'TryCatch', body, catches, finallyBlock } as unknown as AstNode);

// ── try only (no catch, no finally) ──────────────────────────────────────────

describe('tryCatchStatement → try only', () => {
  it('parses try { local x = 1; }', () => {
    expect(parseTryCatch('try { local x = 1; }')).toMatchObject(
      tryCatch(block(decl('x', num('1'))), [])
    );
  });
});

// ── try / catch ───────────────────────────────────────────────────────────────

describe('tryCatchStatement → try / catch', () => {
  it('parses try { } catch (Exception e) { local x = 1; }', () => {
    expect(parseTryCatch('try { } catch (Exception e) { local x = 1; }')).toMatchObject(
      tryCatch(
        block(),
        [{ params: [{ kind: 'Param' }], body: block(decl('x', num('1'))) }],
      )
    );
  });

  it('parses multiple catch clauses', () => {
    expect(parseTryCatch(
      'try { } catch (RuntimeError e) { local x = 1; } catch (Exception e) { local x = 2; }'
    )).toMatchObject(
      tryCatch(
        block(),
        [
          { params: [{ kind: 'Param' }], body: block(decl('x', num('1'))) },
          { params: [{ kind: 'Param' }], body: block(decl('x', num('2'))) },
        ],
      )
    );
  });
});

// ── try / finally ─────────────────────────────────────────────────────────────

describe('tryCatchStatement → try / finally', () => {
  it('parses try { } finally { local x = 1; }', () => {
    expect(parseTryCatch('try { } finally { local x = 1; }')).toMatchObject(
      tryCatch(block(), [], block(decl('x', num('1'))))
    );
  });
});

// ── try / catch / finally ─────────────────────────────────────────────────────

describe('tryCatchStatement → try / catch / finally', () => {
  it('parses full try-catch-finally', () => {
    expect(parseTryCatch(
      'try { local x = 1; } catch (Exception e) { local x = 2; } finally { local x = 3; }'
    )).toMatchObject(
      tryCatch(
        block(decl('x', num('1'))),
        [{ params: [{ kind: 'Param' }], body: block(decl('x', num('2'))) }],
        block(decl('x', num('3'))),
      )
    );
  });
});
