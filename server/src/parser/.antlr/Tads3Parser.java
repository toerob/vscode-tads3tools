// Generated from /Users/tomasoberg/repos/vscode-tads3tools/server/src/parser/Tads3.g4 by ANTLR 4.8
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class Tads3Parser extends Parser {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		GRAMMAR=1, SWITCH=2, CASE=3, DEFAULT=4, FUNCTION=5, THROW=6, NEW=7, TEMPLATE=8, 
		FOR=9, TRY=10, CATCH=11, FINALLY=12, ENUM=13, CLASS=14, TRANSIENT=15, 
		MODIFY=16, REPLACE=17, PROPERTYSET=18, IF=19, DO=20, WHILE=21, ELSE=22, 
		LOCAL=23, TRUE=24, NIL=25, INTRINSIC=26, INHERITED=27, DELEGATED=28, PROPERTY=29, 
		DICTIONARY=30, EXPORT=31, EXTERN=32, RETURN=33, STATIC=34, STRING=35, 
		FOREACH=36, IN=37, SPREAD=38, RANGE=39, STEP=40, LITERAL_NOT=41, IS=42, 
		BREAK=43, CONTINUE=44, GOTO=45, TOKEN=46, PRAGMA=47, OPERATOR=48, AT=49, 
		AMP=50, HASH=51, NOT=52, OPTIONAL=53, IFNIL=54, PLUS=55, DIV=56, MOD=57, 
		MINUS=58, NEQ=59, EQ=60, AND=61, OR=62, ARROW=63, TILDE=64, POW=65, ID=66, 
		ASSIGN=67, NR=68, HEX=69, OCT=70, COLON=71, COMMA=72, DOT=73, STAR=74, 
		BITWISE_OR=75, SEMICOLON=76, LEFT_PAREN=77, RIGHT_PAREN=78, LEFT_BRACKET=79, 
		RIGHT_BRACKET=80, DSTR=81, SSTR=82, RSTR=83, LEFT_CURLY=84, RIGHT_CURLY=85, 
		LTEQ=86, ARITHMETIC_LEFT=87, LT=88, GTEQ=89, GT=90, ARITHMETIC_RIGHT=91, 
		LOGICAL_RIGHT_SHIFT=92, COMMENT=93, LINE_COMMENT=94, WS=95, ANY=96;
	public static final int
		RULE_program = 0, RULE_directive = 1, RULE_pragmaDirective = 2, RULE_grammarDeclaration = 3, 
		RULE_grammarRules = 4, RULE_itemList = 5, RULE_qualifiers = 6, RULE_item = 7, 
		RULE_templateDeclaration = 8, RULE_enumDeclaration = 9, RULE_propertyDeclaration = 10, 
		RULE_dictionaryDeclaration = 11, RULE_exportDeclaration = 12, RULE_intrinsicDeclaration = 13, 
		RULE_intrinsicMethodDeclaration = 14, RULE_objectDeclaration = 15, RULE_templateExpr = 16, 
		RULE_array = 17, RULE_curlyObjectBody = 18, RULE_semiColonEndedObjectBody = 19, 
		RULE_superTypes = 20, RULE_objectBody = 21, RULE_property = 22, RULE_dictionaryProperty = 23, 
		RULE_propertySet = 24, RULE_paramsWithWildcard = 25, RULE_functionDeclaration = 26, 
		RULE_operatorOverride = 27, RULE_functionHead = 28, RULE_codeBlock = 29, 
		RULE_stats = 30, RULE_innerCodeBlock = 31, RULE_gotoStatement = 32, RULE_breakStatement = 33, 
		RULE_continueStatement = 34, RULE_labelStatement = 35, RULE_switchStatement = 36, 
		RULE_throwStatement = 37, RULE_forInStatement = 38, RULE_forEachStatement = 39, 
		RULE_returnStatement = 40, RULE_doWhileStatement = 41, RULE_whileStatement = 42, 
		RULE_forStatement = 43, RULE_tryCatchStatement = 44, RULE_callStatement = 45, 
		RULE_emptyStatement = 46, RULE_sayStatement = 47, RULE_assignmentStatement = 48, 
		RULE_ifStatement = 49, RULE_enclosedExprCodeBlock = 50, RULE_expr = 51, 
		RULE_primary = 52, RULE_identifierAtom = 53, RULE_params = 54, RULE_optionallyTypedOptionalId = 55;
	private static String[] makeRuleNames() {
		return new String[] {
			"program", "directive", "pragmaDirective", "grammarDeclaration", "grammarRules", 
			"itemList", "qualifiers", "item", "templateDeclaration", "enumDeclaration", 
			"propertyDeclaration", "dictionaryDeclaration", "exportDeclaration", 
			"intrinsicDeclaration", "intrinsicMethodDeclaration", "objectDeclaration", 
			"templateExpr", "array", "curlyObjectBody", "semiColonEndedObjectBody", 
			"superTypes", "objectBody", "property", "dictionaryProperty", "propertySet", 
			"paramsWithWildcard", "functionDeclaration", "operatorOverride", "functionHead", 
			"codeBlock", "stats", "innerCodeBlock", "gotoStatement", "breakStatement", 
			"continueStatement", "labelStatement", "switchStatement", "throwStatement", 
			"forInStatement", "forEachStatement", "returnStatement", "doWhileStatement", 
			"whileStatement", "forStatement", "tryCatchStatement", "callStatement", 
			"emptyStatement", "sayStatement", "assignmentStatement", "ifStatement", 
			"enclosedExprCodeBlock", "expr", "primary", "identifierAtom", "params", 
			"optionallyTypedOptionalId"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'grammar'", "'switch'", "'case'", "'default'", "'function'", "'throw'", 
			"'new'", "'template'", "'for'", "'try'", "'catch'", "'finally'", "'enum'", 
			"'class'", "'transient'", "'modify'", "'replace'", "'propertyset'", "'if'", 
			"'do'", "'while'", "'else'", "'local'", "'true'", "'nil'", "'intrinsic'", 
			"'inherited'", "'delegated'", "'property'", "'dictionary'", "'export'", 
			"'extern'", "'return'", "'static'", "'string'", "'foreach'", "'in'", 
			"'...'", "'..'", "'step'", "'not'", "'is'", "'break'", "'continue'", 
			"'goto'", "'token'", "'pragma'", "'operator'", "'@'", "'&'", "'#'", "'!'", 
			"'?'", "'??'", "'+'", "'/'", "'%'", "'-'", "'!='", "'=='", "'&&'", "'||'", 
			"'->'", "'~'", "'^'", null, "'='", null, null, null, "':'", "','", "'.'", 
			"'*'", "'|'", "';'", "'('", "')'", "'['", "']'", null, null, null, "'{'", 
			"'}'", "'<='", "'<<'", "'<'", "'>='", "'>'", "'>>'", "'>>>'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "GRAMMAR", "SWITCH", "CASE", "DEFAULT", "FUNCTION", "THROW", "NEW", 
			"TEMPLATE", "FOR", "TRY", "CATCH", "FINALLY", "ENUM", "CLASS", "TRANSIENT", 
			"MODIFY", "REPLACE", "PROPERTYSET", "IF", "DO", "WHILE", "ELSE", "LOCAL", 
			"TRUE", "NIL", "INTRINSIC", "INHERITED", "DELEGATED", "PROPERTY", "DICTIONARY", 
			"EXPORT", "EXTERN", "RETURN", "STATIC", "STRING", "FOREACH", "IN", "SPREAD", 
			"RANGE", "STEP", "LITERAL_NOT", "IS", "BREAK", "CONTINUE", "GOTO", "TOKEN", 
			"PRAGMA", "OPERATOR", "AT", "AMP", "HASH", "NOT", "OPTIONAL", "IFNIL", 
			"PLUS", "DIV", "MOD", "MINUS", "NEQ", "EQ", "AND", "OR", "ARROW", "TILDE", 
			"POW", "ID", "ASSIGN", "NR", "HEX", "OCT", "COLON", "COMMA", "DOT", "STAR", 
			"BITWISE_OR", "SEMICOLON", "LEFT_PAREN", "RIGHT_PAREN", "LEFT_BRACKET", 
			"RIGHT_BRACKET", "DSTR", "SSTR", "RSTR", "LEFT_CURLY", "RIGHT_CURLY", 
			"LTEQ", "ARITHMETIC_LEFT", "LT", "GTEQ", "GT", "ARITHMETIC_RIGHT", "LOGICAL_RIGHT_SHIFT", 
			"COMMENT", "LINE_COMMENT", "WS", "ANY"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Tads3.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public Tads3Parser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class ProgramContext extends ParserRuleContext {
		public DirectiveContext directive;
		public List<DirectiveContext> directives = new ArrayList<DirectiveContext>();
		public TerminalNode EOF() { return getToken(Tads3Parser.EOF, 0); }
		public List<DirectiveContext> directive() {
			return getRuleContexts(DirectiveContext.class);
		}
		public DirectiveContext directive(int i) {
			return getRuleContext(DirectiveContext.class,i);
		}
		public ProgramContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_program; }
	}

	public final ProgramContext program() throws RecognitionException {
		ProgramContext _localctx = new ProgramContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_program);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(115);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << GRAMMAR) | (1L << FUNCTION) | (1L << ENUM) | (1L << CLASS) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << INTRINSIC) | (1L << PROPERTY) | (1L << DICTIONARY) | (1L << EXPORT) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << HASH) | (1L << PLUS))) != 0) || _la==ID || _la==SEMICOLON) {
				{
				{
				setState(112);
				((ProgramContext)_localctx).directive = directive();
				((ProgramContext)_localctx).directives.add(((ProgramContext)_localctx).directive);
				}
				}
				setState(117);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(118);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DirectiveContext extends ParserRuleContext {
		public EnumDeclarationContext enumDeclaration() {
			return getRuleContext(EnumDeclarationContext.class,0);
		}
		public TemplateDeclarationContext templateDeclaration() {
			return getRuleContext(TemplateDeclarationContext.class,0);
		}
		public IntrinsicDeclarationContext intrinsicDeclaration() {
			return getRuleContext(IntrinsicDeclarationContext.class,0);
		}
		public ExportDeclarationContext exportDeclaration() {
			return getRuleContext(ExportDeclarationContext.class,0);
		}
		public ObjectDeclarationContext objectDeclaration() {
			return getRuleContext(ObjectDeclarationContext.class,0);
		}
		public PropertyDeclarationContext propertyDeclaration() {
			return getRuleContext(PropertyDeclarationContext.class,0);
		}
		public DictionaryDeclarationContext dictionaryDeclaration() {
			return getRuleContext(DictionaryDeclarationContext.class,0);
		}
		public FunctionDeclarationContext functionDeclaration() {
			return getRuleContext(FunctionDeclarationContext.class,0);
		}
		public GrammarDeclarationContext grammarDeclaration() {
			return getRuleContext(GrammarDeclarationContext.class,0);
		}
		public PragmaDirectiveContext pragmaDirective() {
			return getRuleContext(PragmaDirectiveContext.class,0);
		}
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public DirectiveContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_directive; }
	}

	public final DirectiveContext directive() throws RecognitionException {
		DirectiveContext _localctx = new DirectiveContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_directive);
		try {
			setState(131);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(120);
				enumDeclaration();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(121);
				templateDeclaration();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(122);
				intrinsicDeclaration();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(123);
				exportDeclaration();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(124);
				objectDeclaration();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(125);
				propertyDeclaration();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(126);
				dictionaryDeclaration();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(127);
				functionDeclaration();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(128);
				grammarDeclaration();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(129);
				pragmaDirective();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(130);
				match(SEMICOLON);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PragmaDirectiveContext extends ParserRuleContext {
		public TerminalNode HASH() { return getToken(Tads3Parser.HASH, 0); }
		public TerminalNode PRAGMA() { return getToken(Tads3Parser.PRAGMA, 0); }
		public TerminalNode ID() { return getToken(Tads3Parser.ID, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public PragmaDirectiveContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pragmaDirective; }
	}

	public final PragmaDirectiveContext pragmaDirective() throws RecognitionException {
		PragmaDirectiveContext _localctx = new PragmaDirectiveContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_pragmaDirective);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(133);
			match(HASH);
			setState(134);
			match(PRAGMA);
			setState(135);
			match(ID);
			setState(136);
			match(LEFT_PAREN);
			{
			setState(137);
			expr(0);
			}
			setState(138);
			match(RIGHT_PAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class GrammarDeclarationContext extends ParserRuleContext {
		public Token isModify;
		public Token isReplace;
		public IdentifierAtomContext prodName;
		public IdentifierAtomContext tag;
		public TerminalNode GRAMMAR() { return getToken(Tads3Parser.GRAMMAR, 0); }
		public List<TerminalNode> COLON() { return getTokens(Tads3Parser.COLON); }
		public TerminalNode COLON(int i) {
			return getToken(Tads3Parser.COLON, i);
		}
		public GrammarRulesContext grammarRules() {
			return getRuleContext(GrammarRulesContext.class,0);
		}
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public SuperTypesContext superTypes() {
			return getRuleContext(SuperTypesContext.class,0);
		}
		public TerminalNode MODIFY() { return getToken(Tads3Parser.MODIFY, 0); }
		public TerminalNode REPLACE() { return getToken(Tads3Parser.REPLACE, 0); }
		public CurlyObjectBodyContext curlyObjectBody() {
			return getRuleContext(CurlyObjectBodyContext.class,0);
		}
		public SemiColonEndedObjectBodyContext semiColonEndedObjectBody() {
			return getRuleContext(SemiColonEndedObjectBodyContext.class,0);
		}
		public GrammarDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_grammarDeclaration; }
	}

	public final GrammarDeclarationContext grammarDeclaration() throws RecognitionException {
		GrammarDeclarationContext _localctx = new GrammarDeclarationContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_grammarDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(142);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case MODIFY:
				{
				setState(140);
				((GrammarDeclarationContext)_localctx).isModify = match(MODIFY);
				}
				break;
			case REPLACE:
				{
				setState(141);
				((GrammarDeclarationContext)_localctx).isReplace = match(REPLACE);
				}
				break;
			case GRAMMAR:
				break;
			default:
				break;
			}
			setState(144);
			match(GRAMMAR);
			setState(145);
			((GrammarDeclarationContext)_localctx).prodName = identifierAtom();
			setState(150);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==LEFT_PAREN) {
				{
				setState(146);
				match(LEFT_PAREN);
				setState(147);
				((GrammarDeclarationContext)_localctx).tag = identifierAtom();
				setState(148);
				match(RIGHT_PAREN);
				}
			}

			setState(152);
			match(COLON);
			setState(153);
			grammarRules();
			setState(154);
			match(COLON);
			setState(160);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,5,_ctx) ) {
			case 1:
				{
				setState(155);
				superTypes();
				setState(158);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case LEFT_CURLY:
					{
					setState(156);
					curlyObjectBody();
					}
					break;
				case FUNCTION:
				case MODIFY:
				case REPLACE:
				case PROPERTYSET:
				case EXTERN:
				case STATIC:
				case STRING:
				case IN:
				case STEP:
				case IS:
				case OPERATOR:
				case AT:
				case AMP:
				case NOT:
				case PLUS:
				case DIV:
				case MOD:
				case MINUS:
				case ARROW:
				case TILDE:
				case ID:
				case STAR:
				case SEMICOLON:
				case LEFT_BRACKET:
				case DSTR:
				case SSTR:
					{
					setState(157);
					semiColonEndedObjectBody();
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
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class GrammarRulesContext extends ParserRuleContext {
		public List<ItemListContext> itemList() {
			return getRuleContexts(ItemListContext.class);
		}
		public ItemListContext itemList(int i) {
			return getRuleContext(ItemListContext.class,i);
		}
		public List<TerminalNode> BITWISE_OR() { return getTokens(Tads3Parser.BITWISE_OR); }
		public TerminalNode BITWISE_OR(int i) {
			return getToken(Tads3Parser.BITWISE_OR, i);
		}
		public GrammarRulesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_grammarRules; }
	}

	public final GrammarRulesContext grammarRules() throws RecognitionException {
		GrammarRulesContext _localctx = new GrammarRulesContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_grammarRules);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(162);
			itemList();
			setState(167);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==BITWISE_OR) {
				{
				{
				setState(163);
				match(BITWISE_OR);
				setState(164);
				itemList();
				}
				}
				setState(169);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ItemListContext extends ParserRuleContext {
		public QualifiersContext qualifiers() {
			return getRuleContext(QualifiersContext.class,0);
		}
		public List<ItemContext> item() {
			return getRuleContexts(ItemContext.class);
		}
		public ItemContext item(int i) {
			return getRuleContext(ItemContext.class,i);
		}
		public ItemListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_itemList; }
	}

	public final ItemListContext itemList() throws RecognitionException {
		ItemListContext _localctx = new ItemListContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_itemList);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(171);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
			case 1:
				{
				setState(170);
				qualifiers();
				}
				break;
			}
			setState(176);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,8,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(173);
					item(0);
					}
					} 
				}
				setState(178);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,8,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class QualifiersContext extends ParserRuleContext {
		public TerminalNode LEFT_BRACKET() { return getToken(Tads3Parser.LEFT_BRACKET, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode NR() { return getToken(Tads3Parser.NR, 0); }
		public TerminalNode RIGHT_BRACKET() { return getToken(Tads3Parser.RIGHT_BRACKET, 0); }
		public QualifiersContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_qualifiers; }
	}

	public final QualifiersContext qualifiers() throws RecognitionException {
		QualifiersContext _localctx = new QualifiersContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_qualifiers);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(179);
			match(LEFT_BRACKET);
			setState(180);
			identifierAtom();
			setState(181);
			match(NR);
			setState(182);
			match(RIGHT_BRACKET);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ItemContext extends ParserRuleContext {
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public List<ItemContext> item() {
			return getRuleContexts(ItemContext.class);
		}
		public ItemContext item(int i) {
			return getRuleContext(ItemContext.class,i);
		}
		public TerminalNode BITWISE_OR() { return getToken(Tads3Parser.BITWISE_OR, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode STAR() { return getToken(Tads3Parser.STAR, 0); }
		public ItemContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_item; }
	}

	public final ItemContext item() throws RecognitionException {
		return item(0);
	}

	private ItemContext item(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ItemContext _localctx = new ItemContext(_ctx, _parentState);
		ItemContext _prevctx = _localctx;
		int _startState = 14;
		enterRecursionRule(_localctx, 14, RULE_item, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(197);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,10,_ctx) ) {
			case 1:
				{
				setState(185);
				match(LEFT_PAREN);
				setState(187); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(186);
					item(0);
					}
					}
					setState(189); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (BITWISE_OR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0) );
				setState(191);
				match(RIGHT_PAREN);
				}
				break;
			case 2:
				{
				setState(193);
				match(BITWISE_OR);
				setState(194);
				item(3);
				}
				break;
			case 3:
				{
				setState(195);
				expr(0);
				}
				break;
			case 4:
				{
				setState(196);
				match(STAR);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(203);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,11,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ItemContext(_parentctx, _parentState);
					pushNewRecursionContext(_localctx, _startState, RULE_item);
					setState(199);
					if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
					setState(200);
					match(BITWISE_OR);
					}
					} 
				}
				setState(205);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,11,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class TemplateDeclarationContext extends ParserRuleContext {
		public IdentifierAtomContext className;
		public ExprContext expr;
		public List<ExprContext> properties = new ArrayList<ExprContext>();
		public IdentifierAtomContext templateId;
		public TerminalNode TEMPLATE() { return getToken(Tads3Parser.TEMPLATE, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public List<TerminalNode> OPTIONAL() { return getTokens(Tads3Parser.OPTIONAL); }
		public TerminalNode OPTIONAL(int i) {
			return getToken(Tads3Parser.OPTIONAL, i);
		}
		public TerminalNode STRING() { return getToken(Tads3Parser.STRING, 0); }
		public TerminalNode ARITHMETIC_LEFT() { return getToken(Tads3Parser.ARITHMETIC_LEFT, 0); }
		public TerminalNode ARITHMETIC_RIGHT() { return getToken(Tads3Parser.ARITHMETIC_RIGHT, 0); }
		public List<TerminalNode> STAR() { return getTokens(Tads3Parser.STAR); }
		public TerminalNode STAR(int i) {
			return getToken(Tads3Parser.STAR, i);
		}
		public List<TerminalNode> IS() { return getTokens(Tads3Parser.IS); }
		public TerminalNode IS(int i) {
			return getToken(Tads3Parser.IS, i);
		}
		public List<TerminalNode> IN() { return getTokens(Tads3Parser.IN); }
		public TerminalNode IN(int i) {
			return getToken(Tads3Parser.IN, i);
		}
		public TemplateDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_templateDeclaration; }
	}

	public final TemplateDeclarationContext templateDeclaration() throws RecognitionException {
		TemplateDeclarationContext _localctx = new TemplateDeclarationContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_templateDeclaration);
		int _la;
		try {
			setState(234);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,16,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(206);
				((TemplateDeclarationContext)_localctx).className = identifierAtom();
				setState(207);
				match(TEMPLATE);
				setState(212); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(208);
					((TemplateDeclarationContext)_localctx).expr = expr(0);
					((TemplateDeclarationContext)_localctx).properties.add(((TemplateDeclarationContext)_localctx).expr);
					setState(210);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==OPTIONAL) {
						{
						setState(209);
						match(OPTIONAL);
						}
					}

					}
					}
					setState(214); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0) );
				setState(216);
				match(SEMICOLON);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(218);
				match(STRING);
				setState(219);
				match(TEMPLATE);
				setState(220);
				match(ARITHMETIC_LEFT);
				setState(227);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (IS - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)) | (1L << (STAR - 35)))) != 0)) {
					{
					setState(225);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,14,_ctx) ) {
					case 1:
						{
						setState(221);
						identifierAtom();
						}
						break;
					case 2:
						{
						setState(222);
						match(STAR);
						}
						break;
					case 3:
						{
						setState(223);
						match(IS);
						}
						break;
					case 4:
						{
						setState(224);
						match(IN);
						}
						break;
					}
					}
					setState(229);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(230);
				match(ARITHMETIC_RIGHT);
				setState(231);
				((TemplateDeclarationContext)_localctx).templateId = identifierAtom();
				setState(232);
				match(SEMICOLON);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EnumDeclarationContext extends ParserRuleContext {
		public Token isToken;
		public TerminalNode ENUM() { return getToken(Tads3Parser.ENUM, 0); }
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public List<TerminalNode> COMMA() { return getTokens(Tads3Parser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(Tads3Parser.COMMA, i);
		}
		public TerminalNode TOKEN() { return getToken(Tads3Parser.TOKEN, 0); }
		public EnumDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enumDeclaration; }
	}

	public final EnumDeclarationContext enumDeclaration() throws RecognitionException {
		EnumDeclarationContext _localctx = new EnumDeclarationContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_enumDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(236);
			match(ENUM);
			setState(238);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==TOKEN) {
				{
				setState(237);
				((EnumDeclarationContext)_localctx).isToken = match(TOKEN);
				}
			}

			setState(240);
			identifierAtom();
			setState(245);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(241);
				match(COMMA);
				setState(242);
				identifierAtom();
				}
				}
				setState(247);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(248);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PropertyDeclarationContext extends ParserRuleContext {
		public Token level;
		public Token isProperty;
		public IdentifierAtomContext identifierAtom;
		public List<IdentifierAtomContext> identifiers = new ArrayList<IdentifierAtomContext>();
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public TerminalNode PROPERTY() { return getToken(Tads3Parser.PROPERTY, 0); }
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(Tads3Parser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(Tads3Parser.COMMA, i);
		}
		public List<TerminalNode> PLUS() { return getTokens(Tads3Parser.PLUS); }
		public TerminalNode PLUS(int i) {
			return getToken(Tads3Parser.PLUS, i);
		}
		public PropertyDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_propertyDeclaration; }
	}

	public final PropertyDeclarationContext propertyDeclaration() throws RecognitionException {
		PropertyDeclarationContext _localctx = new PropertyDeclarationContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_propertyDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(253);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(250);
				((PropertyDeclarationContext)_localctx).level = match(PLUS);
				}
				}
				setState(255);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(256);
			((PropertyDeclarationContext)_localctx).isProperty = match(PROPERTY);
			setState(257);
			((PropertyDeclarationContext)_localctx).identifierAtom = identifierAtom();
			((PropertyDeclarationContext)_localctx).identifiers.add(((PropertyDeclarationContext)_localctx).identifierAtom);
			setState(262);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(258);
				match(COMMA);
				setState(259);
				((PropertyDeclarationContext)_localctx).identifierAtom = identifierAtom();
				((PropertyDeclarationContext)_localctx).identifiers.add(((PropertyDeclarationContext)_localctx).identifierAtom);
				}
				}
				setState(264);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(265);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DictionaryDeclarationContext extends ParserRuleContext {
		public Token level;
		public Token isProperty;
		public IdentifierAtomContext identifierAtom;
		public List<IdentifierAtomContext> identifiers = new ArrayList<IdentifierAtomContext>();
		public TerminalNode DICTIONARY() { return getToken(Tads3Parser.DICTIONARY, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(Tads3Parser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(Tads3Parser.COMMA, i);
		}
		public List<TerminalNode> PLUS() { return getTokens(Tads3Parser.PLUS); }
		public TerminalNode PLUS(int i) {
			return getToken(Tads3Parser.PLUS, i);
		}
		public TerminalNode PROPERTY() { return getToken(Tads3Parser.PROPERTY, 0); }
		public DictionaryDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dictionaryDeclaration; }
	}

	public final DictionaryDeclarationContext dictionaryDeclaration() throws RecognitionException {
		DictionaryDeclarationContext _localctx = new DictionaryDeclarationContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_dictionaryDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(270);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(267);
				((DictionaryDeclarationContext)_localctx).level = match(PLUS);
				}
				}
				setState(272);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(273);
			match(DICTIONARY);
			setState(275);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PROPERTY) {
				{
				setState(274);
				((DictionaryDeclarationContext)_localctx).isProperty = match(PROPERTY);
				}
			}

			setState(277);
			((DictionaryDeclarationContext)_localctx).identifierAtom = identifierAtom();
			((DictionaryDeclarationContext)_localctx).identifiers.add(((DictionaryDeclarationContext)_localctx).identifierAtom);
			setState(282);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(278);
				match(COMMA);
				setState(279);
				((DictionaryDeclarationContext)_localctx).identifierAtom = identifierAtom();
				((DictionaryDeclarationContext)_localctx).identifiers.add(((DictionaryDeclarationContext)_localctx).identifierAtom);
				}
				}
				setState(284);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(285);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExportDeclarationContext extends ParserRuleContext {
		public TerminalNode EXPORT() { return getToken(Tads3Parser.EXPORT, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public TerminalNode SSTR() { return getToken(Tads3Parser.SSTR, 0); }
		public ExportDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_exportDeclaration; }
	}

	public final ExportDeclarationContext exportDeclaration() throws RecognitionException {
		ExportDeclarationContext _localctx = new ExportDeclarationContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_exportDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(287);
			match(EXPORT);
			setState(288);
			identifierAtom();
			setState(290);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SSTR) {
				{
				setState(289);
				match(SSTR);
				}
			}

			setState(292);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IntrinsicDeclarationContext extends ParserRuleContext {
		public IdentifierAtomContext name;
		public IntrinsicMethodDeclarationContext intrinsicMethodDeclaration;
		public List<IntrinsicMethodDeclarationContext> methods = new ArrayList<IntrinsicMethodDeclarationContext>();
		public TerminalNode INTRINSIC() { return getToken(Tads3Parser.INTRINSIC, 0); }
		public TerminalNode LEFT_CURLY() { return getToken(Tads3Parser.LEFT_CURLY, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(Tads3Parser.RIGHT_CURLY, 0); }
		public TerminalNode CLASS() { return getToken(Tads3Parser.CLASS, 0); }
		public TerminalNode COLON() { return getToken(Tads3Parser.COLON, 0); }
		public SuperTypesContext superTypes() {
			return getRuleContext(SuperTypesContext.class,0);
		}
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode SSTR() { return getToken(Tads3Parser.SSTR, 0); }
		public TerminalNode DSTR() { return getToken(Tads3Parser.DSTR, 0); }
		public List<IntrinsicMethodDeclarationContext> intrinsicMethodDeclaration() {
			return getRuleContexts(IntrinsicMethodDeclarationContext.class);
		}
		public IntrinsicMethodDeclarationContext intrinsicMethodDeclaration(int i) {
			return getRuleContext(IntrinsicMethodDeclarationContext.class,i);
		}
		public IntrinsicDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_intrinsicDeclaration; }
	}

	public final IntrinsicDeclarationContext intrinsicDeclaration() throws RecognitionException {
		IntrinsicDeclarationContext _localctx = new IntrinsicDeclarationContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_intrinsicDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(294);
			match(INTRINSIC);
			setState(296);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==CLASS) {
				{
				setState(295);
				match(CLASS);
				}
			}

			setState(299);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (IS - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(298);
				((IntrinsicDeclarationContext)_localctx).name = identifierAtom();
				}
			}

			setState(302);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==DSTR || _la==SSTR) {
				{
				setState(301);
				_la = _input.LA(1);
				if ( !(_la==DSTR || _la==SSTR) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
			}

			setState(306);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COLON) {
				{
				setState(304);
				match(COLON);
				setState(305);
				superTypes();
				}
			}

			setState(308);
			match(LEFT_CURLY);
			setState(312);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 34)) & ~0x3f) == 0 && ((1L << (_la - 34)) & ((1L << (STATIC - 34)) | (1L << (STRING - 34)) | (1L << (IN - 34)) | (1L << (STEP - 34)) | (1L << (IS - 34)) | (1L << (OPERATOR - 34)) | (1L << (ID - 34)))) != 0)) {
				{
				{
				setState(309);
				((IntrinsicDeclarationContext)_localctx).intrinsicMethodDeclaration = intrinsicMethodDeclaration();
				((IntrinsicDeclarationContext)_localctx).methods.add(((IntrinsicDeclarationContext)_localctx).intrinsicMethodDeclaration);
				}
				}
				setState(314);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(315);
			match(RIGHT_CURLY);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IntrinsicMethodDeclarationContext extends ParserRuleContext {
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public TerminalNode STATIC() { return getToken(Tads3Parser.STATIC, 0); }
		public ParamsContext params() {
			return getRuleContext(ParamsContext.class,0);
		}
		public IntrinsicMethodDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_intrinsicMethodDeclaration; }
	}

	public final IntrinsicMethodDeclarationContext intrinsicMethodDeclaration() throws RecognitionException {
		IntrinsicMethodDeclarationContext _localctx = new IntrinsicMethodDeclarationContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_intrinsicMethodDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(318);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==STATIC) {
				{
				setState(317);
				match(STATIC);
				}
			}

			setState(320);
			identifierAtom();
			{
			setState(321);
			match(LEFT_PAREN);
			setState(323);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(322);
				params();
				}
			}

			setState(325);
			match(RIGHT_PAREN);
			}
			setState(327);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ObjectDeclarationContext extends ParserRuleContext {
		public Token isModify;
		public Token isReplace;
		public Token isClass;
		public Token PLUS;
		public List<Token> level = new ArrayList<Token>();
		public Token isTransient;
		public IdentifierAtomContext id;
		public SuperTypesContext superTypes() {
			return getRuleContext(SuperTypesContext.class,0);
		}
		public CurlyObjectBodyContext curlyObjectBody() {
			return getRuleContext(CurlyObjectBodyContext.class,0);
		}
		public SemiColonEndedObjectBodyContext semiColonEndedObjectBody() {
			return getRuleContext(SemiColonEndedObjectBodyContext.class,0);
		}
		public List<TerminalNode> PLUS() { return getTokens(Tads3Parser.PLUS); }
		public TerminalNode PLUS(int i) {
			return getToken(Tads3Parser.PLUS, i);
		}
		public TerminalNode COLON() { return getToken(Tads3Parser.COLON, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode MODIFY() { return getToken(Tads3Parser.MODIFY, 0); }
		public TerminalNode REPLACE() { return getToken(Tads3Parser.REPLACE, 0); }
		public TerminalNode CLASS() { return getToken(Tads3Parser.CLASS, 0); }
		public TerminalNode TRANSIENT() { return getToken(Tads3Parser.TRANSIENT, 0); }
		public ObjectDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_objectDeclaration; }
	}

	public final ObjectDeclarationContext objectDeclaration() throws RecognitionException {
		ObjectDeclarationContext _localctx = new ObjectDeclarationContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_objectDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(338);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,35,_ctx) ) {
			case 1:
				{
				setState(330);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==MODIFY) {
					{
					setState(329);
					((ObjectDeclarationContext)_localctx).isModify = match(MODIFY);
					}
				}

				}
				break;
			case 2:
				{
				setState(333);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==REPLACE) {
					{
					setState(332);
					((ObjectDeclarationContext)_localctx).isReplace = match(REPLACE);
					}
				}

				}
				break;
			case 3:
				{
				setState(336);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==CLASS) {
					{
					setState(335);
					((ObjectDeclarationContext)_localctx).isClass = match(CLASS);
					}
				}

				}
				break;
			}
			setState(343);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(340);
				((ObjectDeclarationContext)_localctx).PLUS = match(PLUS);
				((ObjectDeclarationContext)_localctx).level.add(((ObjectDeclarationContext)_localctx).PLUS);
				}
				}
				setState(345);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(354);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,38,_ctx) ) {
			case 1:
				{
				setState(346);
				superTypes();
				}
				break;
			case 2:
				{
				{
				setState(348);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==TRANSIENT) {
					{
					setState(347);
					((ObjectDeclarationContext)_localctx).isTransient = match(TRANSIENT);
					}
				}

				setState(350);
				((ObjectDeclarationContext)_localctx).id = identifierAtom();
				setState(351);
				match(COLON);
				setState(352);
				superTypes();
				}
				}
				break;
			}
			setState(358);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LEFT_CURLY:
				{
				setState(356);
				curlyObjectBody();
				}
				break;
			case FUNCTION:
			case MODIFY:
			case REPLACE:
			case PROPERTYSET:
			case EXTERN:
			case STATIC:
			case STRING:
			case IN:
			case STEP:
			case IS:
			case OPERATOR:
			case AT:
			case AMP:
			case NOT:
			case PLUS:
			case DIV:
			case MOD:
			case MINUS:
			case ARROW:
			case TILDE:
			case ID:
			case STAR:
			case SEMICOLON:
			case LEFT_BRACKET:
			case DSTR:
			case SSTR:
				{
				setState(357);
				semiColonEndedObjectBody();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TemplateExprContext extends ParserRuleContext {
		public Token singleString;
		public ExprContext atLocation;
		public Token doubleString;
		public IdentifierAtomContext op;
		public ExprContext expression;
		public IdentifierAtomContext connection;
		public TerminalNode AT() { return getToken(Tads3Parser.AT, 0); }
		public TerminalNode ARROW() { return getToken(Tads3Parser.ARROW, 0); }
		public TerminalNode LEFT_BRACKET() { return getToken(Tads3Parser.LEFT_BRACKET, 0); }
		public ArrayContext array() {
			return getRuleContext(ArrayContext.class,0);
		}
		public TerminalNode RIGHT_BRACKET() { return getToken(Tads3Parser.RIGHT_BRACKET, 0); }
		public TerminalNode SSTR() { return getToken(Tads3Parser.SSTR, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode DSTR() { return getToken(Tads3Parser.DSTR, 0); }
		public TerminalNode PLUS() { return getToken(Tads3Parser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(Tads3Parser.MINUS, 0); }
		public TerminalNode STAR() { return getToken(Tads3Parser.STAR, 0); }
		public TerminalNode DIV() { return getToken(Tads3Parser.DIV, 0); }
		public TerminalNode MOD() { return getToken(Tads3Parser.MOD, 0); }
		public TerminalNode AMP() { return getToken(Tads3Parser.AMP, 0); }
		public TerminalNode NOT() { return getToken(Tads3Parser.NOT, 0); }
		public TerminalNode TILDE() { return getToken(Tads3Parser.TILDE, 0); }
		public TerminalNode OPTIONAL() { return getToken(Tads3Parser.OPTIONAL, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TemplateExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_templateExpr; }
	}

	public final TemplateExprContext templateExpr() throws RecognitionException {
		TemplateExprContext _localctx = new TemplateExprContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_templateExpr);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(384);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case SSTR:
				{
				setState(360);
				((TemplateExprContext)_localctx).singleString = match(SSTR);
				setState(362);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
				case 1:
					{
					setState(361);
					match(SEMICOLON);
					}
					break;
				}
				}
				break;
			case AT:
				{
				setState(364);
				match(AT);
				setState(365);
				((TemplateExprContext)_localctx).atLocation = expr(0);
				}
				break;
			case DSTR:
				{
				setState(366);
				((TemplateExprContext)_localctx).doubleString = match(DSTR);
				setState(368);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,41,_ctx) ) {
				case 1:
					{
					setState(367);
					match(SEMICOLON);
					}
					break;
				}
				}
				break;
			case AMP:
			case NOT:
			case PLUS:
			case DIV:
			case MOD:
			case MINUS:
			case TILDE:
			case STAR:
				{
				setState(370);
				_la = _input.LA(1);
				if ( !(((((_la - 50)) & ~0x3f) == 0 && ((1L << (_la - 50)) & ((1L << (AMP - 50)) | (1L << (NOT - 50)) | (1L << (PLUS - 50)) | (1L << (DIV - 50)) | (1L << (MOD - 50)) | (1L << (MINUS - 50)) | (1L << (TILDE - 50)) | (1L << (STAR - 50)))) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(373);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,42,_ctx) ) {
				case 1:
					{
					setState(371);
					((TemplateExprContext)_localctx).op = identifierAtom();
					}
					break;
				case 2:
					{
					setState(372);
					((TemplateExprContext)_localctx).expression = expr(0);
					}
					break;
				}
				}
				break;
			case ARROW:
				{
				setState(375);
				match(ARROW);
				setState(378);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,43,_ctx) ) {
				case 1:
					{
					setState(376);
					((TemplateExprContext)_localctx).connection = identifierAtom();
					}
					break;
				case 2:
					{
					setState(377);
					((TemplateExprContext)_localctx).expression = expr(0);
					}
					break;
				}
				}
				break;
			case LEFT_BRACKET:
				{
				setState(380);
				match(LEFT_BRACKET);
				setState(381);
				array();
				setState(382);
				match(RIGHT_BRACKET);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(387);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==OPTIONAL) {
				{
				setState(386);
				match(OPTIONAL);
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ArrayContext extends ParserRuleContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public List<TerminalNode> COMMA() { return getTokens(Tads3Parser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(Tads3Parser.COMMA, i);
		}
		public List<ArrayContext> array() {
			return getRuleContexts(ArrayContext.class);
		}
		public ArrayContext array(int i) {
			return getRuleContext(ArrayContext.class,i);
		}
		public ArrayContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_array; }
	}

	public final ArrayContext array() throws RecognitionException {
		ArrayContext _localctx = new ArrayContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_array);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(389);
			expr(0);
			setState(394);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,46,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(390);
					match(COMMA);
					setState(391);
					array();
					}
					} 
				}
				setState(396);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,46,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CurlyObjectBodyContext extends ParserRuleContext {
		public TerminalNode LEFT_CURLY() { return getToken(Tads3Parser.LEFT_CURLY, 0); }
		public ObjectBodyContext objectBody() {
			return getRuleContext(ObjectBodyContext.class,0);
		}
		public TerminalNode RIGHT_CURLY() { return getToken(Tads3Parser.RIGHT_CURLY, 0); }
		public CurlyObjectBodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_curlyObjectBody; }
	}

	public final CurlyObjectBodyContext curlyObjectBody() throws RecognitionException {
		CurlyObjectBodyContext _localctx = new CurlyObjectBodyContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_curlyObjectBody);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(397);
			match(LEFT_CURLY);
			setState(398);
			objectBody();
			setState(399);
			match(RIGHT_CURLY);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SemiColonEndedObjectBodyContext extends ParserRuleContext {
		public ObjectBodyContext objectBody() {
			return getRuleContext(ObjectBodyContext.class,0);
		}
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public SemiColonEndedObjectBodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_semiColonEndedObjectBody; }
	}

	public final SemiColonEndedObjectBodyContext semiColonEndedObjectBody() throws RecognitionException {
		SemiColonEndedObjectBodyContext _localctx = new SemiColonEndedObjectBodyContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_semiColonEndedObjectBody);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(401);
			objectBody();
			setState(402);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SuperTypesContext extends ParserRuleContext {
		public IdentifierAtomContext identifierAtom;
		public List<IdentifierAtomContext> superType = new ArrayList<IdentifierAtomContext>();
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public List<TerminalNode> COMMA() { return getTokens(Tads3Parser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(Tads3Parser.COMMA, i);
		}
		public List<SuperTypesContext> superTypes() {
			return getRuleContexts(SuperTypesContext.class);
		}
		public SuperTypesContext superTypes(int i) {
			return getRuleContext(SuperTypesContext.class,i);
		}
		public SuperTypesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_superTypes; }
	}

	public final SuperTypesContext superTypes() throws RecognitionException {
		SuperTypesContext _localctx = new SuperTypesContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_superTypes);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(404);
			((SuperTypesContext)_localctx).identifierAtom = identifierAtom();
			((SuperTypesContext)_localctx).superType.add(((SuperTypesContext)_localctx).identifierAtom);
			setState(409);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,47,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(405);
					match(COMMA);
					setState(406);
					superTypes();
					}
					} 
				}
				setState(411);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,47,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ObjectBodyContext extends ParserRuleContext {
		public TemplateExprContext templateExpr;
		public List<TemplateExprContext> template = new ArrayList<TemplateExprContext>();
		public FunctionDeclarationContext functionDeclaration;
		public List<FunctionDeclarationContext> functions = new ArrayList<FunctionDeclarationContext>();
		public PropertyContext property;
		public List<PropertyContext> properties = new ArrayList<PropertyContext>();
		public PropertySetContext propertySet;
		public List<PropertySetContext> propertySets = new ArrayList<PropertySetContext>();
		public List<FunctionDeclarationContext> functionDeclaration() {
			return getRuleContexts(FunctionDeclarationContext.class);
		}
		public FunctionDeclarationContext functionDeclaration(int i) {
			return getRuleContext(FunctionDeclarationContext.class,i);
		}
		public List<PropertyContext> property() {
			return getRuleContexts(PropertyContext.class);
		}
		public PropertyContext property(int i) {
			return getRuleContext(PropertyContext.class,i);
		}
		public List<PropertySetContext> propertySet() {
			return getRuleContexts(PropertySetContext.class);
		}
		public PropertySetContext propertySet(int i) {
			return getRuleContext(PropertySetContext.class,i);
		}
		public List<TemplateExprContext> templateExpr() {
			return getRuleContexts(TemplateExprContext.class);
		}
		public TemplateExprContext templateExpr(int i) {
			return getRuleContext(TemplateExprContext.class,i);
		}
		public ObjectBodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_objectBody; }
	}

	public final ObjectBodyContext objectBody() throws RecognitionException {
		ObjectBodyContext _localctx = new ObjectBodyContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_objectBody);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			{
			setState(415);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 49)) & ~0x3f) == 0 && ((1L << (_la - 49)) & ((1L << (AT - 49)) | (1L << (AMP - 49)) | (1L << (NOT - 49)) | (1L << (PLUS - 49)) | (1L << (DIV - 49)) | (1L << (MOD - 49)) | (1L << (MINUS - 49)) | (1L << (ARROW - 49)) | (1L << (TILDE - 49)) | (1L << (STAR - 49)) | (1L << (LEFT_BRACKET - 49)) | (1L << (DSTR - 49)) | (1L << (SSTR - 49)))) != 0)) {
				{
				{
				setState(412);
				((ObjectBodyContext)_localctx).templateExpr = templateExpr();
				((ObjectBodyContext)_localctx).template.add(((ObjectBodyContext)_localctx).templateExpr);
				}
				}
				setState(417);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(423);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 5)) & ~0x3f) == 0 && ((1L << (_la - 5)) & ((1L << (FUNCTION - 5)) | (1L << (MODIFY - 5)) | (1L << (REPLACE - 5)) | (1L << (PROPERTYSET - 5)) | (1L << (EXTERN - 5)) | (1L << (STATIC - 5)) | (1L << (STRING - 5)) | (1L << (IN - 5)) | (1L << (STEP - 5)) | (1L << (IS - 5)) | (1L << (OPERATOR - 5)) | (1L << (ID - 5)))) != 0)) {
				{
				setState(421);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,49,_ctx) ) {
				case 1:
					{
					setState(418);
					((ObjectBodyContext)_localctx).functionDeclaration = functionDeclaration();
					((ObjectBodyContext)_localctx).functions.add(((ObjectBodyContext)_localctx).functionDeclaration);
					}
					break;
				case 2:
					{
					setState(419);
					((ObjectBodyContext)_localctx).property = property();
					((ObjectBodyContext)_localctx).properties.add(((ObjectBodyContext)_localctx).property);
					}
					break;
				case 3:
					{
					setState(420);
					((ObjectBodyContext)_localctx).propertySet = propertySet();
					((ObjectBodyContext)_localctx).propertySets.add(((ObjectBodyContext)_localctx).propertySet);
					}
					break;
				}
				}
				setState(425);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PropertyContext extends ParserRuleContext {
		public IdentifierAtomContext id;
		public IdentifierAtomContext objectName;
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public TerminalNode ASSIGN() { return getToken(Tads3Parser.ASSIGN, 0); }
		public TerminalNode COLON() { return getToken(Tads3Parser.COLON, 0); }
		public CurlyObjectBodyContext curlyObjectBody() {
			return getRuleContext(CurlyObjectBodyContext.class,0);
		}
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public DictionaryPropertyContext dictionaryProperty() {
			return getRuleContext(DictionaryPropertyContext.class,0);
		}
		public TerminalNode STATIC() { return getToken(Tads3Parser.STATIC, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public List<TerminalNode> COMMA() { return getTokens(Tads3Parser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(Tads3Parser.COMMA, i);
		}
		public List<SuperTypesContext> superTypes() {
			return getRuleContexts(SuperTypesContext.class);
		}
		public SuperTypesContext superTypes(int i) {
			return getRuleContext(SuperTypesContext.class,i);
		}
		public PropertyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_property; }
	}

	public final PropertyContext property() throws RecognitionException {
		PropertyContext _localctx = new PropertyContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_property);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(426);
			((PropertyContext)_localctx).id = identifierAtom();
			setState(453);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN:
				{
				setState(427);
				match(ASSIGN);
				setState(429);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,51,_ctx) ) {
				case 1:
					{
					setState(428);
					match(STATIC);
					}
					break;
				}
				setState(433);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,52,_ctx) ) {
				case 1:
					{
					setState(431);
					expr(0);
					}
					break;
				case 2:
					{
					setState(432);
					dictionaryProperty();
					}
					break;
				}
				setState(436);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,53,_ctx) ) {
				case 1:
					{
					setState(435);
					match(SEMICOLON);
					}
					break;
				}
				}
				break;
			case COLON:
				{
				setState(438);
				match(COLON);
				setState(440);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (IS - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) {
					{
					setState(439);
					((PropertyContext)_localctx).objectName = identifierAtom();
					}
				}

				setState(446);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==COMMA) {
					{
					{
					setState(442);
					match(COMMA);
					setState(443);
					superTypes();
					}
					}
					setState(448);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(449);
				curlyObjectBody();
				setState(451);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,56,_ctx) ) {
				case 1:
					{
					setState(450);
					match(SEMICOLON);
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
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DictionaryPropertyContext extends ParserRuleContext {
		public List<TerminalNode> SSTR() { return getTokens(Tads3Parser.SSTR); }
		public TerminalNode SSTR(int i) {
			return getToken(Tads3Parser.SSTR, i);
		}
		public DictionaryPropertyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dictionaryProperty; }
	}

	public final DictionaryPropertyContext dictionaryProperty() throws RecognitionException {
		DictionaryPropertyContext _localctx = new DictionaryPropertyContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_dictionaryProperty);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(458);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==SSTR) {
				{
				{
				setState(455);
				match(SSTR);
				}
				}
				setState(460);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class PropertySetContext extends ParserRuleContext {
		public Token prefix;
		public CurlyObjectBodyContext curlyObjectBody() {
			return getRuleContext(CurlyObjectBodyContext.class,0);
		}
		public TerminalNode PROPERTYSET() { return getToken(Tads3Parser.PROPERTYSET, 0); }
		public ParamsWithWildcardContext paramsWithWildcard() {
			return getRuleContext(ParamsWithWildcardContext.class,0);
		}
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public TerminalNode SSTR() { return getToken(Tads3Parser.SSTR, 0); }
		public PropertySetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_propertySet; }
	}

	public final PropertySetContext propertySet() throws RecognitionException {
		PropertySetContext _localctx = new PropertySetContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_propertySet);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(472);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,61,_ctx) ) {
			case 1:
				{
				setState(461);
				match(PROPERTYSET);
				setState(462);
				paramsWithWildcard();
				}
				break;
			case 2:
				{
				setState(463);
				match(PROPERTYSET);
				setState(465);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SSTR) {
					{
					setState(464);
					((PropertySetContext)_localctx).prefix = match(SSTR);
					}
				}

				setState(467);
				match(LEFT_PAREN);
				setState(469);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (((((_la - 24)) & ~0x3f) == 0 && ((1L << (_la - 24)) & ((1L << (TRUE - 24)) | (1L << (NIL - 24)) | (1L << (INHERITED - 24)) | (1L << (STRING - 24)) | (1L << (IN - 24)) | (1L << (STEP - 24)) | (1L << (IS - 24)) | (1L << (OPERATOR - 24)) | (1L << (AMP - 24)) | (1L << (ID - 24)) | (1L << (NR - 24)) | (1L << (HEX - 24)) | (1L << (STAR - 24)) | (1L << (DSTR - 24)) | (1L << (SSTR - 24)) | (1L << (RSTR - 24)))) != 0)) {
					{
					setState(468);
					paramsWithWildcard();
					}
				}

				setState(471);
				match(RIGHT_PAREN);
				}
				break;
			}
			setState(474);
			curlyObjectBody();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ParamsWithWildcardContext extends ParserRuleContext {
		public PrimaryContext primary;
		public List<PrimaryContext> parameters = new ArrayList<PrimaryContext>();
		public TerminalNode STAR() { return getToken(Tads3Parser.STAR, 0); }
		public PrimaryContext primary() {
			return getRuleContext(PrimaryContext.class,0);
		}
		public List<TerminalNode> COMMA() { return getTokens(Tads3Parser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(Tads3Parser.COMMA, i);
		}
		public List<ParamsWithWildcardContext> paramsWithWildcard() {
			return getRuleContexts(ParamsWithWildcardContext.class);
		}
		public ParamsWithWildcardContext paramsWithWildcard(int i) {
			return getRuleContext(ParamsWithWildcardContext.class,i);
		}
		public ParamsWithWildcardContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_paramsWithWildcard; }
	}

	public final ParamsWithWildcardContext paramsWithWildcard() throws RecognitionException {
		ParamsWithWildcardContext _localctx = new ParamsWithWildcardContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_paramsWithWildcard);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(478);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case TRUE:
			case NIL:
			case INHERITED:
			case STRING:
			case IN:
			case STEP:
			case IS:
			case OPERATOR:
			case AMP:
			case ID:
			case NR:
			case HEX:
			case DSTR:
			case SSTR:
			case RSTR:
				{
				setState(476);
				((ParamsWithWildcardContext)_localctx).primary = primary();
				((ParamsWithWildcardContext)_localctx).parameters.add(((ParamsWithWildcardContext)_localctx).primary);
				}
				break;
			case STAR:
				{
				setState(477);
				match(STAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(484);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,63,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(480);
					match(COMMA);
					setState(481);
					paramsWithWildcard();
					}
					} 
				}
				setState(486);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,63,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionDeclarationContext extends ParserRuleContext {
		public Token isModify;
		public Token isReplace;
		public FunctionHeadContext functionHead() {
			return getRuleContext(FunctionHeadContext.class,0);
		}
		public CodeBlockContext codeBlock() {
			return getRuleContext(CodeBlockContext.class,0);
		}
		public TerminalNode MODIFY() { return getToken(Tads3Parser.MODIFY, 0); }
		public TerminalNode REPLACE() { return getToken(Tads3Parser.REPLACE, 0); }
		public OperatorOverrideContext operatorOverride() {
			return getRuleContext(OperatorOverrideContext.class,0);
		}
		public FunctionDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionDeclaration; }
	}

	public final FunctionDeclarationContext functionDeclaration() throws RecognitionException {
		FunctionDeclarationContext _localctx = new FunctionDeclarationContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_functionDeclaration);
		int _la;
		try {
			setState(499);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,67,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(493);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,66,_ctx) ) {
				case 1:
					{
					setState(488);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==MODIFY) {
						{
						setState(487);
						((FunctionDeclarationContext)_localctx).isModify = match(MODIFY);
						}
					}

					}
					break;
				case 2:
					{
					setState(491);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==REPLACE) {
						{
						setState(490);
						((FunctionDeclarationContext)_localctx).isReplace = match(REPLACE);
						}
					}

					}
					break;
				}
				{
				setState(495);
				functionHead();
				setState(496);
				codeBlock();
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(498);
				operatorOverride();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OperatorOverrideContext extends ParserRuleContext {
		public TerminalNode OPERATOR() { return getToken(Tads3Parser.OPERATOR, 0); }
		public TerminalNode LEFT_CURLY() { return getToken(Tads3Parser.LEFT_CURLY, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(Tads3Parser.RIGHT_CURLY, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public ParamsContext params() {
			return getRuleContext(ParamsContext.class,0);
		}
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public TerminalNode PLUS() { return getToken(Tads3Parser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(Tads3Parser.MINUS, 0); }
		public TerminalNode STAR() { return getToken(Tads3Parser.STAR, 0); }
		public TerminalNode DIV() { return getToken(Tads3Parser.DIV, 0); }
		public TerminalNode MOD() { return getToken(Tads3Parser.MOD, 0); }
		public TerminalNode POW() { return getToken(Tads3Parser.POW, 0); }
		public TerminalNode ARITHMETIC_LEFT() { return getToken(Tads3Parser.ARITHMETIC_LEFT, 0); }
		public TerminalNode LOGICAL_RIGHT_SHIFT() { return getToken(Tads3Parser.LOGICAL_RIGHT_SHIFT, 0); }
		public TerminalNode ARITHMETIC_RIGHT() { return getToken(Tads3Parser.ARITHMETIC_RIGHT, 0); }
		public TerminalNode TILDE() { return getToken(Tads3Parser.TILDE, 0); }
		public TerminalNode BITWISE_OR() { return getToken(Tads3Parser.BITWISE_OR, 0); }
		public TerminalNode AMP() { return getToken(Tads3Parser.AMP, 0); }
		public List<StatsContext> stats() {
			return getRuleContexts(StatsContext.class);
		}
		public StatsContext stats(int i) {
			return getRuleContext(StatsContext.class,i);
		}
		public TerminalNode LEFT_BRACKET() { return getToken(Tads3Parser.LEFT_BRACKET, 0); }
		public TerminalNode RIGHT_BRACKET() { return getToken(Tads3Parser.RIGHT_BRACKET, 0); }
		public TerminalNode ASSIGN() { return getToken(Tads3Parser.ASSIGN, 0); }
		public OperatorOverrideContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_operatorOverride; }
	}

	public final OperatorOverrideContext operatorOverride() throws RecognitionException {
		OperatorOverrideContext _localctx = new OperatorOverrideContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_operatorOverride);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(501);
			match(OPERATOR);
			setState(508);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case AMP:
			case PLUS:
			case DIV:
			case MOD:
			case MINUS:
			case TILDE:
			case POW:
			case STAR:
			case BITWISE_OR:
			case ARITHMETIC_LEFT:
			case ARITHMETIC_RIGHT:
			case LOGICAL_RIGHT_SHIFT:
				{
				setState(502);
				_la = _input.LA(1);
				if ( !(((((_la - 50)) & ~0x3f) == 0 && ((1L << (_la - 50)) & ((1L << (AMP - 50)) | (1L << (PLUS - 50)) | (1L << (DIV - 50)) | (1L << (MOD - 50)) | (1L << (MINUS - 50)) | (1L << (TILDE - 50)) | (1L << (POW - 50)) | (1L << (STAR - 50)) | (1L << (BITWISE_OR - 50)) | (1L << (ARITHMETIC_LEFT - 50)) | (1L << (ARITHMETIC_RIGHT - 50)) | (1L << (LOGICAL_RIGHT_SHIFT - 50)))) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case LEFT_BRACKET:
				{
				{
				setState(503);
				match(LEFT_BRACKET);
				setState(504);
				match(RIGHT_BRACKET);
				setState(506);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==ASSIGN) {
					{
					setState(505);
					match(ASSIGN);
					}
				}

				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			{
			setState(510);
			match(LEFT_PAREN);
			setState(511);
			params();
			setState(512);
			match(RIGHT_PAREN);
			}
			setState(514);
			match(LEFT_CURLY);
			setState(518);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				{
				setState(515);
				stats();
				}
				}
				setState(520);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(521);
			match(RIGHT_CURLY);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionHeadContext extends ParserRuleContext {
		public Token isExtern;
		public Token isStatic;
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode FUNCTION() { return getToken(Tads3Parser.FUNCTION, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public TerminalNode EXTERN() { return getToken(Tads3Parser.EXTERN, 0); }
		public TerminalNode STATIC() { return getToken(Tads3Parser.STATIC, 0); }
		public ParamsContext params() {
			return getRuleContext(ParamsContext.class,0);
		}
		public FunctionHeadContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionHead; }
	}

	public final FunctionHeadContext functionHead() throws RecognitionException {
		FunctionHeadContext _localctx = new FunctionHeadContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_functionHead);
		int _la;
		try {
			setState(548);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,78,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(524);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==EXTERN) {
					{
					setState(523);
					((FunctionHeadContext)_localctx).isExtern = match(EXTERN);
					}
				}

				setState(527);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==STATIC) {
					{
					setState(526);
					((FunctionHeadContext)_localctx).isStatic = match(STATIC);
					}
				}

				setState(530);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==FUNCTION) {
					{
					setState(529);
					match(FUNCTION);
					}
				}

				setState(532);
				identifierAtom();
				setState(538);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,75,_ctx) ) {
				case 1:
					{
					setState(533);
					match(LEFT_PAREN);
					setState(535);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						setState(534);
						params();
						}
					}

					setState(537);
					match(RIGHT_PAREN);
					}
					break;
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(540);
				match(FUNCTION);
				setState(546);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,77,_ctx) ) {
				case 1:
					{
					setState(541);
					match(LEFT_PAREN);
					setState(543);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						setState(542);
						params();
						}
					}

					setState(545);
					match(RIGHT_PAREN);
					}
					break;
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CodeBlockContext extends ParserRuleContext {
		public TerminalNode LEFT_CURLY() { return getToken(Tads3Parser.LEFT_CURLY, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(Tads3Parser.RIGHT_CURLY, 0); }
		public List<StatsContext> stats() {
			return getRuleContexts(StatsContext.class);
		}
		public StatsContext stats(int i) {
			return getRuleContext(StatsContext.class,i);
		}
		public CodeBlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_codeBlock; }
	}

	public final CodeBlockContext codeBlock() throws RecognitionException {
		CodeBlockContext _localctx = new CodeBlockContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_codeBlock);
		int _la;
		try {
			setState(559);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,80,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(550);
				match(LEFT_CURLY);
				setState(554);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					{
					setState(551);
					stats();
					}
					}
					setState(556);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(557);
				match(RIGHT_CURLY);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(558);
				stats();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StatsContext extends ParserRuleContext {
		public AssignmentStatementContext assignmentStatement() {
			return getRuleContext(AssignmentStatementContext.class,0);
		}
		public IfStatementContext ifStatement() {
			return getRuleContext(IfStatementContext.class,0);
		}
		public TryCatchStatementContext tryCatchStatement() {
			return getRuleContext(TryCatchStatementContext.class,0);
		}
		public ForStatementContext forStatement() {
			return getRuleContext(ForStatementContext.class,0);
		}
		public DoWhileStatementContext doWhileStatement() {
			return getRuleContext(DoWhileStatementContext.class,0);
		}
		public WhileStatementContext whileStatement() {
			return getRuleContext(WhileStatementContext.class,0);
		}
		public SwitchStatementContext switchStatement() {
			return getRuleContext(SwitchStatementContext.class,0);
		}
		public ForInStatementContext forInStatement() {
			return getRuleContext(ForInStatementContext.class,0);
		}
		public ForEachStatementContext forEachStatement() {
			return getRuleContext(ForEachStatementContext.class,0);
		}
		public SayStatementContext sayStatement() {
			return getRuleContext(SayStatementContext.class,0);
		}
		public EmptyStatementContext emptyStatement() {
			return getRuleContext(EmptyStatementContext.class,0);
		}
		public ReturnStatementContext returnStatement() {
			return getRuleContext(ReturnStatementContext.class,0);
		}
		public ThrowStatementContext throwStatement() {
			return getRuleContext(ThrowStatementContext.class,0);
		}
		public LabelStatementContext labelStatement() {
			return getRuleContext(LabelStatementContext.class,0);
		}
		public BreakStatementContext breakStatement() {
			return getRuleContext(BreakStatementContext.class,0);
		}
		public ContinueStatementContext continueStatement() {
			return getRuleContext(ContinueStatementContext.class,0);
		}
		public GotoStatementContext gotoStatement() {
			return getRuleContext(GotoStatementContext.class,0);
		}
		public InnerCodeBlockContext innerCodeBlock() {
			return getRuleContext(InnerCodeBlockContext.class,0);
		}
		public StatsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stats; }
	}

	public final StatsContext stats() throws RecognitionException {
		StatsContext _localctx = new StatsContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_stats);
		try {
			setState(579);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,81,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(561);
				assignmentStatement();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(562);
				ifStatement();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(563);
				tryCatchStatement();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(564);
				forStatement();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(565);
				doWhileStatement();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(566);
				whileStatement();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(567);
				switchStatement();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(568);
				forInStatement();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(569);
				forEachStatement();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(570);
				sayStatement();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(571);
				emptyStatement();
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(572);
				returnStatement();
				}
				break;
			case 13:
				enterOuterAlt(_localctx, 13);
				{
				setState(573);
				throwStatement();
				}
				break;
			case 14:
				enterOuterAlt(_localctx, 14);
				{
				setState(574);
				labelStatement();
				}
				break;
			case 15:
				enterOuterAlt(_localctx, 15);
				{
				setState(575);
				breakStatement();
				}
				break;
			case 16:
				enterOuterAlt(_localctx, 16);
				{
				setState(576);
				continueStatement();
				}
				break;
			case 17:
				enterOuterAlt(_localctx, 17);
				{
				setState(577);
				gotoStatement();
				}
				break;
			case 18:
				enterOuterAlt(_localctx, 18);
				{
				setState(578);
				innerCodeBlock();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class InnerCodeBlockContext extends ParserRuleContext {
		public TerminalNode LEFT_CURLY() { return getToken(Tads3Parser.LEFT_CURLY, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(Tads3Parser.RIGHT_CURLY, 0); }
		public List<StatsContext> stats() {
			return getRuleContexts(StatsContext.class);
		}
		public StatsContext stats(int i) {
			return getRuleContext(StatsContext.class,i);
		}
		public InnerCodeBlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_innerCodeBlock; }
	}

	public final InnerCodeBlockContext innerCodeBlock() throws RecognitionException {
		InnerCodeBlockContext _localctx = new InnerCodeBlockContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_innerCodeBlock);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(581);
			match(LEFT_CURLY);
			setState(585);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				{
				setState(582);
				stats();
				}
				}
				setState(587);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(588);
			match(RIGHT_CURLY);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class GotoStatementContext extends ParserRuleContext {
		public IdentifierAtomContext label;
		public TerminalNode GOTO() { return getToken(Tads3Parser.GOTO, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public GotoStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_gotoStatement; }
	}

	public final GotoStatementContext gotoStatement() throws RecognitionException {
		GotoStatementContext _localctx = new GotoStatementContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_gotoStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(590);
			match(GOTO);
			setState(592);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (IS - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(591);
				((GotoStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(594);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BreakStatementContext extends ParserRuleContext {
		public IdentifierAtomContext label;
		public TerminalNode BREAK() { return getToken(Tads3Parser.BREAK, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public BreakStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_breakStatement; }
	}

	public final BreakStatementContext breakStatement() throws RecognitionException {
		BreakStatementContext _localctx = new BreakStatementContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_breakStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(596);
			match(BREAK);
			setState(598);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (IS - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(597);
				((BreakStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(600);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ContinueStatementContext extends ParserRuleContext {
		public IdentifierAtomContext label;
		public TerminalNode CONTINUE() { return getToken(Tads3Parser.CONTINUE, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public ContinueStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_continueStatement; }
	}

	public final ContinueStatementContext continueStatement() throws RecognitionException {
		ContinueStatementContext _localctx = new ContinueStatementContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_continueStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(602);
			match(CONTINUE);
			setState(604);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (IS - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(603);
				((ContinueStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(606);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LabelStatementContext extends ParserRuleContext {
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode COLON() { return getToken(Tads3Parser.COLON, 0); }
		public LabelStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_labelStatement; }
	}

	public final LabelStatementContext labelStatement() throws RecognitionException {
		LabelStatementContext _localctx = new LabelStatementContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_labelStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(608);
			identifierAtom();
			setState(609);
			match(COLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SwitchStatementContext extends ParserRuleContext {
		public TerminalNode SWITCH() { return getToken(Tads3Parser.SWITCH, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public TerminalNode LEFT_CURLY() { return getToken(Tads3Parser.LEFT_CURLY, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(Tads3Parser.RIGHT_CURLY, 0); }
		public List<TerminalNode> COLON() { return getTokens(Tads3Parser.COLON); }
		public TerminalNode COLON(int i) {
			return getToken(Tads3Parser.COLON, i);
		}
		public List<TerminalNode> DEFAULT() { return getTokens(Tads3Parser.DEFAULT); }
		public TerminalNode DEFAULT(int i) {
			return getToken(Tads3Parser.DEFAULT, i);
		}
		public List<CodeBlockContext> codeBlock() {
			return getRuleContexts(CodeBlockContext.class);
		}
		public CodeBlockContext codeBlock(int i) {
			return getRuleContext(CodeBlockContext.class,i);
		}
		public List<TerminalNode> CASE() { return getTokens(Tads3Parser.CASE); }
		public TerminalNode CASE(int i) {
			return getToken(Tads3Parser.CASE, i);
		}
		public List<StatsContext> stats() {
			return getRuleContexts(StatsContext.class);
		}
		public StatsContext stats(int i) {
			return getRuleContext(StatsContext.class,i);
		}
		public SwitchStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_switchStatement; }
	}

	public final SwitchStatementContext switchStatement() throws RecognitionException {
		SwitchStatementContext _localctx = new SwitchStatementContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_switchStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(611);
			match(SWITCH);
			setState(612);
			match(LEFT_PAREN);
			setState(613);
			expr(0);
			setState(614);
			match(RIGHT_PAREN);
			setState(615);
			match(LEFT_CURLY);
			setState(633);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CASE || _la==DEFAULT) {
				{
				{
				setState(619);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case CASE:
					{
					{
					setState(616);
					match(CASE);
					setState(617);
					expr(0);
					}
					}
					break;
				case DEFAULT:
					{
					setState(618);
					match(DEFAULT);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(621);
				match(COLON);
				setState(629);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,88,_ctx) ) {
				case 1:
					{
					setState(622);
					codeBlock();
					}
					break;
				case 2:
					{
					setState(626);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						{
						setState(623);
						stats();
						}
						}
						setState(628);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					}
					break;
				}
				}
				}
				setState(635);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(636);
			match(RIGHT_CURLY);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ThrowStatementContext extends ParserRuleContext {
		public TerminalNode THROW() { return getToken(Tads3Parser.THROW, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ThrowStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_throwStatement; }
	}

	public final ThrowStatementContext throwStatement() throws RecognitionException {
		ThrowStatementContext _localctx = new ThrowStatementContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_throwStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(638);
			match(THROW);
			setState(639);
			expr(0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ForInStatementContext extends ParserRuleContext {
		public TerminalNode FOR() { return getToken(Tads3Parser.FOR, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode LOCAL() { return getToken(Tads3Parser.LOCAL, 0); }
		public TerminalNode ID() { return getToken(Tads3Parser.ID, 0); }
		public TerminalNode IN() { return getToken(Tads3Parser.IN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public CodeBlockContext codeBlock() {
			return getRuleContext(CodeBlockContext.class,0);
		}
		public ForInStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_forInStatement; }
	}

	public final ForInStatementContext forInStatement() throws RecognitionException {
		ForInStatementContext _localctx = new ForInStatementContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_forInStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(641);
			match(FOR);
			setState(642);
			match(LEFT_PAREN);
			setState(643);
			match(LOCAL);
			setState(644);
			match(ID);
			setState(645);
			match(IN);
			setState(646);
			expr(0);
			setState(647);
			match(RIGHT_PAREN);
			setState(648);
			codeBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ForEachStatementContext extends ParserRuleContext {
		public TerminalNode FOREACH() { return getToken(Tads3Parser.FOREACH, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode IN() { return getToken(Tads3Parser.IN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public CodeBlockContext codeBlock() {
			return getRuleContext(CodeBlockContext.class,0);
		}
		public ForEachStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_forEachStatement; }
	}

	public final ForEachStatementContext forEachStatement() throws RecognitionException {
		ForEachStatementContext _localctx = new ForEachStatementContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_forEachStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(650);
			match(FOREACH);
			setState(651);
			match(LEFT_PAREN);
			setState(652);
			expr(0);
			setState(653);
			match(IN);
			setState(654);
			expr(0);
			setState(655);
			match(RIGHT_PAREN);
			setState(656);
			codeBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ReturnStatementContext extends ParserRuleContext {
		public TerminalNode RETURN() { return getToken(Tads3Parser.RETURN, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ReturnStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_returnStatement; }
	}

	public final ReturnStatementContext returnStatement() throws RecognitionException {
		ReturnStatementContext _localctx = new ReturnStatementContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_returnStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(658);
			match(RETURN);
			setState(660);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(659);
				expr(0);
				}
			}

			setState(662);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DoWhileStatementContext extends ParserRuleContext {
		public TerminalNode DO() { return getToken(Tads3Parser.DO, 0); }
		public CodeBlockContext codeBlock() {
			return getRuleContext(CodeBlockContext.class,0);
		}
		public TerminalNode WHILE() { return getToken(Tads3Parser.WHILE, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public DoWhileStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_doWhileStatement; }
	}

	public final DoWhileStatementContext doWhileStatement() throws RecognitionException {
		DoWhileStatementContext _localctx = new DoWhileStatementContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_doWhileStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(664);
			match(DO);
			setState(665);
			codeBlock();
			setState(666);
			match(WHILE);
			setState(667);
			match(LEFT_PAREN);
			setState(669);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(668);
				expr(0);
				}
			}

			setState(671);
			match(RIGHT_PAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class WhileStatementContext extends ParserRuleContext {
		public TerminalNode WHILE() { return getToken(Tads3Parser.WHILE, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public CodeBlockContext codeBlock() {
			return getRuleContext(CodeBlockContext.class,0);
		}
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public WhileStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_whileStatement; }
	}

	public final WhileStatementContext whileStatement() throws RecognitionException {
		WhileStatementContext _localctx = new WhileStatementContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_whileStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(673);
			match(WHILE);
			setState(674);
			match(LEFT_PAREN);
			setState(676);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(675);
				expr(0);
				}
			}

			setState(678);
			match(RIGHT_PAREN);
			setState(679);
			codeBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ForStatementContext extends ParserRuleContext {
		public TerminalNode FOR() { return getToken(Tads3Parser.FOR, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public List<TerminalNode> SEMICOLON() { return getTokens(Tads3Parser.SEMICOLON); }
		public TerminalNode SEMICOLON(int i) {
			return getToken(Tads3Parser.SEMICOLON, i);
		}
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public CodeBlockContext codeBlock() {
			return getRuleContext(CodeBlockContext.class,0);
		}
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public ForStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_forStatement; }
	}

	public final ForStatementContext forStatement() throws RecognitionException {
		ForStatementContext _localctx = new ForStatementContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_forStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(681);
			match(FOR);
			setState(682);
			match(LEFT_PAREN);
			setState(684);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(683);
				expr(0);
				}
			}

			setState(686);
			match(SEMICOLON);
			setState(688);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(687);
				expr(0);
				}
			}

			setState(690);
			match(SEMICOLON);
			setState(692);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(691);
				expr(0);
				}
			}

			setState(694);
			match(RIGHT_PAREN);
			setState(695);
			codeBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TryCatchStatementContext extends ParserRuleContext {
		public TerminalNode TRY() { return getToken(Tads3Parser.TRY, 0); }
		public List<CodeBlockContext> codeBlock() {
			return getRuleContexts(CodeBlockContext.class);
		}
		public CodeBlockContext codeBlock(int i) {
			return getRuleContext(CodeBlockContext.class,i);
		}
		public List<TerminalNode> CATCH() { return getTokens(Tads3Parser.CATCH); }
		public TerminalNode CATCH(int i) {
			return getToken(Tads3Parser.CATCH, i);
		}
		public List<TerminalNode> LEFT_PAREN() { return getTokens(Tads3Parser.LEFT_PAREN); }
		public TerminalNode LEFT_PAREN(int i) {
			return getToken(Tads3Parser.LEFT_PAREN, i);
		}
		public List<TerminalNode> RIGHT_PAREN() { return getTokens(Tads3Parser.RIGHT_PAREN); }
		public TerminalNode RIGHT_PAREN(int i) {
			return getToken(Tads3Parser.RIGHT_PAREN, i);
		}
		public TerminalNode FINALLY() { return getToken(Tads3Parser.FINALLY, 0); }
		public List<ParamsContext> params() {
			return getRuleContexts(ParamsContext.class);
		}
		public ParamsContext params(int i) {
			return getRuleContext(ParamsContext.class,i);
		}
		public TryCatchStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tryCatchStatement; }
	}

	public final TryCatchStatementContext tryCatchStatement() throws RecognitionException {
		TryCatchStatementContext _localctx = new TryCatchStatementContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_tryCatchStatement);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(697);
			match(TRY);
			setState(698);
			codeBlock();
			setState(708);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,97,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(699);
					match(CATCH);
					setState(700);
					match(LEFT_PAREN);
					setState(702);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						setState(701);
						params();
						}
					}

					setState(704);
					match(RIGHT_PAREN);
					setState(705);
					codeBlock();
					}
					} 
				}
				setState(710);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,97,_ctx);
			}
			setState(713);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,98,_ctx) ) {
			case 1:
				{
				setState(711);
				match(FINALLY);
				setState(712);
				codeBlock();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CallStatementContext extends ParserRuleContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode DOT() { return getToken(Tads3Parser.DOT, 0); }
		public CallStatementContext callStatement() {
			return getRuleContext(CallStatementContext.class,0);
		}
		public CallStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_callStatement; }
	}

	public final CallStatementContext callStatement() throws RecognitionException {
		CallStatementContext _localctx = new CallStatementContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_callStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(715);
			expr(0);
			setState(718);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,99,_ctx) ) {
			case 1:
				{
				setState(716);
				match(DOT);
				setState(717);
				callStatement();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EmptyStatementContext extends ParserRuleContext {
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public EmptyStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_emptyStatement; }
	}

	public final EmptyStatementContext emptyStatement() throws RecognitionException {
		EmptyStatementContext _localctx = new EmptyStatementContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_emptyStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(721);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(720);
				expr(0);
				}
			}

			setState(723);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SayStatementContext extends ParserRuleContext {
		public TerminalNode DSTR() { return getToken(Tads3Parser.DSTR, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public SayStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sayStatement; }
	}

	public final SayStatementContext sayStatement() throws RecognitionException {
		SayStatementContext _localctx = new SayStatementContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_sayStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(725);
			match(DSTR);
			setState(726);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssignmentStatementContext extends ParserRuleContext {
		public TerminalNode LOCAL() { return getToken(Tads3Parser.LOCAL, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public TerminalNode ASSIGN() { return getToken(Tads3Parser.ASSIGN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public AssignmentStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignmentStatement; }
	}

	public final AssignmentStatementContext assignmentStatement() throws RecognitionException {
		AssignmentStatementContext _localctx = new AssignmentStatementContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_assignmentStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(728);
			match(LOCAL);
			setState(729);
			identifierAtom();
			setState(732);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ASSIGN) {
				{
				setState(730);
				match(ASSIGN);
				setState(731);
				expr(0);
				}
			}

			setState(734);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IfStatementContext extends ParserRuleContext {
		public EnclosedExprCodeBlockContext ifExprAndBlock;
		public EnclosedExprCodeBlockContext elseIfExprAndBlock;
		public CodeBlockContext elseBlock;
		public List<TerminalNode> IF() { return getTokens(Tads3Parser.IF); }
		public TerminalNode IF(int i) {
			return getToken(Tads3Parser.IF, i);
		}
		public List<EnclosedExprCodeBlockContext> enclosedExprCodeBlock() {
			return getRuleContexts(EnclosedExprCodeBlockContext.class);
		}
		public EnclosedExprCodeBlockContext enclosedExprCodeBlock(int i) {
			return getRuleContext(EnclosedExprCodeBlockContext.class,i);
		}
		public List<TerminalNode> ELSE() { return getTokens(Tads3Parser.ELSE); }
		public TerminalNode ELSE(int i) {
			return getToken(Tads3Parser.ELSE, i);
		}
		public CodeBlockContext codeBlock() {
			return getRuleContext(CodeBlockContext.class,0);
		}
		public IfStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ifStatement; }
	}

	public final IfStatementContext ifStatement() throws RecognitionException {
		IfStatementContext _localctx = new IfStatementContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_ifStatement);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(736);
			match(IF);
			setState(737);
			((IfStatementContext)_localctx).ifExprAndBlock = enclosedExprCodeBlock();
			setState(743);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,102,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(738);
					match(ELSE);
					setState(739);
					match(IF);
					setState(740);
					((IfStatementContext)_localctx).elseIfExprAndBlock = enclosedExprCodeBlock();
					}
					} 
				}
				setState(745);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,102,_ctx);
			}
			setState(748);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,103,_ctx) ) {
			case 1:
				{
				setState(746);
				match(ELSE);
				setState(747);
				((IfStatementContext)_localctx).elseBlock = codeBlock();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EnclosedExprCodeBlockContext extends ParserRuleContext {
		public ExprContext expression;
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public CodeBlockContext codeBlock() {
			return getRuleContext(CodeBlockContext.class,0);
		}
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public EnclosedExprCodeBlockContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enclosedExprCodeBlock; }
	}

	public final EnclosedExprCodeBlockContext enclosedExprCodeBlock() throws RecognitionException {
		EnclosedExprCodeBlockContext _localctx = new EnclosedExprCodeBlockContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_enclosedExprCodeBlock);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(750);
			match(LEFT_PAREN);
			setState(751);
			((EnclosedExprCodeBlockContext)_localctx).expression = expr(0);
			setState(752);
			match(RIGHT_PAREN);
			setState(753);
			codeBlock();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExprContext extends ParserRuleContext {
		public ExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr; }
	 
		public ExprContext() { }
		public void copyFrom(ExprContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class NewExprContext extends ExprContext {
		public TerminalNode NEW() { return getToken(Tads3Parser.NEW, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public NewExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class AssignmentExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode ASSIGN() { return getToken(Tads3Parser.ASSIGN, 0); }
		public AssignmentExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ExprWithParenExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public ExprWithParenExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class AnonymousFunctionExprContext extends ExprContext {
		public FunctionDeclarationContext functionDeclaration() {
			return getRuleContext(FunctionDeclarationContext.class,0);
		}
		public AnonymousFunctionExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ReferenceExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode AMP() { return getToken(Tads3Parser.AMP, 0); }
		public ReferenceExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class DelegatedExpressionContext extends ExprContext {
		public TerminalNode DELEGATED() { return getToken(Tads3Parser.DELEGATED, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public DelegatedExpressionContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class AdditiveExprContext extends ExprContext {
		public Token op;
		public Token isInc;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode PLUS() { return getToken(Tads3Parser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(Tads3Parser.MINUS, 0); }
		public TerminalNode ASSIGN() { return getToken(Tads3Parser.ASSIGN, 0); }
		public AdditiveExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ArrowExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode ARROW() { return getToken(Tads3Parser.ARROW, 0); }
		public ArrowExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class UnaryExprContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode AT() { return getToken(Tads3Parser.AT, 0); }
		public TerminalNode AMP() { return getToken(Tads3Parser.AMP, 0); }
		public TerminalNode NOT() { return getToken(Tads3Parser.NOT, 0); }
		public TerminalNode PLUS() { return getToken(Tads3Parser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(Tads3Parser.MINUS, 0); }
		public TerminalNode TILDE() { return getToken(Tads3Parser.TILDE, 0); }
		public UnaryExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class PrimaryExprContext extends ExprContext {
		public PrimaryContext primary() {
			return getRuleContext(PrimaryContext.class,0);
		}
		public PrimaryExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class TernaryExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode OPTIONAL() { return getToken(Tads3Parser.OPTIONAL, 0); }
		public TerminalNode COLON() { return getToken(Tads3Parser.COLON, 0); }
		public TernaryExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ParenExpr2Context extends ExprContext {
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ParenExpr2Context(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class IsExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode IS() { return getToken(Tads3Parser.IS, 0); }
		public TerminalNode IN() { return getToken(Tads3Parser.IN, 0); }
		public IsExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class LocalExprContext extends ExprContext {
		public TerminalNode LOCAL() { return getToken(Tads3Parser.LOCAL, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public LocalExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class PostFixExprContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public List<TerminalNode> PLUS() { return getTokens(Tads3Parser.PLUS); }
		public TerminalNode PLUS(int i) {
			return getToken(Tads3Parser.PLUS, i);
		}
		public List<TerminalNode> MINUS() { return getTokens(Tads3Parser.MINUS); }
		public TerminalNode MINUS(int i) {
			return getToken(Tads3Parser.MINUS, i);
		}
		public PostFixExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ArrayExprContext extends ExprContext {
		public TerminalNode LEFT_BRACKET() { return getToken(Tads3Parser.LEFT_BRACKET, 0); }
		public TerminalNode RIGHT_BRACKET() { return getToken(Tads3Parser.RIGHT_BRACKET, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ArrayExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class StaticExprContext extends ExprContext {
		public TerminalNode STATIC() { return getToken(Tads3Parser.STATIC, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public StaticExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class InExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode IN() { return getToken(Tads3Parser.IN, 0); }
		public InExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class IfNilExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode IFNIL() { return getToken(Tads3Parser.IFNIL, 0); }
		public IfNilExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class MemberExprContext extends ExprContext {
		public ExprContext prev;
		public ExprContext next;
		public TerminalNode DOT() { return getToken(Tads3Parser.DOT, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public MemberExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ArrowExpr2Context extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode ARROW() { return getToken(Tads3Parser.ARROW, 0); }
		public ArrowExpr2Context(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ArrowExpr3Context extends ExprContext {
		public TerminalNode STAR() { return getToken(Tads3Parser.STAR, 0); }
		public TerminalNode ARROW() { return getToken(Tads3Parser.ARROW, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ArrowExpr3Context(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class RelationalExprContext extends ExprContext {
		public Token op;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode LTEQ() { return getToken(Tads3Parser.LTEQ, 0); }
		public TerminalNode GTEQ() { return getToken(Tads3Parser.GTEQ, 0); }
		public TerminalNode LT() { return getToken(Tads3Parser.LT, 0); }
		public TerminalNode GT() { return getToken(Tads3Parser.GT, 0); }
		public RelationalExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class TransientExpressionContext extends ExprContext {
		public TerminalNode TRANSIENT() { return getToken(Tads3Parser.TRANSIENT, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TransientExpressionContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class BitwiseExprContext extends ExprContext {
		public Token op;
		public Token isInc;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode BITWISE_OR() { return getToken(Tads3Parser.BITWISE_OR, 0); }
		public TerminalNode AMP() { return getToken(Tads3Parser.AMP, 0); }
		public TerminalNode ASSIGN() { return getToken(Tads3Parser.ASSIGN, 0); }
		public TerminalNode ARITHMETIC_LEFT() { return getToken(Tads3Parser.ARITHMETIC_LEFT, 0); }
		public TerminalNode ARITHMETIC_RIGHT() { return getToken(Tads3Parser.ARITHMETIC_RIGHT, 0); }
		public TerminalNode LOGICAL_RIGHT_SHIFT() { return getToken(Tads3Parser.LOGICAL_RIGHT_SHIFT, 0); }
		public BitwiseExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class IndexExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode LEFT_BRACKET() { return getToken(Tads3Parser.LEFT_BRACKET, 0); }
		public TerminalNode RIGHT_BRACKET() { return getToken(Tads3Parser.RIGHT_BRACKET, 0); }
		public IndexExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class PowerOfExprContext extends ExprContext {
		public Token isInc;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode POW() { return getToken(Tads3Parser.POW, 0); }
		public TerminalNode ASSIGN() { return getToken(Tads3Parser.ASSIGN, 0); }
		public PowerOfExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class CommaExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode COMMA() { return getToken(Tads3Parser.COMMA, 0); }
		public CommaExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class NotInExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode LITERAL_NOT() { return getToken(Tads3Parser.LITERAL_NOT, 0); }
		public TerminalNode IN() { return getToken(Tads3Parser.IN, 0); }
		public NotInExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class AnonymousObjectExprContext extends ExprContext {
		public TerminalNode LEFT_CURLY() { return getToken(Tads3Parser.LEFT_CURLY, 0); }
		public TerminalNode COLON() { return getToken(Tads3Parser.COLON, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(Tads3Parser.RIGHT_CURLY, 0); }
		public ParamsContext params() {
			return getRuleContext(ParamsContext.class,0);
		}
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public AnonymousObjectExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class InheritedExpressionContext extends ExprContext {
		public TerminalNode INHERITED() { return getToken(Tads3Parser.INHERITED, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public InheritedExpressionContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class MultiplicationExprContext extends ExprContext {
		public Token op;
		public Token isInc;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode STAR() { return getToken(Tads3Parser.STAR, 0); }
		public TerminalNode DIV() { return getToken(Tads3Parser.DIV, 0); }
		public TerminalNode MOD() { return getToken(Tads3Parser.MOD, 0); }
		public TerminalNode ASSIGN() { return getToken(Tads3Parser.ASSIGN, 0); }
		public MultiplicationExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class AndOrExprContext extends ExprContext {
		public Token op;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode AND() { return getToken(Tads3Parser.AND, 0); }
		public TerminalNode OR() { return getToken(Tads3Parser.OR, 0); }
		public AndOrExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ExprWithAnonymousObjectExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode LEFT_CURLY() { return getToken(Tads3Parser.LEFT_CURLY, 0); }
		public TerminalNode COLON() { return getToken(Tads3Parser.COLON, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(Tads3Parser.RIGHT_CURLY, 0); }
		public ParamsContext params() {
			return getRuleContext(ParamsContext.class,0);
		}
		public ExprWithAnonymousObjectExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode COLON() { return getToken(Tads3Parser.COLON, 0); }
		public SuperTypesContext superTypes() {
			return getRuleContext(SuperTypesContext.class,0);
		}
		public CurlyObjectBodyContext curlyObjectBody() {
			return getRuleContext(CurlyObjectBodyContext.class,0);
		}
		public ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class EqualityExprContext extends ExprContext {
		public Token op;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode EQ() { return getToken(Tads3Parser.EQ, 0); }
		public TerminalNode NEQ() { return getToken(Tads3Parser.NEQ, 0); }
		public EqualityExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class RangeExprContext extends ExprContext {
		public Token hasStep;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode RANGE() { return getToken(Tads3Parser.RANGE, 0); }
		public TerminalNode STEP() { return getToken(Tads3Parser.STEP, 0); }
		public RangeExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class CallWithParamsExprContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public List<ParamsContext> params() {
			return getRuleContexts(ParamsContext.class);
		}
		public ParamsContext params(int i) {
			return getRuleContext(ParamsContext.class,i);
		}
		public CallWithParamsExprContext(ExprContext ctx) { copyFrom(ctx); }
	}

	public final ExprContext expr() throws RecognitionException {
		return expr(0);
	}

	private ExprContext expr(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExprContext _localctx = new ExprContext(_ctx, _parentState);
		ExprContext _prevctx = _localctx;
		int _startState = 102;
		enterRecursionRule(_localctx, 102, RULE_expr, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(796);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,108,_ctx) ) {
			case 1:
				{
				_localctx = new ArrayExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(756);
				match(LEFT_BRACKET);
				setState(758);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(757);
					expr(0);
					}
				}

				setState(760);
				match(RIGHT_BRACKET);
				}
				break;
			case 2:
				{
				_localctx = new DelegatedExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(761);
				match(DELEGATED);
				setState(762);
				expr(35);
				}
				break;
			case 3:
				{
				_localctx = new InheritedExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(763);
				match(INHERITED);
				setState(764);
				expr(34);
				}
				break;
			case 4:
				{
				_localctx = new TransientExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(765);
				match(TRANSIENT);
				setState(766);
				expr(33);
				}
				break;
			case 5:
				{
				_localctx = new PrimaryExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(767);
				primary();
				}
				break;
			case 6:
				{
				_localctx = new ParenExpr2Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(768);
				match(LEFT_PAREN);
				setState(770);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(769);
					expr(0);
					}
				}

				setState(772);
				match(RIGHT_PAREN);
				}
				break;
			case 7:
				{
				_localctx = new LocalExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(773);
				match(LOCAL);
				setState(774);
				expr(26);
				}
				break;
			case 8:
				{
				_localctx = new StaticExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(775);
				match(STATIC);
				setState(776);
				expr(25);
				}
				break;
			case 9:
				{
				_localctx = new NewExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(777);
				match(NEW);
				setState(778);
				expr(24);
				}
				break;
			case 10:
				{
				_localctx = new AnonymousObjectExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(779);
				match(LEFT_CURLY);
				setState(781);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(780);
					params();
					}
				}

				setState(783);
				match(COLON);
				setState(785);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(784);
					expr(0);
					}
				}

				setState(787);
				match(RIGHT_CURLY);
				}
				break;
			case 11:
				{
				_localctx = new ArrowExpr2Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				{
				setState(788);
				match(ARROW);
				}
				setState(789);
				expr(6);
				}
				break;
			case 12:
				{
				_localctx = new ArrowExpr3Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(790);
				match(STAR);
				setState(791);
				match(ARROW);
				setState(792);
				expr(5);
				}
				break;
			case 13:
				{
				_localctx = new UnaryExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(793);
				_la = _input.LA(1);
				if ( !(((((_la - 49)) & ~0x3f) == 0 && ((1L << (_la - 49)) & ((1L << (AT - 49)) | (1L << (AMP - 49)) | (1L << (NOT - 49)) | (1L << (PLUS - 49)) | (1L << (MINUS - 49)) | (1L << (TILDE - 49)))) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(794);
				expr(4);
				}
				break;
			case 14:
				{
				_localctx = new AnonymousFunctionExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(795);
				functionDeclaration();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(927);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,122,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(925);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,121,_ctx) ) {
					case 1:
						{
						_localctx = new MemberExprContext(new ExprContext(_parentctx, _parentState));
						((MemberExprContext)_localctx).prev = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(798);
						if (!(precpred(_ctx, 39))) throw new FailedPredicateException(this, "precpred(_ctx, 39)");
						setState(799);
						match(DOT);
						setState(800);
						((MemberExprContext)_localctx).next = expr(40);
						}
						break;
					case 2:
						{
						_localctx = new CommaExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(801);
						if (!(precpred(_ctx, 37))) throw new FailedPredicateException(this, "precpred(_ctx, 37)");
						setState(802);
						match(COMMA);
						setState(803);
						expr(38);
						}
						break;
					case 3:
						{
						_localctx = new ReferenceExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(804);
						if (!(precpred(_ctx, 23))) throw new FailedPredicateException(this, "precpred(_ctx, 23)");
						setState(805);
						match(AMP);
						setState(806);
						expr(24);
						}
						break;
					case 4:
						{
						_localctx = new NotInExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(807);
						if (!(precpred(_ctx, 22))) throw new FailedPredicateException(this, "precpred(_ctx, 22)");
						setState(808);
						match(LITERAL_NOT);
						setState(809);
						match(IN);
						setState(810);
						expr(23);
						}
						break;
					case 5:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(811);
						if (!(precpred(_ctx, 21))) throw new FailedPredicateException(this, "precpred(_ctx, 21)");
						setState(812);
						match(IS);
						setState(813);
						match(IN);
						setState(814);
						expr(22);
						}
						break;
					case 6:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(815);
						if (!(precpred(_ctx, 20))) throw new FailedPredicateException(this, "precpred(_ctx, 20)");
						setState(816);
						match(IS);
						setState(817);
						expr(21);
						}
						break;
					case 7:
						{
						_localctx = new InExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(818);
						if (!(precpred(_ctx, 19))) throw new FailedPredicateException(this, "precpred(_ctx, 19)");
						setState(819);
						match(IN);
						setState(820);
						expr(20);
						}
						break;
					case 8:
						{
						_localctx = new AssignmentExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(821);
						if (!(precpred(_ctx, 18))) throw new FailedPredicateException(this, "precpred(_ctx, 18)");
						setState(822);
						match(ASSIGN);
						setState(823);
						expr(19);
						}
						break;
					case 9:
						{
						_localctx = new IfNilExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(824);
						if (!(precpred(_ctx, 17))) throw new FailedPredicateException(this, "precpred(_ctx, 17)");
						setState(825);
						match(IFNIL);
						setState(826);
						expr(18);
						}
						break;
					case 10:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(827);
						if (!(precpred(_ctx, 15))) throw new FailedPredicateException(this, "precpred(_ctx, 15)");
						setState(828);
						_la = _input.LA(1);
						if ( !(_la==AMP || _la==BITWISE_OR) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(830);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(829);
							match(ASSIGN);
							}
						}

						setState(832);
						expr(16);
						}
						break;
					case 11:
						{
						_localctx = new AndOrExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(833);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						setState(834);
						((AndOrExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==AND || _la==OR) ) {
							((AndOrExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(835);
						expr(15);
						}
						break;
					case 12:
						{
						_localctx = new PowerOfExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(836);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						{
						setState(837);
						match(POW);
						}
						setState(839);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(838);
							((PowerOfExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(841);
						expr(14);
						}
						break;
					case 13:
						{
						_localctx = new MultiplicationExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(842);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(843);
						((MultiplicationExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(((((_la - 56)) & ~0x3f) == 0 && ((1L << (_la - 56)) & ((1L << (DIV - 56)) | (1L << (MOD - 56)) | (1L << (STAR - 56)))) != 0)) ) {
							((MultiplicationExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(845);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(844);
							((MultiplicationExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(847);
						expr(13);
						}
						break;
					case 14:
						{
						_localctx = new AdditiveExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(848);
						if (!(precpred(_ctx, 11))) throw new FailedPredicateException(this, "precpred(_ctx, 11)");
						setState(849);
						((AdditiveExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==PLUS || _la==MINUS) ) {
							((AdditiveExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(851);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(850);
							((AdditiveExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(853);
						expr(12);
						}
						break;
					case 15:
						{
						_localctx = new RelationalExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(854);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(855);
						((RelationalExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(((((_la - 86)) & ~0x3f) == 0 && ((1L << (_la - 86)) & ((1L << (LTEQ - 86)) | (1L << (LT - 86)) | (1L << (GTEQ - 86)) | (1L << (GT - 86)))) != 0)) ) {
							((RelationalExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(856);
						expr(11);
						}
						break;
					case 16:
						{
						_localctx = new EqualityExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(857);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(858);
						((EqualityExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==NEQ || _la==EQ) ) {
							((EqualityExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(859);
						expr(10);
						}
						break;
					case 17:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(860);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(861);
						((BitwiseExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(((((_la - 87)) & ~0x3f) == 0 && ((1L << (_la - 87)) & ((1L << (ARITHMETIC_LEFT - 87)) | (1L << (ARITHMETIC_RIGHT - 87)) | (1L << (LOGICAL_RIGHT_SHIFT - 87)))) != 0)) ) {
							((BitwiseExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(863);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(862);
							((BitwiseExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(865);
						expr(9);
						}
						break;
					case 18:
						{
						_localctx = new ArrowExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(866);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						{
						setState(867);
						match(ARROW);
						}
						setState(868);
						expr(8);
						}
						break;
					case 19:
						{
						_localctx = new TernaryExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(869);
						if (!(precpred(_ctx, 2))) throw new FailedPredicateException(this, "precpred(_ctx, 2)");
						setState(870);
						match(OPTIONAL);
						setState(871);
						expr(0);
						setState(872);
						match(COLON);
						setState(873);
						expr(3);
						}
						break;
					case 20:
						{
						_localctx = new IndexExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(875);
						if (!(precpred(_ctx, 38))) throw new FailedPredicateException(this, "precpred(_ctx, 38)");
						setState(876);
						match(LEFT_BRACKET);
						setState(878);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(877);
							expr(0);
							}
						}

						setState(880);
						match(RIGHT_BRACKET);
						}
						break;
					case 21:
						{
						_localctx = new RangeExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(881);
						if (!(precpred(_ctx, 36))) throw new FailedPredicateException(this, "precpred(_ctx, 36)");
						setState(882);
						match(RANGE);
						setState(883);
						expr(0);
						setState(886);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,115,_ctx) ) {
						case 1:
							{
							setState(884);
							((RangeExprContext)_localctx).hasStep = match(STEP);
							setState(885);
							expr(0);
							}
							break;
						}
						}
						break;
					case 22:
						{
						_localctx = new CallWithParamsExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(888);
						if (!(precpred(_ctx, 31))) throw new FailedPredicateException(this, "precpred(_ctx, 31)");
						setState(889);
						match(LEFT_PAREN);
						setState(891); 
						_errHandler.sync(this);
						_la = _input.LA(1);
						do {
							{
							{
							setState(890);
							params();
							}
							}
							setState(893); 
							_errHandler.sync(this);
							_la = _input.LA(1);
						} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0) );
						setState(895);
						match(RIGHT_PAREN);
						}
						break;
					case 23:
						{
						_localctx = new ExprWithParenExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(897);
						if (!(precpred(_ctx, 30))) throw new FailedPredicateException(this, "precpred(_ctx, 30)");
						setState(898);
						match(LEFT_PAREN);
						setState(900);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(899);
							expr(0);
							}
						}

						setState(902);
						match(RIGHT_PAREN);
						}
						break;
					case 24:
						{
						_localctx = new ExprWithAnonymousObjectExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(903);
						if (!(precpred(_ctx, 29))) throw new FailedPredicateException(this, "precpred(_ctx, 29)");
						setState(904);
						match(LEFT_CURLY);
						setState(906);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(905);
							params();
							}
						}

						setState(908);
						match(COLON);
						setState(910);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << IS) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(909);
							expr(0);
							}
						}

						setState(912);
						match(RIGHT_CURLY);
						}
						break;
					case 25:
						{
						_localctx = new ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(913);
						if (!(precpred(_ctx, 28))) throw new FailedPredicateException(this, "precpred(_ctx, 28)");
						setState(914);
						match(COLON);
						setState(915);
						superTypes();
						setState(916);
						curlyObjectBody();
						}
						break;
					case 26:
						{
						_localctx = new PostFixExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(918);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(923);
						_errHandler.sync(this);
						switch (_input.LA(1)) {
						case PLUS:
							{
							setState(919);
							match(PLUS);
							setState(920);
							match(PLUS);
							}
							break;
						case MINUS:
							{
							setState(921);
							match(MINUS);
							setState(922);
							match(MINUS);
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
				setState(929);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,122,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class PrimaryContext extends ParserRuleContext {
		public PrimaryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_primary; }
	 
		public PrimaryContext() { }
		public void copyFrom(PrimaryContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class IdAtomContext extends PrimaryContext {
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public IdAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class BooleanAtomContext extends PrimaryContext {
		public TerminalNode TRUE() { return getToken(Tads3Parser.TRUE, 0); }
		public BooleanAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class RegexpStringAtomContext extends PrimaryContext {
		public TerminalNode RSTR() { return getToken(Tads3Parser.RSTR, 0); }
		public RegexpStringAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class HexAtomContext extends PrimaryContext {
		public TerminalNode HEX() { return getToken(Tads3Parser.HEX, 0); }
		public HexAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class NilAtomContext extends PrimaryContext {
		public TerminalNode NIL() { return getToken(Tads3Parser.NIL, 0); }
		public NilAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class SingleQuotestringAtomContext extends PrimaryContext {
		public TerminalNode DSTR() { return getToken(Tads3Parser.DSTR, 0); }
		public SingleQuotestringAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class InheritedAtomContext extends PrimaryContext {
		public TerminalNode INHERITED() { return getToken(Tads3Parser.INHERITED, 0); }
		public InheritedAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class NumberAtomContext extends PrimaryContext {
		public TerminalNode NR() { return getToken(Tads3Parser.NR, 0); }
		public NumberAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class DoubleQuotestringAtomContext extends PrimaryContext {
		public TerminalNode SSTR() { return getToken(Tads3Parser.SSTR, 0); }
		public DoubleQuotestringAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class ReferenceAtomContext extends PrimaryContext {
		public TerminalNode AMP() { return getToken(Tads3Parser.AMP, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public ReferenceAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}

	public final PrimaryContext primary() throws RecognitionException {
		PrimaryContext _localctx = new PrimaryContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_primary);
		try {
			setState(941);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case INHERITED:
				_localctx = new InheritedAtomContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(930);
				match(INHERITED);
				}
				break;
			case HEX:
				_localctx = new HexAtomContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(931);
				match(HEX);
				}
				break;
			case NR:
				_localctx = new NumberAtomContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(932);
				match(NR);
				}
				break;
			case AMP:
				_localctx = new ReferenceAtomContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(933);
				match(AMP);
				setState(934);
				identifierAtom();
				}
				break;
			case STRING:
			case IN:
			case STEP:
			case IS:
			case OPERATOR:
			case ID:
				_localctx = new IdAtomContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(935);
				identifierAtom();
				}
				break;
			case SSTR:
				_localctx = new DoubleQuotestringAtomContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(936);
				match(SSTR);
				}
				break;
			case DSTR:
				_localctx = new SingleQuotestringAtomContext(_localctx);
				enterOuterAlt(_localctx, 7);
				{
				setState(937);
				match(DSTR);
				}
				break;
			case RSTR:
				_localctx = new RegexpStringAtomContext(_localctx);
				enterOuterAlt(_localctx, 8);
				{
				setState(938);
				match(RSTR);
				}
				break;
			case TRUE:
				_localctx = new BooleanAtomContext(_localctx);
				enterOuterAlt(_localctx, 9);
				{
				setState(939);
				match(TRUE);
				}
				break;
			case NIL:
				_localctx = new NilAtomContext(_localctx);
				enterOuterAlt(_localctx, 10);
				{
				setState(940);
				match(NIL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentifierAtomContext extends ParserRuleContext {
		public TerminalNode ID() { return getToken(Tads3Parser.ID, 0); }
		public TerminalNode IN() { return getToken(Tads3Parser.IN, 0); }
		public TerminalNode IS() { return getToken(Tads3Parser.IS, 0); }
		public TerminalNode STEP() { return getToken(Tads3Parser.STEP, 0); }
		public TerminalNode STRING() { return getToken(Tads3Parser.STRING, 0); }
		public TerminalNode OPERATOR() { return getToken(Tads3Parser.OPERATOR, 0); }
		public IdentifierAtomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifierAtom; }
	}

	public final IdentifierAtomContext identifierAtom() throws RecognitionException {
		IdentifierAtomContext _localctx = new IdentifierAtomContext(_ctx, getState());
		enterRule(_localctx, 106, RULE_identifierAtom);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(943);
			_la = _input.LA(1);
			if ( !(((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (IS - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ParamsContext extends ParserRuleContext {
		public OptionallyTypedOptionalIdContext optionallyTypedOptionalId() {
			return getRuleContext(OptionallyTypedOptionalIdContext.class,0);
		}
		public TerminalNode SPREAD() { return getToken(Tads3Parser.SPREAD, 0); }
		public ArrayContext array() {
			return getRuleContext(ArrayContext.class,0);
		}
		public List<TerminalNode> COMMA() { return getTokens(Tads3Parser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(Tads3Parser.COMMA, i);
		}
		public List<ParamsContext> params() {
			return getRuleContexts(ParamsContext.class);
		}
		public ParamsContext params(int i) {
			return getRuleContext(ParamsContext.class,i);
		}
		public ParamsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_params; }
	}

	public final ParamsContext params() throws RecognitionException {
		ParamsContext _localctx = new ParamsContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_params);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(948);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,124,_ctx) ) {
			case 1:
				{
				setState(945);
				optionallyTypedOptionalId();
				}
				break;
			case 2:
				{
				setState(946);
				match(SPREAD);
				}
				break;
			case 3:
				{
				setState(947);
				array();
				}
				break;
			}
			setState(956);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,126,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(950);
					match(COMMA);
					setState(952);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,125,_ctx) ) {
					case 1:
						{
						setState(951);
						params();
						}
						break;
					}
					}
					} 
				}
				setState(958);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,126,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class OptionallyTypedOptionalIdContext extends ParserRuleContext {
		public IdentifierAtomContext identifier;
		public IdentifierAtomContext type;
		public IdentifierAtomContext name;
		public Token optional;
		public Token emptyColon;
		public Token hasDefault;
		public ExprContext defaultValue;
		public TerminalNode COLON() { return getToken(Tads3Parser.COLON, 0); }
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public TerminalNode OPTIONAL() { return getToken(Tads3Parser.OPTIONAL, 0); }
		public TerminalNode ASSIGN() { return getToken(Tads3Parser.ASSIGN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public OptionallyTypedOptionalIdContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_optionallyTypedOptionalId; }
	}

	public final OptionallyTypedOptionalIdContext optionallyTypedOptionalId() throws RecognitionException {
		OptionallyTypedOptionalIdContext _localctx = new OptionallyTypedOptionalIdContext(_ctx, getState());
		enterRule(_localctx, 110, RULE_optionallyTypedOptionalId);
		int _la;
		try {
			setState(982);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,132,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				{
				setState(962);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,127,_ctx) ) {
				case 1:
					{
					setState(959);
					((OptionallyTypedOptionalIdContext)_localctx).identifier = identifierAtom();
					setState(960);
					match(COLON);
					}
					break;
				}
				setState(965);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,128,_ctx) ) {
				case 1:
					{
					setState(964);
					((OptionallyTypedOptionalIdContext)_localctx).type = identifierAtom();
					}
					break;
				}
				{
				setState(967);
				((OptionallyTypedOptionalIdContext)_localctx).name = identifierAtom();
				}
				setState(969);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==OPTIONAL) {
					{
					setState(968);
					((OptionallyTypedOptionalIdContext)_localctx).optional = match(OPTIONAL);
					}
				}

				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				{
				setState(971);
				((OptionallyTypedOptionalIdContext)_localctx).identifier = identifierAtom();
				setState(972);
				((OptionallyTypedOptionalIdContext)_localctx).emptyColon = match(COLON);
				setState(974);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==OPTIONAL) {
					{
					setState(973);
					((OptionallyTypedOptionalIdContext)_localctx).optional = match(OPTIONAL);
					}
				}

				}
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				{
				setState(976);
				((OptionallyTypedOptionalIdContext)_localctx).identifier = identifierAtom();
				setState(977);
				((OptionallyTypedOptionalIdContext)_localctx).emptyColon = match(COLON);
				setState(978);
				((OptionallyTypedOptionalIdContext)_localctx).hasDefault = match(ASSIGN);
				setState(980);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,131,_ctx) ) {
				case 1:
					{
					setState(979);
					((OptionallyTypedOptionalIdContext)_localctx).defaultValue = expr(0);
					}
					break;
				}
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 7:
			return item_sempred((ItemContext)_localctx, predIndex);
		case 51:
			return expr_sempred((ExprContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean item_sempred(ItemContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 4);
		}
		return true;
	}
	private boolean expr_sempred(ExprContext _localctx, int predIndex) {
		switch (predIndex) {
		case 1:
			return precpred(_ctx, 39);
		case 2:
			return precpred(_ctx, 37);
		case 3:
			return precpred(_ctx, 23);
		case 4:
			return precpred(_ctx, 22);
		case 5:
			return precpred(_ctx, 21);
		case 6:
			return precpred(_ctx, 20);
		case 7:
			return precpred(_ctx, 19);
		case 8:
			return precpred(_ctx, 18);
		case 9:
			return precpred(_ctx, 17);
		case 10:
			return precpred(_ctx, 15);
		case 11:
			return precpred(_ctx, 14);
		case 12:
			return precpred(_ctx, 13);
		case 13:
			return precpred(_ctx, 12);
		case 14:
			return precpred(_ctx, 11);
		case 15:
			return precpred(_ctx, 10);
		case 16:
			return precpred(_ctx, 9);
		case 17:
			return precpred(_ctx, 8);
		case 18:
			return precpred(_ctx, 7);
		case 19:
			return precpred(_ctx, 2);
		case 20:
			return precpred(_ctx, 38);
		case 21:
			return precpred(_ctx, 36);
		case 22:
			return precpred(_ctx, 31);
		case 23:
			return precpred(_ctx, 30);
		case 24:
			return precpred(_ctx, 29);
		case 25:
			return precpred(_ctx, 28);
		case 26:
			return precpred(_ctx, 3);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3b\u03db\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t+\4"+
		",\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64\t"+
		"\64\4\65\t\65\4\66\t\66\4\67\t\67\48\t8\49\t9\3\2\7\2t\n\2\f\2\16\2w\13"+
		"\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3\u0086\n\3\3"+
		"\4\3\4\3\4\3\4\3\4\3\4\3\4\3\5\3\5\5\5\u0091\n\5\3\5\3\5\3\5\3\5\3\5\3"+
		"\5\5\5\u0099\n\5\3\5\3\5\3\5\3\5\3\5\3\5\5\5\u00a1\n\5\5\5\u00a3\n\5\3"+
		"\6\3\6\3\6\7\6\u00a8\n\6\f\6\16\6\u00ab\13\6\3\7\5\7\u00ae\n\7\3\7\7\7"+
		"\u00b1\n\7\f\7\16\7\u00b4\13\7\3\b\3\b\3\b\3\b\3\b\3\t\3\t\3\t\6\t\u00be"+
		"\n\t\r\t\16\t\u00bf\3\t\3\t\3\t\3\t\3\t\3\t\5\t\u00c8\n\t\3\t\3\t\7\t"+
		"\u00cc\n\t\f\t\16\t\u00cf\13\t\3\n\3\n\3\n\3\n\5\n\u00d5\n\n\6\n\u00d7"+
		"\n\n\r\n\16\n\u00d8\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\7\n\u00e4\n\n"+
		"\f\n\16\n\u00e7\13\n\3\n\3\n\3\n\3\n\5\n\u00ed\n\n\3\13\3\13\5\13\u00f1"+
		"\n\13\3\13\3\13\3\13\7\13\u00f6\n\13\f\13\16\13\u00f9\13\13\3\13\3\13"+
		"\3\f\7\f\u00fe\n\f\f\f\16\f\u0101\13\f\3\f\3\f\3\f\3\f\7\f\u0107\n\f\f"+
		"\f\16\f\u010a\13\f\3\f\3\f\3\r\7\r\u010f\n\r\f\r\16\r\u0112\13\r\3\r\3"+
		"\r\5\r\u0116\n\r\3\r\3\r\3\r\7\r\u011b\n\r\f\r\16\r\u011e\13\r\3\r\3\r"+
		"\3\16\3\16\3\16\5\16\u0125\n\16\3\16\3\16\3\17\3\17\5\17\u012b\n\17\3"+
		"\17\5\17\u012e\n\17\3\17\5\17\u0131\n\17\3\17\3\17\5\17\u0135\n\17\3\17"+
		"\3\17\7\17\u0139\n\17\f\17\16\17\u013c\13\17\3\17\3\17\3\20\5\20\u0141"+
		"\n\20\3\20\3\20\3\20\5\20\u0146\n\20\3\20\3\20\3\20\3\20\3\21\5\21\u014d"+
		"\n\21\3\21\5\21\u0150\n\21\3\21\5\21\u0153\n\21\5\21\u0155\n\21\3\21\7"+
		"\21\u0158\n\21\f\21\16\21\u015b\13\21\3\21\3\21\5\21\u015f\n\21\3\21\3"+
		"\21\3\21\3\21\5\21\u0165\n\21\3\21\3\21\5\21\u0169\n\21\3\22\3\22\5\22"+
		"\u016d\n\22\3\22\3\22\3\22\3\22\5\22\u0173\n\22\3\22\3\22\3\22\5\22\u0178"+
		"\n\22\3\22\3\22\3\22\5\22\u017d\n\22\3\22\3\22\3\22\3\22\5\22\u0183\n"+
		"\22\3\22\5\22\u0186\n\22\3\23\3\23\3\23\7\23\u018b\n\23\f\23\16\23\u018e"+
		"\13\23\3\24\3\24\3\24\3\24\3\25\3\25\3\25\3\26\3\26\3\26\7\26\u019a\n"+
		"\26\f\26\16\26\u019d\13\26\3\27\7\27\u01a0\n\27\f\27\16\27\u01a3\13\27"+
		"\3\27\3\27\3\27\7\27\u01a8\n\27\f\27\16\27\u01ab\13\27\3\30\3\30\3\30"+
		"\5\30\u01b0\n\30\3\30\3\30\5\30\u01b4\n\30\3\30\5\30\u01b7\n\30\3\30\3"+
		"\30\5\30\u01bb\n\30\3\30\3\30\7\30\u01bf\n\30\f\30\16\30\u01c2\13\30\3"+
		"\30\3\30\5\30\u01c6\n\30\5\30\u01c8\n\30\3\31\7\31\u01cb\n\31\f\31\16"+
		"\31\u01ce\13\31\3\32\3\32\3\32\3\32\5\32\u01d4\n\32\3\32\3\32\5\32\u01d8"+
		"\n\32\3\32\5\32\u01db\n\32\3\32\3\32\3\33\3\33\5\33\u01e1\n\33\3\33\3"+
		"\33\7\33\u01e5\n\33\f\33\16\33\u01e8\13\33\3\34\5\34\u01eb\n\34\3\34\5"+
		"\34\u01ee\n\34\5\34\u01f0\n\34\3\34\3\34\3\34\3\34\5\34\u01f6\n\34\3\35"+
		"\3\35\3\35\3\35\3\35\5\35\u01fd\n\35\5\35\u01ff\n\35\3\35\3\35\3\35\3"+
		"\35\3\35\3\35\7\35\u0207\n\35\f\35\16\35\u020a\13\35\3\35\3\35\3\36\5"+
		"\36\u020f\n\36\3\36\5\36\u0212\n\36\3\36\5\36\u0215\n\36\3\36\3\36\3\36"+
		"\5\36\u021a\n\36\3\36\5\36\u021d\n\36\3\36\3\36\3\36\5\36\u0222\n\36\3"+
		"\36\5\36\u0225\n\36\5\36\u0227\n\36\3\37\3\37\7\37\u022b\n\37\f\37\16"+
		"\37\u022e\13\37\3\37\3\37\5\37\u0232\n\37\3 \3 \3 \3 \3 \3 \3 \3 \3 \3"+
		" \3 \3 \3 \3 \3 \3 \3 \3 \5 \u0246\n \3!\3!\7!\u024a\n!\f!\16!\u024d\13"+
		"!\3!\3!\3\"\3\"\5\"\u0253\n\"\3\"\3\"\3#\3#\5#\u0259\n#\3#\3#\3$\3$\5"+
		"$\u025f\n$\3$\3$\3%\3%\3%\3&\3&\3&\3&\3&\3&\3&\3&\5&\u026e\n&\3&\3&\3"+
		"&\7&\u0273\n&\f&\16&\u0276\13&\5&\u0278\n&\7&\u027a\n&\f&\16&\u027d\13"+
		"&\3&\3&\3\'\3\'\3\'\3(\3(\3(\3(\3(\3(\3(\3(\3(\3)\3)\3)\3)\3)\3)\3)\3"+
		")\3*\3*\5*\u0297\n*\3*\3*\3+\3+\3+\3+\3+\5+\u02a0\n+\3+\3+\3,\3,\3,\5"+
		",\u02a7\n,\3,\3,\3,\3-\3-\3-\5-\u02af\n-\3-\3-\5-\u02b3\n-\3-\3-\5-\u02b7"+
		"\n-\3-\3-\3-\3.\3.\3.\3.\3.\5.\u02c1\n.\3.\3.\7.\u02c5\n.\f.\16.\u02c8"+
		"\13.\3.\3.\5.\u02cc\n.\3/\3/\3/\5/\u02d1\n/\3\60\5\60\u02d4\n\60\3\60"+
		"\3\60\3\61\3\61\3\61\3\62\3\62\3\62\3\62\5\62\u02df\n\62\3\62\3\62\3\63"+
		"\3\63\3\63\3\63\3\63\7\63\u02e8\n\63\f\63\16\63\u02eb\13\63\3\63\3\63"+
		"\5\63\u02ef\n\63\3\64\3\64\3\64\3\64\3\64\3\65\3\65\3\65\5\65\u02f9\n"+
		"\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\5\65\u0305\n\65"+
		"\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\5\65\u0310\n\65\3\65\3\65"+
		"\5\65\u0314\n\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\5\65\u031f"+
		"\n\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\3\65\3\65\3\65\3\65\3\65\5\65\u0341\n\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\3\65\5\65\u034a\n\65\3\65\3\65\3\65\3\65\5\65\u0350\n\65\3\65\3\65\3"+
		"\65\3\65\5\65\u0356\n\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\3\65\5\65\u0362\n\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\3\65\3\65\3\65\5\65\u0371\n\65\3\65\3\65\3\65\3\65\3\65\3\65\5\65\u0379"+
		"\n\65\3\65\3\65\3\65\6\65\u037e\n\65\r\65\16\65\u037f\3\65\3\65\3\65\3"+
		"\65\3\65\5\65\u0387\n\65\3\65\3\65\3\65\3\65\5\65\u038d\n\65\3\65\3\65"+
		"\5\65\u0391\n\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\5\65\u039e\n\65\7\65\u03a0\n\65\f\65\16\65\u03a3\13\65\3\66\3\66\3\66"+
		"\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\5\66\u03b0\n\66\3\67\3\67\38"+
		"\38\38\58\u03b7\n8\38\38\58\u03bb\n8\78\u03bd\n8\f8\168\u03c0\138\39\3"+
		"9\39\59\u03c5\n9\39\59\u03c8\n9\39\39\59\u03cc\n9\39\39\39\59\u03d1\n"+
		"9\39\39\39\39\59\u03d7\n9\59\u03d9\n9\39\2\4\20h:\2\4\6\b\n\f\16\20\22"+
		"\24\26\30\32\34\36 \"$&(*,.\60\62\64\668:<>@BDFHJLNPRTVXZ\\^`bdfhjlnp"+
		"\2\16\3\2ST\7\2\64\64\66\669<BBLL\b\2\64\649<BCLMYY]^\7\2\63\64\66\66"+
		"99<<BB\4\2\64\64MM\3\2?@\4\2:;LL\4\299<<\4\2XXZ\\\3\2=>\4\2YY]^\b\2%%"+
		"\'\'**,,\62\62DD\2\u0479\2u\3\2\2\2\4\u0085\3\2\2\2\6\u0087\3\2\2\2\b"+
		"\u0090\3\2\2\2\n\u00a4\3\2\2\2\f\u00ad\3\2\2\2\16\u00b5\3\2\2\2\20\u00c7"+
		"\3\2\2\2\22\u00ec\3\2\2\2\24\u00ee\3\2\2\2\26\u00ff\3\2\2\2\30\u0110\3"+
		"\2\2\2\32\u0121\3\2\2\2\34\u0128\3\2\2\2\36\u0140\3\2\2\2 \u0154\3\2\2"+
		"\2\"\u0182\3\2\2\2$\u0187\3\2\2\2&\u018f\3\2\2\2(\u0193\3\2\2\2*\u0196"+
		"\3\2\2\2,\u01a1\3\2\2\2.\u01ac\3\2\2\2\60\u01cc\3\2\2\2\62\u01da\3\2\2"+
		"\2\64\u01e0\3\2\2\2\66\u01f5\3\2\2\28\u01f7\3\2\2\2:\u0226\3\2\2\2<\u0231"+
		"\3\2\2\2>\u0245\3\2\2\2@\u0247\3\2\2\2B\u0250\3\2\2\2D\u0256\3\2\2\2F"+
		"\u025c\3\2\2\2H\u0262\3\2\2\2J\u0265\3\2\2\2L\u0280\3\2\2\2N\u0283\3\2"+
		"\2\2P\u028c\3\2\2\2R\u0294\3\2\2\2T\u029a\3\2\2\2V\u02a3\3\2\2\2X\u02ab"+
		"\3\2\2\2Z\u02bb\3\2\2\2\\\u02cd\3\2\2\2^\u02d3\3\2\2\2`\u02d7\3\2\2\2"+
		"b\u02da\3\2\2\2d\u02e2\3\2\2\2f\u02f0\3\2\2\2h\u031e\3\2\2\2j\u03af\3"+
		"\2\2\2l\u03b1\3\2\2\2n\u03b6\3\2\2\2p\u03d8\3\2\2\2rt\5\4\3\2sr\3\2\2"+
		"\2tw\3\2\2\2us\3\2\2\2uv\3\2\2\2vx\3\2\2\2wu\3\2\2\2xy\7\2\2\3y\3\3\2"+
		"\2\2z\u0086\5\24\13\2{\u0086\5\22\n\2|\u0086\5\34\17\2}\u0086\5\32\16"+
		"\2~\u0086\5 \21\2\177\u0086\5\26\f\2\u0080\u0086\5\30\r\2\u0081\u0086"+
		"\5\66\34\2\u0082\u0086\5\b\5\2\u0083\u0086\5\6\4\2\u0084\u0086\7N\2\2"+
		"\u0085z\3\2\2\2\u0085{\3\2\2\2\u0085|\3\2\2\2\u0085}\3\2\2\2\u0085~\3"+
		"\2\2\2\u0085\177\3\2\2\2\u0085\u0080\3\2\2\2\u0085\u0081\3\2\2\2\u0085"+
		"\u0082\3\2\2\2\u0085\u0083\3\2\2\2\u0085\u0084\3\2\2\2\u0086\5\3\2\2\2"+
		"\u0087\u0088\7\65\2\2\u0088\u0089\7\61\2\2\u0089\u008a\7D\2\2\u008a\u008b"+
		"\7O\2\2\u008b\u008c\5h\65\2\u008c\u008d\7P\2\2\u008d\7\3\2\2\2\u008e\u0091"+
		"\7\22\2\2\u008f\u0091\7\23\2\2\u0090\u008e\3\2\2\2\u0090\u008f\3\2\2\2"+
		"\u0090\u0091\3\2\2\2\u0091\u0092\3\2\2\2\u0092\u0093\7\3\2\2\u0093\u0098"+
		"\5l\67\2\u0094\u0095\7O\2\2\u0095\u0096\5l\67\2\u0096\u0097\7P\2\2\u0097"+
		"\u0099\3\2\2\2\u0098\u0094\3\2\2\2\u0098\u0099\3\2\2\2\u0099\u009a\3\2"+
		"\2\2\u009a\u009b\7I\2\2\u009b\u009c\5\n\6\2\u009c\u00a2\7I\2\2\u009d\u00a0"+
		"\5*\26\2\u009e\u00a1\5&\24\2\u009f\u00a1\5(\25\2\u00a0\u009e\3\2\2\2\u00a0"+
		"\u009f\3\2\2\2\u00a1\u00a3\3\2\2\2\u00a2\u009d\3\2\2\2\u00a2\u00a3\3\2"+
		"\2\2\u00a3\t\3\2\2\2\u00a4\u00a9\5\f\7\2\u00a5\u00a6\7M\2\2\u00a6\u00a8"+
		"\5\f\7\2\u00a7\u00a5\3\2\2\2\u00a8\u00ab\3\2\2\2\u00a9\u00a7\3\2\2\2\u00a9"+
		"\u00aa\3\2\2\2\u00aa\13\3\2\2\2\u00ab\u00a9\3\2\2\2\u00ac\u00ae\5\16\b"+
		"\2\u00ad\u00ac\3\2\2\2\u00ad\u00ae\3\2\2\2\u00ae\u00b2\3\2\2\2\u00af\u00b1"+
		"\5\20\t\2\u00b0\u00af\3\2\2\2\u00b1\u00b4\3\2\2\2\u00b2\u00b0\3\2\2\2"+
		"\u00b2\u00b3\3\2\2\2\u00b3\r\3\2\2\2\u00b4\u00b2\3\2\2\2\u00b5\u00b6\7"+
		"Q\2\2\u00b6\u00b7\5l\67\2\u00b7\u00b8\7F\2\2\u00b8\u00b9\7R\2\2\u00b9"+
		"\17\3\2\2\2\u00ba\u00bb\b\t\1\2\u00bb\u00bd\7O\2\2\u00bc\u00be\5\20\t"+
		"\2\u00bd\u00bc\3\2\2\2\u00be\u00bf\3\2\2\2\u00bf\u00bd\3\2\2\2\u00bf\u00c0"+
		"\3\2\2\2\u00c0\u00c1\3\2\2\2\u00c1\u00c2\7P\2\2\u00c2\u00c8\3\2\2\2\u00c3"+
		"\u00c4\7M\2\2\u00c4\u00c8\5\20\t\5\u00c5\u00c8\5h\65\2\u00c6\u00c8\7L"+
		"\2\2\u00c7\u00ba\3\2\2\2\u00c7\u00c3\3\2\2\2\u00c7\u00c5\3\2\2\2\u00c7"+
		"\u00c6\3\2\2\2\u00c8\u00cd\3\2\2\2\u00c9\u00ca\f\6\2\2\u00ca\u00cc\7M"+
		"\2\2\u00cb\u00c9\3\2\2\2\u00cc\u00cf\3\2\2\2\u00cd\u00cb\3\2\2\2\u00cd"+
		"\u00ce\3\2\2\2\u00ce\21\3\2\2\2\u00cf\u00cd\3\2\2\2\u00d0\u00d1\5l\67"+
		"\2\u00d1\u00d6\7\n\2\2\u00d2\u00d4\5h\65\2\u00d3\u00d5\7\67\2\2\u00d4"+
		"\u00d3\3\2\2\2\u00d4\u00d5\3\2\2\2\u00d5\u00d7\3\2\2\2\u00d6\u00d2\3\2"+
		"\2\2\u00d7\u00d8\3\2\2\2\u00d8\u00d6\3\2\2\2\u00d8\u00d9\3\2\2\2\u00d9"+
		"\u00da\3\2\2\2\u00da\u00db\7N\2\2\u00db\u00ed\3\2\2\2\u00dc\u00dd\7%\2"+
		"\2\u00dd\u00de\7\n\2\2\u00de\u00e5\7Y\2\2\u00df\u00e4\5l\67\2\u00e0\u00e4"+
		"\7L\2\2\u00e1\u00e4\7,\2\2\u00e2\u00e4\7\'\2\2\u00e3\u00df\3\2\2\2\u00e3"+
		"\u00e0\3\2\2\2\u00e3\u00e1\3\2\2\2\u00e3\u00e2\3\2\2\2\u00e4\u00e7\3\2"+
		"\2\2\u00e5\u00e3\3\2\2\2\u00e5\u00e6\3\2\2\2\u00e6\u00e8\3\2\2\2\u00e7"+
		"\u00e5\3\2\2\2\u00e8\u00e9\7]\2\2\u00e9\u00ea\5l\67\2\u00ea\u00eb\7N\2"+
		"\2\u00eb\u00ed\3\2\2\2\u00ec\u00d0\3\2\2\2\u00ec\u00dc\3\2\2\2\u00ed\23"+
		"\3\2\2\2\u00ee\u00f0\7\17\2\2\u00ef\u00f1\7\60\2\2\u00f0\u00ef\3\2\2\2"+
		"\u00f0\u00f1\3\2\2\2\u00f1\u00f2\3\2\2\2\u00f2\u00f7\5l\67\2\u00f3\u00f4"+
		"\7J\2\2\u00f4\u00f6\5l\67\2\u00f5\u00f3\3\2\2\2\u00f6\u00f9\3\2\2\2\u00f7"+
		"\u00f5\3\2\2\2\u00f7\u00f8\3\2\2\2\u00f8\u00fa\3\2\2\2\u00f9\u00f7\3\2"+
		"\2\2\u00fa\u00fb\7N\2\2\u00fb\25\3\2\2\2\u00fc\u00fe\79\2\2\u00fd\u00fc"+
		"\3\2\2\2\u00fe\u0101\3\2\2\2\u00ff\u00fd\3\2\2\2\u00ff\u0100\3\2\2\2\u0100"+
		"\u0102\3\2\2\2\u0101\u00ff\3\2\2\2\u0102\u0103\7\37\2\2\u0103\u0108\5"+
		"l\67\2\u0104\u0105\7J\2\2\u0105\u0107\5l\67\2\u0106\u0104\3\2\2\2\u0107"+
		"\u010a\3\2\2\2\u0108\u0106\3\2\2\2\u0108\u0109\3\2\2\2\u0109\u010b\3\2"+
		"\2\2\u010a\u0108\3\2\2\2\u010b\u010c\7N\2\2\u010c\27\3\2\2\2\u010d\u010f"+
		"\79\2\2\u010e\u010d\3\2\2\2\u010f\u0112\3\2\2\2\u0110\u010e\3\2\2\2\u0110"+
		"\u0111\3\2\2\2\u0111\u0113\3\2\2\2\u0112\u0110\3\2\2\2\u0113\u0115\7 "+
		"\2\2\u0114\u0116\7\37\2\2\u0115\u0114\3\2\2\2\u0115\u0116\3\2\2\2\u0116"+
		"\u0117\3\2\2\2\u0117\u011c\5l\67\2\u0118\u0119\7J\2\2\u0119\u011b\5l\67"+
		"\2\u011a\u0118\3\2\2\2\u011b\u011e\3\2\2\2\u011c\u011a\3\2\2\2\u011c\u011d"+
		"\3\2\2\2\u011d\u011f\3\2\2\2\u011e\u011c\3\2\2\2\u011f\u0120\7N\2\2\u0120"+
		"\31\3\2\2\2\u0121\u0122\7!\2\2\u0122\u0124\5l\67\2\u0123\u0125\7T\2\2"+
		"\u0124\u0123\3\2\2\2\u0124\u0125\3\2\2\2\u0125\u0126\3\2\2\2\u0126\u0127"+
		"\7N\2\2\u0127\33\3\2\2\2\u0128\u012a\7\34\2\2\u0129\u012b\7\20\2\2\u012a"+
		"\u0129\3\2\2\2\u012a\u012b\3\2\2\2\u012b\u012d\3\2\2\2\u012c\u012e\5l"+
		"\67\2\u012d\u012c\3\2\2\2\u012d\u012e\3\2\2\2\u012e\u0130\3\2\2\2\u012f"+
		"\u0131\t\2\2\2\u0130\u012f\3\2\2\2\u0130\u0131\3\2\2\2\u0131\u0134\3\2"+
		"\2\2\u0132\u0133\7I\2\2\u0133\u0135\5*\26\2\u0134\u0132\3\2\2\2\u0134"+
		"\u0135\3\2\2\2\u0135\u0136\3\2\2\2\u0136\u013a\7V\2\2\u0137\u0139\5\36"+
		"\20\2\u0138\u0137\3\2\2\2\u0139\u013c\3\2\2\2\u013a\u0138\3\2\2\2\u013a"+
		"\u013b\3\2\2\2\u013b\u013d\3\2\2\2\u013c\u013a\3\2\2\2\u013d\u013e\7W"+
		"\2\2\u013e\35\3\2\2\2\u013f\u0141\7$\2\2\u0140\u013f\3\2\2\2\u0140\u0141"+
		"\3\2\2\2\u0141\u0142\3\2\2\2\u0142\u0143\5l\67\2\u0143\u0145\7O\2\2\u0144"+
		"\u0146\5n8\2\u0145\u0144\3\2\2\2\u0145\u0146\3\2\2\2\u0146\u0147\3\2\2"+
		"\2\u0147\u0148\7P\2\2\u0148\u0149\3\2\2\2\u0149\u014a\7N\2\2\u014a\37"+
		"\3\2\2\2\u014b\u014d\7\22\2\2\u014c\u014b\3\2\2\2\u014c\u014d\3\2\2\2"+
		"\u014d\u0155\3\2\2\2\u014e\u0150\7\23\2\2\u014f\u014e\3\2\2\2\u014f\u0150"+
		"\3\2\2\2\u0150\u0155\3\2\2\2\u0151\u0153\7\20\2\2\u0152\u0151\3\2\2\2"+
		"\u0152\u0153\3\2\2\2\u0153\u0155\3\2\2\2\u0154\u014c\3\2\2\2\u0154\u014f"+
		"\3\2\2\2\u0154\u0152\3\2\2\2\u0155\u0159\3\2\2\2\u0156\u0158\79\2\2\u0157"+
		"\u0156\3\2\2\2\u0158\u015b\3\2\2\2\u0159\u0157\3\2\2\2\u0159\u015a\3\2"+
		"\2\2\u015a\u0164\3\2\2\2\u015b\u0159\3\2\2\2\u015c\u0165\5*\26\2\u015d"+
		"\u015f\7\21\2\2\u015e\u015d\3\2\2\2\u015e\u015f\3\2\2\2\u015f\u0160\3"+
		"\2\2\2\u0160\u0161\5l\67\2\u0161\u0162\7I\2\2\u0162\u0163\5*\26\2\u0163"+
		"\u0165\3\2\2\2\u0164\u015c\3\2\2\2\u0164\u015e\3\2\2\2\u0165\u0168\3\2"+
		"\2\2\u0166\u0169\5&\24\2\u0167\u0169\5(\25\2\u0168\u0166\3\2\2\2\u0168"+
		"\u0167\3\2\2\2\u0169!\3\2\2\2\u016a\u016c\7T\2\2\u016b\u016d\7N\2\2\u016c"+
		"\u016b\3\2\2\2\u016c\u016d\3\2\2\2\u016d\u0183\3\2\2\2\u016e\u016f\7\63"+
		"\2\2\u016f\u0183\5h\65\2\u0170\u0172\7S\2\2\u0171\u0173\7N\2\2\u0172\u0171"+
		"\3\2\2\2\u0172\u0173\3\2\2\2\u0173\u0183\3\2\2\2\u0174\u0177\t\3\2\2\u0175"+
		"\u0178\5l\67\2\u0176\u0178\5h\65\2\u0177\u0175\3\2\2\2\u0177\u0176\3\2"+
		"\2\2\u0178\u0183\3\2\2\2\u0179\u017c\7A\2\2\u017a\u017d\5l\67\2\u017b"+
		"\u017d\5h\65\2\u017c\u017a\3\2\2\2\u017c\u017b\3\2\2\2\u017d\u0183\3\2"+
		"\2\2\u017e\u017f\7Q\2\2\u017f\u0180\5$\23\2\u0180\u0181\7R\2\2\u0181\u0183"+
		"\3\2\2\2\u0182\u016a\3\2\2\2\u0182\u016e\3\2\2\2\u0182\u0170\3\2\2\2\u0182"+
		"\u0174\3\2\2\2\u0182\u0179\3\2\2\2\u0182\u017e\3\2\2\2\u0183\u0185\3\2"+
		"\2\2\u0184\u0186\7\67\2\2\u0185\u0184\3\2\2\2\u0185\u0186\3\2\2\2\u0186"+
		"#\3\2\2\2\u0187\u018c\5h\65\2\u0188\u0189\7J\2\2\u0189\u018b\5$\23\2\u018a"+
		"\u0188\3\2\2\2\u018b\u018e\3\2\2\2\u018c\u018a\3\2\2\2\u018c\u018d\3\2"+
		"\2\2\u018d%\3\2\2\2\u018e\u018c\3\2\2\2\u018f\u0190\7V\2\2\u0190\u0191"+
		"\5,\27\2\u0191\u0192\7W\2\2\u0192\'\3\2\2\2\u0193\u0194\5,\27\2\u0194"+
		"\u0195\7N\2\2\u0195)\3\2\2\2\u0196\u019b\5l\67\2\u0197\u0198\7J\2\2\u0198"+
		"\u019a\5*\26\2\u0199\u0197\3\2\2\2\u019a\u019d\3\2\2\2\u019b\u0199\3\2"+
		"\2\2\u019b\u019c\3\2\2\2\u019c+\3\2\2\2\u019d\u019b\3\2\2\2\u019e\u01a0"+
		"\5\"\22\2\u019f\u019e\3\2\2\2\u01a0\u01a3\3\2\2\2\u01a1\u019f\3\2\2\2"+
		"\u01a1\u01a2\3\2\2\2\u01a2\u01a9\3\2\2\2\u01a3\u01a1\3\2\2\2\u01a4\u01a8"+
		"\5\66\34\2\u01a5\u01a8\5.\30\2\u01a6\u01a8\5\62\32\2\u01a7\u01a4\3\2\2"+
		"\2\u01a7\u01a5\3\2\2\2\u01a7\u01a6\3\2\2\2\u01a8\u01ab\3\2\2\2\u01a9\u01a7"+
		"\3\2\2\2\u01a9\u01aa\3\2\2\2\u01aa-\3\2\2\2\u01ab\u01a9\3\2\2\2\u01ac"+
		"\u01c7\5l\67\2\u01ad\u01af\7E\2\2\u01ae\u01b0\7$\2\2\u01af\u01ae\3\2\2"+
		"\2\u01af\u01b0\3\2\2\2\u01b0\u01b3\3\2\2\2\u01b1\u01b4\5h\65\2\u01b2\u01b4"+
		"\5\60\31\2\u01b3\u01b1\3\2\2\2\u01b3\u01b2\3\2\2\2\u01b4\u01b6\3\2\2\2"+
		"\u01b5\u01b7\7N\2\2\u01b6\u01b5\3\2\2\2\u01b6\u01b7\3\2\2\2\u01b7\u01c8"+
		"\3\2\2\2\u01b8\u01ba\7I\2\2\u01b9\u01bb\5l\67\2\u01ba\u01b9\3\2\2\2\u01ba"+
		"\u01bb\3\2\2\2\u01bb\u01c0\3\2\2\2\u01bc\u01bd\7J\2\2\u01bd\u01bf\5*\26"+
		"\2\u01be\u01bc\3\2\2\2\u01bf\u01c2\3\2\2\2\u01c0\u01be\3\2\2\2\u01c0\u01c1"+
		"\3\2\2\2\u01c1\u01c3\3\2\2\2\u01c2\u01c0\3\2\2\2\u01c3\u01c5\5&\24\2\u01c4"+
		"\u01c6\7N\2\2\u01c5\u01c4\3\2\2\2\u01c5\u01c6\3\2\2\2\u01c6\u01c8\3\2"+
		"\2\2\u01c7\u01ad\3\2\2\2\u01c7\u01b8\3\2\2\2\u01c8/\3\2\2\2\u01c9\u01cb"+
		"\7T\2\2\u01ca\u01c9\3\2\2\2\u01cb\u01ce\3\2\2\2\u01cc\u01ca\3\2\2\2\u01cc"+
		"\u01cd\3\2\2\2\u01cd\61\3\2\2\2\u01ce\u01cc\3\2\2\2\u01cf\u01d0\7\24\2"+
		"\2\u01d0\u01db\5\64\33\2\u01d1\u01d3\7\24\2\2\u01d2\u01d4\7T\2\2\u01d3"+
		"\u01d2\3\2\2\2\u01d3\u01d4\3\2\2\2\u01d4\u01d5\3\2\2\2\u01d5\u01d7\7O"+
		"\2\2\u01d6\u01d8\5\64\33\2\u01d7\u01d6\3\2\2\2\u01d7\u01d8\3\2\2\2\u01d8"+
		"\u01d9\3\2\2\2\u01d9\u01db\7P\2\2\u01da\u01cf\3\2\2\2\u01da\u01d1\3\2"+
		"\2\2\u01db\u01dc\3\2\2\2\u01dc\u01dd\5&\24\2\u01dd\63\3\2\2\2\u01de\u01e1"+
		"\5j\66\2\u01df\u01e1\7L\2\2\u01e0\u01de\3\2\2\2\u01e0\u01df\3\2\2\2\u01e1"+
		"\u01e6\3\2\2\2\u01e2\u01e3\7J\2\2\u01e3\u01e5\5\64\33\2\u01e4\u01e2\3"+
		"\2\2\2\u01e5\u01e8\3\2\2\2\u01e6\u01e4\3\2\2\2\u01e6\u01e7\3\2\2\2\u01e7"+
		"\65\3\2\2\2\u01e8\u01e6\3\2\2\2\u01e9\u01eb\7\22\2\2\u01ea\u01e9\3\2\2"+
		"\2\u01ea\u01eb\3\2\2\2\u01eb\u01f0\3\2\2\2\u01ec\u01ee\7\23\2\2\u01ed"+
		"\u01ec\3\2\2\2\u01ed\u01ee\3\2\2\2\u01ee\u01f0\3\2\2\2\u01ef\u01ea\3\2"+
		"\2\2\u01ef\u01ed\3\2\2\2\u01f0\u01f1\3\2\2\2\u01f1\u01f2\5:\36\2\u01f2"+
		"\u01f3\5<\37\2\u01f3\u01f6\3\2\2\2\u01f4\u01f6\58\35\2\u01f5\u01ef\3\2"+
		"\2\2\u01f5\u01f4\3\2\2\2\u01f6\67\3\2\2\2\u01f7\u01fe\7\62\2\2\u01f8\u01ff"+
		"\t\4\2\2\u01f9\u01fa\7Q\2\2\u01fa\u01fc\7R\2\2\u01fb\u01fd\7E\2\2\u01fc"+
		"\u01fb\3\2\2\2\u01fc\u01fd\3\2\2\2\u01fd\u01ff\3\2\2\2\u01fe\u01f8\3\2"+
		"\2\2\u01fe\u01f9\3\2\2\2\u01ff\u0200\3\2\2\2\u0200\u0201\7O\2\2\u0201"+
		"\u0202\5n8\2\u0202\u0203\7P\2\2\u0203\u0204\3\2\2\2\u0204\u0208\7V\2\2"+
		"\u0205\u0207\5> \2\u0206\u0205\3\2\2\2\u0207\u020a\3\2\2\2\u0208\u0206"+
		"\3\2\2\2\u0208\u0209\3\2\2\2\u0209\u020b\3\2\2\2\u020a\u0208\3\2\2\2\u020b"+
		"\u020c\7W\2\2\u020c9\3\2\2\2\u020d\u020f\7\"\2\2\u020e\u020d\3\2\2\2\u020e"+
		"\u020f\3\2\2\2\u020f\u0211\3\2\2\2\u0210\u0212\7$\2\2\u0211\u0210\3\2"+
		"\2\2\u0211\u0212\3\2\2\2\u0212\u0214\3\2\2\2\u0213\u0215\7\7\2\2\u0214"+
		"\u0213\3\2\2\2\u0214\u0215\3\2\2\2\u0215\u0216\3\2\2\2\u0216\u021c\5l"+
		"\67\2\u0217\u0219\7O\2\2\u0218\u021a\5n8\2\u0219\u0218\3\2\2\2\u0219\u021a"+
		"\3\2\2\2\u021a\u021b\3\2\2\2\u021b\u021d\7P\2\2\u021c\u0217\3\2\2\2\u021c"+
		"\u021d\3\2\2\2\u021d\u0227\3\2\2\2\u021e\u0224\7\7\2\2\u021f\u0221\7O"+
		"\2\2\u0220\u0222\5n8\2\u0221\u0220\3\2\2\2\u0221\u0222\3\2\2\2\u0222\u0223"+
		"\3\2\2\2\u0223\u0225\7P\2\2\u0224\u021f\3\2\2\2\u0224\u0225\3\2\2\2\u0225"+
		"\u0227\3\2\2\2\u0226\u020e\3\2\2\2\u0226\u021e\3\2\2\2\u0227;\3\2\2\2"+
		"\u0228\u022c\7V\2\2\u0229\u022b\5> \2\u022a\u0229\3\2\2\2\u022b\u022e"+
		"\3\2\2\2\u022c\u022a\3\2\2\2\u022c\u022d\3\2\2\2\u022d\u022f\3\2\2\2\u022e"+
		"\u022c\3\2\2\2\u022f\u0232\7W\2\2\u0230\u0232\5> \2\u0231\u0228\3\2\2"+
		"\2\u0231\u0230\3\2\2\2\u0232=\3\2\2\2\u0233\u0246\5b\62\2\u0234\u0246"+
		"\5d\63\2\u0235\u0246\5Z.\2\u0236\u0246\5X-\2\u0237\u0246\5T+\2\u0238\u0246"+
		"\5V,\2\u0239\u0246\5J&\2\u023a\u0246\5N(\2\u023b\u0246\5P)\2\u023c\u0246"+
		"\5`\61\2\u023d\u0246\5^\60\2\u023e\u0246\5R*\2\u023f\u0246\5L\'\2\u0240"+
		"\u0246\5H%\2\u0241\u0246\5D#\2\u0242\u0246\5F$\2\u0243\u0246\5B\"\2\u0244"+
		"\u0246\5@!\2\u0245\u0233\3\2\2\2\u0245\u0234\3\2\2\2\u0245\u0235\3\2\2"+
		"\2\u0245\u0236\3\2\2\2\u0245\u0237\3\2\2\2\u0245\u0238\3\2\2\2\u0245\u0239"+
		"\3\2\2\2\u0245\u023a\3\2\2\2\u0245\u023b\3\2\2\2\u0245\u023c\3\2\2\2\u0245"+
		"\u023d\3\2\2\2\u0245\u023e\3\2\2\2\u0245\u023f\3\2\2\2\u0245\u0240\3\2"+
		"\2\2\u0245\u0241\3\2\2\2\u0245\u0242\3\2\2\2\u0245\u0243\3\2\2\2\u0245"+
		"\u0244\3\2\2\2\u0246?\3\2\2\2\u0247\u024b\7V\2\2\u0248\u024a\5> \2\u0249"+
		"\u0248\3\2\2\2\u024a\u024d\3\2\2\2\u024b\u0249\3\2\2\2\u024b\u024c\3\2"+
		"\2\2\u024c\u024e\3\2\2\2\u024d\u024b\3\2\2\2\u024e\u024f\7W\2\2\u024f"+
		"A\3\2\2\2\u0250\u0252\7/\2\2\u0251\u0253\5l\67\2\u0252\u0251\3\2\2\2\u0252"+
		"\u0253\3\2\2\2\u0253\u0254\3\2\2\2\u0254\u0255\7N\2\2\u0255C\3\2\2\2\u0256"+
		"\u0258\7-\2\2\u0257\u0259\5l\67\2\u0258\u0257\3\2\2\2\u0258\u0259\3\2"+
		"\2\2\u0259\u025a\3\2\2\2\u025a\u025b\7N\2\2\u025bE\3\2\2\2\u025c\u025e"+
		"\7.\2\2\u025d\u025f\5l\67\2\u025e\u025d\3\2\2\2\u025e\u025f\3\2\2\2\u025f"+
		"\u0260\3\2\2\2\u0260\u0261\7N\2\2\u0261G\3\2\2\2\u0262\u0263\5l\67\2\u0263"+
		"\u0264\7I\2\2\u0264I\3\2\2\2\u0265\u0266\7\4\2\2\u0266\u0267\7O\2\2\u0267"+
		"\u0268\5h\65\2\u0268\u0269\7P\2\2\u0269\u027b\7V\2\2\u026a\u026b\7\5\2"+
		"\2\u026b\u026e\5h\65\2\u026c\u026e\7\6\2\2\u026d\u026a\3\2\2\2\u026d\u026c"+
		"\3\2\2\2\u026e\u026f\3\2\2\2\u026f\u0277\7I\2\2\u0270\u0278\5<\37\2\u0271"+
		"\u0273\5> \2\u0272\u0271\3\2\2\2\u0273\u0276\3\2\2\2\u0274\u0272\3\2\2"+
		"\2\u0274\u0275\3\2\2\2\u0275\u0278\3\2\2\2\u0276\u0274\3\2\2\2\u0277\u0270"+
		"\3\2\2\2\u0277\u0274\3\2\2\2\u0278\u027a\3\2\2\2\u0279\u026d\3\2\2\2\u027a"+
		"\u027d\3\2\2\2\u027b\u0279\3\2\2\2\u027b\u027c\3\2\2\2\u027c\u027e\3\2"+
		"\2\2\u027d\u027b\3\2\2\2\u027e\u027f\7W\2\2\u027fK\3\2\2\2\u0280\u0281"+
		"\7\b\2\2\u0281\u0282\5h\65\2\u0282M\3\2\2\2\u0283\u0284\7\13\2\2\u0284"+
		"\u0285\7O\2\2\u0285\u0286\7\31\2\2\u0286\u0287\7D\2\2\u0287\u0288\7\'"+
		"\2\2\u0288\u0289\5h\65\2\u0289\u028a\7P\2\2\u028a\u028b\5<\37\2\u028b"+
		"O\3\2\2\2\u028c\u028d\7&\2\2\u028d\u028e\7O\2\2\u028e\u028f\5h\65\2\u028f"+
		"\u0290\7\'\2\2\u0290\u0291\5h\65\2\u0291\u0292\7P\2\2\u0292\u0293\5<\37"+
		"\2\u0293Q\3\2\2\2\u0294\u0296\7#\2\2\u0295\u0297\5h\65\2\u0296\u0295\3"+
		"\2\2\2\u0296\u0297\3\2\2\2\u0297\u0298\3\2\2\2\u0298\u0299\7N\2\2\u0299"+
		"S\3\2\2\2\u029a\u029b\7\26\2\2\u029b\u029c\5<\37\2\u029c\u029d\7\27\2"+
		"\2\u029d\u029f\7O\2\2\u029e\u02a0\5h\65\2\u029f\u029e\3\2\2\2\u029f\u02a0"+
		"\3\2\2\2\u02a0\u02a1\3\2\2\2\u02a1\u02a2\7P\2\2\u02a2U\3\2\2\2\u02a3\u02a4"+
		"\7\27\2\2\u02a4\u02a6\7O\2\2\u02a5\u02a7\5h\65\2\u02a6\u02a5\3\2\2\2\u02a6"+
		"\u02a7\3\2\2\2\u02a7\u02a8\3\2\2\2\u02a8\u02a9\7P\2\2\u02a9\u02aa\5<\37"+
		"\2\u02aaW\3\2\2\2\u02ab\u02ac\7\13\2\2\u02ac\u02ae\7O\2\2\u02ad\u02af"+
		"\5h\65\2\u02ae\u02ad\3\2\2\2\u02ae\u02af\3\2\2\2\u02af\u02b0\3\2\2\2\u02b0"+
		"\u02b2\7N\2\2\u02b1\u02b3\5h\65\2\u02b2\u02b1\3\2\2\2\u02b2\u02b3\3\2"+
		"\2\2\u02b3\u02b4\3\2\2\2\u02b4\u02b6\7N\2\2\u02b5\u02b7\5h\65\2\u02b6"+
		"\u02b5\3\2\2\2\u02b6\u02b7\3\2\2\2\u02b7\u02b8\3\2\2\2\u02b8\u02b9\7P"+
		"\2\2\u02b9\u02ba\5<\37\2\u02baY\3\2\2\2\u02bb\u02bc\7\f\2\2\u02bc\u02c6"+
		"\5<\37\2\u02bd\u02be\7\r\2\2\u02be\u02c0\7O\2\2\u02bf\u02c1\5n8\2\u02c0"+
		"\u02bf\3\2\2\2\u02c0\u02c1\3\2\2\2\u02c1\u02c2\3\2\2\2\u02c2\u02c3\7P"+
		"\2\2\u02c3\u02c5\5<\37\2\u02c4\u02bd\3\2\2\2\u02c5\u02c8\3\2\2\2\u02c6"+
		"\u02c4\3\2\2\2\u02c6\u02c7\3\2\2\2\u02c7\u02cb\3\2\2\2\u02c8\u02c6\3\2"+
		"\2\2\u02c9\u02ca\7\16\2\2\u02ca\u02cc\5<\37\2\u02cb\u02c9\3\2\2\2\u02cb"+
		"\u02cc\3\2\2\2\u02cc[\3\2\2\2\u02cd\u02d0\5h\65\2\u02ce\u02cf\7K\2\2\u02cf"+
		"\u02d1\5\\/\2\u02d0\u02ce\3\2\2\2\u02d0\u02d1\3\2\2\2\u02d1]\3\2\2\2\u02d2"+
		"\u02d4\5h\65\2\u02d3\u02d2\3\2\2\2\u02d3\u02d4\3\2\2\2\u02d4\u02d5\3\2"+
		"\2\2\u02d5\u02d6\7N\2\2\u02d6_\3\2\2\2\u02d7\u02d8\7S\2\2\u02d8\u02d9"+
		"\7N\2\2\u02d9a\3\2\2\2\u02da\u02db\7\31\2\2\u02db\u02de\5l\67\2\u02dc"+
		"\u02dd\7E\2\2\u02dd\u02df\5h\65\2\u02de\u02dc\3\2\2\2\u02de\u02df\3\2"+
		"\2\2\u02df\u02e0\3\2\2\2\u02e0\u02e1\7N\2\2\u02e1c\3\2\2\2\u02e2\u02e3"+
		"\7\25\2\2\u02e3\u02e9\5f\64\2\u02e4\u02e5\7\30\2\2\u02e5\u02e6\7\25\2"+
		"\2\u02e6\u02e8\5f\64\2\u02e7\u02e4\3\2\2\2\u02e8\u02eb\3\2\2\2\u02e9\u02e7"+
		"\3\2\2\2\u02e9\u02ea\3\2\2\2\u02ea\u02ee\3\2\2\2\u02eb\u02e9\3\2\2\2\u02ec"+
		"\u02ed\7\30\2\2\u02ed\u02ef\5<\37\2\u02ee\u02ec\3\2\2\2\u02ee\u02ef\3"+
		"\2\2\2\u02efe\3\2\2\2\u02f0\u02f1\7O\2\2\u02f1\u02f2\5h\65\2\u02f2\u02f3"+
		"\7P\2\2\u02f3\u02f4\5<\37\2\u02f4g\3\2\2\2\u02f5\u02f6\b\65\1\2\u02f6"+
		"\u02f8\7Q\2\2\u02f7\u02f9\5h\65\2\u02f8\u02f7\3\2\2\2\u02f8\u02f9\3\2"+
		"\2\2\u02f9\u02fa\3\2\2\2\u02fa\u031f\7R\2\2\u02fb\u02fc\7\36\2\2\u02fc"+
		"\u031f\5h\65%\u02fd\u02fe\7\35\2\2\u02fe\u031f\5h\65$\u02ff\u0300\7\21"+
		"\2\2\u0300\u031f\5h\65#\u0301\u031f\5j\66\2\u0302\u0304\7O\2\2\u0303\u0305"+
		"\5h\65\2\u0304\u0303\3\2\2\2\u0304\u0305\3\2\2\2\u0305\u0306\3\2\2\2\u0306"+
		"\u031f\7P\2\2\u0307\u0308\7\31\2\2\u0308\u031f\5h\65\34\u0309\u030a\7"+
		"$\2\2\u030a\u031f\5h\65\33\u030b\u030c\7\t\2\2\u030c\u031f\5h\65\32\u030d"+
		"\u030f\7V\2\2\u030e\u0310\5n8\2\u030f\u030e\3\2\2\2\u030f\u0310\3\2\2"+
		"\2\u0310\u0311\3\2\2\2\u0311\u0313\7I\2\2\u0312\u0314\5h\65\2\u0313\u0312"+
		"\3\2\2\2\u0313\u0314\3\2\2\2\u0314\u0315\3\2\2\2\u0315\u031f\7W\2\2\u0316"+
		"\u0317\7A\2\2\u0317\u031f\5h\65\b\u0318\u0319\7L\2\2\u0319\u031a\7A\2"+
		"\2\u031a\u031f\5h\65\7\u031b\u031c\t\5\2\2\u031c\u031f\5h\65\6\u031d\u031f"+
		"\5\66\34\2\u031e\u02f5\3\2\2\2\u031e\u02fb\3\2\2\2\u031e\u02fd\3\2\2\2"+
		"\u031e\u02ff\3\2\2\2\u031e\u0301\3\2\2\2\u031e\u0302\3\2\2\2\u031e\u0307"+
		"\3\2\2\2\u031e\u0309\3\2\2\2\u031e\u030b\3\2\2\2\u031e\u030d\3\2\2\2\u031e"+
		"\u0316\3\2\2\2\u031e\u0318\3\2\2\2\u031e\u031b\3\2\2\2\u031e\u031d\3\2"+
		"\2\2\u031f\u03a1\3\2\2\2\u0320\u0321\f)\2\2\u0321\u0322\7K\2\2\u0322\u03a0"+
		"\5h\65*\u0323\u0324\f\'\2\2\u0324\u0325\7J\2\2\u0325\u03a0\5h\65(\u0326"+
		"\u0327\f\31\2\2\u0327\u0328\7\64\2\2\u0328\u03a0\5h\65\32\u0329\u032a"+
		"\f\30\2\2\u032a\u032b\7+\2\2\u032b\u032c\7\'\2\2\u032c\u03a0\5h\65\31"+
		"\u032d\u032e\f\27\2\2\u032e\u032f\7,\2\2\u032f\u0330\7\'\2\2\u0330\u03a0"+
		"\5h\65\30\u0331\u0332\f\26\2\2\u0332\u0333\7,\2\2\u0333\u03a0\5h\65\27"+
		"\u0334\u0335\f\25\2\2\u0335\u0336\7\'\2\2\u0336\u03a0\5h\65\26\u0337\u0338"+
		"\f\24\2\2\u0338\u0339\7E\2\2\u0339\u03a0\5h\65\25\u033a\u033b\f\23\2\2"+
		"\u033b\u033c\78\2\2\u033c\u03a0\5h\65\24\u033d\u033e\f\21\2\2\u033e\u0340"+
		"\t\6\2\2\u033f\u0341\7E\2\2\u0340\u033f\3\2\2\2\u0340\u0341\3\2\2\2\u0341"+
		"\u0342\3\2\2\2\u0342\u03a0\5h\65\22\u0343\u0344\f\20\2\2\u0344\u0345\t"+
		"\7\2\2\u0345\u03a0\5h\65\21\u0346\u0347\f\17\2\2\u0347\u0349\7C\2\2\u0348"+
		"\u034a\7E\2\2\u0349\u0348\3\2\2\2\u0349\u034a\3\2\2\2\u034a\u034b\3\2"+
		"\2\2\u034b\u03a0\5h\65\20\u034c\u034d\f\16\2\2\u034d\u034f\t\b\2\2\u034e"+
		"\u0350\7E\2\2\u034f\u034e\3\2\2\2\u034f\u0350\3\2\2\2\u0350\u0351\3\2"+
		"\2\2\u0351\u03a0\5h\65\17\u0352\u0353\f\r\2\2\u0353\u0355\t\t\2\2\u0354"+
		"\u0356\7E\2\2\u0355\u0354\3\2\2\2\u0355\u0356\3\2\2\2\u0356\u0357\3\2"+
		"\2\2\u0357\u03a0\5h\65\16\u0358\u0359\f\f\2\2\u0359\u035a\t\n\2\2\u035a"+
		"\u03a0\5h\65\r\u035b\u035c\f\13\2\2\u035c\u035d\t\13\2\2\u035d\u03a0\5"+
		"h\65\f\u035e\u035f\f\n\2\2\u035f\u0361\t\f\2\2\u0360\u0362\7E\2\2\u0361"+
		"\u0360\3\2\2\2\u0361\u0362\3\2\2\2\u0362\u0363\3\2\2\2\u0363\u03a0\5h"+
		"\65\13\u0364\u0365\f\t\2\2\u0365\u0366\7A\2\2\u0366\u03a0\5h\65\n\u0367"+
		"\u0368\f\4\2\2\u0368\u0369\7\67\2\2\u0369\u036a\5h\65\2\u036a\u036b\7"+
		"I\2\2\u036b\u036c\5h\65\5\u036c\u03a0\3\2\2\2\u036d\u036e\f(\2\2\u036e"+
		"\u0370\7Q\2\2\u036f\u0371\5h\65\2\u0370\u036f\3\2\2\2\u0370\u0371\3\2"+
		"\2\2\u0371\u0372\3\2\2\2\u0372\u03a0\7R\2\2\u0373\u0374\f&\2\2\u0374\u0375"+
		"\7)\2\2\u0375\u0378\5h\65\2\u0376\u0377\7*\2\2\u0377\u0379\5h\65\2\u0378"+
		"\u0376\3\2\2\2\u0378\u0379\3\2\2\2\u0379\u03a0\3\2\2\2\u037a\u037b\f!"+
		"\2\2\u037b\u037d\7O\2\2\u037c\u037e\5n8\2\u037d\u037c\3\2\2\2\u037e\u037f"+
		"\3\2\2\2\u037f\u037d\3\2\2\2\u037f\u0380\3\2\2\2\u0380\u0381\3\2\2\2\u0381"+
		"\u0382\7P\2\2\u0382\u03a0\3\2\2\2\u0383\u0384\f \2\2\u0384\u0386\7O\2"+
		"\2\u0385\u0387\5h\65\2\u0386\u0385\3\2\2\2\u0386\u0387\3\2\2\2\u0387\u0388"+
		"\3\2\2\2\u0388\u03a0\7P\2\2\u0389\u038a\f\37\2\2\u038a\u038c\7V\2\2\u038b"+
		"\u038d\5n8\2\u038c\u038b\3\2\2\2\u038c\u038d\3\2\2\2\u038d\u038e\3\2\2"+
		"\2\u038e\u0390\7I\2\2\u038f\u0391\5h\65\2\u0390\u038f\3\2\2\2\u0390\u0391"+
		"\3\2\2\2\u0391\u0392\3\2\2\2\u0392\u03a0\7W\2\2\u0393\u0394\f\36\2\2\u0394"+
		"\u0395\7I\2\2\u0395\u0396\5*\26\2\u0396\u0397\5&\24\2\u0397\u03a0\3\2"+
		"\2\2\u0398\u039d\f\5\2\2\u0399\u039a\79\2\2\u039a\u039e\79\2\2\u039b\u039c"+
		"\7<\2\2\u039c\u039e\7<\2\2\u039d\u0399\3\2\2\2\u039d\u039b\3\2\2\2\u039e"+
		"\u03a0\3\2\2\2\u039f\u0320\3\2\2\2\u039f\u0323\3\2\2\2\u039f\u0326\3\2"+
		"\2\2\u039f\u0329\3\2\2\2\u039f\u032d\3\2\2\2\u039f\u0331\3\2\2\2\u039f"+
		"\u0334\3\2\2\2\u039f\u0337\3\2\2\2\u039f\u033a\3\2\2\2\u039f\u033d\3\2"+
		"\2\2\u039f\u0343\3\2\2\2\u039f\u0346\3\2\2\2\u039f\u034c\3\2\2\2\u039f"+
		"\u0352\3\2\2\2\u039f\u0358\3\2\2\2\u039f\u035b\3\2\2\2\u039f\u035e\3\2"+
		"\2\2\u039f\u0364\3\2\2\2\u039f\u0367\3\2\2\2\u039f\u036d\3\2\2\2\u039f"+
		"\u0373\3\2\2\2\u039f\u037a\3\2\2\2\u039f\u0383\3\2\2\2\u039f\u0389\3\2"+
		"\2\2\u039f\u0393\3\2\2\2\u039f\u0398\3\2\2\2\u03a0\u03a3\3\2\2\2\u03a1"+
		"\u039f\3\2\2\2\u03a1\u03a2\3\2\2\2\u03a2i\3\2\2\2\u03a3\u03a1\3\2\2\2"+
		"\u03a4\u03b0\7\35\2\2\u03a5\u03b0\7G\2\2\u03a6\u03b0\7F\2\2\u03a7\u03a8"+
		"\7\64\2\2\u03a8\u03b0\5l\67\2\u03a9\u03b0\5l\67\2\u03aa\u03b0\7T\2\2\u03ab"+
		"\u03b0\7S\2\2\u03ac\u03b0\7U\2\2\u03ad\u03b0\7\32\2\2\u03ae\u03b0\7\33"+
		"\2\2\u03af\u03a4\3\2\2\2\u03af\u03a5\3\2\2\2\u03af\u03a6\3\2\2\2\u03af"+
		"\u03a7\3\2\2\2\u03af\u03a9\3\2\2\2\u03af\u03aa\3\2\2\2\u03af\u03ab\3\2"+
		"\2\2\u03af\u03ac\3\2\2\2\u03af\u03ad\3\2\2\2\u03af\u03ae\3\2\2\2\u03b0"+
		"k\3\2\2\2\u03b1\u03b2\t\r\2\2\u03b2m\3\2\2\2\u03b3\u03b7\5p9\2\u03b4\u03b7"+
		"\7(\2\2\u03b5\u03b7\5$\23\2\u03b6\u03b3\3\2\2\2\u03b6\u03b4\3\2\2\2\u03b6"+
		"\u03b5\3\2\2\2\u03b7\u03be\3\2\2\2\u03b8\u03ba\7J\2\2\u03b9\u03bb\5n8"+
		"\2\u03ba\u03b9\3\2\2\2\u03ba\u03bb\3\2\2\2\u03bb\u03bd\3\2\2\2\u03bc\u03b8"+
		"\3\2\2\2\u03bd\u03c0\3\2\2\2\u03be\u03bc\3\2\2\2\u03be\u03bf\3\2\2\2\u03bf"+
		"o\3\2\2\2\u03c0\u03be\3\2\2\2\u03c1\u03c2\5l\67\2\u03c2\u03c3\7I\2\2\u03c3"+
		"\u03c5\3\2\2\2\u03c4\u03c1\3\2\2\2\u03c4\u03c5\3\2\2\2\u03c5\u03c7\3\2"+
		"\2\2\u03c6\u03c8\5l\67\2\u03c7\u03c6\3\2\2\2\u03c7\u03c8\3\2\2\2\u03c8"+
		"\u03c9\3\2\2\2\u03c9\u03cb\5l\67\2\u03ca\u03cc\7\67\2\2\u03cb\u03ca\3"+
		"\2\2\2\u03cb\u03cc\3\2\2\2\u03cc\u03d9\3\2\2\2\u03cd\u03ce\5l\67\2\u03ce"+
		"\u03d0\7I\2\2\u03cf\u03d1\7\67\2\2\u03d0\u03cf\3\2\2\2\u03d0\u03d1\3\2"+
		"\2\2\u03d1\u03d9\3\2\2\2\u03d2\u03d3\5l\67\2\u03d3\u03d4\7I\2\2\u03d4"+
		"\u03d6\7E\2\2\u03d5\u03d7\5h\65\2\u03d6\u03d5\3\2\2\2\u03d6\u03d7\3\2"+
		"\2\2\u03d7\u03d9\3\2\2\2\u03d8\u03c4\3\2\2\2\u03d8\u03cd\3\2\2\2\u03d8"+
		"\u03d2\3\2\2\2\u03d9q\3\2\2\2\u0087u\u0085\u0090\u0098\u00a0\u00a2\u00a9"+
		"\u00ad\u00b2\u00bf\u00c7\u00cd\u00d4\u00d8\u00e3\u00e5\u00ec\u00f0\u00f7"+
		"\u00ff\u0108\u0110\u0115\u011c\u0124\u012a\u012d\u0130\u0134\u013a\u0140"+
		"\u0145\u014c\u014f\u0152\u0154\u0159\u015e\u0164\u0168\u016c\u0172\u0177"+
		"\u017c\u0182\u0185\u018c\u019b\u01a1\u01a7\u01a9\u01af\u01b3\u01b6\u01ba"+
		"\u01c0\u01c5\u01c7\u01cc\u01d3\u01d7\u01da\u01e0\u01e6\u01ea\u01ed\u01ef"+
		"\u01f5\u01fc\u01fe\u0208\u020e\u0211\u0214\u0219\u021c\u0221\u0224\u0226"+
		"\u022c\u0231\u0245\u024b\u0252\u0258\u025e\u026d\u0274\u0277\u027b\u0296"+
		"\u029f\u02a6\u02ae\u02b2\u02b6\u02c0\u02c6\u02cb\u02d0\u02d3\u02de\u02e9"+
		"\u02ee\u02f8\u0304\u030f\u0313\u031e\u0340\u0349\u034f\u0355\u0361\u0370"+
		"\u0378\u037f\u0386\u038c\u0390\u039d\u039f\u03a1\u03af\u03b6\u03ba\u03be"+
		"\u03c4\u03c7\u03cb\u03d0\u03d6\u03d8";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}