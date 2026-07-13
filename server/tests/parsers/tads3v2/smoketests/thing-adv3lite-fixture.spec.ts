/**
 * Tests using the preprocessed adv3lite thing.t fixture.
 *
 * thing-adv3lite.t is the adv3lite thing.t library file run through the
 * TADS3 preprocessor, so it contains only real post-preprocessor syntax —
 * no macros. This makes it an ideal ground-truth corpus for the Tads3v2
 * grammar's handling of adv3lite-specific syntax (e.g. `class X: Y ... ;`
 * class declarations), which differs from the adv3 corpus covered by
 * thing-fixture.spec.ts.
 */
import { describe, it } from "@jest/globals";
import { assertParsesFile } from "../parseHelper";

describe("thing-adv3lite.t fixture — whole-file parse", () => {
  it("parses the entire preprocessed adv3lite thing.t with zero syntax errors", () => {
    assertParsesFile("tests/fixtures/thing-adv3lite.t");
  });
});
