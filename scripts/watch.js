/* eslint-disable no-console */

const { spawn } = require("child_process");

function npmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function spawnNpm(args) {
  return spawn(npmCommand(), args, {
    stdio: "inherit",
    shell: false,
    env: process.env,
  });
}

const children = [
  spawnNpm(["run", "watch:tsc"]),
  spawnNpm(["run", "watch:maprenderer"]),
];

function shutdown(signal) {
  for (const child of children) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

let exitCode = 0;
for (const child of children) {
  child.on("exit", (code) => {
    // If either child exits, we exit too.
    if (typeof code === "number") {
      exitCode = code;
    }
    shutdown("SIGTERM");
    process.exit(exitCode);
  });
}
