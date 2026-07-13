/**
 * Tests using the preprocessed adv3lite swedish.t fixture (Swedish translation
 * module), run through the TADS3 preprocessor — real post-preprocessor syntax
 * only, no macros. It exercises a for-in loop where neither the counter nor
 * the binding uses 'local': `for(i = 1, obj in objList ; ; ++i)`, reusing
 * pre-existing variables instead of declaring fresh ones.
 */
import { describe, it } from "@jest/globals";
import { assertParsesFile } from "../parseHelper";

describe("swedish-adv3lite.t fixture — whole-file parse", () => {
  it("parses the entire preprocessed adv3lite swedish.t with zero syntax errors", () => {
    assertParsesFile("tests/fixtures/swedish-adv3lite.t");
  });
});
