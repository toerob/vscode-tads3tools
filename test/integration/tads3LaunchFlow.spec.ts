import { expect } from "chai";
import { Tads3Runtime } from "../../src/tads3Runtime";
import { DapMockHarness } from "../helpers/mockDapHarness";

const fileAccessor = {
  isWindows: false,
  readFile: async () => new Uint8Array(),
  writeFile: async () => undefined,
};

describe("Tads3Runtime launch flow (mocked DAP)", () => {
  it("runs initialize -> launch -> configurationDone in order", async () => {
    const runtime = new Tads3Runtime(fileAccessor);
    const harness = new DapMockHarness(runtime);
    const commands: string[] = [];

    harness.onRequest("initialize", () => {
      commands.push("initialize");
      return {};
    });

    harness.onRequest("launch", () => {
      commands.push("launch");
      return {};
    });

    harness.onRequest("configurationDone", () => {
      commands.push("configurationDone");
      return {};
    });

    await (runtime as any)._initialize();
    await runtime.completeLaunch();

    expect(commands).to.deep.equal([
      "initialize",
      "launch",
      "configurationDone",
    ]);
  });

  it("allows breakpoints before configurationDone", async () => {
    const runtime = new Tads3Runtime(fileAccessor);
    const harness = new DapMockHarness(runtime);
    const commands: string[] = [];

    harness.onRequest("initialize", () => {
      commands.push("initialize");
      return {};
    });

    harness.onRequest("launch", () => {
      commands.push("launch");
      return {};
    });

    harness.onRequest("setBreakpoints", (request) => {
      commands.push("setBreakpoints");
      const lines = (request.arguments?.lines as number[]) || [];
      return {
        breakpoints: lines.map((line) => ({ line, verified: true })),
      };
    });

    harness.onRequest("configurationDone", () => {
      commands.push("configurationDone");
      return {};
    });

    await (runtime as any)._initialize();
    await runtime.setBreakPoints("/tmp/game.t", [8]);
    await runtime.completeLaunch();

    expect(commands).to.deep.equal([
      "initialize",
      "launch",
      "setBreakpoints",
      "configurationDone",
    ]);
  });
});
