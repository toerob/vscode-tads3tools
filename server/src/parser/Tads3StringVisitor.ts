import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ObjectDeclarationContext, ProgramContext, PropertyContext } from './Tads3Parser';
import { Tads3Visitor } from './Tads3Visitor';

export class T3StringVisitor extends AbstractParseTreeVisitor<string> implements Tads3Visitor<string> {

	visitProgram(ctx: ProgramContext) {
		return super.visitChildren(ctx);
	}

	visitObjectDeclaration(ctx: ObjectDeclarationContext) {
		const name = ctx.identifierAtom()?.text ?? 'NAMELESS';
		return name + super.visitChildren(ctx);
	}

	visitProperty(ctx: PropertyContext) {
		return 'property: ' + ctx.identifierAtom().map(x=>x.text).join(' ');
	}
	
	aggregateResult(aggregate: string, nextResult: string) {
		return aggregate + nextResult;
	}

	defaultResult() {
		return '';
	}
}
