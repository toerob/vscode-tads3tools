import { TextDocument, Position } from 'vscode-languageserver-textdocument';

const tokenizeRegExp = /[a-zA-Z0-9_]+/g;

/**
 * 
 * @param currentDocument 
 * @param position 
 * @returns 
 */
export function getWordAtPosition(currentDocument: TextDocument|any, position: Position) {
	const text = currentDocument.getText();
	const textRows = text.split(/\r?\n/);
	if(position.line>textRows.length) {
		return undefined;
	}
	const tokenizedText = tokenizeWithIndex(textRows[position.line]);

	let candidate = undefined; 

	// Find the first index that is less or equal to the indexed asked for;
	// that means it is a candidate for the word at the current position 
	for(const pos of tokenizedText.keys()) {
		if(pos <= position.character) {
			// Check to see if we are within the word's length, 
			// since we don't want to match delimiters
			const wordLengthWithOffset = tokenizedText.get(pos).length-1 + pos;
			if(position.character <= wordLengthWithOffset) {
				// Keep replacing the largest possible candidate index until the words runs out.
				candidate = pos;
			} 
		}
	}
	return (candidate !== undefined)? tokenizedText.get(candidate) : undefined;
}

export function tokenizeWithIndex(text: string) {
	const indexToken = new Map();
	let word;
	while((word = tokenizeRegExp.exec(text))) {
		indexToken.set(word.index, word[0]);
	}
	return indexToken;
}










// Graveyard: 
// const wordRegExp = new RegExp(/([a-zA-Z0-9-]+)/);


// TODO: missbehaves slightly when it comes to ".," etc...
/**
 * 
 * @param currentDocument 
 * @param position 5
 * @returns 
 */
/*

export function getWordAtPosition_old(currentDocument: TextDocument|any, position: Position) {

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
		//connection.console.log(resultingWord[0]);
		return resultingWord[0];
	}
	return undefined;
}
*/
