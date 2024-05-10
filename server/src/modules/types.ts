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


export type DocumentSymbolWithScope = {
  documentSymbol: DocumentSymbol
  functionScope?: DocumentSymbol
	callChain?: string[]
  type?: string // Or DocumentSymbol if possible
  
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
