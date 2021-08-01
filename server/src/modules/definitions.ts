import { promisify } from 'util';
import { DefinitionParams, DocumentSymbolParams, ReferenceParams, _, _Connection } from 'vscode-languageserver';
import { URI } from 'vscode-uri';
import { connection } from '../server';
import { Tads3SymbolManager } from '../Tads3SymbolManager';

export async function onDefinition({textDocument,position}: DefinitionParams, symbolManager: Tads3SymbolManager) {
	
	/*
	const wordRange = textDocument.getWordRangeAtPosition(position);
		const symbolName = textDocument.getText(wordRange);

		for(const key of this.outlinerManager.getAllSymbols().keys()) {
			//this.allSymbolsFlattened.push(flattenTreeToArray(this.outlinerManager.getAllSymbols().get(key)));
			const symbol = flattenTreeToArray(this.outlinerManager.getAllSymbols().get(key))
							.find(x=>x.name === symbolName);
			//let symbol = this.outlinerManager.getAllSymbols().get(key).find(x=>x.name === symbolName);
			if(symbol !== undefined) {
				return [new vscode.Location(Uri.parse(key), symbol.range)];
			}	
		}

		// TODO: Clean up this mess
		for(const filePath of this.outlinerManager.getAllSymbols().keys()) {
			// TODO: get current object from location
			const containingObject = this.outlinerManager.getAllSymbols().get(filePath)
				.find(x => x.range.contains(position));
			// TODO: containingObject.children.filter(x=>x.kind === SymbolKind.Function)
			// TODO: handle scoping before adding assignment expressions
			
			
			//let assignmentSymbol = containingObject.children //this.outlinerManager.listener.assignmentStatements
			//	.filter(x=>x['functionScope'])
			//	.find(x=>x.name===symbolName);
			//if(assignmentSymbol) {
			//	return [new vscode.Location(Uri.parse(filePath), assignmentSymbol.range)];
			//}
			

			
			let symbol = this.outlinerManager.getAllSymbols().get(filePath)
				.find(x => x.name === symbolName);

 		    if(symbol !== undefined) {
				return [new vscode.Location(Uri.parse(filePath), symbol.range)];
			}

			symbol = this.outlinerManager.getAllSymbols().get(filePath)
				.flatMap(s=>s.children).find(x => x.name === symbolName) as ExtendedDocumentSymbol;
			if(symbol !== undefined) {
				return [new vscode.Location(Uri.parse(filePath), symbol.range)];
			}

			// TODO: handle scoping so not property with the same in another object
			//       gets referenced to.


			
			const prop = containingObject.children.find(x => x.name === symbolName);
			//let prop = this.outlinerManager.getAllSymbols().get(filePath)
			//	.flatMap(x=>x.children).find(x => x.name === symbolName);
			if(prop !== undefined) {
				return [new vscode.Location(Uri.parse(filePath), prop.range)];
			}


		}*/

		//let firstFoundSymbol = this.outlinerManager.getSymbols(textDocument.uri.path).find(x => x.name === symbolName);
		//return [new vscode.Location(textDocument.uri, firstFoundSymbol.range)];
		return [];

}
