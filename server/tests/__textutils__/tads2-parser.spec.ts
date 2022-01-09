import assert = require('assert');
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { Tads2Lexer } from '../../src/parser/Tads2Lexer';
import { Tads2Listener } from '../../src/parser/Tads2Listener';
import { AdditiveExprContext, CompoundWordDirectiveContext, FunctionDeclarationContext, MethodContext, ObjectDeclarationContext, PropertyContext, Tads2Parser } from '../../src/parser/Tads2Parser';


describe('Tads2 parser tests', () => {

	function parseText(text: string) {
		const input = CharStreams.fromString(text);
		const lexer = new Tads2Lexer(input);
		const tokenStream = new CommonTokenStream(lexer);
		const parser = new Tads2Parser(tokenStream);
		const parseTreeWalker = new ParseTreeWalker();
		const listener = new SimpleErrorListener();
		const parseTree = parser.program();
		parseTreeWalker.walk(listener, parseTree);
		return { parseTree, listener };
	}
	

	class SimpleErrorListener implements Tads2Listener {
		compoundWords: string[] = [];
		functions:any = [];

		objects = new Map<string,string>();
		properties = new Map<string,string>();
		methodsWithParameters = new Map<string,string>();
		
		currentObject: string|undefined = undefined;

		enterCompoundWordDirective(ctx: CompoundWordDirectiveContext) {
			this.compoundWords.push(ctx._values?.map(x=>x.text).join(','));
		}

		enterFunctionDeclaration(ctx: FunctionDeclarationContext) {
			const name:string = (ctx.identifierAtom()?.ID()?.text) ?? '';
			this.functions.push(name);
		}

		enterObjectDeclaration(ctx: ObjectDeclarationContext) {
			const roomId:string = (ctx.identifierAtom()?.ID()?.text) ?? '';
			const superTypes:string = (ctx.superTypes()?.text) ?? '';
			this.currentObject = roomId;
			this.objects.set(roomId, superTypes);
		}
		exitObjectDeclaration(ctx: ObjectDeclarationContext) {
			this.currentObject = undefined;
		}

		enterMethod(ctx: MethodContext) {
			let name:string = (ctx.identifierAtom()?.ID()?.text) ?? '';
			const params:string = ctx.params()!.text;
			if(this.currentObject) { name = this.currentObject + '.' + name; } 
			this.methodsWithParameters.set(name, params);			
		}

		enterProperty(ctx: PropertyContext) {
			let name:string = (ctx._id.ID()?.text) ?? '';
			const value:string = (ctx._values.map(x=>x.text).join(',').toString()) ?? '';
			if(this.currentObject) { name = this.currentObject + '.' + name; } 
			this.properties.set(name,value);
		}
		
		visitErrorNode(ctx: any) {
			assert.fail();
		}
		enterAdditiveExpr(ctx: AdditiveExprContext) {

			/*
			//const left = ctx.expr()[0].text;
			const localExpression = (ctx?.expr()[0]?.children?[3]) ?? undefined;

			if(localExpression) {
				const left = (localExpression.text) ?? '';
				//console.log(children+ '\n');
	
				const op = ctx._op.text ?? 'NOP';
				const right = ctx.expr()[1].text;
				console.log(left+op+right);
	
			}*/


		}
		
	}
	it('parses a simple expression correctly', () => {

		parseText(`
			singleFunction: function {
				local a:= 3+5;
			}
		`);
		
	});


	it('parses a simple game structure correctly', () => {

		const { listener } = parseText(`
		
		compoundWord 'on' 'to' 'onto';

		singleFunction: function
		{
			local test = 23;
			return test;
		}

		
		house: room, decoration
			sdesc = 'the house'
			ldesc = "the description goes here..."
			south = hill
			east = lake
			west = forest
			
			tads2Func(parameter1) =
			{
				local i;
				i := 1;
			}
		;


		lawn: room
			sdesc = 'A lawn'
			ldesc = "green lawn"
			nw = forest
			north = house
		;
		
		`);

		assert.equal(listener.compoundWords.length, 1);
		assert.equal(listener.functions.length, 1);
		assert.equal(listener.objects.size, 2);


		assert.equal(listener.properties.size, 5+4);

		assert.equal(listener.methodsWithParameters.size, 1);
		assert.equal(listener.compoundWords[0], `'on','to','onto'`);
		assert.equal(listener.functions[0], `singleFunction`);

		assert.equal(listener.objects.get('house'), 'room,decoration');
		assert.equal(listener.properties.get(`house.sdesc`), `'the house'`);
		assert.equal(listener.properties.get(`house.ldesc`), `"the description goes here..."`);
		assert.equal(listener.properties.get(`house.south`), `hill`);
		assert.equal(listener.properties.get(`house.east`), `lake`);
		assert.equal(listener.properties.get(`house.west`), `forest`);
		assert.equal(listener.methodsWithParameters.get(`house.tads2Func`), 'parameter1');


		assert.equal(listener.objects.get('lawn'), 'room');
		assert.equal(listener.properties.get(`lawn.sdesc`), `'A lawn'`);
		assert.equal(listener.properties.get(`lawn.ldesc`), `"green lawn"`);
		assert.equal(listener.properties.get(`lawn.nw`), `forest`);
		assert.equal(listener.properties.get(`lawn.north`), `house`);

	});

});