import assert = require('assert');
import { getWordAtPosition } from '../../src/modules/text-utils';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Position } from 'vscode-languageserver';
import { expect }  from 'chai';


function fakeDocument(content:string) {
	return TextDocument.create('uri','tads3',1, content);
}

describe('Server tests', () => {

	it('returns the word intersecting the index', ()=> {
		const doc = fakeDocument('needle in haystack');
		expect(getWordAtPosition(doc, Position.create(0, 0))).to.be('needle');
		
	});
});