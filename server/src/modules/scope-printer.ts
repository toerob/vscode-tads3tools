/**
 * scope-printer.ts — Developer debug utility: pretty-prints the output of
 * Tads3v2AstScopeBuilder so every function / method scope can be inspected.
 *
 * Line numbers are 1-based to match editor display conventions.
 */

import { FunctionScope } from '../parser/Tads3v2AstScopeBuilder';

const DIVIDER = '─'.repeat(60);

function L(line: number): string {
  return `L${line + 1}`; // 0-based → 1-based
}

function fmtRange(r: { start: { line: number }; end: { line: number } }): string {
  const s = r.start.line + 1;
  const e = r.end.line + 1;
  return s === e ? `L${s}` : `L${s}–${e}`;
}

/**
 * Format one function / method scope as a readable block.
 */
function printScope(scope: FunctionScope): string {
  const lines: string[] = [];

  lines.push(DIVIDER);
  lines.push(`${scope.def.qualifiedName}  [${fmtRange(scope.def.range)}]`);

  // ── params ────────────────────────────────────────────────────────────────
  if (scope.params.length > 0) {
    lines.push(`  params:   ${scope.params.join(', ')}`);
  } else {
    lines.push(`  params:   (none)`);
  }

  // ── locals ────────────────────────────────────────────────────────────────
  if (scope.locals.length > 0) {
    const localStrs = scope.locals.map(lv => `${lv.name} @${L(lv.declarationLine)}`);
    lines.push(`  locals:   ${localStrs.join(', ')}`);
  } else {
    lines.push(`  locals:   (none)`);
  }

  // ── calls ─────────────────────────────────────────────────────────────────
  if (scope.calls.length > 0) {
    lines.push(`  calls:`);
    for (const c of scope.calls) {
      const callee = c.calleeContainer
        ? `${c.calleeContainer}.${c.calleeName}`
        : c.calleeName;
      lines.push(`    ${callee}()  @${L(c.range.start.line)}`);
    }
  } else {
    lines.push(`  calls:    (none)`);
  }

  return lines.join('\n');
}

/**
 * Produce a human-readable summary of all scopes collected by
 * Tads3v2AstScopeBuilder.
 *
 * Scopes are sorted by start line so the output follows source order.
 */
export function printScopes(scopes: Map<string, FunctionScope>): string {
  const sorted = [...scopes.values()].sort(
    (a, b) => a.def.range.start.line - b.def.range.start.line,
  );

  const header = `Scopes (${sorted.length} function / method scope${sorted.length === 1 ? '' : 's'})`;
  const body   = sorted.map(printScope).join('\n');
  const footer = DIVIDER;

  return [header, body, footer].join('\n');
}
