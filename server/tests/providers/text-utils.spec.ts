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
import { createTemplateSnippetStrings } from "../../src/modules/template-snippets";
import { createSnippetsFromTemplateItems } from "../../src/modules/text-utils";
import type { TemplateItemNode } from "../../src/parser/ast/nodes";

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
      },
    };
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

  // TODO: complete tests
  describe("createTemplateSnippetStrings", () => {
    test("TopicEntry template 0", () =>
      expect(
        createTemplateSnippetStrings(`TopicEntry template  
          @matchObj | [matchObj]  
          "topicResponse" ;
        `),
      ).toStrictEqual(['@${1:matchObj} "${2:topicResponse}" ', '[${1:matchObj}] "${2:topicResponse}" ']));

    test("TopicEntry template 1", () => {
      const result = createTemplateSnippetStrings(`
            TopicEntry template
              +matchScore?
              @matchObj | [matchObj] | 'matchPattern'
              "topicResponse" | [eventList] ?;

        `);
      expect(result).toStrictEqual([
        // Without optional first part
        '@${1:matchObj} "${2:topicResponse}" ',
        "@${1:matchObj} ",
        "@${1:matchObj} [${2:eventList}] ",
        '[${1:matchObj}] "${2:topicResponse}" ',
        "[${1:matchObj}] ",
        "[${1:matchObj}] [${2:eventList}] ",
        "'${1:matchPattern}' \"${2:topicResponse}\" ",
        "'${1:matchPattern}' ",
        "'${1:matchPattern}' [${2:eventList}] ",
        // With optional first part
        '+${1:matchScore} @${2:matchObj} "${3:topicResponse}" ',
        "+${1:matchScore} @${2:matchObj} ",
        "+${1:matchScore} @${2:matchObj} [${3:eventList}] ",
        '+${1:matchScore} [${2:matchObj}] "${3:topicResponse}" ',
        "+${1:matchScore} [${2:matchObj}] ",
        "+${1:matchScore} [${2:matchObj}] [${3:eventList}] ",
        "+${1:matchScore} '${2:matchPattern}' \"${3:topicResponse}\" ",
        "+${1:matchScore} '${2:matchPattern}' ",
        "+${1:matchScore} '${2:matchPattern}' [${3:eventList}] ",
      ]);
    });

    test("TopicEntry template 2", () =>
      expect(
        createTemplateSnippetStrings(`
            TopicEntry template
              +matchScore?
              @matchObj | [matchObj] | 'matchPattern'
              [firstEvents] [eventList];
        `),
      ).toStrictEqual([
        // Without optional first part
        "@${1:matchObj} [${2:firstEvents}] [${3:eventList}] ",
        "[${1:matchObj}] [${2:firstEvents}] [${3:eventList}] ",
        "'${1:matchPattern}' [${2:firstEvents}] [${3:eventList}] ",
        // With optional first part
        "+${1:matchScore} @${2:matchObj} [${3:firstEvents}] [${4:eventList}] ",
        "+${1:matchScore} [${2:matchObj}] [${3:firstEvents}] [${4:eventList}] ",
        "+${1:matchScore} '${2:matchPattern}' [${3:firstEvents}] [${4:eventList}] ",
      ]));

    test("TopicEntry template 3", () =>
      expect(
        createTemplateSnippetStrings(`
            TopicEntry template
              +matchScore?
              @matchObj | [matchObj]
              'matchPattern'
              "topicResponse" | [eventList] ?;
        `),
      ).toStrictEqual([
        "@${1:matchObj} '${2:matchPattern}' \"${3:topicResponse}\" ",
        "@${1:matchObj} '${2:matchPattern}' ",
        "@${1:matchObj} '${2:matchPattern}' [${3:eventList}] ",
        "[${1:matchObj}] '${2:matchPattern}' \"${3:topicResponse}\" ",
        "[${1:matchObj}] '${2:matchPattern}' ",
        "[${1:matchObj}] '${2:matchPattern}' [${3:eventList}] ",

        "+${1:matchScore} @${2:matchObj} '${3:matchPattern}' \"${4:topicResponse}\" ",
        "+${1:matchScore} @${2:matchObj} '${3:matchPattern}' ",
        "+${1:matchScore} @${2:matchObj} '${3:matchPattern}' [${4:eventList}] ",
        "+${1:matchScore} [${2:matchObj}] '${3:matchPattern}' \"${4:topicResponse}\" ",
        "+${1:matchScore} [${2:matchObj}] '${3:matchPattern}' ",
        "+${1:matchScore} [${2:matchObj}] '${3:matchPattern}' [${4:eventList}] ",
      ]));

    test("TopicEntry template 4", () =>
      expect(
        createTemplateSnippetStrings(`

          TopicEntry template
            +matchScore?
            @matchObj | [matchObj]
            'matchPattern'
            [firstEvents] [eventList];
        `),
      ).toStrictEqual([
        "@${1:matchObj} '${2:matchPattern}' [${3:firstEvents}] [${4:eventList}] ",
        "[${1:matchObj}] '${2:matchPattern}' [${3:firstEvents}] [${4:eventList}] ",
        "+${1:matchScore} @${2:matchObj} '${3:matchPattern}' [${4:firstEvents}] [${5:eventList}] ",
        "+${1:matchScore} [${2:matchObj}] '${3:matchPattern}' [${4:firstEvents}] [${5:eventList}] ",
      ]));

    test("TopicEntry template 5", () =>
      expect(
        createTemplateSnippetStrings(
          `MiscTopic template "topicResponse" | [eventList];
        `,
        ),
      ).toStrictEqual(['"${1:topicResponse}" ', "[${1:eventList}] "]));

    test("TopicEntry template 6", () =>
      expect(
        createTemplateSnippetStrings(
          `MiscTopic template [firstEvents] [eventList];
          `,
        ),
      ).toStrictEqual(["[${1:firstEvents}] [${2:eventList}] "]));

    // Added tests for templates listed under TODO
    test("Achievement template", () =>
      expect(createTemplateSnippetStrings(`Achievement template +points? "desc";`)).toStrictEqual([
        '"${1:desc}" ',
        '+${1:points} "${2:desc}" ',
      ]));

    test("StyleTag template", () =>
      expect(createTemplateSnippetStrings(`StyleTag template 'tagName' 'openText'? 'closeText'?;`)).toStrictEqual([
        "'${1:tagName}' ",
        "'${1:tagName}' '${2:closeText}' ",
        "'${1:tagName}' '${2:openText}' ",
        "'${1:tagName}' '${2:openText}' '${3:closeText}' ",
      ]));

    test("Thing adv3Lite template", () =>
      expect(createTemplateSnippetStrings(`Thing template 'vocab' @location? "desc"?;`)).toStrictEqual([
        "'${1:vocab}' ",
        "'${1:vocab}' \"${2:desc}\" ",
        "'${1:vocab}' @${2:location} ",
        "'${1:vocab}' @${2:location} \"${3:desc}\" ",
      ]));

    test("Topic template", () =>
      expect(createTemplateSnippetStrings(`Topic template 'vocab' @familiar?;`)).toStrictEqual([
        "'${1:vocab}' ",
        "'${1:vocab}' @${2:familiar} ",
      ]));

    test("Room templates", () => {
      expect(createTemplateSnippetStrings(`Room template 'roomTitle' 'vocab' "desc"?;`)).toStrictEqual([
        "'${1:roomTitle}' '${2:vocab}' ",
        "'${1:roomTitle}' '${2:vocab}' \"${3:desc}\" ",
      ]);

      expect(createTemplateSnippetStrings(`Room template 'roomTitle' "desc"?;`)).toStrictEqual([
        "'${1:roomTitle}' ",
        "'${1:roomTitle}' \"${2:desc}\" ",
      ]);
    });

    test("Region template", () =>
      expect(createTemplateSnippetStrings(`Region template [rooms];`)).toStrictEqual(["[${1:rooms}] "]));

    test("Door templates include arrow and vocab", () => {
      const a = createTemplateSnippetStrings(`Door template 'vocab' @location? "desc"? ->otherSide;`);
      expect(a).toStrictEqual([
        "'${1:vocab}' ->${2:otherSide} ",
        "'${1:vocab}' \"${2:desc}\" ->${3:otherSide} ",

        "'${1:vocab}' @${2:location} ->${3:otherSide} ",
        "'${1:vocab}' @${2:location} \"${3:desc}\" ->${4:otherSide} ",
      ]);
      const b = createTemplateSnippetStrings(`Door template ->otherSide 'vocab' @location? "desc"?;`);
      expect(b).toStrictEqual([
        "->${1:otherSide} '${2:vocab}' ",
        "->${1:otherSide} '${2:vocab}' \"${3:desc}\" ",
        "->${1:otherSide} '${2:vocab}' @${3:location} ",
        "->${1:otherSide} '${2:vocab}' @${3:location} \"${4:desc}\" ",
      ]);
    });

    test("Door variants with arrow position", () => {
      const a = createTemplateSnippetStrings(`Door template 'vocab' @location? ->otherSide "desc"?;`);
      expect(a).toStrictEqual([
        "'${1:vocab}' ->${2:otherSide} ",
        "'${1:vocab}' ->${2:otherSide} \"${3:desc}\" ",
        "'${1:vocab}' @${2:location} ->${3:otherSide} ",
        "'${1:vocab}' @${2:location} ->${3:otherSide} \"${4:desc}\" ",
      ]);
      const b = createTemplateSnippetStrings(`Door template 'vocab' ->otherSide @location? "desc"?;`);
      expect(b).toStrictEqual([
        "'${1:vocab}' ->${2:otherSide} ",
        "'${1:vocab}' ->${2:otherSide} \"${3:desc}\" ",
        "'${1:vocab}' ->${2:otherSide} @${3:location} ",
        "'${1:vocab}' ->${2:otherSide} @${3:location} \"${4:desc}\" ",
      ]);
    });

    test("TravelConnector templates", () => {
      const a = createTemplateSnippetStrings(`TravelConnector template 'vocab'? @location? "desc"? ->destination;`);
      expect(a).toStrictEqual([
        "->${1:destination} ",
        '"${1:desc}" ->${2:destination} ',
        "@${1:location} ->${2:destination} ",
        '@${1:location} "${2:desc}" ->${3:destination} ',

        "'${1:vocab}' ->${2:destination} ",
        "'${1:vocab}' \"${2:desc}\" ->${3:destination} ",
        "'${1:vocab}' @${2:location} ->${3:destination} ",
        "'${1:vocab}' @${2:location} \"${3:desc}\" ->${4:destination} ",
      ]);
      const b = createTemplateSnippetStrings(`TravelConnector template ->destination "travelDesc";`);
      expect(b).toStrictEqual(['->${1:destination} "${2:travelDesc}" ']);
    });

    // TODO: for now, we just skip past the inherited keyword when it's used
    test("Enterable templates with omitted inherited when no superclass is found", () => {
      const a = createTemplateSnippetStrings(`Enterable template inherited ->connector;`);
      expect(a).toStrictEqual(["->${1:connector} "]);

      const b = createTemplateSnippetStrings(`Enterable template ->connector inherited;`);
      expect(b).toStrictEqual([ 
          "->${1:connector} ",
       ]);
    });

    test("Unthing templates", () => {
      const a = createTemplateSnippetStrings(`Unthing template 'vocab' @location? 'notHereMsg'?;`);
      expect(a).toStrictEqual([
        "'${1:vocab}' ",
        "'${1:vocab}' '${2:notHereMsg}' ",
        "'${1:vocab}' @${2:location} ",
        "'${1:vocab}' @${2:location} '${3:notHereMsg}' ",
      ]);

      const b = createTemplateSnippetStrings(`Unthing template @unObject @location? 'notHereMsg'?;`);
      expect(b).toStrictEqual([
        "@${1:unObject} ",
        "@${1:unObject} '${2:notHereMsg}' ",
        "@${1:unObject} @${2:location} ",
        "@${1:unObject} @${2:location} '${3:notHereMsg}' ",
      ]);
    });

    test("SensoryEmanation template", () => {
      const res = createTemplateSnippetStrings(`SensoryEmanation template inherited [eventList]?;`);
      expect(res).toStrictEqual(["", "[${1:eventList}] "]);
    });

    test("inherited keyword expands to: (1) no-inheritance form, (2) richest inherited set", () => {
      // Simulate: Passage template ->masterObject inherited
      // where Thing template is 'vocabWords' 'name' @location? "desc"?
      const passageItems: TemplateItemNode[] = [
        { propName: 'masterObject', tokenKind: 'op', op: '->', optional: false, isAlternative: false },
        { propName: null, tokenKind: 'inherited', optional: false, isAlternative: false },
      ];
      const thingItems: TemplateItemNode[] = [
        { propName: 'vocabWords', tokenKind: 'sstr', optional: false, isAlternative: false },
        { propName: 'name',       tokenKind: 'sstr', optional: false, isAlternative: false },
        { propName: 'location',   tokenKind: 'op',   op: '@', optional: true, isAlternative: false },
        { propName: 'desc',       tokenKind: 'dstr', optional: true, isAlternative: false },
      ];
      // VocabObject template (shorter — should NOT be picked as richest)
      const vocabItems: TemplateItemNode[] = [
        { propName: 'vocabWords', tokenKind: 'sstr', optional: false, isAlternative: false },
      ];

      const res = createSnippetsFromTemplateItems(passageItems, [vocabItems, thingItems]);

      // Form 1: no inheritance — just ->masterObject
      expect(res[0]).toBe('->${1:masterObject} ');

      // Forms 2-5: richest set (Thing) expanded — 'vocabWords' and 'name' are mandatory,
      // @location? and "desc"? are optional → 4 combinations
      expect(res).toStrictEqual([
        '->${1:masterObject} ',
        "->${1:masterObject} '${2:vocabWords}' '${3:name}' ",
        "->${1:masterObject} '${2:vocabWords}' '${3:name}' \"${4:desc}\" ",
        "->${1:masterObject} '${2:vocabWords}' '${3:name}' @${4:location} ",
        "->${1:masterObject} '${2:vocabWords}' '${3:name}' @${4:location} \"${5:desc}\" ",
      ]);
    });

    test("ActorState templates", () => {
      const a = createTemplateSnippetStrings(
        `ActorState template @location? "specialDesc" 'stateDesc' | "stateDesc" ? ;`,
      );
      expect(a).toStrictEqual([
        "\"${1:specialDesc}\" '${2:stateDesc}' ",
        '"${1:specialDesc}" ',
        '"${1:specialDesc}" "${2:stateDesc}" ',
        "@${1:location} \"${2:specialDesc}\" '${3:stateDesc}' ",
        '@${1:location} "${2:specialDesc}" ',
        '@${1:location} "${2:specialDesc}" "${3:stateDesc}" ',
      ]);
      const b = createTemplateSnippetStrings(`ActorState template @location;`);
      expect(b).toStrictEqual(["@${1:location} "]);
    });

    test("TopicGroup template", () => {
      const res = createTemplateSnippetStrings(
        `TopicGroup template @location? +scoreBoost? 'convKeys' | [convKeys] ? ;`,
      );
      expect(res).toStrictEqual([
        "'${1:convKeys}' ",
        "",
        "[${1:convKeys}] ",
        "+${1:scoreBoost} '${2:convKeys}' ",
        "+${1:scoreBoost} ",
        "+${1:scoreBoost} [${2:convKeys}] ",
        "@${1:location} '${2:convKeys}' ",
        "@${1:location} ",
        "@${1:location} [${2:convKeys}] ",
        "@${1:location} +${2:scoreBoost} '${3:convKeys}' ",
        "@${1:location} +${2:scoreBoost} ",
        "@${1:location} +${2:scoreBoost} [${3:convKeys}] ",
      ]);
    });

    test("ActorTopicEntry, QueryTopic and SayTopic samples", () => {
      const a = createTemplateSnippetStrings(
        `ActorTopicEntry template ->location? +matchScore? "topicResponse" | [eventList];`,
      );
      expect(a).toStrictEqual([
        '"${1:topicResponse}" ',
        "[${1:eventList}] ",
        '+${1:matchScore} "${2:topicResponse}" ',
        "+${1:matchScore} [${2:eventList}] ",
        '->${1:location} "${2:topicResponse}" ',
        "->${1:location} [${2:eventList}] ",
        '->${1:location} +${2:matchScore} "${3:topicResponse}" ',
        "->${1:location} +${2:matchScore} [${3:eventList}] ",
      ]);

      const b = createTemplateSnippetStrings(
        `QueryTopic template ->location? +matchScore? 'matchPattern' "topicResponse" | [eventList] ?;`,
      );
      expect(b).toStrictEqual([
        "'${1:matchPattern}' \"${2:topicResponse}\" ",
        "'${1:matchPattern}' ",
        "'${1:matchPattern}' [${2:eventList}] ",
        "+${1:matchScore} '${2:matchPattern}' \"${3:topicResponse}\" ",
        "+${1:matchScore} '${2:matchPattern}' ",
        "+${1:matchScore} '${2:matchPattern}' [${3:eventList}] ",
        "->${1:location} '${2:matchPattern}' \"${3:topicResponse}\" ",
        "->${1:location} '${2:matchPattern}' ",
        "->${1:location} '${2:matchPattern}' [${3:eventList}] ",
        "->${1:location} +${2:matchScore} '${3:matchPattern}' \"${4:topicResponse}\" ",
        "->${1:location} +${2:matchScore} '${3:matchPattern}' ",
        "->${1:location} +${2:matchScore} '${3:matchPattern}' [${4:eventList}] ",
      ]);

      const c = createTemplateSnippetStrings(
        `SayTopic template ->location? +matchScore? 'tTag' 'extraVocab' "topicResponse" | [eventList] ?;`,
      );
      expect(c).toStrictEqual([
        "'${1:tTag}' '${2:extraVocab}' \"${3:topicResponse}\" ",
        "'${1:tTag}' '${2:extraVocab}' ",
        "'${1:tTag}' '${2:extraVocab}' [${3:eventList}] ",
        "+${1:matchScore} '${2:tTag}' '${3:extraVocab}' \"${4:topicResponse}\" ",
        "+${1:matchScore} '${2:tTag}' '${3:extraVocab}' ",
        "+${1:matchScore} '${2:tTag}' '${3:extraVocab}' [${4:eventList}] ",
        "->${1:location} '${2:tTag}' '${3:extraVocab}' \"${4:topicResponse}\" ",
        "->${1:location} '${2:tTag}' '${3:extraVocab}' ",
        "->${1:location} '${2:tTag}' '${3:extraVocab}' [${4:eventList}] ",
        "->${1:location} +${2:matchScore} '${3:tTag}' '${4:extraVocab}' \"${5:topicResponse}\" ",
        "->${1:location} +${2:matchScore} '${3:tTag}' '${4:extraVocab}' ",
        "->${1:location} +${2:matchScore} '${3:tTag}' '${4:extraVocab}' [${5:eventList}] ",
      ]);
    });

    test("CommandTopic and Default topic templates", () => {
      const a = createTemplateSnippetStrings(
        `CommandTopic template ->location? +matchScore? 
          @matchObj | [matchObj] 
          @matchDobj 
          @matchIobj? 
          "topicResponse" | [eventList]? ;`,
      );
      expect(a).toStrictEqual([
        '@${1:matchObj} @${2:matchDobj} "${3:topicResponse}" ',
        "@${1:matchObj} @${2:matchDobj} ",
        "@${1:matchObj} @${2:matchDobj} [${3:eventList}] ",
        '@${1:matchObj} @${2:matchDobj} @${3:matchIobj} "${4:topicResponse}" ',
        "@${1:matchObj} @${2:matchDobj} @${3:matchIobj} ",
        "@${1:matchObj} @${2:matchDobj} @${3:matchIobj} [${4:eventList}] ",

        '[${1:matchObj}] @${2:matchDobj} "${3:topicResponse}" ',
        "[${1:matchObj}] @${2:matchDobj} ",
        "[${1:matchObj}] @${2:matchDobj} [${3:eventList}] ",
        '[${1:matchObj}] @${2:matchDobj} @${3:matchIobj} "${4:topicResponse}" ',
        "[${1:matchObj}] @${2:matchDobj} @${3:matchIobj} ",
        "[${1:matchObj}] @${2:matchDobj} @${3:matchIobj} [${4:eventList}] ",

        '+${1:matchScore} @${2:matchObj} @${3:matchDobj} "${4:topicResponse}" ',
        "+${1:matchScore} @${2:matchObj} @${3:matchDobj} ",
        "+${1:matchScore} @${2:matchObj} @${3:matchDobj} [${4:eventList}] ",
        '+${1:matchScore} @${2:matchObj} @${3:matchDobj} @${4:matchIobj} "${5:topicResponse}" ',
        "+${1:matchScore} @${2:matchObj} @${3:matchDobj} @${4:matchIobj} ",
        "+${1:matchScore} @${2:matchObj} @${3:matchDobj} @${4:matchIobj} [${5:eventList}] ",
        '+${1:matchScore} [${2:matchObj}] @${3:matchDobj} "${4:topicResponse}" ',
        "+${1:matchScore} [${2:matchObj}] @${3:matchDobj} ",
        "+${1:matchScore} [${2:matchObj}] @${3:matchDobj} [${4:eventList}] ",
        '+${1:matchScore} [${2:matchObj}] @${3:matchDobj} @${4:matchIobj} "${5:topicResponse}" ',
        "+${1:matchScore} [${2:matchObj}] @${3:matchDobj} @${4:matchIobj} ",
        "+${1:matchScore} [${2:matchObj}] @${3:matchDobj} @${4:matchIobj} [${5:eventList}] ",

        '->${1:location} @${2:matchObj} @${3:matchDobj} "${4:topicResponse}" ',
        "->${1:location} @${2:matchObj} @${3:matchDobj} ",
        "->${1:location} @${2:matchObj} @${3:matchDobj} [${4:eventList}] ",
        '->${1:location} @${2:matchObj} @${3:matchDobj} @${4:matchIobj} "${5:topicResponse}" ',
        "->${1:location} @${2:matchObj} @${3:matchDobj} @${4:matchIobj} ",
        "->${1:location} @${2:matchObj} @${3:matchDobj} @${4:matchIobj} [${5:eventList}] ",
        '->${1:location} [${2:matchObj}] @${3:matchDobj} "${4:topicResponse}" ',
        "->${1:location} [${2:matchObj}] @${3:matchDobj} ",
        "->${1:location} [${2:matchObj}] @${3:matchDobj} [${4:eventList}] ",
        '->${1:location} [${2:matchObj}] @${3:matchDobj} @${4:matchIobj} "${5:topicResponse}" ',
        "->${1:location} [${2:matchObj}] @${3:matchDobj} @${4:matchIobj} ",
        "->${1:location} [${2:matchObj}] @${3:matchDobj} @${4:matchIobj} [${5:eventList}] ",
        '->${1:location} +${2:matchScore} @${3:matchObj} @${4:matchDobj} "${5:topicResponse}" ',
        "->${1:location} +${2:matchScore} @${3:matchObj} @${4:matchDobj} ",
        "->${1:location} +${2:matchScore} @${3:matchObj} @${4:matchDobj} [${5:eventList}] ",
        '->${1:location} +${2:matchScore} @${3:matchObj} @${4:matchDobj} @${5:matchIobj} "${6:topicResponse}" ',
        "->${1:location} +${2:matchScore} @${3:matchObj} @${4:matchDobj} @${5:matchIobj} ",
        "->${1:location} +${2:matchScore} @${3:matchObj} @${4:matchDobj} @${5:matchIobj} [${6:eventList}] ",
        '->${1:location} +${2:matchScore} [${3:matchObj}] @${4:matchDobj} "${5:topicResponse}" ',
        "->${1:location} +${2:matchScore} [${3:matchObj}] @${4:matchDobj} ",
        "->${1:location} +${2:matchScore} [${3:matchObj}] @${4:matchDobj} [${5:eventList}] ",
        '->${1:location} +${2:matchScore} [${3:matchObj}] @${4:matchDobj} @${5:matchIobj} "${6:topicResponse}" ',
        "->${1:location} +${2:matchScore} [${3:matchObj}] @${4:matchDobj} @${5:matchIobj} ",
        "->${1:location} +${2:matchScore} [${3:matchObj}] @${4:matchDobj} @${5:matchIobj} [${6:eventList}] ",
      ]);

      const b = createTemplateSnippetStrings(`DefaultTopic template ->location? \"topicResponse\" | [eventList];`);
      expect(b).toStrictEqual([
        '"${1:topicResponse}" ',
        "[${1:eventList}] ",
        '->${1:location} "${2:topicResponse}" ',
        "->${1:location} [${2:eventList}] ",
      ]);
    });

    test("Misc, NodeContinuation, AltTopic and AgendaItem/ProxyActor", () => {
      expect(
        createTemplateSnippetStrings(`MiscTopic template ->location? \"topicResponse\" | [eventList];`),
      ).toStrictEqual([
        '"${1:topicResponse}" ',
        "[${1:eventList}] ",
        '->${1:location} "${2:topicResponse}" ',
        "->${1:location} [${2:eventList}] ",
      ]);

      expect(
        createTemplateSnippetStrings(`NodeContinuationTopic template ->location? [firstEvents] [eventList];`),
      ).toStrictEqual(["[${1:firstEvents}] [${2:eventList}] ", "->${1:location} [${2:firstEvents}] [${3:eventList}] "]);

      expect(
        createTemplateSnippetStrings(`AltTopic template ->location? \"topicResponse\" | [eventList];`),
      ).toStrictEqual([
        '"${1:topicResponse}" ',
        "[${1:eventList}] ",
        '->${1:location} "${2:topicResponse}" ',
        "->${1:location} [${2:eventList}] ",
      ]);
      expect(createTemplateSnippetStrings(`AgendaItem template @location;`)).toStrictEqual(["@${1:location} "]);
      expect(createTemplateSnippetStrings(`ProxyActor template @location;`)).toStrictEqual(["@${1:location} "]);
    });
  });
});
