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
	public static readonly AT = 47;
	public static readonly AMP = 48;
	public static readonly HASH = 49;
	public static readonly NOT = 50;
	public static readonly OPTIONAL = 51;
	public static readonly IFNIL = 52;
	public static readonly PLUS = 53;
	public static readonly DIV = 54;
	public static readonly MOD = 55;
	public static readonly MINUS = 56;
	public static readonly NEQ = 57;
	public static readonly EQ = 58;
	public static readonly AND = 59;
	public static readonly OR = 60;
	public static readonly ARROW = 61;
	public static readonly TILDE = 62;
	public static readonly POW = 63;
	public static readonly ID = 64;
	public static readonly ASSIGN = 65;
	public static readonly NR = 66;
	public static readonly HEX = 67;
	public static readonly OCT = 68;
	public static readonly COLON = 69;
	public static readonly COMMA = 70;
	public static readonly DOT = 71;
	public static readonly STAR = 72;
	public static readonly BITWISE_OR = 73;
	public static readonly SEMICOLON = 74;
	public static readonly LEFT_PAREN = 75;
	public static readonly RIGHT_PAREN = 76;
	public static readonly LEFT_BRACKET = 77;
	public static readonly RIGHT_BRACKET = 78;
	public static readonly DSTR = 79;
	public static readonly SSTR = 80;
	public static readonly RSTR = 81;
	public static readonly LEFT_CURLY = 82;
	public static readonly RIGHT_CURLY = 83;
	public static readonly LTEQ = 84;
	public static readonly ARITHMETIC_LEFT = 85;
	public static readonly LT = 86;
	public static readonly GTEQ = 87;
	public static readonly GT = 88;
	public static readonly ARITHMETIC_RIGHT = 89;
	public static readonly LOGICAL_RIGHT_SHIFT = 90;
	public static readonly COMMENT = 91;
	public static readonly LINE_COMMENT = 92;
	public static readonly WS = 93;
	public static readonly ANY = 94;
	public static readonly RULE_program = 0;
	public static readonly RULE_directive = 1;
	public static readonly RULE_grammarDeclaration = 2;
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
	public static readonly RULE_templateExpr = 15;
	public static readonly RULE_array = 16;
	public static readonly RULE_curlyObjectBody = 17;
	public static readonly RULE_semiColonEndedObjectBody = 18;
	public static readonly RULE_superTypes = 19;
	public static readonly RULE_objectBody = 20;
	public static readonly RULE_property = 21;
	public static readonly RULE_dictionaryProperty = 22;
	public static readonly RULE_propertySet = 23;
	public static readonly RULE_paramsWithWildcard = 24;
	public static readonly RULE_functionDeclaration = 25;
	public static readonly RULE_functionHead = 26;
	public static readonly RULE_codeBlock = 27;
	public static readonly RULE_stats = 28;
	public static readonly RULE_gotoStatement = 29;
	public static readonly RULE_breakStatement = 30;
	public static readonly RULE_continueStatement = 31;
	public static readonly RULE_labelStatement = 32;
	public static readonly RULE_switchStatement = 33;
	public static readonly RULE_throwStatement = 34;
	public static readonly RULE_forInStatement = 35;
	public static readonly RULE_forEachStatement = 36;
	public static readonly RULE_returnStatement = 37;
	public static readonly RULE_doWhileStatement = 38;
	public static readonly RULE_whileStatement = 39;
	public static readonly RULE_forStatement = 40;
	public static readonly RULE_tryCatchStatement = 41;
	public static readonly RULE_callStatement = 42;
	public static readonly RULE_emptyStatement = 43;
	public static readonly RULE_sayStatement = 44;
	public static readonly RULE_assignmentStatement = 45;
	public static readonly RULE_ifStatement = 46;
	public static readonly RULE_enclosedExprCodeBlock = 47;
	public static readonly RULE_expr = 48;
	public static readonly RULE_primary = 49;
	public static readonly RULE_identifierAtom = 50;
	public static readonly RULE_params = 51;
	public static readonly RULE_optionallyTypedOptionalId = 52;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "directive", "grammarDeclaration", "grammarRules", "itemList", 
		"qualifiers", "item", "templateDeclaration", "enumDeclaration", "propertyDeclaration", 
		"dictionaryDeclaration", "exportDeclaration", "intrinsicDeclaration", 
		"intrinsicMethodDeclaration", "objectDeclaration", "templateExpr", "array", 
		"curlyObjectBody", "semiColonEndedObjectBody", "superTypes", "objectBody", 
		"property", "dictionaryProperty", "propertySet", "paramsWithWildcard", 
		"functionDeclaration", "functionHead", "codeBlock", "stats", "gotoStatement", 
		"breakStatement", "continueStatement", "labelStatement", "switchStatement", 
		"throwStatement", "forInStatement", "forEachStatement", "returnStatement", 
		"doWhileStatement", "whileStatement", "forStatement", "tryCatchStatement", 
		"callStatement", "emptyStatement", "sayStatement", "assignmentStatement", 
		"ifStatement", "enclosedExprCodeBlock", "expr", "primary", "identifierAtom", 
		"params", "optionallyTypedOptionalId",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'grammar'", "'switch'", "'case'", "'default'", "'function'", 
		"'throw'", "'new'", "'template'", "'for'", "'try'", "'catch'", "'finally'", 
		"'enum'", "'class'", "'transient'", "'modify'", "'replace'", "'propertyset'", 
		"'if'", "'do'", "'while'", "'else'", "'local'", "'true'", "'nil'", "'intrinsic'", 
		"'inherited'", "'delegated'", "'property'", "'dictionary'", "'export'", 
		"'extern'", "'return'", "'static'", "'string'", "'foreach'", "'in'", "'...'", 
		"'..'", "'step'", "'not'", "'is'", "'break'", "'continue'", "'goto'", 
		"'token'", "'@'", "'&'", "'#'", "'!'", "'?'", "'??'", "'+'", "'/'", "'%'", 
		"'-'", "'!='", "'=='", "'&&'", "'||'", "'->'", "'~'", "'^'", undefined, 
		"'='", undefined, undefined, undefined, "':'", "','", "'.'", "'*'", "'|'", 
		"';'", "'('", "')'", "'['", "']'", undefined, undefined, undefined, "'{'", 
		"'}'", "'<='", "'<<'", "'<'", "'>='", "'>'", "'>>'", "'>>>'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "GRAMMAR", "SWITCH", "CASE", "DEFAULT", "FUNCTION", "THROW", 
		"NEW", "TEMPLATE", "FOR", "TRY", "CATCH", "FINALLY", "ENUM", "CLASS", 
		"TRANSIENT", "MODIFY", "REPLACE", "PROPERTYSET", "IF", "DO", "WHILE", 
		"ELSE", "LOCAL", "TRUE", "NIL", "INTRINSIC", "INHERITED", "DELEGATED", 
		"PROPERTY", "DICTIONARY", "EXPORT", "EXTERN", "RETURN", "STATIC", "STRING", 
		"FOREACH", "IN", "SPREAD", "RANGE", "STEP", "LITERAL_NOT", "IS", "BREAK", 
		"CONTINUE", "GOTO", "TOKEN", "AT", "AMP", "HASH", "NOT", "OPTIONAL", "IFNIL", 
		"PLUS", "DIV", "MOD", "MINUS", "NEQ", "EQ", "AND", "OR", "ARROW", "TILDE", 
		"POW", "ID", "ASSIGN", "NR", "HEX", "OCT", "COLON", "COMMA", "DOT", "STAR", 
		"BITWISE_OR", "SEMICOLON", "LEFT_PAREN", "RIGHT_PAREN", "LEFT_BRACKET", 
		"RIGHT_BRACKET", "DSTR", "SSTR", "RSTR", "LEFT_CURLY", "RIGHT_CURLY", 
		"LTEQ", "ARITHMETIC_LEFT", "LT", "GTEQ", "GT", "ARITHMETIC_RIGHT", "LOGICAL_RIGHT_SHIFT", 
		"COMMENT", "LINE_COMMENT", "WS", "ANY",
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
			this.state = 109;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 1)) & ~0x1F) === 0 && ((1 << (_la - 1)) & ((1 << (Tads3Parser.GRAMMAR - 1)) | (1 << (Tads3Parser.FUNCTION - 1)) | (1 << (Tads3Parser.ENUM - 1)) | (1 << (Tads3Parser.CLASS - 1)) | (1 << (Tads3Parser.TRANSIENT - 1)) | (1 << (Tads3Parser.MODIFY - 1)) | (1 << (Tads3Parser.REPLACE - 1)) | (1 << (Tads3Parser.INTRINSIC - 1)) | (1 << (Tads3Parser.PROPERTY - 1)) | (1 << (Tads3Parser.DICTIONARY - 1)) | (1 << (Tads3Parser.EXPORT - 1)) | (1 << (Tads3Parser.EXTERN - 1)))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (Tads3Parser.STATIC - 34)) | (1 << (Tads3Parser.STRING - 34)) | (1 << (Tads3Parser.IN - 34)) | (1 << (Tads3Parser.PLUS - 34)) | (1 << (Tads3Parser.ID - 34)))) !== 0)) {
				{
				{
				this.state = 106;
				_localctx._directive = this.directive();
				_localctx._directives.push(_localctx._directive);
				}
				}
				this.state = 111;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 112;
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
			this.state = 123;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 114;
				this.enumDeclaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 115;
				this.templateDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 116;
				this.intrinsicDeclaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 117;
				this.exportDeclaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 118;
				this.objectDeclaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 119;
				this.propertyDeclaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 120;
				this.dictionaryDeclaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 121;
				this.functionDeclaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 122;
				this.grammarDeclaration();
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
	public grammarDeclaration(): GrammarDeclarationContext {
		let _localctx: GrammarDeclarationContext = new GrammarDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, Tads3Parser.RULE_grammarDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 127;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.MODIFY:
				{
				this.state = 125;
				_localctx._isModify = this.match(Tads3Parser.MODIFY);
				}
				break;
			case Tads3Parser.REPLACE:
				{
				this.state = 126;
				_localctx._isReplace = this.match(Tads3Parser.REPLACE);
				}
				break;
			case Tads3Parser.GRAMMAR:
				break;
			default:
				break;
			}
			this.state = 129;
			this.match(Tads3Parser.GRAMMAR);
			this.state = 130;
			_localctx._prodName = this.identifierAtom();
			this.state = 135;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.LEFT_PAREN) {
				{
				this.state = 131;
				this.match(Tads3Parser.LEFT_PAREN);
				this.state = 132;
				_localctx._tag = this.identifierAtom();
				this.state = 133;
				this.match(Tads3Parser.RIGHT_PAREN);
				}
			}

			this.state = 137;
			this.match(Tads3Parser.COLON);
			this.state = 138;
			this.grammarRules();
			this.state = 139;
			this.match(Tads3Parser.COLON);
			this.state = 140;
			this.superTypes();
			this.state = 143;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.LEFT_CURLY:
				{
				this.state = 141;
				this.curlyObjectBody();
				}
				break;
			case Tads3Parser.FUNCTION:
			case Tads3Parser.PROPERTYSET:
			case Tads3Parser.EXTERN:
			case Tads3Parser.STATIC:
			case Tads3Parser.STRING:
			case Tads3Parser.IN:
			case Tads3Parser.AT:
			case Tads3Parser.PLUS:
			case Tads3Parser.ARROW:
			case Tads3Parser.ID:
			case Tads3Parser.SEMICOLON:
			case Tads3Parser.LEFT_BRACKET:
			case Tads3Parser.DSTR:
			case Tads3Parser.SSTR:
			case Tads3Parser.RIGHT_CURLY:
				{
				this.state = 142;
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
	public grammarRules(): GrammarRulesContext {
		let _localctx: GrammarRulesContext = new GrammarRulesContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, Tads3Parser.RULE_grammarRules);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 145;
			this.itemList();
			this.state = 150;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.BITWISE_OR) {
				{
				{
				this.state = 146;
				this.match(Tads3Parser.BITWISE_OR);
				this.state = 147;
				this.itemList();
				}
				}
				this.state = 152;
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
			this.state = 154;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 153;
				this.qualifiers();
				}
				break;
			}
			this.state = 159;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 156;
					this.item(0);
					}
					}
				}
				this.state = 161;
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
			this.state = 162;
			this.match(Tads3Parser.LEFT_BRACKET);
			this.state = 163;
			this.identifierAtom();
			this.state = 164;
			this.match(Tads3Parser.NR);
			this.state = 165;
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
			this.state = 180;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 168;
				this.match(Tads3Parser.LEFT_PAREN);
				this.state = 170;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 169;
					this.item(0);
					}
					}
					this.state = 172;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.BITWISE_OR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0));
				this.state = 174;
				this.match(Tads3Parser.RIGHT_PAREN);
				}
				break;

			case 2:
				{
				this.state = 176;
				this.match(Tads3Parser.BITWISE_OR);
				this.state = 177;
				this.item(3);
				}
				break;

			case 3:
				{
				this.state = 178;
				this.expr(0);
				}
				break;

			case 4:
				{
				this.state = 179;
				this.match(Tads3Parser.STAR);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 186;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
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
					this.state = 182;
					if (!(this.precpred(this._ctx, 4))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
					}
					this.state = 183;
					this.match(Tads3Parser.BITWISE_OR);
					}
					}
				}
				this.state = 188;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
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
			this.state = 215;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 189;
				_localctx._className = this.identifierAtom();
				this.state = 190;
				this.match(Tads3Parser.TEMPLATE);
				this.state = 195;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 191;
					_localctx._expr = this.expr(0);
					_localctx._properties.push(_localctx._expr);
					this.state = 193;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === Tads3Parser.OPTIONAL) {
						{
						this.state = 192;
						this.match(Tads3Parser.OPTIONAL);
						}
					}

					}
					}
					this.state = 197;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0));
				this.state = 199;
				this.match(Tads3Parser.SEMICOLON);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 201;
				this.match(Tads3Parser.STRING);
				this.state = 202;
				this.match(Tads3Parser.TEMPLATE);
				this.state = 203;
				this.match(Tads3Parser.ARITHMETIC_LEFT);
				this.state = 208;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0) || _la === Tads3Parser.STAR) {
					{
					this.state = 206;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case Tads3Parser.STRING:
					case Tads3Parser.IN:
					case Tads3Parser.ID:
						{
						this.state = 204;
						this.identifierAtom();
						}
						break;
					case Tads3Parser.STAR:
						{
						this.state = 205;
						this.match(Tads3Parser.STAR);
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					this.state = 210;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 211;
				this.match(Tads3Parser.ARITHMETIC_RIGHT);
				this.state = 212;
				_localctx._templateId = this.identifierAtom();
				this.state = 213;
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
			this.state = 217;
			this.match(Tads3Parser.ENUM);
			this.state = 219;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.TOKEN) {
				{
				this.state = 218;
				_localctx._isToken = this.match(Tads3Parser.TOKEN);
				}
			}

			this.state = 221;
			this.identifierAtom();
			this.state = 226;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.COMMA) {
				{
				{
				this.state = 222;
				this.match(Tads3Parser.COMMA);
				this.state = 223;
				this.identifierAtom();
				}
				}
				this.state = 228;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 229;
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
			this.state = 234;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.PLUS) {
				{
				{
				this.state = 231;
				_localctx._level = this.match(Tads3Parser.PLUS);
				}
				}
				this.state = 236;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 237;
			_localctx._isProperty = this.match(Tads3Parser.PROPERTY);
			this.state = 238;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._identifiers.push(_localctx._identifierAtom);
			this.state = 243;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.COMMA) {
				{
				{
				this.state = 239;
				this.match(Tads3Parser.COMMA);
				this.state = 240;
				_localctx._identifierAtom = this.identifierAtom();
				_localctx._identifiers.push(_localctx._identifierAtom);
				}
				}
				this.state = 245;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 246;
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
			this.state = 251;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.PLUS) {
				{
				{
				this.state = 248;
				_localctx._level = this.match(Tads3Parser.PLUS);
				}
				}
				this.state = 253;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 254;
			this.match(Tads3Parser.DICTIONARY);
			this.state = 256;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.PROPERTY) {
				{
				this.state = 255;
				_localctx._isProperty = this.match(Tads3Parser.PROPERTY);
				}
			}

			this.state = 258;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._identifiers.push(_localctx._identifierAtom);
			this.state = 263;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.COMMA) {
				{
				{
				this.state = 259;
				this.match(Tads3Parser.COMMA);
				this.state = 260;
				_localctx._identifierAtom = this.identifierAtom();
				_localctx._identifiers.push(_localctx._identifierAtom);
				}
				}
				this.state = 265;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 266;
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
			this.state = 268;
			this.match(Tads3Parser.EXPORT);
			this.state = 269;
			this.identifierAtom();
			this.state = 271;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.SSTR) {
				{
				this.state = 270;
				this.match(Tads3Parser.SSTR);
				}
			}

			this.state = 273;
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
			this.state = 275;
			this.match(Tads3Parser.INTRINSIC);
			this.state = 277;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.CLASS) {
				{
				this.state = 276;
				this.match(Tads3Parser.CLASS);
				}
			}

			this.state = 280;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0)) {
				{
				this.state = 279;
				_localctx._name = this.identifierAtom();
				}
			}

			this.state = 283;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.DSTR || _la === Tads3Parser.SSTR) {
				{
				this.state = 282;
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

			this.state = 287;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.COLON) {
				{
				this.state = 285;
				this.match(Tads3Parser.COLON);
				this.state = 286;
				this.superTypes();
				}
			}

			this.state = 289;
			this.match(Tads3Parser.LEFT_CURLY);
			this.state = 293;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (Tads3Parser.STATIC - 34)) | (1 << (Tads3Parser.STRING - 34)) | (1 << (Tads3Parser.IN - 34)) | (1 << (Tads3Parser.ID - 34)))) !== 0)) {
				{
				{
				this.state = 290;
				_localctx._intrinsicMethodDeclaration = this.intrinsicMethodDeclaration();
				_localctx._methods.push(_localctx._intrinsicMethodDeclaration);
				}
				}
				this.state = 295;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 296;
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
			this.state = 299;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.STATIC) {
				{
				this.state = 298;
				this.match(Tads3Parser.STATIC);
				}
			}

			this.state = 301;
			this.identifierAtom();
			{
			this.state = 302;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 304;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 303;
				this.params();
				}
			}

			this.state = 306;
			this.match(Tads3Parser.RIGHT_PAREN);
			}
			this.state = 308;
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
			this.state = 319;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
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

			case 2:
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

			case 3:
				{
				this.state = 317;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.CLASS) {
					{
					this.state = 316;
					_localctx._isClass = this.match(Tads3Parser.CLASS);
					}
				}

				}
				break;
			}
			this.state = 324;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.PLUS) {
				{
				{
				this.state = 321;
				_localctx._PLUS = this.match(Tads3Parser.PLUS);
				_localctx._level.push(_localctx._PLUS);
				}
				}
				this.state = 326;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 335;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				{
				this.state = 327;
				this.superTypes();
				}
				break;

			case 2:
				{
				{
				this.state = 329;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.TRANSIENT) {
					{
					this.state = 328;
					_localctx._isTransient = this.match(Tads3Parser.TRANSIENT);
					}
				}

				this.state = 331;
				_localctx._id = this.identifierAtom();
				this.state = 332;
				this.match(Tads3Parser.COLON);
				this.state = 333;
				this.superTypes();
				}
				}
				break;
			}
			this.state = 339;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.LEFT_CURLY:
				{
				this.state = 337;
				this.curlyObjectBody();
				}
				break;
			case Tads3Parser.FUNCTION:
			case Tads3Parser.PROPERTYSET:
			case Tads3Parser.EXTERN:
			case Tads3Parser.STATIC:
			case Tads3Parser.STRING:
			case Tads3Parser.IN:
			case Tads3Parser.AT:
			case Tads3Parser.PLUS:
			case Tads3Parser.ARROW:
			case Tads3Parser.ID:
			case Tads3Parser.SEMICOLON:
			case Tads3Parser.LEFT_BRACKET:
			case Tads3Parser.DSTR:
			case Tads3Parser.SSTR:
			case Tads3Parser.RIGHT_CURLY:
				{
				this.state = 338;
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
	public templateExpr(): TemplateExprContext {
		let _localctx: TemplateExprContext = new TemplateExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, Tads3Parser.RULE_templateExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 362;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.SSTR:
				{
				this.state = 341;
				_localctx._singleString = this.match(Tads3Parser.SSTR);
				this.state = 343;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
				case 1:
					{
					this.state = 342;
					this.match(Tads3Parser.SEMICOLON);
					}
					break;
				}
				}
				break;
			case Tads3Parser.AT:
				{
				this.state = 345;
				this.match(Tads3Parser.AT);
				this.state = 346;
				_localctx._atLocation = this.identifierAtom();
				}
				break;
			case Tads3Parser.DSTR:
				{
				this.state = 347;
				_localctx._doubleString = this.match(Tads3Parser.DSTR);
				this.state = 349;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 40, this._ctx) ) {
				case 1:
					{
					this.state = 348;
					this.match(Tads3Parser.SEMICOLON);
					}
					break;
				}
				}
				break;
			case Tads3Parser.PLUS:
				{
				this.state = 351;
				this.match(Tads3Parser.PLUS);
				this.state = 352;
				_localctx._number = this.match(Tads3Parser.NR);
				}
				break;
			case Tads3Parser.ARROW:
				{
				this.state = 353;
				this.match(Tads3Parser.ARROW);
				this.state = 356;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 41, this._ctx) ) {
				case 1:
					{
					this.state = 354;
					_localctx._connection = this.identifierAtom();
					}
					break;

				case 2:
					{
					this.state = 355;
					_localctx._expression = this.expr(0);
					}
					break;
				}
				}
				break;
			case Tads3Parser.LEFT_BRACKET:
				{
				this.state = 358;
				this.match(Tads3Parser.LEFT_BRACKET);
				this.state = 359;
				this.array();
				this.state = 360;
				this.match(Tads3Parser.RIGHT_BRACKET);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 365;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.OPTIONAL) {
				{
				this.state = 364;
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
		this.enterRule(_localctx, 32, Tads3Parser.RULE_array);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 367;
			this.expr(0);
			this.state = 372;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 44, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 368;
					this.match(Tads3Parser.COMMA);
					this.state = 369;
					this.array();
					}
					}
				}
				this.state = 374;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 44, this._ctx);
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
		this.enterRule(_localctx, 34, Tads3Parser.RULE_curlyObjectBody);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 375;
			this.match(Tads3Parser.LEFT_CURLY);
			this.state = 376;
			this.objectBody();
			this.state = 377;
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
		this.enterRule(_localctx, 36, Tads3Parser.RULE_semiColonEndedObjectBody);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 379;
			this.objectBody();
			this.state = 380;
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
		this.enterRule(_localctx, 38, Tads3Parser.RULE_superTypes);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 382;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._superType.push(_localctx._identifierAtom);
			this.state = 387;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 383;
					this.match(Tads3Parser.COMMA);
					this.state = 384;
					this.superTypes();
					}
					}
				}
				this.state = 389;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
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
		this.enterRule(_localctx, 40, Tads3Parser.RULE_objectBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 393;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & ((1 << (Tads3Parser.AT - 47)) | (1 << (Tads3Parser.PLUS - 47)) | (1 << (Tads3Parser.ARROW - 47)) | (1 << (Tads3Parser.LEFT_BRACKET - 47)))) !== 0) || _la === Tads3Parser.DSTR || _la === Tads3Parser.SSTR) {
				{
				{
				this.state = 390;
				_localctx._templateExpr = this.templateExpr();
				_localctx._template.push(_localctx._templateExpr);
				}
				}
				this.state = 395;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 401;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & ((1 << (Tads3Parser.FUNCTION - 5)) | (1 << (Tads3Parser.PROPERTYSET - 5)) | (1 << (Tads3Parser.EXTERN - 5)) | (1 << (Tads3Parser.STATIC - 5)) | (1 << (Tads3Parser.STRING - 5)))) !== 0) || _la === Tads3Parser.IN || _la === Tads3Parser.ID) {
				{
				this.state = 399;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 47, this._ctx) ) {
				case 1:
					{
					this.state = 396;
					_localctx._functionDeclaration = this.functionDeclaration();
					_localctx._functions.push(_localctx._functionDeclaration);
					}
					break;

				case 2:
					{
					this.state = 397;
					_localctx._property = this.property();
					_localctx._properties.push(_localctx._property);
					}
					break;

				case 3:
					{
					this.state = 398;
					_localctx._propertySet = this.propertySet();
					_localctx._propertySets.push(_localctx._propertySet);
					}
					break;
				}
				}
				this.state = 403;
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
		this.enterRule(_localctx, 42, Tads3Parser.RULE_property);
		let _la: number;
		try {
			this.state = 438;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 57, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 406;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 49, this._ctx) ) {
				case 1:
					{
					this.state = 404;
					this.identifierAtom();
					}
					break;

				case 2:
					{
					this.state = 405;
					this.match(Tads3Parser.IN);
					}
					break;
				}
				this.state = 408;
				this.match(Tads3Parser.ASSIGN);
				this.state = 410;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 50, this._ctx) ) {
				case 1:
					{
					this.state = 409;
					this.match(Tads3Parser.STATIC);
					}
					break;
				}
				this.state = 414;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 51, this._ctx) ) {
				case 1:
					{
					this.state = 412;
					this.expr(0);
					}
					break;

				case 2:
					{
					this.state = 413;
					this.dictionaryProperty();
					}
					break;
				}
				this.state = 417;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 52, this._ctx) ) {
				case 1:
					{
					this.state = 416;
					this.match(Tads3Parser.SEMICOLON);
					}
					break;
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 421;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 53, this._ctx) ) {
				case 1:
					{
					this.state = 419;
					this.identifierAtom();
					}
					break;

				case 2:
					{
					this.state = 420;
					this.match(Tads3Parser.IN);
					}
					break;
				}
				this.state = 423;
				this.match(Tads3Parser.COLON);
				this.state = 425;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0)) {
					{
					this.state = 424;
					_localctx._objectName = this.identifierAtom();
					}
				}

				this.state = 431;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === Tads3Parser.COMMA) {
					{
					{
					this.state = 427;
					this.match(Tads3Parser.COMMA);
					this.state = 428;
					this.superTypes();
					}
					}
					this.state = 433;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 434;
				this.curlyObjectBody();
				this.state = 436;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 56, this._ctx) ) {
				case 1:
					{
					this.state = 435;
					this.match(Tads3Parser.SEMICOLON);
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
	public dictionaryProperty(): DictionaryPropertyContext {
		let _localctx: DictionaryPropertyContext = new DictionaryPropertyContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, Tads3Parser.RULE_dictionaryProperty);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 443;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.SSTR) {
				{
				{
				this.state = 440;
				this.match(Tads3Parser.SSTR);
				}
				}
				this.state = 445;
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
		this.enterRule(_localctx, 46, Tads3Parser.RULE_propertySet);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 454;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 60, this._ctx) ) {
			case 1:
				{
				this.state = 446;
				this.match(Tads3Parser.PROPERTYSET);
				this.state = 447;
				this.paramsWithWildcard();
				}
				break;

			case 2:
				{
				this.state = 448;
				this.match(Tads3Parser.PROPERTYSET);
				this.state = 449;
				this.match(Tads3Parser.LEFT_PAREN);
				this.state = 451;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 24)) & ~0x1F) === 0 && ((1 << (_la - 24)) & ((1 << (Tads3Parser.TRUE - 24)) | (1 << (Tads3Parser.NIL - 24)) | (1 << (Tads3Parser.INHERITED - 24)) | (1 << (Tads3Parser.STRING - 24)) | (1 << (Tads3Parser.IN - 24)) | (1 << (Tads3Parser.AMP - 24)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)))) !== 0)) {
					{
					this.state = 450;
					this.paramsWithWildcard();
					}
				}

				this.state = 453;
				this.match(Tads3Parser.RIGHT_PAREN);
				}
				break;
			}
			this.state = 456;
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
		this.enterRule(_localctx, 48, Tads3Parser.RULE_paramsWithWildcard);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 460;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.TRUE:
			case Tads3Parser.NIL:
			case Tads3Parser.INHERITED:
			case Tads3Parser.STRING:
			case Tads3Parser.IN:
			case Tads3Parser.AMP:
			case Tads3Parser.ID:
			case Tads3Parser.NR:
			case Tads3Parser.HEX:
			case Tads3Parser.DSTR:
			case Tads3Parser.SSTR:
			case Tads3Parser.RSTR:
				{
				this.state = 458;
				_localctx._primary = this.primary();
				_localctx._parameters.push(_localctx._primary);
				}
				break;
			case Tads3Parser.STAR:
				{
				this.state = 459;
				this.match(Tads3Parser.STAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 466;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 62, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 462;
					this.match(Tads3Parser.COMMA);
					this.state = 463;
					this.paramsWithWildcard();
					}
					}
				}
				this.state = 468;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 62, this._ctx);
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
		this.enterRule(_localctx, 50, Tads3Parser.RULE_functionDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 469;
			this.functionHead();
			this.state = 470;
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
	public functionHead(): FunctionHeadContext {
		let _localctx: FunctionHeadContext = new FunctionHeadContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, Tads3Parser.RULE_functionHead);
		let _la: number;
		try {
			this.state = 497;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 70, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 473;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.EXTERN) {
					{
					this.state = 472;
					_localctx._isExtern = this.match(Tads3Parser.EXTERN);
					}
				}

				this.state = 476;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.STATIC) {
					{
					this.state = 475;
					_localctx._isStatic = this.match(Tads3Parser.STATIC);
					}
				}

				this.state = 479;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.FUNCTION) {
					{
					this.state = 478;
					this.match(Tads3Parser.FUNCTION);
					}
				}

				this.state = 481;
				this.identifierAtom();
				this.state = 487;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 67, this._ctx) ) {
				case 1:
					{
					this.state = 482;
					this.match(Tads3Parser.LEFT_PAREN);
					this.state = 484;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
						{
						this.state = 483;
						this.params();
						}
					}

					this.state = 486;
					this.match(Tads3Parser.RIGHT_PAREN);
					}
					break;
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 489;
				this.match(Tads3Parser.FUNCTION);
				this.state = 495;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 69, this._ctx) ) {
				case 1:
					{
					this.state = 490;
					this.match(Tads3Parser.LEFT_PAREN);
					this.state = 492;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
						{
						this.state = 491;
						this.params();
						}
					}

					this.state = 494;
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
		this.enterRule(_localctx, 54, Tads3Parser.RULE_codeBlock);
		let _la: number;
		try {
			this.state = 508;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 72, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 499;
				this.match(Tads3Parser.LEFT_CURLY);
				this.state = 503;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.SWITCH) | (1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.THROW) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.FOR) | (1 << Tads3Parser.TRY) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.IF) | (1 << Tads3Parser.DO) | (1 << Tads3Parser.WHILE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.RETURN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.FOREACH - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.BREAK - 32)) | (1 << (Tads3Parser.CONTINUE - 32)) | (1 << (Tads3Parser.GOTO - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.SEMICOLON - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					{
					this.state = 500;
					this.stats();
					}
					}
					this.state = 505;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 506;
				this.match(Tads3Parser.RIGHT_CURLY);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 507;
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
		this.enterRule(_localctx, 56, Tads3Parser.RULE_stats);
		try {
			this.state = 527;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 73, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 510;
				this.assignmentStatement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 511;
				this.ifStatement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 512;
				this.tryCatchStatement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 513;
				this.forStatement();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 514;
				this.doWhileStatement();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 515;
				this.whileStatement();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 516;
				this.switchStatement();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 517;
				this.forInStatement();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 518;
				this.forEachStatement();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 519;
				this.sayStatement();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 520;
				this.emptyStatement();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 521;
				this.returnStatement();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 522;
				this.throwStatement();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 523;
				this.labelStatement();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 524;
				this.breakStatement();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 525;
				this.continueStatement();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 526;
				this.gotoStatement();
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
	public gotoStatement(): GotoStatementContext {
		let _localctx: GotoStatementContext = new GotoStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, Tads3Parser.RULE_gotoStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 529;
			this.match(Tads3Parser.GOTO);
			this.state = 531;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0)) {
				{
				this.state = 530;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 533;
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
		this.enterRule(_localctx, 60, Tads3Parser.RULE_breakStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 535;
			this.match(Tads3Parser.BREAK);
			this.state = 537;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0)) {
				{
				this.state = 536;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 539;
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
		this.enterRule(_localctx, 62, Tads3Parser.RULE_continueStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 541;
			this.match(Tads3Parser.CONTINUE);
			this.state = 543;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0)) {
				{
				this.state = 542;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 545;
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
		this.enterRule(_localctx, 64, Tads3Parser.RULE_labelStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 547;
			this.identifierAtom();
			this.state = 548;
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
		this.enterRule(_localctx, 66, Tads3Parser.RULE_switchStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 550;
			this.match(Tads3Parser.SWITCH);
			this.state = 551;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 552;
			this.expr(0);
			this.state = 553;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 554;
			this.match(Tads3Parser.LEFT_CURLY);
			this.state = 569;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3Parser.CASE) {
				{
				{
				this.state = 555;
				this.match(Tads3Parser.CASE);
				this.state = 556;
				this.primary();
				this.state = 557;
				this.match(Tads3Parser.COLON);
				this.state = 565;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 78, this._ctx) ) {
				case 1:
					{
					this.state = 558;
					this.codeBlock();
					}
					break;

				case 2:
					{
					this.state = 562;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.SWITCH) | (1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.THROW) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.FOR) | (1 << Tads3Parser.TRY) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.IF) | (1 << Tads3Parser.DO) | (1 << Tads3Parser.WHILE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.RETURN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.FOREACH - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.BREAK - 32)) | (1 << (Tads3Parser.CONTINUE - 32)) | (1 << (Tads3Parser.GOTO - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.SEMICOLON - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
						{
						{
						this.state = 559;
						this.stats();
						}
						}
						this.state = 564;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
					break;
				}
				}
				}
				this.state = 571;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 580;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.DEFAULT) {
				{
				this.state = 572;
				this.match(Tads3Parser.DEFAULT);
				this.state = 573;
				this.match(Tads3Parser.COLON);
				this.state = 577;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.SWITCH) | (1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.THROW) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.FOR) | (1 << Tads3Parser.TRY) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.IF) | (1 << Tads3Parser.DO) | (1 << Tads3Parser.WHILE) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.RETURN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.FOREACH - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.BREAK - 32)) | (1 << (Tads3Parser.CONTINUE - 32)) | (1 << (Tads3Parser.GOTO - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.SEMICOLON - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					{
					this.state = 574;
					this.codeBlock();
					}
					}
					this.state = 579;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 582;
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
		this.enterRule(_localctx, 68, Tads3Parser.RULE_throwStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 584;
			this.match(Tads3Parser.THROW);
			this.state = 585;
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
		this.enterRule(_localctx, 70, Tads3Parser.RULE_forInStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 587;
			this.match(Tads3Parser.FOR);
			this.state = 588;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 589;
			this.match(Tads3Parser.LOCAL);
			this.state = 590;
			this.match(Tads3Parser.ID);
			this.state = 591;
			this.match(Tads3Parser.IN);
			this.state = 592;
			this.expr(0);
			this.state = 593;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 594;
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
		this.enterRule(_localctx, 72, Tads3Parser.RULE_forEachStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 596;
			this.match(Tads3Parser.FOREACH);
			this.state = 597;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 598;
			this.expr(0);
			this.state = 599;
			this.match(Tads3Parser.IN);
			this.state = 600;
			this.expr(0);
			this.state = 601;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 602;
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
		this.enterRule(_localctx, 74, Tads3Parser.RULE_returnStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 604;
			this.match(Tads3Parser.RETURN);
			this.state = 606;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 605;
				this.expr(0);
				}
			}

			this.state = 608;
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
		this.enterRule(_localctx, 76, Tads3Parser.RULE_doWhileStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 610;
			this.match(Tads3Parser.DO);
			this.state = 611;
			this.codeBlock();
			this.state = 612;
			this.match(Tads3Parser.WHILE);
			this.state = 613;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 615;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 614;
				this.expr(0);
				}
			}

			this.state = 617;
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
		this.enterRule(_localctx, 78, Tads3Parser.RULE_whileStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 619;
			this.match(Tads3Parser.WHILE);
			this.state = 620;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 622;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 621;
				this.expr(0);
				}
			}

			this.state = 624;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 625;
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
		this.enterRule(_localctx, 80, Tads3Parser.RULE_forStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 627;
			this.match(Tads3Parser.FOR);
			this.state = 628;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 630;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 629;
				this.expr(0);
				}
			}

			this.state = 632;
			this.match(Tads3Parser.SEMICOLON);
			this.state = 634;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 633;
				this.expr(0);
				}
			}

			this.state = 636;
			this.match(Tads3Parser.SEMICOLON);
			this.state = 638;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 637;
				this.expr(0);
				}
			}

			this.state = 640;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 641;
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
		this.enterRule(_localctx, 82, Tads3Parser.RULE_tryCatchStatement);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 643;
			this.match(Tads3Parser.TRY);
			this.state = 644;
			this.codeBlock();
			this.state = 654;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 89, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 645;
					this.match(Tads3Parser.CATCH);
					this.state = 646;
					this.match(Tads3Parser.LEFT_PAREN);
					this.state = 648;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
						{
						this.state = 647;
						this.params();
						}
					}

					this.state = 650;
					this.match(Tads3Parser.RIGHT_PAREN);
					this.state = 651;
					this.codeBlock();
					}
					}
				}
				this.state = 656;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 89, this._ctx);
			}
			this.state = 659;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 90, this._ctx) ) {
			case 1:
				{
				this.state = 657;
				this.match(Tads3Parser.FINALLY);
				this.state = 658;
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
		this.enterRule(_localctx, 84, Tads3Parser.RULE_callStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 661;
			this.expr(0);
			this.state = 664;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 91, this._ctx) ) {
			case 1:
				{
				this.state = 662;
				this.match(Tads3Parser.DOT);
				this.state = 663;
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
		this.enterRule(_localctx, 86, Tads3Parser.RULE_emptyStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 667;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 666;
				this.expr(0);
				}
			}

			this.state = 669;
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
		this.enterRule(_localctx, 88, Tads3Parser.RULE_sayStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 671;
			this.match(Tads3Parser.DSTR);
			this.state = 672;
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
		this.enterRule(_localctx, 90, Tads3Parser.RULE_assignmentStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 674;
			this.match(Tads3Parser.LOCAL);
			this.state = 675;
			this.identifierAtom();
			this.state = 678;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3Parser.ASSIGN) {
				{
				this.state = 676;
				this.match(Tads3Parser.ASSIGN);
				this.state = 677;
				this.expr(0);
				}
			}

			this.state = 680;
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
		this.enterRule(_localctx, 92, Tads3Parser.RULE_ifStatement);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 682;
			this.match(Tads3Parser.IF);
			this.state = 683;
			_localctx._ifExprAndBlock = this.enclosedExprCodeBlock();
			this.state = 689;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 94, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 684;
					this.match(Tads3Parser.ELSE);
					this.state = 685;
					this.match(Tads3Parser.IF);
					this.state = 686;
					_localctx._elseIfExprAndBlock = this.enclosedExprCodeBlock();
					}
					}
				}
				this.state = 691;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 94, this._ctx);
			}
			this.state = 694;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 95, this._ctx) ) {
			case 1:
				{
				this.state = 692;
				this.match(Tads3Parser.ELSE);
				this.state = 693;
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
		this.enterRule(_localctx, 94, Tads3Parser.RULE_enclosedExprCodeBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 696;
			this.match(Tads3Parser.LEFT_PAREN);
			this.state = 697;
			_localctx._expression = this.expr(0);
			this.state = 698;
			this.match(Tads3Parser.RIGHT_PAREN);
			this.state = 699;
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
		let _startState: number = 96;
		this.enterRecursionRule(_localctx, 96, Tads3Parser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 742;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 100, this._ctx) ) {
			case 1:
				{
				_localctx = new ArrayExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 702;
				this.match(Tads3Parser.LEFT_BRACKET);
				this.state = 704;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 703;
					this.expr(0);
					}
				}

				this.state = 706;
				this.match(Tads3Parser.RIGHT_BRACKET);
				}
				break;

			case 2:
				{
				_localctx = new DelegatedExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 707;
				this.match(Tads3Parser.DELEGATED);
				this.state = 708;
				this.expr(34);
				}
				break;

			case 3:
				{
				_localctx = new InheritedExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 709;
				this.match(Tads3Parser.INHERITED);
				this.state = 710;
				this.expr(33);
				}
				break;

			case 4:
				{
				_localctx = new TransientExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 711;
				this.match(Tads3Parser.TRANSIENT);
				this.state = 712;
				this.expr(32);
				}
				break;

			case 5:
				{
				_localctx = new PrimaryExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 713;
				this.primary();
				}
				break;

			case 6:
				{
				_localctx = new ParenExpr2Context(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 714;
				this.match(Tads3Parser.LEFT_PAREN);
				this.state = 716;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 715;
					this.expr(0);
					}
				}

				this.state = 718;
				this.match(Tads3Parser.RIGHT_PAREN);
				}
				break;

			case 7:
				{
				_localctx = new LocalExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 719;
				this.match(Tads3Parser.LOCAL);
				this.state = 720;
				this.expr(26);
				}
				break;

			case 8:
				{
				_localctx = new StaticExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 721;
				this.match(Tads3Parser.STATIC);
				this.state = 722;
				this.expr(25);
				}
				break;

			case 9:
				{
				_localctx = new NewExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 723;
				this.match(Tads3Parser.NEW);
				this.state = 724;
				this.expr(24);
				}
				break;

			case 10:
				{
				_localctx = new AnonymousObjectExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 725;
				this.match(Tads3Parser.LEFT_CURLY);
				this.state = 727;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 726;
					this.params();
					}
				}

				this.state = 729;
				this.match(Tads3Parser.COLON);
				this.state = 731;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 730;
					this.expr(0);
					}
				}

				this.state = 733;
				this.match(Tads3Parser.RIGHT_CURLY);
				}
				break;

			case 11:
				{
				_localctx = new ArrowExpr2Context(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				{
				this.state = 734;
				this.match(Tads3Parser.ARROW);
				}
				this.state = 735;
				this.expr(6);
				}
				break;

			case 12:
				{
				_localctx = new ArrowExpr3Context(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 736;
				this.match(Tads3Parser.STAR);
				this.state = 737;
				this.match(Tads3Parser.ARROW);
				this.state = 738;
				this.expr(5);
				}
				break;

			case 13:
				{
				_localctx = new UnaryExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 739;
				_la = this._input.LA(1);
				if (!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & ((1 << (Tads3Parser.AT - 47)) | (1 << (Tads3Parser.AMP - 47)) | (1 << (Tads3Parser.NOT - 47)) | (1 << (Tads3Parser.PLUS - 47)) | (1 << (Tads3Parser.MINUS - 47)) | (1 << (Tads3Parser.TILDE - 47)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 740;
				this.expr(4);
				}
				break;

			case 14:
				{
				_localctx = new AnonymousFunctionExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 741;
				this.functionDeclaration();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 868;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 114, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 866;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 113, this._ctx) ) {
					case 1:
						{
						_localctx = new MemberExprContext(new ExprContext(_parentctx, _parentState));
						(_localctx as MemberExprContext)._prev = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 744;
						if (!(this.precpred(this._ctx, 38))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 38)");
						}
						this.state = 745;
						this.match(Tads3Parser.DOT);
						this.state = 746;
						(_localctx as MemberExprContext)._next = this.expr(39);
						}
						break;

					case 2:
						{
						_localctx = new CommaExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 747;
						if (!(this.precpred(this._ctx, 36))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 36)");
						}
						this.state = 748;
						this.match(Tads3Parser.COMMA);
						this.state = 749;
						this.expr(37);
						}
						break;

					case 3:
						{
						_localctx = new ReferenceExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 750;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 751;
						this.match(Tads3Parser.AMP);
						this.state = 752;
						this.expr(24);
						}
						break;

					case 4:
						{
						_localctx = new NotInExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 753;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 754;
						this.match(Tads3Parser.LITERAL_NOT);
						this.state = 755;
						this.match(Tads3Parser.IN);
						this.state = 756;
						this.expr(23);
						}
						break;

					case 5:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 757;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 758;
						this.match(Tads3Parser.IS);
						this.state = 759;
						this.match(Tads3Parser.IN);
						this.state = 760;
						this.expr(22);
						}
						break;

					case 6:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 761;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 762;
						this.match(Tads3Parser.IS);
						this.state = 763;
						this.expr(21);
						}
						break;

					case 7:
						{
						_localctx = new InExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 764;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 765;
						this.match(Tads3Parser.IN);
						this.state = 766;
						this.expr(20);
						}
						break;

					case 8:
						{
						_localctx = new AssignmentExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 767;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 768;
						this.match(Tads3Parser.ASSIGN);
						this.state = 769;
						this.expr(19);
						}
						break;

					case 9:
						{
						_localctx = new IfNilExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 770;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 771;
						this.match(Tads3Parser.IFNIL);
						this.state = 772;
						this.expr(18);
						}
						break;

					case 10:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 773;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 774;
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
						this.state = 776;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads3Parser.ASSIGN) {
							{
							this.state = 775;
							this.match(Tads3Parser.ASSIGN);
							}
						}

						this.state = 778;
						this.expr(16);
						}
						break;

					case 11:
						{
						_localctx = new AndOrExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 779;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 780;
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
						this.state = 781;
						this.expr(15);
						}
						break;

					case 12:
						{
						_localctx = new PowerOfExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 782;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						{
						this.state = 783;
						this.match(Tads3Parser.POW);
						}
						this.state = 785;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads3Parser.ASSIGN) {
							{
							this.state = 784;
							(_localctx as PowerOfExprContext)._isInc = this.match(Tads3Parser.ASSIGN);
							}
						}

						this.state = 787;
						this.expr(14);
						}
						break;

					case 13:
						{
						_localctx = new MultiplicationExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 788;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 789;
						(_localctx as MultiplicationExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & ((1 << (Tads3Parser.DIV - 54)) | (1 << (Tads3Parser.MOD - 54)) | (1 << (Tads3Parser.STAR - 54)))) !== 0))) {
							(_localctx as MultiplicationExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 791;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads3Parser.ASSIGN) {
							{
							this.state = 790;
							(_localctx as MultiplicationExprContext)._isInc = this.match(Tads3Parser.ASSIGN);
							}
						}

						this.state = 793;
						this.expr(13);
						}
						break;

					case 14:
						{
						_localctx = new AdditiveExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 794;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 795;
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
						this.state = 797;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads3Parser.ASSIGN) {
							{
							this.state = 796;
							(_localctx as AdditiveExprContext)._isInc = this.match(Tads3Parser.ASSIGN);
							}
						}

						this.state = 799;
						this.expr(12);
						}
						break;

					case 15:
						{
						_localctx = new RelationalExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 800;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 801;
						(_localctx as RelationalExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 84)) & ~0x1F) === 0 && ((1 << (_la - 84)) & ((1 << (Tads3Parser.LTEQ - 84)) | (1 << (Tads3Parser.LT - 84)) | (1 << (Tads3Parser.GTEQ - 84)) | (1 << (Tads3Parser.GT - 84)))) !== 0))) {
							(_localctx as RelationalExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 802;
						this.expr(11);
						}
						break;

					case 16:
						{
						_localctx = new EqualityExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 803;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 804;
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
						this.state = 805;
						this.expr(10);
						}
						break;

					case 17:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 806;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 807;
						(_localctx as BitwiseExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 85)) & ~0x1F) === 0 && ((1 << (_la - 85)) & ((1 << (Tads3Parser.ARITHMETIC_LEFT - 85)) | (1 << (Tads3Parser.ARITHMETIC_RIGHT - 85)) | (1 << (Tads3Parser.LOGICAL_RIGHT_SHIFT - 85)))) !== 0))) {
							(_localctx as BitwiseExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 809;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads3Parser.ASSIGN) {
							{
							this.state = 808;
							(_localctx as BitwiseExprContext)._isInc = this.match(Tads3Parser.ASSIGN);
							}
						}

						this.state = 811;
						this.expr(9);
						}
						break;

					case 18:
						{
						_localctx = new ArrowExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 812;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						{
						this.state = 813;
						this.match(Tads3Parser.ARROW);
						}
						this.state = 814;
						this.expr(8);
						}
						break;

					case 19:
						{
						_localctx = new TernaryExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 815;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 816;
						this.match(Tads3Parser.OPTIONAL);
						this.state = 817;
						this.expr(0);
						this.state = 818;
						this.match(Tads3Parser.COLON);
						this.state = 819;
						this.expr(3);
						}
						break;

					case 20:
						{
						_localctx = new IndexExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 821;
						if (!(this.precpred(this._ctx, 37))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 37)");
						}
						this.state = 822;
						this.match(Tads3Parser.LEFT_BRACKET);
						this.state = 824;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
							{
							this.state = 823;
							this.expr(0);
							}
						}

						this.state = 826;
						this.match(Tads3Parser.RIGHT_BRACKET);
						}
						break;

					case 21:
						{
						_localctx = new RangeExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 827;
						if (!(this.precpred(this._ctx, 35))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 35)");
						}
						this.state = 828;
						this.match(Tads3Parser.RANGE);
						this.state = 829;
						this.expr(0);
						this.state = 832;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 107, this._ctx) ) {
						case 1:
							{
							this.state = 830;
							(_localctx as RangeExprContext)._hasStep = this.match(Tads3Parser.STEP);
							this.state = 831;
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
						this.state = 834;
						if (!(this.precpred(this._ctx, 30))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 30)");
						}
						this.state = 835;
						this.match(Tads3Parser.LEFT_PAREN);
						this.state = 837;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						do {
							{
							{
							this.state = 836;
							this.params();
							}
							}
							this.state = 839;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0));
						this.state = 841;
						this.match(Tads3Parser.RIGHT_PAREN);
						}
						break;

					case 23:
						{
						_localctx = new ExprWithParenExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 843;
						if (!(this.precpred(this._ctx, 29))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 29)");
						}
						this.state = 844;
						this.match(Tads3Parser.LEFT_PAREN);
						this.state = 846;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
							{
							this.state = 845;
							this.expr(0);
							}
						}

						this.state = 848;
						this.match(Tads3Parser.RIGHT_PAREN);
						}
						break;

					case 24:
						{
						_localctx = new ExprWithAnonymousObjectExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 849;
						if (!(this.precpred(this._ctx, 28))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 28)");
						}
						this.state = 850;
						this.match(Tads3Parser.LEFT_CURLY);
						this.state = 852;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.SPREAD - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
							{
							this.state = 851;
							this.params();
							}
						}

						this.state = 854;
						this.match(Tads3Parser.COLON);
						this.state = 856;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3Parser.FUNCTION) | (1 << Tads3Parser.NEW) | (1 << Tads3Parser.TRANSIENT) | (1 << Tads3Parser.LOCAL) | (1 << Tads3Parser.TRUE) | (1 << Tads3Parser.NIL) | (1 << Tads3Parser.INHERITED) | (1 << Tads3Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3Parser.EXTERN - 32)) | (1 << (Tads3Parser.STATIC - 32)) | (1 << (Tads3Parser.STRING - 32)) | (1 << (Tads3Parser.IN - 32)) | (1 << (Tads3Parser.AT - 32)) | (1 << (Tads3Parser.AMP - 32)) | (1 << (Tads3Parser.NOT - 32)) | (1 << (Tads3Parser.PLUS - 32)) | (1 << (Tads3Parser.MINUS - 32)) | (1 << (Tads3Parser.ARROW - 32)) | (1 << (Tads3Parser.TILDE - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3Parser.ID - 64)) | (1 << (Tads3Parser.NR - 64)) | (1 << (Tads3Parser.HEX - 64)) | (1 << (Tads3Parser.STAR - 64)) | (1 << (Tads3Parser.LEFT_PAREN - 64)) | (1 << (Tads3Parser.LEFT_BRACKET - 64)) | (1 << (Tads3Parser.DSTR - 64)) | (1 << (Tads3Parser.SSTR - 64)) | (1 << (Tads3Parser.RSTR - 64)) | (1 << (Tads3Parser.LEFT_CURLY - 64)))) !== 0)) {
							{
							this.state = 855;
							this.expr(0);
							}
						}

						this.state = 858;
						this.match(Tads3Parser.RIGHT_CURLY);
						}
						break;

					case 25:
						{
						_localctx = new PostFixExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads3Parser.RULE_expr);
						this.state = 859;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 864;
						this._errHandler.sync(this);
						switch (this._input.LA(1)) {
						case Tads3Parser.PLUS:
							{
							this.state = 860;
							this.match(Tads3Parser.PLUS);
							this.state = 861;
							this.match(Tads3Parser.PLUS);
							}
							break;
						case Tads3Parser.MINUS:
							{
							this.state = 862;
							this.match(Tads3Parser.MINUS);
							this.state = 863;
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
				this.state = 870;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 114, this._ctx);
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
		this.enterRule(_localctx, 98, Tads3Parser.RULE_primary);
		try {
			this.state = 882;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3Parser.INHERITED:
				_localctx = new InheritedAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 871;
				this.match(Tads3Parser.INHERITED);
				}
				break;
			case Tads3Parser.HEX:
				_localctx = new HexAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 872;
				this.match(Tads3Parser.HEX);
				}
				break;
			case Tads3Parser.NR:
				_localctx = new NumberAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 873;
				this.match(Tads3Parser.NR);
				}
				break;
			case Tads3Parser.AMP:
				_localctx = new ReferenceAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 874;
				this.match(Tads3Parser.AMP);
				this.state = 875;
				this.identifierAtom();
				}
				break;
			case Tads3Parser.STRING:
			case Tads3Parser.IN:
			case Tads3Parser.ID:
				_localctx = new IdAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 876;
				this.identifierAtom();
				}
				break;
			case Tads3Parser.SSTR:
				_localctx = new DoubleQuotestringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 877;
				this.match(Tads3Parser.SSTR);
				}
				break;
			case Tads3Parser.DSTR:
				_localctx = new SingleQuotestringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 878;
				this.match(Tads3Parser.DSTR);
				}
				break;
			case Tads3Parser.RSTR:
				_localctx = new RegexpStringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 879;
				this.match(Tads3Parser.RSTR);
				}
				break;
			case Tads3Parser.TRUE:
				_localctx = new BooleanAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 880;
				this.match(Tads3Parser.TRUE);
				}
				break;
			case Tads3Parser.NIL:
				_localctx = new NilAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 881;
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
		this.enterRule(_localctx, 100, Tads3Parser.RULE_identifierAtom);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 884;
			_la = this._input.LA(1);
			if (!(((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3Parser.STRING - 35)) | (1 << (Tads3Parser.IN - 35)) | (1 << (Tads3Parser.ID - 35)))) !== 0))) {
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
		this.enterRule(_localctx, 102, Tads3Parser.RULE_params);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 889;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 116, this._ctx) ) {
			case 1:
				{
				this.state = 886;
				this.optionallyTypedOptionalId();
				}
				break;

			case 2:
				{
				this.state = 887;
				this.match(Tads3Parser.SPREAD);
				}
				break;

			case 3:
				{
				this.state = 888;
				this.array();
				}
				break;
			}
			this.state = 895;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 117, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 891;
					this.match(Tads3Parser.COMMA);
					this.state = 892;
					this.params();
					}
					}
				}
				this.state = 897;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 117, this._ctx);
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
		this.enterRule(_localctx, 104, Tads3Parser.RULE_optionallyTypedOptionalId);
		let _la: number;
		try {
			this.state = 915;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 122, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				{
				this.state = 901;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 118, this._ctx) ) {
				case 1:
					{
					this.state = 898;
					_localctx._identifier = this.identifierAtom();
					this.state = 899;
					this.match(Tads3Parser.COLON);
					}
					break;
				}
				this.state = 904;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 119, this._ctx) ) {
				case 1:
					{
					this.state = 903;
					_localctx._type = this.identifierAtom();
					}
					break;
				}
				{
				this.state = 906;
				_localctx._name = this.identifierAtom();
				}
				this.state = 908;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.OPTIONAL) {
					{
					this.state = 907;
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
				this.state = 910;
				_localctx._identifier = this.identifierAtom();
				this.state = 911;
				_localctx._emptyColon = this.match(Tads3Parser.COLON);
				this.state = 913;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3Parser.OPTIONAL) {
					{
					this.state = 912;
					_localctx._optional = this.match(Tads3Parser.OPTIONAL);
					}
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

		case 48:
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
			return this.precpred(this._ctx, 38);

		case 2:
			return this.precpred(this._ctx, 36);

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
			return this.precpred(this._ctx, 11);

		case 15:
			return this.precpred(this._ctx, 10);

		case 16:
			return this.precpred(this._ctx, 9);

		case 17:
			return this.precpred(this._ctx, 8);

		case 18:
			return this.precpred(this._ctx, 7);

		case 19:
			return this.precpred(this._ctx, 2);

		case 20:
			return this.precpred(this._ctx, 37);

		case 21:
			return this.precpred(this._ctx, 35);

		case 22:
			return this.precpred(this._ctx, 30);

		case 23:
			return this.precpred(this._ctx, 29);

		case 24:
			return this.precpred(this._ctx, 28);

		case 25:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03`\u0398\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x03\x02\x07\x02n\n\x02\f\x02\x0E\x02q\v\x02\x03\x02" +
		"\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x05\x03~\n\x03\x03\x04\x03\x04\x05\x04\x82\n\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04\x8A\n\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04\x92\n\x04\x03\x05\x03\x05\x03" +
		"\x05\x07\x05\x97\n\x05\f\x05\x0E\x05\x9A\v\x05\x03\x06\x05\x06\x9D\n\x06" +
		"\x03\x06\x07\x06\xA0\n\x06\f\x06\x0E\x06\xA3\v\x06\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x06\b\xAD\n\b\r\b\x0E\b\xAE\x03" +
		"\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05\b\xB7\n\b\x03\b\x03\b\x07\b\xBB\n" +
		"\b\f\b\x0E\b\xBE\v\b\x03\t\x03\t\x03\t\x03\t\x05\t\xC4\n\t\x06\t\xC6\n" +
		"\t\r\t\x0E\t\xC7\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x07\t\xD1\n" +
		"\t\f\t\x0E\t\xD4\v\t\x03\t\x03\t\x03\t\x03\t\x05\t\xDA\n\t\x03\n\x03\n" +
		"\x05\n\xDE\n\n\x03\n\x03\n\x03\n\x07\n\xE3\n\n\f\n\x0E\n\xE6\v\n\x03\n" +
		"\x03\n\x03\v\x07\v\xEB\n\v\f\v\x0E\v\xEE\v\v\x03\v\x03\v\x03\v\x03\v\x07" +
		"\v\xF4\n\v\f\v\x0E\v\xF7\v\v\x03\v\x03\v\x03\f\x07\f\xFC\n\f\f\f\x0E\f" +
		"\xFF\v\f\x03\f\x03\f\x05\f\u0103\n\f\x03\f\x03\f\x03\f\x07\f\u0108\n\f" +
		"\f\f\x0E\f\u010B\v\f\x03\f\x03\f\x03\r\x03\r\x03\r\x05\r\u0112\n\r\x03" +
		"\r\x03\r\x03\x0E\x03\x0E\x05\x0E\u0118\n\x0E\x03\x0E\x05\x0E\u011B\n\x0E" +
		"\x03\x0E\x05\x0E\u011E\n\x0E\x03\x0E\x03\x0E\x05\x0E\u0122\n\x0E\x03\x0E" +
		"\x03\x0E\x07\x0E\u0126\n\x0E\f\x0E\x0E\x0E\u0129\v\x0E\x03\x0E\x03\x0E" +
		"\x03\x0F\x05\x0F\u012E\n\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\u0133\n\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x10\x05\x10\u013A\n\x10\x03\x10\x05" +
		"\x10\u013D\n\x10\x03\x10\x05\x10\u0140\n\x10\x05\x10\u0142\n\x10\x03\x10" +
		"\x07\x10\u0145\n\x10\f\x10\x0E\x10\u0148\v\x10\x03\x10\x03\x10\x05\x10" +
		"\u014C\n\x10\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\u0152\n\x10\x03\x10" +
		"\x03\x10\x05\x10\u0156\n\x10\x03\x11\x03\x11\x05\x11\u015A\n\x11\x03\x11" +
		"\x03\x11\x03\x11\x03\x11\x05\x11\u0160\n\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x11\x03\x11\x05\x11\u0167\n\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11" +
		"\u016D\n\x11\x03\x11\x05\x11\u0170\n\x11\x03\x12\x03\x12\x03\x12\x07\x12" +
		"\u0175\n\x12\f\x12\x0E\x12\u0178\v\x12\x03\x13\x03\x13\x03\x13\x03\x13" +
		"\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x07\x15\u0184\n\x15\f" +
		"\x15\x0E\x15\u0187\v\x15\x03\x16\x07\x16\u018A\n\x16\f\x16\x0E\x16\u018D" +
		"\v\x16\x03\x16\x03\x16\x03\x16\x07\x16\u0192\n\x16\f\x16\x0E\x16\u0195" +
		"\v\x16\x03\x17\x03\x17\x05\x17\u0199\n\x17\x03\x17\x03\x17\x05\x17\u019D" +
		"\n\x17\x03\x17\x03\x17\x05\x17\u01A1\n\x17\x03\x17\x05\x17\u01A4\n\x17" +
		"\x03\x17\x03\x17\x05\x17\u01A8\n\x17\x03\x17\x03\x17\x05\x17\u01AC\n\x17" +
		"\x03\x17\x03\x17\x07\x17\u01B0\n\x17\f\x17\x0E\x17\u01B3\v\x17\x03\x17" +
		"\x03\x17\x05\x17\u01B7\n\x17\x05\x17\u01B9\n\x17\x03\x18\x07\x18\u01BC" +
		"\n\x18\f\x18\x0E\x18\u01BF\v\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19" +
		"\x05\x19\u01C6\n\x19\x03\x19\x05\x19\u01C9\n\x19\x03\x19\x03\x19\x03\x1A" +
		"\x03\x1A\x05\x1A\u01CF\n\x1A\x03\x1A\x03\x1A\x07\x1A\u01D3\n\x1A\f\x1A" +
		"\x0E\x1A\u01D6\v\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1C\x05\x1C\u01DC\n\x1C" +
		"\x03\x1C\x05\x1C\u01DF\n\x1C\x03\x1C\x05\x1C\u01E2\n\x1C\x03\x1C\x03\x1C" +
		"\x03\x1C\x05\x1C\u01E7\n\x1C\x03\x1C\x05\x1C\u01EA\n\x1C\x03\x1C\x03\x1C" +
		"\x03\x1C\x05\x1C\u01EF\n\x1C\x03\x1C\x05\x1C\u01F2\n\x1C\x05\x1C\u01F4" +
		"\n\x1C\x03\x1D\x03\x1D\x07\x1D\u01F8\n\x1D\f\x1D\x0E\x1D\u01FB\v\x1D\x03" +
		"\x1D\x03\x1D\x05\x1D\u01FF\n\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x03\x1E\x03\x1E\x03\x1E\x05\x1E\u0212\n\x1E\x03\x1F\x03\x1F\x05\x1F\u0216" +
		"\n\x1F\x03\x1F\x03\x1F\x03 \x03 \x05 \u021C\n \x03 \x03 \x03!\x03!\x05" +
		"!\u0222\n!\x03!\x03!\x03\"\x03\"\x03\"\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x03#\x03#\x03#\x07#\u0233\n#\f#\x0E#\u0236\v#\x05#\u0238\n#\x07#\u023A" +
		"\n#\f#\x0E#\u023D\v#\x03#\x03#\x03#\x07#\u0242\n#\f#\x0E#\u0245\v#\x05" +
		"#\u0247\n#\x03#\x03#\x03$\x03$\x03$\x03%\x03%\x03%\x03%\x03%\x03%\x03" +
		"%\x03%\x03%\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03&\x03\'\x03\'\x05\'" +
		"\u0261\n\'\x03\'\x03\'\x03(\x03(\x03(\x03(\x03(\x05(\u026A\n(\x03(\x03" +
		"(\x03)\x03)\x03)\x05)\u0271\n)\x03)\x03)\x03)\x03*\x03*\x03*\x05*\u0279" +
		"\n*\x03*\x03*\x05*\u027D\n*\x03*\x03*\x05*\u0281\n*\x03*\x03*\x03*\x03" +
		"+\x03+\x03+\x03+\x03+\x05+\u028B\n+\x03+\x03+\x07+\u028F\n+\f+\x0E+\u0292" +
		"\v+\x03+\x03+\x05+\u0296\n+\x03,\x03,\x03,\x05,\u029B\n,\x03-\x05-\u029E" +
		"\n-\x03-\x03-\x03.\x03.\x03.\x03/\x03/\x03/\x03/\x05/\u02A9\n/\x03/\x03" +
		"/\x030\x030\x030\x030\x030\x070\u02B2\n0\f0\x0E0\u02B5\v0\x030\x030\x05" +
		"0\u02B9\n0\x031\x031\x031\x031\x031\x032\x032\x032\x052\u02C3\n2\x032" +
		"\x032\x032\x032\x032\x032\x032\x032\x032\x032\x052\u02CF\n2\x032\x032" +
		"\x032\x032\x032\x032\x032\x032\x032\x052\u02DA\n2\x032\x032\x052\u02DE" +
		"\n2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x052\u02E9\n2\x032\x03" +
		"2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x03" +
		"2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x03" +
		"2\x032\x032\x052\u030B\n2\x032\x032\x032\x032\x032\x032\x032\x052\u0314" +
		"\n2\x032\x032\x032\x032\x052\u031A\n2\x032\x032\x032\x032\x052\u0320\n" +
		"2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x052\u032C\n2\x03" +
		"2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x052\u033B" +
		"\n2\x032\x032\x032\x032\x032\x032\x052\u0343\n2\x032\x032\x032\x062\u0348" +
		"\n2\r2\x0E2\u0349\x032\x032\x032\x032\x032\x052\u0351\n2\x032\x032\x03" +
		"2\x032\x052\u0357\n2\x032\x032\x052\u035B\n2\x032\x032\x032\x032\x032" +
		"\x032\x052\u0363\n2\x072\u0365\n2\f2\x0E2\u0368\v2\x033\x033\x033\x03" +
		"3\x033\x033\x033\x033\x033\x033\x033\x053\u0375\n3\x034\x034\x035\x03" +
		"5\x035\x055\u037C\n5\x035\x035\x075\u0380\n5\f5\x0E5\u0383\v5\x036\x03" +
		"6\x036\x056\u0388\n6\x036\x056\u038B\n6\x036\x036\x056\u038F\n6\x036\x03" +
		"6\x036\x056\u0394\n6\x056\u0396\n6\x036\x02\x02\x04\x0Eb7\x02\x02\x04" +
		"\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02" +
		"\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02." +
		"\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02" +
		"J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02" +
		"f\x02h\x02j\x02\x02\f\x03\x02QR\x07\x02124477::@@\x04\x0222KK\x03\x02" +
		"=>\x04\x0289JJ\x04\x0277::\x04\x02VVXZ\x03\x02;<\x04\x02WW[\\\x05\x02" +
		"%%\'\'BB\x02\u0428\x02o\x03\x02\x02\x02\x04}\x03\x02\x02\x02\x06\x81\x03" +
		"\x02\x02\x02\b\x93\x03\x02\x02\x02\n\x9C\x03\x02\x02\x02\f\xA4\x03\x02" +
		"\x02\x02\x0E\xB6\x03\x02\x02\x02\x10\xD9\x03\x02\x02\x02\x12\xDB\x03\x02" +
		"\x02\x02\x14\xEC\x03\x02\x02\x02\x16\xFD\x03\x02\x02\x02\x18\u010E\x03" +
		"\x02\x02\x02\x1A\u0115\x03\x02\x02\x02\x1C\u012D\x03\x02\x02\x02\x1E\u0141" +
		"\x03\x02\x02\x02 \u016C\x03\x02\x02\x02\"\u0171\x03\x02\x02\x02$\u0179" +
		"\x03\x02\x02\x02&\u017D\x03\x02\x02\x02(\u0180\x03\x02\x02\x02*\u018B" +
		"\x03\x02\x02\x02,\u01B8\x03\x02\x02\x02.\u01BD\x03\x02\x02\x020\u01C8" +
		"\x03\x02\x02\x022\u01CE\x03\x02\x02\x024\u01D7\x03\x02\x02\x026\u01F3" +
		"\x03\x02\x02\x028\u01FE\x03\x02\x02\x02:\u0211\x03\x02\x02\x02<\u0213" +
		"\x03\x02\x02\x02>\u0219\x03\x02\x02\x02@\u021F\x03\x02\x02\x02B\u0225" +
		"\x03\x02\x02\x02D\u0228\x03\x02\x02\x02F\u024A\x03\x02\x02\x02H\u024D" +
		"\x03\x02\x02\x02J\u0256\x03\x02\x02\x02L\u025E\x03\x02\x02\x02N\u0264" +
		"\x03\x02\x02\x02P\u026D\x03\x02\x02\x02R\u0275\x03\x02\x02\x02T\u0285" +
		"\x03\x02\x02\x02V\u0297\x03\x02\x02\x02X\u029D\x03\x02\x02\x02Z\u02A1" +
		"\x03\x02\x02\x02\\\u02A4\x03\x02\x02\x02^\u02AC\x03\x02\x02\x02`\u02BA" +
		"\x03\x02\x02\x02b\u02E8\x03\x02\x02\x02d\u0374\x03\x02\x02\x02f\u0376" +
		"\x03\x02\x02\x02h\u037B\x03\x02\x02\x02j\u0395\x03\x02\x02\x02ln\x05\x04" +
		"\x03\x02ml\x03\x02\x02\x02nq\x03\x02\x02\x02om\x03\x02\x02\x02op\x03\x02" +
		"\x02\x02pr\x03\x02\x02\x02qo\x03\x02\x02\x02rs\x07\x02\x02\x03s\x03\x03" +
		"\x02\x02\x02t~\x05\x12\n\x02u~\x05\x10\t\x02v~\x05\x1A\x0E\x02w~\x05\x18" +
		"\r\x02x~\x05\x1E\x10\x02y~\x05\x14\v\x02z~\x05\x16\f\x02{~\x054\x1B\x02" +
		"|~\x05\x06\x04\x02}t\x03\x02\x02\x02}u\x03\x02\x02\x02}v\x03\x02\x02\x02" +
		"}w\x03\x02\x02\x02}x\x03\x02\x02\x02}y\x03\x02\x02\x02}z\x03\x02\x02\x02" +
		"}{\x03\x02\x02\x02}|\x03\x02\x02\x02~\x05\x03\x02\x02\x02\x7F\x82\x07" +
		"\x12\x02\x02\x80\x82\x07\x13\x02\x02\x81\x7F\x03\x02\x02\x02\x81\x80\x03" +
		"\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82\x83\x03\x02\x02\x02\x83\x84\x07" +
		"\x03\x02\x02\x84\x89\x05f4\x02\x85\x86\x07M\x02\x02\x86\x87\x05f4\x02" +
		"\x87\x88\x07N\x02\x02\x88\x8A\x03\x02\x02\x02\x89\x85\x03\x02\x02\x02" +
		"\x89\x8A\x03\x02\x02\x02\x8A\x8B\x03\x02\x02\x02\x8B\x8C\x07G\x02\x02" +
		"\x8C\x8D\x05\b\x05\x02\x8D\x8E\x07G\x02\x02\x8E\x91\x05(\x15\x02\x8F\x92" +
		"\x05$\x13\x02\x90\x92\x05&\x14\x02\x91\x8F\x03\x02\x02\x02\x91\x90\x03" +
		"\x02\x02\x02\x92\x07\x03\x02\x02\x02\x93\x98\x05\n\x06\x02\x94\x95\x07" +
		"K\x02\x02\x95\x97\x05\n\x06\x02\x96\x94\x03\x02\x02\x02\x97\x9A\x03\x02" +
		"\x02\x02\x98\x96\x03\x02\x02\x02\x98\x99\x03\x02\x02\x02\x99\t\x03\x02" +
		"\x02\x02\x9A\x98\x03\x02\x02\x02\x9B\x9D\x05\f\x07\x02\x9C\x9B\x03\x02" +
		"\x02\x02\x9C\x9D\x03\x02\x02\x02\x9D\xA1\x03\x02\x02\x02\x9E\xA0\x05\x0E" +
		"\b\x02\x9F\x9E\x03\x02\x02\x02\xA0\xA3\x03\x02\x02\x02\xA1\x9F\x03\x02" +
		"\x02\x02\xA1\xA2\x03\x02\x02\x02\xA2\v\x03\x02\x02\x02\xA3\xA1\x03\x02" +
		"\x02\x02\xA4\xA5\x07O\x02\x02\xA5\xA6\x05f4\x02\xA6\xA7\x07D\x02\x02\xA7" +
		"\xA8\x07P\x02\x02\xA8\r\x03\x02\x02\x02\xA9\xAA\b\b\x01\x02\xAA\xAC\x07" +
		"M\x02\x02\xAB\xAD\x05\x0E\b\x02\xAC\xAB\x03\x02\x02\x02\xAD\xAE\x03\x02" +
		"\x02\x02\xAE\xAC\x03\x02\x02\x02\xAE\xAF\x03\x02\x02\x02\xAF\xB0\x03\x02" +
		"\x02\x02\xB0\xB1\x07N\x02\x02\xB1\xB7\x03\x02\x02\x02\xB2\xB3\x07K\x02" +
		"\x02\xB3\xB7\x05\x0E\b\x05\xB4\xB7\x05b2\x02\xB5\xB7\x07J\x02\x02\xB6" +
		"\xA9\x03\x02\x02\x02\xB6\xB2\x03\x02\x02\x02\xB6\xB4\x03\x02\x02\x02\xB6" +
		"\xB5\x03\x02\x02\x02\xB7\xBC\x03\x02\x02\x02\xB8\xB9\f\x06\x02\x02\xB9" +
		"\xBB\x07K\x02\x02\xBA\xB8\x03\x02\x02\x02\xBB\xBE\x03\x02\x02\x02\xBC" +
		"\xBA\x03\x02\x02\x02\xBC\xBD\x03\x02\x02\x02\xBD\x0F\x03\x02\x02\x02\xBE" +
		"\xBC\x03\x02\x02\x02\xBF\xC0\x05f4\x02\xC0\xC5\x07\n\x02\x02\xC1\xC3\x05" +
		"b2\x02\xC2\xC4\x075\x02\x02\xC3\xC2\x03\x02\x02\x02\xC3\xC4\x03\x02\x02" +
		"\x02\xC4\xC6\x03\x02\x02\x02\xC5\xC1\x03\x02\x02\x02\xC6\xC7\x03\x02\x02" +
		"\x02\xC7\xC5\x03\x02\x02\x02\xC7\xC8\x03\x02\x02\x02\xC8\xC9\x03\x02\x02" +
		"\x02\xC9\xCA\x07L\x02\x02\xCA\xDA\x03\x02\x02\x02\xCB\xCC\x07%\x02\x02" +
		"\xCC\xCD\x07\n\x02\x02\xCD\xD2\x07W\x02\x02\xCE\xD1\x05f4\x02\xCF\xD1" +
		"\x07J\x02\x02\xD0\xCE\x03\x02\x02\x02\xD0\xCF\x03\x02\x02\x02\xD1\xD4" +
		"\x03\x02\x02\x02\xD2\xD0\x03\x02\x02\x02\xD2\xD3\x03\x02\x02\x02\xD3\xD5" +
		"\x03\x02\x02\x02\xD4\xD2\x03\x02\x02\x02\xD5\xD6\x07[\x02\x02\xD6\xD7" +
		"\x05f4\x02\xD7\xD8\x07L\x02\x02\xD8\xDA\x03\x02\x02\x02\xD9\xBF\x03\x02" +
		"\x02\x02\xD9\xCB\x03\x02\x02\x02\xDA\x11\x03\x02\x02\x02\xDB\xDD\x07\x0F" +
		"\x02\x02\xDC\xDE\x070\x02\x02\xDD\xDC\x03\x02\x02\x02\xDD\xDE\x03\x02" +
		"\x02\x02\xDE\xDF\x03\x02\x02\x02\xDF\xE4\x05f4\x02\xE0\xE1\x07H\x02\x02" +
		"\xE1\xE3\x05f4\x02\xE2\xE0\x03\x02\x02\x02\xE3\xE6\x03\x02\x02\x02\xE4" +
		"\xE2\x03\x02\x02\x02\xE4\xE5\x03\x02\x02\x02\xE5\xE7\x03\x02\x02\x02\xE6" +
		"\xE4\x03\x02\x02\x02\xE7\xE8\x07L\x02\x02\xE8\x13\x03\x02\x02\x02\xE9" +
		"\xEB\x077\x02\x02\xEA\xE9\x03\x02\x02\x02\xEB\xEE\x03\x02\x02\x02\xEC" +
		"\xEA\x03\x02\x02\x02\xEC\xED\x03\x02\x02\x02\xED\xEF\x03\x02\x02\x02\xEE" +
		"\xEC\x03\x02\x02\x02\xEF\xF0\x07\x1F\x02\x02\xF0\xF5\x05f4\x02\xF1\xF2" +
		"\x07H\x02\x02\xF2\xF4\x05f4\x02\xF3\xF1\x03\x02\x02\x02\xF4\xF7\x03\x02" +
		"\x02\x02\xF5\xF3\x03\x02\x02\x02\xF5\xF6\x03\x02\x02\x02\xF6\xF8\x03\x02" +
		"\x02\x02\xF7\xF5\x03\x02\x02\x02\xF8\xF9\x07L\x02\x02\xF9\x15\x03\x02" +
		"\x02\x02\xFA\xFC\x077\x02\x02\xFB\xFA\x03\x02\x02\x02\xFC\xFF\x03\x02" +
		"\x02\x02\xFD\xFB\x03\x02\x02\x02\xFD\xFE\x03\x02\x02\x02\xFE\u0100\x03" +
		"\x02\x02\x02\xFF\xFD\x03\x02\x02\x02\u0100\u0102\x07 \x02\x02\u0101\u0103" +
		"\x07\x1F\x02\x02\u0102\u0101\x03\x02\x02\x02\u0102\u0103\x03\x02\x02\x02" +
		"\u0103\u0104\x03\x02\x02\x02\u0104\u0109\x05f4\x02\u0105\u0106\x07H\x02" +
		"\x02\u0106\u0108\x05f4\x02\u0107\u0105\x03\x02\x02\x02\u0108\u010B\x03" +
		"\x02\x02\x02\u0109\u0107\x03\x02\x02\x02\u0109\u010A\x03\x02\x02\x02\u010A" +
		"\u010C\x03\x02\x02\x02\u010B\u0109\x03\x02\x02\x02\u010C\u010D\x07L\x02" +
		"\x02\u010D\x17\x03\x02\x02\x02\u010E\u010F\x07!\x02\x02\u010F\u0111\x05" +
		"f4\x02\u0110\u0112\x07R\x02\x02\u0111\u0110\x03\x02\x02\x02\u0111\u0112" +
		"\x03\x02\x02\x02\u0112\u0113\x03\x02\x02\x02\u0113\u0114\x07L\x02\x02" +
		"\u0114\x19\x03\x02\x02\x02\u0115\u0117\x07\x1C\x02\x02\u0116\u0118\x07" +
		"\x10\x02\x02\u0117\u0116\x03\x02\x02\x02\u0117\u0118\x03\x02\x02\x02\u0118" +
		"\u011A\x03\x02\x02\x02\u0119\u011B\x05f4\x02\u011A\u0119\x03\x02\x02\x02" +
		"\u011A\u011B\x03\x02\x02\x02\u011B\u011D\x03\x02\x02\x02\u011C\u011E\t" +
		"\x02\x02\x02\u011D\u011C\x03\x02\x02\x02\u011D\u011E\x03\x02\x02\x02\u011E" +
		"\u0121\x03\x02\x02\x02\u011F\u0120\x07G\x02\x02\u0120\u0122\x05(\x15\x02" +
		"\u0121\u011F\x03\x02\x02\x02\u0121\u0122\x03\x02\x02\x02\u0122\u0123\x03" +
		"\x02\x02\x02\u0123\u0127\x07T\x02\x02\u0124\u0126\x05\x1C\x0F\x02\u0125" +
		"\u0124\x03\x02\x02\x02\u0126\u0129\x03\x02\x02\x02\u0127\u0125\x03\x02" +
		"\x02\x02\u0127\u0128\x03\x02\x02\x02\u0128\u012A\x03\x02\x02\x02\u0129" +
		"\u0127\x03\x02\x02\x02\u012A\u012B\x07U\x02\x02\u012B\x1B\x03\x02\x02" +
		"\x02\u012C\u012E\x07$\x02\x02\u012D\u012C\x03\x02\x02\x02\u012D\u012E" +
		"\x03\x02\x02\x02\u012E\u012F\x03\x02\x02\x02\u012F\u0130\x05f4\x02\u0130" +
		"\u0132\x07M\x02\x02\u0131\u0133\x05h5\x02\u0132\u0131\x03\x02\x02\x02" +
		"\u0132\u0133\x03\x02\x02\x02\u0133\u0134\x03\x02\x02\x02\u0134\u0135\x07" +
		"N\x02\x02\u0135\u0136\x03\x02\x02\x02\u0136\u0137\x07L\x02\x02\u0137\x1D" +
		"\x03\x02\x02\x02\u0138\u013A\x07\x12\x02\x02\u0139\u0138\x03\x02\x02\x02" +
		"\u0139\u013A\x03\x02\x02\x02\u013A\u0142\x03\x02\x02\x02\u013B\u013D\x07" +
		"\x13\x02\x02\u013C\u013B\x03\x02\x02\x02\u013C\u013D\x03\x02\x02\x02\u013D" +
		"\u0142\x03\x02\x02\x02\u013E\u0140\x07\x10\x02\x02\u013F\u013E\x03\x02" +
		"\x02\x02\u013F\u0140\x03\x02\x02\x02\u0140\u0142\x03\x02\x02\x02\u0141" +
		"\u0139\x03\x02\x02\x02\u0141\u013C\x03\x02\x02\x02\u0141\u013F\x03\x02" +
		"\x02\x02\u0142\u0146\x03\x02\x02\x02\u0143\u0145\x077\x02\x02\u0144\u0143" +
		"\x03\x02\x02\x02\u0145\u0148\x03\x02\x02\x02\u0146\u0144\x03\x02\x02\x02" +
		"\u0146\u0147\x03\x02\x02\x02\u0147\u0151\x03\x02\x02\x02\u0148\u0146\x03" +
		"\x02\x02\x02\u0149\u0152\x05(\x15\x02\u014A\u014C\x07\x11\x02\x02\u014B" +
		"\u014A\x03\x02\x02\x02\u014B\u014C\x03\x02\x02\x02\u014C\u014D\x03\x02" +
		"\x02\x02\u014D\u014E\x05f4\x02\u014E\u014F\x07G\x02\x02\u014F\u0150\x05" +
		"(\x15\x02\u0150\u0152\x03\x02\x02\x02\u0151\u0149\x03\x02\x02\x02\u0151" +
		"\u014B\x03\x02\x02\x02\u0152\u0155\x03\x02\x02\x02\u0153\u0156\x05$\x13" +
		"\x02\u0154\u0156\x05&\x14\x02\u0155\u0153\x03\x02\x02\x02\u0155\u0154" +
		"\x03\x02\x02\x02\u0156\x1F\x03\x02\x02\x02\u0157\u0159\x07R\x02\x02\u0158" +
		"\u015A\x07L\x02\x02\u0159\u0158\x03\x02\x02\x02\u0159\u015A\x03\x02\x02" +
		"\x02\u015A\u016D\x03\x02\x02\x02\u015B\u015C\x071\x02\x02\u015C\u016D" +
		"\x05f4\x02\u015D\u015F\x07Q\x02\x02\u015E\u0160\x07L\x02\x02\u015F\u015E" +
		"\x03\x02\x02\x02\u015F\u0160\x03\x02\x02\x02\u0160\u016D\x03\x02\x02\x02" +
		"\u0161\u0162\x077\x02\x02\u0162\u016D\x07D\x02\x02\u0163\u0166\x07?\x02" +
		"\x02\u0164\u0167\x05f4\x02\u0165\u0167\x05b2\x02\u0166\u0164\x03\x02\x02" +
		"\x02\u0166\u0165\x03\x02\x02\x02\u0167\u016D\x03\x02\x02\x02\u0168\u0169" +
		"\x07O\x02\x02\u0169\u016A\x05\"\x12\x02\u016A\u016B\x07P\x02\x02\u016B" +
		"\u016D\x03\x02\x02\x02\u016C\u0157\x03\x02\x02\x02\u016C\u015B\x03\x02" +
		"\x02\x02\u016C\u015D\x03\x02\x02\x02\u016C\u0161\x03\x02\x02\x02\u016C" +
		"\u0163\x03\x02\x02\x02\u016C\u0168\x03\x02\x02\x02\u016D\u016F\x03\x02" +
		"\x02\x02\u016E\u0170\x075\x02\x02\u016F\u016E\x03\x02\x02\x02\u016F\u0170" +
		"\x03\x02\x02\x02\u0170!\x03\x02\x02\x02\u0171\u0176\x05b2\x02\u0172\u0173" +
		"\x07H\x02\x02\u0173\u0175\x05\"\x12\x02\u0174\u0172\x03\x02\x02\x02\u0175" +
		"\u0178\x03\x02\x02\x02\u0176\u0174\x03\x02\x02\x02\u0176\u0177\x03\x02" +
		"\x02\x02\u0177#\x03\x02\x02\x02\u0178\u0176\x03\x02\x02\x02\u0179\u017A" +
		"\x07T\x02\x02\u017A\u017B\x05*\x16\x02\u017B\u017C\x07U\x02\x02\u017C" +
		"%\x03\x02\x02\x02\u017D\u017E\x05*\x16\x02\u017E\u017F\x07L\x02\x02\u017F" +
		"\'\x03\x02\x02\x02\u0180\u0185\x05f4\x02\u0181\u0182\x07H\x02\x02\u0182" +
		"\u0184\x05(\x15\x02\u0183\u0181\x03\x02\x02\x02\u0184\u0187\x03\x02\x02" +
		"\x02\u0185\u0183\x03\x02\x02\x02\u0185\u0186\x03\x02\x02\x02\u0186)\x03" +
		"\x02\x02\x02\u0187\u0185\x03\x02\x02\x02\u0188\u018A\x05 \x11\x02\u0189" +
		"\u0188\x03\x02\x02\x02\u018A\u018D\x03\x02\x02\x02\u018B\u0189\x03\x02" +
		"\x02\x02\u018B\u018C\x03\x02\x02\x02\u018C\u0193\x03\x02\x02\x02\u018D" +
		"\u018B\x03\x02\x02\x02\u018E\u0192\x054\x1B\x02\u018F\u0192\x05,\x17\x02" +
		"\u0190\u0192\x050\x19\x02\u0191\u018E\x03\x02\x02\x02\u0191\u018F\x03" +
		"\x02\x02\x02\u0191\u0190\x03\x02\x02\x02\u0192\u0195\x03\x02\x02\x02\u0193" +
		"\u0191\x03\x02\x02\x02\u0193\u0194\x03\x02\x02\x02\u0194+\x03\x02\x02" +
		"\x02\u0195\u0193\x03\x02\x02\x02\u0196\u0199\x05f4\x02\u0197\u0199\x07" +
		"\'\x02\x02\u0198\u0196\x03\x02\x02\x02\u0198\u0197\x03\x02\x02\x02\u0199" +
		"\u019A\x03\x02\x02\x02\u019A\u019C\x07C\x02\x02\u019B\u019D\x07$\x02\x02" +
		"\u019C\u019B\x03\x02\x02\x02\u019C\u019D\x03\x02\x02\x02\u019D\u01A0\x03" +
		"\x02\x02\x02\u019E\u01A1\x05b2\x02\u019F\u01A1\x05.\x18\x02\u01A0\u019E" +
		"\x03\x02\x02\x02\u01A0\u019F\x03\x02\x02\x02\u01A1\u01A3\x03\x02\x02\x02" +
		"\u01A2\u01A4\x07L\x02\x02\u01A3\u01A2\x03\x02\x02\x02\u01A3\u01A4\x03" +
		"\x02\x02\x02\u01A4\u01B9\x03\x02\x02\x02\u01A5\u01A8\x05f4\x02\u01A6\u01A8" +
		"\x07\'\x02\x02\u01A7\u01A5\x03\x02\x02\x02\u01A7\u01A6\x03\x02\x02\x02" +
		"\u01A8\u01A9\x03\x02\x02\x02\u01A9\u01AB\x07G\x02\x02\u01AA\u01AC\x05" +
		"f4\x02\u01AB\u01AA\x03\x02\x02\x02\u01AB\u01AC\x03\x02\x02\x02\u01AC\u01B1" +
		"\x03\x02\x02\x02\u01AD\u01AE\x07H\x02\x02\u01AE\u01B0\x05(\x15\x02\u01AF" +
		"\u01AD\x03\x02\x02\x02\u01B0\u01B3\x03\x02\x02\x02\u01B1\u01AF\x03\x02" +
		"\x02\x02\u01B1\u01B2\x03\x02\x02\x02\u01B2\u01B4\x03\x02\x02\x02\u01B3" +
		"\u01B1\x03\x02\x02\x02\u01B4\u01B6\x05$\x13\x02\u01B5\u01B7\x07L\x02\x02" +
		"\u01B6\u01B5\x03\x02\x02\x02\u01B6\u01B7\x03\x02\x02\x02\u01B7\u01B9\x03" +
		"\x02\x02\x02\u01B8\u0198\x03\x02\x02\x02\u01B8\u01A7\x03\x02\x02\x02\u01B9" +
		"-\x03\x02\x02\x02\u01BA\u01BC\x07R\x02\x02\u01BB\u01BA\x03\x02\x02\x02" +
		"\u01BC\u01BF\x03\x02\x02\x02\u01BD\u01BB\x03\x02\x02\x02\u01BD\u01BE\x03" +
		"\x02\x02\x02\u01BE/\x03\x02\x02\x02\u01BF\u01BD\x03\x02\x02\x02\u01C0" +
		"\u01C1\x07\x14\x02\x02\u01C1\u01C9\x052\x1A\x02\u01C2\u01C3\x07\x14";
	private static readonly _serializedATNSegment1: string =
		"\x02\x02\u01C3\u01C5\x07M\x02\x02\u01C4\u01C6\x052\x1A\x02\u01C5\u01C4" +
		"\x03\x02\x02\x02\u01C5\u01C6\x03\x02\x02\x02\u01C6\u01C7\x03\x02\x02\x02" +
		"\u01C7\u01C9\x07N\x02\x02\u01C8\u01C0\x03\x02\x02\x02\u01C8\u01C2\x03" +
		"\x02\x02\x02\u01C9\u01CA\x03\x02\x02\x02\u01CA\u01CB\x05$\x13\x02\u01CB" +
		"1\x03\x02\x02\x02\u01CC\u01CF\x05d3\x02\u01CD\u01CF\x07J\x02\x02\u01CE" +
		"\u01CC\x03\x02\x02\x02\u01CE\u01CD\x03\x02\x02\x02\u01CF\u01D4\x03\x02" +
		"\x02\x02\u01D0\u01D1\x07H\x02\x02\u01D1\u01D3\x052\x1A\x02\u01D2\u01D0" +
		"\x03\x02\x02\x02\u01D3\u01D6\x03\x02\x02\x02\u01D4\u01D2\x03\x02\x02\x02" +
		"\u01D4\u01D5\x03\x02\x02\x02\u01D53\x03\x02\x02\x02\u01D6\u01D4\x03\x02" +
		"\x02\x02\u01D7\u01D8\x056\x1C\x02\u01D8\u01D9\x058\x1D\x02\u01D95\x03" +
		"\x02\x02\x02\u01DA\u01DC\x07\"\x02\x02\u01DB\u01DA\x03\x02\x02\x02\u01DB" +
		"\u01DC\x03\x02\x02\x02\u01DC\u01DE\x03\x02\x02\x02\u01DD\u01DF\x07$\x02" +
		"\x02\u01DE\u01DD\x03\x02\x02\x02\u01DE\u01DF\x03\x02\x02\x02\u01DF\u01E1" +
		"\x03\x02\x02\x02\u01E0\u01E2\x07\x07\x02\x02\u01E1\u01E0\x03\x02\x02\x02" +
		"\u01E1\u01E2\x03\x02\x02\x02\u01E2\u01E3\x03\x02\x02\x02\u01E3\u01E9\x05" +
		"f4\x02\u01E4\u01E6\x07M\x02\x02\u01E5\u01E7\x05h5\x02\u01E6\u01E5\x03" +
		"\x02\x02\x02\u01E6\u01E7\x03\x02\x02\x02\u01E7\u01E8\x03\x02\x02\x02\u01E8" +
		"\u01EA\x07N\x02\x02\u01E9\u01E4\x03\x02\x02\x02\u01E9\u01EA\x03\x02\x02" +
		"\x02\u01EA\u01F4\x03\x02\x02\x02\u01EB\u01F1\x07\x07\x02\x02\u01EC\u01EE" +
		"\x07M\x02\x02\u01ED\u01EF\x05h5\x02\u01EE\u01ED\x03\x02\x02\x02\u01EE" +
		"\u01EF\x03\x02\x02\x02\u01EF\u01F0\x03\x02\x02\x02\u01F0\u01F2\x07N\x02" +
		"\x02\u01F1\u01EC\x03\x02\x02\x02\u01F1\u01F2\x03\x02\x02\x02\u01F2\u01F4" +
		"\x03\x02\x02\x02\u01F3\u01DB\x03\x02\x02\x02\u01F3\u01EB\x03\x02\x02\x02" +
		"\u01F47\x03\x02\x02\x02\u01F5\u01F9\x07T\x02\x02\u01F6\u01F8\x05:\x1E" +
		"\x02\u01F7\u01F6\x03\x02\x02\x02\u01F8\u01FB\x03\x02\x02\x02\u01F9\u01F7" +
		"\x03\x02\x02\x02\u01F9\u01FA\x03\x02\x02\x02\u01FA\u01FC\x03\x02\x02\x02" +
		"\u01FB\u01F9\x03\x02\x02\x02\u01FC\u01FF\x07U\x02\x02\u01FD\u01FF\x05" +
		":\x1E\x02\u01FE\u01F5\x03\x02\x02\x02\u01FE\u01FD\x03\x02\x02\x02\u01FF" +
		"9\x03\x02\x02\x02\u0200\u0212\x05\\/\x02\u0201\u0212\x05^0\x02\u0202\u0212" +
		"\x05T+\x02\u0203\u0212\x05R*\x02\u0204\u0212\x05N(\x02\u0205\u0212\x05" +
		"P)\x02\u0206\u0212\x05D#\x02\u0207\u0212\x05H%\x02\u0208\u0212\x05J&\x02" +
		"\u0209\u0212\x05Z.\x02\u020A\u0212\x05X-\x02\u020B\u0212\x05L\'\x02\u020C" +
		"\u0212\x05F$\x02\u020D\u0212\x05B\"\x02\u020E\u0212\x05> \x02\u020F\u0212" +
		"\x05@!\x02\u0210\u0212\x05<\x1F\x02\u0211\u0200\x03\x02\x02\x02\u0211" +
		"\u0201\x03\x02\x02\x02\u0211\u0202\x03\x02\x02\x02\u0211\u0203\x03\x02" +
		"\x02\x02\u0211\u0204\x03\x02\x02\x02\u0211\u0205\x03\x02\x02\x02\u0211" +
		"\u0206\x03\x02\x02\x02\u0211\u0207\x03\x02\x02\x02\u0211\u0208\x03\x02" +
		"\x02\x02\u0211\u0209\x03\x02\x02\x02\u0211\u020A\x03\x02\x02\x02\u0211" +
		"\u020B\x03\x02\x02\x02\u0211\u020C\x03\x02\x02\x02\u0211\u020D\x03\x02" +
		"\x02\x02\u0211\u020E\x03\x02\x02\x02\u0211\u020F\x03\x02\x02\x02\u0211" +
		"\u0210\x03\x02\x02\x02\u0212;\x03\x02\x02\x02\u0213\u0215\x07/\x02\x02" +
		"\u0214\u0216\x05f4\x02\u0215\u0214\x03\x02\x02\x02\u0215\u0216\x03\x02" +
		"\x02\x02\u0216\u0217\x03\x02\x02\x02\u0217\u0218\x07L\x02\x02\u0218=\x03" +
		"\x02\x02\x02\u0219\u021B\x07-\x02\x02\u021A\u021C\x05f4\x02\u021B\u021A" +
		"\x03\x02\x02\x02\u021B\u021C\x03\x02\x02\x02\u021C\u021D\x03\x02\x02\x02" +
		"\u021D\u021E\x07L\x02\x02\u021E?\x03\x02\x02\x02\u021F\u0221\x07.\x02" +
		"\x02\u0220\u0222\x05f4\x02\u0221\u0220\x03\x02\x02\x02\u0221\u0222\x03" +
		"\x02\x02\x02\u0222\u0223\x03\x02\x02\x02\u0223\u0224\x07L\x02\x02\u0224" +
		"A\x03\x02\x02\x02\u0225\u0226\x05f4\x02\u0226\u0227\x07G\x02\x02\u0227" +
		"C\x03\x02\x02\x02\u0228\u0229\x07\x04\x02\x02\u0229\u022A\x07M\x02\x02" +
		"\u022A\u022B\x05b2\x02\u022B\u022C\x07N\x02\x02\u022C\u023B\x07T\x02\x02" +
		"\u022D\u022E\x07\x05\x02\x02\u022E\u022F\x05d3\x02\u022F\u0237\x07G\x02" +
		"\x02\u0230\u0238\x058\x1D\x02\u0231\u0233\x05:\x1E\x02\u0232\u0231\x03" +
		"\x02\x02\x02\u0233\u0236\x03\x02\x02\x02\u0234\u0232\x03\x02\x02\x02\u0234" +
		"\u0235\x03\x02\x02\x02\u0235\u0238\x03\x02\x02\x02\u0236\u0234\x03\x02" +
		"\x02\x02\u0237\u0230\x03\x02\x02\x02\u0237\u0234\x03\x02\x02\x02\u0238" +
		"\u023A\x03\x02\x02\x02\u0239\u022D\x03\x02\x02\x02\u023A\u023D\x03\x02" +
		"\x02\x02\u023B\u0239\x03\x02\x02\x02\u023B\u023C\x03\x02\x02\x02\u023C" +
		"\u0246\x03\x02\x02\x02\u023D\u023B\x03\x02\x02\x02\u023E\u023F\x07\x06" +
		"\x02\x02\u023F\u0243\x07G\x02\x02\u0240\u0242\x058\x1D\x02\u0241\u0240" +
		"\x03\x02\x02\x02\u0242\u0245\x03\x02\x02\x02\u0243\u0241\x03\x02\x02\x02" +
		"\u0243\u0244\x03\x02\x02\x02\u0244\u0247\x03\x02\x02\x02\u0245\u0243\x03" +
		"\x02\x02\x02\u0246\u023E\x03\x02\x02\x02\u0246\u0247\x03\x02\x02\x02\u0247" +
		"\u0248\x03\x02\x02\x02\u0248\u0249\x07U\x02\x02\u0249E\x03\x02\x02\x02" +
		"\u024A\u024B\x07\b\x02\x02\u024B\u024C\x05b2\x02\u024CG\x03\x02\x02\x02" +
		"\u024D\u024E\x07\v\x02\x02\u024E\u024F\x07M\x02\x02\u024F\u0250\x07\x19" +
		"\x02\x02\u0250\u0251\x07B\x02\x02\u0251\u0252\x07\'\x02\x02\u0252\u0253" +
		"\x05b2\x02\u0253\u0254\x07N\x02\x02\u0254\u0255\x058\x1D\x02\u0255I\x03" +
		"\x02\x02\x02\u0256\u0257\x07&\x02\x02\u0257\u0258\x07M\x02\x02\u0258\u0259" +
		"\x05b2\x02\u0259\u025A\x07\'\x02\x02\u025A\u025B\x05b2\x02\u025B\u025C" +
		"\x07N\x02\x02\u025C\u025D\x058\x1D\x02\u025DK\x03\x02\x02\x02\u025E\u0260" +
		"\x07#\x02\x02\u025F\u0261\x05b2\x02\u0260\u025F\x03\x02\x02\x02\u0260" +
		"\u0261\x03\x02\x02\x02\u0261\u0262\x03\x02\x02\x02\u0262\u0263\x07L\x02" +
		"\x02\u0263M\x03\x02\x02\x02\u0264\u0265\x07\x16\x02\x02\u0265\u0266\x05" +
		"8\x1D\x02\u0266\u0267\x07\x17\x02\x02\u0267\u0269\x07M\x02\x02\u0268\u026A" +
		"\x05b2\x02\u0269\u0268\x03\x02\x02\x02\u0269\u026A\x03\x02\x02\x02\u026A" +
		"\u026B\x03\x02\x02\x02\u026B\u026C\x07N\x02\x02\u026CO\x03\x02\x02\x02" +
		"\u026D\u026E\x07\x17\x02\x02\u026E\u0270\x07M\x02\x02\u026F\u0271\x05" +
		"b2\x02\u0270\u026F\x03\x02\x02\x02\u0270\u0271\x03\x02\x02\x02\u0271\u0272" +
		"\x03\x02\x02\x02\u0272\u0273\x07N\x02\x02\u0273\u0274\x058\x1D\x02\u0274" +
		"Q\x03\x02\x02\x02\u0275\u0276\x07\v\x02\x02\u0276\u0278\x07M\x02\x02\u0277" +
		"\u0279\x05b2\x02\u0278\u0277\x03\x02\x02\x02\u0278\u0279\x03\x02\x02\x02" +
		"\u0279\u027A\x03\x02\x02\x02\u027A\u027C\x07L\x02\x02\u027B\u027D\x05" +
		"b2\x02\u027C\u027B\x03\x02\x02\x02\u027C\u027D\x03\x02\x02\x02\u027D\u027E" +
		"\x03\x02\x02\x02\u027E\u0280\x07L\x02\x02\u027F\u0281\x05b2\x02\u0280" +
		"\u027F\x03\x02\x02\x02\u0280\u0281\x03\x02\x02\x02\u0281\u0282\x03\x02" +
		"\x02\x02\u0282\u0283\x07N\x02\x02\u0283\u0284\x058\x1D\x02\u0284S\x03" +
		"\x02\x02\x02\u0285\u0286\x07\f\x02\x02\u0286\u0290\x058\x1D\x02\u0287" +
		"\u0288\x07\r\x02\x02\u0288\u028A\x07M\x02\x02\u0289\u028B\x05h5\x02\u028A" +
		"\u0289\x03\x02\x02\x02\u028A\u028B\x03\x02\x02\x02\u028B\u028C\x03\x02" +
		"\x02\x02\u028C\u028D\x07N\x02\x02\u028D\u028F\x058\x1D\x02\u028E\u0287" +
		"\x03\x02\x02\x02\u028F\u0292\x03\x02\x02\x02\u0290\u028E\x03\x02\x02\x02" +
		"\u0290\u0291\x03\x02\x02\x02\u0291\u0295\x03\x02\x02\x02\u0292\u0290\x03" +
		"\x02\x02\x02\u0293\u0294\x07\x0E\x02\x02\u0294\u0296\x058\x1D\x02\u0295" +
		"\u0293\x03\x02\x02\x02\u0295\u0296\x03\x02\x02\x02\u0296U\x03\x02\x02" +
		"\x02\u0297\u029A\x05b2\x02\u0298\u0299\x07I\x02\x02\u0299\u029B\x05V," +
		"\x02\u029A\u0298\x03\x02\x02\x02\u029A\u029B\x03\x02\x02\x02\u029BW\x03" +
		"\x02\x02\x02\u029C\u029E\x05b2\x02\u029D\u029C\x03\x02\x02\x02\u029D\u029E" +
		"\x03\x02\x02\x02\u029E\u029F\x03\x02\x02\x02\u029F\u02A0\x07L\x02\x02" +
		"\u02A0Y\x03\x02\x02\x02\u02A1\u02A2\x07Q\x02\x02\u02A2\u02A3\x07L\x02" +
		"\x02\u02A3[\x03\x02\x02\x02\u02A4\u02A5\x07\x19\x02\x02\u02A5\u02A8\x05" +
		"f4\x02\u02A6\u02A7\x07C\x02\x02\u02A7\u02A9\x05b2\x02\u02A8\u02A6\x03" +
		"\x02\x02\x02\u02A8\u02A9\x03\x02\x02\x02\u02A9\u02AA\x03\x02\x02\x02\u02AA" +
		"\u02AB\x07L\x02\x02\u02AB]\x03\x02\x02\x02\u02AC\u02AD\x07\x15\x02\x02" +
		"\u02AD\u02B3\x05`1\x02\u02AE\u02AF\x07\x18\x02\x02\u02AF\u02B0\x07\x15" +
		"\x02\x02\u02B0\u02B2\x05`1\x02\u02B1\u02AE\x03\x02\x02\x02\u02B2\u02B5" +
		"\x03\x02\x02\x02\u02B3\u02B1\x03\x02\x02\x02\u02B3\u02B4\x03\x02\x02\x02" +
		"\u02B4\u02B8\x03\x02\x02\x02\u02B5\u02B3\x03\x02\x02\x02\u02B6\u02B7\x07" +
		"\x18\x02\x02\u02B7\u02B9\x058\x1D\x02\u02B8\u02B6\x03\x02\x02\x02\u02B8" +
		"\u02B9\x03\x02\x02\x02\u02B9_\x03\x02\x02\x02\u02BA\u02BB\x07M\x02\x02" +
		"\u02BB\u02BC\x05b2\x02\u02BC\u02BD\x07N\x02\x02\u02BD\u02BE\x058\x1D\x02" +
		"\u02BEa\x03\x02\x02\x02\u02BF\u02C0\b2\x01\x02\u02C0\u02C2\x07O\x02\x02" +
		"\u02C1\u02C3\x05b2\x02\u02C2\u02C1\x03\x02\x02\x02\u02C2\u02C3\x03\x02" +
		"\x02\x02\u02C3\u02C4\x03\x02\x02\x02\u02C4\u02E9\x07P\x02\x02\u02C5\u02C6" +
		"\x07\x1E\x02\x02\u02C6\u02E9\x05b2$\u02C7\u02C8\x07\x1D\x02\x02\u02C8" +
		"\u02E9\x05b2#\u02C9\u02CA\x07\x11\x02\x02\u02CA\u02E9\x05b2\"\u02CB\u02E9" +
		"\x05d3\x02\u02CC\u02CE\x07M\x02\x02\u02CD\u02CF\x05b2\x02\u02CE\u02CD" +
		"\x03\x02\x02\x02\u02CE\u02CF\x03\x02\x02\x02\u02CF\u02D0\x03\x02\x02\x02" +
		"\u02D0\u02E9\x07N\x02\x02\u02D1\u02D2\x07\x19\x02\x02\u02D2\u02E9\x05" +
		"b2\x1C\u02D3\u02D4\x07$\x02\x02\u02D4\u02E9\x05b2\x1B\u02D5\u02D6\x07" +
		"\t\x02\x02\u02D6\u02E9\x05b2\x1A\u02D7\u02D9\x07T\x02\x02\u02D8\u02DA" +
		"\x05h5\x02\u02D9\u02D8\x03\x02\x02\x02\u02D9\u02DA\x03\x02\x02\x02\u02DA" +
		"\u02DB\x03\x02\x02\x02\u02DB\u02DD\x07G\x02\x02\u02DC\u02DE\x05b2\x02" +
		"\u02DD\u02DC\x03\x02\x02\x02\u02DD\u02DE\x03\x02\x02\x02\u02DE\u02DF\x03" +
		"\x02\x02\x02\u02DF\u02E9\x07U\x02\x02\u02E0\u02E1\x07?\x02\x02\u02E1\u02E9" +
		"\x05b2\b\u02E2\u02E3\x07J\x02\x02\u02E3\u02E4\x07?\x02\x02\u02E4\u02E9" +
		"\x05b2\x07\u02E5\u02E6\t\x03\x02\x02\u02E6\u02E9\x05b2\x06\u02E7\u02E9" +
		"\x054\x1B\x02\u02E8\u02BF\x03\x02\x02\x02\u02E8\u02C5\x03\x02\x02\x02" +
		"\u02E8\u02C7\x03\x02\x02\x02\u02E8\u02C9\x03\x02\x02\x02\u02E8\u02CB\x03" +
		"\x02\x02\x02\u02E8\u02CC\x03\x02\x02\x02\u02E8\u02D1\x03\x02\x02\x02\u02E8" +
		"\u02D3\x03\x02\x02\x02\u02E8\u02D5\x03\x02\x02\x02\u02E8\u02D7\x03\x02" +
		"\x02\x02\u02E8\u02E0\x03\x02\x02\x02\u02E8\u02E2\x03\x02\x02\x02\u02E8" +
		"\u02E5\x03\x02\x02\x02\u02E8\u02E7\x03\x02\x02\x02\u02E9\u0366\x03\x02" +
		"\x02\x02\u02EA\u02EB\f(\x02\x02\u02EB\u02EC\x07I\x02\x02\u02EC\u0365\x05" +
		"b2)\u02ED\u02EE\f&\x02\x02\u02EE\u02EF\x07H\x02\x02\u02EF\u0365\x05b2" +
		"\'\u02F0\u02F1\f\x19\x02\x02\u02F1\u02F2\x072\x02\x02\u02F2\u0365\x05" +
		"b2\x1A\u02F3\u02F4\f\x18\x02\x02\u02F4\u02F5\x07+\x02\x02\u02F5\u02F6" +
		"\x07\'\x02\x02\u02F6\u0365\x05b2\x19\u02F7\u02F8\f\x17\x02\x02\u02F8\u02F9" +
		"\x07,\x02\x02\u02F9\u02FA\x07\'\x02\x02\u02FA\u0365\x05b2\x18\u02FB\u02FC" +
		"\f\x16\x02\x02\u02FC\u02FD\x07,\x02\x02\u02FD\u0365\x05b2\x17\u02FE\u02FF" +
		"\f\x15\x02\x02\u02FF\u0300\x07\'\x02\x02\u0300\u0365\x05b2\x16\u0301\u0302" +
		"\f\x14\x02\x02\u0302\u0303\x07C\x02\x02\u0303\u0365\x05b2\x15\u0304\u0305" +
		"\f\x13\x02\x02\u0305\u0306\x076\x02\x02\u0306\u0365\x05b2\x14\u0307\u0308" +
		"\f\x11\x02\x02\u0308\u030A\t\x04\x02\x02\u0309\u030B\x07C\x02\x02\u030A" +
		"\u0309\x03\x02\x02\x02\u030A\u030B\x03\x02\x02\x02\u030B\u030C\x03\x02" +
		"\x02\x02\u030C\u0365\x05b2\x12\u030D\u030E\f\x10\x02\x02\u030E\u030F\t" +
		"\x05\x02\x02\u030F\u0365\x05b2\x11\u0310\u0311\f\x0F\x02\x02\u0311\u0313" +
		"\x07A\x02\x02\u0312\u0314\x07C\x02\x02\u0313\u0312\x03\x02\x02\x02\u0313" +
		"\u0314\x03\x02\x02\x02\u0314\u0315\x03\x02\x02\x02\u0315\u0365\x05b2\x10" +
		"\u0316\u0317\f\x0E\x02\x02\u0317\u0319\t\x06\x02\x02\u0318\u031A\x07C" +
		"\x02\x02\u0319\u0318\x03\x02\x02\x02\u0319\u031A\x03\x02\x02\x02\u031A" +
		"\u031B\x03\x02\x02\x02\u031B\u0365\x05b2\x0F\u031C\u031D\f\r\x02\x02\u031D" +
		"\u031F\t\x07\x02\x02\u031E\u0320\x07C\x02\x02\u031F\u031E\x03\x02\x02" +
		"\x02\u031F\u0320\x03\x02\x02\x02\u0320\u0321\x03\x02\x02\x02\u0321\u0365" +
		"\x05b2\x0E\u0322\u0323\f\f\x02\x02\u0323\u0324\t\b\x02\x02\u0324\u0365" +
		"\x05b2\r\u0325\u0326\f\v\x02\x02\u0326\u0327\t\t\x02\x02\u0327\u0365\x05" +
		"b2\f\u0328\u0329\f\n\x02\x02\u0329\u032B\t\n\x02\x02\u032A\u032C\x07C" +
		"\x02\x02\u032B\u032A\x03\x02\x02\x02\u032B\u032C\x03\x02\x02\x02\u032C" +
		"\u032D\x03\x02\x02\x02\u032D\u0365\x05b2\v\u032E\u032F\f\t\x02\x02\u032F" +
		"\u0330\x07?\x02\x02\u0330\u0365\x05b2\n\u0331\u0332\f\x04\x02\x02\u0332" +
		"\u0333\x075\x02\x02\u0333\u0334\x05b2\x02\u0334\u0335\x07G\x02\x02\u0335" +
		"\u0336\x05b2\x05\u0336\u0365\x03\x02\x02\x02\u0337\u0338\f\'\x02\x02\u0338" +
		"\u033A\x07O\x02\x02\u0339\u033B\x05b2\x02\u033A\u0339\x03\x02\x02\x02" +
		"\u033A\u033B\x03\x02\x02\x02\u033B\u033C\x03\x02\x02\x02\u033C\u0365\x07" +
		"P\x02\x02\u033D\u033E\f%\x02\x02\u033E\u033F\x07)\x02\x02\u033F\u0342" +
		"\x05b2\x02\u0340\u0341\x07*\x02\x02\u0341\u0343\x05b2\x02\u0342\u0340" +
		"\x03\x02\x02\x02\u0342\u0343\x03\x02\x02\x02\u0343\u0365\x03\x02\x02\x02" +
		"\u0344\u0345\f \x02\x02\u0345\u0347\x07M\x02\x02\u0346\u0348\x05h5\x02" +
		"\u0347\u0346\x03\x02\x02\x02\u0348\u0349\x03\x02\x02\x02\u0349\u0347\x03" +
		"\x02\x02\x02\u0349\u034A\x03\x02\x02\x02\u034A\u034B\x03\x02\x02\x02\u034B" +
		"\u034C\x07N\x02\x02\u034C\u0365\x03\x02\x02\x02\u034D\u034E\f\x1F\x02" +
		"\x02\u034E\u0350\x07M\x02\x02\u034F\u0351\x05b2\x02\u0350\u034F\x03\x02" +
		"\x02\x02\u0350\u0351\x03\x02\x02\x02\u0351\u0352\x03\x02\x02\x02\u0352" +
		"\u0365\x07N\x02\x02\u0353\u0354\f\x1E\x02\x02\u0354\u0356\x07T\x02\x02" +
		"\u0355\u0357\x05h5\x02\u0356\u0355\x03\x02\x02\x02\u0356\u0357\x03\x02" +
		"\x02\x02\u0357\u0358\x03\x02\x02\x02\u0358\u035A\x07G\x02\x02\u0359\u035B" +
		"\x05b2\x02\u035A\u0359\x03\x02\x02\x02\u035A\u035B\x03\x02\x02\x02\u035B" +
		"\u035C\x03\x02\x02\x02\u035C\u0365\x07U\x02\x02\u035D\u0362\f\x05\x02" +
		"\x02\u035E\u035F\x077\x02\x02\u035F\u0363\x077\x02\x02\u0360\u0361\x07" +
		":\x02\x02\u0361\u0363\x07:\x02\x02\u0362\u035E\x03\x02\x02\x02\u0362\u0360" +
		"\x03\x02\x02\x02\u0363\u0365\x03\x02\x02\x02\u0364\u02EA\x03\x02\x02\x02" +
		"\u0364\u02ED\x03\x02\x02\x02\u0364\u02F0\x03\x02\x02\x02\u0364\u02F3\x03" +
		"\x02\x02\x02\u0364\u02F7\x03\x02\x02\x02\u0364\u02FB\x03\x02\x02\x02\u0364" +
		"\u02FE\x03\x02\x02\x02\u0364\u0301\x03\x02\x02\x02\u0364\u0304\x03\x02" +
		"\x02\x02\u0364\u0307\x03\x02\x02\x02\u0364\u030D\x03\x02\x02\x02\u0364" +
		"\u0310\x03\x02\x02\x02\u0364\u0316\x03\x02\x02\x02\u0364\u031C\x03\x02" +
		"\x02\x02\u0364\u0322\x03\x02\x02\x02\u0364\u0325\x03\x02\x02\x02\u0364" +
		"\u0328\x03\x02\x02\x02\u0364\u032E\x03\x02\x02\x02\u0364\u0331\x03\x02" +
		"\x02\x02\u0364\u0337\x03\x02\x02\x02\u0364\u033D\x03\x02\x02\x02\u0364" +
		"\u0344\x03\x02\x02\x02\u0364\u034D\x03\x02\x02\x02\u0364\u0353\x03\x02" +
		"\x02\x02\u0364\u035D\x03\x02\x02\x02\u0365\u0368\x03\x02\x02\x02\u0366" +
		"\u0364\x03\x02\x02\x02\u0366\u0367\x03\x02\x02\x02\u0367c\x03\x02\x02" +
		"\x02\u0368\u0366\x03\x02\x02\x02\u0369\u0375\x07\x1D\x02\x02\u036A\u0375" +
		"\x07E\x02\x02\u036B\u0375\x07D\x02\x02\u036C\u036D\x072\x02\x02\u036D" +
		"\u0375\x05f4\x02\u036E\u0375\x05f4\x02\u036F\u0375\x07R\x02\x02\u0370" +
		"\u0375\x07Q\x02\x02\u0371\u0375\x07S\x02\x02\u0372\u0375\x07\x1A\x02\x02" +
		"\u0373\u0375\x07\x1B\x02\x02\u0374\u0369\x03\x02\x02\x02\u0374\u036A\x03" +
		"\x02\x02\x02\u0374\u036B\x03\x02\x02\x02\u0374\u036C\x03\x02\x02\x02\u0374" +
		"\u036E\x03\x02\x02\x02\u0374\u036F\x03\x02\x02\x02\u0374\u0370\x03\x02" +
		"\x02\x02\u0374\u0371\x03\x02\x02\x02\u0374\u0372\x03\x02\x02\x02\u0374" +
		"\u0373\x03\x02\x02\x02\u0375e\x03\x02\x02\x02\u0376\u0377\t\v\x02\x02" +
		"\u0377g\x03\x02\x02\x02\u0378\u037C\x05j6\x02\u0379\u037C\x07(\x02\x02" +
		"\u037A\u037C\x05\"\x12\x02\u037B\u0378\x03\x02\x02\x02\u037B\u0379\x03" +
		"\x02\x02\x02\u037B\u037A\x03\x02\x02\x02\u037C\u0381\x03\x02\x02\x02\u037D" +
		"\u037E\x07H\x02\x02\u037E\u0380\x05h5\x02\u037F\u037D\x03\x02\x02\x02" +
		"\u0380\u0383\x03\x02\x02\x02\u0381\u037F\x03\x02\x02\x02\u0381\u0382\x03" +
		"\x02\x02\x02\u0382i\x03\x02\x02\x02\u0383\u0381\x03\x02\x02\x02\u0384" +
		"\u0385\x05f4\x02\u0385\u0386\x07G\x02\x02\u0386\u0388\x03\x02\x02\x02" +
		"\u0387\u0384\x03\x02\x02\x02\u0387\u0388\x03\x02\x02\x02\u0388\u038A\x03" +
		"\x02\x02\x02\u0389\u038B\x05f4\x02\u038A\u0389\x03\x02\x02\x02\u038A\u038B" +
		"\x03\x02\x02\x02\u038B\u038C\x03\x02\x02\x02\u038C\u038E\x05f4\x02\u038D" +
		"\u038F\x075\x02\x02\u038E\u038D\x03\x02\x02\x02\u038E\u038F\x03\x02\x02" +
		"\x02\u038F\u0396\x03\x02\x02\x02\u0390\u0391\x05f4\x02\u0391\u0393\x07" +
		"G\x02\x02\u0392\u0394\x075\x02\x02\u0393\u0392\x03\x02\x02\x02\u0393\u0394" +
		"\x03\x02\x02\x02\u0394\u0396\x03\x02\x02\x02\u0395\u0387\x03\x02\x02\x02" +
		"\u0395\u0390\x03\x02\x02\x02\u0396k\x03\x02\x02\x02}o}\x81\x89\x91\x98" +
		"\x9C\xA1\xAE\xB6\xBC\xC3\xC7\xD0\xD2\xD9\xDD\xE4\xEC\xF5\xFD\u0102\u0109" +
		"\u0111\u0117\u011A\u011D\u0121\u0127\u012D\u0132\u0139\u013C\u013F\u0141" +
		"\u0146\u014B\u0151\u0155\u0159\u015F\u0166\u016C\u016F\u0176\u0185\u018B" +
		"\u0191\u0193\u0198\u019C\u01A0\u01A3\u01A7\u01AB\u01B1\u01B6\u01B8\u01BD" +
		"\u01C5\u01C8\u01CE\u01D4\u01DB\u01DE\u01E1\u01E6\u01E9\u01EE\u01F1\u01F3" +
		"\u01F9\u01FE\u0211\u0215\u021B\u0221\u0234\u0237\u023B\u0243\u0246\u0260" +
		"\u0269\u0270\u0278\u027C\u0280\u028A\u0290\u0295\u029A\u029D\u02A8\u02B3" +
		"\u02B8\u02C2\u02CE\u02D9\u02DD\u02E8\u030A\u0313\u0319\u031F\u032B\u033A" +
		"\u0342\u0349\u0350\u0356\u035A\u0362\u0364\u0366\u0374\u037B\u0381\u0387" +
		"\u038A\u038E\u0393\u0395";
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
	public superTypes(): SuperTypesContext {
		return this.getRuleContext(0, SuperTypesContext);
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
	public curlyObjectBody(): CurlyObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, CurlyObjectBodyContext);
	}
	public semiColonEndedObjectBody(): SemiColonEndedObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, SemiColonEndedObjectBodyContext);
	}
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_PAREN, 0); }
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MODIFY, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.REPLACE, 0); }
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
}


export class TemplateDeclarationContext extends ParserRuleContext {
	public _className!: IdentifierAtomContext;
	public _expr!: ExprContext;
	public _properties: ExprContext[] = [];
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
}


export class ObjectDeclarationContext extends ParserRuleContext {
	public _isModify!: Token;
	public _isReplace!: Token;
	public _isClass!: Token;
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
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.COLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.MODIFY, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.REPLACE, 0); }
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.CLASS, 0); }
	public TRANSIENT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.TRANSIENT, 0); }
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
}


export class TemplateExprContext extends ParserRuleContext {
	public _singleString!: Token;
	public _atLocation!: IdentifierAtomContext;
	public _doubleString!: Token;
	public _number!: Token;
	public _connection!: IdentifierAtomContext;
	public _expression!: ExprContext;
	public AT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.AT, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.PLUS, 0); }
	public ARROW(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ARROW, 0); }
	public LEFT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_BRACKET, 0); }
	public array(): ArrayContext | undefined {
		return this.tryGetRuleContext(0, ArrayContext);
	}
	public RIGHT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_BRACKET, 0); }
	public SSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.SSTR, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public DSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.DSTR, 0); }
	public NR(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.NR, 0); }
	public OPTIONAL(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.OPTIONAL, 0); }
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.SEMICOLON, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
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
}


export class PropertyContext extends ParserRuleContext {
	public _objectName!: IdentifierAtomContext;
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ASSIGN, 0); }
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public IN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.IN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public dictionaryProperty(): DictionaryPropertyContext | undefined {
		return this.tryGetRuleContext(0, DictionaryPropertyContext);
	}
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STATIC, 0); }
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.SEMICOLON, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.COLON, 0); }
	public curlyObjectBody(): CurlyObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, CurlyObjectBodyContext);
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
}


export class PropertySetContext extends ParserRuleContext {
	public curlyObjectBody(): CurlyObjectBodyContext {
		return this.getRuleContext(0, CurlyObjectBodyContext);
	}
	public PROPERTYSET(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.PROPERTYSET, 0); }
	public paramsWithWildcard(): ParamsWithWildcardContext | undefined {
		return this.tryGetRuleContext(0, ParamsWithWildcardContext);
	}
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.RIGHT_PAREN, 0); }
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
}


export class FunctionDeclarationContext extends ParserRuleContext {
	public functionHead(): FunctionHeadContext {
		return this.getRuleContext(0, FunctionHeadContext);
	}
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
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
}


export class SwitchStatementContext extends ParserRuleContext {
	public SWITCH(): TerminalNode { return this.getToken(Tads3Parser.SWITCH, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.LEFT_PAREN, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_PAREN, 0); }
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3Parser.RIGHT_CURLY, 0); }
	public CASE(): TerminalNode[];
	public CASE(i: number): TerminalNode;
	public CASE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.CASE);
		} else {
			return this.getToken(Tads3Parser.CASE, i);
		}
	}
	public primary(): PrimaryContext[];
	public primary(i: number): PrimaryContext;
	public primary(i?: number): PrimaryContext | PrimaryContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PrimaryContext);
		} else {
			return this.getRuleContext(i, PrimaryContext);
		}
	}
	public COLON(): TerminalNode[];
	public COLON(i: number): TerminalNode;
	public COLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3Parser.COLON);
		} else {
			return this.getToken(Tads3Parser.COLON, i);
		}
	}
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.DEFAULT, 0); }
	public codeBlock(): CodeBlockContext[];
	public codeBlock(i: number): CodeBlockContext;
	public codeBlock(i?: number): CodeBlockContext | CodeBlockContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CodeBlockContext);
		} else {
			return this.getRuleContext(i, CodeBlockContext);
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
}


export class IdentifierAtomContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.ID, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.IN, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(Tads3Parser.STRING, 0); }
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
}


export class ParamsContext extends ParserRuleContext {
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
}


export class OptionallyTypedOptionalIdContext extends ParserRuleContext {
	public _identifier!: IdentifierAtomContext;
	public _type!: IdentifierAtomContext;
	public _name!: IdentifierAtomContext;
	public _optional!: Token;
	public _emptyColon!: Token;
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
}


