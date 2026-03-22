import { Range, DocumentSymbol, Position, SymbolKind, SymbolInformation, Location } from "vscode-languageserver";
import { EventEmitter } from "events";
import { URI } from "vscode-uri";
import { filterForStandardLibraryFiles } from "./utils";
import { CaseInsensitiveMap } from "./CaseInsensitiveMap";
import { pathExistsSync } from "fs-extra";
import { ExtendedDocumentSymbolProperties } from "../parser/Tads3SymbolListener";
import { DocumentSymbolWithScope, ExpressionType, FilePathAndSymbols, PropertyValueMap, SimpleValue } from "./types";
import { TemplateItemNode } from "../parser/ast/nodes";
import { MapNodeData } from "./mapcrawling/MapNodeData";
import { getDefineMacrosMap } from '../parser/preprocessor';
import { get } from 'http';

export class TadsSymbolManager {
  public symbols: Map<string, DocumentSymbol[]>|CaseInsensitiveMap<string,DocumentSymbol[]>;
  public keywords: Map<string, Map<string, Range[]>>|CaseInsensitiveMap<string,Map<string, Range[]>>;
  public additionalProperties: Map<string, Map<DocumentSymbol, any>> = new Map();
  /** Flat map from object name → map-editor metadata. Stable across reparsing (name-keyed, not identity-keyed). */
  public mapData: Map<string, MapNodeData> = new Map();
  public inheritanceMap: Map<string, string> = new Map();
  public onWindowsPlatform = false;
  public assignmentStatements: Map<string, DocumentSymbol[]> = new Map();
  public expressionSymbols: Map<string, Map<string, DocumentSymbolWithScope[]>> = new Map();
  /** filePath → objectName → propName → SimpleValue (populated by the v2 worker) */
  public propertyValues: Map<string, PropertyValueMap> = new Map();
  /** filePath → className → TemplateItemNode[] (populated by the v2 worker) */
  public templateItems: Map<string, Map<string, TemplateItemNode[]>> = new Map();

  private _parsingInProgress = false;
  private _initialParseCompleted = false;
  private _symbolEvents = new EventEmitter();

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
    this._symbolEvents.setMaxListeners(50);
  }

  get parsingInProgress() {
    return this._parsingInProgress;
  }

  set parsingInProgress(value: boolean) {
    this._parsingInProgress = value;
    if (!value) {
      this._initialParseCompleted = true;
      this._symbolEvents.emit("parsingDone");
    }
  }

  get initialParseCompleted() {
    return this._initialParseCompleted;
  }

  notifySymbolsReady(fsPath: string) {
    this._symbolEvents.emit(`symbols:${fsPath}`);
  }

  /**
   * Wait for symbols to become available for a specific file path.
   * Returns immediately if symbols already exist. Times out after the given ms.
   */
  waitForSymbols(fsPath: string, timeoutMs = 30_000): Promise<void> {
    if (this.symbols.has(fsPath)) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      const onSymbols = () => {
        clearTimeout(timer);
        this._symbolEvents.removeListener("parsingDone", onDone);
        resolve();
      };
      const onDone = () => {
        clearTimeout(timer);
        this._symbolEvents.removeListener(`symbols:${fsPath}`, onSymbols);
        resolve();
      };
      const timer = setTimeout(() => {
        this._symbolEvents.removeListener(`symbols:${fsPath}`, onSymbols);
        this._symbolEvents.removeListener("parsingDone", onDone);
        resolve();
      }, timeoutMs);
      this._symbolEvents.once(`symbols:${fsPath}`, onSymbols);
      this._symbolEvents.once("parsingDone", onDone);
    });
  }

  getAdditionalProperties(symbol: DocumentSymbol): ExtendedDocumentSymbolProperties | undefined {
    for (const keys of this.additionalProperties.keys()) {
      const localAdditionalProps = this.additionalProperties.get(keys);
      const props = localAdditionalProps?.get(symbol);
      if (props) {
        return props;
      }
    }
    return undefined;
  }

  /**
   * Look up the statically-extracted value of a named property on a named object.
   * Searches across all files; returns undefined when not found or not resolvable.
   *
   * @example
   *   const val = symbolManager.getPropertyValue('kitchen', 'north');
   *   // { kind: 'ref', name: 'library' }
   */
  getPropertyValue(objectName: string, propName: string): SimpleValue | undefined {
    for (const fileMap of this.propertyValues.values()) {
      const objMap = fileMap.get(objectName);
      if (objMap) return objMap.get(propName);
    }
    return undefined;
  }

  /**
   * Return all statically-known properties for a named object, or undefined
   * if the object was not found in any parsed file.
   */
  getObjectProperties(objectName: string): Map<string, SimpleValue> | undefined {
    for (const fileMap of this.propertyValues.values()) {
      const objMap = fileMap.get(objectName);
      if (objMap) return objMap;
    }
    return undefined;
  }

  /** Return the structured template items for a class, searched across all parsed files. */
  getTemplateItems(className: string): TemplateItemNode[] | undefined {
    for (const fileMap of this.templateItems.values()) {
      const items = fileMap.get(className);
      if (items) return items;
    }
    return undefined;
  }

  findSymbol(name: any, deepSearch = true) {
    if (name) {
      for (const filePath of this.symbols.keys()) {
        const fileLocalSymbols = this.symbols.get(filePath);
        if (fileLocalSymbols) {
          const flattened = deepSearch ? flattenTreeToArray(fileLocalSymbols) : fileLocalSymbols;
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
    return symbol ? symbolManager.getAdditionalProperties(symbol)?.parent ?? undefined : undefined;
  }

  getParentChain(symbol: DocumentSymbol | undefined): DocumentSymbol[] {
    const parentChain = [];
    let current = symbol;
    while ((current = this.getParent(current)) !== undefined) {
      parentChain.push(current);
    }
    return parentChain;
  }

  getContext(symbol: DocumentSymbol | undefined): ExtendedDocumentSymbolProperties | undefined {
    return symbol ? symbolManager.getAdditionalProperties(symbol) ?? undefined : undefined;
  }

  getContextChain(symbol: DocumentSymbol | undefined): ExtendedDocumentSymbolProperties[] {
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

  findSymbolsByNameArray(name: string[]): { symbol: DocumentSymbol; filePath: string }[] {
    const symbols: { symbol: DocumentSymbol; filePath: string }[] = [];
    if (name) {
      for (const filePath of this.symbols.keys()) {
        const fileLocalSymbols = this.symbols.get(filePath);
        if (fileLocalSymbols) {
          const flattened = flattenTreeToArray(fileLocalSymbols);
          const flattenedSymbols: DocumentSymbol[] = flattened?.filter((s) => name.includes(s.name)) ?? [];
          for (const symbol of flattenedSymbols) {
            symbols.push({ symbol, filePath });
          }
        }
      }
    }
    return symbols;
  }

  // Optimize
  findAllSymbols(
    name: string,
    kinds: SymbolKind[] | undefined = undefined,
  ): { symbol: DocumentSymbol; filePath: string }[] {
    const symbols: { symbol: DocumentSymbol; filePath: string }[] = [];
    if (name) {
      for (const filePath of this.symbols.keys()) {
        const fileLocalSymbols = this.symbols.get(filePath);
        if (fileLocalSymbols) {
          const flattened = flattenTreeToArray(fileLocalSymbols);
          const localSymbols = flattened
            ?.filter((s) => (kinds === undefined ? s.name === name : s.name === name && kinds.includes(s.kind)))
            .map((x) => ({ symbol: x, filePath }));

          if (localSymbols && localSymbols.length > 0) {
            symbols.push(...localSymbols);
          }
        }
      }
    }
    return symbols;
  }

  findAllSymbolsByKind(filePath: string, kinds: SymbolKind[]): { symbol: DocumentSymbol; filePath: string }[] {
    const symbols: { symbol: DocumentSymbol; filePath: string }[] = [];
    //for (const filePath of this.symbols.keys()) {
    const fileLocalSymbols = this.symbols.get(filePath);
    if (fileLocalSymbols) {
      const flattened = flattenTreeToArray(fileLocalSymbols);

      const localSymbols = flattened?.filter((s) => kinds.includes(s.kind)).map((x) => ({ symbol: x, filePath }));

      if (localSymbols && localSymbols.length > 0) {
        symbols.push(...localSymbols);
      }
    }
    //}
    return symbols;
  }

  findSymbolsByDetail(detail: string, allowedKind: SymbolKind[] | undefined = undefined, deepSearch = true) {
    const symbolSearchResult = [];
    if (detail) {
      for (const filePath of this.symbols.keys()) {
        const fileLocalSymbols = deepSearch
          ? flattenTreeToArray(this.symbols.get(filePath) ?? [])
          : this.symbols.get(filePath) ?? [];

        let result;
        if (allowedKind !== undefined) {
          result = fileLocalSymbols?.filter((s) => allowedKind.includes(s.kind) && s.detail?.includes(detail));
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
    deepSearch = true,
  ): FilePathAndSymbols[] {
    const symbolSearchResult: FilePathAndSymbols[] = [];
    if (name) {
      for (const filePath of this.symbols.keys()) {
        const fileLocalSymbols = deepSearch
          ? flattenTreeToArray(this.symbols.get(filePath) ?? [])
          : this.symbols.get(filePath) ?? [];

        let result;
        if (allowedKind !== undefined) {
          result = fileLocalSymbols?.filter((s) => allowedKind.includes(s.kind) && s.name === name);
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
      const projectfiles = filePathSubset.filter((x) => !libraryFiles.includes(x));
      filepathArray = projectfiles;
    } else {
      filepathArray = [...this.symbols.keys()];
    }

    for (const filePath of filepathArray ?? []) {
      const fp = this.onWindowsPlatform ? URI.file(filePath)?.path : filePath; // On Windows we need to convert this path
      const fileLocalSymbols = flattenTreeToSymbolInformationArray(fp, this.symbols.get(filePath) ?? []);
      if (fileLocalSymbols) {
        for (const fileLocalSymbol of fileLocalSymbols) {
          symbolSearchResult.push(fileLocalSymbol);
        }
      }
    }

    for(const macroSymbol of getDefineMacrosMap().keys()) {
      const value = getDefineMacrosMap().get(macroSymbol);
      const range = Range.create(value.row, 0, value.endLine, macroSymbol.length);
      symbolSearchResult.push(SymbolInformation.create(macroSymbol, SymbolKind.Constant, range, value.uri, 'GLOBAL MACRO'));
    }

    return symbolSearchResult;
  }

  getAllWorkspaceKeywordLocations(keyword: string, onlyProjectFiles = true): Location[] {
    let filepathArray;

    if (onlyProjectFiles) {
      const filePathSubset = [...this.keywords.keys()];
      const libraryFiles = filterForStandardLibraryFiles(filePathSubset);
      const projectfiles = filePathSubset.filter((x) => !libraryFiles.includes(x));
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
        locations.push(Location.create(fp, translateRangeByLineOffset(range, -1)));
      }
    }
    return locations;
  }

  getTemplates(): Set<DocumentSymbol> {
    const templates = new Set<DocumentSymbol>();
    for (const filePath of this.symbols.keys()) {
      const fileLocalSymbols = this.symbols.get(filePath);
      const templateSymbolsArray = fileLocalSymbols?.filter((s) => s.kind === SymbolKind.TypeParameter) ?? [];
      for (const templateSymbol of templateSymbolsArray) {
        templates.add(templateSymbol);
      }
    }
    return templates;
  }

  getTemplatesFor(
    symbolName: string,
    addInheritedTemplates = true,
    getAllRelatedTemplates = false
  ): { templates: DocumentSymbol[]; inherited: DocumentSymbol[] } {
    // Simple variant witout inheritance
    if(getAllRelatedTemplates) {
      const superClasses = this.findHeritage(symbolName);
      return {
        templates: [...(this.getTemplates() ?? [])].filter((x) => superClasses.includes(x.name)),
        inherited: [],
      };
    }

    if (!addInheritedTemplates) {
      return {
        templates: [...(this.getTemplates() ?? [])].filter((x) => symbolName === x.name),
        inherited: [],
      };
    }

    const templates = [...(this.getTemplates() ?? [])];
    let matchingTemplates = templates.filter((x) => x.name === symbolName);

    // If the class has no template of its own, walk up the heritage chain and use
    // the nearest ancestor's template (e.g. Decoration → Fixture → NonPortable → Thing).
    if (matchingTemplates.length === 0) {
      const heritage = this.findHeritage(symbolName);
      for (const ancestor of heritage.slice(1)) {
        matchingTemplates = templates.filter((x) => x.name === ancestor);
        if (matchingTemplates.length > 0) break;
      }
    }

    // Find the templates that are inherited by the found templates
    const inheritedTemplates = matchingTemplates.filter((x) => x.detail?.match(/\binherited\b/));

    const matchingInheritedTemplates: any[] = [];
    // Then add the templates which names are matching the superclasses
    for (const inheritedTemplate of inheritedTemplates) {
      const inheritedSuperclassSymbols = this.findHeritage(inheritedTemplate.name);
      const inheritedTemplateForms = templates.filter(
        (x) => x.name != symbolName && inheritedSuperclassSymbols.includes(x.name),
      );
      inheritedTemplateForms.forEach((x) => matchingInheritedTemplates.push(x));
    }

    return {
      templates: matchingTemplates,
      inherited: matchingInheritedTemplates,
    };
  }

  findClosestSymbolKindByPosition(
    filePath: string,
    kind: SymbolKind[],
    position: Position,
  ): DocumentSymbol | undefined {
    const fileLocalSymbols = this.symbols.get(filePath);
    if (fileLocalSymbols) {
      const flattenedLocalSymbols = flattenTreeToArray(fileLocalSymbols);
      const symbol = flattenedLocalSymbols?.find(
        (s) => kind.includes(s.kind) && position.line >= s.range.start.line && position.line <= s.range.end.line,
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
      while (ancestorName && (ancestorName = this.inheritanceMap.get(ancestorName)) !== undefined) {
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
    const superClassNames: any[] = potentialParents?.flatMap((x) => x.symbol?.detail?.split(",")) ?? [];
    const superClassNamesByInheritance = this.sortByInheritanceOrder(parentName, superClassNames);
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

  findContainingObject(filePath: string, position: Position): DocumentSymbol | undefined {
    function isClassOrObject(symbolKind: SymbolKind) {
      return symbolKind === SymbolKind.Object || symbolKind === SymbolKind.Class;
    }
    const fileLocalSymbols = this.symbols.get(filePath);
    if (fileLocalSymbols) {
      const flattenedLocalSymbols = flattenTreeToArray(fileLocalSymbols);
      return flattenedLocalSymbols?.find(
        (s) => isClassOrObject(s.kind) && position.line >= s.range.start.line && position.line <= s.range.end.line,
      );
    }
    return undefined;
  }

  pruneFile(uriString: string): boolean {
    return symbolManager.symbols.delete(uriString);
  }

  pruneFiles() {
    [...this.symbols.keys()].filter((x) => !pathExistsSync(x)).forEach((x) => symbolManager.symbols.delete(x));
  }

  // TODO: improve this by a range instead
  // TODO: check sorting order
  getClosestAssignmentDeclaration(
    fsPath: string,
    symbolName: any,
    position: Position,
  ): DocumentSymbolWithScope | undefined {
    return this.getClosestExpressionSymbol(fsPath, symbolName, ExpressionType.LOCAL_ASSIGNMENT, position);
  }

  getClosestExpressionSymbol(
    fsPath: string,
    symbolName: any,
    type: ExpressionType,
    position: Position,
  ): DocumentSymbolWithScope | undefined {
    const localExpressionSymbols = this.expressionSymbols.get(fsPath);
    const assignmentDeclarationsSortedByLine = localExpressionSymbols
      ?.get(symbolName)
      ?.filter((x) => x.expressionType === type)
      ?.filter((x) => (x.documentSymbol?.range?.start?.line ?? 0) <= position.line) // Filter everything greater than the current line
      ?.sort((a, b) => (a.documentSymbol?.range?.start?.line ?? 0) - (b.documentSymbol?.range?.start?.line ?? 0))
      ?.reverse();
    return assignmentDeclarationsSortedByLine?.[0] ?? undefined;
  }

  getExpressionSymbol(fsPath: string, symbol: DocumentSymbol): DocumentSymbolWithScope | undefined {
    return (
      this.expressionSymbols
        ?.get(fsPath)
        ?.get(symbol.name)
        ?.find(
          (x: DocumentSymbolWithScope) => (x.documentSymbol?.range?.start?.line ?? 0) === symbol.range.start.line,
        ) ?? undefined
    );
  }

  isPositionWithinCodeBlock(fsPath: string, pos: Position): boolean {
    const allMethodsInFile = this.findAllSymbolsByKind(fsPath, [SymbolKind.Function, SymbolKind.Method]);
    const methodsContainingRange =
      allMethodsInFile?.map((x) => x.symbol.range)?.filter((x) => pos.line > x.start.line && pos.line < x.end.line) ??
      [];
    return methodsContainingRange?.length > 0;
  }

  isPositionWithinObject(fsPath: string, pos: Position): boolean {
    const allClassesAndObjects = this.findAllSymbolsByKind(fsPath, [SymbolKind.Object, SymbolKind.Class]);
    const containingRange =
      allClassesAndObjects?.map((x) => x.symbol.range)?.filter((x) => pos.line >= x.start.line && pos.line <= x.end.line) ??
      [];
    return containingRange?.length >= 0;
  }

  offsetSymbols(filePath: any, line: any, lineOffset: any) {
    const symbols = this.symbols.get(filePath) ?? []; //?.filter(x=>x.range.start.line>=line) ?? [];
    for (const symbol of symbols) {
      if (symbol.range.start.line >= line) {
        symbol.range.start.line += lineOffset;
        symbol.range.end.line += lineOffset;
        symbol.selectionRange = symbol.range;
      }
      const childrenSymbols = symbol.children?.filter((x) => x.range.start.line >= line) ?? [];
      for (const symbol of childrenSymbols) {
        symbol.range.start.line += lineOffset;
        symbol.range.end.line += lineOffset;
        symbol.selectionRange = symbol.range;
      }      
    }
  }
}

/*
export function flattenTreeToArray(localSymbols: DocumentSymbol[]) {
  return addIterativelyDFS(localSymbols);
}*/
export function flattenTreeToArray(localSymbols: DocumentSymbol[]) {
  const basketOfSymbols: DocumentSymbol[] = [];
  addRecursivelyDFS(localSymbols, basketOfSymbols);
  return basketOfSymbols;
}

// Note: benchmark shows recursively vs iteratively is mostly on par with each other.
export function addIterativelyDFS(localSymbols: DocumentSymbol[]): DocumentSymbol[] {
  const result = [];
  const stack: DocumentSymbol[] = [];
  for (let i = localSymbols.length - 1; i >= 0; i--) {
    stack.push(localSymbols[i]);
  }
  while (stack.length > 0) {
    const symbol = stack.pop();
    if (symbol === undefined) continue;
    result.push(symbol);
    if (symbol.children) {
      for (let i = symbol.children.length; i >= 0; i--) {
        stack.push(symbol.children[i]);
      }
    }
  }
  return result;
}

// Alternative if the order of addIterativelyDFS doesn't matter, just the flatness (which should be sufficient in most cases)
export function addIterativelyDFS2(localSymbols: DocumentSymbol[]): DocumentSymbol[] {
  const result = [];
  const stack: DocumentSymbol[] = [...localSymbols];
  while (stack.length > 0) {
    const symbol = stack.pop();
    if (symbol === undefined) continue;
    result.push(symbol);
    if (symbol.children) {
      for (let i = symbol.children.length; i >= 0; i--) {
        stack.push(symbol.children[i]);
      }
    }
  }
  return result;
}

// NOTE: TOO SLOW?
export function addRecursivelyDFS(localSymbols: DocumentSymbol[], collection: any) {
  for (const symbol of localSymbols) {
    collection.push(symbol);
    if (symbol.children) {
      addRecursivelyDFS(symbol.children, collection);
    }
  }
}

export function flattenTreeToSymbolInformationArray(
  filepath: string,
  localSymbols: DocumentSymbol[],
): SymbolInformation[] {
  const basketOfSymbols: SymbolInformation[] = [];
  addSymbolInformationRecursively(filepath, localSymbols, basketOfSymbols);
  return basketOfSymbols;
}

export function addSymbolInformationRecursively(
  filepath: string,
  localSymbols: DocumentSymbol[],
  basketOfSymbols: any,
  containerName?: string,
) {
  for (const symbol of localSymbols) {
    basketOfSymbols.push(SymbolInformation.create(symbol.name, symbol.kind, symbol.range, filepath, containerName));
    if (symbol.children) {
      addSymbolInformationRecursively(filepath, symbol.children, basketOfSymbols, symbol.name);
    }
  }
}

export const symbolManager = new TadsSymbolManager();

export function translateRangeByLineOffset(range: Range, offsetLine = 0) {
  return Range.create(
    Position.create(range.start.line + offsetLine, range.start.character),
    Position.create(range.end.line + offsetLine, range.end.character),
  );
}

export function swapToConstructor(symbolToBe: DocumentSymbol): any {
  return symbolToBe.children?.find((x) => x.name === "construct") ?? symbolToBe;
}

export function isClassOrObject(symbol: any): boolean {
  return symbol.kind === SymbolKind.Class || symbol.kind === SymbolKind.Object;
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
