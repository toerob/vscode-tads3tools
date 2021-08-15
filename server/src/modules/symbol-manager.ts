
import { Range, DefinitionParams, Location, DocumentSymbol, Position, SymbolKind } from 'vscode-languageserver';
import { ExtendedDocumentSymbolProperties } from '../parser/Tads3SymbolListener';

export class Tads3SymbolManager {
	symbols: Map<string, DocumentSymbol[]> = new Map();
	keywords: Map<string, Map<string, Range[]>> = new Map();
	additionalProperties: Map<string, Map<DocumentSymbol, any>> = new Map();
	inheritanceMap: Map<string, string> = new Map(); // TODO:

	findSymbol(name: any) {
		for (const filePath of this.symbols.keys()) {
			const fileLocalSymbols = this.symbols.get(filePath);
			const symbol = fileLocalSymbols?.find(s => s.name === name);
			if (symbol) {
				return { symbol, filePath };
			}
		}
		return {};
	}

	findClosestSymbolKindByPosition(filePath: string, kind: SymbolKind, position: Position): any {
		const fileLocalSymbols = this.symbols.get(filePath);
		if(fileLocalSymbols) {
			const flattenedLocalSymbols = flattenTreeToArray(fileLocalSymbols);
			const symbol = flattenedLocalSymbols?.find(s => s.kind === kind
				&& position.line >= s.range.start.line
				&& position.line <= s.range.end.line);
			if (symbol) {
				return { symbol, filePath };
			}
		}
		return {};
	}

	mapHeritage(symbol: DocumentSymbol) {
		const superTypes = symbol.detail?.split(',') ?? [];
		const heritages = new Map();
		for(const ancestor of superTypes) {
			heritages.set(ancestor, this.findHeritage(ancestor));
		}
		return heritages;
	}

	findHeritage(name: string): string[] {
		const heritageStack:string[] = [];
		let ancestorName = this.inheritanceMap.get(name);
		heritageStack.push(name);
		if(ancestorName) {
			heritageStack.push(ancestorName);
			while( ancestorName && (ancestorName = this.inheritanceMap.get(ancestorName)) !== undefined) {
				if(ancestorName === '__root__') {
					break;
				}
				heritageStack.push(ancestorName);
			}
		}
		return heritageStack;
	}

	findContainingObject(filePath: string, position: Position): any {
		function isClassOrObject(symbolKind: SymbolKind) {
			return symbolKind === SymbolKind.Object
				|| symbolKind === SymbolKind.Class;
		}
		const fileLocalSymbols = this.symbols.get(filePath);
		if(fileLocalSymbols) {
			const flattenedLocalSymbols = flattenTreeToArray(fileLocalSymbols);
			return flattenedLocalSymbols?.find(s => 
				isClassOrObject(s.kind)
				&& position.line >= s.range.start.line
				&& position.line <= s.range.end.line);
			
		}
		return undefined;
	}
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
