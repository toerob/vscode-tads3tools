/**
 * scope-tree-utils.ts
 *
 * Helpers for visualizing and navigating the scope map produced by
 * Tads3v2AstScopeBuilder.  Intended for use in tests only.
 */

import { FunctionScope } from '../../../src/parser/Tads3v2AstScopeBuilder';

// ── Visualization ─────────────────────────────────────────────────────────────

/**
 * Render the scope map as a human-readable tree grouped by container.
 *
 * Example output:
 *
 *   (global)
 *     functionCall1
 *       → functionCall2
 *     functionCall5
 *       (no calls)
 *
 *   callTest
 *     method1
 *       → functionCall1
 *     method2
 *       → self.method1
 */
export function visualizeScopeTree(scopes: Map<string, FunctionScope>): string {
  // Group scopes by containerName (null → global).
  const groups = new Map<string | null, FunctionScope[]>();
  for (const scope of scopes.values()) {
    const key = scope.def.containerName;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(scope);
  }

  // Sort: global first, then alphabetical by container name.
  const sortedKeys = [...groups.keys()].sort((a, b) => {
    if (a === null) return -1;
    if (b === null) return 1;
    return a.localeCompare(b);
  });

  const lines: string[] = [];

  for (const container of sortedKeys) {
    lines.push(container === null ? '(global)' : container);

    const scopeList = groups.get(container)!.slice().sort((a, b) =>
      a.def.name.localeCompare(b.def.name),
    );

    for (const scope of scopeList) {
      lines.push(`  ${scope.def.name}`);

      if (scope.calls.length === 0) {
        lines.push(`    (no calls)`);
      } else {
        for (const call of scope.calls) {
          const callee = call.calleeContainer
            ? `${call.calleeContainer}.${call.calleeName}`
            : call.calleeName;
          lines.push(`    → ${callee}`);
        }
      }
    }

    lines.push('');
  }

  return lines.join('\n');
}

// ── Chain tracing ─────────────────────────────────────────────────────────────

/**
 * Follow the first outgoing call from each scope, building a linear call
 * chain until a leaf (no calls), an unresolved callee, or a cycle is hit.
 *
 * Resolution rules (applied in order for each call):
 *   - `self.X`   → `containerName.X`   (implicit-self method call)
 *   - `X`        → `X`                 (global function or unqualified)
 *   - `obj.X`    → `obj.X`             (explicit object call, kept as-is)
 *
 * Returns the ordered list of qualified names from start to leaf.
 */
export function traceCallChain(
  scopes: Map<string, FunctionScope>,
  startQn: string,
): string[] {
  const chain: string[] = [startQn];
  const visited = new Set<string>([startQn]);

  let current = startQn;

  while (true) {
    const scope = scopes.get(current);
    if (!scope || scope.calls.length === 0) break;

    const call = scope.calls[0];

    let nextQn: string;
    if (call.calleeContainer === 'self') {
      nextQn = scope.def.containerName
        ? `${scope.def.containerName}.${call.calleeName}`
        : call.calleeName;
    } else if (call.calleeContainer) {
      nextQn = `${call.calleeContainer}.${call.calleeName}`;
    } else {
      nextQn = call.calleeName;
    }

    if (visited.has(nextQn)) break; // cycle — stop
    if (!scopes.has(nextQn))  break; // unresolved callee — stop

    visited.add(nextQn);
    chain.push(nextQn);
    current = nextQn;
  }

  return chain;
}
