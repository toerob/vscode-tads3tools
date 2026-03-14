import { spawn, Pool, Worker, Thread } from "threads";
import { connection } from "./server";
import { clearCompletionCache } from "./modules/completions";
import { symbolManager } from "./modules/symbol-manager";
import { serverState } from './state';

const SLOW_FILE_THRESHOLD_MS = 5000;

function logTads2ParseInfo(parseInfo: any) {
  if (!parseInfo) return;
  const { fileName, totalTimeMs, lexTimeMs, parseTimeMs, walkTimeMs, textLength, symbolCount, warnings, walkError, parsingMode } = parseInfo;
  connection.console.debug(
    `[parse-t2] ${fileName}: ${totalTimeMs}ms total (lex: ${lexTimeMs}ms, parse: ${parseTimeMs}ms, walk: ${walkTimeMs}ms) | mode: ${parsingMode} | ${textLength} chars, ${symbolCount} symbols`
  );
  if (totalTimeMs > SLOW_FILE_THRESHOLD_MS) {
    connection.console.warn(
      `[parse-t2] SLOW FILE: ${fileName} took ${totalTimeMs}ms (threshold: ${SLOW_FILE_THRESHOLD_MS}ms)`
    );
  }
  if (warnings && warnings.length > 0) {
    for (const warning of warnings) {
      connection.console.warn(`[parse-t2] ${warning}`);
    }
  }
  if (walkError) {
    connection.console.error(`[parse-t2] ${walkError}`);
  }
}

export async function parseTads2Files(filePaths: string[] | undefined = []) {
  //const parseOnlyTheWorkspaceFiles: boolean = await connection.workspace.getConfiguration("tads3.parseOnlyTheWorkspaceFiles");

  const startTime = Date.now();
  const totalFiles = filePaths?.length;
  let tracker = 0;

  // Parse everything if no files are specified
  if (filePaths.length === 1) {
    const filePath = filePaths[0];
    const startTime = Date.now();
    connection.console.debug(`Spawning worker to parse a single file: ${filePath}`);

    await connection.sendNotification("symbolparsing/processing", [filePath, 0, totalFiles, 1]);
    const worker = await spawn(new Worker("./tads2-parse-worker"));
    const text = serverState.preprocessedFilesCacheMap.get(filePath) ?? "";
    const jobResult = await worker(filePath, text);

    connection.console.debug(`Worker finished with result`);
    const { symbols, keywords, additionalProperties, inheritanceMap, parseInfo } = jobResult;
    logTads2ParseInfo(parseInfo);
    symbolManager.symbols.set(filePath, symbols ?? []);
    symbolManager.keywords.set(filePath, keywords ?? []);
    inheritanceMap.forEach((value: string, key: string) => symbolManager.inheritanceMap.set(key, value));
    clearCompletionCache();
    symbolManager.additionalProperties.set(filePath, additionalProperties);
    tracker++;
    const elapsedTime = Date.now() - startTime;
    await connection.sendNotification("symbolparsing/success", [filePath, tracker, totalFiles, 1]);
    connection.console.debug(`${filePath} parsed successfully in ${elapsedTime} ms`);
    try {
      await Thread.terminate(worker);
      connection.console.debug(`[worker unassigned]`);
    } catch (err) {
      connection.console.error(`Error during thread termination: ${err}`);
    }
  } else {
    const maxNumberOfParseWorkerThreads: number = await connection.workspace.getConfiguration(
      "tads3.maxNumberOfParseWorkerThreads",
    );
    let allFilePaths = [...serverState.preprocessedFilesCacheMap.keys()];
    connection.console.debug(`Preparing to parse a total of ${allFilePaths.length} files`);
    const poolSize = allFilePaths.length >= maxNumberOfParseWorkerThreads ? maxNumberOfParseWorkerThreads : 1;
    connection.console.debug(`Setting worker thread poolsize to: ${poolSize}`); // Default 6 threads
    const workerPool = Pool(() => spawn(new Worker("./tads2-parse-worker")), poolSize);
    for (const filePath of allFilePaths) {
      connection.console.debug(`Queuing parsing job ${filePath}`);
      workerPool.queue(async (parseJob) => {
        await connection.sendNotification("symbolparsing/processing", [filePath, tracker, totalFiles, poolSize]);
        const text = serverState.preprocessedFilesCacheMap.get(filePath) ?? "";
        const { symbols, keywords, additionalProperties, inheritanceMap, parseInfo } = await parseJob(filePath, text);
        logTads2ParseInfo(parseInfo);
        symbolManager.symbols.set(filePath, symbols ?? []);
        symbolManager.keywords.set(filePath, keywords ?? []);
        inheritanceMap.forEach((value: string, key: string) => symbolManager.inheritanceMap.set(key, value));
        clearCompletionCache();
        symbolManager.additionalProperties.set(filePath, additionalProperties);
        tracker++;
        await connection.sendNotification("symbolparsing/success", [filePath, tracker, totalFiles, poolSize]);
        connection.console.debug(`${filePath} parsed successfully`);
      });
    }
    try {
      await workerPool.completed();
      await workerPool.terminate();
    } catch (err) {
      connection.console.error(`Error happened during awaiting pool completion/termination: ` + err);
    }

    const elapsedTime = Date.now() - startTime;
    console.debug(`All files parsed within ${elapsedTime} ms`);
    await connection.sendNotification("symbolparsing/allfiles/success", {
      allFilePaths,
      elapsedTime,
    });
  }
}
