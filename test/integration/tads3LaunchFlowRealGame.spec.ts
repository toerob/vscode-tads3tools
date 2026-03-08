import { expect } from "chai";
import { Tads3Runtime } from "../../src/tads3Runtime";
import { spy } from "sinon";

const fileAccessor = {
  isWindows: false,
  readFile: async () => new Uint8Array(),
  writeFile: async () => undefined,
};

import * as path from "path";

describe("Tads3Runtime integration with frobd", function () {
  this.timeout(10000); // frobd startup may take a few seconds

  it("launches frobd and handles the DAP handshake", async function () {
    const frobdPath = "/usr/local/bin/frobd";
    const gamePath = path.join(__dirname, "testgame.t3");
    const runtime = new Tads3Runtime(fileAccessor);
    const sendEvent = spy(runtime, "sendEvent");
    const sendRequest = spy(runtime, "sendRequest");
    const handleEvent = spy(runtime, "handleEvent");

    let socket = "";
    let output = "";
    let outputErr = "";

    runtime.on("frobdSocket", (data: string) => {
      socket += data;
    });
    runtime.on("frobStdout", (data: string) => {
      output += data;
    });
    runtime.on("frobdStderr", (data: string) => {
      outputErr += data;
    });

    const stopOnEntry = true;
    await runtime.start(gamePath, frobdPath, stopOnEntry, "socket");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // -----> initialize
    // <----- initialized
    expect(sendRequest.calledWith("initialize")).to.be.true;
    expect(handleEvent.calledWithMatch({ event: "initialized" })).to.be.true;

    // -----> launch
    // <----- invalidated, stopped (pause)
    expect(sendRequest.calledWith("launch")).to.be.true;
    
    // TODO:
    //expect(handleEvent.calledWithMatch({command: "launch"})).to.be.true;

    expect(handleEvent.calledWithMatch({event: "invalidated", body: { areas: ["breakpoints"] } })).to.be.true;
    expect(handleEvent.calledWithMatch({event: "stopped", body: { reason: "pause" } })).to.be.true;

    //{"body":{},"command":"launch","request_seq":2,"seq":3,"success":true,"type":"response"}Content-Length: 79

    // -----> stopOnEntry
    if (stopOnEntry) {
      expect(sendEvent.calledWith("stopOnEntry")).to.be.true;
    }

    const result = await runtime.setBreakPoints("gameMain.t", [10]);
    expect(result).to.deep.equal([{ verified: true, id: 1, line: 10 }]);
    expect(sendRequest.calledWith("setBreakpoints")).to.be.true;

    runtime.pause();
    runtime.continue();
    runtime.stop();

    console.log(`Frobd socket: "${socket}"`);
    //console.log(`Frobd output: "${output}"`);
    //console.log(`Frobd stderr: "${outputErr}"`);
  });
});
