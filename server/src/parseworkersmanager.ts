import { CancellationTokenSource } from 'vscode-languageserver/node';
import { preprocessAllFiles } from './parser/preprocessor';
import { statSync } from 'fs';
import { URI, Utils } from 'vscode-uri';
import { spawn, Pool, Worker } from 'threads';
import { abortParsingProcess, preprocessedFilesCacheMap, connection, symbolManager } from './server';

export async function preprocessAndParseAllFiles(makefileLocation: any, filePaths: any, token: any) {

	await preprocessAllFiles(makefileLocation, preprocessedFilesCacheMap);

	let allFilePaths = filePaths;

	// Parse project files close to the makefile first:
	if (filePaths === undefined) {
		const baseDir = Utils.dirname(URI.parse(makefileLocation)).fsPath;
		allFilePaths = [...preprocessedFilesCacheMap.keys()];

		// Sort by size, size ordering, the largest files goes first:
		allFilePaths = allFilePaths.sort((a: string, b: string) => statSync(b).size - statSync(a).size);

		// Then sort out all files in the project directory first:
		allFilePaths = allFilePaths.sort((a: string, b: string) => {
			if (a.startsWith(baseDir)) {
				return -1;
			}
			return 0;
		});

	}
	const poolMaxSize = 6;
	const poolSize = allFilePaths.length >= poolMaxSize ? poolMaxSize : 1;
	const workerPool = Pool(() => spawn(new Worker('./worker')), poolSize);
	try {
		const startTime = Date.now();
		for (const filePath of allFilePaths) {
			connection.console.log(`Queuing parsing job ${filePath}`);
			workerPool.queue(async (parseJob) => {

				const text = preprocessedFilesCacheMap.get(filePath) ?? '';
				const symbols = await parseJob(filePath, text);
				//connection.console.log(symbols);
				connection.sendNotification('symbolparsing/success', filePath);
				connection.console.log(`${filePath} parsed successfully`);
				symbolManager.symbols.set(filePath, symbols);
			});
		}
		await workerPool.completed();
		await workerPool.terminate();
		const elapsedTime = Date.now() - startTime;
		console.log(`All files parsed within ${elapsedTime} ms`);
		connection.sendNotification('symbolparsing/allfiles/success', { allFilePaths, elapsedTime });
	} catch (err) {
		await workerPool.terminate();
		console.error(err);
		connection.sendNotification('symbolparsing/allfiles/failed', allFilePaths);
	}
}
