/**
 * Tests using the preprocessed adv3lite messages.t fixture.
 *
 * messages.t is the adv3lite messages.t library file run through the TADS3
 * preprocessor, so it contains only real post-preprocessor syntax — no
 * macros. It exercises `foreach (local x in list)`, where the loop variable
 * is declared inline rather than referencing a pre-existing one.
 */
import { describe, it } from "@jest/globals";
import { assertParsesFile } from "../parseHelper";

describe("messages.t fixture — whole-file parse", () => {
  it("parses the entire preprocessed adv3lite messages.t with zero syntax errors", () => {
    assertParsesFile("tests/fixtures/messages.t");
  });
});
