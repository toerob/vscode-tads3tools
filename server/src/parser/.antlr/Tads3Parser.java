// Generated from /Users/tomasoberg/repos/vscode-tads3tools/server/src/parser/Tads3.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class Tads3Parser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

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
		RULE_program = 0, RULE_directive = 1, RULE_pragmaDirective = 2, RULE_grammarRules = 3, 
		RULE_itemList = 4, RULE_qualifiers = 5, RULE_item = 6, RULE_templateDeclaration = 7, 
		RULE_enumDeclaration = 8, RULE_propertyDeclaration = 9, RULE_dictionaryDeclaration = 10, 
		RULE_exportDeclaration = 11, RULE_intrinsicDeclaration = 12, RULE_intrinsicMethodDeclaration = 13, 
		RULE_objectDeclaration = 14, RULE_grammarDeclaration = 15, RULE_templateExpr = 16, 
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterProgram(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitProgram(this);
		}
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
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 38567766466486306L) != 0) || _la==ID || _la==SEMICOLON) {
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterDirective(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitDirective(this);
		}
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterPragmaDirective(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitPragmaDirective(this);
		}
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterGrammarRules(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitGrammarRules(this);
		}
	}

	public final GrammarRulesContext grammarRules() throws RecognitionException {
		GrammarRulesContext _localctx = new GrammarRulesContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_grammarRules);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(140);
			itemList();
			setState(145);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==BITWISE_OR) {
				{
				{
				setState(141);
				match(BITWISE_OR);
				setState(142);
				itemList();
				}
				}
				setState(147);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterItemList(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitItemList(this);
		}
	}

	public final ItemListContext itemList() throws RecognitionException {
		ItemListContext _localctx = new ItemListContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_itemList);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(149);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
			case 1:
				{
				setState(148);
				qualifiers();
				}
				break;
			}
			setState(154);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(151);
					item(0);
					}
					} 
				}
				setState(156);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterQualifiers(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitQualifiers(this);
		}
	}

	public final QualifiersContext qualifiers() throws RecognitionException {
		QualifiersContext _localctx = new QualifiersContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_qualifiers);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(157);
			match(LEFT_BRACKET);
			setState(158);
			identifierAtom();
			setState(159);
			match(NR);
			setState(160);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterItem(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitItem(this);
		}
	}

	public final ItemContext item() throws RecognitionException {
		return item(0);
	}

	private ItemContext item(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ItemContext _localctx = new ItemContext(_ctx, _parentState);
		ItemContext _prevctx = _localctx;
		int _startState = 12;
		enterRecursionRule(_localctx, 12, RULE_item, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(175);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
			case 1:
				{
				setState(163);
				match(LEFT_PAREN);
				setState(165); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(164);
					item(0);
					}
					}
					setState(167); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2010165L) != 0) );
				setState(169);
				match(RIGHT_PAREN);
				}
				break;
			case 2:
				{
				setState(171);
				match(BITWISE_OR);
				setState(172);
				item(3);
				}
				break;
			case 3:
				{
				setState(173);
				expr(0);
				}
				break;
			case 4:
				{
				setState(174);
				match(STAR);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(181);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ItemContext(_parentctx, _parentState);
					pushNewRecursionContext(_localctx, _startState, RULE_item);
					setState(177);
					if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
					setState(178);
					match(BITWISE_OR);
					}
					} 
				}
				setState(183);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
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

	@SuppressWarnings("CheckReturnValue")
	public static class TemplateDeclarationContext extends ParserRuleContext {
		public IdentifierAtomContext className;
		public ExprContext expr;
		public List<ExprContext> properties = new ArrayList<ExprContext>();
		public Token OPTIONAL;
		public List<Token> isOptional = new ArrayList<Token>();
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterTemplateDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitTemplateDeclaration(this);
		}
	}

	public final TemplateDeclarationContext templateDeclaration() throws RecognitionException {
		TemplateDeclarationContext _localctx = new TemplateDeclarationContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_templateDeclaration);
		int _la;
		try {
			setState(212);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,12,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(184);
				((TemplateDeclarationContext)_localctx).className = identifierAtom();
				setState(185);
				match(TEMPLATE);
				setState(190); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(186);
					((TemplateDeclarationContext)_localctx).expr = expr(0);
					((TemplateDeclarationContext)_localctx).properties.add(((TemplateDeclarationContext)_localctx).expr);
					setState(188);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==OPTIONAL) {
						{
						setState(187);
						((TemplateDeclarationContext)_localctx).OPTIONAL = match(OPTIONAL);
						((TemplateDeclarationContext)_localctx).isOptional.add(((TemplateDeclarationContext)_localctx).OPTIONAL);
						}
					}

					}
					}
					setState(192); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0) );
				setState(194);
				match(SEMICOLON);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(196);
				match(STRING);
				setState(197);
				match(TEMPLATE);
				setState(198);
				match(ARITHMETIC_LEFT);
				setState(205);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & 551903305893L) != 0)) {
					{
					setState(203);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,10,_ctx) ) {
					case 1:
						{
						setState(199);
						identifierAtom();
						}
						break;
					case 2:
						{
						setState(200);
						match(STAR);
						}
						break;
					case 3:
						{
						setState(201);
						match(IS);
						}
						break;
					case 4:
						{
						setState(202);
						match(IN);
						}
						break;
					}
					}
					setState(207);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(208);
				match(ARITHMETIC_RIGHT);
				setState(209);
				((TemplateDeclarationContext)_localctx).templateId = identifierAtom();
				setState(210);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterEnumDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitEnumDeclaration(this);
		}
	}

	public final EnumDeclarationContext enumDeclaration() throws RecognitionException {
		EnumDeclarationContext _localctx = new EnumDeclarationContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_enumDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(214);
			match(ENUM);
			setState(216);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==TOKEN) {
				{
				setState(215);
				((EnumDeclarationContext)_localctx).isToken = match(TOKEN);
				}
			}

			setState(218);
			identifierAtom();
			setState(223);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(219);
				match(COMMA);
				setState(220);
				identifierAtom();
				}
				}
				setState(225);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(226);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterPropertyDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitPropertyDeclaration(this);
		}
	}

	public final PropertyDeclarationContext propertyDeclaration() throws RecognitionException {
		PropertyDeclarationContext _localctx = new PropertyDeclarationContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_propertyDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(231);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(228);
				((PropertyDeclarationContext)_localctx).level = match(PLUS);
				}
				}
				setState(233);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(234);
			((PropertyDeclarationContext)_localctx).isProperty = match(PROPERTY);
			setState(235);
			((PropertyDeclarationContext)_localctx).identifierAtom = identifierAtom();
			((PropertyDeclarationContext)_localctx).identifiers.add(((PropertyDeclarationContext)_localctx).identifierAtom);
			setState(240);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(236);
				match(COMMA);
				setState(237);
				((PropertyDeclarationContext)_localctx).identifierAtom = identifierAtom();
				((PropertyDeclarationContext)_localctx).identifiers.add(((PropertyDeclarationContext)_localctx).identifierAtom);
				}
				}
				setState(242);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(243);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterDictionaryDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitDictionaryDeclaration(this);
		}
	}

	public final DictionaryDeclarationContext dictionaryDeclaration() throws RecognitionException {
		DictionaryDeclarationContext _localctx = new DictionaryDeclarationContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_dictionaryDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(248);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(245);
				((DictionaryDeclarationContext)_localctx).level = match(PLUS);
				}
				}
				setState(250);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(251);
			match(DICTIONARY);
			setState(253);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PROPERTY) {
				{
				setState(252);
				((DictionaryDeclarationContext)_localctx).isProperty = match(PROPERTY);
				}
			}

			setState(255);
			((DictionaryDeclarationContext)_localctx).identifierAtom = identifierAtom();
			((DictionaryDeclarationContext)_localctx).identifiers.add(((DictionaryDeclarationContext)_localctx).identifierAtom);
			setState(260);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(256);
				match(COMMA);
				setState(257);
				((DictionaryDeclarationContext)_localctx).identifierAtom = identifierAtom();
				((DictionaryDeclarationContext)_localctx).identifiers.add(((DictionaryDeclarationContext)_localctx).identifierAtom);
				}
				}
				setState(262);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(263);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterExportDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitExportDeclaration(this);
		}
	}

	public final ExportDeclarationContext exportDeclaration() throws RecognitionException {
		ExportDeclarationContext _localctx = new ExportDeclarationContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_exportDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(265);
			match(EXPORT);
			setState(266);
			identifierAtom();
			setState(268);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SSTR) {
				{
				setState(267);
				match(SSTR);
				}
			}

			setState(270);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterIntrinsicDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitIntrinsicDeclaration(this);
		}
	}

	public final IntrinsicDeclarationContext intrinsicDeclaration() throws RecognitionException {
		IntrinsicDeclarationContext _localctx = new IntrinsicDeclarationContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_intrinsicDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(272);
			match(INTRINSIC);
			setState(274);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==CLASS) {
				{
				setState(273);
				match(CLASS);
				}
			}

			setState(277);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & 2147492005L) != 0)) {
				{
				setState(276);
				((IntrinsicDeclarationContext)_localctx).name = identifierAtom();
				}
			}

			setState(280);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==DSTR || _la==SSTR) {
				{
				setState(279);
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

			setState(284);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COLON) {
				{
				setState(282);
				match(COLON);
				setState(283);
				superTypes();
				}
			}

			setState(286);
			match(LEFT_CURLY);
			setState(290);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 34)) & ~0x3f) == 0 && ((1L << (_la - 34)) & 4294984011L) != 0)) {
				{
				{
				setState(287);
				((IntrinsicDeclarationContext)_localctx).intrinsicMethodDeclaration = intrinsicMethodDeclaration();
				((IntrinsicDeclarationContext)_localctx).methods.add(((IntrinsicDeclarationContext)_localctx).intrinsicMethodDeclaration);
				}
				}
				setState(292);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(293);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterIntrinsicMethodDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitIntrinsicMethodDeclaration(this);
		}
	}

	public final IntrinsicMethodDeclarationContext intrinsicMethodDeclaration() throws RecognitionException {
		IntrinsicMethodDeclarationContext _localctx = new IntrinsicMethodDeclarationContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_intrinsicMethodDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(296);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==STATIC) {
				{
				setState(295);
				match(STATIC);
				}
			}

			setState(298);
			identifierAtom();
			{
			setState(299);
			match(LEFT_PAREN);
			setState(301);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892632973048577888L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
				{
				setState(300);
				params();
				}
			}

			setState(303);
			match(RIGHT_PAREN);
			}
			setState(305);
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

	@SuppressWarnings("CheckReturnValue")
	public static class ObjectDeclarationContext extends ParserRuleContext {
		public Token isClass;
		public Token isModify;
		public Token isReplace;
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
		public TerminalNode TRANSIENT() { return getToken(Tads3Parser.TRANSIENT, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode CLASS() { return getToken(Tads3Parser.CLASS, 0); }
		public TerminalNode MODIFY() { return getToken(Tads3Parser.MODIFY, 0); }
		public TerminalNode REPLACE() { return getToken(Tads3Parser.REPLACE, 0); }
		public TerminalNode COLON() { return getToken(Tads3Parser.COLON, 0); }
		public ObjectDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_objectDeclaration; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterObjectDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitObjectDeclaration(this);
		}
	}

	public final ObjectDeclarationContext objectDeclaration() throws RecognitionException {
		ObjectDeclarationContext _localctx = new ObjectDeclarationContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_objectDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(316);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,31,_ctx) ) {
			case 1:
				{
				setState(308);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==CLASS) {
					{
					setState(307);
					((ObjectDeclarationContext)_localctx).isClass = match(CLASS);
					}
				}

				}
				break;
			case 2:
				{
				setState(311);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==MODIFY) {
					{
					setState(310);
					((ObjectDeclarationContext)_localctx).isModify = match(MODIFY);
					}
				}

				}
				break;
			case 3:
				{
				setState(314);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==REPLACE) {
					{
					setState(313);
					((ObjectDeclarationContext)_localctx).isReplace = match(REPLACE);
					}
				}

				}
				break;
			}
			setState(321);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(318);
				((ObjectDeclarationContext)_localctx).PLUS = match(PLUS);
				((ObjectDeclarationContext)_localctx).level.add(((ObjectDeclarationContext)_localctx).PLUS);
				}
				}
				setState(323);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(325);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==TRANSIENT) {
				{
				setState(324);
				((ObjectDeclarationContext)_localctx).isTransient = match(TRANSIENT);
				}
			}

			setState(333);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,35,_ctx) ) {
			case 1:
				{
				setState(327);
				superTypes();
				}
				break;
			case 2:
				{
				{
				setState(328);
				((ObjectDeclarationContext)_localctx).id = identifierAtom();
				setState(331);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==COLON) {
					{
					setState(329);
					match(COLON);
					setState(330);
					superTypes();
					}
				}

				}
				}
				break;
			}
			setState(337);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LEFT_CURLY:
				{
				setState(335);
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
				setState(336);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterGrammarDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitGrammarDeclaration(this);
		}
	}

	public final GrammarDeclarationContext grammarDeclaration() throws RecognitionException {
		GrammarDeclarationContext _localctx = new GrammarDeclarationContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_grammarDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(341);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case MODIFY:
				{
				setState(339);
				((GrammarDeclarationContext)_localctx).isModify = match(MODIFY);
				}
				break;
			case REPLACE:
				{
				setState(340);
				((GrammarDeclarationContext)_localctx).isReplace = match(REPLACE);
				}
				break;
			case GRAMMAR:
				break;
			default:
				break;
			}
			setState(343);
			match(GRAMMAR);
			setState(344);
			((GrammarDeclarationContext)_localctx).prodName = identifierAtom();
			setState(349);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==LEFT_PAREN) {
				{
				setState(345);
				match(LEFT_PAREN);
				setState(346);
				((GrammarDeclarationContext)_localctx).tag = identifierAtom();
				setState(347);
				match(RIGHT_PAREN);
				}
			}

			setState(351);
			match(COLON);
			setState(352);
			grammarRules();
			setState(353);
			match(COLON);
			setState(359);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
			case 1:
				{
				setState(354);
				superTypes();
				setState(357);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case LEFT_CURLY:
					{
					setState(355);
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
					setState(356);
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

	@SuppressWarnings("CheckReturnValue")
	public static class TemplateExprContext extends ParserRuleContext {
		public Token singleString;
		public ExprContext atLocation;
		public Token doubleString;
		public IdentifierAtomContext connection;
		public ExprContext expression;
		public Token op;
		public IdentifierAtomContext id;
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
		public TerminalNode OPTIONAL() { return getToken(Tads3Parser.OPTIONAL, 0); }
		public TerminalNode PLUS() { return getToken(Tads3Parser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(Tads3Parser.MINUS, 0); }
		public TerminalNode STAR() { return getToken(Tads3Parser.STAR, 0); }
		public TerminalNode DIV() { return getToken(Tads3Parser.DIV, 0); }
		public TerminalNode MOD() { return getToken(Tads3Parser.MOD, 0); }
		public TerminalNode AMP() { return getToken(Tads3Parser.AMP, 0); }
		public TerminalNode NOT() { return getToken(Tads3Parser.NOT, 0); }
		public TerminalNode TILDE() { return getToken(Tads3Parser.TILDE, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TemplateExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_templateExpr; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterTemplateExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitTemplateExpr(this);
		}
	}

	public final TemplateExprContext templateExpr() throws RecognitionException {
		TemplateExprContext _localctx = new TemplateExprContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_templateExpr);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(379);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,43,_ctx) ) {
			case 1:
				{
				setState(361);
				((TemplateExprContext)_localctx).singleString = match(SSTR);
				}
				break;
			case 2:
				{
				setState(362);
				match(AT);
				setState(363);
				((TemplateExprContext)_localctx).atLocation = expr(0);
				}
				break;
			case 3:
				{
				setState(364);
				((TemplateExprContext)_localctx).doubleString = match(DSTR);
				}
				break;
			case 4:
				{
				setState(365);
				match(ARROW);
				setState(368);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,41,_ctx) ) {
				case 1:
					{
					setState(366);
					((TemplateExprContext)_localctx).connection = identifierAtom();
					}
					break;
				case 2:
					{
					setState(367);
					((TemplateExprContext)_localctx).expression = expr(0);
					}
					break;
				}
				}
				break;
			case 5:
				{
				setState(370);
				((TemplateExprContext)_localctx).op = _input.LT(1);
				_la = _input.LA(1);
				if ( !(((((_la - 50)) & ~0x3f) == 0 && ((1L << (_la - 50)) & 16802277L) != 0)) ) {
					((TemplateExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
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
					((TemplateExprContext)_localctx).id = identifierAtom();
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
			case 6:
				{
				setState(375);
				match(LEFT_BRACKET);
				setState(376);
				array();
				setState(377);
				match(RIGHT_BRACKET);
				}
				break;
			}
			setState(382);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==OPTIONAL) {
				{
				setState(381);
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

	@SuppressWarnings("CheckReturnValue")
	public static class ArrayContext extends ParserRuleContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(Tads3Parser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(Tads3Parser.COMMA, i);
		}
		public ArrayContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_array; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterArray(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitArray(this);
		}
	}

	public final ArrayContext array() throws RecognitionException {
		ArrayContext _localctx = new ArrayContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_array);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(384);
			expr(0);
			setState(389);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,45,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(385);
					match(COMMA);
					setState(386);
					expr(0);
					}
					} 
				}
				setState(391);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,45,_ctx);
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

	@SuppressWarnings("CheckReturnValue")
	public static class CurlyObjectBodyContext extends ParserRuleContext {
		public TerminalNode LEFT_CURLY() { return getToken(Tads3Parser.LEFT_CURLY, 0); }
		public ObjectBodyContext objectBody() {
			return getRuleContext(ObjectBodyContext.class,0);
		}
		public TerminalNode RIGHT_CURLY() { return getToken(Tads3Parser.RIGHT_CURLY, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public CurlyObjectBodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_curlyObjectBody; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterCurlyObjectBody(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitCurlyObjectBody(this);
		}
	}

	public final CurlyObjectBodyContext curlyObjectBody() throws RecognitionException {
		CurlyObjectBodyContext _localctx = new CurlyObjectBodyContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_curlyObjectBody);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(392);
			match(LEFT_CURLY);
			setState(393);
			objectBody();
			setState(395);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SEMICOLON) {
				{
				setState(394);
				match(SEMICOLON);
				}
			}

			setState(397);
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

	@SuppressWarnings("CheckReturnValue")
	public static class SemiColonEndedObjectBodyContext extends ParserRuleContext {
		public ObjectBodyContext objectBody() {
			return getRuleContext(ObjectBodyContext.class,0);
		}
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public SemiColonEndedObjectBodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_semiColonEndedObjectBody; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterSemiColonEndedObjectBody(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitSemiColonEndedObjectBody(this);
		}
	}

	public final SemiColonEndedObjectBodyContext semiColonEndedObjectBody() throws RecognitionException {
		SemiColonEndedObjectBodyContext _localctx = new SemiColonEndedObjectBodyContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_semiColonEndedObjectBody);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(399);
			objectBody();
			setState(400);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterSuperTypes(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitSuperTypes(this);
		}
	}

	public final SuperTypesContext superTypes() throws RecognitionException {
		SuperTypesContext _localctx = new SuperTypesContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_superTypes);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(402);
			((SuperTypesContext)_localctx).identifierAtom = identifierAtom();
			((SuperTypesContext)_localctx).superType.add(((SuperTypesContext)_localctx).identifierAtom);
			setState(407);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,47,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(403);
					match(COMMA);
					setState(404);
					superTypes();
					}
					} 
				}
				setState(409);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterObjectBody(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitObjectBody(this);
		}
	}

	public final ObjectBodyContext objectBody() throws RecognitionException {
		ObjectBodyContext _localctx = new ObjectBodyContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_objectBody);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			{
			setState(413);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 49)) & ~0x3f) == 0 && ((1L << (_la - 49)) & 13992248267L) != 0)) {
				{
				{
				setState(410);
				((ObjectBodyContext)_localctx).templateExpr = templateExpr();
				((ObjectBodyContext)_localctx).template.add(((ObjectBodyContext)_localctx).templateExpr);
				}
				}
				setState(415);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(421);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 5)) & ~0x3f) == 0 && ((1L << (_la - 5)) & 2305851983145220097L) != 0)) {
				{
				setState(419);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,49,_ctx) ) {
				case 1:
					{
					setState(416);
					((ObjectBodyContext)_localctx).functionDeclaration = functionDeclaration();
					((ObjectBodyContext)_localctx).functions.add(((ObjectBodyContext)_localctx).functionDeclaration);
					}
					break;
				case 2:
					{
					setState(417);
					((ObjectBodyContext)_localctx).property = property();
					((ObjectBodyContext)_localctx).properties.add(((ObjectBodyContext)_localctx).property);
					}
					break;
				case 3:
					{
					setState(418);
					((ObjectBodyContext)_localctx).propertySet = propertySet();
					((ObjectBodyContext)_localctx).propertySets.add(((ObjectBodyContext)_localctx).propertySet);
					}
					break;
				}
				}
				setState(423);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterProperty(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitProperty(this);
		}
	}

	public final PropertyContext property() throws RecognitionException {
		PropertyContext _localctx = new PropertyContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_property);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(424);
			((PropertyContext)_localctx).id = identifierAtom();
			setState(451);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN:
				{
				setState(425);
				match(ASSIGN);
				setState(427);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,51,_ctx) ) {
				case 1:
					{
					setState(426);
					match(STATIC);
					}
					break;
				}
				setState(431);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,52,_ctx) ) {
				case 1:
					{
					setState(429);
					expr(0);
					}
					break;
				case 2:
					{
					setState(430);
					dictionaryProperty();
					}
					break;
				}
				setState(434);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,53,_ctx) ) {
				case 1:
					{
					setState(433);
					match(SEMICOLON);
					}
					break;
				}
				}
				break;
			case COLON:
				{
				setState(436);
				match(COLON);
				setState(438);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & 2147492005L) != 0)) {
					{
					setState(437);
					((PropertyContext)_localctx).objectName = identifierAtom();
					}
				}

				setState(444);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==COMMA) {
					{
					{
					setState(440);
					match(COMMA);
					setState(441);
					superTypes();
					}
					}
					setState(446);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(447);
				curlyObjectBody();
				setState(449);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,56,_ctx) ) {
				case 1:
					{
					setState(448);
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

	@SuppressWarnings("CheckReturnValue")
	public static class DictionaryPropertyContext extends ParserRuleContext {
		public List<TerminalNode> SSTR() { return getTokens(Tads3Parser.SSTR); }
		public TerminalNode SSTR(int i) {
			return getToken(Tads3Parser.SSTR, i);
		}
		public DictionaryPropertyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dictionaryProperty; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterDictionaryProperty(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitDictionaryProperty(this);
		}
	}

	public final DictionaryPropertyContext dictionaryProperty() throws RecognitionException {
		DictionaryPropertyContext _localctx = new DictionaryPropertyContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_dictionaryProperty);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(456);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==SSTR) {
				{
				{
				setState(453);
				match(SSTR);
				}
				}
				setState(458);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterPropertySet(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitPropertySet(this);
		}
	}

	public final PropertySetContext propertySet() throws RecognitionException {
		PropertySetContext _localctx = new PropertySetContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_propertySet);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(470);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,61,_ctx) ) {
			case 1:
				{
				setState(459);
				match(PROPERTYSET);
				setState(460);
				paramsWithWildcard();
				}
				break;
			case 2:
				{
				setState(461);
				match(PROPERTYSET);
				setState(463);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==SSTR) {
					{
					setState(462);
					((PropertySetContext)_localctx).prefix = match(SSTR);
					}
				}

				setState(465);
				match(LEFT_PAREN);
				setState(467);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (((((_la - 24)) & ~0x3f) == 0 && ((1L << (_la - 24)) & 1009989391126702091L) != 0)) {
					{
					setState(466);
					paramsWithWildcard();
					}
				}

				setState(469);
				match(RIGHT_PAREN);
				}
				break;
			}
			setState(472);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterParamsWithWildcard(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitParamsWithWildcard(this);
		}
	}

	public final ParamsWithWildcardContext paramsWithWildcard() throws RecognitionException {
		ParamsWithWildcardContext _localctx = new ParamsWithWildcardContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_paramsWithWildcard);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(476);
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
				setState(474);
				((ParamsWithWildcardContext)_localctx).primary = primary();
				((ParamsWithWildcardContext)_localctx).parameters.add(((ParamsWithWildcardContext)_localctx).primary);
				}
				break;
			case STAR:
				{
				setState(475);
				match(STAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(482);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,63,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(478);
					match(COMMA);
					setState(479);
					paramsWithWildcard();
					}
					} 
				}
				setState(484);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterFunctionDeclaration(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitFunctionDeclaration(this);
		}
	}

	public final FunctionDeclarationContext functionDeclaration() throws RecognitionException {
		FunctionDeclarationContext _localctx = new FunctionDeclarationContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_functionDeclaration);
		int _la;
		try {
			setState(497);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,67,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(491);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,66,_ctx) ) {
				case 1:
					{
					setState(486);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==MODIFY) {
						{
						setState(485);
						((FunctionDeclarationContext)_localctx).isModify = match(MODIFY);
						}
					}

					}
					break;
				case 2:
					{
					setState(489);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==REPLACE) {
						{
						setState(488);
						((FunctionDeclarationContext)_localctx).isReplace = match(REPLACE);
						}
					}

					}
					break;
				}
				{
				setState(493);
				functionHead();
				setState(494);
				codeBlock();
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(496);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterOperatorOverride(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitOperatorOverride(this);
		}
	}

	public final OperatorOverrideContext operatorOverride() throws RecognitionException {
		OperatorOverrideContext _localctx = new OperatorOverrideContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_operatorOverride);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(499);
			match(OPERATOR);
			setState(506);
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
				setState(500);
				_la = _input.LA(1);
				if ( !(((((_la - 50)) & ~0x3f) == 0 && ((1L << (_la - 50)) & 6734559101409L) != 0)) ) {
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
				setState(501);
				match(LEFT_BRACKET);
				setState(502);
				match(RIGHT_BRACKET);
				setState(504);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==ASSIGN) {
					{
					setState(503);
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
			setState(508);
			match(LEFT_PAREN);
			setState(509);
			params();
			setState(510);
			match(RIGHT_PAREN);
			}
			setState(512);
			match(LEFT_CURLY);
			setState(516);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892571597962246428L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2012213L) != 0)) {
				{
				{
				setState(513);
				stats();
				}
				}
				setState(518);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(519);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterFunctionHead(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitFunctionHead(this);
		}
	}

	public final FunctionHeadContext functionHead() throws RecognitionException {
		FunctionHeadContext _localctx = new FunctionHeadContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_functionHead);
		int _la;
		try {
			setState(546);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,78,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(522);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==EXTERN) {
					{
					setState(521);
					((FunctionHeadContext)_localctx).isExtern = match(EXTERN);
					}
				}

				setState(525);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==STATIC) {
					{
					setState(524);
					((FunctionHeadContext)_localctx).isStatic = match(STATIC);
					}
				}

				setState(528);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==FUNCTION) {
					{
					setState(527);
					match(FUNCTION);
					}
				}

				setState(530);
				identifierAtom();
				setState(536);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,75,_ctx) ) {
				case 1:
					{
					setState(531);
					match(LEFT_PAREN);
					setState(533);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892632973048577888L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
						{
						setState(532);
						params();
						}
					}

					setState(535);
					match(RIGHT_PAREN);
					}
					break;
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(538);
				match(FUNCTION);
				setState(544);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,77,_ctx) ) {
				case 1:
					{
					setState(539);
					match(LEFT_PAREN);
					setState(541);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892632973048577888L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
						{
						setState(540);
						params();
						}
					}

					setState(543);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterCodeBlock(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitCodeBlock(this);
		}
	}

	public final CodeBlockContext codeBlock() throws RecognitionException {
		CodeBlockContext _localctx = new CodeBlockContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_codeBlock);
		int _la;
		try {
			setState(557);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,80,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(548);
				match(LEFT_CURLY);
				setState(552);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892571597962246428L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2012213L) != 0)) {
					{
					{
					setState(549);
					stats();
					}
					}
					setState(554);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(555);
				match(RIGHT_CURLY);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(556);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterStats(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitStats(this);
		}
	}

	public final StatsContext stats() throws RecognitionException {
		StatsContext _localctx = new StatsContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_stats);
		try {
			setState(577);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,81,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(559);
				assignmentStatement();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(560);
				ifStatement();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(561);
				tryCatchStatement();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(562);
				forStatement();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(563);
				doWhileStatement();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(564);
				whileStatement();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(565);
				switchStatement();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(566);
				forInStatement();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(567);
				forEachStatement();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(568);
				sayStatement();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(569);
				emptyStatement();
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(570);
				returnStatement();
				}
				break;
			case 13:
				enterOuterAlt(_localctx, 13);
				{
				setState(571);
				throwStatement();
				}
				break;
			case 14:
				enterOuterAlt(_localctx, 14);
				{
				setState(572);
				labelStatement();
				}
				break;
			case 15:
				enterOuterAlt(_localctx, 15);
				{
				setState(573);
				breakStatement();
				}
				break;
			case 16:
				enterOuterAlt(_localctx, 16);
				{
				setState(574);
				continueStatement();
				}
				break;
			case 17:
				enterOuterAlt(_localctx, 17);
				{
				setState(575);
				gotoStatement();
				}
				break;
			case 18:
				enterOuterAlt(_localctx, 18);
				{
				setState(576);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterInnerCodeBlock(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitInnerCodeBlock(this);
		}
	}

	public final InnerCodeBlockContext innerCodeBlock() throws RecognitionException {
		InnerCodeBlockContext _localctx = new InnerCodeBlockContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_innerCodeBlock);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(579);
			match(LEFT_CURLY);
			setState(583);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892571597962246428L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2012213L) != 0)) {
				{
				{
				setState(580);
				stats();
				}
				}
				setState(585);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(586);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterGotoStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitGotoStatement(this);
		}
	}

	public final GotoStatementContext gotoStatement() throws RecognitionException {
		GotoStatementContext _localctx = new GotoStatementContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_gotoStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(588);
			match(GOTO);
			setState(590);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & 2147492005L) != 0)) {
				{
				setState(589);
				((GotoStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(592);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterBreakStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitBreakStatement(this);
		}
	}

	public final BreakStatementContext breakStatement() throws RecognitionException {
		BreakStatementContext _localctx = new BreakStatementContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_breakStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(594);
			match(BREAK);
			setState(596);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & 2147492005L) != 0)) {
				{
				setState(595);
				((BreakStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(598);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterContinueStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitContinueStatement(this);
		}
	}

	public final ContinueStatementContext continueStatement() throws RecognitionException {
		ContinueStatementContext _localctx = new ContinueStatementContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_continueStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(600);
			match(CONTINUE);
			setState(602);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & 2147492005L) != 0)) {
				{
				setState(601);
				((ContinueStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(604);
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

	@SuppressWarnings("CheckReturnValue")
	public static class LabelStatementContext extends ParserRuleContext {
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode COLON() { return getToken(Tads3Parser.COLON, 0); }
		public LabelStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_labelStatement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterLabelStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitLabelStatement(this);
		}
	}

	public final LabelStatementContext labelStatement() throws RecognitionException {
		LabelStatementContext _localctx = new LabelStatementContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_labelStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(606);
			identifierAtom();
			setState(607);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterSwitchStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitSwitchStatement(this);
		}
	}

	public final SwitchStatementContext switchStatement() throws RecognitionException {
		SwitchStatementContext _localctx = new SwitchStatementContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_switchStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(609);
			match(SWITCH);
			setState(610);
			match(LEFT_PAREN);
			setState(611);
			expr(0);
			setState(612);
			match(RIGHT_PAREN);
			setState(613);
			match(LEFT_CURLY);
			setState(631);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CASE || _la==DEFAULT) {
				{
				{
				setState(617);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case CASE:
					{
					{
					setState(614);
					match(CASE);
					setState(615);
					expr(0);
					}
					}
					break;
				case DEFAULT:
					{
					setState(616);
					match(DEFAULT);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(619);
				match(COLON);
				setState(627);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,88,_ctx) ) {
				case 1:
					{
					setState(620);
					codeBlock();
					}
					break;
				case 2:
					{
					setState(624);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892571597962246428L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2012213L) != 0)) {
						{
						{
						setState(621);
						stats();
						}
						}
						setState(626);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					}
					break;
				}
				}
				}
				setState(633);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(634);
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

	@SuppressWarnings("CheckReturnValue")
	public static class ThrowStatementContext extends ParserRuleContext {
		public TerminalNode THROW() { return getToken(Tads3Parser.THROW, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ThrowStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_throwStatement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterThrowStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitThrowStatement(this);
		}
	}

	public final ThrowStatementContext throwStatement() throws RecognitionException {
		ThrowStatementContext _localctx = new ThrowStatementContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_throwStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(636);
			match(THROW);
			setState(637);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterForInStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitForInStatement(this);
		}
	}

	public final ForInStatementContext forInStatement() throws RecognitionException {
		ForInStatementContext _localctx = new ForInStatementContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_forInStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(639);
			match(FOR);
			setState(640);
			match(LEFT_PAREN);
			setState(641);
			match(LOCAL);
			setState(642);
			match(ID);
			setState(643);
			match(IN);
			setState(644);
			expr(0);
			setState(645);
			match(RIGHT_PAREN);
			setState(646);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterForEachStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitForEachStatement(this);
		}
	}

	public final ForEachStatementContext forEachStatement() throws RecognitionException {
		ForEachStatementContext _localctx = new ForEachStatementContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_forEachStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(648);
			match(FOREACH);
			setState(649);
			match(LEFT_PAREN);
			setState(650);
			expr(0);
			setState(651);
			match(IN);
			setState(652);
			expr(0);
			setState(653);
			match(RIGHT_PAREN);
			setState(654);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterReturnStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitReturnStatement(this);
		}
	}

	public final ReturnStatementContext returnStatement() throws RecognitionException {
		ReturnStatementContext _localctx = new ReturnStatementContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_returnStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(656);
			match(RETURN);
			setState(658);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
				{
				setState(657);
				expr(0);
				}
			}

			setState(660);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterDoWhileStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitDoWhileStatement(this);
		}
	}

	public final DoWhileStatementContext doWhileStatement() throws RecognitionException {
		DoWhileStatementContext _localctx = new DoWhileStatementContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_doWhileStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(662);
			match(DO);
			setState(663);
			codeBlock();
			setState(664);
			match(WHILE);
			setState(665);
			match(LEFT_PAREN);
			setState(667);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
				{
				setState(666);
				expr(0);
				}
			}

			setState(669);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterWhileStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitWhileStatement(this);
		}
	}

	public final WhileStatementContext whileStatement() throws RecognitionException {
		WhileStatementContext _localctx = new WhileStatementContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_whileStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(671);
			match(WHILE);
			setState(672);
			match(LEFT_PAREN);
			setState(674);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
				{
				setState(673);
				expr(0);
				}
			}

			setState(676);
			match(RIGHT_PAREN);
			setState(677);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterForStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitForStatement(this);
		}
	}

	public final ForStatementContext forStatement() throws RecognitionException {
		ForStatementContext _localctx = new ForStatementContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_forStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(679);
			match(FOR);
			setState(680);
			match(LEFT_PAREN);
			setState(682);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
				{
				setState(681);
				expr(0);
				}
			}

			setState(684);
			match(SEMICOLON);
			setState(686);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
				{
				setState(685);
				expr(0);
				}
			}

			setState(688);
			match(SEMICOLON);
			setState(690);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
				{
				setState(689);
				expr(0);
				}
			}

			setState(692);
			match(RIGHT_PAREN);
			setState(693);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterTryCatchStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitTryCatchStatement(this);
		}
	}

	public final TryCatchStatementContext tryCatchStatement() throws RecognitionException {
		TryCatchStatementContext _localctx = new TryCatchStatementContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_tryCatchStatement);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(695);
			match(TRY);
			setState(696);
			codeBlock();
			setState(706);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,97,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(697);
					match(CATCH);
					setState(698);
					match(LEFT_PAREN);
					setState(700);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892632973048577888L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
						{
						setState(699);
						params();
						}
					}

					setState(702);
					match(RIGHT_PAREN);
					setState(703);
					codeBlock();
					}
					} 
				}
				setState(708);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,97,_ctx);
			}
			setState(711);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,98,_ctx) ) {
			case 1:
				{
				setState(709);
				match(FINALLY);
				setState(710);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterCallStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitCallStatement(this);
		}
	}

	public final CallStatementContext callStatement() throws RecognitionException {
		CallStatementContext _localctx = new CallStatementContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_callStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(713);
			expr(0);
			setState(716);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,99,_ctx) ) {
			case 1:
				{
				setState(714);
				match(DOT);
				setState(715);
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

	@SuppressWarnings("CheckReturnValue")
	public static class EmptyStatementContext extends ParserRuleContext {
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public EmptyStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_emptyStatement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterEmptyStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitEmptyStatement(this);
		}
	}

	public final EmptyStatementContext emptyStatement() throws RecognitionException {
		EmptyStatementContext _localctx = new EmptyStatementContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_emptyStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(719);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
				{
				setState(718);
				expr(0);
				}
			}

			setState(721);
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

	@SuppressWarnings("CheckReturnValue")
	public static class SayStatementContext extends ParserRuleContext {
		public TerminalNode DSTR() { return getToken(Tads3Parser.DSTR, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
		public SayStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sayStatement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterSayStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitSayStatement(this);
		}
	}

	public final SayStatementContext sayStatement() throws RecognitionException {
		SayStatementContext _localctx = new SayStatementContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_sayStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(723);
			match(DSTR);
			setState(724);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterAssignmentStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitAssignmentStatement(this);
		}
	}

	public final AssignmentStatementContext assignmentStatement() throws RecognitionException {
		AssignmentStatementContext _localctx = new AssignmentStatementContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_assignmentStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(726);
			match(LOCAL);
			setState(727);
			identifierAtom();
			setState(730);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ASSIGN) {
				{
				setState(728);
				match(ASSIGN);
				setState(729);
				expr(0);
				}
			}

			setState(732);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterIfStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitIfStatement(this);
		}
	}

	public final IfStatementContext ifStatement() throws RecognitionException {
		IfStatementContext _localctx = new IfStatementContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_ifStatement);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(734);
			match(IF);
			setState(735);
			((IfStatementContext)_localctx).ifExprAndBlock = enclosedExprCodeBlock();
			setState(741);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,102,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(736);
					match(ELSE);
					setState(737);
					match(IF);
					setState(738);
					((IfStatementContext)_localctx).elseIfExprAndBlock = enclosedExprCodeBlock();
					}
					} 
				}
				setState(743);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,102,_ctx);
			}
			setState(746);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,103,_ctx) ) {
			case 1:
				{
				setState(744);
				match(ELSE);
				setState(745);
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterEnclosedExprCodeBlock(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitEnclosedExprCodeBlock(this);
		}
	}

	public final EnclosedExprCodeBlockContext enclosedExprCodeBlock() throws RecognitionException {
		EnclosedExprCodeBlockContext _localctx = new EnclosedExprCodeBlockContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_enclosedExprCodeBlock);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(748);
			match(LEFT_PAREN);
			setState(749);
			((EnclosedExprCodeBlockContext)_localctx).expression = expr(0);
			setState(750);
			match(RIGHT_PAREN);
			setState(751);
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

	@SuppressWarnings("CheckReturnValue")
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
	@SuppressWarnings("CheckReturnValue")
	public static class NewExprContext extends ExprContext {
		public TerminalNode NEW() { return getToken(Tads3Parser.NEW, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public NewExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterNewExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitNewExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class AssignmentExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode ASSIGN() { return getToken(Tads3Parser.ASSIGN, 0); }
		public AssignmentExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterAssignmentExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitAssignmentExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterExprWithParenExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitExprWithParenExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class AnonymousFunctionExprContext extends ExprContext {
		public FunctionDeclarationContext functionDeclaration() {
			return getRuleContext(FunctionDeclarationContext.class,0);
		}
		public AnonymousFunctionExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterAnonymousFunctionExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitAnonymousFunctionExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ReferenceExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode AMP() { return getToken(Tads3Parser.AMP, 0); }
		public ReferenceExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterReferenceExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitReferenceExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class DelegatedExpressionContext extends ExprContext {
		public TerminalNode DELEGATED() { return getToken(Tads3Parser.DELEGATED, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public DelegatedExpressionContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterDelegatedExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitDelegatedExpression(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterAdditiveExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitAdditiveExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ArrowExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode ARROW() { return getToken(Tads3Parser.ARROW, 0); }
		public ArrowExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterArrowExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitArrowExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		public TerminalNode STAR() { return getToken(Tads3Parser.STAR, 0); }
		public UnaryExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterUnaryExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitUnaryExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class PrimaryExprContext extends ExprContext {
		public PrimaryContext primary() {
			return getRuleContext(PrimaryContext.class,0);
		}
		public PrimaryExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterPrimaryExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitPrimaryExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterTernaryExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitTernaryExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ParenExpr2Context extends ExprContext {
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ParenExpr2Context(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterParenExpr2(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitParenExpr2(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterIsExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitIsExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class LocalExprContext extends ExprContext {
		public TerminalNode LOCAL() { return getToken(Tads3Parser.LOCAL, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public LocalExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterLocalExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitLocalExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterPostFixExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitPostFixExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ArrayExprContext extends ExprContext {
		public TerminalNode LEFT_BRACKET() { return getToken(Tads3Parser.LEFT_BRACKET, 0); }
		public TerminalNode RIGHT_BRACKET() { return getToken(Tads3Parser.RIGHT_BRACKET, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ArrayExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterArrayExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitArrayExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class StaticExprContext extends ExprContext {
		public TerminalNode STATIC() { return getToken(Tads3Parser.STATIC, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public StaticExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterStaticExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitStaticExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ExprWithAnonymousObjectExpr2Context extends ExprContext {
		public TerminalNode ID() { return getToken(Tads3Parser.ID, 0); }
		public CurlyObjectBodyContext curlyObjectBody() {
			return getRuleContext(CurlyObjectBodyContext.class,0);
		}
		public ExprWithAnonymousObjectExpr2Context(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterExprWithAnonymousObjectExpr2(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitExprWithAnonymousObjectExpr2(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class InExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode IN() { return getToken(Tads3Parser.IN, 0); }
		public InExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterInExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitInExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class IfNilExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode IFNIL() { return getToken(Tads3Parser.IFNIL, 0); }
		public IfNilExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterIfNilExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitIfNilExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterMemberExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitMemberExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ArrowExpr2Context extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode ARROW() { return getToken(Tads3Parser.ARROW, 0); }
		public ArrowExpr2Context(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterArrowExpr2(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitArrowExpr2(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ArrowExpr3Context extends ExprContext {
		public TerminalNode STAR() { return getToken(Tads3Parser.STAR, 0); }
		public TerminalNode ARROW() { return getToken(Tads3Parser.ARROW, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ArrowExpr3Context(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterArrowExpr3(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitArrowExpr3(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterRelationalExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitRelationalExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class TransientExpressionContext extends ExprContext {
		public TerminalNode TRANSIENT() { return getToken(Tads3Parser.TRANSIENT, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TransientExpressionContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterTransientExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitTransientExpression(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterBitwiseExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitBitwiseExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterIndexExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitIndexExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterPowerOfExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitPowerOfExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class CommaExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode COMMA() { return getToken(Tads3Parser.COMMA, 0); }
		public CommaExprContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterCommaExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitCommaExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterNotInExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitNotInExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterAnonymousObjectExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitAnonymousObjectExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class InheritedExpressionContext extends ExprContext {
		public TerminalNode INHERITED() { return getToken(Tads3Parser.INHERITED, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public InheritedExpressionContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterInheritedExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitInheritedExpression(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterMultiplicationExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitMultiplicationExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterAndOrExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitAndOrExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterExprWithAnonymousObjectExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitExprWithAnonymousObjectExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterExprWithAnonymousObjectUsingMultipleSuperTypesExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitExprWithAnonymousObjectUsingMultipleSuperTypesExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterEqualityExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitEqualityExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterRangeExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitRangeExpr(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterCallWithParamsExpr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitCallWithParamsExpr(this);
		}
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

				setState(754);
				match(LEFT_BRACKET);
				setState(756);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
					{
					setState(755);
					expr(0);
					}
				}

				setState(758);
				match(RIGHT_BRACKET);
				}
				break;
			case 2:
				{
				_localctx = new DelegatedExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(759);
				match(DELEGATED);
				setState(760);
				expr(37);
				}
				break;
			case 3:
				{
				_localctx = new InheritedExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(761);
				match(INHERITED);
				setState(762);
				expr(36);
				}
				break;
			case 4:
				{
				_localctx = new TransientExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(763);
				match(TRANSIENT);
				setState(764);
				expr(35);
				}
				break;
			case 5:
				{
				_localctx = new PrimaryExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(765);
				primary();
				}
				break;
			case 6:
				{
				_localctx = new ExprWithAnonymousObjectExpr2Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(766);
				match(ID);
				setState(767);
				curlyObjectBody();
				}
				break;
			case 7:
				{
				_localctx = new ParenExpr2Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(768);
				match(LEFT_PAREN);
				setState(770);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
					{
					setState(769);
					expr(0);
					}
				}

				setState(772);
				match(RIGHT_PAREN);
				}
				break;
			case 8:
				{
				_localctx = new LocalExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(773);
				match(LOCAL);
				setState(774);
				expr(27);
				}
				break;
			case 9:
				{
				_localctx = new StaticExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(775);
				match(STATIC);
				setState(776);
				expr(26);
				}
				break;
			case 10:
				{
				_localctx = new NewExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(777);
				match(NEW);
				setState(778);
				expr(25);
				}
				break;
			case 11:
				{
				_localctx = new AnonymousObjectExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(779);
				match(LEFT_CURLY);
				setState(781);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892632973048577888L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
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
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
					{
					setState(784);
					expr(0);
					}
				}

				setState(787);
				match(RIGHT_CURLY);
				}
				break;
			case 12:
				{
				_localctx = new ArrowExpr2Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				{
				setState(788);
				match(ARROW);
				}
				setState(789);
				expr(12);
				}
				break;
			case 13:
				{
				_localctx = new ArrowExpr3Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(790);
				match(STAR);
				setState(791);
				match(ARROW);
				setState(792);
				expr(11);
				}
				break;
			case 14:
				{
				_localctx = new UnaryExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(793);
				_la = _input.LA(1);
				if ( !(((((_la - 49)) & ~0x3f) == 0 && ((1L << (_la - 49)) & 33587787L) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(794);
				expr(5);
				}
				break;
			case 15:
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
						if (!(precpred(_ctx, 40))) throw new FailedPredicateException(this, "precpred(_ctx, 40)");
						setState(799);
						match(DOT);
						setState(800);
						((MemberExprContext)_localctx).next = expr(41);
						}
						break;
					case 2:
						{
						_localctx = new ReferenceExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(801);
						if (!(precpred(_ctx, 24))) throw new FailedPredicateException(this, "precpred(_ctx, 24)");
						setState(802);
						match(AMP);
						setState(803);
						expr(25);
						}
						break;
					case 3:
						{
						_localctx = new NotInExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(804);
						if (!(precpred(_ctx, 23))) throw new FailedPredicateException(this, "precpred(_ctx, 23)");
						setState(805);
						match(LITERAL_NOT);
						setState(806);
						match(IN);
						setState(807);
						expr(24);
						}
						break;
					case 4:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(808);
						if (!(precpred(_ctx, 22))) throw new FailedPredicateException(this, "precpred(_ctx, 22)");
						setState(809);
						match(IS);
						setState(810);
						match(IN);
						setState(811);
						expr(23);
						}
						break;
					case 5:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(812);
						if (!(precpred(_ctx, 21))) throw new FailedPredicateException(this, "precpred(_ctx, 21)");
						setState(813);
						match(IS);
						setState(814);
						expr(22);
						}
						break;
					case 6:
						{
						_localctx = new InExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(815);
						if (!(precpred(_ctx, 20))) throw new FailedPredicateException(this, "precpred(_ctx, 20)");
						setState(816);
						match(IN);
						setState(817);
						expr(21);
						}
						break;
					case 7:
						{
						_localctx = new AssignmentExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(818);
						if (!(precpred(_ctx, 19))) throw new FailedPredicateException(this, "precpred(_ctx, 19)");
						setState(819);
						match(ASSIGN);
						setState(820);
						expr(20);
						}
						break;
					case 8:
						{
						_localctx = new IfNilExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(821);
						if (!(precpred(_ctx, 18))) throw new FailedPredicateException(this, "precpred(_ctx, 18)");
						setState(822);
						match(IFNIL);
						setState(823);
						expr(19);
						}
						break;
					case 9:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(824);
						if (!(precpred(_ctx, 16))) throw new FailedPredicateException(this, "precpred(_ctx, 16)");
						setState(825);
						_la = _input.LA(1);
						if ( !(_la==AMP || _la==BITWISE_OR) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(827);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(826);
							match(ASSIGN);
							}
						}

						setState(829);
						expr(17);
						}
						break;
					case 10:
						{
						_localctx = new AndOrExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(830);
						if (!(precpred(_ctx, 15))) throw new FailedPredicateException(this, "precpred(_ctx, 15)");
						setState(831);
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
						setState(832);
						expr(16);
						}
						break;
					case 11:
						{
						_localctx = new PowerOfExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(833);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						{
						setState(834);
						match(POW);
						}
						setState(836);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(835);
							((PowerOfExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(838);
						expr(15);
						}
						break;
					case 12:
						{
						_localctx = new ArrowExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(839);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						{
						setState(840);
						match(ARROW);
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
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(843);
						((MultiplicationExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(((((_la - 56)) & ~0x3f) == 0 && ((1L << (_la - 56)) & 262147L) != 0)) ) {
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
						expr(11);
						}
						break;
					case 14:
						{
						_localctx = new AdditiveExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(848);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
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
						expr(10);
						}
						break;
					case 15:
						{
						_localctx = new RelationalExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(854);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(855);
						((RelationalExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(((((_la - 86)) & ~0x3f) == 0 && ((1L << (_la - 86)) & 29L) != 0)) ) {
							((RelationalExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(856);
						expr(9);
						}
						break;
					case 16:
						{
						_localctx = new EqualityExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(857);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
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
						expr(8);
						}
						break;
					case 17:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(860);
						if (!(precpred(_ctx, 6))) throw new FailedPredicateException(this, "precpred(_ctx, 6)");
						setState(861);
						((BitwiseExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(((((_la - 87)) & ~0x3f) == 0 && ((1L << (_la - 87)) & 49L) != 0)) ) {
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
						expr(7);
						}
						break;
					case 18:
						{
						_localctx = new TernaryExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(866);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(867);
						match(OPTIONAL);
						setState(868);
						expr(0);
						setState(869);
						match(COLON);
						setState(870);
						expr(4);
						}
						break;
					case 19:
						{
						_localctx = new CommaExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(872);
						if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
						setState(873);
						match(COMMA);
						setState(874);
						expr(2);
						}
						break;
					case 20:
						{
						_localctx = new IndexExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(875);
						if (!(precpred(_ctx, 39))) throw new FailedPredicateException(this, "precpred(_ctx, 39)");
						setState(876);
						match(LEFT_BRACKET);
						setState(878);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
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
						if (!(precpred(_ctx, 38))) throw new FailedPredicateException(this, "precpred(_ctx, 38)");
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
						if (!(precpred(_ctx, 33))) throw new FailedPredicateException(this, "precpred(_ctx, 33)");
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
						} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & -8892632973048577888L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0) );
						setState(895);
						match(RIGHT_PAREN);
						}
						break;
					case 23:
						{
						_localctx = new ExprWithParenExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(897);
						if (!(precpred(_ctx, 32))) throw new FailedPredicateException(this, "precpred(_ctx, 32)");
						setState(898);
						match(LEFT_PAREN);
						setState(900);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
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
						if (!(precpred(_ctx, 30))) throw new FailedPredicateException(this, "precpred(_ctx, 30)");
						setState(904);
						match(LEFT_CURLY);
						setState(906);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892632973048577888L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
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
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & -8892633247926484832L) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & 2008117L) != 0)) {
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
						if (!(precpred(_ctx, 29))) throw new FailedPredicateException(this, "precpred(_ctx, 29)");
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
						if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
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

	@SuppressWarnings("CheckReturnValue")
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
	@SuppressWarnings("CheckReturnValue")
	public static class IdAtomContext extends PrimaryContext {
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public IdAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterIdAtom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitIdAtom(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class BooleanAtomContext extends PrimaryContext {
		public TerminalNode TRUE() { return getToken(Tads3Parser.TRUE, 0); }
		public BooleanAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterBooleanAtom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitBooleanAtom(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class RegexpStringAtomContext extends PrimaryContext {
		public TerminalNode RSTR() { return getToken(Tads3Parser.RSTR, 0); }
		public RegexpStringAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterRegexpStringAtom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitRegexpStringAtom(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class HexAtomContext extends PrimaryContext {
		public TerminalNode HEX() { return getToken(Tads3Parser.HEX, 0); }
		public HexAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterHexAtom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitHexAtom(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class NilAtomContext extends PrimaryContext {
		public TerminalNode NIL() { return getToken(Tads3Parser.NIL, 0); }
		public NilAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterNilAtom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitNilAtom(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class SingleQuotestringAtomContext extends PrimaryContext {
		public TerminalNode DSTR() { return getToken(Tads3Parser.DSTR, 0); }
		public SingleQuotestringAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterSingleQuotestringAtom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitSingleQuotestringAtom(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class InheritedAtomContext extends PrimaryContext {
		public TerminalNode INHERITED() { return getToken(Tads3Parser.INHERITED, 0); }
		public InheritedAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterInheritedAtom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitInheritedAtom(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class NumberAtomContext extends PrimaryContext {
		public TerminalNode NR() { return getToken(Tads3Parser.NR, 0); }
		public NumberAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterNumberAtom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitNumberAtom(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class DoubleQuotestringAtomContext extends PrimaryContext {
		public TerminalNode SSTR() { return getToken(Tads3Parser.SSTR, 0); }
		public DoubleQuotestringAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterDoubleQuotestringAtom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitDoubleQuotestringAtom(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ReferenceAtomContext extends PrimaryContext {
		public TerminalNode AMP() { return getToken(Tads3Parser.AMP, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public ReferenceAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterReferenceAtom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitReferenceAtom(this);
		}
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterIdentifierAtom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitIdentifierAtom(this);
		}
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
			if ( !(((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & 2147492005L) != 0)) ) {
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

	@SuppressWarnings("CheckReturnValue")
	public static class ParamsContext extends ParserRuleContext {
		public Token hasMore;
		public ParamsContext tail;
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterParams(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitParams(this);
		}
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
					((ParamsContext)_localctx).hasMore = match(COMMA);
					setState(952);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,125,_ctx) ) {
					case 1:
						{
						setState(951);
						((ParamsContext)_localctx).tail = params();
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

	@SuppressWarnings("CheckReturnValue")
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
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).enterOptionallyTypedOptionalId(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof Tads3Listener ) ((Tads3Listener)listener).exitOptionallyTypedOptionalId(this);
		}
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
		case 6:
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
			return precpred(_ctx, 40);
		case 2:
			return precpred(_ctx, 24);
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
			return precpred(_ctx, 16);
		case 10:
			return precpred(_ctx, 15);
		case 11:
			return precpred(_ctx, 14);
		case 12:
			return precpred(_ctx, 13);
		case 13:
			return precpred(_ctx, 10);
		case 14:
			return precpred(_ctx, 9);
		case 15:
			return precpred(_ctx, 8);
		case 16:
			return precpred(_ctx, 7);
		case 17:
			return precpred(_ctx, 6);
		case 18:
			return precpred(_ctx, 3);
		case 19:
			return precpred(_ctx, 1);
		case 20:
			return precpred(_ctx, 39);
		case 21:
			return precpred(_ctx, 38);
		case 22:
			return precpred(_ctx, 33);
		case 23:
			return precpred(_ctx, 32);
		case 24:
			return precpred(_ctx, 30);
		case 25:
			return precpred(_ctx, 29);
		case 26:
			return precpred(_ctx, 4);
		}
		return true;
	}

	public static final String _serializedATN =
		"\u0004\u0001`\u03d9\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007\u000f"+
		"\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002\u0012\u0007\u0012"+
		"\u0002\u0013\u0007\u0013\u0002\u0014\u0007\u0014\u0002\u0015\u0007\u0015"+
		"\u0002\u0016\u0007\u0016\u0002\u0017\u0007\u0017\u0002\u0018\u0007\u0018"+
		"\u0002\u0019\u0007\u0019\u0002\u001a\u0007\u001a\u0002\u001b\u0007\u001b"+
		"\u0002\u001c\u0007\u001c\u0002\u001d\u0007\u001d\u0002\u001e\u0007\u001e"+
		"\u0002\u001f\u0007\u001f\u0002 \u0007 \u0002!\u0007!\u0002\"\u0007\"\u0002"+
		"#\u0007#\u0002$\u0007$\u0002%\u0007%\u0002&\u0007&\u0002\'\u0007\'\u0002"+
		"(\u0007(\u0002)\u0007)\u0002*\u0007*\u0002+\u0007+\u0002,\u0007,\u0002"+
		"-\u0007-\u0002.\u0007.\u0002/\u0007/\u00020\u00070\u00021\u00071\u0002"+
		"2\u00072\u00023\u00073\u00024\u00074\u00025\u00075\u00026\u00076\u0002"+
		"7\u00077\u0001\u0000\u0005\u0000r\b\u0000\n\u0000\f\u0000u\t\u0000\u0001"+
		"\u0000\u0001\u0000\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0003\u0001\u0084\b\u0001\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0005\u0003\u0090\b\u0003\n\u0003\f\u0003\u0093\t\u0003\u0001\u0004"+
		"\u0003\u0004\u0096\b\u0004\u0001\u0004\u0005\u0004\u0099\b\u0004\n\u0004"+
		"\f\u0004\u009c\t\u0004\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005"+
		"\u0001\u0005\u0001\u0006\u0001\u0006\u0001\u0006\u0004\u0006\u00a6\b\u0006"+
		"\u000b\u0006\f\u0006\u00a7\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006"+
		"\u0001\u0006\u0001\u0006\u0003\u0006\u00b0\b\u0006\u0001\u0006\u0001\u0006"+
		"\u0005\u0006\u00b4\b\u0006\n\u0006\f\u0006\u00b7\t\u0006\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0003\u0007\u00bd\b\u0007\u0004\u0007\u00bf"+
		"\b\u0007\u000b\u0007\f\u0007\u00c0\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0005\u0007\u00cc\b\u0007\n\u0007\f\u0007\u00cf\t\u0007\u0001\u0007\u0001"+
		"\u0007\u0001\u0007\u0001\u0007\u0003\u0007\u00d5\b\u0007\u0001\b\u0001"+
		"\b\u0003\b\u00d9\b\b\u0001\b\u0001\b\u0001\b\u0005\b\u00de\b\b\n\b\f\b"+
		"\u00e1\t\b\u0001\b\u0001\b\u0001\t\u0005\t\u00e6\b\t\n\t\f\t\u00e9\t\t"+
		"\u0001\t\u0001\t\u0001\t\u0001\t\u0005\t\u00ef\b\t\n\t\f\t\u00f2\t\t\u0001"+
		"\t\u0001\t\u0001\n\u0005\n\u00f7\b\n\n\n\f\n\u00fa\t\n\u0001\n\u0001\n"+
		"\u0003\n\u00fe\b\n\u0001\n\u0001\n\u0001\n\u0005\n\u0103\b\n\n\n\f\n\u0106"+
		"\t\n\u0001\n\u0001\n\u0001\u000b\u0001\u000b\u0001\u000b\u0003\u000b\u010d"+
		"\b\u000b\u0001\u000b\u0001\u000b\u0001\f\u0001\f\u0003\f\u0113\b\f\u0001"+
		"\f\u0003\f\u0116\b\f\u0001\f\u0003\f\u0119\b\f\u0001\f\u0001\f\u0003\f"+
		"\u011d\b\f\u0001\f\u0001\f\u0005\f\u0121\b\f\n\f\f\f\u0124\t\f\u0001\f"+
		"\u0001\f\u0001\r\u0003\r\u0129\b\r\u0001\r\u0001\r\u0001\r\u0003\r\u012e"+
		"\b\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\u000e\u0003\u000e\u0135\b\u000e"+
		"\u0001\u000e\u0003\u000e\u0138\b\u000e\u0001\u000e\u0003\u000e\u013b\b"+
		"\u000e\u0003\u000e\u013d\b\u000e\u0001\u000e\u0005\u000e\u0140\b\u000e"+
		"\n\u000e\f\u000e\u0143\t\u000e\u0001\u000e\u0003\u000e\u0146\b\u000e\u0001"+
		"\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0003\u000e\u014c\b\u000e\u0003"+
		"\u000e\u014e\b\u000e\u0001\u000e\u0001\u000e\u0003\u000e\u0152\b\u000e"+
		"\u0001\u000f\u0001\u000f\u0003\u000f\u0156\b\u000f\u0001\u000f\u0001\u000f"+
		"\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0003\u000f\u015e\b\u000f"+
		"\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u000f\u0001\u000f"+
		"\u0003\u000f\u0166\b\u000f\u0003\u000f\u0168\b\u000f\u0001\u0010\u0001"+
		"\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0003"+
		"\u0010\u0171\b\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0003\u0010\u0176"+
		"\b\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0003\u0010\u017c"+
		"\b\u0010\u0001\u0010\u0003\u0010\u017f\b\u0010\u0001\u0011\u0001\u0011"+
		"\u0001\u0011\u0005\u0011\u0184\b\u0011\n\u0011\f\u0011\u0187\t\u0011\u0001"+
		"\u0012\u0001\u0012\u0001\u0012\u0003\u0012\u018c\b\u0012\u0001\u0012\u0001"+
		"\u0012\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0014\u0001\u0014\u0001"+
		"\u0014\u0005\u0014\u0196\b\u0014\n\u0014\f\u0014\u0199\t\u0014\u0001\u0015"+
		"\u0005\u0015\u019c\b\u0015\n\u0015\f\u0015\u019f\t\u0015\u0001\u0015\u0001"+
		"\u0015\u0001\u0015\u0005\u0015\u01a4\b\u0015\n\u0015\f\u0015\u01a7\t\u0015"+
		"\u0001\u0016\u0001\u0016\u0001\u0016\u0003\u0016\u01ac\b\u0016\u0001\u0016"+
		"\u0001\u0016\u0003\u0016\u01b0\b\u0016\u0001\u0016\u0003\u0016\u01b3\b"+
		"\u0016\u0001\u0016\u0001\u0016\u0003\u0016\u01b7\b\u0016\u0001\u0016\u0001"+
		"\u0016\u0005\u0016\u01bb\b\u0016\n\u0016\f\u0016\u01be\t\u0016\u0001\u0016"+
		"\u0001\u0016\u0003\u0016\u01c2\b\u0016\u0003\u0016\u01c4\b\u0016\u0001"+
		"\u0017\u0005\u0017\u01c7\b\u0017\n\u0017\f\u0017\u01ca\t\u0017\u0001\u0018"+
		"\u0001\u0018\u0001\u0018\u0001\u0018\u0003\u0018\u01d0\b\u0018\u0001\u0018"+
		"\u0001\u0018\u0003\u0018\u01d4\b\u0018\u0001\u0018\u0003\u0018\u01d7\b"+
		"\u0018\u0001\u0018\u0001\u0018\u0001\u0019\u0001\u0019\u0003\u0019\u01dd"+
		"\b\u0019\u0001\u0019\u0001\u0019\u0005\u0019\u01e1\b\u0019\n\u0019\f\u0019"+
		"\u01e4\t\u0019\u0001\u001a\u0003\u001a\u01e7\b\u001a\u0001\u001a\u0003"+
		"\u001a\u01ea\b\u001a\u0003\u001a\u01ec\b\u001a\u0001\u001a\u0001\u001a"+
		"\u0001\u001a\u0001\u001a\u0003\u001a\u01f2\b\u001a\u0001\u001b\u0001\u001b"+
		"\u0001\u001b\u0001\u001b\u0001\u001b\u0003\u001b\u01f9\b\u001b\u0003\u001b"+
		"\u01fb\b\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b"+
		"\u0001\u001b\u0005\u001b\u0203\b\u001b\n\u001b\f\u001b\u0206\t\u001b\u0001"+
		"\u001b\u0001\u001b\u0001\u001c\u0003\u001c\u020b\b\u001c\u0001\u001c\u0003"+
		"\u001c\u020e\b\u001c\u0001\u001c\u0003\u001c\u0211\b\u001c\u0001\u001c"+
		"\u0001\u001c\u0001\u001c\u0003\u001c\u0216\b\u001c\u0001\u001c\u0003\u001c"+
		"\u0219\b\u001c\u0001\u001c\u0001\u001c\u0001\u001c\u0003\u001c\u021e\b"+
		"\u001c\u0001\u001c\u0003\u001c\u0221\b\u001c\u0003\u001c\u0223\b\u001c"+
		"\u0001\u001d\u0001\u001d\u0005\u001d\u0227\b\u001d\n\u001d\f\u001d\u022a"+
		"\t\u001d\u0001\u001d\u0001\u001d\u0003\u001d\u022e\b\u001d\u0001\u001e"+
		"\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e"+
		"\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e"+
		"\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0003\u001e"+
		"\u0242\b\u001e\u0001\u001f\u0001\u001f\u0005\u001f\u0246\b\u001f\n\u001f"+
		"\f\u001f\u0249\t\u001f\u0001\u001f\u0001\u001f\u0001 \u0001 \u0003 \u024f"+
		"\b \u0001 \u0001 \u0001!\u0001!\u0003!\u0255\b!\u0001!\u0001!\u0001\""+
		"\u0001\"\u0003\"\u025b\b\"\u0001\"\u0001\"\u0001#\u0001#\u0001#\u0001"+
		"$\u0001$\u0001$\u0001$\u0001$\u0001$\u0001$\u0001$\u0003$\u026a\b$\u0001"+
		"$\u0001$\u0001$\u0005$\u026f\b$\n$\f$\u0272\t$\u0003$\u0274\b$\u0005$"+
		"\u0276\b$\n$\f$\u0279\t$\u0001$\u0001$\u0001%\u0001%\u0001%\u0001&\u0001"+
		"&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001&\u0001\'\u0001\'\u0001"+
		"\'\u0001\'\u0001\'\u0001\'\u0001\'\u0001\'\u0001(\u0001(\u0003(\u0293"+
		"\b(\u0001(\u0001(\u0001)\u0001)\u0001)\u0001)\u0001)\u0003)\u029c\b)\u0001"+
		")\u0001)\u0001*\u0001*\u0001*\u0003*\u02a3\b*\u0001*\u0001*\u0001*\u0001"+
		"+\u0001+\u0001+\u0003+\u02ab\b+\u0001+\u0001+\u0003+\u02af\b+\u0001+\u0001"+
		"+\u0003+\u02b3\b+\u0001+\u0001+\u0001+\u0001,\u0001,\u0001,\u0001,\u0001"+
		",\u0003,\u02bd\b,\u0001,\u0001,\u0005,\u02c1\b,\n,\f,\u02c4\t,\u0001,"+
		"\u0001,\u0003,\u02c8\b,\u0001-\u0001-\u0001-\u0003-\u02cd\b-\u0001.\u0003"+
		".\u02d0\b.\u0001.\u0001.\u0001/\u0001/\u0001/\u00010\u00010\u00010\u0001"+
		"0\u00030\u02db\b0\u00010\u00010\u00011\u00011\u00011\u00011\u00011\u0005"+
		"1\u02e4\b1\n1\f1\u02e7\t1\u00011\u00011\u00031\u02eb\b1\u00012\u00012"+
		"\u00012\u00012\u00012\u00013\u00013\u00013\u00033\u02f5\b3\u00013\u0001"+
		"3\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u0001"+
		"3\u00033\u0303\b3\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u0001"+
		"3\u00013\u00033\u030e\b3\u00013\u00013\u00033\u0312\b3\u00013\u00013\u0001"+
		"3\u00013\u00013\u00013\u00013\u00013\u00013\u00033\u031d\b3\u00013\u0001"+
		"3\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u0001"+
		"3\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u0001"+
		"3\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00033\u033c\b3\u0001"+
		"3\u00013\u00013\u00013\u00013\u00013\u00013\u00033\u0345\b3\u00013\u0001"+
		"3\u00013\u00013\u00013\u00013\u00013\u00033\u034e\b3\u00013\u00013\u0001"+
		"3\u00013\u00033\u0354\b3\u00013\u00013\u00013\u00013\u00013\u00013\u0001"+
		"3\u00013\u00013\u00013\u00033\u0360\b3\u00013\u00013\u00013\u00013\u0001"+
		"3\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u00033\u036f"+
		"\b3\u00013\u00013\u00013\u00013\u00013\u00013\u00033\u0377\b3\u00013\u0001"+
		"3\u00013\u00043\u037c\b3\u000b3\f3\u037d\u00013\u00013\u00013\u00013\u0001"+
		"3\u00033\u0385\b3\u00013\u00013\u00013\u00013\u00033\u038b\b3\u00013\u0001"+
		"3\u00033\u038f\b3\u00013\u00013\u00013\u00013\u00013\u00013\u00013\u0001"+
		"3\u00013\u00013\u00013\u00033\u039c\b3\u00053\u039e\b3\n3\f3\u03a1\t3"+
		"\u00014\u00014\u00014\u00014\u00014\u00014\u00014\u00014\u00014\u0001"+
		"4\u00014\u00034\u03ae\b4\u00015\u00015\u00016\u00016\u00016\u00036\u03b5"+
		"\b6\u00016\u00016\u00036\u03b9\b6\u00056\u03bb\b6\n6\f6\u03be\t6\u0001"+
		"7\u00017\u00017\u00037\u03c3\b7\u00017\u00037\u03c6\b7\u00017\u00017\u0003"+
		"7\u03ca\b7\u00017\u00017\u00017\u00037\u03cf\b7\u00017\u00017\u00017\u0001"+
		"7\u00037\u03d5\b7\u00037\u03d7\b7\u00017\u0000\u0002\ff8\u0000\u0002\u0004"+
		"\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \""+
		"$&(*,.02468:<>@BDFHJLNPRTVXZ\\^`bdfhjln\u0000\f\u0001\u0000QR\u0005\u0000"+
		"22447:?@JJ\u0006\u0000227:@AJKWW[\\\u0006\u0000124477::@@JJ\u0002\u0000"+
		"22KK\u0001\u0000=>\u0002\u000089JJ\u0002\u000077::\u0002\u0000VVXZ\u0001"+
		"\u0000;<\u0002\u0000WW[\\\u0006\u0000##%%((**00BB\u0478\u0000s\u0001\u0000"+
		"\u0000\u0000\u0002\u0083\u0001\u0000\u0000\u0000\u0004\u0085\u0001\u0000"+
		"\u0000\u0000\u0006\u008c\u0001\u0000\u0000\u0000\b\u0095\u0001\u0000\u0000"+
		"\u0000\n\u009d\u0001\u0000\u0000\u0000\f\u00af\u0001\u0000\u0000\u0000"+
		"\u000e\u00d4\u0001\u0000\u0000\u0000\u0010\u00d6\u0001\u0000\u0000\u0000"+
		"\u0012\u00e7\u0001\u0000\u0000\u0000\u0014\u00f8\u0001\u0000\u0000\u0000"+
		"\u0016\u0109\u0001\u0000\u0000\u0000\u0018\u0110\u0001\u0000\u0000\u0000"+
		"\u001a\u0128\u0001\u0000\u0000\u0000\u001c\u013c\u0001\u0000\u0000\u0000"+
		"\u001e\u0155\u0001\u0000\u0000\u0000 \u017b\u0001\u0000\u0000\u0000\""+
		"\u0180\u0001\u0000\u0000\u0000$\u0188\u0001\u0000\u0000\u0000&\u018f\u0001"+
		"\u0000\u0000\u0000(\u0192\u0001\u0000\u0000\u0000*\u019d\u0001\u0000\u0000"+
		"\u0000,\u01a8\u0001\u0000\u0000\u0000.\u01c8\u0001\u0000\u0000\u00000"+
		"\u01d6\u0001\u0000\u0000\u00002\u01dc\u0001\u0000\u0000\u00004\u01f1\u0001"+
		"\u0000\u0000\u00006\u01f3\u0001\u0000\u0000\u00008\u0222\u0001\u0000\u0000"+
		"\u0000:\u022d\u0001\u0000\u0000\u0000<\u0241\u0001\u0000\u0000\u0000>"+
		"\u0243\u0001\u0000\u0000\u0000@\u024c\u0001\u0000\u0000\u0000B\u0252\u0001"+
		"\u0000\u0000\u0000D\u0258\u0001\u0000\u0000\u0000F\u025e\u0001\u0000\u0000"+
		"\u0000H\u0261\u0001\u0000\u0000\u0000J\u027c\u0001\u0000\u0000\u0000L"+
		"\u027f\u0001\u0000\u0000\u0000N\u0288\u0001\u0000\u0000\u0000P\u0290\u0001"+
		"\u0000\u0000\u0000R\u0296\u0001\u0000\u0000\u0000T\u029f\u0001\u0000\u0000"+
		"\u0000V\u02a7\u0001\u0000\u0000\u0000X\u02b7\u0001\u0000\u0000\u0000Z"+
		"\u02c9\u0001\u0000\u0000\u0000\\\u02cf\u0001\u0000\u0000\u0000^\u02d3"+
		"\u0001\u0000\u0000\u0000`\u02d6\u0001\u0000\u0000\u0000b\u02de\u0001\u0000"+
		"\u0000\u0000d\u02ec\u0001\u0000\u0000\u0000f\u031c\u0001\u0000\u0000\u0000"+
		"h\u03ad\u0001\u0000\u0000\u0000j\u03af\u0001\u0000\u0000\u0000l\u03b4"+
		"\u0001\u0000\u0000\u0000n\u03d6\u0001\u0000\u0000\u0000pr\u0003\u0002"+
		"\u0001\u0000qp\u0001\u0000\u0000\u0000ru\u0001\u0000\u0000\u0000sq\u0001"+
		"\u0000\u0000\u0000st\u0001\u0000\u0000\u0000tv\u0001\u0000\u0000\u0000"+
		"us\u0001\u0000\u0000\u0000vw\u0005\u0000\u0000\u0001w\u0001\u0001\u0000"+
		"\u0000\u0000x\u0084\u0003\u0010\b\u0000y\u0084\u0003\u000e\u0007\u0000"+
		"z\u0084\u0003\u0018\f\u0000{\u0084\u0003\u0016\u000b\u0000|\u0084\u0003"+
		"\u001c\u000e\u0000}\u0084\u0003\u0012\t\u0000~\u0084\u0003\u0014\n\u0000"+
		"\u007f\u0084\u00034\u001a\u0000\u0080\u0084\u0003\u001e\u000f\u0000\u0081"+
		"\u0084\u0003\u0004\u0002\u0000\u0082\u0084\u0005L\u0000\u0000\u0083x\u0001"+
		"\u0000\u0000\u0000\u0083y\u0001\u0000\u0000\u0000\u0083z\u0001\u0000\u0000"+
		"\u0000\u0083{\u0001\u0000\u0000\u0000\u0083|\u0001\u0000\u0000\u0000\u0083"+
		"}\u0001\u0000\u0000\u0000\u0083~\u0001\u0000\u0000\u0000\u0083\u007f\u0001"+
		"\u0000\u0000\u0000\u0083\u0080\u0001\u0000\u0000\u0000\u0083\u0081\u0001"+
		"\u0000\u0000\u0000\u0083\u0082\u0001\u0000\u0000\u0000\u0084\u0003\u0001"+
		"\u0000\u0000\u0000\u0085\u0086\u00053\u0000\u0000\u0086\u0087\u0005/\u0000"+
		"\u0000\u0087\u0088\u0005B\u0000\u0000\u0088\u0089\u0005M\u0000\u0000\u0089"+
		"\u008a\u0003f3\u0000\u008a\u008b\u0005N\u0000\u0000\u008b\u0005\u0001"+
		"\u0000\u0000\u0000\u008c\u0091\u0003\b\u0004\u0000\u008d\u008e\u0005K"+
		"\u0000\u0000\u008e\u0090\u0003\b\u0004\u0000\u008f\u008d\u0001\u0000\u0000"+
		"\u0000\u0090\u0093\u0001\u0000\u0000\u0000\u0091\u008f\u0001\u0000\u0000"+
		"\u0000\u0091\u0092\u0001\u0000\u0000\u0000\u0092\u0007\u0001\u0000\u0000"+
		"\u0000\u0093\u0091\u0001\u0000\u0000\u0000\u0094\u0096\u0003\n\u0005\u0000"+
		"\u0095\u0094\u0001\u0000\u0000\u0000\u0095\u0096\u0001\u0000\u0000\u0000"+
		"\u0096\u009a\u0001\u0000\u0000\u0000\u0097\u0099\u0003\f\u0006\u0000\u0098"+
		"\u0097\u0001\u0000\u0000\u0000\u0099\u009c\u0001\u0000\u0000\u0000\u009a"+
		"\u0098\u0001\u0000\u0000\u0000\u009a\u009b\u0001\u0000\u0000\u0000\u009b"+
		"\t\u0001\u0000\u0000\u0000\u009c\u009a\u0001\u0000\u0000\u0000\u009d\u009e"+
		"\u0005O\u0000\u0000\u009e\u009f\u0003j5\u0000\u009f\u00a0\u0005D\u0000"+
		"\u0000\u00a0\u00a1\u0005P\u0000\u0000\u00a1\u000b\u0001\u0000\u0000\u0000"+
		"\u00a2\u00a3\u0006\u0006\uffff\uffff\u0000\u00a3\u00a5\u0005M\u0000\u0000"+
		"\u00a4\u00a6\u0003\f\u0006\u0000\u00a5\u00a4\u0001\u0000\u0000\u0000\u00a6"+
		"\u00a7\u0001\u0000\u0000\u0000\u00a7\u00a5\u0001\u0000\u0000\u0000\u00a7"+
		"\u00a8\u0001\u0000\u0000\u0000\u00a8\u00a9\u0001\u0000\u0000\u0000\u00a9"+
		"\u00aa\u0005N\u0000\u0000\u00aa\u00b0\u0001\u0000\u0000\u0000\u00ab\u00ac"+
		"\u0005K\u0000\u0000\u00ac\u00b0\u0003\f\u0006\u0003\u00ad\u00b0\u0003"+
		"f3\u0000\u00ae\u00b0\u0005J\u0000\u0000\u00af\u00a2\u0001\u0000\u0000"+
		"\u0000\u00af\u00ab\u0001\u0000\u0000\u0000\u00af\u00ad\u0001\u0000\u0000"+
		"\u0000\u00af\u00ae\u0001\u0000\u0000\u0000\u00b0\u00b5\u0001\u0000\u0000"+
		"\u0000\u00b1\u00b2\n\u0004\u0000\u0000\u00b2\u00b4\u0005K\u0000\u0000"+
		"\u00b3\u00b1\u0001\u0000\u0000\u0000\u00b4\u00b7\u0001\u0000\u0000\u0000"+
		"\u00b5\u00b3\u0001\u0000\u0000\u0000\u00b5\u00b6\u0001\u0000\u0000\u0000"+
		"\u00b6\r\u0001\u0000\u0000\u0000\u00b7\u00b5\u0001\u0000\u0000\u0000\u00b8"+
		"\u00b9\u0003j5\u0000\u00b9\u00be\u0005\b\u0000\u0000\u00ba\u00bc\u0003"+
		"f3\u0000\u00bb\u00bd\u00055\u0000\u0000\u00bc\u00bb\u0001\u0000\u0000"+
		"\u0000\u00bc\u00bd\u0001\u0000\u0000\u0000\u00bd\u00bf\u0001\u0000\u0000"+
		"\u0000\u00be\u00ba\u0001\u0000\u0000\u0000\u00bf\u00c0\u0001\u0000\u0000"+
		"\u0000\u00c0\u00be\u0001\u0000\u0000\u0000\u00c0\u00c1\u0001\u0000\u0000"+
		"\u0000\u00c1\u00c2\u0001\u0000\u0000\u0000\u00c2\u00c3\u0005L\u0000\u0000"+
		"\u00c3\u00d5\u0001\u0000\u0000\u0000\u00c4\u00c5\u0005#\u0000\u0000\u00c5"+
		"\u00c6\u0005\b\u0000\u0000\u00c6\u00cd\u0005W\u0000\u0000\u00c7\u00cc"+
		"\u0003j5\u0000\u00c8\u00cc\u0005J\u0000\u0000\u00c9\u00cc\u0005*\u0000"+
		"\u0000\u00ca\u00cc\u0005%\u0000\u0000\u00cb\u00c7\u0001\u0000\u0000\u0000"+
		"\u00cb\u00c8\u0001\u0000\u0000\u0000\u00cb\u00c9\u0001\u0000\u0000\u0000"+
		"\u00cb\u00ca\u0001\u0000\u0000\u0000\u00cc\u00cf\u0001\u0000\u0000\u0000"+
		"\u00cd\u00cb\u0001\u0000\u0000\u0000\u00cd\u00ce\u0001\u0000\u0000\u0000"+
		"\u00ce\u00d0\u0001\u0000\u0000\u0000\u00cf\u00cd\u0001\u0000\u0000\u0000"+
		"\u00d0\u00d1\u0005[\u0000\u0000\u00d1\u00d2\u0003j5\u0000\u00d2\u00d3"+
		"\u0005L\u0000\u0000\u00d3\u00d5\u0001\u0000\u0000\u0000\u00d4\u00b8\u0001"+
		"\u0000\u0000\u0000\u00d4\u00c4\u0001\u0000\u0000\u0000\u00d5\u000f\u0001"+
		"\u0000\u0000\u0000\u00d6\u00d8\u0005\r\u0000\u0000\u00d7\u00d9\u0005."+
		"\u0000\u0000\u00d8\u00d7\u0001\u0000\u0000\u0000\u00d8\u00d9\u0001\u0000"+
		"\u0000\u0000\u00d9\u00da\u0001\u0000\u0000\u0000\u00da\u00df\u0003j5\u0000"+
		"\u00db\u00dc\u0005H\u0000\u0000\u00dc\u00de\u0003j5\u0000\u00dd\u00db"+
		"\u0001\u0000\u0000\u0000\u00de\u00e1\u0001\u0000\u0000\u0000\u00df\u00dd"+
		"\u0001\u0000\u0000\u0000\u00df\u00e0\u0001\u0000\u0000\u0000\u00e0\u00e2"+
		"\u0001\u0000\u0000\u0000\u00e1\u00df\u0001\u0000\u0000\u0000\u00e2\u00e3"+
		"\u0005L\u0000\u0000\u00e3\u0011\u0001\u0000\u0000\u0000\u00e4\u00e6\u0005"+
		"7\u0000\u0000\u00e5\u00e4\u0001\u0000\u0000\u0000\u00e6\u00e9\u0001\u0000"+
		"\u0000\u0000\u00e7\u00e5\u0001\u0000\u0000\u0000\u00e7\u00e8\u0001\u0000"+
		"\u0000\u0000\u00e8\u00ea\u0001\u0000\u0000\u0000\u00e9\u00e7\u0001\u0000"+
		"\u0000\u0000\u00ea\u00eb\u0005\u001d\u0000\u0000\u00eb\u00f0\u0003j5\u0000"+
		"\u00ec\u00ed\u0005H\u0000\u0000\u00ed\u00ef\u0003j5\u0000\u00ee\u00ec"+
		"\u0001\u0000\u0000\u0000\u00ef\u00f2\u0001\u0000\u0000\u0000\u00f0\u00ee"+
		"\u0001\u0000\u0000\u0000\u00f0\u00f1\u0001\u0000\u0000\u0000\u00f1\u00f3"+
		"\u0001\u0000\u0000\u0000\u00f2\u00f0\u0001\u0000\u0000\u0000\u00f3\u00f4"+
		"\u0005L\u0000\u0000\u00f4\u0013\u0001\u0000\u0000\u0000\u00f5\u00f7\u0005"+
		"7\u0000\u0000\u00f6\u00f5\u0001\u0000\u0000\u0000\u00f7\u00fa\u0001\u0000"+
		"\u0000\u0000\u00f8\u00f6\u0001\u0000\u0000\u0000\u00f8\u00f9\u0001\u0000"+
		"\u0000\u0000\u00f9\u00fb\u0001\u0000\u0000\u0000\u00fa\u00f8\u0001\u0000"+
		"\u0000\u0000\u00fb\u00fd\u0005\u001e\u0000\u0000\u00fc\u00fe\u0005\u001d"+
		"\u0000\u0000\u00fd\u00fc\u0001\u0000\u0000\u0000\u00fd\u00fe\u0001\u0000"+
		"\u0000\u0000\u00fe\u00ff\u0001\u0000\u0000\u0000\u00ff\u0104\u0003j5\u0000"+
		"\u0100\u0101\u0005H\u0000\u0000\u0101\u0103\u0003j5\u0000\u0102\u0100"+
		"\u0001\u0000\u0000\u0000\u0103\u0106\u0001\u0000\u0000\u0000\u0104\u0102"+
		"\u0001\u0000\u0000\u0000\u0104\u0105\u0001\u0000\u0000\u0000\u0105\u0107"+
		"\u0001\u0000\u0000\u0000\u0106\u0104\u0001\u0000\u0000\u0000\u0107\u0108"+
		"\u0005L\u0000\u0000\u0108\u0015\u0001\u0000\u0000\u0000\u0109\u010a\u0005"+
		"\u001f\u0000\u0000\u010a\u010c\u0003j5\u0000\u010b\u010d\u0005R\u0000"+
		"\u0000\u010c\u010b\u0001\u0000\u0000\u0000\u010c\u010d\u0001\u0000\u0000"+
		"\u0000\u010d\u010e\u0001\u0000\u0000\u0000\u010e\u010f\u0005L\u0000\u0000"+
		"\u010f\u0017\u0001\u0000\u0000\u0000\u0110\u0112\u0005\u001a\u0000\u0000"+
		"\u0111\u0113\u0005\u000e\u0000\u0000\u0112\u0111\u0001\u0000\u0000\u0000"+
		"\u0112\u0113\u0001\u0000\u0000\u0000\u0113\u0115\u0001\u0000\u0000\u0000"+
		"\u0114\u0116\u0003j5\u0000\u0115\u0114\u0001\u0000\u0000\u0000\u0115\u0116"+
		"\u0001\u0000\u0000\u0000\u0116\u0118\u0001\u0000\u0000\u0000\u0117\u0119"+
		"\u0007\u0000\u0000\u0000\u0118\u0117\u0001\u0000\u0000\u0000\u0118\u0119"+
		"\u0001\u0000\u0000\u0000\u0119\u011c\u0001\u0000\u0000\u0000\u011a\u011b"+
		"\u0005G\u0000\u0000\u011b\u011d\u0003(\u0014\u0000\u011c\u011a\u0001\u0000"+
		"\u0000\u0000\u011c\u011d\u0001\u0000\u0000\u0000\u011d\u011e\u0001\u0000"+
		"\u0000\u0000\u011e\u0122\u0005T\u0000\u0000\u011f\u0121\u0003\u001a\r"+
		"\u0000\u0120\u011f\u0001\u0000\u0000\u0000\u0121\u0124\u0001\u0000\u0000"+
		"\u0000\u0122\u0120\u0001\u0000\u0000\u0000\u0122\u0123\u0001\u0000\u0000"+
		"\u0000\u0123\u0125\u0001\u0000\u0000\u0000\u0124\u0122\u0001\u0000\u0000"+
		"\u0000\u0125\u0126\u0005U\u0000\u0000\u0126\u0019\u0001\u0000\u0000\u0000"+
		"\u0127\u0129\u0005\"\u0000\u0000\u0128\u0127\u0001\u0000\u0000\u0000\u0128"+
		"\u0129\u0001\u0000\u0000\u0000\u0129\u012a\u0001\u0000\u0000\u0000\u012a"+
		"\u012b\u0003j5\u0000\u012b\u012d\u0005M\u0000\u0000\u012c\u012e\u0003"+
		"l6\u0000\u012d\u012c\u0001\u0000\u0000\u0000\u012d\u012e\u0001\u0000\u0000"+
		"\u0000\u012e\u012f\u0001\u0000\u0000\u0000\u012f\u0130\u0005N\u0000\u0000"+
		"\u0130\u0131\u0001\u0000\u0000\u0000\u0131\u0132\u0005L\u0000\u0000\u0132"+
		"\u001b\u0001\u0000\u0000\u0000\u0133\u0135\u0005\u000e\u0000\u0000\u0134"+
		"\u0133\u0001\u0000\u0000\u0000\u0134\u0135\u0001\u0000\u0000\u0000\u0135"+
		"\u013d\u0001\u0000\u0000\u0000\u0136\u0138\u0005\u0010\u0000\u0000\u0137"+
		"\u0136\u0001\u0000\u0000\u0000\u0137\u0138\u0001\u0000\u0000\u0000\u0138"+
		"\u013d\u0001\u0000\u0000\u0000\u0139\u013b\u0005\u0011\u0000\u0000\u013a"+
		"\u0139\u0001\u0000\u0000\u0000\u013a\u013b\u0001\u0000\u0000\u0000\u013b"+
		"\u013d\u0001\u0000\u0000\u0000\u013c\u0134\u0001\u0000\u0000\u0000\u013c"+
		"\u0137\u0001\u0000\u0000\u0000\u013c\u013a\u0001\u0000\u0000\u0000\u013d"+
		"\u0141\u0001\u0000\u0000\u0000\u013e\u0140\u00057\u0000\u0000\u013f\u013e"+
		"\u0001\u0000\u0000\u0000\u0140\u0143\u0001\u0000\u0000\u0000\u0141\u013f"+
		"\u0001\u0000\u0000\u0000\u0141\u0142\u0001\u0000\u0000\u0000\u0142\u0145"+
		"\u0001\u0000\u0000\u0000\u0143\u0141\u0001\u0000\u0000\u0000\u0144\u0146"+
		"\u0005\u000f\u0000\u0000\u0145\u0144\u0001\u0000\u0000\u0000\u0145\u0146"+
		"\u0001\u0000\u0000\u0000\u0146\u014d\u0001\u0000\u0000\u0000\u0147\u014e"+
		"\u0003(\u0014\u0000\u0148\u014b\u0003j5\u0000\u0149\u014a\u0005G\u0000"+
		"\u0000\u014a\u014c\u0003(\u0014\u0000\u014b\u0149\u0001\u0000\u0000\u0000"+
		"\u014b\u014c\u0001\u0000\u0000\u0000\u014c\u014e\u0001\u0000\u0000\u0000"+
		"\u014d\u0147\u0001\u0000\u0000\u0000\u014d\u0148\u0001\u0000\u0000\u0000"+
		"\u014e\u0151\u0001\u0000\u0000\u0000\u014f\u0152\u0003$\u0012\u0000\u0150"+
		"\u0152\u0003&\u0013\u0000\u0151\u014f\u0001\u0000\u0000\u0000\u0151\u0150"+
		"\u0001\u0000\u0000\u0000\u0152\u001d\u0001\u0000\u0000\u0000\u0153\u0156"+
		"\u0005\u0010\u0000\u0000\u0154\u0156\u0005\u0011\u0000\u0000\u0155\u0153"+
		"\u0001\u0000\u0000\u0000\u0155\u0154\u0001\u0000\u0000\u0000\u0155\u0156"+
		"\u0001\u0000\u0000\u0000\u0156\u0157\u0001\u0000\u0000\u0000\u0157\u0158"+
		"\u0005\u0001\u0000\u0000\u0158\u015d\u0003j5\u0000\u0159\u015a\u0005M"+
		"\u0000\u0000\u015a\u015b\u0003j5\u0000\u015b\u015c\u0005N\u0000\u0000"+
		"\u015c\u015e\u0001\u0000\u0000\u0000\u015d\u0159\u0001\u0000\u0000\u0000"+
		"\u015d\u015e\u0001\u0000\u0000\u0000\u015e\u015f\u0001\u0000\u0000\u0000"+
		"\u015f\u0160\u0005G\u0000\u0000\u0160\u0161\u0003\u0006\u0003\u0000\u0161"+
		"\u0167\u0005G\u0000\u0000\u0162\u0165\u0003(\u0014\u0000\u0163\u0166\u0003"+
		"$\u0012\u0000\u0164\u0166\u0003&\u0013\u0000\u0165\u0163\u0001\u0000\u0000"+
		"\u0000\u0165\u0164\u0001\u0000\u0000\u0000\u0166\u0168\u0001\u0000\u0000"+
		"\u0000\u0167\u0162\u0001\u0000\u0000\u0000\u0167\u0168\u0001\u0000\u0000"+
		"\u0000\u0168\u001f\u0001\u0000\u0000\u0000\u0169\u017c\u0005R\u0000\u0000"+
		"\u016a\u016b\u00051\u0000\u0000\u016b\u017c\u0003f3\u0000\u016c\u017c"+
		"\u0005Q\u0000\u0000\u016d\u0170\u0005?\u0000\u0000\u016e\u0171\u0003j"+
		"5\u0000\u016f\u0171\u0003f3\u0000\u0170\u016e\u0001\u0000\u0000\u0000"+
		"\u0170\u016f\u0001\u0000\u0000\u0000\u0171\u017c\u0001\u0000\u0000\u0000"+
		"\u0172\u0175\u0007\u0001\u0000\u0000\u0173\u0176\u0003j5\u0000\u0174\u0176"+
		"\u0003f3\u0000\u0175\u0173\u0001\u0000\u0000\u0000\u0175\u0174\u0001\u0000"+
		"\u0000\u0000\u0176\u017c\u0001\u0000\u0000\u0000\u0177\u0178\u0005O\u0000"+
		"\u0000\u0178\u0179\u0003\"\u0011\u0000\u0179\u017a\u0005P\u0000\u0000"+
		"\u017a\u017c\u0001\u0000\u0000\u0000\u017b\u0169\u0001\u0000\u0000\u0000"+
		"\u017b\u016a\u0001\u0000\u0000\u0000\u017b\u016c\u0001\u0000\u0000\u0000"+
		"\u017b\u016d\u0001\u0000\u0000\u0000\u017b\u0172\u0001\u0000\u0000\u0000"+
		"\u017b\u0177\u0001\u0000\u0000\u0000\u017c\u017e\u0001\u0000\u0000\u0000"+
		"\u017d\u017f\u00055\u0000\u0000\u017e\u017d\u0001\u0000\u0000\u0000\u017e"+
		"\u017f\u0001\u0000\u0000\u0000\u017f!\u0001\u0000\u0000\u0000\u0180\u0185"+
		"\u0003f3\u0000\u0181\u0182\u0005H\u0000\u0000\u0182\u0184\u0003f3\u0000"+
		"\u0183\u0181\u0001\u0000\u0000\u0000\u0184\u0187\u0001\u0000\u0000\u0000"+
		"\u0185\u0183\u0001\u0000\u0000\u0000\u0185\u0186\u0001\u0000\u0000\u0000"+
		"\u0186#\u0001\u0000\u0000\u0000\u0187\u0185\u0001\u0000\u0000\u0000\u0188"+
		"\u0189\u0005T\u0000\u0000\u0189\u018b\u0003*\u0015\u0000\u018a\u018c\u0005"+
		"L\u0000\u0000\u018b\u018a\u0001\u0000\u0000\u0000\u018b\u018c\u0001\u0000"+
		"\u0000\u0000\u018c\u018d\u0001\u0000\u0000\u0000\u018d\u018e\u0005U\u0000"+
		"\u0000\u018e%\u0001\u0000\u0000\u0000\u018f\u0190\u0003*\u0015\u0000\u0190"+
		"\u0191\u0005L\u0000\u0000\u0191\'\u0001\u0000\u0000\u0000\u0192\u0197"+
		"\u0003j5\u0000\u0193\u0194\u0005H\u0000\u0000\u0194\u0196\u0003(\u0014"+
		"\u0000\u0195\u0193\u0001\u0000\u0000\u0000\u0196\u0199\u0001\u0000\u0000"+
		"\u0000\u0197\u0195\u0001\u0000\u0000\u0000\u0197\u0198\u0001\u0000\u0000"+
		"\u0000\u0198)\u0001\u0000\u0000\u0000\u0199\u0197\u0001\u0000\u0000\u0000"+
		"\u019a\u019c\u0003 \u0010\u0000\u019b\u019a\u0001\u0000\u0000\u0000\u019c"+
		"\u019f\u0001\u0000\u0000\u0000\u019d\u019b\u0001\u0000\u0000\u0000\u019d"+
		"\u019e\u0001\u0000\u0000\u0000\u019e\u01a5\u0001\u0000\u0000\u0000\u019f"+
		"\u019d\u0001\u0000\u0000\u0000\u01a0\u01a4\u00034\u001a\u0000\u01a1\u01a4"+
		"\u0003,\u0016\u0000\u01a2\u01a4\u00030\u0018\u0000\u01a3\u01a0\u0001\u0000"+
		"\u0000\u0000\u01a3\u01a1\u0001\u0000\u0000\u0000\u01a3\u01a2\u0001\u0000"+
		"\u0000\u0000\u01a4\u01a7\u0001\u0000\u0000\u0000\u01a5\u01a3\u0001\u0000"+
		"\u0000\u0000\u01a5\u01a6\u0001\u0000\u0000\u0000\u01a6+\u0001\u0000\u0000"+
		"\u0000\u01a7\u01a5\u0001\u0000\u0000\u0000\u01a8\u01c3\u0003j5\u0000\u01a9"+
		"\u01ab\u0005C\u0000\u0000\u01aa\u01ac\u0005\"\u0000\u0000\u01ab\u01aa"+
		"\u0001\u0000\u0000\u0000\u01ab\u01ac\u0001\u0000\u0000\u0000\u01ac\u01af"+
		"\u0001\u0000\u0000\u0000\u01ad\u01b0\u0003f3\u0000\u01ae\u01b0\u0003."+
		"\u0017\u0000\u01af\u01ad\u0001\u0000\u0000\u0000\u01af\u01ae\u0001\u0000"+
		"\u0000\u0000\u01b0\u01b2\u0001\u0000\u0000\u0000\u01b1\u01b3\u0005L\u0000"+
		"\u0000\u01b2\u01b1\u0001\u0000\u0000\u0000\u01b2\u01b3\u0001\u0000\u0000"+
		"\u0000\u01b3\u01c4\u0001\u0000\u0000\u0000\u01b4\u01b6\u0005G\u0000\u0000"+
		"\u01b5\u01b7\u0003j5\u0000\u01b6\u01b5\u0001\u0000\u0000\u0000\u01b6\u01b7"+
		"\u0001\u0000\u0000\u0000\u01b7\u01bc\u0001\u0000\u0000\u0000\u01b8\u01b9"+
		"\u0005H\u0000\u0000\u01b9\u01bb\u0003(\u0014\u0000\u01ba\u01b8\u0001\u0000"+
		"\u0000\u0000\u01bb\u01be\u0001\u0000\u0000\u0000\u01bc\u01ba\u0001\u0000"+
		"\u0000\u0000\u01bc\u01bd\u0001\u0000\u0000\u0000\u01bd\u01bf\u0001\u0000"+
		"\u0000\u0000\u01be\u01bc\u0001\u0000\u0000\u0000\u01bf\u01c1\u0003$\u0012"+
		"\u0000\u01c0\u01c2\u0005L\u0000\u0000\u01c1\u01c0\u0001\u0000\u0000\u0000"+
		"\u01c1\u01c2\u0001\u0000\u0000\u0000\u01c2\u01c4\u0001\u0000\u0000\u0000"+
		"\u01c3\u01a9\u0001\u0000\u0000\u0000\u01c3\u01b4\u0001\u0000\u0000\u0000"+
		"\u01c4-\u0001\u0000\u0000\u0000\u01c5\u01c7\u0005R\u0000\u0000\u01c6\u01c5"+
		"\u0001\u0000\u0000\u0000\u01c7\u01ca\u0001\u0000\u0000\u0000\u01c8\u01c6"+
		"\u0001\u0000\u0000\u0000\u01c8\u01c9\u0001\u0000\u0000\u0000\u01c9/\u0001"+
		"\u0000\u0000\u0000\u01ca\u01c8\u0001\u0000\u0000\u0000\u01cb\u01cc\u0005"+
		"\u0012\u0000\u0000\u01cc\u01d7\u00032\u0019\u0000\u01cd\u01cf\u0005\u0012"+
		"\u0000\u0000\u01ce\u01d0\u0005R\u0000\u0000\u01cf\u01ce\u0001\u0000\u0000"+
		"\u0000\u01cf\u01d0\u0001\u0000\u0000\u0000\u01d0\u01d1\u0001\u0000\u0000"+
		"\u0000\u01d1\u01d3\u0005M\u0000\u0000\u01d2\u01d4\u00032\u0019\u0000\u01d3"+
		"\u01d2\u0001\u0000\u0000\u0000\u01d3\u01d4\u0001\u0000\u0000\u0000\u01d4"+
		"\u01d5\u0001\u0000\u0000\u0000\u01d5\u01d7\u0005N\u0000\u0000\u01d6\u01cb"+
		"\u0001\u0000\u0000\u0000\u01d6\u01cd\u0001\u0000\u0000\u0000\u01d7\u01d8"+
		"\u0001\u0000\u0000\u0000\u01d8\u01d9\u0003$\u0012\u0000\u01d91\u0001\u0000"+
		"\u0000\u0000\u01da\u01dd\u0003h4\u0000\u01db\u01dd\u0005J\u0000\u0000"+
		"\u01dc\u01da\u0001\u0000\u0000\u0000\u01dc\u01db\u0001\u0000\u0000\u0000"+
		"\u01dd\u01e2\u0001\u0000\u0000\u0000\u01de\u01df\u0005H\u0000\u0000\u01df"+
		"\u01e1\u00032\u0019\u0000\u01e0\u01de\u0001\u0000\u0000\u0000\u01e1\u01e4"+
		"\u0001\u0000\u0000\u0000\u01e2\u01e0\u0001\u0000\u0000\u0000\u01e2\u01e3"+
		"\u0001\u0000\u0000\u0000\u01e33\u0001\u0000\u0000\u0000\u01e4\u01e2\u0001"+
		"\u0000\u0000\u0000\u01e5\u01e7\u0005\u0010\u0000\u0000\u01e6\u01e5\u0001"+
		"\u0000\u0000\u0000\u01e6\u01e7\u0001\u0000\u0000\u0000\u01e7\u01ec\u0001"+
		"\u0000\u0000\u0000\u01e8\u01ea\u0005\u0011\u0000\u0000\u01e9\u01e8\u0001"+
		"\u0000\u0000\u0000\u01e9\u01ea\u0001\u0000\u0000\u0000\u01ea\u01ec\u0001"+
		"\u0000\u0000\u0000\u01eb\u01e6\u0001\u0000\u0000\u0000\u01eb\u01e9\u0001"+
		"\u0000\u0000\u0000\u01ec\u01ed\u0001\u0000\u0000\u0000\u01ed\u01ee\u0003"+
		"8\u001c\u0000\u01ee\u01ef\u0003:\u001d\u0000\u01ef\u01f2\u0001\u0000\u0000"+
		"\u0000\u01f0\u01f2\u00036\u001b\u0000\u01f1\u01eb\u0001\u0000\u0000\u0000"+
		"\u01f1\u01f0\u0001\u0000\u0000\u0000\u01f25\u0001\u0000\u0000\u0000\u01f3"+
		"\u01fa\u00050\u0000\u0000\u01f4\u01fb\u0007\u0002\u0000\u0000\u01f5\u01f6"+
		"\u0005O\u0000\u0000\u01f6\u01f8\u0005P\u0000\u0000\u01f7\u01f9\u0005C"+
		"\u0000\u0000\u01f8\u01f7\u0001\u0000\u0000\u0000\u01f8\u01f9\u0001\u0000"+
		"\u0000\u0000\u01f9\u01fb\u0001\u0000\u0000\u0000\u01fa\u01f4\u0001\u0000"+
		"\u0000\u0000\u01fa\u01f5\u0001\u0000\u0000\u0000\u01fb\u01fc\u0001\u0000"+
		"\u0000\u0000\u01fc\u01fd\u0005M\u0000\u0000\u01fd\u01fe\u0003l6\u0000"+
		"\u01fe\u01ff\u0005N\u0000\u0000\u01ff\u0200\u0001\u0000\u0000\u0000\u0200"+
		"\u0204\u0005T\u0000\u0000\u0201\u0203\u0003<\u001e\u0000\u0202\u0201\u0001"+
		"\u0000\u0000\u0000\u0203\u0206\u0001\u0000\u0000\u0000\u0204\u0202\u0001"+
		"\u0000\u0000\u0000\u0204\u0205\u0001\u0000\u0000\u0000\u0205\u0207\u0001"+
		"\u0000\u0000\u0000\u0206\u0204\u0001\u0000\u0000\u0000\u0207\u0208\u0005"+
		"U\u0000\u0000\u02087\u0001\u0000\u0000\u0000\u0209\u020b\u0005 \u0000"+
		"\u0000\u020a\u0209\u0001\u0000\u0000\u0000\u020a\u020b\u0001\u0000\u0000"+
		"\u0000\u020b\u020d\u0001\u0000\u0000\u0000\u020c\u020e\u0005\"\u0000\u0000"+
		"\u020d\u020c\u0001\u0000\u0000\u0000\u020d\u020e\u0001\u0000\u0000\u0000"+
		"\u020e\u0210\u0001\u0000\u0000\u0000\u020f\u0211\u0005\u0005\u0000\u0000"+
		"\u0210\u020f\u0001\u0000\u0000\u0000\u0210\u0211\u0001\u0000\u0000\u0000"+
		"\u0211\u0212\u0001\u0000\u0000\u0000\u0212\u0218\u0003j5\u0000\u0213\u0215"+
		"\u0005M\u0000\u0000\u0214\u0216\u0003l6\u0000\u0215\u0214\u0001\u0000"+
		"\u0000\u0000\u0215\u0216\u0001\u0000\u0000\u0000\u0216\u0217\u0001\u0000"+
		"\u0000\u0000\u0217\u0219\u0005N\u0000\u0000\u0218\u0213\u0001\u0000\u0000"+
		"\u0000\u0218\u0219\u0001\u0000\u0000\u0000\u0219\u0223\u0001\u0000\u0000"+
		"\u0000\u021a\u0220\u0005\u0005\u0000\u0000\u021b\u021d\u0005M\u0000\u0000"+
		"\u021c\u021e\u0003l6\u0000\u021d\u021c\u0001\u0000\u0000\u0000\u021d\u021e"+
		"\u0001\u0000\u0000\u0000\u021e\u021f\u0001\u0000\u0000\u0000\u021f\u0221"+
		"\u0005N\u0000\u0000\u0220\u021b\u0001\u0000\u0000\u0000\u0220\u0221\u0001"+
		"\u0000\u0000\u0000\u0221\u0223\u0001\u0000\u0000\u0000\u0222\u020a\u0001"+
		"\u0000\u0000\u0000\u0222\u021a\u0001\u0000\u0000\u0000\u02239\u0001\u0000"+
		"\u0000\u0000\u0224\u0228\u0005T\u0000\u0000\u0225\u0227\u0003<\u001e\u0000"+
		"\u0226\u0225\u0001\u0000\u0000\u0000\u0227\u022a\u0001\u0000\u0000\u0000"+
		"\u0228\u0226\u0001\u0000\u0000\u0000\u0228\u0229\u0001\u0000\u0000\u0000"+
		"\u0229\u022b\u0001\u0000\u0000\u0000\u022a\u0228\u0001\u0000\u0000\u0000"+
		"\u022b\u022e\u0005U\u0000\u0000\u022c\u022e\u0003<\u001e\u0000\u022d\u0224"+
		"\u0001\u0000\u0000\u0000\u022d\u022c\u0001\u0000\u0000\u0000\u022e;\u0001"+
		"\u0000\u0000\u0000\u022f\u0242\u0003`0\u0000\u0230\u0242\u0003b1\u0000"+
		"\u0231\u0242\u0003X,\u0000\u0232\u0242\u0003V+\u0000\u0233\u0242\u0003"+
		"R)\u0000\u0234\u0242\u0003T*\u0000\u0235\u0242\u0003H$\u0000\u0236\u0242"+
		"\u0003L&\u0000\u0237\u0242\u0003N\'\u0000\u0238\u0242\u0003^/\u0000\u0239"+
		"\u0242\u0003\\.\u0000\u023a\u0242\u0003P(\u0000\u023b\u0242\u0003J%\u0000"+
		"\u023c\u0242\u0003F#\u0000\u023d\u0242\u0003B!\u0000\u023e\u0242\u0003"+
		"D\"\u0000\u023f\u0242\u0003@ \u0000\u0240\u0242\u0003>\u001f\u0000\u0241"+
		"\u022f\u0001\u0000\u0000\u0000\u0241\u0230\u0001\u0000\u0000\u0000\u0241"+
		"\u0231\u0001\u0000\u0000\u0000\u0241\u0232\u0001\u0000\u0000\u0000\u0241"+
		"\u0233\u0001\u0000\u0000\u0000\u0241\u0234\u0001\u0000\u0000\u0000\u0241"+
		"\u0235\u0001\u0000\u0000\u0000\u0241\u0236\u0001\u0000\u0000\u0000\u0241"+
		"\u0237\u0001\u0000\u0000\u0000\u0241\u0238\u0001\u0000\u0000\u0000\u0241"+
		"\u0239\u0001\u0000\u0000\u0000\u0241\u023a\u0001\u0000\u0000\u0000\u0241"+
		"\u023b\u0001\u0000\u0000\u0000\u0241\u023c\u0001\u0000\u0000\u0000\u0241"+
		"\u023d\u0001\u0000\u0000\u0000\u0241\u023e\u0001\u0000\u0000\u0000\u0241"+
		"\u023f\u0001\u0000\u0000\u0000\u0241\u0240\u0001\u0000\u0000\u0000\u0242"+
		"=\u0001\u0000\u0000\u0000\u0243\u0247\u0005T\u0000\u0000\u0244\u0246\u0003"+
		"<\u001e\u0000\u0245\u0244\u0001\u0000\u0000\u0000\u0246\u0249\u0001\u0000"+
		"\u0000\u0000\u0247\u0245\u0001\u0000\u0000\u0000\u0247\u0248\u0001\u0000"+
		"\u0000\u0000\u0248\u024a\u0001\u0000\u0000\u0000\u0249\u0247\u0001\u0000"+
		"\u0000\u0000\u024a\u024b\u0005U\u0000\u0000\u024b?\u0001\u0000\u0000\u0000"+
		"\u024c\u024e\u0005-\u0000\u0000\u024d\u024f\u0003j5\u0000\u024e\u024d"+
		"\u0001\u0000\u0000\u0000\u024e\u024f\u0001\u0000\u0000\u0000\u024f\u0250"+
		"\u0001\u0000\u0000\u0000\u0250\u0251\u0005L\u0000\u0000\u0251A\u0001\u0000"+
		"\u0000\u0000\u0252\u0254\u0005+\u0000\u0000\u0253\u0255\u0003j5\u0000"+
		"\u0254\u0253\u0001\u0000\u0000\u0000\u0254\u0255\u0001\u0000\u0000\u0000"+
		"\u0255\u0256\u0001\u0000\u0000\u0000\u0256\u0257\u0005L\u0000\u0000\u0257"+
		"C\u0001\u0000\u0000\u0000\u0258\u025a\u0005,\u0000\u0000\u0259\u025b\u0003"+
		"j5\u0000\u025a\u0259\u0001\u0000\u0000\u0000\u025a\u025b\u0001\u0000\u0000"+
		"\u0000\u025b\u025c\u0001\u0000\u0000\u0000\u025c\u025d\u0005L\u0000\u0000"+
		"\u025dE\u0001\u0000\u0000\u0000\u025e\u025f\u0003j5\u0000\u025f\u0260"+
		"\u0005G\u0000\u0000\u0260G\u0001\u0000\u0000\u0000\u0261\u0262\u0005\u0002"+
		"\u0000\u0000\u0262\u0263\u0005M\u0000\u0000\u0263\u0264\u0003f3\u0000"+
		"\u0264\u0265\u0005N\u0000\u0000\u0265\u0277\u0005T\u0000\u0000\u0266\u0267"+
		"\u0005\u0003\u0000\u0000\u0267\u026a\u0003f3\u0000\u0268\u026a\u0005\u0004"+
		"\u0000\u0000\u0269\u0266\u0001\u0000\u0000\u0000\u0269\u0268\u0001\u0000"+
		"\u0000\u0000\u026a\u026b\u0001\u0000\u0000\u0000\u026b\u0273\u0005G\u0000"+
		"\u0000\u026c\u0274\u0003:\u001d\u0000\u026d\u026f\u0003<\u001e\u0000\u026e"+
		"\u026d\u0001\u0000\u0000\u0000\u026f\u0272\u0001\u0000\u0000\u0000\u0270"+
		"\u026e\u0001\u0000\u0000\u0000\u0270\u0271\u0001\u0000\u0000\u0000\u0271"+
		"\u0274\u0001\u0000\u0000\u0000\u0272\u0270\u0001\u0000\u0000\u0000\u0273"+
		"\u026c\u0001\u0000\u0000\u0000\u0273\u0270\u0001\u0000\u0000\u0000\u0274"+
		"\u0276\u0001\u0000\u0000\u0000\u0275\u0269\u0001\u0000\u0000\u0000\u0276"+
		"\u0279\u0001\u0000\u0000\u0000\u0277\u0275\u0001\u0000\u0000\u0000\u0277"+
		"\u0278\u0001\u0000\u0000\u0000\u0278\u027a\u0001\u0000\u0000\u0000\u0279"+
		"\u0277\u0001\u0000\u0000\u0000\u027a\u027b\u0005U\u0000\u0000\u027bI\u0001"+
		"\u0000\u0000\u0000\u027c\u027d\u0005\u0006\u0000\u0000\u027d\u027e\u0003"+
		"f3\u0000\u027eK\u0001\u0000\u0000\u0000\u027f\u0280\u0005\t\u0000\u0000"+
		"\u0280\u0281\u0005M\u0000\u0000\u0281\u0282\u0005\u0017\u0000\u0000\u0282"+
		"\u0283\u0005B\u0000\u0000\u0283\u0284\u0005%\u0000\u0000\u0284\u0285\u0003"+
		"f3\u0000\u0285\u0286\u0005N\u0000\u0000\u0286\u0287\u0003:\u001d\u0000"+
		"\u0287M\u0001\u0000\u0000\u0000\u0288\u0289\u0005$\u0000\u0000\u0289\u028a"+
		"\u0005M\u0000\u0000\u028a\u028b\u0003f3\u0000\u028b\u028c\u0005%\u0000"+
		"\u0000\u028c\u028d\u0003f3\u0000\u028d\u028e\u0005N\u0000\u0000\u028e"+
		"\u028f\u0003:\u001d\u0000\u028fO\u0001\u0000\u0000\u0000\u0290\u0292\u0005"+
		"!\u0000\u0000\u0291\u0293\u0003f3\u0000\u0292\u0291\u0001\u0000\u0000"+
		"\u0000\u0292\u0293\u0001\u0000\u0000\u0000\u0293\u0294\u0001\u0000\u0000"+
		"\u0000\u0294\u0295\u0005L\u0000\u0000\u0295Q\u0001\u0000\u0000\u0000\u0296"+
		"\u0297\u0005\u0014\u0000\u0000\u0297\u0298\u0003:\u001d\u0000\u0298\u0299"+
		"\u0005\u0015\u0000\u0000\u0299\u029b\u0005M\u0000\u0000\u029a\u029c\u0003"+
		"f3\u0000\u029b\u029a\u0001\u0000\u0000\u0000\u029b\u029c\u0001\u0000\u0000"+
		"\u0000\u029c\u029d\u0001\u0000\u0000\u0000\u029d\u029e\u0005N\u0000\u0000"+
		"\u029eS\u0001\u0000\u0000\u0000\u029f\u02a0\u0005\u0015\u0000\u0000\u02a0"+
		"\u02a2\u0005M\u0000\u0000\u02a1\u02a3\u0003f3\u0000\u02a2\u02a1\u0001"+
		"\u0000\u0000\u0000\u02a2\u02a3\u0001\u0000\u0000\u0000\u02a3\u02a4\u0001"+
		"\u0000\u0000\u0000\u02a4\u02a5\u0005N\u0000\u0000\u02a5\u02a6\u0003:\u001d"+
		"\u0000\u02a6U\u0001\u0000\u0000\u0000\u02a7\u02a8\u0005\t\u0000\u0000"+
		"\u02a8\u02aa\u0005M\u0000\u0000\u02a9\u02ab\u0003f3\u0000\u02aa\u02a9"+
		"\u0001\u0000\u0000\u0000\u02aa\u02ab\u0001\u0000\u0000\u0000\u02ab\u02ac"+
		"\u0001\u0000\u0000\u0000\u02ac\u02ae\u0005L\u0000\u0000\u02ad\u02af\u0003"+
		"f3\u0000\u02ae\u02ad\u0001\u0000\u0000\u0000\u02ae\u02af\u0001\u0000\u0000"+
		"\u0000\u02af\u02b0\u0001\u0000\u0000\u0000\u02b0\u02b2\u0005L\u0000\u0000"+
		"\u02b1\u02b3\u0003f3\u0000\u02b2\u02b1\u0001\u0000\u0000\u0000\u02b2\u02b3"+
		"\u0001\u0000\u0000\u0000\u02b3\u02b4\u0001\u0000\u0000\u0000\u02b4\u02b5"+
		"\u0005N\u0000\u0000\u02b5\u02b6\u0003:\u001d\u0000\u02b6W\u0001\u0000"+
		"\u0000\u0000\u02b7\u02b8\u0005\n\u0000\u0000\u02b8\u02c2\u0003:\u001d"+
		"\u0000\u02b9\u02ba\u0005\u000b\u0000\u0000\u02ba\u02bc\u0005M\u0000\u0000"+
		"\u02bb\u02bd\u0003l6\u0000\u02bc\u02bb\u0001\u0000\u0000\u0000\u02bc\u02bd"+
		"\u0001\u0000\u0000\u0000\u02bd\u02be\u0001\u0000\u0000\u0000\u02be\u02bf"+
		"\u0005N\u0000\u0000\u02bf\u02c1\u0003:\u001d\u0000\u02c0\u02b9\u0001\u0000"+
		"\u0000\u0000\u02c1\u02c4\u0001\u0000\u0000\u0000\u02c2\u02c0\u0001\u0000"+
		"\u0000\u0000\u02c2\u02c3\u0001\u0000\u0000\u0000\u02c3\u02c7\u0001\u0000"+
		"\u0000\u0000\u02c4\u02c2\u0001\u0000\u0000\u0000\u02c5\u02c6\u0005\f\u0000"+
		"\u0000\u02c6\u02c8\u0003:\u001d\u0000\u02c7\u02c5\u0001\u0000\u0000\u0000"+
		"\u02c7\u02c8\u0001\u0000\u0000\u0000\u02c8Y\u0001\u0000\u0000\u0000\u02c9"+
		"\u02cc\u0003f3\u0000\u02ca\u02cb\u0005I\u0000\u0000\u02cb\u02cd\u0003"+
		"Z-\u0000\u02cc\u02ca\u0001\u0000\u0000\u0000\u02cc\u02cd\u0001\u0000\u0000"+
		"\u0000\u02cd[\u0001\u0000\u0000\u0000\u02ce\u02d0\u0003f3\u0000\u02cf"+
		"\u02ce\u0001\u0000\u0000\u0000\u02cf\u02d0\u0001\u0000\u0000\u0000\u02d0"+
		"\u02d1\u0001\u0000\u0000\u0000\u02d1\u02d2\u0005L\u0000\u0000\u02d2]\u0001"+
		"\u0000\u0000\u0000\u02d3\u02d4\u0005Q\u0000\u0000\u02d4\u02d5\u0005L\u0000"+
		"\u0000\u02d5_\u0001\u0000\u0000\u0000\u02d6\u02d7\u0005\u0017\u0000\u0000"+
		"\u02d7\u02da\u0003j5\u0000\u02d8\u02d9\u0005C\u0000\u0000\u02d9\u02db"+
		"\u0003f3\u0000\u02da\u02d8\u0001\u0000\u0000\u0000\u02da\u02db\u0001\u0000"+
		"\u0000\u0000\u02db\u02dc\u0001\u0000\u0000\u0000\u02dc\u02dd\u0005L\u0000"+
		"\u0000\u02dda\u0001\u0000\u0000\u0000\u02de\u02df\u0005\u0013\u0000\u0000"+
		"\u02df\u02e5\u0003d2\u0000\u02e0\u02e1\u0005\u0016\u0000\u0000\u02e1\u02e2"+
		"\u0005\u0013\u0000\u0000\u02e2\u02e4\u0003d2\u0000\u02e3\u02e0\u0001\u0000"+
		"\u0000\u0000\u02e4\u02e7\u0001\u0000\u0000\u0000\u02e5\u02e3\u0001\u0000"+
		"\u0000\u0000\u02e5\u02e6\u0001\u0000\u0000\u0000\u02e6\u02ea\u0001\u0000"+
		"\u0000\u0000\u02e7\u02e5\u0001\u0000\u0000\u0000\u02e8\u02e9\u0005\u0016"+
		"\u0000\u0000\u02e9\u02eb\u0003:\u001d\u0000\u02ea\u02e8\u0001\u0000\u0000"+
		"\u0000\u02ea\u02eb\u0001\u0000\u0000\u0000\u02ebc\u0001\u0000\u0000\u0000"+
		"\u02ec\u02ed\u0005M\u0000\u0000\u02ed\u02ee\u0003f3\u0000\u02ee\u02ef"+
		"\u0005N\u0000\u0000\u02ef\u02f0\u0003:\u001d\u0000\u02f0e\u0001\u0000"+
		"\u0000\u0000\u02f1\u02f2\u00063\uffff\uffff\u0000\u02f2\u02f4\u0005O\u0000"+
		"\u0000\u02f3\u02f5\u0003f3\u0000\u02f4\u02f3\u0001\u0000\u0000\u0000\u02f4"+
		"\u02f5\u0001\u0000\u0000\u0000\u02f5\u02f6\u0001\u0000\u0000\u0000\u02f6"+
		"\u031d\u0005P\u0000\u0000\u02f7\u02f8\u0005\u001c\u0000\u0000\u02f8\u031d"+
		"\u0003f3%\u02f9\u02fa\u0005\u001b\u0000\u0000\u02fa\u031d\u0003f3$\u02fb"+
		"\u02fc\u0005\u000f\u0000\u0000\u02fc\u031d\u0003f3#\u02fd\u031d\u0003"+
		"h4\u0000\u02fe\u02ff\u0005B\u0000\u0000\u02ff\u031d\u0003$\u0012\u0000"+
		"\u0300\u0302\u0005M\u0000\u0000\u0301\u0303\u0003f3\u0000\u0302\u0301"+
		"\u0001\u0000\u0000\u0000\u0302\u0303\u0001\u0000\u0000\u0000\u0303\u0304"+
		"\u0001\u0000\u0000\u0000\u0304\u031d\u0005N\u0000\u0000\u0305\u0306\u0005"+
		"\u0017\u0000\u0000\u0306\u031d\u0003f3\u001b\u0307\u0308\u0005\"\u0000"+
		"\u0000\u0308\u031d\u0003f3\u001a\u0309\u030a\u0005\u0007\u0000\u0000\u030a"+
		"\u031d\u0003f3\u0019\u030b\u030d\u0005T\u0000\u0000\u030c\u030e\u0003"+
		"l6\u0000\u030d\u030c\u0001\u0000\u0000\u0000\u030d\u030e\u0001\u0000\u0000"+
		"\u0000\u030e\u030f\u0001\u0000\u0000\u0000\u030f\u0311\u0005G\u0000\u0000"+
		"\u0310\u0312\u0003f3\u0000\u0311\u0310\u0001\u0000\u0000\u0000\u0311\u0312"+
		"\u0001\u0000\u0000\u0000\u0312\u0313\u0001\u0000\u0000\u0000\u0313\u031d"+
		"\u0005U\u0000\u0000\u0314\u0315\u0005?\u0000\u0000\u0315\u031d\u0003f"+
		"3\f\u0316\u0317\u0005J\u0000\u0000\u0317\u0318\u0005?\u0000\u0000\u0318"+
		"\u031d\u0003f3\u000b\u0319\u031a\u0007\u0003\u0000\u0000\u031a\u031d\u0003"+
		"f3\u0005\u031b\u031d\u00034\u001a\u0000\u031c\u02f1\u0001\u0000\u0000"+
		"\u0000\u031c\u02f7\u0001\u0000\u0000\u0000\u031c\u02f9\u0001\u0000\u0000"+
		"\u0000\u031c\u02fb\u0001\u0000\u0000\u0000\u031c\u02fd\u0001\u0000\u0000"+
		"\u0000\u031c\u02fe\u0001\u0000\u0000\u0000\u031c\u0300\u0001\u0000\u0000"+
		"\u0000\u031c\u0305\u0001\u0000\u0000\u0000\u031c\u0307\u0001\u0000\u0000"+
		"\u0000\u031c\u0309\u0001\u0000\u0000\u0000\u031c\u030b\u0001\u0000\u0000"+
		"\u0000\u031c\u0314\u0001\u0000\u0000\u0000\u031c\u0316\u0001\u0000\u0000"+
		"\u0000\u031c\u0319\u0001\u0000\u0000\u0000\u031c\u031b\u0001\u0000\u0000"+
		"\u0000\u031d\u039f\u0001\u0000\u0000\u0000\u031e\u031f\n(\u0000\u0000"+
		"\u031f\u0320\u0005I\u0000\u0000\u0320\u039e\u0003f3)\u0321\u0322\n\u0018"+
		"\u0000\u0000\u0322\u0323\u00052\u0000\u0000\u0323\u039e\u0003f3\u0019"+
		"\u0324\u0325\n\u0017\u0000\u0000\u0325\u0326\u0005)\u0000\u0000\u0326"+
		"\u0327\u0005%\u0000\u0000\u0327\u039e\u0003f3\u0018\u0328\u0329\n\u0016"+
		"\u0000\u0000\u0329\u032a\u0005*\u0000\u0000\u032a\u032b\u0005%\u0000\u0000"+
		"\u032b\u039e\u0003f3\u0017\u032c\u032d\n\u0015\u0000\u0000\u032d\u032e"+
		"\u0005*\u0000\u0000\u032e\u039e\u0003f3\u0016\u032f\u0330\n\u0014\u0000"+
		"\u0000\u0330\u0331\u0005%\u0000\u0000\u0331\u039e\u0003f3\u0015\u0332"+
		"\u0333\n\u0013\u0000\u0000\u0333\u0334\u0005C\u0000\u0000\u0334\u039e"+
		"\u0003f3\u0014\u0335\u0336\n\u0012\u0000\u0000\u0336\u0337\u00056\u0000"+
		"\u0000\u0337\u039e\u0003f3\u0013\u0338\u0339\n\u0010\u0000\u0000\u0339"+
		"\u033b\u0007\u0004\u0000\u0000\u033a\u033c\u0005C\u0000\u0000\u033b\u033a"+
		"\u0001\u0000\u0000\u0000\u033b\u033c\u0001\u0000\u0000\u0000\u033c\u033d"+
		"\u0001\u0000\u0000\u0000\u033d\u039e\u0003f3\u0011\u033e\u033f\n\u000f"+
		"\u0000\u0000\u033f\u0340\u0007\u0005\u0000\u0000\u0340\u039e\u0003f3\u0010"+
		"\u0341\u0342\n\u000e\u0000\u0000\u0342\u0344\u0005A\u0000\u0000\u0343"+
		"\u0345\u0005C\u0000\u0000\u0344\u0343\u0001\u0000\u0000\u0000\u0344\u0345"+
		"\u0001\u0000\u0000\u0000\u0345\u0346\u0001\u0000\u0000\u0000\u0346\u039e"+
		"\u0003f3\u000f\u0347\u0348\n\r\u0000\u0000\u0348\u0349\u0005?\u0000\u0000"+
		"\u0349\u039e\u0003f3\u000e\u034a\u034b\n\n\u0000\u0000\u034b\u034d\u0007"+
		"\u0006\u0000\u0000\u034c\u034e\u0005C\u0000\u0000\u034d\u034c\u0001\u0000"+
		"\u0000\u0000\u034d\u034e\u0001\u0000\u0000\u0000\u034e\u034f\u0001\u0000"+
		"\u0000\u0000\u034f\u039e\u0003f3\u000b\u0350\u0351\n\t\u0000\u0000\u0351"+
		"\u0353\u0007\u0007\u0000\u0000\u0352\u0354\u0005C\u0000\u0000\u0353\u0352"+
		"\u0001\u0000\u0000\u0000\u0353\u0354\u0001\u0000\u0000\u0000\u0354\u0355"+
		"\u0001\u0000\u0000\u0000\u0355\u039e\u0003f3\n\u0356\u0357\n\b\u0000\u0000"+
		"\u0357\u0358\u0007\b\u0000\u0000\u0358\u039e\u0003f3\t\u0359\u035a\n\u0007"+
		"\u0000\u0000\u035a\u035b\u0007\t\u0000\u0000\u035b\u039e\u0003f3\b\u035c"+
		"\u035d\n\u0006\u0000\u0000\u035d\u035f\u0007\n\u0000\u0000\u035e\u0360"+
		"\u0005C\u0000\u0000\u035f\u035e\u0001\u0000\u0000\u0000\u035f\u0360\u0001"+
		"\u0000\u0000\u0000\u0360\u0361\u0001\u0000\u0000\u0000\u0361\u039e\u0003"+
		"f3\u0007\u0362\u0363\n\u0003\u0000\u0000\u0363\u0364\u00055\u0000\u0000"+
		"\u0364\u0365\u0003f3\u0000\u0365\u0366\u0005G\u0000\u0000\u0366\u0367"+
		"\u0003f3\u0004\u0367\u039e\u0001\u0000\u0000\u0000\u0368\u0369\n\u0001"+
		"\u0000\u0000\u0369\u036a\u0005H\u0000\u0000\u036a\u039e\u0003f3\u0002"+
		"\u036b\u036c\n\'\u0000\u0000\u036c\u036e\u0005O\u0000\u0000\u036d\u036f"+
		"\u0003f3\u0000\u036e\u036d\u0001\u0000\u0000\u0000\u036e\u036f\u0001\u0000"+
		"\u0000\u0000\u036f\u0370\u0001\u0000\u0000\u0000\u0370\u039e\u0005P\u0000"+
		"\u0000\u0371\u0372\n&\u0000\u0000\u0372\u0373\u0005\'\u0000\u0000\u0373"+
		"\u0376\u0003f3\u0000\u0374\u0375\u0005(\u0000\u0000\u0375\u0377\u0003"+
		"f3\u0000\u0376\u0374\u0001\u0000\u0000\u0000\u0376\u0377\u0001\u0000\u0000"+
		"\u0000\u0377\u039e\u0001\u0000\u0000\u0000\u0378\u0379\n!\u0000\u0000"+
		"\u0379\u037b\u0005M\u0000\u0000\u037a\u037c\u0003l6\u0000\u037b\u037a"+
		"\u0001\u0000\u0000\u0000\u037c\u037d\u0001\u0000\u0000\u0000\u037d\u037b"+
		"\u0001\u0000\u0000\u0000\u037d\u037e\u0001\u0000\u0000\u0000\u037e\u037f"+
		"\u0001\u0000\u0000\u0000\u037f\u0380\u0005N\u0000\u0000\u0380\u039e\u0001"+
		"\u0000\u0000\u0000\u0381\u0382\n \u0000\u0000\u0382\u0384\u0005M\u0000"+
		"\u0000\u0383\u0385\u0003f3\u0000\u0384\u0383\u0001\u0000\u0000\u0000\u0384"+
		"\u0385\u0001\u0000\u0000\u0000\u0385\u0386\u0001\u0000\u0000\u0000\u0386"+
		"\u039e\u0005N\u0000\u0000\u0387\u0388\n\u001e\u0000\u0000\u0388\u038a"+
		"\u0005T\u0000\u0000\u0389\u038b\u0003l6\u0000\u038a\u0389\u0001\u0000"+
		"\u0000\u0000\u038a\u038b\u0001\u0000\u0000\u0000\u038b\u038c\u0001\u0000"+
		"\u0000\u0000\u038c\u038e\u0005G\u0000\u0000\u038d\u038f\u0003f3\u0000"+
		"\u038e\u038d\u0001\u0000\u0000\u0000\u038e\u038f\u0001\u0000\u0000\u0000"+
		"\u038f\u0390\u0001\u0000\u0000\u0000\u0390\u039e\u0005U\u0000\u0000\u0391"+
		"\u0392\n\u001d\u0000\u0000\u0392\u0393\u0005G\u0000\u0000\u0393\u0394"+
		"\u0003(\u0014\u0000\u0394\u0395\u0003$\u0012\u0000\u0395\u039e\u0001\u0000"+
		"\u0000\u0000\u0396\u039b\n\u0004\u0000\u0000\u0397\u0398\u00057\u0000"+
		"\u0000\u0398\u039c\u00057\u0000\u0000\u0399\u039a\u0005:\u0000\u0000\u039a"+
		"\u039c\u0005:\u0000\u0000\u039b\u0397\u0001\u0000\u0000\u0000\u039b\u0399"+
		"\u0001\u0000\u0000\u0000\u039c\u039e\u0001\u0000\u0000\u0000\u039d\u031e"+
		"\u0001\u0000\u0000\u0000\u039d\u0321\u0001\u0000\u0000\u0000\u039d\u0324"+
		"\u0001\u0000\u0000\u0000\u039d\u0328\u0001\u0000\u0000\u0000\u039d\u032c"+
		"\u0001\u0000\u0000\u0000\u039d\u032f\u0001\u0000\u0000\u0000\u039d\u0332"+
		"\u0001\u0000\u0000\u0000\u039d\u0335\u0001\u0000\u0000\u0000\u039d\u0338"+
		"\u0001\u0000\u0000\u0000\u039d\u033e\u0001\u0000\u0000\u0000\u039d\u0341"+
		"\u0001\u0000\u0000\u0000\u039d\u0347\u0001\u0000\u0000\u0000\u039d\u034a"+
		"\u0001\u0000\u0000\u0000\u039d\u0350\u0001\u0000\u0000\u0000\u039d\u0356"+
		"\u0001\u0000\u0000\u0000\u039d\u0359\u0001\u0000\u0000\u0000\u039d\u035c"+
		"\u0001\u0000\u0000\u0000\u039d\u0362\u0001\u0000\u0000\u0000\u039d\u0368"+
		"\u0001\u0000\u0000\u0000\u039d\u036b\u0001\u0000\u0000\u0000\u039d\u0371"+
		"\u0001\u0000\u0000\u0000\u039d\u0378\u0001\u0000\u0000\u0000\u039d\u0381"+
		"\u0001\u0000\u0000\u0000\u039d\u0387\u0001\u0000\u0000\u0000\u039d\u0391"+
		"\u0001\u0000\u0000\u0000\u039d\u0396\u0001\u0000\u0000\u0000\u039e\u03a1"+
		"\u0001\u0000\u0000\u0000\u039f\u039d\u0001\u0000\u0000\u0000\u039f\u03a0"+
		"\u0001\u0000\u0000\u0000\u03a0g\u0001\u0000\u0000\u0000\u03a1\u039f\u0001"+
		"\u0000\u0000\u0000\u03a2\u03ae\u0005\u001b\u0000\u0000\u03a3\u03ae\u0005"+
		"E\u0000\u0000\u03a4\u03ae\u0005D\u0000\u0000\u03a5\u03a6\u00052\u0000"+
		"\u0000\u03a6\u03ae\u0003j5\u0000\u03a7\u03ae\u0003j5\u0000\u03a8\u03ae"+
		"\u0005R\u0000\u0000\u03a9\u03ae\u0005Q\u0000\u0000\u03aa\u03ae\u0005S"+
		"\u0000\u0000\u03ab\u03ae\u0005\u0018\u0000\u0000\u03ac\u03ae\u0005\u0019"+
		"\u0000\u0000\u03ad\u03a2\u0001\u0000\u0000\u0000\u03ad\u03a3\u0001\u0000"+
		"\u0000\u0000\u03ad\u03a4\u0001\u0000\u0000\u0000\u03ad\u03a5\u0001\u0000"+
		"\u0000\u0000\u03ad\u03a7\u0001\u0000\u0000\u0000\u03ad\u03a8\u0001\u0000"+
		"\u0000\u0000\u03ad\u03a9\u0001\u0000\u0000\u0000\u03ad\u03aa\u0001\u0000"+
		"\u0000\u0000\u03ad\u03ab\u0001\u0000\u0000\u0000\u03ad\u03ac\u0001\u0000"+
		"\u0000\u0000\u03aei\u0001\u0000\u0000\u0000\u03af\u03b0\u0007\u000b\u0000"+
		"\u0000\u03b0k\u0001\u0000\u0000\u0000\u03b1\u03b5\u0003n7\u0000\u03b2"+
		"\u03b5\u0005&\u0000\u0000\u03b3\u03b5\u0003\"\u0011\u0000\u03b4\u03b1"+
		"\u0001\u0000\u0000\u0000\u03b4\u03b2\u0001\u0000\u0000\u0000\u03b4\u03b3"+
		"\u0001\u0000\u0000\u0000\u03b5\u03bc\u0001\u0000\u0000\u0000\u03b6\u03b8"+
		"\u0005H\u0000\u0000\u03b7\u03b9\u0003l6\u0000\u03b8\u03b7\u0001\u0000"+
		"\u0000\u0000\u03b8\u03b9\u0001\u0000\u0000\u0000\u03b9\u03bb\u0001\u0000"+
		"\u0000\u0000\u03ba\u03b6\u0001\u0000\u0000\u0000\u03bb\u03be\u0001\u0000"+
		"\u0000\u0000\u03bc\u03ba\u0001\u0000\u0000\u0000\u03bc\u03bd\u0001\u0000"+
		"\u0000\u0000\u03bdm\u0001\u0000\u0000\u0000\u03be\u03bc\u0001\u0000\u0000"+
		"\u0000\u03bf\u03c0\u0003j5\u0000\u03c0\u03c1\u0005G\u0000\u0000\u03c1"+
		"\u03c3\u0001\u0000\u0000\u0000\u03c2\u03bf\u0001\u0000\u0000\u0000\u03c2"+
		"\u03c3\u0001\u0000\u0000\u0000\u03c3\u03c5\u0001\u0000\u0000\u0000\u03c4"+
		"\u03c6\u0003j5\u0000\u03c5\u03c4\u0001\u0000\u0000\u0000\u03c5\u03c6\u0001"+
		"\u0000\u0000\u0000\u03c6\u03c7\u0001\u0000\u0000\u0000\u03c7\u03c9\u0003"+
		"j5\u0000\u03c8\u03ca\u00055\u0000\u0000\u03c9\u03c8\u0001\u0000\u0000"+
		"\u0000\u03c9\u03ca\u0001\u0000\u0000\u0000\u03ca\u03d7\u0001\u0000\u0000"+
		"\u0000\u03cb\u03cc\u0003j5\u0000\u03cc\u03ce\u0005G\u0000\u0000\u03cd"+
		"\u03cf\u00055\u0000\u0000\u03ce\u03cd\u0001\u0000\u0000\u0000\u03ce\u03cf"+
		"\u0001\u0000\u0000\u0000\u03cf\u03d7\u0001\u0000\u0000\u0000\u03d0\u03d1"+
		"\u0003j5\u0000\u03d1\u03d2\u0005G\u0000\u0000\u03d2\u03d4\u0005C\u0000"+
		"\u0000\u03d3\u03d5\u0003f3\u0000\u03d4\u03d3\u0001\u0000\u0000\u0000\u03d4"+
		"\u03d5\u0001\u0000\u0000\u0000\u03d5\u03d7\u0001\u0000\u0000\u0000\u03d6"+
		"\u03c2\u0001\u0000\u0000\u0000\u03d6\u03cb\u0001\u0000\u0000\u0000\u03d6"+
		"\u03d0\u0001\u0000\u0000\u0000\u03d7o\u0001\u0000\u0000\u0000\u0085s\u0083"+
		"\u0091\u0095\u009a\u00a7\u00af\u00b5\u00bc\u00c0\u00cb\u00cd\u00d4\u00d8"+
		"\u00df\u00e7\u00f0\u00f8\u00fd\u0104\u010c\u0112\u0115\u0118\u011c\u0122"+
		"\u0128\u012d\u0134\u0137\u013a\u013c\u0141\u0145\u014b\u014d\u0151\u0155"+
		"\u015d\u0165\u0167\u0170\u0175\u017b\u017e\u0185\u018b\u0197\u019d\u01a3"+
		"\u01a5\u01ab\u01af\u01b2\u01b6\u01bc\u01c1\u01c3\u01c8\u01cf\u01d3\u01d6"+
		"\u01dc\u01e2\u01e6\u01e9\u01eb\u01f1\u01f8\u01fa\u0204\u020a\u020d\u0210"+
		"\u0215\u0218\u021d\u0220\u0222\u0228\u022d\u0241\u0247\u024e\u0254\u025a"+
		"\u0269\u0270\u0273\u0277\u0292\u029b\u02a2\u02aa\u02ae\u02b2\u02bc\u02c2"+
		"\u02c7\u02cc\u02cf\u02da\u02e5\u02ea\u02f4\u0302\u030d\u0311\u031c\u033b"+
		"\u0344\u034d\u0353\u035f\u036e\u0376\u037d\u0384\u038a\u038e\u039b\u039d"+
		"\u039f\u03ad\u03b4\u03b8\u03bc\u03c2\u03c5\u03c9\u03ce\u03d4\u03d6";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}