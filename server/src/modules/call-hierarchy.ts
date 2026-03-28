import {
  CallHierarchyItem,
  CallHierarchyIncomingCall,
  CallHierarchyOutgoingCall,
  CallHierarchyPrepareParams,
  CallHierarchyIncomingCallsParams,
  CallHierarchyOutgoingCallsParams,
  SymbolKind,
  Range,
} from 'vscode-languageserver';
import { URI } from 'vscode-uri';
import { TadsSymbolManager } from './symbol-manager';
import { FunctionScope, CallRef } from '../parser/Tads3v2AstScopeBuilder';
import { SourceRange } from '../parser/ast/nodes';

// ── helpers ───────────────────────────────────────────────────────────────────

interface ItemData {
  fsPath: string;
  qualifiedName: string;
}

function toRange(r: SourceRange): Range {
  return Range.create(r.start.line, r.start.character, r.end.line, r.end.character);
}

function contains(range: SourceRange, pos: { line: number; character: number }): boolean {
  const { start, end } = range;
  if (pos.line < start.line || pos.line > end.line) return false;
  if (pos.line === start.line && pos.character < start.character) return false;
  if (pos.line === end.line   && pos.character > end.character)   return false;
  return true;
}

export function scopeAt(
  scopes: Map<string, FunctionScope>,
  pos: { line: number; character: number },
): FunctionScope | null {
  let best: FunctionScope | null = null;
  let bestArea = Infinity;
  for (const scope of scopes.values()) {
    const r = scope.def.range;
    if (!contains(r, pos)) continue;
    const area = (r.end.line - r.start.line) * 100_000 + (r.end.character - r.start.character);
    if (area < bestArea) { best = scope; bestArea = area; }
  }
  return best;
}

function makeItem(scope: FunctionScope, fsPath: string): CallHierarchyItem {
  const data: ItemData = { fsPath, qualifiedName: scope.def.qualifiedName };
  return {
    name: scope.def.qualifiedName,
    kind: SymbolKind.Function,
    uri: URI.file(fsPath).toString(),
    range: toRange(scope.def.range),
    selectionRange: toRange(scope.def.selectionRange),
    detail: scope.def.containerName ?? undefined,
    data,
  };
}

/** Search all file scopes for a scope matching an exact qualified name. */
function findScopeGlobally(
  sm: TadsSymbolManager,
  qualifiedName: string,
): { scope: FunctionScope; fsPath: string } | null {
  for (const [fsPath, scopes] of sm.fileScopes) {
    const scope = scopes.get(qualifiedName);
    if (scope) return { scope, fsPath };
  }
  return null;
}

/**
 * Walk the inheritanceMap to check whether `child` is the same as or
 * derives from `ancestor`.  Guards against cycles with a visited set.
 */
function inheritsFrom(
  inheritanceMap: Map<string, string>,
  child: string,
  ancestor: string,
): boolean {
  const visited = new Set<string>();
  let current: string | undefined = child;
  while (current && !visited.has(current)) {
    if (current === ancestor) return true;
    visited.add(current);
    current = inheritanceMap.get(current);
  }
  return false;
}

/**
 * Resolve an `inherited` call inside `scope` to the parent class's
 * same-named method, using the inheritanceMap.
 * Returns the qualified name of the parent method, or null if unresolvable.
 */
function resolveInherited(
  scope: FunctionScope,
  inheritanceMap: Map<string, string>,
): string | null {
  const { containerName, name } = scope.def;
  if (!containerName) return null;
  const parent = inheritanceMap.get(containerName);
  if (!parent || parent === '__root__') return null;
  return `${parent}.${name}`;
}

/**
 * Resolve a bare method name called from inside `containerName`, walking the
 * inheritance chain upward before falling back to a global function.
 *
 * Resolution order:
 *   1. containerName.method
 *   2. parent.method, grandparent.method, … (via inheritanceMap, cycle-safe)
 *   3. global function named `method`
 */
function resolveBareName(
  sm: TadsSymbolManager,
  containerName: string,
  methodName: string,
): ReturnType<typeof findScopeGlobally> {
  const visited = new Set<string>();
  let current: string | undefined = containerName;
  while (current && current !== '__root__' && !visited.has(current)) {
    visited.add(current);
    const found = findScopeGlobally(sm, `${current}.${methodName}`);
    if (found) return found;
    current = sm.inheritanceMap.get(current);
  }
  // Fall back to global scope.
  return findScopeGlobally(sm, methodName);
}

/**
 * Return true when `call` (recorded inside `callerContainerName`) resolves to
 * `qualifiedName` under TADS3 name-resolution rules:
 *   - explicit obj.method  → 'obj.method' === qualifiedName
 *   - self.method          → 'callerContainer.method' === qualifiedName
 *   - bare name inside a method → walk inheritance chain then global
 *   - bare name at global scope → name === qualifiedName
 */
function callMatchesTarget(
  call: CallRef,
  callerContainerName: string | null,
  qualifiedName: string,
  sm: TadsSymbolManager,
): boolean {
  if (call.calleeName === 'inherited') return false; // handled by the inherited-call branch

  if (call.calleeContainer && call.calleeContainer !== 'self') {
    return `${call.calleeContainer}.${call.calleeName}` === qualifiedName;
  }

  if (call.calleeContainer === 'self' && callerContainerName) {
    return `${callerContainerName}.${call.calleeName}` === qualifiedName;
  }

  if (!call.calleeContainer && callerContainerName) {
    const resolved = resolveBareName(sm, callerContainerName, call.calleeName);
    return resolved
      ? resolved.scope.def.qualifiedName === qualifiedName
      : call.calleeName === qualifiedName;
  }

  return call.calleeName === qualifiedName;
}

// ── LSP handlers ──────────────────────────────────────────────────────────────

export async function onPrepareCallHierarchy(
  { textDocument: textDoc, position: pos }: CallHierarchyPrepareParams,
  sm: TadsSymbolManager,
): Promise<CallHierarchyItem[] | null> {
  const fsPath = URI.parse(textDoc.uri).fsPath;
  const scopes = sm.fileScopes.get(fsPath);
  if (!scopes) return null;

  const scope = scopeAt(scopes, pos);
  if (!scope) return null;

  return [makeItem(scope, fsPath)];
}

export async function onIncomingCalls(
  { item }: CallHierarchyIncomingCallsParams,
  sm: TadsSymbolManager,
): Promise<CallHierarchyIncomingCall[] | null> {
  const data = item.data as ItemData | undefined;
  if (!data) return null;

  const { qualifiedName } = data;

  // For inherited-call matching: if the target is a method on a class
  // (e.g. "Traveler.travelerTravelTo"), also collect subclass methods
  // with the same name that call `inherited`.
  const dotIdx = qualifiedName.indexOf('.');
  const targetContainer = dotIdx >= 0 ? qualifiedName.slice(0, dotIdx) : null;
  const targetMethod    = dotIdx >= 0 ? qualifiedName.slice(dotIdx + 1) : qualifiedName;

  const result: CallHierarchyIncomingCall[] = [];
  const seen = new Set<string>(); // avoid duplicate entries

  for (const [callerFsPath, scopes] of sm.fileScopes) {
    for (const callerScope of scopes.values()) {
      if (seen.has(callerScope.def.qualifiedName)) continue;

      // 1. Direct / self / implicit-self call resolving to the target.
      const directCalls = callerScope.calls.filter(c =>
        callMatchesTarget(c, callerScope.def.containerName, qualifiedName, sm),
      );

      if (directCalls.length > 0) {
        seen.add(callerScope.def.qualifiedName);
        result.push({
          from: makeItem(callerScope, callerFsPath),
          fromRanges: directCalls.map(c => toRange(c.range)),
        });
        continue;
      }

      // 2. Inherited call: a subclass override of the same method calls `inherited`,
      //    and that `inherited` resolves *directly* to the target (one hop only).
      //    e.g. if TopGreeter → MidGreeter → BaseGreeter, then:
      //      - TopGreeter.greet's `inherited` resolves to MidGreeter.greet (not BaseGreeter)
      //      - MidGreeter.greet's `inherited` resolves to BaseGreeter.greet
      if (
        targetContainer &&
        callerScope.def.name === targetMethod &&
        callerScope.def.containerName &&
        callerScope.def.containerName !== targetContainer &&
        resolveInherited(callerScope, sm.inheritanceMap) === qualifiedName
      ) {
        const inheritedCalls = callerScope.calls.filter(c => c.calleeName === 'inherited');
        if (inheritedCalls.length > 0) {
          seen.add(callerScope.def.qualifiedName);
          result.push({
            from: makeItem(callerScope, callerFsPath),
            fromRanges: inheritedCalls.map(c => toRange(c.range)),
          });
        }
      }
    }
  }

  return result.length > 0 ? result : null;
}

export async function onOutgoingCalls(
  { item }: CallHierarchyOutgoingCallsParams,
  sm: TadsSymbolManager,
): Promise<CallHierarchyOutgoingCall[] | null> {

  console.log(item.data);
  if(!sm.fileScopes.has(item.data?.fsPath!)) {
    console.log(sm.fileScopes.get(item.data?.fsPath!),      ' does not match: ', item.data?.fsPath);
  } else {
    console.log(sm.fileScopes.get(item.data?.fsPath!),      ' matches: ', item.data?.fsPath);
  }

  const data = item.data as ItemData | undefined;
  if (!data) return null;

  const { fsPath, qualifiedName } = data;
  const scopes = sm.fileScopes.get(fsPath);
  if (!scopes) return null;

  const scope = scopes.get(qualifiedName);
  if (!scope) return null;

  // Group call sites by callee qualified name so multiple calls to the same
  // target appear as one outgoing edge with multiple fromRanges.
  const byCallee = new Map<string, { toItem: CallHierarchyItem; ranges: Range[] }>();

  for (const call of scope.calls) {
    // Resolve the callee qualified name and its target scope:
    //   inherited  → parent class's same-named method via inheritanceMap
    //   self.X     → containerName.X  (explicit self)
    //   X (bare, inside a method)
    //              → try global X first; if not found, try containerName.X
    //                (TADS3 implicit-self: bare method calls resolve on self
    //                 before falling back to globals)
    //   obj.X      → obj.X  (explicit object, kept as-is)
    let calleeQn: string;
    let resolved: ReturnType<typeof findScopeGlobally>;

    if (call.calleeName === 'inherited') {
      calleeQn = resolveInherited(scope, sm.inheritanceMap) ?? 'inherited';
      resolved = calleeQn !== 'inherited' ? findScopeGlobally(sm, calleeQn) : null;
    } else if (call.calleeContainer === 'self' && scope.def.containerName) {
      calleeQn = `${scope.def.containerName}.${call.calleeName}`;
      resolved = findScopeGlobally(sm, calleeQn);
    } else if (!call.calleeContainer && scope.def.containerName) {
      // Bare call from inside a method: walk the inheritance chain upward
      // (self → parent → grandparent → … → global), stopping at the first match.
      resolved = resolveBareName(sm, scope.def.containerName, call.calleeName);
      calleeQn = resolved ? resolved.scope.def.qualifiedName : call.calleeName;
    } else {
      calleeQn = call.calleeContainer
        ? `${call.calleeContainer}.${call.calleeName}`
        : call.calleeName;
      resolved = findScopeGlobally(sm, calleeQn);
    }

    if (!byCallee.has(calleeQn)) {

      const toItem: CallHierarchyItem = resolved
        ? makeItem(resolved.scope, resolved.fsPath)
        : {
            name: calleeQn,
            kind: SymbolKind.Function,
            uri: item.uri,
            range: item.range,
            selectionRange: item.selectionRange,
            data: undefined,
          };

      byCallee.set(calleeQn, { toItem, ranges: [] });
    }
    byCallee.get(calleeQn)!.ranges.push(toRange(call.range));
  }

  const result: CallHierarchyOutgoingCall[] = [];
  for (const { toItem, ranges } of byCallee.values()) {
    result.push({ to: toItem, fromRanges: ranges });
  }

  return result.length > 0 ? result : null;
}
