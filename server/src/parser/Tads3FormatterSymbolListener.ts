import { CurlyObjectBodyContext, DoubleQuotestringAtomContext, ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext, FunctionDeclarationContext, ObjectDeclarationContext, PropertySetContext, SemiColonEndedObjectBodyContext, SingleQuotestringAtomContext, TemplateExprContext } from './Tads3Parser';
import { Tads3Listener } from './Tads3Listener';
import { Range } from 'vscode-languageserver';

export default class Tads3SymbolListenerSimple implements Tads3Listener {

	rowIndentation = new Map<number, number>();
	withinString = new Map<number, Range>();

	exitPropertySet(ctx: PropertySetContext) {
		if (ctx.start?.line && ctx.stop?.line) {
			this.rowIndentation.set(ctx.start.line, 1);
			this.rowIndentation.set(ctx.stop.line-1, -1);
		}
	}

	exitSingleQuotestringAtom(ctx: SingleQuotestringAtomContext) {
		if (ctx.start?.line && ctx.stop?.line) {
			//TODO: add extra rows for strings that span over several lines
			const range = Range.create(ctx.start.line, ctx.start.startIndex, ctx.stop.line, ctx.stop.stopIndex);
			this.withinString.set(ctx.start.line, range);
		}
	}

	exitDoubleQuotestringAtom(ctx: DoubleQuotestringAtomContext) {
		if (ctx.start?.line && ctx.stop?.line) {
			//TODO: add extra rows for strings that span over several lines
			const range = Range.create(ctx.start.line, ctx.start.startIndex, ctx.stop.line, ctx.stop.stopIndex);
			this.withinString.set(ctx.start.line, range);			
		}
	}
	exitTemplateExpr(ctx: TemplateExprContext)  {
		if (ctx.start?.line && ctx.stop?.line) {
			//TODO: add extra rows for strings that span over several lines
			if(ctx._singleString || ctx._doubleString) {
				const range = Range.create(ctx.start.line, ctx.start.startIndex, ctx.stop.line, ctx.stop.stopIndex);
				this.withinString.set(ctx.start.line, range);			
			}
		}
	}

	exitObjectDeclaration(ctx: ObjectDeclarationContext) {
		if (ctx.start?.line && ctx.stop?.line) {

			const lastChild = ctx.payload.getChild(ctx.childCount-1);
			if(lastChild instanceof SemiColonEndedObjectBodyContext) {
				const lastLine = lastChild.SEMICOLON().payload.line;
				// Only indent if the line of the ending semicolon is greater than the start line
				if(lastLine > ctx.start.line) {
					this.rowIndentation.set(ctx.start.line, 1);
					this.rowIndentation.set(ctx.stop.line-1, -1);
				}
			} else if(lastChild instanceof CurlyObjectBodyContext) {
				const lastLine = lastChild.RIGHT_CURLY().payload.line;
				// Only indent if the line of the ending semicolon is greater than the start line
				if(lastLine > ctx.start.line) {
					this.rowIndentation.set(ctx.start.line, 1);
					this.rowIndentation.set(ctx.stop.line-1, -1);
				}
			}
		}
	}




	exitFunctionDeclaration(ctx: FunctionDeclarationContext) {
		if (ctx.start?.line && ctx.stop?.line) {

			/*const lastChild = ctx.payload.getChild(ctx.childCount-1);
			if(lastChild instanceof CodeBlockContext) {
				const lastLine = lastChild.RIGHT_CURLY().payload.line;
				console.log(lastLine)
				// Only indent if the line of the ending semicolon is greater than the start line
				if(lastLine > ctx.start.line) {
					this.rowIndentation.set(ctx.start.line, 1);
					this.rowIndentation.set(ctx.stop.line-1, -1);
				}
			}*/

			this.rowIndentation.set(ctx.start.line, 1);
			this.rowIndentation.set(ctx.stop.line-1, -1);
		}
	}



}

