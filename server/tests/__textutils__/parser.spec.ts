import assert = require('assert');
import { getWordAtPosition, tokenizeWithIndex } from '../../src/modules/text-utils';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { integer, Position, ProposedFeatures } from 'vscode-languageserver';
import { BailErrorStrategy, CharStreams, CommonTokenStream } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { Tads3Lexer } from '../../src/parser/Tads3Lexer';
import { Tads3Listener } from '../../src/parser/Tads3Listener';
import { ObjectDeclarationContext, PropertyContext, Tads3Parser, TemplateExprContext } from '../../src/parser/Tads3Parser';
import { Tads3SymbolListener } from '../../src/parser/Tads3SymbolListener';
import { expose } from 'threads';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { Range, DefinitionParams, Location, DocumentSymbol  } from 'vscode-languageserver';


describe('Parser tests', () => {

	class SimpleErrorListener implements Tads3Listener {
		objects:any = [];
		properties: string[] = [];
		descriptions: string[] = [];
		
		enterObjectDeclaration(ctx: ObjectDeclarationContext) {
			const roomId:string = (ctx.identifierAtom()?.ID()?.text) ?? '';
			this.objects.push({ roomId });
		}
		enterTemplateExpr(ctx: TemplateExprContext) {
			const roomName = ctx.SSTR()?.text;
			const roomDesc = ctx.DSTR()?.text;
			const lastAddedObject = this.objects[this.objects.length - 1];
			if(roomName) 
				lastAddedObject.roomName = roomName;
			if(roomDesc) 
				lastAddedObject.roomDesc = roomDesc;
		}

		enterProperty(ctx: PropertyContext) {
			const name:string = (ctx._id.ID()?.text) ?? '';
			this.properties.push(name);
		}
		visitErrorNode(ctx: any) {
			assert.fail();
		}
	}

	it('parses a game object with properties correctly', () => {
		const text = `
		
		theHouse: Room 'the house on the hill'
			"the description goes here..."
			south = hill
			east = lake
			west = forest
		;
		`;
		
		const input = CharStreams.fromString(text);
		const lexer = new Tads3Lexer(input);
		const tokenStream = new CommonTokenStream(lexer);
		const parser = new Tads3Parser(tokenStream);
		const parseTreeWalker = new ParseTreeWalker();
		const listener = new SimpleErrorListener();
		const parseTree = parser.program();
		parseTreeWalker.walk(listener, parseTree);
		assert.equal(listener.objects.length, 1);
		assert.equal(listener.properties.length, 3);
		assert.equal(listener.objects[0].roomId, 'theHouse');
		assert.equal(listener.objects[0].roomName, "'the house on the hill'");
		assert.equal(listener.objects[0].roomDesc, '"the description goes here..."');
		assert.equal(listener.properties.join(','), 'south,east,west');

	});
});