import { spawn, Pool, Worker, Thread } from 'threads';
import { preprocessedFilesCacheMap, connection } from './server';
import { clearCompletionCache } from './modules/completions';
import { symbolManager } from './modules/symbol-manager';

export async function parseTads2Files(filePaths: string[] | undefined = []) {
	//const parseOnlyTheWorkspaceFiles: boolean = await connection.workspace.getConfiguration("tads3.parseOnlyTheWorkspaceFiles");

	const startTime = Date.now();
	const totalFiles = filePaths?.length;
	let tracker = 0;

	// Parse everything if no files are specified
	if (filePaths.length === 1) {
		const filePath = filePaths[0];
		const startTime = Date.now();
		connection.console.log(`Spawning worker to parse a single file: ${filePath}`);

		const worker = await spawn(new Worker('./tads2-parse-worker'));
		const text = preprocessedFilesCacheMap.get(filePath) ?? '';
		const jobResult = await worker(filePath, text);

		connection.console.log(`Worker finished with result`);
		const { symbols, keywords, additionalProperties, inheritanceMap } = jobResult;
		symbolManager.symbols.set(filePath, symbols ?? []);
		symbolManager.keywords.set(filePath, keywords ?? []);
		inheritanceMap.forEach((value: string, key: string) => symbolManager.inheritanceMap.set(key, value));
		clearCompletionCache();
		symbolManager.additionalProperties.set(filePath, additionalProperties);
		tracker++;
		const elapsedTime = Date.now() - startTime;
		connection.sendNotification('symbolparsing/success', [filePath, tracker, totalFiles, 1]);
		connection.console.log(`${filePath} parsed successfully in ${elapsedTime} ms`);
		try {
			await Thread.terminate(worker);
			connection.console.log(`[worker unassigned]`);
		} catch (err) {
			connection.console.error(`Error during thread termination: ${err}`);
		}
	} else {
		const maxNumberOfParseWorkerThreads: number = await connection.workspace.getConfiguration("tads3.maxNumberOfParseWorkerThreads");
		let allFilePaths = [...preprocessedFilesCacheMap.keys()];
		connection.console.log(`Preparing to parse a total of ${allFilePaths.length} files`);
		const poolSize = allFilePaths.length >= maxNumberOfParseWorkerThreads ? maxNumberOfParseWorkerThreads : 1;
		connection.console.log(`Setting worker thread poolsize to: ${poolSize}`); // Default 6 threads
		const workerPool = Pool(() => spawn(new Worker('./tads2-parse-worker')), poolSize);
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
}
