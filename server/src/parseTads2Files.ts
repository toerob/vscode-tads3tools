import { spawn, Pool, Worker } from 'threads';
import { preprocessedFilesCacheMap, connection } from './server';
import { clearCompletionCache } from './modules/completions';
import { symbolManager } from './modules/symbol-manager';

export async function parseTads2Files() {
	const startTime = Date.now();
	//const parseOnlyTheWorkspaceFiles: boolean = await connection.workspace.getConfiguration("tads3.parseOnlyTheWorkspaceFiles");
	const maxNumberOfParseWorkerThreads: number = await connection.workspace.getConfiguration("tads3.maxNumberOfParseWorkerThreads");
	let allFilePaths = [...preprocessedFilesCacheMap.keys()];
	connection.console.log(`Preparing to parse a total of ${allFilePaths.length} files`);
	const poolSize = allFilePaths.length >= maxNumberOfParseWorkerThreads ? maxNumberOfParseWorkerThreads : 1;
	connection.console.log(`Setting worker thread poolsize to: ${poolSize}`); // Default 6 threads
	const workerPool = Pool(() => spawn(new Worker('./tads2-parse-worker')), poolSize);
	const totalFiles = allFilePaths?.length;
	let tracker = 0;
	for (const filePath of allFilePaths) {
		connection.console.log(`Queuing parsing job ${filePath}`);
		workerPool.queue(async (parseJob) => {
			const text = preprocessedFilesCacheMap.get(filePath) ?? '';
			const { symbols, keywords, additionalProperties, inheritanceMap } = await parseJob(filePath, text);
			symbolManager.symbols.set(filePath, symbols ?? []);
			symbolManager.keywords.set(filePath, keywords ?? []);
			inheritanceMap.forEach((value: string, key: string) => symbolManager.inheritanceMap.set(key, value));
			clearCompletionCache();
			symbolManager.additionalProperties.set(filePath, additionalProperties);
			tracker++;
			connection.sendNotification('symbolparsing/success', [filePath, tracker, totalFiles, poolSize]);
			connection.console.log(`${filePath} parsed successfully`);
		});
	}
	try {
		await workerPool.completed();
		await workerPool.terminate();
	} catch (err) {
		connection.console.error(`Error happened during awaiting pool completion/termination: ` + err);
	}

	const elapsedTime = Date.now() - startTime;
	console.log(`All files parsed within ${elapsedTime} ms`);
	connection.sendNotification('symbolparsing/allfiles/success', { allFilePaths, elapsedTime });

}
