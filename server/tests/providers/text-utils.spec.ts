/* eslint-disable @typescript-eslint/no-var-requires */
import { expect, describe, jest } from "@jest/globals";
import {
	offsetAt,
  strOffsetAt,
  stripComments,
  compareStringReverse,
  withinQuote,
  tokenizeQuotesWithIndex,
  getWordAtPosition,
  tokenizeWithIndex,
} from "../../src/modules/text-utils";

describe("text-utils test suite", () => {
  describe("strOffsetAt calculates the index from the line and character positions", () => {
    //                                        0x2
    test("{0,2}", () => expect(strOffsetAt(`row 1\nrow 2\nrow 3`, { line: 0, character: 2 })).toBe(2));
    //                                      0x2xxxxxx8
    test("{1,2}", () => expect(strOffsetAt(`row 1\nrow 2\nrow 3`, { line: 1, character: 2 })).toBe(8));
    //                                      0x2xxxxxx8xxxxxx14
    test("{2,2}", () => expect(strOffsetAt(`row 1\nrow 2\nrow 3`, { line: 2, character: 2 })).toBe(14));
  });

  describe("strOffsetAt throws exceptions", () => {
    test("unreasonable row number", () =>
      expect(() => strOffsetAt(`row 1\nrow 2\nrow 3`, { line: 4, character: 2 })).toThrow());
    test("unreasonable line+row", () =>
      expect(() => strOffsetAt(`row 1\nrow 2\nrow 3`, { line: 3, character: 10 })).toThrow());

    // TODO: maybe add minus guards
    // test("minus positions", () => expect(strOffsetAt(`row 1\nrow 2\nrow 3`, { line: -1, character: -1 })).toThrow());
  });

	
	describe("offsetAt", () => {
		const textDocumentMock: any = {
			getText() {
				return `row 1\nrow 2\nrow 3`;
			}
		}
    //                                        0x2
    test("{0,2}", () => expect(offsetAt(textDocumentMock, { line: 0, character: 2 })).toBe(2));
    //                                      0x2xxxxxx8
    test("{1,2}", () => expect(offsetAt(textDocumentMock, { line: 1, character: 2 })).toBe(8));
    //                                      0x2xxxxxx8xxxxxx14
    test("{2,2}", () => expect(offsetAt(textDocumentMock, { line: 2, character: 2 })).toBe(14));
  });

	

  describe("stripComments", () => {
    test("uncomment and joins row separated text", () => expect(stripComments(`/*dsf\nsdf*/`)).toBe("dsfsdf"));
  });

  describe("compareStringReverse", () => {
    test("Compare ==", () => expect(compareStringReverse("abc", "abc")).toBeTruthy());
    test("Compare !=", () => expect(compareStringReverse("abc", "cba ")).toBeFalsy());
  });

  describe("withinQuote", () => {
    const textDocumentMock: any = {
      getText() {
        return `this row contains a quote "right here"...`;
      },
    };

    test("within quote far left", () => {
      expect(withinQuote(textDocumentMock, { line: 0, character: 26 })).toStrictEqual({
        characterPosition: 26,
        endOfQuotePosition: 38,
        quotePosition: 26,
        quoteString: '"right here"',
      });
    });
    test("within quote far right", () => {
      expect(withinQuote(textDocumentMock, { line: 0, character: 38 })).toStrictEqual({
        characterPosition: 38,
        endOfQuotePosition: 38,
        quotePosition: 26,
        quoteString: '"right here"',
      });
    });
    test("not within quote far left", () => {
      expect(withinQuote(textDocumentMock, { line: 0, character: 25 })).toBeUndefined();
    });
    test("not within quote far right", () => {
      expect(withinQuote(textDocumentMock, { line: 0, character: 39 })).toBeUndefined();
    });
  });
  describe("tokenizeQuotesWithIndex", () => {
    test("tokenizeQuotesWithIndex extracts quotes from text", () => {
      expect(
        tokenizeQuotesWithIndex(
          `"quote 1" text in\nbetween "quote 2" and here as well\n"quote 3" to make\ntest "quote 4" case work\n`,
        ),
      ).toStrictEqual(
        new Map([
          [0, '"quote 1"'],
          [26, '"quote 2"'],
          [53, '"quote 3"'],
          [76, '"quote 4"'],
        ]),
      );
    });
  });

  describe("getWordAtPosition", () => {
    const textDocumentMock: any = {
      getText() {
        return `The word at position 16 is 'position' and nothing else`;
      },
    };
    test("word found at position ", () =>
      expect(getWordAtPosition(textDocumentMock, { line: 0, character: 16 })).toBe("position"));

    test("word not found at position is undefined", () =>
      expect(getWordAtPosition(textDocumentMock, { line: 1, character: 16 })).toBeUndefined());
  });
  describe("tokenizeWithIndex", () => {
    test("tokenizes words along with their indexes in string", () => {
      expect(tokenizeWithIndex(`The quick brown fox jumps over the lazy dog`)).toStrictEqual(
        new Map([
          [0, "The"],
          [4, "quick"],
          [10, "brown"],
          [16, "fox"],
          [20, "jumps"],
          [26, "over"],
          [31, "the"],
          [35, "lazy"],
          [40, "dog"],
        ]),
      );
    });
  });
});
