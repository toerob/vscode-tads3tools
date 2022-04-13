import { Range, DocumentSymbol, Position, SymbolKind, SymbolInformation, Location } from 'vscode-languageserver';
import { URI } from 'vscode-uri';
import { filterForLibraryFiles } from './utils';
import { CaseInsensitiveMap } from './CaseInsensitiveMap';

export class TadsSymbolManager {
	symbols: Map<string, DocumentSymbol[]>;
	keywords: Map<string, Map<string, Range[]>>;
	additionalProperties: Map<string, Map<DocumentSymbol, any>> = new Map();
	inheritanceMap: Map<string, string> = new Map();

	onWindowsPlatform: boolean = false;

	constructor() {

		// Windows doesn't recognize case differences in file paths, therefore we need to use case insensitive maps:
		this.onWindowsPlatform = process.platform === 'win32';
		if (this.onWindowsPlatform) {
			this.symbols = new CaseInsensitiveMap();
			this.keywords = new CaseInsensitiveMap();
		} else {
			this.symbols = new Map();
			this.keywords = new Map();
		}
	}

	getAdditionalProperties(symbol: DocumentSymbol) {
		for (const keys of this.additionalProperties.keys()) {
			const localAdditionalProps = this.additionalProperties.get(keys);
			const props = localAdditionalProps?.get(symbol);
			if (props) {
				return props;
			}
		}
		return undefined;
	}

	findSymbol(name: any, deepSearch = true) {
		if (name) {
			for (const filePath of this.symbols.keys()) {
				const fileLocalSymbols = this.symbols.get(filePath);
				if (fileLocalSymbols) {
					const flattened = deepSearch ? flattenTreeToArray(fileLocalSymbols) : fileLocalSymbols;
					const symbol = flattened?.find(s => s.name === name);
					if (symbol) {
						return { symbol, filePath };
					}
				}
			}
		}
		return {};
	}


	findSymbols(name: string, allowedKind: SymbolKind[] | undefined = undefined, deepSearch = true) {
		const symbolSearchResult = [];
		if (name) {
			for (const filePath of this.symbols.keys()) {
				const fileLocalSymbols = deepSearch ?
					flattenTreeToArray(this.symbols.get(filePath) ?? [])
					: this.symbols.get(filePath) ?? [];

				let result;
				if (allowedKind !== undefined) {
					result = fileLocalSymbols?.filter(s => allowedKind.includes(s.kind) && s.name === name);
				} else {
					result = fileLocalSymbols?.filter(s => s.name === name);
				}
				if (result && result.length > 0) {
					symbolSearchResult.push({ filePath, symbols: result });
				}
			}
		}
		return symbolSearchResult;
	}

	getAllWorkspaceSymbols(onlyProjectFiles = true): SymbolInformation[] {
		const symbolSearchResult: SymbolInformation[] = [];

		let filepathArray;
		if (onlyProjectFiles) {
			const filePathSubset = [...this.symbols.keys()];
			const libraryFiles = filterForLibraryFiles(filePathSubset);
			const projectfiles = filePathSubset.filter(x => !libraryFiles.includes(x));
			filepathArray = projectfiles;
		} else {
			filepathArray = [...this.symbols.keys()];
		}

		for (const filePath of filepathArray ?? []) {
			const fp = this.onWindowsPlatform ? URI.file(filePath)?.path : filePath; // On Windows we need to convert this path
			const fileLocalSymbols = flattenTreeToSymbolInformationArray(fp, this.symbols.get(filePath) ?? [])
			if (fileLocalSymbols) {
				for (const fileLocalSymbol of fileLocalSymbols) {
					symbolSearchResult.push(fileLocalSymbol);
				}
			}
		}
		return symbolSearchResult;
	}


	getAllWorkspaceKeywordLocations(keyword: string, onlyProjectFiles = true): Location[] {
		const symbolSearchResult: SymbolInformation[] = [];
		let filepathArray;

		if (onlyProjectFiles) {
			const filePathSubset = [...this.keywords.keys()];
			const libraryFiles = filterForLibraryFiles(filePathSubset);
			const projectfiles = filePathSubset.filter(x => !libraryFiles.includes(x));
			filepathArray = projectfiles;
		} else {
			filepathArray = [...this.keywords.keys()];
		}

		const locations: Location[] = [];

		for (const filePath of symbolManager.keywords.keys()) {
			const fp = this.onWindowsPlatform ? URI.file(filePath)?.path : filePath; // On Windows we need to convert this path
			const keywordCollectionPerFile = symbolManager.keywords.get(fp);
			const ranges = keywordCollectionPerFile?.get(keyword) ?? [];
			for (const range of ranges) {
				locations.push(Location.create(fp, translateRangeByLineOffset(range, -1)));
			}
		}
		return locations;
	}

	getTemplates(): Set<DocumentSymbol> {
		const templates = new Set<DocumentSymbol>();
		for (const filePath of this.symbols.keys()) {
			const fileLocalSymbols = this.symbols.get(filePath);
			const templateSymbolsArray = fileLocalSymbols?.filter(s => s.kind === SymbolKind.TypeParameter) ?? [];
			for (const templateSymbol of templateSymbolsArray) {
				templates.add(templateSymbol);
			}
		}
		return templates;
	}

	getTemplatesFor(symbolName: string) {
		return [...this.getTemplates() ?? []].filter(x => x.name === symbolName);
	}

	findClosestSymbolKindByPosition(filePath: string, kind: SymbolKind, position: Position): any {
		const fileLocalSymbols = this.symbols.get(filePath);
		if (fileLocalSymbols) {
			const flattenedLocalSymbols = flattenTreeToArray(fileLocalSymbols);
			const symbol = flattenedLocalSymbols?.find(s => s.kind === kind
				&& position.line >= s.range.start.line
				&& position.line <= s.range.end.line);
			if (symbol) {
				return symbol;
			}
		}
		return undefined;
	}

	mapHeritage(symbol: DocumentSymbol) {
		const superTypes = symbol.detail?.split(',') ?? [];
		const heritages = new Map();
		for (const ancestor of superTypes) {
			heritages.set(ancestor, this.findHeritage(ancestor));
		}
		return heritages;
	}

	findHeritage(name: string): string[] {
		const heritageStack: string[] = [];
		let ancestorName = this.inheritanceMap.get(name);
		heritageStack.push(name);
		if (ancestorName) {
			heritageStack.push(ancestorName);
			while (ancestorName && (ancestorName = this.inheritanceMap.get(ancestorName)) !== undefined) {
				if (ancestorName === '__root__') {
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
		if (fileLocalSymbols) {
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

export function flattenTreeToSymbolInformationArray(filepath: string, localSymbols: DocumentSymbol[]): SymbolInformation[] {
	const basketOfSymbols: SymbolInformation[] = [];
	addSymbolInformationRecursively(filepath, localSymbols, basketOfSymbols);
	return basketOfSymbols;
}

export function addSymbolInformationRecursively(filepath: string, localSymbols: DocumentSymbol[], basketOfSymbols: any, containerName?: string) {
	for (const symbol of localSymbols) {
		basketOfSymbols.push(SymbolInformation.create(symbol.name, symbol.kind, symbol.range, filepath, containerName));
		if (symbol.children) {
			addSymbolInformationRecursively(filepath, symbol.children, basketOfSymbols, symbol.name);
		}
	}
}

export const symbolManager = new TadsSymbolManager();

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
function translateRangeByLineOffset(range: Range, offsetLine: number = 0) {
	return Range.create(
		Position.create(range.start.line + offsetLine, range.start.character),
		Position.create(range.end.line + offsetLine, range.end.character)
	);
}