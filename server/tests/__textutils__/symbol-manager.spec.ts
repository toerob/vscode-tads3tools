import { DocumentSymbol, Position, Range, SymbolKind } from 'vscode-languageserver';
import { flattenTreeToArray, symbolManager, TadsSymbolManager } from '../../../server/src/modules/symbol-manager';
import assert = require('assert');

const range = Range.create(10, 2, 14, 5); 
const symbol1 = DocumentSymbol.create('symbol1', 'details here', SymbolKind.Class, range, range, []);

describe('TadsSymbolManager', () => {
	let sm: TadsSymbolManager = symbolManager;

	beforeEach(()=> {
		sm = new TadsSymbolManager();
		sm.symbols.set('file1', [symbol1]);
		sm.symbols.set('file2', [symbol1]);
		sm.inheritanceMap.set('objectWithAncestors', 'SuperType')
		sm.inheritanceMap.set('SuperType', 'GrandSuperType')
		sm.inheritanceMap.set('GrandSuperType', 'GreatGrandSuperType')
		sm.inheritanceMap.set('objectWithOneAncestor', 'AnotherSuperType')
		sm.inheritanceMap.set('Decoration', 'Fixture')
		sm.inheritanceMap.set('Fixture', 'NonPortable')
		sm.inheritanceMap.set('BasicLocation', 'Thing')
	})

	describe('findSymbol', () => {

		it('can find one symbol and which filepath it is located in', () => {
			const { filePath, symbol } = sm.findSymbol('symbol1');
			assert.equal(filePath, 'file1');
			assert.equal(symbol?.name, 'symbol1');
			assert.equal(symbol?.kind, SymbolKind.Class);
			assert.equal(symbol?.range.start.line, 10);
			assert.equal(symbol?.range.start.character, 2);
			assert.equal(symbol?.range.end.line, 14);
			assert.equal(symbol?.range.end.character, 5);
		});

		it('will return an empty object when there is no match', () => {
			const result = sm.findSymbol('symbol0');
			assert.notEqual(result, undefined);

			const { filePath, symbol }  =result;
			assert.equal(filePath, undefined);
			assert.equal(symbol, undefined);
		});
	});

	describe('findSymbols', () => {

		
		it('can find several symbols by names and which filepaths they are located in', () => {
			const result = sm.findSymbols('symbol1');
			assert.equal(result.length, 2);
			{
				let { filePath, symbols } = result[0];
				assert.equal(symbols.length, 1);

				const symbol1 = symbols[0];
				assert.equal(filePath, 'file1');
				assert.equal(symbol1?.name, 'symbol1');
				assert.equal(symbol1?.kind, SymbolKind.Class);
				assert.equal(symbol1?.range.start.line, 10);
				assert.equal(symbol1?.range.start.character, 2);
				assert.equal(symbol1?.range.end.line, 14);
				assert.equal(symbol1?.range.end.character, 5);
			}
			{
				const { filePath, symbols } = result[1];
				assert.equal(symbols.length, 1);

				const symbol1 = symbols[0];	
				assert.equal(filePath, 'file2');
				assert.equal(symbol1?.name, 'symbol1');
				assert.equal(symbol1?.kind, SymbolKind.Class);
				assert.equal(symbol1?.range.start.line, 10);
				assert.equal(symbol1?.range.start.character, 2);
				assert.equal(symbol1?.range.end.line, 14);
				assert.equal(symbol1?.range.end.character, 5);
			}
		});

		it('will return an empty array when there are no matches', () => {
			const result = sm.findSymbols('symbol0');
			assert.equal(result.length, 0);
		});
	});

	describe('mapHeritage', () => {
		it('returns an array containing the single name for a given symbol name when it has no ancestor(s)', () => {
			const result = sm.findHeritage('nonexistent');
			assert.equal(result.length, 1);
			assert.equal(result, 'nonexistent');
		});

		it('returns an array of the symbol and superTyps for a given symbol name with one ancestor', () => {
			const result = sm.findHeritage('objectWithOneAncestor');
			assert.equal(result.length, 2);
			assert.deepEqual(result, ['objectWithOneAncestor', 'AnotherSuperType']);
		});

		it('returns an array of several superTypes for a given symbol name with an ancestor', () => {
			const result = sm.findHeritage('objectWithAncestors');
			assert.equal(result.length, 4);
			assert.deepEqual(result, ['objectWithAncestors', 'SuperType', 'GrandSuperType', 'GreatGrandSuperType']);
		});
	});

	describe('findHeritage', () => {
		it('returns an array containing the single name for a given symbol name when it has no ancestor(s)', () => {
			const result = sm.findHeritage('nonexistent');
			assert.equal(result.length, 1);
			assert.equal(result, 'nonexistent');
		});

		it('returns an array of the symbol and superTyps for a given symbol name with one ancestor', () => {
			const result = sm.findHeritage('objectWithOneAncestor');
			assert.equal(result.length, 2);
			assert.deepEqual(result, ['objectWithOneAncestor', 'AnotherSuperType']);
		});

		it('returns an array of several superTypes for a given symbol name with an ancestor', () => {
			const result = sm.findHeritage('objectWithAncestors');
			assert.equal(result.length, 4);
			assert.deepEqual(result, ['objectWithAncestors', 'SuperType', 'GrandSuperType', 'GreatGrandSuperType']);
		});
	});


	describe('mapHeritage', () => {
		it('takes a DocumentSymbol, extract data from its details, lookup heritages for each detail and add its data to a map of heritage of ancestor(s)', () => {
			const range = Range.create(10, 2, 14, 5); 
			const symbol2 = DocumentSymbol.create('symbol2', 'Decoration,Fixture', SymbolKind.Object, range, range, []);
			const [result1, result2] = [...sm.mapHeritage(symbol2)];
			assert.deepEqual(result1, ['Decoration', ['Decoration', 'Fixture', 'NonPortable']]);
			assert.deepEqual(result2, ['Fixture', ['Fixture', 'NonPortable']]);
		});
	});

	describe('flattenTreeToArray', () => {
		it('flattens an array containing children to a one level DocumentSymbol array', () => {
			const range = Range.create(10, 2, 14, 5); 
			const child = DocumentSymbol.create('child', 'details here', SymbolKind.Class, range, range, []);
			const parent = DocumentSymbol.create('parent', 'Decoration,Fixture', SymbolKind.Object, range, range, [child]);
			const grandparent = DocumentSymbol.create('grandparent', 'Decoration,Fixture', SymbolKind.Object, range, range, [parent]);
			const symbols: DocumentSymbol[] = [grandparent];
			assert.equal(symbols.length, 1);

			const flattenedSymbols = flattenTreeToArray(symbols)
			assert.equal(flattenedSymbols.length, 3);
			assert.equal(flattenedSymbols[0].name, 'grandparent');
			assert.equal(flattenedSymbols[1].name, 'parent');
			assert.equal(flattenedSymbols[2].name, 'child');
		});
	});

	describe('findClosestSymbolKindByPosition', () => {
		it('looks within a file for a symbol type a given position and retrieves a symbol if within its position', () => {

			const tooLowPosition 	= sm.findClosestSymbolKindByPosition('file1', SymbolKind.Class, Position.create(9,0));
			assert.deepEqual(tooLowPosition, undefined);

			const withinSymbol1 	= sm.findClosestSymbolKindByPosition('file1', SymbolKind.Class, Position.create(10,4));
			assert.deepEqual(withinSymbol1, symbol1);

			const alsoWithinSymbol1 = sm.findClosestSymbolKindByPosition('file1', SymbolKind.Class, Position.create(14, 5));
			assert.deepEqual(alsoWithinSymbol1, symbol1);

			const tooHighPosition 	= sm.findClosestSymbolKindByPosition('file1', SymbolKind.Class, Position.create(15,0));
			assert.deepEqual(tooHighPosition, undefined);
		});
	});
	

});

