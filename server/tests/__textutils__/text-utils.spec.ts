import * as assert from 'assert';

import { getWordAtPosition, tokenizeWithIndex } from '../../src/modules/text-utils';
import { Position } from 'vscode-languageserver';

function mocument(content:string) {
	return {
		getText: () => content
	};
}

describe('Server tests', () => {
	it('returns the word intersecting the index', ()=> {
		assert.equal(getWordAtPosition(mocument('needle in haystack'), Position.create(0, 0)), 'needle');
		assert.equal(getWordAtPosition(mocument('needle in haystack'), Position.create(0, 6)), undefined);
		assert.equal(getWordAtPosition(mocument('needle in haystack'), Position.create(0, 7)), 'in');
		assert.equal(getWordAtPosition(mocument('needle in haystack'), Position.create(0, 8)), 'in');
		assert.equal(getWordAtPosition(mocument('needle in haystack'), Position.create(0, 9)), undefined);
		assert.equal(getWordAtPosition(mocument('needle in haystack'), Position.create(0, 10)), 'haystack');
		assert.equal(getWordAtPosition(mocument('needle in haystack'), Position.create(0, 15)), 'haystack');
		assert.equal(getWordAtPosition(mocument('needle in haystack'), Position.create(10, 100)), undefined);
	});


	it('tokenizes the words and returns an map with the index of each found word', ()=> {
		// Index pos: 012345678901234567890123456789012345678901234567890123
		// Index pos: 0      |  1         2    |    3  |      4         5    
		const text = 'needle in haystack. Call.me() in.the__Morn_ing23()(); ';
		const result: Map<number,string> = tokenizeWithIndex(text);
		assert.equal(result.size, 7);

		assert.equal(result.get(0), 'needle'); 
		assert.equal(result.get(7), 'in'); 
		assert.equal(result.get(10), 'haystack'); 
		
		assert.equal(result.get(20), 'Call'); 
		assert.equal(result.get(25), 'me'); 
		assert.equal(result.get(30), 'in'); 
		assert.equal(result.get(33), 'the__Morn_ing23'); 

		// Expect no more and no less than this:
		assert.equal(`0,needle,7,in,10,haystack,20,Call,25,me,30,in,33,the__Morn_ing23`, [...result].toString() );
	});

	it('gets the closest found word from the index and returns it', ()=> {
		// Index pos: 012345678901234567890123456789012345678901234567890123
		// Index pos: 0     |   1  |     |2     |   3         4         5    
		const text = 'first second third fourth fifth...';

		assert.equal(getWordAtPosition(mocument(text), Position.create(0,0)), 'first');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,1)), 'first');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,2)), 'first');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,3)), 'first');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,4)), 'first');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,5)), undefined);

		assert.equal(getWordAtPosition(mocument(text), Position.create(0,6)), 'second');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,7)), 'second');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,8)), 'second');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,9)), 'second');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,10)), 'second');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,11)), 'second');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,12)), undefined);

		assert.equal(getWordAtPosition(mocument(text), Position.create(0,13)), 'third');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,14)), 'third');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,15)), 'third');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,16)), 'third');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,17)), 'third');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,18)), undefined);

		assert.equal(getWordAtPosition(mocument(text), Position.create(0,19)), 'fourth');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,20)), 'fourth');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,21)), 'fourth');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,22)), 'fourth');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,23)), 'fourth');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,24)), 'fourth');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,25)), undefined);

		assert.equal(getWordAtPosition(mocument(text), Position.create(0,26)), 'fifth');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,27)), 'fifth');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,28)), 'fifth');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,29)), 'fifth');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,30)), 'fifth');
		assert.equal(getWordAtPosition(mocument(text), Position.create(0,31)), undefined);

	});



});