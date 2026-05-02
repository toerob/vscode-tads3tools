#!/usr/bin/env node
// Smoke-tests the platform binary by running an LSP initialize handshake over stdio.
const { spawnSync, spawn } = require("child_process");
const path = require("path");
const os = require("os");

// ---------------------------------------------------------------------------
// Resolve binary for the current platform
// ---------------------------------------------------------------------------
function resolveBinary() {
  const platform = os.platform(); // darwin, linux, win32
  const arch = os.arch(); // arm64, x64

  const pkgPlatform = platform === "darwin" ? "macos" : platform === "win32" ? "win" : "linux";
  const pkgArch = arch === "arm64" ? "arm64" : "x64";
  const ext = platform === "win32" ? ".exe" : "";

  return path.join(__dirname, "..", "bin", `vscode-tads3tools-server-${pkgPlatform}-${pkgArch}${ext}`);
}

// ---------------------------------------------------------------------------
// LSP helpers
// ---------------------------------------------------------------------------
function encode(obj) {
  const body = JSON.stringify(obj);
  return `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`;
}

const INITIALIZE = encode({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    processId: process.pid,
    rootUri: null,
    capabilities: {},
    workspaceFolders: null,
  },
});

const SHUTDOWN = encode({ jsonrpc: "2.0", id: 2, method: "shutdown", params: null });
const EXIT = encode({ jsonrpc: "2.0", method: "exit", params: null });

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
const binary = resolveBinary();
console.log(`Testing: ${path.basename(binary)}`);

const proc = spawn(binary, ["--stdio"], { stdio: ["pipe", "pipe", "inherit"] });

let buf = "";
let passed = false;

proc.stdout.on("data", (chunk) => {
  buf += chunk.toString();

  // Parse all complete LSP messages from the buffer
  while (true) {
    const headerEnd = buf.indexOf("\r\n\r\n");
    if (headerEnd === -1) break;

    const header = buf.slice(0, headerEnd);
    const match = header.match(/Content-Length:\s*(\d+)/i);
    if (!match) {
      buf = buf.slice(headerEnd + 4);
      continue;
    }

    const length = parseInt(match[1], 10);
    const bodyStart = headerEnd + 4;
    if (buf.length < bodyStart + length) break;

    const body = buf.slice(bodyStart, bodyStart + length);
    buf = buf.slice(bodyStart + length);

    let msg;
    try {
      msg = JSON.parse(body);
    } catch {
      continue;
    }

    if (msg.id === 1) {
      // This is the initialize response
      if (msg.result?.capabilities) {
        console.log("✓ initialize response received");
        console.log("  capabilities:", Object.keys(msg.result.capabilities).join(", "));
        passed = true;
        proc.stdin.write(SHUTDOWN);
      } else {
        console.error("✗ initialize response missing capabilities:", body);
        proc.kill();
        process.exit(1);
      }
    }

    if (msg.id === 2) {
      // Shutdown acknowledged — send exit
      proc.stdin.write(EXIT);
      proc.stdin.end();
    }
  }
});

proc.on("exit", (code) => {
  if (passed) {
    console.log("✓ Binary smoke test passed");
    process.exit(0);
  } else {
    console.error(`✗ Binary exited with code ${code} before responding`);
    process.exit(1);
  }
});

proc.on("error", (err) => {
  console.error(`✗ Failed to spawn binary: ${err.message}`);
  process.exit(1);
});

// Timeout after 10 seconds
setTimeout(() => {
  console.error("✗ Timed out waiting for initialize response");
  proc.kill();
  process.exit(1);
}, 10_000);

proc.stdin.write(INITIALIZE);
