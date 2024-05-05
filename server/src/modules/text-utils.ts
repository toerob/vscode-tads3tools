import { TextDocument, Position } from 'vscode-languageserver-textdocument';

const tokenizeRegExp = /[a-zA-Z0-9_]+/g;

const quoteMatchRegExp = /(['](.*)[']|[']{3}(.*)[']{3}|["](.*)["]|["]{3}(.*)["]{3})/g;

/**
 * Converts a Position to Character offset.
 * @param document - document that is used
 * @param position - The position to convert
 * @returns a number of the converted position
 */
export function offsetAt(document: TextDocument|undefined, position: Position) {
	const rows = document?.getText().split(/\n/);
	let offset = 0;
	if(rows && position.line < rows.length) {
		for (let rowIndex = 0; rowIndex <= position.line; rowIndex++) {
			if(rowIndex === position.line) {
				offset += position.character;		
				break;
			} else {
				offset += rows[rowIndex].length + 1; // One extra for the carriage return
			}
		}
		
	} else {
		throw new Error(`Can not calculate offset`);
	}
	return offset;
}

/**
 * Converts a Position to Character offset.
 * @param text - string that is used
 * @param position - The position to convert
 * @returns a number of the converted position
 */
 export function strOffsetAt(text: string, position: Position) {
	const rows = text.split(/\n/);
	let offset = 0;
	if(rows && position.line < rows.length) {
		for (let rowIndex = 0; rowIndex <= position.line; rowIndex++) {
			if(rowIndex === position.line) {
				offset += position.character;		
				break;
			} else {
				offset += rows[rowIndex].length + 1; // One extra for the carriage return
			}
		}
		
	} else {
		throw new Error(`Can not calculate offset. the line position ${position.line} is greater than the rows in the text`);
	}
	return offset;
}


/**
 * Strips away comment tokens from class documentation
 * @param commentedText - the text to strip from comments
 * @returns a string
 */
export function stripComments(commentedText:string): string {
	return commentedText.split(/\n/)
	.map(x=>x.replace(/^\s+[*]\s+/g, ' '))
	.join('')
	.replace('  ', ' ')
	.replace('/*', '')
	.replace('*/', '');
}


/**
 * Determines if a position is within a quote or not
 * @param document - document to be examined for quotes
 * @param position - The position at which a quote is to be examined for
 * @returns undefined if position is not within any quote, otherwise a structure of:
 * 	 characterposition: the character offset of the position
 *   quoteposition: The quote start character offset
 *   endOfQuotePosition: the quote start character offset
 *   quoteString: the quote string itself
 */
export function withinQuote(document: TextDocument|any, position: Position) {
	const text = document.getText();
	const characterPosition = offsetAt(document, position);
	const tokenizedQuotes = tokenizeQuotesWithIndex(text);
	for(const quotePosition of tokenizedQuotes.keys()) {
		const quoteString = tokenizedQuotes.get(quotePosition);
		const endOfQuotePosition = quotePosition+quoteString.length;
		if(quotePosition <= characterPosition && characterPosition <= endOfQuotePosition) {
			//connection.console.debug(`Position found within quote ${quoteString}`);
			return {
				characterPosition, 
				quotePosition, 
				endOfQuotePosition, 
				quoteString
			};
		}
	}
	return undefined;


}

/**
 * Tokenizes a text and extracts all quotes within it. 
 * Either of following variant will be extracted:
 * 'string' 
 * ''' string ''''
 * "string"
 * """string"""
 * 
 * @param text - the text to find quotes within
 * @returns a Map, with index for each quote set as key, and the quote as value
 */
export function tokenizeQuotesWithIndex(text: string) {
	const quoteToken = new Map();
	let word;
	while((word = quoteMatchRegExp.exec(text))) {
		quoteToken.set(word.index, word[0]);
	}
	return quoteToken;
}


/**
 * Searches for a word at a given position within a TextDocument
 * 
 * @param document - the TextDocument that is to be examined
 * @param position - the Position (line,char) where the word is at
 * @param asPosition - boolean: true/false, affects the return value, default false
 * @returns  if asPosition=true the index where word starts false, otherwise returns the wor
 */
export function getWordAtPosition(document: TextDocument|any, position: Position, asPosition=false) {
	const text = document.getText();
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
	if(asPosition) {
		return (candidate !== undefined)? candidate : undefined;
	}
	return (candidate !== undefined)? tokenizedText.get(candidate) : undefined;
}

/**
 * Tokenizes words within a text
 * @param text - the text to tokenize
 * @returns a Map with word indexes as keys, and words as values
 */
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
		//connection.console.debug(resultingWord[0]);
		return resultingWord[0];
	}
	return undefined;
}
*/
