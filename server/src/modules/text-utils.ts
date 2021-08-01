import { TextDocument, Position } from 'vscode-languageserver-textdocument';
import { connection } from '../server';
import { indexOf } from 'underscore';
const wordRegExp = new RegExp(/([a-zA-Z0-9-]+)/);


// TODO: missbehaves slightly when it comes to ., etc... 
/**
 * 
 * @param currentDocument 
 * @param position 
 * @returns 
 */
export function getWordAtPosition(currentDocument: TextDocument, position: Position) {

	//const text = currentDocument.getText();
	//const charNumber = currentDocument.offsetAt(position);
	const line = currentDocument.getText().split(/\n/)[position.line];

	let spaceBefore = line.lastIndexOf(' ', position.character);
	spaceBefore = spaceBefore === -1? 0 : spaceBefore;

	let spaceAfter = line.indexOf(' ', position.character);
	spaceAfter = (spaceAfter === 0 || spaceAfter === -1)? line.length : spaceAfter;

	const wordCandidate = line.substr(spaceBefore, spaceAfter);
	const resultingWord = wordRegExp.exec(wordCandidate);
	if (resultingWord) {
		connection.console.log(resultingWord[0]);
		return resultingWord[0];
	}
	return undefined;
}
