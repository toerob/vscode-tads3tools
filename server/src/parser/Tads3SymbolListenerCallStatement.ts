import { Range } from 'vscode-languageserver';
import { CommaExprContext, OptionallyTypedOptionalIdContext, ParamsContext } from './Tads3Parser';
import { Tads3Listener } from './Tads3Listener';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';

type ParameterInfo = {
	range: Range;
	text: string;
	type: number;
}

export default class Tads3SymbolListenerParameterCollector implements Tads3Listener {

	parameterCollection: ParameterInfo[] = [];

	enterParams(ctx: ParamsContext) {
		let lst: ParameterInfo[] = [];
		buildParamList(ctx.getChild(0), lst);
		this.parameterCollection = lst;
	}
}

function buildParamList(ctx: ParseTree, parameterInfoCollection: ParameterInfo[]) {
	for(let i = 0; i<ctx.childCount; i++) {
		const currentChild = ctx.getChild(i);
		if(currentChild instanceof CommaExprContext) {
			buildParamList(currentChild, parameterInfoCollection);
		//} else if (currentChild instanceof OptionallyTypedOptionalIdContext) {
			
		} else {
			//currentChild.payload
			const text = currentChild?.text ?? '_';
			if(text !== ',') {
				const ruleCtx = (currentChild as ParserRuleContext);

				const lineBegin = ruleCtx.start.line ?? -1;
				const start = ruleCtx.start?.startIndex ?? 0;

				const lineEnd = ruleCtx.stop?.line ?? -1;
				const stop = ruleCtx?.stop?.stopIndex ?? 0;

				const type = ruleCtx?.start.type ?? -1;
				const range = Range.create(lineBegin, start, lineEnd, stop)

				//console.log(`"${text}" end char: ${range.start.character} -> ${range.end.character}`);
				parameterInfoCollection.push({text, range, type});
			}
		}
	}
}

