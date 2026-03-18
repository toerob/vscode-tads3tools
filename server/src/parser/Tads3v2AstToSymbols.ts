import { DocumentSymbol, Range, SymbolKind } from 'vscode-languageserver';
import {
  AstNode,
  FunctionDeclNode,
  IdentifierNode,
  NumberNode,
  ObjectBodyNode,
  ObjectDeclNode,
  OperatorOverrideNode,
  ParamNode,
  ProgramNode,
  PropertyDeclNode,
  PropertySetNode,
  SourceRange,
  StringNode,
  TemplateDeclNode,
  TemplateItemNode,
} from './ast/nodes';

/**
 * Best-effort text representation of a value AST node, used as DocumentSymbol.detail.
 * Returns undefined for complex expressions the map editor doesn't need to parse.
 */
function nodeToDetail(node: AstNode | null): string | undefined {
  if (!node) return undefined;
  switch (node.kind) {
    case 'Identifier': return (node as IdentifierNode).name;
    case 'Number':     return (node as NumberNode).value;
    case 'String':     return (node as StringNode).value;
    default:           return undefined;
  }
}

/** Formats a parameter list to a comma-separated string matching v1's detail format. */
function paramsToDetail(params: ParamNode[]): string {
  return params.map(p => {
    if (p.spread) return '...';         // TADS3 variadic: bare '...' with no name
    if (p.optional) return `${p.name}?`;
    return p.name ?? '';
  }).join(',');
}

function toRange(r: SourceRange | undefined): Range {
  if (!r) return Range.create(0, 0, 0, 0);
  return Range.create(r.start.line, r.start.character, r.end.line, r.end.character);
}

let anonCounter = 0;

function bodyToChildren(body: ObjectBodyNode): DocumentSymbol[] {
  const children: DocumentSymbol[] = [];
  for (const item of body.items) {
    switch (item.kind) {
      case 'FunctionDecl': {
        const fn = item as FunctionDeclNode;
        if (!fn.name) break;
        const range = toRange(fn.range);
        children.push(DocumentSymbol.create(fn.name, paramsToDetail(fn.params), SymbolKind.Method, range, range, []));
        break;
      }
      case 'PropertyDecl': {
        const prop = item as PropertyDeclNode;
        const range = toRange(prop.range);
        if (prop.nestedBody) {
          // name: SuperType { }  — inline nested object
          const detail = prop.nestedSuperType ?? undefined;
          const nestedChildren = bodyToChildren(prop.nestedBody);
          children.push(DocumentSymbol.create(prop.name, detail, SymbolKind.Object, range, range, nestedChildren));
        } else {
          children.push(DocumentSymbol.create(prop.name, nodeToDetail(prop.value), SymbolKind.Property, range, range));
        }
        break;
      }
      case 'OperatorOverride': {
        const op = item as OperatorOverrideNode;
        const range = toRange(op.range);
        children.push(DocumentSymbol.create(`operator${op.op}`, undefined, SymbolKind.Method, range, range));
        break;
      }
      case 'PropertySet': {
        const ps = item as PropertySetNode;
        // Strip surrounding single-quotes from the pattern, e.g. '*DobjTake' → *DobjTake
        const rawPattern = ps.pattern;
        const pattern = rawPattern.length >= 2 && rawPattern.startsWith("'") && rawPattern.endsWith("'")
          ? rawPattern.slice(1, -1)
          : rawPattern;
        // Emit the propertyset as a container; methods/properties are its children with prefixed names
        const psChildren: DocumentSymbol[] = [];
        for (const psItem of ps.body.items) {
          if (psItem.kind === 'FunctionDecl') {
            const fn = psItem as FunctionDeclNode;
            if (!fn.name) continue;
            const name = pattern.replace('*', fn.name);
            const range = toRange(fn.range);
            psChildren.push(DocumentSymbol.create(name, undefined, SymbolKind.Method, range, range, []));
          } else if (psItem.kind === 'PropertyDecl') {
            const prop = psItem as PropertyDeclNode;
            const name = pattern.replace('*', prop.name);
            const range = toRange(prop.range);
            psChildren.push(DocumentSymbol.create(name, undefined, SymbolKind.Property, range, range));
          }
        }
        const psRange = toRange(ps.range);
        children.push(DocumentSymbol.create(pattern, undefined, SymbolKind.Namespace, psRange, psRange, psChildren));
        break;
      }
    }
  }
  return children;
}

export function astToSymbols(program: ProgramNode): DocumentSymbol[] {
  const symbols: DocumentSymbol[] = [];
  // Maps level → the last object symbol at that level, for + and ++ nesting
  const levelMap = new Map<number, DocumentSymbol>();

  for (const node of program.directives) {
    if (node.kind === 'ObjectDecl') {
      const obj = node as ObjectDeclNode;
      const name    = obj.id ?? `(anonymous_${++anonCounter})`;
      const detail  = obj.superTypes.length > 0 ? obj.superTypes.join(', ') : undefined;
      const kind    = obj.isClass ? SymbolKind.Class : SymbolKind.Object;
      const range   = toRange(obj.range);
      const children = bodyToChildren(obj.body);
      const sym = DocumentSymbol.create(name, detail, kind, range, range, children);

      if (obj.level > 0) {
        // + or ++ prefixed: nest under the most recent object at level-1
        const parent = levelMap.get(obj.level - 1);
        if (parent) {
          parent.children = parent.children ?? [];
          parent.children.push(sym);
        } else {
          symbols.push(sym);
        }
      } else {
        symbols.push(sym);
      }

      // Track this level and clear any deeper levels
      levelMap.set(obj.level, sym);
      for (const k of levelMap.keys()) {
        if (k > obj.level) levelMap.delete(k);
      }

    } else if (node.kind === 'FunctionDecl') {
      const fn = node as FunctionDeclNode;
      if (!fn.name) continue;
      const range = toRange(fn.range);
      symbols.push(DocumentSymbol.create(fn.name, paramsToDetail(fn.params), SymbolKind.Function, range, range, []));

    } else if (node.kind === 'TemplateDecl') {
      const tmpl = node as TemplateDeclNode;
      if (!tmpl.className) continue;  // skip string template form
      const range = toRange(tmpl.range);
      const detail = templateItemsToDetail(tmpl.items);
      symbols.push(DocumentSymbol.create(tmpl.className, detail, SymbolKind.TypeParameter, range, range, []));
    }
  }

  return symbols;
}

/** Render template items as a sign-preserving detail string, e.g. `'name'? @location [items]?`. */
function templateItemsToDetail(items: TemplateItemNode[]): string {
  return items.map(item => {
    const opt = item.optional ? '?' : '';
    const alt = item.isAlternative ? ' |' : '';
    let token: string;
    switch (item.tokenKind) {
      case 'sstr':      token = `'${item.propName}'`; break;
      case 'dstr':      token = `"${item.propName}"`; break;
      case 'list':      token = `[${item.propName ?? ''}]`; break;
      case 'op':        token = `${item.op ?? ''}${item.propName ?? ''}`; break;
      case 'inherited': token = 'inherited'; break;
    }
    return `${token}${opt}${alt}`;
  }).join(' ');
}

/**
 * Extract a map of className → TemplateItemNode[] from a parsed program.
 * Used by the worker to ship structured template data alongside DocumentSymbols.
 */
export function extractTemplateItems(program: ProgramNode): Map<string, TemplateItemNode[]> {
  const result = new Map<string, TemplateItemNode[]>();
  for (const directive of program.directives) {
    if (directive.kind === 'TemplateDecl') {
      const tmpl = directive as TemplateDeclNode;
      if (tmpl.className) result.set(tmpl.className, tmpl.items);
    }
  }
  return result;
}
