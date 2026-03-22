/**
 * Tests using the preprocessed en-us.t fixture.
 *
 * en-us.t is the adv3 en-us.t library file run through the TADS3 preprocessor,
 * so it contains only real post-preprocessor syntax — no macros like dobjFor().
 * This makes it an ideal ground-truth corpus for the Tads3v2 grammar.
 */
import { describe, it } from "@jest/globals";
import { assertParses, assertParsesFile } from "../parseHelper";

// ── whole-file smoke test ─────────────────────────────────────────────────────

describe("en-us.t fixture — whole-file parse", () => {
  it("parses the entire preprocessed en-us.t with zero syntax errors", () => {
    assertParsesFile("tests/fixtures/en-us.t");
  });
});
