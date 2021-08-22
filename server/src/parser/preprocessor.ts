//import { URI } from 'vscode-languageserver';
import { exec } from 'child_process';
import { connection } from '../server';
import { URI } from 'vscode-uri';

const rowsMap = new Map<string, number>();

export function runCommand(command: string) {
	return new Promise( (resolve, reject) => {
		let result = '';
		const childProcess = exec(command, {maxBuffer: 1024 * 50000 }); 	//TODO: make configurable
		try {
			childProcess?.stdout?.on('data', (data: any) => {
				result += data;
			});
			childProcess.on('close', function () {
				resolve(result);
			});
		} catch (error) {
			reject(error);
		}
		return result;
	});
}


export async function preprocessAllFiles(chosenMakefilePath: string, preprocessedFilesCacheMap: Map<string, string>) {
	const t3makeCompilerPath: number = await connection.workspace.getConfiguration('tads3.compiler.path') ?? 't3make'
	preprocessedFilesCacheMap.clear();
	rowsMap.clear();
	const commandLine = `${t3makeCompilerPath} -P -q -f "${chosenMakefilePath}"`;
	const result: any = await runCommand(commandLine);
	processPreprocessedResult(result, preprocessedFilesCacheMap);
}

function processPreprocessedResult(result: any, preprocessedFilesCacheMap: Map<string, string>) {
	preprocessedFilesCacheMap.clear();
	rowsMap.clear();
	const pathRegexp = new RegExp("^#line ([0-9]+) \"(.*)\"");
	const startTime = Date.now();
	let totalLineCount = 0;
	let currentCounter = 0;
	let currentBuffer = '';
	let currentFile = undefined;
	
	for (const line of result.split(/\n/)) {
		totalLineCount++;
		currentCounter++;
		if (line.startsWith('#line')) {
			const match = pathRegexp.exec(line);
			if (match) {
				if (currentFile) {
					storeCurrentBufferAndRows(currentFile, currentBuffer, currentCounter - 1, preprocessedFilesCacheMap);
				}
				currentBuffer = '';
				currentCounter = 0;
				if (currentCounter === undefined || currentCounter === Infinity) {
					currentCounter = 1;
				}

				currentFile = match[2]
								.replace(/\\\\/g,'\\'); 

				const newCurrentCounter = Number(match[1]) - 1;
				let lastLine = rowsMap.get(currentFile);
				if (lastLine === undefined || lastLine === Infinity) {
					lastLine = newCurrentCounter;
				}
				const diff = newCurrentCounter - lastLine;

				// Salvage negative difference:
				if (diff === -1) {
					const lastStored = preprocessedFilesCacheMap.get(currentFile);
					if(lastStored) {
						const lastCharacter = lastStored[lastStored.length - 1];
						if (lastCharacter === '\n') {
							//console.error(`Salvaging negative diff in ${currentFile} ${diff} last line: ${lastLine}`);
							const removedLastLine = lastStored.slice(0, lastStored.length - 1);
							preprocessedFilesCacheMap.set(currentFile, removedLastLine);
							currentCounter--;
						}
					}
				}

				for (let x = 0; x < diff; x++) {
					currentBuffer = currentBuffer.concat('\n');
					currentCounter++;
				}
				rowsMap.set(currentFile, lastLine);
				continue;
			}
		}
		if (!line.startsWith('#charset')) {
			currentBuffer = currentBuffer.concat(line).concat('\n');
		} else {
			currentBuffer = currentBuffer.concat('\n');
		}
	}

	if (currentFile) {
		const newString = (preprocessedFilesCacheMap.get(currentFile) ?? '') + currentBuffer;
		preprocessedFilesCacheMap.set(currentFile, newString);
	}

	const elapsedTime = Date.now() - startTime;
	connection.console.log(`${totalLineCount - 1} number of preprocessed lines mapped in ${elapsedTime} ms`);
}

function storeCurrentBufferAndRows(currentFile: string, currentBuffer: string, currentCounter: number, preprocessedFilesCacheMap: Map<string, string>) {
	try {
		const previouslyCountedRows = rowsMap.get(currentFile);
		if (previouslyCountedRows !== undefined) {
			rowsMap.set(currentFile, previouslyCountedRows + currentCounter);
		} else {
			rowsMap.set(currentFile, 0);
		}
		const previousContent = preprocessedFilesCacheMap.get(currentFile);
		if (previousContent) {
			preprocessedFilesCacheMap.set(currentFile, previousContent.concat(currentBuffer));
		} else {
			if (currentBuffer) {
				preprocessedFilesCacheMap.set(currentFile, currentBuffer);		// Can't do this
			} else {
				preprocessedFilesCacheMap.set(currentFile, '');		// Can't do this
			}
		}
	} catch (err) {
		console.error(err);
	}
}
