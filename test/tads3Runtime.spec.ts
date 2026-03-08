import { expect } from "chai";
import { Tads3Runtime } from "../src/tads3Runtime";
import { DapMockHarness } from "./helpers/mockDapHarness";

const fileAccessor = {
  isWindows: false,
  readFile: async () => new Uint8Array(),
  writeFile: async () => undefined,
};

describe("Tads3Runtime DAP wiring", () => {
  it("sends evaluate requests and returns response bodies", async () => {
    const runtime = new Tads3Runtime(fileAccessor);
    const harness = new DapMockHarness(runtime);

    harness.onRequest("evaluate", (request) => ({
      result: "2",
      variablesReference: 0,
      expression: request.arguments?.expression,
    }));

    const result = await runtime.evaluate("1+1");

    expect(result.result).to.equal("2");
    expect(harness.lastRequest().command).to.equal("evaluate");
  });

  it("maps setBreakpoints responses into runtime breakpoints", async () => {
    const runtime = new Tads3Runtime(fileAccessor);
    const harness = new DapMockHarness(runtime);

    harness.onRequest("setBreakpoints", (request) => {
      const lines = (request.arguments?.lines as number[]) || [];
      return {
        breakpoints: lines.map((line) => ({ line, verified: true })),
      };
    });

    const bps = await runtime.setBreakPoints("/tmp/game.t", [12, 34]);

    expect(bps).to.have.length(2);
    expect(bps[0].verified).to.equal(true);
    expect(bps[1].line).to.equal(34);
  });

  it("translates stopped events into runtime signals", (done) => {
    const runtime = new Tads3Runtime(fileAccessor);
    const harness = new DapMockHarness(runtime);

    runtime.on("stopOnBreakpoint", () => {
      done();
    });

    harness.sendEvent("stopped", { reason: "breakpoint" });
  });
});
