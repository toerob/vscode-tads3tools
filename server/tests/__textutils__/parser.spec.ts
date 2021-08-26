import assert = require('assert');
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { Tads3Lexer } from '../../src/parser/Tads3Lexer';
import { Tads3Listener } from '../../src/parser/Tads3Listener';
import { ObjectDeclarationContext, PropertyContext, Tads3Parser, TemplateExprContext } from '../../src/parser/Tads3Parser';


describe('Parser tests', () => {

	function parseText(text: string) {
		const input = CharStreams.fromString(text);
		const lexer = new Tads3Lexer(input);
		const tokenStream = new CommonTokenStream(lexer);
		const parser = new Tads3Parser(tokenStream);
		const parseTreeWalker = new ParseTreeWalker();
		const listener = new SimpleErrorListener();
		const parseTree = parser.program();
		parseTreeWalker.walk(listener, parseTree);
		return { parseTree, listener };
	}
	

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
		
		//enterTemplateDeclaration(ctx: TemplateExprContext) {}

		visitErrorNode(ctx: any) {
			assert.fail();
		}
		
	}

	it('parses a game object with simple direction properties correctly', () => {

		const { listener } = parseText(`theHouse: Room 'the house on the hill'
			"the description goes here..."
			south = hill
			east = lake
			west = forest
		;`);

		assert.equal(listener.objects.length, 1);
		assert.equal(listener.properties.length, 3);
		assert.equal(listener.objects[0].roomId, 'theHouse');
		assert.equal(listener.objects[0].roomName, "'the house on the hill'");
		assert.equal(listener.objects[0].roomDesc, '"the description goes here..."');
		assert.equal(listener.properties.join(','), 'south,east,west');

	});


	it('parses switch cases correctly ', () => {
		parseText(`function testFunc() {
			local a = 10;
			switch(a) {
				case 10:
					break;
				default:
					return 6;
			}
		}`);

		parseText(`function testFunc() {
			switch(25 - 15) {
				default:
					break;
				case -10:
					return 20;
			}
		}`);

	});


	it('parses templates correctly ', () => {
		const adv3LiteTemplates = `
			Thing template 'vocab' @location? "desc"?;
			Topic template 'vocab' @familiar?;
			Room template 'roomTitle' 'vocab' "desc"?;
			Room template 'roomTitle' "desc"?;
			Region template [rooms];
			Door template  'vocab' @location? "desc"? ->otherSide;
			Door template  ->otherSide 'vocab' @location? "desc"?;
			TravelConnector template 'vocab'? @location? "desc"? ->destination;
			TravelConnector template ->destination "travelDesc";
			Enterable template inherited ->connector;
			Enterable template ->connector inherited;
			Unthing template 'vocab' @location? 'notHereMsg'?;
			SensoryEmanation template inherited [eventList]?;
			ActorState template "specialDesc" 'stateDesc' | "stateDesc" ?;		
			TopicGroup template +scoreBoost? 'convKeys' | [convKeys] ? ;
			QueryTopic template
				+matchScore? 'qtype'
				@matchObj | [matchObj]
				'matchPattern'
				"topicResponse" | [eventList] ?;
		`;
		parseText(adv3LiteTemplates);
		// TODO: Examine result
	});
});