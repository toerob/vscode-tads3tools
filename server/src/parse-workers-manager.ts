import { CancellationTokenSource } from 'vscode-languageserver/node';
import { preprocessAllFiles } from './parser/preprocessor';
import { statSync } from 'fs';
import { URI, Utils } from 'vscode-uri';
import { spawn, Pool, Worker } from 'threads';
import { abortParsingProcess, preprocessedFilesCacheMap, connection, symbolManager } from './server';

/**
 * 
 * @param makefileLocation string holding the file location of the makefile
 * @param filePaths string array of files to parse, "undefined" means parse all files
 * @param token CancellationToken
 */
export async function preprocessAndParseFiles(makefileLocation: string, filePaths: string[]|undefined, token: any) {

	await preprocessAllFiles(makefileLocation, preprocessedFilesCacheMap);
	connection.sendNotification('response/preprocessed/list', [...preprocessedFilesCacheMap.keys()]);


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
	if (allFilePaths === undefined) {
		console.error(`No files found to parse`);
		connection.sendNotification('symbolparsing/allfiles/failed', allFilePaths);
		return;
	}

	// Temporary, just the first files to speed up
	//allFilePaths = allFilePaths.splice(0,3);

	const poolMaxSize = 4; //6;
	const poolSize = allFilePaths.length >= poolMaxSize ? poolMaxSize : 1;
	const workerPool = Pool(() => spawn(new Worker('./worker')), poolSize);
	try {
		const startTime = Date.now();
		for (const filePath of allFilePaths) {
			connection.console.log(`Queuing parsing job ${filePath}`);
			workerPool.queue(async (parseJob) => {

				const text = preprocessedFilesCacheMap.get(filePath) ?? '';
				const { symbols, keywords, additionalProperties} = await parseJob(filePath, text);
				//connection.console.log(symbols);
				symbolManager.symbols.set(filePath, symbols);
				symbolManager.keywords.set(filePath, keywords);
				symbolManager.additionalProperties.set(filePath, additionalProperties);

		
				//client.onNotification('symbolparsing/success', (filePath) => {
				
				// TODO: this doesn't work anymore: check connection
				connection.sendNotification('symbolparsing/success', filePath);
				connection.console.log(`${filePath} parsed successfully`);
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
