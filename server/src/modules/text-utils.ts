import { TextDocument, Position } from "vscode-languageserver-textdocument";

const tokenizeRegExp = /[a-zA-Z0-9_]+/g;

const quoteMatchRegExp = /([']{3}(.*)[']{3}|["]{3}(.*)["]{3}|['](.*)[']|["](.*)["])/g;

/**
 * Converts a Position to Character offset.
 * @param document - document that is used
 * @param position - The position to convert
 * @returns a number of the converted position
 */
export function offsetAt(document: TextDocument | undefined, position: Position) {
  const rows = document?.getText().split(/\n/);
  let offset = 0;
  if (rows && position.line < rows.length) {
    for (let rowIndex = 0; rowIndex <= position.line; rowIndex++) {
      if (rowIndex === position.line) {
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
  if (rows && position.line < rows.length) {
    for (let rowIndex = 0; rowIndex <= position.line; rowIndex++) {
      if (rowIndex === position.line) {
        offset += position.character;
        break;
      } else {
        offset += rows[rowIndex].length + 1; // One extra for the carriage return
      }
    }
  } else {
    throw new Error(
      `Can not calculate offset. the line position ${position.line} is greater than the rows in the text`,
    );
  }
  return offset;
}

/**
 * Strips away comment tokens from class documentation
 * @param commentedText - the text to strip from comments
 * @returns a string
 */
export function stripComments(commentedText: string): string {
  return commentedText
    .split(/\n/)
    .map((x) => x.replace(/^\s+[*]\s+/g, " "))
    .join("")
    .replace("  ", " ")
    .replace("/*", "")
    .replace("*/", "");
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
export function withinQuote(document: TextDocument | any, position: Position) {
  const text = document.getText();
  const characterPosition = offsetAt(document, position);
  const tokenizedQuotes = tokenizeQuotesWithIndex(text);
  for (const quotePosition of tokenizedQuotes.keys()) {
    const quoteString = tokenizedQuotes.get(quotePosition);
    const endOfQuotePosition = quotePosition + quoteString.length;
    if (quotePosition <= characterPosition && characterPosition <= endOfQuotePosition) {
      //connection.console.debug(`Position found within quote ${quoteString}`);
      return {
        characterPosition,
        quotePosition,
        endOfQuotePosition,
        quoteString,
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
  while ((word = quoteMatchRegExp.exec(text))) {
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
export function getWordAtPosition(document: TextDocument | any, position: Position, asPosition = false) {
  const text = document.getText();
  const textRows = text.split(/\r?\n/);
  if (position.line > textRows.length) {
    return undefined;
  }
  const tokenizedText = tokenizeWithIndex(textRows[position.line]);

  let candidate = undefined;

  // Find the first index that is less or equal to the indexed asked for;
  // that means it is a candidate for the word at the current position
  for (const pos of tokenizedText.keys()) {
    if (pos <= position.character) {
      // Check to see if we are within the word's length,
      // since we don't want to match delimiters
      const wordLengthWithOffset = tokenizedText.get(pos).length - 1 + pos;
      if (position.character <= wordLengthWithOffset) {
        // Keep replacing the largest possible candidate index until the words runs out.
        candidate = pos;
      }
    }
  }
  if (asPosition) {
    return candidate !== undefined ? candidate : undefined;
  }
  return candidate !== undefined ? tokenizedText.get(candidate) : undefined;
}

/**
 * Tokenizes words within a text
 * @param text - the text to tokenize
 * @returns a Map with word indexes as keys, and words as values
 */
export function tokenizeWithIndex(text: string) {
  const indexToken = new Map();
  let word;
  while ((word = tokenizeRegExp.exec(text))) {
    indexToken.set(word.index, word[0]);
  }
  return indexToken;
}

/**
 * Used when string comparison is much faster by checking the characters from the end rather than from the beginning, for instance within file paths, where shared paths are used but the file at the destination folder will differ.
 */
export function compareStringReverse(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = a.length - 1; i >= 0; i--) {
    if (a[i].localeCompare(b[i]) !== 0) {
      return false;
    }
  }
  return true;
}

export function createTemplateSnippetStrings(templateString: string, inheritedTemplates: string[] = []): string[] {
  let sentenceStructures = tokenizeTemplate(templateString, inheritedTemplates);
  const snippetStrings: string[] = expandToSnippet(sentenceStructures).map((x) => x.join(""));
  const distinctSnippetStrings = [...new Set(snippetStrings)];
  return distinctSnippetStrings;
}

function tokenizeTemplate(templateString: string, inheritedTemplates: string[] = []): any[] {
  const templatePart = templateString?.split("template")[1] ?? "";
  if (templatePart === undefined || templatePart == "") {
    return [];
  }
  const parts =
    templatePart
      ?.trim()
      .split(/\s+|;/)
      ?.filter((x) => x !== "") ?? [];

  let words = [];
  let nextIsVariantPart = false; // Keep state if the next part in the template is a variant of a template part

  for (let idx = 0; idx < parts.length; idx++) {
    let p = parts[idx];
    if (p === "") {
      continue;
    }
    let isOptional = p.endsWith("?"); // Find out if optional

    // Almost as an #include, if this inherits superclasse's template, expand them 
    // here and replace the inherited keyword

    if (p.match(/inherited/)) {
      if (inheritedTemplates.length > 0) {
        const expandedInheritance = inheritedTemplates.map((x) => expandToSnippet(tokenizeTemplate(x), true)).join();
        p = expandedInheritance;
        isOptional = true; // inherited works as optional
      } else {
        continue; // If we don't find any inheritance to expand, we just skip past the inherited keyword
      }
    }

    if (isOptional) {
      p = p.slice(0, -1); // Remove the question mark if exists
    }

    let inherited = false;
    let startSignLength = 1;
    let startSign = p[0] ?? "";

    // TODO: More special tokens, better handling needed for all the other token signs of variable lengths
    //
    const startSignIsSpecialToken = !startSign.match(/[A-Za-z]/); // The inverse: It's not alpha, so it's special
    if (startSignIsSpecialToken) {
      if (startSign === "-" && p[1] === ">") {
        startSignLength = 2;
        startSign = "->";
      } else if (startSign === ">" && p[1] === ">") {
        startSignLength = 2;
        startSign = ">>";
      } else if (startSign === "<" && p[1] === "<") {
        startSignLength = 2;
        startSign = "<<";
      }
    } else {
      startSignLength = 0;
      startSign = "";
      inherited = p === "inherited" ? true : false;
    }

    let endSign = p.slice(-1);
    const endSignIsSpecialToken = !endSign.match(/[A-Za-z]/); // The inverse: It's not alpha, so it's special

    let endSignLength = 1;
    if (endSign === "<" && p[p.length - 2] === "<") {
      endSign = "<<";
      endSignLength = 2;
    } else if (endSign === ">" && p[p.length - 2] === ">") {
      endSign = ">>";
      endSignLength = 2;
    }

    // Sometimes the endsign is not a special token, in that case we don't slice away the end token
    if (endSignIsSpecialToken) {
      p = p.slice(startSignLength, -endSignLength); // Remove start sign and end sign, e.g: symmetrical variants such as ' or ". Or start
    } else {
      p = p.slice(startSignLength); // Just remove the non symmetrical start sign, such as @ or + or -
      endSign = "";
    }

    const variant = {
      symbolName: p,
      startSign: startSign,
      endSign: endSign,
      isOptional: isOptional,
      inherited: inherited,
    };

    // Either we increase the variants for the previous word
    if (!nextIsVariantPart) {
      // Add word here except in the case where the token is a single question mark '?'
      // Then the whole group of the previous variants needs to be marked as optionals
      // Change them and don't add anything
      if (parts[idx] === "?") {
        if (words.length - 1 > 0 && words[words.length - 1] !== undefined) {
          words[words.length - 1].variants.forEach((x) => (x.isOptional = true));
        }
      } else {
        words.push({
          variants: [variant],
        });
      }
      // Or we create a new word part here
    } else {
      // If the new part is optional, we add an empty alternative too
      //const variants: [] = isOptional? [variant, variant] ? [variant]
      words[words.length - 1].variants.push(variant);
    }

    const nextToken = parts[idx + 1];
    if (nextToken === undefined) {
      break;
    }
    const nextTokenFirstWord = nextToken[0];
    if (nextTokenFirstWord === "|") {
      nextIsVariantPart = true;
      idx++; // Skip ahead to the next token, since it is a variant token '|'
    } else {
      nextIsVariantPart = false;
    }
  }
  return words;
}

function expandToSnippet(input: any[], skipPlaceHolderIndex = false): string[][] {
  const result: string[][] = [];
  function walk(index: number, current: string[], placeholderIndex = 1) {
    if (index === input.length) {
      result.push([...current]);
      return;
    }

    for (const variant of input[index].variants) {
      // If Optional - walk first without nextPart
      if (variant.isOptional) {
        walk(index + 1, current, placeholderIndex);
      }
      if (!skipPlaceHolderIndex) {
        const empty = variant.symbolName === "" && variant.startSign === "" && variant.endSign === "";
        const nextPart = empty
          ? ""
          : `${variant.startSign}$\{${placeholderIndex}:${variant.symbolName}}${variant.endSign} `;
        current.push(nextPart);
      } else {
        current.push(`${variant.startSign}${variant.symbolName}${variant.endSign} `);
      }
      walk(index + 1, current, placeholderIndex + 1);
      current.pop();
    }
  }

  walk(0, []);
  return result;
}
