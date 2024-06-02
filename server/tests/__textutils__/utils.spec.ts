/* eslint-disable @typescript-eslint/no-var-requires */
import { TextDocument } from "vscode-languageserver-textdocument";
import {
  extractCurrentLineFromDocument,
  filterForStandardLibraryFiles,
  isRangeWithin,
} from "../../src/modules/utils";
import { Range } from "vscode-languageserver";
import * as assert from 'assert';


describe("filterForStandardLibraryFiles", () => {
  describe("filterForStandardLibraryFiles", () => {
    it("filters out adv3, adv3Lite and include paths from a collection of paths", () => {
      const libraries = [
        "not/this/path",
        "/anywhere/tads.h",
        "/anywhere/tads3/lib/_main.t",
        "not/this/path/either",
        "/anywhere/adv3.h",
        "/anywhere/advlite.h",
        "/not/this/path/either",
        "/elsewhere/but/still/not/this/one",
      ];

      const expected = [
        "/anywhere/tads.h",
        "/anywhere/tads3/lib/_main.t",
        "/anywhere/adv3.h",
        "/anywhere/advlite.h",
      ];

      assert.deepEqual(filterForStandardLibraryFiles(libraries), expected);
    });
  });

  describe("extractCurrentLineFromDocument", () => {
    it("extracts and trims the row on the line number of the position regardless the character position", () => {
      const row1 = "    content On Row1() ";
      const row2 = " content On Row2()    ";
      const row3 = " content On Row3()    ";
      const row4 = "    content On Row4() ";
      const row5 = "   content On Row5()      ";

      const content = ["", row1, row2, row3, row4, row5].join("\n");
      const doc = TextDocument.create("", "", 0, content);

      assert.equal(extractCurrentLineFromDocument(1, doc), row1.trim());
      assert.equal(extractCurrentLineFromDocument(2, doc), row2.trim());
      assert.equal(extractCurrentLineFromDocument(3, doc), row3.trim());
      assert.equal(extractCurrentLineFromDocument(4, doc), row4.trim());
      assert.equal(extractCurrentLineFromDocument(5, doc), row5.trim());
    });
  });

  describe("isRangeWithin", () => {
    it("boundary checks", () => {
      const range5_0_8_0 = Range.create(5, 0, 8, 0);
      const range0_0_20_0 = Range.create(0, 0, 20, 0);
      const range_1_0_20_10 = Range.create(1, 0, 20, 10);
      const range_0_0_0_0 = Range.create(0, 0, 0, 0);
      const range_1_0_1_0 = Range.create(1, 0, 1, 0);
      const range_1_4_20_0 = Range.create(1,4,20,0);

      assert.equal(isRangeWithin(range_0_0_0_0, range_0_0_0_0), true);
      assert.equal(isRangeWithin(range_0_0_0_0, range_1_0_1_0), false);
      assert.equal(isRangeWithin(range5_0_8_0, range0_0_20_0), true);
      assert.equal(isRangeWithin(range0_0_20_0, range5_0_8_0), false);
      assert.equal(isRangeWithin(range0_0_20_0, range_1_0_20_10), false);
      assert.equal(isRangeWithin(range_1_0_20_10, range0_0_20_0), false);
      assert.equal(isRangeWithin(range_1_4_20_0, range0_0_20_0), true);
    });
  });
});
