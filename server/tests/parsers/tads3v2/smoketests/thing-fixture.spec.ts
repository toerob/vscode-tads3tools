/**
 * Tests using the preprocessed thing.t fixture.
 *
 * thing.t is the adv3 thing.t library file run through the TADS3 preprocessor,
 * so it contains only real post-preprocessor syntax — no macros like dobjFor().
 * This makes it an ideal ground-truth corpus for the Tads3v2 grammar.
 */
import { describe, it } from "@jest/globals";
import { assertParses, assertParsesFile } from "../parseHelper";

// ── whole-file smoke test ─────────────────────────────────────────────────────

describe("thing.t fixture — whole-file parse", () => {
  it("parses the entire preprocessed thing.t with zero syntax errors", () => {
    assertParsesFile("tests/fixtures/thing.t");
  });
});
