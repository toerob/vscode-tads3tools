import { it, expect, jest } from "@jest/globals";
import { readFileSync } from "fs";
import { resolve } from "path";
import { preprocessTads3Files } from "../../src/parser/preprocessor";

describe("Complete Game parsing integration tests", () => {
  it("preprocesses a game file with the expected result", async () => {
    // Arrange
    const expectedPreprocessedResult = readFileSync("tests/t3testgames/game1/main-preprocessed.t").toString();
    const absoluteMakefilePath = resolve("tests/t3testgames/game1/Makefile.t3m");

    const preprocessedFilesCacheMap: Map<string, string> = new Map();
    const consoleMock = { console: { log: jest.fn(), debug: jest.fn() } };

    // Act
    await preprocessTads3Files(absoluteMakefilePath, preprocessedFilesCacheMap, "t3make", consoleMock);

    // Assert
    //expect(preprocessedFilesCacheMap.size >= 0).toBeTruthy();
    const preprocessedDoc = preprocessedFilesCacheMap.get(resolve("tests/t3testgames/game1/main.t"));

    expect(preprocessedDoc).toBe(expectedPreprocessedResult); // TODO: fix the extra blank row at the end of the preprocessed files
    expect(consoleMock.console.debug).toHaveBeenCalledTimes(2);
  });
});
