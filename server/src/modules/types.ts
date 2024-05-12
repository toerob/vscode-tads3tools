import {
  Range,
  DocumentSymbol,
  Position,
  SymbolKind,
  SymbolInformation,
  Location,
} from "vscode-languageserver";
import { URI } from "vscode-uri";
import { filterForStandardLibraryFiles } from "./utils";
import { CaseInsensitiveMap } from "./CaseInsensitiveMap";
import { pathExistsSync } from "fs-extra";
import { ExtendedDocumentSymbolProperties } from "../parser/Tads3SymbolListener";

export type FilePathAndSymbols = {
  filePath: string;
  symbols: DocumentSymbol[];
};

export enum ExpressionType { OTHER, METHOD_INVOCATION, LOCAL_ASSIGNMENT };

export type DocumentSymbolWithScope = {
  documentSymbol?: DocumentSymbol
  functionScope?: DocumentSymbol
	callChain?: string[] // Clean this one if not needed
	callChainStr?: string // Clean this one if not needed
  
  constructorArgs?: string // Or DocumentSymbol if possible  
  instanceType?: string // Or DocumentSymbol if possible  

  epxressionType: ExpressionType
}


/*
export type ContextualInformationControlFlow = {
  type?: string; //if, else, while, for switch, function call.
  condition?: string; // condition expression needed to evaluate
  //branches: branchinfo[]
  //loopIteration:
  //functionCalls: {
  //  callee,
  //  arguments
  //}
  //exceptions:
};

export type SymbolWithInfo = {
  symbol: DocumentSymbol;
  fsPath: string;
  contextualInformation?: ContextualInformation;
};

export type ContextualInformation = {
  controlFlow: ContextualInformationControlFlow;
  parentNodes: DocumentSymbol;
  
  //currentScope: {}  //local variable parameters and imports
  //parentNodes: []
  //typeInformation: {} 
  //dependencies: []
  
};

*/
