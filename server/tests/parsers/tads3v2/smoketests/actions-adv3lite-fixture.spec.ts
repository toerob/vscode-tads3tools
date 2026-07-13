/**
 * Tests using the preprocessed adv3lite actions.t fixture.
 *
 * actions.t is the adv3lite actions.t library file run through the TADS3
 * preprocessor, so it contains only real post-preprocessor syntax — no
 * macros. It exercises the extra-counter-local extension of the for-in
 * loop (`for (local x in list, local i = 1 ; ; ++i)`), which the classic
 * adv3 corpus doesn't cover.
 */
import { describe, it } from "@jest/globals";
import { assertParsesFile } from "../parseHelper";

describe("actions-adv3lite.t fixture — whole-file parse", () => {
  it("parses the entire preprocessed adv3lite actions.t with zero syntax errors", () => {
    assertParsesFile("tests/fixtures/actions-adv3lite.t");
  });
});
