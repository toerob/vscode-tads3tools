/**
 * Tests using the preprocessed adv3lite parser.t fixture.
 *
 * parser.t is the adv3lite parser.t library file run through the TADS3
 * preprocessor, so it contains only real post-preprocessor syntax — no
 * macros. It exercises a trailing comma in a call argument list:
 * `rexMatch(answerPat, str,)`.
 */
import { describe, it } from "@jest/globals";
import { assertParsesFile } from "../parseHelper";

describe("parser-adv3lite.t fixture — whole-file parse", () => {
  it("parses the entire preprocessed adv3lite parser.t with zero syntax errors", () => {
    assertParsesFile("tests/fixtures/parser-adv3lite.t");
  });
});
