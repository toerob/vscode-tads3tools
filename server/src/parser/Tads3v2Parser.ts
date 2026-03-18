// Generated from server/src/parser/Tads3v2.g4 by ANTLR 4.9.0-SNAPSHOT


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

import { Tads3v2Listener } from "./Tads3v2Listener";
import { Tads3v2Visitor } from "./Tads3v2Visitor";


export class Tads3v2Parser extends Parser {
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
	public static readonly RULE_templateDefItem = 16;
	public static readonly RULE_templateDefToken = 17;
	public static readonly RULE_templateExpr = 18;
	public static readonly RULE_templatePrefixOp = 19;
	public static readonly RULE_array = 20;
	public static readonly RULE_argExpr = 21;
	public static readonly RULE_curlyObjectBody = 22;
	public static readonly RULE_semiColonEndedObjectBody = 23;
	public static readonly RULE_superTypes = 24;
	public static readonly RULE_objectBody = 25;
	public static readonly RULE_property = 26;
	public static readonly RULE_dictionaryProperty = 27;
	public static readonly RULE_propertySet = 28;
	public static readonly RULE_paramsWithWildcard = 29;
	public static readonly RULE_functionDeclaration = 30;
	public static readonly RULE_operatorOverride = 31;
	public static readonly RULE_functionHead = 32;
	public static readonly RULE_codeBlock = 33;
	public static readonly RULE_stats = 34;
	public static readonly RULE_innerCodeBlock = 35;
	public static readonly RULE_gotoStatement = 36;
	public static readonly RULE_breakStatement = 37;
	public static readonly RULE_continueStatement = 38;
	public static readonly RULE_labelStatement = 39;
	public static readonly RULE_switchStatement = 40;
	public static readonly RULE_switchCase = 41;
	public static readonly RULE_throwStatement = 42;
	public static readonly RULE_forInStatement = 43;
	public static readonly RULE_forEachStatement = 44;
	public static readonly RULE_returnStatement = 45;
	public static readonly RULE_doWhileStatement = 46;
	public static readonly RULE_whileStatement = 47;
	public static readonly RULE_forStatement = 48;
	public static readonly RULE_forUpdate = 49;
	public static readonly RULE_forInit = 50;
	public static readonly RULE_forInitItem = 51;
	public static readonly RULE_tryCatchStatement = 52;
	public static readonly RULE_emptyStatement = 53;
	public static readonly RULE_sayStatement = 54;
	public static readonly RULE_assignmentStatement = 55;
	public static readonly RULE_localVarDecl = 56;
	public static readonly RULE_ifStatement = 57;
	public static readonly RULE_enclosedExprCodeBlock = 58;
	public static readonly RULE_expr = 59;
	public static readonly RULE_assignmentExpr = 60;
	public static readonly RULE_assignmentOp = 61;
	public static readonly RULE_conditionalExpr = 62;
	public static readonly RULE_ifNilExpr = 63;
	public static readonly RULE_logicalOrExpr = 64;
	public static readonly RULE_logicalAndExpr = 65;
	public static readonly RULE_bitwiseOrExpr = 66;
	public static readonly RULE_bitwiseXorExpr = 67;
	public static readonly RULE_bitwiseAndExpr = 68;
	public static readonly RULE_equalityExpr = 69;
	public static readonly RULE_equalitySuffix = 70;
	public static readonly RULE_relationalExpr = 71;
	public static readonly RULE_relationalOp = 72;
	public static readonly RULE_shiftExpr = 73;
	public static readonly RULE_additiveExpr = 74;
	public static readonly RULE_multiplicativeExpr = 75;
	public static readonly RULE_unaryExpr = 76;
	public static readonly RULE_prefixOp = 77;
	public static readonly RULE_postfixExpr = 78;
	public static readonly RULE_postfixSuffix = 79;
	public static readonly RULE_primaryExpr = 80;
	public static readonly RULE_primary = 81;
	public static readonly RULE_memberExpr = 82;
	public static readonly RULE_identifierAtom = 83;
	public static readonly RULE_softKeyword = 84;
	public static readonly RULE_params = 85;
	public static readonly RULE_param = 86;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "directive", "pragmaDirective", "grammarRules", "itemList", 
		"qualifiers", "item", "templateDeclaration", "enumDeclaration", "propertyDeclaration", 
		"dictionaryDeclaration", "exportDeclaration", "intrinsicDeclaration", 
		"intrinsicMethodDeclaration", "objectDeclaration", "grammarDeclaration", 
		"templateDefItem", "templateDefToken", "templateExpr", "templatePrefixOp", 
		"array", "argExpr", "curlyObjectBody", "semiColonEndedObjectBody", "superTypes", 
		"objectBody", "property", "dictionaryProperty", "propertySet", "paramsWithWildcard", 
		"functionDeclaration", "operatorOverride", "functionHead", "codeBlock", 
		"stats", "innerCodeBlock", "gotoStatement", "breakStatement", "continueStatement", 
		"labelStatement", "switchStatement", "switchCase", "throwStatement", "forInStatement", 
		"forEachStatement", "returnStatement", "doWhileStatement", "whileStatement", 
		"forStatement", "forUpdate", "forInit", "forInitItem", "tryCatchStatement", 
		"emptyStatement", "sayStatement", "assignmentStatement", "localVarDecl", 
		"ifStatement", "enclosedExprCodeBlock", "expr", "assignmentExpr", "assignmentOp", 
		"conditionalExpr", "ifNilExpr", "logicalOrExpr", "logicalAndExpr", "bitwiseOrExpr", 
		"bitwiseXorExpr", "bitwiseAndExpr", "equalityExpr", "equalitySuffix", 
		"relationalExpr", "relationalOp", "shiftExpr", "additiveExpr", "multiplicativeExpr", 
		"unaryExpr", "prefixOp", "postfixExpr", "postfixSuffix", "primaryExpr", 
		"primary", "memberExpr", "identifierAtom", "softKeyword", "params", "param",
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
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(Tads3v2Parser._LITERAL_NAMES, Tads3v2Parser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return Tads3v2Parser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Tads3v2.g4"; }

	// @Override
	public get ruleNames(): string[] { return Tads3v2Parser.ruleNames; }

	// @Override
	public get serializedATN(): string { return Tads3v2Parser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(Tads3v2Parser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, Tads3v2Parser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 177;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.GRAMMAR) | (1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.ENUM) | (1 << Tads3v2Parser.CLASS) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.INTRINSIC) | (1 << Tads3v2Parser.PROPERTY) | (1 << Tads3v2Parser.DICTIONARY) | (1 << Tads3v2Parser.EXPORT))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.HASH - 32)) | (1 << (Tads3v2Parser.PLUS - 32)))) !== 0) || _la === Tads3v2Parser.ID || _la === Tads3v2Parser.SEMICOLON) {
				{
				{
				this.state = 174;
				_localctx._directive = this.directive();
				_localctx._directives.push(_localctx._directive);
				}
				}
				this.state = 179;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 180;
			this.match(Tads3v2Parser.EOF);
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
		this.enterRule(_localctx, 2, Tads3v2Parser.RULE_directive);
		try {
			this.state = 193;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 182;
				this.enumDeclaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 183;
				this.templateDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 184;
				this.intrinsicDeclaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 185;
				this.exportDeclaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 186;
				this.objectDeclaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 187;
				this.propertyDeclaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 188;
				this.dictionaryDeclaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 189;
				this.functionDeclaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 190;
				this.grammarDeclaration();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 191;
				this.pragmaDirective();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 192;
				this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 4, Tads3v2Parser.RULE_pragmaDirective);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 195;
			this.match(Tads3v2Parser.HASH);
			this.state = 196;
			this.match(Tads3v2Parser.PRAGMA);
			this.state = 197;
			this.match(Tads3v2Parser.ID);
			this.state = 198;
			this.match(Tads3v2Parser.LEFT_PAREN);
			{
			this.state = 199;
			this.expr();
			}
			this.state = 200;
			this.match(Tads3v2Parser.RIGHT_PAREN);
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
		this.enterRule(_localctx, 6, Tads3v2Parser.RULE_grammarRules);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 202;
			this.itemList();
			this.state = 207;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.BITWISE_OR) {
				{
				{
				this.state = 203;
				this.match(Tads3v2Parser.BITWISE_OR);
				this.state = 204;
				this.itemList();
				}
				}
				this.state = 209;
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
		this.enterRule(_localctx, 8, Tads3v2Parser.RULE_itemList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 211;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				{
				this.state = 210;
				this.qualifiers();
				}
				break;
			}
			this.state = 216;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 213;
					this.item(0);
					}
					}
				}
				this.state = 218;
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
		this.enterRule(_localctx, 10, Tads3v2Parser.RULE_qualifiers);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 219;
			this.match(Tads3v2Parser.LEFT_BRACKET);
			this.state = 220;
			this.identifierAtom();
			this.state = 221;
			this.match(Tads3v2Parser.NR);
			this.state = 222;
			this.match(Tads3v2Parser.RIGHT_BRACKET);
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
		this.enterRecursionRule(_localctx, 12, Tads3v2Parser.RULE_item, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 237;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 225;
				this.match(Tads3v2Parser.LEFT_PAREN);
				this.state = 227;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 226;
					this.item(0);
					}
					}
					this.state = 229;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.BITWISE_OR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0));
				this.state = 231;
				this.match(Tads3v2Parser.RIGHT_PAREN);
				}
				break;

			case 2:
				{
				this.state = 233;
				this.match(Tads3v2Parser.BITWISE_OR);
				this.state = 234;
				this.item(3);
				}
				break;

			case 3:
				{
				this.state = 235;
				this.expr();
				}
				break;

			case 4:
				{
				this.state = 236;
				this.match(Tads3v2Parser.STAR);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 243;
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
					this.pushNewRecursionContext(_localctx, _startState, Tads3v2Parser.RULE_item);
					this.state = 239;
					if (!(this.precpred(this._ctx, 4))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
					}
					this.state = 240;
					this.match(Tads3v2Parser.BITWISE_OR);
					}
					}
				}
				this.state = 245;
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
		this.enterRule(_localctx, 14, Tads3v2Parser.RULE_templateDeclaration);
		let _la: number;
		try {
			this.state = 271;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 11, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 246;
				_localctx._className = this.identifierAtom();
				this.state = 247;
				this.match(Tads3v2Parser.TEMPLATE);
				this.state = 249;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 248;
					_localctx._templateDefItem = this.templateDefItem();
					_localctx._items.push(_localctx._templateDefItem);
					}
					}
					this.state = 251;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (((((_la - 27)) & ~0x1F) === 0 && ((1 << (_la - 27)) & ((1 << (Tads3v2Parser.INHERITED - 27)) | (1 << (Tads3v2Parser.AT - 27)) | (1 << (Tads3v2Parser.AMP - 27)) | (1 << (Tads3v2Parser.NOT - 27)) | (1 << (Tads3v2Parser.PLUS - 27)) | (1 << (Tads3v2Parser.DIV - 27)) | (1 << (Tads3v2Parser.MOD - 27)) | (1 << (Tads3v2Parser.MINUS - 27)))) !== 0) || ((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & ((1 << (Tads3v2Parser.ARROW - 63)) | (1 << (Tads3v2Parser.TILDE - 63)) | (1 << (Tads3v2Parser.COMMA - 63)) | (1 << (Tads3v2Parser.STAR - 63)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 63)) | (1 << (Tads3v2Parser.DSTR - 63)) | (1 << (Tads3v2Parser.SSTR - 63)))) !== 0));
				this.state = 253;
				this.match(Tads3v2Parser.SEMICOLON);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 255;
				this.match(Tads3v2Parser.STRING);
				this.state = 256;
				this.match(Tads3v2Parser.TEMPLATE);
				this.state = 257;
				this.match(Tads3v2Parser.ARITHMETIC_LEFT);
				this.state = 264;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.IS - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0) || _la === Tads3v2Parser.STAR) {
					{
					this.state = 262;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
					case 1:
						{
						this.state = 258;
						this.identifierAtom();
						}
						break;

					case 2:
						{
						this.state = 259;
						this.match(Tads3v2Parser.STAR);
						}
						break;

					case 3:
						{
						this.state = 260;
						this.match(Tads3v2Parser.IS);
						}
						break;

					case 4:
						{
						this.state = 261;
						this.match(Tads3v2Parser.IN);
						}
						break;
					}
					}
					this.state = 266;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 267;
				this.match(Tads3v2Parser.ARITHMETIC_RIGHT);
				this.state = 268;
				_localctx._templateId = this.identifierAtom();
				this.state = 269;
				this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 16, Tads3v2Parser.RULE_enumDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 273;
			this.match(Tads3v2Parser.ENUM);
			this.state = 275;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.TOKEN) {
				{
				this.state = 274;
				_localctx._isToken = this.match(Tads3v2Parser.TOKEN);
				}
			}

			this.state = 277;
			this.identifierAtom();
			this.state = 282;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.COMMA) {
				{
				{
				this.state = 278;
				this.match(Tads3v2Parser.COMMA);
				this.state = 279;
				this.identifierAtom();
				}
				}
				this.state = 284;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 285;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 18, Tads3v2Parser.RULE_propertyDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 290;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.PLUS) {
				{
				{
				this.state = 287;
				_localctx._level = this.match(Tads3v2Parser.PLUS);
				}
				}
				this.state = 292;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 293;
			_localctx._isProperty = this.match(Tads3v2Parser.PROPERTY);
			this.state = 294;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._identifiers.push(_localctx._identifierAtom);
			this.state = 299;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.COMMA) {
				{
				{
				this.state = 295;
				this.match(Tads3v2Parser.COMMA);
				this.state = 296;
				_localctx._identifierAtom = this.identifierAtom();
				_localctx._identifiers.push(_localctx._identifierAtom);
				}
				}
				this.state = 301;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 302;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 20, Tads3v2Parser.RULE_dictionaryDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 307;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.PLUS) {
				{
				{
				this.state = 304;
				_localctx._level = this.match(Tads3v2Parser.PLUS);
				}
				}
				this.state = 309;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 310;
			this.match(Tads3v2Parser.DICTIONARY);
			this.state = 312;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.PROPERTY) {
				{
				this.state = 311;
				_localctx._isProperty = this.match(Tads3v2Parser.PROPERTY);
				}
			}

			this.state = 314;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._identifiers.push(_localctx._identifierAtom);
			this.state = 319;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.COMMA) {
				{
				{
				this.state = 315;
				this.match(Tads3v2Parser.COMMA);
				this.state = 316;
				_localctx._identifierAtom = this.identifierAtom();
				_localctx._identifiers.push(_localctx._identifierAtom);
				}
				}
				this.state = 321;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 322;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 22, Tads3v2Parser.RULE_exportDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 324;
			this.match(Tads3v2Parser.EXPORT);
			this.state = 325;
			this.identifierAtom();
			this.state = 327;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.SSTR) {
				{
				this.state = 326;
				this.match(Tads3v2Parser.SSTR);
				}
			}

			this.state = 329;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 24, Tads3v2Parser.RULE_intrinsicDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 331;
			this.match(Tads3v2Parser.INTRINSIC);
			this.state = 333;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.CLASS) {
				{
				this.state = 332;
				this.match(Tads3v2Parser.CLASS);
				}
			}

			this.state = 336;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0)) {
				{
				this.state = 335;
				_localctx._name = this.identifierAtom();
				}
			}

			this.state = 339;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.DSTR || _la === Tads3v2Parser.SSTR) {
				{
				this.state = 338;
				_la = this._input.LA(1);
				if (!(_la === Tads3v2Parser.DSTR || _la === Tads3v2Parser.SSTR)) {
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

			this.state = 343;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.COLON) {
				{
				this.state = 341;
				this.match(Tads3v2Parser.COLON);
				this.state = 342;
				this.superTypes();
				}
			}

			this.state = 345;
			this.match(Tads3v2Parser.LEFT_CURLY);
			this.state = 349;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (Tads3v2Parser.STATIC - 34)) | (1 << (Tads3v2Parser.STRING - 34)) | (1 << (Tads3v2Parser.IN - 34)))) !== 0) || _la === Tads3v2Parser.ID) {
				{
				{
				this.state = 346;
				_localctx._intrinsicMethodDeclaration = this.intrinsicMethodDeclaration();
				_localctx._methods.push(_localctx._intrinsicMethodDeclaration);
				}
				}
				this.state = 351;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 352;
			this.match(Tads3v2Parser.RIGHT_CURLY);
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
		this.enterRule(_localctx, 26, Tads3v2Parser.RULE_intrinsicMethodDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 355;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.STATIC) {
				{
				this.state = 354;
				this.match(Tads3v2Parser.STATIC);
				}
			}

			this.state = 357;
			this.identifierAtom();
			{
			this.state = 358;
			this.match(Tads3v2Parser.LEFT_PAREN);
			this.state = 360;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.SPREAD - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0) || _la === Tads3v2Parser.LEFT_BRACKET) {
				{
				this.state = 359;
				this.params();
				}
			}

			this.state = 362;
			this.match(Tads3v2Parser.RIGHT_PAREN);
			}
			this.state = 364;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 28, Tads3v2Parser.RULE_objectDeclaration);
		let _la: number;
		try {
			this.state = 399;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.MODIFY:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 366;
				_localctx._isModify = this.match(Tads3v2Parser.MODIFY);
				this.state = 367;
				_localctx._id = this.identifierAtom();
				this.state = 370;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 27, this._ctx) ) {
				case 1:
					{
					this.state = 368;
					this.curlyObjectBody();
					}
					break;

				case 2:
					{
					this.state = 369;
					this.semiColonEndedObjectBody();
					}
					break;
				}
				}
				break;
			case Tads3v2Parser.CLASS:
			case Tads3v2Parser.TRANSIENT:
			case Tads3v2Parser.REPLACE:
			case Tads3v2Parser.STRING:
			case Tads3v2Parser.IN:
			case Tads3v2Parser.PLUS:
			case Tads3v2Parser.ID:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 373;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.REPLACE) {
					{
					this.state = 372;
					_localctx._isReplace = this.match(Tads3v2Parser.REPLACE);
					}
				}

				this.state = 376;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.CLASS) {
					{
					this.state = 375;
					_localctx._isClass = this.match(Tads3v2Parser.CLASS);
					}
				}

				this.state = 381;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === Tads3v2Parser.PLUS) {
					{
					{
					this.state = 378;
					_localctx._PLUS = this.match(Tads3v2Parser.PLUS);
					_localctx._level.push(_localctx._PLUS);
					}
					}
					this.state = 383;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 385;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.TRANSIENT) {
					{
					this.state = 384;
					_localctx._isTransient = this.match(Tads3v2Parser.TRANSIENT);
					}
				}

				this.state = 393;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 33, this._ctx) ) {
				case 1:
					{
					this.state = 387;
					_localctx._id = this.identifierAtom();
					this.state = 388;
					this.match(Tads3v2Parser.COLON);
					this.state = 390;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 32, this._ctx) ) {
					case 1:
						{
						this.state = 389;
						this.superTypes();
						}
						break;
					}
					}
					break;

				case 2:
					{
					this.state = 392;
					this.superTypes();
					}
					break;
				}
				this.state = 397;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
				case 1:
					{
					this.state = 395;
					this.curlyObjectBody();
					}
					break;

				case 2:
					{
					this.state = 396;
					this.semiColonEndedObjectBody();
					}
					break;
				}
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
	public grammarDeclaration(): GrammarDeclarationContext {
		let _localctx: GrammarDeclarationContext = new GrammarDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, Tads3v2Parser.RULE_grammarDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 403;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.MODIFY:
				{
				this.state = 401;
				_localctx._isModify = this.match(Tads3v2Parser.MODIFY);
				}
				break;
			case Tads3v2Parser.REPLACE:
				{
				this.state = 402;
				_localctx._isReplace = this.match(Tads3v2Parser.REPLACE);
				}
				break;
			case Tads3v2Parser.GRAMMAR:
				break;
			default:
				break;
			}
			this.state = 405;
			this.match(Tads3v2Parser.GRAMMAR);
			this.state = 406;
			_localctx._prodName = this.identifierAtom();
			this.state = 411;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.LEFT_PAREN) {
				{
				this.state = 407;
				this.match(Tads3v2Parser.LEFT_PAREN);
				this.state = 408;
				_localctx._tag = this.identifierAtom();
				this.state = 409;
				this.match(Tads3v2Parser.RIGHT_PAREN);
				}
			}

			this.state = 413;
			this.match(Tads3v2Parser.COLON);
			this.state = 414;
			this.grammarRules();
			this.state = 415;
			this.match(Tads3v2Parser.COLON);
			this.state = 421;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				this.state = 416;
				this.superTypes();
				this.state = 419;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 38, this._ctx) ) {
				case 1:
					{
					this.state = 417;
					this.curlyObjectBody();
					}
					break;

				case 2:
					{
					this.state = 418;
					this.semiColonEndedObjectBody();
					}
					break;
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
	public templateDefItem(): TemplateDefItemContext {
		let _localctx: TemplateDefItemContext = new TemplateDefItemContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, Tads3v2Parser.RULE_templateDefItem);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 423;
			_localctx._value = this.templateDefToken();
			this.state = 425;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.OPTIONAL) {
				{
				this.state = 424;
				_localctx._optional = this.match(Tads3v2Parser.OPTIONAL);
				}
			}

			this.state = 428;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.BITWISE_OR) {
				{
				this.state = 427;
				_localctx._alternative = this.match(Tads3v2Parser.BITWISE_OR);
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
	public templateDefToken(): TemplateDefTokenContext {
		let _localctx: TemplateDefTokenContext = new TemplateDefTokenContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, Tads3v2Parser.RULE_templateDefToken);
		try {
			this.state = 440;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.SSTR:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 430;
				this.match(Tads3v2Parser.SSTR);
				}
				break;
			case Tads3v2Parser.DSTR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 431;
				this.match(Tads3v2Parser.DSTR);
				}
				break;
			case Tads3v2Parser.LEFT_BRACKET:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 432;
				this.match(Tads3v2Parser.LEFT_BRACKET);
				this.state = 433;
				_localctx._name = this.identifierAtom();
				this.state = 434;
				this.match(Tads3v2Parser.RIGHT_BRACKET);
				}
				break;
			case Tads3v2Parser.AT:
			case Tads3v2Parser.AMP:
			case Tads3v2Parser.NOT:
			case Tads3v2Parser.PLUS:
			case Tads3v2Parser.DIV:
			case Tads3v2Parser.MOD:
			case Tads3v2Parser.MINUS:
			case Tads3v2Parser.ARROW:
			case Tads3v2Parser.TILDE:
			case Tads3v2Parser.COMMA:
			case Tads3v2Parser.STAR:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 436;
				this.templatePrefixOp();
				this.state = 437;
				_localctx._name = this.identifierAtom();
				}
				break;
			case Tads3v2Parser.INHERITED:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 439;
				this.match(Tads3v2Parser.INHERITED);
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
	public templateExpr(): TemplateExprContext {
		let _localctx: TemplateExprContext = new TemplateExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, Tads3v2Parser.RULE_templateExpr);
		let _la: number;
		try {
			this.state = 452;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.SSTR:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 442;
				this.match(Tads3v2Parser.SSTR);
				}
				break;
			case Tads3v2Parser.DSTR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 443;
				this.match(Tads3v2Parser.DSTR);
				}
				break;
			case Tads3v2Parser.LEFT_BRACKET:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 444;
				this.match(Tads3v2Parser.LEFT_BRACKET);
				this.state = 446;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 445;
					this.array();
					}
				}

				this.state = 448;
				this.match(Tads3v2Parser.RIGHT_BRACKET);
				}
				break;
			case Tads3v2Parser.AT:
			case Tads3v2Parser.AMP:
			case Tads3v2Parser.NOT:
			case Tads3v2Parser.PLUS:
			case Tads3v2Parser.DIV:
			case Tads3v2Parser.MOD:
			case Tads3v2Parser.MINUS:
			case Tads3v2Parser.ARROW:
			case Tads3v2Parser.TILDE:
			case Tads3v2Parser.COMMA:
			case Tads3v2Parser.STAR:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 449;
				this.templatePrefixOp();
				this.state = 450;
				this.primaryExpr();
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
	public templatePrefixOp(): TemplatePrefixOpContext {
		let _localctx: TemplatePrefixOpContext = new TemplatePrefixOpContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, Tads3v2Parser.RULE_templatePrefixOp);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 454;
			_la = this._input.LA(1);
			if (!(((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & ((1 << (Tads3v2Parser.AT - 49)) | (1 << (Tads3v2Parser.AMP - 49)) | (1 << (Tads3v2Parser.NOT - 49)) | (1 << (Tads3v2Parser.PLUS - 49)) | (1 << (Tads3v2Parser.DIV - 49)) | (1 << (Tads3v2Parser.MOD - 49)) | (1 << (Tads3v2Parser.MINUS - 49)) | (1 << (Tads3v2Parser.ARROW - 49)) | (1 << (Tads3v2Parser.TILDE - 49)) | (1 << (Tads3v2Parser.COMMA - 49)) | (1 << (Tads3v2Parser.STAR - 49)))) !== 0))) {
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
	public array(): ArrayContext {
		let _localctx: ArrayContext = new ArrayContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, Tads3v2Parser.RULE_array);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 456;
			this.argExpr();
			this.state = 461;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.COMMA) {
				{
				{
				this.state = 457;
				this.match(Tads3v2Parser.COMMA);
				this.state = 458;
				this.argExpr();
				}
				}
				this.state = 463;
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
	public argExpr(): ArgExprContext {
		let _localctx: ArgExprContext = new ArgExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, Tads3v2Parser.RULE_argExpr);
		let _la: number;
		try {
			this.state = 474;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 48, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 464;
				_localctx._name = this.match(Tads3v2Parser.ID);
				this.state = 465;
				this.match(Tads3v2Parser.COLON);
				this.state = 466;
				this.expr();
				this.state = 468;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.SPREAD) {
					{
					this.state = 467;
					this.match(Tads3v2Parser.SPREAD);
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 470;
				this.expr();
				this.state = 472;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.SPREAD) {
					{
					this.state = 471;
					this.match(Tads3v2Parser.SPREAD);
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
	// @RuleVersion(0)
	public curlyObjectBody(): CurlyObjectBodyContext {
		let _localctx: CurlyObjectBodyContext = new CurlyObjectBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, Tads3v2Parser.RULE_curlyObjectBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 479;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & ((1 << (Tads3v2Parser.AT - 49)) | (1 << (Tads3v2Parser.AMP - 49)) | (1 << (Tads3v2Parser.NOT - 49)) | (1 << (Tads3v2Parser.PLUS - 49)) | (1 << (Tads3v2Parser.DIV - 49)) | (1 << (Tads3v2Parser.MOD - 49)) | (1 << (Tads3v2Parser.MINUS - 49)) | (1 << (Tads3v2Parser.ARROW - 49)) | (1 << (Tads3v2Parser.TILDE - 49)) | (1 << (Tads3v2Parser.COMMA - 49)) | (1 << (Tads3v2Parser.STAR - 49)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 49)))) !== 0) || _la === Tads3v2Parser.DSTR || _la === Tads3v2Parser.SSTR) {
				{
				{
				this.state = 476;
				_localctx._templateExpr = this.templateExpr();
				_localctx._template.push(_localctx._templateExpr);
				}
				}
				this.state = 481;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 482;
			this.match(Tads3v2Parser.LEFT_CURLY);
			this.state = 483;
			this.objectBody();
			this.state = 485;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.SEMICOLON) {
				{
				this.state = 484;
				this.match(Tads3v2Parser.SEMICOLON);
				}
			}

			this.state = 487;
			this.match(Tads3v2Parser.RIGHT_CURLY);
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
		this.enterRule(_localctx, 46, Tads3v2Parser.RULE_semiColonEndedObjectBody);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 489;
			this.objectBody();
			this.state = 490;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 48, Tads3v2Parser.RULE_superTypes);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 492;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._superType.push(_localctx._identifierAtom);
			this.state = 497;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 51, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 493;
					this.match(Tads3v2Parser.COMMA);
					this.state = 494;
					this.superTypes();
					}
					}
				}
				this.state = 499;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 51, this._ctx);
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
		this.enterRule(_localctx, 50, Tads3v2Parser.RULE_objectBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 503;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & ((1 << (Tads3v2Parser.AT - 49)) | (1 << (Tads3v2Parser.AMP - 49)) | (1 << (Tads3v2Parser.NOT - 49)) | (1 << (Tads3v2Parser.PLUS - 49)) | (1 << (Tads3v2Parser.DIV - 49)) | (1 << (Tads3v2Parser.MOD - 49)) | (1 << (Tads3v2Parser.MINUS - 49)) | (1 << (Tads3v2Parser.ARROW - 49)) | (1 << (Tads3v2Parser.TILDE - 49)) | (1 << (Tads3v2Parser.COMMA - 49)) | (1 << (Tads3v2Parser.STAR - 49)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 49)))) !== 0) || _la === Tads3v2Parser.DSTR || _la === Tads3v2Parser.SSTR) {
				{
				{
				this.state = 500;
				_localctx._templateExpr = this.templateExpr();
				_localctx._template.push(_localctx._templateExpr);
				}
				}
				this.state = 505;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 511;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & ((1 << (Tads3v2Parser.FUNCTION - 5)) | (1 << (Tads3v2Parser.MODIFY - 5)) | (1 << (Tads3v2Parser.REPLACE - 5)) | (1 << (Tads3v2Parser.PROPERTYSET - 5)) | (1 << (Tads3v2Parser.EXTERN - 5)) | (1 << (Tads3v2Parser.STATIC - 5)) | (1 << (Tads3v2Parser.STRING - 5)))) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (Tads3v2Parser.IN - 37)) | (1 << (Tads3v2Parser.OPERATOR - 37)) | (1 << (Tads3v2Parser.ID - 37)))) !== 0)) {
				{
				this.state = 509;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 53, this._ctx) ) {
				case 1:
					{
					this.state = 506;
					_localctx._functionDeclaration = this.functionDeclaration();
					_localctx._functions.push(_localctx._functionDeclaration);
					}
					break;

				case 2:
					{
					this.state = 507;
					_localctx._property = this.property();
					_localctx._properties.push(_localctx._property);
					}
					break;

				case 3:
					{
					this.state = 508;
					_localctx._propertySet = this.propertySet();
					_localctx._propertySets.push(_localctx._propertySet);
					}
					break;
				}
				}
				this.state = 513;
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
		this.enterRule(_localctx, 52, Tads3v2Parser.RULE_property);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 514;
			_localctx._id = this.identifierAtom();
			this.state = 541;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.ASSIGN:
				{
				this.state = 515;
				this.match(Tads3v2Parser.ASSIGN);
				this.state = 517;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 55, this._ctx) ) {
				case 1:
					{
					this.state = 516;
					this.match(Tads3v2Parser.STATIC);
					}
					break;
				}
				this.state = 521;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 56, this._ctx) ) {
				case 1:
					{
					this.state = 519;
					this.expr();
					}
					break;

				case 2:
					{
					this.state = 520;
					this.dictionaryProperty();
					}
					break;
				}
				this.state = 524;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 57, this._ctx) ) {
				case 1:
					{
					this.state = 523;
					this.match(Tads3v2Parser.SEMICOLON);
					}
					break;
				}
				}
				break;
			case Tads3v2Parser.COLON:
				{
				this.state = 526;
				this.match(Tads3v2Parser.COLON);
				this.state = 528;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0)) {
					{
					this.state = 527;
					_localctx._objectName = this.identifierAtom();
					}
				}

				this.state = 534;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 59, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 530;
						this.match(Tads3v2Parser.COMMA);
						this.state = 531;
						this.superTypes();
						}
						}
					}
					this.state = 536;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 59, this._ctx);
				}
				this.state = 537;
				this.curlyObjectBody();
				this.state = 539;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 60, this._ctx) ) {
				case 1:
					{
					this.state = 538;
					this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 54, Tads3v2Parser.RULE_dictionaryProperty);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 546;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.SSTR) {
				{
				{
				this.state = 543;
				this.match(Tads3v2Parser.SSTR);
				}
				}
				this.state = 548;
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
		this.enterRule(_localctx, 56, Tads3v2Parser.RULE_propertySet);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 549;
			this.match(Tads3v2Parser.PROPERTYSET);
			this.state = 550;
			_localctx._prefix = this.match(Tads3v2Parser.SSTR);
			this.state = 556;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.LEFT_PAREN) {
				{
				this.state = 551;
				this.match(Tads3v2Parser.LEFT_PAREN);
				this.state = 553;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0) || _la === Tads3v2Parser.STAR) {
					{
					this.state = 552;
					this.paramsWithWildcard();
					}
				}

				this.state = 555;
				this.match(Tads3v2Parser.RIGHT_PAREN);
				}
			}

			this.state = 558;
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
		this.enterRule(_localctx, 58, Tads3v2Parser.RULE_paramsWithWildcard);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 562;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.STRING:
			case Tads3v2Parser.IN:
			case Tads3v2Parser.ID:
				{
				this.state = 560;
				this.identifierAtom();
				}
				break;
			case Tads3v2Parser.STAR:
				{
				this.state = 561;
				this.match(Tads3v2Parser.STAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 571;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.COMMA) {
				{
				{
				this.state = 564;
				this.match(Tads3v2Parser.COMMA);
				this.state = 567;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case Tads3v2Parser.STRING:
				case Tads3v2Parser.IN:
				case Tads3v2Parser.ID:
					{
					this.state = 565;
					this.identifierAtom();
					}
					break;
				case Tads3v2Parser.STAR:
					{
					this.state = 566;
					this.match(Tads3v2Parser.STAR);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				}
				this.state = 573;
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
	public functionDeclaration(): FunctionDeclarationContext {
		let _localctx: FunctionDeclarationContext = new FunctionDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, Tads3v2Parser.RULE_functionDeclaration);
		try {
			this.state = 582;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.FUNCTION:
			case Tads3v2Parser.MODIFY:
			case Tads3v2Parser.REPLACE:
			case Tads3v2Parser.EXTERN:
			case Tads3v2Parser.STATIC:
			case Tads3v2Parser.STRING:
			case Tads3v2Parser.IN:
			case Tads3v2Parser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 576;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case Tads3v2Parser.MODIFY:
					{
					this.state = 574;
					_localctx._isModify = this.match(Tads3v2Parser.MODIFY);
					}
					break;
				case Tads3v2Parser.REPLACE:
					{
					this.state = 575;
					_localctx._isReplace = this.match(Tads3v2Parser.REPLACE);
					}
					break;
				case Tads3v2Parser.FUNCTION:
				case Tads3v2Parser.EXTERN:
				case Tads3v2Parser.STATIC:
				case Tads3v2Parser.STRING:
				case Tads3v2Parser.IN:
				case Tads3v2Parser.ID:
					break;
				default:
					break;
				}
				{
				this.state = 578;
				this.functionHead();
				this.state = 579;
				this.codeBlock();
				}
				}
				break;
			case Tads3v2Parser.OPERATOR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 581;
				this.operatorOverride();
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
	public operatorOverride(): OperatorOverrideContext {
		let _localctx: OperatorOverrideContext = new OperatorOverrideContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, Tads3v2Parser.RULE_operatorOverride);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 584;
			this.match(Tads3v2Parser.OPERATOR);
			this.state = 592;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.AMP:
			case Tads3v2Parser.PLUS:
			case Tads3v2Parser.DIV:
			case Tads3v2Parser.MOD:
			case Tads3v2Parser.MINUS:
			case Tads3v2Parser.TILDE:
			case Tads3v2Parser.POW:
			case Tads3v2Parser.STAR:
			case Tads3v2Parser.BITWISE_OR:
			case Tads3v2Parser.ARITHMETIC_LEFT:
			case Tads3v2Parser.ARITHMETIC_RIGHT:
			case Tads3v2Parser.LOGICAL_RIGHT_SHIFT:
				{
				this.state = 585;
				_la = this._input.LA(1);
				if (!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & ((1 << (Tads3v2Parser.AMP - 50)) | (1 << (Tads3v2Parser.PLUS - 50)) | (1 << (Tads3v2Parser.DIV - 50)) | (1 << (Tads3v2Parser.MOD - 50)) | (1 << (Tads3v2Parser.MINUS - 50)) | (1 << (Tads3v2Parser.TILDE - 50)) | (1 << (Tads3v2Parser.POW - 50)) | (1 << (Tads3v2Parser.STAR - 50)) | (1 << (Tads3v2Parser.BITWISE_OR - 50)))) !== 0) || ((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & ((1 << (Tads3v2Parser.ARITHMETIC_LEFT - 87)) | (1 << (Tads3v2Parser.ARITHMETIC_RIGHT - 87)) | (1 << (Tads3v2Parser.LOGICAL_RIGHT_SHIFT - 87)))) !== 0))) {
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
			case Tads3v2Parser.LEFT_BRACKET:
				{
				this.state = 586;
				this.match(Tads3v2Parser.LEFT_BRACKET);
				this.state = 587;
				this.match(Tads3v2Parser.RIGHT_BRACKET);
				this.state = 589;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.ASSIGN) {
					{
					this.state = 588;
					this.match(Tads3v2Parser.ASSIGN);
					}
				}

				}
				break;
			case Tads3v2Parser.STRING:
			case Tads3v2Parser.IN:
			case Tads3v2Parser.ID:
				{
				this.state = 591;
				this.identifierAtom();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 594;
			this.match(Tads3v2Parser.LEFT_PAREN);
			this.state = 596;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.SPREAD - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0) || _la === Tads3v2Parser.LEFT_BRACKET) {
				{
				this.state = 595;
				this.params();
				}
			}

			this.state = 598;
			this.match(Tads3v2Parser.RIGHT_PAREN);
			this.state = 599;
			this.match(Tads3v2Parser.LEFT_CURLY);
			this.state = 603;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.SWITCH) | (1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.THROW) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.FOR) | (1 << Tads3v2Parser.TRY) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.IF) | (1 << Tads3v2Parser.DO) | (1 << Tads3v2Parser.WHILE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.RETURN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.FOREACH - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.BREAK - 32)) | (1 << (Tads3v2Parser.CONTINUE - 32)) | (1 << (Tads3v2Parser.GOTO - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.SEMICOLON - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				{
				this.state = 600;
				this.stats();
				}
				}
				this.state = 605;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 606;
			this.match(Tads3v2Parser.RIGHT_CURLY);
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
		this.enterRule(_localctx, 64, Tads3v2Parser.RULE_functionHead);
		let _la: number;
		try {
			this.state = 633;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 81, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 609;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.EXTERN) {
					{
					this.state = 608;
					_localctx._isExtern = this.match(Tads3v2Parser.EXTERN);
					}
				}

				this.state = 612;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.STATIC) {
					{
					this.state = 611;
					_localctx._isStatic = this.match(Tads3v2Parser.STATIC);
					}
				}

				this.state = 615;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.FUNCTION) {
					{
					this.state = 614;
					this.match(Tads3v2Parser.FUNCTION);
					}
				}

				this.state = 617;
				this.identifierAtom();
				this.state = 623;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 78, this._ctx) ) {
				case 1:
					{
					this.state = 618;
					this.match(Tads3v2Parser.LEFT_PAREN);
					this.state = 620;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.SPREAD - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0) || _la === Tads3v2Parser.LEFT_BRACKET) {
						{
						this.state = 619;
						this.params();
						}
					}

					this.state = 622;
					this.match(Tads3v2Parser.RIGHT_PAREN);
					}
					break;
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 625;
				this.match(Tads3v2Parser.FUNCTION);
				this.state = 631;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 80, this._ctx) ) {
				case 1:
					{
					this.state = 626;
					this.match(Tads3v2Parser.LEFT_PAREN);
					this.state = 628;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.SPREAD - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0) || _la === Tads3v2Parser.LEFT_BRACKET) {
						{
						this.state = 627;
						this.params();
						}
					}

					this.state = 630;
					this.match(Tads3v2Parser.RIGHT_PAREN);
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
		this.enterRule(_localctx, 66, Tads3v2Parser.RULE_codeBlock);
		let _la: number;
		try {
			this.state = 644;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 83, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 635;
				this.match(Tads3v2Parser.LEFT_CURLY);
				this.state = 639;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.SWITCH) | (1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.THROW) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.FOR) | (1 << Tads3v2Parser.TRY) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.IF) | (1 << Tads3v2Parser.DO) | (1 << Tads3v2Parser.WHILE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.RETURN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.FOREACH - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.BREAK - 32)) | (1 << (Tads3v2Parser.CONTINUE - 32)) | (1 << (Tads3v2Parser.GOTO - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.SEMICOLON - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					{
					this.state = 636;
					this.stats();
					}
					}
					this.state = 641;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 642;
				this.match(Tads3v2Parser.RIGHT_CURLY);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 643;
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
		this.enterRule(_localctx, 68, Tads3v2Parser.RULE_stats);
		try {
			this.state = 664;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 84, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 646;
				this.assignmentStatement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 647;
				this.ifStatement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 648;
				this.tryCatchStatement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 649;
				this.forStatement();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 650;
				this.doWhileStatement();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 651;
				this.whileStatement();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 652;
				this.switchStatement();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 653;
				this.forInStatement();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 654;
				this.forEachStatement();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 655;
				this.sayStatement();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 656;
				this.emptyStatement();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 657;
				this.returnStatement();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 658;
				this.throwStatement();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 659;
				this.labelStatement();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 660;
				this.breakStatement();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 661;
				this.continueStatement();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 662;
				this.gotoStatement();
				}
				break;

			case 18:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 663;
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
		this.enterRule(_localctx, 70, Tads3v2Parser.RULE_innerCodeBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 666;
			this.match(Tads3v2Parser.LEFT_CURLY);
			this.state = 670;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.SWITCH) | (1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.THROW) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.FOR) | (1 << Tads3v2Parser.TRY) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.IF) | (1 << Tads3v2Parser.DO) | (1 << Tads3v2Parser.WHILE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.RETURN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.FOREACH - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.BREAK - 32)) | (1 << (Tads3v2Parser.CONTINUE - 32)) | (1 << (Tads3v2Parser.GOTO - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.SEMICOLON - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				{
				this.state = 667;
				this.stats();
				}
				}
				this.state = 672;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 673;
			this.match(Tads3v2Parser.RIGHT_CURLY);
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
		this.enterRule(_localctx, 72, Tads3v2Parser.RULE_gotoStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 675;
			this.match(Tads3v2Parser.GOTO);
			this.state = 677;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0)) {
				{
				this.state = 676;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 679;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 74, Tads3v2Parser.RULE_breakStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 681;
			this.match(Tads3v2Parser.BREAK);
			this.state = 683;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0)) {
				{
				this.state = 682;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 685;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 76, Tads3v2Parser.RULE_continueStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 687;
			this.match(Tads3v2Parser.CONTINUE);
			this.state = 689;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0)) {
				{
				this.state = 688;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 691;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 78, Tads3v2Parser.RULE_labelStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 693;
			this.identifierAtom();
			this.state = 694;
			this.match(Tads3v2Parser.COLON);
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
		this.enterRule(_localctx, 80, Tads3v2Parser.RULE_switchStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 696;
			this.match(Tads3v2Parser.SWITCH);
			this.state = 697;
			this.match(Tads3v2Parser.LEFT_PAREN);
			this.state = 698;
			_localctx._discriminant = this.expr();
			this.state = 699;
			this.match(Tads3v2Parser.RIGHT_PAREN);
			this.state = 700;
			this.match(Tads3v2Parser.LEFT_CURLY);
			this.state = 704;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.CASE || _la === Tads3v2Parser.DEFAULT) {
				{
				{
				this.state = 701;
				_localctx._switchCase = this.switchCase();
				_localctx._cases.push(_localctx._switchCase);
				}
				}
				this.state = 706;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 707;
			this.match(Tads3v2Parser.RIGHT_CURLY);
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
	public switchCase(): SwitchCaseContext {
		let _localctx: SwitchCaseContext = new SwitchCaseContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, Tads3v2Parser.RULE_switchCase);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 712;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.CASE:
				{
				this.state = 709;
				this.match(Tads3v2Parser.CASE);
				this.state = 710;
				_localctx._test = this.expr();
				}
				break;
			case Tads3v2Parser.DEFAULT:
				{
				this.state = 711;
				_localctx._isDefault = this.match(Tads3v2Parser.DEFAULT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 714;
			this.match(Tads3v2Parser.COLON);
			this.state = 718;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.SWITCH) | (1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.THROW) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.FOR) | (1 << Tads3v2Parser.TRY) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.IF) | (1 << Tads3v2Parser.DO) | (1 << Tads3v2Parser.WHILE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.RETURN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.FOREACH - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.BREAK - 32)) | (1 << (Tads3v2Parser.CONTINUE - 32)) | (1 << (Tads3v2Parser.GOTO - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.SEMICOLON - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				{
				this.state = 715;
				_localctx._stats = this.stats();
				_localctx._body.push(_localctx._stats);
				}
				}
				this.state = 720;
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
	public throwStatement(): ThrowStatementContext {
		let _localctx: ThrowStatementContext = new ThrowStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, Tads3v2Parser.RULE_throwStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 721;
			this.match(Tads3v2Parser.THROW);
			this.state = 722;
			this.expr();
			this.state = 723;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 86, Tads3v2Parser.RULE_forInStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 725;
			this.match(Tads3v2Parser.FOR);
			this.state = 726;
			this.match(Tads3v2Parser.LEFT_PAREN);
			this.state = 727;
			this.match(Tads3v2Parser.LOCAL);
			this.state = 728;
			this.identifierAtom();
			this.state = 729;
			this.match(Tads3v2Parser.IN);
			this.state = 730;
			_localctx._iterable = this.expr();
			this.state = 739;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.SEMICOLON) {
				{
				this.state = 731;
				this.match(Tads3v2Parser.SEMICOLON);
				this.state = 733;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 732;
					_localctx._cond = this.expr();
					}
				}

				this.state = 735;
				this.match(Tads3v2Parser.SEMICOLON);
				this.state = 737;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 736;
					this.forUpdate();
					}
				}

				}
			}

			this.state = 741;
			this.match(Tads3v2Parser.RIGHT_PAREN);
			this.state = 742;
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
		this.enterRule(_localctx, 88, Tads3v2Parser.RULE_forEachStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 744;
			this.match(Tads3v2Parser.FOREACH);
			this.state = 745;
			this.match(Tads3v2Parser.LEFT_PAREN);
			this.state = 746;
			this.expr();
			this.state = 747;
			this.match(Tads3v2Parser.IN);
			this.state = 748;
			this.expr();
			this.state = 749;
			this.match(Tads3v2Parser.RIGHT_PAREN);
			this.state = 750;
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
		this.enterRule(_localctx, 90, Tads3v2Parser.RULE_returnStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 752;
			this.match(Tads3v2Parser.RETURN);
			this.state = 754;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 753;
				this.expr();
				}
			}

			this.state = 756;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 92, Tads3v2Parser.RULE_doWhileStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 758;
			this.match(Tads3v2Parser.DO);
			this.state = 759;
			this.codeBlock();
			this.state = 760;
			this.match(Tads3v2Parser.WHILE);
			this.state = 761;
			this.match(Tads3v2Parser.LEFT_PAREN);
			this.state = 763;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 762;
				this.expr();
				}
			}

			this.state = 765;
			this.match(Tads3v2Parser.RIGHT_PAREN);
			this.state = 766;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 94, Tads3v2Parser.RULE_whileStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 768;
			this.match(Tads3v2Parser.WHILE);
			this.state = 769;
			this.match(Tads3v2Parser.LEFT_PAREN);
			this.state = 771;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 770;
				this.expr();
				}
			}

			this.state = 773;
			this.match(Tads3v2Parser.RIGHT_PAREN);
			this.state = 774;
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
		this.enterRule(_localctx, 96, Tads3v2Parser.RULE_forStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 776;
			this.match(Tads3v2Parser.FOR);
			this.state = 777;
			this.match(Tads3v2Parser.LEFT_PAREN);
			this.state = 779;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 778;
				this.forInit();
				}
			}

			this.state = 781;
			this.match(Tads3v2Parser.SEMICOLON);
			this.state = 783;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 782;
				_localctx._cond = this.expr();
				}
			}

			this.state = 785;
			this.match(Tads3v2Parser.SEMICOLON);
			this.state = 787;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 786;
				this.forUpdate();
				}
			}

			this.state = 789;
			this.match(Tads3v2Parser.RIGHT_PAREN);
			this.state = 790;
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
	public forUpdate(): ForUpdateContext {
		let _localctx: ForUpdateContext = new ForUpdateContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, Tads3v2Parser.RULE_forUpdate);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 792;
			this.expr();
			this.state = 797;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.COMMA) {
				{
				{
				this.state = 793;
				this.match(Tads3v2Parser.COMMA);
				this.state = 794;
				this.expr();
				}
				}
				this.state = 799;
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
	public forInit(): ForInitContext {
		let _localctx: ForInitContext = new ForInitContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, Tads3v2Parser.RULE_forInit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 800;
			this.forInitItem();
			this.state = 805;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.COMMA) {
				{
				{
				this.state = 801;
				this.match(Tads3v2Parser.COMMA);
				this.state = 802;
				this.forInitItem();
				}
				}
				this.state = 807;
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
	public forInitItem(): ForInitItemContext {
		let _localctx: ForInitItemContext = new ForInitItemContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, Tads3v2Parser.RULE_forInitItem);
		try {
			this.state = 811;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 103, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 808;
				this.match(Tads3v2Parser.LOCAL);
				this.state = 809;
				this.localVarDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 810;
				this.expr();
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
	public tryCatchStatement(): TryCatchStatementContext {
		let _localctx: TryCatchStatementContext = new TryCatchStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, Tads3v2Parser.RULE_tryCatchStatement);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 813;
			this.match(Tads3v2Parser.TRY);
			this.state = 814;
			this.codeBlock();
			this.state = 824;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 105, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 815;
					this.match(Tads3v2Parser.CATCH);
					this.state = 816;
					this.match(Tads3v2Parser.LEFT_PAREN);
					this.state = 818;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.SPREAD - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0) || _la === Tads3v2Parser.LEFT_BRACKET) {
						{
						this.state = 817;
						this.params();
						}
					}

					this.state = 820;
					this.match(Tads3v2Parser.RIGHT_PAREN);
					this.state = 821;
					this.codeBlock();
					}
					}
				}
				this.state = 826;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 105, this._ctx);
			}
			this.state = 829;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 106, this._ctx) ) {
			case 1:
				{
				this.state = 827;
				this.match(Tads3v2Parser.FINALLY);
				this.state = 828;
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
	public emptyStatement(): EmptyStatementContext {
		let _localctx: EmptyStatementContext = new EmptyStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, Tads3v2Parser.RULE_emptyStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 832;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
				{
				this.state = 831;
				this.expr();
				}
			}

			this.state = 834;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 108, Tads3v2Parser.RULE_sayStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 836;
			this.match(Tads3v2Parser.DSTR);
			this.state = 837;
			this.match(Tads3v2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 110, Tads3v2Parser.RULE_assignmentStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 839;
			this.match(Tads3v2Parser.LOCAL);
			this.state = 840;
			this.localVarDecl();
			this.state = 845;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.COMMA) {
				{
				{
				this.state = 841;
				this.match(Tads3v2Parser.COMMA);
				this.state = 842;
				this.localVarDecl();
				}
				}
				this.state = 847;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 848;
			this.match(Tads3v2Parser.SEMICOLON);
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
	public localVarDecl(): LocalVarDeclContext {
		let _localctx: LocalVarDeclContext = new LocalVarDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, Tads3v2Parser.RULE_localVarDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 850;
			this.identifierAtom();
			this.state = 853;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads3v2Parser.ASSIGN) {
				{
				this.state = 851;
				this.match(Tads3v2Parser.ASSIGN);
				this.state = 852;
				this.expr();
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
	public ifStatement(): IfStatementContext {
		let _localctx: IfStatementContext = new IfStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, Tads3v2Parser.RULE_ifStatement);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 855;
			this.match(Tads3v2Parser.IF);
			this.state = 856;
			_localctx._ifExprAndBlock = this.enclosedExprCodeBlock();
			this.state = 862;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 110, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 857;
					this.match(Tads3v2Parser.ELSE);
					this.state = 858;
					this.match(Tads3v2Parser.IF);
					this.state = 859;
					_localctx._elseIfExprAndBlock = this.enclosedExprCodeBlock();
					}
					}
				}
				this.state = 864;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 110, this._ctx);
			}
			this.state = 867;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 111, this._ctx) ) {
			case 1:
				{
				this.state = 865;
				this.match(Tads3v2Parser.ELSE);
				this.state = 866;
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
		this.enterRule(_localctx, 116, Tads3v2Parser.RULE_enclosedExprCodeBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 869;
			this.match(Tads3v2Parser.LEFT_PAREN);
			this.state = 870;
			_localctx._expression = this.expr();
			this.state = 871;
			this.match(Tads3v2Parser.RIGHT_PAREN);
			this.state = 872;
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
	public expr(): ExprContext {
		let _localctx: ExprContext = new ExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, Tads3v2Parser.RULE_expr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 874;
			this.assignmentExpr();
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
	public assignmentExpr(): AssignmentExprContext {
		let _localctx: AssignmentExprContext = new AssignmentExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, Tads3v2Parser.RULE_assignmentExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 876;
			this.conditionalExpr();
			this.state = 880;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 112, this._ctx) ) {
			case 1:
				{
				this.state = 877;
				this.assignmentOp();
				this.state = 878;
				this.assignmentExpr();
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
	public assignmentOp(): AssignmentOpContext {
		let _localctx: AssignmentOpContext = new AssignmentOpContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, Tads3v2Parser.RULE_assignmentOp);
		try {
			this.state = 905;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.ASSIGN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 882;
				this.match(Tads3v2Parser.ASSIGN);
				}
				break;
			case Tads3v2Parser.PLUS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 883;
				this.match(Tads3v2Parser.PLUS);
				this.state = 884;
				this.match(Tads3v2Parser.ASSIGN);
				}
				break;
			case Tads3v2Parser.MINUS:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 885;
				this.match(Tads3v2Parser.MINUS);
				this.state = 886;
				this.match(Tads3v2Parser.ASSIGN);
				}
				break;
			case Tads3v2Parser.STAR:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 887;
				this.match(Tads3v2Parser.STAR);
				this.state = 888;
				this.match(Tads3v2Parser.ASSIGN);
				}
				break;
			case Tads3v2Parser.DIV:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 889;
				this.match(Tads3v2Parser.DIV);
				this.state = 890;
				this.match(Tads3v2Parser.ASSIGN);
				}
				break;
			case Tads3v2Parser.MOD:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 891;
				this.match(Tads3v2Parser.MOD);
				this.state = 892;
				this.match(Tads3v2Parser.ASSIGN);
				}
				break;
			case Tads3v2Parser.BITWISE_OR:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 893;
				this.match(Tads3v2Parser.BITWISE_OR);
				this.state = 894;
				this.match(Tads3v2Parser.ASSIGN);
				}
				break;
			case Tads3v2Parser.AMP:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 895;
				this.match(Tads3v2Parser.AMP);
				this.state = 896;
				this.match(Tads3v2Parser.ASSIGN);
				}
				break;
			case Tads3v2Parser.POW:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 897;
				this.match(Tads3v2Parser.POW);
				this.state = 898;
				this.match(Tads3v2Parser.ASSIGN);
				}
				break;
			case Tads3v2Parser.ARITHMETIC_LEFT:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 899;
				this.match(Tads3v2Parser.ARITHMETIC_LEFT);
				this.state = 900;
				this.match(Tads3v2Parser.ASSIGN);
				}
				break;
			case Tads3v2Parser.ARITHMETIC_RIGHT:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 901;
				this.match(Tads3v2Parser.ARITHMETIC_RIGHT);
				this.state = 902;
				this.match(Tads3v2Parser.ASSIGN);
				}
				break;
			case Tads3v2Parser.LOGICAL_RIGHT_SHIFT:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 903;
				this.match(Tads3v2Parser.LOGICAL_RIGHT_SHIFT);
				this.state = 904;
				this.match(Tads3v2Parser.ASSIGN);
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
	public conditionalExpr(): ConditionalExprContext {
		let _localctx: ConditionalExprContext = new ConditionalExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, Tads3v2Parser.RULE_conditionalExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 907;
			this.ifNilExpr();
			this.state = 913;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 114, this._ctx) ) {
			case 1:
				{
				this.state = 908;
				this.match(Tads3v2Parser.OPTIONAL);
				this.state = 909;
				this.expr();
				this.state = 910;
				this.match(Tads3v2Parser.COLON);
				this.state = 911;
				this.conditionalExpr();
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
	public ifNilExpr(): IfNilExprContext {
		let _localctx: IfNilExprContext = new IfNilExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, Tads3v2Parser.RULE_ifNilExpr);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 915;
			this.logicalOrExpr();
			this.state = 920;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 115, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 916;
					this.match(Tads3v2Parser.IFNIL);
					this.state = 917;
					this.logicalOrExpr();
					}
					}
				}
				this.state = 922;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 115, this._ctx);
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
	public logicalOrExpr(): LogicalOrExprContext {
		let _localctx: LogicalOrExprContext = new LogicalOrExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, Tads3v2Parser.RULE_logicalOrExpr);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 923;
			this.logicalAndExpr();
			this.state = 928;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 116, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 924;
					this.match(Tads3v2Parser.OR);
					this.state = 925;
					this.logicalAndExpr();
					}
					}
				}
				this.state = 930;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 116, this._ctx);
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
	public logicalAndExpr(): LogicalAndExprContext {
		let _localctx: LogicalAndExprContext = new LogicalAndExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, Tads3v2Parser.RULE_logicalAndExpr);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 931;
			this.bitwiseOrExpr();
			this.state = 936;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 117, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 932;
					this.match(Tads3v2Parser.AND);
					this.state = 933;
					this.bitwiseOrExpr();
					}
					}
				}
				this.state = 938;
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
	public bitwiseOrExpr(): BitwiseOrExprContext {
		let _localctx: BitwiseOrExprContext = new BitwiseOrExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, Tads3v2Parser.RULE_bitwiseOrExpr);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 939;
			this.bitwiseXorExpr();
			this.state = 944;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 118, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 940;
					this.match(Tads3v2Parser.BITWISE_OR);
					this.state = 941;
					this.bitwiseXorExpr();
					}
					}
				}
				this.state = 946;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 118, this._ctx);
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
	public bitwiseXorExpr(): BitwiseXorExprContext {
		let _localctx: BitwiseXorExprContext = new BitwiseXorExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, Tads3v2Parser.RULE_bitwiseXorExpr);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 947;
			this.bitwiseAndExpr();
			this.state = 952;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 119, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 948;
					this.match(Tads3v2Parser.POW);
					this.state = 949;
					this.bitwiseAndExpr();
					}
					}
				}
				this.state = 954;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 119, this._ctx);
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
	public bitwiseAndExpr(): BitwiseAndExprContext {
		let _localctx: BitwiseAndExprContext = new BitwiseAndExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, Tads3v2Parser.RULE_bitwiseAndExpr);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 955;
			this.equalityExpr();
			this.state = 960;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 120, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 956;
					this.match(Tads3v2Parser.AMP);
					this.state = 957;
					this.equalityExpr();
					}
					}
				}
				this.state = 962;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 120, this._ctx);
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
	public equalityExpr(): EqualityExprContext {
		let _localctx: EqualityExprContext = new EqualityExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, Tads3v2Parser.RULE_equalityExpr);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 963;
			this.relationalExpr();
			this.state = 967;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 121, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 964;
					this.equalitySuffix();
					}
					}
				}
				this.state = 969;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 121, this._ctx);
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
	public equalitySuffix(): EqualitySuffixContext {
		let _localctx: EqualitySuffixContext = new EqualitySuffixContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, Tads3v2Parser.RULE_equalitySuffix);
		let _la: number;
		try {
			this.state = 984;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.NEQ:
			case Tads3v2Parser.EQ:
				_localctx = new EqNeqSuffixContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 970;
				_la = this._input.LA(1);
				if (!(_la === Tads3v2Parser.NEQ || _la === Tads3v2Parser.EQ)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 971;
				this.relationalExpr();
				}
				break;
			case Tads3v2Parser.IS:
				_localctx = new IsInSuffixContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 972;
				this.match(Tads3v2Parser.IS);
				this.state = 973;
				this.match(Tads3v2Parser.IN);
				this.state = 974;
				this.match(Tads3v2Parser.LEFT_PAREN);
				this.state = 975;
				this.array();
				this.state = 976;
				this.match(Tads3v2Parser.RIGHT_PAREN);
				}
				break;
			case Tads3v2Parser.LITERAL_NOT:
				_localctx = new NotInSuffixContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 978;
				this.match(Tads3v2Parser.LITERAL_NOT);
				this.state = 979;
				this.match(Tads3v2Parser.IN);
				this.state = 980;
				this.match(Tads3v2Parser.LEFT_PAREN);
				this.state = 981;
				this.array();
				this.state = 982;
				this.match(Tads3v2Parser.RIGHT_PAREN);
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
	public relationalExpr(): RelationalExprContext {
		let _localctx: RelationalExprContext = new RelationalExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, Tads3v2Parser.RULE_relationalExpr);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 986;
			this.shiftExpr();
			this.state = 992;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 123, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 987;
					this.relationalOp();
					this.state = 988;
					this.shiftExpr();
					}
					}
				}
				this.state = 994;
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
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relationalOp(): RelationalOpContext {
		let _localctx: RelationalOpContext = new RelationalOpContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, Tads3v2Parser.RULE_relationalOp);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 995;
			_la = this._input.LA(1);
			if (!(((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & ((1 << (Tads3v2Parser.LTEQ - 86)) | (1 << (Tads3v2Parser.LT - 86)) | (1 << (Tads3v2Parser.GTEQ - 86)) | (1 << (Tads3v2Parser.GT - 86)))) !== 0))) {
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
	public shiftExpr(): ShiftExprContext {
		let _localctx: ShiftExprContext = new ShiftExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, Tads3v2Parser.RULE_shiftExpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 997;
			this.additiveExpr();
			this.state = 1002;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 124, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 998;
					_la = this._input.LA(1);
					if (!(((((_la - 87)) & ~0x1F) === 0 && ((1 << (_la - 87)) & ((1 << (Tads3v2Parser.ARITHMETIC_LEFT - 87)) | (1 << (Tads3v2Parser.ARITHMETIC_RIGHT - 87)) | (1 << (Tads3v2Parser.LOGICAL_RIGHT_SHIFT - 87)))) !== 0))) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 999;
					this.additiveExpr();
					}
					}
				}
				this.state = 1004;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 124, this._ctx);
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
	public additiveExpr(): AdditiveExprContext {
		let _localctx: AdditiveExprContext = new AdditiveExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, Tads3v2Parser.RULE_additiveExpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1005;
			this.multiplicativeExpr();
			this.state = 1010;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 125, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1006;
					_la = this._input.LA(1);
					if (!(_la === Tads3v2Parser.PLUS || _la === Tads3v2Parser.MINUS)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 1007;
					this.multiplicativeExpr();
					}
					}
				}
				this.state = 1012;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 125, this._ctx);
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
	public multiplicativeExpr(): MultiplicativeExprContext {
		let _localctx: MultiplicativeExprContext = new MultiplicativeExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, Tads3v2Parser.RULE_multiplicativeExpr);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1013;
			this.unaryExpr();
			this.state = 1018;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 126, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1014;
					_la = this._input.LA(1);
					if (!(((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & ((1 << (Tads3v2Parser.DIV - 56)) | (1 << (Tads3v2Parser.MOD - 56)) | (1 << (Tads3v2Parser.STAR - 56)))) !== 0))) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 1015;
					this.unaryExpr();
					}
					}
				}
				this.state = 1020;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 126, this._ctx);
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
	public unaryExpr(): UnaryExprContext {
		let _localctx: UnaryExprContext = new UnaryExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, Tads3v2Parser.RULE_unaryExpr);
		try {
			this.state = 1037;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 127, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1021;
				this.prefixOp();
				this.state = 1022;
				this.unaryExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1024;
				this.match(Tads3v2Parser.NEW);
				this.state = 1025;
				this.unaryExpr();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1026;
				this.match(Tads3v2Parser.DELEGATED);
				this.state = 1027;
				this.unaryExpr();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1028;
				this.match(Tads3v2Parser.INHERITED);
				this.state = 1029;
				this.unaryExpr();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1030;
				this.match(Tads3v2Parser.TRANSIENT);
				this.state = 1031;
				this.unaryExpr();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1032;
				this.match(Tads3v2Parser.LOCAL);
				this.state = 1033;
				this.unaryExpr();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1034;
				this.match(Tads3v2Parser.STATIC);
				this.state = 1035;
				this.unaryExpr();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1036;
				this.postfixExpr();
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
	public prefixOp(): PrefixOpContext {
		let _localctx: PrefixOpContext = new PrefixOpContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, Tads3v2Parser.RULE_prefixOp);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1039;
			_la = this._input.LA(1);
			if (!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & ((1 << (Tads3v2Parser.LITERAL_NOT - 41)) | (1 << (Tads3v2Parser.AT - 41)) | (1 << (Tads3v2Parser.AMP - 41)) | (1 << (Tads3v2Parser.NOT - 41)) | (1 << (Tads3v2Parser.PLUS - 41)) | (1 << (Tads3v2Parser.MINUS - 41)) | (1 << (Tads3v2Parser.TILDE - 41)))) !== 0) || _la === Tads3v2Parser.STAR)) {
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
	public postfixExpr(): PostfixExprContext {
		let _localctx: PostfixExprContext = new PostfixExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, Tads3v2Parser.RULE_postfixExpr);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1041;
			this.primaryExpr();
			this.state = 1045;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 128, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1042;
					this.postfixSuffix();
					}
					}
				}
				this.state = 1047;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 128, this._ctx);
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
	public postfixSuffix(): PostfixSuffixContext {
		let _localctx: PostfixSuffixContext = new PostfixSuffixContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, Tads3v2Parser.RULE_postfixSuffix);
		let _la: number;
		try {
			this.state = 1086;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 134, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1048;
				this.match(Tads3v2Parser.DOT);
				this.state = 1049;
				this.memberExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1050;
				this.match(Tads3v2Parser.LEFT_BRACKET);
				this.state = 1052;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 1051;
					this.expr();
					}
				}

				this.state = 1054;
				this.match(Tads3v2Parser.RIGHT_BRACKET);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1055;
				this.match(Tads3v2Parser.LEFT_PAREN);
				this.state = 1057;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 1056;
					this.array();
					}
				}

				this.state = 1059;
				this.match(Tads3v2Parser.RIGHT_PAREN);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1060;
				this.match(Tads3v2Parser.PLUS);
				this.state = 1061;
				this.match(Tads3v2Parser.PLUS);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1062;
				this.match(Tads3v2Parser.MINUS);
				this.state = 1063;
				this.match(Tads3v2Parser.MINUS);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1064;
				this.match(Tads3v2Parser.ARROW);
				this.state = 1065;
				this.expr();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1066;
				this.match(Tads3v2Parser.RANGE);
				this.state = 1067;
				this.expr();
				this.state = 1070;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 131, this._ctx) ) {
				case 1:
					{
					this.state = 1068;
					this.match(Tads3v2Parser.STEP);
					this.state = 1069;
					this.expr();
					}
					break;
				}
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1072;
				this.match(Tads3v2Parser.LEFT_CURLY);
				this.state = 1074;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.SPREAD - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0) || _la === Tads3v2Parser.LEFT_BRACKET) {
					{
					this.state = 1073;
					this.params();
					}
				}

				this.state = 1076;
				this.match(Tads3v2Parser.COLON);
				this.state = 1078;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 1077;
					this.expr();
					}
				}

				this.state = 1080;
				this.match(Tads3v2Parser.RIGHT_CURLY);
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1081;
				this.match(Tads3v2Parser.COLON);
				this.state = 1082;
				this.superTypes();
				this.state = 1083;
				this.curlyObjectBody();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 1085;
				this.curlyObjectBody();
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
	public primaryExpr(): PrimaryExprContext {
		let _localctx: PrimaryExprContext = new PrimaryExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, Tads3v2Parser.RULE_primaryExpr);
		let _la: number;
		try {
			this.state = 1116;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 139, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1088;
				this.match(Tads3v2Parser.LEFT_PAREN);
				this.state = 1090;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 1089;
					this.array();
					}
				}

				this.state = 1092;
				this.match(Tads3v2Parser.RIGHT_PAREN);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1093;
				this.match(Tads3v2Parser.LEFT_BRACKET);
				this.state = 1095;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 1094;
					this.array();
					}
				}

				this.state = 1097;
				this.match(Tads3v2Parser.RIGHT_BRACKET);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1098;
				this.match(Tads3v2Parser.LEFT_CURLY);
				this.state = 1100;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & ((1 << (Tads3v2Parser.STRING - 35)) | (1 << (Tads3v2Parser.IN - 35)) | (1 << (Tads3v2Parser.SPREAD - 35)) | (1 << (Tads3v2Parser.ID - 35)))) !== 0) || _la === Tads3v2Parser.LEFT_BRACKET) {
					{
					this.state = 1099;
					this.params();
					}
				}

				this.state = 1102;
				this.match(Tads3v2Parser.COLON);
				this.state = 1104;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads3v2Parser.FUNCTION) | (1 << Tads3v2Parser.NEW) | (1 << Tads3v2Parser.TRANSIENT) | (1 << Tads3v2Parser.MODIFY) | (1 << Tads3v2Parser.REPLACE) | (1 << Tads3v2Parser.LOCAL) | (1 << Tads3v2Parser.TRUE) | (1 << Tads3v2Parser.NIL) | (1 << Tads3v2Parser.INHERITED) | (1 << Tads3v2Parser.DELEGATED))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (Tads3v2Parser.EXTERN - 32)) | (1 << (Tads3v2Parser.STATIC - 32)) | (1 << (Tads3v2Parser.STRING - 32)) | (1 << (Tads3v2Parser.IN - 32)) | (1 << (Tads3v2Parser.LITERAL_NOT - 32)) | (1 << (Tads3v2Parser.OPERATOR - 32)) | (1 << (Tads3v2Parser.AT - 32)) | (1 << (Tads3v2Parser.AMP - 32)) | (1 << (Tads3v2Parser.NOT - 32)) | (1 << (Tads3v2Parser.PLUS - 32)) | (1 << (Tads3v2Parser.MINUS - 32)) | (1 << (Tads3v2Parser.ARROW - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (Tads3v2Parser.TILDE - 64)) | (1 << (Tads3v2Parser.ID - 64)) | (1 << (Tads3v2Parser.NR - 64)) | (1 << (Tads3v2Parser.HEX - 64)) | (1 << (Tads3v2Parser.DOT - 64)) | (1 << (Tads3v2Parser.STAR - 64)) | (1 << (Tads3v2Parser.LEFT_PAREN - 64)) | (1 << (Tads3v2Parser.LEFT_BRACKET - 64)) | (1 << (Tads3v2Parser.DSTR - 64)) | (1 << (Tads3v2Parser.SSTR - 64)) | (1 << (Tads3v2Parser.RSTR - 64)) | (1 << (Tads3v2Parser.LEFT_CURLY - 64)))) !== 0)) {
					{
					this.state = 1103;
					this.expr();
					}
				}

				this.state = 1106;
				this.match(Tads3v2Parser.RIGHT_CURLY);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1107;
				this.match(Tads3v2Parser.ARROW);
				this.state = 1108;
				this.expr();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1109;
				this.match(Tads3v2Parser.STAR);
				this.state = 1110;
				this.match(Tads3v2Parser.ARROW);
				this.state = 1111;
				this.expr();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1112;
				this.match(Tads3v2Parser.DOT);
				this.state = 1113;
				this.identifierAtom();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1114;
				this.functionDeclaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1115;
				this.primary();
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
	public primary(): PrimaryContext {
		let _localctx: PrimaryContext = new PrimaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, Tads3v2Parser.RULE_primary);
		try {
			this.state = 1129;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.INHERITED:
				_localctx = new InheritedAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1118;
				this.match(Tads3v2Parser.INHERITED);
				}
				break;
			case Tads3v2Parser.HEX:
				_localctx = new HexAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1119;
				this.match(Tads3v2Parser.HEX);
				}
				break;
			case Tads3v2Parser.NR:
				_localctx = new NumberAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1120;
				this.match(Tads3v2Parser.NR);
				}
				break;
			case Tads3v2Parser.AMP:
				_localctx = new ReferenceAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1121;
				this.match(Tads3v2Parser.AMP);
				this.state = 1122;
				this.identifierAtom();
				}
				break;
			case Tads3v2Parser.STRING:
			case Tads3v2Parser.IN:
			case Tads3v2Parser.ID:
				_localctx = new IdAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1123;
				this.identifierAtom();
				}
				break;
			case Tads3v2Parser.SSTR:
				_localctx = new SingleQuoteStringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1124;
				this.match(Tads3v2Parser.SSTR);
				}
				break;
			case Tads3v2Parser.DSTR:
				_localctx = new DoubleQuoteStringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1125;
				this.match(Tads3v2Parser.DSTR);
				}
				break;
			case Tads3v2Parser.RSTR:
				_localctx = new RegexpStringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1126;
				this.match(Tads3v2Parser.RSTR);
				}
				break;
			case Tads3v2Parser.TRUE:
				_localctx = new BooleanAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1127;
				this.match(Tads3v2Parser.TRUE);
				}
				break;
			case Tads3v2Parser.NIL:
				_localctx = new NilAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 1128;
				this.match(Tads3v2Parser.NIL);
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
	public memberExpr(): MemberExprContext {
		let _localctx: MemberExprContext = new MemberExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, Tads3v2Parser.RULE_memberExpr);
		try {
			this.state = 1136;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.STRING:
			case Tads3v2Parser.IN:
			case Tads3v2Parser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1131;
				this.identifierAtom();
				}
				break;
			case Tads3v2Parser.LEFT_PAREN:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1132;
				this.match(Tads3v2Parser.LEFT_PAREN);
				this.state = 1133;
				this.expr();
				this.state = 1134;
				this.match(Tads3v2Parser.RIGHT_PAREN);
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
		this.enterRule(_localctx, 166, Tads3v2Parser.RULE_identifierAtom);
		try {
			this.state = 1140;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads3v2Parser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1138;
				this.match(Tads3v2Parser.ID);
				}
				break;
			case Tads3v2Parser.STRING:
			case Tads3v2Parser.IN:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1139;
				this.softKeyword();
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
	public softKeyword(): SoftKeywordContext {
		let _localctx: SoftKeywordContext = new SoftKeywordContext(this._ctx, this.state);
		this.enterRule(_localctx, 168, Tads3v2Parser.RULE_softKeyword);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1142;
			_la = this._input.LA(1);
			if (!(_la === Tads3v2Parser.STRING || _la === Tads3v2Parser.IN)) {
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
		this.enterRule(_localctx, 170, Tads3v2Parser.RULE_params);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1144;
			this.param();
			this.state = 1149;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads3v2Parser.COMMA) {
				{
				{
				this.state = 1145;
				this.match(Tads3v2Parser.COMMA);
				this.state = 1146;
				this.param();
				}
				}
				this.state = 1151;
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
	public param(): ParamContext {
		let _localctx: ParamContext = new ParamContext(this._ctx, this.state);
		this.enterRule(_localctx, 172, Tads3v2Parser.RULE_param);
		let _la: number;
		try {
			this.state = 1195;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 148, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1152;
				this.match(Tads3v2Parser.SPREAD);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1153;
				this.match(Tads3v2Parser.LEFT_BRACKET);
				this.state = 1154;
				_localctx._name = this.identifierAtom();
				this.state = 1155;
				this.match(Tads3v2Parser.RIGHT_BRACKET);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1157;
				_localctx._name = this.identifierAtom();
				this.state = 1158;
				this.match(Tads3v2Parser.COLON);
				this.state = 1159;
				this.match(Tads3v2Parser.ASSIGN);
				this.state = 1160;
				_localctx._defaultValue = this.expr();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1162;
				_localctx._name = this.identifierAtom();
				this.state = 1163;
				this.match(Tads3v2Parser.ASSIGN);
				this.state = 1164;
				_localctx._defaultValue = this.expr();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1166;
				_localctx._label = this.identifierAtom();
				this.state = 1167;
				this.match(Tads3v2Parser.COLON);
				this.state = 1168;
				this.match(Tads3v2Parser.OPTIONAL);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1170;
				_localctx._label = this.identifierAtom();
				this.state = 1171;
				this.match(Tads3v2Parser.COLON);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1173;
				_localctx._label = this.identifierAtom();
				this.state = 1174;
				this.match(Tads3v2Parser.COLON);
				this.state = 1175;
				_localctx._type = this.identifierAtom();
				this.state = 1176;
				_localctx._name = this.identifierAtom();
				this.state = 1178;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.OPTIONAL) {
					{
					this.state = 1177;
					_localctx._optional = this.match(Tads3v2Parser.OPTIONAL);
					}
				}

				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1180;
				_localctx._label = this.identifierAtom();
				this.state = 1181;
				this.match(Tads3v2Parser.COLON);
				this.state = 1182;
				_localctx._name = this.identifierAtom();
				this.state = 1184;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.OPTIONAL) {
					{
					this.state = 1183;
					_localctx._optional = this.match(Tads3v2Parser.OPTIONAL);
					}
				}

				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1186;
				_localctx._type = this.identifierAtom();
				this.state = 1187;
				_localctx._name = this.identifierAtom();
				this.state = 1189;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.OPTIONAL) {
					{
					this.state = 1188;
					_localctx._optional = this.match(Tads3v2Parser.OPTIONAL);
					}
				}

				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 1191;
				_localctx._name = this.identifierAtom();
				this.state = 1193;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads3v2Parser.OPTIONAL) {
					{
					this.state = 1192;
					_localctx._optional = this.match(Tads3v2Parser.OPTIONAL);
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

	private static readonly _serializedATNSegments: number = 3;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03b\u04B0\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04" +
		"X\tX\x03\x02\x07\x02\xB2\n\x02\f\x02\x0E\x02\xB5\v\x02\x03\x02\x03\x02" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x05\x03\xC4\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x07\x05\xD0\n\x05\f\x05\x0E" +
		"\x05\xD3\v\x05\x03\x06\x05\x06\xD6\n\x06\x03\x06\x07\x06\xD9\n\x06\f\x06" +
		"\x0E\x06\xDC\v\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b" +
		"\x03\b\x06\b\xE6\n\b\r\b\x0E\b\xE7\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b" +
		"\x05\b\xF0\n\b\x03\b\x03\b\x07\b\xF4\n\b\f\b\x0E\b\xF7\v\b\x03\t\x03\t" +
		"\x03\t\x06\t\xFC\n\t\r\t\x0E\t\xFD\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t" +
		"\x03\t\x03\t\x03\t\x07\t\u0109\n\t\f\t\x0E\t\u010C\v\t\x03\t\x03\t\x03" +
		"\t\x03\t\x05\t\u0112\n\t\x03\n\x03\n\x05\n\u0116\n\n\x03\n\x03\n\x03\n" +
		"\x07\n\u011B\n\n\f\n\x0E\n\u011E\v\n\x03\n\x03\n\x03\v\x07\v\u0123\n\v" +
		"\f\v\x0E\v\u0126\v\v\x03\v\x03\v\x03\v\x03\v\x07\v\u012C\n\v\f\v\x0E\v" +
		"\u012F\v\v\x03\v\x03\v\x03\f\x07\f\u0134\n\f\f\f\x0E\f\u0137\v\f\x03\f" +
		"\x03\f\x05\f\u013B\n\f\x03\f\x03\f\x03\f\x07\f\u0140\n\f\f\f\x0E\f\u0143" +
		"\v\f\x03\f\x03\f\x03\r\x03\r\x03\r\x05\r\u014A\n\r\x03\r\x03\r\x03\x0E" +
		"\x03\x0E\x05\x0E\u0150\n\x0E\x03\x0E\x05\x0E\u0153\n\x0E\x03\x0E\x05\x0E" +
		"\u0156\n\x0E\x03\x0E\x03\x0E\x05\x0E\u015A\n\x0E\x03\x0E\x03\x0E\x07\x0E" +
		"\u015E\n\x0E\f\x0E\x0E\x0E\u0161\v\x0E\x03\x0E\x03\x0E\x03\x0F\x05\x0F" +
		"\u0166\n\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\u016B\n\x0F\x03\x0F\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\u0175\n\x10\x03" +
		"\x10\x05\x10\u0178\n\x10\x03\x10\x05\x10\u017B\n\x10\x03\x10\x07\x10\u017E" +
		"\n\x10\f\x10\x0E\x10\u0181\v\x10\x03\x10\x05\x10\u0184\n\x10\x03\x10\x03" +
		"\x10\x03\x10\x05\x10\u0189\n\x10\x03\x10\x05\x10\u018C\n\x10\x03\x10\x03" +
		"\x10\x05\x10\u0190\n\x10\x05\x10\u0192\n\x10\x03\x11\x03\x11\x05\x11\u0196" +
		"\n\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\u019E\n" +
		"\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\u01A6\n\x11" +
		"\x05\x11\u01A8\n\x11\x03\x12\x03\x12\x05\x12\u01AC\n\x12\x03\x12\x05\x12" +
		"\u01AF\n\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x05\x13\u01BB\n\x13\x03\x14\x03\x14\x03\x14\x03\x14" +
		"\x05\x14\u01C1\n\x14\x03\x14\x03\x14\x03\x14\x03\x14\x05\x14\u01C7\n\x14" +
		"\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x07\x16\u01CE\n\x16\f\x16\x0E" +
		"\x16\u01D1\v\x16\x03\x17\x03\x17\x03\x17\x03\x17\x05\x17\u01D7\n\x17\x03" +
		"\x17\x03\x17\x05\x17\u01DB\n\x17\x05\x17\u01DD\n\x17\x03\x18\x07\x18\u01E0" +
		"\n\x18\f\x18\x0E\x18\u01E3\v\x18\x03\x18\x03\x18\x03\x18\x05\x18\u01E8" +
		"\n\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A" +
		"\x07\x1A\u01F2\n\x1A\f\x1A\x0E\x1A\u01F5\v\x1A\x03\x1B\x07\x1B\u01F8\n" +
		"\x1B\f\x1B\x0E\x1B\u01FB\v\x1B\x03\x1B\x03\x1B\x03\x1B\x07\x1B\u0200\n" +
		"\x1B\f\x1B\x0E\x1B\u0203\v\x1B\x03\x1C\x03\x1C\x03\x1C\x05\x1C\u0208\n" +
		"\x1C\x03\x1C\x03\x1C\x05\x1C\u020C\n\x1C\x03\x1C\x05\x1C\u020F\n\x1C\x03" +
		"\x1C\x03\x1C\x05\x1C\u0213\n\x1C\x03\x1C\x03\x1C\x07\x1C\u0217\n\x1C\f" +
		"\x1C\x0E\x1C\u021A\v\x1C\x03\x1C\x03\x1C\x05\x1C\u021E\n\x1C\x05\x1C\u0220" +
		"\n\x1C\x03\x1D\x07\x1D\u0223\n\x1D\f\x1D\x0E\x1D\u0226\v\x1D\x03\x1E\x03" +
		"\x1E\x03\x1E\x03\x1E\x05\x1E\u022C\n\x1E\x03\x1E\x05\x1E\u022F\n\x1E\x03" +
		"\x1E\x03\x1E\x03\x1F\x03\x1F\x05\x1F\u0235\n\x1F\x03\x1F\x03\x1F\x03\x1F" +
		"\x05\x1F\u023A\n\x1F\x07\x1F\u023C\n\x1F\f\x1F\x0E\x1F\u023F\v\x1F\x03" +
		" \x03 \x05 \u0243\n \x03 \x03 \x03 \x03 \x05 \u0249\n \x03!\x03!\x03!" +
		"\x03!\x03!\x05!\u0250\n!\x03!\x05!\u0253\n!\x03!\x03!\x05!\u0257\n!\x03" +
		"!\x03!\x03!\x07!\u025C\n!\f!\x0E!\u025F\v!\x03!\x03!\x03\"\x05\"\u0264" +
		"\n\"\x03\"\x05\"\u0267\n\"\x03\"\x05\"\u026A\n\"\x03\"\x03\"\x03\"\x05" +
		"\"\u026F\n\"\x03\"\x05\"\u0272\n\"\x03\"\x03\"\x03\"\x05\"\u0277\n\"\x03" +
		"\"\x05\"\u027A\n\"\x05\"\u027C\n\"\x03#\x03#\x07#\u0280\n#\f#\x0E#\u0283" +
		"\v#\x03#\x03#\x05#\u0287\n#\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03" +
		"$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x05$\u029B\n$\x03%\x03" +
		"%\x07%\u029F\n%\f%\x0E%\u02A2\v%\x03%\x03%\x03&\x03&\x05&\u02A8\n&\x03" +
		"&\x03&\x03\'\x03\'\x05\'\u02AE\n\'\x03\'\x03\'\x03(\x03(\x05(\u02B4\n" +
		"(\x03(\x03(\x03)\x03)\x03)\x03*\x03*\x03*\x03*\x03*\x03*\x07*\u02C1\n" +
		"*\f*\x0E*\u02C4\v*\x03*\x03*\x03+\x03+\x03+\x05+\u02CB\n+\x03+\x03+\x07" +
		"+\u02CF\n+\f+\x0E+\u02D2\v+\x03,\x03,\x03,\x03,\x03-\x03-\x03-\x03-\x03" +
		"-\x03-\x03-\x03-\x05-\u02E0\n-\x03-\x03-\x05-\u02E4\n-\x05-\u02E6\n-\x03" +
		"-\x03-\x03-\x03.\x03.\x03.\x03.\x03.\x03.\x03.\x03.\x03/\x03/\x05/\u02F5" +
		"\n/\x03/\x03/\x030\x030\x030\x030\x030\x050\u02FE\n0\x030\x030\x030\x03" +
		"1\x031\x031\x051\u0306\n1\x031\x031\x031\x032\x032\x032\x052\u030E\n2" +
		"\x032\x032\x052\u0312\n2\x032\x032\x052\u0316\n2\x032\x032\x032\x033\x03" +
		"3\x033\x073\u031E\n3\f3\x0E3\u0321\v3\x034\x034\x034\x074\u0326\n4\f4" +
		"\x0E4\u0329\v4\x035\x035\x035\x055\u032E\n5\x036\x036\x036\x036\x036\x05" +
		"6\u0335\n6\x036\x036\x076\u0339\n6\f6\x0E6\u033C\v6\x036\x036\x056\u0340" +
		"\n6\x037\x057\u0343\n7\x037\x037\x038\x038\x038\x039\x039\x039\x039\x07" +
		"9\u034E\n9\f9\x0E9\u0351\v9\x039\x039\x03:\x03:\x03:\x05:\u0358\n:\x03" +
		";\x03;\x03;\x03;\x03;\x07;\u035F\n;\f;\x0E;\u0362\v;\x03;\x03;\x05;\u0366" +
		"\n;\x03<\x03<\x03<\x03<\x03<\x03=\x03=\x03>\x03>\x03>\x03>\x05>\u0373" +
		"\n>\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03" +
		"?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x05?\u038C\n?\x03@\x03" +
		"@\x03@\x03@\x03@\x03@\x05@\u0394\n@\x03A\x03A\x03A\x07A\u0399\nA\fA\x0E" +
		"A\u039C\vA\x03B\x03B\x03B\x07B\u03A1\nB\fB\x0EB\u03A4\vB\x03C\x03C\x03" +
		"C\x07C\u03A9\nC\fC\x0EC\u03AC\vC\x03D\x03D\x03D\x07D\u03B1\nD\fD\x0ED" +
		"\u03B4\vD\x03E\x03E\x03E\x07E\u03B9\nE\fE\x0EE\u03BC\vE\x03F\x03F\x03" +
		"F\x07F\u03C1\nF\fF\x0EF\u03C4\vF\x03G\x03G\x07G\u03C8\nG\fG\x0EG\u03CB" +
		"\vG\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03" +
		"H\x05H\u03DB\nH\x03I\x03I\x03I\x03I\x07I\u03E1\nI\fI\x0EI\u03E4\vI\x03" +
		"J\x03J\x03K\x03K\x03K\x07K\u03EB\nK\fK\x0EK\u03EE\vK\x03L\x03L\x03L\x07" +
		"L\u03F3\nL\fL\x0EL\u03F6\vL\x03M\x03M\x03M\x07M\u03FB\nM\fM\x0EM\u03FE" +
		"\vM\x03N\x03N\x03N\x03N\x03N\x03N\x03N\x03N\x03N\x03N\x03N\x03N\x03N\x03" +
		"N\x03N\x03N\x05N\u0410\nN\x03O\x03O\x03P\x03P\x07P\u0416\nP\fP\x0EP\u0419" +
		"\vP\x03Q\x03Q\x03Q\x03Q\x05Q\u041F\nQ\x03Q\x03Q\x03Q\x05Q\u0424\nQ\x03" +
		"Q\x03Q\x03Q\x03Q\x03Q\x03Q\x03Q\x03Q\x03Q\x03Q\x03Q\x05Q\u0431\nQ\x03" +
		"Q\x03Q\x05Q\u0435\nQ\x03Q\x03Q\x05Q\u0439\nQ\x03Q\x03Q\x03Q\x03Q\x03Q" +
		"\x03Q\x05Q\u0441\nQ\x03R\x03R\x05R\u0445\nR\x03R\x03R\x03R\x05R\u044A" +
		"\nR\x03R\x03R\x03R\x05R\u044F\nR\x03R\x03R\x05R\u0453\nR\x03R\x03R\x03" +
		"R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x05R\u045F\nR\x03S\x03S\x03S\x03" +
		"S\x03S\x03S\x03S\x03S\x03S\x03S\x03S\x05S\u046C\nS\x03T\x03T\x03T\x03" +
		"T\x03T\x05T\u0473\nT\x03U\x03U\x05U\u0477\nU\x03V\x03V\x03W\x03W\x03W" +
		"\x07W\u047E\nW\fW\x0EW\u0481\vW\x03X\x03X\x03X\x03X\x03X\x03X\x03X\x03" +
		"X\x03X\x03X\x03X\x03X\x03X\x03X\x03X\x03X\x03X\x03X\x03X\x03X\x03X\x03" +
		"X\x03X\x03X\x03X\x03X\x05X\u049D\nX\x03X\x03X\x03X\x03X\x05X\u04A3\nX" +
		"\x03X\x03X\x03X\x05X\u04A8\nX\x03X\x03X\x05X\u04AC\nX\x05X\u04AE\nX\x03" +
		"X\x02\x02\x03\x0EY\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10" +
		"\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02" +
		"$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02" +
		"@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02" +
		"\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02" +
		"x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84\x02\x86\x02\x88\x02\x8A\x02\x8C" +
		"\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96\x02\x98\x02\x9A\x02\x9C\x02\x9E" +
		"\x02\xA0\x02\xA2\x02\xA4\x02\xA6\x02\xA8\x02\xAA\x02\xAC\x02\xAE\x02\x02" +
		"\f\x03\x02ST\b\x0234669<ABJJLL\b\x02449<BCLMYY]^\x03\x02=>\x04\x02XXZ" +
		"\\\x04\x02YY]^\x04\x0299<<\x04\x02:;LL\t\x02++346699<<BBLL\x04\x02%%\'" +
		"\'\x02\u0542\x02\xB3\x03\x02\x02\x02\x04\xC3\x03\x02\x02\x02\x06\xC5\x03" +
		"\x02\x02\x02\b\xCC\x03\x02\x02\x02\n\xD5\x03\x02\x02\x02\f\xDD\x03\x02" +
		"\x02\x02\x0E\xEF\x03\x02\x02\x02\x10\u0111\x03\x02\x02\x02\x12\u0113\x03" +
		"\x02\x02\x02\x14\u0124\x03\x02\x02\x02\x16\u0135\x03\x02\x02\x02\x18\u0146" +
		"\x03\x02\x02\x02\x1A\u014D\x03\x02\x02\x02\x1C\u0165\x03\x02\x02\x02\x1E" +
		"\u0191\x03\x02\x02\x02 \u0195\x03\x02\x02\x02\"\u01A9\x03\x02\x02\x02" +
		"$\u01BA\x03\x02\x02\x02&\u01C6\x03\x02\x02\x02(\u01C8\x03\x02\x02\x02" +
		"*\u01CA\x03\x02\x02\x02,\u01DC\x03\x02\x02\x02.\u01E1\x03\x02\x02\x02" +
		"0\u01EB\x03\x02\x02\x022\u01EE\x03\x02\x02\x024\u01F9\x03\x02\x02\x02" +
		"6\u0204\x03\x02\x02\x028\u0224\x03\x02\x02\x02:\u0227\x03\x02\x02\x02" +
		"<\u0234\x03\x02\x02\x02>\u0248\x03\x02\x02\x02@\u024A\x03\x02\x02\x02" +
		"B\u027B\x03\x02\x02\x02D\u0286\x03\x02\x02\x02F\u029A\x03\x02\x02\x02" +
		"H\u029C\x03\x02\x02\x02J\u02A5\x03\x02\x02\x02L\u02AB\x03\x02\x02\x02" +
		"N\u02B1\x03\x02\x02\x02P\u02B7\x03\x02\x02\x02R\u02BA\x03\x02\x02\x02" +
		"T\u02CA\x03\x02\x02\x02V\u02D3\x03\x02\x02\x02X\u02D7\x03\x02\x02\x02" +
		"Z\u02EA\x03\x02\x02\x02\\\u02F2\x03\x02\x02\x02^\u02F8\x03\x02\x02\x02" +
		"`\u0302\x03\x02\x02\x02b\u030A\x03\x02\x02\x02d\u031A\x03\x02\x02\x02" +
		"f\u0322\x03\x02\x02\x02h\u032D\x03\x02\x02\x02j\u032F\x03\x02\x02\x02" +
		"l\u0342\x03\x02\x02\x02n\u0346\x03\x02\x02\x02p\u0349\x03\x02\x02\x02" +
		"r\u0354\x03\x02\x02\x02t\u0359\x03\x02\x02\x02v\u0367\x03\x02\x02\x02" +
		"x\u036C\x03\x02\x02\x02z\u036E\x03\x02\x02\x02|\u038B\x03\x02\x02\x02" +
		"~\u038D\x03\x02\x02\x02\x80\u0395\x03\x02\x02\x02\x82\u039D\x03\x02\x02" +
		"\x02\x84\u03A5\x03\x02\x02\x02\x86\u03AD\x03\x02\x02\x02\x88\u03B5\x03" +
		"\x02\x02\x02\x8A\u03BD\x03\x02\x02\x02\x8C\u03C5\x03\x02\x02\x02\x8E\u03DA" +
		"\x03\x02\x02\x02\x90\u03DC\x03\x02\x02\x02\x92\u03E5\x03\x02\x02\x02\x94" +
		"\u03E7\x03\x02\x02\x02\x96\u03EF\x03\x02\x02\x02\x98\u03F7\x03\x02\x02" +
		"\x02\x9A\u040F\x03\x02\x02\x02\x9C\u0411\x03\x02\x02\x02\x9E\u0413\x03" +
		"\x02\x02\x02\xA0\u0440\x03\x02\x02\x02\xA2\u045E\x03\x02\x02\x02\xA4\u046B" +
		"\x03\x02\x02\x02\xA6\u0472\x03\x02\x02\x02\xA8\u0476\x03\x02\x02\x02\xAA" +
		"\u0478\x03\x02\x02\x02\xAC\u047A\x03\x02\x02\x02\xAE\u04AD\x03\x02\x02" +
		"\x02\xB0\xB2\x05\x04\x03\x02\xB1\xB0\x03\x02\x02\x02\xB2\xB5\x03\x02\x02" +
		"\x02\xB3\xB1\x03\x02\x02\x02\xB3\xB4\x03\x02\x02\x02\xB4\xB6\x03\x02\x02" +
		"\x02\xB5\xB3\x03\x02\x02\x02\xB6\xB7\x07\x02\x02\x03\xB7\x03\x03\x02\x02" +
		"\x02\xB8\xC4\x05\x12\n\x02\xB9\xC4\x05\x10\t\x02\xBA\xC4\x05\x1A\x0E\x02" +
		"\xBB\xC4\x05\x18\r\x02\xBC\xC4\x05\x1E\x10\x02\xBD\xC4\x05\x14\v\x02\xBE" +
		"\xC4\x05\x16\f\x02\xBF\xC4\x05> \x02\xC0\xC4\x05 \x11\x02\xC1\xC4\x05" +
		"\x06\x04\x02\xC2\xC4\x07N\x02\x02\xC3\xB8\x03\x02\x02\x02\xC3\xB9\x03" +
		"\x02\x02\x02\xC3\xBA\x03\x02\x02\x02\xC3\xBB\x03\x02\x02\x02\xC3\xBC\x03" +
		"\x02\x02\x02\xC3\xBD\x03\x02\x02\x02\xC3\xBE\x03\x02\x02\x02\xC3\xBF\x03" +
		"\x02\x02\x02\xC3\xC0\x03\x02\x02\x02\xC3\xC1\x03\x02\x02\x02\xC3\xC2\x03" +
		"\x02\x02\x02\xC4\x05\x03\x02\x02\x02\xC5\xC6\x075\x02\x02\xC6\xC7\x07" +
		"1\x02\x02\xC7\xC8\x07D\x02\x02\xC8\xC9\x07O\x02\x02\xC9\xCA\x05x=\x02" +
		"\xCA\xCB\x07P\x02\x02\xCB\x07\x03\x02\x02\x02\xCC\xD1\x05\n\x06\x02\xCD" +
		"\xCE\x07M\x02\x02\xCE\xD0\x05\n\x06\x02\xCF\xCD\x03\x02\x02\x02\xD0\xD3" +
		"\x03\x02\x02\x02\xD1\xCF\x03\x02\x02\x02\xD1\xD2\x03\x02\x02\x02\xD2\t" +
		"\x03\x02\x02\x02\xD3\xD1\x03\x02\x02\x02\xD4\xD6\x05\f\x07\x02\xD5\xD4" +
		"\x03\x02\x02\x02\xD5\xD6\x03\x02\x02\x02\xD6\xDA\x03\x02\x02\x02\xD7\xD9" +
		"\x05\x0E\b\x02\xD8\xD7\x03\x02\x02\x02\xD9\xDC\x03\x02\x02\x02\xDA\xD8" +
		"\x03\x02\x02\x02\xDA\xDB\x03\x02\x02\x02\xDB\v\x03\x02\x02\x02\xDC\xDA" +
		"\x03\x02\x02\x02\xDD\xDE\x07Q\x02\x02\xDE\xDF\x05\xA8U\x02\xDF\xE0\x07" +
		"F\x02\x02\xE0\xE1\x07R\x02\x02\xE1\r\x03\x02\x02\x02\xE2\xE3\b\b\x01\x02" +
		"\xE3\xE5\x07O\x02\x02\xE4\xE6\x05\x0E\b\x02\xE5\xE4\x03\x02\x02\x02\xE6" +
		"\xE7\x03\x02\x02\x02\xE7\xE5\x03\x02\x02\x02\xE7\xE8\x03\x02\x02\x02\xE8" +
		"\xE9\x03\x02\x02\x02\xE9\xEA\x07P\x02\x02\xEA\xF0\x03\x02\x02\x02\xEB" +
		"\xEC\x07M\x02\x02\xEC\xF0\x05\x0E\b\x05\xED\xF0\x05x=\x02\xEE\xF0\x07" +
		"L\x02\x02\xEF\xE2\x03\x02\x02\x02\xEF\xEB\x03\x02\x02\x02\xEF\xED\x03" +
		"\x02\x02\x02\xEF\xEE\x03\x02\x02\x02\xF0\xF5\x03\x02\x02\x02\xF1\xF2\f" +
		"\x06\x02\x02\xF2\xF4\x07M\x02\x02\xF3\xF1\x03\x02\x02\x02\xF4\xF7\x03" +
		"\x02\x02\x02\xF5\xF3\x03\x02\x02\x02\xF5\xF6\x03\x02\x02\x02\xF6\x0F\x03" +
		"\x02\x02\x02\xF7\xF5\x03\x02\x02\x02\xF8\xF9\x05\xA8U\x02\xF9\xFB\x07" +
		"\n\x02\x02\xFA\xFC\x05\"\x12\x02\xFB\xFA\x03\x02\x02\x02\xFC\xFD\x03\x02" +
		"\x02\x02\xFD\xFB\x03\x02\x02\x02\xFD\xFE\x03\x02\x02\x02\xFE\xFF\x03\x02" +
		"\x02\x02\xFF\u0100\x07N\x02\x02\u0100\u0112\x03\x02\x02\x02\u0101\u0102" +
		"\x07%\x02\x02\u0102\u0103\x07\n\x02\x02\u0103\u010A\x07Y\x02\x02\u0104" +
		"\u0109\x05\xA8U\x02\u0105\u0109\x07L\x02\x02\u0106\u0109\x07,\x02\x02" +
		"\u0107\u0109\x07\'\x02\x02\u0108\u0104\x03\x02\x02\x02\u0108\u0105\x03" +
		"\x02\x02\x02\u0108\u0106\x03\x02\x02\x02\u0108\u0107\x03\x02\x02\x02\u0109" +
		"\u010C\x03\x02\x02\x02\u010A\u0108\x03\x02\x02\x02\u010A\u010B\x03\x02" +
		"\x02\x02\u010B\u010D\x03\x02\x02\x02\u010C\u010A\x03\x02\x02\x02\u010D" +
		"\u010E\x07]\x02\x02\u010E\u010F\x05\xA8U\x02\u010F\u0110\x07N\x02\x02" +
		"\u0110\u0112\x03\x02\x02\x02\u0111\xF8\x03\x02\x02\x02\u0111\u0101\x03" +
		"\x02\x02\x02\u0112\x11\x03\x02\x02\x02\u0113\u0115\x07\x0F\x02\x02\u0114" +
		"\u0116\x070\x02\x02\u0115\u0114\x03\x02\x02\x02\u0115\u0116\x03\x02\x02" +
		"\x02\u0116\u0117\x03\x02\x02\x02\u0117\u011C\x05\xA8U\x02\u0118\u0119" +
		"\x07J\x02\x02\u0119\u011B\x05\xA8U\x02\u011A\u0118\x03\x02\x02\x02\u011B" +
		"\u011E\x03\x02\x02\x02\u011C\u011A\x03\x02\x02\x02\u011C\u011D\x03\x02" +
		"\x02\x02\u011D\u011F\x03\x02\x02\x02\u011E\u011C\x03\x02\x02\x02\u011F" +
		"\u0120\x07N\x02\x02\u0120\x13\x03\x02\x02\x02\u0121\u0123\x079\x02\x02" +
		"\u0122\u0121\x03\x02\x02\x02\u0123\u0126\x03\x02\x02\x02\u0124\u0122\x03" +
		"\x02\x02\x02\u0124\u0125\x03\x02\x02\x02\u0125\u0127\x03\x02\x02\x02\u0126" +
		"\u0124\x03\x02\x02\x02\u0127\u0128\x07\x1F\x02\x02\u0128\u012D\x05\xA8" +
		"U\x02\u0129\u012A\x07J\x02\x02\u012A\u012C\x05\xA8U\x02\u012B\u0129\x03" +
		"\x02\x02\x02\u012C\u012F\x03\x02\x02\x02\u012D\u012B\x03\x02\x02\x02\u012D" +
		"\u012E\x03\x02\x02\x02\u012E\u0130\x03\x02\x02\x02\u012F\u012D\x03\x02" +
		"\x02\x02\u0130\u0131\x07N\x02\x02\u0131\x15\x03\x02\x02\x02\u0132\u0134" +
		"\x079\x02\x02\u0133\u0132\x03\x02\x02\x02\u0134\u0137\x03\x02\x02\x02" +
		"\u0135\u0133\x03\x02\x02\x02\u0135\u0136\x03\x02\x02\x02\u0136\u0138\x03" +
		"\x02\x02\x02\u0137\u0135\x03\x02\x02\x02\u0138\u013A\x07 \x02\x02\u0139" +
		"\u013B\x07\x1F\x02\x02\u013A\u0139\x03\x02\x02\x02\u013A\u013B\x03\x02" +
		"\x02\x02\u013B\u013C\x03\x02\x02\x02\u013C\u0141\x05\xA8U\x02\u013D\u013E" +
		"\x07J\x02\x02\u013E\u0140\x05\xA8U\x02\u013F\u013D\x03\x02\x02\x02\u0140" +
		"\u0143\x03\x02\x02\x02\u0141\u013F\x03\x02\x02\x02\u0141\u0142\x03\x02" +
		"\x02\x02\u0142\u0144\x03\x02\x02\x02\u0143\u0141\x03\x02\x02\x02\u0144" +
		"\u0145\x07N\x02\x02\u0145\x17\x03\x02\x02\x02\u0146\u0147\x07!\x02\x02" +
		"\u0147\u0149\x05\xA8U\x02\u0148\u014A\x07T\x02\x02\u0149\u0148\x03\x02" +
		"\x02\x02\u0149\u014A\x03\x02\x02\x02\u014A\u014B\x03\x02\x02\x02\u014B" +
		"\u014C\x07N\x02\x02\u014C\x19\x03\x02\x02\x02\u014D\u014F\x07\x1C\x02" +
		"\x02\u014E\u0150\x07\x10\x02\x02\u014F\u014E\x03\x02\x02\x02\u014F\u0150" +
		"\x03\x02\x02\x02\u0150\u0152\x03\x02\x02\x02\u0151\u0153\x05\xA8U\x02" +
		"\u0152\u0151\x03\x02\x02\x02\u0152\u0153\x03\x02\x02\x02\u0153\u0155\x03" +
		"\x02\x02\x02\u0154\u0156\t\x02\x02\x02\u0155\u0154\x03\x02\x02\x02\u0155" +
		"\u0156\x03\x02\x02\x02\u0156\u0159\x03\x02\x02\x02\u0157\u0158\x07I\x02" +
		"\x02\u0158\u015A\x052\x1A\x02\u0159\u0157\x03\x02\x02\x02\u0159\u015A" +
		"\x03\x02\x02\x02\u015A\u015B\x03\x02\x02\x02\u015B\u015F\x07V\x02\x02" +
		"\u015C\u015E\x05\x1C\x0F\x02\u015D\u015C\x03\x02\x02\x02\u015E\u0161\x03" +
		"\x02\x02\x02\u015F\u015D\x03\x02\x02\x02\u015F\u0160\x03\x02\x02\x02\u0160" +
		"\u0162\x03\x02\x02\x02\u0161\u015F\x03\x02\x02\x02\u0162\u0163\x07W\x02" +
		"\x02\u0163\x1B\x03\x02\x02\x02\u0164\u0166\x07$\x02\x02\u0165\u0164\x03" +
		"\x02\x02\x02\u0165\u0166\x03\x02\x02\x02\u0166\u0167\x03\x02\x02\x02\u0167" +
		"\u0168\x05\xA8U\x02\u0168\u016A\x07O\x02\x02\u0169\u016B\x05\xACW\x02" +
		"\u016A\u0169\x03\x02\x02\x02\u016A\u016B\x03\x02\x02\x02\u016B\u016C\x03" +
		"\x02\x02\x02\u016C\u016D\x07P\x02\x02\u016D\u016E\x03\x02\x02\x02\u016E" +
		"\u016F\x07N\x02\x02\u016F\x1D\x03\x02\x02\x02\u0170\u0171\x07\x12\x02" +
		"\x02\u0171\u0174\x05\xA8U\x02\u0172\u0175\x05.\x18\x02\u0173\u0175\x05" +
		"0\x19\x02\u0174\u0172\x03\x02\x02\x02\u0174\u0173\x03\x02\x02\x02\u0175" +
		"\u0192\x03\x02\x02\x02\u0176\u0178\x07\x13\x02\x02\u0177\u0176\x03\x02" +
		"\x02\x02\u0177\u0178\x03\x02\x02\x02\u0178\u017A\x03\x02\x02\x02\u0179" +
		"\u017B\x07\x10\x02\x02\u017A\u0179\x03\x02\x02\x02\u017A\u017B\x03\x02" +
		"\x02\x02\u017B\u017F\x03\x02\x02\x02\u017C\u017E\x079\x02\x02\u017D\u017C" +
		"\x03\x02\x02\x02\u017E\u0181\x03\x02\x02\x02\u017F\u017D\x03\x02\x02\x02" +
		"\u017F\u0180\x03\x02\x02\x02\u0180\u0183\x03\x02\x02\x02\u0181\u017F\x03" +
		"\x02\x02\x02\u0182\u0184\x07\x11\x02\x02\u0183\u0182\x03\x02\x02\x02\u0183" +
		"\u0184\x03\x02\x02\x02\u0184\u018B\x03\x02\x02\x02\u0185\u0186\x05\xA8" +
		"U\x02\u0186\u0188\x07I\x02\x02\u0187\u0189\x052\x1A\x02\u0188\u0187\x03" +
		"\x02\x02\x02\u0188\u0189\x03\x02\x02\x02\u0189\u018C\x03\x02\x02\x02\u018A" +
		"\u018C\x052\x1A\x02\u018B\u0185\x03\x02\x02\x02\u018B\u018A\x03\x02\x02" +
		"\x02\u018C\u018F\x03\x02\x02\x02\u018D\u0190\x05.\x18";
	private static readonly _serializedATNSegment1: string =
		"\x02\u018E\u0190\x050\x19\x02\u018F\u018D\x03\x02\x02\x02\u018F\u018E" +
		"\x03\x02\x02\x02\u0190\u0192\x03\x02\x02\x02\u0191\u0170\x03\x02\x02\x02" +
		"\u0191\u0177\x03\x02\x02\x02\u0192\x1F\x03\x02\x02\x02\u0193\u0196\x07" +
		"\x12\x02\x02\u0194\u0196\x07\x13\x02\x02\u0195\u0193\x03\x02\x02\x02\u0195" +
		"\u0194\x03\x02\x02\x02\u0195\u0196\x03\x02\x02\x02\u0196\u0197\x03\x02" +
		"\x02\x02\u0197\u0198\x07\x03\x02\x02\u0198\u019D\x05\xA8U\x02\u0199\u019A" +
		"\x07O\x02\x02\u019A\u019B\x05\xA8U\x02\u019B\u019C\x07P\x02\x02\u019C" +
		"\u019E\x03\x02\x02\x02\u019D\u0199\x03\x02\x02\x02\u019D\u019E\x03\x02" +
		"\x02\x02\u019E\u019F\x03\x02\x02\x02\u019F\u01A0\x07I\x02\x02\u01A0\u01A1" +
		"\x05\b\x05\x02\u01A1\u01A7\x07I\x02\x02\u01A2\u01A5\x052\x1A\x02\u01A3" +
		"\u01A6\x05.\x18\x02\u01A4\u01A6\x050\x19\x02\u01A5\u01A3\x03\x02\x02\x02" +
		"\u01A5\u01A4\x03\x02\x02\x02\u01A6\u01A8\x03\x02\x02\x02\u01A7\u01A2\x03" +
		"\x02\x02\x02\u01A7\u01A8\x03\x02\x02\x02\u01A8!\x03\x02\x02\x02\u01A9" +
		"\u01AB\x05$\x13\x02\u01AA\u01AC\x077\x02\x02\u01AB\u01AA\x03\x02\x02\x02" +
		"\u01AB\u01AC\x03\x02\x02\x02\u01AC\u01AE\x03\x02\x02\x02\u01AD\u01AF\x07" +
		"M\x02\x02\u01AE\u01AD\x03\x02\x02\x02\u01AE\u01AF\x03\x02\x02\x02\u01AF" +
		"#\x03\x02\x02\x02\u01B0\u01BB\x07T\x02\x02\u01B1\u01BB\x07S\x02\x02\u01B2" +
		"\u01B3\x07Q\x02\x02\u01B3\u01B4\x05\xA8U\x02\u01B4\u01B5\x07R\x02\x02" +
		"\u01B5\u01BB\x03\x02\x02\x02\u01B6\u01B7\x05(\x15\x02\u01B7\u01B8\x05" +
		"\xA8U\x02\u01B8\u01BB\x03\x02\x02\x02\u01B9\u01BB\x07\x1D\x02\x02\u01BA" +
		"\u01B0\x03\x02\x02\x02\u01BA\u01B1\x03\x02\x02\x02\u01BA\u01B2\x03\x02" +
		"\x02\x02\u01BA\u01B6\x03\x02\x02\x02\u01BA\u01B9\x03\x02\x02\x02\u01BB" +
		"%\x03\x02\x02\x02\u01BC\u01C7\x07T\x02\x02\u01BD\u01C7\x07S\x02\x02\u01BE" +
		"\u01C0\x07Q\x02\x02\u01BF\u01C1\x05*\x16\x02\u01C0\u01BF\x03\x02\x02\x02" +
		"\u01C0\u01C1\x03\x02\x02\x02\u01C1\u01C2\x03\x02\x02\x02\u01C2\u01C7\x07" +
		"R\x02\x02\u01C3\u01C4\x05(\x15\x02\u01C4\u01C5\x05\xA2R\x02\u01C5\u01C7" +
		"\x03\x02\x02\x02\u01C6\u01BC\x03\x02\x02\x02\u01C6\u01BD\x03\x02\x02\x02" +
		"\u01C6\u01BE\x03\x02\x02\x02\u01C6\u01C3\x03\x02\x02\x02\u01C7\'\x03\x02" +
		"\x02\x02\u01C8\u01C9\t\x03\x02\x02\u01C9)\x03\x02\x02\x02\u01CA\u01CF" +
		"\x05,\x17\x02\u01CB\u01CC\x07J\x02\x02\u01CC\u01CE\x05,\x17\x02\u01CD" +
		"\u01CB\x03\x02\x02\x02\u01CE\u01D1\x03\x02\x02\x02\u01CF\u01CD\x03\x02" +
		"\x02\x02\u01CF\u01D0\x03\x02\x02\x02\u01D0+\x03\x02\x02\x02\u01D1\u01CF" +
		"\x03\x02\x02\x02\u01D2\u01D3\x07D\x02\x02\u01D3\u01D4\x07I\x02\x02\u01D4" +
		"\u01D6\x05x=\x02\u01D5\u01D7\x07(\x02\x02\u01D6\u01D5\x03\x02\x02\x02" +
		"\u01D6\u01D7\x03\x02\x02\x02\u01D7\u01DD\x03\x02\x02\x02\u01D8\u01DA\x05" +
		"x=\x02\u01D9\u01DB\x07(\x02\x02\u01DA\u01D9\x03\x02\x02\x02\u01DA\u01DB" +
		"\x03\x02\x02\x02\u01DB\u01DD\x03\x02\x02\x02\u01DC\u01D2\x03\x02\x02\x02" +
		"\u01DC\u01D8\x03\x02\x02\x02\u01DD-\x03\x02\x02\x02\u01DE\u01E0\x05&\x14" +
		"\x02\u01DF\u01DE\x03\x02\x02\x02\u01E0\u01E3\x03\x02\x02\x02\u01E1\u01DF" +
		"\x03\x02\x02\x02\u01E1\u01E2\x03\x02\x02\x02\u01E2\u01E4\x03\x02\x02\x02" +
		"\u01E3\u01E1\x03\x02\x02\x02\u01E4\u01E5\x07V\x02\x02\u01E5\u01E7\x05" +
		"4\x1B\x02\u01E6\u01E8\x07N\x02\x02\u01E7\u01E6\x03\x02\x02\x02\u01E7\u01E8" +
		"\x03\x02\x02\x02\u01E8\u01E9\x03\x02\x02\x02\u01E9\u01EA\x07W\x02\x02" +
		"\u01EA/\x03\x02\x02\x02\u01EB\u01EC\x054\x1B\x02\u01EC\u01ED\x07N\x02" +
		"\x02\u01ED1\x03\x02\x02\x02\u01EE\u01F3\x05\xA8U\x02\u01EF\u01F0\x07J" +
		"\x02\x02\u01F0\u01F2\x052\x1A\x02\u01F1\u01EF\x03\x02\x02\x02\u01F2\u01F5" +
		"\x03\x02\x02\x02\u01F3\u01F1\x03\x02\x02\x02\u01F3\u01F4\x03\x02\x02\x02" +
		"\u01F43\x03\x02\x02\x02\u01F5\u01F3\x03\x02\x02\x02\u01F6\u01F8\x05&\x14" +
		"\x02\u01F7\u01F6\x03\x02\x02\x02\u01F8\u01FB\x03\x02\x02\x02\u01F9\u01F7" +
		"\x03\x02\x02\x02\u01F9\u01FA\x03\x02\x02\x02\u01FA\u0201\x03\x02\x02\x02" +
		"\u01FB\u01F9\x03\x02\x02\x02\u01FC\u0200\x05> \x02\u01FD\u0200\x056\x1C" +
		"\x02\u01FE\u0200\x05:\x1E\x02\u01FF\u01FC\x03\x02\x02\x02\u01FF\u01FD" +
		"\x03\x02\x02\x02\u01FF\u01FE\x03\x02\x02\x02\u0200\u0203\x03\x02\x02\x02" +
		"\u0201\u01FF\x03\x02\x02\x02\u0201\u0202\x03\x02\x02\x02\u02025\x03\x02" +
		"\x02\x02\u0203\u0201\x03\x02\x02\x02\u0204\u021F\x05\xA8U\x02\u0205\u0207" +
		"\x07E\x02\x02\u0206\u0208\x07$\x02\x02\u0207\u0206\x03\x02\x02\x02\u0207" +
		"\u0208\x03\x02\x02\x02\u0208\u020B\x03\x02\x02\x02\u0209\u020C\x05x=\x02" +
		"\u020A\u020C\x058\x1D\x02\u020B\u0209\x03\x02\x02\x02\u020B\u020A\x03" +
		"\x02\x02\x02\u020C\u020E\x03\x02\x02\x02\u020D\u020F\x07N\x02\x02\u020E" +
		"\u020D\x03\x02\x02\x02\u020E\u020F\x03\x02\x02\x02\u020F\u0220\x03\x02" +
		"\x02\x02\u0210\u0212\x07I\x02\x02\u0211\u0213\x05\xA8U\x02\u0212\u0211" +
		"\x03\x02\x02\x02\u0212\u0213\x03\x02\x02\x02\u0213\u0218\x03\x02\x02\x02" +
		"\u0214\u0215\x07J\x02\x02\u0215\u0217\x052\x1A\x02\u0216\u0214\x03\x02" +
		"\x02\x02\u0217\u021A\x03\x02\x02\x02\u0218\u0216\x03\x02\x02\x02\u0218" +
		"\u0219\x03\x02\x02\x02\u0219\u021B\x03\x02\x02\x02\u021A\u0218\x03\x02" +
		"\x02\x02\u021B\u021D\x05.\x18\x02\u021C\u021E\x07N\x02\x02\u021D\u021C" +
		"\x03\x02\x02\x02\u021D\u021E\x03\x02\x02\x02\u021E\u0220\x03\x02\x02\x02" +
		"\u021F\u0205\x03\x02\x02\x02\u021F\u0210\x03\x02\x02\x02\u02207\x03\x02" +
		"\x02\x02\u0221\u0223\x07T\x02\x02\u0222\u0221\x03\x02\x02\x02\u0223\u0226" +
		"\x03\x02\x02\x02\u0224\u0222\x03\x02\x02\x02\u0224\u0225\x03\x02\x02\x02" +
		"\u02259\x03\x02\x02\x02\u0226\u0224\x03\x02\x02\x02\u0227\u0228\x07\x14" +
		"\x02\x02\u0228\u022E\x07T\x02\x02\u0229\u022B\x07O\x02\x02\u022A\u022C" +
		"\x05<\x1F\x02\u022B\u022A\x03\x02\x02\x02\u022B\u022C\x03\x02\x02\x02" +
		"\u022C\u022D\x03\x02\x02\x02\u022D\u022F\x07P\x02\x02\u022E\u0229\x03" +
		"\x02\x02\x02\u022E\u022F\x03\x02\x02\x02\u022F\u0230\x03\x02\x02\x02\u0230" +
		"\u0231\x05.\x18\x02\u0231;\x03\x02\x02\x02\u0232\u0235\x05\xA8U\x02\u0233" +
		"\u0235\x07L\x02\x02\u0234\u0232\x03\x02\x02\x02\u0234\u0233\x03\x02\x02" +
		"\x02\u0235\u023D\x03\x02\x02\x02\u0236\u0239\x07J\x02\x02\u0237\u023A" +
		"\x05\xA8U\x02\u0238\u023A\x07L\x02\x02\u0239\u0237\x03\x02\x02\x02\u0239" +
		"\u0238\x03\x02\x02\x02\u023A\u023C\x03\x02\x02\x02\u023B\u0236\x03\x02" +
		"\x02\x02\u023C\u023F\x03\x02\x02\x02\u023D\u023B\x03\x02\x02\x02\u023D" +
		"\u023E\x03\x02\x02\x02\u023E=\x03\x02\x02\x02\u023F\u023D\x03\x02\x02" +
		"\x02\u0240\u0243\x07\x12\x02\x02\u0241\u0243\x07\x13\x02\x02\u0242\u0240" +
		"\x03\x02\x02\x02\u0242\u0241\x03\x02\x02\x02\u0242\u0243\x03\x02\x02\x02" +
		"\u0243\u0244\x03\x02\x02\x02\u0244\u0245\x05B\"\x02\u0245\u0246\x05D#" +
		"\x02\u0246\u0249\x03\x02\x02\x02\u0247\u0249\x05@!\x02\u0248\u0242\x03" +
		"\x02\x02\x02\u0248\u0247\x03\x02\x02\x02\u0249?\x03\x02\x02\x02\u024A" +
		"\u0252\x072\x02\x02\u024B\u0253\t\x04\x02\x02\u024C\u024D\x07Q\x02\x02" +
		"\u024D\u024F\x07R\x02\x02\u024E\u0250\x07E\x02\x02\u024F\u024E\x03\x02" +
		"\x02\x02\u024F\u0250\x03\x02\x02\x02\u0250\u0253\x03\x02\x02\x02\u0251" +
		"\u0253\x05\xA8U\x02\u0252\u024B\x03\x02\x02\x02\u0252\u024C\x03\x02\x02" +
		"\x02\u0252\u0251\x03\x02\x02\x02\u0253\u0254\x03\x02\x02\x02\u0254\u0256" +
		"\x07O\x02\x02\u0255\u0257\x05\xACW\x02\u0256\u0255\x03\x02\x02\x02\u0256" +
		"\u0257\x03\x02\x02\x02\u0257\u0258\x03\x02\x02\x02\u0258\u0259\x07P\x02" +
		"\x02\u0259\u025D\x07V\x02\x02\u025A\u025C\x05F$\x02\u025B\u025A\x03\x02" +
		"\x02\x02\u025C\u025F\x03\x02\x02\x02\u025D\u025B\x03\x02\x02\x02\u025D" +
		"\u025E\x03\x02\x02\x02\u025E\u0260\x03\x02\x02\x02\u025F\u025D\x03\x02" +
		"\x02\x02\u0260\u0261\x07W\x02\x02\u0261A\x03\x02\x02\x02\u0262\u0264\x07" +
		"\"\x02\x02\u0263\u0262\x03\x02\x02\x02\u0263\u0264\x03\x02\x02\x02\u0264" +
		"\u0266\x03\x02\x02\x02\u0265\u0267\x07$\x02\x02\u0266\u0265\x03\x02\x02" +
		"\x02\u0266\u0267\x03\x02\x02\x02\u0267\u0269\x03\x02\x02\x02\u0268\u026A" +
		"\x07\x07\x02\x02\u0269\u0268\x03\x02\x02\x02\u0269\u026A\x03\x02\x02\x02" +
		"\u026A\u026B\x03\x02\x02\x02\u026B\u0271\x05\xA8U\x02\u026C\u026E\x07" +
		"O\x02\x02\u026D\u026F\x05\xACW\x02\u026E\u026D\x03\x02\x02\x02\u026E\u026F" +
		"\x03\x02\x02\x02\u026F\u0270\x03\x02\x02\x02\u0270\u0272\x07P\x02\x02" +
		"\u0271\u026C\x03\x02\x02\x02\u0271\u0272\x03\x02\x02\x02\u0272\u027C\x03" +
		"\x02\x02\x02\u0273\u0279\x07\x07\x02\x02\u0274\u0276\x07O\x02\x02\u0275" +
		"\u0277\x05\xACW\x02\u0276\u0275\x03\x02\x02\x02\u0276\u0277\x03\x02\x02" +
		"\x02\u0277\u0278\x03\x02\x02\x02\u0278\u027A\x07P\x02\x02\u0279\u0274" +
		"\x03\x02\x02\x02\u0279\u027A\x03\x02\x02\x02\u027A\u027C\x03\x02\x02\x02" +
		"\u027B\u0263\x03\x02\x02\x02\u027B\u0273\x03\x02\x02\x02\u027CC\x03\x02" +
		"\x02\x02\u027D\u0281\x07V\x02\x02\u027E\u0280\x05F$\x02\u027F\u027E\x03" +
		"\x02\x02\x02\u0280\u0283\x03\x02\x02\x02\u0281\u027F\x03\x02\x02\x02\u0281" +
		"\u0282\x03\x02\x02\x02\u0282\u0284\x03\x02\x02\x02\u0283\u0281\x03\x02" +
		"\x02\x02\u0284\u0287\x07W\x02\x02\u0285\u0287\x05F$\x02\u0286\u027D\x03" +
		"\x02\x02\x02\u0286\u0285\x03\x02\x02\x02\u0287E\x03\x02\x02\x02\u0288" +
		"\u029B\x05p9\x02\u0289\u029B\x05t;\x02\u028A\u029B\x05j6\x02\u028B\u029B" +
		"\x05b2\x02\u028C\u029B\x05^0\x02\u028D\u029B\x05`1\x02\u028E\u029B\x05" +
		"R*\x02\u028F\u029B\x05X-\x02\u0290\u029B\x05Z.\x02\u0291\u029B\x05n8\x02" +
		"\u0292\u029B\x05l7\x02\u0293\u029B\x05\\/\x02\u0294\u029B\x05V,\x02\u0295" +
		"\u029B\x05P)\x02\u0296\u029B\x05L\'\x02\u0297\u029B\x05N(\x02\u0298\u029B" +
		"\x05J&\x02\u0299\u029B\x05H%\x02\u029A\u0288\x03\x02\x02\x02\u029A\u0289" +
		"\x03\x02\x02\x02\u029A\u028A\x03\x02\x02\x02\u029A\u028B\x03\x02\x02\x02" +
		"\u029A\u028C\x03\x02\x02\x02\u029A\u028D\x03\x02\x02\x02\u029A\u028E\x03" +
		"\x02\x02\x02\u029A\u028F\x03\x02\x02\x02\u029A\u0290\x03\x02\x02\x02\u029A" +
		"\u0291\x03\x02\x02\x02\u029A\u0292\x03\x02\x02\x02\u029A\u0293\x03\x02" +
		"\x02\x02\u029A\u0294\x03\x02\x02\x02\u029A\u0295\x03\x02\x02\x02\u029A" +
		"\u0296\x03\x02\x02\x02\u029A\u0297\x03\x02\x02\x02\u029A\u0298\x03\x02" +
		"\x02\x02\u029A\u0299\x03\x02\x02\x02\u029BG\x03\x02\x02\x02\u029C\u02A0" +
		"\x07V\x02\x02\u029D\u029F\x05F$\x02\u029E\u029D\x03\x02\x02\x02\u029F" +
		"\u02A2\x03\x02\x02\x02\u02A0\u029E\x03\x02\x02\x02\u02A0\u02A1\x03\x02" +
		"\x02\x02\u02A1\u02A3\x03\x02\x02\x02\u02A2\u02A0\x03\x02\x02\x02\u02A3" +
		"\u02A4\x07W\x02\x02\u02A4I\x03\x02\x02\x02\u02A5\u02A7\x07/\x02\x02\u02A6" +
		"\u02A8\x05\xA8U\x02\u02A7\u02A6\x03\x02\x02\x02\u02A7\u02A8\x03\x02\x02" +
		"\x02\u02A8\u02A9\x03\x02\x02\x02\u02A9\u02AA\x07N\x02\x02\u02AAK\x03\x02" +
		"\x02\x02\u02AB\u02AD\x07-\x02\x02\u02AC\u02AE\x05\xA8U\x02\u02AD\u02AC" +
		"\x03\x02\x02\x02\u02AD\u02AE\x03\x02\x02\x02\u02AE\u02AF\x03\x02\x02\x02" +
		"\u02AF\u02B0\x07N\x02\x02\u02B0M\x03\x02\x02\x02\u02B1\u02B3\x07.\x02" +
		"\x02\u02B2\u02B4\x05\xA8U\x02\u02B3\u02B2\x03\x02\x02\x02\u02B3\u02B4" +
		"\x03\x02\x02\x02\u02B4\u02B5\x03\x02\x02\x02\u02B5\u02B6\x07N\x02\x02" +
		"\u02B6O\x03\x02\x02\x02\u02B7\u02B8\x05\xA8U\x02\u02B8\u02B9\x07I\x02" +
		"\x02\u02B9Q\x03\x02\x02\x02\u02BA\u02BB\x07\x04\x02\x02\u02BB\u02BC\x07" +
		"O\x02\x02\u02BC\u02BD\x05x=\x02\u02BD\u02BE\x07P\x02\x02\u02BE\u02C2\x07" +
		"V\x02\x02\u02BF\u02C1\x05T+\x02\u02C0\u02BF\x03\x02\x02\x02\u02C1\u02C4" +
		"\x03\x02\x02\x02\u02C2\u02C0\x03\x02\x02\x02\u02C2\u02C3\x03\x02\x02\x02" +
		"\u02C3\u02C5\x03\x02\x02\x02\u02C4\u02C2\x03\x02\x02\x02\u02C5\u02C6\x07" +
		"W\x02\x02\u02C6S\x03\x02\x02\x02\u02C7\u02C8\x07\x05\x02\x02\u02C8\u02CB" +
		"\x05x=\x02\u02C9\u02CB\x07\x06\x02\x02\u02CA\u02C7\x03\x02\x02\x02\u02CA" +
		"\u02C9\x03\x02\x02\x02\u02CB\u02CC\x03\x02\x02\x02\u02CC\u02D0\x07I\x02" +
		"\x02\u02CD\u02CF\x05F$\x02\u02CE\u02CD\x03\x02\x02\x02\u02CF\u02D2\x03" +
		"\x02\x02\x02\u02D0\u02CE\x03\x02\x02\x02\u02D0\u02D1\x03\x02\x02\x02\u02D1" +
		"U\x03\x02\x02\x02\u02D2\u02D0\x03\x02\x02\x02\u02D3\u02D4\x07\b\x02\x02" +
		"\u02D4\u02D5\x05x=\x02\u02D5\u02D6\x07N\x02\x02\u02D6W\x03\x02\x02\x02" +
		"\u02D7\u02D8\x07\v\x02\x02\u02D8\u02D9\x07O\x02\x02\u02D9\u02DA\x07\x19" +
		"\x02\x02\u02DA\u02DB\x05\xA8U\x02\u02DB\u02DC\x07\'\x02\x02\u02DC\u02E5" +
		"\x05x=\x02\u02DD\u02DF\x07N\x02\x02\u02DE\u02E0\x05x=\x02\u02DF\u02DE" +
		"\x03\x02\x02\x02\u02DF\u02E0\x03\x02\x02\x02\u02E0\u02E1\x03\x02\x02\x02" +
		"\u02E1\u02E3\x07N\x02\x02\u02E2\u02E4\x05d3\x02\u02E3\u02E2\x03\x02\x02" +
		"\x02\u02E3\u02E4\x03\x02\x02\x02\u02E4\u02E6\x03\x02\x02\x02\u02E5\u02DD" +
		"\x03\x02\x02\x02\u02E5\u02E6\x03\x02\x02\x02\u02E6\u02E7\x03\x02\x02\x02" +
		"\u02E7\u02E8\x07P\x02\x02\u02E8\u02E9\x05D#\x02\u02E9Y\x03\x02\x02\x02" +
		"\u02EA\u02EB\x07&\x02\x02\u02EB\u02EC\x07O\x02\x02\u02EC\u02ED\x05x=\x02" +
		"\u02ED\u02EE\x07\'\x02\x02\u02EE\u02EF\x05x=\x02\u02EF\u02F0\x07P\x02" +
		"\x02\u02F0\u02F1\x05D#\x02\u02F1[\x03\x02\x02\x02\u02F2\u02F4\x07#\x02" +
		"\x02\u02F3\u02F5\x05x=\x02\u02F4\u02F3\x03\x02\x02\x02\u02F4\u02F5\x03" +
		"\x02\x02\x02\u02F5\u02F6\x03\x02\x02\x02\u02F6\u02F7\x07N\x02\x02\u02F7" +
		"]\x03\x02\x02\x02\u02F8\u02F9\x07\x16\x02\x02\u02F9\u02FA\x05D#\x02\u02FA" +
		"\u02FB\x07\x17\x02\x02\u02FB\u02FD\x07O\x02\x02\u02FC\u02FE\x05x=\x02" +
		"\u02FD\u02FC\x03\x02\x02\x02\u02FD\u02FE\x03\x02\x02\x02\u02FE\u02FF\x03" +
		"\x02\x02\x02\u02FF\u0300\x07P\x02\x02\u0300\u0301\x07N\x02\x02\u0301_" +
		"\x03\x02\x02\x02\u0302\u0303\x07\x17\x02\x02\u0303\u0305\x07O\x02\x02" +
		"\u0304\u0306\x05x=\x02\u0305\u0304\x03\x02\x02\x02\u0305\u0306\x03\x02" +
		"\x02\x02\u0306\u0307\x03\x02\x02\x02\u0307\u0308\x07P\x02\x02\u0308\u0309" +
		"\x05D#\x02\u0309a\x03\x02\x02\x02\u030A\u030B\x07\v\x02\x02\u030B\u030D" +
		"\x07O\x02\x02\u030C\u030E\x05f4\x02\u030D\u030C\x03\x02\x02\x02\u030D" +
		"\u030E\x03\x02\x02\x02\u030E\u030F\x03\x02\x02\x02\u030F\u0311\x07N\x02" +
		"\x02\u0310\u0312\x05x=\x02\u0311\u0310\x03\x02\x02\x02\u0311\u0312\x03" +
		"\x02\x02\x02\u0312\u0313\x03\x02\x02\x02\u0313\u0315\x07N\x02\x02\u0314" +
		"\u0316\x05d3\x02\u0315\u0314\x03\x02\x02\x02\u0315\u0316\x03\x02\x02\x02" +
		"\u0316\u0317\x03\x02\x02\x02\u0317\u0318\x07P\x02\x02\u0318\u0319\x05" +
		"D#\x02\u0319c\x03\x02\x02\x02\u031A\u031F\x05x=\x02\u031B\u031C\x07J\x02" +
		"\x02\u031C\u031E\x05x=\x02\u031D\u031B\x03\x02\x02\x02\u031E\u0321\x03" +
		"\x02\x02\x02\u031F\u031D\x03\x02\x02\x02\u031F\u0320\x03\x02\x02\x02\u0320" +
		"e\x03\x02\x02\x02\u0321\u031F\x03\x02\x02\x02\u0322\u0327\x05h5\x02\u0323" +
		"\u0324\x07J\x02\x02\u0324\u0326\x05h5\x02\u0325\u0323\x03\x02\x02\x02" +
		"\u0326\u0329\x03\x02\x02\x02\u0327\u0325\x03\x02\x02\x02\u0327\u0328\x03" +
		"\x02\x02\x02\u0328g\x03\x02\x02\x02\u0329\u0327\x03\x02\x02\x02\u032A" +
		"\u032B\x07\x19\x02\x02\u032B\u032E\x05r:\x02\u032C\u032E\x05x=\x02\u032D" +
		"\u032A\x03\x02\x02\x02\u032D\u032C\x03\x02\x02\x02\u032Ei\x03\x02\x02" +
		"\x02\u032F\u0330\x07\f\x02\x02\u0330\u033A\x05D#\x02\u0331\u0332\x07\r" +
		"\x02\x02\u0332\u0334\x07O\x02\x02\u0333\u0335\x05\xACW\x02\u0334\u0333" +
		"\x03\x02\x02\x02\u0334\u0335\x03\x02\x02\x02\u0335\u0336\x03\x02\x02\x02" +
		"\u0336\u0337\x07P\x02\x02\u0337\u0339\x05D#\x02\u0338\u0331\x03\x02\x02" +
		"\x02\u0339\u033C\x03\x02\x02\x02\u033A\u0338\x03\x02\x02\x02\u033A\u033B" +
		"\x03\x02\x02\x02\u033B\u033F\x03\x02\x02\x02\u033C\u033A\x03\x02\x02\x02" +
		"\u033D\u033E\x07\x0E\x02\x02\u033E\u0340\x05D#\x02\u033F\u033D\x03\x02" +
		"\x02\x02\u033F\u0340\x03\x02\x02\x02\u0340k\x03\x02\x02\x02\u0341\u0343" +
		"\x05x=\x02\u0342\u0341\x03\x02\x02\x02\u0342\u0343\x03\x02\x02\x02\u0343" +
		"\u0344\x03\x02\x02\x02\u0344\u0345\x07N\x02\x02\u0345m\x03\x02\x02\x02" +
		"\u0346\u0347\x07S\x02\x02\u0347\u0348\x07N\x02\x02\u0348o\x03\x02\x02" +
		"\x02\u0349\u034A\x07\x19\x02\x02\u034A\u034F\x05r:\x02\u034B\u034C\x07" +
		"J\x02\x02\u034C\u034E\x05r:\x02\u034D\u034B\x03\x02\x02\x02\u034E\u0351" +
		"\x03\x02\x02\x02\u034F\u034D\x03\x02\x02\x02\u034F\u0350\x03\x02\x02\x02" +
		"\u0350\u0352\x03\x02\x02\x02\u0351\u034F\x03\x02\x02\x02\u0352\u0353\x07" +
		"N\x02\x02\u0353q\x03\x02\x02\x02\u0354\u0357\x05\xA8U\x02\u0355\u0356" +
		"\x07E\x02\x02\u0356\u0358\x05x=\x02\u0357\u0355\x03\x02\x02\x02\u0357" +
		"\u0358\x03\x02\x02\x02\u0358s\x03\x02\x02\x02\u0359\u035A\x07\x15\x02" +
		"\x02\u035A\u0360\x05v<\x02\u035B\u035C\x07\x18\x02\x02\u035C\u035D\x07" +
		"\x15\x02\x02\u035D\u035F\x05v<\x02\u035E\u035B\x03\x02\x02\x02\u035F\u0362" +
		"\x03\x02\x02\x02\u0360\u035E\x03\x02\x02\x02\u0360\u0361\x03\x02\x02\x02" +
		"\u0361\u0365\x03\x02\x02\x02\u0362\u0360\x03\x02\x02\x02\u0363\u0364\x07" +
		"\x18\x02\x02\u0364\u0366\x05D#\x02\u0365\u0363\x03\x02\x02\x02\u0365\u0366" +
		"\x03\x02\x02\x02\u0366u\x03\x02\x02\x02\u0367\u0368\x07O\x02\x02\u0368" +
		"\u0369\x05x=\x02\u0369\u036A\x07P\x02\x02\u036A\u036B\x05D#\x02\u036B" +
		"w\x03\x02\x02\x02\u036C\u036D\x05z>\x02\u036Dy\x03\x02\x02\x02\u036E\u0372" +
		"\x05~@\x02\u036F\u0370\x05|?\x02\u0370\u0371\x05z>\x02\u0371\u0373\x03" +
		"\x02\x02\x02\u0372\u036F\x03\x02\x02\x02\u0372\u0373\x03\x02\x02\x02\u0373" +
		"{\x03\x02\x02\x02\u0374\u038C\x07E\x02\x02\u0375\u0376\x079\x02\x02\u0376" +
		"\u038C\x07E\x02\x02\u0377\u0378\x07<\x02\x02\u0378\u038C\x07E\x02\x02" +
		"\u0379\u037A\x07L\x02\x02\u037A\u038C\x07E\x02\x02\u037B\u037C\x07:\x02" +
		"\x02\u037C\u038C\x07E\x02\x02\u037D\u037E\x07;\x02\x02\u037E\u038C\x07" +
		"E\x02\x02\u037F\u0380\x07M\x02\x02\u0380\u038C\x07E\x02\x02\u0381\u0382" +
		"\x074\x02\x02\u0382\u038C\x07E\x02\x02\u0383\u0384\x07C\x02\x02\u0384" +
		"\u038C\x07E\x02\x02\u0385\u0386\x07Y\x02\x02\u0386\u038C\x07E\x02\x02" +
		"\u0387\u0388\x07]\x02\x02\u0388\u038C\x07E\x02\x02\u0389\u038A\x07^\x02" +
		"\x02\u038A\u038C\x07E\x02\x02\u038B\u0374\x03\x02\x02\x02\u038B\u0375" +
		"\x03\x02\x02\x02\u038B\u0377\x03\x02\x02\x02\u038B\u0379\x03\x02\x02\x02" +
		"\u038B\u037B\x03\x02\x02\x02\u038B\u037D\x03\x02\x02\x02\u038B\u037F\x03" +
		"\x02\x02\x02\u038B\u0381\x03\x02\x02\x02\u038B\u0383\x03\x02\x02\x02\u038B" +
		"\u0385\x03\x02\x02\x02\u038B\u0387\x03\x02\x02\x02\u038B\u0389\x03\x02" +
		"\x02\x02\u038C}\x03\x02\x02\x02\u038D\u0393\x05\x80A\x02\u038E\u038F\x07" +
		"7\x02\x02\u038F\u0390\x05x=\x02\u0390\u0391\x07I\x02\x02\u0391\u0392\x05" +
		"~@\x02\u0392\u0394\x03\x02\x02\x02\u0393\u038E\x03\x02\x02\x02\u0393\u0394" +
		"\x03\x02\x02\x02\u0394\x7F\x03\x02\x02\x02\u0395\u039A\x05\x82B\x02\u0396" +
		"\u0397\x078\x02\x02\u0397\u0399\x05\x82B\x02\u0398\u0396\x03\x02\x02\x02" +
		"\u0399\u039C\x03\x02\x02\x02\u039A\u0398\x03\x02\x02\x02\u039A\u039B\x03" +
		"\x02\x02\x02\u039B\x81\x03\x02\x02\x02\u039C\u039A\x03\x02\x02\x02\u039D" +
		"\u03A2\x05\x84C\x02\u039E\u039F\x07@\x02\x02\u039F\u03A1\x05\x84C\x02" +
		"\u03A0\u039E\x03\x02\x02\x02\u03A1\u03A4\x03\x02\x02\x02\u03A2\u03A0\x03" +
		"\x02\x02\x02\u03A2\u03A3\x03\x02\x02\x02\u03A3\x83\x03\x02\x02\x02\u03A4" +
		"\u03A2\x03\x02\x02\x02\u03A5\u03AA\x05\x86D\x02\u03A6\u03A7\x07?\x02\x02" +
		"\u03A7\u03A9\x05\x86D\x02\u03A8\u03A6\x03\x02\x02\x02\u03A9\u03AC\x03" +
		"\x02\x02\x02\u03AA\u03A8\x03\x02\x02\x02\u03AA\u03AB\x03\x02\x02\x02\u03AB" +
		"\x85\x03\x02\x02\x02\u03AC\u03AA\x03\x02\x02\x02\u03AD\u03B2\x05\x88E" +
		"\x02\u03AE\u03AF\x07M\x02\x02\u03AF\u03B1\x05\x88E\x02\u03B0\u03AE\x03" +
		"\x02\x02\x02\u03B1\u03B4\x03\x02\x02\x02\u03B2\u03B0\x03\x02\x02\x02\u03B2" +
		"\u03B3\x03\x02\x02\x02\u03B3\x87\x03\x02\x02\x02\u03B4\u03B2\x03\x02\x02" +
		"\x02\u03B5\u03BA\x05\x8AF\x02\u03B6\u03B7\x07C\x02\x02\u03B7\u03B9\x05" +
		"\x8AF\x02\u03B8\u03B6\x03\x02\x02\x02\u03B9\u03BC\x03\x02\x02\x02\u03BA" +
		"\u03B8\x03\x02\x02\x02\u03BA\u03BB\x03\x02\x02\x02\u03BB\x89\x03\x02\x02" +
		"\x02\u03BC\u03BA\x03\x02\x02\x02\u03BD\u03C2\x05\x8CG\x02\u03BE\u03BF" +
		"\x074\x02\x02\u03BF\u03C1\x05\x8CG\x02\u03C0\u03BE\x03\x02\x02\x02\u03C1" +
		"\u03C4\x03\x02\x02\x02\u03C2\u03C0\x03\x02\x02\x02\u03C2\u03C3\x03\x02" +
		"\x02\x02\u03C3\x8B\x03\x02\x02\x02\u03C4\u03C2\x03\x02\x02\x02\u03C5\u03C9" +
		"\x05\x90I\x02\u03C6\u03C8\x05\x8EH\x02\u03C7\u03C6\x03\x02\x02\x02\u03C8" +
		"\u03CB\x03\x02\x02\x02\u03C9\u03C7\x03\x02\x02\x02\u03C9\u03CA\x03\x02" +
		"\x02\x02\u03CA\x8D\x03\x02\x02\x02\u03CB\u03C9\x03\x02\x02\x02\u03CC\u03CD" +
		"\t\x05\x02\x02\u03CD\u03DB\x05\x90I\x02\u03CE\u03CF\x07,\x02\x02\u03CF" +
		"\u03D0\x07\'\x02\x02\u03D0\u03D1\x07O\x02\x02\u03D1\u03D2\x05*\x16\x02" +
		"\u03D2\u03D3\x07P\x02\x02\u03D3\u03DB\x03\x02\x02\x02\u03D4\u03D5\x07" +
		"+\x02\x02\u03D5\u03D6\x07\'\x02\x02\u03D6\u03D7\x07O\x02\x02\u03D7\u03D8" +
		"\x05*\x16\x02\u03D8\u03D9\x07P\x02\x02\u03D9\u03DB\x03\x02\x02\x02\u03DA" +
		"\u03CC\x03\x02\x02\x02\u03DA\u03CE\x03\x02\x02\x02\u03DA\u03D4\x03\x02" +
		"\x02\x02\u03DB\x8F\x03\x02\x02\x02\u03DC\u03E2\x05\x94K\x02\u03DD\u03DE" +
		"\x05\x92J\x02\u03DE\u03DF\x05\x94K\x02\u03DF\u03E1\x03\x02\x02\x02\u03E0" +
		"\u03DD\x03\x02\x02\x02\u03E1\u03E4\x03\x02\x02\x02\u03E2\u03E0\x03\x02" +
		"\x02\x02\u03E2\u03E3\x03\x02\x02\x02\u03E3\x91\x03\x02\x02\x02\u03E4\u03E2" +
		"\x03\x02\x02\x02\u03E5\u03E6\t\x06\x02\x02\u03E6\x93\x03\x02\x02\x02\u03E7" +
		"\u03EC\x05\x96L\x02\u03E8\u03E9\t\x07\x02\x02\u03E9\u03EB\x05\x96L\x02" +
		"\u03EA\u03E8\x03\x02\x02\x02\u03EB\u03EE\x03\x02\x02\x02\u03EC\u03EA\x03" +
		"\x02\x02\x02\u03EC\u03ED\x03\x02\x02\x02\u03ED\x95\x03\x02\x02\x02\u03EE" +
		"\u03EC\x03\x02\x02\x02\u03EF\u03F4\x05\x98M\x02\u03F0\u03F1\t\b\x02\x02" +
		"\u03F1\u03F3\x05\x98M\x02\u03F2\u03F0\x03\x02\x02\x02\u03F3\u03F6\x03" +
		"\x02\x02\x02\u03F4\u03F2\x03\x02\x02\x02\u03F4\u03F5\x03\x02\x02\x02\u03F5" +
		"\x97\x03\x02\x02\x02\u03F6\u03F4\x03\x02\x02\x02\u03F7\u03FC\x05\x9AN" +
		"\x02\u03F8\u03F9\t\t\x02\x02\u03F9\u03FB\x05\x9AN\x02\u03FA\u03F8\x03" +
		"\x02\x02\x02\u03FB\u03FE\x03\x02\x02\x02\u03FC\u03FA\x03\x02\x02\x02\u03FC" +
		"\u03FD\x03\x02\x02\x02\u03FD\x99\x03\x02\x02\x02\u03FE\u03FC\x03\x02\x02" +
		"\x02\u03FF\u0400\x05\x9CO\x02\u0400\u0401\x05\x9AN\x02\u0401\u0410\x03" +
		"\x02\x02\x02\u0402\u0403\x07\t\x02\x02\u0403\u0410\x05\x9AN\x02\u0404" +
		"\u0405\x07\x1E\x02\x02\u0405\u0410\x05\x9AN\x02\u0406\u0407\x07\x1D\x02" +
		"\x02\u0407\u0410\x05\x9AN\x02\u0408\u0409\x07\x11\x02\x02\u0409\u0410" +
		"\x05\x9AN\x02\u040A\u040B\x07\x19\x02\x02\u040B\u0410\x05\x9AN\x02\u040C" +
		"\u040D\x07$\x02\x02\u040D\u0410\x05\x9AN\x02\u040E\u0410\x05\x9EP\x02" +
		"\u040F\u03FF\x03\x02\x02\x02\u040F\u0402\x03\x02\x02\x02\u040F\u0404\x03" +
		"\x02\x02\x02\u040F\u0406\x03\x02\x02\x02\u040F\u0408\x03\x02\x02\x02\u040F" +
		"\u040A\x03\x02\x02\x02\u040F\u040C\x03\x02\x02\x02\u040F\u040E\x03\x02" +
		"\x02\x02\u0410\x9B\x03\x02\x02\x02\u0411\u0412\t\n\x02\x02\u0412\x9D\x03" +
		"\x02\x02\x02\u0413\u0417\x05\xA2R\x02\u0414\u0416\x05\xA0Q\x02\u0415\u0414" +
		"\x03\x02\x02\x02\u0416\u0419\x03\x02\x02\x02\u0417\u0415\x03\x02\x02\x02" +
		"\u0417\u0418\x03\x02\x02\x02\u0418\x9F\x03\x02\x02\x02\u0419\u0417\x03" +
		"\x02\x02\x02\u041A\u041B\x07K\x02\x02\u041B\u0441\x05\xA6T\x02\u041C\u041E" +
		"\x07Q\x02\x02\u041D\u041F\x05x=\x02\u041E\u041D\x03\x02\x02\x02\u041E" +
		"\u041F\x03\x02\x02\x02\u041F\u0420\x03\x02\x02\x02\u0420\u0441\x07R\x02" +
		"\x02\u0421\u0423\x07O\x02\x02\u0422\u0424\x05*\x16\x02\u0423\u0422\x03" +
		"\x02\x02\x02\u0423\u0424\x03\x02\x02\x02\u0424\u0425\x03\x02\x02\x02\u0425" +
		"\u0441\x07P\x02\x02\u0426\u0427\x079\x02\x02\u0427\u0441\x079\x02\x02" +
		"\u0428\u0429\x07<\x02\x02\u0429\u0441\x07<\x02\x02\u042A\u042B\x07A\x02" +
		"\x02\u042B\u0441\x05x=\x02\u042C\u042D\x07)\x02\x02\u042D\u0430\x05x=" +
		"\x02\u042E\u042F\x07*\x02\x02\u042F\u0431\x05x=\x02\u0430\u042E\x03\x02" +
		"\x02\x02\u0430\u0431\x03\x02\x02\x02\u0431\u0441\x03\x02\x02\x02\u0432" +
		"\u0434\x07V\x02\x02\u0433\u0435\x05\xACW\x02\u0434\u0433\x03\x02\x02\x02" +
		"\u0434\u0435\x03\x02\x02\x02\u0435\u0436\x03\x02\x02\x02\u0436\u0438\x07" +
		"I\x02\x02\u0437\u0439\x05x=\x02\u0438\u0437\x03\x02\x02\x02\u0438\u0439" +
		"\x03\x02\x02\x02\u0439\u043A\x03\x02\x02\x02\u043A\u0441\x07W\x02\x02" +
		"\u043B\u043C\x07I\x02\x02\u043C\u043D\x052\x1A\x02\u043D\u043E\x05.\x18" +
		"\x02\u043E\u0441\x03\x02\x02\x02\u043F\u0441\x05.\x18\x02\u0440\u041A" +
		"\x03\x02\x02\x02\u0440";
	private static readonly _serializedATNSegment2: string =
		"\u041C\x03\x02\x02\x02\u0440\u0421\x03\x02\x02\x02\u0440\u0426\x03\x02" +
		"\x02\x02\u0440\u0428\x03\x02\x02\x02\u0440\u042A\x03\x02\x02\x02\u0440" +
		"\u042C\x03\x02\x02\x02\u0440\u0432\x03\x02\x02\x02\u0440\u043B\x03\x02" +
		"\x02\x02\u0440\u043F\x03\x02\x02\x02\u0441\xA1\x03\x02\x02\x02\u0442\u0444" +
		"\x07O\x02\x02\u0443\u0445\x05*\x16\x02\u0444\u0443\x03\x02\x02\x02\u0444" +
		"\u0445\x03\x02\x02\x02\u0445\u0446\x03\x02\x02\x02\u0446\u045F\x07P\x02" +
		"\x02\u0447\u0449\x07Q\x02\x02\u0448\u044A\x05*\x16\x02\u0449\u0448\x03" +
		"\x02\x02\x02\u0449\u044A\x03\x02\x02\x02\u044A\u044B\x03\x02\x02\x02\u044B" +
		"\u045F\x07R\x02\x02\u044C\u044E\x07V\x02\x02\u044D\u044F\x05\xACW\x02" +
		"\u044E\u044D\x03\x02\x02\x02\u044E\u044F\x03\x02\x02\x02\u044F\u0450\x03" +
		"\x02\x02\x02\u0450\u0452\x07I\x02\x02\u0451\u0453\x05x=\x02\u0452\u0451" +
		"\x03\x02\x02\x02\u0452\u0453\x03\x02\x02\x02\u0453\u0454\x03\x02\x02\x02" +
		"\u0454\u045F\x07W\x02\x02\u0455\u0456\x07A\x02\x02\u0456\u045F\x05x=\x02" +
		"\u0457\u0458\x07L\x02\x02\u0458\u0459\x07A\x02\x02\u0459\u045F\x05x=\x02" +
		"\u045A\u045B\x07K\x02\x02\u045B\u045F\x05\xA8U\x02\u045C\u045F\x05> \x02" +
		"\u045D\u045F\x05\xA4S\x02\u045E\u0442\x03\x02\x02\x02\u045E\u0447\x03" +
		"\x02\x02\x02\u045E\u044C\x03\x02\x02\x02\u045E\u0455\x03\x02\x02\x02\u045E" +
		"\u0457\x03\x02\x02\x02\u045E\u045A\x03\x02\x02\x02\u045E\u045C\x03\x02" +
		"\x02\x02\u045E\u045D\x03\x02\x02\x02\u045F\xA3\x03\x02\x02\x02\u0460\u046C" +
		"\x07\x1D\x02\x02\u0461\u046C\x07G\x02\x02\u0462\u046C\x07F\x02\x02\u0463" +
		"\u0464\x074\x02\x02\u0464\u046C\x05\xA8U\x02\u0465\u046C\x05\xA8U\x02" +
		"\u0466\u046C\x07T\x02\x02\u0467\u046C\x07S\x02\x02\u0468\u046C\x07U\x02" +
		"\x02\u0469\u046C\x07\x1A\x02\x02\u046A\u046C\x07\x1B\x02\x02\u046B\u0460" +
		"\x03\x02\x02\x02\u046B\u0461\x03\x02\x02\x02\u046B\u0462\x03\x02\x02\x02" +
		"\u046B\u0463\x03\x02\x02\x02\u046B\u0465\x03\x02\x02\x02\u046B\u0466\x03" +
		"\x02\x02\x02\u046B\u0467\x03\x02\x02\x02\u046B\u0468\x03\x02\x02\x02\u046B" +
		"\u0469\x03\x02\x02\x02\u046B\u046A\x03\x02\x02\x02\u046C\xA5\x03\x02\x02" +
		"\x02\u046D\u0473\x05\xA8U\x02\u046E\u046F\x07O\x02\x02\u046F\u0470\x05" +
		"x=\x02\u0470\u0471\x07P\x02\x02\u0471\u0473\x03\x02\x02\x02\u0472\u046D" +
		"\x03\x02\x02\x02\u0472\u046E\x03\x02\x02\x02\u0473\xA7\x03\x02\x02\x02" +
		"\u0474\u0477\x07D\x02\x02\u0475\u0477\x05\xAAV\x02\u0476\u0474\x03\x02" +
		"\x02\x02\u0476\u0475\x03\x02\x02\x02\u0477\xA9\x03\x02\x02\x02\u0478\u0479" +
		"\t\v\x02\x02\u0479\xAB\x03\x02\x02\x02\u047A\u047F\x05\xAEX\x02\u047B" +
		"\u047C\x07J\x02\x02\u047C\u047E\x05\xAEX\x02\u047D\u047B\x03\x02\x02\x02" +
		"\u047E\u0481\x03\x02\x02\x02\u047F\u047D\x03\x02\x02\x02\u047F\u0480\x03" +
		"\x02\x02\x02\u0480\xAD\x03\x02\x02\x02\u0481\u047F\x03\x02\x02\x02\u0482" +
		"\u04AE\x07(\x02\x02\u0483\u0484\x07Q\x02\x02\u0484\u0485\x05\xA8U\x02" +
		"\u0485\u0486\x07R\x02\x02\u0486\u04AE\x03\x02\x02\x02\u0487\u0488\x05" +
		"\xA8U\x02\u0488\u0489\x07I\x02\x02\u0489\u048A\x07E\x02\x02\u048A\u048B" +
		"\x05x=\x02\u048B\u04AE\x03\x02\x02\x02\u048C\u048D\x05\xA8U\x02\u048D" +
		"\u048E\x07E\x02\x02\u048E\u048F\x05x=\x02\u048F\u04AE\x03\x02\x02\x02" +
		"\u0490\u0491\x05\xA8U\x02\u0491\u0492\x07I\x02\x02\u0492\u0493\x077\x02" +
		"\x02\u0493\u04AE\x03\x02\x02\x02\u0494\u0495\x05\xA8U\x02\u0495\u0496" +
		"\x07I\x02\x02\u0496\u04AE\x03\x02\x02\x02\u0497\u0498\x05\xA8U\x02\u0498" +
		"\u0499\x07I\x02\x02\u0499\u049A\x05\xA8U\x02\u049A\u049C\x05\xA8U\x02" +
		"\u049B\u049D\x077\x02\x02\u049C\u049B\x03\x02\x02\x02\u049C\u049D\x03" +
		"\x02\x02\x02\u049D\u04AE\x03\x02\x02\x02\u049E\u049F\x05\xA8U\x02\u049F" +
		"\u04A0\x07I\x02\x02\u04A0\u04A2\x05\xA8U\x02\u04A1\u04A3\x077\x02\x02" +
		"\u04A2\u04A1\x03\x02\x02\x02\u04A2\u04A3\x03\x02\x02\x02\u04A3\u04AE\x03" +
		"\x02\x02\x02\u04A4\u04A5\x05\xA8U\x02\u04A5\u04A7\x05\xA8U\x02\u04A6\u04A8" +
		"\x077\x02\x02\u04A7\u04A6\x03\x02\x02\x02\u04A7\u04A8\x03\x02\x02\x02" +
		"\u04A8\u04AE\x03\x02\x02\x02\u04A9\u04AB\x05\xA8U\x02\u04AA\u04AC\x07" +
		"7\x02\x02\u04AB\u04AA\x03\x02\x02\x02\u04AB\u04AC\x03\x02\x02\x02\u04AC" +
		"\u04AE\x03\x02\x02\x02\u04AD\u0482\x03\x02\x02\x02\u04AD\u0483\x03\x02" +
		"\x02\x02\u04AD\u0487\x03\x02\x02\x02\u04AD\u048C\x03\x02\x02\x02\u04AD" +
		"\u0490\x03\x02\x02\x02\u04AD\u0494\x03\x02\x02\x02\u04AD\u0497\x03\x02" +
		"\x02\x02\u04AD\u049E\x03\x02\x02\x02\u04AD\u04A4\x03\x02\x02\x02\u04AD" +
		"\u04A9\x03\x02\x02\x02\u04AE\xAF\x03\x02\x02\x02\x97\xB3\xC3\xD1\xD5\xDA" +
		"\xE7\xEF\xF5\xFD\u0108\u010A\u0111\u0115\u011C\u0124\u012D\u0135\u013A" +
		"\u0141\u0149\u014F\u0152\u0155\u0159\u015F\u0165\u016A\u0174\u0177\u017A" +
		"\u017F\u0183\u0188\u018B\u018F\u0191\u0195\u019D\u01A5\u01A7\u01AB\u01AE" +
		"\u01BA\u01C0\u01C6\u01CF\u01D6\u01DA\u01DC\u01E1\u01E7\u01F3\u01F9\u01FF" +
		"\u0201\u0207\u020B\u020E\u0212\u0218\u021D\u021F\u0224\u022B\u022E\u0234" +
		"\u0239\u023D\u0242\u0248\u024F\u0252\u0256\u025D\u0263\u0266\u0269\u026E" +
		"\u0271\u0276\u0279\u027B\u0281\u0286\u029A\u02A0\u02A7\u02AD\u02B3\u02C2" +
		"\u02CA\u02D0\u02DF\u02E3\u02E5\u02F4\u02FD\u0305\u030D\u0311\u0315\u031F" +
		"\u0327\u032D\u0334\u033A\u033F\u0342\u034F\u0357\u0360\u0365\u0372\u038B" +
		"\u0393\u039A\u03A2\u03AA\u03B2\u03BA\u03C2\u03C9\u03DA\u03E2\u03EC\u03F4" +
		"\u03FC\u040F\u0417\u041E\u0423\u0430\u0434\u0438\u0440\u0444\u0449\u044E" +
		"\u0452\u045E\u046B\u0472\u0476\u047F\u049C\u04A2\u04A7\u04AB\u04AD";
	public static readonly _serializedATN: string = Utils.join(
		[
			Tads3v2Parser._serializedATNSegment0,
			Tads3v2Parser._serializedATNSegment1,
			Tads3v2Parser._serializedATNSegment2,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!Tads3v2Parser.__ATN) {
			Tads3v2Parser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(Tads3v2Parser._serializedATN));
		}

		return Tads3v2Parser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public _directive!: DirectiveContext;
	public _directives: DirectiveContext[] = [];
	public EOF(): TerminalNode { return this.getToken(Tads3v2Parser.EOF, 0); }
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_program; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_directive; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterDirective) {
			listener.enterDirective(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitDirective) {
			listener.exitDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitDirective) {
			return visitor.visitDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PragmaDirectiveContext extends ParserRuleContext {
	public HASH(): TerminalNode { return this.getToken(Tads3v2Parser.HASH, 0); }
	public PRAGMA(): TerminalNode { return this.getToken(Tads3v2Parser.PRAGMA, 0); }
	public ID(): TerminalNode { return this.getToken(Tads3v2Parser.ID, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_pragmaDirective; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterPragmaDirective) {
			listener.enterPragmaDirective(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitPragmaDirective) {
			listener.exitPragmaDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
			return this.getTokens(Tads3v2Parser.BITWISE_OR);
		} else {
			return this.getToken(Tads3v2Parser.BITWISE_OR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_grammarRules; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterGrammarRules) {
			listener.enterGrammarRules(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitGrammarRules) {
			listener.exitGrammarRules(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_itemList; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterItemList) {
			listener.enterItemList(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitItemList) {
			listener.exitItemList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitItemList) {
			return visitor.visitItemList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiersContext extends ParserRuleContext {
	public LEFT_BRACKET(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_BRACKET, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public NR(): TerminalNode { return this.getToken(Tads3v2Parser.NR, 0); }
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_BRACKET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_qualifiers; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterQualifiers) {
			listener.enterQualifiers(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitQualifiers) {
			listener.exitQualifiers(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitQualifiers) {
			return visitor.visitQualifiers(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ItemContext extends ParserRuleContext {
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public item(): ItemContext[];
	public item(i: number): ItemContext;
	public item(i?: number): ItemContext | ItemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ItemContext);
		} else {
			return this.getRuleContext(i, ItemContext);
		}
	}
	public BITWISE_OR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.BITWISE_OR, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_item; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterItem) {
			listener.enterItem(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitItem) {
			listener.exitItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitItem) {
			return visitor.visitItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplateDeclarationContext extends ParserRuleContext {
	public _className!: IdentifierAtomContext;
	public _templateDefItem!: TemplateDefItemContext;
	public _items: TemplateDefItemContext[] = [];
	public _templateId!: IdentifierAtomContext;
	public TEMPLATE(): TerminalNode { return this.getToken(Tads3v2Parser.TEMPLATE, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public templateDefItem(): TemplateDefItemContext[];
	public templateDefItem(i: number): TemplateDefItemContext;
	public templateDefItem(i?: number): TemplateDefItemContext | TemplateDefItemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TemplateDefItemContext);
		} else {
			return this.getRuleContext(i, TemplateDefItemContext);
		}
	}
	public STRING(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STRING, 0); }
	public ARITHMETIC_LEFT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ARITHMETIC_LEFT, 0); }
	public ARITHMETIC_RIGHT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ARITHMETIC_RIGHT, 0); }
	public STAR(): TerminalNode[];
	public STAR(i: number): TerminalNode;
	public STAR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.STAR);
		} else {
			return this.getToken(Tads3v2Parser.STAR, i);
		}
	}
	public IS(): TerminalNode[];
	public IS(i: number): TerminalNode;
	public IS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.IS);
		} else {
			return this.getToken(Tads3v2Parser.IS, i);
		}
	}
	public IN(): TerminalNode[];
	public IN(i: number): TerminalNode;
	public IN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.IN);
		} else {
			return this.getToken(Tads3v2Parser.IN, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_templateDeclaration; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterTemplateDeclaration) {
			listener.enterTemplateDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitTemplateDeclaration) {
			listener.exitTemplateDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitTemplateDeclaration) {
			return visitor.visitTemplateDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumDeclarationContext extends ParserRuleContext {
	public _isToken!: Token;
	public ENUM(): TerminalNode { return this.getToken(Tads3v2Parser.ENUM, 0); }
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.COMMA);
		} else {
			return this.getToken(Tads3v2Parser.COMMA, i);
		}
	}
	public TOKEN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.TOKEN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_enumDeclaration; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterEnumDeclaration) {
			listener.enterEnumDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitEnumDeclaration) {
			listener.exitEnumDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public PROPERTY(): TerminalNode { return this.getToken(Tads3v2Parser.PROPERTY, 0); }
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
			return this.getTokens(Tads3v2Parser.COMMA);
		} else {
			return this.getToken(Tads3v2Parser.COMMA, i);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.PLUS);
		} else {
			return this.getToken(Tads3v2Parser.PLUS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_propertyDeclaration; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterPropertyDeclaration) {
			listener.enterPropertyDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitPropertyDeclaration) {
			listener.exitPropertyDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public DICTIONARY(): TerminalNode { return this.getToken(Tads3v2Parser.DICTIONARY, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
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
			return this.getTokens(Tads3v2Parser.COMMA);
		} else {
			return this.getToken(Tads3v2Parser.COMMA, i);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.PLUS);
		} else {
			return this.getToken(Tads3v2Parser.PLUS, i);
		}
	}
	public PROPERTY(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.PROPERTY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_dictionaryDeclaration; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterDictionaryDeclaration) {
			listener.enterDictionaryDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitDictionaryDeclaration) {
			listener.exitDictionaryDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitDictionaryDeclaration) {
			return visitor.visitDictionaryDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExportDeclarationContext extends ParserRuleContext {
	public EXPORT(): TerminalNode { return this.getToken(Tads3v2Parser.EXPORT, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public SSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.SSTR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_exportDeclaration; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterExportDeclaration) {
			listener.enterExportDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitExportDeclaration) {
			listener.exitExportDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public INTRINSIC(): TerminalNode { return this.getToken(Tads3v2Parser.INTRINSIC, 0); }
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_CURLY, 0); }
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.CLASS, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.COLON, 0); }
	public superTypes(): SuperTypesContext | undefined {
		return this.tryGetRuleContext(0, SuperTypesContext);
	}
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public SSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.SSTR, 0); }
	public DSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.DSTR, 0); }
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_intrinsicDeclaration; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterIntrinsicDeclaration) {
			listener.enterIntrinsicDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitIntrinsicDeclaration) {
			listener.exitIntrinsicDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STATIC, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_intrinsicMethodDeclaration; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterIntrinsicMethodDeclaration) {
			listener.enterIntrinsicMethodDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitIntrinsicMethodDeclaration) {
			listener.exitIntrinsicMethodDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitIntrinsicMethodDeclaration) {
			return visitor.visitIntrinsicMethodDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectDeclarationContext extends ParserRuleContext {
	public _isModify!: Token;
	public _id!: IdentifierAtomContext;
	public _isReplace!: Token;
	public _isClass!: Token;
	public _PLUS!: Token;
	public _level: Token[] = [];
	public _isTransient!: Token;
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.MODIFY, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public curlyObjectBody(): CurlyObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, CurlyObjectBodyContext);
	}
	public semiColonEndedObjectBody(): SemiColonEndedObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, SemiColonEndedObjectBodyContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.COLON, 0); }
	public superTypes(): SuperTypesContext | undefined {
		return this.tryGetRuleContext(0, SuperTypesContext);
	}
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.REPLACE, 0); }
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.CLASS, 0); }
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.PLUS);
		} else {
			return this.getToken(Tads3v2Parser.PLUS, i);
		}
	}
	public TRANSIENT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.TRANSIENT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_objectDeclaration; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterObjectDeclaration) {
			listener.enterObjectDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitObjectDeclaration) {
			listener.exitObjectDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public GRAMMAR(): TerminalNode { return this.getToken(Tads3v2Parser.GRAMMAR, 0); }
	public COLON(): TerminalNode[];
	public COLON(i: number): TerminalNode;
	public COLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.COLON);
		} else {
			return this.getToken(Tads3v2Parser.COLON, i);
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
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public superTypes(): SuperTypesContext | undefined {
		return this.tryGetRuleContext(0, SuperTypesContext);
	}
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.MODIFY, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.REPLACE, 0); }
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_grammarDeclaration; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterGrammarDeclaration) {
			listener.enterGrammarDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitGrammarDeclaration) {
			listener.exitGrammarDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitGrammarDeclaration) {
			return visitor.visitGrammarDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplateDefItemContext extends ParserRuleContext {
	public _value!: TemplateDefTokenContext;
	public _optional!: Token;
	public _alternative!: Token;
	public templateDefToken(): TemplateDefTokenContext {
		return this.getRuleContext(0, TemplateDefTokenContext);
	}
	public OPTIONAL(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.OPTIONAL, 0); }
	public BITWISE_OR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.BITWISE_OR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_templateDefItem; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterTemplateDefItem) {
			listener.enterTemplateDefItem(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitTemplateDefItem) {
			listener.exitTemplateDefItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitTemplateDefItem) {
			return visitor.visitTemplateDefItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplateDefTokenContext extends ParserRuleContext {
	public _name!: IdentifierAtomContext;
	public SSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.SSTR, 0); }
	public DSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.DSTR, 0); }
	public LEFT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_BRACKET, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public templatePrefixOp(): TemplatePrefixOpContext | undefined {
		return this.tryGetRuleContext(0, TemplatePrefixOpContext);
	}
	public INHERITED(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.INHERITED, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_templateDefToken; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterTemplateDefToken) {
			listener.enterTemplateDefToken(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitTemplateDefToken) {
			listener.exitTemplateDefToken(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitTemplateDefToken) {
			return visitor.visitTemplateDefToken(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplateExprContext extends ParserRuleContext {
	public SSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.SSTR, 0); }
	public DSTR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.DSTR, 0); }
	public LEFT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_BRACKET, 0); }
	public array(): ArrayContext | undefined {
		return this.tryGetRuleContext(0, ArrayContext);
	}
	public templatePrefixOp(): TemplatePrefixOpContext | undefined {
		return this.tryGetRuleContext(0, TemplatePrefixOpContext);
	}
	public primaryExpr(): PrimaryExprContext | undefined {
		return this.tryGetRuleContext(0, PrimaryExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_templateExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterTemplateExpr) {
			listener.enterTemplateExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitTemplateExpr) {
			listener.exitTemplateExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitTemplateExpr) {
			return visitor.visitTemplateExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplatePrefixOpContext extends ParserRuleContext {
	public AT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.AT, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.MINUS, 0); }
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STAR, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.MOD, 0); }
	public ARROW(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ARROW, 0); }
	public AMP(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.AMP, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.NOT, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.TILDE, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.COMMA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_templatePrefixOp; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterTemplatePrefixOp) {
			listener.enterTemplatePrefixOp(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitTemplatePrefixOp) {
			listener.exitTemplatePrefixOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitTemplatePrefixOp) {
			return visitor.visitTemplatePrefixOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayContext extends ParserRuleContext {
	public argExpr(): ArgExprContext[];
	public argExpr(i: number): ArgExprContext;
	public argExpr(i?: number): ArgExprContext | ArgExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ArgExprContext);
		} else {
			return this.getRuleContext(i, ArgExprContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.COMMA);
		} else {
			return this.getToken(Tads3v2Parser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_array; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterArray) {
			listener.enterArray(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitArray) {
			listener.exitArray(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitArray) {
			return visitor.visitArray(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgExprContext extends ParserRuleContext {
	public _name!: Token;
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.COLON, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public ID(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ID, 0); }
	public SPREAD(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.SPREAD, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_argExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterArgExpr) {
			listener.enterArgExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitArgExpr) {
			listener.exitArgExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitArgExpr) {
			return visitor.visitArgExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CurlyObjectBodyContext extends ParserRuleContext {
	public _templateExpr!: TemplateExprContext;
	public _template: TemplateExprContext[] = [];
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_CURLY, 0); }
	public objectBody(): ObjectBodyContext {
		return this.getRuleContext(0, ObjectBodyContext);
	}
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_CURLY, 0); }
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.SEMICOLON, 0); }
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_curlyObjectBody; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterCurlyObjectBody) {
			listener.enterCurlyObjectBody(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitCurlyObjectBody) {
			listener.exitCurlyObjectBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_semiColonEndedObjectBody; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterSemiColonEndedObjectBody) {
			listener.enterSemiColonEndedObjectBody(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitSemiColonEndedObjectBody) {
			listener.exitSemiColonEndedObjectBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
			return this.getTokens(Tads3v2Parser.COMMA);
		} else {
			return this.getToken(Tads3v2Parser.COMMA, i);
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_superTypes; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterSuperTypes) {
			listener.enterSuperTypes(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitSuperTypes) {
			listener.exitSuperTypes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_objectBody; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterObjectBody) {
			listener.enterObjectBody(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitObjectBody) {
			listener.exitObjectBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ASSIGN, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.COLON, 0); }
	public curlyObjectBody(): CurlyObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, CurlyObjectBodyContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public dictionaryProperty(): DictionaryPropertyContext | undefined {
		return this.tryGetRuleContext(0, DictionaryPropertyContext);
	}
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STATIC, 0); }
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.SEMICOLON, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.COMMA);
		} else {
			return this.getToken(Tads3v2Parser.COMMA, i);
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_property; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterProperty) {
			listener.enterProperty(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitProperty) {
			listener.exitProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
			return this.getTokens(Tads3v2Parser.SSTR);
		} else {
			return this.getToken(Tads3v2Parser.SSTR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_dictionaryProperty; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterDictionaryProperty) {
			listener.enterDictionaryProperty(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitDictionaryProperty) {
			listener.exitDictionaryProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitDictionaryProperty) {
			return visitor.visitDictionaryProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertySetContext extends ParserRuleContext {
	public _prefix!: Token;
	public PROPERTYSET(): TerminalNode { return this.getToken(Tads3v2Parser.PROPERTYSET, 0); }
	public curlyObjectBody(): CurlyObjectBodyContext {
		return this.getRuleContext(0, CurlyObjectBodyContext);
	}
	public SSTR(): TerminalNode { return this.getToken(Tads3v2Parser.SSTR, 0); }
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public paramsWithWildcard(): ParamsWithWildcardContext | undefined {
		return this.tryGetRuleContext(0, ParamsWithWildcardContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_propertySet; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterPropertySet) {
			listener.enterPropertySet(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitPropertySet) {
			listener.exitPropertySet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitPropertySet) {
			return visitor.visitPropertySet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamsWithWildcardContext extends ParserRuleContext {
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public STAR(): TerminalNode[];
	public STAR(i: number): TerminalNode;
	public STAR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.STAR);
		} else {
			return this.getToken(Tads3v2Parser.STAR, i);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.COMMA);
		} else {
			return this.getToken(Tads3v2Parser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_paramsWithWildcard; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterParamsWithWildcard) {
			listener.enterParamsWithWildcard(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitParamsWithWildcard) {
			listener.exitParamsWithWildcard(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.MODIFY, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.REPLACE, 0); }
	public operatorOverride(): OperatorOverrideContext | undefined {
		return this.tryGetRuleContext(0, OperatorOverrideContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_functionDeclaration; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterFunctionDeclaration) {
			listener.enterFunctionDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitFunctionDeclaration) {
			listener.exitFunctionDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitFunctionDeclaration) {
			return visitor.visitFunctionDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperatorOverrideContext extends ParserRuleContext {
	public OPERATOR(): TerminalNode { return this.getToken(Tads3v2Parser.OPERATOR, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_CURLY, 0); }
	public LEFT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_BRACKET, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.MINUS, 0); }
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STAR, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.MOD, 0); }
	public POW(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.POW, 0); }
	public ARITHMETIC_LEFT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ARITHMETIC_LEFT, 0); }
	public LOGICAL_RIGHT_SHIFT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LOGICAL_RIGHT_SHIFT, 0); }
	public ARITHMETIC_RIGHT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ARITHMETIC_RIGHT, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.TILDE, 0); }
	public BITWISE_OR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.BITWISE_OR, 0); }
	public AMP(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.AMP, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
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
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ASSIGN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_operatorOverride; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterOperatorOverride) {
			listener.enterOperatorOverride(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitOperatorOverride) {
			listener.exitOperatorOverride(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public FUNCTION(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.FUNCTION, 0); }
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public EXTERN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.EXTERN, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STATIC, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_functionHead; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterFunctionHead) {
			listener.enterFunctionHead(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitFunctionHead) {
			listener.exitFunctionHead(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitFunctionHead) {
			return visitor.visitFunctionHead(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodeBlockContext extends ParserRuleContext {
	public LEFT_CURLY(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_CURLY, 0); }
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_codeBlock; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterCodeBlock) {
			listener.enterCodeBlock(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitCodeBlock) {
			listener.exitCodeBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_stats; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterStats) {
			listener.enterStats(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitStats) {
			listener.exitStats(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitStats) {
			return visitor.visitStats(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InnerCodeBlockContext extends ParserRuleContext {
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_CURLY, 0); }
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_innerCodeBlock; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterInnerCodeBlock) {
			listener.enterInnerCodeBlock(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitInnerCodeBlock) {
			listener.exitInnerCodeBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitInnerCodeBlock) {
			return visitor.visitInnerCodeBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GotoStatementContext extends ParserRuleContext {
	public _label!: IdentifierAtomContext;
	public GOTO(): TerminalNode { return this.getToken(Tads3v2Parser.GOTO, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_gotoStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterGotoStatement) {
			listener.enterGotoStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitGotoStatement) {
			listener.exitGotoStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitGotoStatement) {
			return visitor.visitGotoStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BreakStatementContext extends ParserRuleContext {
	public _label!: IdentifierAtomContext;
	public BREAK(): TerminalNode { return this.getToken(Tads3v2Parser.BREAK, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_breakStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterBreakStatement) {
			listener.enterBreakStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitBreakStatement) {
			listener.exitBreakStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitBreakStatement) {
			return visitor.visitBreakStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContinueStatementContext extends ParserRuleContext {
	public _label!: IdentifierAtomContext;
	public CONTINUE(): TerminalNode { return this.getToken(Tads3v2Parser.CONTINUE, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_continueStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterContinueStatement) {
			listener.enterContinueStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitContinueStatement) {
			listener.exitContinueStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public COLON(): TerminalNode { return this.getToken(Tads3v2Parser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_labelStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterLabelStatement) {
			listener.enterLabelStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitLabelStatement) {
			listener.exitLabelStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitLabelStatement) {
			return visitor.visitLabelStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwitchStatementContext extends ParserRuleContext {
	public _discriminant!: ExprContext;
	public _switchCase!: SwitchCaseContext;
	public _cases: SwitchCaseContext[] = [];
	public SWITCH(): TerminalNode { return this.getToken(Tads3v2Parser.SWITCH, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_CURLY, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public switchCase(): SwitchCaseContext[];
	public switchCase(i: number): SwitchCaseContext;
	public switchCase(i?: number): SwitchCaseContext | SwitchCaseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SwitchCaseContext);
		} else {
			return this.getRuleContext(i, SwitchCaseContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_switchStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterSwitchStatement) {
			listener.enterSwitchStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitSwitchStatement) {
			listener.exitSwitchStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitSwitchStatement) {
			return visitor.visitSwitchStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwitchCaseContext extends ParserRuleContext {
	public _test!: ExprContext;
	public _isDefault!: Token;
	public _stats!: StatsContext;
	public _body: StatsContext[] = [];
	public COLON(): TerminalNode { return this.getToken(Tads3v2Parser.COLON, 0); }
	public CASE(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.CASE, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.DEFAULT, 0); }
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_switchCase; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterSwitchCase) {
			listener.enterSwitchCase(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitSwitchCase) {
			listener.exitSwitchCase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitSwitchCase) {
			return visitor.visitSwitchCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ThrowStatementContext extends ParserRuleContext {
	public THROW(): TerminalNode { return this.getToken(Tads3v2Parser.THROW, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_throwStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterThrowStatement) {
			listener.enterThrowStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitThrowStatement) {
			listener.exitThrowStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitThrowStatement) {
			return visitor.visitThrowStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForInStatementContext extends ParserRuleContext {
	public _iterable!: ExprContext;
	public _cond!: ExprContext;
	public FOR(): TerminalNode { return this.getToken(Tads3v2Parser.FOR, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public LOCAL(): TerminalNode { return this.getToken(Tads3v2Parser.LOCAL, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public IN(): TerminalNode { return this.getToken(Tads3v2Parser.IN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_PAREN, 0); }
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
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.SEMICOLON);
		} else {
			return this.getToken(Tads3v2Parser.SEMICOLON, i);
		}
	}
	public forUpdate(): ForUpdateContext | undefined {
		return this.tryGetRuleContext(0, ForUpdateContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_forInStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterForInStatement) {
			listener.enterForInStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitForInStatement) {
			listener.exitForInStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitForInStatement) {
			return visitor.visitForInStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForEachStatementContext extends ParserRuleContext {
	public FOREACH(): TerminalNode { return this.getToken(Tads3v2Parser.FOREACH, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public IN(): TerminalNode { return this.getToken(Tads3v2Parser.IN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_forEachStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterForEachStatement) {
			listener.enterForEachStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitForEachStatement) {
			listener.exitForEachStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitForEachStatement) {
			return visitor.visitForEachStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnStatementContext extends ParserRuleContext {
	public RETURN(): TerminalNode { return this.getToken(Tads3v2Parser.RETURN, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_returnStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterReturnStatement) {
			listener.enterReturnStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitReturnStatement) {
			listener.exitReturnStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitReturnStatement) {
			return visitor.visitReturnStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DoWhileStatementContext extends ParserRuleContext {
	public DO(): TerminalNode { return this.getToken(Tads3v2Parser.DO, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	public WHILE(): TerminalNode { return this.getToken(Tads3v2Parser.WHILE, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_doWhileStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterDoWhileStatement) {
			listener.enterDoWhileStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitDoWhileStatement) {
			listener.exitDoWhileStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitDoWhileStatement) {
			return visitor.visitDoWhileStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhileStatementContext extends ParserRuleContext {
	public WHILE(): TerminalNode { return this.getToken(Tads3v2Parser.WHILE, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_PAREN, 0); }
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_whileStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterWhileStatement) {
			listener.enterWhileStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitWhileStatement) {
			listener.exitWhileStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitWhileStatement) {
			return visitor.visitWhileStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForStatementContext extends ParserRuleContext {
	public _cond!: ExprContext;
	public FOR(): TerminalNode { return this.getToken(Tads3v2Parser.FOR, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.SEMICOLON);
		} else {
			return this.getToken(Tads3v2Parser.SEMICOLON, i);
		}
	}
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	public forInit(): ForInitContext | undefined {
		return this.tryGetRuleContext(0, ForInitContext);
	}
	public forUpdate(): ForUpdateContext | undefined {
		return this.tryGetRuleContext(0, ForUpdateContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_forStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterForStatement) {
			listener.enterForStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitForStatement) {
			listener.exitForStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitForStatement) {
			return visitor.visitForStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForUpdateContext extends ParserRuleContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.COMMA);
		} else {
			return this.getToken(Tads3v2Parser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_forUpdate; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterForUpdate) {
			listener.enterForUpdate(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitForUpdate) {
			listener.exitForUpdate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitForUpdate) {
			return visitor.visitForUpdate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForInitContext extends ParserRuleContext {
	public forInitItem(): ForInitItemContext[];
	public forInitItem(i: number): ForInitItemContext;
	public forInitItem(i?: number): ForInitItemContext | ForInitItemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ForInitItemContext);
		} else {
			return this.getRuleContext(i, ForInitItemContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.COMMA);
		} else {
			return this.getToken(Tads3v2Parser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_forInit; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterForInit) {
			listener.enterForInit(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitForInit) {
			listener.exitForInit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitForInit) {
			return visitor.visitForInit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForInitItemContext extends ParserRuleContext {
	public LOCAL(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LOCAL, 0); }
	public localVarDecl(): LocalVarDeclContext | undefined {
		return this.tryGetRuleContext(0, LocalVarDeclContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_forInitItem; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterForInitItem) {
			listener.enterForInitItem(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitForInitItem) {
			listener.exitForInitItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitForInitItem) {
			return visitor.visitForInitItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TryCatchStatementContext extends ParserRuleContext {
	public TRY(): TerminalNode { return this.getToken(Tads3v2Parser.TRY, 0); }
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
			return this.getTokens(Tads3v2Parser.CATCH);
		} else {
			return this.getToken(Tads3v2Parser.CATCH, i);
		}
	}
	public LEFT_PAREN(): TerminalNode[];
	public LEFT_PAREN(i: number): TerminalNode;
	public LEFT_PAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.LEFT_PAREN);
		} else {
			return this.getToken(Tads3v2Parser.LEFT_PAREN, i);
		}
	}
	public RIGHT_PAREN(): TerminalNode[];
	public RIGHT_PAREN(i: number): TerminalNode;
	public RIGHT_PAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.RIGHT_PAREN);
		} else {
			return this.getToken(Tads3v2Parser.RIGHT_PAREN, i);
		}
	}
	public FINALLY(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.FINALLY, 0); }
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_tryCatchStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterTryCatchStatement) {
			listener.enterTryCatchStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitTryCatchStatement) {
			listener.exitTryCatchStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitTryCatchStatement) {
			return visitor.visitTryCatchStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EmptyStatementContext extends ParserRuleContext {
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_emptyStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterEmptyStatement) {
			listener.enterEmptyStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitEmptyStatement) {
			listener.exitEmptyStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitEmptyStatement) {
			return visitor.visitEmptyStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SayStatementContext extends ParserRuleContext {
	public DSTR(): TerminalNode { return this.getToken(Tads3v2Parser.DSTR, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_sayStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterSayStatement) {
			listener.enterSayStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitSayStatement) {
			listener.exitSayStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitSayStatement) {
			return visitor.visitSayStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentStatementContext extends ParserRuleContext {
	public LOCAL(): TerminalNode { return this.getToken(Tads3v2Parser.LOCAL, 0); }
	public localVarDecl(): LocalVarDeclContext[];
	public localVarDecl(i: number): LocalVarDeclContext;
	public localVarDecl(i?: number): LocalVarDeclContext | LocalVarDeclContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LocalVarDeclContext);
		} else {
			return this.getRuleContext(i, LocalVarDeclContext);
		}
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads3v2Parser.SEMICOLON, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.COMMA);
		} else {
			return this.getToken(Tads3v2Parser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_assignmentStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterAssignmentStatement) {
			listener.enterAssignmentStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitAssignmentStatement) {
			listener.exitAssignmentStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitAssignmentStatement) {
			return visitor.visitAssignmentStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocalVarDeclContext extends ParserRuleContext {
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ASSIGN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_localVarDecl; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterLocalVarDecl) {
			listener.enterLocalVarDecl(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitLocalVarDecl) {
			listener.exitLocalVarDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitLocalVarDecl) {
			return visitor.visitLocalVarDecl(this);
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
			return this.getTokens(Tads3v2Parser.IF);
		} else {
			return this.getToken(Tads3v2Parser.IF, i);
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
			return this.getTokens(Tads3v2Parser.ELSE);
		} else {
			return this.getToken(Tads3v2Parser.ELSE, i);
		}
	}
	public codeBlock(): CodeBlockContext | undefined {
		return this.tryGetRuleContext(0, CodeBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_ifStatement; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterIfStatement) {
			listener.enterIfStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitIfStatement) {
			listener.exitIfStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitIfStatement) {
			return visitor.visitIfStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnclosedExprCodeBlockContext extends ParserRuleContext {
	public _expression!: ExprContext;
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_PAREN, 0); }
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_enclosedExprCodeBlock; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterEnclosedExprCodeBlock) {
			listener.enterEnclosedExprCodeBlock(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitEnclosedExprCodeBlock) {
			listener.exitEnclosedExprCodeBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitEnclosedExprCodeBlock) {
			return visitor.visitEnclosedExprCodeBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	public assignmentExpr(): AssignmentExprContext {
		return this.getRuleContext(0, AssignmentExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_expr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterExpr) {
			listener.enterExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitExpr) {
			listener.exitExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitExpr) {
			return visitor.visitExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentExprContext extends ParserRuleContext {
	public conditionalExpr(): ConditionalExprContext {
		return this.getRuleContext(0, ConditionalExprContext);
	}
	public assignmentOp(): AssignmentOpContext | undefined {
		return this.tryGetRuleContext(0, AssignmentOpContext);
	}
	public assignmentExpr(): AssignmentExprContext | undefined {
		return this.tryGetRuleContext(0, AssignmentExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_assignmentExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterAssignmentExpr) {
			listener.enterAssignmentExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitAssignmentExpr) {
			listener.exitAssignmentExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitAssignmentExpr) {
			return visitor.visitAssignmentExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentOpContext extends ParserRuleContext {
	public ASSIGN(): TerminalNode { return this.getToken(Tads3v2Parser.ASSIGN, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.MINUS, 0); }
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STAR, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.MOD, 0); }
	public BITWISE_OR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.BITWISE_OR, 0); }
	public AMP(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.AMP, 0); }
	public POW(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.POW, 0); }
	public ARITHMETIC_LEFT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ARITHMETIC_LEFT, 0); }
	public ARITHMETIC_RIGHT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ARITHMETIC_RIGHT, 0); }
	public LOGICAL_RIGHT_SHIFT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LOGICAL_RIGHT_SHIFT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_assignmentOp; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterAssignmentOp) {
			listener.enterAssignmentOp(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitAssignmentOp) {
			listener.exitAssignmentOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitAssignmentOp) {
			return visitor.visitAssignmentOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionalExprContext extends ParserRuleContext {
	public ifNilExpr(): IfNilExprContext {
		return this.getRuleContext(0, IfNilExprContext);
	}
	public OPTIONAL(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.OPTIONAL, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.COLON, 0); }
	public conditionalExpr(): ConditionalExprContext | undefined {
		return this.tryGetRuleContext(0, ConditionalExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_conditionalExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterConditionalExpr) {
			listener.enterConditionalExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitConditionalExpr) {
			listener.exitConditionalExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitConditionalExpr) {
			return visitor.visitConditionalExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfNilExprContext extends ParserRuleContext {
	public logicalOrExpr(): LogicalOrExprContext[];
	public logicalOrExpr(i: number): LogicalOrExprContext;
	public logicalOrExpr(i?: number): LogicalOrExprContext | LogicalOrExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LogicalOrExprContext);
		} else {
			return this.getRuleContext(i, LogicalOrExprContext);
		}
	}
	public IFNIL(): TerminalNode[];
	public IFNIL(i: number): TerminalNode;
	public IFNIL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.IFNIL);
		} else {
			return this.getToken(Tads3v2Parser.IFNIL, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_ifNilExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterIfNilExpr) {
			listener.enterIfNilExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitIfNilExpr) {
			listener.exitIfNilExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitIfNilExpr) {
			return visitor.visitIfNilExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogicalOrExprContext extends ParserRuleContext {
	public logicalAndExpr(): LogicalAndExprContext[];
	public logicalAndExpr(i: number): LogicalAndExprContext;
	public logicalAndExpr(i?: number): LogicalAndExprContext | LogicalAndExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LogicalAndExprContext);
		} else {
			return this.getRuleContext(i, LogicalAndExprContext);
		}
	}
	public OR(): TerminalNode[];
	public OR(i: number): TerminalNode;
	public OR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.OR);
		} else {
			return this.getToken(Tads3v2Parser.OR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_logicalOrExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterLogicalOrExpr) {
			listener.enterLogicalOrExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitLogicalOrExpr) {
			listener.exitLogicalOrExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitLogicalOrExpr) {
			return visitor.visitLogicalOrExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogicalAndExprContext extends ParserRuleContext {
	public bitwiseOrExpr(): BitwiseOrExprContext[];
	public bitwiseOrExpr(i: number): BitwiseOrExprContext;
	public bitwiseOrExpr(i?: number): BitwiseOrExprContext | BitwiseOrExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BitwiseOrExprContext);
		} else {
			return this.getRuleContext(i, BitwiseOrExprContext);
		}
	}
	public AND(): TerminalNode[];
	public AND(i: number): TerminalNode;
	public AND(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.AND);
		} else {
			return this.getToken(Tads3v2Parser.AND, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_logicalAndExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterLogicalAndExpr) {
			listener.enterLogicalAndExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitLogicalAndExpr) {
			listener.exitLogicalAndExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitLogicalAndExpr) {
			return visitor.visitLogicalAndExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BitwiseOrExprContext extends ParserRuleContext {
	public bitwiseXorExpr(): BitwiseXorExprContext[];
	public bitwiseXorExpr(i: number): BitwiseXorExprContext;
	public bitwiseXorExpr(i?: number): BitwiseXorExprContext | BitwiseXorExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BitwiseXorExprContext);
		} else {
			return this.getRuleContext(i, BitwiseXorExprContext);
		}
	}
	public BITWISE_OR(): TerminalNode[];
	public BITWISE_OR(i: number): TerminalNode;
	public BITWISE_OR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.BITWISE_OR);
		} else {
			return this.getToken(Tads3v2Parser.BITWISE_OR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_bitwiseOrExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterBitwiseOrExpr) {
			listener.enterBitwiseOrExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitBitwiseOrExpr) {
			listener.exitBitwiseOrExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitBitwiseOrExpr) {
			return visitor.visitBitwiseOrExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BitwiseXorExprContext extends ParserRuleContext {
	public bitwiseAndExpr(): BitwiseAndExprContext[];
	public bitwiseAndExpr(i: number): BitwiseAndExprContext;
	public bitwiseAndExpr(i?: number): BitwiseAndExprContext | BitwiseAndExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BitwiseAndExprContext);
		} else {
			return this.getRuleContext(i, BitwiseAndExprContext);
		}
	}
	public POW(): TerminalNode[];
	public POW(i: number): TerminalNode;
	public POW(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.POW);
		} else {
			return this.getToken(Tads3v2Parser.POW, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_bitwiseXorExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterBitwiseXorExpr) {
			listener.enterBitwiseXorExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitBitwiseXorExpr) {
			listener.exitBitwiseXorExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitBitwiseXorExpr) {
			return visitor.visitBitwiseXorExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BitwiseAndExprContext extends ParserRuleContext {
	public equalityExpr(): EqualityExprContext[];
	public equalityExpr(i: number): EqualityExprContext;
	public equalityExpr(i?: number): EqualityExprContext | EqualityExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EqualityExprContext);
		} else {
			return this.getRuleContext(i, EqualityExprContext);
		}
	}
	public AMP(): TerminalNode[];
	public AMP(i: number): TerminalNode;
	public AMP(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.AMP);
		} else {
			return this.getToken(Tads3v2Parser.AMP, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_bitwiseAndExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterBitwiseAndExpr) {
			listener.enterBitwiseAndExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitBitwiseAndExpr) {
			listener.exitBitwiseAndExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitBitwiseAndExpr) {
			return visitor.visitBitwiseAndExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EqualityExprContext extends ParserRuleContext {
	public relationalExpr(): RelationalExprContext {
		return this.getRuleContext(0, RelationalExprContext);
	}
	public equalitySuffix(): EqualitySuffixContext[];
	public equalitySuffix(i: number): EqualitySuffixContext;
	public equalitySuffix(i?: number): EqualitySuffixContext | EqualitySuffixContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EqualitySuffixContext);
		} else {
			return this.getRuleContext(i, EqualitySuffixContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_equalityExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterEqualityExpr) {
			listener.enterEqualityExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitEqualityExpr) {
			listener.exitEqualityExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitEqualityExpr) {
			return visitor.visitEqualityExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EqualitySuffixContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_equalitySuffix; }
	public copyFrom(ctx: EqualitySuffixContext): void {
		super.copyFrom(ctx);
	}
}
export class EqNeqSuffixContext extends EqualitySuffixContext {
	public relationalExpr(): RelationalExprContext {
		return this.getRuleContext(0, RelationalExprContext);
	}
	public EQ(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.EQ, 0); }
	public NEQ(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.NEQ, 0); }
	constructor(ctx: EqualitySuffixContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterEqNeqSuffix) {
			listener.enterEqNeqSuffix(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitEqNeqSuffix) {
			listener.exitEqNeqSuffix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitEqNeqSuffix) {
			return visitor.visitEqNeqSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IsInSuffixContext extends EqualitySuffixContext {
	public IS(): TerminalNode { return this.getToken(Tads3v2Parser.IS, 0); }
	public IN(): TerminalNode { return this.getToken(Tads3v2Parser.IN, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public array(): ArrayContext {
		return this.getRuleContext(0, ArrayContext);
	}
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	constructor(ctx: EqualitySuffixContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterIsInSuffix) {
			listener.enterIsInSuffix(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitIsInSuffix) {
			listener.exitIsInSuffix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitIsInSuffix) {
			return visitor.visitIsInSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotInSuffixContext extends EqualitySuffixContext {
	public LITERAL_NOT(): TerminalNode { return this.getToken(Tads3v2Parser.LITERAL_NOT, 0); }
	public IN(): TerminalNode { return this.getToken(Tads3v2Parser.IN, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public array(): ArrayContext {
		return this.getRuleContext(0, ArrayContext);
	}
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	constructor(ctx: EqualitySuffixContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterNotInSuffix) {
			listener.enterNotInSuffix(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitNotInSuffix) {
			listener.exitNotInSuffix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitNotInSuffix) {
			return visitor.visitNotInSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelationalExprContext extends ParserRuleContext {
	public shiftExpr(): ShiftExprContext[];
	public shiftExpr(i: number): ShiftExprContext;
	public shiftExpr(i?: number): ShiftExprContext | ShiftExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ShiftExprContext);
		} else {
			return this.getRuleContext(i, ShiftExprContext);
		}
	}
	public relationalOp(): RelationalOpContext[];
	public relationalOp(i: number): RelationalOpContext;
	public relationalOp(i?: number): RelationalOpContext | RelationalOpContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RelationalOpContext);
		} else {
			return this.getRuleContext(i, RelationalOpContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_relationalExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterRelationalExpr) {
			listener.enterRelationalExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitRelationalExpr) {
			listener.exitRelationalExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitRelationalExpr) {
			return visitor.visitRelationalExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelationalOpContext extends ParserRuleContext {
	public LT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.GT, 0); }
	public LTEQ(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LTEQ, 0); }
	public GTEQ(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.GTEQ, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_relationalOp; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterRelationalOp) {
			listener.enterRelationalOp(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitRelationalOp) {
			listener.exitRelationalOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitRelationalOp) {
			return visitor.visitRelationalOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ShiftExprContext extends ParserRuleContext {
	public additiveExpr(): AdditiveExprContext[];
	public additiveExpr(i: number): AdditiveExprContext;
	public additiveExpr(i?: number): AdditiveExprContext | AdditiveExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AdditiveExprContext);
		} else {
			return this.getRuleContext(i, AdditiveExprContext);
		}
	}
	public ARITHMETIC_LEFT(): TerminalNode[];
	public ARITHMETIC_LEFT(i: number): TerminalNode;
	public ARITHMETIC_LEFT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.ARITHMETIC_LEFT);
		} else {
			return this.getToken(Tads3v2Parser.ARITHMETIC_LEFT, i);
		}
	}
	public ARITHMETIC_RIGHT(): TerminalNode[];
	public ARITHMETIC_RIGHT(i: number): TerminalNode;
	public ARITHMETIC_RIGHT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.ARITHMETIC_RIGHT);
		} else {
			return this.getToken(Tads3v2Parser.ARITHMETIC_RIGHT, i);
		}
	}
	public LOGICAL_RIGHT_SHIFT(): TerminalNode[];
	public LOGICAL_RIGHT_SHIFT(i: number): TerminalNode;
	public LOGICAL_RIGHT_SHIFT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.LOGICAL_RIGHT_SHIFT);
		} else {
			return this.getToken(Tads3v2Parser.LOGICAL_RIGHT_SHIFT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_shiftExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterShiftExpr) {
			listener.enterShiftExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitShiftExpr) {
			listener.exitShiftExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitShiftExpr) {
			return visitor.visitShiftExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AdditiveExprContext extends ParserRuleContext {
	public multiplicativeExpr(): MultiplicativeExprContext[];
	public multiplicativeExpr(i: number): MultiplicativeExprContext;
	public multiplicativeExpr(i?: number): MultiplicativeExprContext | MultiplicativeExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MultiplicativeExprContext);
		} else {
			return this.getRuleContext(i, MultiplicativeExprContext);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.PLUS);
		} else {
			return this.getToken(Tads3v2Parser.PLUS, i);
		}
	}
	public MINUS(): TerminalNode[];
	public MINUS(i: number): TerminalNode;
	public MINUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.MINUS);
		} else {
			return this.getToken(Tads3v2Parser.MINUS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_additiveExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterAdditiveExpr) {
			listener.enterAdditiveExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitAdditiveExpr) {
			listener.exitAdditiveExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitAdditiveExpr) {
			return visitor.visitAdditiveExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultiplicativeExprContext extends ParserRuleContext {
	public unaryExpr(): UnaryExprContext[];
	public unaryExpr(i: number): UnaryExprContext;
	public unaryExpr(i?: number): UnaryExprContext | UnaryExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(UnaryExprContext);
		} else {
			return this.getRuleContext(i, UnaryExprContext);
		}
	}
	public STAR(): TerminalNode[];
	public STAR(i: number): TerminalNode;
	public STAR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.STAR);
		} else {
			return this.getToken(Tads3v2Parser.STAR, i);
		}
	}
	public DIV(): TerminalNode[];
	public DIV(i: number): TerminalNode;
	public DIV(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.DIV);
		} else {
			return this.getToken(Tads3v2Parser.DIV, i);
		}
	}
	public MOD(): TerminalNode[];
	public MOD(i: number): TerminalNode;
	public MOD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.MOD);
		} else {
			return this.getToken(Tads3v2Parser.MOD, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_multiplicativeExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterMultiplicativeExpr) {
			listener.enterMultiplicativeExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitMultiplicativeExpr) {
			listener.exitMultiplicativeExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitMultiplicativeExpr) {
			return visitor.visitMultiplicativeExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnaryExprContext extends ParserRuleContext {
	public prefixOp(): PrefixOpContext | undefined {
		return this.tryGetRuleContext(0, PrefixOpContext);
	}
	public unaryExpr(): UnaryExprContext | undefined {
		return this.tryGetRuleContext(0, UnaryExprContext);
	}
	public NEW(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.NEW, 0); }
	public DELEGATED(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.DELEGATED, 0); }
	public INHERITED(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.INHERITED, 0); }
	public TRANSIENT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.TRANSIENT, 0); }
	public LOCAL(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LOCAL, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STATIC, 0); }
	public postfixExpr(): PostfixExprContext | undefined {
		return this.tryGetRuleContext(0, PostfixExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_unaryExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterUnaryExpr) {
			listener.enterUnaryExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitUnaryExpr) {
			listener.exitUnaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitUnaryExpr) {
			return visitor.visitUnaryExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrefixOpContext extends ParserRuleContext {
	public NOT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.NOT, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.MINUS, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.TILDE, 0); }
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STAR, 0); }
	public AMP(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.AMP, 0); }
	public AT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.AT, 0); }
	public LITERAL_NOT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LITERAL_NOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_prefixOp; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterPrefixOp) {
			listener.enterPrefixOp(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitPrefixOp) {
			listener.exitPrefixOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitPrefixOp) {
			return visitor.visitPrefixOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PostfixExprContext extends ParserRuleContext {
	public primaryExpr(): PrimaryExprContext {
		return this.getRuleContext(0, PrimaryExprContext);
	}
	public postfixSuffix(): PostfixSuffixContext[];
	public postfixSuffix(i: number): PostfixSuffixContext;
	public postfixSuffix(i?: number): PostfixSuffixContext | PostfixSuffixContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PostfixSuffixContext);
		} else {
			return this.getRuleContext(i, PostfixSuffixContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_postfixExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterPostfixExpr) {
			listener.enterPostfixExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitPostfixExpr) {
			listener.exitPostfixExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitPostfixExpr) {
			return visitor.visitPostfixExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PostfixSuffixContext extends ParserRuleContext {
	public DOT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.DOT, 0); }
	public memberExpr(): MemberExprContext | undefined {
		return this.tryGetRuleContext(0, MemberExprContext);
	}
	public LEFT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_BRACKET, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public array(): ArrayContext | undefined {
		return this.tryGetRuleContext(0, ArrayContext);
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.PLUS);
		} else {
			return this.getToken(Tads3v2Parser.PLUS, i);
		}
	}
	public MINUS(): TerminalNode[];
	public MINUS(i: number): TerminalNode;
	public MINUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.MINUS);
		} else {
			return this.getToken(Tads3v2Parser.MINUS, i);
		}
	}
	public ARROW(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ARROW, 0); }
	public RANGE(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RANGE, 0); }
	public STEP(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STEP, 0); }
	public LEFT_CURLY(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_CURLY, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.COLON, 0); }
	public RIGHT_CURLY(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_CURLY, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	public superTypes(): SuperTypesContext | undefined {
		return this.tryGetRuleContext(0, SuperTypesContext);
	}
	public curlyObjectBody(): CurlyObjectBodyContext | undefined {
		return this.tryGetRuleContext(0, CurlyObjectBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_postfixSuffix; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterPostfixSuffix) {
			listener.enterPostfixSuffix(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitPostfixSuffix) {
			listener.exitPostfixSuffix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitPostfixSuffix) {
			return visitor.visitPostfixSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryExprContext extends ParserRuleContext {
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	public array(): ArrayContext | undefined {
		return this.tryGetRuleContext(0, ArrayContext);
	}
	public LEFT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_BRACKET, 0); }
	public LEFT_CURLY(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_CURLY, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.COLON, 0); }
	public RIGHT_CURLY(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_CURLY, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public ARROW(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ARROW, 0); }
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STAR, 0); }
	public DOT(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.DOT, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public functionDeclaration(): FunctionDeclarationContext | undefined {
		return this.tryGetRuleContext(0, FunctionDeclarationContext);
	}
	public primary(): PrimaryContext | undefined {
		return this.tryGetRuleContext(0, PrimaryContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_primaryExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterPrimaryExpr) {
			listener.enterPrimaryExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitPrimaryExpr) {
			listener.exitPrimaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitPrimaryExpr) {
			return visitor.visitPrimaryExpr(this);
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
	public get ruleIndex(): number { return Tads3v2Parser.RULE_primary; }
	public copyFrom(ctx: PrimaryContext): void {
		super.copyFrom(ctx);
	}
}
export class InheritedAtomContext extends PrimaryContext {
	public INHERITED(): TerminalNode { return this.getToken(Tads3v2Parser.INHERITED, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterInheritedAtom) {
			listener.enterInheritedAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitInheritedAtom) {
			listener.exitInheritedAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitInheritedAtom) {
			return visitor.visitInheritedAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class HexAtomContext extends PrimaryContext {
	public HEX(): TerminalNode { return this.getToken(Tads3v2Parser.HEX, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterHexAtom) {
			listener.enterHexAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitHexAtom) {
			listener.exitHexAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitHexAtom) {
			return visitor.visitHexAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberAtomContext extends PrimaryContext {
	public NR(): TerminalNode { return this.getToken(Tads3v2Parser.NR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterNumberAtom) {
			listener.enterNumberAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitNumberAtom) {
			listener.exitNumberAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitNumberAtom) {
			return visitor.visitNumberAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReferenceAtomContext extends PrimaryContext {
	public AMP(): TerminalNode { return this.getToken(Tads3v2Parser.AMP, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterReferenceAtom) {
			listener.enterReferenceAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitReferenceAtom) {
			listener.exitReferenceAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
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
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterIdAtom) {
			listener.enterIdAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitIdAtom) {
			listener.exitIdAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitIdAtom) {
			return visitor.visitIdAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SingleQuoteStringAtomContext extends PrimaryContext {
	public SSTR(): TerminalNode { return this.getToken(Tads3v2Parser.SSTR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterSingleQuoteStringAtom) {
			listener.enterSingleQuoteStringAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitSingleQuoteStringAtom) {
			listener.exitSingleQuoteStringAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitSingleQuoteStringAtom) {
			return visitor.visitSingleQuoteStringAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DoubleQuoteStringAtomContext extends PrimaryContext {
	public DSTR(): TerminalNode { return this.getToken(Tads3v2Parser.DSTR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterDoubleQuoteStringAtom) {
			listener.enterDoubleQuoteStringAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitDoubleQuoteStringAtom) {
			listener.exitDoubleQuoteStringAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitDoubleQuoteStringAtom) {
			return visitor.visitDoubleQuoteStringAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RegexpStringAtomContext extends PrimaryContext {
	public RSTR(): TerminalNode { return this.getToken(Tads3v2Parser.RSTR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterRegexpStringAtom) {
			listener.enterRegexpStringAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitRegexpStringAtom) {
			listener.exitRegexpStringAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitRegexpStringAtom) {
			return visitor.visitRegexpStringAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanAtomContext extends PrimaryContext {
	public TRUE(): TerminalNode { return this.getToken(Tads3v2Parser.TRUE, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterBooleanAtom) {
			listener.enterBooleanAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitBooleanAtom) {
			listener.exitBooleanAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitBooleanAtom) {
			return visitor.visitBooleanAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NilAtomContext extends PrimaryContext {
	public NIL(): TerminalNode { return this.getToken(Tads3v2Parser.NIL, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterNilAtom) {
			listener.enterNilAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitNilAtom) {
			listener.exitNilAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitNilAtom) {
			return visitor.visitNilAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MemberExprContext extends ParserRuleContext {
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_PAREN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_PAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_memberExpr; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterMemberExpr) {
			listener.enterMemberExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitMemberExpr) {
			listener.exitMemberExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitMemberExpr) {
			return visitor.visitMemberExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierAtomContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ID, 0); }
	public softKeyword(): SoftKeywordContext | undefined {
		return this.tryGetRuleContext(0, SoftKeywordContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_identifierAtom; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterIdentifierAtom) {
			listener.enterIdentifierAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitIdentifierAtom) {
			listener.exitIdentifierAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitIdentifierAtom) {
			return visitor.visitIdentifierAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SoftKeywordContext extends ParserRuleContext {
	public IN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.IN, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_softKeyword; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterSoftKeyword) {
			listener.enterSoftKeyword(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitSoftKeyword) {
			listener.exitSoftKeyword(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitSoftKeyword) {
			return visitor.visitSoftKeyword(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamsContext extends ParserRuleContext {
	public param(): ParamContext[];
	public param(i: number): ParamContext;
	public param(i?: number): ParamContext | ParamContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamContext);
		} else {
			return this.getRuleContext(i, ParamContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads3v2Parser.COMMA);
		} else {
			return this.getToken(Tads3v2Parser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_params; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterParams) {
			listener.enterParams(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitParams) {
			listener.exitParams(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitParams) {
			return visitor.visitParams(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamContext extends ParserRuleContext {
	public _name!: IdentifierAtomContext;
	public _defaultValue!: ExprContext;
	public _label!: IdentifierAtomContext;
	public _type!: IdentifierAtomContext;
	public _optional!: Token;
	public SPREAD(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.SPREAD, 0); }
	public LEFT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.RIGHT_BRACKET, 0); }
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.COLON, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.ASSIGN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public OPTIONAL(): TerminalNode | undefined { return this.tryGetToken(Tads3v2Parser.OPTIONAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads3v2Parser.RULE_param; }
	// @Override
	public enterRule(listener: Tads3v2Listener): void {
		if (listener.enterParam) {
			listener.enterParam(this);
		}
	}
	// @Override
	public exitRule(listener: Tads3v2Listener): void {
		if (listener.exitParam) {
			listener.exitParam(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads3v2Visitor<Result>): Result {
		if (visitor.visitParam) {
			return visitor.visitParam(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


