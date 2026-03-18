import { TextDocument, Position } from "vscode-languageserver-textdocument";
import { TemplateItemNode } from "../parser/ast/nodes";

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

/**
 * Build VSCode snippet strings directly from structured TemplateItemNode data.
 * Replaces the old string-parsing approach — no need to re-parse the detail string.
 *
 * @param items           - The template items for the class being completed.
 * @param inheritedSets   - Resolved TemplateItemNode[] for each `inherited` marker found.
 */
export function createSnippetsFromTemplateItems(
  items: TemplateItemNode[],
  inheritedSets: TemplateItemNode[][] = [],
): string[] {
  const hasInherited = items.some(item => item.tokenKind === 'inherited');

  if (!hasInherited) {
    const words = buildSnippetWords(items, []);
    return [...new Set(expandToSnippet(words).map(parts => parts.join('')))];
  }

  // Option B: two expansions — "no inheritance" and "richest inherited set".
  // The richest set is the one with the most items (deepest in the class hierarchy).
  const richestSet = inheritedSets.reduce<TemplateItemNode[] | null>(
    (best, set) => (best === null || set.length > best.length ? set : best),
    null,
  );

  // Expansion 1: inherited → nothing (skip the keyword)
  const snippets1 = expandToSnippet(buildSnippetWords(items, [])).map(parts => parts.join(''));

  // Expansion 2: inherited → richest set with its original optional flags
  const snippets2 = richestSet && richestSet.length > 0
    ? expandToSnippet(buildSnippetWords(items, [richestSet])).map(parts => parts.join(''))
    : [];

  return [...new Set([...snippets1, ...snippets2])];
}

interface SnippetVariant {
  symbolName: string;
  startSign: string;
  endSign: string;
  isOptional: boolean;
}

function itemToVariant(item: TemplateItemNode): SnippetVariant {
  const isOptional = item.optional;
  const propName   = item.propName ?? '';
  switch (item.tokenKind) {
    case 'sstr': return { symbolName: propName, startSign: "'",         endSign: "'", isOptional };
    case 'dstr': return { symbolName: propName, startSign: '"',         endSign: '"', isOptional };
    case 'list': return { symbolName: propName, startSign: '[',         endSign: ']', isOptional };
    case 'op':   return { symbolName: propName, startSign: item.op ?? '', endSign: '', isOptional };
    default:     return { symbolName: '',        startSign: '',           endSign: '', isOptional: true };
  }
}

function buildSnippetWords(
  items: TemplateItemNode[],
  inheritedSets: TemplateItemNode[][],
): { variants: SnippetVariant[] }[] {
  const words: { variants: SnippetVariant[] }[] = [];
  let i = 0;
  while (i < items.length) {
    const item = items[i];

    if (item.tokenKind === 'inherited') {
      // Expand with the provided inherited set (one set at a time, original optional flags preserved).
      // If no set is provided, the keyword is silently skipped (produces the "no inheritance" form).
      if (inheritedSets.length > 0) {
        words.push(...buildSnippetWords(inheritedSets[0], []));
      }
      i++;
      continue;
    }

    if (item.isAlternative) {
      // Collect all consecutive alternatives into a single word slot: A | B | C → one group
      const variants: SnippetVariant[] = [itemToVariant(item)];
      i++;
      while (i < items.length) {
        variants.push(itemToVariant(items[i]));
        if (!items[i].isAlternative) break; // this item ends the group
        i++;
      }
      // TADS3 semantics: `?` on any variant (typically the last) makes the whole group optional
      if (variants.some(v => v.isOptional)) variants.forEach(v => { v.isOptional = true; });
      words.push({ variants });
      i++;
    } else {
      words.push({ variants: [itemToVariant(item)] });
      i++;
    }
  }
  return words;
}

function expandToSnippet(input: any[], skipPlaceHolderIndex = false): string[][] {
  const result: string[][] = [];

  function makePart(variant: SnippetVariant, placeholderIndex: number): string {
    if (!skipPlaceHolderIndex) {
      const empty = variant.symbolName === "" && variant.startSign === "" && variant.endSign === "";
      return empty ? "" : `${variant.startSign}$\{${placeholderIndex}:${variant.symbolName}}${variant.endSign} `;
    }
    return `${variant.startSign}${variant.symbolName}${variant.endSign} `;
  }

  function walk(index: number, current: string[], placeholderIndex = 1) {
    if (index === input.length) {
      result.push([...current]);
      return;
    }

    const { variants } = input[index];
    const isGroupOptional = variants.some((v: SnippetVariant) => v.isOptional);

    if (variants.length > 1) {
      // Alternative group: emit each variant in order.
      // If the group is optional, inject one "skip" branch after the first variant.
      for (let vi = 0; vi < variants.length; vi++) {
        if (vi === 1 && isGroupOptional) {
          walk(index + 1, current, placeholderIndex); // skip the whole group
        }
        current.push(makePart(variants[vi], placeholderIndex));
        walk(index + 1, current, placeholderIndex + 1);
        current.pop();
      }
    } else {
      // Single item: if optional emit skip first, then the item.
      if (isGroupOptional) {
        walk(index + 1, current, placeholderIndex);
      }
      current.push(makePart(variants[0], placeholderIndex));
      walk(index + 1, current, placeholderIndex + 1);
      current.pop();
    }
  }

  walk(0, []);
  return result;
}
