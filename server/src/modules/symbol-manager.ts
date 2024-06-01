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
import {
  DocumentSymbolWithScope,
  ExpressionType,
  FilePathAndSymbols,
} from "./types";

export class TadsSymbolManager {
  public symbols: Map<string, DocumentSymbol[]>;
  // TODO: future tech - symbols2: Map<string, DocumentSymbolWithScope[]> = new Map();

  public keywords: Map<string, Map<string, Range[]>>;
  public additionalProperties: Map<string, Map<DocumentSymbol, any>> =
    new Map();
  public inheritanceMap: Map<string, string> = new Map();
  public onWindowsPlatform = false;

  public assignmentStatements: Map<string, DocumentSymbol[]> = new Map();
  public expressionSymbols: Map<
    string,
    Map<string, DocumentSymbolWithScope[]>
  > = new Map();
  
  symbolParameters:  Map<string, Map<string, DocumentSymbol[]>> = new Map();

  constructor() {
    // Windows doesn't recognize case differences in file paths, therefore we need to use case insensitive maps:
    this.onWindowsPlatform = process.platform === "win32";
    if (this.onWindowsPlatform) {
      this.symbols = new CaseInsensitiveMap();
      this.keywords = new CaseInsensitiveMap();
    } else {
      this.symbols = new Map();
      this.keywords = new Map();
    }
  }

  getAdditionalProperties(
    symbol: DocumentSymbol
  ): ExtendedDocumentSymbolProperties | undefined {
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
          const flattened = deepSearch
            ? flattenTreeToArray(fileLocalSymbols)
            : fileLocalSymbols;
          const symbol = flattened?.find((s) => s.name === name);
          if (symbol) {
            return { symbol, filePath };
          }
        }
      }
    }
    return {};
  }

  getParent(symbol: DocumentSymbol | undefined): DocumentSymbol | undefined {
    return symbol
      ? symbolManager.getAdditionalProperties(symbol)?.parent ?? undefined
      : undefined;
  }

  getParentChain(symbol: DocumentSymbol | undefined): DocumentSymbol[] {
    const parentChain = [];
    let current = symbol;
    while ((current = this.getParent(current)) !== undefined) {
      parentChain.push(current);
    }
    return parentChain;
  }

  getContext(
    symbol: DocumentSymbol | undefined
  ): ExtendedDocumentSymbolProperties | undefined {
    return symbol
      ? symbolManager.getAdditionalProperties(symbol) ?? undefined
      : undefined;
  }

  getContextChain(
    symbol: DocumentSymbol | undefined
  ): ExtendedDocumentSymbolProperties[] {
    const contextChain: ExtendedDocumentSymbolProperties[] = [];
    const first = this.getContext(symbol);
    if (first) {
      contextChain.push(first);
      let current: ExtendedDocumentSymbolProperties | undefined = first;
      while ((current = this.getContext(current.parent)) !== undefined) {
        contextChain.push(current);
      }
    }
    return contextChain;
  }

  findSymbolsByNameArray(
    name: string[]
  ): { symbol: DocumentSymbol; filePath: string }[] {
    const symbols: { symbol: DocumentSymbol; filePath: string }[] = [];
    if (name) {
      for (const filePath of this.symbols.keys()) {
        const fileLocalSymbols = this.symbols.get(filePath);
        if (fileLocalSymbols) {
          const flattened = flattenTreeToArray(fileLocalSymbols);
          const flattenedSymbols: DocumentSymbol[] =
            flattened?.filter((s) => name.includes(s.name)) ?? [];
          for (const symbol of flattenedSymbols) {
            symbols.push({ symbol, filePath });
          }
        }
      }
    }
    return symbols;
  }

  findAllSymbols(
    name: string,
    kinds: SymbolKind[] | undefined = undefined
  ): { symbol: DocumentSymbol; filePath: string }[] {
    const symbols: { symbol: DocumentSymbol; filePath: string }[] = [];
    if (name) {
      for (const filePath of this.symbols.keys()) {
        const fileLocalSymbols = this.symbols.get(filePath);
        if (fileLocalSymbols) {
          const flattened = flattenTreeToArray(fileLocalSymbols);

          const localSymbols = flattened
            ?.filter((s) =>
              kinds === undefined
                ? s.name === name
                : s.name === name && kinds.includes(s.kind)
            )
            .map((x) => ({ symbol: x, filePath }));

          if (localSymbols && localSymbols.length > 0) {
            symbols.push(...localSymbols);
          }
        }
      }
    }
    return symbols;
  }

  findAllSymbolsByKind(
    filePath: string,
    kinds: SymbolKind[]
  ): { symbol: DocumentSymbol; filePath: string }[] {
    const symbols: { symbol: DocumentSymbol; filePath: string }[] = [];
    //for (const filePath of this.symbols.keys()) {
    const fileLocalSymbols = this.symbols.get(filePath);
    if (fileLocalSymbols) {
      const flattened = flattenTreeToArray(fileLocalSymbols);

      const localSymbols = flattened
        ?.filter((s) => kinds.includes(s.kind))
        .map((x) => ({ symbol: x, filePath }));

      if (localSymbols && localSymbols.length > 0) {
        symbols.push(...localSymbols);
      }
    }
    //}
    return symbols;
  }

  findSymbolsByDetail(
    detail: string,
    allowedKind: SymbolKind[] | undefined = undefined,
    deepSearch = true
  ) {
    const symbolSearchResult = [];
    if (detail) {
      for (const filePath of this.symbols.keys()) {
        const fileLocalSymbols = deepSearch
          ? flattenTreeToArray(this.symbols.get(filePath) ?? [])
          : this.symbols.get(filePath) ?? [];

        let result;
        if (allowedKind !== undefined) {
          result = fileLocalSymbols?.filter(
            (s) => allowedKind.includes(s.kind) && s.detail?.includes(detail)
          );
        } else {
          result = fileLocalSymbols?.filter((s) => s.detail?.includes(detail));
        }
        if (result && result.length > 0) {
          symbolSearchResult.push({ filePath, symbols: result });
        }
      }
    }
    return symbolSearchResult;
  }

  findSymbols(
    name: string,
    allowedKind: SymbolKind[] | undefined = undefined,
    deepSearch = true
  ): FilePathAndSymbols[] {
    const symbolSearchResult: FilePathAndSymbols[] = [];
    if (name) {
      for (const filePath of this.symbols.keys()) {
        const fileLocalSymbols = deepSearch
          ? flattenTreeToArray(this.symbols.get(filePath) ?? [])
          : this.symbols.get(filePath) ?? [];

        let result;
        if (allowedKind !== undefined) {
          result = fileLocalSymbols?.filter(
            (s) => allowedKind.includes(s.kind) && s.name === name
          );
        } else {
          result = fileLocalSymbols?.filter((s) => s.name === name);
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
      const libraryFiles = filterForStandardLibraryFiles(filePathSubset);
      const projectfiles = filePathSubset.filter(
        (x) => !libraryFiles.includes(x)
      );
      filepathArray = projectfiles;
    } else {
      filepathArray = [...this.symbols.keys()];
    }

    for (const filePath of filepathArray ?? []) {
      const fp = this.onWindowsPlatform ? URI.file(filePath)?.path : filePath; // On Windows we need to convert this path
      const fileLocalSymbols = flattenTreeToSymbolInformationArray(
        fp,
        this.symbols.get(filePath) ?? []
      );
      if (fileLocalSymbols) {
        for (const fileLocalSymbol of fileLocalSymbols) {
          symbolSearchResult.push(fileLocalSymbol);
        }
      }
    }
    return symbolSearchResult;
  }

  getAllWorkspaceKeywordLocations(
    keyword: string,
    onlyProjectFiles = true
  ): Location[] {
    let filepathArray;

    if (onlyProjectFiles) {
      const filePathSubset = [...this.keywords.keys()];
      const libraryFiles = filterForStandardLibraryFiles(filePathSubset);
      const projectfiles = filePathSubset.filter(
        (x) => !libraryFiles.includes(x)
      );
      filepathArray = projectfiles;
    } else {
      filepathArray = [...this.keywords.keys()];
    }

    const locations: Location[] = [];

    for (const filePath of this.keywords.keys()) {
      const fp = this.onWindowsPlatform ? URI.file(filePath)?.path : filePath; // On Windows we need to convert this path
      const keywordCollectionPerFile = this.keywords.get(filePath);
      const ranges = keywordCollectionPerFile?.get(keyword) ?? [];
      for (const range of ranges) {
        locations.push(
          Location.create(fp, translateRangeByLineOffset(range, -1))
        );
      }
    }
    return locations;
  }

  getTemplates(): Set<DocumentSymbol> {
    const templates = new Set<DocumentSymbol>();
    for (const filePath of this.symbols.keys()) {
      const fileLocalSymbols = this.symbols.get(filePath);
      const templateSymbolsArray =
        fileLocalSymbols?.filter((s) => s.kind === SymbolKind.TypeParameter) ??
        [];
      for (const templateSymbol of templateSymbolsArray) {
        templates.add(templateSymbol);
      }
    }
    return templates;
  }

  getTemplatesFor(symbolName: string) {
    return [...(this.getTemplates() ?? [])].filter(
      (x) => x.name === symbolName
    );
  }

  findClosestSymbolKindByPosition(
    filePath: string,
    kind: SymbolKind[],
    position: Position
  ): DocumentSymbol | undefined {
    const fileLocalSymbols = this.symbols.get(filePath);
    if (fileLocalSymbols) {
      const flattenedLocalSymbols = flattenTreeToArray(fileLocalSymbols);
      const symbol = flattenedLocalSymbols?.find(
        (s) =>
          kind.includes(s.kind) &&
          position.line >= s.range.start.line &&
          position.line <= s.range.end.line
      );
      if (symbol) {
        return symbol;
      }
    }
    return undefined;
  }

  mapHeritage(symbol: DocumentSymbol) {
    const superTypes = symbol.detail?.split(",") ?? [];
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
      while (
        ancestorName &&
        (ancestorName = this.inheritanceMap.get(ancestorName)) !== undefined
      ) {
        if (ancestorName === "__root__") {
          break;
        }
        heritageStack.push(ancestorName);
      }
    }
    return heritageStack;
  }

  getInheritanceChainFor(parentName: string): string[] {
    const potentialParents = this.findAllSymbols(parentName);
    const superClassNames: any[] =
      potentialParents?.flatMap((x) => x.symbol?.detail?.split(",")) ?? [];
    const superClassNamesByInheritance = this.sortByInheritanceOrder(
      parentName,
      superClassNames
    );
    const uniqueSuperClasses = [...new Set(superClassNamesByInheritance)];
    return uniqueSuperClasses;
  }

  sortByInheritanceOrder(originalClassName: string, classNames: string[]) {
    const superClasses = classNames.map((x) => this.findHeritage(x)) ?? [];
    const orderedClasses = [originalClassName];
    const largestArrayLength =
      superClasses
        ?.map((x) => x.length)
        ?.sort()
        ?.reverse()?.[0] ?? 0;

    for (let j = 0; j < largestArrayLength; j++) {
      for (let i = 0; i < superClasses.length; i++) {
        if (j < superClasses[i]?.length) {
          orderedClasses.push(superClasses[i][j]);
        }
      }
    }
    return orderedClasses;
  }

  findContainingObject(
    filePath: string,
    position: Position
  ): DocumentSymbol | undefined {
    function isClassOrObject(symbolKind: SymbolKind) {
      return (
        symbolKind === SymbolKind.Object || symbolKind === SymbolKind.Class
      );
    }
    const fileLocalSymbols = this.symbols.get(filePath);
    if (fileLocalSymbols) {
      const flattenedLocalSymbols = flattenTreeToArray(fileLocalSymbols);
      return flattenedLocalSymbols?.find(
        (s) =>
          isClassOrObject(s.kind) &&
          position.line >= s.range.start.line &&
          position.line <= s.range.end.line
      );
    }
    return undefined;
  }

  pruneFile(uriString: string): boolean {
    return symbolManager.symbols.delete(uriString);
  }

  pruneFiles() {
    [...this.symbols.keys()]
      .filter((x) => !pathExistsSync(x))
      .forEach((x) => symbolManager.symbols.delete(x));
  }

  // TODO: improve this by a range instead
  // TODO: check sorting order
  getClosestAssignmentDeclaration(
    fsPath: string,
    symbolName: any,
    position: Position
  ): DocumentSymbolWithScope | undefined {
    return this.getClosestExpressionSymbol(
      fsPath,
      symbolName,
      ExpressionType.LOCAL_ASSIGNMENT,
      position
    );
  }

  getClosestExpressionSymbol(
    fsPath: string,
    symbolName: any,
    type: ExpressionType,
    position: Position
  ): DocumentSymbolWithScope | undefined {
    const localExpressionSymbols = this.expressionSymbols.get(fsPath);
    const assignmentDeclarationsSortedByLine = localExpressionSymbols
      ?.get(symbolName)
      ?.filter((x) => x.epxressionType === type)
      ?.filter(
        (x) => (x.documentSymbol?.range?.start?.line ?? 0) <= position.line
      ) // Filter everything greater than the current line
      ?.sort(
        (a, b) =>
          (a.documentSymbol?.range?.start?.line ?? 0) -
          (b.documentSymbol?.range?.start?.line ?? 0)
      )
      ?.reverse();
    return assignmentDeclarationsSortedByLine?.[0] ?? undefined;
  }

  getExpressionSymbol(
    fsPath: string,
    symbol: DocumentSymbol
  ): DocumentSymbolWithScope | undefined {
    return (
      this.expressionSymbols
        ?.get(fsPath)
        ?.get(symbol.name)
        ?.find(
          (x: DocumentSymbolWithScope) =>
            (x.documentSymbol?.range?.start?.line ?? 0) ===
            symbol.range.start.line
        ) ?? undefined
    );
  }

  isPositionWithinCodeBlock(fsPath: string, pos: Position): boolean {
    const allMethodsInFile = this.findAllSymbolsByKind(fsPath, [
      SymbolKind.Function,
      SymbolKind.Method,
    ]);
    const methodsContainingRange =
      allMethodsInFile
        ?.map((x) => x.symbol.range)
        ?.filter((x) => pos.line > x.start.line && pos.line < x.end.line) ??
      [];
    return methodsContainingRange?.length > 0;
  }
}

export function flattenTreeToArray(localSymbols: DocumentSymbol[]) {
  const basketOfSymbols: DocumentSymbol[] = [];
  addRecursively(localSymbols, basketOfSymbols);
  return basketOfSymbols;
}

export function addRecursively(
  localSymbols: DocumentSymbol[],
  basketOfSymbols: any
) {
  for (const symbol of localSymbols) {
    basketOfSymbols.push(symbol);
    if (symbol.children) {
      addRecursively(symbol.children, basketOfSymbols);
    }
  }
}

export function flattenTreeToSymbolInformationArray(
  filepath: string,
  localSymbols: DocumentSymbol[]
): SymbolInformation[] {
  const basketOfSymbols: SymbolInformation[] = [];
  addSymbolInformationRecursively(filepath, localSymbols, basketOfSymbols);
  return basketOfSymbols;
}

export function addSymbolInformationRecursively(
  filepath: string,
  localSymbols: DocumentSymbol[],
  basketOfSymbols: any,
  containerName?: string
) {
  for (const symbol of localSymbols) {
    basketOfSymbols.push(
      SymbolInformation.create(
        symbol.name,
        symbol.kind,
        symbol.range,
        filepath,
        containerName
      )
    );
    if (symbol.children) {
      addSymbolInformationRecursively(
        filepath,
        symbol.children,
        basketOfSymbols,
        symbol.name
      );
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
function translateRangeByLineOffset(range: Range, offsetLine = 0) {
  return Range.create(
    Position.create(range.start.line + offsetLine, range.start.character),
    Position.create(range.end.line + offsetLine, range.end.character)
  );
}

export function swapToConstructor(symbolToBe: DocumentSymbol): any {
  return symbolToBe.children?.find((x) => x.name === "construct") ?? symbolToBe;
}

export function isClassOrObject(symbol: any): boolean {
  return symbol.kind === SymbolKind.Class || symbol.kind === SymbolKind.Object;
}

