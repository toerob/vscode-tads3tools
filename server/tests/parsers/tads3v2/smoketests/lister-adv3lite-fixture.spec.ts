/**
 * Tests using the preprocessed adv3lite lister.t fixture.
 *
 * lister.t is the adv3lite lister.t library file run through the TADS3
 * preprocessor, so it contains only real post-preprocessor syntax — no
 * macros. It exercises a `for`-in loop whose binding does not come first
 * in the init list: `for(local i = 1, local item in lst;; ++i)`.
 */
import { describe, it } from "@jest/globals";
import { assertParsesFile } from "../parseHelper";

describe("lister-adv3lite.t fixture — whole-file parse", () => {
  it("parses the entire preprocessed adv3lite lister.t with zero syntax errors", () => {
    assertParsesFile("tests/fixtures/lister-adv3lite.t");
  });
});
