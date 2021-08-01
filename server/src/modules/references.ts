import { promisify } from 'util';
import { DocumentSymbol, DocumentSymbolParams, ReferenceParams, ResponseError, _, _Connection } from 'vscode-languageserver';
import { URI } from 'vscode-uri';
import { connection } from '../server';
import { Tads3SymbolManager } from '../Tads3SymbolManager';

const memberCallRegExp = new RegExp(/\s*(?:(.*)[.])(.*)\(\);/);


export async function onReferences(handler: ReferenceParams, symbolManager: Tads3SymbolManager) {
	const {position, textDocument} = handler;
	const locations: [] = [];

	/*
	const word = document.getText(document.getWordRangeAtPosition(position));
	const currentLine = document.lineAt(position.line).text;

	
	//for(let env of this.symbolManager.scopedEnvironments) {
		//let location = env.getSymbol(word);
		//if(location) {
			//console.error(`word found in ${location.uri}`);
			//locations.push(location);
		//}
	//}
	
	try {
		// TODO: check if matching a member call
		const memberExpression = T3ReferenceProvider.memberCallRegExp.exec(currentLine);
		if (memberExpression && memberExpression.length > 1) {
			const root = memberExpression[1];
			//if(memberExpression.length)
			console.error(`memberExpression: ${memberExpression}, root: ${root}`);
			//TODO: add listener logic to capture text with member call expressions

			// Look in 
			const map = this.symbolManager.memberCallChains.get(document.uri.path);
			const arrayOfMemberCallsArray = map.get(word);
			const result = arrayOfMemberCallsArray.find(x=>x.line===position.line+1);
			
			if (result.memberChain.length === 1) {
				// Locate the symbol that is the root of the call chain:
				// TODO: make a findChildrenWithin() method to make this call easier
				const rootSymbolName = result.memberChain[0];

				//TODO: Make it global instead and use Uri.parse(path)
					const rootSymbol = this.symbolManager.getSymbols(document.uri.path)
					.find(x => x.name === rootSymbolName);
				
				const method = rootSymbol.children
					.filter(x => x.kind === SymbolKind.Method)
					.find(x => x.name === word);
				if (method) {
					console.error(method);
					//TODO: Make it global instead and use Uri.parse(path)
					const location = new Location(document.uri, method.range);
					locations.push(location);
					return locations;
				}
			}
			//let o = [...map.values()].find(x=>x.line === position.line+1)
			
			
			//this.symbolManager.getSymbols(document.uri.path)
			//	.find(x => x.range.start.line === position.line);
		}


		for(const filePath of this.symbolManager.getAllSymbols().keys()) {
			// TODO: get current object from location
			const currentUri = Uri.parse(filePath);
			const containingObject = this.symbolManager.getAllSymbols().get(filePath).find(x => x.name === word);
			if(containingObject) {
				const location = new Location(currentUri, containingObject.range);
				locations.push(location);
			}
		}


		for(const path of this.symbolManager.keywords.keys()) {
			const currentUri = Uri.parse(path);
			const localKeywordMap = this.symbolManager.keywords.get(path); // 
			const ranges = localKeywordMap.get(word);
			if(path && ranges) {
				ranges.forEach(range => {
					const location = new Location(currentUri, range);
					locations.push(location);
				});
			}
		}
	} catch (err) {

		console.error('Unexpected');
	}*/
	/*
	const symbolFound = this.symbolManager.environments.get(word);
	for (const {range,path} of symbolFound.ranges) {
		if(path) {
			const uri = Uri.parse(path);
			console.log(uri);
			const location = new Location(uri, range);
			locations.push(location);
		}
	}*/

	return locations;
}

