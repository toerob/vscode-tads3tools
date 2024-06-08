import { DocumentSymbol, Position, Range, SymbolKind } from "vscode-languageserver";
import {
  addIterativelyDFS,
  addRecursivelyDFS,
  flattenTreeToArray,
  TadsSymbolManager,
} from "../../src/modules/symbol-manager";
import { equal, notEqual, deepEqual } from "assert";
import { expect, test } from "@jest/globals";
import { symbolHierarchy1 } from "./symbols-for-test";

const range = Range.create(10, 2, 14, 5);
const symbol1 = DocumentSymbol.create("symbol1", "details here", SymbolKind.Class, range, range, []);
let sm: TadsSymbolManager;

describe("TadsSymbolManager test suite", () => {
  test("addRecursively correctness", () => {
    let result: DocumentSymbol[] = [];
    addRecursivelyDFS(symbolHierarchy1, result);
    const names = result.map((x) => x.name).join(", ");
    expect(names).toBe(
      "A, A_1, A_1_1, A_1_2, A_1_3, A_1_3_1, A_1_3_2, A_1_3_3, A_1_3_3_1, A_1_3_3_1_1, A_1_3_3_1_1_1, A_1_3_3_1_1_2, A_1_3_3_1_1_3, A_1_3_3_1_1_3_1, A_1_3_3_1_1_3_2, A_1_3_3_1_1_3_3, B, B_1, B_1_1, B_1_2, B_1_3, B_1_3_1, B_1_3_2, B_1_3_3, B_1_3_3_1, B_1_3_3_1_1, B_1_3_3_1_1_1, B_1_3_3_1_1_2, B_1_3_3_1_1_3, B_1_3_3_1_1_3_1, B_1_3_3_1_1_3_2, B_1_3_3_1_1_3_3, C, C_1, C_1_1, C_1_2, C_1_3, C_1_3_1, C_1_3_2, C_1_3_3, C_1_3_3_1, C_1_3_3_1_1, C_1_3_3_1_1_1, C_1_3_3_1_1_2, C_1_3_3_1_1_3, C_1_3_3_1_1_3_1, C_1_3_3_1_1_3_2, C_1_3_3_1_1_3_3",
    );
  });

  test("addIteratively correctness", () => {
    const flattened = addIterativelyDFS(symbolHierarchy1);
    const names = flattened.map((x) => x.name).join(", ");
    expect(names).toBe(
      "A, A_1, A_1_1, A_1_2, A_1_3, A_1_3_1, A_1_3_2, A_1_3_3, A_1_3_3_1, A_1_3_3_1_1, A_1_3_3_1_1_1, A_1_3_3_1_1_2, A_1_3_3_1_1_3, A_1_3_3_1_1_3_1, A_1_3_3_1_1_3_2, A_1_3_3_1_1_3_3, B, B_1, B_1_1, B_1_2, B_1_3, B_1_3_1, B_1_3_2, B_1_3_3, B_1_3_3_1, B_1_3_3_1_1, B_1_3_3_1_1_1, B_1_3_3_1_1_2, B_1_3_3_1_1_3, B_1_3_3_1_1_3_1, B_1_3_3_1_1_3_2, B_1_3_3_1_1_3_3, C, C_1, C_1_1, C_1_2, C_1_3, C_1_3_1, C_1_3_2, C_1_3_3, C_1_3_3_1, C_1_3_3_1_1, C_1_3_3_1_1_1, C_1_3_3_1_1_2, C_1_3_3_1_1_3, C_1_3_3_1_1_3_1, C_1_3_3_1_1_3_2, C_1_3_3_1_1_3_3",
    );
  });

  describe("findSymbol", () => {
    beforeEach(() => {
      sm = new TadsSymbolManager();
      sm.symbols.set("file1", [symbol1]);
      sm.symbols.set("file2", [symbol1]);
    });

    it("can find one symbol and which filepath it is located in", () => {
      const { filePath, symbol } = sm.findSymbol("symbol1");
      equal(filePath, "file1");
      equal(symbol?.name, "symbol1");
      equal(symbol?.kind, SymbolKind.Class);
      equal(symbol?.range.start.line, 10);
      equal(symbol?.range.start.character, 2);
      equal(symbol?.range.end.line, 14);
      equal(symbol?.range.end.character, 5);
    });

    it("will return an empty object when there is no match", () => {
      const result = sm.findSymbol("symbol0");
      notEqual(result, undefined);

      const { filePath, symbol } = result;
      equal(filePath, undefined);
      equal(symbol, undefined);
    });
  });

  describe("findSymbols", () => {
    beforeEach(() => {
      sm = new TadsSymbolManager();
      sm.symbols.set("file1", [symbol1]);
      sm.symbols.set("file2", [symbol1]);
    });

    it("can find several symbols by names and which filepaths they are located in", () => {
      const result = sm.findSymbols("symbol1");
      equal(result.length, 2);
      {
        let { filePath, symbols } = result[0];
        equal(symbols.length, 1);

        const symbol1 = symbols[0];
        equal(filePath, "file1");
        equal(symbol1?.name, "symbol1");
        equal(symbol1?.kind, SymbolKind.Class);
        equal(symbol1?.range.start.line, 10);
        equal(symbol1?.range.start.character, 2);
        equal(symbol1?.range.end.line, 14);
        equal(symbol1?.range.end.character, 5);
      }
      {
        const { filePath, symbols } = result[1];
        equal(symbols.length, 1);

        const symbol1 = symbols[0];
        equal(filePath, "file2");
        equal(symbol1?.name, "symbol1");
        equal(symbol1?.kind, SymbolKind.Class);
        equal(symbol1?.range.start.line, 10);
        equal(symbol1?.range.start.character, 2);
        equal(symbol1?.range.end.line, 14);
        equal(symbol1?.range.end.character, 5);
      }
    });

    it("will return an empty array when there are no matches", () => {
      const result = sm.findSymbols("symbol0");
      equal(result.length, 0);
    });
  });

  describe("mapHeritage", () => {
    beforeEach(() => {
      sm = new TadsSymbolManager();
      sm.symbols.set("file1", [symbol1]);
      sm.symbols.set("file2", [symbol1]);
      sm.inheritanceMap.set("objectWithAncestors", "SuperType");
      sm.inheritanceMap.set("SuperType", "GrandSuperType");
      sm.inheritanceMap.set("GrandSuperType", "GreatGrandSuperType");
      sm.inheritanceMap.set("objectWithOneAncestor", "AnotherSuperType");
      sm.inheritanceMap.set("Decoration", "Fixture");
      sm.inheritanceMap.set("Fixture", "NonPortable");
      sm.inheritanceMap.set("BasicLocation", "Thing");
    });

    it("returns an array containing the single name for a given symbol name when it has no ancestor(s)", () => {
      const result = sm.findHeritage("nonexistent");
      equal(result.length, 1);
      equal(result, "nonexistent");
    });

    it("returns an array of the symbol and superTyps for a given symbol name with one ancestor", () => {
      const result = sm.findHeritage("objectWithOneAncestor");
      equal(result.length, 2);
      deepEqual(result, ["objectWithOneAncestor", "AnotherSuperType"]);
    });

    it("returns an array of several superTypes for a given symbol name with an ancestor", () => {
      const result = sm.findHeritage("objectWithAncestors");
      equal(result.length, 4);
      deepEqual(result, ["objectWithAncestors", "SuperType", "GrandSuperType", "GreatGrandSuperType"]);
    });
  });

  describe("findHeritage", () => {
    beforeEach(() => {
      sm = new TadsSymbolManager();
      sm.symbols.set("file1", [symbol1]);
      sm.symbols.set("file2", [symbol1]);
      sm.inheritanceMap.set("objectWithAncestors", "SuperType");
      sm.inheritanceMap.set("SuperType", "GrandSuperType");
      sm.inheritanceMap.set("GrandSuperType", "GreatGrandSuperType");
      sm.inheritanceMap.set("objectWithOneAncestor", "AnotherSuperType");
      sm.inheritanceMap.set("Decoration", "Fixture");
      sm.inheritanceMap.set("Fixture", "NonPortable");
      sm.inheritanceMap.set("BasicLocation", "Thing");
    });
    it("returns an array containing the single name for a given symbol name when it has no ancestor(s)", () => {
      const result = sm.findHeritage("nonexistent");
      equal(result.length, 1);
      equal(result, "nonexistent");
    });

    it("returns an array of the symbol and superTyps for a given symbol name with one ancestor", () => {
      const result = sm.findHeritage("objectWithOneAncestor");
      equal(result.length, 2);
      deepEqual(result, ["objectWithOneAncestor", "AnotherSuperType"]);
    });

    it("returns an array of several superTypes for a given symbol name with an ancestor", () => {
      const result = sm.findHeritage("objectWithAncestors");
      equal(result.length, 4);
      deepEqual(result, ["objectWithAncestors", "SuperType", "GrandSuperType", "GreatGrandSuperType"]);
    });
  });

  describe("mapHeritage", () => {
    beforeEach(() => {
      sm = new TadsSymbolManager();
      sm.symbols.set("file1", [symbol1]);
      sm.symbols.set("file2", [symbol1]);
      sm.inheritanceMap.set("objectWithAncestors", "SuperType");
      sm.inheritanceMap.set("SuperType", "GrandSuperType");
      sm.inheritanceMap.set("GrandSuperType", "GreatGrandSuperType");
      sm.inheritanceMap.set("objectWithOneAncestor", "AnotherSuperType");
      sm.inheritanceMap.set("Decoration", "Fixture");
      sm.inheritanceMap.set("Fixture", "NonPortable");
      sm.inheritanceMap.set("BasicLocation", "Thing");
    });

    it("takes a DocumentSymbol, extract data from its details, lookup heritages for each detail and add its data to a map of heritage of ancestor(s)", () => {
      const range = Range.create(10, 2, 14, 5);
      const symbol2 = DocumentSymbol.create("symbol2", "Decoration,Fixture", SymbolKind.Object, range, range, []);
      const [result1, result2] = [...sm.mapHeritage(symbol2)];
      deepEqual(result1, ["Decoration", ["Decoration", "Fixture", "NonPortable"]]);
      deepEqual(result2, ["Fixture", ["Fixture", "NonPortable"]]);
    });
  });

  describe("flattenTreeToArray", () => {
    beforeEach(() => {
      sm = new TadsSymbolManager();
      sm.symbols.set("file1", [symbol1]);
      sm.symbols.set("file2", [symbol1]);
    });

    it("flattens an array containing children to a one level DocumentSymbol array", () => {
      const range = Range.create(10, 2, 14, 5);
      const child = DocumentSymbol.create("child", "details here", SymbolKind.Class, range, range, []);
      const parent = DocumentSymbol.create("parent", "Decoration,Fixture", SymbolKind.Object, range, range, [child]);
      const grandparent = DocumentSymbol.create("grandparent", "Decoration,Fixture", SymbolKind.Object, range, range, [
        parent,
      ]);
      const symbols: DocumentSymbol[] = [grandparent];
      equal(symbols.length, 1);

      const flattenedSymbols = flattenTreeToArray(symbols);
      equal(flattenedSymbols.length, 3);
      equal(flattenedSymbols[0].name, "grandparent");
      equal(flattenedSymbols[1].name, "parent");
      equal(flattenedSymbols[2].name, "child");
    });
  });

  describe("findClosestSymbolKindByPosition", () => {
    beforeEach(() => {
      sm = new TadsSymbolManager();
      sm.symbols.set("file1", [symbol1]);
      sm.symbols.set("file2", [symbol1]);
    });

    it("looks within a file for a symbol type a given position and retrieves a symbol if within its position", () => {
      const tooLowPosition = sm.findClosestSymbolKindByPosition("file1", [SymbolKind.Class], Position.create(9, 0));
      deepEqual(tooLowPosition, undefined);

      const withinSymbol1 = sm.findClosestSymbolKindByPosition("file1", [SymbolKind.Class], Position.create(10, 4));
      deepEqual(withinSymbol1, symbol1);

      const alsoWithinSymbol1 = sm.findClosestSymbolKindByPosition("file1", [SymbolKind.Class], Position.create(14, 5));
      deepEqual(alsoWithinSymbol1, symbol1);

      const tooHighPosition = sm.findClosestSymbolKindByPosition("file1", [SymbolKind.Class], Position.create(15, 0));
      deepEqual(tooHighPosition, undefined);
    });
  });

  describe("...", () => {
    const startLine1 = 1;
    const endLine1 = 2;
    const startCharacter = 10;
    const endCharacter = 10;

    const startLine2 = 4;
    const endLine2 = 5;

    beforeEach(() => {
      sm = new TadsSymbolManager();
      let range1 = Range.create(startLine1, startCharacter, endLine1, endCharacter);
      let c1Range = Range.create(startLine1 + 1, startCharacter, startLine1 + 1, endCharacter);

      let range2 = Range.create(startLine2, startCharacter, endLine2, endCharacter);
      let c2Range = Range.create(startLine2 + 1, startCharacter, startLine2 + 1, endCharacter);
      sm.symbols.set("file1", [
        DocumentSymbol.create("1", ".", SymbolKind.Class, range1, range1, [
          DocumentSymbol.create("node1_1", ".", SymbolKind.Method, c1Range, c1Range),
        ]),
        DocumentSymbol.create("2", ".", SymbolKind.Class, range2, range2, [
          DocumentSymbol.create("node2_1", ".", SymbolKind.Property, c2Range, c2Range),
        ]),
      ]);
    });

    it("It translates the symbols (line- not characterwise) below the cursor line by an offset of 3", () => {
      // Arrange
      const currentCursorLine = 1;
      const lineOffset = 3;

      // Act
      sm.offsetSymbols("file1", currentCursorLine, lineOffset);

      // Assert
      {
        // Check 1st symbol
        const symbol1 = sm.findSymbol("1");
        let r = symbol1.symbol!.range;
        equal(r.start.line, startLine1 + lineOffset, "The start line wasn't translated by 3 lines");
        equal(r.end.line, endLine1 + lineOffset, "The end line wasn't translated by 3 lines");

        equal(r.start.character, startCharacter, "The start character has changed");
        equal(r.end.character, endCharacter, "The end character has changed");

        const childNode1 = symbol1.symbol!.children![0];
        r = childNode1.range;

        // The childNode has an offset of 1 from the its parent.
        // It is only present on the same row (startLine1)

        equal(r.start.line, startLine1 + 1 + lineOffset, "The start line wasn't translated by 3 lines");
        equal(r.end.line, startLine1 + 1 + lineOffset, "The end line wasn't translated by 3 lines");
        equal(r.start.character, startCharacter, "The start character has changed");
        equal(r.end.character, endCharacter, "The end character has changed");
      }

      {
        // Check 2nd symbol
        const symbol2 = sm.findSymbol("2");
        let r = symbol2.symbol!.range;
        equal(r.start.line, startLine2 + lineOffset, "The start line wasn't translated by 3 lines");
        equal(r.start.character, startCharacter, "The start character has changed");
        equal(r.end.line, endLine2 + lineOffset, "The end line wasn't translated by 3 lines");
        equal(r.end.character, endCharacter, "The end character has changed");

        const childNode2 = symbol2.symbol!.children![0];
        r = childNode2.range;

        // The childNode has an offset of 1 from the its parent.
        // It is only present on the same row (startLine2)
        equal(r.start.line, startLine2 + 1 + lineOffset, "The start line wasn't translated by 3 lines");
        equal(r.end.line, startLine2 + 1 + lineOffset, "The end line wasn't translated by 3 lines");
        equal(r.start.character, startCharacter, "The start character has changed");
        equal(r.end.character, endCharacter, "The end character has changed");
      }
    });
  });
});
