/* eslint-disable @typescript-eslint/no-var-requires */
import { expect, describe } from "@jest/globals";
import { runCommand } from "../modules/run-command";

// Skipping beacuse it requires t3make to be installed
describe.skip("runCommand", () => {
  test("runCommand executes the shell command 't3make'", async () => {
    // Arrange, Act
    const resultOfLs: any = (await runCommand("t3make")) as string;

    // Assert
    expect(resultOfLs).not.toBeUndefined();
    expect(resultOfLs.startsWith("TADS Compiler 3")).toBeTruthy();
  });

  test("runCommand fails to recognize the unknown command 'slartibartfast123'", async () => {
    // Arrange, Act, Assert
    expect((await runCommand("slartibartfast123")) as string).toBe("");
  });
});
