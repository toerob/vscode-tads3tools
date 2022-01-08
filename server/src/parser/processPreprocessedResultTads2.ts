import { rowsMap, storeCurrentBufferAndRows, wholeLineRegExp } from './preprocessor';

export function processPreprocessedResultTads2(result: any, preprocessedFilesCacheMap: Map<string, string>, connection: any = undefined) {
	//TODO: std.t gets repeated in this process, so part of the beginning is tucked on at the end. 
	//TODO: separate this completely for tads2?

	preprocessedFilesCacheMap.clear();
	rowsMap.clear();

	const pathRegexp = new RegExp("^# ([0-9]+) \"(.*)\"");
	const startTime = Date.now();
	let totalLineCount = 0;
	let currentCounter = 0;
	let currentBuffer = '';
	let currentFile = undefined;
	for (const line of result.split(wholeLineRegExp)) { // Split only simple "\n", not "\\n" found within strings
		totalLineCount++;
		currentCounter++;
		if (line.startsWith('#')) {
			const match = pathRegexp.exec(line);
			if (match) {
				if (currentFile && !(currentFile.startsWith('<'))) {
					storeCurrentBufferAndRows(currentFile, currentBuffer, currentCounter - 1, preprocessedFilesCacheMap);
				}
				currentBuffer = '';
				currentCounter = 0;
				if (currentCounter === undefined || currentCounter === Infinity) {
					currentCounter = 1;
				}
				currentFile = match[2].replace(/\\\\/g, '\\');
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
							console?.error(`Salvaging negative diff in ${currentFile} ${diff} last line: ${lastLine}`);
							const removedLastLine = lastStored.slice(0, lastStored.length - 1);
							preprocessedFilesCacheMap.set(currentFile, removedLastLine);
							currentCounter--;
						}
					}
				}
				for (let x = 0; x < diff; x++) {
					currentBuffer = currentBuffer.concat('//**ROW**\n');
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
	// Logger
	connection?.console?.log(`${totalLineCount - 1} number of preprocessed lines mapped in ${elapsedTime} ms`);
}

