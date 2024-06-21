import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { Tads3Lexer } from "../../src/parser/Tads3Lexer";
import { Tads3SymbolListener } from "../../src/parser/Tads3SymbolListener";
import { Tads3Parser } from "../../src/parser/Tads3Parser";
import { it, expect, jest } from "@jest/globals";
import { readFileSync } from "fs";
import { resolve } from "path";
import { preprocessTads3Files } from "../../src/parser/preprocessor";

function parseTextWithTads3SymbolListener(text: string) {
  const input = CharStreams.fromString(text);
  const lexer = new Tads3Lexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Tads3Parser(tokenStream);
  const parseTreeWalker = new ParseTreeWalker();
  const listener = new Tads3SymbolListener();
  const parseTree = parser.program();
  parseTreeWalker.walk(listener, parseTree);
  return { parseTree, listener };
}

describe("Complete Game parsing integration tests", () => {
  it("preprocesses and parses a game with the standard library with no errors", async () => {
    // Arrange
    const expectedPreprocessedResult = readFileSync("tests/t3testgames/game1/main-preprocessed.t").toString();
    const absoluteMakefilePath = resolve("tests/t3testgames/game1/Makefile.t3m");

    const preprocessedFilesCacheMap: Map<string, string> = new Map();
    const consoleMock = { console: { log: jest.fn(), debug: jest.fn() } };

    // Act
    await preprocessTads3Files(absoluteMakefilePath, preprocessedFilesCacheMap, "t3make", consoleMock);

    // Assert
    expect(preprocessedFilesCacheMap.size >= 62).toBeTruthy();
    const preprocessedDoc = preprocessedFilesCacheMap.get(resolve("tests/t3testgames/game1/main.t"));

    expect(preprocessedDoc).toBe(expectedPreprocessedResult); // TODO: fix the extra blank row at the end of the preprocessed files
    expect(consoleMock.console.debug).toHaveBeenCalledTimes(2);

    // ---------------------------------------------------------------
    // 2nd phase of the test - parse the now preprocessed document
    // ---------------------------------------------------------------

    // Arrange, Act
    const { listener } = parseTextWithTads3SymbolListener(preprocessedDoc!);

    // Assert
    const gameMainSymbol = listener.symbols.filter((x) => x.name === "gameMain");
    expect(gameMainSymbol).not.toBeUndefined();
    const versionInfoSymbol = listener.symbols.filter((x) => x.name === "versionInfo");
    expect(versionInfoSymbol).not.toBeUndefined();
    const startRoomSymbol = listener.symbols.filter((x) => x.name === "startRoom");
    expect(startRoomSymbol).not.toBeUndefined();
    const meSymbol = listener.symbols.filter((x) => x.name === "me");
    expect(meSymbol).not.toBeUndefined();
  });
});
