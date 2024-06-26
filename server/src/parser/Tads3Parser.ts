// Generated from server/src/parser/Tads3.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { Tads3Listener } from "./Tads3Listener";
import { Tads3Visitor } from "./Tads3Visitor";


export class Tads3Parser extends Parser {
	public static readonly GRAMMAR = 1;
	public static readonly SWITCH = 2;
	public static readonly CASE = 3;
	public static readonly DEFAULT = 4;
	public static readonly FUNCTION = 5;
	public static readonly THROW = 6;
	public static readonly NEW = 7;
	public static readonly TEMPLATE = 8;
	public static readonly FOR = 9;
	public static readonly TRY = 10;
	public static readonly CATCH = 11;
	public static readonly FINALLY = 12;
	public static readonly ENUM = 13;
	public static readonly CLASS = 14;
	public static readonly TRANSIENT = 15;
	public static readonly MODIFY = 16;
	public static readonly REPLACE = 17;
	public static readonly PROPERTYSET = 18;
	public static readonly IF = 19;
	public static readonly DO = 20;
	public static readonly WHILE = 21;
	public static readonly ELSE = 22;
	public static readonly LOCAL = 23;
	public static readonly TRUE = 24;
	public static readonly NIL = 25;
	public static readonly INTRINSIC = 26;
	public static readonly INHERITED = 27;
	public static readonly DELEGATED = 28;
	public static readonly PROPERTY = 29;
	public static readonly DICTIONARY = 30;
	public static readonly EXPORT = 31;
	public static readonly EXTERN = 32;
	public static readonly RETURN = 33;
	public static readonly STATIC = 34;
	public static readonly STRING = 35;
	public static readonly FOREACH = 36;
	public static readonly IN = 37;
	public static readonly SPREAD = 38;
	public static readonly RANGE = 39;
	public static readonly STEP = 40;
	public static readonly LITERAL_NOT = 41;
	public static readonly IS = 42;
	public static readonly BREAK = 43;
	public static readonly CONTINUE = 44;
	public static readonly GOTO = 45;
	public static readonly TOKEN = 46;
	public static readonly PRAGMA = 47;
	public static readonly OPERATOR = 48;
	public static readonly AT = 49;
	public static readonly AMP = 50;
	public static readonly HASH = 51;
	public static readonly NOT = 52;
	public static readonly OPTIONAL = 53;
	public static readonly IFNIL = 54;
	public static readonly PLUS = 55;
	public static readonly DIV = 56;
	public static readonly MOD = 57;
	public static readonly MINUS = 58;
	public static readonly NEQ = 59;
	public static readonly EQ = 60;
	public static readonly AND = 61;
	public static readonly OR = 62;
	public static readonly ARROW = 63;
	public static readonly TILDE = 64;
	public static readonly POW = 65;
	public static readonly ID = 66;
	public static readonly ASSIGN = 67;
	public static readonly NR = 68;
	public static readonly HEX = 69;
	public static readonly OCT = 70;
	public static readonly COLON = 71;
	public static readonly COMMA = 72;
	public static readonly DOT = 73;
	public static readonly STAR = 74;
	public static readonly BITWISE_OR = 75;
	public static readonly SEMICOLON = 76;
	public static readonly LEFT_PAREN = 77;
	public static readonly RIGHT_PAREN = 78;
	public static readonly LEFT_BRACKET = 79;
	public static readonly RIGHT_BRACKET = 80;
	public static readonly DSTR = 81;
	public static readonly SSTR = 82;
	public static readonly RSTR = 83;
	public static readonly LEFT_CURLY = 84;
	public static readonly RIGHT_CURLY = 85;
	public static readonly LTEQ = 86;
	public static readonly ARITHMETIC_LEFT = 87;
	public static readonly LT = 88;
	public static readonly GTEQ = 89;
	public static readonly GT = 90;
	public static readonly ARITHMETIC_RIGHT = 91;
	public static readonly LOGICAL_RIGHT_SHIFT = 92;
	public static readonly COMMENT = 93;
	public static readonly LINE_COMMENT = 94;
	public static readonly WS = 95;
	public static readonly ANY = 96;
	public static readonly RULE_program = 0;
	public static readonly RULE_directive = 1;
	public static readonly RULE_pragmaDirective = 2;
	public static readonly RULE_grammarRules = 3;
	public static readonly RULE_itemList = 4;
	public static readonly RULE_qualifiers = 5;
	public static readonly RULE_item = 6;
	public static readonly RULE_templateDeclaration = 7;
	public static readonly RULE_enumDeclaration = 8;
	public static readonly RULE_propertyDeclaration = 9;
	public static readonly RULE_dictionaryDeclaration = 10;
	public static readonly RULE_exportDeclaration = 11;
	public static readonly RULE_intrinsicDeclaration = 12;
	public static readonly RULE_intrinsicMethodDeclaration = 13;
	public static readonly RULE_objectDeclaration = 14;
	public static readonly RULE_grammarDeclaration = 15;
	public static readonly RULE_templateExpr = 16;
	public static readonly RULE_array = 17;
	public static readonly RULE_curlyObjectBody = 18;
	public static readonly RULE_semiColonEndedObjectBody = 19;
	public static readonly RULE_superTypes = 20;
	public static readonly RULE_objectBody = 21;
	public static readonly RULE_property = 22;
	public static readonly RULE_dictionaryProperty = 23;
	public static readonly RULE_propertySet = 24;
	public static readonly RULE_paramsWithWildcard = 25;
	public static readonly RULE_functionDeclaration = 26;
	public static readonly RULE_operatorOverride = 27;
	public static readonly RULE_functionHead = 28;
	public static readonly RULE_codeBlock = 29;
	public static readonly RULE_stats = 30;
	public static readonly RULE_innerCodeBlock = 31;
	public static readonly RULE_gotoStatement = 32;
	public static readonly RULE_breakStatement = 33;
	public static readonly RULE_continueStatement = 34;
	public static readonly RULE_labelStatement = 35;
	public static readonly RULE_switchStatement = 36;
	public static readonly RULE_throwStatement = 37;
	public static readonly RULE_forInStatement = 38;
	public static readonly RULE_forEachStatement = 39;
	public static readonly RULE_returnStatement = 40;
	public static readonly RULE_doWhileStatement = 41;
	public static readonly RULE_whileStatement = 42;
	public static readonly RULE_forStatement = 43;
	public static readonly RULE_tryCatchStatement = 44;
	public static readonly RULE_callStatement = 45;
	public static readonly RULE_emptyStatement = 46;
	public static readonly RULE_sayStatement = 47;
	public static readonly RULE_assignmentStatement = 48;
	public static readonly RULE_ifStatement = 49;
	public static readonly RULE_enclosedExprCodeBlock = 50;
	public static readonly RULE_expr = 51;
	public static readonly RULE_primary = 52;
	public static readonly RULE_identifierAtom = 53;
	public static readonly RULE_params = 54;
	public static readonly RULE_optionallyTypedOptionalId = 55;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "directive", "pragmaDirective", "grammarRules", "itemList", 
		"qualifiers", "item", "templateDeclaration", "enumDeclaration", "propertyDeclaration", 
		"dictionaryDeclaration", "exportDeclaration", "intrinsicDeclaration", 
		"intrinsicMethodDeclaration", "objectDeclaration", "grammarDeclaration", 
		"templateExpr", "array", "curlyObjectBody", "semiColonEndedObjectBody", 
		"superTypes", "objectBody", "property", "dictionaryProperty", "propertySet", 
		"paramsWithWildcard", "functionDeclaration", "operatorOverride", "functionHead", 
		"codeBlock", "stats", "innerCodeBlock", "gotoStatement", "breakStatement", 
		"continueStatement", "labelStatement", "switchStatement", "throwStatement", 
		"forInStatement", "forEachStatement", "returnStatement", "doWhileStatement", 
		"whileStatement", "forStatement", "tryCatchStatement", "callStatement", 
		"emptyStatement", "sayStatement", "assignmentStatement", "ifStatement", 
		"enclosedExprCodeBlock", "expr", "primary", "identifierAtom", "params", 
		"optionallyTypedOptionalId",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'grammar'", "'switch'", "'case'", "'default'", "'function'", 
		"'throw'", "'new'", "'template'", "'for'", "'try'", "'catch'", "'finally'", 
		"'enum'", "'class'", "'transient'", "'modify'", "'replace'", "'propertyset'", 
		"'if'", "'do'", "'while'", "'else'", "'local'", "'true'", "'nil'", "'intrinsic'", 
		"'inherited'", "'delegated'", "'property'", "'dictionary'", "'export'", 
		"'extern'", "'return'", "'static'", "'string'", "'foreach'", "'in'", "'...'", 
		"'..'", "'step'", "'not'", "'is'", "'break'", "'continue'", "'goto'", 
		"'token'", "'pragma'", "'operator'", "'@'", "'&'", "'#'", "'!'", "'?'", 
		"'??'", "'+'", "'/'", "'%'", "'-'", "'!='", "'=='", "'&&'", "'||'", "'->'", 
		"'~'", "'^'", undefined, "'='", undefined, undefined, undefined, "':'", 
		"','", "'.'", "'*'", "'|'", "';'", "'('", "')'", "'['", "']'", undefined, 
		undefined, undefined, "'{'", "'}'", "'<='", "'<<'", "'<'", "'>='", "'>'", 
		"'>>'", "'>>>'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "GRAMMAR", "SWITCH", "CASE", "DEFAULT", "FUNCTION", "THROW", 
		"NEW", "TEMPLATE", "FOR", "TRY", "CATCH", "FINALLY", "ENUM", "CLASS", 
		"TRANSIENT", "MODIFY", "REPLACE", "PROPERTYSET", "IF", "DO", "WHILE", 
		"ELSE", "LOCAL", "TRUE", "NIL", "INTRINSIC", "INHERITED", "DELEGATED", 
		"PROPERTY", "DICTIONARY", "EXPORT", "EXTERN", "RETURN", "STATIC", "STRING", 
		"FOREACH", "IN", "SPREAD", "RANGE", "STEP", "LITERAL_NOT", "IS", "BREAK", 
		"CONTINUE", "GOTO", "TOKEN", "PRAGMA", "OPERATOR", "AT", "AMP", "HASH", 
		"NOT", "OPTIONAL", "IFNIL", "PLUS", "DIV", "MOD", "MINUS", "NEQ", "EQ", 
		"AND", "OR", "ARROW", "TILDE", "POW", "ID", "ASSIGN", "NR", "HEX", "OCT", 
		"COLON", "COMMA", "DOT", "STAR", "BITWISE_OR", "SEMICOLON", "LEFT_PAREN", 
		"RIGHT_PAREN", "LEFT_BRACKET", "RIGHT_BRACKET", "DSTR", "SSTR", "RSTR", 
		"LEFT_CURLY", "RIGHT_CURLY", "LTEQ", "ARITHMETIC_LEFT", "LT", "GTEQ", 
		"GT", "ARITHMETIC_RIGHT", "LOGICAL_RIGHT_SHIFT", "COMMENT", "LINE_COMMENT", 
		"WS", "ANY",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(Tads3Parser._LITERAL_NAMES, Tads3Parser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return Tads3Parser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Tads3.g4"; }

	// @Override
	public get ruleNames(): string[] { return Tads3Parser.ruleNames; }

	// @Override
	public get serializedATN(): string { return Tads3Parser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(Tads3Parser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, Tads3Parser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 115;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.GRAMMAR) | (1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.ENUM) | (1 << Tads3Parser.CLASS) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.INTRINSIC) | (1 << Tads3Parser.PROPERTY) | (1 << Tads3Parser.DICTIONARY) | (1 << Tads3Parser.EXPORT))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.HASH - 32)) | (1 << (Tads3Parser.PLUS - 32)))) !== 0) || _la === Tads3Parser.ID || _la === Tads3Parser.SEMICOLON) {
				{
				{
				this.state = 112;
				_localctx._directive = this.directive();
				_localctx._directives.push(_localctx._directive);
				}
				}
				this.state = 117;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 118;
			this.match(Tads3Parser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public directive(): DirectiveContext {
		let _localctx: DirectiveContext = new DirectiveContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, Tads3Parser.RULE_directive);
		try {
			this.state = 131;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 120;
				this.enumDeclaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 121;
				this.templateDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 122;
				this.intrinsicDeclaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 123;
				this.exportDeclaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 124;
				this.objectDeclaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 125;
				this.propertyDeclaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 126;
				this.dictionaryDeclaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 127;
				this.functionDeclaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 128;
				this.grammarDeclaration();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 129;
				this.pragmaDirective();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 130;
				this.match(Tads3Parser.SEMICOLON);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pragmaDirective(): PragmaDirectiveContext {
		let _localctx: PragmaDirectiveContext = new PragmaDirectiveContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, Tads3Parser.RULE_pragmaDirective);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 133;
			this.match(Tads3Parser.HASH);
			this.state = 134;
			this.match(Tads3Parser.PRAGMA);
			this.state = 135;
			this.match(Tads3Parser.ID);
			this.state = 136;
			this.match(Tads3Parser.LEFT_PAREN);
			{
			this.state = 137;
			this.expr(0);
			}
			this.state = 138;
			this.match(Tads3Parser.RIGHT_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public grammarRules(): GrammarRulesContext {
		let _localctx: GrammarRulesContext = new GrammarRulesContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, Tads3Parser.RULE_grammarRules);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 140;
			this.itemList();
			this.state = 145;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.BITWISE_OR) {
				{
				{
				this.state = 141;
				this.match(Tads3Parser.BITWISE_OR);
				this.state = 142;
				this.itemList();
				}
				}
				this.state = 147;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public itemList(): ItemListContext {
		let _localctx: ItemListContext = new ItemListContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, Tads3Parser.RULE_itemList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				{
				this.state = 148;
				this.qualifiers();
				}
				break;
			}
			this.state = 154;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 151;
					this.item(0);
					}
					}
				}
				this.state = 156;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiers(): QualifiersContext {
		let _localctx: QualifiersContext = new QualifiersContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, Tads3Parser.RULE_qualifiers);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 157;
			this.match(Tads3Parser.LEFT_BRACKET);
			this.state = 158;
			this.identifierAtom();
			this.state = 159;
			this.match(Tads3Parser.NR);
			this.state = 160;
			this.match(Tads3Parser.RIGHT_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public item(): ItemContext;
	public item(_p: number): ItemContext;
	// @RuleVersion(0)
	public item(_p?: number): ItemContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ItemContext = new ItemContext(this._ctx, _parentState);
		let _prevctx: ItemContext = _localctx;
		let _startState: number = 12;
		this.enterRecursionRule(_localctx, 12, Tads3Parser.RULE_item, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 175;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 163;
				this.match(Tads3Parser.LEFT_PAREN);
				this.state = 165;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 164;
					this.item(0);
					}
					}
					this.state = 167;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.BITWISE_OR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0));
				this.state = 169;
				this.match(Tads3Parser.RIGHT_PAREN);
				}
				break;

			case 2:
				{
				this.state = 171;
				this.match(Tads3Parser.BITWISE_OR);
				this.state = 172;
				this.item(3);
				}
				break;

			case 3:
				{
				this.state = 173;
				this.expr(0);
				}
				break;

			case 4:
				{
				this.state = 174;
				this.match(Tads3Parser.STAR);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 181;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new ItemContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_item);
					this.state = 177;
					if (!(this.precpred(this._ctx, 4))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
					}
					this.state = 178;
					this.match(Tads3Parser.BITWISE_OR);
					}
					}
				}
				this.state = 183;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public templateDeclaration(): TemplateDeclarationContext {
		let _localctx: TemplateDeclarationContext = new TemplateDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, Tads3Parser.RULE_templateDeclaration);
		let _la: number;
		try {
			this.state = 212;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 184;
				_localctx._className = this.identifierAtom();
				this.state = 185;
				this.match(Tads3Parser.TEMPLATE);
				this.state = 190;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 186;
					_localctx._expr = this.expr(0);
					_localctx._properties.push(_localctx._expr);
					this.state = 188;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === Tads3Parser.OPTIONAL) {
						{
						this.state = 187;
						_localctx._OPTIONAL = this.match(Tads3Parser.OPTIONAL);
						_localctx._isOptional.push(_localctx._OPTIONAL);
						}
					}

					}
					}
					this.state = 192;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0));
				this.state = 194;
				this.match(Tads3Parser.SEMICOLON);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 196;
				this.match(Tads3Parser.STRING);
				this.state = 197;
				this.match(Tads3Parser.TEMPLATE);
				this.state = 198;
				this.match(Tads3Parser.ARITHMETIC_LEFT);
				this.state = 205;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.STEP - 35)) | (1 << (Tads3Parser.IS - 35)) | (1 << (Tads3Parser.OPERATOR - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0) || _la === Tads3Parser.STAR) {
					{
					this.state = 203;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
					case 1:
						{
						this.state = 199;
						this.identifierAtom();
						}
						break;

					case 2:
						{
						this.state = 200;
						this.match(Tads3Parser.STAR);
						}
						break;

					case 3:
						{
						this.state = 201;
						this.match(Tads3Parser.IS);
						}
						break;

					case 4:
						{
						this.state = 202;
						this.match(Tads3Parser.IN);
						}
						break;
					}
					}
					this.state = 207;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 208;
				this.match(Tads3Parser.ARITHMETIC_RIGHT);
				this.state = 209;
				_localctx._templateId = this.identifierAtom();
				this.state = 210;
				this.match(Tads3Parser.SEMICOLON);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumDeclaration(): EnumDeclarationContext {
		let _localctx: EnumDeclarationContext = new EnumDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, Tads3Parser.RULE_enumDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 214;
			this.match(Tads3Parser.ENUM);
			this.state = 216;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.TOKEN) {
				{
				this.state = 215;
				_localctx._isToken = this.match(Tads3Parser.TOKEN);
				}
			}

			this.state = 218;
			this.identifierAtom();
			this.state = 223;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.COMMA) {
				{
				{
				this.state = 219;
				this.match(Tads3Parser.COMMA);
				this.state = 220;
				this.identifierAtom();
				}
				}
				this.state = 225;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 226;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public propertyDeclaration(): PropertyDeclarationContext {
		let _localctx: PropertyDeclarationContext = new PropertyDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, Tads3Parser.RULE_propertyDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 231;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.PLUS) {
				{
				{
				this.state = 228;
				_localctx._level = this.match(Tads3Parser.PLUS);
				}
				}
				this.state = 233;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 234;
			_localctx._isProperty = this.match(Tads3Parser.PROPERTY);
			this.state = 235;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._identifiers.push(_localctx._identifierAtom);
			this.state = 240;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.COMMA) {
				{
				{
				this.state = 236;
				this.match(Tads3Parser.COMMA);
				this.state = 237;
				_localctx._identifierAtom = this.identifierAtom();
				_localctx._identifiers.push(_localctx._identifierAtom);
				}
				}
				this.state = 242;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 243;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dictionaryDeclaration(): DictionaryDeclarationContext {
		let _localctx: DictionaryDeclarationContext = new DictionaryDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, Tads3Parser.RULE_dictionaryDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 248;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.PLUS) {
				{
				{
				this.state = 245;
				_localctx._level = this.match(Tads3Parser.PLUS);
				}
				}
				this.state = 250;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 251;
			this.match(Tads3Parser.DICTIONARY);
			this.state = 253;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.PROPERTY) {
				{
				this.state = 252;
				_localctx._isProperty = this.match(Tads3Parser.PROPERTY);
				}
			}

			this.state = 255;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._identifiers.push(_localctx._identifierAtom);
			this.state = 260;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.COMMA) {
				{
				{
				this.state = 256;
				this.match(Tads3Parser.COMMA);
				this.state = 257;
				_localctx._identifierAtom = this.identifierAtom();
				_localctx._identifiers.push(_localctx._identifierAtom);
				}
				}
				this.state = 262;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 263;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exportDeclaration(): ExportDeclarationContext {
		let _localctx: ExportDeclarationContext = new ExportDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, Tads3Parser.RULE_exportDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 265;
			this.match(Tads3Parser.EXPORT);
			this.state = 266;
			this.identifierAtom();
			this.state = 268;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.SSTR) {
				{
				this.state = 267;
				this.match(Tads3Parser.SSTR);
				}
			}

			this.state = 270;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public intrinsicDeclaration(): IntrinsicDeclarationContext {
		let _localctx: IntrinsicDeclarationContext = new IntrinsicDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, Tads3Parser.RULE_intrinsicDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 272;
			this.match(Tads3Parser.INTRINSIC);
			this.state = 274;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.CLASS) {
				{
				this.state = 273;
				this.match(Tads3Parser.CLASS);
				}
			}

			this.state = 277;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.STEP - 35)) | (1 << (Tads3Parser.IS - 35)) | (1 << (Tads3Parser.OPERATOR - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0)) {
				{
				this.state = 276;
				_localctx._name = this.identifierAtom();
				}
			}

			this.state = 280;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.DSTR || _la === Tads3Parser.SSTR) {
				{
				this.state = 279;
				_la = this._input.LA(1);
				if (!(_la === Tads3Parser.DSTR || _la === Tads3Parser.SSTR)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 284;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.COLON) {
				{
				this.state = 282;
				this.match(Tads3Parser.COLON);
				this.state = 283;
				this.superTypes();
				}
			}

			this.state = 286;
			this.match(Tads3Parser.LEFT_CURLY);
			this.state = 290;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (Tads3Parser.STATIC - 34)) | (1 << (Tads3Parser.STRING - 34)) | (1 << (Tads3Parser.IN - 34)) | (1 << (Tads3Parser.STEP - 34)) | (1 << (Tads3Parser.IS - 34)) | (1 << (Tads3Parser.OPERATOR - 34)))) !== 0) || _la === Tads3Parser.ID) {
				{
				{
				this.state = 287;
				_localctx._intrinsicMethodDeclaration = this.intrinsicMethodDeclaration();
				_localctx._methods.push(_localctx._intrinsicMethodDeclaration);
				}
				}
				this.state = 292;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 293;
			this.match(Tads3Parser.RIGHT_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public intrinsicMethodDeclaration(): IntrinsicMethodDeclarationContext {
		let _localctx: IntrinsicMethodDeclarationContext = new IntrinsicMethodDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, Tads3Parser.RULE_intrinsicMethodDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 296;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.STATIC) {
				{
				this.state = 295;
				this.match(Tads3Parser.STATIC);
				}
			}

			this.state = 298;
			this.identifierAtom();
			{
			this.state = 299;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 301;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 300;
				this.params();
				}
			}

			this.state = 303;
			this.match(Tads3Parser.RIGHT_PAREN);
			}
			this.state = 305;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public objectDeclaration(): ObjectDeclarationContext {
		let _localctx: ObjectDeclarationContext = new ObjectDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, Tads3Parser.RULE_objectDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 316;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				{
				this.state = 308;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.CLASS) {
					{
					this.state = 307;
					_localctx._isClass = this.match(Tads3Parser.CLASS);
					}
				}

				}
				break;

			case 2:
				{
				this.state = 311;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.MODIFY) {
					{
					this.state = 310;
					_localctx._isModify = this.match(Tads3Parser.MODIFY);
					}
				}

				}
				break;

			case 3:
				{
				this.state = 314;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.REPLACE) {
					{
					this.state = 313;
					_localctx._isReplace = this.match(Tads3Parser.REPLACE);
					}
				}

				}
				break;
			}
			this.state = 321;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.PLUS) {
				{
				{
				this.state = 318;
				_localctx._PLUS = this.match(Tads3Parser.PLUS);
				_localctx._level.push(_localctx._PLUS);
				}
				}
				this.state = 323;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 325;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.TRANSIENT) {
				{
				this.state = 324;
				_localctx._isTransient = this.match(Tads3Parser.TRANSIENT);
				}
			}

			this.state = 333;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				{
				this.state = 327;
				this.superTypes();
				}
				break;

			case 2:
				{
				{
				this.state = 328;
				_localctx._id = this.identifierAtom();
				this.state = 331;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.COLON) {
					{
					this.state = 329;
					this.match(Tads3Parser.COLON);
					this.state = 330;
					this.superTypes();
					}
				}

				}
				}
				break;
			}
			this.state = 337;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.LEFT_CURLY:
				{
				this.state = 335;
				this.curlyObjectBody();
				}
				break;
			case Tads3Parser.FUNCTION:
			case Tads3Parser.MODIFY:
			case Tads3Parser.REPLACE:
			case Tads3Parser.PROPERTYSET:
			case Tads3Parser.EXTERN:
			case Tads3Parser.STATIC:
			case Tads3Parser.STRING:
			case Tads3Parser.IN:
			case Tads3Parser.STEP:
			case Tads3Parser.IS:
			case Tads3Parser.OPERATOR:
			case Tads3Parser.AT:
			case Tads3Parser.AMP:
			case Tads3Parser.NOT:
			case Tads3Parser.PLUS:
			case Tads3Parser.DIV:
			case Tads3Parser.MOD:
			case Tads3Parser.MINUS:
			case Tads3Parser.ARROW:
			case Tads3Parser.TILDE:
			case Tads3Parser.ID:
			case Tads3Parser.STAR:
			case Tads3Parser.SEMICOLON:
			case Tads3Parser.LEFT_BRACKET:
			case Tads3Parser.DSTR:
			case Tads3Parser.SSTR:
			case Tads3Parser.RIGHT_CURLY:
				{
				this.state = 336;
				this.semiColonEndedObjectBody();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public grammarDeclaration(): GrammarDeclarationContext {
		let _localctx: GrammarDeclarationContext = new GrammarDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, Tads3Parser.RULE_grammarDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 341;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.MODIFY:
				{
				this.state = 339;
				_localctx._isModify = this.match(Tads3Parser.MODIFY);
				}
				break;
			case Tads3Parser.REPLACE:
				{
				this.state = 340;
				_localctx._isReplace = this.match(Tads3Parser.REPLACE);
				}
				break;
			case Tads3Parser.GRAMMAR:
				break;
			default:
				break;
			}
			this.state = 343;
			this.match(Tads3Parser.GRAMMAR);
			this.state = 344;
			_localctx._prodName = this.identifierAtom();
			this.state = 349;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.LEFT_PAREN) {
				{
				this.state = 345;
				this.match(Tads3Parser.LEFT_PAREN);
				this.state = 346;
				_localctx._tag = this.identifierAtom();
				this.state = 347;
				this.match(Tads3Parser.RIGHT_PAREN);
				}
			}

			this.state = 351;
			this.match(Tads3Parser.COLON);
			this.state = 352;
			this.grammarRules();
			this.state = 353;
			this.match(Tads3Parser.COLON);
			this.state = 359;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				{
				this.state = 354;
				this.superTypes();
				this.state = 357;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case Tads3Parser.LEFT_CURLY:
					{
					this.state = 355;
					this.curlyObjectBody();
					}
					break;
				case Tads3Parser.FUNCTION:
				case Tads3Parser.MODIFY:
				case Tads3Parser.REPLACE:
				case Tads3Parser.PROPERTYSET:
				case Tads3Parser.EXTERN:
				case Tads3Parser.STATIC:
				case Tads3Parser.STRING:
				case Tads3Parser.IN:
				case Tads3Parser.STEP:
				case Tads3Parser.IS:
				case Tads3Parser.OPERATOR:
				case Tads3Parser.AT:
				case Tads3Parser.AMP:
				case Tads3Parser.NOT:
				case Tads3Parser.PLUS:
				case Tads3Parser.DIV:
				case Tads3Parser.MOD:
				case Tads3Parser.MINUS:
				case Tads3Parser.ARROW:
				case Tads3Parser.TILDE:
				case Tads3Parser.ID:
				case Tads3Parser.STAR:
				case Tads3Parser.SEMICOLON:
				case Tads3Parser.LEFT_BRACKET:
				case Tads3Parser.DSTR:
				case Tads3Parser.SSTR:
				case Tads3Parser.RIGHT_CURLY:
					{
					this.state = 356;
					this.semiColonEndedObjectBody();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public templateExpr(): TemplateExprContext {
		let _localctx: TemplateExprContext = new TemplateExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, Tads3Parser.RULE_templateExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 385;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 45, this._ctx) ) {
			case 1:
				{
				this.state = 361;
				_localctx._singleString = this.match(Tads3Parser.SSTR);
				this.state = 363;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 41, this._ctx) ) {
				case 1:
					{
					this.state = 362;
					this.match(Tads3Parser.SEMICOLON);
					}
					break;
				}
				}
				break;

			case 2:
				{
				this.state = 365;
				this.match(Tads3Parser.AT);
				this.state = 366;
				_localctx._atLocation = this.expr(0);
				}
				break;

			case 3:
				{
				this.state = 367;
				_localctx._doubleString = this.match(Tads3Parser.DSTR);
				this.state = 369;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 42, this._ctx) ) {
				case 1:
					{
					this.state = 368;
					this.match(Tads3Parser.SEMICOLON);
					}
					break;
				}
				}
				break;

			case 4:
				{
				this.state = 371;
				this.match(Tads3Parser.ARROW);
				this.state = 374;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 43, this._ctx) ) {
				case 1:
					{
					this.state = 372;
					_localctx._connection = this.identifierAtom();
					}
					break;

				case 2:
					{
					this.state = 373;
					_localctx._expression = this.expr(0);
					}
					break;
				}
				}
				break;

			case 5:
				{
				this.state = 376;
				_localctx._op = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & ((1 << (Tads3Parser.AMP - 50)) | (1 << (Tads3Parser.NOT - 50)) | (1 << (Tads3Parser.PLUS - 50)) | (1 << (Tads3Parser.DIV - 50)) | (1 << (Tads3Parser.MOD - 50)) | (1 << (Tads3Parser.MINUS - 50)) | (1 << (Tads3Parser.ARROW - 50)) | (1 << (Tads3Parser.TILDE - 50)) | (1 << (Tads3Parser.STAR - 50)))) !== 0))) {
					_localctx._op = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 379;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
				case 1:
					{
					this.state = 377;
					_localctx._id = this.identifierAtom();
					}
					break;

				case 2:
					{
					this.state = 378;
					_localctx._expression = this.expr(0);
					}
					break;
				}
				}
				break;

			case 6:
				{
				this.state = 381;
				this.match(Tads3Parser.LEFT_BRACKET);
				this.state = 382;
				this.array();
				this.state = 383;
				this.match(Tads3Parser.RIGHT_BRACKET);
				}
				break;
			}
			this.state = 388;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.OPTIONAL) {
				{
				this.state = 387;
				this.match(Tads3Parser.OPTIONAL);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public array(): ArrayContext {
		let _localctx: ArrayContext = new ArrayContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, Tads3Parser.RULE_array);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 390;
			this.expr(0);
			this.state = 395;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 47, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 391;
					this.match(Tads3Parser.COMMA);
					this.state = 392;
					this.array();
					}
					}
				}
				this.state = 397;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 47, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public curlyObjectBody(): CurlyObjectBodyContext {
		let _localctx: CurlyObjectBodyContext = new CurlyObjectBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, Tads3Parser.RULE_curlyObjectBody);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 398;
			this.match(Tads3Parser.LEFT_CURLY);
			this.state = 399;
			this.objectBody();
			this.state = 400;
			this.match(Tads3Parser.RIGHT_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public semiColonEndedObjectBody(): SemiColonEndedObjectBodyContext {
		let _localctx: SemiColonEndedObjectBodyContext = new SemiColonEndedObjectBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, Tads3Parser.RULE_semiColonEndedObjectBody);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 402;
			this.objectBody();
			this.state = 403;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public superTypes(): SuperTypesContext {
		let _localctx: SuperTypesContext = new SuperTypesContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, Tads3Parser.RULE_superTypes);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 405;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._superType.push(_localctx._identifierAtom);
			this.state = 410;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 406;
					this.match(Tads3Parser.COMMA);
					this.state = 407;
					this.superTypes();
					}
					}
				}
				this.state = 412;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public objectBody(): ObjectBodyContext {
		let _localctx: ObjectBodyContext = new ObjectBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, Tads3Parser.RULE_objectBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 416;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & ((1 << (Tads3Parser.AT - 49)) | (1 << (Tads3Parser.AMP - 49)) | (1 << (Tads3Parser.NOT - 49)) | (1 << (Tads3Parser.PLUS - 49)) | (1 << (Tads3Parser.DIV - 49)) | (1 << (Tads3Parser.MOD - 49)) | (1 << (Tads3Parser.MINUS - 49)) | (1 << (Tads3Parser.ARROW - 49)) | (1 << (Tads3Parser.TILDE - 49)) | (1 << (Tads3Parser.STAR - 49)) | (1 << (Tads3Parser.LEFT_BRACKET - 49)))) !== 0) || _la === Tads3Parser.DSTR || _la === Tads3Parser.SSTR) {
				{
				{
				this.state = 413;
				_localctx._templateExpr = this.templateExpr();
				_localctx._template.push(_localctx._templateExpr);
				}
				}
				this.state = 418;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 424;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & ((1 << (Tads3Parser.FUNCTION - 5)) | (1 << (Tads3Parser.MODIFY - 5)) | (1 << (Tads3Parser.REPLACE - 5)) | (1 << (Tads3Parser.PROPERTYSET - 5)) | (1 << (Tads3Parser.EXTERN - 5)) | (1 << (Tads3Parser.STATIC - 5)) | (1 << (Tads3Parser.STRING - 5)))) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (Tads3Parser.IN - 37)) | (1 << (Tads3Parser.STEP - 37)) | (1 << (Tads3Parser.IS - 37)) | (1 << (Tads3Parser.OPERATOR - 37)) | (1 << (Tads3Parser.ID - 37)))) !== 0)) {
				{
				this.state = 422;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 50, this._ctx) ) {
				case 1:
					{
					this.state = 419;
					_localctx._functionDeclaration = this.functionDeclaration();
					_localctx._functions.push(_localctx._functionDeclaration);
					}
					break;

				case 2:
					{
					this.state = 420;
					_localctx._property = this.property();
					_localctx._properties.push(_localctx._property);
					}
					break;

				case 3:
					{
					this.state = 421;
					_localctx._propertySet = this.propertySet();
					_localctx._propertySets.push(_localctx._propertySet);
					}
					break;
				}
				}
				this.state = 426;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public property(): PropertyContext {
		let _localctx: PropertyContext = new PropertyContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, Tads3Parser.RULE_property);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 427;
			_localctx._id = this.identifierAtom();
			this.state = 454;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.ASSIGN:
				{
				this.state = 428;
				this.match(Tads3Parser.ASSIGN);
				this.state = 430;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 52, this._ctx) ) {
				case 1:
					{
					this.state = 429;
					this.match(Tads3Parser.STATIC);
					}
					break;
				}
				this.state = 434;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 53, this._ctx) ) {
				case 1:
					{
					this.state = 432;
					this.expr(0);
					}
					break;

				case 2:
					{
					this.state = 433;
					this.dictionaryProperty();
					}
					break;
				}
				this.state = 437;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 54, this._ctx) ) {
				case 1:
					{
					this.state = 436;
					this.match(Tads3Parser.SEMICOLON);
					}
					break;
				}
				}
				break;
			case Tads3Parser.COLON:
				{
				this.state = 439;
				this.match(Tads3Parser.COLON);
				this.state = 441;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.STEP - 35)) | (1 << (Tads3Parser.IS - 35)) | (1 << (Tads3Parser.OPERATOR - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0)) {
					{
					this.state = 440;
					_localctx._objectName = this.identifierAtom();
					}
				}

				this.state = 447;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === Tads3Parser.COMMA) {
					{
					{
					this.state = 443;
					this.match(Tads3Parser.COMMA);
					this.state = 444;
					this.superTypes();
					}
					}
					this.state = 449;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 450;
				this.curlyObjectBody();
				this.state = 452;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 57, this._ctx) ) {
				case 1:
					{
					this.state = 451;
					this.match(Tads3Parser.SEMICOLON);
					}
					break;
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dictionaryProperty(): DictionaryPropertyContext {
		let _localctx: DictionaryPropertyContext = new DictionaryPropertyContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, Tads3Parser.RULE_dictionaryProperty);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 459;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.SSTR) {
				{
				{
				this.state = 456;
				this.match(Tads3Parser.SSTR);
				}
				}
				this.state = 461;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public propertySet(): PropertySetContext {
		let _localctx: PropertySetContext = new PropertySetContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, Tads3Parser.RULE_propertySet);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 473;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 62, this._ctx) ) {
			case 1:
				{
				this.state = 462;
				this.match(Tads3Parser.PROPERTYSET);
				this.state = 463;
				this.paramsWithWildcard();
				}
				break;

			case 2:
				{
				this.state = 464;
				this.match(Tads3Parser.PROPERTYSET);
				this.state = 466;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.SSTR) {
					{
					this.state = 465;
					_localctx._prefix = this.match(Tads3Parser.SSTR);
					}
				}

				this.state = 468;
				this.match(Tads3Parser.LEFT_PAREN);
				this.state = 470;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 24)) & ~0x1F) === 0 && ((1 << (_la - 24)) & ((1 << (Tads3Parser.TRUE - 24)) | (1 << (Tads3Parser.NIL - 24)) | (1 << (Tads3Parser.INHERITED - 24)) | (1 << (Tads3Parser.STRING - 24)) | (1 << (Tads3Parser.IN - 24)) | (1 << (Tads3Parser.STEP - 24)) | (1 << (Tads3Parser.IS - 24)) | (1 << (Tads3Parser.OPERATOR - 24)) | (1 << (Tads3Parser.AMP - 24)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (Tads3Parser.ID - 66)) | (1 << (Tads3Parser.NR - 66)) | (1 << (Tads3Parser.HEX - 66)) | (1 << (Tads3Parser.STAR - 66)) | (1 << (Tads3Parser.DSTR - 66)) | (1 << (Tads3Parser.SSTR - 66)) | (1 << (Tads3Parser.RSTR - 66)))) !== 0)) {
					{
					this.state = 469;
					this.paramsWithWildcard();
					}
				}

				this.state = 472;
				this.match(Tads3Parser.RIGHT_PAREN);
				}
				break;
			}
			this.state = 475;
			this.curlyObjectBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paramsWithWildcard(): ParamsWithWildcardContext {
		let _localctx: ParamsWithWildcardContext = new ParamsWithWildcardContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, Tads3Parser.RULE_paramsWithWildcard);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 479;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.TRUE:
			case Tads3Parser.NIL:
			case Tads3Parser.INHERITED:
			case Tads3Parser.STRING:
			case Tads3Parser.IN:
			case Tads3Parser.STEP:
			case Tads3Parser.IS:
			case Tads3Parser.OPERATOR:
			case Tads3Parser.AMP:
			case Tads3Parser.ID:
			case Tads3Parser.NR:
			case Tads3Parser.HEX:
			case Tads3Parser.DSTR:
			case Tads3Parser.SSTR:
			case Tads3Parser.RSTR:
				{
				this.state = 477;
				_localctx._primary = this.primary();
				_localctx._parameters.push(_localctx._primary);
				}
				break;
			case Tads3Parser.STAR:
				{
				this.state = 478;
				this.match(Tads3Parser.STAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 485;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 64, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 481;
					this.match(Tads3Parser.COMMA);
					this.state = 482;
					this.paramsWithWildcard();
					}
					}
				}
				this.state = 487;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 64, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionDeclaration(): FunctionDeclarationContext {
		let _localctx: FunctionDeclarationContext = new FunctionDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, Tads3Parser.RULE_functionDeclaration);
		let _la: number;
		try {
			this.state = 500;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 68, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 494;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 67, this._ctx) ) {
				case 1:
					{
					this.state = 489;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === Tads3Parser.MODIFY) {
						{
						this.state = 488;
						_localctx._isModify = this.match(Tads3Parser.MODIFY);
						}
					}

					}
					break;

				case 2:
					{
					this.state = 492;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === Tads3Parser.REPLACE) {
						{
						this.state = 491;
						_localctx._isReplace = this.match(Tads3Parser.REPLACE);
						}
					}

					}
					break;
				}
				{
				this.state = 496;
				this.functionHead();
				this.state = 497;
				this.codeBlock();
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 499;
				this.operatorOverride();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorOverride(): OperatorOverrideContext {
		let _localctx: OperatorOverrideContext = new OperatorOverrideContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, Tads3Parser.RULE_operatorOverride);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 502;
			this.match(Tads3Parser.OPERATOR);
			this.state = 509;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.AMP:
			case Tads3Parser.PLUS:
			case Tads3Parser.DIV:
			case Tads3Parser.MOD:
			case Tads3Parser.MINUS:
			case Tads3Parser.TILDE:
			case Tads3Parser.POW:
			case Tads3Parser.STAR:
			case Tads3Parser.BITWISE_OR:
			case Tads3Parser.ARITHMETIC_LEFT:
			case Tads3Parser.ARITHMETIC_RIGHT:
			case Tads3Parser.LOGICAL_RIGHT_SHIFT:
				{
				this.state = 503;
				_la = this._input.LA(1);
				if (!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & ((1 << (Tads3Parser.AMP - 50)) | (1 << (Tads3Parser.PLUS - 50)) | (1 << (Tads3Parser.DIV - 50)) | (1 << (Tads3Parser.MOD - 50)) | (1 << (Tads3Parser.MINUS - 50)) | (1 << (Tads3Parser.TILDE - 50)) | (1 << (Tads3Parser.POW - 50)) | (1 << (Tads3Parser.STAR - 50)) | (1 << (Tads3Parser.BITWISE_OR - 50)))) !== 0) || ((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & ((1 << (Tads3Parser.ARITHMETIC_LEFT - 87)) | (1 << (Tads3Parser.ARITHMETIC_RIGHT - 87)) | (1 << (Tads3Parser.LOGICAL_RIGHT_SHIFT - 87)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			case Tads3Parser.LEFT_BRACKET:
				{
				{
				this.state = 504;
				this.match(Tads3Parser.LEFT_BRACKET);
				this.state = 505;
				this.match(Tads3Parser.RIGHT_BRACKET);
				this.state = 507;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.ASSIGN) {
					{
					this.state = 506;
					this.match(Tads3Parser.ASSIGN);
					}
				}

				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			{
			this.state = 511;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 512;
			this.params();
			this.state = 513;
			this.match(Tads3Parser.RIGHT_PAREN);
			}
			this.state = 515;
			this.match(Tads3Parser.LEFT_CURLY);
			this.state = 519;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.SWITCH) | (1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.THROW) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.FOR) | (1 << Tads3Parser.TRY) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.IF) | (1 << Tads3Parser.DO) | (1 << Tads3Parser.WHILE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.RETURN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.FOREACH - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.BREAK - 32)) | (1 << (Tads3Parser.CONTINUE - 32)) | (1 << (Tads3Parser.GOTO - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.SEMICOLON - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				{
				this.state = 516;
				this.stats();
				}
				}
				this.state = 521;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 522;
			this.match(Tads3Parser.RIGHT_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionHead(): FunctionHeadContext {
		let _localctx: FunctionHeadContext = new FunctionHeadContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, Tads3Parser.RULE_functionHead);
		let _la: number;
		try {
			this.state = 549;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 79, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 525;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.EXTERN) {
					{
					this.state = 524;
					_localctx._isExtern = this.match(Tads3Parser.EXTERN);
					}
				}

				this.state = 528;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.STATIC) {
					{
					this.state = 527;
					_localctx._isStatic = this.match(Tads3Parser.STATIC);
					}
				}

				this.state = 531;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.FUNCTION) {
					{
					this.state = 530;
					this.match(Tads3Parser.FUNCTION);
					}
				}

				this.state = 533;
				this.identifierAtom();
				this.state = 539;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 76, this._ctx) ) {
				case 1:
					{
					this.state = 534;
					this.match(Tads3Parser.LEFT_PAREN);
					this.state = 536;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
						{
						this.state = 535;
						this.params();
						}
					}

					this.state = 538;
					this.match(Tads3Parser.RIGHT_PAREN);
					}
					break;
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 541;
				this.match(Tads3Parser.FUNCTION);
				this.state = 547;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 78, this._ctx) ) {
				case 1:
					{
					this.state = 542;
					this.match(Tads3Parser.LEFT_PAREN);
					this.state = 544;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
						{
						this.state = 543;
						this.params();
						}
					}

					this.state = 546;
					this.match(Tads3Parser.RIGHT_PAREN);
					}
					break;
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public codeBlock(): CodeBlockContext {
		let _localctx: CodeBlockContext = new CodeBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, Tads3Parser.RULE_codeBlock);
		let _la: number;
		try {
			this.state = 560;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 81, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 551;
				this.match(Tads3Parser.LEFT_CURLY);
				this.state = 555;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.SWITCH) | (1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.THROW) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.FOR) | (1 << Tads3Parser.TRY) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.IF) | (1 << Tads3Parser.DO) | (1 << Tads3Parser.WHILE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.RETURN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.FOREACH - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.BREAK - 32)) | (1 << (Tads3Parser.CONTINUE - 32)) | (1 << (Tads3Parser.GOTO - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.SEMICOLON - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					{
					this.state = 552;
					this.stats();
					}
					}
					this.state = 557;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 558;
				this.match(Tads3Parser.RIGHT_CURLY);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 559;
				this.stats();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stats(): StatsContext {
		let _localctx: StatsContext = new StatsContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, Tads3Parser.RULE_stats);
		try {
			this.state = 580;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 82, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 562;
				this.assignmentStatement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 563;
				this.ifStatement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 564;
				this.tryCatchStatement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 565;
				this.forStatement();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 566;
				this.doWhileStatement();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 567;
				this.whileStatement();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 568;
				this.switchStatement();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 569;
				this.forInStatement();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 570;
				this.forEachStatement();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 571;
				this.sayStatement();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 572;
				this.emptyStatement();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 573;
				this.returnStatement();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 574;
				this.throwStatement();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 575;
				this.labelStatement();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 576;
				this.breakStatement();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 577;
				this.continueStatement();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 578;
				this.gotoStatement();
				}
				break;

			case 18:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 579;
				this.innerCodeBlock();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public innerCodeBlock(): InnerCodeBlockContext {
		let _localctx: InnerCodeBlockContext = new InnerCodeBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, Tads3Parser.RULE_innerCodeBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 582;
			this.match(Tads3Parser.LEFT_CURLY);
			this.state = 586;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.SWITCH) | (1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.THROW) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.FOR) | (1 << Tads3Parser.TRY) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.IF) | (1 << Tads3Parser.DO) | (1 << Tads3Parser.WHILE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.RETURN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.FOREACH - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.BREAK - 32)) | (1 << (Tads3Parser.CONTINUE - 32)) | (1 << (Tads3Parser.GOTO - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.SEMICOLON - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				{
				this.state = 583;
				this.stats();
				}
				}
				this.state = 588;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 589;
			this.match(Tads3Parser.RIGHT_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public gotoStatement(): GotoStatementContext {
		let _localctx: GotoStatementContext = new GotoStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, Tads3Parser.RULE_gotoStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 591;
			this.match(Tads3Parser.GOTO);
			this.state = 593;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.STEP - 35)) | (1 << (Tads3Parser.IS - 35)) | (1 << (Tads3Parser.OPERATOR - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0)) {
				{
				this.state = 592;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 595;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public breakStatement(): BreakStatementContext {
		let _localctx: BreakStatementContext = new BreakStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, Tads3Parser.RULE_breakStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 597;
			this.match(Tads3Parser.BREAK);
			this.state = 599;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.STEP - 35)) | (1 << (Tads3Parser.IS - 35)) | (1 << (Tads3Parser.OPERATOR - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0)) {
				{
				this.state = 598;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 601;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public continueStatement(): ContinueStatementContext {
		let _localctx: ContinueStatementContext = new ContinueStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, Tads3Parser.RULE_continueStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 603;
			this.match(Tads3Parser.CONTINUE);
			this.state = 605;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.STEP - 35)) | (1 << (Tads3Parser.IS - 35)) | (1 << (Tads3Parser.OPERATOR - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0)) {
				{
				this.state = 604;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 607;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public labelStatement(): LabelStatementContext {
		let _localctx: LabelStatementContext = new LabelStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, Tads3Parser.RULE_labelStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 609;
			this.identifierAtom();
			this.state = 610;
			this.match(Tads3Parser.COLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public switchStatement(): SwitchStatementContext {
		let _localctx: SwitchStatementContext = new SwitchStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, Tads3Parser.RULE_switchStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 612;
			this.match(Tads3Parser.SWITCH);
			this.state = 613;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 614;
			this.expr(0);
			this.state = 615;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 616;
			this.match(Tads3Parser.LEFT_CURLY);
			this.state = 634;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.CASE || _la === Tads3Parser.DEFAULT) {
				{
				{
				this.state = 620;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case Tads3Parser.CASE:
					{
					{
					this.state = 617;
					this.match(Tads3Parser.CASE);
					this.state = 618;
					this.expr(0);
					}
					}
					break;
				case Tads3Parser.DEFAULT:
					{
					this.state = 619;
					this.match(Tads3Parser.DEFAULT);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 622;
				this.match(Tads3Parser.COLON);
				this.state = 630;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 89, this._ctx) ) {
				case 1:
					{
					this.state = 623;
					this.codeBlock();
					}
					break;

				case 2:
					{
					this.state = 627;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.SWITCH) | (1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.THROW) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.FOR) | (1 << Tads3Parser.TRY) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.IF) | (1 << Tads3Parser.DO) | (1 << Tads3Parser.WHILE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.RETURN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.FOREACH - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.BREAK - 32)) | (1 << (Tads3Parser.CONTINUE - 32)) | (1 << (Tads3Parser.GOTO - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.SEMICOLON - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
						{
						{
						this.state = 624;
						this.stats();
						}
						}
						this.state = 629;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
					break;
				}
				}
				}
				this.state = 636;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 637;
			this.match(Tads3Parser.RIGHT_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public throwStatement(): ThrowStatementContext {
		let _localctx: ThrowStatementContext = new ThrowStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, Tads3Parser.RULE_throwStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 639;
			this.match(Tads3Parser.THROW);
			this.state = 640;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forInStatement(): ForInStatementContext {
		let _localctx: ForInStatementContext = new ForInStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, Tads3Parser.RULE_forInStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 642;
			this.match(Tads3Parser.FOR);
			this.state = 643;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 644;
			this.match(Tads3Parser.LOCAL);
			this.state = 645;
			this.match(Tads3Parser.ID);
			this.state = 646;
			this.match(Tads3Parser.IN);
			this.state = 647;
			this.expr(0);
			this.state = 648;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 649;
			this.codeBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forEachStatement(): ForEachStatementContext {
		let _localctx: ForEachStatementContext = new ForEachStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, Tads3Parser.RULE_forEachStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 651;
			this.match(Tads3Parser.FOREACH);
			this.state = 652;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 653;
			this.expr(0);
			this.state = 654;
			this.match(Tads3Parser.IN);
			this.state = 655;
			this.expr(0);
			this.state = 656;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 657;
			this.codeBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public returnStatement(): ReturnStatementContext {
		let _localctx: ReturnStatementContext = new ReturnStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, Tads3Parser.RULE_returnStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 659;
			this.match(Tads3Parser.RETURN);
			this.state = 661;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 660;
				this.expr(0);
				}
			}

			this.state = 663;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public doWhileStatement(): DoWhileStatementContext {
		let _localctx: DoWhileStatementContext = new DoWhileStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, Tads3Parser.RULE_doWhileStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 665;
			this.match(Tads3Parser.DO);
			this.state = 666;
			this.codeBlock();
			this.state = 667;
			this.match(Tads3Parser.WHILE);
			this.state = 668;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 670;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 669;
				this.expr(0);
				}
			}

			this.state = 672;
			this.match(Tads3Parser.RIGHT_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whileStatement(): WhileStatementContext {
		let _localctx: WhileStatementContext = new WhileStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, Tads3Parser.RULE_whileStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 674;
			this.match(Tads3Parser.WHILE);
			this.state = 675;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 677;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 676;
				this.expr(0);
				}
			}

			this.state = 679;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 680;
			this.codeBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forStatement(): ForStatementContext {
		let _localctx: ForStatementContext = new ForStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, Tads3Parser.RULE_forStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 682;
			this.match(Tads3Parser.FOR);
			this.state = 683;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 685;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 684;
				this.expr(0);
				}
			}

			this.state = 687;
			this.match(Tads3Parser.SEMICOLON);
			this.state = 689;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 688;
				this.expr(0);
				}
			}

			this.state = 691;
			this.match(Tads3Parser.SEMICOLON);
			this.state = 693;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 692;
				this.expr(0);
				}
			}

			this.state = 695;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 696;
			this.codeBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tryCatchStatement(): TryCatchStatementContext {
		let _localctx: TryCatchStatementContext = new TryCatchStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, Tads3Parser.RULE_tryCatchStatement);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 698;
			this.match(Tads3Parser.TRY);
			this.state = 699;
			this.codeBlock();
			this.state = 709;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 98, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 700;
					this.match(Tads3Parser.CATCH);
					this.state = 701;
					this.match(Tads3Parser.LEFT_PAREN);
					this.state = 703;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
						{
						this.state = 702;
						this.params();
						}
					}

					this.state = 705;
					this.match(Tads3Parser.RIGHT_PAREN);
					this.state = 706;
					this.codeBlock();
					}
					}
				}
				this.state = 711;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 98, this._ctx);
			}
			this.state = 714;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 99, this._ctx) ) {
			case 1:
				{
				this.state = 712;
				this.match(Tads3Parser.FINALLY);
				this.state = 713;
				this.codeBlock();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public callStatement(): CallStatementContext {
		let _localctx: CallStatementContext = new CallStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, Tads3Parser.RULE_callStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 716;
			this.expr(0);
			this.state = 719;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 100, this._ctx) ) {
			case 1:
				{
				this.state = 717;
				this.match(Tads3Parser.DOT);
				this.state = 718;
				this.callStatement();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public emptyStatement(): EmptyStatementContext {
		let _localctx: EmptyStatementContext = new EmptyStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, Tads3Parser.RULE_emptyStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 722;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 721;
				this.expr(0);
				}
			}

			this.state = 724;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sayStatement(): SayStatementContext {
		let _localctx: SayStatementContext = new SayStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, Tads3Parser.RULE_sayStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 726;
			this.match(Tads3Parser.DSTR);
			this.state = 727;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignmentStatement(): AssignmentStatementContext {
		let _localctx: AssignmentStatementContext = new AssignmentStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, Tads3Parser.RULE_assignmentStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 729;
			this.match(Tads3Parser.LOCAL);
			this.state = 730;
			this.identifierAtom();
			this.state = 733;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.ASSIGN) {
				{
				this.state = 731;
				this.match(Tads3Parser.ASSIGN);
				this.state = 732;
				this.expr(0);
				}
			}

			this.state = 735;
			this.match(Tads3Parser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifStatement(): IfStatementContext {
		let _localctx: IfStatementContext = new IfStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, Tads3Parser.RULE_ifStatement);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 737;
			this.match(Tads3Parser.IF);
			this.state = 738;
			_localctx._ifExprAndBlock = this.enclosedExprCodeBlock();
			this.state = 744;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 103, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 739;
					this.match(Tads3Parser.ELSE);
					this.state = 740;
					this.match(Tads3Parser.IF);
					this.state = 741;
					_localctx._elseIfExprAndBlock = this.enclosedExprCodeBlock();
					}
					}
				}
				this.state = 746;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 103, this._ctx);
			}
			this.state = 749;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 104, this._ctx) ) {
			case 1:
				{
				this.state = 747;
				this.match(Tads3Parser.ELSE);
				this.state = 748;
				_localctx._elseBlock = this.codeBlock();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enclosedExprCodeBlock(): EnclosedExprCodeBlockContext {
		let _localctx: EnclosedExprCodeBlockContext = new EnclosedExprCodeBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, Tads3Parser.RULE_enclosedExprCodeBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 751;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 752;
			_localctx._expression = this.expr(0);
			this.state = 753;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 754;
			this.codeBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
		let _prevctx: ExprContext = _localctx;
		let _startState: number = 102;
		this.enterRecursionRule(_localctx, 102, Tads3Parser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 799;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 109, this._ctx) ) {
			case 1:
				{
				_localctx = new ArrayExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 757;
				this.match(Tads3Parser.LEFT_BRACKET);
				this.state = 759;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 758;
					this.expr(0);
					}
				}

				this.state = 761;
				this.match(Tads3Parser.RIGHT_BRACKET);
				}
				break;

			case 2:
				{
				_localctx = new DelegatedExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 762;
				this.match(Tads3Parser.DELEGATED);
				this.state = 763;
				this.expr(36);
				}
				break;

			case 3:
				{
				_localctx = new InheritedExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 764;
				this.match(Tads3Parser.INHERITED);
				this.state = 765;
				this.expr(35);
				}
				break;

			case 4:
				{
				_localctx = new TransientExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 766;
				this.match(Tads3Parser.TRANSIENT);
				this.state = 767;
				this.expr(34);
				}
				break;

			case 5:
				{
				_localctx = new PrimaryExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 768;
				this.primary();
				}
				break;

			case 6:
				{
				_localctx = new ExprWithAnonymousObjectExpr2Context(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 769;
				this.match(Tads3Parser.ID);
				this.state = 770;
				this.curlyObjectBody();
				}
				break;

			case 7:
				{
				_localctx = new ParenExpr2Context(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 771;
				this.match(Tads3Parser.LEFT_PAREN);
				this.state = 773;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 772;
					this.expr(0);
					}
				}

				this.state = 775;
				this.match(Tads3Parser.RIGHT_PAREN);
				}
				break;

			case 8:
				{
				_localctx = new LocalExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 776;
				this.match(Tads3Parser.LOCAL);
				this.state = 777;
				this.expr(26);
				}
				break;

			case 9:
				{
				_localctx = new StaticExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 778;
				this.match(Tads3Parser.STATIC);
				this.state = 779;
				this.expr(25);
				}
				break;

			case 10:
				{
				_localctx = new NewExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 780;
				this.match(Tads3Parser.NEW);
				this.state = 781;
				this.expr(24);
				}
				break;

			case 11:
				{
				_localctx = new AnonymousObjectExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 782;
				this.match(Tads3Parser.LEFT_CURLY);
				this.state = 784;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 783;
					this.params();
					}
				}

				this.state = 786;
				this.match(Tads3Parser.COLON);
				this.state = 788;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 787;
					this.expr(0);
					}
				}

				this.state = 790;
				this.match(Tads3Parser.RIGHT_CURLY);
				}
				break;

			case 12:
				{
				_localctx = new ArrowExpr2Context(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				{
				this.state = 791;
				this.match(Tads3Parser.ARROW);
				}
				this.state = 792;
				this.expr(11);
				}
				break;

			case 13:
				{
				_localctx = new ArrowExpr3Context(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 793;
				this.match(Tads3Parser.STAR);
				this.state = 794;
				this.match(Tads3Parser.ARROW);
				this.state = 795;
				this.expr(10);
				}
				break;

			case 14:
				{
				_localctx = new UnaryExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 796;
				_la = this._input.LA(1);
				if (!(((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & ((1 << (Tads3Parser.AT - 49)) | (1 << (Tads3Parser.AMP - 49)) | (1 << (Tads3Parser.NOT - 49)) | (1 << (Tads3Parser.PLUS - 49)) | (1 << (Tads3Parser.MINUS - 49)) | (1 << (Tads3Parser.TILDE - 49)) | (1 << (Tads3Parser.STAR - 49)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 797;
				this.expr(4);
				}
				break;

			case 15:
				{
				_localctx = new AnonymousFunctionExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 798;
				this.functionDeclaration();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 930;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 123, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 928;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 122, this._ctx) ) {
					case 1:
						{
						_localctx = new MemberExprContext(new ExprContext(_parentctx, _parentState));
						(_localctx as MemberExprContext)._prev = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 801;
						if (!(this.precpred(this._ctx, 40))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 40)");
						}
						this.state = 802;
						this.match(Tads3Parser.DOT);
						this.state = 803;
						(_localctx as MemberExprContext)._next = this.expr(41);
						}
						break;

					case 2:
						{
						_localctx = new CommaExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 804;
						if (!(this.precpred(this._ctx, 38))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 38)");
						}
						this.state = 805;
						this.match(Tads3Parser.COMMA);
						this.state = 806;
						this.expr(39);
						}
						break;

					case 3:
						{
						_localctx = new ReferenceExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 807;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 808;
						this.match(Tads3Parser.AMP);
						this.state = 809;
						this.expr(24);
						}
						break;

					case 4:
						{
						_localctx = new NotInExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 810;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 811;
						this.match(Tads3Parser.LITERAL_NOT);
						this.state = 812;
						this.match(Tads3Parser.IN);
						this.state = 813;
						this.expr(23);
						}
						break;

					case 5:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 814;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 815;
						this.match(Tads3Parser.IS);
						this.state = 816;
						this.match(Tads3Parser.IN);
						this.state = 817;
						this.expr(22);
						}
						break;

					case 6:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 818;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 819;
						this.match(Tads3Parser.IS);
						this.state = 820;
						this.expr(21);
						}
						break;

					case 7:
						{
						_localctx = new InExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 821;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 822;
						this.match(Tads3Parser.IN);
						this.state = 823;
						this.expr(20);
						}
						break;

					case 8:
						{
						_localctx = new AssignmentExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 824;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 825;
						this.match(Tads3Parser.ASSIGN);
						this.state = 826;
						this.expr(19);
						}
						break;

					case 9:
						{
						_localctx = new IfNilExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 827;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 828;
						this.match(Tads3Parser.IFNIL);
						this.state = 829;
						this.expr(18);
						}
						break;

					case 10:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 830;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 831;
						_la = this._input.LA(1);
						if (!(_la === Tads3Parser.AMP || _la === Tads3Parser.BITWISE_OR)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 833;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads3Parser.ASSIGN) {
							{
							this.state = 832;
							this.match(Tads3Parser.ASSIGN);
							}
						}

						this.state = 835;
						this.expr(16);
						}
						break;

					case 11:
						{
						_localctx = new AndOrExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 836;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 837;
						(_localctx as AndOrExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === Tads3Parser.AND || _la === Tads3Parser.OR)) {
							(_localctx as AndOrExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 838;
						this.expr(15);
						}
						break;

					case 12:
						{
						_localctx = new PowerOfExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 839;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						{
						this.state = 840;
						this.match(Tads3Parser.POW);
						}
						this.state = 842;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads3Parser.ASSIGN) {
							{
							this.state = 841;
							(_localctx as PowerOfExprContext)._isInc = this.match(Tads3Parser.ASSIGN);
							}
						}

						this.state = 844;
						this.expr(14);
						}
						break;

					case 13:
						{
						_localctx = new ArrowExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 845;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						{
						this.state = 846;
						this.match(Tads3Parser.ARROW);
						}
						this.state = 847;
						this.expr(13);
						}
						break;

					case 14:
						{
						_localctx = new MultiplicationExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 848;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 849;
						(_localctx as MultiplicationExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & ((1 << (Tads3Parser.DIV - 56)) | (1 << (Tads3Parser.MOD - 56)) | (1 << (Tads3Parser.STAR - 56)))) !== 0))) {
							(_localctx as MultiplicationExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 851;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads3Parser.ASSIGN) {
							{
							this.state = 850;
							(_localctx as MultiplicationExprContext)._isInc = this.match(Tads3Parser.ASSIGN);
							}
						}

						this.state = 853;
						this.expr(10);
						}
						break;

					case 15:
						{
						_localctx = new AdditiveExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 854;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 855;
						(_localctx as AdditiveExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === Tads3Parser.PLUS || _la === Tads3Parser.MINUS)) {
							(_localctx as AdditiveExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 857;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads3Parser.ASSIGN) {
							{
							this.state = 856;
							(_localctx as AdditiveExprContext)._isInc = this.match(Tads3Parser.ASSIGN);
							}
						}

						this.state = 859;
						this.expr(9);
						}
						break;

					case 16:
						{
						_localctx = new RelationalExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 860;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 861;
						(_localctx as RelationalExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & ((1 << (Tads3Parser.LTEQ - 86)) | (1 << (Tads3Parser.LT - 86)) | (1 << (Tads3Parser.GTEQ - 86)) | (1 << (Tads3Parser.GT - 86)))) !== 0))) {
							(_localctx as RelationalExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 862;
						this.expr(8);
						}
						break;

					case 17:
						{
						_localctx = new EqualityExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 863;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 864;
						(_localctx as EqualityExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === Tads3Parser.NEQ || _la === Tads3Parser.EQ)) {
							(_localctx as EqualityExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 865;
						this.expr(7);
						}
						break;

					case 18:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 866;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 867;
						(_localctx as BitwiseExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & ((1 << (Tads3Parser.ARITHMETIC_LEFT - 87)) | (1 << (Tads3Parser.ARITHMETIC_RIGHT - 87)) | (1 << (Tads3Parser.LOGICAL_RIGHT_SHIFT - 87)))) !== 0))) {
							(_localctx as BitwiseExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 869;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads3Parser.ASSIGN) {
							{
							this.state = 868;
							(_localctx as BitwiseExprContext)._isInc = this.match(Tads3Parser.ASSIGN);
							}
						}

						this.state = 871;
						this.expr(6);
						}
						break;

					case 19:
						{
						_localctx = new TernaryExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 872;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 873;
						this.match(Tads3Parser.OPTIONAL);
						this.state = 874;
						this.expr(0);
						this.state = 875;
						this.match(Tads3Parser.COLON);
						this.state = 876;
						this.expr(3);
						}
						break;

					case 20:
						{
						_localctx = new IndexExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 878;
						if (!(this.precpred(this._ctx, 39))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 39)");
						}
						this.state = 879;
						this.match(Tads3Parser.LEFT_BRACKET);
						this.state = 881;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
							{
							this.state = 880;
							this.expr(0);
							}
						}

						this.state = 883;
						this.match(Tads3Parser.RIGHT_BRACKET);
						}
						break;

					case 21:
						{
						_localctx = new RangeExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 884;
						if (!(this.precpred(this._ctx, 37))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 37)");
						}
						this.state = 885;
						this.match(Tads3Parser.RANGE);
						this.state = 886;
						this.expr(0);
						this.state = 889;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 116, this._ctx) ) {
						case 1:
							{
							this.state = 887;
							(_localctx as RangeExprContext)._hasStep = this.match(Tads3Parser.STEP);
							this.state = 888;
							this.expr(0);
							}
							break;
						}
						}
						break;

					case 22:
						{
						_localctx = new CallWithParamsExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 891;
						if (!(this.precpred(this._ctx, 32))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 32)");
						}
						this.state = 892;
						this.match(Tads3Parser.LEFT_PAREN);
						this.state = 894;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						do {
							{
							{
							this.state = 893;
							this.params();
							}
							}
							this.state = 896;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0));
						this.state = 898;
						this.match(Tads3Parser.RIGHT_PAREN);
						}
						break;

					case 23:
						{
						_localctx = new ExprWithParenExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 900;
						if (!(this.precpred(this._ctx, 31))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 31)");
						}
						this.state = 901;
						this.match(Tads3Parser.LEFT_PAREN);
						this.state = 903;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
							{
							this.state = 902;
							this.expr(0);
							}
						}

						this.state = 905;
						this.match(Tads3Parser.RIGHT_PAREN);
						}
						break;

					case 24:
						{
						_localctx = new ExprWithAnonymousObjectExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 906;
						if (!(this.precpred(this._ctx, 29))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 29)");
						}
						this.state = 907;
						this.match(Tads3Parser.LEFT_CURLY);
						this.state = 909;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
							{
							this.state = 908;
							this.params();
							}
						}

						this.state = 911;
						this.match(Tads3Parser.COLON);
						this.state = 913;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.MODIFY) | (1 << Tads3Parser.REPLACE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.STEP - 32)) | (1 << (Tads3Parser.IS - 32)) | (1 << (Tads3Parser.OPERATOR - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.TILDE - 64)) | (1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
							{
							this.state = 912;
							this.expr(0);
							}
						}

						this.state = 915;
						this.match(Tads3Parser.RIGHT_CURLY);
						}
						break;

					case 25:
						{
						_localctx = new ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 916;
						if (!(this.precpred(this._ctx, 28))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 28)");
						}
						this.state = 917;
						this.match(Tads3Parser.COLON);
						this.state = 918;
						this.superTypes();
						this.state = 919;
						this.curlyObjectBody();
						}
						break;

					case 26:
						{
						_localctx = new PostFixExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 921;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 926;
						this._errHandler.sync(this);
						switch (this._input.LA(1)) {
						case Tads3Parser.PLUS:
							{
							this.state = 922;
							this.match(Tads3Parser.PLUS);
							this.state = 923;
							this.match(Tads3Parser.PLUS);
							}
							break;
						case Tads3Parser.MINUS:
							{
							this.state = 924;
							this.match(Tads3Parser.MINUS);
							this.state = 925;
							this.match(Tads3Parser.MINUS);
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						}
						break;
					}
					}
				}
				this.state = 932;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 123, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primary(): PrimaryContext {
		let _localctx: PrimaryContext = new PrimaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, Tads3Parser.RULE_primary);
		try {
			this.state = 944;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.INHERITED:
				_localctx = new InheritedAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 933;
				this.match(Tads3Parser.INHERITED);
				}
				break;
			case Tads3Parser.HEX:
				_localctx = new HexAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 934;
				this.match(Tads3Parser.HEX);
				}
				break;
			case Tads3Parser.NR:
				_localctx = new NumberAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 935;
				this.match(Tads3Parser.NR);
				}
				break;
			case Tads3Parser.AMP:
				_localctx = new ReferenceAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 936;
				this.match(Tads3Parser.AMP);
				this.state = 937;
				this.identifierAtom();
				}
				break;
			case Tads3Parser.STRING:
			case Tads3Parser.IN:
			case Tads3Parser.STEP:
			case Tads3Parser.IS:
			case Tads3Parser.OPERATOR:
			case Tads3Parser.ID:
				_localctx = new IdAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 938;
				this.identifierAtom();
				}
				break;
			case Tads3Parser.SSTR:
				_localctx = new DoubleQuotestringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 939;
				this.match(Tads3Parser.SSTR);
				}
				break;
			case Tads3Parser.DSTR:
				_localctx = new SingleQuotestringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 940;
				this.match(Tads3Parser.DSTR);
				}
				break;
			case Tads3Parser.RSTR:
				_localctx = new RegexpStringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 941;
				this.match(Tads3Parser.RSTR);
				}
				break;
			case Tads3Parser.TRUE:
				_localctx = new BooleanAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 942;
				this.match(Tads3Parser.TRUE);
				}
				break;
			case Tads3Parser.NIL:
				_localctx = new NilAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 943;
				this.match(Tads3Parser.NIL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifierAtom(): IdentifierAtomContext {
		let _localctx: IdentifierAtomContext = new IdentifierAtomContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, Tads3Parser.RULE_identifierAtom);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 946;
			_la = this._input.LA(1);
			if (!(((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.STEP - 35)) | (1 << (Tads3Parser.IS - 35)) | (1 << (Tads3Parser.OPERATOR - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public params(): ParamsContext {
		let _localctx: ParamsContext = new ParamsContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, Tads3Parser.RULE_params);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 951;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 125, this._ctx) ) {
			case 1:
				{
				this.state = 948;
				this.optionallyTypedOptionalId();
				}
				break;

			case 2:
				{
				this.state = 949;
				this.match(Tads3Parser.SPREAD);
				}
				break;

			case 3:
				{
				this.state = 950;
				this.array();
				}
				break;
			}
			this.state = 959;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 127, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 953;
					_localctx._hasMore = this.match(Tads3Parser.COMMA);
					this.state = 955;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 126, this._ctx) ) {
					case 1:
						{
						this.state = 954;
						_localctx._tail = this.params();
						}
						break;
					}
					}
					}
				}
				this.state = 961;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 127, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public optionallyTypedOptionalId(): OptionallyTypedOptionalIdContext {
		let _localctx: OptionallyTypedOptionalIdContext = new OptionallyTypedOptionalIdContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, Tads3Parser.RULE_optionallyTypedOptionalId);
		let _la: number;
		try {
			this.state = 985;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 133, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				{
				this.state = 965;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 128, this._ctx) ) {
				case 1:
					{
					this.state = 962;
					_localctx._identifier = this.identifierAtom();
					this.state = 963;
					this.match(Tads3Parser.COLON);
					}
					break;
				}
				this.state = 968;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 129, this._ctx) ) {
				case 1:
					{
					this.state = 967;
					_localctx._type = this.identifierAtom();
					}
					break;
				}
				{
				this.state = 970;
				_localctx._name = this.identifierAtom();
				}
				this.state = 972;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.OPTIONAL) {
					{
					this.state = 971;
					_localctx._optional = this.match(Tads3Parser.OPTIONAL);
					}
				}

				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				{
				this.state = 974;
				_localctx._identifier = this.identifierAtom();
				this.state = 975;
				_localctx._emptyColon = this.match(Tads3Parser.COLON);
				this.state = 977;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.OPTIONAL) {
					{
					this.state = 976;
					_localctx._optional = this.match(Tads3Parser.OPTIONAL);
					}
				}

				}
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				{
				this.state = 979;
				_localctx._identifier = this.identifierAtom();
				this.state = 980;
				_localctx._emptyColon = this.match(Tads3Parser.COLON);
				this.state = 981;
				_localctx._hasDefault = this.match(Tads3Parser.ASSIGN);
				this.state = 983;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 132, this._ctx) ) {
				case 1:
					{
					this.state = 982;
					_localctx._defaultValue = this.expr(0);
					}
					break;
				}
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 6:
			return this.item_sempred(_localctx as ItemContext, predIndex);

		case 51:
			return this.expr_sempred(_localctx as ExprContext, predIndex);
		}
		return true;
	}
	private item_sempred(_localctx: ItemContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 4);
		}
		return true;
	}
	private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return this.precpred(this._ctx, 40);

		case 2:
			return this.precpred(this._ctx, 38);

		case 3:
			return this.precpred(this._ctx, 23);

		case 4:
			return this.precpred(this._ctx, 22);

		case 5:
			return this.precpred(this._ctx, 21);

		case 6:
			return this.precpred(this._ctx, 20);

		case 7:
			return this.precpred(this._ctx, 19);

		case 8:
			return this.precpred(this._ctx, 18);

		case 9:
			return this.precpred(this._ctx, 17);

		case 10:
			return this.precpred(this._ctx, 15);

		case 11:
			return this.precpred(this._ctx, 14);

		case 12:
			return this.precpred(this._ctx, 13);

		case 13:
			return this.precpred(this._ctx, 12);

		case 14:
			return this.precpred(this._ctx, 9);

		case 15:
			return this.precpred(this._ctx, 8);

		case 16:
			return this.precpred(this._ctx, 7);

		case 17:
			return this.precpred(this._ctx, 6);

		case 18:
			return this.precpred(this._ctx, 5);

		case 19:
			return this.precpred(this._ctx, 2);

		case 20:
			return this.precpred(this._ctx, 39);

		case 21:
			return this.precpred(this._ctx, 37);

		case 22:
			return this.precpred(this._ctx, 32);

		case 23:
			return this.precpred(this._ctx, 31);

		case 24:
			return this.precpred(this._ctx, 29);

		case 25:
			return this.precpred(this._ctx, 28);

		case 26:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03b\u03DE\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x03\x02\x07\x02t\n\x02\f\x02" +
		"\x0E\x02w\v\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03\x86\n\x03\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03" +
		"\x05\x07\x05\x92\n\x05\f\x05\x0E\x05\x95\v\x05\x03\x06\x05\x06\x98\n\x06" +
		"\x03\x06\x07\x06\x9B\n\x06\f\x06\x0E\x06\x9E\v\x06\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x06\b\xA8\n\b\r\b\x0E\b\xA9\x03" +
		"\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05\b\xB2\n\b\x03\b\x03\b\x07\b\xB6\n" +
		"\b\f\b\x0E\b\xB9\v\b\x03\t\x03\t\x03\t\x03\t\x05\t\xBF\n\t\x06\t\xC1\n" +
		"\t\r\t\x0E\t\xC2\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t" +
		"\x07\t\xCE\n\t\f\t\x0E\t\xD1\v\t\x03\t\x03\t\x03\t\x03\t\x05\t\xD7\n\t" +
		"\x03\n\x03\n\x05\n\xDB\n\n\x03\n\x03\n\x03\n\x07\n\xE0\n\n\f\n\x0E\n\xE3" +
		"\v\n\x03\n\x03\n\x03\v\x07\v\xE8\n\v\f\v\x0E\v\xEB\v\v\x03\v\x03\v\x03" +
		"\v\x03\v\x07\v\xF1\n\v\f\v\x0E\v\xF4\v\v\x03\v\x03\v\x03\f\x07\f\xF9\n" +
		"\f\f\f\x0E\f\xFC\v\f\x03\f\x03\f\x05\f\u0100\n\f\x03\f\x03\f\x03\f\x07" +
		"\f\u0105\n\f\f\f\x0E\f\u0108\v\f\x03\f\x03\f\x03\r\x03\r\x03\r\x05\r\u010F" +
		"\n\r\x03\r\x03\r\x03\x0E\x03\x0E\x05\x0E\u0115\n\x0E\x03\x0E\x05\x0E\u0118" +
		"\n\x0E\x03\x0E\x05\x0E\u011B\n\x0E\x03\x0E\x03\x0E\x05\x0E\u011F\n\x0E" +
		"\x03\x0E\x03\x0E\x07\x0E\u0123\n\x0E\f\x0E\x0E\x0E\u0126\v\x0E\x03\x0E" +
		"\x03\x0E\x03\x0F\x05\x0F\u012B\n\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\u0130" +
		"\n\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x05\x10\u0137\n\x10\x03" +
		"\x10\x05\x10\u013A\n\x10\x03\x10\x05\x10\u013D\n\x10\x05\x10\u013F\n\x10" +
		"\x03\x10\x07\x10\u0142\n\x10\f\x10\x0E\x10\u0145\v\x10\x03\x10\x05\x10" +
		"\u0148\n\x10\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\u014E\n\x10\x05\x10" +
		"\u0150\n\x10\x03\x10\x03\x10\x05\x10\u0154\n\x10\x03\x11\x03\x11\x05\x11" +
		"\u0158\n\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\u0160" +
		"\n\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\u0168\n" +
		"\x11\x05\x11\u016A\n\x11\x03\x12\x03\x12\x05\x12\u016E\n\x12\x03\x12\x03" +
		"\x12\x03\x12\x03\x12\x05\x12\u0174\n\x12\x03\x12\x03\x12\x03\x12\x05\x12" +
		"\u0179\n\x12\x03\x12\x03\x12\x03\x12\x05\x12\u017E\n\x12\x03\x12\x03\x12" +
		"\x03\x12\x03\x12\x05\x12\u0184\n\x12\x03\x12\x05\x12\u0187\n\x12\x03\x13" +
		"\x03\x13\x03\x13\x07\x13\u018C\n\x13\f\x13\x0E\x13\u018F\v\x13\x03\x14" +
		"\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16" +
		"\x07\x16\u019B\n\x16\f\x16\x0E\x16\u019E\v\x16\x03\x17\x07\x17\u01A1\n" +
		"\x17\f\x17\x0E\x17\u01A4\v\x17\x03\x17\x03\x17\x03\x17\x07\x17\u01A9\n" +
		"\x17\f\x17\x0E\x17\u01AC\v\x17\x03\x18\x03\x18\x03\x18\x05\x18\u01B1\n" +
		"\x18\x03\x18\x03\x18\x05\x18\u01B5\n\x18\x03\x18\x05\x18\u01B8\n\x18\x03" +
		"\x18\x03\x18\x05\x18\u01BC\n\x18\x03\x18\x03\x18\x07\x18\u01C0\n\x18\f" +
		"\x18\x0E\x18\u01C3\v\x18\x03\x18\x03\x18\x05\x18\u01C7\n\x18\x05\x18\u01C9" +
		"\n\x18\x03\x19\x07\x19\u01CC\n\x19\f\x19\x0E\x19\u01CF\v\x19\x03\x1A\x03" +
		"\x1A\x03\x1A\x03\x1A\x05\x1A\u01D5\n\x1A\x03\x1A\x03\x1A\x05\x1A\u01D9" +
		"\n\x1A\x03\x1A\x05\x1A\u01DC\n\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x05" +
		"\x1B\u01E2\n\x1B\x03\x1B\x03\x1B\x07\x1B\u01E6\n\x1B\f\x1B\x0E\x1B\u01E9" +
		"\v\x1B\x03\x1C\x05\x1C\u01EC\n\x1C\x03\x1C\x05\x1C\u01EF\n\x1C\x05\x1C" +
		"\u01F1\n\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05\x1C\u01F7\n\x1C\x03\x1D" +
		"\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\u01FE\n\x1D\x05\x1D\u0200\n\x1D" +
		"\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x07\x1D\u0208\n\x1D\f" +
		"\x1D\x0E\x1D\u020B\v\x1D\x03\x1D\x03\x1D\x03\x1E\x05\x1E\u0210\n\x1E\x03" +
		"\x1E\x05\x1E\u0213\n\x1E\x03\x1E\x05\x1E\u0216\n\x1E\x03\x1E\x03\x1E\x03" +
		"\x1E\x05\x1E\u021B\n\x1E\x03\x1E\x05\x1E\u021E\n\x1E\x03\x1E\x03\x1E\x03" +
		"\x1E\x05\x1E\u0223\n\x1E\x03\x1E\x05\x1E\u0226\n\x1E\x05\x1E\u0228\n\x1E" +
		"\x03\x1F\x03\x1F\x07\x1F\u022C\n\x1F\f\x1F\x0E\x1F\u022F\v\x1F\x03\x1F" +
		"\x03\x1F\x05\x1F\u0233\n\x1F\x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03" +
		" \x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03 \x05 \u0247\n \x03!\x03" +
		"!\x07!\u024B\n!\f!\x0E!\u024E\v!\x03!\x03!\x03\"\x03\"\x05\"\u0254\n\"" +
		"\x03\"\x03\"\x03#\x03#\x05#\u025A\n#\x03#\x03#\x03$\x03$\x05$\u0260\n" +
		"$\x03$\x03$\x03%\x03%\x03%\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x05" +
		"&\u026F\n&\x03&\x03&\x03&\x07&\u0274\n&\f&\x0E&\u0277\v&\x05&\u0279\n" +
		"&\x07&\u027B\n&\f&\x0E&\u027E\v&\x03&\x03&\x03\'\x03\'\x03\'\x03(\x03" +
		"(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03)\x03)\x03)\x03)\x03)\x03)\x03" +
		")\x03)\x03*\x03*\x05*\u0298\n*\x03*\x03*\x03+\x03+\x03+\x03+\x03+\x05" +
		"+\u02A1\n+\x03+\x03+\x03,\x03,\x03,\x05,\u02A8\n,\x03,\x03,\x03,\x03-" +
		"\x03-\x03-\x05-\u02B0\n-\x03-\x03-\x05-\u02B4\n-\x03-\x03-\x05-\u02B8" +
		"\n-\x03-\x03-\x03-\x03.\x03.\x03.\x03.\x03.\x05.\u02C2\n.\x03.\x03.\x07" +
		".\u02C6\n.\f.\x0E.\u02C9\v.\x03.\x03.\x05.\u02CD\n.\x03/\x03/\x03/\x05" +
		"/\u02D2\n/\x030\x050\u02D5\n0\x030\x030\x031\x031\x031\x032\x032\x032" +
		"\x032\x052\u02E0\n2\x032\x032\x033\x033\x033\x033\x033\x073\u02E9\n3\f" +
		"3\x0E3\u02EC\v3\x033\x033\x053\u02F0\n3\x034\x034\x034\x034\x034\x035" +
		"\x035\x035\x055\u02FA\n5\x035\x035\x035\x035\x035\x035\x035\x035\x035" +
		"\x035\x035\x035\x055\u0308\n5\x035\x035\x035\x035\x035\x035\x035\x035" +
		"\x035\x055\u0313\n5\x035\x035\x055\u0317\n5\x035\x035\x035\x035\x035\x03" +
		"5\x035\x035\x035\x055\u0322\n5\x035\x035\x035\x035\x035\x035\x035\x03" +
		"5\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x03" +
		"5\x035\x035\x035\x035\x035\x035\x035\x035\x035\x035\x055\u0344\n5\x03" +
		"5\x035\x035\x035\x035\x035\x035\x055\u034D\n5\x035\x035\x035\x035\x03" +
		"5\x035\x035\x055\u0356\n5\x035\x035\x035\x035\x055\u035C\n5\x035\x035" +
		"\x035\x035\x035\x035\x035\x035\x035\x035\x055\u0368\n5\x035\x035\x035" +
		"\x035\x035\x035\x035\x035\x035\x035\x055\u0374\n5\x035\x035\x035\x035" +
		"\x035\x035\x055\u037C\n5\x035\x035\x035\x065\u0381\n5\r5\x0E5\u0382\x03" +
		"5\x035\x035\x035\x035\x055\u038A\n5\x035\x035\x035\x035\x055\u0390\n5" +
		"\x035\x035\x055\u0394\n5\x035\x035\x035\x035\x035\x035\x035\x035\x035" +
		"\x035\x035\x055\u03A1\n5\x075\u03A3\n5\f5\x0E5\u03A6\v5\x036\x036\x03" +
		"6\x036\x036\x036\x036\x036\x036\x036\x036\x056\u03B3\n6\x037\x037\x03" +
		"8\x038\x038\x058\u03BA\n8\x038\x038\x058\u03BE\n8\x078\u03C0\n8\f8\x0E" +
		"8\u03C3\v8\x039\x039\x039\x059\u03C8\n9\x039\x059\u03CB\n9\x039\x039\x05" +
		"9\u03CF\n9\x039\x039\x039\x059\u03D4\n9\x039\x039\x039\x039\x059\u03DA" +
		"\n9\x059\u03DC\n9\x039\x02\x02\x04\x0Eh:\x02\x02\x04\x02\x06\x02\b\x02" +
		"\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C" +
		"\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026" +
		"\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02" +
		"R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02" +
		"n\x02p\x02\x02\x0E\x03\x02ST\x07\x0244669<ABLL\b\x02449<BCLMYY]^\b\x02" +
		"346699<<BBLL\x04\x0244MM\x03\x02?@\x04\x02:;LL\x04\x0299<<\x04\x02XXZ" +
		"\\\x03\x02=>\x04\x02YY]^\b\x02%%\'\'**,,22DD\x02\u047E\x02u\x03\x02\x02" +
		"\x02\x04\x85\x03\x02\x02\x02\x06\x87\x03\x02\x02\x02\b\x8E\x03\x02\x02" +
		"\x02\n\x97\x03\x02\x02\x02\f\x9F\x03\x02\x02\x02\x0E\xB1\x03\x02\x02\x02" +
		"\x10\xD6\x03\x02\x02\x02\x12\xD8\x03\x02\x02\x02\x14\xE9\x03\x02\x02\x02" +
		"\x16\xFA\x03\x02\x02\x02\x18\u010B\x03\x02\x02\x02\x1A\u0112\x03\x02\x02" +
		"\x02\x1C\u012A\x03\x02\x02\x02\x1E\u013E\x03\x02\x02\x02 \u0157\x03\x02" +
		"\x02\x02\"\u0183\x03\x02\x02\x02$\u0188\x03\x02\x02\x02&\u0190\x03\x02" +
		"\x02\x02(\u0194\x03\x02\x02\x02*\u0197\x03\x02\x02\x02,\u01A2\x03\x02" +
		"\x02\x02.\u01AD\x03\x02\x02\x020\u01CD\x03\x02\x02\x022\u01DB\x03\x02" +
		"\x02\x024\u01E1\x03\x02\x02\x026\u01F6\x03\x02\x02\x028\u01F8\x03\x02" +
		"\x02\x02:\u0227\x03\x02\x02\x02<\u0232\x03\x02\x02\x02>\u0246\x03\x02" +
		"\x02\x02@\u0248\x03\x02\x02\x02B\u0251\x03\x02\x02\x02D\u0257\x03\x02" +
		"\x02\x02F\u025D\x03\x02\x02\x02H\u0263\x03\x02\x02\x02J\u0266\x03\x02" +
		"\x02\x02L\u0281\x03\x02\x02\x02N\u0284\x03\x02\x02\x02P\u028D\x03\x02" +
		"\x02\x02R\u0295\x03\x02\x02\x02T\u029B\x03\x02\x02\x02V\u02A4\x03\x02" +
		"\x02\x02X\u02AC\x03\x02\x02\x02Z\u02BC\x03\x02\x02\x02\\\u02CE\x03\x02" +
		"\x02\x02^\u02D4\x03\x02\x02\x02`\u02D8\x03\x02\x02\x02b\u02DB\x03\x02" +
		"\x02\x02d\u02E3\x03\x02\x02\x02f\u02F1\x03\x02\x02\x02h\u0321\x03\x02" +
		"\x02\x02j\u03B2\x03\x02\x02\x02l\u03B4\x03\x02\x02\x02n\u03B9\x03\x02" +
		"\x02\x02p\u03DB\x03\x02\x02\x02rt\x05\x04\x03\x02sr\x03\x02\x02\x02tw" +
		"\x03\x02\x02\x02us\x03\x02\x02\x02uv\x03\x02\x02\x02vx\x03\x02\x02\x02" +
		"wu\x03\x02\x02\x02xy\x07\x02\x02\x03y\x03\x03\x02\x02\x02z\x86\x05\x12" +
		"\n\x02{\x86\x05\x10\t\x02|\x86\x05\x1A\x0E\x02}\x86\x05\x18\r\x02~\x86" +
		"\x05\x1E\x10\x02\x7F\x86\x05\x14\v\x02\x80\x86\x05\x16\f\x02\x81\x86\x05" +
		"6\x1C\x02\x82\x86\x05 \x11\x02\x83\x86\x05\x06\x04\x02\x84\x86\x07N\x02" +
		"\x02\x85z\x03\x02\x02\x02\x85{\x03\x02\x02\x02\x85|\x03\x02\x02\x02\x85" +
		"}\x03\x02\x02\x02\x85~\x03\x02\x02\x02\x85\x7F\x03\x02\x02\x02\x85\x80" +
		"\x03\x02\x02\x02\x85\x81\x03\x02\x02\x02\x85\x82\x03\x02\x02\x02\x85\x83" +
		"\x03\x02\x02\x02\x85\x84\x03\x02\x02\x02\x86\x05\x03\x02\x02\x02\x87\x88" +
		"\x075\x02\x02\x88\x89\x071\x02\x02\x89\x8A\x07D\x02\x02\x8A\x8B\x07O\x02" +
		"\x02\x8B\x8C\x05h5\x02\x8C\x8D\x07P\x02\x02\x8D\x07\x03\x02\x02\x02\x8E" +
		"\x93\x05\n\x06\x02\x8F\x90\x07M\x02\x02\x90\x92\x05\n\x06\x02\x91\x8F" +
		"\x03\x02\x02\x02\x92\x95\x03\x02\x02\x02\x93\x91\x03\x02\x02\x02\x93\x94" +
		"\x03\x02\x02\x02\x94\t\x03\x02\x02\x02\x95\x93\x03\x02\x02\x02\x96\x98" +
		"\x05\f\x07\x02\x97\x96\x03\x02\x02\x02\x97\x98\x03\x02\x02\x02\x98\x9C" +
		"\x03\x02\x02\x02\x99\x9B\x05\x0E\b\x02\x9A\x99\x03\x02\x02\x02\x9B\x9E" +
		"\x03\x02\x02\x02\x9C\x9A\x03\x02\x02\x02\x9C\x9D\x03\x02\x02\x02\x9D\v" +
		"\x03\x02\x02\x02\x9E\x9C\x03\x02\x02\x02\x9F\xA0\x07Q\x02\x02\xA0\xA1" +
		"\x05l7\x02\xA1\xA2\x07F\x02\x02\xA2\xA3\x07R\x02\x02\xA3\r\x03\x02\x02" +
		"\x02\xA4\xA5\b\b\x01\x02\xA5\xA7\x07O\x02\x02\xA6\xA8\x05\x0E\b\x02\xA7" +
		"\xA6\x03\x02\x02\x02\xA8\xA9\x03\x02\x02\x02\xA9\xA7\x03\x02\x02\x02\xA9" +
		"\xAA\x03\x02\x02\x02\xAA\xAB\x03\x02\x02\x02\xAB\xAC\x07P\x02\x02\xAC" +
		"\xB2\x03\x02\x02\x02\xAD\xAE\x07M\x02\x02\xAE\xB2\x05\x0E\b\x05\xAF\xB2" +
		"\x05h5\x02\xB0\xB2\x07L\x02\x02\xB1\xA4\x03\x02\x02\x02\xB1\xAD\x03\x02" +
		"\x02\x02\xB1\xAF\x03\x02\x02\x02\xB1\xB0\x03\x02\x02\x02\xB2\xB7\x03\x02" +
		"\x02\x02\xB3\xB4\f\x06\x02\x02\xB4\xB6\x07M\x02\x02\xB5\xB3\x03\x02\x02" +
		"\x02\xB6\xB9\x03\x02\x02\x02\xB7\xB5\x03\x02\x02\x02\xB7\xB8\x03\x02\x02" +
		"\x02\xB8\x0F\x03\x02\x02\x02\xB9\xB7\x03\x02\x02\x02\xBA\xBB\x05l7\x02" +
		"\xBB\xC0\x07\n\x02\x02\xBC\xBE\x05h5\x02\xBD\xBF\x077\x02\x02\xBE\xBD" +
		"\x03\x02\x02\x02\xBE\xBF\x03\x02\x02\x02\xBF\xC1\x03\x02\x02\x02\xC0\xBC" +
		"\x03\x02\x02\x02\xC1\xC2\x03\x02\x02\x02\xC2\xC0\x03\x02\x02\x02\xC2\xC3" +
		"\x03\x02\x02\x02\xC3\xC4\x03\x02\x02\x02\xC4\xC5\x07N\x02\x02\xC5\xD7" +
		"\x03\x02\x02\x02\xC6\xC7\x07%\x02\x02\xC7\xC8\x07\n\x02\x02\xC8\xCF\x07" +
		"Y\x02\x02\xC9\xCE\x05l7\x02\xCA\xCE\x07L\x02\x02\xCB\xCE\x07,\x02\x02" +
		"\xCC\xCE\x07\'\x02\x02\xCD\xC9\x03\x02\x02\x02\xCD\xCA\x03\x02\x02\x02" +
		"\xCD\xCB\x03\x02\x02\x02\xCD\xCC\x03\x02\x02\x02\xCE\xD1\x03\x02\x02\x02" +
		"\xCF\xCD\x03\x02\x02\x02\xCF\xD0\x03\x02\x02\x02\xD0\xD2\x03\x02\x02\x02" +
		"\xD1\xCF\x03\x02\x02\x02\xD2\xD3\x07]\x02\x02\xD3\xD4\x05l7\x02\xD4\xD5" +
		"\x07N\x02\x02\xD5\xD7\x03\x02\x02\x02\xD6\xBA\x03\x02\x02\x02\xD6\xC6" +
		"\x03\x02\x02\x02\xD7\x11\x03\x02\x02\x02\xD8\xDA\x07\x0F\x02\x02\xD9\xDB" +
		"\x070\x02\x02\xDA\xD9\x03\x02\x02\x02\xDA\xDB\x03\x02\x02\x02\xDB\xDC" +
		"\x03\x02\x02\x02\xDC\xE1\x05l7\x02\xDD\xDE\x07J\x02\x02\xDE\xE0\x05l7" +
		"\x02\xDF\xDD\x03\x02\x02\x02\xE0\xE3\x03\x02\x02\x02\xE1\xDF\x03\x02\x02" +
		"\x02\xE1\xE2\x03\x02\x02\x02\xE2\xE4\x03\x02\x02\x02\xE3\xE1\x03\x02\x02" +
		"\x02\xE4\xE5\x07N\x02\x02\xE5\x13\x03\x02\x02\x02\xE6\xE8\x079\x02\x02" +
		"\xE7\xE6\x03\x02\x02\x02\xE8\xEB\x03\x02\x02\x02\xE9\xE7\x03\x02\x02\x02" +
		"\xE9\xEA\x03\x02\x02\x02\xEA\xEC\x03\x02\x02\x02\xEB\xE9\x03\x02\x02\x02" +
		"\xEC\xED\x07\x1F\x02\x02\xED\xF2\x05l7\x02\xEE\xEF\x07J\x02\x02\xEF\xF1" +
		"\x05l7\x02\xF0\xEE\x03\x02\x02\x02\xF1\xF4\x03\x02\x02\x02\xF2\xF0\x03" +
		"\x02\x02\x02\xF2\xF3\x03\x02\x02\x02\xF3\xF5\x03\x02\x02\x02\xF4\xF2\x03" +
		"\x02\x02\x02\xF5\xF6\x07N\x02\x02\xF6\x15\x03\x02\x02\x02\xF7\xF9\x07" +
		"9\x02\x02\xF8\xF7\x03\x02\x02\x02\xF9\xFC\x03\x02\x02\x02\xFA\xF8\x03" +
		"\x02\x02\x02\xFA\xFB\x03\x02\x02\x02\xFB\xFD\x03\x02\x02\x02\xFC\xFA\x03" +
		"\x02\x02\x02\xFD\xFF\x07 \x02\x02\xFE\u0100\x07\x1F\x02\x02\xFF\xFE\x03" +
		"\x02\x02\x02\xFF\u0100\x03\x02\x02\x02\u0100\u0101\x03\x02\x02\x02\u0101" +
		"\u0106\x05l7\x02\u0102\u0103\x07J\x02\x02\u0103\u0105\x05l7\x02\u0104" +
		"\u0102\x03\x02\x02\x02\u0105\u0108\x03\x02\x02\x02\u0106\u0104\x03\x02" +
		"\x02\x02\u0106\u0107\x03\x02\x02\x02\u0107\u0109\x03\x02\x02\x02\u0108" +
		"\u0106\x03\x02\x02\x02\u0109\u010A\x07N\x02\x02\u010A\x17\x03\x02\x02" +
		"\x02\u010B\u010C\x07!\x02\x02\u010C\u010E\x05l7\x02\u010D\u010F\x07T\x02" +
		"\x02\u010E\u010D\x03\x02\x02\x02\u010E\u010F\x03\x02\x02\x02\u010F\u0110" +
		"\x03\x02\x02\x02\u0110\u0111\x07N\x02\x02\u0111\x19\x03\x02\x02\x02\u0112" +
		"\u0114\x07\x1C\x02\x02\u0113\u0115\x07\x10\x02\x02\u0114\u0113\x03\x02" +
		"\x02\x02\u0114\u0115\x03\x02\x02\x02\u0115\u0117\x03\x02\x02\x02\u0116" +
		"\u0118\x05l7\x02\u0117\u0116\x03\x02\x02\x02\u0117\u0118\x03\x02\x02\x02" +
		"\u0118\u011A\x03\x02\x02\x02\u0119\u011B\t\x02\x02\x02\u011A\u0119\x03" +
		"\x02\x02\x02\u011A\u011B\x03\x02\x02\x02\u011B\u011E\x03\x02\x02\x02\u011C" +
		"\u011D\x07I\x02\x02\u011D\u011F\x05*\x16\x02\u011E\u011C\x03\x02\x02\x02" +
		"\u011E\u011F\x03\x02\x02\x02\u011F\u0120\x03\x02\x02\x02\u0120\u0124\x07" +
		"V\x02\x02\u0121\u0123\x05\x1C\x0F\x02\u0122\u0121\x03\x02\x02\x02\u0123" +
		"\u0126\x03\x02\x02\x02\u0124\u0122\x03\x02\x02\x02\u0124\u0125\x03\x02" +
		"\x02\x02\u0125\u0127\x03\x02\x02\x02\u0126\u0124\x03\x02\x02\x02\u0127" +
		"\u0128\x07W\x02\x02\u0128\x1B\x03\x02\x02\x02\u0129\u012B\x07$\x02\x02" +
		"\u012A\u0129\x03\x02\x02\x02\u012A\u012B\x03\x02\x02\x02\u012B\u012C\x03" +
		"\x02\x02\x02\u012C\u012D\x05l7\x02\u012D\u012F\x07O\x02\x02\u012E\u0130" +
		"\x05n8\x02\u012F\u012E\x03\x02\x02\x02\u012F\u0130\x03\x02\x02\x02\u0130" +
		"\u0131\x03\x02\x02\x02\u0131\u0132\x07P\x02\x02\u0132\u0133\x03\x02\x02" +
		"\x02\u0133\u0134\x07N\x02\x02\u0134\x1D\x03\x02\x02\x02\u0135\u0137\x07" +
		"\x10\x02\x02\u0136\u0135\x03\x02\x02\x02\u0136\u0137\x03\x02\x02\x02\u0137" +
		"\u013F\x03\x02\x02\x02\u0138\u013A\x07\x12\x02\x02\u0139\u0138\x03\x02" +
		"\x02\x02\u0139\u013A\x03\x02\x02\x02\u013A\u013F\x03\x02\x02\x02\u013B" +
		"\u013D\x07\x13\x02\x02\u013C\u013B\x03\x02\x02\x02\u013C\u013D\x03\x02" +
		"\x02\x02\u013D\u013F\x03\x02\x02\x02\u013E\u0136\x03\x02\x02\x02\u013E" +
		"\u0139\x03\x02\x02\x02\u013E\u013C\x03\x02\x02\x02\u013F\u0143\x03\x02" +
		"\x02\x02\u0140\u0142\x079\x02\x02\u0141\u0140\x03\x02\x02\x02\u0142\u0145" +
		"\x03\x02\x02\x02\u0143\u0141\x03\x02\x02\x02\u0143\u0144\x03\x02\x02\x02" +
		"\u0144\u0147\x03\x02\x02\x02\u0145\u0143\x03\x02\x02\x02\u0146\u0148\x07" +
		"\x11\x02\x02\u0147\u0146\x03\x02\x02\x02\u0147\u0148\x03\x02\x02\x02\u0148" +
		"\u014F\x03\x02\x02\x02\u0149\u0150\x05*\x16\x02\u014A\u014D\x05l7\x02" +
		"\u014B\u014C\x07I\x02\x02\u014C\u014E\x05*\x16\x02\u014D\u014B\x03\x02" +
		"\x02\x02\u014D\u014E\x03\x02\x02\x02\u014E\u0150\x03\x02\x02\x02\u014F" +
		"\u0149\x03\x02\x02\x02\u014F\u014A\x03\x02\x02\x02\u0150\u0153\x03\x02" +
		"\x02\x02\u0151\u0154\x05&\x14\x02\u0152\u0154\x05(\x15\x02\u0153\u0151" +
		"\x03\x02\x02\x02\u0153\u0152\x03\x02\x02\x02\u0154\x1F\x03\x02\x02\x02" +
		"\u0155\u0158\x07\x12\x02\x02\u0156\u0158\x07\x13\x02\x02\u0157\u0155\x03" +
		"\x02\x02\x02\u0157\u0156\x03\x02\x02\x02\u0157\u0158\x03\x02\x02\x02\u0158" +
		"\u0159\x03\x02\x02\x02\u0159\u015A\x07\x03\x02\x02\u015A\u015F\x05l7\x02" +
		"\u015B\u015C\x07O\x02\x02\u015C\u015D\x05l7\x02\u015D\u015E\x07P\x02\x02" +
		"\u015E\u0160\x03\x02\x02\x02\u015F\u015B\x03\x02\x02\x02\u015F\u0160\x03" +
		"\x02\x02\x02\u0160\u0161\x03\x02\x02\x02\u0161\u0162\x07I\x02\x02\u0162" +
		"\u0163\x05\b\x05\x02\u0163\u0169\x07I\x02\x02\u0164\u0167\x05*\x16\x02" +
		"\u0165\u0168\x05&\x14\x02\u0166\u0168\x05(\x15\x02\u0167\u0165\x03\x02" +
		"\x02\x02\u0167\u0166\x03\x02\x02\x02\u0168\u016A\x03\x02\x02\x02\u0169" +
		"\u0164\x03\x02\x02\x02\u0169\u016A\x03\x02\x02\x02\u016A!\x03\x02\x02" +
		"\x02\u016B\u016D\x07T\x02\x02\u016C\u016E\x07N\x02\x02\u016D\u016C\x03" +
		"\x02\x02\x02\u016D\u016E\x03\x02\x02\x02\u016E\u0184\x03\x02\x02\x02\u016F" +
		"\u0170\x073\x02\x02\u0170\u0184\x05h5\x02\u0171\u0173\x07S\x02\x02\u0172" +
		"\u0174\x07N\x02\x02\u0173\u0172\x03\x02\x02\x02\u0173\u0174\x03\x02\x02" +
		"\x02\u0174\u0184\x03\x02\x02\x02\u0175\u0178\x07A\x02\x02\u0176\u0179" +
		"\x05l7\x02\u0177\u0179\x05h5\x02\u0178\u0176\x03\x02\x02\x02\u0178\u0177" +
		"\x03\x02\x02\x02\u0179\u0184\x03\x02\x02\x02\u017A\u017D\t\x03\x02\x02" +
		"\u017B\u017E\x05l7\x02\u017C\u017E\x05h5\x02\u017D\u017B\x03\x02\x02\x02" +
		"\u017D\u017C\x03\x02\x02\x02\u017E\u0184\x03\x02\x02\x02\u017F\u0180\x07" +
		"Q\x02\x02\u0180\u0181\x05$\x13\x02\u0181\u0182\x07R\x02\x02\u0182\u0184" +
		"\x03\x02\x02\x02\u0183\u016B\x03\x02\x02\x02\u0183\u016F\x03\x02\x02\x02" +
		"\u0183\u0171\x03\x02\x02\x02\u0183\u0175\x03\x02\x02\x02\u0183\u017A\x03" +
		"\x02\x02\x02\u0183\u017F\x03\x02\x02\x02\u0184\u0186\x03\x02\x02\x02\u0185" +
		"\u0187\x077\x02\x02\u0186\u0185\x03\x02\x02\x02\u0186\u0187\x03\x02\x02" +
		"\x02\u0187#\x03\x02\x02\x02\u0188\u018D\x05h5\x02\u0189\u018A\x07J\x02" +
		"\x02\u018A\u018C\x05$\x13\x02\u018B\u0189\x03\x02\x02\x02\u018C\u018F" +
		"\x03\x02\x02\x02\u018D\u018B\x03\x02\x02\x02\u018D\u018E\x03\x02\x02\x02" +
		"\u018E%\x03\x02\x02\x02\u018F\u018D\x03\x02\x02\x02\u0190\u0191\x07V\x02" +
		"\x02\u0191\u0192\x05,\x17\x02\u0192\u0193\x07W\x02\x02\u0193\'\x03\x02" +
		"\x02\x02\u0194\u0195\x05,\x17\x02\u0195\u0196\x07N\x02\x02\u0196)\x03" +
		"\x02\x02\x02\u0197\u019C\x05l7\x02\u0198\u0199\x07J\x02\x02\u0199\u019B" +
		"\x05*\x16\x02\u019A\u0198\x03\x02\x02\x02\u019B\u019E\x03\x02\x02\x02" +
		"\u019C\u019A\x03\x02\x02\x02\u019C\u019D\x03\x02\x02\x02\u019D+\x03\x02" +
		"\x02\x02\u019E\u019C\x03\x02\x02\x02\u019F\u01A1\x05\"\x12\x02\u01A0\u019F" +
		"\x03\x02\x02\x02\u01A1\u01A4\x03\x02\x02\x02\u01A2\u01A0\x03\x02\x02\x02" +
		"\u01A2\u01A3\x03\x02\x02\x02\u01A3\u01AA\x03\x02\x02\x02\u01A4\u01A2\x03" +
		"\x02\x02\x02\u01A5\u01A9\x056\x1C\x02\u01A6\u01A9\x05.\x18\x02\u01A7\u01A9" +
		"\x052\x1A\x02\u01A8\u01A5\x03\x02\x02\x02\u01A8\u01A6\x03\x02\x02\x02" +
		"\u01A8\u01A7\x03\x02\x02\x02\u01A9\u01AC\x03\x02";
	private static readonly _serializedATNSegment1: string =
		"\x02\x02\u01AA\u01A8\x03\x02\x02\x02\u01AA\u01AB\x03\x02\x02\x02\u01AB" +
		"-\x03\x02\x02\x02\u01AC\u01AA\x03\x02\x02\x02\u01AD\u01C8\x05l7\x02\u01AE" +
		"\u01B0\x07E\x02\x02\u01AF\u01B1\x07$\x02\x02\u01B0\u01AF\x03\x02\x02\x02" +
		"\u01B0\u01B1\x03\x02\x02\x02\u01B1\u01B4\x03\x02\x02\x02\u01B2\u01B5\x05" +
		"h5\x02\u01B3\u01B5\x050\x19\x02\u01B4\u01B2\x03\x02\x02\x02\u01B4\u01B3" +
		"\x03\x02\x02\x02\u01B5\u01B7\x03\x02\x02\x02\u01B6\u01B8\x07N\x02\x02" +
		"\u01B7\u01B6\x03\x02\x02\x02\u01B7\u01B8\x03\x02\x02\x02\u01B8\u01C9\x03" +
		"\x02\x02\x02\u01B9\u01BB\x07I\x02\x02\u01BA\u01BC\x05l7\x02\u01BB\u01BA" +
		"\x03\x02\x02\x02\u01BB\u01BC\x03\x02\x02\x02\u01BC\u01C1\x03\x02\x02\x02" +
		"\u01BD\u01BE\x07J\x02\x02\u01BE\u01C0\x05*\x16\x02\u01BF\u01BD\x03\x02" +
		"\x02\x02\u01C0\u01C3\x03\x02\x02\x02\u01C1\u01BF\x03\x02\x02\x02\u01C1" +
		"\u01C2\x03\x02\x02\x02\u01C2\u01C4\x03\x02\x02\x02\u01C3\u01C1\x03\x02" +
		"\x02\x02\u01C4\u01C6\x05&\x14\x02\u01C5\u01C7\x07N\x02\x02\u01C6\u01C5" +
		"\x03\x02\x02\x02\u01C6\u01C7\x03\x02\x02\x02\u01C7\u01C9\x03\x02\x02\x02" +
		"\u01C8\u01AE\x03\x02\x02\x02\u01C8\u01B9\x03\x02\x02\x02\u01C9/\x03\x02" +
		"\x02\x02\u01CA\u01CC\x07T\x02\x02\u01CB\u01CA\x03\x02\x02\x02\u01CC\u01CF" +
		"\x03\x02\x02\x02\u01CD\u01CB\x03\x02\x02\x02\u01CD\u01CE\x03\x02\x02\x02" +
		"\u01CE1\x03\x02\x02\x02\u01CF\u01CD\x03\x02\x02\x02\u01D0\u01D1\x07\x14" +
		"\x02\x02\u01D1\u01DC\x054\x1B\x02\u01D2\u01D4\x07\x14\x02\x02\u01D3\u01D5" +
		"\x07T\x02\x02\u01D4\u01D3\x03\x02\x02\x02\u01D4\u01D5\x03\x02\x02\x02" +
		"\u01D5\u01D6\x03\x02\x02\x02\u01D6\u01D8\x07O\x02\x02\u01D7\u01D9\x05" +
		"4\x1B\x02\u01D8\u01D7\x03\x02\x02\x02\u01D8\u01D9\x03\x02\x02\x02\u01D9" +
		"\u01DA\x03\x02\x02\x02\u01DA\u01DC\x07P\x02\x02\u01DB\u01D0\x03\x02\x02" +
		"\x02\u01DB\u01D2\x03\x02\x02\x02\u01DC\u01DD\x03\x02\x02\x02\u01DD\u01DE" +
		"\x05&\x14\x02\u01DE3\x03\x02\x02\x02\u01DF\u01E2\x05j6\x02\u01E0\u01E2" +
		"\x07L\x02\x02\u01E1\u01DF\x03\x02\x02\x02\u01E1\u01E0\x03\x02\x02\x02" +
		"\u01E2\u01E7\x03\x02\x02\x02\u01E3\u01E4\x07J\x02\x02\u01E4\u01E6\x05" +
		"4\x1B\x02\u01E5\u01E3\x03\x02\x02\x02\u01E6\u01E9\x03\x02\x02\x02\u01E7" +
		"\u01E5\x03\x02\x02\x02\u01E7\u01E8\x03\x02\x02\x02\u01E85\x03\x02\x02" +
		"\x02\u01E9\u01E7\x03\x02\x02\x02\u01EA\u01EC\x07\x12\x02\x02\u01EB\u01EA" +
		"\x03\x02\x02\x02\u01EB\u01EC\x03\x02\x02\x02\u01EC\u01F1\x03\x02\x02\x02" +
		"\u01ED\u01EF\x07\x13\x02\x02\u01EE\u01ED\x03\x02\x02\x02\u01EE\u01EF\x03" +
		"\x02\x02\x02\u01EF\u01F1\x03\x02\x02\x02\u01F0\u01EB\x03\x02\x02\x02\u01F0" +
		"\u01EE\x03\x02\x02\x02\u01F1\u01F2\x03\x02\x02\x02\u01F2\u01F3\x05:\x1E" +
		"\x02\u01F3\u01F4\x05<\x1F\x02\u01F4\u01F7\x03\x02\x02\x02\u01F5\u01F7" +
		"\x058\x1D\x02\u01F6\u01F0\x03\x02\x02\x02\u01F6\u01F5\x03\x02\x02\x02" +
		"\u01F77\x03\x02\x02\x02\u01F8\u01FF\x072\x02\x02\u01F9\u0200\t\x04\x02" +
		"\x02\u01FA\u01FB\x07Q\x02\x02\u01FB\u01FD\x07R\x02\x02\u01FC\u01FE\x07" +
		"E\x02\x02\u01FD\u01FC\x03\x02\x02\x02\u01FD\u01FE\x03\x02\x02\x02\u01FE" +
		"\u0200\x03\x02\x02\x02\u01FF\u01F9\x03\x02\x02\x02\u01FF\u01FA\x03\x02" +
		"\x02\x02\u0200\u0201\x03\x02\x02\x02\u0201\u0202\x07O\x02\x02\u0202\u0203" +
		"\x05n8\x02\u0203\u0204\x07P\x02\x02\u0204\u0205\x03\x02\x02\x02\u0205" +
		"\u0209\x07V\x02\x02\u0206\u0208\x05> \x02\u0207\u0206\x03\x02\x02\x02" +
		"\u0208\u020B\x03\x02\x02\x02\u0209\u0207\x03\x02\x02\x02\u0209\u020A\x03" +
		"\x02\x02\x02\u020A\u020C\x03\x02\x02\x02\u020B\u0209\x03\x02\x02\x02\u020C" +
		"\u020D\x07W\x02\x02\u020D9\x03\x02\x02\x02\u020E\u0210\x07\"\x02\x02\u020F" +
		"\u020E\x03\x02\x02\x02\u020F\u0210\x03\x02\x02\x02\u0210\u0212\x03\x02" +
		"\x02\x02\u0211\u0213\x07$\x02\x02\u0212\u0211\x03\x02\x02\x02\u0212\u0213" +
		"\x03\x02\x02\x02\u0213\u0215\x03\x02\x02\x02\u0214\u0216\x07\x07\x02\x02" +
		"\u0215\u0214\x03\x02\x02\x02\u0215\u0216\x03\x02\x02\x02\u0216\u0217\x03" +
		"\x02\x02\x02\u0217\u021D\x05l7\x02\u0218\u021A\x07O\x02\x02\u0219\u021B" +
		"\x05n8\x02\u021A\u0219\x03\x02\x02\x02\u021A\u021B\x03\x02\x02\x02\u021B" +
		"\u021C\x03\x02\x02\x02\u021C\u021E\x07P\x02\x02\u021D\u0218\x03\x02\x02" +
		"\x02\u021D\u021E\x03\x02\x02\x02\u021E\u0228\x03\x02\x02\x02\u021F\u0225" +
		"\x07\x07\x02\x02\u0220\u0222\x07O\x02\x02\u0221\u0223\x05n8\x02\u0222" +
		"\u0221\x03\x02\x02\x02\u0222\u0223\x03\x02\x02\x02\u0223\u0224\x03\x02" +
		"\x02\x02\u0224\u0226\x07P\x02\x02\u0225\u0220\x03\x02\x02\x02\u0225\u0226" +
		"\x03\x02\x02\x02\u0226\u0228\x03\x02\x02\x02\u0227\u020F\x03\x02\x02\x02" +
		"\u0227\u021F\x03\x02\x02\x02\u0228;\x03\x02\x02\x02\u0229\u022D\x07V\x02" +
		"\x02\u022A\u022C\x05> \x02\u022B\u022A\x03\x02\x02\x02\u022C\u022F\x03" +
		"\x02\x02\x02\u022D\u022B\x03\x02\x02\x02\u022D\u022E\x03\x02\x02\x02\u022E" +
		"\u0230\x03\x02\x02\x02\u022F\u022D\x03\x02\x02\x02\u0230\u0233\x07W\x02" +
		"\x02\u0231\u0233\x05> \x02\u0232\u0229\x03\x02\x02\x02\u0232\u0231\x03" +
		"\x02\x02\x02\u0233=\x03\x02\x02\x02\u0234\u0247\x05b2\x02\u0235\u0247" +
		"\x05d3\x02\u0236\u0247\x05Z.\x02\u0237\u0247\x05X-\x02\u0238\u0247\x05" +
		"T+\x02\u0239\u0247\x05V,\x02\u023A\u0247\x05J&\x02\u023B\u0247\x05N(\x02" +
		"\u023C\u0247\x05P)\x02\u023D\u0247\x05`1\x02\u023E\u0247\x05^0\x02\u023F" +
		"\u0247\x05R*\x02\u0240\u0247\x05L\'\x02\u0241\u0247\x05H%\x02\u0242\u0247" +
		"\x05D#\x02\u0243\u0247\x05F$\x02\u0244\u0247\x05B\"\x02\u0245\u0247\x05" +
		"@!\x02\u0246\u0234\x03\x02\x02\x02\u0246\u0235\x03\x02\x02\x02\u0246\u0236" +
		"\x03\x02\x02\x02\u0246\u0237\x03\x02\x02\x02\u0246\u0238\x03\x02\x02\x02" +
		"\u0246\u0239\x03\x02\x02\x02\u0246\u023A\x03\x02\x02\x02\u0246\u023B\x03" +
		"\x02\x02\x02\u0246\u023C\x03\x02\x02\x02\u0246\u023D\x03\x02\x02\x02\u0246" +
		"\u023E\x03\x02\x02\x02\u0246\u023F\x03\x02\x02\x02\u0246\u0240\x03\x02" +
		"\x02\x02\u0246\u0241\x03\x02\x02\x02\u0246\u0242\x03\x02\x02\x02\u0246" +
		"\u0243\x03\x02\x02\x02\u0246\u0244\x03\x02\x02\x02\u0246\u0245\x03\x02" +
		"\x02\x02\u0247?\x03\x02\x02\x02\u0248\u024C\x07V\x02\x02\u0249\u024B\x05" +
		"> \x02\u024A\u0249\x03\x02\x02\x02\u024B\u024E\x03\x02\x02\x02\u024C\u024A" +
		"\x03\x02\x02\x02\u024C\u024D\x03\x02\x02\x02\u024D\u024F\x03\x02\x02\x02" +
		"\u024E\u024C\x03\x02\x02\x02\u024F\u0250\x07W\x02\x02\u0250A\x03\x02\x02" +
		"\x02\u0251\u0253\x07/\x02\x02\u0252\u0254\x05l7\x02\u0253\u0252\x03\x02" +
		"\x02\x02\u0253\u0254\x03\x02\x02\x02\u0254\u0255\x03\x02\x02\x02\u0255" +
		"\u0256\x07N\x02\x02\u0256C\x03\x02\x02\x02\u0257\u0259\x07-\x02\x02\u0258" +
		"\u025A\x05l7\x02\u0259\u0258\x03\x02\x02\x02\u0259\u025A\x03\x02\x02\x02" +
		"\u025A\u025B\x03\x02\x02\x02\u025B\u025C\x07N\x02\x02\u025CE\x03\x02\x02" +
		"\x02\u025D\u025F\x07.\x02\x02\u025E\u0260\x05l7\x02\u025F\u025E\x03\x02" +
		"\x02\x02\u025F\u0260\x03\x02\x02\x02\u0260\u0261\x03\x02\x02\x02\u0261" +
		"\u0262\x07N\x02\x02\u0262G\x03\x02\x02\x02\u0263\u0264\x05l7\x02\u0264" +
		"\u0265\x07I\x02\x02\u0265I\x03\x02\x02\x02\u0266\u0267\x07\x04\x02\x02" +
		"\u0267\u0268\x07O\x02\x02\u0268\u0269\x05h5\x02\u0269\u026A\x07P\x02\x02" +
		"\u026A\u027C\x07V\x02\x02\u026B\u026C\x07\x05\x02\x02\u026C\u026F\x05" +
		"h5\x02\u026D\u026F\x07\x06\x02\x02\u026E\u026B\x03\x02\x02\x02\u026E\u026D" +
		"\x03\x02\x02\x02\u026F\u0270\x03\x02\x02\x02\u0270\u0278\x07I\x02\x02" +
		"\u0271\u0279\x05<\x1F\x02\u0272\u0274\x05> \x02\u0273\u0272\x03\x02\x02" +
		"\x02\u0274\u0277\x03\x02\x02\x02\u0275\u0273\x03\x02\x02\x02\u0275\u0276" +
		"\x03\x02\x02\x02\u0276\u0279\x03\x02\x02\x02\u0277\u0275\x03\x02\x02\x02" +
		"\u0278\u0271\x03\x02\x02\x02\u0278\u0275\x03\x02\x02\x02\u0279\u027B\x03" +
		"\x02\x02\x02\u027A\u026E\x03\x02\x02\x02\u027B\u027E\x03\x02\x02\x02\u027C" +
		"\u027A\x03\x02\x02\x02\u027C\u027D\x03\x02\x02\x02\u027D\u027F\x03\x02" +
		"\x02\x02\u027E\u027C\x03\x02\x02\x02\u027F\u0280\x07W\x02\x02\u0280K\x03" +
		"\x02\x02\x02\u0281\u0282\x07\b\x02\x02\u0282\u0283\x05h5\x02\u0283M\x03" +
		"\x02\x02\x02\u0284\u0285\x07\v\x02\x02\u0285\u0286\x07O\x02\x02\u0286" +
		"\u0287\x07\x19\x02\x02\u0287\u0288\x07D\x02\x02\u0288\u0289\x07\'\x02" +
		"\x02\u0289\u028A\x05h5\x02\u028A\u028B\x07P\x02\x02\u028B\u028C\x05<\x1F" +
		"\x02\u028CO\x03\x02\x02\x02\u028D\u028E\x07&\x02\x02\u028E\u028F\x07O" +
		"\x02\x02\u028F\u0290\x05h5\x02\u0290\u0291\x07\'\x02\x02\u0291\u0292\x05" +
		"h5\x02\u0292\u0293\x07P\x02\x02\u0293\u0294\x05<\x1F\x02\u0294Q\x03\x02" +
		"\x02\x02\u0295\u0297\x07#\x02\x02\u0296\u0298\x05h5\x02\u0297\u0296\x03" +
		"\x02\x02\x02\u0297\u0298\x03\x02\x02\x02\u0298\u0299\x03\x02\x02\x02\u0299" +
		"\u029A\x07N\x02\x02\u029AS\x03\x02\x02\x02\u029B\u029C\x07\x16\x02\x02" +
		"\u029C\u029D\x05<\x1F\x02\u029D\u029E\x07\x17\x02\x02\u029E\u02A0\x07" +
		"O\x02\x02\u029F\u02A1\x05h5\x02\u02A0\u029F\x03\x02\x02\x02\u02A0\u02A1" +
		"\x03\x02\x02\x02\u02A1\u02A2\x03\x02\x02\x02\u02A2\u02A3\x07P\x02\x02" +
		"\u02A3U\x03\x02\x02\x02\u02A4\u02A5\x07\x17\x02\x02\u02A5\u02A7\x07O\x02" +
		"\x02\u02A6\u02A8\x05h5\x02\u02A7\u02A6\x03\x02\x02\x02\u02A7\u02A8\x03" +
		"\x02\x02\x02\u02A8\u02A9\x03\x02\x02\x02\u02A9\u02AA\x07P\x02\x02\u02AA" +
		"\u02AB\x05<\x1F\x02\u02ABW\x03\x02\x02\x02\u02AC\u02AD\x07\v\x02\x02\u02AD" +
		"\u02AF\x07O\x02\x02\u02AE\u02B0\x05h5\x02\u02AF\u02AE\x03\x02\x02\x02" +
		"\u02AF\u02B0\x03\x02\x02\x02\u02B0\u02B1\x03\x02\x02\x02\u02B1\u02B3\x07" +
		"N\x02\x02\u02B2\u02B4\x05h5\x02\u02B3\u02B2\x03\x02\x02\x02\u02B3\u02B4" +
		"\x03\x02\x02\x02\u02B4\u02B5\x03\x02\x02\x02\u02B5\u02B7\x07N\x02\x02" +
		"\u02B6\u02B8\x05h5\x02\u02B7\u02B6\x03\x02\x02\x02\u02B7\u02B8\x03\x02" +
		"\x02\x02\u02B8\u02B9\x03\x02\x02\x02\u02B9\u02BA\x07P\x02\x02\u02BA\u02BB" +
		"\x05<\x1F\x02\u02BBY\x03\x02\x02\x02\u02BC\u02BD\x07\f\x02\x02\u02BD\u02C7" +
		"\x05<\x1F\x02\u02BE\u02BF\x07\r\x02\x02\u02BF\u02C1\x07O\x02\x02\u02C0" +
		"\u02C2\x05n8\x02\u02C1\u02C0\x03\x02\x02\x02\u02C1\u02C2\x03\x02\x02\x02" +
		"\u02C2\u02C3\x03\x02\x02\x02\u02C3\u02C4\x07P\x02\x02\u02C4\u02C6\x05" +
		"<\x1F\x02\u02C5\u02BE\x03\x02\x02\x02\u02C6\u02C9\x03\x02\x02\x02\u02C7" +
		"\u02C5\x03\x02\x02\x02\u02C7\u02C8\x03\x02\x02\x02\u02C8\u02CC\x03\x02" +
		"\x02\x02\u02C9\u02C7\x03\x02\x02\x02\u02CA\u02CB\x07\x0E\x02\x02\u02CB" +
		"\u02CD\x05<\x1F\x02\u02CC\u02CA\x03\x02\x02\x02\u02CC\u02CD\x03\x02\x02" +
		"\x02\u02CD[\x03\x02\x02\x02\u02CE\u02D1\x05h5\x02\u02CF\u02D0\x07K\x02" +
		"\x02\u02D0\u02D2\x05\\/\x02\u02D1\u02CF\x03\x02\x02\x02\u02D1\u02D2\x03" +
		"\x02\x02\x02\u02D2]\x03\x02\x02\x02\u02D3\u02D5\x05h5\x02\u02D4\u02D3" +
		"\x03\x02\x02\x02\u02D4\u02D5\x03\x02\x02\x02\u02D5\u02D6\x03\x02\x02\x02" +
		"\u02D6\u02D7\x07N\x02\x02\u02D7_\x03\x02\x02\x02\u02D8\u02D9\x07S\x02" +
		"\x02\u02D9\u02DA\x07N\x02\x02\u02DAa\x03\x02\x02\x02\u02DB\u02DC\x07\x19" +
		"\x02\x02\u02DC\u02DF\x05l7\x02\u02DD\u02DE\x07E\x02\x02\u02DE\u02E0\x05" +
		"h5\x02\u02DF\u02DD\x03\x02\x02\x02\u02DF\u02E0\x03\x02\x02\x02\u02E0\u02E1" +
		"\x03\x02\x02\x02\u02E1\u02E2\x07N\x02\x02\u02E2c\x03\x02\x02\x02\u02E3" +
		"\u02E4\x07\x15\x02\x02\u02E4\u02EA\x05f4\x02\u02E5\u02E6\x07\x18\x02\x02" +
		"\u02E6\u02E7\x07\x15\x02\x02\u02E7\u02E9\x05f4\x02\u02E8\u02E5\x03\x02" +
		"\x02\x02\u02E9\u02EC\x03\x02\x02\x02\u02EA\u02E8\x03\x02\x02\x02\u02EA" +
		"\u02EB\x03\x02\x02\x02\u02EB\u02EF\x03\x02\x02\x02\u02EC\u02EA\x03\x02" +
		"\x02\x02\u02ED\u02EE\x07\x18\x02\x02\u02EE\u02F0\x05<\x1F\x02\u02EF\u02ED" +
		"\x03\x02\x02\x02\u02EF\u02F0\x03\x02\x02\x02\u02F0e\x03\x02\x02\x02\u02F1" +
		"\u02F2\x07O\x02\x02\u02F2\u02F3\x05h5\x02\u02F3\u02F4\x07P\x02\x02\u02F4" +
		"\u02F5\x05<\x1F\x02\u02F5g\x03\x02\x02\x02\u02F6\u02F7\b5\x01\x02\u02F7" +
		"\u02F9\x07Q\x02\x02\u02F8\u02FA\x05h5\x02\u02F9\u02F8\x03\x02\x02\x02" +
		"\u02F9\u02FA\x03\x02\x02\x02\u02FA\u02FB\x03\x02\x02\x02\u02FB\u0322\x07" +
		"R\x02\x02\u02FC\u02FD\x07\x1E\x02\x02\u02FD\u0322\x05h5&\u02FE\u02FF\x07" +
		"\x1D\x02\x02\u02FF\u0322\x05h5%\u0300\u0301\x07\x11\x02\x02\u0301\u0322" +
		"\x05h5$\u0302\u0322\x05j6\x02\u0303\u0304\x07D\x02\x02\u0304\u0322\x05" +
		"&\x14\x02\u0305\u0307\x07O\x02\x02\u0306\u0308\x05h5\x02\u0307\u0306\x03" +
		"\x02\x02\x02\u0307\u0308\x03\x02\x02\x02\u0308\u0309\x03\x02\x02\x02\u0309" +
		"\u0322\x07P\x02\x02\u030A\u030B\x07\x19\x02\x02\u030B\u0322\x05h5\x1C" +
		"\u030C\u030D\x07$\x02\x02\u030D\u0322\x05h5\x1B\u030E\u030F\x07\t\x02" +
		"\x02\u030F\u0322\x05h5\x1A\u0310\u0312\x07V\x02\x02\u0311\u0313\x05n8" +
		"\x02\u0312\u0311\x03\x02\x02\x02\u0312\u0313\x03\x02\x02\x02\u0313\u0314" +
		"\x03\x02\x02\x02\u0314\u0316\x07I\x02\x02\u0315\u0317\x05h5\x02\u0316" +
		"\u0315\x03\x02\x02\x02\u0316\u0317\x03\x02\x02\x02\u0317\u0318\x03\x02" +
		"\x02\x02\u0318\u0322\x07W\x02\x02\u0319\u031A\x07A\x02\x02\u031A\u0322" +
		"\x05h5\r\u031B\u031C\x07L\x02\x02\u031C\u031D\x07A\x02\x02\u031D\u0322" +
		"\x05h5\f\u031E\u031F\t\x05\x02\x02\u031F\u0322\x05h5\x06\u0320\u0322\x05" +
		"6\x1C\x02\u0321\u02F6\x03\x02\x02\x02\u0321\u02FC\x03\x02\x02\x02\u0321" +
		"\u02FE\x03\x02\x02\x02\u0321\u0300\x03\x02\x02\x02\u0321\u0302\x03\x02" +
		"\x02\x02\u0321\u0303\x03\x02\x02\x02\u0321\u0305\x03\x02\x02\x02\u0321" +
		"\u030A\x03\x02\x02\x02\u0321\u030C\x03\x02\x02\x02\u0321\u030E\x03\x02" +
		"\x02\x02\u0321\u0310\x03\x02\x02\x02\u0321\u0319\x03\x02\x02\x02\u0321" +
		"\u031B\x03\x02\x02\x02\u0321\u031E\x03\x02\x02\x02\u0321\u0320\x03\x02" +
		"\x02\x02\u0322\u03A4\x03\x02\x02\x02\u0323\u0324\f*\x02\x02\u0324\u0325" +
		"\x07K\x02\x02\u0325\u03A3\x05h5+\u0326\u0327\f(\x02\x02\u0327\u0328\x07" +
		"J\x02\x02\u0328\u03A3\x05h5)\u0329\u032A\f\x19\x02\x02\u032A\u032B\x07" +
		"4\x02\x02\u032B\u03A3\x05h5\x1A\u032C\u032D\f\x18\x02\x02\u032D\u032E" +
		"\x07+\x02\x02\u032E\u032F\x07\'\x02\x02\u032F\u03A3\x05h5\x19\u0330\u0331" +
		"\f\x17\x02\x02\u0331\u0332\x07,\x02\x02\u0332\u0333\x07\'\x02\x02\u0333" +
		"\u03A3\x05h5\x18\u0334\u0335\f\x16\x02\x02\u0335\u0336\x07,\x02\x02\u0336" +
		"\u03A3\x05h5\x17\u0337\u0338\f\x15\x02\x02\u0338\u0339\x07\'\x02\x02\u0339" +
		"\u03A3\x05h5\x16\u033A\u033B\f\x14\x02\x02\u033B\u033C\x07E\x02\x02\u033C" +
		"\u03A3\x05h5\x15\u033D\u033E\f\x13\x02\x02\u033E\u033F\x078\x02\x02\u033F" +
		"\u03A3\x05h5\x14\u0340\u0341\f\x11\x02\x02\u0341\u0343\t\x06\x02\x02\u0342" +
		"\u0344\x07E\x02\x02\u0343\u0342\x03\x02\x02\x02\u0343\u0344\x03\x02\x02" +
		"\x02\u0344\u0345\x03\x02\x02\x02\u0345\u03A3\x05h5\x12\u0346\u0347\f\x10" +
		"\x02\x02\u0347\u0348\t\x07\x02\x02\u0348\u03A3\x05h5\x11\u0349\u034A\f" +
		"\x0F\x02\x02\u034A\u034C\x07C\x02\x02\u034B\u034D\x07E\x02\x02\u034C\u034B" +
		"\x03\x02\x02\x02\u034C\u034D\x03\x02\x02\x02\u034D\u034E\x03\x02\x02\x02" +
		"\u034E\u03A3\x05h5\x10\u034F\u0350\f\x0E\x02\x02\u0350\u0351\x07A\x02" +
		"\x02\u0351\u03A3\x05h5\x0F\u0352\u0353\f\v\x02\x02\u0353\u0355\t\b\x02" +
		"\x02\u0354\u0356\x07E\x02\x02\u0355\u0354\x03\x02\x02\x02\u0355\u0356" +
		"\x03\x02\x02\x02\u0356\u0357\x03\x02\x02\x02\u0357\u03A3\x05h5\f\u0358" +
		"\u0359\f\n\x02\x02\u0359\u035B\t\t\x02\x02\u035A\u035C\x07E\x02\x02\u035B" +
		"\u035A\x03\x02\x02\x02\u035B\u035C\x03\x02\x02\x02\u035C\u035D\x03\x02" +
		"\x02\x02\u035D\u03A3\x05h5\v\u035E\u035F\f\t\x02\x02\u035F\u0360\t\n\x02" +
		"\x02\u0360\u03A3\x05h5\n\u0361\u0362\f\b\x02\x02\u0362\u0363\t\v\x02\x02" +
		"\u0363\u03A3\x05h5\t\u0364\u0365\f\x07\x02\x02\u0365\u0367\t\f\x02\x02" +
		"\u0366\u0368\x07E\x02\x02\u0367\u0366\x03\x02\x02\x02\u0367\u0368\x03" +
		"\x02\x02\x02\u0368\u0369\x03\x02\x02\x02\u0369\u03A3\x05h5\b\u036A\u036B" +
		"\f\x04\x02\x02\u036B\u036C\x077\x02\x02\u036C\u036D\x05h5\x02\u036D\u036E" +
		"\x07I\x02\x02\u036E\u036F\x05h5\x05\u036F\u03A3\x03\x02\x02\x02\u0370" +
		"\u0371\f)\x02\x02\u0371\u0373\x07Q\x02\x02\u0372\u0374\x05h5\x02\u0373" +
		"\u0372\x03\x02\x02\x02\u0373\u0374\x03\x02\x02\x02\u0374\u0375\x03\x02" +
		"\x02\x02\u0375\u03A3\x07R\x02\x02\u0376\u0377\f\'\x02\x02\u0377\u0378" +
		"\x07)\x02\x02\u0378\u037B\x05h5\x02\u0379\u037A\x07*\x02\x02\u037A\u037C" +
		"\x05h5\x02\u037B\u0379\x03\x02\x02\x02\u037B\u037C\x03\x02\x02\x02\u037C" +
		"\u03A3\x03\x02\x02\x02\u037D\u037E\f\"\x02\x02\u037E\u0380\x07O\x02\x02" +
		"\u037F\u0381\x05n8\x02\u0380\u037F\x03\x02\x02\x02\u0381\u0382\x03\x02" +
		"\x02\x02\u0382\u0380\x03\x02\x02\x02\u0382\u0383\x03\x02\x02\x02\u0383" +
		"\u0384\x03\x02\x02\x02\u0384\u0385\x07P\x02\x02\u0385\u03A3\x03\x02\x02" +
		"\x02\u0386\u0387\f!\x02\x02\u0387\u0389\x07O\x02\x02\u0388\u038A\x05h" +
		"5\x02\u0389\u0388\x03\x02\x02\x02\u0389\u038A\x03\x02\x02\x02\u038A\u038B" +
		"\x03\x02\x02\x02\u038B\u03A3\x07P\x02\x02\u038C\u038D\f\x1F\x02\x02\u038D" +
		"\u038F\x07V\x02\x02\u038E\u0390\x05n8\x02\u038F\u038E\x03\x02\x02\x02" +
		"\u038F\u0390\x03\x02\x02\x02\u0390\u0391\x03\x02\x02\x02\u0391\u0393\x07" +
		"I\x02\x02\u0392\u0394\x05h5\x02\u0393\u0392\x03\x02\x02\x02\u0393\u0394" +
		"\x03\x02\x02\x02\u0394\u0395\x03\x02\x02\x02\u0395\u03A3\x07W\x02\x02" +
		"\u0396\u0397\f\x1E\x02\x02\u0397\u0398\x07I\x02\x02\u0398\u0399\x05*\x16" +
		"\x02\u0399\u039A\x05&\x14\x02\u039A\u03A3\x03\x02\x02\x02\u039B\u03A0" +
		"\f\x05\x02\x02\u039C\u039D\x079\x02\x02\u039D\u03A1\x079\x02\x02\u039E" +
		"\u039F\x07<\x02\x02\u039F\u03A1\x07<\x02\x02\u03A0\u039C\x03\x02\x02\x02" +
		"\u03A0\u039E\x03\x02\x02\x02\u03A1\u03A3\x03\x02\x02\x02\u03A2\u0323\x03" +
		"\x02\x02\x02\u03A2\u0326\x03\x02\x02\x02\u03A2\u0329\x03\x02\x02\x02\u03A2" +
		"\u032C\x03\x02\x02\x02\u03A2\u0330\x03\x02\x02\x02\u03A2\u0334\x03\x02" +
		"\x02\x02\u03A2\u0337\x03\x02\x02\x02\u03A2\u033A\x03\x02\x02\x02\u03A2" +
		"\u033D\x03\x02\x02\x02\u03A2\u0340\x03\x02\x02\x02\u03A2\u0346\x03\x02" +
		"\x02\x02\u03A2\u0349\x03\x02\x02\x02\u03A2\u034F\x03\x02\x02\x02\u03A2" +
		"\u0352\x03\x02\x02\x02\u03A2\u0358\x03\x02\x02\x02\u03A2\u035E\x03\x02" +
		"\x02\x02\u03A2\u0361\x03\x02\x02\x02\u03A2\u0364\x03\x02\x02\x02\u03A2" +
		"\u036A\x03\x02\x02\x02\u03A2\u0370\x03\x02\x02\x02\u03A2\u0376\x03\x02" +
		"\x02\x02\u03A2\u037D\x03\x02\x02\x02\u03A2\u0386\x03\x02\x02\x02\u03A2" +
		"\u038C\x03\x02\x02\x02\u03A2\u0396\x03\x02\x02\x02\u03A2\u039B\x03\x02" +
		"\x02\x02\u03A3\u03A6\x03\x02\x02\x02\u03A4\u03A2\x03\x02\x02\x02\u03A4" +
		"\u03A5\x03\x02\x02\x02\u03A5i\x03\x02\x02\x02\u03A6\u03A4\x03\x02\x02" +
		"\x02\u03A7\u03B3\x07\x1D\x02\x02\u03A8\u03B3\x07G\x02\x02\u03A9\u03B3" +
		"\x07F\x02\x02\u03AA\u03AB\x074\x02\x02\u03AB\u03B3\x05l7\x02\u03AC\u03B3" +
		"\x05l7\x02\u03AD\u03B3\x07T\x02\x02\u03AE\u03B3\x07S\x02\x02\u03AF\u03B3" +
		"\x07U\x02\x02\u03B0\u03B3\x07\x1A\x02\x02\u03B1\u03B3\x07\x1B\x02\x02" +
		"\u03B2\u03A7\x03\x02\x02\x02\u03B2\u03A8\x03\x02\x02\x02\u03B2\u03A9\x03" +
		"\x02\x02\x02\u03B2\u03AA\x03\x02\x02\x02\u03B2\u03AC\x03\x02\x02\x02\u03B2" +
		"\u03AD\x03\x02\x02\x02\u03B2\u03AE\x03\x02\x02\x02\u03B2\u03AF\x03\x02" +
		"\x02\x02\u03B2\u03B0\x03\x02\x02\x02\u03B2\u03B1\x03\x02\x02\x02\u03B3" +
		"k\x03\x02\x02\x02\u03B4\u03B5\t\r\x02\x02\u03B5m\x03\x02\x02\x02\u03B6" +
		"\u03BA\x05p9\x02\u03B7\u03BA\x07(\x02\x02\u03B8\u03BA\x05$\x13\x02\u03B9" +
		"\u03B6\x03\x02\x02\x02\u03B9\u03B7\x03\x02\x02\x02\u03B9\u03B8\x03\x02" +
		"\x02\x02\u03BA\u03C1\x03\x02\x02\x02\u03BB\u03BD\x07J\x02\x02\u03BC\u03BE" +
		"\x05n8\x02\u03BD\u03BC\x03\x02\x02\x02\u03BD\u03BE\x03\x02\x02\x02\u03BE" +
		"\u03C0\x03\x02\x02\x02\u03BF\u03BB\x03\x02\x02\x02\u03C0\u03C3\x03\x02" +
		"\x02\x02\u03C1\u03BF\x03\x02\x02\x02\u03C1\u03C2\x03\x02\x02\x02\u03C2" +
		"o\x03\x02\x02\x02\u03C3\u03C1\x03\x02\x02\x02\u03C4\u03C5\x05l7\x02\u03C5" +
		"\u03C6\x07I\x02\x02\u03C6\u03C8\x03\x02\x02\x02\u03C7\u03C4\x03\x02\x02" +
		"\x02\u03C7\u03C8\x03\x02\x02\x02\u03C8\u03CA\x03\x02\x02\x02\u03C9\u03CB" +
		"\x05l7\x02\u03CA\u03C9\x03\x02\x02\x02\u03CA\u03CB\x03\x02\x02\x02\u03CB" +
		"\u03CC\x03\x02\x02\x02\u03CC\u03CE\x05l7\x02\u03CD\u03CF\x077\x02\x02" +
		"\u03CE\u03CD\x03\x02\x02\x02\u03CE\u03CF\x03\x02\x02\x02\u03CF\u03DC\x03" +
		"\x02\x02\x02\u03D0\u03D1\x05l7\x02\u03D1\u03D3\x07I\x02\x02\u03D2\u03D4" +
		"\x077\x02\x02\u03D3\u03D2\x03\x02\x02\x02\u03D3\u03D4\x03\x02\x02\x02" +
		"\u03D4\u03DC\x03\x02\x02\x02\u03D5\u03D6\x05l7\x02\u03D6\u03D7\x07I\x02" +
		"\x02\u03D7\u03D9\x07E\x02\x02\u03D8\u03DA\x05h5\x02\u03D9\u03D8\x03\x02" +
		"\x02\x02\u03D9\u03DA\x03\x02\x02\x02\u03DA\u03DC\x03\x02\x02\x02\u03DB" +
		"\u03C7\x03\x02\x02\x02\u03DB\u03D0\x03\x02\x02\x02\u03DB\u03D5\x03\x02" +
		"\x02\x02\u03DCq\x03\x02\x02\x02\x88u\x85\x93\x97\x9C\xA9\xB1\xB7\xBE\xC2" +
		"\xCD\xCF\xD6\xDA\xE1\xE9\xF2\xFA\xFF\u0106\u010E\u0114\u0117\u011A\u011E" +
		"\u0124\u012A\u012F\u0136\u0139\u013C\u013E\u0143\u0147\u014D\u014F\u0153" +
		"\u0157\u015F\u0167\u0169\u016D\u0173\u0178\u017D\u0183\u0186\u018D\u019C" +
		"\u01A2\u01A8\u01AA\u01B0\u01B4\u01B7\u01BB\u01C1\u01C6\u01C8\u01CD\u01D4" +
		"\u01D8\u01DB\u01E1\u01E7\u01EB\u01EE\u01F0\u01F6\u01FD\u01FF\u0209\u020F" +
		"\u0212\u0215\u021A\u021D\u0222\u0225\u0227\u022D\u0232\u0246\u024C\u0253" +
		"\u0259\u025F\u026E\u0275\u0278\u027C\u0297\u02A0\u02A7\u02AF\u02B3\u02B7" +
		"\u02C1\u02C7\u02CC\u02D1\u02D4\u02DF\u02EA\u02EF\u02F9\u0307\u0312\u0316" +
		"\u0321\u0343\u034C\u0355\u035B\u0367\u0373\u037B\u0382\u0389\u038F\u0393" +
		"\u03A0\u03A2\u03A4\u03B2\u03B9\u03BD\u03C1\u03C7\u03CA\u03CE\u03D3\u03D9" +
		"\u03DB";
	public static readonly _serializedATN: string = Utils.join(
		[
			Tads3Parser._serializedATNSegment0,
			Tads3Parser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!Tads3Parser.__ATN) {
			Tads3Parser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(Tads3Parser._serializedATN));
		}

		return Tads3Parser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public _directive!: DirectiveContext;
	public _directives: DirectiveContext[] = [];
	public EOF(): TerminalNode { return this.getToken(Tads3Parser.EOF, 0); }
	public directive(): DirectiveContext[];
	public directive(i: number): DirectiveContext;
	public directive(i?: number): DirectiveContext | DirectiveContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DirectiveContext);
		} else {
			return this.getRuleContext(i, DirectiveContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_program; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectiveContext extends ParserRuleContext {
	public enumDeclaration(): EnumDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclarationContext);
	}
	public templateDeclaration(): TemplateDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TemplateDeclarationContext);
	}
	public intrinsicDeclaration(): IntrinsicDeclarationContext | undefined {
		return this.tryGetRuleContext(0, IntrinsicDeclarationContext);
	}
	public exportDeclaration(): ExportDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ExportDeclarationContext);
	}
	public objectDeclaration(): ObjectDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ObjectDeclarationContext);
	}
	public propertyDeclaration(): PropertyDeclarationContext | undefined {
		return this.tryGetRuleContext(0, PropertyDeclarationContext);
	}
	public dictionaryDeclaration(): DictionaryDeclarationContext | undefined {
		return this.tryGetRuleContext(0, DictionaryDeclarationContext);
	}
	public functionDeclaration(): FunctionDeclarationContext | undefined {
		return this.tryGetRuleContext(0, FunctionDeclarationContext);
	}
	public grammarDeclaration(): GrammarDeclarationContext | undefined {
		return this.tryGetRuleContext(0, GrammarDeclarationContext);
	}
	public pragmaDirective(): PragmaDirectiveContext | undefined {
		return this.tryGetRuleContext(0, PragmaDirectiveContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_directive; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterDirective) {
			listener.enterDirective(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitDirective) {
			listener.exitDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitDirective) {
			return visitor.visitDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PragmaDirectiveContext extends ParserRuleContext {
	public HASH(): TerminalNode { return this.getToken(Tads3Parser.HASH, 0); }
	public PRAGMA(): TerminalNode { return this.getToken(Tads3Parser.PRAGMA, 0); }
	public ID(): TerminalNode { return this.getToken(Tads3Parser.ID, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_pragmaDirective; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterPragmaDirective) {
			listener.enterPragmaDirective(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitPragmaDirective) {
			listener.exitPragmaDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitPragmaDirective) {
			return visitor.visitPragmaDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GrammarRulesContext extends ParserRuleContext {
	public itemList(): ItemListContext[];
	public itemList(i: number): ItemListContext;
	public itemList(i?: number): ItemListContext | ItemListContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ItemListContext);
		} else {
			return this.getRuleContext(i, ItemListContext);
		}
	}
	public BITWISE_OR(): TerminalNode[];
	public BITWISE_OR(i: number): TerminalNode;
	public BITWISE_OR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.BITWISE_OR);
		} else {
			return this.getToken(Tads3Parser.BITWISE_OR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_grammarRules; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterGrammarRules) {
			listener.enterGrammarRules(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitGrammarRules) {
			listener.exitGrammarRules(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitGrammarRules) {
			return visitor.visitGrammarRules(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ItemListContext extends ParserRuleContext {
	public qualifiers(): QualifiersContext | undefined {
		return this.tryGetRuleContext(0, QualifiersContext);
	}
	public item(): ItemContext[];
	public item(i: number): ItemContext;
	public item(i?: number): ItemContext | ItemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ItemContext);
		} else {
			return this.getRuleContext(i, ItemContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_itemList; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterItemList) {
			listener.enterItemList(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitItemList) {
			listener.exitItemList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitItemList) {
			return visitor.visitItemList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiersContext extends ParserRuleContext {
	public LEFT_BRACKET(): TerminalNode { return this.getToken(Tads3Parser.LEFT_BRACKET, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public NR(): TerminalNode { return this.getToken(Tads3Parser.NR, 0); }
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_BRACKET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_qualifiers; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterQualifiers) {
			listener.enterQualifiers(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitQualifiers) {
			listener.exitQualifiers(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitQualifiers) {
			return visitor.visitQualifiers(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ItemContext extends ParserRuleContext {
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_PAREN, 0); }
	public item(): ItemContext[];
	public item(i: number): ItemContext;
	public item(i?: number): ItemContext | ItemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ItemContext);
		} else {
			return this.getRuleContext(i, ItemContext);
		}
	}
	public BITWISE_OR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.BITWISE_OR, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_item; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterItem) {
			listener.enterItem(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitItem) {
			listener.exitItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitItem) {
			return visitor.visitItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplateDeclarationContext extends ParserRuleContext {
	public _className!: IdentifierAtomContext;
	public _expr!: ExprContext;
	public _properties: ExprContext[] = [];
	public _OPTIONAL!: Token;
	public _isOptional: Token[] = [];
	public _templateId!: IdentifierAtomContext;
	public TEMPLATE(): TerminalNode { return this.getToken(Tads3Parser.TEMPLATE, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public OPTIONAL(): TerminalNode[];
	public OPTIONAL(i: number): TerminalNode;
	public OPTIONAL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.OPTIONAL);
		} else {
			return this.getToken(Tads3Parser.OPTIONAL, i);
		}
	}
	public STRING(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STRING, 0); }
	public ARITHMETIC_LEFT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ARITHMETIC_LEFT, 0); }
	public ARITHMETIC_RIGHT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ARITHMETIC_RIGHT, 0); }
	public STAR(): TerminalNode[];
	public STAR(i: number): TerminalNode;
	public STAR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.STAR);
		} else {
			return this.getToken(Tads3Parser.STAR, i);
		}
	}
	public IS(): TerminalNode[];
	public IS(i: number): TerminalNode;
	public IS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.IS);
		} else {
			return this.getToken(Tads3Parser.IS, i);
		}
	}
	public IN(): TerminalNode[];
	public IN(i: number): TerminalNode;
	public IN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.IN);
		} else {
			return this.getToken(Tads3Parser.IN, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_templateDeclaration; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterTemplateDeclaration) {
			listener.enterTemplateDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitTemplateDeclaration) {
			listener.exitTemplateDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitTemplateDeclaration) {
			return visitor.visitTemplateDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumDeclarationContext extends ParserRuleContext {
	public _isToken!: Token;
	public ENUM(): TerminalNode { return this.getToken(Tads3Parser.ENUM, 0); }
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.COMMA);
		} else {
			return this.getToken(Tads3Parser.COMMA, i);
		}
	}
	public TOKEN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.TOKEN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_enumDeclaration; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterEnumDeclaration) {
			listener.enterEnumDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitEnumDeclaration) {
			listener.exitEnumDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitEnumDeclaration) {
			return visitor.visitEnumDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyDeclarationContext extends ParserRuleContext {
	public _level!: Token;
	public _isProperty!: Token;
	public _identifierAtom!: IdentifierAtomContext;
	public _identifiers: IdentifierAtomContext[] = [];
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public PROPERTY(): TerminalNode { return this.getToken(Tads3Parser.PROPERTY, 0); }
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.COMMA);
		} else {
			return this.getToken(Tads3Parser.COMMA, i);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.PLUS);
		} else {
			return this.getToken(Tads3Parser.PLUS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_propertyDeclaration; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterPropertyDeclaration) {
			listener.enterPropertyDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitPropertyDeclaration) {
			listener.exitPropertyDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitPropertyDeclaration) {
			return visitor.visitPropertyDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DictionaryDeclarationContext extends ParserRuleContext {
	public _level!: Token;
	public _isProperty!: Token;
	public _identifierAtom!: IdentifierAtomContext;
	public _identifiers: IdentifierAtomContext[] = [];
	public DICTIONARY(): TerminalNode { return this.getToken(Tads3Parser.DICTIONARY, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.COMMA);
		} else {
			return this.getToken(Tads3Parser.COMMA, i);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.PLUS);
		} else {
			return this.getToken(Tads3Parser.PLUS, i);
		}
	}
	public PROPERTY(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.PROPERTY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_dictionaryDeclaration; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterDictionaryDeclaration) {
			listener.enterDictionaryDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitDictionaryDeclaration) {
			listener.exitDictionaryDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitDictionaryDeclaration) {
			return visitor.visitDictionaryDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExportDeclarationContext extends ParserRuleContext {
	public EXPORT(): TerminalNode { return this.getToken(Tads3Parser.EXPORT, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public SSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.SSTR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_exportDeclaration; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterExportDeclaration) {
			listener.enterExportDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitExportDeclaration) {
			listener.exitExportDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitExportDeclaration) {
			return visitor.visitExportDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntrinsicDeclarationContext extends ParserRuleContext {
	public _name!: IdentifierAtomContext;
	public _intrinsicMethodDeclaration!: IntrinsicMethodDeclarationContext;
	public _methods: IntrinsicMethodDeclarationContext[] = [];
	public INTRINSIC(): TerminalNode { return this.getToken(Tads3Parser.INTRINSIC, 0); }
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_CURLY, 0); }
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.CLASS, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.COLON, 0); }
	public superTypes(): SuperTypesContext | undefined {
		return this.tryGetRuleContext(0, SuperTypesContext);
	}
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public SSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.SSTR, 0); }
	public DSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.DSTR, 0); }
	public intrinsicMethodDeclaration(): IntrinsicMethodDeclarationContext[];
	public intrinsicMethodDeclaration(i: number): IntrinsicMethodDeclarationContext;
	public intrinsicMethodDeclaration(i?: number): IntrinsicMethodDeclarationContext | IntrinsicMethodDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IntrinsicMethodDeclarationContext);
		} else {
			return this.getRuleContext(i, IntrinsicMethodDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_intrinsicDeclaration; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterIntrinsicDeclaration) {
			listener.enterIntrinsicDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitIntrinsicDeclaration) {
			listener.exitIntrinsicDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitIntrinsicDeclaration) {
			return visitor.visitIntrinsicDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntrinsicMethodDeclarationContext extends ParserRuleContext {
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_PAREN, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STATIC, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_intrinsicMethodDeclaration; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterIntrinsicMethodDeclaration) {
			listener.enterIntrinsicMethodDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitIntrinsicMethodDeclaration) {
			listener.exitIntrinsicMethodDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitIntrinsicMethodDeclaration) {
			return visitor.visitIntrinsicMethodDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectDeclarationContext extends ParserRuleContext {
	public _isClass!: Token;
	public _isModify!: Token;
	public _isReplace!: Token;
	public _PLUS!: Token;
	public _level: Token[] = [];
	public _isTransient!: Token;
	public _id!: IdentifierAtomContext;
	public superTypes(): SuperTypesContext | undefined {
		return this.tryGetRuleContext(0, SuperTypesContext);
	}
	public curlyObjectBody(): CurlyObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, CurlyObjectBodyContext);
	}
	public semiColonEndedObjectBody(): SemiColonEndedObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, SemiColonEndedObjectBodyContext);
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.PLUS);
		} else {
			return this.getToken(Tads3Parser.PLUS, i);
		}
	}
	public TRANSIENT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.TRANSIENT, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.CLASS, 0); }
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MODIFY, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.REPLACE, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_objectDeclaration; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterObjectDeclaration) {
			listener.enterObjectDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitObjectDeclaration) {
			listener.exitObjectDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitObjectDeclaration) {
			return visitor.visitObjectDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GrammarDeclarationContext extends ParserRuleContext {
	public _isModify!: Token;
	public _isReplace!: Token;
	public _prodName!: IdentifierAtomContext;
	public _tag!: IdentifierAtomContext;
	public GRAMMAR(): TerminalNode { return this.getToken(Tads3Parser.GRAMMAR, 0); }
	public COLON(): TerminalNode[];
	public COLON(i: number): TerminalNode;
	public COLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.COLON);
		} else {
			return this.getToken(Tads3Parser.COLON, i);
		}
	}
	public grammarRules(): GrammarRulesContext {
		return this.getRuleContext(0, GrammarRulesContext);
	}
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_PAREN, 0); }
	public superTypes(): SuperTypesContext | undefined {
		return this.tryGetRuleContext(0, SuperTypesContext);
	}
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MODIFY, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.REPLACE, 0); }
	public curlyObjectBody(): CurlyObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, CurlyObjectBodyContext);
	}
	public semiColonEndedObjectBody(): SemiColonEndedObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, SemiColonEndedObjectBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_grammarDeclaration; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterGrammarDeclaration) {
			listener.enterGrammarDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitGrammarDeclaration) {
			listener.exitGrammarDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitGrammarDeclaration) {
			return visitor.visitGrammarDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplateExprContext extends ParserRuleContext {
	public _singleString!: Token;
	public _atLocation!: ExprContext;
	public _doubleString!: Token;
	public _connection!: IdentifierAtomContext;
	public _expression!: ExprContext;
	public _op!: Token;
	public _id!: IdentifierAtomContext;
	public AT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.AT, 0); }
	public ARROW(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ARROW, 0); }
	public LEFT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_BRACKET, 0); }
	public array(): ArrayContext | undefined {
		return this.tryGetRuleContext(0, ArrayContext);
	}
	public RIGHT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_BRACKET, 0); }
	public SSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.SSTR, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public DSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.DSTR, 0); }
	public OPTIONAL(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.OPTIONAL, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MINUS, 0); }
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STAR, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MOD, 0); }
	public AMP(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.AMP, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.NOT, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.TILDE, 0); }
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_templateExpr; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterTemplateExpr) {
			listener.enterTemplateExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitTemplateExpr) {
			listener.exitTemplateExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitTemplateExpr) {
			return visitor.visitTemplateExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayContext extends ParserRuleContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.COMMA);
		} else {
			return this.getToken(Tads3Parser.COMMA, i);
		}
	}
	public array(): ArrayContext[];
	public array(i: number): ArrayContext;
	public array(i?: number): ArrayContext | ArrayContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ArrayContext);
		} else {
			return this.getRuleContext(i, ArrayContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_array; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterArray) {
			listener.enterArray(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitArray) {
			listener.exitArray(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitArray) {
			return visitor.visitArray(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CurlyObjectBodyContext extends ParserRuleContext {
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.LEFT_CURLY, 0); }
	public objectBody(): ObjectBodyContext {
		return this.getRuleContext(0, ObjectBodyContext);
	}
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_CURLY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_curlyObjectBody; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterCurlyObjectBody) {
			listener.enterCurlyObjectBody(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitCurlyObjectBody) {
			listener.exitCurlyObjectBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitCurlyObjectBody) {
			return visitor.visitCurlyObjectBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SemiColonEndedObjectBodyContext extends ParserRuleContext {
	public objectBody(): ObjectBodyContext {
		return this.getRuleContext(0, ObjectBodyContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_semiColonEndedObjectBody; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterSemiColonEndedObjectBody) {
			listener.enterSemiColonEndedObjectBody(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitSemiColonEndedObjectBody) {
			listener.exitSemiColonEndedObjectBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitSemiColonEndedObjectBody) {
			return visitor.visitSemiColonEndedObjectBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SuperTypesContext extends ParserRuleContext {
	public _identifierAtom!: IdentifierAtomContext;
	public _superType: IdentifierAtomContext[] = [];
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.COMMA);
		} else {
			return this.getToken(Tads3Parser.COMMA, i);
		}
	}
	public superTypes(): SuperTypesContext[];
	public superTypes(i: number): SuperTypesContext;
	public superTypes(i?: number): SuperTypesContext | SuperTypesContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SuperTypesContext);
		} else {
			return this.getRuleContext(i, SuperTypesContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_superTypes; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterSuperTypes) {
			listener.enterSuperTypes(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitSuperTypes) {
			listener.exitSuperTypes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitSuperTypes) {
			return visitor.visitSuperTypes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectBodyContext extends ParserRuleContext {
	public _templateExpr!: TemplateExprContext;
	public _template: TemplateExprContext[] = [];
	public _functionDeclaration!: FunctionDeclarationContext;
	public _functions: FunctionDeclarationContext[] = [];
	public _property!: PropertyContext;
	public _properties: PropertyContext[] = [];
	public _propertySet!: PropertySetContext;
	public _propertySets: PropertySetContext[] = [];
	public functionDeclaration(): FunctionDeclarationContext[];
	public functionDeclaration(i: number): FunctionDeclarationContext;
	public functionDeclaration(i?: number): FunctionDeclarationContext | FunctionDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FunctionDeclarationContext);
		} else {
			return this.getRuleContext(i, FunctionDeclarationContext);
		}
	}
	public property(): PropertyContext[];
	public property(i: number): PropertyContext;
	public property(i?: number): PropertyContext | PropertyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PropertyContext);
		} else {
			return this.getRuleContext(i, PropertyContext);
		}
	}
	public propertySet(): PropertySetContext[];
	public propertySet(i: number): PropertySetContext;
	public propertySet(i?: number): PropertySetContext | PropertySetContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PropertySetContext);
		} else {
			return this.getRuleContext(i, PropertySetContext);
		}
	}
	public templateExpr(): TemplateExprContext[];
	public templateExpr(i: number): TemplateExprContext;
	public templateExpr(i?: number): TemplateExprContext | TemplateExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TemplateExprContext);
		} else {
			return this.getRuleContext(i, TemplateExprContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_objectBody; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterObjectBody) {
			listener.enterObjectBody(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitObjectBody) {
			listener.exitObjectBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitObjectBody) {
			return visitor.visitObjectBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyContext extends ParserRuleContext {
	public _id!: IdentifierAtomContext;
	public _objectName!: IdentifierAtomContext;
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ASSIGN, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.COLON, 0); }
	public curlyObjectBody(): CurlyObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, CurlyObjectBodyContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public dictionaryProperty(): DictionaryPropertyContext | undefined {
		return this.tryGetRuleContext(0, DictionaryPropertyContext);
	}
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STATIC, 0); }
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.SEMICOLON, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.COMMA);
		} else {
			return this.getToken(Tads3Parser.COMMA, i);
		}
	}
	public superTypes(): SuperTypesContext[];
	public superTypes(i: number): SuperTypesContext;
	public superTypes(i?: number): SuperTypesContext | SuperTypesContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SuperTypesContext);
		} else {
			return this.getRuleContext(i, SuperTypesContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_property; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterProperty) {
			listener.enterProperty(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitProperty) {
			listener.exitProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitProperty) {
			return visitor.visitProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DictionaryPropertyContext extends ParserRuleContext {
	public SSTR(): TerminalNode[];
	public SSTR(i: number): TerminalNode;
	public SSTR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.SSTR);
		} else {
			return this.getToken(Tads3Parser.SSTR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_dictionaryProperty; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterDictionaryProperty) {
			listener.enterDictionaryProperty(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitDictionaryProperty) {
			listener.exitDictionaryProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitDictionaryProperty) {
			return visitor.visitDictionaryProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertySetContext extends ParserRuleContext {
	public _prefix!: Token;
	public curlyObjectBody(): CurlyObjectBodyContext {
		return this.getRuleContext(0, CurlyObjectBodyContext);
	}
	public PROPERTYSET(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.PROPERTYSET, 0); }
	public paramsWithWildcard(): ParamsWithWildcardContext | undefined {
		return this.tryGetRuleContext(0, ParamsWithWildcardContext);
	}
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_PAREN, 0); }
	public SSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.SSTR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_propertySet; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterPropertySet) {
			listener.enterPropertySet(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitPropertySet) {
			listener.exitPropertySet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitPropertySet) {
			return visitor.visitPropertySet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamsWithWildcardContext extends ParserRuleContext {
	public _primary!: PrimaryContext;
	public _parameters: PrimaryContext[] = [];
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STAR, 0); }
	public primary(): PrimaryContext | undefined {
		return this.tryGetRuleContext(0, PrimaryContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.COMMA);
		} else {
			return this.getToken(Tads3Parser.COMMA, i);
		}
	}
	public paramsWithWildcard(): ParamsWithWildcardContext[];
	public paramsWithWildcard(i: number): ParamsWithWildcardContext;
	public paramsWithWildcard(i?: number): ParamsWithWildcardContext | ParamsWithWildcardContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamsWithWildcardContext);
		} else {
			return this.getRuleContext(i, ParamsWithWildcardContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_paramsWithWildcard; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterParamsWithWildcard) {
			listener.enterParamsWithWildcard(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitParamsWithWildcard) {
			listener.exitParamsWithWildcard(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitParamsWithWildcard) {
			return visitor.visitParamsWithWildcard(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionDeclarationContext extends ParserRuleContext {
	public _isModify!: Token;
	public _isReplace!: Token;
	public functionHead(): FunctionHeadContext | undefined {
		return this.tryGetRuleContext(0, FunctionHeadContext);
	}
	public codeBlock(): CodeBlockContext | undefined {
		return this.tryGetRuleContext(0, CodeBlockContext);
	}
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MODIFY, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.REPLACE, 0); }
	public operatorOverride(): OperatorOverrideContext | undefined {
		return this.tryGetRuleContext(0, OperatorOverrideContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_functionDeclaration; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterFunctionDeclaration) {
			listener.enterFunctionDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitFunctionDeclaration) {
			listener.exitFunctionDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitFunctionDeclaration) {
			return visitor.visitFunctionDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperatorOverrideContext extends ParserRuleContext {
	public OPERATOR(): TerminalNode { return this.getToken(Tads3Parser.OPERATOR, 0); }
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_CURLY, 0); }
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_PAREN, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_PAREN, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MINUS, 0); }
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STAR, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MOD, 0); }
	public POW(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.POW, 0); }
	public ARITHMETIC_LEFT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ARITHMETIC_LEFT, 0); }
	public LOGICAL_RIGHT_SHIFT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LOGICAL_RIGHT_SHIFT, 0); }
	public ARITHMETIC_RIGHT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ARITHMETIC_RIGHT, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.TILDE, 0); }
	public BITWISE_OR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.BITWISE_OR, 0); }
	public AMP(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.AMP, 0); }
	public stats(): StatsContext[];
	public stats(i: number): StatsContext;
	public stats(i?: number): StatsContext | StatsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatsContext);
		} else {
			return this.getRuleContext(i, StatsContext);
		}
	}
	public LEFT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_BRACKET, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ASSIGN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_operatorOverride; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterOperatorOverride) {
			listener.enterOperatorOverride(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitOperatorOverride) {
			listener.exitOperatorOverride(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitOperatorOverride) {
			return visitor.visitOperatorOverride(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionHeadContext extends ParserRuleContext {
	public _isExtern!: Token;
	public _isStatic!: Token;
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public FUNCTION(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.FUNCTION, 0); }
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_PAREN, 0); }
	public EXTERN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.EXTERN, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STATIC, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_functionHead; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterFunctionHead) {
			listener.enterFunctionHead(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitFunctionHead) {
			listener.exitFunctionHead(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitFunctionHead) {
			return visitor.visitFunctionHead(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodeBlockContext extends ParserRuleContext {
	public LEFT_CURLY(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_CURLY, 0); }
	public stats(): StatsContext[];
	public stats(i: number): StatsContext;
	public stats(i?: number): StatsContext | StatsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatsContext);
		} else {
			return this.getRuleContext(i, StatsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_codeBlock; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterCodeBlock) {
			listener.enterCodeBlock(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitCodeBlock) {
			listener.exitCodeBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitCodeBlock) {
			return visitor.visitCodeBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatsContext extends ParserRuleContext {
	public assignmentStatement(): AssignmentStatementContext | undefined {
		return this.tryGetRuleContext(0, AssignmentStatementContext);
	}
	public ifStatement(): IfStatementContext | undefined {
		return this.tryGetRuleContext(0, IfStatementContext);
	}
	public tryCatchStatement(): TryCatchStatementContext | undefined {
		return this.tryGetRuleContext(0, TryCatchStatementContext);
	}
	public forStatement(): ForStatementContext | undefined {
		return this.tryGetRuleContext(0, ForStatementContext);
	}
	public doWhileStatement(): DoWhileStatementContext | undefined {
		return this.tryGetRuleContext(0, DoWhileStatementContext);
	}
	public whileStatement(): WhileStatementContext | undefined {
		return this.tryGetRuleContext(0, WhileStatementContext);
	}
	public switchStatement(): SwitchStatementContext | undefined {
		return this.tryGetRuleContext(0, SwitchStatementContext);
	}
	public forInStatement(): ForInStatementContext | undefined {
		return this.tryGetRuleContext(0, ForInStatementContext);
	}
	public forEachStatement(): ForEachStatementContext | undefined {
		return this.tryGetRuleContext(0, ForEachStatementContext);
	}
	public sayStatement(): SayStatementContext | undefined {
		return this.tryGetRuleContext(0, SayStatementContext);
	}
	public emptyStatement(): EmptyStatementContext | undefined {
		return this.tryGetRuleContext(0, EmptyStatementContext);
	}
	public returnStatement(): ReturnStatementContext | undefined {
		return this.tryGetRuleContext(0, ReturnStatementContext);
	}
	public throwStatement(): ThrowStatementContext | undefined {
		return this.tryGetRuleContext(0, ThrowStatementContext);
	}
	public labelStatement(): LabelStatementContext | undefined {
		return this.tryGetRuleContext(0, LabelStatementContext);
	}
	public breakStatement(): BreakStatementContext | undefined {
		return this.tryGetRuleContext(0, BreakStatementContext);
	}
	public continueStatement(): ContinueStatementContext | undefined {
		return this.tryGetRuleContext(0, ContinueStatementContext);
	}
	public gotoStatement(): GotoStatementContext | undefined {
		return this.tryGetRuleContext(0, GotoStatementContext);
	}
	public innerCodeBlock(): InnerCodeBlockContext | undefined {
		return this.tryGetRuleContext(0, InnerCodeBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_stats; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterStats) {
			listener.enterStats(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitStats) {
			listener.exitStats(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitStats) {
			return visitor.visitStats(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InnerCodeBlockContext extends ParserRuleContext {
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_CURLY, 0); }
	public stats(): StatsContext[];
	public stats(i: number): StatsContext;
	public stats(i?: number): StatsContext | StatsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatsContext);
		} else {
			return this.getRuleContext(i, StatsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_innerCodeBlock; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterInnerCodeBlock) {
			listener.enterInnerCodeBlock(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitInnerCodeBlock) {
			listener.exitInnerCodeBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitInnerCodeBlock) {
			return visitor.visitInnerCodeBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GotoStatementContext extends ParserRuleContext {
	public _label!: IdentifierAtomContext;
	public GOTO(): TerminalNode { return this.getToken(Tads3Parser.GOTO, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_gotoStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterGotoStatement) {
			listener.enterGotoStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitGotoStatement) {
			listener.exitGotoStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitGotoStatement) {
			return visitor.visitGotoStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BreakStatementContext extends ParserRuleContext {
	public _label!: IdentifierAtomContext;
	public BREAK(): TerminalNode { return this.getToken(Tads3Parser.BREAK, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_breakStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterBreakStatement) {
			listener.enterBreakStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitBreakStatement) {
			listener.exitBreakStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitBreakStatement) {
			return visitor.visitBreakStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContinueStatementContext extends ParserRuleContext {
	public _label!: IdentifierAtomContext;
	public CONTINUE(): TerminalNode { return this.getToken(Tads3Parser.CONTINUE, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_continueStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterContinueStatement) {
			listener.enterContinueStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitContinueStatement) {
			listener.exitContinueStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitContinueStatement) {
			return visitor.visitContinueStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LabelStatementContext extends ParserRuleContext {
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public COLON(): TerminalNode { return this.getToken(Tads3Parser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_labelStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterLabelStatement) {
			listener.enterLabelStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitLabelStatement) {
			listener.exitLabelStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitLabelStatement) {
			return visitor.visitLabelStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwitchStatementContext extends ParserRuleContext {
	public SWITCH(): TerminalNode { return this.getToken(Tads3Parser.SWITCH, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_CURLY, 0); }
	public COLON(): TerminalNode[];
	public COLON(i: number): TerminalNode;
	public COLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.COLON);
		} else {
			return this.getToken(Tads3Parser.COLON, i);
		}
	}
	public DEFAULT(): TerminalNode[];
	public DEFAULT(i: number): TerminalNode;
	public DEFAULT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.DEFAULT);
		} else {
			return this.getToken(Tads3Parser.DEFAULT, i);
		}
	}
	public codeBlock(): CodeBlockContext[];
	public codeBlock(i: number): CodeBlockContext;
	public codeBlock(i?: number): CodeBlockContext | CodeBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CodeBlockContext);
		} else {
			return this.getRuleContext(i, CodeBlockContext);
		}
	}
	public CASE(): TerminalNode[];
	public CASE(i: number): TerminalNode;
	public CASE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.CASE);
		} else {
			return this.getToken(Tads3Parser.CASE, i);
		}
	}
	public stats(): StatsContext[];
	public stats(i: number): StatsContext;
	public stats(i?: number): StatsContext | StatsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatsContext);
		} else {
			return this.getRuleContext(i, StatsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_switchStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterSwitchStatement) {
			listener.enterSwitchStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitSwitchStatement) {
			listener.exitSwitchStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitSwitchStatement) {
			return visitor.visitSwitchStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ThrowStatementContext extends ParserRuleContext {
	public THROW(): TerminalNode { return this.getToken(Tads3Parser.THROW, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_throwStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterThrowStatement) {
			listener.enterThrowStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitThrowStatement) {
			listener.exitThrowStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitThrowStatement) {
			return visitor.visitThrowStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForInStatementContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(Tads3Parser.FOR, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public LOCAL(): TerminalNode { return this.getToken(Tads3Parser.LOCAL, 0); }
	public ID(): TerminalNode { return this.getToken(Tads3Parser.ID, 0); }
	public IN(): TerminalNode { return this.getToken(Tads3Parser.IN, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_forInStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterForInStatement) {
			listener.enterForInStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitForInStatement) {
			listener.exitForInStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitForInStatement) {
			return visitor.visitForInStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForEachStatementContext extends ParserRuleContext {
	public FOREACH(): TerminalNode { return this.getToken(Tads3Parser.FOREACH, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public IN(): TerminalNode { return this.getToken(Tads3Parser.IN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_forEachStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterForEachStatement) {
			listener.enterForEachStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitForEachStatement) {
			listener.exitForEachStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitForEachStatement) {
			return visitor.visitForEachStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnStatementContext extends ParserRuleContext {
	public RETURN(): TerminalNode { return this.getToken(Tads3Parser.RETURN, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_returnStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterReturnStatement) {
			listener.enterReturnStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitReturnStatement) {
			listener.exitReturnStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitReturnStatement) {
			return visitor.visitReturnStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DoWhileStatementContext extends ParserRuleContext {
	public DO(): TerminalNode { return this.getToken(Tads3Parser.DO, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	public WHILE(): TerminalNode { return this.getToken(Tads3Parser.WHILE, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_doWhileStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterDoWhileStatement) {
			listener.enterDoWhileStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitDoWhileStatement) {
			listener.exitDoWhileStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitDoWhileStatement) {
			return visitor.visitDoWhileStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhileStatementContext extends ParserRuleContext {
	public WHILE(): TerminalNode { return this.getToken(Tads3Parser.WHILE, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_whileStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterWhileStatement) {
			listener.enterWhileStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitWhileStatement) {
			listener.exitWhileStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitWhileStatement) {
			return visitor.visitWhileStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForStatementContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(Tads3Parser.FOR, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.SEMICOLON);
		} else {
			return this.getToken(Tads3Parser.SEMICOLON, i);
		}
	}
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_forStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterForStatement) {
			listener.enterForStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitForStatement) {
			listener.exitForStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitForStatement) {
			return visitor.visitForStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TryCatchStatementContext extends ParserRuleContext {
	public TRY(): TerminalNode { return this.getToken(Tads3Parser.TRY, 0); }
	public codeBlock(): CodeBlockContext[];
	public codeBlock(i: number): CodeBlockContext;
	public codeBlock(i?: number): CodeBlockContext | CodeBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CodeBlockContext);
		} else {
			return this.getRuleContext(i, CodeBlockContext);
		}
	}
	public CATCH(): TerminalNode[];
	public CATCH(i: number): TerminalNode;
	public CATCH(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.CATCH);
		} else {
			return this.getToken(Tads3Parser.CATCH, i);
		}
	}
	public LEFT_PAREN(): TerminalNode[];
	public LEFT_PAREN(i: number): TerminalNode;
	public LEFT_PAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.LEFT_PAREN);
		} else {
			return this.getToken(Tads3Parser.LEFT_PAREN, i);
		}
	}
	public RIGHT_PAREN(): TerminalNode[];
	public RIGHT_PAREN(i: number): TerminalNode;
	public RIGHT_PAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.RIGHT_PAREN);
		} else {
			return this.getToken(Tads3Parser.RIGHT_PAREN, i);
		}
	}
	public FINALLY(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.FINALLY, 0); }
	public params(): ParamsContext[];
	public params(i: number): ParamsContext;
	public params(i?: number): ParamsContext | ParamsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamsContext);
		} else {
			return this.getRuleContext(i, ParamsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_tryCatchStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterTryCatchStatement) {
			listener.enterTryCatchStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitTryCatchStatement) {
			listener.exitTryCatchStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitTryCatchStatement) {
			return visitor.visitTryCatchStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CallStatementContext extends ParserRuleContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.DOT, 0); }
	public callStatement(): CallStatementContext | undefined {
		return this.tryGetRuleContext(0, CallStatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_callStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterCallStatement) {
			listener.enterCallStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitCallStatement) {
			listener.exitCallStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitCallStatement) {
			return visitor.visitCallStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EmptyStatementContext extends ParserRuleContext {
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_emptyStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterEmptyStatement) {
			listener.enterEmptyStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitEmptyStatement) {
			listener.exitEmptyStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitEmptyStatement) {
			return visitor.visitEmptyStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SayStatementContext extends ParserRuleContext {
	public DSTR(): TerminalNode { return this.getToken(Tads3Parser.DSTR, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_sayStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterSayStatement) {
			listener.enterSayStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitSayStatement) {
			listener.exitSayStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitSayStatement) {
			return visitor.visitSayStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentStatementContext extends ParserRuleContext {
	public LOCAL(): TerminalNode { return this.getToken(Tads3Parser.LOCAL, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3Parser.SEMICOLON, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ASSIGN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_assignmentStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterAssignmentStatement) {
			listener.enterAssignmentStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitAssignmentStatement) {
			listener.exitAssignmentStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitAssignmentStatement) {
			return visitor.visitAssignmentStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfStatementContext extends ParserRuleContext {
	public _ifExprAndBlock!: EnclosedExprCodeBlockContext;
	public _elseIfExprAndBlock!: EnclosedExprCodeBlockContext;
	public _elseBlock!: CodeBlockContext;
	public IF(): TerminalNode[];
	public IF(i: number): TerminalNode;
	public IF(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.IF);
		} else {
			return this.getToken(Tads3Parser.IF, i);
		}
	}
	public enclosedExprCodeBlock(): EnclosedExprCodeBlockContext[];
	public enclosedExprCodeBlock(i: number): EnclosedExprCodeBlockContext;
	public enclosedExprCodeBlock(i?: number): EnclosedExprCodeBlockContext | EnclosedExprCodeBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EnclosedExprCodeBlockContext);
		} else {
			return this.getRuleContext(i, EnclosedExprCodeBlockContext);
		}
	}
	public ELSE(): TerminalNode[];
	public ELSE(i: number): TerminalNode;
	public ELSE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.ELSE);
		} else {
			return this.getToken(Tads3Parser.ELSE, i);
		}
	}
	public codeBlock(): CodeBlockContext | undefined {
		return this.tryGetRuleContext(0, CodeBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_ifStatement; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterIfStatement) {
			listener.enterIfStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitIfStatement) {
			listener.exitIfStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitIfStatement) {
			return visitor.visitIfStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnclosedExprCodeBlockContext extends ParserRuleContext {
	public _expression!: ExprContext;
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_enclosedExprCodeBlock; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterEnclosedExprCodeBlock) {
			listener.enterEnclosedExprCodeBlock(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitEnclosedExprCodeBlock) {
			listener.exitEnclosedExprCodeBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitEnclosedExprCodeBlock) {
			return visitor.visitEnclosedExprCodeBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_expr; }
	public copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class ArrayExprContext extends ExprContext {
	public LEFT_BRACKET(): TerminalNode { return this.getToken(Tads3Parser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_BRACKET, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterArrayExpr) {
			listener.enterArrayExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitArrayExpr) {
			listener.exitArrayExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitArrayExpr) {
			return visitor.visitArrayExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MemberExprContext extends ExprContext {
	public _prev!: ExprContext;
	public _next!: ExprContext;
	public DOT(): TerminalNode { return this.getToken(Tads3Parser.DOT, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterMemberExpr) {
			listener.enterMemberExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitMemberExpr) {
			listener.exitMemberExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitMemberExpr) {
			return visitor.visitMemberExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LEFT_BRACKET(): TerminalNode { return this.getToken(Tads3Parser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_BRACKET, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterIndexExpr) {
			listener.enterIndexExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitIndexExpr) {
			listener.exitIndexExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitIndexExpr) {
			return visitor.visitIndexExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CommaExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public COMMA(): TerminalNode { return this.getToken(Tads3Parser.COMMA, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterCommaExpr) {
			listener.enterCommaExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitCommaExpr) {
			listener.exitCommaExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitCommaExpr) {
			return visitor.visitCommaExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RangeExprContext extends ExprContext {
	public _hasStep!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public RANGE(): TerminalNode { return this.getToken(Tads3Parser.RANGE, 0); }
	public STEP(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STEP, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterRangeExpr) {
			listener.enterRangeExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitRangeExpr) {
			listener.exitRangeExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitRangeExpr) {
			return visitor.visitRangeExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DelegatedExpressionContext extends ExprContext {
	public DELEGATED(): TerminalNode { return this.getToken(Tads3Parser.DELEGATED, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterDelegatedExpression) {
			listener.enterDelegatedExpression(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitDelegatedExpression) {
			listener.exitDelegatedExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitDelegatedExpression) {
			return visitor.visitDelegatedExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InheritedExpressionContext extends ExprContext {
	public INHERITED(): TerminalNode { return this.getToken(Tads3Parser.INHERITED, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterInheritedExpression) {
			listener.enterInheritedExpression(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitInheritedExpression) {
			listener.exitInheritedExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitInheritedExpression) {
			return visitor.visitInheritedExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TransientExpressionContext extends ExprContext {
	public TRANSIENT(): TerminalNode { return this.getToken(Tads3Parser.TRANSIENT, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterTransientExpression) {
			listener.enterTransientExpression(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitTransientExpression) {
			listener.exitTransientExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitTransientExpression) {
			return visitor.visitTransientExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PrimaryExprContext extends ExprContext {
	public primary(): PrimaryContext {
		return this.getRuleContext(0, PrimaryContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterPrimaryExpr) {
			listener.enterPrimaryExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitPrimaryExpr) {
			listener.exitPrimaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitPrimaryExpr) {
			return visitor.visitPrimaryExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CallWithParamsExprContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	public params(): ParamsContext[];
	public params(i: number): ParamsContext;
	public params(i?: number): ParamsContext | ParamsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamsContext);
		} else {
			return this.getRuleContext(i, ParamsContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterCallWithParamsExpr) {
			listener.enterCallWithParamsExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitCallWithParamsExpr) {
			listener.exitCallWithParamsExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitCallWithParamsExpr) {
			return visitor.visitCallWithParamsExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExprWithParenExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterExprWithParenExpr) {
			listener.enterExprWithParenExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitExprWithParenExpr) {
			listener.exitExprWithParenExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitExprWithParenExpr) {
			return visitor.visitExprWithParenExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExprWithAnonymousObjectExpr2Context extends ExprContext {
	public ID(): TerminalNode { return this.getToken(Tads3Parser.ID, 0); }
	public curlyObjectBody(): CurlyObjectBodyContext {
		return this.getRuleContext(0, CurlyObjectBodyContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterExprWithAnonymousObjectExpr2) {
			listener.enterExprWithAnonymousObjectExpr2(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitExprWithAnonymousObjectExpr2) {
			listener.exitExprWithAnonymousObjectExpr2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitExprWithAnonymousObjectExpr2) {
			return visitor.visitExprWithAnonymousObjectExpr2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExprWithAnonymousObjectExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.LEFT_CURLY, 0); }
	public COLON(): TerminalNode { return this.getToken(Tads3Parser.COLON, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_CURLY, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterExprWithAnonymousObjectExpr) {
			listener.enterExprWithAnonymousObjectExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitExprWithAnonymousObjectExpr) {
			listener.exitExprWithAnonymousObjectExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitExprWithAnonymousObjectExpr) {
			return visitor.visitExprWithAnonymousObjectExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public COLON(): TerminalNode { return this.getToken(Tads3Parser.COLON, 0); }
	public superTypes(): SuperTypesContext {
		return this.getRuleContext(0, SuperTypesContext);
	}
	public curlyObjectBody(): CurlyObjectBodyContext {
		return this.getRuleContext(0, CurlyObjectBodyContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterExprWithAnonymousObjectUsingMultipleSuperTypesExpr) {
			listener.enterExprWithAnonymousObjectUsingMultipleSuperTypesExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitExprWithAnonymousObjectUsingMultipleSuperTypesExpr) {
			listener.exitExprWithAnonymousObjectUsingMultipleSuperTypesExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitExprWithAnonymousObjectUsingMultipleSuperTypesExpr) {
			return visitor.visitExprWithAnonymousObjectUsingMultipleSuperTypesExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenExpr2Context extends ExprContext {
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterParenExpr2) {
			listener.enterParenExpr2(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitParenExpr2) {
			listener.exitParenExpr2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitParenExpr2) {
			return visitor.visitParenExpr2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LocalExprContext extends ExprContext {
	public LOCAL(): TerminalNode { return this.getToken(Tads3Parser.LOCAL, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterLocalExpr) {
			listener.enterLocalExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitLocalExpr) {
			listener.exitLocalExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitLocalExpr) {
			return visitor.visitLocalExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StaticExprContext extends ExprContext {
	public STATIC(): TerminalNode { return this.getToken(Tads3Parser.STATIC, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterStaticExpr) {
			listener.enterStaticExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitStaticExpr) {
			listener.exitStaticExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitStaticExpr) {
			return visitor.visitStaticExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NewExprContext extends ExprContext {
	public NEW(): TerminalNode { return this.getToken(Tads3Parser.NEW, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterNewExpr) {
			listener.enterNewExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitNewExpr) {
			listener.exitNewExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitNewExpr) {
			return visitor.visitNewExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReferenceExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public AMP(): TerminalNode { return this.getToken(Tads3Parser.AMP, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterReferenceExpr) {
			listener.enterReferenceExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitReferenceExpr) {
			listener.exitReferenceExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitReferenceExpr) {
			return visitor.visitReferenceExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotInExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LITERAL_NOT(): TerminalNode { return this.getToken(Tads3Parser.LITERAL_NOT, 0); }
	public IN(): TerminalNode { return this.getToken(Tads3Parser.IN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterNotInExpr) {
			listener.enterNotInExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitNotInExpr) {
			listener.exitNotInExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitNotInExpr) {
			return visitor.visitNotInExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IsExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public IS(): TerminalNode { return this.getToken(Tads3Parser.IS, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.IN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterIsExpr) {
			listener.enterIsExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitIsExpr) {
			listener.exitIsExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitIsExpr) {
			return visitor.visitIsExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public IN(): TerminalNode { return this.getToken(Tads3Parser.IN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterInExpr) {
			listener.enterInExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitInExpr) {
			listener.exitInExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitInExpr) {
			return visitor.visitInExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AssignmentExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public ASSIGN(): TerminalNode { return this.getToken(Tads3Parser.ASSIGN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterAssignmentExpr) {
			listener.enterAssignmentExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitAssignmentExpr) {
			listener.exitAssignmentExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitAssignmentExpr) {
			return visitor.visitAssignmentExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IfNilExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public IFNIL(): TerminalNode { return this.getToken(Tads3Parser.IFNIL, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterIfNilExpr) {
			listener.enterIfNilExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitIfNilExpr) {
			listener.exitIfNilExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitIfNilExpr) {
			return visitor.visitIfNilExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AnonymousObjectExprContext extends ExprContext {
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.LEFT_CURLY, 0); }
	public COLON(): TerminalNode { return this.getToken(Tads3Parser.COLON, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_CURLY, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterAnonymousObjectExpr) {
			listener.enterAnonymousObjectExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitAnonymousObjectExpr) {
			listener.exitAnonymousObjectExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitAnonymousObjectExpr) {
			return visitor.visitAnonymousObjectExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BitwiseExprContext extends ExprContext {
	public _op!: Token;
	public _isInc!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public BITWISE_OR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.BITWISE_OR, 0); }
	public AMP(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.AMP, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ASSIGN, 0); }
	public ARITHMETIC_LEFT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ARITHMETIC_LEFT, 0); }
	public ARITHMETIC_RIGHT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ARITHMETIC_RIGHT, 0); }
	public LOGICAL_RIGHT_SHIFT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LOGICAL_RIGHT_SHIFT, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterBitwiseExpr) {
			listener.enterBitwiseExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitBitwiseExpr) {
			listener.exitBitwiseExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitBitwiseExpr) {
			return visitor.visitBitwiseExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndOrExprContext extends ExprContext {
	public _op!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public AND(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.OR, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterAndOrExpr) {
			listener.enterAndOrExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitAndOrExpr) {
			listener.exitAndOrExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitAndOrExpr) {
			return visitor.visitAndOrExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PowerOfExprContext extends ExprContext {
	public _isInc!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public POW(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.POW, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ASSIGN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterPowerOfExpr) {
			listener.enterPowerOfExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitPowerOfExpr) {
			listener.exitPowerOfExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitPowerOfExpr) {
			return visitor.visitPowerOfExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrowExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public ARROW(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ARROW, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterArrowExpr) {
			listener.enterArrowExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitArrowExpr) {
			listener.exitArrowExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitArrowExpr) {
			return visitor.visitArrowExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrowExpr2Context extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public ARROW(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ARROW, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterArrowExpr2) {
			listener.enterArrowExpr2(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitArrowExpr2) {
			listener.exitArrowExpr2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitArrowExpr2) {
			return visitor.visitArrowExpr2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrowExpr3Context extends ExprContext {
	public STAR(): TerminalNode { return this.getToken(Tads3Parser.STAR, 0); }
	public ARROW(): TerminalNode { return this.getToken(Tads3Parser.ARROW, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterArrowExpr3) {
			listener.enterArrowExpr3(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitArrowExpr3) {
			listener.exitArrowExpr3(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitArrowExpr3) {
			return visitor.visitArrowExpr3(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplicationExprContext extends ExprContext {
	public _op!: Token;
	public _isInc!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STAR, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MOD, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ASSIGN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterMultiplicationExpr) {
			listener.enterMultiplicationExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitMultiplicationExpr) {
			listener.exitMultiplicationExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitMultiplicationExpr) {
			return visitor.visitMultiplicationExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditiveExprContext extends ExprContext {
	public _op!: Token;
	public _isInc!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MINUS, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ASSIGN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterAdditiveExpr) {
			listener.enterAdditiveExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitAdditiveExpr) {
			listener.exitAdditiveExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitAdditiveExpr) {
			return visitor.visitAdditiveExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RelationalExprContext extends ExprContext {
	public _op!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LTEQ(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LTEQ, 0); }
	public GTEQ(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.GTEQ, 0); }
	public LT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.GT, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterRelationalExpr) {
			listener.enterRelationalExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitRelationalExpr) {
			listener.exitRelationalExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitRelationalExpr) {
			return visitor.visitRelationalExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualityExprContext extends ExprContext {
	public _op!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public EQ(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.EQ, 0); }
	public NEQ(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.NEQ, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterEqualityExpr) {
			listener.enterEqualityExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitEqualityExpr) {
			listener.exitEqualityExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitEqualityExpr) {
			return visitor.visitEqualityExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryExprContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public AT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.AT, 0); }
	public AMP(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.AMP, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.NOT, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MINUS, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.TILDE, 0); }
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STAR, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterUnaryExpr) {
			listener.enterUnaryExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitUnaryExpr) {
			listener.exitUnaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitUnaryExpr) {
			return visitor.visitUnaryExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PostFixExprContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.PLUS);
		} else {
			return this.getToken(Tads3Parser.PLUS, i);
		}
	}
	public MINUS(): TerminalNode[];
	public MINUS(i: number): TerminalNode;
	public MINUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.MINUS);
		} else {
			return this.getToken(Tads3Parser.MINUS, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterPostFixExpr) {
			listener.enterPostFixExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitPostFixExpr) {
			listener.exitPostFixExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitPostFixExpr) {
			return visitor.visitPostFixExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TernaryExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public OPTIONAL(): TerminalNode { return this.getToken(Tads3Parser.OPTIONAL, 0); }
	public COLON(): TerminalNode { return this.getToken(Tads3Parser.COLON, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterTernaryExpr) {
			listener.enterTernaryExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitTernaryExpr) {
			listener.exitTernaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitTernaryExpr) {
			return visitor.visitTernaryExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AnonymousFunctionExprContext extends ExprContext {
	public functionDeclaration(): FunctionDeclarationContext {
		return this.getRuleContext(0, FunctionDeclarationContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterAnonymousFunctionExpr) {
			listener.enterAnonymousFunctionExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitAnonymousFunctionExpr) {
			listener.exitAnonymousFunctionExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitAnonymousFunctionExpr) {
			return visitor.visitAnonymousFunctionExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_primary; }
	public copyFrom(ctx: PrimaryContext): void {
		super.copyFrom(ctx);
	}
}
export class InheritedAtomContext extends PrimaryContext {
	public INHERITED(): TerminalNode { return this.getToken(Tads3Parser.INHERITED, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterInheritedAtom) {
			listener.enterInheritedAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitInheritedAtom) {
			listener.exitInheritedAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitInheritedAtom) {
			return visitor.visitInheritedAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class HexAtomContext extends PrimaryContext {
	public HEX(): TerminalNode { return this.getToken(Tads3Parser.HEX, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterHexAtom) {
			listener.enterHexAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitHexAtom) {
			listener.exitHexAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitHexAtom) {
			return visitor.visitHexAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberAtomContext extends PrimaryContext {
	public NR(): TerminalNode { return this.getToken(Tads3Parser.NR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterNumberAtom) {
			listener.enterNumberAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitNumberAtom) {
			listener.exitNumberAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitNumberAtom) {
			return visitor.visitNumberAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReferenceAtomContext extends PrimaryContext {
	public AMP(): TerminalNode { return this.getToken(Tads3Parser.AMP, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterReferenceAtom) {
			listener.enterReferenceAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitReferenceAtom) {
			listener.exitReferenceAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitReferenceAtom) {
			return visitor.visitReferenceAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IdAtomContext extends PrimaryContext {
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterIdAtom) {
			listener.enterIdAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitIdAtom) {
			listener.exitIdAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitIdAtom) {
			return visitor.visitIdAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DoubleQuotestringAtomContext extends PrimaryContext {
	public SSTR(): TerminalNode { return this.getToken(Tads3Parser.SSTR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterDoubleQuotestringAtom) {
			listener.enterDoubleQuotestringAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitDoubleQuotestringAtom) {
			listener.exitDoubleQuotestringAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitDoubleQuotestringAtom) {
			return visitor.visitDoubleQuotestringAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SingleQuotestringAtomContext extends PrimaryContext {
	public DSTR(): TerminalNode { return this.getToken(Tads3Parser.DSTR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterSingleQuotestringAtom) {
			listener.enterSingleQuotestringAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitSingleQuotestringAtom) {
			listener.exitSingleQuotestringAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitSingleQuotestringAtom) {
			return visitor.visitSingleQuotestringAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RegexpStringAtomContext extends PrimaryContext {
	public RSTR(): TerminalNode { return this.getToken(Tads3Parser.RSTR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterRegexpStringAtom) {
			listener.enterRegexpStringAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitRegexpStringAtom) {
			listener.exitRegexpStringAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitRegexpStringAtom) {
			return visitor.visitRegexpStringAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanAtomContext extends PrimaryContext {
	public TRUE(): TerminalNode { return this.getToken(Tads3Parser.TRUE, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterBooleanAtom) {
			listener.enterBooleanAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitBooleanAtom) {
			listener.exitBooleanAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitBooleanAtom) {
			return visitor.visitBooleanAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NilAtomContext extends PrimaryContext {
	public NIL(): TerminalNode { return this.getToken(Tads3Parser.NIL, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterNilAtom) {
			listener.enterNilAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitNilAtom) {
			listener.exitNilAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitNilAtom) {
			return visitor.visitNilAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierAtomContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ID, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.IN, 0); }
	public IS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.IS, 0); }
	public STEP(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STEP, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STRING, 0); }
	public OPERATOR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.OPERATOR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_identifierAtom; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterIdentifierAtom) {
			listener.enterIdentifierAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitIdentifierAtom) {
			listener.exitIdentifierAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitIdentifierAtom) {
			return visitor.visitIdentifierAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamsContext extends ParserRuleContext {
	public _hasMore!: Token;
	public _tail!: ParamsContext;
	public optionallyTypedOptionalId(): OptionallyTypedOptionalIdContext | undefined {
		return this.tryGetRuleContext(0, OptionallyTypedOptionalIdContext);
	}
	public SPREAD(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.SPREAD, 0); }
	public array(): ArrayContext | undefined {
		return this.tryGetRuleContext(0, ArrayContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.COMMA);
		} else {
			return this.getToken(Tads3Parser.COMMA, i);
		}
	}
	public params(): ParamsContext[];
	public params(i: number): ParamsContext;
	public params(i?: number): ParamsContext | ParamsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamsContext);
		} else {
			return this.getRuleContext(i, ParamsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_params; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterParams) {
			listener.enterParams(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitParams) {
			listener.exitParams(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitParams) {
			return visitor.visitParams(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptionallyTypedOptionalIdContext extends ParserRuleContext {
	public _identifier!: IdentifierAtomContext;
	public _type!: IdentifierAtomContext;
	public _name!: IdentifierAtomContext;
	public _optional!: Token;
	public _emptyColon!: Token;
	public _hasDefault!: Token;
	public _defaultValue!: ExprContext;
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.COLON, 0); }
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public OPTIONAL(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.OPTIONAL, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ASSIGN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3Parser.RULE_optionallyTypedOptionalId; }
	// @Override
	public enterRule(listener: Tads3Listener): void {
		if (listener.enterOptionallyTypedOptionalId) {
			listener.enterOptionallyTypedOptionalId(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3Listener): void {
		if (listener.exitOptionallyTypedOptionalId) {
			listener.exitOptionallyTypedOptionalId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3Visitor<Result>): Result {
		if (visitor.visitOptionallyTypedOptionalId) {
			return visitor.visitOptionallyTypedOptionalId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


