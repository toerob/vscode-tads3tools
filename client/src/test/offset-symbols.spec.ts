/* eslint-disable @typescript-eslint/no-var-requires */
import { expect, jest, describe } from "@jest/globals";
import { offsetSymbols } from "../modules/offset-symbols";
import { TextDocumentChangeEvent } from "vscode";

describe("OffsetSymbols", () => {
  test("offsetSymbols triggers a sendRequest if a textchange with a newline is entered", () => {
    // Arrange
    const event: any = createTextDocumentChangeEvent("something.t", 5, "\n"); // 1 newline added with '\n'

    const languageClientMock: any = { sendRequest(msg: string, params: any) {} };
    jest.spyOn(languageClientMock, "sendRequest");

    // Act
    offsetSymbols(event, languageClientMock);

    // Assert
    expect(languageClientMock.sendRequest).toHaveBeenCalledWith("request/offsetSymbols", {
      filePath: "something.t",
      line: 5,
      offset: 1,
    });
  });

  test("offsetSymbols does not trigger a sendRequest if no newlines are entered", () => {
    // Arrange
    const event: any = createTextDocumentChangeEvent(
      "something.t",
      5,
      "a text with no newline that should not trigger a sendRequest",
    );

    const languageClientMock: any = { sendRequest(msg: string, params: any) {} };
    jest.spyOn(languageClientMock, "sendRequest");

    // Act
    offsetSymbols(event, languageClientMock);

    // Assert
    expect(languageClientMock.sendRequest).not.toBeCalled();
  });
});

function createTextDocumentChangeEvent(
  fsPath: string,
  startingLine: number,
  textChange: string,
): TextDocumentChangeEvent {
  const event: any = {
    document: { uri: { fsPath } },
    contentChanges: [
      {
        range: { start: { line: startingLine }, end: { line: startingLine } },
        text: textChange,
      },
    ],
    reason: undefined,
  };
  return event;
}
