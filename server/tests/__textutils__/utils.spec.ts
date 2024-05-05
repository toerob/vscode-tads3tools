/* eslint-disable @typescript-eslint/no-var-requires */
import { filterForStandardLibraryFiles } from "../../src/modules/utils";
const assert = require("assert");

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
