import { readFileSync } from "fs";
import { preprocessTads2Files, wholeLineRegExp } from "../../src/parser/preprocessor";
import * as assert from "assert";

describe("Preprocessing suite Tads2", () => {
  it("splits only unquoted lines up", () => {
    const array = `"Text here\\n don't\\n split me up!";\nSplit\nMe\nUp!";`.split(wholeLineRegExp);

    assert.equal(array[0], '"Text here\\n don\'t\\n split me up!";');
    assert.equal(array[1], "Split");
    assert.equal(array[2], "Me");
    assert.equal(array[3], 'Up!";');
  });

  it.skip("unprocessed file and preprocessed file shall have the same number of rows", async () => {
    const preprocessedFilesCacheMap: Map<string, string> = new Map();
    const mainFilePath = `tests/__textutils__/t2testgames/hello.t`;
    const libAdvPath = `/usr/local/share/frobtads/tads2/adv.t`;
    const libStdPath = `/usr/local/share/frobtads/tads2/std.t`;
    await preprocessTads2Files(mainFilePath, preprocessedFilesCacheMap);

    assertSameLineCountBetweenOriginalAndPreprocessed(libStdPath, preprocessedFilesCacheMap);
    assertSameLineCountBetweenOriginalAndPreprocessed(libAdvPath, preprocessedFilesCacheMap);
    assertSameLineCountBetweenOriginalAndPreprocessed(mainFilePath, preprocessedFilesCacheMap);
  });
});

function assertSameLineCountBetweenOriginalAndPreprocessed(
  pathToFile: string,
  preprocessedFilesCacheMap: Map<string, string>,
) {
  const fileContentString = readFileSync(pathToFile).toString();
  const fileStrAsArray = fileContentString?.split(wholeLineRegExp) ?? [];
  const preprocessedFileContent = preprocessedFilesCacheMap.get(pathToFile);
  const preprocessedFileStrArray = preprocessedFileContent?.split(wholeLineRegExp) ?? [];
  assert.equal(fileStrAsArray?.length, preprocessedFileStrArray?.length);
}
