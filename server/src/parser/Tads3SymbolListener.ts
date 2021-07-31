import { DocumentSymbol, Range, SymbolKind } from 'vscode-languageserver';
import { FunctionDeclarationContext, ObjectDeclarationContext } from './T3ParserParser';
import { T3ParserListener } from './T3ParserListener';

export default class Tads3SymbolListener implements T3ParserListener {

	symbols: DocumentSymbol[] = [];

	enterObjectDeclaration(ctx: ObjectDeclarationContext) {
		const name: string = ctx.identifierAtom()?.ID()?.text.toString() ?? "unnamed";
		const detail = "object";

		const start = (ctx.start?.line ?? 1) - 1;
		const stop = (ctx.stop?.line ?? 1) - 1;

		const range = Range.create(start, 0, stop, 0);
		let level = 0;
		if (ctx._level) {
			level = ctx._level.length;
			//console.log(name + ' has level : ' + ctx._level.length);
		}
		const symbol = DocumentSymbol.create(name, detail, ctx._isClass ? SymbolKind.Class : SymbolKind.Object, range, range);
		this.symbols.push(symbol);
	}


}
