import { readFileSync } from 'fs';
import { preprocessTads3Files, wholeLineRegExp } from '../../src/parser/preprocessor';
import assert = require('assert');


// TODO: 
describe('Preprocessing suite Tads3', () => {

	it.skip('unprocessed file and preprocessed file shall have the same number of rows', async () => {
		//const preprocessedFilesCacheMap: Map<string, string> = new Map();
		//const makeFilePath = `/home/reboto/repos/vscode-tads3tools/server/tests/__textutils__/t3testgames/Makefile.t3m`;
		//await preprocessTads3Files(makeFilePath, preprocessedFilesCacheMap);
	});

});
