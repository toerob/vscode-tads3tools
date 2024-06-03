import { DocumentSymbol } from "vscode-languageserver";

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
  epxressionType: ExpressionType;
};
