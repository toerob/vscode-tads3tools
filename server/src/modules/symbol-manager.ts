
import { Range, DefinitionParams, Location, DocumentSymbol  } from 'vscode-languageserver';
import { ExtendedDocumentSymbolProperties } from '../parser/Tads3SymbolListener';

export class Tads3SymbolManager {
	symbols: Map<string, DocumentSymbol[]> = new Map();
	keywords: Map<string, Map<string, Range[]>> = new Map();
	additionalProperties: Map<string, Map<string, ExtendedDocumentSymbolProperties>> = new Map();
	inheritanceMap: Map<string, string> = new Map(); // TODO:
}

export function flattenTreeToArray(localSymbols: DocumentSymbol[]) {
	const basketOfSymbols: DocumentSymbol[] = [];
	addRecursively(localSymbols, basketOfSymbols);
	return basketOfSymbols;
}

export function addRecursively(localSymbols: DocumentSymbol[], basketOfSymbols: any) {
	for (const symbol of localSymbols) {
		basketOfSymbols.push(symbol);
		if (symbol.children) {
			addRecursively(symbol.children, basketOfSymbols);
		}
	}
}
/*
export function swapParent(newParent: ExtendedDocumentSymbol, oldParent: ExtendedDocumentSymbol, symbolAsExtDocObj: ExtendedDocumentSymbol, symbols: any) {
	if (newParent) {
		if (oldParent) {
			let idx = oldParent.children.findIndex(x => x === symbolAsExtDocObj);
			if(idx) {
				oldParent.children = oldParent.children.splice(idx, 1);
			}
		} else {
			let idx = symbols.findIndex(x=>x === symbolAsExtDocObj); 
			if(idx) {
				symbols.splice(idx, 1);
			}
		}
		newParent.children.push(symbolAsExtDocObj);
		symbolAsExtDocObj.parent = newParent;
	}
}*/
