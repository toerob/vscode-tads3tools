// Generated from server/src/parser/Tads2.g4 by ANTLR 4.9.0-SNAPSHOT


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

import { Tads2Listener } from "./Tads2Listener";
import { Tads2Visitor } from "./Tads2Visitor";


export class Tads2Parser extends Parser {
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
	public static readonly PASS = 33;
	public static readonly DELETE = 34;
	public static readonly RETURN = 35;
	public static readonly STATIC = 36;
	public static readonly STRING = 37;
	public static readonly FOREACH = 38;
	public static readonly IN = 39;
	public static readonly SPREAD = 40;
	public static readonly RANGE = 41;
	public static readonly STEP = 42;
	public static readonly LITERAL_NOT = 43;
	public static readonly LITERAL_AND = 44;
	public static readonly LITERAL_OR = 45;
	public static readonly IS = 46;
	public static readonly BREAK = 47;
	public static readonly CONTINUE = 48;
	public static readonly GOTO = 49;
	public static readonly TOKEN = 50;
	public static readonly PRAGMA = 51;
	public static readonly OPERATOR = 52;
	public static readonly COMPOUND_WORD = 53;
	public static readonly FORMATSTRING = 54;
	public static readonly SPECIAL_WORDS = 55;
	public static readonly AT = 56;
	public static readonly AMP = 57;
	public static readonly HASH = 58;
	public static readonly NOT = 59;
	public static readonly OPTIONAL = 60;
	public static readonly IFNIL = 61;
	public static readonly PLUS = 62;
	public static readonly DIV = 63;
	public static readonly MOD = 64;
	public static readonly MINUS = 65;
	public static readonly NEQ = 66;
	public static readonly EQ = 67;
	public static readonly AND = 68;
	public static readonly OR = 69;
	public static readonly ARROW = 70;
	public static readonly TILDE = 71;
	public static readonly POW = 72;
	public static readonly ID = 73;
	public static readonly ASSIGN = 74;
	public static readonly NR = 75;
	public static readonly HEX = 76;
	public static readonly OCT = 77;
	public static readonly COLON = 78;
	public static readonly COMMA = 79;
	public static readonly DOT = 80;
	public static readonly STAR = 81;
	public static readonly BITWISE_OR = 82;
	public static readonly SEMICOLON = 83;
	public static readonly LEFT_PAREN = 84;
	public static readonly RIGHT_PAREN = 85;
	public static readonly LEFT_BRACKET = 86;
	public static readonly RIGHT_BRACKET = 87;
	public static readonly DSTR = 88;
	public static readonly SSTR = 89;
	public static readonly RSTR = 90;
	public static readonly LEFT_CURLY = 91;
	public static readonly RIGHT_CURLY = 92;
	public static readonly LTEQ = 93;
	public static readonly ARITHMETIC_LEFT = 94;
	public static readonly LT = 95;
	public static readonly GTEQ = 96;
	public static readonly GT = 97;
	public static readonly ARITHMETIC_RIGHT = 98;
	public static readonly LOGICAL_RIGHT_SHIFT = 99;
	public static readonly COMMENT = 100;
	public static readonly LINE_COMMENT = 101;
	public static readonly WS = 102;
	public static readonly ANY = 103;
	public static readonly RULE_program = 0;
	public static readonly RULE_directive = 1;
	public static readonly RULE_specialWordsDirective = 2;
	public static readonly RULE_formatStringDirective = 3;
	public static readonly RULE_compoundWordDirective = 4;
	public static readonly RULE_grammarDeclaration = 5;
	public static readonly RULE_grammarRules = 6;
	public static readonly RULE_itemList = 7;
	public static readonly RULE_qualifiers = 8;
	public static readonly RULE_item = 9;
	public static readonly RULE_enumDeclaration = 10;
	public static readonly RULE_propertyDeclaration = 11;
	public static readonly RULE_dictionaryDeclaration = 12;
	public static readonly RULE_exportDeclaration = 13;
	public static readonly RULE_functionDeclaration = 14;
	public static readonly RULE_objectDeclaration = 15;
	public static readonly RULE_array = 16;
	public static readonly RULE_curlyObjectBody = 17;
	public static readonly RULE_semiColonEndedObjectBody = 18;
	public static readonly RULE_superTypes = 19;
	public static readonly RULE_objectBody = 20;
	public static readonly RULE_property = 21;
	public static readonly RULE_paramsWithWildcard = 22;
	public static readonly RULE_method = 23;
	public static readonly RULE_codeBlock = 24;
	public static readonly RULE_stats = 25;
	public static readonly RULE_innerCodeBlock = 26;
	public static readonly RULE_gotoStatement = 27;
	public static readonly RULE_breakStatement = 28;
	public static readonly RULE_continueStatement = 29;
	public static readonly RULE_labelStatement = 30;
	public static readonly RULE_switchStatement = 31;
	public static readonly RULE_throwStatement = 32;
	public static readonly RULE_forInStatement = 33;
	public static readonly RULE_forEachStatement = 34;
	public static readonly RULE_passStatement = 35;
	public static readonly RULE_deleteStatement = 36;
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
		"program", "directive", "specialWordsDirective", "formatStringDirective", 
		"compoundWordDirective", "grammarDeclaration", "grammarRules", "itemList", 
		"qualifiers", "item", "enumDeclaration", "propertyDeclaration", "dictionaryDeclaration", 
		"exportDeclaration", "functionDeclaration", "objectDeclaration", "array", 
		"curlyObjectBody", "semiColonEndedObjectBody", "superTypes", "objectBody", 
		"property", "paramsWithWildcard", "method", "codeBlock", "stats", "innerCodeBlock", 
		"gotoStatement", "breakStatement", "continueStatement", "labelStatement", 
		"switchStatement", "throwStatement", "forInStatement", "forEachStatement", 
		"passStatement", "deleteStatement", "returnStatement", "doWhileStatement", 
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
		"'extern'", "'pass'", "'delete'", "'return'", "'static'", "'string'", 
		"'foreach'", "'in'", "'...'", "'..'", "'step'", "'not'", "'and'", "'or'", 
		"'is'", "'break'", "'continue'", "'goto'", "'token'", undefined, "'operator'", 
		"'compoundWord'", "'formatstring'", "'specialWords'", "'@'", "'&'", "'#'", 
		"'!'", "'?'", "'??'", "'+'", "'/'", "'%'", "'-'", "'!='", "'=='", "'&&'", 
		"'||'", "'->'", "'~'", "'^'", undefined, "'='", undefined, undefined, 
		undefined, "':'", "','", "'.'", "'*'", "'|'", "';'", "'('", "')'", "'['", 
		"']'", undefined, undefined, undefined, "'{'", "'}'", "'<='", "'<<'", 
		"'<'", "'>='", "'>'", "'>>'", "'>>>'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "GRAMMAR", "SWITCH", "CASE", "DEFAULT", "FUNCTION", "THROW", 
		"NEW", "TEMPLATE", "FOR", "TRY", "CATCH", "FINALLY", "ENUM", "CLASS", 
		"TRANSIENT", "MODIFY", "REPLACE", "PROPERTYSET", "IF", "DO", "WHILE", 
		"ELSE", "LOCAL", "TRUE", "NIL", "INTRINSIC", "INHERITED", "DELEGATED", 
		"PROPERTY", "DICTIONARY", "EXPORT", "EXTERN", "PASS", "DELETE", "RETURN", 
		"STATIC", "STRING", "FOREACH", "IN", "SPREAD", "RANGE", "STEP", "LITERAL_NOT", 
		"LITERAL_AND", "LITERAL_OR", "IS", "BREAK", "CONTINUE", "GOTO", "TOKEN", 
		"PRAGMA", "OPERATOR", "COMPOUND_WORD", "FORMATSTRING", "SPECIAL_WORDS", 
		"AT", "AMP", "HASH", "NOT", "OPTIONAL", "IFNIL", "PLUS", "DIV", "MOD", 
		"MINUS", "NEQ", "EQ", "AND", "OR", "ARROW", "TILDE", "POW", "ID", "ASSIGN", 
		"NR", "HEX", "OCT", "COLON", "COMMA", "DOT", "STAR", "BITWISE_OR", "SEMICOLON", 
		"LEFT_PAREN", "RIGHT_PAREN", "LEFT_BRACKET", "RIGHT_BRACKET", "DSTR", 
		"SSTR", "RSTR", "LEFT_CURLY", "RIGHT_CURLY", "LTEQ", "ARITHMETIC_LEFT", 
		"LT", "GTEQ", "GT", "ARITHMETIC_RIGHT", "LOGICAL_RIGHT_SHIFT", "COMMENT", 
		"LINE_COMMENT", "WS", "ANY",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(Tads2Parser._LITERAL_NAMES, Tads2Parser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return Tads2Parser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Tads2.g4"; }

	// @Override
	public get ruleNames(): string[] { return Tads2Parser.ruleNames; }

	// @Override
	public get serializedATN(): string { return Tads2Parser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(Tads2Parser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, Tads2Parser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 109;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.GRAMMAR) | (1 << Tads2Parser.ENUM) | (1 << Tads2Parser.CLASS) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.PROPERTY) | (1 << Tads2Parser.DICTIONARY) | (1 << Tads2Parser.EXPORT))) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (Tads2Parser.STRING - 37)) | (1 << (Tads2Parser.IN - 37)) | (1 << (Tads2Parser.STEP - 37)) | (1 << (Tads2Parser.IS - 37)) | (1 << (Tads2Parser.OPERATOR - 37)) | (1 << (Tads2Parser.COMPOUND_WORD - 37)) | (1 << (Tads2Parser.FORMATSTRING - 37)) | (1 << (Tads2Parser.SPECIAL_WORDS - 37)) | (1 << (Tads2Parser.PLUS - 37)))) !== 0) || _la === Tads2Parser.ID || _la === Tads2Parser.SEMICOLON) {
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
			this.match(Tads2Parser.EOF);
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
		this.enterRule(_localctx, 2, Tads2Parser.RULE_directive);
		try {
			this.state = 125;
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
				this.exportDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 116;
				this.objectDeclaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 117;
				this.propertyDeclaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 118;
				this.dictionaryDeclaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 119;
				this.functionDeclaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 120;
				this.grammarDeclaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 121;
				this.compoundWordDirective();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 122;
				this.formatStringDirective();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 123;
				this.specialWordsDirective();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 124;
				this.match(Tads2Parser.SEMICOLON);
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
	public specialWordsDirective(): SpecialWordsDirectiveContext {
		let _localctx: SpecialWordsDirectiveContext = new SpecialWordsDirectiveContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, Tads2Parser.RULE_specialWordsDirective);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 127;
			this.match(Tads2Parser.SPECIAL_WORDS);
			this.state = 129;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				{
				this.state = 128;
				_localctx._expr = this.expr(0);
				_localctx._values.push(_localctx._expr);
				}
				break;
			}
			this.state = 136;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
				{
				{
				this.state = 131;
				_localctx._expr = this.expr(0);
				_localctx._values.push(_localctx._expr);
				this.state = 132;
				this.match(Tads2Parser.COMMA);
				}
				}
				this.state = 138;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 139;
			this.match(Tads2Parser.SEMICOLON);
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
	public formatStringDirective(): FormatStringDirectiveContext {
		let _localctx: FormatStringDirectiveContext = new FormatStringDirectiveContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, Tads2Parser.RULE_formatStringDirective);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 141;
			this.match(Tads2Parser.FORMATSTRING);
			this.state = 143;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 142;
				_localctx._expr = this.expr(0);
				_localctx._values.push(_localctx._expr);
				}
				}
				this.state = 145;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0));
			this.state = 147;
			this.match(Tads2Parser.SEMICOLON);
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
	public compoundWordDirective(): CompoundWordDirectiveContext {
		let _localctx: CompoundWordDirectiveContext = new CompoundWordDirectiveContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, Tads2Parser.RULE_compoundWordDirective);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this.match(Tads2Parser.COMPOUND_WORD);
			this.state = 151;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 150;
				_localctx._expr = this.expr(0);
				_localctx._values.push(_localctx._expr);
				}
				}
				this.state = 153;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0));
			this.state = 155;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 10, Tads2Parser.RULE_grammarDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 159;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads2Parser.MODIFY:
				{
				this.state = 157;
				_localctx._isModify = this.match(Tads2Parser.MODIFY);
				}
				break;
			case Tads2Parser.REPLACE:
				{
				this.state = 158;
				_localctx._isReplace = this.match(Tads2Parser.REPLACE);
				}
				break;
			case Tads2Parser.GRAMMAR:
				break;
			default:
				break;
			}
			this.state = 161;
			this.match(Tads2Parser.GRAMMAR);
			this.state = 162;
			_localctx._prodName = this.identifierAtom();
			this.state = 167;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads2Parser.LEFT_PAREN) {
				{
				this.state = 163;
				this.match(Tads2Parser.LEFT_PAREN);
				this.state = 164;
				_localctx._tag = this.identifierAtom();
				this.state = 165;
				this.match(Tads2Parser.RIGHT_PAREN);
				}
			}

			this.state = 169;
			this.match(Tads2Parser.COLON);
			this.state = 170;
			this.grammarRules();
			this.state = 171;
			this.match(Tads2Parser.COLON);
			this.state = 177;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 172;
				this.superTypes();
				this.state = 175;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case Tads2Parser.LEFT_CURLY:
					{
					this.state = 173;
					this.curlyObjectBody();
					}
					break;
				case Tads2Parser.MODIFY:
				case Tads2Parser.REPLACE:
				case Tads2Parser.STRING:
				case Tads2Parser.IN:
				case Tads2Parser.STEP:
				case Tads2Parser.IS:
				case Tads2Parser.OPERATOR:
				case Tads2Parser.ID:
				case Tads2Parser.SEMICOLON:
				case Tads2Parser.RIGHT_CURLY:
					{
					this.state = 174;
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
	public grammarRules(): GrammarRulesContext {
		let _localctx: GrammarRulesContext = new GrammarRulesContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, Tads2Parser.RULE_grammarRules);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 179;
			this.itemList();
			this.state = 184;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads2Parser.BITWISE_OR) {
				{
				{
				this.state = 180;
				this.match(Tads2Parser.BITWISE_OR);
				this.state = 181;
				this.itemList();
				}
				}
				this.state = 186;
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
		this.enterRule(_localctx, 14, Tads2Parser.RULE_itemList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 188;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 11, this._ctx) ) {
			case 1:
				{
				this.state = 187;
				this.qualifiers();
				}
				break;
			}
			this.state = 193;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 190;
					this.item(0);
					}
					}
				}
				this.state = 195;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
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
		this.enterRule(_localctx, 16, Tads2Parser.RULE_qualifiers);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 196;
			this.match(Tads2Parser.LEFT_BRACKET);
			this.state = 197;
			this.identifierAtom();
			this.state = 198;
			this.match(Tads2Parser.NR);
			this.state = 199;
			this.match(Tads2Parser.RIGHT_BRACKET);
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
		let _startState: number = 18;
		this.enterRecursionRule(_localctx, 18, Tads2Parser.RULE_item, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 214;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				{
				this.state = 202;
				this.match(Tads2Parser.LEFT_PAREN);
				this.state = 204;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 203;
					this.item(0);
					}
					}
					this.state = 206;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.BITWISE_OR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0));
				this.state = 208;
				this.match(Tads2Parser.RIGHT_PAREN);
				}
				break;

			case 2:
				{
				this.state = 210;
				this.match(Tads2Parser.BITWISE_OR);
				this.state = 211;
				this.item(3);
				}
				break;

			case 3:
				{
				this.state = 212;
				this.expr(0);
				}
				break;

			case 4:
				{
				this.state = 213;
				this.match(Tads2Parser.STAR);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 220;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new ItemContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_item);
					this.state = 216;
					if (!(this.precpred(this._ctx, 4))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
					}
					this.state = 217;
					this.match(Tads2Parser.BITWISE_OR);
					}
					}
				}
				this.state = 222;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
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
	public enumDeclaration(): EnumDeclarationContext {
		let _localctx: EnumDeclarationContext = new EnumDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, Tads2Parser.RULE_enumDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 223;
			this.match(Tads2Parser.ENUM);
			this.state = 225;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads2Parser.TOKEN) {
				{
				this.state = 224;
				_localctx._isToken = this.match(Tads2Parser.TOKEN);
				}
			}

			this.state = 227;
			this.identifierAtom();
			this.state = 232;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads2Parser.COMMA) {
				{
				{
				this.state = 228;
				this.match(Tads2Parser.COMMA);
				this.state = 229;
				this.identifierAtom();
				}
				}
				this.state = 234;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 235;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 22, Tads2Parser.RULE_propertyDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 240;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads2Parser.PLUS) {
				{
				{
				this.state = 237;
				_localctx._level = this.match(Tads2Parser.PLUS);
				}
				}
				this.state = 242;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 243;
			_localctx._isProperty = this.match(Tads2Parser.PROPERTY);
			this.state = 244;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._identifiers.push(_localctx._identifierAtom);
			this.state = 249;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads2Parser.COMMA) {
				{
				{
				this.state = 245;
				this.match(Tads2Parser.COMMA);
				this.state = 246;
				_localctx._identifierAtom = this.identifierAtom();
				_localctx._identifiers.push(_localctx._identifierAtom);
				}
				}
				this.state = 251;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 252;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 24, Tads2Parser.RULE_dictionaryDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 257;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads2Parser.PLUS) {
				{
				{
				this.state = 254;
				_localctx._level = this.match(Tads2Parser.PLUS);
				}
				}
				this.state = 259;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 260;
			this.match(Tads2Parser.DICTIONARY);
			this.state = 262;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads2Parser.PROPERTY) {
				{
				this.state = 261;
				_localctx._isProperty = this.match(Tads2Parser.PROPERTY);
				}
			}

			this.state = 264;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._identifiers.push(_localctx._identifierAtom);
			this.state = 269;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads2Parser.COMMA) {
				{
				{
				this.state = 265;
				this.match(Tads2Parser.COMMA);
				this.state = 266;
				_localctx._identifierAtom = this.identifierAtom();
				_localctx._identifiers.push(_localctx._identifierAtom);
				}
				}
				this.state = 271;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 272;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 26, Tads2Parser.RULE_exportDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 274;
			this.match(Tads2Parser.EXPORT);
			this.state = 275;
			this.identifierAtom();
			this.state = 277;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads2Parser.SSTR) {
				{
				this.state = 276;
				this.match(Tads2Parser.SSTR);
				}
			}

			this.state = 279;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 28, Tads2Parser.RULE_functionDeclaration);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 287;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				{
				this.state = 282;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads2Parser.MODIFY) {
					{
					this.state = 281;
					_localctx._isModify = this.match(Tads2Parser.MODIFY);
					}
				}

				}
				break;

			case 2:
				{
				this.state = 285;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads2Parser.REPLACE) {
					{
					this.state = 284;
					_localctx._isReplace = this.match(Tads2Parser.REPLACE);
					}
				}

				}
				break;
			}
			this.state = 326;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				{
				{
				this.state = 289;
				this.identifierAtom();
				this.state = 295;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads2Parser.LEFT_PAREN) {
					{
					this.state = 290;
					this.match(Tads2Parser.LEFT_PAREN);
					this.state = 292;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.SPREAD - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
						{
						this.state = 291;
						this.params();
						}
					}

					this.state = 294;
					this.match(Tads2Parser.RIGHT_PAREN);
					}
				}

				this.state = 297;
				this.match(Tads2Parser.COLON);
				this.state = 298;
				this.match(Tads2Parser.FUNCTION);
				this.state = 299;
				this.match(Tads2Parser.ASSIGN);
				this.state = 306;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 30, this._ctx) ) {
				case 1:
					{
					this.state = 300;
					_localctx._block = this.codeBlock();
					}
					break;

				case 2:
					{
					this.state = 302;
					this._errHandler.sync(this);
					_alt = 1 + 1;
					do {
						switch (_alt) {
						case 1 + 1:
							{
							{
							this.state = 301;
							_localctx._expr = this.expr(0);
							_localctx._expressions.push(_localctx._expr);
							}
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						this.state = 304;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 29, this._ctx);
					} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
					}
					break;
				}
				}
				}
				break;

			case 2:
				{
				{
				this.state = 308;
				this.identifierAtom();
				this.state = 309;
				this.match(Tads2Parser.COLON);
				this.state = 310;
				this.match(Tads2Parser.FUNCTION);
				this.state = 316;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 32, this._ctx) ) {
				case 1:
					{
					this.state = 311;
					this.match(Tads2Parser.LEFT_PAREN);
					this.state = 313;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.SPREAD - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
						{
						this.state = 312;
						this.params();
						}
					}

					this.state = 315;
					this.match(Tads2Parser.RIGHT_PAREN);
					}
					break;
				}
				this.state = 324;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
				case 1:
					{
					this.state = 318;
					_localctx._block = this.codeBlock();
					}
					break;

				case 2:
					{
					this.state = 320;
					this._errHandler.sync(this);
					_alt = 1 + 1;
					do {
						switch (_alt) {
						case 1 + 1:
							{
							{
							this.state = 319;
							_localctx._expr = this.expr(0);
							_localctx._expressions.push(_localctx._expr);
							}
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						this.state = 322;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 33, this._ctx);
					} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
					}
					break;
				}
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
	public objectDeclaration(): ObjectDeclarationContext {
		let _localctx: ObjectDeclarationContext = new ObjectDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, Tads2Parser.RULE_objectDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 337;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				this.state = 329;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads2Parser.MODIFY) {
					{
					this.state = 328;
					_localctx._isModify = this.match(Tads2Parser.MODIFY);
					}
				}

				}
				break;

			case 2:
				{
				this.state = 332;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads2Parser.REPLACE) {
					{
					this.state = 331;
					_localctx._isReplace = this.match(Tads2Parser.REPLACE);
					}
				}

				}
				break;

			case 3:
				{
				this.state = 335;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads2Parser.CLASS) {
					{
					this.state = 334;
					_localctx._isClass = this.match(Tads2Parser.CLASS);
					}
				}

				}
				break;
			}
			this.state = 342;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads2Parser.PLUS) {
				{
				{
				this.state = 339;
				_localctx._PLUS = this.match(Tads2Parser.PLUS);
				_localctx._level.push(_localctx._PLUS);
				}
				}
				this.state = 344;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 353;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				{
				this.state = 345;
				this.superTypes();
				}
				break;

			case 2:
				{
				{
				this.state = 347;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads2Parser.TRANSIENT) {
					{
					this.state = 346;
					_localctx._isTransient = this.match(Tads2Parser.TRANSIENT);
					}
				}

				this.state = 349;
				_localctx._id = this.identifierAtom();
				this.state = 350;
				this.match(Tads2Parser.COLON);
				this.state = 351;
				this.superTypes();
				}
				}
				break;
			}
			this.state = 357;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads2Parser.LEFT_CURLY:
				{
				this.state = 355;
				this.curlyObjectBody();
				}
				break;
			case Tads2Parser.MODIFY:
			case Tads2Parser.REPLACE:
			case Tads2Parser.STRING:
			case Tads2Parser.IN:
			case Tads2Parser.STEP:
			case Tads2Parser.IS:
			case Tads2Parser.OPERATOR:
			case Tads2Parser.ID:
			case Tads2Parser.SEMICOLON:
			case Tads2Parser.RIGHT_CURLY:
				{
				this.state = 356;
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
	public array(): ArrayContext {
		let _localctx: ArrayContext = new ArrayContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, Tads2Parser.RULE_array);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 359;
			this.expr(0);
			this.state = 366;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 361;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === Tads2Parser.COMMA) {
						{
						this.state = 360;
						this.match(Tads2Parser.COMMA);
						}
					}

					this.state = 363;
					this.array();
					}
					}
				}
				this.state = 368;
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
	public curlyObjectBody(): CurlyObjectBodyContext {
		let _localctx: CurlyObjectBodyContext = new CurlyObjectBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, Tads2Parser.RULE_curlyObjectBody);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 369;
			this.match(Tads2Parser.LEFT_CURLY);
			this.state = 370;
			this.objectBody();
			this.state = 371;
			this.match(Tads2Parser.RIGHT_CURLY);
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
		this.enterRule(_localctx, 36, Tads2Parser.RULE_semiColonEndedObjectBody);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 373;
			this.objectBody();
			this.state = 374;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 38, Tads2Parser.RULE_superTypes);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 376;
			_localctx._identifierAtom = this.identifierAtom();
			_localctx._superType.push(_localctx._identifierAtom);
			this.state = 381;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 46, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 377;
					this.match(Tads2Parser.COMMA);
					this.state = 378;
					this.superTypes();
					}
					}
				}
				this.state = 383;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 46, this._ctx);
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
		this.enterRule(_localctx, 40, Tads2Parser.RULE_objectBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 388;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 16)) & ~0x1F) === 0 && ((1 << (_la - 16)) & ((1 << (Tads2Parser.MODIFY - 16)) | (1 << (Tads2Parser.REPLACE - 16)) | (1 << (Tads2Parser.STRING - 16)) | (1 << (Tads2Parser.IN - 16)) | (1 << (Tads2Parser.STEP - 16)) | (1 << (Tads2Parser.IS - 16)))) !== 0) || _la === Tads2Parser.OPERATOR || _la === Tads2Parser.ID) {
				{
				this.state = 386;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 47, this._ctx) ) {
				case 1:
					{
					this.state = 384;
					_localctx._property = this.property();
					_localctx._properties.push(_localctx._property);
					}
					break;

				case 2:
					{
					this.state = 385;
					_localctx._method = this.method();
					_localctx._functions.push(_localctx._method);
					}
					break;
				}
				}
				this.state = 390;
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
		this.enterRule(_localctx, 42, Tads2Parser.RULE_property);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 391;
			_localctx._id = this.identifierAtom();
			this.state = 392;
			this.match(Tads2Parser.ASSIGN);
			this.state = 394;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 393;
					_localctx._primary = this.primary();
					_localctx._values.push(_localctx._primary);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 396;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 49, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
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
		this.enterRule(_localctx, 44, Tads2Parser.RULE_paramsWithWildcard);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 400;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads2Parser.TRUE:
			case Tads2Parser.NIL:
			case Tads2Parser.INHERITED:
			case Tads2Parser.STRING:
			case Tads2Parser.IN:
			case Tads2Parser.STEP:
			case Tads2Parser.IS:
			case Tads2Parser.OPERATOR:
			case Tads2Parser.AMP:
			case Tads2Parser.ID:
			case Tads2Parser.NR:
			case Tads2Parser.HEX:
			case Tads2Parser.DSTR:
			case Tads2Parser.SSTR:
			case Tads2Parser.RSTR:
				{
				this.state = 398;
				_localctx._primary = this.primary();
				_localctx._parameters.push(_localctx._primary);
				}
				break;
			case Tads2Parser.STAR:
				{
				this.state = 399;
				this.match(Tads2Parser.STAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 406;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 51, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 402;
					this.match(Tads2Parser.COMMA);
					this.state = 403;
					this.paramsWithWildcard();
					}
					}
				}
				this.state = 408;
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
	public method(): MethodContext {
		let _localctx: MethodContext = new MethodContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, Tads2Parser.RULE_method);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 415;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				{
				this.state = 410;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads2Parser.MODIFY) {
					{
					this.state = 409;
					_localctx._isModify = this.match(Tads2Parser.MODIFY);
					}
				}

				}
				break;

			case 2:
				{
				this.state = 413;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads2Parser.REPLACE) {
					{
					this.state = 412;
					_localctx._isReplace = this.match(Tads2Parser.REPLACE);
					}
				}

				}
				break;
			}
			{
			this.state = 417;
			this.identifierAtom();
			this.state = 423;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads2Parser.LEFT_PAREN) {
				{
				this.state = 418;
				this.match(Tads2Parser.LEFT_PAREN);
				this.state = 420;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.SPREAD - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
					{
					this.state = 419;
					this.params();
					}
				}

				this.state = 422;
				this.match(Tads2Parser.RIGHT_PAREN);
				}
			}

			this.state = 425;
			this.match(Tads2Parser.ASSIGN);
			this.state = 432;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 58, this._ctx) ) {
			case 1:
				{
				this.state = 426;
				_localctx._block = this.codeBlock();
				}
				break;

			case 2:
				{
				this.state = 428;
				this._errHandler.sync(this);
				_alt = 1 + 1;
				do {
					switch (_alt) {
					case 1 + 1:
						{
						{
						this.state = 427;
						_localctx._expr = this.expr(0);
						_localctx._expressions.push(_localctx._expr);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 430;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 57, this._ctx);
				} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
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
	public codeBlock(): CodeBlockContext {
		let _localctx: CodeBlockContext = new CodeBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, Tads2Parser.RULE_codeBlock);
		let _la: number;
		try {
			this.state = 443;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 60, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 434;
				this.match(Tads2Parser.LEFT_CURLY);
				this.state = 438;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.SWITCH) | (1 << Tads2Parser.THROW) | (1 << Tads2Parser.NEW) | (1 << Tads2Parser.FOR) | (1 << Tads2Parser.TRY) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.IF) | (1 << Tads2Parser.DO) | (1 << Tads2Parser.WHILE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (Tads2Parser.PASS - 33)) | (1 << (Tads2Parser.DELETE - 33)) | (1 << (Tads2Parser.RETURN - 33)) | (1 << (Tads2Parser.STATIC - 33)) | (1 << (Tads2Parser.STRING - 33)) | (1 << (Tads2Parser.FOREACH - 33)) | (1 << (Tads2Parser.IN - 33)) | (1 << (Tads2Parser.STEP - 33)) | (1 << (Tads2Parser.LITERAL_NOT - 33)) | (1 << (Tads2Parser.LITERAL_AND - 33)) | (1 << (Tads2Parser.LITERAL_OR - 33)) | (1 << (Tads2Parser.IS - 33)) | (1 << (Tads2Parser.BREAK - 33)) | (1 << (Tads2Parser.CONTINUE - 33)) | (1 << (Tads2Parser.GOTO - 33)) | (1 << (Tads2Parser.OPERATOR - 33)) | (1 << (Tads2Parser.AT - 33)) | (1 << (Tads2Parser.AMP - 33)) | (1 << (Tads2Parser.NOT - 33)) | (1 << (Tads2Parser.PLUS - 33)))) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & ((1 << (Tads2Parser.MINUS - 65)) | (1 << (Tads2Parser.ARROW - 65)) | (1 << (Tads2Parser.TILDE - 65)) | (1 << (Tads2Parser.ID - 65)) | (1 << (Tads2Parser.NR - 65)) | (1 << (Tads2Parser.HEX - 65)) | (1 << (Tads2Parser.STAR - 65)) | (1 << (Tads2Parser.SEMICOLON - 65)) | (1 << (Tads2Parser.LEFT_PAREN - 65)) | (1 << (Tads2Parser.LEFT_BRACKET - 65)) | (1 << (Tads2Parser.DSTR - 65)) | (1 << (Tads2Parser.SSTR - 65)) | (1 << (Tads2Parser.RSTR - 65)) | (1 << (Tads2Parser.LEFT_CURLY - 65)))) !== 0)) {
					{
					{
					this.state = 435;
					this.stats();
					}
					}
					this.state = 440;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 441;
				this.match(Tads2Parser.RIGHT_CURLY);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 442;
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
		this.enterRule(_localctx, 50, Tads2Parser.RULE_stats);
		try {
			this.state = 465;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 61, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 445;
				this.assignmentStatement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 446;
				this.passStatement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 447;
				this.deleteStatement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 448;
				this.ifStatement();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 449;
				this.tryCatchStatement();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 450;
				this.forStatement();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 451;
				this.doWhileStatement();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 452;
				this.whileStatement();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 453;
				this.switchStatement();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 454;
				this.forInStatement();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 455;
				this.forEachStatement();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 456;
				this.sayStatement();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 457;
				this.emptyStatement();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 458;
				this.returnStatement();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 459;
				this.throwStatement();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 460;
				this.labelStatement();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 461;
				this.breakStatement();
				}
				break;

			case 18:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 462;
				this.continueStatement();
				}
				break;

			case 19:
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 463;
				this.gotoStatement();
				}
				break;

			case 20:
				this.enterOuterAlt(_localctx, 20);
				{
				this.state = 464;
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
		this.enterRule(_localctx, 52, Tads2Parser.RULE_innerCodeBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 467;
			this.match(Tads2Parser.LEFT_CURLY);
			this.state = 471;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.SWITCH) | (1 << Tads2Parser.THROW) | (1 << Tads2Parser.NEW) | (1 << Tads2Parser.FOR) | (1 << Tads2Parser.TRY) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.IF) | (1 << Tads2Parser.DO) | (1 << Tads2Parser.WHILE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (Tads2Parser.PASS - 33)) | (1 << (Tads2Parser.DELETE - 33)) | (1 << (Tads2Parser.RETURN - 33)) | (1 << (Tads2Parser.STATIC - 33)) | (1 << (Tads2Parser.STRING - 33)) | (1 << (Tads2Parser.FOREACH - 33)) | (1 << (Tads2Parser.IN - 33)) | (1 << (Tads2Parser.STEP - 33)) | (1 << (Tads2Parser.LITERAL_NOT - 33)) | (1 << (Tads2Parser.LITERAL_AND - 33)) | (1 << (Tads2Parser.LITERAL_OR - 33)) | (1 << (Tads2Parser.IS - 33)) | (1 << (Tads2Parser.BREAK - 33)) | (1 << (Tads2Parser.CONTINUE - 33)) | (1 << (Tads2Parser.GOTO - 33)) | (1 << (Tads2Parser.OPERATOR - 33)) | (1 << (Tads2Parser.AT - 33)) | (1 << (Tads2Parser.AMP - 33)) | (1 << (Tads2Parser.NOT - 33)) | (1 << (Tads2Parser.PLUS - 33)))) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & ((1 << (Tads2Parser.MINUS - 65)) | (1 << (Tads2Parser.ARROW - 65)) | (1 << (Tads2Parser.TILDE - 65)) | (1 << (Tads2Parser.ID - 65)) | (1 << (Tads2Parser.NR - 65)) | (1 << (Tads2Parser.HEX - 65)) | (1 << (Tads2Parser.STAR - 65)) | (1 << (Tads2Parser.SEMICOLON - 65)) | (1 << (Tads2Parser.LEFT_PAREN - 65)) | (1 << (Tads2Parser.LEFT_BRACKET - 65)) | (1 << (Tads2Parser.DSTR - 65)) | (1 << (Tads2Parser.SSTR - 65)) | (1 << (Tads2Parser.RSTR - 65)) | (1 << (Tads2Parser.LEFT_CURLY - 65)))) !== 0)) {
				{
				{
				this.state = 468;
				this.stats();
				}
				}
				this.state = 473;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 474;
			this.match(Tads2Parser.RIGHT_CURLY);
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
		this.enterRule(_localctx, 54, Tads2Parser.RULE_gotoStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 476;
			this.match(Tads2Parser.GOTO);
			this.state = 478;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (Tads2Parser.STRING - 37)) | (1 << (Tads2Parser.IN - 37)) | (1 << (Tads2Parser.STEP - 37)) | (1 << (Tads2Parser.IS - 37)) | (1 << (Tads2Parser.OPERATOR - 37)))) !== 0) || _la === Tads2Parser.ID) {
				{
				this.state = 477;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 480;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 56, Tads2Parser.RULE_breakStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 482;
			this.match(Tads2Parser.BREAK);
			this.state = 484;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (Tads2Parser.STRING - 37)) | (1 << (Tads2Parser.IN - 37)) | (1 << (Tads2Parser.STEP - 37)) | (1 << (Tads2Parser.IS - 37)) | (1 << (Tads2Parser.OPERATOR - 37)))) !== 0) || _la === Tads2Parser.ID) {
				{
				this.state = 483;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 486;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 58, Tads2Parser.RULE_continueStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 488;
			this.match(Tads2Parser.CONTINUE);
			this.state = 490;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (Tads2Parser.STRING - 37)) | (1 << (Tads2Parser.IN - 37)) | (1 << (Tads2Parser.STEP - 37)) | (1 << (Tads2Parser.IS - 37)) | (1 << (Tads2Parser.OPERATOR - 37)))) !== 0) || _la === Tads2Parser.ID) {
				{
				this.state = 489;
				_localctx._label = this.identifierAtom();
				}
			}

			this.state = 492;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 60, Tads2Parser.RULE_labelStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 494;
			this.identifierAtom();
			this.state = 495;
			this.match(Tads2Parser.COLON);
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
		this.enterRule(_localctx, 62, Tads2Parser.RULE_switchStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 497;
			this.match(Tads2Parser.SWITCH);
			this.state = 498;
			this.match(Tads2Parser.LEFT_PAREN);
			this.state = 499;
			this.expr(0);
			this.state = 500;
			this.match(Tads2Parser.RIGHT_PAREN);
			this.state = 501;
			this.match(Tads2Parser.LEFT_CURLY);
			this.state = 519;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === Tads2Parser.CASE || _la === Tads2Parser.DEFAULT) {
				{
				{
				this.state = 505;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case Tads2Parser.CASE:
					{
					{
					this.state = 502;
					this.match(Tads2Parser.CASE);
					this.state = 503;
					this.expr(0);
					}
					}
					break;
				case Tads2Parser.DEFAULT:
					{
					this.state = 504;
					this.match(Tads2Parser.DEFAULT);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 507;
				this.match(Tads2Parser.COLON);
				this.state = 515;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 68, this._ctx) ) {
				case 1:
					{
					this.state = 508;
					this.codeBlock();
					}
					break;

				case 2:
					{
					this.state = 512;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.SWITCH) | (1 << Tads2Parser.THROW) | (1 << Tads2Parser.NEW) | (1 << Tads2Parser.FOR) | (1 << Tads2Parser.TRY) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.IF) | (1 << Tads2Parser.DO) | (1 << Tads2Parser.WHILE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (Tads2Parser.PASS - 33)) | (1 << (Tads2Parser.DELETE - 33)) | (1 << (Tads2Parser.RETURN - 33)) | (1 << (Tads2Parser.STATIC - 33)) | (1 << (Tads2Parser.STRING - 33)) | (1 << (Tads2Parser.FOREACH - 33)) | (1 << (Tads2Parser.IN - 33)) | (1 << (Tads2Parser.STEP - 33)) | (1 << (Tads2Parser.LITERAL_NOT - 33)) | (1 << (Tads2Parser.LITERAL_AND - 33)) | (1 << (Tads2Parser.LITERAL_OR - 33)) | (1 << (Tads2Parser.IS - 33)) | (1 << (Tads2Parser.BREAK - 33)) | (1 << (Tads2Parser.CONTINUE - 33)) | (1 << (Tads2Parser.GOTO - 33)) | (1 << (Tads2Parser.OPERATOR - 33)) | (1 << (Tads2Parser.AT - 33)) | (1 << (Tads2Parser.AMP - 33)) | (1 << (Tads2Parser.NOT - 33)) | (1 << (Tads2Parser.PLUS - 33)))) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & ((1 << (Tads2Parser.MINUS - 65)) | (1 << (Tads2Parser.ARROW - 65)) | (1 << (Tads2Parser.TILDE - 65)) | (1 << (Tads2Parser.ID - 65)) | (1 << (Tads2Parser.NR - 65)) | (1 << (Tads2Parser.HEX - 65)) | (1 << (Tads2Parser.STAR - 65)) | (1 << (Tads2Parser.SEMICOLON - 65)) | (1 << (Tads2Parser.LEFT_PAREN - 65)) | (1 << (Tads2Parser.LEFT_BRACKET - 65)) | (1 << (Tads2Parser.DSTR - 65)) | (1 << (Tads2Parser.SSTR - 65)) | (1 << (Tads2Parser.RSTR - 65)) | (1 << (Tads2Parser.LEFT_CURLY - 65)))) !== 0)) {
						{
						{
						this.state = 509;
						this.stats();
						}
						}
						this.state = 514;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
					break;
				}
				}
				}
				this.state = 521;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 522;
			this.match(Tads2Parser.RIGHT_CURLY);
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
		this.enterRule(_localctx, 64, Tads2Parser.RULE_throwStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 524;
			this.match(Tads2Parser.THROW);
			this.state = 525;
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
		this.enterRule(_localctx, 66, Tads2Parser.RULE_forInStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 527;
			this.match(Tads2Parser.FOR);
			this.state = 528;
			this.match(Tads2Parser.LEFT_PAREN);
			this.state = 529;
			this.match(Tads2Parser.LOCAL);
			this.state = 530;
			this.match(Tads2Parser.ID);
			this.state = 531;
			this.match(Tads2Parser.IN);
			this.state = 532;
			this.expr(0);
			this.state = 533;
			this.match(Tads2Parser.RIGHT_PAREN);
			this.state = 534;
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
		this.enterRule(_localctx, 68, Tads2Parser.RULE_forEachStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 536;
			this.match(Tads2Parser.FOREACH);
			this.state = 537;
			this.match(Tads2Parser.LEFT_PAREN);
			this.state = 538;
			this.expr(0);
			this.state = 539;
			this.match(Tads2Parser.IN);
			this.state = 540;
			this.expr(0);
			this.state = 541;
			this.match(Tads2Parser.RIGHT_PAREN);
			this.state = 542;
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
	public passStatement(): PassStatementContext {
		let _localctx: PassStatementContext = new PassStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, Tads2Parser.RULE_passStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 544;
			this.match(Tads2Parser.PASS);
			this.state = 546;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
				{
				this.state = 545;
				this.expr(0);
				}
			}

			this.state = 548;
			this.match(Tads2Parser.SEMICOLON);
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
	public deleteStatement(): DeleteStatementContext {
		let _localctx: DeleteStatementContext = new DeleteStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, Tads2Parser.RULE_deleteStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 550;
			this.match(Tads2Parser.DELETE);
			this.state = 552;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
				{
				this.state = 551;
				this.expr(0);
				}
			}

			this.state = 554;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 74, Tads2Parser.RULE_returnStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 556;
			this.match(Tads2Parser.RETURN);
			this.state = 558;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
				{
				this.state = 557;
				this.expr(0);
				}
			}

			this.state = 560;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 76, Tads2Parser.RULE_doWhileStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 562;
			this.match(Tads2Parser.DO);
			this.state = 563;
			this.codeBlock();
			this.state = 564;
			this.match(Tads2Parser.WHILE);
			this.state = 565;
			this.match(Tads2Parser.LEFT_PAREN);
			this.state = 567;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
				{
				this.state = 566;
				this.expr(0);
				}
			}

			this.state = 569;
			this.match(Tads2Parser.RIGHT_PAREN);
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
		this.enterRule(_localctx, 78, Tads2Parser.RULE_whileStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 571;
			this.match(Tads2Parser.WHILE);
			this.state = 572;
			this.match(Tads2Parser.LEFT_PAREN);
			this.state = 574;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
				{
				this.state = 573;
				this.expr(0);
				}
			}

			this.state = 576;
			this.match(Tads2Parser.RIGHT_PAREN);
			this.state = 577;
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
		this.enterRule(_localctx, 80, Tads2Parser.RULE_forStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 579;
			this.match(Tads2Parser.FOR);
			this.state = 580;
			this.match(Tads2Parser.LEFT_PAREN);
			this.state = 582;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
				{
				this.state = 581;
				this.expr(0);
				}
			}

			this.state = 584;
			this.match(Tads2Parser.SEMICOLON);
			this.state = 586;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
				{
				this.state = 585;
				this.expr(0);
				}
			}

			this.state = 588;
			this.match(Tads2Parser.SEMICOLON);
			this.state = 590;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
				{
				this.state = 589;
				this.expr(0);
				}
			}

			this.state = 592;
			this.match(Tads2Parser.RIGHT_PAREN);
			this.state = 593;
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
		this.enterRule(_localctx, 82, Tads2Parser.RULE_tryCatchStatement);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 595;
			this.match(Tads2Parser.TRY);
			this.state = 596;
			this.codeBlock();
			this.state = 606;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 79, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 597;
					this.match(Tads2Parser.CATCH);
					this.state = 598;
					this.match(Tads2Parser.LEFT_PAREN);
					this.state = 600;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.SPREAD - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
						{
						this.state = 599;
						this.params();
						}
					}

					this.state = 602;
					this.match(Tads2Parser.RIGHT_PAREN);
					this.state = 603;
					this.codeBlock();
					}
					}
				}
				this.state = 608;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 79, this._ctx);
			}
			this.state = 611;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 80, this._ctx) ) {
			case 1:
				{
				this.state = 609;
				this.match(Tads2Parser.FINALLY);
				this.state = 610;
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
		this.enterRule(_localctx, 84, Tads2Parser.RULE_callStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 613;
			this.expr(0);
			this.state = 616;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 81, this._ctx) ) {
			case 1:
				{
				this.state = 614;
				this.match(Tads2Parser.DOT);
				this.state = 615;
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
		this.enterRule(_localctx, 86, Tads2Parser.RULE_emptyStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 619;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
				{
				this.state = 618;
				this.expr(0);
				}
			}

			this.state = 621;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 88, Tads2Parser.RULE_sayStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 623;
			this.match(Tads2Parser.DSTR);
			this.state = 624;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 90, Tads2Parser.RULE_assignmentStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 626;
			this.match(Tads2Parser.LOCAL);
			this.state = 627;
			this.identifierAtom();
			this.state = 630;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === Tads2Parser.ASSIGN) {
				{
				this.state = 628;
				this.match(Tads2Parser.ASSIGN);
				this.state = 629;
				this.expr(0);
				}
			}

			this.state = 632;
			this.match(Tads2Parser.SEMICOLON);
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
		this.enterRule(_localctx, 92, Tads2Parser.RULE_ifStatement);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 634;
			this.match(Tads2Parser.IF);
			this.state = 635;
			_localctx._ifExprAndBlock = this.enclosedExprCodeBlock();
			this.state = 641;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 84, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 636;
					this.match(Tads2Parser.ELSE);
					this.state = 637;
					this.match(Tads2Parser.IF);
					this.state = 638;
					_localctx._elseIfExprAndBlock = this.enclosedExprCodeBlock();
					}
					}
				}
				this.state = 643;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 84, this._ctx);
			}
			this.state = 646;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 85, this._ctx) ) {
			case 1:
				{
				this.state = 644;
				this.match(Tads2Parser.ELSE);
				this.state = 645;
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
		this.enterRule(_localctx, 94, Tads2Parser.RULE_enclosedExprCodeBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 648;
			this.match(Tads2Parser.LEFT_PAREN);
			this.state = 649;
			_localctx._expression = this.expr(0);
			this.state = 650;
			this.match(Tads2Parser.RIGHT_PAREN);
			this.state = 651;
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
		this.enterRecursionRule(_localctx, 96, Tads2Parser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 703;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 91, this._ctx) ) {
			case 1:
				{
				_localctx = new ArrayExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 662;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 654;
						this.match(Tads2Parser.LEFT_BRACKET);
						this.state = 658;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
							{
							{
							this.state = 655;
							this.expr(0);
							}
							}
							this.state = 660;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						this.state = 661;
						this.match(Tads2Parser.RIGHT_BRACKET);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 664;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 87, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;

			case 2:
				{
				_localctx = new DelegatedExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 666;
				this.match(Tads2Parser.DELEGATED);
				this.state = 667;
				this.expr(38);
				}
				break;

			case 3:
				{
				_localctx = new InheritedExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 668;
				this.match(Tads2Parser.INHERITED);
				this.state = 669;
				this.expr(37);
				}
				break;

			case 4:
				{
				_localctx = new TransientExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 670;
				this.match(Tads2Parser.TRANSIENT);
				this.state = 671;
				this.expr(36);
				}
				break;

			case 5:
				{
				_localctx = new PrimaryExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 672;
				this.primary();
				}
				break;

			case 6:
				{
				_localctx = new ParenExpr2Context(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 673;
				this.match(Tads2Parser.LEFT_PAREN);
				this.state = 675;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
					{
					this.state = 674;
					this.expr(0);
					}
				}

				this.state = 677;
				this.match(Tads2Parser.RIGHT_PAREN);
				}
				break;

			case 7:
				{
				_localctx = new LocalExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 678;
				this.match(Tads2Parser.LOCAL);
				this.state = 679;
				this.expr(29);
				}
				break;

			case 8:
				{
				_localctx = new StaticExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 680;
				this.match(Tads2Parser.STATIC);
				this.state = 681;
				this.expr(28);
				}
				break;

			case 9:
				{
				_localctx = new NewExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 682;
				this.match(Tads2Parser.NEW);
				this.state = 683;
				this.expr(27);
				}
				break;

			case 10:
				{
				_localctx = new AnonymousObjectExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 684;
				this.match(Tads2Parser.LEFT_CURLY);
				this.state = 686;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.SPREAD - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
					{
					this.state = 685;
					this.params();
					}
				}

				this.state = 688;
				this.match(Tads2Parser.COLON);
				this.state = 690;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
					{
					this.state = 689;
					this.expr(0);
					}
				}

				this.state = 692;
				this.match(Tads2Parser.RIGHT_CURLY);
				}
				break;

			case 11:
				{
				_localctx = new LiteralNotAndORContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 693;
				_la = this._input.LA(1);
				if (!(((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (Tads2Parser.LITERAL_NOT - 43)) | (1 << (Tads2Parser.LITERAL_AND - 43)) | (1 << (Tads2Parser.LITERAL_OR - 43)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 694;
				this.expr(10);
				}
				break;

			case 12:
				{
				_localctx = new ArrowExpr2Context(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				{
				this.state = 695;
				this.match(Tads2Parser.ARROW);
				}
				this.state = 696;
				this.expr(6);
				}
				break;

			case 13:
				{
				_localctx = new ArrowExpr3Context(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 697;
				this.match(Tads2Parser.STAR);
				this.state = 698;
				this.match(Tads2Parser.ARROW);
				this.state = 699;
				this.expr(5);
				}
				break;

			case 14:
				{
				_localctx = new UnaryExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 700;
				_la = this._input.LA(1);
				if (!(((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & ((1 << (Tads2Parser.AT - 56)) | (1 << (Tads2Parser.AMP - 56)) | (1 << (Tads2Parser.NOT - 56)) | (1 << (Tads2Parser.PLUS - 56)) | (1 << (Tads2Parser.MINUS - 56)) | (1 << (Tads2Parser.TILDE - 56)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 701;
				this.expr(4);
				}
				break;

			case 15:
				{
				_localctx = new AnonymousFunctionExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 702;
				this.functionDeclaration();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 845;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 106, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 843;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 105, this._ctx) ) {
					case 1:
						{
						_localctx = new MemberExprContext(new ExprContext(_parentctx, _parentState));
						(_localctx as MemberExprContext)._prev = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 705;
						if (!(this.precpred(this._ctx, 42))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 42)");
						}
						this.state = 706;
						this.match(Tads2Parser.DOT);
						this.state = 707;
						(_localctx as MemberExprContext)._next = this.expr(43);
						}
						break;

					case 2:
						{
						_localctx = new CommaExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 708;
						if (!(this.precpred(this._ctx, 40))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 40)");
						}
						this.state = 709;
						this.match(Tads2Parser.COMMA);
						this.state = 710;
						this.expr(41);
						}
						break;

					case 3:
						{
						_localctx = new ReferenceExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 711;
						if (!(this.precpred(this._ctx, 26))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 26)");
						}
						this.state = 712;
						this.match(Tads2Parser.AMP);
						this.state = 713;
						this.expr(27);
						}
						break;

					case 4:
						{
						_localctx = new NotInExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 714;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 715;
						this.match(Tads2Parser.LITERAL_NOT);
						this.state = 716;
						this.match(Tads2Parser.IN);
						this.state = 717;
						this.expr(26);
						}
						break;

					case 5:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 718;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 719;
						this.match(Tads2Parser.IS);
						this.state = 720;
						this.match(Tads2Parser.IN);
						this.state = 721;
						this.expr(25);
						}
						break;

					case 6:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 722;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 723;
						this.match(Tads2Parser.IS);
						this.state = 724;
						this.expr(24);
						}
						break;

					case 7:
						{
						_localctx = new InExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 725;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 726;
						this.match(Tads2Parser.IN);
						this.state = 727;
						this.expr(23);
						}
						break;

					case 8:
						{
						_localctx = new AssignmentExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 728;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 730;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads2Parser.COLON) {
							{
							this.state = 729;
							this.match(Tads2Parser.COLON);
							}
						}

						this.state = 732;
						this.match(Tads2Parser.ASSIGN);
						this.state = 733;
						this.expr(22);
						}
						break;

					case 9:
						{
						_localctx = new IfNilExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 734;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 735;
						this.match(Tads2Parser.IFNIL);
						this.state = 736;
						this.expr(21);
						}
						break;

					case 10:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 737;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 738;
						_la = this._input.LA(1);
						if (!(_la === Tads2Parser.AMP || _la === Tads2Parser.BITWISE_OR)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 740;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads2Parser.ASSIGN) {
							{
							this.state = 739;
							this.match(Tads2Parser.ASSIGN);
							}
						}

						this.state = 742;
						this.expr(19);
						}
						break;

					case 11:
						{
						_localctx = new AndOrExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 743;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 744;
						(_localctx as AndOrExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === Tads2Parser.AND || _la === Tads2Parser.OR)) {
							(_localctx as AndOrExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 745;
						this.expr(18);
						}
						break;

					case 12:
						{
						_localctx = new PowerOfExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 746;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						{
						this.state = 747;
						this.match(Tads2Parser.POW);
						}
						this.state = 749;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads2Parser.ASSIGN) {
							{
							this.state = 748;
							(_localctx as PowerOfExprContext)._isInc = this.match(Tads2Parser.ASSIGN);
							}
						}

						this.state = 751;
						this.expr(17);
						}
						break;

					case 13:
						{
						_localctx = new MultiplicationExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 752;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 753;
						(_localctx as MultiplicationExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & ((1 << (Tads2Parser.DIV - 63)) | (1 << (Tads2Parser.MOD - 63)) | (1 << (Tads2Parser.STAR - 63)))) !== 0))) {
							(_localctx as MultiplicationExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 755;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads2Parser.ASSIGN) {
							{
							this.state = 754;
							(_localctx as MultiplicationExprContext)._isInc = this.match(Tads2Parser.ASSIGN);
							}
						}

						this.state = 757;
						this.expr(16);
						}
						break;

					case 14:
						{
						_localctx = new AdditiveExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 758;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 759;
						(_localctx as AdditiveExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === Tads2Parser.PLUS || _la === Tads2Parser.MINUS)) {
							(_localctx as AdditiveExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 761;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads2Parser.ASSIGN) {
							{
							this.state = 760;
							(_localctx as AdditiveExprContext)._isInc = this.match(Tads2Parser.ASSIGN);
							}
						}

						this.state = 763;
						this.expr(15);
						}
						break;

					case 15:
						{
						_localctx = new RelationalExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 764;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 765;
						(_localctx as RelationalExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 93)) & ~0x1F) === 0 && ((1 << (_la - 93)) & ((1 << (Tads2Parser.LTEQ - 93)) | (1 << (Tads2Parser.LT - 93)) | (1 << (Tads2Parser.GTEQ - 93)) | (1 << (Tads2Parser.GT - 93)))) !== 0))) {
							(_localctx as RelationalExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 766;
						this.expr(14);
						}
						break;

					case 16:
						{
						_localctx = new EqualityExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 767;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 768;
						(_localctx as EqualityExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === Tads2Parser.NEQ || _la === Tads2Parser.EQ)) {
							(_localctx as EqualityExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 769;
						this.expr(13);
						}
						break;

					case 17:
						{
						_localctx = new NotEqualityExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 770;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						{
						this.state = 771;
						this.match(Tads2Parser.LT);
						this.state = 772;
						this.match(Tads2Parser.GT);
						}
						this.state = 774;
						this.expr(12);
						}
						break;

					case 18:
						{
						_localctx = new LiteralNotAndOR2Context(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 775;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 776;
						_la = this._input.LA(1);
						if (!(((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (Tads2Parser.LITERAL_NOT - 43)) | (1 << (Tads2Parser.LITERAL_AND - 43)) | (1 << (Tads2Parser.LITERAL_OR - 43)))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 777;
						this.expr(10);
						}
						break;

					case 19:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 778;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 779;
						(_localctx as BitwiseExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & ((1 << (Tads2Parser.ARITHMETIC_LEFT - 94)) | (1 << (Tads2Parser.ARITHMETIC_RIGHT - 94)) | (1 << (Tads2Parser.LOGICAL_RIGHT_SHIFT - 94)))) !== 0))) {
							(_localctx as BitwiseExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 781;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === Tads2Parser.ASSIGN) {
							{
							this.state = 780;
							(_localctx as BitwiseExprContext)._isInc = this.match(Tads2Parser.ASSIGN);
							}
						}

						this.state = 783;
						this.expr(9);
						}
						break;

					case 20:
						{
						_localctx = new ArrowExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 784;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						{
						this.state = 785;
						this.match(Tads2Parser.ARROW);
						}
						this.state = 786;
						this.expr(8);
						}
						break;

					case 21:
						{
						_localctx = new TernaryExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 787;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 788;
						this.match(Tads2Parser.OPTIONAL);
						this.state = 789;
						this.expr(0);
						this.state = 790;
						this.match(Tads2Parser.COLON);
						this.state = 791;
						this.expr(3);
						}
						break;

					case 22:
						{
						_localctx = new IndexExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 793;
						if (!(this.precpred(this._ctx, 41))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 41)");
						}
						this.state = 794;
						this.match(Tads2Parser.LEFT_BRACKET);
						this.state = 796;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
							{
							this.state = 795;
							this.expr(0);
							}
						}

						this.state = 798;
						this.match(Tads2Parser.RIGHT_BRACKET);
						}
						break;

					case 23:
						{
						_localctx = new RangeExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 799;
						if (!(this.precpred(this._ctx, 39))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 39)");
						}
						this.state = 800;
						this.match(Tads2Parser.RANGE);
						this.state = 801;
						this.expr(0);
						this.state = 804;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 99, this._ctx) ) {
						case 1:
							{
							this.state = 802;
							(_localctx as RangeExprContext)._hasStep = this.match(Tads2Parser.STEP);
							this.state = 803;
							this.expr(0);
							}
							break;
						}
						}
						break;

					case 24:
						{
						_localctx = new CallWithParamsExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 806;
						if (!(this.precpred(this._ctx, 34))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 34)");
						}
						this.state = 807;
						this.match(Tads2Parser.LEFT_PAREN);
						this.state = 809;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						do {
							{
							{
							this.state = 808;
							this.params();
							}
							}
							this.state = 811;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.SPREAD - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0));
						this.state = 813;
						this.match(Tads2Parser.RIGHT_PAREN);
						}
						break;

					case 25:
						{
						_localctx = new ExprWithParenExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 815;
						if (!(this.precpred(this._ctx, 33))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 33)");
						}
						this.state = 816;
						this.match(Tads2Parser.LEFT_PAREN);
						this.state = 818;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
							{
							this.state = 817;
							this.expr(0);
							}
						}

						this.state = 820;
						this.match(Tads2Parser.RIGHT_PAREN);
						}
						break;

					case 26:
						{
						_localctx = new ExprWithAnonymousObjectExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 821;
						if (!(this.precpred(this._ctx, 32))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 32)");
						}
						this.state = 822;
						this.match(Tads2Parser.LEFT_CURLY);
						this.state = 824;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.SPREAD - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
							{
							this.state = 823;
							this.params();
							}
						}

						this.state = 826;
						this.match(Tads2Parser.COLON);
						this.state = 828;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << Tads2Parser.NEW) | (1 << Tads2Parser.TRANSIENT) | (1 << Tads2Parser.MODIFY) | (1 << Tads2Parser.REPLACE) | (1 << Tads2Parser.LOCAL) | (1 << Tads2Parser.TRUE) | (1 << Tads2Parser.NIL) | (1 << Tads2Parser.INHERITED) | (1 << Tads2Parser.DELEGATED))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (Tads2Parser.STATIC - 36)) | (1 << (Tads2Parser.STRING - 36)) | (1 << (Tads2Parser.IN - 36)) | (1 << (Tads2Parser.STEP - 36)) | (1 << (Tads2Parser.LITERAL_NOT - 36)) | (1 << (Tads2Parser.LITERAL_AND - 36)) | (1 << (Tads2Parser.LITERAL_OR - 36)) | (1 << (Tads2Parser.IS - 36)) | (1 << (Tads2Parser.OPERATOR - 36)) | (1 << (Tads2Parser.AT - 36)) | (1 << (Tads2Parser.AMP - 36)) | (1 << (Tads2Parser.NOT - 36)) | (1 << (Tads2Parser.PLUS - 36)) | (1 << (Tads2Parser.MINUS - 36)))) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (Tads2Parser.ARROW - 70)) | (1 << (Tads2Parser.TILDE - 70)) | (1 << (Tads2Parser.ID - 70)) | (1 << (Tads2Parser.NR - 70)) | (1 << (Tads2Parser.HEX - 70)) | (1 << (Tads2Parser.STAR - 70)) | (1 << (Tads2Parser.LEFT_PAREN - 70)) | (1 << (Tads2Parser.LEFT_BRACKET - 70)) | (1 << (Tads2Parser.DSTR - 70)) | (1 << (Tads2Parser.SSTR - 70)) | (1 << (Tads2Parser.RSTR - 70)) | (1 << (Tads2Parser.LEFT_CURLY - 70)))) !== 0)) {
							{
							this.state = 827;
							this.expr(0);
							}
						}

						this.state = 830;
						this.match(Tads2Parser.RIGHT_CURLY);
						}
						break;

					case 27:
						{
						_localctx = new ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 831;
						if (!(this.precpred(this._ctx, 31))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 31)");
						}
						this.state = 832;
						this.match(Tads2Parser.COLON);
						this.state = 833;
						this.superTypes();
						this.state = 834;
						this.curlyObjectBody();
						}
						break;

					case 28:
						{
						_localctx = new PostFixExprContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, Tads2Parser.RULE_expr);
						this.state = 836;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 841;
						this._errHandler.sync(this);
						switch (this._input.LA(1)) {
						case Tads2Parser.PLUS:
							{
							this.state = 837;
							this.match(Tads2Parser.PLUS);
							this.state = 838;
							this.match(Tads2Parser.PLUS);
							}
							break;
						case Tads2Parser.MINUS:
							{
							this.state = 839;
							this.match(Tads2Parser.MINUS);
							this.state = 840;
							this.match(Tads2Parser.MINUS);
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
				this.state = 847;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 106, this._ctx);
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
		this.enterRule(_localctx, 98, Tads2Parser.RULE_primary);
		try {
			this.state = 859;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case Tads2Parser.INHERITED:
				_localctx = new InheritedAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 848;
				this.match(Tads2Parser.INHERITED);
				}
				break;
			case Tads2Parser.HEX:
				_localctx = new HexAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 849;
				this.match(Tads2Parser.HEX);
				}
				break;
			case Tads2Parser.NR:
				_localctx = new NumberAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 850;
				this.match(Tads2Parser.NR);
				}
				break;
			case Tads2Parser.AMP:
				_localctx = new ReferenceAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 851;
				this.match(Tads2Parser.AMP);
				this.state = 852;
				this.identifierAtom();
				}
				break;
			case Tads2Parser.STRING:
			case Tads2Parser.IN:
			case Tads2Parser.STEP:
			case Tads2Parser.IS:
			case Tads2Parser.OPERATOR:
			case Tads2Parser.ID:
				_localctx = new IdAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 853;
				this.identifierAtom();
				}
				break;
			case Tads2Parser.SSTR:
				_localctx = new SingleQuotestringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 854;
				this.match(Tads2Parser.SSTR);
				}
				break;
			case Tads2Parser.DSTR:
				_localctx = new DoubleQuotestringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 855;
				this.match(Tads2Parser.DSTR);
				}
				break;
			case Tads2Parser.RSTR:
				_localctx = new RegexpStringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 856;
				this.match(Tads2Parser.RSTR);
				}
				break;
			case Tads2Parser.TRUE:
				_localctx = new BooleanAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 857;
				this.match(Tads2Parser.TRUE);
				}
				break;
			case Tads2Parser.NIL:
				_localctx = new NilAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 858;
				this.match(Tads2Parser.NIL);
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
		this.enterRule(_localctx, 100, Tads2Parser.RULE_identifierAtom);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 861;
			_la = this._input.LA(1);
			if (!(((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (Tads2Parser.STRING - 37)) | (1 << (Tads2Parser.IN - 37)) | (1 << (Tads2Parser.STEP - 37)) | (1 << (Tads2Parser.IS - 37)) | (1 << (Tads2Parser.OPERATOR - 37)))) !== 0) || _la === Tads2Parser.ID)) {
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
		this.enterRule(_localctx, 102, Tads2Parser.RULE_params);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 866;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 108, this._ctx) ) {
			case 1:
				{
				this.state = 863;
				this.optionallyTypedOptionalId();
				}
				break;

			case 2:
				{
				this.state = 864;
				this.match(Tads2Parser.SPREAD);
				}
				break;

			case 3:
				{
				this.state = 865;
				this.array();
				}
				break;
			}
			this.state = 874;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 110, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 868;
					this.match(Tads2Parser.COMMA);
					this.state = 870;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 109, this._ctx) ) {
					case 1:
						{
						this.state = 869;
						this.params();
						}
						break;
					}
					}
					}
				}
				this.state = 876;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 110, this._ctx);
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
		this.enterRule(_localctx, 104, Tads2Parser.RULE_optionallyTypedOptionalId);
		let _la: number;
		try {
			this.state = 900;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 116, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				{
				this.state = 880;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 111, this._ctx) ) {
				case 1:
					{
					this.state = 877;
					_localctx._identifier = this.identifierAtom();
					this.state = 878;
					this.match(Tads2Parser.COLON);
					}
					break;
				}
				this.state = 883;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 112, this._ctx) ) {
				case 1:
					{
					this.state = 882;
					_localctx._type = this.identifierAtom();
					}
					break;
				}
				{
				this.state = 885;
				_localctx._name = this.identifierAtom();
				}
				this.state = 887;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads2Parser.OPTIONAL) {
					{
					this.state = 886;
					_localctx._optional = this.match(Tads2Parser.OPTIONAL);
					}
				}

				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				{
				this.state = 889;
				_localctx._identifier = this.identifierAtom();
				this.state = 890;
				_localctx._emptyColon = this.match(Tads2Parser.COLON);
				this.state = 892;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === Tads2Parser.OPTIONAL) {
					{
					this.state = 891;
					_localctx._optional = this.match(Tads2Parser.OPTIONAL);
					}
				}

				}
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				{
				this.state = 894;
				_localctx._identifier = this.identifierAtom();
				this.state = 895;
				_localctx._emptyColon = this.match(Tads2Parser.COLON);
				this.state = 896;
				_localctx._hasDefault = this.match(Tads2Parser.ASSIGN);
				this.state = 898;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 115, this._ctx) ) {
				case 1:
					{
					this.state = 897;
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
		case 9:
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
			return this.precpred(this._ctx, 42);

		case 2:
			return this.precpred(this._ctx, 40);

		case 3:
			return this.precpred(this._ctx, 26);

		case 4:
			return this.precpred(this._ctx, 25);

		case 5:
			return this.precpred(this._ctx, 24);

		case 6:
			return this.precpred(this._ctx, 23);

		case 7:
			return this.precpred(this._ctx, 22);

		case 8:
			return this.precpred(this._ctx, 21);

		case 9:
			return this.precpred(this._ctx, 20);

		case 10:
			return this.precpred(this._ctx, 18);

		case 11:
			return this.precpred(this._ctx, 17);

		case 12:
			return this.precpred(this._ctx, 16);

		case 13:
			return this.precpred(this._ctx, 15);

		case 14:
			return this.precpred(this._ctx, 14);

		case 15:
			return this.precpred(this._ctx, 13);

		case 16:
			return this.precpred(this._ctx, 12);

		case 17:
			return this.precpred(this._ctx, 11);

		case 18:
			return this.precpred(this._ctx, 9);

		case 19:
			return this.precpred(this._ctx, 8);

		case 20:
			return this.precpred(this._ctx, 7);

		case 21:
			return this.precpred(this._ctx, 2);

		case 22:
			return this.precpred(this._ctx, 41);

		case 23:
			return this.precpred(this._ctx, 39);

		case 24:
			return this.precpred(this._ctx, 34);

		case 25:
			return this.precpred(this._ctx, 33);

		case 26:
			return this.precpred(this._ctx, 32);

		case 27:
			return this.precpred(this._ctx, 31);

		case 28:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03i\u0389\x04\x02" +
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
		"\x03\x03\x03\x03\x03\x03\x05\x03\x80\n\x03\x03\x04\x03\x04\x05\x04\x84" +
		"\n\x04\x03\x04\x03\x04\x03\x04\x07\x04\x89\n\x04\f\x04\x0E\x04\x8C\v\x04" +
		"\x03\x04\x03\x04\x03\x05\x03\x05\x06\x05\x92\n\x05\r\x05\x0E\x05\x93\x03" +
		"\x05\x03\x05\x03\x06\x03\x06\x06\x06\x9A\n\x06\r\x06\x0E\x06\x9B\x03\x06" +
		"\x03\x06\x03\x07\x03\x07\x05\x07\xA2\n\x07\x03\x07\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x05\x07\xAA\n\x07\x03\x07\x03\x07\x03\x07\x03\x07" +
		"\x03\x07\x03\x07\x05\x07\xB2\n\x07\x05\x07\xB4\n\x07\x03\b\x03\b\x03\b" +
		"\x07\b\xB9\n\b\f\b\x0E\b\xBC\v\b\x03\t\x05\t\xBF\n\t\x03\t\x07\t\xC2\n" +
		"\t\f\t\x0E\t\xC5\v\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v\x06" +
		"\v\xCF\n\v\r\v\x0E\v\xD0\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x05\v\xD9" +
		"\n\v\x03\v\x03\v\x07\v\xDD\n\v\f\v\x0E\v\xE0\v\v\x03\f\x03\f\x05\f\xE4" +
		"\n\f\x03\f\x03\f\x03\f\x07\f\xE9\n\f\f\f\x0E\f\xEC\v\f\x03\f\x03\f\x03" +
		"\r\x07\r\xF1\n\r\f\r\x0E\r\xF4\v\r\x03\r\x03\r\x03\r\x03\r\x07\r\xFA\n" +
		"\r\f\r\x0E\r\xFD\v\r\x03\r\x03\r\x03\x0E\x07\x0E\u0102\n\x0E\f\x0E\x0E" +
		"\x0E\u0105\v\x0E\x03\x0E\x03\x0E\x05\x0E\u0109\n\x0E\x03\x0E\x03\x0E\x03" +
		"\x0E\x07\x0E\u010E\n\x0E\f\x0E\x0E\x0E\u0111\v\x0E\x03\x0E\x03\x0E\x03" +
		"\x0F\x03\x0F\x03\x0F\x05\x0F\u0118\n\x0F\x03\x0F\x03\x0F\x03\x10\x05\x10" +
		"\u011D\n\x10\x03\x10\x05\x10\u0120\n\x10\x05\x10\u0122\n\x10\x03\x10\x03" +
		"\x10\x03\x10\x05\x10\u0127\n\x10\x03\x10\x05\x10\u012A\n\x10\x03\x10\x03" +
		"\x10\x03\x10\x03\x10\x03\x10\x06\x10\u0131\n\x10\r\x10\x0E\x10\u0132\x05" +
		"\x10\u0135\n\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x05\x10\u013C" +
		"\n\x10\x03\x10\x05\x10\u013F\n\x10\x03\x10\x03\x10\x06\x10\u0143\n\x10" +
		"\r\x10\x0E\x10\u0144\x05\x10\u0147\n\x10\x05\x10\u0149\n\x10\x03\x11\x05" +
		"\x11\u014C\n\x11\x03\x11\x05\x11\u014F\n\x11\x03\x11\x05\x11\u0152\n\x11" +
		"\x05\x11\u0154\n\x11\x03\x11\x07\x11\u0157\n\x11\f\x11\x0E\x11\u015A\v" +
		"\x11\x03\x11\x03\x11\x05\x11\u015E\n\x11\x03\x11\x03\x11\x03\x11\x03\x11" +
		"\x05\x11\u0164\n\x11\x03\x11\x03\x11\x05\x11\u0168\n\x11\x03\x12\x03\x12" +
		"\x05\x12\u016C\n\x12\x03\x12\x07\x12\u016F\n\x12\f\x12\x0E\x12\u0172\v" +
		"\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x15\x03" +
		"\x15\x03\x15\x07\x15\u017E\n\x15\f\x15\x0E\x15\u0181\v\x15\x03\x16\x03" +
		"\x16\x07\x16\u0185\n\x16\f\x16\x0E\x16\u0188\v\x16\x03\x17\x03\x17\x03" +
		"\x17\x06\x17\u018D\n\x17\r\x17\x0E\x17\u018E\x03\x18\x03\x18\x05\x18\u0193" +
		"\n\x18\x03\x18\x03\x18\x07\x18\u0197\n\x18\f\x18\x0E\x18\u019A\v\x18\x03" +
		"\x19\x05\x19\u019D\n\x19\x03\x19\x05\x19\u01A0\n\x19\x05\x19\u01A2\n\x19" +
		"\x03\x19\x03\x19\x03\x19\x05\x19\u01A7\n\x19\x03\x19\x05\x19\u01AA\n\x19" +
		"\x03\x19\x03\x19\x03\x19\x06\x19\u01AF\n\x19\r\x19\x0E\x19\u01B0\x05\x19" +
		"\u01B3\n\x19\x03\x1A\x03\x1A\x07\x1A\u01B7\n\x1A\f\x1A\x0E\x1A\u01BA\v" +
		"\x1A\x03\x1A\x03\x1A\x05\x1A\u01BE\n\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u01D4" +
		"\n\x1B\x03\x1C\x03\x1C\x07\x1C\u01D8\n\x1C\f\x1C\x0E\x1C\u01DB\v\x1C\x03" +
		"\x1C\x03\x1C\x03\x1D\x03\x1D\x05\x1D\u01E1\n\x1D\x03\x1D\x03\x1D\x03\x1E" +
		"\x03\x1E\x05\x1E\u01E7\n\x1E\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x05\x1F\u01ED" +
		"\n\x1F\x03\x1F\x03\x1F\x03 \x03 \x03 \x03!\x03!\x03!\x03!\x03!\x03!\x03" +
		"!\x03!\x05!\u01FC\n!\x03!\x03!\x03!\x07!\u0201\n!\f!\x0E!\u0204\v!\x05" +
		"!\u0206\n!\x07!\u0208\n!\f!\x0E!\u020B\v!\x03!\x03!\x03\"\x03\"\x03\"" +
		"\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03$\x03$\x03$\x03$\x03" +
		"$\x03$\x03$\x03$\x03%\x03%\x05%\u0225\n%\x03%\x03%\x03&\x03&\x05&\u022B" +
		"\n&\x03&\x03&\x03\'\x03\'\x05\'\u0231\n\'\x03\'\x03\'\x03(\x03(\x03(\x03" +
		"(\x03(\x05(\u023A\n(\x03(\x03(\x03)\x03)\x03)\x05)\u0241\n)\x03)\x03)" +
		"\x03)\x03*\x03*\x03*\x05*\u0249\n*\x03*\x03*\x05*\u024D\n*\x03*\x03*\x05" +
		"*\u0251\n*\x03*\x03*\x03*\x03+\x03+\x03+\x03+\x03+\x05+\u025B\n+\x03+" +
		"\x03+\x07+\u025F\n+\f+\x0E+\u0262\v+\x03+\x03+\x05+\u0266\n+\x03,\x03" +
		",\x03,\x05,\u026B\n,\x03-\x05-\u026E\n-\x03-\x03-\x03.\x03.\x03.\x03/" +
		"\x03/\x03/\x03/\x05/\u0279\n/\x03/\x03/\x030\x030\x030\x030\x030\x070" +
		"\u0282\n0\f0\x0E0\u0285\v0\x030\x030\x050\u0289\n0\x031\x031\x031\x03" +
		"1\x031\x032\x032\x032\x072\u0293\n2\f2\x0E2\u0296\v2\x032\x062\u0299\n" +
		"2\r2\x0E2\u029A\x032\x032\x032\x032\x032\x032\x032\x032\x032\x052\u02A6" +
		"\n2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x052\u02B1\n2\x032\x03" +
		"2\x052\u02B5\n2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x03" +
		"2\x052\u02C2\n2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x03" +
		"2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x03" +
		"2\x052\u02DD\n2\x032\x032\x032\x032\x032\x032\x032\x032\x052\u02E7\n2" +
		"\x032\x032\x032\x032\x032\x032\x032\x052\u02F0\n2\x032\x032\x032\x032" +
		"\x052\u02F6\n2\x032\x032\x032\x032\x052\u02FC\n2\x032\x032\x032\x032\x03" +
		"2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x05" +
		"2\u0310\n2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x03" +
		"2\x032\x052\u031F\n2\x032\x032\x032\x032\x032\x032\x052\u0327\n2\x032" +
		"\x032\x032\x062\u032C\n2\r2\x0E2\u032D\x032\x032\x032\x032\x032\x052\u0335" +
		"\n2\x032\x032\x032\x032\x052\u033B\n2\x032\x032\x052\u033F\n2\x032\x03" +
		"2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x052\u034C\n2\x072\u034E" +
		"\n2\f2\x0E2\u0351\v2\x033\x033\x033\x033\x033\x033\x033\x033\x033\x03" +
		"3\x033\x053\u035E\n3\x034\x034\x035\x035\x035\x055\u0365\n5\x035\x035" +
		"\x055\u0369\n5\x075\u036B\n5\f5\x0E5\u036E\v5\x036\x036\x036\x056\u0373" +
		"\n6\x036\x056\u0376\n6\x036\x036\x056\u037A\n6\x036\x036\x036\x056\u037F" +
		"\n6\x036\x036\x036\x036\x056\u0385\n6\x056\u0387\n6\x036\x05\u0132\u0144" +
		"\u01B0\x02\x04\x14b7\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02" +
		"\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02" +
		"\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02<\x02" +
		">\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02" +
		"Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02\x02\f\x03\x02-/\x07\x02" +
		":;==@@CCII\x04\x02;;TT\x03\x02FG\x04\x02ABSS\x04\x02@@CC\x04\x02__ac\x03" +
		"\x02DE\x04\x02``de\b\x02\'\')),,0066KK\x02\u0418\x02o\x03\x02\x02\x02" +
		"\x04\x7F\x03\x02\x02\x02\x06\x81\x03\x02\x02\x02\b\x8F\x03\x02\x02\x02" +
		"\n\x97\x03\x02\x02\x02\f\xA1\x03\x02\x02\x02\x0E\xB5\x03\x02\x02\x02\x10" +
		"\xBE\x03\x02\x02\x02\x12\xC6\x03\x02\x02\x02\x14\xD8\x03\x02\x02\x02\x16" +
		"\xE1\x03\x02\x02\x02\x18\xF2\x03\x02\x02\x02\x1A\u0103\x03\x02\x02\x02" +
		"\x1C\u0114\x03\x02\x02\x02\x1E\u0121\x03\x02\x02\x02 \u0153\x03\x02\x02" +
		"\x02\"\u0169\x03\x02\x02\x02$\u0173\x03\x02\x02\x02&\u0177\x03\x02\x02" +
		"\x02(\u017A\x03\x02\x02\x02*\u0186\x03\x02\x02\x02,\u0189\x03\x02\x02" +
		"\x02.\u0192\x03\x02\x02\x020\u01A1\x03\x02\x02\x022\u01BD\x03\x02\x02" +
		"\x024\u01D3\x03\x02\x02\x026\u01D5\x03\x02\x02\x028\u01DE\x03\x02\x02" +
		"\x02:\u01E4\x03\x02\x02\x02<\u01EA\x03\x02\x02\x02>\u01F0\x03\x02\x02" +
		"\x02@\u01F3\x03\x02\x02\x02B\u020E\x03\x02\x02\x02D\u0211\x03\x02\x02" +
		"\x02F\u021A\x03\x02\x02\x02H\u0222\x03\x02\x02\x02J\u0228\x03\x02\x02" +
		"\x02L\u022E\x03\x02\x02\x02N\u0234\x03\x02\x02\x02P\u023D\x03\x02\x02" +
		"\x02R\u0245\x03\x02\x02\x02T\u0255\x03\x02\x02\x02V\u0267\x03\x02\x02" +
		"\x02X\u026D\x03\x02\x02\x02Z\u0271\x03\x02\x02\x02\\\u0274\x03\x02\x02" +
		"\x02^\u027C\x03\x02\x02\x02`\u028A\x03\x02\x02\x02b\u02C1\x03\x02\x02" +
		"\x02d\u035D\x03\x02\x02\x02f\u035F\x03\x02\x02\x02h\u0364\x03\x02\x02" +
		"\x02j\u0386\x03\x02\x02\x02ln\x05\x04\x03\x02ml\x03\x02\x02\x02nq\x03" +
		"\x02\x02\x02om\x03\x02\x02\x02op\x03\x02\x02\x02pr\x03\x02\x02\x02qo\x03" +
		"\x02\x02\x02rs\x07\x02\x02\x03s\x03\x03\x02\x02\x02t\x80\x05\x16\f\x02" +
		"u\x80\x05\x1C\x0F\x02v\x80\x05 \x11\x02w\x80\x05\x18\r\x02x\x80\x05\x1A" +
		"\x0E\x02y\x80\x05\x1E\x10\x02z\x80\x05\f\x07\x02{\x80\x05\n\x06\x02|\x80" +
		"\x05\b\x05\x02}\x80\x05\x06\x04\x02~\x80\x07U\x02\x02\x7Ft\x03\x02\x02" +
		"\x02\x7Fu\x03\x02\x02\x02\x7Fv\x03\x02\x02\x02\x7Fw\x03\x02\x02\x02\x7F" +
		"x\x03\x02\x02\x02\x7Fy\x03\x02\x02\x02\x7Fz\x03\x02\x02\x02\x7F{\x03\x02" +
		"\x02\x02\x7F|\x03\x02\x02\x02\x7F}\x03\x02\x02\x02\x7F~\x03\x02\x02\x02" +
		"\x80\x05\x03\x02\x02\x02\x81\x83\x079\x02\x02\x82\x84\x05b2\x02\x83\x82" +
		"\x03\x02\x02\x02\x83\x84\x03\x02\x02\x02\x84\x8A\x03\x02\x02\x02\x85\x86" +
		"\x05b2\x02\x86\x87\x07Q\x02\x02\x87\x89\x03\x02\x02\x02\x88\x85\x03\x02" +
		"\x02\x02\x89\x8C\x03\x02\x02\x02\x8A\x88\x03\x02\x02\x02\x8A\x8B\x03\x02" +
		"\x02\x02\x8B\x8D\x03\x02\x02\x02\x8C\x8A\x03\x02\x02\x02\x8D\x8E\x07U" +
		"\x02\x02\x8E\x07\x03\x02\x02\x02\x8F\x91\x078\x02\x02\x90\x92\x05b2\x02" +
		"\x91\x90\x03\x02\x02\x02\x92\x93\x03\x02\x02\x02\x93\x91\x03\x02\x02\x02" +
		"\x93\x94\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95\x96\x07U\x02\x02" +
		"\x96\t\x03\x02\x02\x02\x97\x99\x077\x02\x02\x98\x9A\x05b2\x02\x99\x98" +
		"\x03\x02\x02\x02\x9A\x9B\x03\x02\x02\x02\x9B\x99\x03\x02\x02\x02\x9B\x9C" +
		"\x03\x02\x02\x02\x9C\x9D\x03\x02\x02\x02\x9D\x9E\x07U\x02\x02\x9E\v\x03" +
		"\x02\x02\x02\x9F\xA2\x07\x12\x02\x02\xA0\xA2\x07\x13\x02\x02\xA1\x9F\x03" +
		"\x02\x02\x02\xA1\xA0\x03\x02\x02\x02\xA1\xA2\x03\x02\x02\x02\xA2\xA3\x03" +
		"\x02\x02\x02\xA3\xA4\x07\x03\x02\x02\xA4\xA9\x05f4\x02\xA5\xA6\x07V\x02" +
		"\x02\xA6\xA7\x05f4\x02\xA7\xA8\x07W\x02\x02\xA8\xAA\x03\x02\x02\x02\xA9" +
		"\xA5\x03\x02\x02\x02\xA9\xAA\x03\x02\x02\x02\xAA\xAB\x03\x02\x02\x02\xAB" +
		"\xAC\x07P\x02\x02\xAC\xAD\x05\x0E\b\x02\xAD\xB3\x07P\x02\x02\xAE\xB1\x05" +
		"(\x15\x02\xAF\xB2\x05$\x13\x02\xB0\xB2\x05&\x14\x02\xB1\xAF\x03\x02\x02" +
		"\x02\xB1\xB0\x03\x02\x02\x02\xB2\xB4\x03\x02\x02\x02\xB3\xAE\x03\x02\x02" +
		"\x02\xB3\xB4\x03\x02\x02\x02\xB4\r\x03\x02\x02\x02\xB5\xBA\x05\x10\t\x02" +
		"\xB6\xB7\x07T\x02\x02\xB7\xB9\x05\x10\t\x02\xB8\xB6\x03\x02\x02\x02\xB9" +
		"\xBC\x03\x02\x02\x02\xBA\xB8\x03\x02\x02\x02\xBA\xBB\x03\x02\x02\x02\xBB" +
		"\x0F\x03\x02\x02\x02\xBC\xBA\x03\x02\x02\x02\xBD\xBF\x05\x12\n\x02\xBE" +
		"\xBD\x03\x02\x02\x02\xBE\xBF\x03\x02\x02\x02\xBF\xC3\x03\x02\x02\x02\xC0" +
		"\xC2\x05\x14\v\x02\xC1\xC0\x03\x02\x02\x02\xC2\xC5\x03\x02\x02\x02\xC3" +
		"\xC1\x03\x02\x02\x02\xC3\xC4\x03\x02\x02\x02\xC4\x11\x03\x02\x02\x02\xC5" +
		"\xC3\x03\x02\x02\x02\xC6\xC7\x07X\x02\x02\xC7\xC8\x05f4\x02\xC8\xC9\x07" +
		"M\x02\x02\xC9\xCA\x07Y\x02\x02\xCA\x13\x03\x02\x02\x02\xCB\xCC\b\v\x01" +
		"\x02\xCC\xCE\x07V\x02\x02\xCD\xCF\x05\x14\v\x02\xCE\xCD\x03\x02\x02\x02" +
		"\xCF\xD0\x03\x02\x02\x02\xD0\xCE\x03\x02\x02\x02\xD0\xD1\x03\x02\x02\x02" +
		"\xD1\xD2\x03\x02\x02\x02\xD2\xD3\x07W\x02\x02\xD3\xD9\x03\x02\x02\x02" +
		"\xD4\xD5\x07T\x02\x02\xD5\xD9\x05\x14\v\x05\xD6\xD9\x05b2\x02\xD7\xD9" +
		"\x07S\x02\x02\xD8\xCB\x03\x02\x02\x02\xD8\xD4\x03\x02\x02\x02\xD8\xD6" +
		"\x03\x02\x02\x02\xD8\xD7\x03\x02\x02\x02\xD9\xDE\x03\x02\x02\x02\xDA\xDB" +
		"\f\x06\x02\x02\xDB\xDD\x07T\x02\x02\xDC\xDA\x03\x02\x02\x02\xDD\xE0\x03" +
		"\x02\x02\x02\xDE\xDC\x03\x02\x02\x02\xDE\xDF\x03\x02\x02\x02\xDF\x15\x03" +
		"\x02\x02\x02\xE0\xDE\x03\x02\x02\x02\xE1\xE3\x07\x0F\x02\x02\xE2\xE4\x07" +
		"4\x02\x02\xE3\xE2\x03\x02\x02\x02\xE3\xE4\x03\x02\x02\x02\xE4\xE5\x03" +
		"\x02\x02\x02\xE5\xEA\x05f4\x02\xE6\xE7\x07Q\x02\x02\xE7\xE9\x05f4\x02" +
		"\xE8\xE6\x03\x02\x02\x02\xE9\xEC\x03\x02\x02\x02\xEA\xE8\x03\x02\x02\x02" +
		"\xEA\xEB\x03\x02\x02\x02\xEB\xED\x03\x02\x02\x02\xEC\xEA\x03\x02\x02\x02" +
		"\xED\xEE\x07U\x02\x02\xEE\x17\x03\x02\x02\x02\xEF\xF1\x07@\x02\x02\xF0" +
		"\xEF\x03\x02\x02\x02\xF1\xF4\x03\x02\x02\x02\xF2\xF0\x03\x02\x02\x02\xF2" +
		"\xF3\x03\x02\x02\x02\xF3\xF5\x03\x02\x02\x02\xF4\xF2\x03\x02\x02\x02\xF5" +
		"\xF6\x07\x1F\x02\x02\xF6\xFB\x05f4\x02\xF7\xF8\x07Q\x02\x02\xF8\xFA\x05" +
		"f4\x02\xF9\xF7\x03\x02\x02\x02\xFA\xFD\x03\x02\x02\x02\xFB\xF9\x03\x02" +
		"\x02\x02\xFB\xFC\x03\x02\x02\x02\xFC\xFE\x03\x02\x02\x02\xFD\xFB\x03\x02" +
		"\x02\x02\xFE\xFF\x07U\x02\x02\xFF\x19\x03\x02\x02\x02\u0100\u0102\x07" +
		"@\x02\x02\u0101\u0100\x03\x02\x02\x02\u0102\u0105\x03\x02\x02\x02\u0103" +
		"\u0101\x03\x02\x02\x02\u0103\u0104\x03\x02\x02\x02\u0104\u0106\x03\x02" +
		"\x02\x02\u0105\u0103\x03\x02\x02\x02\u0106\u0108\x07 \x02\x02\u0107\u0109" +
		"\x07\x1F\x02\x02\u0108\u0107\x03\x02\x02\x02\u0108\u0109\x03\x02\x02\x02" +
		"\u0109\u010A\x03\x02\x02\x02\u010A\u010F\x05f4\x02\u010B\u010C\x07Q\x02" +
		"\x02\u010C\u010E\x05f4\x02\u010D\u010B\x03\x02\x02\x02\u010E\u0111\x03" +
		"\x02\x02\x02\u010F\u010D\x03\x02\x02\x02\u010F\u0110\x03\x02\x02\x02\u0110" +
		"\u0112\x03\x02\x02\x02\u0111\u010F\x03\x02\x02\x02\u0112\u0113\x07U\x02" +
		"\x02\u0113\x1B\x03\x02\x02\x02\u0114\u0115\x07!\x02\x02\u0115\u0117\x05" +
		"f4\x02\u0116\u0118\x07[\x02\x02\u0117\u0116\x03\x02\x02\x02\u0117\u0118" +
		"\x03\x02\x02\x02\u0118\u0119\x03\x02\x02\x02\u0119\u011A\x07U\x02\x02" +
		"\u011A\x1D\x03\x02\x02\x02\u011B\u011D\x07\x12\x02\x02\u011C\u011B\x03" +
		"\x02\x02\x02\u011C\u011D\x03\x02\x02\x02\u011D\u0122\x03\x02\x02\x02\u011E" +
		"\u0120\x07\x13\x02\x02\u011F\u011E\x03\x02\x02\x02\u011F\u0120\x03\x02" +
		"\x02\x02\u0120\u0122\x03\x02\x02\x02\u0121\u011C\x03\x02\x02\x02\u0121" +
		"\u011F\x03\x02\x02\x02\u0122\u0148\x03\x02\x02\x02\u0123\u0129\x05f4\x02" +
		"\u0124\u0126\x07V\x02\x02\u0125\u0127\x05h5\x02\u0126\u0125\x03\x02\x02" +
		"\x02\u0126\u0127\x03\x02\x02\x02\u0127\u0128\x03\x02\x02\x02\u0128\u012A" +
		"\x07W\x02\x02\u0129\u0124\x03\x02\x02\x02\u0129\u012A\x03\x02\x02\x02" +
		"\u012A\u012B\x03\x02\x02\x02\u012B\u012C\x07P\x02\x02\u012C\u012D\x07" +
		"\x07\x02\x02\u012D\u0134\x07L\x02\x02\u012E\u0135\x052\x1A\x02\u012F\u0131" +
		"\x05b2\x02\u0130\u012F\x03\x02\x02\x02\u0131\u0132\x03\x02\x02\x02\u0132" +
		"\u0133\x03\x02\x02\x02\u0132\u0130\x03\x02\x02\x02\u0133\u0135\x03\x02" +
		"\x02\x02\u0134\u012E\x03\x02\x02\x02\u0134\u0130\x03\x02\x02\x02\u0135" +
		"\u0149\x03\x02\x02\x02\u0136\u0137\x05f4\x02\u0137\u0138\x07P\x02\x02" +
		"\u0138\u013E\x07\x07\x02\x02\u0139\u013B\x07V\x02\x02\u013A\u013C\x05" +
		"h5\x02\u013B\u013A\x03\x02\x02\x02\u013B\u013C\x03\x02\x02\x02\u013C\u013D" +
		"\x03\x02\x02\x02\u013D\u013F\x07W\x02\x02\u013E\u0139\x03\x02\x02\x02" +
		"\u013E\u013F\x03\x02\x02\x02\u013F\u0146\x03\x02\x02\x02\u0140\u0147\x05" +
		"2\x1A\x02\u0141\u0143\x05b2\x02\u0142\u0141\x03\x02\x02\x02\u0143\u0144" +
		"\x03\x02\x02\x02\u0144\u0145\x03\x02\x02\x02\u0144\u0142\x03\x02\x02\x02" +
		"\u0145\u0147\x03\x02\x02\x02\u0146\u0140\x03\x02\x02\x02\u0146\u0142\x03" +
		"\x02\x02\x02\u0147\u0149\x03\x02\x02\x02\u0148\u0123\x03\x02\x02\x02\u0148" +
		"\u0136\x03\x02\x02\x02\u0149\x1F\x03\x02\x02\x02\u014A\u014C\x07\x12\x02" +
		"\x02\u014B\u014A\x03\x02\x02\x02\u014B\u014C\x03\x02\x02\x02\u014C\u0154" +
		"\x03\x02\x02\x02\u014D\u014F\x07\x13\x02\x02\u014E\u014D\x03\x02\x02\x02" +
		"\u014E\u014F\x03\x02\x02\x02\u014F\u0154\x03\x02\x02\x02\u0150\u0152\x07" +
		"\x10\x02\x02\u0151\u0150\x03\x02\x02\x02\u0151\u0152\x03\x02\x02\x02\u0152" +
		"\u0154\x03\x02\x02\x02\u0153\u014B\x03\x02\x02\x02\u0153\u014E\x03\x02" +
		"\x02\x02\u0153\u0151\x03\x02\x02\x02\u0154\u0158\x03\x02\x02\x02\u0155" +
		"\u0157\x07@\x02\x02\u0156\u0155\x03\x02\x02\x02\u0157\u015A\x03\x02\x02" +
		"\x02\u0158\u0156\x03\x02\x02\x02\u0158\u0159\x03\x02\x02\x02\u0159\u0163" +
		"\x03\x02\x02\x02\u015A\u0158\x03\x02\x02\x02\u015B\u0164\x05(\x15\x02" +
		"\u015C\u015E\x07\x11\x02\x02\u015D\u015C\x03\x02\x02\x02\u015D\u015E\x03" +
		"\x02\x02\x02\u015E\u015F\x03\x02\x02\x02\u015F\u0160\x05f4\x02\u0160\u0161" +
		"\x07P\x02\x02\u0161\u0162\x05(\x15\x02\u0162\u0164\x03\x02\x02\x02\u0163" +
		"\u015B\x03\x02\x02\x02\u0163\u015D\x03\x02\x02\x02\u0164\u0167\x03\x02" +
		"\x02\x02\u0165\u0168\x05$\x13\x02\u0166\u0168\x05&\x14\x02\u0167\u0165" +
		"\x03\x02\x02\x02\u0167\u0166\x03\x02\x02\x02\u0168!\x03\x02\x02\x02\u0169" +
		"\u0170\x05b2\x02\u016A\u016C\x07Q\x02\x02\u016B\u016A\x03\x02\x02\x02" +
		"\u016B\u016C\x03\x02\x02\x02\u016C\u016D\x03\x02\x02\x02\u016D\u016F\x05" +
		"\"\x12\x02\u016E\u016B\x03\x02\x02\x02\u016F\u0172\x03\x02\x02\x02\u0170" +
		"\u016E\x03\x02\x02\x02\u0170\u0171\x03\x02\x02\x02\u0171#\x03\x02\x02" +
		"\x02\u0172\u0170\x03\x02\x02\x02\u0173\u0174\x07]\x02\x02\u0174\u0175" +
		"\x05*\x16\x02\u0175\u0176\x07^\x02\x02\u0176%\x03\x02\x02\x02\u0177\u0178" +
		"\x05*\x16\x02\u0178\u0179\x07U\x02\x02\u0179\'\x03\x02\x02\x02\u017A\u017F" +
		"\x05f4\x02\u017B\u017C\x07Q\x02\x02\u017C\u017E\x05(\x15\x02\u017D\u017B" +
		"\x03\x02\x02\x02\u017E\u0181\x03\x02\x02\x02\u017F\u017D\x03\x02\x02\x02" +
		"\u017F\u0180\x03\x02\x02\x02\u0180)\x03\x02\x02\x02\u0181\u017F\x03\x02" +
		"\x02\x02\u0182\u0185\x05,\x17\x02\u0183\u0185\x050\x19\x02\u0184\u0182" +
		"\x03\x02\x02\x02\u0184\u0183\x03\x02\x02\x02\u0185\u0188\x03\x02\x02\x02" +
		"\u0186\u0184\x03\x02\x02\x02\u0186\u0187\x03\x02\x02\x02\u0187+\x03\x02" +
		"\x02\x02\u0188\u0186\x03\x02\x02\x02\u0189\u018A\x05f4\x02\u018A\u018C" +
		"\x07L\x02\x02\u018B\u018D\x05d3\x02\u018C\u018B\x03\x02\x02\x02\u018D" +
		"\u018E\x03\x02\x02\x02\u018E\u018C\x03\x02\x02\x02\u018E\u018F\x03\x02" +
		"\x02\x02\u018F-\x03\x02\x02\x02\u0190\u0193\x05d3\x02\u0191\u0193\x07" +
		"S\x02\x02\u0192\u0190\x03\x02\x02\x02\u0192\u0191\x03\x02\x02\x02\u0193" +
		"\u0198\x03\x02\x02\x02\u0194\u0195\x07Q\x02\x02\u0195\u0197\x05.\x18\x02" +
		"\u0196\u0194\x03\x02\x02\x02\u0197\u019A\x03\x02\x02\x02\u0198\u0196\x03" +
		"\x02\x02\x02\u0198\u0199\x03\x02\x02\x02\u0199/\x03\x02\x02\x02\u019A" +
		"\u0198\x03\x02\x02\x02\u019B\u019D\x07\x12\x02\x02\u019C\u019B\x03\x02" +
		"\x02\x02\u019C\u019D\x03\x02\x02\x02\u019D\u01A2\x03\x02\x02\x02\u019E" +
		"\u01A0\x07\x13\x02\x02\u019F\u019E\x03\x02\x02\x02\u019F\u01A0\x03\x02" +
		"\x02\x02\u01A0\u01A2\x03\x02\x02\x02\u01A1\u019C\x03\x02\x02\x02\u01A1" +
		"\u019F\x03\x02\x02\x02\u01A2\u01A3\x03\x02\x02\x02\u01A3\u01A9\x05f4\x02" +
		"\u01A4\u01A6\x07V\x02\x02\u01A5\u01A7\x05h5\x02\u01A6\u01A5\x03\x02\x02" +
		"\x02\u01A6\u01A7\x03\x02\x02\x02\u01A7\u01A8\x03\x02\x02\x02\u01A8\u01AA" +
		"\x07W\x02\x02\u01A9\u01A4\x03\x02\x02\x02\u01A9\u01AA\x03\x02\x02\x02" +
		"\u01AA\u01AB\x03\x02\x02\x02\u01AB\u01B2\x07L\x02\x02\u01AC\u01B3\x05" +
		"2\x1A\x02\u01AD\u01AF\x05b2\x02\u01AE\u01AD\x03\x02\x02\x02\u01AF\u01B0" +
		"\x03\x02\x02\x02\u01B0\u01B1\x03\x02\x02\x02\u01B0\u01AE\x03\x02\x02\x02" +
		"\u01B1\u01B3\x03\x02\x02\x02\u01B2\u01AC\x03\x02\x02\x02\u01B2\u01AE\x03" +
		"\x02\x02\x02\u01B31\x03\x02\x02\x02\u01B4\u01B8\x07]\x02\x02\u01B5\u01B7" +
		"\x054\x1B\x02\u01B6\u01B5\x03\x02\x02\x02\u01B7\u01BA\x03\x02\x02\x02" +
		"\u01B8\u01B6\x03\x02\x02\x02\u01B8\u01B9\x03\x02\x02\x02\u01B9\u01BB\x03" +
		"\x02\x02\x02\u01BA\u01B8\x03\x02\x02\x02\u01BB\u01BE\x07^\x02\x02\u01BC" +
		"\u01BE\x054\x1B\x02\u01BD\u01B4\x03\x02\x02\x02\u01BD\u01BC\x03\x02\x02" +
		"\x02\u01BE3\x03\x02\x02\x02\u01BF\u01D4\x05\\/\x02\u01C0\u01D4\x05H%\x02" +
		"\u01C1\u01D4\x05J&\x02\u01C2\u01D4\x05^0\x02\u01C3\u01D4\x05T+\x02\u01C4" +
		"\u01D4\x05R*\x02\u01C5\u01D4\x05N(\x02\u01C6\u01D4\x05P)\x02\u01C7\u01D4" +
		"\x05";
	private static readonly _serializedATNSegment1: string =
		"@!\x02\u01C8\u01D4\x05D#\x02\u01C9\u01D4\x05F$\x02\u01CA\u01D4\x05Z.\x02" +
		"\u01CB\u01D4\x05X-\x02\u01CC\u01D4\x05L\'\x02\u01CD\u01D4\x05B\"\x02\u01CE" +
		"\u01D4\x05> \x02\u01CF\u01D4\x05:\x1E\x02\u01D0\u01D4\x05<\x1F\x02\u01D1" +
		"\u01D4\x058\x1D\x02\u01D2\u01D4\x056\x1C\x02\u01D3\u01BF\x03\x02\x02\x02" +
		"\u01D3\u01C0\x03\x02\x02\x02\u01D3\u01C1\x03\x02\x02\x02\u01D3\u01C2\x03" +
		"\x02\x02\x02\u01D3\u01C3\x03\x02\x02\x02\u01D3\u01C4\x03\x02\x02\x02\u01D3" +
		"\u01C5\x03\x02\x02\x02\u01D3\u01C6\x03\x02\x02\x02\u01D3\u01C7\x03\x02" +
		"\x02\x02\u01D3\u01C8\x03\x02\x02\x02\u01D3\u01C9\x03\x02\x02\x02\u01D3" +
		"\u01CA\x03\x02\x02\x02\u01D3\u01CB\x03\x02\x02\x02\u01D3\u01CC\x03\x02" +
		"\x02\x02\u01D3\u01CD\x03\x02\x02\x02\u01D3\u01CE\x03\x02\x02\x02\u01D3" +
		"\u01CF\x03\x02\x02\x02\u01D3\u01D0\x03\x02\x02\x02\u01D3\u01D1\x03\x02" +
		"\x02\x02\u01D3\u01D2\x03\x02\x02\x02\u01D45\x03\x02\x02\x02\u01D5\u01D9" +
		"\x07]\x02\x02\u01D6\u01D8\x054\x1B\x02\u01D7\u01D6\x03\x02\x02\x02\u01D8" +
		"\u01DB\x03\x02\x02\x02\u01D9\u01D7\x03\x02\x02\x02\u01D9\u01DA\x03\x02" +
		"\x02\x02\u01DA\u01DC\x03\x02\x02\x02\u01DB\u01D9\x03\x02\x02\x02\u01DC" +
		"\u01DD\x07^\x02\x02\u01DD7\x03\x02\x02\x02\u01DE\u01E0\x073\x02\x02\u01DF" +
		"\u01E1\x05f4\x02\u01E0\u01DF\x03\x02\x02\x02\u01E0\u01E1\x03\x02\x02\x02" +
		"\u01E1\u01E2\x03\x02\x02\x02\u01E2\u01E3\x07U\x02\x02\u01E39\x03\x02\x02" +
		"\x02\u01E4\u01E6\x071\x02\x02\u01E5\u01E7\x05f4\x02\u01E6\u01E5\x03\x02" +
		"\x02\x02\u01E6\u01E7\x03\x02\x02\x02\u01E7\u01E8\x03\x02\x02\x02\u01E8" +
		"\u01E9\x07U\x02\x02\u01E9;\x03\x02\x02\x02\u01EA\u01EC\x072\x02\x02\u01EB" +
		"\u01ED\x05f4\x02\u01EC\u01EB\x03\x02\x02\x02\u01EC\u01ED\x03\x02\x02\x02" +
		"\u01ED\u01EE\x03\x02\x02\x02\u01EE\u01EF\x07U\x02\x02\u01EF=\x03\x02\x02" +
		"\x02\u01F0\u01F1\x05f4\x02\u01F1\u01F2\x07P\x02\x02\u01F2?\x03\x02\x02" +
		"\x02\u01F3\u01F4\x07\x04\x02\x02\u01F4\u01F5\x07V\x02\x02\u01F5\u01F6" +
		"\x05b2\x02\u01F6\u01F7\x07W\x02\x02\u01F7\u0209\x07]\x02\x02\u01F8\u01F9" +
		"\x07\x05\x02\x02\u01F9\u01FC\x05b2\x02\u01FA\u01FC\x07\x06\x02\x02\u01FB" +
		"\u01F8\x03\x02\x02\x02\u01FB\u01FA\x03\x02\x02\x02\u01FC\u01FD\x03\x02" +
		"\x02\x02\u01FD\u0205\x07P\x02\x02\u01FE\u0206\x052\x1A\x02\u01FF\u0201" +
		"\x054\x1B\x02\u0200\u01FF\x03\x02\x02\x02\u0201\u0204\x03\x02\x02\x02" +
		"\u0202\u0200\x03\x02\x02\x02\u0202\u0203\x03\x02\x02\x02\u0203\u0206\x03" +
		"\x02\x02\x02\u0204\u0202\x03\x02\x02\x02\u0205\u01FE\x03\x02\x02\x02\u0205" +
		"\u0202\x03\x02\x02\x02\u0206\u0208\x03\x02\x02\x02\u0207\u01FB\x03\x02" +
		"\x02\x02\u0208\u020B\x03\x02\x02\x02\u0209\u0207\x03\x02\x02\x02\u0209" +
		"\u020A\x03\x02\x02\x02\u020A\u020C\x03\x02\x02\x02\u020B\u0209\x03\x02" +
		"\x02\x02\u020C\u020D\x07^\x02\x02\u020DA\x03\x02\x02\x02\u020E\u020F\x07" +
		"\b\x02\x02\u020F\u0210\x05b2\x02\u0210C\x03\x02\x02\x02\u0211\u0212\x07" +
		"\v\x02\x02\u0212\u0213\x07V\x02\x02\u0213\u0214\x07\x19\x02\x02\u0214" +
		"\u0215\x07K\x02\x02\u0215\u0216\x07)\x02\x02\u0216\u0217\x05b2\x02\u0217" +
		"\u0218\x07W\x02\x02\u0218\u0219\x052\x1A\x02\u0219E\x03\x02\x02\x02\u021A" +
		"\u021B\x07(\x02\x02\u021B\u021C\x07V\x02\x02\u021C\u021D\x05b2\x02\u021D" +
		"\u021E\x07)\x02\x02\u021E\u021F\x05b2\x02\u021F\u0220\x07W\x02\x02\u0220" +
		"\u0221\x052\x1A\x02\u0221G\x03\x02\x02\x02\u0222\u0224\x07#\x02\x02\u0223" +
		"\u0225\x05b2\x02\u0224\u0223\x03\x02\x02\x02\u0224\u0225\x03\x02\x02\x02" +
		"\u0225\u0226\x03\x02\x02\x02\u0226\u0227\x07U\x02\x02\u0227I\x03\x02\x02" +
		"\x02\u0228\u022A\x07$\x02\x02\u0229\u022B\x05b2\x02\u022A\u0229\x03\x02" +
		"\x02\x02\u022A\u022B\x03\x02\x02\x02\u022B\u022C\x03\x02\x02\x02\u022C" +
		"\u022D\x07U\x02\x02\u022DK\x03\x02\x02\x02\u022E\u0230\x07%\x02\x02\u022F" +
		"\u0231\x05b2\x02\u0230\u022F\x03\x02\x02\x02\u0230\u0231\x03\x02\x02\x02" +
		"\u0231\u0232\x03\x02\x02\x02\u0232\u0233\x07U\x02\x02\u0233M\x03\x02\x02" +
		"\x02\u0234\u0235\x07\x16\x02\x02\u0235\u0236\x052\x1A\x02\u0236\u0237" +
		"\x07\x17\x02\x02\u0237\u0239\x07V\x02\x02\u0238\u023A\x05b2\x02\u0239" +
		"\u0238\x03\x02\x02\x02\u0239\u023A\x03\x02\x02\x02\u023A\u023B\x03\x02" +
		"\x02\x02\u023B\u023C\x07W\x02\x02\u023CO\x03\x02\x02\x02\u023D\u023E\x07" +
		"\x17\x02\x02\u023E\u0240\x07V\x02\x02\u023F\u0241\x05b2\x02\u0240\u023F" +
		"\x03\x02\x02\x02\u0240\u0241\x03\x02\x02\x02\u0241\u0242\x03\x02\x02\x02" +
		"\u0242\u0243\x07W\x02\x02\u0243\u0244\x052\x1A\x02\u0244Q\x03\x02\x02" +
		"\x02\u0245\u0246\x07\v\x02\x02\u0246\u0248\x07V\x02\x02\u0247\u0249\x05" +
		"b2\x02\u0248\u0247\x03\x02\x02\x02\u0248\u0249\x03\x02\x02\x02\u0249\u024A" +
		"\x03\x02\x02\x02\u024A\u024C\x07U\x02\x02\u024B\u024D\x05b2\x02\u024C" +
		"\u024B\x03\x02\x02\x02\u024C\u024D\x03\x02\x02\x02\u024D\u024E\x03\x02" +
		"\x02\x02\u024E\u0250\x07U\x02\x02\u024F\u0251\x05b2\x02\u0250\u024F\x03" +
		"\x02\x02\x02\u0250\u0251\x03\x02\x02\x02\u0251\u0252\x03\x02\x02\x02\u0252" +
		"\u0253\x07W\x02\x02\u0253\u0254\x052\x1A\x02\u0254S\x03\x02\x02\x02\u0255" +
		"\u0256\x07\f\x02\x02\u0256\u0260\x052\x1A\x02\u0257\u0258\x07\r\x02\x02" +
		"\u0258\u025A\x07V\x02\x02\u0259\u025B\x05h5\x02\u025A\u0259\x03\x02\x02" +
		"\x02\u025A\u025B\x03\x02\x02\x02\u025B\u025C\x03\x02\x02\x02\u025C\u025D" +
		"\x07W\x02\x02\u025D\u025F\x052\x1A\x02\u025E\u0257\x03\x02\x02\x02\u025F" +
		"\u0262\x03\x02\x02\x02\u0260\u025E\x03\x02\x02\x02\u0260\u0261\x03\x02" +
		"\x02\x02\u0261\u0265\x03\x02\x02\x02\u0262\u0260\x03\x02\x02\x02\u0263" +
		"\u0264\x07\x0E\x02\x02\u0264\u0266\x052\x1A\x02\u0265\u0263\x03\x02\x02" +
		"\x02\u0265\u0266\x03\x02\x02\x02\u0266U\x03\x02\x02\x02\u0267\u026A\x05" +
		"b2\x02\u0268\u0269\x07R\x02\x02\u0269\u026B\x05V,\x02\u026A\u0268\x03" +
		"\x02\x02\x02\u026A\u026B\x03\x02\x02\x02\u026BW\x03\x02\x02\x02\u026C" +
		"\u026E\x05b2\x02\u026D\u026C\x03\x02\x02\x02\u026D\u026E\x03\x02\x02\x02" +
		"\u026E\u026F\x03\x02\x02\x02\u026F\u0270\x07U\x02\x02\u0270Y\x03\x02\x02" +
		"\x02\u0271\u0272\x07Z\x02\x02\u0272\u0273\x07U\x02\x02\u0273[\x03\x02" +
		"\x02\x02\u0274\u0275\x07\x19\x02\x02\u0275\u0278\x05f4\x02\u0276\u0277" +
		"\x07L\x02\x02\u0277\u0279\x05b2\x02\u0278\u0276\x03\x02\x02\x02\u0278" +
		"\u0279\x03\x02\x02\x02\u0279\u027A\x03\x02\x02\x02\u027A\u027B\x07U\x02" +
		"\x02\u027B]\x03\x02\x02\x02\u027C\u027D\x07\x15\x02\x02\u027D\u0283\x05" +
		"`1\x02\u027E\u027F\x07\x18\x02\x02\u027F\u0280\x07\x15\x02\x02\u0280\u0282" +
		"\x05`1\x02\u0281\u027E\x03\x02\x02\x02\u0282\u0285\x03\x02\x02\x02\u0283" +
		"\u0281\x03\x02\x02\x02\u0283\u0284\x03\x02\x02\x02\u0284\u0288\x03\x02" +
		"\x02\x02\u0285\u0283\x03\x02\x02\x02\u0286\u0287\x07\x18\x02\x02\u0287" +
		"\u0289\x052\x1A\x02\u0288\u0286\x03\x02\x02\x02\u0288\u0289\x03\x02\x02" +
		"\x02\u0289_\x03\x02\x02\x02\u028A\u028B\x07V\x02\x02\u028B\u028C\x05b" +
		"2\x02\u028C\u028D\x07W\x02\x02\u028D\u028E\x052\x1A\x02\u028Ea\x03\x02" +
		"\x02\x02\u028F\u0298\b2\x01\x02\u0290\u0294\x07X\x02\x02\u0291\u0293\x05" +
		"b2\x02\u0292\u0291\x03\x02\x02\x02\u0293\u0296\x03\x02\x02\x02\u0294\u0292" +
		"\x03\x02\x02\x02\u0294\u0295\x03\x02\x02\x02\u0295\u0297\x03\x02\x02\x02" +
		"\u0296\u0294\x03\x02\x02\x02\u0297\u0299\x07Y\x02\x02\u0298\u0290\x03" +
		"\x02\x02\x02\u0299\u029A\x03\x02\x02\x02\u029A\u0298\x03\x02\x02\x02\u029A" +
		"\u029B\x03\x02\x02\x02\u029B\u02C2\x03\x02\x02\x02\u029C\u029D\x07\x1E" +
		"\x02\x02\u029D\u02C2\x05b2(\u029E\u029F\x07\x1D\x02\x02\u029F\u02C2\x05" +
		"b2\'\u02A0\u02A1\x07\x11\x02\x02\u02A1\u02C2\x05b2&\u02A2\u02C2\x05d3" +
		"\x02\u02A3\u02A5\x07V\x02\x02\u02A4\u02A6\x05b2\x02\u02A5\u02A4\x03\x02" +
		"\x02\x02\u02A5\u02A6\x03\x02\x02\x02\u02A6\u02A7\x03\x02\x02\x02\u02A7" +
		"\u02C2\x07W\x02\x02\u02A8\u02A9\x07\x19\x02\x02\u02A9\u02C2\x05b2\x1F" +
		"\u02AA\u02AB\x07&\x02\x02\u02AB\u02C2\x05b2\x1E\u02AC\u02AD\x07\t\x02" +
		"\x02\u02AD\u02C2\x05b2\x1D\u02AE\u02B0\x07]\x02\x02\u02AF\u02B1\x05h5" +
		"\x02\u02B0\u02AF\x03\x02\x02\x02\u02B0\u02B1\x03\x02\x02\x02\u02B1\u02B2" +
		"\x03\x02\x02\x02\u02B2\u02B4\x07P\x02\x02\u02B3\u02B5\x05b2\x02\u02B4" +
		"\u02B3\x03\x02\x02\x02\u02B4\u02B5\x03\x02\x02\x02\u02B5\u02B6\x03\x02" +
		"\x02\x02\u02B6\u02C2\x07^\x02\x02\u02B7\u02B8\t\x02\x02\x02\u02B8\u02C2" +
		"\x05b2\f\u02B9\u02BA\x07H\x02\x02\u02BA\u02C2\x05b2\b\u02BB\u02BC\x07" +
		"S\x02\x02\u02BC\u02BD\x07H\x02\x02\u02BD\u02C2\x05b2\x07\u02BE\u02BF\t" +
		"\x03\x02\x02\u02BF\u02C2\x05b2\x06\u02C0\u02C2\x05\x1E\x10\x02\u02C1\u028F" +
		"\x03\x02\x02\x02\u02C1\u029C\x03\x02\x02\x02\u02C1\u029E\x03\x02\x02\x02" +
		"\u02C1\u02A0\x03\x02\x02\x02\u02C1\u02A2\x03\x02\x02\x02\u02C1\u02A3\x03" +
		"\x02\x02\x02\u02C1\u02A8\x03\x02\x02\x02\u02C1\u02AA\x03\x02\x02\x02\u02C1" +
		"\u02AC\x03\x02\x02\x02\u02C1\u02AE\x03\x02\x02\x02\u02C1\u02B7\x03\x02" +
		"\x02\x02\u02C1\u02B9\x03\x02\x02\x02\u02C1\u02BB\x03\x02\x02\x02\u02C1" +
		"\u02BE\x03\x02\x02\x02\u02C1\u02C0\x03\x02\x02\x02\u02C2\u034F\x03\x02" +
		"\x02\x02\u02C3\u02C4\f,\x02\x02\u02C4\u02C5\x07R\x02\x02\u02C5\u034E\x05" +
		"b2-\u02C6\u02C7\f*\x02\x02\u02C7\u02C8\x07Q\x02\x02\u02C8\u034E\x05b2" +
		"+\u02C9\u02CA\f\x1C\x02\x02\u02CA\u02CB\x07;\x02\x02\u02CB\u034E\x05b" +
		"2\x1D\u02CC\u02CD\f\x1B\x02\x02\u02CD\u02CE\x07-\x02\x02\u02CE\u02CF\x07" +
		")\x02\x02\u02CF\u034E\x05b2\x1C\u02D0\u02D1\f\x1A\x02\x02\u02D1\u02D2" +
		"\x070\x02\x02\u02D2\u02D3\x07)\x02\x02\u02D3\u034E\x05b2\x1B\u02D4\u02D5" +
		"\f\x19\x02\x02\u02D5\u02D6\x070\x02\x02\u02D6\u034E\x05b2\x1A\u02D7\u02D8" +
		"\f\x18\x02\x02\u02D8\u02D9\x07)\x02\x02\u02D9\u034E\x05b2\x19\u02DA\u02DC" +
		"\f\x17\x02\x02\u02DB\u02DD\x07P\x02\x02\u02DC\u02DB\x03\x02\x02\x02\u02DC" +
		"\u02DD\x03\x02\x02\x02\u02DD\u02DE\x03\x02\x02\x02\u02DE\u02DF\x07L\x02" +
		"\x02\u02DF\u034E\x05b2\x18\u02E0\u02E1\f\x16\x02\x02\u02E1\u02E2\x07?" +
		"\x02\x02\u02E2\u034E\x05b2\x17\u02E3\u02E4\f\x14\x02\x02\u02E4\u02E6\t" +
		"\x04\x02\x02\u02E5\u02E7\x07L\x02\x02\u02E6\u02E5\x03\x02\x02\x02\u02E6" +
		"\u02E7\x03\x02\x02\x02\u02E7\u02E8\x03\x02\x02\x02\u02E8\u034E\x05b2\x15" +
		"\u02E9\u02EA\f\x13\x02\x02\u02EA\u02EB\t\x05\x02\x02\u02EB\u034E\x05b" +
		"2\x14\u02EC\u02ED\f\x12\x02\x02\u02ED\u02EF\x07J\x02\x02\u02EE\u02F0\x07" +
		"L\x02\x02\u02EF\u02EE\x03\x02\x02\x02\u02EF\u02F0\x03\x02\x02\x02\u02F0" +
		"\u02F1\x03\x02\x02\x02\u02F1\u034E\x05b2\x13\u02F2\u02F3\f\x11\x02\x02" +
		"\u02F3\u02F5\t\x06\x02\x02\u02F4\u02F6\x07L\x02\x02\u02F5\u02F4\x03\x02" +
		"\x02\x02\u02F5\u02F6\x03\x02\x02\x02\u02F6\u02F7\x03\x02\x02\x02\u02F7" +
		"\u034E\x05b2\x12\u02F8\u02F9\f\x10\x02\x02\u02F9\u02FB\t\x07\x02\x02\u02FA" +
		"\u02FC\x07L\x02\x02\u02FB\u02FA\x03\x02\x02\x02\u02FB\u02FC\x03\x02\x02" +
		"\x02\u02FC\u02FD\x03\x02\x02\x02\u02FD\u034E\x05b2\x11\u02FE\u02FF\f\x0F" +
		"\x02\x02\u02FF\u0300\t\b\x02\x02\u0300\u034E\x05b2\x10\u0301\u0302\f\x0E" +
		"\x02\x02\u0302\u0303\t\t\x02\x02\u0303\u034E\x05b2\x0F\u0304\u0305\f\r" +
		"\x02\x02\u0305\u0306\x07a\x02\x02\u0306\u0307\x07c\x02\x02\u0307\u0308" +
		"\x03\x02\x02\x02\u0308\u034E\x05b2\x0E\u0309\u030A\f\v\x02\x02\u030A\u030B" +
		"\t\x02\x02\x02\u030B\u034E\x05b2\f\u030C\u030D\f\n\x02\x02\u030D\u030F" +
		"\t\n\x02\x02\u030E\u0310\x07L\x02\x02\u030F\u030E\x03\x02\x02\x02\u030F" +
		"\u0310\x03\x02\x02\x02\u0310\u0311\x03\x02\x02\x02\u0311\u034E\x05b2\v" +
		"\u0312\u0313\f\t\x02\x02\u0313\u0314\x07H\x02\x02\u0314\u034E\x05b2\n" +
		"\u0315\u0316\f\x04\x02\x02\u0316\u0317\x07>\x02\x02\u0317\u0318\x05b2" +
		"\x02\u0318\u0319\x07P\x02\x02\u0319\u031A\x05b2\x05\u031A\u034E\x03\x02" +
		"\x02\x02\u031B\u031C\f+\x02\x02\u031C\u031E\x07X\x02\x02\u031D\u031F\x05" +
		"b2\x02\u031E\u031D\x03\x02\x02\x02\u031E\u031F\x03\x02\x02\x02\u031F\u0320" +
		"\x03\x02\x02\x02\u0320\u034E\x07Y\x02\x02\u0321\u0322\f)\x02\x02\u0322" +
		"\u0323\x07+\x02\x02\u0323\u0326\x05b2\x02\u0324\u0325\x07,\x02\x02\u0325" +
		"\u0327\x05b2\x02\u0326\u0324\x03\x02\x02\x02\u0326\u0327\x03\x02\x02\x02" +
		"\u0327\u034E\x03\x02\x02\x02\u0328\u0329\f$\x02\x02\u0329\u032B\x07V\x02" +
		"\x02\u032A\u032C\x05h5\x02\u032B\u032A\x03\x02\x02\x02\u032C\u032D\x03" +
		"\x02\x02\x02\u032D\u032B\x03\x02\x02\x02\u032D\u032E\x03\x02\x02\x02\u032E" +
		"\u032F\x03\x02\x02\x02\u032F\u0330\x07W\x02\x02\u0330\u034E\x03\x02\x02" +
		"\x02\u0331\u0332\f#\x02\x02\u0332\u0334\x07V\x02\x02\u0333\u0335\x05b" +
		"2\x02\u0334\u0333\x03\x02\x02\x02\u0334\u0335\x03\x02\x02\x02\u0335\u0336" +
		"\x03\x02\x02\x02\u0336\u034E\x07W\x02\x02\u0337\u0338\f\"\x02\x02\u0338" +
		"\u033A\x07]\x02\x02\u0339\u033B\x05h5\x02\u033A\u0339\x03\x02\x02\x02" +
		"\u033A\u033B\x03\x02\x02\x02\u033B\u033C\x03\x02\x02\x02\u033C\u033E\x07" +
		"P\x02\x02\u033D\u033F\x05b2\x02\u033E\u033D\x03\x02\x02\x02\u033E\u033F" +
		"\x03\x02\x02\x02\u033F\u0340\x03\x02\x02\x02\u0340\u034E\x07^\x02\x02" +
		"\u0341\u0342\f!\x02\x02\u0342\u0343\x07P\x02\x02\u0343\u0344\x05(\x15" +
		"\x02\u0344\u0345\x05$\x13\x02\u0345\u034E\x03\x02\x02\x02\u0346\u034B" +
		"\f\x05\x02\x02\u0347\u0348\x07@\x02\x02\u0348\u034C\x07@\x02\x02\u0349" +
		"\u034A\x07C\x02\x02\u034A\u034C\x07C\x02\x02\u034B\u0347\x03\x02\x02\x02" +
		"\u034B\u0349\x03\x02\x02\x02\u034C\u034E\x03\x02\x02\x02\u034D\u02C3\x03" +
		"\x02\x02\x02\u034D\u02C6\x03\x02\x02\x02\u034D\u02C9\x03\x02\x02\x02\u034D" +
		"\u02CC\x03\x02\x02\x02\u034D\u02D0\x03\x02\x02\x02\u034D\u02D4\x03\x02" +
		"\x02\x02\u034D\u02D7\x03\x02\x02\x02\u034D\u02DA\x03\x02\x02\x02\u034D" +
		"\u02E0\x03\x02\x02\x02\u034D\u02E3\x03\x02\x02\x02\u034D\u02E9\x03\x02" +
		"\x02\x02\u034D\u02EC\x03\x02\x02\x02\u034D\u02F2\x03\x02\x02\x02\u034D" +
		"\u02F8\x03\x02\x02\x02\u034D\u02FE\x03\x02\x02\x02\u034D\u0301\x03\x02" +
		"\x02\x02\u034D\u0304\x03\x02\x02\x02\u034D\u0309\x03\x02\x02\x02\u034D" +
		"\u030C\x03\x02\x02\x02\u034D\u0312\x03\x02\x02\x02\u034D\u0315\x03\x02" +
		"\x02\x02\u034D\u031B\x03\x02\x02\x02\u034D\u0321\x03\x02\x02\x02\u034D" +
		"\u0328\x03\x02\x02\x02\u034D\u0331\x03\x02\x02\x02\u034D\u0337\x03\x02" +
		"\x02\x02\u034D\u0341\x03\x02\x02\x02\u034D\u0346\x03\x02\x02\x02\u034E" +
		"\u0351\x03\x02\x02\x02\u034F\u034D\x03\x02\x02\x02\u034F\u0350\x03\x02" +
		"\x02\x02\u0350c\x03\x02\x02\x02\u0351\u034F\x03\x02\x02\x02\u0352\u035E" +
		"\x07\x1D\x02\x02\u0353\u035E\x07N\x02\x02\u0354\u035E\x07M\x02\x02\u0355" +
		"\u0356\x07;\x02\x02\u0356\u035E\x05f4\x02\u0357\u035E\x05f4\x02\u0358" +
		"\u035E\x07[\x02\x02\u0359\u035E\x07Z\x02\x02\u035A\u035E\x07\\\x02\x02" +
		"\u035B\u035E\x07\x1A\x02\x02\u035C\u035E\x07\x1B\x02\x02\u035D\u0352\x03" +
		"\x02\x02\x02\u035D\u0353\x03\x02\x02\x02\u035D\u0354\x03\x02\x02\x02\u035D" +
		"\u0355\x03\x02\x02\x02\u035D\u0357\x03\x02\x02\x02\u035D\u0358\x03\x02" +
		"\x02\x02\u035D\u0359\x03\x02\x02\x02\u035D\u035A\x03\x02\x02\x02\u035D" +
		"\u035B\x03\x02\x02\x02\u035D\u035C\x03\x02\x02\x02\u035Ee\x03\x02\x02" +
		"\x02\u035F\u0360\t\v\x02\x02\u0360g\x03\x02\x02\x02\u0361\u0365\x05j6" +
		"\x02\u0362\u0365\x07*\x02\x02\u0363\u0365\x05\"\x12\x02\u0364\u0361\x03" +
		"\x02\x02\x02\u0364\u0362\x03\x02\x02\x02\u0364\u0363\x03\x02\x02\x02\u0365" +
		"\u036C\x03\x02\x02\x02\u0366\u0368\x07Q\x02\x02\u0367\u0369\x05h5\x02" +
		"\u0368\u0367\x03\x02\x02\x02\u0368\u0369\x03\x02\x02\x02\u0369\u036B\x03" +
		"\x02\x02\x02\u036A\u0366\x03\x02\x02\x02\u036B\u036E\x03\x02\x02\x02\u036C" +
		"\u036A\x03\x02\x02\x02\u036C\u036D\x03\x02\x02\x02\u036Di\x03\x02\x02" +
		"\x02\u036E\u036C\x03\x02\x02\x02\u036F\u0370\x05f4\x02\u0370\u0371\x07" +
		"P\x02\x02\u0371\u0373\x03\x02\x02\x02\u0372\u036F\x03\x02\x02\x02\u0372" +
		"\u0373\x03\x02\x02\x02\u0373\u0375\x03\x02\x02\x02\u0374\u0376\x05f4\x02" +
		"\u0375\u0374\x03\x02\x02\x02\u0375\u0376\x03\x02\x02\x02\u0376\u0377\x03" +
		"\x02\x02\x02\u0377\u0379\x05f4\x02\u0378\u037A\x07>\x02\x02\u0379\u0378" +
		"\x03\x02\x02\x02\u0379\u037A\x03\x02\x02\x02\u037A\u0387\x03\x02\x02\x02" +
		"\u037B\u037C\x05f4\x02\u037C\u037E\x07P\x02\x02\u037D\u037F\x07>\x02\x02" +
		"\u037E\u037D\x03\x02\x02\x02\u037E\u037F\x03\x02\x02\x02\u037F\u0387\x03" +
		"\x02\x02\x02\u0380\u0381\x05f4\x02\u0381\u0382\x07P\x02\x02\u0382\u0384" +
		"\x07L\x02\x02\u0383\u0385\x05b2\x02\u0384\u0383\x03\x02\x02\x02\u0384" +
		"\u0385\x03\x02\x02\x02\u0385\u0387\x03\x02\x02\x02\u0386\u0372\x03\x02" +
		"\x02\x02\u0386\u037B\x03\x02\x02\x02\u0386\u0380\x03\x02\x02\x02\u0387" +
		"k\x03\x02\x02\x02wo\x7F\x83\x8A\x93\x9B\xA1\xA9\xB1\xB3\xBA\xBE\xC3\xD0" +
		"\xD8\xDE\xE3\xEA\xF2\xFB\u0103\u0108\u010F\u0117\u011C\u011F\u0121\u0126" +
		"\u0129\u0132\u0134\u013B\u013E\u0144\u0146\u0148\u014B\u014E\u0151\u0153" +
		"\u0158\u015D\u0163\u0167\u016B\u0170\u017F\u0184\u0186\u018E\u0192\u0198" +
		"\u019C\u019F\u01A1\u01A6\u01A9\u01B0\u01B2\u01B8\u01BD\u01D3\u01D9\u01E0" +
		"\u01E6\u01EC\u01FB\u0202\u0205\u0209\u0224\u022A\u0230\u0239\u0240\u0248" +
		"\u024C\u0250\u025A\u0260\u0265\u026A\u026D\u0278\u0283\u0288\u0294\u029A" +
		"\u02A5\u02B0\u02B4\u02C1\u02DC\u02E6\u02EF\u02F5\u02FB\u030F\u031E\u0326" +
		"\u032D\u0334\u033A\u033E\u034B\u034D\u034F\u035D\u0364\u0368\u036C\u0372" +
		"\u0375\u0379\u037E\u0384\u0386";
	public static readonly _serializedATN: string = Utils.join(
		[
			Tads2Parser._serializedATNSegment0,
			Tads2Parser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!Tads2Parser.__ATN) {
			Tads2Parser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(Tads2Parser._serializedATN));
		}

		return Tads2Parser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public _directive!: DirectiveContext;
	public _directives: DirectiveContext[] = [];
	public EOF(): TerminalNode { return this.getToken(Tads2Parser.EOF, 0); }
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
	public get ruleIndex(): number { return Tads2Parser.RULE_program; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public compoundWordDirective(): CompoundWordDirectiveContext | undefined {
		return this.tryGetRuleContext(0, CompoundWordDirectiveContext);
	}
	public formatStringDirective(): FormatStringDirectiveContext | undefined {
		return this.tryGetRuleContext(0, FormatStringDirectiveContext);
	}
	public specialWordsDirective(): SpecialWordsDirectiveContext | undefined {
		return this.tryGetRuleContext(0, SpecialWordsDirectiveContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_directive; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterDirective) {
			listener.enterDirective(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitDirective) {
			listener.exitDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitDirective) {
			return visitor.visitDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SpecialWordsDirectiveContext extends ParserRuleContext {
	public _expr!: ExprContext;
	public _values: ExprContext[] = [];
	public SPECIAL_WORDS(): TerminalNode { return this.getToken(Tads2Parser.SPECIAL_WORDS, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.COMMA);
		} else {
			return this.getToken(Tads2Parser.COMMA, i);
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_specialWordsDirective; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterSpecialWordsDirective) {
			listener.enterSpecialWordsDirective(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitSpecialWordsDirective) {
			listener.exitSpecialWordsDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitSpecialWordsDirective) {
			return visitor.visitSpecialWordsDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormatStringDirectiveContext extends ParserRuleContext {
	public _expr!: ExprContext;
	public _values: ExprContext[] = [];
	public FORMATSTRING(): TerminalNode { return this.getToken(Tads2Parser.FORMATSTRING, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
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
	public get ruleIndex(): number { return Tads2Parser.RULE_formatStringDirective; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterFormatStringDirective) {
			listener.enterFormatStringDirective(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitFormatStringDirective) {
			listener.exitFormatStringDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitFormatStringDirective) {
			return visitor.visitFormatStringDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompoundWordDirectiveContext extends ParserRuleContext {
	public _expr!: ExprContext;
	public _values: ExprContext[] = [];
	public COMPOUND_WORD(): TerminalNode { return this.getToken(Tads2Parser.COMPOUND_WORD, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
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
	public get ruleIndex(): number { return Tads2Parser.RULE_compoundWordDirective; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterCompoundWordDirective) {
			listener.enterCompoundWordDirective(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitCompoundWordDirective) {
			listener.exitCompoundWordDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitCompoundWordDirective) {
			return visitor.visitCompoundWordDirective(this);
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
	public GRAMMAR(): TerminalNode { return this.getToken(Tads2Parser.GRAMMAR, 0); }
	public COLON(): TerminalNode[];
	public COLON(i: number): TerminalNode;
	public COLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.COLON);
		} else {
			return this.getToken(Tads2Parser.COLON, i);
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
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.RIGHT_PAREN, 0); }
	public superTypes(): SuperTypesContext | undefined {
		return this.tryGetRuleContext(0, SuperTypesContext);
	}
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.MODIFY, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.REPLACE, 0); }
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
	public get ruleIndex(): number { return Tads2Parser.RULE_grammarDeclaration; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterGrammarDeclaration) {
			listener.enterGrammarDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitGrammarDeclaration) {
			listener.exitGrammarDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitGrammarDeclaration) {
			return visitor.visitGrammarDeclaration(this);
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
			return this.getTokens(Tads2Parser.BITWISE_OR);
		} else {
			return this.getToken(Tads2Parser.BITWISE_OR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_grammarRules; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterGrammarRules) {
			listener.enterGrammarRules(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitGrammarRules) {
			listener.exitGrammarRules(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public get ruleIndex(): number { return Tads2Parser.RULE_itemList; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterItemList) {
			listener.enterItemList(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitItemList) {
			listener.exitItemList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitItemList) {
			return visitor.visitItemList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiersContext extends ParserRuleContext {
	public LEFT_BRACKET(): TerminalNode { return this.getToken(Tads2Parser.LEFT_BRACKET, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public NR(): TerminalNode { return this.getToken(Tads2Parser.NR, 0); }
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_BRACKET, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_qualifiers; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterQualifiers) {
			listener.enterQualifiers(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitQualifiers) {
			listener.exitQualifiers(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitQualifiers) {
			return visitor.visitQualifiers(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ItemContext extends ParserRuleContext {
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.RIGHT_PAREN, 0); }
	public item(): ItemContext[];
	public item(i: number): ItemContext;
	public item(i?: number): ItemContext | ItemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ItemContext);
		} else {
			return this.getRuleContext(i, ItemContext);
		}
	}
	public BITWISE_OR(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.BITWISE_OR, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.STAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_item; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterItem) {
			listener.enterItem(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitItem) {
			listener.exitItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitItem) {
			return visitor.visitItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumDeclarationContext extends ParserRuleContext {
	public _isToken!: Token;
	public ENUM(): TerminalNode { return this.getToken(Tads2Parser.ENUM, 0); }
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.COMMA);
		} else {
			return this.getToken(Tads2Parser.COMMA, i);
		}
	}
	public TOKEN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.TOKEN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_enumDeclaration; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterEnumDeclaration) {
			listener.enterEnumDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitEnumDeclaration) {
			listener.exitEnumDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public PROPERTY(): TerminalNode { return this.getToken(Tads2Parser.PROPERTY, 0); }
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
			return this.getTokens(Tads2Parser.COMMA);
		} else {
			return this.getToken(Tads2Parser.COMMA, i);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.PLUS);
		} else {
			return this.getToken(Tads2Parser.PLUS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_propertyDeclaration; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterPropertyDeclaration) {
			listener.enterPropertyDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitPropertyDeclaration) {
			listener.exitPropertyDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public DICTIONARY(): TerminalNode { return this.getToken(Tads2Parser.DICTIONARY, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
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
			return this.getTokens(Tads2Parser.COMMA);
		} else {
			return this.getToken(Tads2Parser.COMMA, i);
		}
	}
	public PLUS(): TerminalNode[];
	public PLUS(i: number): TerminalNode;
	public PLUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.PLUS);
		} else {
			return this.getToken(Tads2Parser.PLUS, i);
		}
	}
	public PROPERTY(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.PROPERTY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_dictionaryDeclaration; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterDictionaryDeclaration) {
			listener.enterDictionaryDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitDictionaryDeclaration) {
			listener.exitDictionaryDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitDictionaryDeclaration) {
			return visitor.visitDictionaryDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExportDeclarationContext extends ParserRuleContext {
	public EXPORT(): TerminalNode { return this.getToken(Tads2Parser.EXPORT, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public SSTR(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.SSTR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_exportDeclaration; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterExportDeclaration) {
			listener.enterExportDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitExportDeclaration) {
			listener.exitExportDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitExportDeclaration) {
			return visitor.visitExportDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionDeclarationContext extends ParserRuleContext {
	public _isModify!: Token;
	public _isReplace!: Token;
	public _block!: CodeBlockContext;
	public _expr!: ExprContext;
	public _expressions: ExprContext[] = [];
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.COLON, 0); }
	public FUNCTION(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.FUNCTION, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ASSIGN, 0); }
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.MODIFY, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.REPLACE, 0); }
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.RIGHT_PAREN, 0); }
	public codeBlock(): CodeBlockContext | undefined {
		return this.tryGetRuleContext(0, CodeBlockContext);
	}
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
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
	public get ruleIndex(): number { return Tads2Parser.RULE_functionDeclaration; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterFunctionDeclaration) {
			listener.enterFunctionDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitFunctionDeclaration) {
			listener.exitFunctionDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitFunctionDeclaration) {
			return visitor.visitFunctionDeclaration(this);
		} else {
			return visitor.visitChildren(this);
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
			return this.getTokens(Tads2Parser.PLUS);
		} else {
			return this.getToken(Tads2Parser.PLUS, i);
		}
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.COLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.MODIFY, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.REPLACE, 0); }
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.CLASS, 0); }
	public TRANSIENT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.TRANSIENT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_objectDeclaration; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterObjectDeclaration) {
			listener.enterObjectDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitObjectDeclaration) {
			listener.exitObjectDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitObjectDeclaration) {
			return visitor.visitObjectDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayContext extends ParserRuleContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
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
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.COMMA);
		} else {
			return this.getToken(Tads2Parser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_array; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterArray) {
			listener.enterArray(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitArray) {
			listener.exitArray(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitArray) {
			return visitor.visitArray(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CurlyObjectBodyContext extends ParserRuleContext {
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads2Parser.LEFT_CURLY, 0); }
	public objectBody(): ObjectBodyContext {
		return this.getRuleContext(0, ObjectBodyContext);
	}
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_CURLY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_curlyObjectBody; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterCurlyObjectBody) {
			listener.enterCurlyObjectBody(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitCurlyObjectBody) {
			listener.exitCurlyObjectBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_semiColonEndedObjectBody; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterSemiColonEndedObjectBody) {
			listener.enterSemiColonEndedObjectBody(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitSemiColonEndedObjectBody) {
			listener.exitSemiColonEndedObjectBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
			return this.getTokens(Tads2Parser.COMMA);
		} else {
			return this.getToken(Tads2Parser.COMMA, i);
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
	public get ruleIndex(): number { return Tads2Parser.RULE_superTypes; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterSuperTypes) {
			listener.enterSuperTypes(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitSuperTypes) {
			listener.exitSuperTypes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitSuperTypes) {
			return visitor.visitSuperTypes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectBodyContext extends ParserRuleContext {
	public _property!: PropertyContext;
	public _properties: PropertyContext[] = [];
	public _method!: MethodContext;
	public _functions: MethodContext[] = [];
	public property(): PropertyContext[];
	public property(i: number): PropertyContext;
	public property(i?: number): PropertyContext | PropertyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PropertyContext);
		} else {
			return this.getRuleContext(i, PropertyContext);
		}
	}
	public method(): MethodContext[];
	public method(i: number): MethodContext;
	public method(i?: number): MethodContext | MethodContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MethodContext);
		} else {
			return this.getRuleContext(i, MethodContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_objectBody; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterObjectBody) {
			listener.enterObjectBody(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitObjectBody) {
			listener.exitObjectBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitObjectBody) {
			return visitor.visitObjectBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyContext extends ParserRuleContext {
	public _id!: IdentifierAtomContext;
	public _primary!: PrimaryContext;
	public _values: PrimaryContext[] = [];
	public ASSIGN(): TerminalNode { return this.getToken(Tads2Parser.ASSIGN, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_property; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterProperty) {
			listener.enterProperty(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitProperty) {
			listener.exitProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitProperty) {
			return visitor.visitProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamsWithWildcardContext extends ParserRuleContext {
	public _primary!: PrimaryContext;
	public _parameters: PrimaryContext[] = [];
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.STAR, 0); }
	public primary(): PrimaryContext | undefined {
		return this.tryGetRuleContext(0, PrimaryContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.COMMA);
		} else {
			return this.getToken(Tads2Parser.COMMA, i);
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
	public get ruleIndex(): number { return Tads2Parser.RULE_paramsWithWildcard; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterParamsWithWildcard) {
			listener.enterParamsWithWildcard(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitParamsWithWildcard) {
			listener.exitParamsWithWildcard(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitParamsWithWildcard) {
			return visitor.visitParamsWithWildcard(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodContext extends ParserRuleContext {
	public _isModify!: Token;
	public _isReplace!: Token;
	public _block!: CodeBlockContext;
	public _expr!: ExprContext;
	public _expressions: ExprContext[] = [];
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ASSIGN, 0); }
	public LEFT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.RIGHT_PAREN, 0); }
	public codeBlock(): CodeBlockContext | undefined {
		return this.tryGetRuleContext(0, CodeBlockContext);
	}
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.MODIFY, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.REPLACE, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
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
	public get ruleIndex(): number { return Tads2Parser.RULE_method; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterMethod) {
			listener.enterMethod(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitMethod) {
			listener.exitMethod(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitMethod) {
			return visitor.visitMethod(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodeBlockContext extends ParserRuleContext {
	public LEFT_CURLY(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.RIGHT_CURLY, 0); }
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
	public get ruleIndex(): number { return Tads2Parser.RULE_codeBlock; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterCodeBlock) {
			listener.enterCodeBlock(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitCodeBlock) {
			listener.exitCodeBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public passStatement(): PassStatementContext | undefined {
		return this.tryGetRuleContext(0, PassStatementContext);
	}
	public deleteStatement(): DeleteStatementContext | undefined {
		return this.tryGetRuleContext(0, DeleteStatementContext);
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
	public get ruleIndex(): number { return Tads2Parser.RULE_stats; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterStats) {
			listener.enterStats(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitStats) {
			listener.exitStats(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitStats) {
			return visitor.visitStats(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InnerCodeBlockContext extends ParserRuleContext {
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads2Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_CURLY, 0); }
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
	public get ruleIndex(): number { return Tads2Parser.RULE_innerCodeBlock; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterInnerCodeBlock) {
			listener.enterInnerCodeBlock(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitInnerCodeBlock) {
			listener.exitInnerCodeBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitInnerCodeBlock) {
			return visitor.visitInnerCodeBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GotoStatementContext extends ParserRuleContext {
	public _label!: IdentifierAtomContext;
	public GOTO(): TerminalNode { return this.getToken(Tads2Parser.GOTO, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_gotoStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterGotoStatement) {
			listener.enterGotoStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitGotoStatement) {
			listener.exitGotoStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitGotoStatement) {
			return visitor.visitGotoStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BreakStatementContext extends ParserRuleContext {
	public _label!: IdentifierAtomContext;
	public BREAK(): TerminalNode { return this.getToken(Tads2Parser.BREAK, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_breakStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterBreakStatement) {
			listener.enterBreakStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitBreakStatement) {
			listener.exitBreakStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitBreakStatement) {
			return visitor.visitBreakStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContinueStatementContext extends ParserRuleContext {
	public _label!: IdentifierAtomContext;
	public CONTINUE(): TerminalNode { return this.getToken(Tads2Parser.CONTINUE, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public identifierAtom(): IdentifierAtomContext | undefined {
		return this.tryGetRuleContext(0, IdentifierAtomContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_continueStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterContinueStatement) {
			listener.enterContinueStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitContinueStatement) {
			listener.exitContinueStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public COLON(): TerminalNode { return this.getToken(Tads2Parser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_labelStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterLabelStatement) {
			listener.enterLabelStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitLabelStatement) {
			listener.exitLabelStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitLabelStatement) {
			return visitor.visitLabelStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwitchStatementContext extends ParserRuleContext {
	public SWITCH(): TerminalNode { return this.getToken(Tads2Parser.SWITCH, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.LEFT_PAREN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_PAREN, 0); }
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads2Parser.LEFT_CURLY, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_CURLY, 0); }
	public COLON(): TerminalNode[];
	public COLON(i: number): TerminalNode;
	public COLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.COLON);
		} else {
			return this.getToken(Tads2Parser.COLON, i);
		}
	}
	public DEFAULT(): TerminalNode[];
	public DEFAULT(i: number): TerminalNode;
	public DEFAULT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.DEFAULT);
		} else {
			return this.getToken(Tads2Parser.DEFAULT, i);
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
			return this.getTokens(Tads2Parser.CASE);
		} else {
			return this.getToken(Tads2Parser.CASE, i);
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
	public get ruleIndex(): number { return Tads2Parser.RULE_switchStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterSwitchStatement) {
			listener.enterSwitchStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitSwitchStatement) {
			listener.exitSwitchStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitSwitchStatement) {
			return visitor.visitSwitchStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ThrowStatementContext extends ParserRuleContext {
	public THROW(): TerminalNode { return this.getToken(Tads2Parser.THROW, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_throwStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterThrowStatement) {
			listener.enterThrowStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitThrowStatement) {
			listener.exitThrowStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitThrowStatement) {
			return visitor.visitThrowStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForInStatementContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(Tads2Parser.FOR, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.LEFT_PAREN, 0); }
	public LOCAL(): TerminalNode { return this.getToken(Tads2Parser.LOCAL, 0); }
	public ID(): TerminalNode { return this.getToken(Tads2Parser.ID, 0); }
	public IN(): TerminalNode { return this.getToken(Tads2Parser.IN, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_PAREN, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_forInStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterForInStatement) {
			listener.enterForInStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitForInStatement) {
			listener.exitForInStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitForInStatement) {
			return visitor.visitForInStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForEachStatementContext extends ParserRuleContext {
	public FOREACH(): TerminalNode { return this.getToken(Tads2Parser.FOREACH, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.LEFT_PAREN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public IN(): TerminalNode { return this.getToken(Tads2Parser.IN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_PAREN, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_forEachStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterForEachStatement) {
			listener.enterForEachStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitForEachStatement) {
			listener.exitForEachStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitForEachStatement) {
			return visitor.visitForEachStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PassStatementContext extends ParserRuleContext {
	public PASS(): TerminalNode { return this.getToken(Tads2Parser.PASS, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_passStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterPassStatement) {
			listener.enterPassStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitPassStatement) {
			listener.exitPassStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitPassStatement) {
			return visitor.visitPassStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeleteStatementContext extends ParserRuleContext {
	public DELETE(): TerminalNode { return this.getToken(Tads2Parser.DELETE, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_deleteStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterDeleteStatement) {
			listener.enterDeleteStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitDeleteStatement) {
			listener.exitDeleteStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitDeleteStatement) {
			return visitor.visitDeleteStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnStatementContext extends ParserRuleContext {
	public RETURN(): TerminalNode { return this.getToken(Tads2Parser.RETURN, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_returnStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterReturnStatement) {
			listener.enterReturnStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitReturnStatement) {
			listener.exitReturnStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitReturnStatement) {
			return visitor.visitReturnStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DoWhileStatementContext extends ParserRuleContext {
	public DO(): TerminalNode { return this.getToken(Tads2Parser.DO, 0); }
	public codeBlock(): CodeBlockContext {
		return this.getRuleContext(0, CodeBlockContext);
	}
	public WHILE(): TerminalNode { return this.getToken(Tads2Parser.WHILE, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_PAREN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_doWhileStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterDoWhileStatement) {
			listener.enterDoWhileStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitDoWhileStatement) {
			listener.exitDoWhileStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitDoWhileStatement) {
			return visitor.visitDoWhileStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhileStatementContext extends ParserRuleContext {
	public WHILE(): TerminalNode { return this.getToken(Tads2Parser.WHILE, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_PAREN, 0); }
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
	public get ruleIndex(): number { return Tads2Parser.RULE_whileStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterWhileStatement) {
			listener.enterWhileStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitWhileStatement) {
			listener.exitWhileStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitWhileStatement) {
			return visitor.visitWhileStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForStatementContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(Tads2Parser.FOR, 0); }
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.LEFT_PAREN, 0); }
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.SEMICOLON);
		} else {
			return this.getToken(Tads2Parser.SEMICOLON, i);
		}
	}
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_PAREN, 0); }
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
	public get ruleIndex(): number { return Tads2Parser.RULE_forStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterForStatement) {
			listener.enterForStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitForStatement) {
			listener.exitForStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitForStatement) {
			return visitor.visitForStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TryCatchStatementContext extends ParserRuleContext {
	public TRY(): TerminalNode { return this.getToken(Tads2Parser.TRY, 0); }
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
			return this.getTokens(Tads2Parser.CATCH);
		} else {
			return this.getToken(Tads2Parser.CATCH, i);
		}
	}
	public LEFT_PAREN(): TerminalNode[];
	public LEFT_PAREN(i: number): TerminalNode;
	public LEFT_PAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.LEFT_PAREN);
		} else {
			return this.getToken(Tads2Parser.LEFT_PAREN, i);
		}
	}
	public RIGHT_PAREN(): TerminalNode[];
	public RIGHT_PAREN(i: number): TerminalNode;
	public RIGHT_PAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.RIGHT_PAREN);
		} else {
			return this.getToken(Tads2Parser.RIGHT_PAREN, i);
		}
	}
	public FINALLY(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.FINALLY, 0); }
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
	public get ruleIndex(): number { return Tads2Parser.RULE_tryCatchStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterTryCatchStatement) {
			listener.enterTryCatchStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitTryCatchStatement) {
			listener.exitTryCatchStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public DOT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.DOT, 0); }
	public callStatement(): CallStatementContext | undefined {
		return this.tryGetRuleContext(0, CallStatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_callStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterCallStatement) {
			listener.enterCallStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitCallStatement) {
			listener.exitCallStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitCallStatement) {
			return visitor.visitCallStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EmptyStatementContext extends ParserRuleContext {
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_emptyStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterEmptyStatement) {
			listener.enterEmptyStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitEmptyStatement) {
			listener.exitEmptyStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitEmptyStatement) {
			return visitor.visitEmptyStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SayStatementContext extends ParserRuleContext {
	public DSTR(): TerminalNode { return this.getToken(Tads2Parser.DSTR, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_sayStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterSayStatement) {
			listener.enterSayStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitSayStatement) {
			listener.exitSayStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitSayStatement) {
			return visitor.visitSayStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentStatementContext extends ParserRuleContext {
	public LOCAL(): TerminalNode { return this.getToken(Tads2Parser.LOCAL, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(Tads2Parser.SEMICOLON, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ASSIGN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_assignmentStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterAssignmentStatement) {
			listener.enterAssignmentStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitAssignmentStatement) {
			listener.exitAssignmentStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
			return this.getTokens(Tads2Parser.IF);
		} else {
			return this.getToken(Tads2Parser.IF, i);
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
			return this.getTokens(Tads2Parser.ELSE);
		} else {
			return this.getToken(Tads2Parser.ELSE, i);
		}
	}
	public codeBlock(): CodeBlockContext | undefined {
		return this.tryGetRuleContext(0, CodeBlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_ifStatement; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterIfStatement) {
			listener.enterIfStatement(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitIfStatement) {
			listener.exitIfStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitIfStatement) {
			return visitor.visitIfStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnclosedExprCodeBlockContext extends ParserRuleContext {
	public _expression!: ExprContext;
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_PAREN, 0); }
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
	public get ruleIndex(): number { return Tads2Parser.RULE_enclosedExprCodeBlock; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterEnclosedExprCodeBlock) {
			listener.enterEnclosedExprCodeBlock(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitEnclosedExprCodeBlock) {
			listener.exitEnclosedExprCodeBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public get ruleIndex(): number { return Tads2Parser.RULE_expr; }
	public copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class ArrayExprContext extends ExprContext {
	public LEFT_BRACKET(): TerminalNode[];
	public LEFT_BRACKET(i: number): TerminalNode;
	public LEFT_BRACKET(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.LEFT_BRACKET);
		} else {
			return this.getToken(Tads2Parser.LEFT_BRACKET, i);
		}
	}
	public RIGHT_BRACKET(): TerminalNode[];
	public RIGHT_BRACKET(i: number): TerminalNode;
	public RIGHT_BRACKET(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.RIGHT_BRACKET);
		} else {
			return this.getToken(Tads2Parser.RIGHT_BRACKET, i);
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
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterArrayExpr) {
			listener.enterArrayExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitArrayExpr) {
			listener.exitArrayExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public DOT(): TerminalNode { return this.getToken(Tads2Parser.DOT, 0); }
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
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterMemberExpr) {
			listener.enterMemberExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitMemberExpr) {
			listener.exitMemberExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public LEFT_BRACKET(): TerminalNode { return this.getToken(Tads2Parser.LEFT_BRACKET, 0); }
	public RIGHT_BRACKET(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_BRACKET, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterIndexExpr) {
			listener.enterIndexExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitIndexExpr) {
			listener.exitIndexExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public COMMA(): TerminalNode { return this.getToken(Tads2Parser.COMMA, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterCommaExpr) {
			listener.enterCommaExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitCommaExpr) {
			listener.exitCommaExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public RANGE(): TerminalNode { return this.getToken(Tads2Parser.RANGE, 0); }
	public STEP(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.STEP, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterRangeExpr) {
			listener.enterRangeExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitRangeExpr) {
			listener.exitRangeExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitRangeExpr) {
			return visitor.visitRangeExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DelegatedExpressionContext extends ExprContext {
	public DELEGATED(): TerminalNode { return this.getToken(Tads2Parser.DELEGATED, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterDelegatedExpression) {
			listener.enterDelegatedExpression(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitDelegatedExpression) {
			listener.exitDelegatedExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitDelegatedExpression) {
			return visitor.visitDelegatedExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InheritedExpressionContext extends ExprContext {
	public INHERITED(): TerminalNode { return this.getToken(Tads2Parser.INHERITED, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterInheritedExpression) {
			listener.enterInheritedExpression(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitInheritedExpression) {
			listener.exitInheritedExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitInheritedExpression) {
			return visitor.visitInheritedExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TransientExpressionContext extends ExprContext {
	public TRANSIENT(): TerminalNode { return this.getToken(Tads2Parser.TRANSIENT, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterTransientExpression) {
			listener.enterTransientExpression(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitTransientExpression) {
			listener.exitTransientExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterPrimaryExpr) {
			listener.enterPrimaryExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitPrimaryExpr) {
			listener.exitPrimaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_PAREN, 0); }
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
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterCallWithParamsExpr) {
			listener.enterCallWithParamsExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitCallWithParamsExpr) {
			listener.exitCallWithParamsExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_PAREN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterExprWithParenExpr) {
			listener.enterExprWithParenExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitExprWithParenExpr) {
			listener.exitExprWithParenExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitExprWithParenExpr) {
			return visitor.visitExprWithParenExpr(this);
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
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads2Parser.LEFT_CURLY, 0); }
	public COLON(): TerminalNode { return this.getToken(Tads2Parser.COLON, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_CURLY, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterExprWithAnonymousObjectExpr) {
			listener.enterExprWithAnonymousObjectExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitExprWithAnonymousObjectExpr) {
			listener.exitExprWithAnonymousObjectExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public COLON(): TerminalNode { return this.getToken(Tads2Parser.COLON, 0); }
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
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterExprWithAnonymousObjectUsingMultipleSuperTypesExpr) {
			listener.enterExprWithAnonymousObjectUsingMultipleSuperTypesExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitExprWithAnonymousObjectUsingMultipleSuperTypesExpr) {
			listener.exitExprWithAnonymousObjectUsingMultipleSuperTypesExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitExprWithAnonymousObjectUsingMultipleSuperTypesExpr) {
			return visitor.visitExprWithAnonymousObjectUsingMultipleSuperTypesExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenExpr2Context extends ExprContext {
	public LEFT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.LEFT_PAREN, 0); }
	public RIGHT_PAREN(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_PAREN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterParenExpr2) {
			listener.enterParenExpr2(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitParenExpr2) {
			listener.exitParenExpr2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitParenExpr2) {
			return visitor.visitParenExpr2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LocalExprContext extends ExprContext {
	public LOCAL(): TerminalNode { return this.getToken(Tads2Parser.LOCAL, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterLocalExpr) {
			listener.enterLocalExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitLocalExpr) {
			listener.exitLocalExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitLocalExpr) {
			return visitor.visitLocalExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StaticExprContext extends ExprContext {
	public STATIC(): TerminalNode { return this.getToken(Tads2Parser.STATIC, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterStaticExpr) {
			listener.enterStaticExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitStaticExpr) {
			listener.exitStaticExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitStaticExpr) {
			return visitor.visitStaticExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NewExprContext extends ExprContext {
	public NEW(): TerminalNode { return this.getToken(Tads2Parser.NEW, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterNewExpr) {
			listener.enterNewExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitNewExpr) {
			listener.exitNewExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public AMP(): TerminalNode { return this.getToken(Tads2Parser.AMP, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterReferenceExpr) {
			listener.enterReferenceExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitReferenceExpr) {
			listener.exitReferenceExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public LITERAL_NOT(): TerminalNode { return this.getToken(Tads2Parser.LITERAL_NOT, 0); }
	public IN(): TerminalNode { return this.getToken(Tads2Parser.IN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterNotInExpr) {
			listener.enterNotInExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitNotInExpr) {
			listener.exitNotInExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public IS(): TerminalNode { return this.getToken(Tads2Parser.IS, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.IN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterIsExpr) {
			listener.enterIsExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitIsExpr) {
			listener.exitIsExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public IN(): TerminalNode { return this.getToken(Tads2Parser.IN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterInExpr) {
			listener.enterInExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitInExpr) {
			listener.exitInExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public ASSIGN(): TerminalNode { return this.getToken(Tads2Parser.ASSIGN, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.COLON, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterAssignmentExpr) {
			listener.enterAssignmentExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitAssignmentExpr) {
			listener.exitAssignmentExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public IFNIL(): TerminalNode { return this.getToken(Tads2Parser.IFNIL, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterIfNilExpr) {
			listener.enterIfNilExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitIfNilExpr) {
			listener.exitIfNilExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitIfNilExpr) {
			return visitor.visitIfNilExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AnonymousObjectExprContext extends ExprContext {
	public LEFT_CURLY(): TerminalNode { return this.getToken(Tads2Parser.LEFT_CURLY, 0); }
	public COLON(): TerminalNode { return this.getToken(Tads2Parser.COLON, 0); }
	public RIGHT_CURLY(): TerminalNode { return this.getToken(Tads2Parser.RIGHT_CURLY, 0); }
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
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterAnonymousObjectExpr) {
			listener.enterAnonymousObjectExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitAnonymousObjectExpr) {
			listener.exitAnonymousObjectExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public BITWISE_OR(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.BITWISE_OR, 0); }
	public AMP(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.AMP, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ASSIGN, 0); }
	public ARITHMETIC_LEFT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ARITHMETIC_LEFT, 0); }
	public ARITHMETIC_RIGHT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ARITHMETIC_RIGHT, 0); }
	public LOGICAL_RIGHT_SHIFT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LOGICAL_RIGHT_SHIFT, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterBitwiseExpr) {
			listener.enterBitwiseExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitBitwiseExpr) {
			listener.exitBitwiseExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public AND(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.OR, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterAndOrExpr) {
			listener.enterAndOrExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitAndOrExpr) {
			listener.exitAndOrExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public POW(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.POW, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ASSIGN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterPowerOfExpr) {
			listener.enterPowerOfExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitPowerOfExpr) {
			listener.exitPowerOfExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitPowerOfExpr) {
			return visitor.visitPowerOfExpr(this);
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
	public STAR(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.STAR, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.MOD, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ASSIGN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterMultiplicationExpr) {
			listener.enterMultiplicationExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitMultiplicationExpr) {
			listener.exitMultiplicationExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.MINUS, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ASSIGN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterAdditiveExpr) {
			listener.enterAdditiveExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitAdditiveExpr) {
			listener.exitAdditiveExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public LTEQ(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LTEQ, 0); }
	public GTEQ(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.GTEQ, 0); }
	public LT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.GT, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterRelationalExpr) {
			listener.enterRelationalExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitRelationalExpr) {
			listener.exitRelationalExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public EQ(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.EQ, 0); }
	public NEQ(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.NEQ, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterEqualityExpr) {
			listener.enterEqualityExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitEqualityExpr) {
			listener.exitEqualityExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitEqualityExpr) {
			return visitor.visitEqualityExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotEqualityExprContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.GT, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterNotEqualityExpr) {
			listener.enterNotEqualityExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitNotEqualityExpr) {
			listener.exitNotEqualityExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitNotEqualityExpr) {
			return visitor.visitNotEqualityExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LiteralNotAndORContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public LITERAL_NOT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LITERAL_NOT, 0); }
	public LITERAL_AND(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LITERAL_AND, 0); }
	public LITERAL_OR(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LITERAL_OR, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterLiteralNotAndOR) {
			listener.enterLiteralNotAndOR(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitLiteralNotAndOR) {
			listener.exitLiteralNotAndOR(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitLiteralNotAndOR) {
			return visitor.visitLiteralNotAndOR(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LiteralNotAndOR2Context extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LITERAL_NOT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LITERAL_NOT, 0); }
	public LITERAL_AND(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LITERAL_AND, 0); }
	public LITERAL_OR(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.LITERAL_OR, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterLiteralNotAndOR2) {
			listener.enterLiteralNotAndOR2(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitLiteralNotAndOR2) {
			listener.exitLiteralNotAndOR2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitLiteralNotAndOR2) {
			return visitor.visitLiteralNotAndOR2(this);
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
	public ARROW(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ARROW, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterArrowExpr) {
			listener.enterArrowExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitArrowExpr) {
			listener.exitArrowExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public ARROW(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ARROW, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterArrowExpr2) {
			listener.enterArrowExpr2(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitArrowExpr2) {
			listener.exitArrowExpr2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitArrowExpr2) {
			return visitor.visitArrowExpr2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrowExpr3Context extends ExprContext {
	public STAR(): TerminalNode { return this.getToken(Tads2Parser.STAR, 0); }
	public ARROW(): TerminalNode { return this.getToken(Tads2Parser.ARROW, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterArrowExpr3) {
			listener.enterArrowExpr3(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitArrowExpr3) {
			listener.exitArrowExpr3(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitArrowExpr3) {
			return visitor.visitArrowExpr3(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryExprContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public AT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.AT, 0); }
	public AMP(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.AMP, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.NOT, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.MINUS, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.TILDE, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterUnaryExpr) {
			listener.enterUnaryExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitUnaryExpr) {
			listener.exitUnaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
			return this.getTokens(Tads2Parser.PLUS);
		} else {
			return this.getToken(Tads2Parser.PLUS, i);
		}
	}
	public MINUS(): TerminalNode[];
	public MINUS(i: number): TerminalNode;
	public MINUS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.MINUS);
		} else {
			return this.getToken(Tads2Parser.MINUS, i);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterPostFixExpr) {
			listener.enterPostFixExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitPostFixExpr) {
			listener.exitPostFixExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public OPTIONAL(): TerminalNode { return this.getToken(Tads2Parser.OPTIONAL, 0); }
	public COLON(): TerminalNode { return this.getToken(Tads2Parser.COLON, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterTernaryExpr) {
			listener.enterTernaryExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitTernaryExpr) {
			listener.exitTernaryExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterAnonymousFunctionExpr) {
			listener.enterAnonymousFunctionExpr(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitAnonymousFunctionExpr) {
			listener.exitAnonymousFunctionExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public get ruleIndex(): number { return Tads2Parser.RULE_primary; }
	public copyFrom(ctx: PrimaryContext): void {
		super.copyFrom(ctx);
	}
}
export class InheritedAtomContext extends PrimaryContext {
	public INHERITED(): TerminalNode { return this.getToken(Tads2Parser.INHERITED, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterInheritedAtom) {
			listener.enterInheritedAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitInheritedAtom) {
			listener.exitInheritedAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitInheritedAtom) {
			return visitor.visitInheritedAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class HexAtomContext extends PrimaryContext {
	public HEX(): TerminalNode { return this.getToken(Tads2Parser.HEX, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterHexAtom) {
			listener.enterHexAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitHexAtom) {
			listener.exitHexAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitHexAtom) {
			return visitor.visitHexAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberAtomContext extends PrimaryContext {
	public NR(): TerminalNode { return this.getToken(Tads2Parser.NR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterNumberAtom) {
			listener.enterNumberAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitNumberAtom) {
			listener.exitNumberAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitNumberAtom) {
			return visitor.visitNumberAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ReferenceAtomContext extends PrimaryContext {
	public AMP(): TerminalNode { return this.getToken(Tads2Parser.AMP, 0); }
	public identifierAtom(): IdentifierAtomContext {
		return this.getRuleContext(0, IdentifierAtomContext);
	}
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterReferenceAtom) {
			listener.enterReferenceAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitReferenceAtom) {
			listener.exitReferenceAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterIdAtom) {
			listener.enterIdAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitIdAtom) {
			listener.exitIdAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitIdAtom) {
			return visitor.visitIdAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SingleQuotestringAtomContext extends PrimaryContext {
	public SSTR(): TerminalNode { return this.getToken(Tads2Parser.SSTR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterSingleQuotestringAtom) {
			listener.enterSingleQuotestringAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitSingleQuotestringAtom) {
			listener.exitSingleQuotestringAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitSingleQuotestringAtom) {
			return visitor.visitSingleQuotestringAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DoubleQuotestringAtomContext extends PrimaryContext {
	public DSTR(): TerminalNode { return this.getToken(Tads2Parser.DSTR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterDoubleQuotestringAtom) {
			listener.enterDoubleQuotestringAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitDoubleQuotestringAtom) {
			listener.exitDoubleQuotestringAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitDoubleQuotestringAtom) {
			return visitor.visitDoubleQuotestringAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RegexpStringAtomContext extends PrimaryContext {
	public RSTR(): TerminalNode { return this.getToken(Tads2Parser.RSTR, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterRegexpStringAtom) {
			listener.enterRegexpStringAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitRegexpStringAtom) {
			listener.exitRegexpStringAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitRegexpStringAtom) {
			return visitor.visitRegexpStringAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanAtomContext extends PrimaryContext {
	public TRUE(): TerminalNode { return this.getToken(Tads2Parser.TRUE, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterBooleanAtom) {
			listener.enterBooleanAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitBooleanAtom) {
			listener.exitBooleanAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitBooleanAtom) {
			return visitor.visitBooleanAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NilAtomContext extends PrimaryContext {
	public NIL(): TerminalNode { return this.getToken(Tads2Parser.NIL, 0); }
	constructor(ctx: PrimaryContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterNilAtom) {
			listener.enterNilAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitNilAtom) {
			listener.exitNilAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitNilAtom) {
			return visitor.visitNilAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierAtomContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ID, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.IN, 0); }
	public IS(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.IS, 0); }
	public STEP(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.STEP, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.STRING, 0); }
	public OPERATOR(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.OPERATOR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_identifierAtom; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterIdentifierAtom) {
			listener.enterIdentifierAtom(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitIdentifierAtom) {
			listener.exitIdentifierAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitIdentifierAtom) {
			return visitor.visitIdentifierAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamsContext extends ParserRuleContext {
	public optionallyTypedOptionalId(): OptionallyTypedOptionalIdContext | undefined {
		return this.tryGetRuleContext(0, OptionallyTypedOptionalIdContext);
	}
	public SPREAD(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.SPREAD, 0); }
	public array(): ArrayContext | undefined {
		return this.tryGetRuleContext(0, ArrayContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(Tads2Parser.COMMA);
		} else {
			return this.getToken(Tads2Parser.COMMA, i);
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
	public get ruleIndex(): number { return Tads2Parser.RULE_params; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterParams) {
			listener.enterParams(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitParams) {
			listener.exitParams(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
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
	public COLON(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.COLON, 0); }
	public identifierAtom(): IdentifierAtomContext[];
	public identifierAtom(i: number): IdentifierAtomContext;
	public identifierAtom(i?: number): IdentifierAtomContext | IdentifierAtomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierAtomContext);
		} else {
			return this.getRuleContext(i, IdentifierAtomContext);
		}
	}
	public OPTIONAL(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.OPTIONAL, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(Tads2Parser.ASSIGN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return Tads2Parser.RULE_optionallyTypedOptionalId; }
	// @Override
	public enterRule(listener: Tads2Listener): void {
		if (listener.enterOptionallyTypedOptionalId) {
			listener.enterOptionallyTypedOptionalId(this);
		}
	}
	// @Override
	public exitRule(listener: Tads2Listener): void {
		if (listener.exitOptionallyTypedOptionalId) {
			listener.exitOptionallyTypedOptionalId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: Tads2Visitor<Result>): Result {
		if (visitor.visitOptionallyTypedOptionalId) {
			return visitor.visitOptionallyTypedOptionalId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


