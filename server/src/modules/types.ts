import { DocumentSymbol } from "vscode-languageserver";

// ── Property value map ────────────────────────────────────────────────────────

/**
 * A JSON-serializable representation of a single TADS3 property value.
 * Complex expressions that cannot be reduced statically are represented as
 * { kind: 'unknown' }.
 */
export type SimpleValue =
  | { kind: 'nil' }
  | { kind: 'true' }
  | { kind: 'number'; value: number }
  | { kind: 'string'; value: string }
  | { kind: 'ref';    name: string }          // identifier / &reference
  | { kind: 'list';   elements: SimpleValue[] }
  | { kind: 'unknown' };

/**
 * objectName → (propertyName → SimpleValue)
 *
 * Built once per file during parsing and stored in the symbol manager.
 * Gives LSP features (hover, completions, …) direct access to static
 * property values without re-running the evaluator at request time.
 */
export type PropertyValueMap = Map<string, Map<string, SimpleValue>>;

export type FilePathAndSymbols = {
  filePath: string;
  symbols: DocumentSymbol[];
};

export enum ExpressionType {
  OTHER,
  METHOD_INVOCATION,
  METHOD_PARAMETER,
  LOCAL_ASSIGNMENT,
}

export type DocumentSymbolWithScope = {
  documentSymbol?: DocumentSymbol;
  functionScope?: DocumentSymbol;
  callChain?: string[]; // Clean this one if not needed
  callChainStr?: string; // Clean this one if not needed
  constructorArgs?: string; // Or DocumentSymbol if possible
  instanceType?: string; // Or DocumentSymbol if possible
  expressionType: ExpressionType;
};
