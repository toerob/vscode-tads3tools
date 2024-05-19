import { exec } from "child_process";

export function runCommand(command: string) {
  return new Promise((resolve, reject) => {
    let result = "";
    const childProcess = exec(command);
    try {
      childProcess.stdout.on("data", (data: any) => {
        result += data;
      });
      childProcess.on("close", function () {
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
    return result;
  });
}
