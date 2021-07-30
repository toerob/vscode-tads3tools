// Generated from /Users/tomasoberg/repos/tads3vscodehelper/client/src/extension/modules/parser/T3Parser.g4 by ANTLR 4.8
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class T3ParserParser extends Parser {
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
		BREAK=43, CONTINUE=44, GOTO=45, TOKEN=46, AT=47, AMP=48, HASH=49, NOT=50, 
		OPTIONAL=51, IFNIL=52, PLUS=53, DIV=54, MOD=55, MINUS=56, NEQ=57, EQ=58, 
		AND=59, OR=60, ARROW=61, TILDE=62, POW=63, ID=64, ASSIGN=65, NR=66, HEX=67, 
		OCT=68, COLON=69, COMMA=70, DOT=71, STAR=72, BITWISE_OR=73, SEMICOLON=74, 
		LEFT_PAREN=75, RIGHT_PAREN=76, LEFT_BRACKET=77, RIGHT_BRACKET=78, DSTR=79, 
		SSTR=80, RSTR=81, LEFT_CURLY=82, RIGHT_CURLY=83, LTEQ=84, ARITHMETIC_LEFT=85, 
		LT=86, GTEQ=87, GT=88, ARITHMETIC_RIGHT=89, LOGICAL_RIGHT_SHIFT=90, COMMENT=91, 
		LINE_COMMENT=92, WS=93, ANY=94;
	public static final int
		RULE_program = 0, RULE_directive = 1, RULE_grammarDeclaration = 2, RULE_grammarRules = 3, 
		RULE_itemList = 4, RULE_qualifiers = 5, RULE_item = 6, RULE_templateDeclaration = 7, 
		RULE_enumDeclaration = 8, RULE_propertyDeclaration = 9, RULE_dictionaryDeclaration = 10, 
		RULE_exportDeclaration = 11, RULE_intrinsicDeclaration = 12, RULE_intrinsicMethodDeclaration = 13, 
		RULE_objectDeclaration = 14, RULE_templateExpr = 15, RULE_array = 16, 
		RULE_curlyObjectBody = 17, RULE_semiColonEndedObjectBody = 18, RULE_superTypes = 19, 
		RULE_objectBody = 20, RULE_property = 21, RULE_dictionaryProperty = 22, 
		RULE_propertySet = 23, RULE_paramsWithWildcard = 24, RULE_functionDeclaration = 25, 
		RULE_functionHead = 26, RULE_codeBlock = 27, RULE_stats = 28, RULE_gotoStatement = 29, 
		RULE_breakStatement = 30, RULE_continueStatement = 31, RULE_labelStatement = 32, 
		RULE_switchStatement = 33, RULE_throwStatement = 34, RULE_forInStatement = 35, 
		RULE_forEachStatement = 36, RULE_returnStatement = 37, RULE_doWhileStatement = 38, 
		RULE_whileStatement = 39, RULE_forStatement = 40, RULE_tryCatchStatement = 41, 
		RULE_callStatement = 42, RULE_emptyStatement = 43, RULE_sayStatement = 44, 
		RULE_assignmentStatement = 45, RULE_ifStatement = 46, RULE_enclosedExprCodeBlock = 47, 
		RULE_expr = 48, RULE_primary = 49, RULE_identifierAtom = 50, RULE_params = 51, 
		RULE_optionallyTypedOptionalId = 52;
	private static String[] makeRuleNames() {
		return new String[] {
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
			"params", "optionallyTypedOptionalId"
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
			"'goto'", "'token'", "'@'", "'&'", "'#'", "'!'", "'?'", "'??'", "'+'", 
			"'/'", "'%'", "'-'", "'!='", "'=='", "'&&'", "'||'", "'->'", "'~'", "'^'", 
			null, "'='", null, null, null, "':'", "','", "'.'", "'*'", "'|'", "';'", 
			"'('", "')'", "'['", "']'", null, null, null, "'{'", "'}'", "'<='", "'<<'", 
			"'<'", "'>='", "'>'", "'>>'", "'>>>'"
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
			"AT", "AMP", "HASH", "NOT", "OPTIONAL", "IFNIL", "PLUS", "DIV", "MOD", 
			"MINUS", "NEQ", "EQ", "AND", "OR", "ARROW", "TILDE", "POW", "ID", "ASSIGN", 
			"NR", "HEX", "OCT", "COLON", "COMMA", "DOT", "STAR", "BITWISE_OR", "SEMICOLON", 
			"LEFT_PAREN", "RIGHT_PAREN", "LEFT_BRACKET", "RIGHT_BRACKET", "DSTR", 
			"SSTR", "RSTR", "LEFT_CURLY", "RIGHT_CURLY", "LTEQ", "ARITHMETIC_LEFT", 
			"LT", "GTEQ", "GT", "ARITHMETIC_RIGHT", "LOGICAL_RIGHT_SHIFT", "COMMENT", 
			"LINE_COMMENT", "WS", "ANY"
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
	public String getGrammarFileName() { return "T3Parser.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public T3ParserParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class ProgramContext extends ParserRuleContext {
		public DirectiveContext directive;
		public List<DirectiveContext> directives = new ArrayList<DirectiveContext>();
		public TerminalNode EOF() { return getToken(T3ParserParser.EOF, 0); }
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
			setState(109);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 1)) & ~0x3f) == 0 && ((1L << (_la - 1)) & ((1L << (GRAMMAR - 1)) | (1L << (FUNCTION - 1)) | (1L << (ENUM - 1)) | (1L << (CLASS - 1)) | (1L << (TRANSIENT - 1)) | (1L << (MODIFY - 1)) | (1L << (REPLACE - 1)) | (1L << (INTRINSIC - 1)) | (1L << (PROPERTY - 1)) | (1L << (DICTIONARY - 1)) | (1L << (EXPORT - 1)) | (1L << (EXTERN - 1)) | (1L << (STATIC - 1)) | (1L << (STRING - 1)) | (1L << (IN - 1)) | (1L << (PLUS - 1)) | (1L << (ID - 1)))) != 0)) {
				{
				{
				setState(106);
				((ProgramContext)_localctx).directive = directive();
				((ProgramContext)_localctx).directives.add(((ProgramContext)_localctx).directive);
				}
				}
				setState(111);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(112);
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
		public DirectiveContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_directive; }
	}

	public final DirectiveContext directive() throws RecognitionException {
		DirectiveContext _localctx = new DirectiveContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_directive);
		try {
			setState(123);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(114);
				enumDeclaration();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(115);
				templateDeclaration();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(116);
				intrinsicDeclaration();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(117);
				exportDeclaration();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(118);
				objectDeclaration();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(119);
				propertyDeclaration();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(120);
				dictionaryDeclaration();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(121);
				functionDeclaration();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(122);
				grammarDeclaration();
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

	public static class GrammarDeclarationContext extends ParserRuleContext {
		public Token isModify;
		public Token isReplace;
		public IdentifierAtomContext prodName;
		public IdentifierAtomContext tag;
		public TerminalNode GRAMMAR() { return getToken(T3ParserParser.GRAMMAR, 0); }
		public List<TerminalNode> COLON() { return getTokens(T3ParserParser.COLON); }
		public TerminalNode COLON(int i) {
			return getToken(T3ParserParser.COLON, i);
		}
		public GrammarRulesContext grammarRules() {
			return getRuleContext(GrammarRulesContext.class,0);
		}
		public SuperTypesContext superTypes() {
			return getRuleContext(SuperTypesContext.class,0);
		}
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public CurlyObjectBodyContext curlyObjectBody() {
			return getRuleContext(CurlyObjectBodyContext.class,0);
		}
		public SemiColonEndedObjectBodyContext semiColonEndedObjectBody() {
			return getRuleContext(SemiColonEndedObjectBodyContext.class,0);
		}
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
		public TerminalNode MODIFY() { return getToken(T3ParserParser.MODIFY, 0); }
		public TerminalNode REPLACE() { return getToken(T3ParserParser.REPLACE, 0); }
		public GrammarDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_grammarDeclaration; }
	}

	public final GrammarDeclarationContext grammarDeclaration() throws RecognitionException {
		GrammarDeclarationContext _localctx = new GrammarDeclarationContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_grammarDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(127);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case MODIFY:
				{
				setState(125);
				((GrammarDeclarationContext)_localctx).isModify = match(MODIFY);
				}
				break;
			case REPLACE:
				{
				setState(126);
				((GrammarDeclarationContext)_localctx).isReplace = match(REPLACE);
				}
				break;
			case GRAMMAR:
				break;
			default:
				break;
			}
			setState(129);
			match(GRAMMAR);
			setState(130);
			((GrammarDeclarationContext)_localctx).prodName = identifierAtom();
			setState(135);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==LEFT_PAREN) {
				{
				setState(131);
				match(LEFT_PAREN);
				setState(132);
				((GrammarDeclarationContext)_localctx).tag = identifierAtom();
				setState(133);
				match(RIGHT_PAREN);
				}
			}

			setState(137);
			match(COLON);
			setState(138);
			grammarRules();
			setState(139);
			match(COLON);
			setState(140);
			superTypes();
			setState(143);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LEFT_CURLY:
				{
				setState(141);
				curlyObjectBody();
				}
				break;
			case FUNCTION:
			case PROPERTYSET:
			case EXTERN:
			case STATIC:
			case STRING:
			case IN:
			case AT:
			case PLUS:
			case ARROW:
			case ID:
			case SEMICOLON:
			case LEFT_BRACKET:
			case DSTR:
			case SSTR:
				{
				setState(142);
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

	public static class GrammarRulesContext extends ParserRuleContext {
		public List<ItemListContext> itemList() {
			return getRuleContexts(ItemListContext.class);
		}
		public ItemListContext itemList(int i) {
			return getRuleContext(ItemListContext.class,i);
		}
		public List<TerminalNode> BITWISE_OR() { return getTokens(T3ParserParser.BITWISE_OR); }
		public TerminalNode BITWISE_OR(int i) {
			return getToken(T3ParserParser.BITWISE_OR, i);
		}
		public GrammarRulesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_grammarRules; }
	}

	public final GrammarRulesContext grammarRules() throws RecognitionException {
		GrammarRulesContext _localctx = new GrammarRulesContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_grammarRules);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(145);
			itemList();
			setState(150);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==BITWISE_OR) {
				{
				{
				setState(146);
				match(BITWISE_OR);
				setState(147);
				itemList();
				}
				}
				setState(152);
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
		enterRule(_localctx, 8, RULE_itemList);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(154);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
			case 1:
				{
				setState(153);
				qualifiers();
				}
				break;
			}
			setState(159);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(156);
					item(0);
					}
					} 
				}
				setState(161);
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
			exitRule();
		}
		return _localctx;
	}

	public static class QualifiersContext extends ParserRuleContext {
		public TerminalNode LEFT_BRACKET() { return getToken(T3ParserParser.LEFT_BRACKET, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode NR() { return getToken(T3ParserParser.NR, 0); }
		public TerminalNode RIGHT_BRACKET() { return getToken(T3ParserParser.RIGHT_BRACKET, 0); }
		public QualifiersContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_qualifiers; }
	}

	public final QualifiersContext qualifiers() throws RecognitionException {
		QualifiersContext _localctx = new QualifiersContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_qualifiers);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(162);
			match(LEFT_BRACKET);
			setState(163);
			identifierAtom();
			setState(164);
			match(NR);
			setState(165);
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
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
		public List<ItemContext> item() {
			return getRuleContexts(ItemContext.class);
		}
		public ItemContext item(int i) {
			return getRuleContext(ItemContext.class,i);
		}
		public TerminalNode BITWISE_OR() { return getToken(T3ParserParser.BITWISE_OR, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode STAR() { return getToken(T3ParserParser.STAR, 0); }
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
		int _startState = 12;
		enterRecursionRule(_localctx, 12, RULE_item, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(180);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
			case 1:
				{
				setState(168);
				match(LEFT_PAREN);
				setState(170); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(169);
					item(0);
					}
					}
					setState(172); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (BITWISE_OR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0) );
				setState(174);
				match(RIGHT_PAREN);
				}
				break;
			case 2:
				{
				setState(176);
				match(BITWISE_OR);
				setState(177);
				item(3);
				}
				break;
			case 3:
				{
				setState(178);
				expr(0);
				}
				break;
			case 4:
				{
				setState(179);
				match(STAR);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(186);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ItemContext(_parentctx, _parentState);
					pushNewRecursionContext(_localctx, _startState, RULE_item);
					setState(182);
					if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
					setState(183);
					match(BITWISE_OR);
					}
					} 
				}
				setState(188);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
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
		public TerminalNode TEMPLATE() { return getToken(T3ParserParser.TEMPLATE, 0); }
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
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
		public List<TerminalNode> OPTIONAL() { return getTokens(T3ParserParser.OPTIONAL); }
		public TerminalNode OPTIONAL(int i) {
			return getToken(T3ParserParser.OPTIONAL, i);
		}
		public TerminalNode STRING() { return getToken(T3ParserParser.STRING, 0); }
		public TerminalNode ARITHMETIC_LEFT() { return getToken(T3ParserParser.ARITHMETIC_LEFT, 0); }
		public TerminalNode ARITHMETIC_RIGHT() { return getToken(T3ParserParser.ARITHMETIC_RIGHT, 0); }
		public List<TerminalNode> STAR() { return getTokens(T3ParserParser.STAR); }
		public TerminalNode STAR(int i) {
			return getToken(T3ParserParser.STAR, i);
		}
		public TemplateDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_templateDeclaration; }
	}

	public final TemplateDeclarationContext templateDeclaration() throws RecognitionException {
		TemplateDeclarationContext _localctx = new TemplateDeclarationContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_templateDeclaration);
		int _la;
		try {
			setState(215);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,15,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(189);
				((TemplateDeclarationContext)_localctx).className = identifierAtom();
				setState(190);
				match(TEMPLATE);
				setState(195); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(191);
					((TemplateDeclarationContext)_localctx).expr = expr(0);
					((TemplateDeclarationContext)_localctx).properties.add(((TemplateDeclarationContext)_localctx).expr);
					setState(193);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==OPTIONAL) {
						{
						setState(192);
						match(OPTIONAL);
						}
					}

					}
					}
					setState(197); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0) );
				setState(199);
				match(SEMICOLON);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(201);
				match(STRING);
				setState(202);
				match(TEMPLATE);
				setState(203);
				match(ARITHMETIC_LEFT);
				setState(208);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (ID - 35)) | (1L << (STAR - 35)))) != 0)) {
					{
					setState(206);
					_errHandler.sync(this);
					switch (_input.LA(1)) {
					case STRING:
					case IN:
					case ID:
						{
						setState(204);
						identifierAtom();
						}
						break;
					case STAR:
						{
						setState(205);
						match(STAR);
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					setState(210);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(211);
				match(ARITHMETIC_RIGHT);
				setState(212);
				((TemplateDeclarationContext)_localctx).templateId = identifierAtom();
				setState(213);
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
		public TerminalNode ENUM() { return getToken(T3ParserParser.ENUM, 0); }
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
		public List<TerminalNode> COMMA() { return getTokens(T3ParserParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(T3ParserParser.COMMA, i);
		}
		public TerminalNode TOKEN() { return getToken(T3ParserParser.TOKEN, 0); }
		public EnumDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_enumDeclaration; }
	}

	public final EnumDeclarationContext enumDeclaration() throws RecognitionException {
		EnumDeclarationContext _localctx = new EnumDeclarationContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_enumDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(217);
			match(ENUM);
			setState(219);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==TOKEN) {
				{
				setState(218);
				((EnumDeclarationContext)_localctx).isToken = match(TOKEN);
				}
			}

			setState(221);
			identifierAtom();
			setState(226);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(222);
				match(COMMA);
				setState(223);
				identifierAtom();
				}
				}
				setState(228);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(229);
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
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
		public TerminalNode PROPERTY() { return getToken(T3ParserParser.PROPERTY, 0); }
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(T3ParserParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(T3ParserParser.COMMA, i);
		}
		public List<TerminalNode> PLUS() { return getTokens(T3ParserParser.PLUS); }
		public TerminalNode PLUS(int i) {
			return getToken(T3ParserParser.PLUS, i);
		}
		public PropertyDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_propertyDeclaration; }
	}

	public final PropertyDeclarationContext propertyDeclaration() throws RecognitionException {
		PropertyDeclarationContext _localctx = new PropertyDeclarationContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_propertyDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(234);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(231);
				((PropertyDeclarationContext)_localctx).level = match(PLUS);
				}
				}
				setState(236);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(237);
			((PropertyDeclarationContext)_localctx).isProperty = match(PROPERTY);
			setState(238);
			((PropertyDeclarationContext)_localctx).identifierAtom = identifierAtom();
			((PropertyDeclarationContext)_localctx).identifiers.add(((PropertyDeclarationContext)_localctx).identifierAtom);
			setState(243);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(239);
				match(COMMA);
				setState(240);
				((PropertyDeclarationContext)_localctx).identifierAtom = identifierAtom();
				((PropertyDeclarationContext)_localctx).identifiers.add(((PropertyDeclarationContext)_localctx).identifierAtom);
				}
				}
				setState(245);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(246);
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
		public TerminalNode DICTIONARY() { return getToken(T3ParserParser.DICTIONARY, 0); }
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(T3ParserParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(T3ParserParser.COMMA, i);
		}
		public List<TerminalNode> PLUS() { return getTokens(T3ParserParser.PLUS); }
		public TerminalNode PLUS(int i) {
			return getToken(T3ParserParser.PLUS, i);
		}
		public TerminalNode PROPERTY() { return getToken(T3ParserParser.PROPERTY, 0); }
		public DictionaryDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dictionaryDeclaration; }
	}

	public final DictionaryDeclarationContext dictionaryDeclaration() throws RecognitionException {
		DictionaryDeclarationContext _localctx = new DictionaryDeclarationContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_dictionaryDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(251);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(248);
				((DictionaryDeclarationContext)_localctx).level = match(PLUS);
				}
				}
				setState(253);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(254);
			match(DICTIONARY);
			setState(256);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PROPERTY) {
				{
				setState(255);
				((DictionaryDeclarationContext)_localctx).isProperty = match(PROPERTY);
				}
			}

			setState(258);
			((DictionaryDeclarationContext)_localctx).identifierAtom = identifierAtom();
			((DictionaryDeclarationContext)_localctx).identifiers.add(((DictionaryDeclarationContext)_localctx).identifierAtom);
			setState(263);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(259);
				match(COMMA);
				setState(260);
				((DictionaryDeclarationContext)_localctx).identifierAtom = identifierAtom();
				((DictionaryDeclarationContext)_localctx).identifiers.add(((DictionaryDeclarationContext)_localctx).identifierAtom);
				}
				}
				setState(265);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(266);
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
		public TerminalNode EXPORT() { return getToken(T3ParserParser.EXPORT, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
		public TerminalNode SSTR() { return getToken(T3ParserParser.SSTR, 0); }
		public ExportDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_exportDeclaration; }
	}

	public final ExportDeclarationContext exportDeclaration() throws RecognitionException {
		ExportDeclarationContext _localctx = new ExportDeclarationContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_exportDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(268);
			match(EXPORT);
			setState(269);
			identifierAtom();
			setState(271);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SSTR) {
				{
				setState(270);
				match(SSTR);
				}
			}

			setState(273);
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
		public TerminalNode INTRINSIC() { return getToken(T3ParserParser.INTRINSIC, 0); }
		public TerminalNode LEFT_CURLY() { return getToken(T3ParserParser.LEFT_CURLY, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(T3ParserParser.RIGHT_CURLY, 0); }
		public TerminalNode CLASS() { return getToken(T3ParserParser.CLASS, 0); }
		public TerminalNode COLON() { return getToken(T3ParserParser.COLON, 0); }
		public SuperTypesContext superTypes() {
			return getRuleContext(SuperTypesContext.class,0);
		}
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode SSTR() { return getToken(T3ParserParser.SSTR, 0); }
		public TerminalNode DSTR() { return getToken(T3ParserParser.DSTR, 0); }
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
		enterRule(_localctx, 24, RULE_intrinsicDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(275);
			match(INTRINSIC);
			setState(277);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==CLASS) {
				{
				setState(276);
				match(CLASS);
				}
			}

			setState(280);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(279);
				((IntrinsicDeclarationContext)_localctx).name = identifierAtom();
				}
			}

			setState(283);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==DSTR || _la==SSTR) {
				{
				setState(282);
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

			setState(287);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COLON) {
				{
				setState(285);
				match(COLON);
				setState(286);
				superTypes();
				}
			}

			setState(289);
			match(LEFT_CURLY);
			setState(293);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 34)) & ~0x3f) == 0 && ((1L << (_la - 34)) & ((1L << (STATIC - 34)) | (1L << (STRING - 34)) | (1L << (IN - 34)) | (1L << (ID - 34)))) != 0)) {
				{
				{
				setState(290);
				((IntrinsicDeclarationContext)_localctx).intrinsicMethodDeclaration = intrinsicMethodDeclaration();
				((IntrinsicDeclarationContext)_localctx).methods.add(((IntrinsicDeclarationContext)_localctx).intrinsicMethodDeclaration);
				}
				}
				setState(295);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(296);
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
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
		public TerminalNode STATIC() { return getToken(T3ParserParser.STATIC, 0); }
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
		enterRule(_localctx, 26, RULE_intrinsicMethodDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(299);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==STATIC) {
				{
				setState(298);
				match(STATIC);
				}
			}

			setState(301);
			identifierAtom();
			{
			setState(302);
			match(LEFT_PAREN);
			setState(304);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(303);
				params();
				}
			}

			setState(306);
			match(RIGHT_PAREN);
			}
			setState(308);
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
		public List<TerminalNode> PLUS() { return getTokens(T3ParserParser.PLUS); }
		public TerminalNode PLUS(int i) {
			return getToken(T3ParserParser.PLUS, i);
		}
		public TerminalNode COLON() { return getToken(T3ParserParser.COLON, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode MODIFY() { return getToken(T3ParserParser.MODIFY, 0); }
		public TerminalNode REPLACE() { return getToken(T3ParserParser.REPLACE, 0); }
		public TerminalNode CLASS() { return getToken(T3ParserParser.CLASS, 0); }
		public TerminalNode TRANSIENT() { return getToken(T3ParserParser.TRANSIENT, 0); }
		public ObjectDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_objectDeclaration; }
	}

	public final ObjectDeclarationContext objectDeclaration() throws RecognitionException {
		ObjectDeclarationContext _localctx = new ObjectDeclarationContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_objectDeclaration);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(319);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,34,_ctx) ) {
			case 1:
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
			case 2:
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
			case 3:
				{
				setState(317);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==CLASS) {
					{
					setState(316);
					((ObjectDeclarationContext)_localctx).isClass = match(CLASS);
					}
				}

				}
				break;
			}
			setState(324);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(321);
				((ObjectDeclarationContext)_localctx).PLUS = match(PLUS);
				((ObjectDeclarationContext)_localctx).level.add(((ObjectDeclarationContext)_localctx).PLUS);
				}
				}
				setState(326);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(335);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,37,_ctx) ) {
			case 1:
				{
				setState(327);
				superTypes();
				}
				break;
			case 2:
				{
				{
				setState(329);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==TRANSIENT) {
					{
					setState(328);
					((ObjectDeclarationContext)_localctx).isTransient = match(TRANSIENT);
					}
				}

				setState(331);
				((ObjectDeclarationContext)_localctx).id = identifierAtom();
				setState(332);
				match(COLON);
				setState(333);
				superTypes();
				}
				}
				break;
			}
			setState(339);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LEFT_CURLY:
				{
				setState(337);
				curlyObjectBody();
				}
				break;
			case FUNCTION:
			case PROPERTYSET:
			case EXTERN:
			case STATIC:
			case STRING:
			case IN:
			case AT:
			case PLUS:
			case ARROW:
			case ID:
			case SEMICOLON:
			case LEFT_BRACKET:
			case DSTR:
			case SSTR:
				{
				setState(338);
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
		public IdentifierAtomContext atLocation;
		public Token doubleString;
		public Token number;
		public IdentifierAtomContext connection;
		public ExprContext expression;
		public TerminalNode AT() { return getToken(T3ParserParser.AT, 0); }
		public TerminalNode PLUS() { return getToken(T3ParserParser.PLUS, 0); }
		public TerminalNode ARROW() { return getToken(T3ParserParser.ARROW, 0); }
		public TerminalNode LEFT_BRACKET() { return getToken(T3ParserParser.LEFT_BRACKET, 0); }
		public ArrayContext array() {
			return getRuleContext(ArrayContext.class,0);
		}
		public TerminalNode RIGHT_BRACKET() { return getToken(T3ParserParser.RIGHT_BRACKET, 0); }
		public TerminalNode SSTR() { return getToken(T3ParserParser.SSTR, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode DSTR() { return getToken(T3ParserParser.DSTR, 0); }
		public TerminalNode NR() { return getToken(T3ParserParser.NR, 0); }
		public TerminalNode OPTIONAL() { return getToken(T3ParserParser.OPTIONAL, 0); }
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TemplateExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_templateExpr; }
	}

	public final TemplateExprContext templateExpr() throws RecognitionException {
		TemplateExprContext _localctx = new TemplateExprContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_templateExpr);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(362);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case SSTR:
				{
				setState(341);
				((TemplateExprContext)_localctx).singleString = match(SSTR);
				setState(343);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,39,_ctx) ) {
				case 1:
					{
					setState(342);
					match(SEMICOLON);
					}
					break;
				}
				}
				break;
			case AT:
				{
				setState(345);
				match(AT);
				setState(346);
				((TemplateExprContext)_localctx).atLocation = identifierAtom();
				}
				break;
			case DSTR:
				{
				setState(347);
				((TemplateExprContext)_localctx).doubleString = match(DSTR);
				setState(349);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
				case 1:
					{
					setState(348);
					match(SEMICOLON);
					}
					break;
				}
				}
				break;
			case PLUS:
				{
				setState(351);
				match(PLUS);
				setState(352);
				((TemplateExprContext)_localctx).number = match(NR);
				}
				break;
			case ARROW:
				{
				setState(353);
				match(ARROW);
				setState(356);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,41,_ctx) ) {
				case 1:
					{
					setState(354);
					((TemplateExprContext)_localctx).connection = identifierAtom();
					}
					break;
				case 2:
					{
					setState(355);
					((TemplateExprContext)_localctx).expression = expr(0);
					}
					break;
				}
				}
				break;
			case LEFT_BRACKET:
				{
				setState(358);
				match(LEFT_BRACKET);
				setState(359);
				array();
				setState(360);
				match(RIGHT_BRACKET);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(365);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==OPTIONAL) {
				{
				setState(364);
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
		public List<TerminalNode> COMMA() { return getTokens(T3ParserParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(T3ParserParser.COMMA, i);
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
		enterRule(_localctx, 32, RULE_array);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(367);
			expr(0);
			setState(372);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,44,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(368);
					match(COMMA);
					setState(369);
					array();
					}
					} 
				}
				setState(374);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,44,_ctx);
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
		public TerminalNode LEFT_CURLY() { return getToken(T3ParserParser.LEFT_CURLY, 0); }
		public ObjectBodyContext objectBody() {
			return getRuleContext(ObjectBodyContext.class,0);
		}
		public TerminalNode RIGHT_CURLY() { return getToken(T3ParserParser.RIGHT_CURLY, 0); }
		public CurlyObjectBodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_curlyObjectBody; }
	}

	public final CurlyObjectBodyContext curlyObjectBody() throws RecognitionException {
		CurlyObjectBodyContext _localctx = new CurlyObjectBodyContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_curlyObjectBody);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(375);
			match(LEFT_CURLY);
			setState(376);
			objectBody();
			setState(377);
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
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
		public SemiColonEndedObjectBodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_semiColonEndedObjectBody; }
	}

	public final SemiColonEndedObjectBodyContext semiColonEndedObjectBody() throws RecognitionException {
		SemiColonEndedObjectBodyContext _localctx = new SemiColonEndedObjectBodyContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_semiColonEndedObjectBody);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(379);
			objectBody();
			setState(380);
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
		public List<TerminalNode> COMMA() { return getTokens(T3ParserParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(T3ParserParser.COMMA, i);
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
		enterRule(_localctx, 38, RULE_superTypes);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(382);
			((SuperTypesContext)_localctx).identifierAtom = identifierAtom();
			((SuperTypesContext)_localctx).superType.add(((SuperTypesContext)_localctx).identifierAtom);
			setState(387);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,45,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(383);
					match(COMMA);
					setState(384);
					superTypes();
					}
					} 
				}
				setState(389);
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
		enterRule(_localctx, 40, RULE_objectBody);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			{
			setState(393);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 47)) & ~0x3f) == 0 && ((1L << (_la - 47)) & ((1L << (AT - 47)) | (1L << (PLUS - 47)) | (1L << (ARROW - 47)) | (1L << (LEFT_BRACKET - 47)) | (1L << (DSTR - 47)) | (1L << (SSTR - 47)))) != 0)) {
				{
				{
				setState(390);
				((ObjectBodyContext)_localctx).templateExpr = templateExpr();
				((ObjectBodyContext)_localctx).template.add(((ObjectBodyContext)_localctx).templateExpr);
				}
				}
				setState(395);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(401);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 5)) & ~0x3f) == 0 && ((1L << (_la - 5)) & ((1L << (FUNCTION - 5)) | (1L << (PROPERTYSET - 5)) | (1L << (EXTERN - 5)) | (1L << (STATIC - 5)) | (1L << (STRING - 5)) | (1L << (IN - 5)) | (1L << (ID - 5)))) != 0)) {
				{
				setState(399);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,47,_ctx) ) {
				case 1:
					{
					setState(396);
					((ObjectBodyContext)_localctx).functionDeclaration = functionDeclaration();
					((ObjectBodyContext)_localctx).functions.add(((ObjectBodyContext)_localctx).functionDeclaration);
					}
					break;
				case 2:
					{
					setState(397);
					((ObjectBodyContext)_localctx).property = property();
					((ObjectBodyContext)_localctx).properties.add(((ObjectBodyContext)_localctx).property);
					}
					break;
				case 3:
					{
					setState(398);
					((ObjectBodyContext)_localctx).propertySet = propertySet();
					((ObjectBodyContext)_localctx).propertySets.add(((ObjectBodyContext)_localctx).propertySet);
					}
					break;
				}
				}
				setState(403);
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
		public IdentifierAtomContext objectName;
		public TerminalNode ASSIGN() { return getToken(T3ParserParser.ASSIGN, 0); }
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public TerminalNode IN() { return getToken(T3ParserParser.IN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public DictionaryPropertyContext dictionaryProperty() {
			return getRuleContext(DictionaryPropertyContext.class,0);
		}
		public TerminalNode STATIC() { return getToken(T3ParserParser.STATIC, 0); }
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
		public TerminalNode COLON() { return getToken(T3ParserParser.COLON, 0); }
		public CurlyObjectBodyContext curlyObjectBody() {
			return getRuleContext(CurlyObjectBodyContext.class,0);
		}
		public List<TerminalNode> COMMA() { return getTokens(T3ParserParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(T3ParserParser.COMMA, i);
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
		enterRule(_localctx, 42, RULE_property);
		int _la;
		try {
			setState(438);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,57,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(406);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,49,_ctx) ) {
				case 1:
					{
					setState(404);
					identifierAtom();
					}
					break;
				case 2:
					{
					setState(405);
					match(IN);
					}
					break;
				}
				setState(408);
				match(ASSIGN);
				setState(410);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,50,_ctx) ) {
				case 1:
					{
					setState(409);
					match(STATIC);
					}
					break;
				}
				setState(414);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,51,_ctx) ) {
				case 1:
					{
					setState(412);
					expr(0);
					}
					break;
				case 2:
					{
					setState(413);
					dictionaryProperty();
					}
					break;
				}
				setState(417);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,52,_ctx) ) {
				case 1:
					{
					setState(416);
					match(SEMICOLON);
					}
					break;
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(421);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,53,_ctx) ) {
				case 1:
					{
					setState(419);
					identifierAtom();
					}
					break;
				case 2:
					{
					setState(420);
					match(IN);
					}
					break;
				}
				setState(423);
				match(COLON);
				setState(425);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (ID - 35)))) != 0)) {
					{
					setState(424);
					((PropertyContext)_localctx).objectName = identifierAtom();
					}
				}

				setState(431);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==COMMA) {
					{
					{
					setState(427);
					match(COMMA);
					setState(428);
					superTypes();
					}
					}
					setState(433);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(434);
				curlyObjectBody();
				setState(436);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,56,_ctx) ) {
				case 1:
					{
					setState(435);
					match(SEMICOLON);
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

	public static class DictionaryPropertyContext extends ParserRuleContext {
		public List<TerminalNode> SSTR() { return getTokens(T3ParserParser.SSTR); }
		public TerminalNode SSTR(int i) {
			return getToken(T3ParserParser.SSTR, i);
		}
		public DictionaryPropertyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dictionaryProperty; }
	}

	public final DictionaryPropertyContext dictionaryProperty() throws RecognitionException {
		DictionaryPropertyContext _localctx = new DictionaryPropertyContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_dictionaryProperty);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(443);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==SSTR) {
				{
				{
				setState(440);
				match(SSTR);
				}
				}
				setState(445);
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
		public CurlyObjectBodyContext curlyObjectBody() {
			return getRuleContext(CurlyObjectBodyContext.class,0);
		}
		public TerminalNode PROPERTYSET() { return getToken(T3ParserParser.PROPERTYSET, 0); }
		public ParamsWithWildcardContext paramsWithWildcard() {
			return getRuleContext(ParamsWithWildcardContext.class,0);
		}
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
		public PropertySetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_propertySet; }
	}

	public final PropertySetContext propertySet() throws RecognitionException {
		PropertySetContext _localctx = new PropertySetContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_propertySet);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(454);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,60,_ctx) ) {
			case 1:
				{
				setState(446);
				match(PROPERTYSET);
				setState(447);
				paramsWithWildcard();
				}
				break;
			case 2:
				{
				setState(448);
				match(PROPERTYSET);
				setState(449);
				match(LEFT_PAREN);
				setState(451);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (((((_la - 24)) & ~0x3f) == 0 && ((1L << (_la - 24)) & ((1L << (TRUE - 24)) | (1L << (NIL - 24)) | (1L << (INHERITED - 24)) | (1L << (STRING - 24)) | (1L << (IN - 24)) | (1L << (AMP - 24)) | (1L << (ID - 24)) | (1L << (NR - 24)) | (1L << (HEX - 24)) | (1L << (STAR - 24)) | (1L << (DSTR - 24)) | (1L << (SSTR - 24)) | (1L << (RSTR - 24)))) != 0)) {
					{
					setState(450);
					paramsWithWildcard();
					}
				}

				setState(453);
				match(RIGHT_PAREN);
				}
				break;
			}
			setState(456);
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
		public TerminalNode STAR() { return getToken(T3ParserParser.STAR, 0); }
		public PrimaryContext primary() {
			return getRuleContext(PrimaryContext.class,0);
		}
		public List<TerminalNode> COMMA() { return getTokens(T3ParserParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(T3ParserParser.COMMA, i);
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
		enterRule(_localctx, 48, RULE_paramsWithWildcard);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(460);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case TRUE:
			case NIL:
			case INHERITED:
			case STRING:
			case IN:
			case AMP:
			case ID:
			case NR:
			case HEX:
			case DSTR:
			case SSTR:
			case RSTR:
				{
				setState(458);
				((ParamsWithWildcardContext)_localctx).primary = primary();
				((ParamsWithWildcardContext)_localctx).parameters.add(((ParamsWithWildcardContext)_localctx).primary);
				}
				break;
			case STAR:
				{
				setState(459);
				match(STAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(466);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,62,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(462);
					match(COMMA);
					setState(463);
					paramsWithWildcard();
					}
					} 
				}
				setState(468);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,62,_ctx);
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
		public FunctionHeadContext functionHead() {
			return getRuleContext(FunctionHeadContext.class,0);
		}
		public CodeBlockContext codeBlock() {
			return getRuleContext(CodeBlockContext.class,0);
		}
		public FunctionDeclarationContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionDeclaration; }
	}

	public final FunctionDeclarationContext functionDeclaration() throws RecognitionException {
		FunctionDeclarationContext _localctx = new FunctionDeclarationContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_functionDeclaration);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(469);
			functionHead();
			setState(470);
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

	public static class FunctionHeadContext extends ParserRuleContext {
		public Token isExtern;
		public Token isStatic;
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode FUNCTION() { return getToken(T3ParserParser.FUNCTION, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
		public TerminalNode EXTERN() { return getToken(T3ParserParser.EXTERN, 0); }
		public TerminalNode STATIC() { return getToken(T3ParserParser.STATIC, 0); }
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
		enterRule(_localctx, 52, RULE_functionHead);
		int _la;
		try {
			setState(497);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,70,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(473);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==EXTERN) {
					{
					setState(472);
					((FunctionHeadContext)_localctx).isExtern = match(EXTERN);
					}
				}

				setState(476);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==STATIC) {
					{
					setState(475);
					((FunctionHeadContext)_localctx).isStatic = match(STATIC);
					}
				}

				setState(479);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==FUNCTION) {
					{
					setState(478);
					match(FUNCTION);
					}
				}

				setState(481);
				identifierAtom();
				setState(487);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,67,_ctx) ) {
				case 1:
					{
					setState(482);
					match(LEFT_PAREN);
					setState(484);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						setState(483);
						params();
						}
					}

					setState(486);
					match(RIGHT_PAREN);
					}
					break;
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(489);
				match(FUNCTION);
				setState(495);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,69,_ctx) ) {
				case 1:
					{
					setState(490);
					match(LEFT_PAREN);
					setState(492);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						setState(491);
						params();
						}
					}

					setState(494);
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
		public TerminalNode LEFT_CURLY() { return getToken(T3ParserParser.LEFT_CURLY, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(T3ParserParser.RIGHT_CURLY, 0); }
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
		enterRule(_localctx, 54, RULE_codeBlock);
		int _la;
		try {
			setState(508);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,72,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(499);
				match(LEFT_CURLY);
				setState(503);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					{
					setState(500);
					stats();
					}
					}
					setState(505);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(506);
				match(RIGHT_CURLY);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(507);
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
		public StatsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stats; }
	}

	public final StatsContext stats() throws RecognitionException {
		StatsContext _localctx = new StatsContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_stats);
		try {
			setState(527);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,73,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(510);
				assignmentStatement();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(511);
				ifStatement();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(512);
				tryCatchStatement();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(513);
				forStatement();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(514);
				doWhileStatement();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(515);
				whileStatement();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(516);
				switchStatement();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(517);
				forInStatement();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(518);
				forEachStatement();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(519);
				sayStatement();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(520);
				emptyStatement();
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(521);
				returnStatement();
				}
				break;
			case 13:
				enterOuterAlt(_localctx, 13);
				{
				setState(522);
				throwStatement();
				}
				break;
			case 14:
				enterOuterAlt(_localctx, 14);
				{
				setState(523);
				labelStatement();
				}
				break;
			case 15:
				enterOuterAlt(_localctx, 15);
				{
				setState(524);
				breakStatement();
				}
				break;
			case 16:
				enterOuterAlt(_localctx, 16);
				{
				setState(525);
				continueStatement();
				}
				break;
			case 17:
				enterOuterAlt(_localctx, 17);
				{
				setState(526);
				gotoStatement();
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

	public static class GotoStatementContext extends ParserRuleContext {
		public IdentifierAtomContext label;
		public TerminalNode GOTO() { return getToken(T3ParserParser.GOTO, 0); }
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
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
		enterRule(_localctx, 58, RULE_gotoStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(529);
			match(GOTO);
			setState(531);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(530);
				((GotoStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(533);
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
		public TerminalNode BREAK() { return getToken(T3ParserParser.BREAK, 0); }
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
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
		enterRule(_localctx, 60, RULE_breakStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(535);
			match(BREAK);
			setState(537);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(536);
				((BreakStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(539);
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
		public TerminalNode CONTINUE() { return getToken(T3ParserParser.CONTINUE, 0); }
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
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
		enterRule(_localctx, 62, RULE_continueStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(541);
			match(CONTINUE);
			setState(543);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(542);
				((ContinueStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(545);
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
		public TerminalNode COLON() { return getToken(T3ParserParser.COLON, 0); }
		public LabelStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_labelStatement; }
	}

	public final LabelStatementContext labelStatement() throws RecognitionException {
		LabelStatementContext _localctx = new LabelStatementContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_labelStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(547);
			identifierAtom();
			setState(548);
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
		public TerminalNode SWITCH() { return getToken(T3ParserParser.SWITCH, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
		public TerminalNode LEFT_CURLY() { return getToken(T3ParserParser.LEFT_CURLY, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(T3ParserParser.RIGHT_CURLY, 0); }
		public List<TerminalNode> CASE() { return getTokens(T3ParserParser.CASE); }
		public TerminalNode CASE(int i) {
			return getToken(T3ParserParser.CASE, i);
		}
		public List<PrimaryContext> primary() {
			return getRuleContexts(PrimaryContext.class);
		}
		public PrimaryContext primary(int i) {
			return getRuleContext(PrimaryContext.class,i);
		}
		public List<TerminalNode> COLON() { return getTokens(T3ParserParser.COLON); }
		public TerminalNode COLON(int i) {
			return getToken(T3ParserParser.COLON, i);
		}
		public TerminalNode DEFAULT() { return getToken(T3ParserParser.DEFAULT, 0); }
		public List<CodeBlockContext> codeBlock() {
			return getRuleContexts(CodeBlockContext.class);
		}
		public CodeBlockContext codeBlock(int i) {
			return getRuleContext(CodeBlockContext.class,i);
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
		enterRule(_localctx, 66, RULE_switchStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(550);
			match(SWITCH);
			setState(551);
			match(LEFT_PAREN);
			setState(552);
			expr(0);
			setState(553);
			match(RIGHT_PAREN);
			setState(554);
			match(LEFT_CURLY);
			setState(569);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CASE) {
				{
				{
				setState(555);
				match(CASE);
				setState(556);
				primary();
				setState(557);
				match(COLON);
				setState(565);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,78,_ctx) ) {
				case 1:
					{
					setState(558);
					codeBlock();
					}
					break;
				case 2:
					{
					setState(562);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						{
						setState(559);
						stats();
						}
						}
						setState(564);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					}
					break;
				}
				}
				}
				setState(571);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(580);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==DEFAULT) {
				{
				setState(572);
				match(DEFAULT);
				setState(573);
				match(COLON);
				setState(577);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					{
					setState(574);
					codeBlock();
					}
					}
					setState(579);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(582);
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
		public TerminalNode THROW() { return getToken(T3ParserParser.THROW, 0); }
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
		enterRule(_localctx, 68, RULE_throwStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(584);
			match(THROW);
			setState(585);
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
		public TerminalNode FOR() { return getToken(T3ParserParser.FOR, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode LOCAL() { return getToken(T3ParserParser.LOCAL, 0); }
		public TerminalNode ID() { return getToken(T3ParserParser.ID, 0); }
		public TerminalNode IN() { return getToken(T3ParserParser.IN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
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
		enterRule(_localctx, 70, RULE_forInStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(587);
			match(FOR);
			setState(588);
			match(LEFT_PAREN);
			setState(589);
			match(LOCAL);
			setState(590);
			match(ID);
			setState(591);
			match(IN);
			setState(592);
			expr(0);
			setState(593);
			match(RIGHT_PAREN);
			setState(594);
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
		public TerminalNode FOREACH() { return getToken(T3ParserParser.FOREACH, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode IN() { return getToken(T3ParserParser.IN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
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
		enterRule(_localctx, 72, RULE_forEachStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(596);
			match(FOREACH);
			setState(597);
			match(LEFT_PAREN);
			setState(598);
			expr(0);
			setState(599);
			match(IN);
			setState(600);
			expr(0);
			setState(601);
			match(RIGHT_PAREN);
			setState(602);
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
		public TerminalNode RETURN() { return getToken(T3ParserParser.RETURN, 0); }
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
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
		enterRule(_localctx, 74, RULE_returnStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(604);
			match(RETURN);
			setState(606);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(605);
				expr(0);
				}
			}

			setState(608);
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
		public TerminalNode DO() { return getToken(T3ParserParser.DO, 0); }
		public CodeBlockContext codeBlock() {
			return getRuleContext(CodeBlockContext.class,0);
		}
		public TerminalNode WHILE() { return getToken(T3ParserParser.WHILE, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
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
		enterRule(_localctx, 76, RULE_doWhileStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(610);
			match(DO);
			setState(611);
			codeBlock();
			setState(612);
			match(WHILE);
			setState(613);
			match(LEFT_PAREN);
			setState(615);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(614);
				expr(0);
				}
			}

			setState(617);
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
		public TerminalNode WHILE() { return getToken(T3ParserParser.WHILE, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
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
		enterRule(_localctx, 78, RULE_whileStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(619);
			match(WHILE);
			setState(620);
			match(LEFT_PAREN);
			setState(622);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(621);
				expr(0);
				}
			}

			setState(624);
			match(RIGHT_PAREN);
			setState(625);
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
		public TerminalNode FOR() { return getToken(T3ParserParser.FOR, 0); }
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public List<TerminalNode> SEMICOLON() { return getTokens(T3ParserParser.SEMICOLON); }
		public TerminalNode SEMICOLON(int i) {
			return getToken(T3ParserParser.SEMICOLON, i);
		}
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
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
		enterRule(_localctx, 80, RULE_forStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(627);
			match(FOR);
			setState(628);
			match(LEFT_PAREN);
			setState(630);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(629);
				expr(0);
				}
			}

			setState(632);
			match(SEMICOLON);
			setState(634);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(633);
				expr(0);
				}
			}

			setState(636);
			match(SEMICOLON);
			setState(638);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(637);
				expr(0);
				}
			}

			setState(640);
			match(RIGHT_PAREN);
			setState(641);
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
		public TerminalNode TRY() { return getToken(T3ParserParser.TRY, 0); }
		public List<CodeBlockContext> codeBlock() {
			return getRuleContexts(CodeBlockContext.class);
		}
		public CodeBlockContext codeBlock(int i) {
			return getRuleContext(CodeBlockContext.class,i);
		}
		public List<TerminalNode> CATCH() { return getTokens(T3ParserParser.CATCH); }
		public TerminalNode CATCH(int i) {
			return getToken(T3ParserParser.CATCH, i);
		}
		public List<TerminalNode> LEFT_PAREN() { return getTokens(T3ParserParser.LEFT_PAREN); }
		public TerminalNode LEFT_PAREN(int i) {
			return getToken(T3ParserParser.LEFT_PAREN, i);
		}
		public List<TerminalNode> RIGHT_PAREN() { return getTokens(T3ParserParser.RIGHT_PAREN); }
		public TerminalNode RIGHT_PAREN(int i) {
			return getToken(T3ParserParser.RIGHT_PAREN, i);
		}
		public TerminalNode FINALLY() { return getToken(T3ParserParser.FINALLY, 0); }
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
		enterRule(_localctx, 82, RULE_tryCatchStatement);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(643);
			match(TRY);
			setState(644);
			codeBlock();
			setState(654);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,89,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(645);
					match(CATCH);
					setState(646);
					match(LEFT_PAREN);
					setState(648);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						setState(647);
						params();
						}
					}

					setState(650);
					match(RIGHT_PAREN);
					setState(651);
					codeBlock();
					}
					} 
				}
				setState(656);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,89,_ctx);
			}
			setState(659);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,90,_ctx) ) {
			case 1:
				{
				setState(657);
				match(FINALLY);
				setState(658);
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
		public TerminalNode DOT() { return getToken(T3ParserParser.DOT, 0); }
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
		enterRule(_localctx, 84, RULE_callStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(661);
			expr(0);
			setState(664);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,91,_ctx) ) {
			case 1:
				{
				setState(662);
				match(DOT);
				setState(663);
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
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
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
		enterRule(_localctx, 86, RULE_emptyStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(667);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(666);
				expr(0);
				}
			}

			setState(669);
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
		public TerminalNode DSTR() { return getToken(T3ParserParser.DSTR, 0); }
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
		public SayStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_sayStatement; }
	}

	public final SayStatementContext sayStatement() throws RecognitionException {
		SayStatementContext _localctx = new SayStatementContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_sayStatement);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(671);
			match(DSTR);
			setState(672);
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
		public TerminalNode LOCAL() { return getToken(T3ParserParser.LOCAL, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode SEMICOLON() { return getToken(T3ParserParser.SEMICOLON, 0); }
		public TerminalNode ASSIGN() { return getToken(T3ParserParser.ASSIGN, 0); }
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
		enterRule(_localctx, 90, RULE_assignmentStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(674);
			match(LOCAL);
			setState(675);
			identifierAtom();
			setState(678);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ASSIGN) {
				{
				setState(676);
				match(ASSIGN);
				setState(677);
				expr(0);
				}
			}

			setState(680);
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
		public List<TerminalNode> IF() { return getTokens(T3ParserParser.IF); }
		public TerminalNode IF(int i) {
			return getToken(T3ParserParser.IF, i);
		}
		public List<EnclosedExprCodeBlockContext> enclosedExprCodeBlock() {
			return getRuleContexts(EnclosedExprCodeBlockContext.class);
		}
		public EnclosedExprCodeBlockContext enclosedExprCodeBlock(int i) {
			return getRuleContext(EnclosedExprCodeBlockContext.class,i);
		}
		public List<TerminalNode> ELSE() { return getTokens(T3ParserParser.ELSE); }
		public TerminalNode ELSE(int i) {
			return getToken(T3ParserParser.ELSE, i);
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
		enterRule(_localctx, 92, RULE_ifStatement);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(682);
			match(IF);
			setState(683);
			((IfStatementContext)_localctx).ifExprAndBlock = enclosedExprCodeBlock();
			setState(689);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,94,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(684);
					match(ELSE);
					setState(685);
					match(IF);
					setState(686);
					((IfStatementContext)_localctx).elseIfExprAndBlock = enclosedExprCodeBlock();
					}
					} 
				}
				setState(691);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,94,_ctx);
			}
			setState(694);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,95,_ctx) ) {
			case 1:
				{
				setState(692);
				match(ELSE);
				setState(693);
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
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
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
		enterRule(_localctx, 94, RULE_enclosedExprCodeBlock);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(696);
			match(LEFT_PAREN);
			setState(697);
			((EnclosedExprCodeBlockContext)_localctx).expression = expr(0);
			setState(698);
			match(RIGHT_PAREN);
			setState(699);
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
		public TerminalNode NEW() { return getToken(T3ParserParser.NEW, 0); }
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
		public TerminalNode ASSIGN() { return getToken(T3ParserParser.ASSIGN, 0); }
		public AssignmentExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ExprWithParenExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
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
		public TerminalNode AMP() { return getToken(T3ParserParser.AMP, 0); }
		public ReferenceExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class DelegatedExpressionContext extends ExprContext {
		public TerminalNode DELEGATED() { return getToken(T3ParserParser.DELEGATED, 0); }
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
		public TerminalNode PLUS() { return getToken(T3ParserParser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(T3ParserParser.MINUS, 0); }
		public TerminalNode ASSIGN() { return getToken(T3ParserParser.ASSIGN, 0); }
		public AdditiveExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ArrowExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode ARROW() { return getToken(T3ParserParser.ARROW, 0); }
		public ArrowExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class UnaryExprContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode AT() { return getToken(T3ParserParser.AT, 0); }
		public TerminalNode AMP() { return getToken(T3ParserParser.AMP, 0); }
		public TerminalNode NOT() { return getToken(T3ParserParser.NOT, 0); }
		public TerminalNode PLUS() { return getToken(T3ParserParser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(T3ParserParser.MINUS, 0); }
		public TerminalNode TILDE() { return getToken(T3ParserParser.TILDE, 0); }
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
		public TerminalNode OPTIONAL() { return getToken(T3ParserParser.OPTIONAL, 0); }
		public TerminalNode COLON() { return getToken(T3ParserParser.COLON, 0); }
		public TernaryExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ParenExpr2Context extends ExprContext {
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
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
		public TerminalNode IS() { return getToken(T3ParserParser.IS, 0); }
		public TerminalNode IN() { return getToken(T3ParserParser.IN, 0); }
		public IsExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class LocalExprContext extends ExprContext {
		public TerminalNode LOCAL() { return getToken(T3ParserParser.LOCAL, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public LocalExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class PostFixExprContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public List<TerminalNode> PLUS() { return getTokens(T3ParserParser.PLUS); }
		public TerminalNode PLUS(int i) {
			return getToken(T3ParserParser.PLUS, i);
		}
		public List<TerminalNode> MINUS() { return getTokens(T3ParserParser.MINUS); }
		public TerminalNode MINUS(int i) {
			return getToken(T3ParserParser.MINUS, i);
		}
		public PostFixExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ArrayExprContext extends ExprContext {
		public TerminalNode LEFT_BRACKET() { return getToken(T3ParserParser.LEFT_BRACKET, 0); }
		public TerminalNode RIGHT_BRACKET() { return getToken(T3ParserParser.RIGHT_BRACKET, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ArrayExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class StaticExprContext extends ExprContext {
		public TerminalNode STATIC() { return getToken(T3ParserParser.STATIC, 0); }
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
		public TerminalNode IN() { return getToken(T3ParserParser.IN, 0); }
		public InExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class IfNilExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode IFNIL() { return getToken(T3ParserParser.IFNIL, 0); }
		public IfNilExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class MemberExprContext extends ExprContext {
		public ExprContext prev;
		public ExprContext next;
		public TerminalNode DOT() { return getToken(T3ParserParser.DOT, 0); }
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
		public TerminalNode ARROW() { return getToken(T3ParserParser.ARROW, 0); }
		public ArrowExpr2Context(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ArrowExpr3Context extends ExprContext {
		public TerminalNode STAR() { return getToken(T3ParserParser.STAR, 0); }
		public TerminalNode ARROW() { return getToken(T3ParserParser.ARROW, 0); }
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
		public TerminalNode LTEQ() { return getToken(T3ParserParser.LTEQ, 0); }
		public TerminalNode GTEQ() { return getToken(T3ParserParser.GTEQ, 0); }
		public TerminalNode LT() { return getToken(T3ParserParser.LT, 0); }
		public TerminalNode GT() { return getToken(T3ParserParser.GT, 0); }
		public RelationalExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class TransientExpressionContext extends ExprContext {
		public TerminalNode TRANSIENT() { return getToken(T3ParserParser.TRANSIENT, 0); }
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
		public TerminalNode BITWISE_OR() { return getToken(T3ParserParser.BITWISE_OR, 0); }
		public TerminalNode AMP() { return getToken(T3ParserParser.AMP, 0); }
		public TerminalNode ASSIGN() { return getToken(T3ParserParser.ASSIGN, 0); }
		public TerminalNode ARITHMETIC_LEFT() { return getToken(T3ParserParser.ARITHMETIC_LEFT, 0); }
		public TerminalNode ARITHMETIC_RIGHT() { return getToken(T3ParserParser.ARITHMETIC_RIGHT, 0); }
		public TerminalNode LOGICAL_RIGHT_SHIFT() { return getToken(T3ParserParser.LOGICAL_RIGHT_SHIFT, 0); }
		public BitwiseExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class IndexExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode LEFT_BRACKET() { return getToken(T3ParserParser.LEFT_BRACKET, 0); }
		public TerminalNode RIGHT_BRACKET() { return getToken(T3ParserParser.RIGHT_BRACKET, 0); }
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
		public TerminalNode POW() { return getToken(T3ParserParser.POW, 0); }
		public TerminalNode ASSIGN() { return getToken(T3ParserParser.ASSIGN, 0); }
		public PowerOfExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class CommaExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode COMMA() { return getToken(T3ParserParser.COMMA, 0); }
		public CommaExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class NotInExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode LITERAL_NOT() { return getToken(T3ParserParser.LITERAL_NOT, 0); }
		public TerminalNode IN() { return getToken(T3ParserParser.IN, 0); }
		public NotInExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class AnonymousObjectExprContext extends ExprContext {
		public TerminalNode LEFT_CURLY() { return getToken(T3ParserParser.LEFT_CURLY, 0); }
		public TerminalNode COLON() { return getToken(T3ParserParser.COLON, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(T3ParserParser.RIGHT_CURLY, 0); }
		public ParamsContext params() {
			return getRuleContext(ParamsContext.class,0);
		}
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public AnonymousObjectExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class InheritedExpressionContext extends ExprContext {
		public TerminalNode INHERITED() { return getToken(T3ParserParser.INHERITED, 0); }
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
		public TerminalNode STAR() { return getToken(T3ParserParser.STAR, 0); }
		public TerminalNode DIV() { return getToken(T3ParserParser.DIV, 0); }
		public TerminalNode MOD() { return getToken(T3ParserParser.MOD, 0); }
		public TerminalNode ASSIGN() { return getToken(T3ParserParser.ASSIGN, 0); }
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
		public TerminalNode AND() { return getToken(T3ParserParser.AND, 0); }
		public TerminalNode OR() { return getToken(T3ParserParser.OR, 0); }
		public AndOrExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ExprWithAnonymousObjectExprContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode LEFT_CURLY() { return getToken(T3ParserParser.LEFT_CURLY, 0); }
		public TerminalNode COLON() { return getToken(T3ParserParser.COLON, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(T3ParserParser.RIGHT_CURLY, 0); }
		public ParamsContext params() {
			return getRuleContext(ParamsContext.class,0);
		}
		public ExprWithAnonymousObjectExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class EqualityExprContext extends ExprContext {
		public Token op;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode EQ() { return getToken(T3ParserParser.EQ, 0); }
		public TerminalNode NEQ() { return getToken(T3ParserParser.NEQ, 0); }
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
		public TerminalNode RANGE() { return getToken(T3ParserParser.RANGE, 0); }
		public TerminalNode STEP() { return getToken(T3ParserParser.STEP, 0); }
		public RangeExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class CallWithParamsExprContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode LEFT_PAREN() { return getToken(T3ParserParser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(T3ParserParser.RIGHT_PAREN, 0); }
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
		int _startState = 96;
		enterRecursionRule(_localctx, 96, RULE_expr, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(742);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,100,_ctx) ) {
			case 1:
				{
				_localctx = new ArrayExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(702);
				match(LEFT_BRACKET);
				setState(704);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(703);
					expr(0);
					}
				}

				setState(706);
				match(RIGHT_BRACKET);
				}
				break;
			case 2:
				{
				_localctx = new DelegatedExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(707);
				match(DELEGATED);
				setState(708);
				expr(34);
				}
				break;
			case 3:
				{
				_localctx = new InheritedExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(709);
				match(INHERITED);
				setState(710);
				expr(33);
				}
				break;
			case 4:
				{
				_localctx = new TransientExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(711);
				match(TRANSIENT);
				setState(712);
				expr(32);
				}
				break;
			case 5:
				{
				_localctx = new PrimaryExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(713);
				primary();
				}
				break;
			case 6:
				{
				_localctx = new ParenExpr2Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(714);
				match(LEFT_PAREN);
				setState(716);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(715);
					expr(0);
					}
				}

				setState(718);
				match(RIGHT_PAREN);
				}
				break;
			case 7:
				{
				_localctx = new LocalExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(719);
				match(LOCAL);
				setState(720);
				expr(26);
				}
				break;
			case 8:
				{
				_localctx = new StaticExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(721);
				match(STATIC);
				setState(722);
				expr(25);
				}
				break;
			case 9:
				{
				_localctx = new NewExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(723);
				match(NEW);
				setState(724);
				expr(24);
				}
				break;
			case 10:
				{
				_localctx = new AnonymousObjectExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(725);
				match(LEFT_CURLY);
				setState(727);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(726);
					params();
					}
				}

				setState(729);
				match(COLON);
				setState(731);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(730);
					expr(0);
					}
				}

				setState(733);
				match(RIGHT_CURLY);
				}
				break;
			case 11:
				{
				_localctx = new ArrowExpr2Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				{
				setState(734);
				match(ARROW);
				}
				setState(735);
				expr(6);
				}
				break;
			case 12:
				{
				_localctx = new ArrowExpr3Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(736);
				match(STAR);
				setState(737);
				match(ARROW);
				setState(738);
				expr(5);
				}
				break;
			case 13:
				{
				_localctx = new UnaryExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(739);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << TILDE))) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(740);
				expr(4);
				}
				break;
			case 14:
				{
				_localctx = new AnonymousFunctionExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(741);
				functionDeclaration();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(868);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,114,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(866);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,113,_ctx) ) {
					case 1:
						{
						_localctx = new MemberExprContext(new ExprContext(_parentctx, _parentState));
						((MemberExprContext)_localctx).prev = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(744);
						if (!(precpred(_ctx, 38))) throw new FailedPredicateException(this, "precpred(_ctx, 38)");
						setState(745);
						match(DOT);
						setState(746);
						((MemberExprContext)_localctx).next = expr(39);
						}
						break;
					case 2:
						{
						_localctx = new CommaExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(747);
						if (!(precpred(_ctx, 36))) throw new FailedPredicateException(this, "precpred(_ctx, 36)");
						setState(748);
						match(COMMA);
						setState(749);
						expr(37);
						}
						break;
					case 3:
						{
						_localctx = new ReferenceExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(750);
						if (!(precpred(_ctx, 23))) throw new FailedPredicateException(this, "precpred(_ctx, 23)");
						setState(751);
						match(AMP);
						setState(752);
						expr(24);
						}
						break;
					case 4:
						{
						_localctx = new NotInExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(753);
						if (!(precpred(_ctx, 22))) throw new FailedPredicateException(this, "precpred(_ctx, 22)");
						setState(754);
						match(LITERAL_NOT);
						setState(755);
						match(IN);
						setState(756);
						expr(23);
						}
						break;
					case 5:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(757);
						if (!(precpred(_ctx, 21))) throw new FailedPredicateException(this, "precpred(_ctx, 21)");
						setState(758);
						match(IS);
						setState(759);
						match(IN);
						setState(760);
						expr(22);
						}
						break;
					case 6:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(761);
						if (!(precpred(_ctx, 20))) throw new FailedPredicateException(this, "precpred(_ctx, 20)");
						setState(762);
						match(IS);
						setState(763);
						expr(21);
						}
						break;
					case 7:
						{
						_localctx = new InExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(764);
						if (!(precpred(_ctx, 19))) throw new FailedPredicateException(this, "precpred(_ctx, 19)");
						setState(765);
						match(IN);
						setState(766);
						expr(20);
						}
						break;
					case 8:
						{
						_localctx = new AssignmentExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(767);
						if (!(precpred(_ctx, 18))) throw new FailedPredicateException(this, "precpred(_ctx, 18)");
						setState(768);
						match(ASSIGN);
						setState(769);
						expr(19);
						}
						break;
					case 9:
						{
						_localctx = new IfNilExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(770);
						if (!(precpred(_ctx, 17))) throw new FailedPredicateException(this, "precpred(_ctx, 17)");
						setState(771);
						match(IFNIL);
						setState(772);
						expr(18);
						}
						break;
					case 10:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(773);
						if (!(precpred(_ctx, 15))) throw new FailedPredicateException(this, "precpred(_ctx, 15)");
						setState(774);
						_la = _input.LA(1);
						if ( !(_la==AMP || _la==BITWISE_OR) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(776);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(775);
							match(ASSIGN);
							}
						}

						setState(778);
						expr(16);
						}
						break;
					case 11:
						{
						_localctx = new AndOrExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(779);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						setState(780);
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
						setState(781);
						expr(15);
						}
						break;
					case 12:
						{
						_localctx = new PowerOfExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(782);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						{
						setState(783);
						match(POW);
						}
						setState(785);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(784);
							((PowerOfExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(787);
						expr(14);
						}
						break;
					case 13:
						{
						_localctx = new MultiplicationExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(788);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(789);
						((MultiplicationExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(((((_la - 54)) & ~0x3f) == 0 && ((1L << (_la - 54)) & ((1L << (DIV - 54)) | (1L << (MOD - 54)) | (1L << (STAR - 54)))) != 0)) ) {
							((MultiplicationExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(791);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(790);
							((MultiplicationExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(793);
						expr(13);
						}
						break;
					case 14:
						{
						_localctx = new AdditiveExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(794);
						if (!(precpred(_ctx, 11))) throw new FailedPredicateException(this, "precpred(_ctx, 11)");
						setState(795);
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
						setState(797);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(796);
							((AdditiveExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(799);
						expr(12);
						}
						break;
					case 15:
						{
						_localctx = new RelationalExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(800);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(801);
						((RelationalExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(((((_la - 84)) & ~0x3f) == 0 && ((1L << (_la - 84)) & ((1L << (LTEQ - 84)) | (1L << (LT - 84)) | (1L << (GTEQ - 84)) | (1L << (GT - 84)))) != 0)) ) {
							((RelationalExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(802);
						expr(11);
						}
						break;
					case 16:
						{
						_localctx = new EqualityExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(803);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(804);
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
						setState(805);
						expr(10);
						}
						break;
					case 17:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(806);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(807);
						((BitwiseExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(((((_la - 85)) & ~0x3f) == 0 && ((1L << (_la - 85)) & ((1L << (ARITHMETIC_LEFT - 85)) | (1L << (ARITHMETIC_RIGHT - 85)) | (1L << (LOGICAL_RIGHT_SHIFT - 85)))) != 0)) ) {
							((BitwiseExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(809);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(808);
							((BitwiseExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(811);
						expr(9);
						}
						break;
					case 18:
						{
						_localctx = new ArrowExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(812);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						{
						setState(813);
						match(ARROW);
						}
						setState(814);
						expr(8);
						}
						break;
					case 19:
						{
						_localctx = new TernaryExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(815);
						if (!(precpred(_ctx, 2))) throw new FailedPredicateException(this, "precpred(_ctx, 2)");
						setState(816);
						match(OPTIONAL);
						setState(817);
						expr(0);
						setState(818);
						match(COLON);
						setState(819);
						expr(3);
						}
						break;
					case 20:
						{
						_localctx = new IndexExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(821);
						if (!(precpred(_ctx, 37))) throw new FailedPredicateException(this, "precpred(_ctx, 37)");
						setState(822);
						match(LEFT_BRACKET);
						setState(824);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(823);
							expr(0);
							}
						}

						setState(826);
						match(RIGHT_BRACKET);
						}
						break;
					case 21:
						{
						_localctx = new RangeExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(827);
						if (!(precpred(_ctx, 35))) throw new FailedPredicateException(this, "precpred(_ctx, 35)");
						setState(828);
						match(RANGE);
						setState(829);
						expr(0);
						setState(832);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,107,_ctx) ) {
						case 1:
							{
							setState(830);
							((RangeExprContext)_localctx).hasStep = match(STEP);
							setState(831);
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
						setState(834);
						if (!(precpred(_ctx, 30))) throw new FailedPredicateException(this, "precpred(_ctx, 30)");
						setState(835);
						match(LEFT_PAREN);
						setState(837); 
						_errHandler.sync(this);
						_la = _input.LA(1);
						do {
							{
							{
							setState(836);
							params();
							}
							}
							setState(839); 
							_errHandler.sync(this);
							_la = _input.LA(1);
						} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0) );
						setState(841);
						match(RIGHT_PAREN);
						}
						break;
					case 23:
						{
						_localctx = new ExprWithParenExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(843);
						if (!(precpred(_ctx, 29))) throw new FailedPredicateException(this, "precpred(_ctx, 29)");
						setState(844);
						match(LEFT_PAREN);
						setState(846);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(845);
							expr(0);
							}
						}

						setState(848);
						match(RIGHT_PAREN);
						}
						break;
					case 24:
						{
						_localctx = new ExprWithAnonymousObjectExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(849);
						if (!(precpred(_ctx, 28))) throw new FailedPredicateException(this, "precpred(_ctx, 28)");
						setState(850);
						match(LEFT_CURLY);
						setState(852);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(851);
							params();
							}
						}

						setState(854);
						match(COLON);
						setState(856);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW) | (1L << TILDE))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(855);
							expr(0);
							}
						}

						setState(858);
						match(RIGHT_CURLY);
						}
						break;
					case 25:
						{
						_localctx = new PostFixExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(859);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(864);
						_errHandler.sync(this);
						switch (_input.LA(1)) {
						case PLUS:
							{
							setState(860);
							match(PLUS);
							setState(861);
							match(PLUS);
							}
							break;
						case MINUS:
							{
							setState(862);
							match(MINUS);
							setState(863);
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
				setState(870);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,114,_ctx);
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
		public TerminalNode TRUE() { return getToken(T3ParserParser.TRUE, 0); }
		public BooleanAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class RegexpStringAtomContext extends PrimaryContext {
		public TerminalNode RSTR() { return getToken(T3ParserParser.RSTR, 0); }
		public RegexpStringAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class HexAtomContext extends PrimaryContext {
		public TerminalNode HEX() { return getToken(T3ParserParser.HEX, 0); }
		public HexAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class NilAtomContext extends PrimaryContext {
		public TerminalNode NIL() { return getToken(T3ParserParser.NIL, 0); }
		public NilAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class SingleQuotestringAtomContext extends PrimaryContext {
		public TerminalNode DSTR() { return getToken(T3ParserParser.DSTR, 0); }
		public SingleQuotestringAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class InheritedAtomContext extends PrimaryContext {
		public TerminalNode INHERITED() { return getToken(T3ParserParser.INHERITED, 0); }
		public InheritedAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class NumberAtomContext extends PrimaryContext {
		public TerminalNode NR() { return getToken(T3ParserParser.NR, 0); }
		public NumberAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class DoubleQuotestringAtomContext extends PrimaryContext {
		public TerminalNode SSTR() { return getToken(T3ParserParser.SSTR, 0); }
		public DoubleQuotestringAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}
	public static class ReferenceAtomContext extends PrimaryContext {
		public TerminalNode AMP() { return getToken(T3ParserParser.AMP, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public ReferenceAtomContext(PrimaryContext ctx) { copyFrom(ctx); }
	}

	public final PrimaryContext primary() throws RecognitionException {
		PrimaryContext _localctx = new PrimaryContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_primary);
		try {
			setState(882);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case INHERITED:
				_localctx = new InheritedAtomContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(871);
				match(INHERITED);
				}
				break;
			case HEX:
				_localctx = new HexAtomContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(872);
				match(HEX);
				}
				break;
			case NR:
				_localctx = new NumberAtomContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(873);
				match(NR);
				}
				break;
			case AMP:
				_localctx = new ReferenceAtomContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(874);
				match(AMP);
				setState(875);
				identifierAtom();
				}
				break;
			case STRING:
			case IN:
			case ID:
				_localctx = new IdAtomContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(876);
				identifierAtom();
				}
				break;
			case SSTR:
				_localctx = new DoubleQuotestringAtomContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(877);
				match(SSTR);
				}
				break;
			case DSTR:
				_localctx = new SingleQuotestringAtomContext(_localctx);
				enterOuterAlt(_localctx, 7);
				{
				setState(878);
				match(DSTR);
				}
				break;
			case RSTR:
				_localctx = new RegexpStringAtomContext(_localctx);
				enterOuterAlt(_localctx, 8);
				{
				setState(879);
				match(RSTR);
				}
				break;
			case TRUE:
				_localctx = new BooleanAtomContext(_localctx);
				enterOuterAlt(_localctx, 9);
				{
				setState(880);
				match(TRUE);
				}
				break;
			case NIL:
				_localctx = new NilAtomContext(_localctx);
				enterOuterAlt(_localctx, 10);
				{
				setState(881);
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
		public TerminalNode ID() { return getToken(T3ParserParser.ID, 0); }
		public TerminalNode IN() { return getToken(T3ParserParser.IN, 0); }
		public TerminalNode STRING() { return getToken(T3ParserParser.STRING, 0); }
		public IdentifierAtomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifierAtom; }
	}

	public final IdentifierAtomContext identifierAtom() throws RecognitionException {
		IdentifierAtomContext _localctx = new IdentifierAtomContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_identifierAtom);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(884);
			_la = _input.LA(1);
			if ( !(((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (ID - 35)))) != 0)) ) {
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
		public TerminalNode SPREAD() { return getToken(T3ParserParser.SPREAD, 0); }
		public ArrayContext array() {
			return getRuleContext(ArrayContext.class,0);
		}
		public List<TerminalNode> COMMA() { return getTokens(T3ParserParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(T3ParserParser.COMMA, i);
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
		enterRule(_localctx, 102, RULE_params);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(889);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,116,_ctx) ) {
			case 1:
				{
				setState(886);
				optionallyTypedOptionalId();
				}
				break;
			case 2:
				{
				setState(887);
				match(SPREAD);
				}
				break;
			case 3:
				{
				setState(888);
				array();
				}
				break;
			}
			setState(895);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,117,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(891);
					match(COMMA);
					setState(892);
					params();
					}
					} 
				}
				setState(897);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,117,_ctx);
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
		public TerminalNode COLON() { return getToken(T3ParserParser.COLON, 0); }
		public List<IdentifierAtomContext> identifierAtom() {
			return getRuleContexts(IdentifierAtomContext.class);
		}
		public IdentifierAtomContext identifierAtom(int i) {
			return getRuleContext(IdentifierAtomContext.class,i);
		}
		public TerminalNode OPTIONAL() { return getToken(T3ParserParser.OPTIONAL, 0); }
		public OptionallyTypedOptionalIdContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_optionallyTypedOptionalId; }
	}

	public final OptionallyTypedOptionalIdContext optionallyTypedOptionalId() throws RecognitionException {
		OptionallyTypedOptionalIdContext _localctx = new OptionallyTypedOptionalIdContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_optionallyTypedOptionalId);
		int _la;
		try {
			setState(915);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,122,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				{
				setState(901);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,118,_ctx) ) {
				case 1:
					{
					setState(898);
					((OptionallyTypedOptionalIdContext)_localctx).identifier = identifierAtom();
					setState(899);
					match(COLON);
					}
					break;
				}
				setState(904);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,119,_ctx) ) {
				case 1:
					{
					setState(903);
					((OptionallyTypedOptionalIdContext)_localctx).type = identifierAtom();
					}
					break;
				}
				{
				setState(906);
				((OptionallyTypedOptionalIdContext)_localctx).name = identifierAtom();
				}
				setState(908);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==OPTIONAL) {
					{
					setState(907);
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
				setState(910);
				((OptionallyTypedOptionalIdContext)_localctx).identifier = identifierAtom();
				setState(911);
				((OptionallyTypedOptionalIdContext)_localctx).emptyColon = match(COLON);
				setState(913);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==OPTIONAL) {
					{
					setState(912);
					((OptionallyTypedOptionalIdContext)_localctx).optional = match(OPTIONAL);
					}
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
		case 48:
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
			return precpred(_ctx, 38);
		case 2:
			return precpred(_ctx, 36);
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
			return precpred(_ctx, 37);
		case 21:
			return precpred(_ctx, 35);
		case 22:
			return precpred(_ctx, 30);
		case 23:
			return precpred(_ctx, 29);
		case 24:
			return precpred(_ctx, 28);
		case 25:
			return precpred(_ctx, 3);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3`\u0398\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t+\4"+
		",\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64\t"+
		"\64\4\65\t\65\4\66\t\66\3\2\7\2n\n\2\f\2\16\2q\13\2\3\2\3\2\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3~\n\3\3\4\3\4\5\4\u0082\n\4\3\4\3\4\3\4"+
		"\3\4\3\4\3\4\5\4\u008a\n\4\3\4\3\4\3\4\3\4\3\4\3\4\5\4\u0092\n\4\3\5\3"+
		"\5\3\5\7\5\u0097\n\5\f\5\16\5\u009a\13\5\3\6\5\6\u009d\n\6\3\6\7\6\u00a0"+
		"\n\6\f\6\16\6\u00a3\13\6\3\7\3\7\3\7\3\7\3\7\3\b\3\b\3\b\6\b\u00ad\n\b"+
		"\r\b\16\b\u00ae\3\b\3\b\3\b\3\b\3\b\3\b\5\b\u00b7\n\b\3\b\3\b\7\b\u00bb"+
		"\n\b\f\b\16\b\u00be\13\b\3\t\3\t\3\t\3\t\5\t\u00c4\n\t\6\t\u00c6\n\t\r"+
		"\t\16\t\u00c7\3\t\3\t\3\t\3\t\3\t\3\t\3\t\7\t\u00d1\n\t\f\t\16\t\u00d4"+
		"\13\t\3\t\3\t\3\t\3\t\5\t\u00da\n\t\3\n\3\n\5\n\u00de\n\n\3\n\3\n\3\n"+
		"\7\n\u00e3\n\n\f\n\16\n\u00e6\13\n\3\n\3\n\3\13\7\13\u00eb\n\13\f\13\16"+
		"\13\u00ee\13\13\3\13\3\13\3\13\3\13\7\13\u00f4\n\13\f\13\16\13\u00f7\13"+
		"\13\3\13\3\13\3\f\7\f\u00fc\n\f\f\f\16\f\u00ff\13\f\3\f\3\f\5\f\u0103"+
		"\n\f\3\f\3\f\3\f\7\f\u0108\n\f\f\f\16\f\u010b\13\f\3\f\3\f\3\r\3\r\3\r"+
		"\5\r\u0112\n\r\3\r\3\r\3\16\3\16\5\16\u0118\n\16\3\16\5\16\u011b\n\16"+
		"\3\16\5\16\u011e\n\16\3\16\3\16\5\16\u0122\n\16\3\16\3\16\7\16\u0126\n"+
		"\16\f\16\16\16\u0129\13\16\3\16\3\16\3\17\5\17\u012e\n\17\3\17\3\17\3"+
		"\17\5\17\u0133\n\17\3\17\3\17\3\17\3\17\3\20\5\20\u013a\n\20\3\20\5\20"+
		"\u013d\n\20\3\20\5\20\u0140\n\20\5\20\u0142\n\20\3\20\7\20\u0145\n\20"+
		"\f\20\16\20\u0148\13\20\3\20\3\20\5\20\u014c\n\20\3\20\3\20\3\20\3\20"+
		"\5\20\u0152\n\20\3\20\3\20\5\20\u0156\n\20\3\21\3\21\5\21\u015a\n\21\3"+
		"\21\3\21\3\21\3\21\5\21\u0160\n\21\3\21\3\21\3\21\3\21\3\21\5\21\u0167"+
		"\n\21\3\21\3\21\3\21\3\21\5\21\u016d\n\21\3\21\5\21\u0170\n\21\3\22\3"+
		"\22\3\22\7\22\u0175\n\22\f\22\16\22\u0178\13\22\3\23\3\23\3\23\3\23\3"+
		"\24\3\24\3\24\3\25\3\25\3\25\7\25\u0184\n\25\f\25\16\25\u0187\13\25\3"+
		"\26\7\26\u018a\n\26\f\26\16\26\u018d\13\26\3\26\3\26\3\26\7\26\u0192\n"+
		"\26\f\26\16\26\u0195\13\26\3\27\3\27\5\27\u0199\n\27\3\27\3\27\5\27\u019d"+
		"\n\27\3\27\3\27\5\27\u01a1\n\27\3\27\5\27\u01a4\n\27\3\27\3\27\5\27\u01a8"+
		"\n\27\3\27\3\27\5\27\u01ac\n\27\3\27\3\27\7\27\u01b0\n\27\f\27\16\27\u01b3"+
		"\13\27\3\27\3\27\5\27\u01b7\n\27\5\27\u01b9\n\27\3\30\7\30\u01bc\n\30"+
		"\f\30\16\30\u01bf\13\30\3\31\3\31\3\31\3\31\3\31\5\31\u01c6\n\31\3\31"+
		"\5\31\u01c9\n\31\3\31\3\31\3\32\3\32\5\32\u01cf\n\32\3\32\3\32\7\32\u01d3"+
		"\n\32\f\32\16\32\u01d6\13\32\3\33\3\33\3\33\3\34\5\34\u01dc\n\34\3\34"+
		"\5\34\u01df\n\34\3\34\5\34\u01e2\n\34\3\34\3\34\3\34\5\34\u01e7\n\34\3"+
		"\34\5\34\u01ea\n\34\3\34\3\34\3\34\5\34\u01ef\n\34\3\34\5\34\u01f2\n\34"+
		"\5\34\u01f4\n\34\3\35\3\35\7\35\u01f8\n\35\f\35\16\35\u01fb\13\35\3\35"+
		"\3\35\5\35\u01ff\n\35\3\36\3\36\3\36\3\36\3\36\3\36\3\36\3\36\3\36\3\36"+
		"\3\36\3\36\3\36\3\36\3\36\3\36\3\36\5\36\u0212\n\36\3\37\3\37\5\37\u0216"+
		"\n\37\3\37\3\37\3 \3 \5 \u021c\n \3 \3 \3!\3!\5!\u0222\n!\3!\3!\3\"\3"+
		"\"\3\"\3#\3#\3#\3#\3#\3#\3#\3#\3#\3#\7#\u0233\n#\f#\16#\u0236\13#\5#\u0238"+
		"\n#\7#\u023a\n#\f#\16#\u023d\13#\3#\3#\3#\7#\u0242\n#\f#\16#\u0245\13"+
		"#\5#\u0247\n#\3#\3#\3$\3$\3$\3%\3%\3%\3%\3%\3%\3%\3%\3%\3&\3&\3&\3&\3"+
		"&\3&\3&\3&\3\'\3\'\5\'\u0261\n\'\3\'\3\'\3(\3(\3(\3(\3(\5(\u026a\n(\3"+
		"(\3(\3)\3)\3)\5)\u0271\n)\3)\3)\3)\3*\3*\3*\5*\u0279\n*\3*\3*\5*\u027d"+
		"\n*\3*\3*\5*\u0281\n*\3*\3*\3*\3+\3+\3+\3+\3+\5+\u028b\n+\3+\3+\7+\u028f"+
		"\n+\f+\16+\u0292\13+\3+\3+\5+\u0296\n+\3,\3,\3,\5,\u029b\n,\3-\5-\u029e"+
		"\n-\3-\3-\3.\3.\3.\3/\3/\3/\3/\5/\u02a9\n/\3/\3/\3\60\3\60\3\60\3\60\3"+
		"\60\7\60\u02b2\n\60\f\60\16\60\u02b5\13\60\3\60\3\60\5\60\u02b9\n\60\3"+
		"\61\3\61\3\61\3\61\3\61\3\62\3\62\3\62\5\62\u02c3\n\62\3\62\3\62\3\62"+
		"\3\62\3\62\3\62\3\62\3\62\3\62\3\62\5\62\u02cf\n\62\3\62\3\62\3\62\3\62"+
		"\3\62\3\62\3\62\3\62\3\62\5\62\u02da\n\62\3\62\3\62\5\62\u02de\n\62\3"+
		"\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\5\62\u02e9\n\62\3\62\3\62"+
		"\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62"+
		"\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62"+
		"\3\62\3\62\5\62\u030b\n\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\5\62\u0314"+
		"\n\62\3\62\3\62\3\62\3\62\5\62\u031a\n\62\3\62\3\62\3\62\3\62\5\62\u0320"+
		"\n\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\5\62\u032c\n\62"+
		"\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\3\62\5\62"+
		"\u033b\n\62\3\62\3\62\3\62\3\62\3\62\3\62\5\62\u0343\n\62\3\62\3\62\3"+
		"\62\6\62\u0348\n\62\r\62\16\62\u0349\3\62\3\62\3\62\3\62\3\62\5\62\u0351"+
		"\n\62\3\62\3\62\3\62\3\62\5\62\u0357\n\62\3\62\3\62\5\62\u035b\n\62\3"+
		"\62\3\62\3\62\3\62\3\62\3\62\5\62\u0363\n\62\7\62\u0365\n\62\f\62\16\62"+
		"\u0368\13\62\3\63\3\63\3\63\3\63\3\63\3\63\3\63\3\63\3\63\3\63\3\63\5"+
		"\63\u0375\n\63\3\64\3\64\3\65\3\65\3\65\5\65\u037c\n\65\3\65\3\65\7\65"+
		"\u0380\n\65\f\65\16\65\u0383\13\65\3\66\3\66\3\66\5\66\u0388\n\66\3\66"+
		"\5\66\u038b\n\66\3\66\3\66\5\66\u038f\n\66\3\66\3\66\3\66\5\66\u0394\n"+
		"\66\5\66\u0396\n\66\3\66\2\4\16b\67\2\4\6\b\n\f\16\20\22\24\26\30\32\34"+
		"\36 \"$&(*,.\60\62\64\668:<>@BDFHJLNPRTVXZ\\^`bdfhj\2\f\3\2QR\7\2\61\62"+
		"\64\64\67\67::@@\4\2\62\62KK\3\2=>\4\289JJ\4\2\67\67::\4\2VVXZ\3\2;<\4"+
		"\2WW[\\\5\2%%\'\'BB\2\u0428\2o\3\2\2\2\4}\3\2\2\2\6\u0081\3\2\2\2\b\u0093"+
		"\3\2\2\2\n\u009c\3\2\2\2\f\u00a4\3\2\2\2\16\u00b6\3\2\2\2\20\u00d9\3\2"+
		"\2\2\22\u00db\3\2\2\2\24\u00ec\3\2\2\2\26\u00fd\3\2\2\2\30\u010e\3\2\2"+
		"\2\32\u0115\3\2\2\2\34\u012d\3\2\2\2\36\u0141\3\2\2\2 \u016c\3\2\2\2\""+
		"\u0171\3\2\2\2$\u0179\3\2\2\2&\u017d\3\2\2\2(\u0180\3\2\2\2*\u018b\3\2"+
		"\2\2,\u01b8\3\2\2\2.\u01bd\3\2\2\2\60\u01c8\3\2\2\2\62\u01ce\3\2\2\2\64"+
		"\u01d7\3\2\2\2\66\u01f3\3\2\2\28\u01fe\3\2\2\2:\u0211\3\2\2\2<\u0213\3"+
		"\2\2\2>\u0219\3\2\2\2@\u021f\3\2\2\2B\u0225\3\2\2\2D\u0228\3\2\2\2F\u024a"+
		"\3\2\2\2H\u024d\3\2\2\2J\u0256\3\2\2\2L\u025e\3\2\2\2N\u0264\3\2\2\2P"+
		"\u026d\3\2\2\2R\u0275\3\2\2\2T\u0285\3\2\2\2V\u0297\3\2\2\2X\u029d\3\2"+
		"\2\2Z\u02a1\3\2\2\2\\\u02a4\3\2\2\2^\u02ac\3\2\2\2`\u02ba\3\2\2\2b\u02e8"+
		"\3\2\2\2d\u0374\3\2\2\2f\u0376\3\2\2\2h\u037b\3\2\2\2j\u0395\3\2\2\2l"+
		"n\5\4\3\2ml\3\2\2\2nq\3\2\2\2om\3\2\2\2op\3\2\2\2pr\3\2\2\2qo\3\2\2\2"+
		"rs\7\2\2\3s\3\3\2\2\2t~\5\22\n\2u~\5\20\t\2v~\5\32\16\2w~\5\30\r\2x~\5"+
		"\36\20\2y~\5\24\13\2z~\5\26\f\2{~\5\64\33\2|~\5\6\4\2}t\3\2\2\2}u\3\2"+
		"\2\2}v\3\2\2\2}w\3\2\2\2}x\3\2\2\2}y\3\2\2\2}z\3\2\2\2}{\3\2\2\2}|\3\2"+
		"\2\2~\5\3\2\2\2\177\u0082\7\22\2\2\u0080\u0082\7\23\2\2\u0081\177\3\2"+
		"\2\2\u0081\u0080\3\2\2\2\u0081\u0082\3\2\2\2\u0082\u0083\3\2\2\2\u0083"+
		"\u0084\7\3\2\2\u0084\u0089\5f\64\2\u0085\u0086\7M\2\2\u0086\u0087\5f\64"+
		"\2\u0087\u0088\7N\2\2\u0088\u008a\3\2\2\2\u0089\u0085\3\2\2\2\u0089\u008a"+
		"\3\2\2\2\u008a\u008b\3\2\2\2\u008b\u008c\7G\2\2\u008c\u008d\5\b\5\2\u008d"+
		"\u008e\7G\2\2\u008e\u0091\5(\25\2\u008f\u0092\5$\23\2\u0090\u0092\5&\24"+
		"\2\u0091\u008f\3\2\2\2\u0091\u0090\3\2\2\2\u0092\7\3\2\2\2\u0093\u0098"+
		"\5\n\6\2\u0094\u0095\7K\2\2\u0095\u0097\5\n\6\2\u0096\u0094\3\2\2\2\u0097"+
		"\u009a\3\2\2\2\u0098\u0096\3\2\2\2\u0098\u0099\3\2\2\2\u0099\t\3\2\2\2"+
		"\u009a\u0098\3\2\2\2\u009b\u009d\5\f\7\2\u009c\u009b\3\2\2\2\u009c\u009d"+
		"\3\2\2\2\u009d\u00a1\3\2\2\2\u009e\u00a0\5\16\b\2\u009f\u009e\3\2\2\2"+
		"\u00a0\u00a3\3\2\2\2\u00a1\u009f\3\2\2\2\u00a1\u00a2\3\2\2\2\u00a2\13"+
		"\3\2\2\2\u00a3\u00a1\3\2\2\2\u00a4\u00a5\7O\2\2\u00a5\u00a6\5f\64\2\u00a6"+
		"\u00a7\7D\2\2\u00a7\u00a8\7P\2\2\u00a8\r\3\2\2\2\u00a9\u00aa\b\b\1\2\u00aa"+
		"\u00ac\7M\2\2\u00ab\u00ad\5\16\b\2\u00ac\u00ab\3\2\2\2\u00ad\u00ae\3\2"+
		"\2\2\u00ae\u00ac\3\2\2\2\u00ae\u00af\3\2\2\2\u00af\u00b0\3\2\2\2\u00b0"+
		"\u00b1\7N\2\2\u00b1\u00b7\3\2\2\2\u00b2\u00b3\7K\2\2\u00b3\u00b7\5\16"+
		"\b\5\u00b4\u00b7\5b\62\2\u00b5\u00b7\7J\2\2\u00b6\u00a9\3\2\2\2\u00b6"+
		"\u00b2\3\2\2\2\u00b6\u00b4\3\2\2\2\u00b6\u00b5\3\2\2\2\u00b7\u00bc\3\2"+
		"\2\2\u00b8\u00b9\f\6\2\2\u00b9\u00bb\7K\2\2\u00ba\u00b8\3\2\2\2\u00bb"+
		"\u00be\3\2\2\2\u00bc\u00ba\3\2\2\2\u00bc\u00bd\3\2\2\2\u00bd\17\3\2\2"+
		"\2\u00be\u00bc\3\2\2\2\u00bf\u00c0\5f\64\2\u00c0\u00c5\7\n\2\2\u00c1\u00c3"+
		"\5b\62\2\u00c2\u00c4\7\65\2\2\u00c3\u00c2\3\2\2\2\u00c3\u00c4\3\2\2\2"+
		"\u00c4\u00c6\3\2\2\2\u00c5\u00c1\3\2\2\2\u00c6\u00c7\3\2\2\2\u00c7\u00c5"+
		"\3\2\2\2\u00c7\u00c8\3\2\2\2\u00c8\u00c9\3\2\2\2\u00c9\u00ca\7L\2\2\u00ca"+
		"\u00da\3\2\2\2\u00cb\u00cc\7%\2\2\u00cc\u00cd\7\n\2\2\u00cd\u00d2\7W\2"+
		"\2\u00ce\u00d1\5f\64\2\u00cf\u00d1\7J\2\2\u00d0\u00ce\3\2\2\2\u00d0\u00cf"+
		"\3\2\2\2\u00d1\u00d4\3\2\2\2\u00d2\u00d0\3\2\2\2\u00d2\u00d3\3\2\2\2\u00d3"+
		"\u00d5\3\2\2\2\u00d4\u00d2\3\2\2\2\u00d5\u00d6\7[\2\2\u00d6\u00d7\5f\64"+
		"\2\u00d7\u00d8\7L\2\2\u00d8\u00da\3\2\2\2\u00d9\u00bf\3\2\2\2\u00d9\u00cb"+
		"\3\2\2\2\u00da\21\3\2\2\2\u00db\u00dd\7\17\2\2\u00dc\u00de\7\60\2\2\u00dd"+
		"\u00dc\3\2\2\2\u00dd\u00de\3\2\2\2\u00de\u00df\3\2\2\2\u00df\u00e4\5f"+
		"\64\2\u00e0\u00e1\7H\2\2\u00e1\u00e3\5f\64\2\u00e2\u00e0\3\2\2\2\u00e3"+
		"\u00e6\3\2\2\2\u00e4\u00e2\3\2\2\2\u00e4\u00e5\3\2\2\2\u00e5\u00e7\3\2"+
		"\2\2\u00e6\u00e4\3\2\2\2\u00e7\u00e8\7L\2\2\u00e8\23\3\2\2\2\u00e9\u00eb"+
		"\7\67\2\2\u00ea\u00e9\3\2\2\2\u00eb\u00ee\3\2\2\2\u00ec\u00ea\3\2\2\2"+
		"\u00ec\u00ed\3\2\2\2\u00ed\u00ef\3\2\2\2\u00ee\u00ec\3\2\2\2\u00ef\u00f0"+
		"\7\37\2\2\u00f0\u00f5\5f\64\2\u00f1\u00f2\7H\2\2\u00f2\u00f4\5f\64\2\u00f3"+
		"\u00f1\3\2\2\2\u00f4\u00f7\3\2\2\2\u00f5\u00f3\3\2\2\2\u00f5\u00f6\3\2"+
		"\2\2\u00f6\u00f8\3\2\2\2\u00f7\u00f5\3\2\2\2\u00f8\u00f9\7L\2\2\u00f9"+
		"\25\3\2\2\2\u00fa\u00fc\7\67\2\2\u00fb\u00fa\3\2\2\2\u00fc\u00ff\3\2\2"+
		"\2\u00fd\u00fb\3\2\2\2\u00fd\u00fe\3\2\2\2\u00fe\u0100\3\2\2\2\u00ff\u00fd"+
		"\3\2\2\2\u0100\u0102\7 \2\2\u0101\u0103\7\37\2\2\u0102\u0101\3\2\2\2\u0102"+
		"\u0103\3\2\2\2\u0103\u0104\3\2\2\2\u0104\u0109\5f\64\2\u0105\u0106\7H"+
		"\2\2\u0106\u0108\5f\64\2\u0107\u0105\3\2\2\2\u0108\u010b\3\2\2\2\u0109"+
		"\u0107\3\2\2\2\u0109\u010a\3\2\2\2\u010a\u010c\3\2\2\2\u010b\u0109\3\2"+
		"\2\2\u010c\u010d\7L\2\2\u010d\27\3\2\2\2\u010e\u010f\7!\2\2\u010f\u0111"+
		"\5f\64\2\u0110\u0112\7R\2\2\u0111\u0110\3\2\2\2\u0111\u0112\3\2\2\2\u0112"+
		"\u0113\3\2\2\2\u0113\u0114\7L\2\2\u0114\31\3\2\2\2\u0115\u0117\7\34\2"+
		"\2\u0116\u0118\7\20\2\2\u0117\u0116\3\2\2\2\u0117\u0118\3\2\2\2\u0118"+
		"\u011a\3\2\2\2\u0119\u011b\5f\64\2\u011a\u0119\3\2\2\2\u011a\u011b\3\2"+
		"\2\2\u011b\u011d\3\2\2\2\u011c\u011e\t\2\2\2\u011d\u011c\3\2\2\2\u011d"+
		"\u011e\3\2\2\2\u011e\u0121\3\2\2\2\u011f\u0120\7G\2\2\u0120\u0122\5(\25"+
		"\2\u0121\u011f\3\2\2\2\u0121\u0122\3\2\2\2\u0122\u0123\3\2\2\2\u0123\u0127"+
		"\7T\2\2\u0124\u0126\5\34\17\2\u0125\u0124\3\2\2\2\u0126\u0129\3\2\2\2"+
		"\u0127\u0125\3\2\2\2\u0127\u0128\3\2\2\2\u0128\u012a\3\2\2\2\u0129\u0127"+
		"\3\2\2\2\u012a\u012b\7U\2\2\u012b\33\3\2\2\2\u012c\u012e\7$\2\2\u012d"+
		"\u012c\3\2\2\2\u012d\u012e\3\2\2\2\u012e\u012f\3\2\2\2\u012f\u0130\5f"+
		"\64\2\u0130\u0132\7M\2\2\u0131\u0133\5h\65\2\u0132\u0131\3\2\2\2\u0132"+
		"\u0133\3\2\2\2\u0133\u0134\3\2\2\2\u0134\u0135\7N\2\2\u0135\u0136\3\2"+
		"\2\2\u0136\u0137\7L\2\2\u0137\35\3\2\2\2\u0138\u013a\7\22\2\2\u0139\u0138"+
		"\3\2\2\2\u0139\u013a\3\2\2\2\u013a\u0142\3\2\2\2\u013b\u013d\7\23\2\2"+
		"\u013c\u013b\3\2\2\2\u013c\u013d\3\2\2\2\u013d\u0142\3\2\2\2\u013e\u0140"+
		"\7\20\2\2\u013f\u013e\3\2\2\2\u013f\u0140\3\2\2\2\u0140\u0142\3\2\2\2"+
		"\u0141\u0139\3\2\2\2\u0141\u013c\3\2\2\2\u0141\u013f\3\2\2\2\u0142\u0146"+
		"\3\2\2\2\u0143\u0145\7\67\2\2\u0144\u0143\3\2\2\2\u0145\u0148\3\2\2\2"+
		"\u0146\u0144\3\2\2\2\u0146\u0147\3\2\2\2\u0147\u0151\3\2\2\2\u0148\u0146"+
		"\3\2\2\2\u0149\u0152\5(\25\2\u014a\u014c\7\21\2\2\u014b\u014a\3\2\2\2"+
		"\u014b\u014c\3\2\2\2\u014c\u014d\3\2\2\2\u014d\u014e\5f\64\2\u014e\u014f"+
		"\7G\2\2\u014f\u0150\5(\25\2\u0150\u0152\3\2\2\2\u0151\u0149\3\2\2\2\u0151"+
		"\u014b\3\2\2\2\u0152\u0155\3\2\2\2\u0153\u0156\5$\23\2\u0154\u0156\5&"+
		"\24\2\u0155\u0153\3\2\2\2\u0155\u0154\3\2\2\2\u0156\37\3\2\2\2\u0157\u0159"+
		"\7R\2\2\u0158\u015a\7L\2\2\u0159\u0158\3\2\2\2\u0159\u015a\3\2\2\2\u015a"+
		"\u016d\3\2\2\2\u015b\u015c\7\61\2\2\u015c\u016d\5f\64\2\u015d\u015f\7"+
		"Q\2\2\u015e\u0160\7L\2\2\u015f\u015e\3\2\2\2\u015f\u0160\3\2\2\2\u0160"+
		"\u016d\3\2\2\2\u0161\u0162\7\67\2\2\u0162\u016d\7D\2\2\u0163\u0166\7?"+
		"\2\2\u0164\u0167\5f\64\2\u0165\u0167\5b\62\2\u0166\u0164\3\2\2\2\u0166"+
		"\u0165\3\2\2\2\u0167\u016d\3\2\2\2\u0168\u0169\7O\2\2\u0169\u016a\5\""+
		"\22\2\u016a\u016b\7P\2\2\u016b\u016d\3\2\2\2\u016c\u0157\3\2\2\2\u016c"+
		"\u015b\3\2\2\2\u016c\u015d\3\2\2\2\u016c\u0161\3\2\2\2\u016c\u0163\3\2"+
		"\2\2\u016c\u0168\3\2\2\2\u016d\u016f\3\2\2\2\u016e\u0170\7\65\2\2\u016f"+
		"\u016e\3\2\2\2\u016f\u0170\3\2\2\2\u0170!\3\2\2\2\u0171\u0176\5b\62\2"+
		"\u0172\u0173\7H\2\2\u0173\u0175\5\"\22\2\u0174\u0172\3\2\2\2\u0175\u0178"+
		"\3\2\2\2\u0176\u0174\3\2\2\2\u0176\u0177\3\2\2\2\u0177#\3\2\2\2\u0178"+
		"\u0176\3\2\2\2\u0179\u017a\7T\2\2\u017a\u017b\5*\26\2\u017b\u017c\7U\2"+
		"\2\u017c%\3\2\2\2\u017d\u017e\5*\26\2\u017e\u017f\7L\2\2\u017f\'\3\2\2"+
		"\2\u0180\u0185\5f\64\2\u0181\u0182\7H\2\2\u0182\u0184\5(\25\2\u0183\u0181"+
		"\3\2\2\2\u0184\u0187\3\2\2\2\u0185\u0183\3\2\2\2\u0185\u0186\3\2\2\2\u0186"+
		")\3\2\2\2\u0187\u0185\3\2\2\2\u0188\u018a\5 \21\2\u0189\u0188\3\2\2\2"+
		"\u018a\u018d\3\2\2\2\u018b\u0189\3\2\2\2\u018b\u018c\3\2\2\2\u018c\u0193"+
		"\3\2\2\2\u018d\u018b\3\2\2\2\u018e\u0192\5\64\33\2\u018f\u0192\5,\27\2"+
		"\u0190\u0192\5\60\31\2\u0191\u018e\3\2\2\2\u0191\u018f\3\2\2\2\u0191\u0190"+
		"\3\2\2\2\u0192\u0195\3\2\2\2\u0193\u0191\3\2\2\2\u0193\u0194\3\2\2\2\u0194"+
		"+\3\2\2\2\u0195\u0193\3\2\2\2\u0196\u0199\5f\64\2\u0197\u0199\7\'\2\2"+
		"\u0198\u0196\3\2\2\2\u0198\u0197\3\2\2\2\u0199\u019a\3\2\2\2\u019a\u019c"+
		"\7C\2\2\u019b\u019d\7$\2\2\u019c\u019b\3\2\2\2\u019c\u019d\3\2\2\2\u019d"+
		"\u01a0\3\2\2\2\u019e\u01a1\5b\62\2\u019f\u01a1\5.\30\2\u01a0\u019e\3\2"+
		"\2\2\u01a0\u019f\3\2\2\2\u01a1\u01a3\3\2\2\2\u01a2\u01a4\7L\2\2\u01a3"+
		"\u01a2\3\2\2\2\u01a3\u01a4\3\2\2\2\u01a4\u01b9\3\2\2\2\u01a5\u01a8\5f"+
		"\64\2\u01a6\u01a8\7\'\2\2\u01a7\u01a5\3\2\2\2\u01a7\u01a6\3\2\2\2\u01a8"+
		"\u01a9\3\2\2\2\u01a9\u01ab\7G\2\2\u01aa\u01ac\5f\64\2\u01ab\u01aa\3\2"+
		"\2\2\u01ab\u01ac\3\2\2\2\u01ac\u01b1\3\2\2\2\u01ad\u01ae\7H\2\2\u01ae"+
		"\u01b0\5(\25\2\u01af\u01ad\3\2\2\2\u01b0\u01b3\3\2\2\2\u01b1\u01af\3\2"+
		"\2\2\u01b1\u01b2\3\2\2\2\u01b2\u01b4\3\2\2\2\u01b3\u01b1\3\2\2\2\u01b4"+
		"\u01b6\5$\23\2\u01b5\u01b7\7L\2\2\u01b6\u01b5\3\2\2\2\u01b6\u01b7\3\2"+
		"\2\2\u01b7\u01b9\3\2\2\2\u01b8\u0198\3\2\2\2\u01b8\u01a7\3\2\2\2\u01b9"+
		"-\3\2\2\2\u01ba\u01bc\7R\2\2\u01bb\u01ba\3\2\2\2\u01bc\u01bf\3\2\2\2\u01bd"+
		"\u01bb\3\2\2\2\u01bd\u01be\3\2\2\2\u01be/\3\2\2\2\u01bf\u01bd\3\2\2\2"+
		"\u01c0\u01c1\7\24\2\2\u01c1\u01c9\5\62\32\2\u01c2\u01c3\7\24\2\2\u01c3"+
		"\u01c5\7M\2\2\u01c4\u01c6\5\62\32\2\u01c5\u01c4\3\2\2\2\u01c5\u01c6\3"+
		"\2\2\2\u01c6\u01c7\3\2\2\2\u01c7\u01c9\7N\2\2\u01c8\u01c0\3\2\2\2\u01c8"+
		"\u01c2\3\2\2\2\u01c9\u01ca\3\2\2\2\u01ca\u01cb\5$\23\2\u01cb\61\3\2\2"+
		"\2\u01cc\u01cf\5d\63\2\u01cd\u01cf\7J\2\2\u01ce\u01cc\3\2\2\2\u01ce\u01cd"+
		"\3\2\2\2\u01cf\u01d4\3\2\2\2\u01d0\u01d1\7H\2\2\u01d1\u01d3\5\62\32\2"+
		"\u01d2\u01d0\3\2\2\2\u01d3\u01d6\3\2\2\2\u01d4\u01d2\3\2\2\2\u01d4\u01d5"+
		"\3\2\2\2\u01d5\63\3\2\2\2\u01d6\u01d4\3\2\2\2\u01d7\u01d8\5\66\34\2\u01d8"+
		"\u01d9\58\35\2\u01d9\65\3\2\2\2\u01da\u01dc\7\"\2\2\u01db\u01da\3\2\2"+
		"\2\u01db\u01dc\3\2\2\2\u01dc\u01de\3\2\2\2\u01dd\u01df\7$\2\2\u01de\u01dd"+
		"\3\2\2\2\u01de\u01df\3\2\2\2\u01df\u01e1\3\2\2\2\u01e0\u01e2\7\7\2\2\u01e1"+
		"\u01e0\3\2\2\2\u01e1\u01e2\3\2\2\2\u01e2\u01e3\3\2\2\2\u01e3\u01e9\5f"+
		"\64\2\u01e4\u01e6\7M\2\2\u01e5\u01e7\5h\65\2\u01e6\u01e5\3\2\2\2\u01e6"+
		"\u01e7\3\2\2\2\u01e7\u01e8\3\2\2\2\u01e8\u01ea\7N\2\2\u01e9\u01e4\3\2"+
		"\2\2\u01e9\u01ea\3\2\2\2\u01ea\u01f4\3\2\2\2\u01eb\u01f1\7\7\2\2\u01ec"+
		"\u01ee\7M\2\2\u01ed\u01ef\5h\65\2\u01ee\u01ed\3\2\2\2\u01ee\u01ef\3\2"+
		"\2\2\u01ef\u01f0\3\2\2\2\u01f0\u01f2\7N\2\2\u01f1\u01ec\3\2\2\2\u01f1"+
		"\u01f2\3\2\2\2\u01f2\u01f4\3\2\2\2\u01f3\u01db\3\2\2\2\u01f3\u01eb\3\2"+
		"\2\2\u01f4\67\3\2\2\2\u01f5\u01f9\7T\2\2\u01f6\u01f8\5:\36\2\u01f7\u01f6"+
		"\3\2\2\2\u01f8\u01fb\3\2\2\2\u01f9\u01f7\3\2\2\2\u01f9\u01fa\3\2\2\2\u01fa"+
		"\u01fc\3\2\2\2\u01fb\u01f9\3\2\2\2\u01fc\u01ff\7U\2\2\u01fd\u01ff\5:\36"+
		"\2\u01fe\u01f5\3\2\2\2\u01fe\u01fd\3\2\2\2\u01ff9\3\2\2\2\u0200\u0212"+
		"\5\\/\2\u0201\u0212\5^\60\2\u0202\u0212\5T+\2\u0203\u0212\5R*\2\u0204"+
		"\u0212\5N(\2\u0205\u0212\5P)\2\u0206\u0212\5D#\2\u0207\u0212\5H%\2\u0208"+
		"\u0212\5J&\2\u0209\u0212\5Z.\2\u020a\u0212\5X-\2\u020b\u0212\5L\'\2\u020c"+
		"\u0212\5F$\2\u020d\u0212\5B\"\2\u020e\u0212\5> \2\u020f\u0212\5@!\2\u0210"+
		"\u0212\5<\37\2\u0211\u0200\3\2\2\2\u0211\u0201\3\2\2\2\u0211\u0202\3\2"+
		"\2\2\u0211\u0203\3\2\2\2\u0211\u0204\3\2\2\2\u0211\u0205\3\2\2\2\u0211"+
		"\u0206\3\2\2\2\u0211\u0207\3\2\2\2\u0211\u0208\3\2\2\2\u0211\u0209\3\2"+
		"\2\2\u0211\u020a\3\2\2\2\u0211\u020b\3\2\2\2\u0211\u020c\3\2\2\2\u0211"+
		"\u020d\3\2\2\2\u0211\u020e\3\2\2\2\u0211\u020f\3\2\2\2\u0211\u0210\3\2"+
		"\2\2\u0212;\3\2\2\2\u0213\u0215\7/\2\2\u0214\u0216\5f\64\2\u0215\u0214"+
		"\3\2\2\2\u0215\u0216\3\2\2\2\u0216\u0217\3\2\2\2\u0217\u0218\7L\2\2\u0218"+
		"=\3\2\2\2\u0219\u021b\7-\2\2\u021a\u021c\5f\64\2\u021b\u021a\3\2\2\2\u021b"+
		"\u021c\3\2\2\2\u021c\u021d\3\2\2\2\u021d\u021e\7L\2\2\u021e?\3\2\2\2\u021f"+
		"\u0221\7.\2\2\u0220\u0222\5f\64\2\u0221\u0220\3\2\2\2\u0221\u0222\3\2"+
		"\2\2\u0222\u0223\3\2\2\2\u0223\u0224\7L\2\2\u0224A\3\2\2\2\u0225\u0226"+
		"\5f\64\2\u0226\u0227\7G\2\2\u0227C\3\2\2\2\u0228\u0229\7\4\2\2\u0229\u022a"+
		"\7M\2\2\u022a\u022b\5b\62\2\u022b\u022c\7N\2\2\u022c\u023b\7T\2\2\u022d"+
		"\u022e\7\5\2\2\u022e\u022f\5d\63\2\u022f\u0237\7G\2\2\u0230\u0238\58\35"+
		"\2\u0231\u0233\5:\36\2\u0232\u0231\3\2\2\2\u0233\u0236\3\2\2\2\u0234\u0232"+
		"\3\2\2\2\u0234\u0235\3\2\2\2\u0235\u0238\3\2\2\2\u0236\u0234\3\2\2\2\u0237"+
		"\u0230\3\2\2\2\u0237\u0234\3\2\2\2\u0238\u023a\3\2\2\2\u0239\u022d\3\2"+
		"\2\2\u023a\u023d\3\2\2\2\u023b\u0239\3\2\2\2\u023b\u023c\3\2\2\2\u023c"+
		"\u0246\3\2\2\2\u023d\u023b\3\2\2\2\u023e\u023f\7\6\2\2\u023f\u0243\7G"+
		"\2\2\u0240\u0242\58\35\2\u0241\u0240\3\2\2\2\u0242\u0245\3\2\2\2\u0243"+
		"\u0241\3\2\2\2\u0243\u0244\3\2\2\2\u0244\u0247\3\2\2\2\u0245\u0243\3\2"+
		"\2\2\u0246\u023e\3\2\2\2\u0246\u0247\3\2\2\2\u0247\u0248\3\2\2\2\u0248"+
		"\u0249\7U\2\2\u0249E\3\2\2\2\u024a\u024b\7\b\2\2\u024b\u024c\5b\62\2\u024c"+
		"G\3\2\2\2\u024d\u024e\7\13\2\2\u024e\u024f\7M\2\2\u024f\u0250\7\31\2\2"+
		"\u0250\u0251\7B\2\2\u0251\u0252\7\'\2\2\u0252\u0253\5b\62\2\u0253\u0254"+
		"\7N\2\2\u0254\u0255\58\35\2\u0255I\3\2\2\2\u0256\u0257\7&\2\2\u0257\u0258"+
		"\7M\2\2\u0258\u0259\5b\62\2\u0259\u025a\7\'\2\2\u025a\u025b\5b\62\2\u025b"+
		"\u025c\7N\2\2\u025c\u025d\58\35\2\u025dK\3\2\2\2\u025e\u0260\7#\2\2\u025f"+
		"\u0261\5b\62\2\u0260\u025f\3\2\2\2\u0260\u0261\3\2\2\2\u0261\u0262\3\2"+
		"\2\2\u0262\u0263\7L\2\2\u0263M\3\2\2\2\u0264\u0265\7\26\2\2\u0265\u0266"+
		"\58\35\2\u0266\u0267\7\27\2\2\u0267\u0269\7M\2\2\u0268\u026a\5b\62\2\u0269"+
		"\u0268\3\2\2\2\u0269\u026a\3\2\2\2\u026a\u026b\3\2\2\2\u026b\u026c\7N"+
		"\2\2\u026cO\3\2\2\2\u026d\u026e\7\27\2\2\u026e\u0270\7M\2\2\u026f\u0271"+
		"\5b\62\2\u0270\u026f\3\2\2\2\u0270\u0271\3\2\2\2\u0271\u0272\3\2\2\2\u0272"+
		"\u0273\7N\2\2\u0273\u0274\58\35\2\u0274Q\3\2\2\2\u0275\u0276\7\13\2\2"+
		"\u0276\u0278\7M\2\2\u0277\u0279\5b\62\2\u0278\u0277\3\2\2\2\u0278\u0279"+
		"\3\2\2\2\u0279\u027a\3\2\2\2\u027a\u027c\7L\2\2\u027b\u027d\5b\62\2\u027c"+
		"\u027b\3\2\2\2\u027c\u027d\3\2\2\2\u027d\u027e\3\2\2\2\u027e\u0280\7L"+
		"\2\2\u027f\u0281\5b\62\2\u0280\u027f\3\2\2\2\u0280\u0281\3\2\2\2\u0281"+
		"\u0282\3\2\2\2\u0282\u0283\7N\2\2\u0283\u0284\58\35\2\u0284S\3\2\2\2\u0285"+
		"\u0286\7\f\2\2\u0286\u0290\58\35\2\u0287\u0288\7\r\2\2\u0288\u028a\7M"+
		"\2\2\u0289\u028b\5h\65\2\u028a\u0289\3\2\2\2\u028a\u028b\3\2\2\2\u028b"+
		"\u028c\3\2\2\2\u028c\u028d\7N\2\2\u028d\u028f\58\35\2\u028e\u0287\3\2"+
		"\2\2\u028f\u0292\3\2\2\2\u0290\u028e\3\2\2\2\u0290\u0291\3\2\2\2\u0291"+
		"\u0295\3\2\2\2\u0292\u0290\3\2\2\2\u0293\u0294\7\16\2\2\u0294\u0296\5"+
		"8\35\2\u0295\u0293\3\2\2\2\u0295\u0296\3\2\2\2\u0296U\3\2\2\2\u0297\u029a"+
		"\5b\62\2\u0298\u0299\7I\2\2\u0299\u029b\5V,\2\u029a\u0298\3\2\2\2\u029a"+
		"\u029b\3\2\2\2\u029bW\3\2\2\2\u029c\u029e\5b\62\2\u029d\u029c\3\2\2\2"+
		"\u029d\u029e\3\2\2\2\u029e\u029f\3\2\2\2\u029f\u02a0\7L\2\2\u02a0Y\3\2"+
		"\2\2\u02a1\u02a2\7Q\2\2\u02a2\u02a3\7L\2\2\u02a3[\3\2\2\2\u02a4\u02a5"+
		"\7\31\2\2\u02a5\u02a8\5f\64\2\u02a6\u02a7\7C\2\2\u02a7\u02a9\5b\62\2\u02a8"+
		"\u02a6\3\2\2\2\u02a8\u02a9\3\2\2\2\u02a9\u02aa\3\2\2\2\u02aa\u02ab\7L"+
		"\2\2\u02ab]\3\2\2\2\u02ac\u02ad\7\25\2\2\u02ad\u02b3\5`\61\2\u02ae\u02af"+
		"\7\30\2\2\u02af\u02b0\7\25\2\2\u02b0\u02b2\5`\61\2\u02b1\u02ae\3\2\2\2"+
		"\u02b2\u02b5\3\2\2\2\u02b3\u02b1\3\2\2\2\u02b3\u02b4\3\2\2\2\u02b4\u02b8"+
		"\3\2\2\2\u02b5\u02b3\3\2\2\2\u02b6\u02b7\7\30\2\2\u02b7\u02b9\58\35\2"+
		"\u02b8\u02b6\3\2\2\2\u02b8\u02b9\3\2\2\2\u02b9_\3\2\2\2\u02ba\u02bb\7"+
		"M\2\2\u02bb\u02bc\5b\62\2\u02bc\u02bd\7N\2\2\u02bd\u02be\58\35\2\u02be"+
		"a\3\2\2\2\u02bf\u02c0\b\62\1\2\u02c0\u02c2\7O\2\2\u02c1\u02c3\5b\62\2"+
		"\u02c2\u02c1\3\2\2\2\u02c2\u02c3\3\2\2\2\u02c3\u02c4\3\2\2\2\u02c4\u02e9"+
		"\7P\2\2\u02c5\u02c6\7\36\2\2\u02c6\u02e9\5b\62$\u02c7\u02c8\7\35\2\2\u02c8"+
		"\u02e9\5b\62#\u02c9\u02ca\7\21\2\2\u02ca\u02e9\5b\62\"\u02cb\u02e9\5d"+
		"\63\2\u02cc\u02ce\7M\2\2\u02cd\u02cf\5b\62\2\u02ce\u02cd\3\2\2\2\u02ce"+
		"\u02cf\3\2\2\2\u02cf\u02d0\3\2\2\2\u02d0\u02e9\7N\2\2\u02d1\u02d2\7\31"+
		"\2\2\u02d2\u02e9\5b\62\34\u02d3\u02d4\7$\2\2\u02d4\u02e9\5b\62\33\u02d5"+
		"\u02d6\7\t\2\2\u02d6\u02e9\5b\62\32\u02d7\u02d9\7T\2\2\u02d8\u02da\5h"+
		"\65\2\u02d9\u02d8\3\2\2\2\u02d9\u02da\3\2\2\2\u02da\u02db\3\2\2\2\u02db"+
		"\u02dd\7G\2\2\u02dc\u02de\5b\62\2\u02dd\u02dc\3\2\2\2\u02dd\u02de\3\2"+
		"\2\2\u02de\u02df\3\2\2\2\u02df\u02e9\7U\2\2\u02e0\u02e1\7?\2\2\u02e1\u02e9"+
		"\5b\62\b\u02e2\u02e3\7J\2\2\u02e3\u02e4\7?\2\2\u02e4\u02e9\5b\62\7\u02e5"+
		"\u02e6\t\3\2\2\u02e6\u02e9\5b\62\6\u02e7\u02e9\5\64\33\2\u02e8\u02bf\3"+
		"\2\2\2\u02e8\u02c5\3\2\2\2\u02e8\u02c7\3\2\2\2\u02e8\u02c9\3\2\2\2\u02e8"+
		"\u02cb\3\2\2\2\u02e8\u02cc\3\2\2\2\u02e8\u02d1\3\2\2\2\u02e8\u02d3\3\2"+
		"\2\2\u02e8\u02d5\3\2\2\2\u02e8\u02d7\3\2\2\2\u02e8\u02e0\3\2\2\2\u02e8"+
		"\u02e2\3\2\2\2\u02e8\u02e5\3\2\2\2\u02e8\u02e7\3\2\2\2\u02e9\u0366\3\2"+
		"\2\2\u02ea\u02eb\f(\2\2\u02eb\u02ec\7I\2\2\u02ec\u0365\5b\62)\u02ed\u02ee"+
		"\f&\2\2\u02ee\u02ef\7H\2\2\u02ef\u0365\5b\62\'\u02f0\u02f1\f\31\2\2\u02f1"+
		"\u02f2\7\62\2\2\u02f2\u0365\5b\62\32\u02f3\u02f4\f\30\2\2\u02f4\u02f5"+
		"\7+\2\2\u02f5\u02f6\7\'\2\2\u02f6\u0365\5b\62\31\u02f7\u02f8\f\27\2\2"+
		"\u02f8\u02f9\7,\2\2\u02f9\u02fa\7\'\2\2\u02fa\u0365\5b\62\30\u02fb\u02fc"+
		"\f\26\2\2\u02fc\u02fd\7,\2\2\u02fd\u0365\5b\62\27\u02fe\u02ff\f\25\2\2"+
		"\u02ff\u0300\7\'\2\2\u0300\u0365\5b\62\26\u0301\u0302\f\24\2\2\u0302\u0303"+
		"\7C\2\2\u0303\u0365\5b\62\25\u0304\u0305\f\23\2\2\u0305\u0306\7\66\2\2"+
		"\u0306\u0365\5b\62\24\u0307\u0308\f\21\2\2\u0308\u030a\t\4\2\2\u0309\u030b"+
		"\7C\2\2\u030a\u0309\3\2\2\2\u030a\u030b\3\2\2\2\u030b\u030c\3\2\2\2\u030c"+
		"\u0365\5b\62\22\u030d\u030e\f\20\2\2\u030e\u030f\t\5\2\2\u030f\u0365\5"+
		"b\62\21\u0310\u0311\f\17\2\2\u0311\u0313\7A\2\2\u0312\u0314\7C\2\2\u0313"+
		"\u0312\3\2\2\2\u0313\u0314\3\2\2\2\u0314\u0315\3\2\2\2\u0315\u0365\5b"+
		"\62\20\u0316\u0317\f\16\2\2\u0317\u0319\t\6\2\2\u0318\u031a\7C\2\2\u0319"+
		"\u0318\3\2\2\2\u0319\u031a\3\2\2\2\u031a\u031b\3\2\2\2\u031b\u0365\5b"+
		"\62\17\u031c\u031d\f\r\2\2\u031d\u031f\t\7\2\2\u031e\u0320\7C\2\2\u031f"+
		"\u031e\3\2\2\2\u031f\u0320\3\2\2\2\u0320\u0321\3\2\2\2\u0321\u0365\5b"+
		"\62\16\u0322\u0323\f\f\2\2\u0323\u0324\t\b\2\2\u0324\u0365\5b\62\r\u0325"+
		"\u0326\f\13\2\2\u0326\u0327\t\t\2\2\u0327\u0365\5b\62\f\u0328\u0329\f"+
		"\n\2\2\u0329\u032b\t\n\2\2\u032a\u032c\7C\2\2\u032b\u032a\3\2\2\2\u032b"+
		"\u032c\3\2\2\2\u032c\u032d\3\2\2\2\u032d\u0365\5b\62\13\u032e\u032f\f"+
		"\t\2\2\u032f\u0330\7?\2\2\u0330\u0365\5b\62\n\u0331\u0332\f\4\2\2\u0332"+
		"\u0333\7\65\2\2\u0333\u0334\5b\62\2\u0334\u0335\7G\2\2\u0335\u0336\5b"+
		"\62\5\u0336\u0365\3\2\2\2\u0337\u0338\f\'\2\2\u0338\u033a\7O\2\2\u0339"+
		"\u033b\5b\62\2\u033a\u0339\3\2\2\2\u033a\u033b\3\2\2\2\u033b\u033c\3\2"+
		"\2\2\u033c\u0365\7P\2\2\u033d\u033e\f%\2\2\u033e\u033f\7)\2\2\u033f\u0342"+
		"\5b\62\2\u0340\u0341\7*\2\2\u0341\u0343\5b\62\2\u0342\u0340\3\2\2\2\u0342"+
		"\u0343\3\2\2\2\u0343\u0365\3\2\2\2\u0344\u0345\f \2\2\u0345\u0347\7M\2"+
		"\2\u0346\u0348\5h\65\2\u0347\u0346\3\2\2\2\u0348\u0349\3\2\2\2\u0349\u0347"+
		"\3\2\2\2\u0349\u034a\3\2\2\2\u034a\u034b\3\2\2\2\u034b\u034c\7N\2\2\u034c"+
		"\u0365\3\2\2\2\u034d\u034e\f\37\2\2\u034e\u0350\7M\2\2\u034f\u0351\5b"+
		"\62\2\u0350\u034f\3\2\2\2\u0350\u0351\3\2\2\2\u0351\u0352\3\2\2\2\u0352"+
		"\u0365\7N\2\2\u0353\u0354\f\36\2\2\u0354\u0356\7T\2\2\u0355\u0357\5h\65"+
		"\2\u0356\u0355\3\2\2\2\u0356\u0357\3\2\2\2\u0357\u0358\3\2\2\2\u0358\u035a"+
		"\7G\2\2\u0359\u035b\5b\62\2\u035a\u0359\3\2\2\2\u035a\u035b\3\2\2\2\u035b"+
		"\u035c\3\2\2\2\u035c\u0365\7U\2\2\u035d\u0362\f\5\2\2\u035e\u035f\7\67"+
		"\2\2\u035f\u0363\7\67\2\2\u0360\u0361\7:\2\2\u0361\u0363\7:\2\2\u0362"+
		"\u035e\3\2\2\2\u0362\u0360\3\2\2\2\u0363\u0365\3\2\2\2\u0364\u02ea\3\2"+
		"\2\2\u0364\u02ed\3\2\2\2\u0364\u02f0\3\2\2\2\u0364\u02f3\3\2\2\2\u0364"+
		"\u02f7\3\2\2\2\u0364\u02fb\3\2\2\2\u0364\u02fe\3\2\2\2\u0364\u0301\3\2"+
		"\2\2\u0364\u0304\3\2\2\2\u0364\u0307\3\2\2\2\u0364\u030d\3\2\2\2\u0364"+
		"\u0310\3\2\2\2\u0364\u0316\3\2\2\2\u0364\u031c\3\2\2\2\u0364\u0322\3\2"+
		"\2\2\u0364\u0325\3\2\2\2\u0364\u0328\3\2\2\2\u0364\u032e\3\2\2\2\u0364"+
		"\u0331\3\2\2\2\u0364\u0337\3\2\2\2\u0364\u033d\3\2\2\2\u0364\u0344\3\2"+
		"\2\2\u0364\u034d\3\2\2\2\u0364\u0353\3\2\2\2\u0364\u035d\3\2\2\2\u0365"+
		"\u0368\3\2\2\2\u0366\u0364\3\2\2\2\u0366\u0367\3\2\2\2\u0367c\3\2\2\2"+
		"\u0368\u0366\3\2\2\2\u0369\u0375\7\35\2\2\u036a\u0375\7E\2\2\u036b\u0375"+
		"\7D\2\2\u036c\u036d\7\62\2\2\u036d\u0375\5f\64\2\u036e\u0375\5f\64\2\u036f"+
		"\u0375\7R\2\2\u0370\u0375\7Q\2\2\u0371\u0375\7S\2\2\u0372\u0375\7\32\2"+
		"\2\u0373\u0375\7\33\2\2\u0374\u0369\3\2\2\2\u0374\u036a\3\2\2\2\u0374"+
		"\u036b\3\2\2\2\u0374\u036c\3\2\2\2\u0374\u036e\3\2\2\2\u0374\u036f\3\2"+
		"\2\2\u0374\u0370\3\2\2\2\u0374\u0371\3\2\2\2\u0374\u0372\3\2\2\2\u0374"+
		"\u0373\3\2\2\2\u0375e\3\2\2\2\u0376\u0377\t\13\2\2\u0377g\3\2\2\2\u0378"+
		"\u037c\5j\66\2\u0379\u037c\7(\2\2\u037a\u037c\5\"\22\2\u037b\u0378\3\2"+
		"\2\2\u037b\u0379\3\2\2\2\u037b\u037a\3\2\2\2\u037c\u0381\3\2\2\2\u037d"+
		"\u037e\7H\2\2\u037e\u0380\5h\65\2\u037f\u037d\3\2\2\2\u0380\u0383\3\2"+
		"\2\2\u0381\u037f\3\2\2\2\u0381\u0382\3\2\2\2\u0382i\3\2\2\2\u0383\u0381"+
		"\3\2\2\2\u0384\u0385\5f\64\2\u0385\u0386\7G\2\2\u0386\u0388\3\2\2\2\u0387"+
		"\u0384\3\2\2\2\u0387\u0388\3\2\2\2\u0388\u038a\3\2\2\2\u0389\u038b\5f"+
		"\64\2\u038a\u0389\3\2\2\2\u038a\u038b\3\2\2\2\u038b\u038c\3\2\2\2\u038c"+
		"\u038e\5f\64\2\u038d\u038f\7\65\2\2\u038e\u038d\3\2\2\2\u038e\u038f\3"+
		"\2\2\2\u038f\u0396\3\2\2\2\u0390\u0391\5f\64\2\u0391\u0393\7G\2\2\u0392"+
		"\u0394\7\65\2\2\u0393\u0392\3\2\2\2\u0393\u0394\3\2\2\2\u0394\u0396\3"+
		"\2\2\2\u0395\u0387\3\2\2\2\u0395\u0390\3\2\2\2\u0396k\3\2\2\2}o}\u0081"+
		"\u0089\u0091\u0098\u009c\u00a1\u00ae\u00b6\u00bc\u00c3\u00c7\u00d0\u00d2"+
		"\u00d9\u00dd\u00e4\u00ec\u00f5\u00fd\u0102\u0109\u0111\u0117\u011a\u011d"+
		"\u0121\u0127\u012d\u0132\u0139\u013c\u013f\u0141\u0146\u014b\u0151\u0155"+
		"\u0159\u015f\u0166\u016c\u016f\u0176\u0185\u018b\u0191\u0193\u0198\u019c"+
		"\u01a0\u01a3\u01a7\u01ab\u01b1\u01b6\u01b8\u01bd\u01c5\u01c8\u01ce\u01d4"+
		"\u01db\u01de\u01e1\u01e6\u01e9\u01ee\u01f1\u01f3\u01f9\u01fe\u0211\u0215"+
		"\u021b\u0221\u0234\u0237\u023b\u0243\u0246\u0260\u0269\u0270\u0278\u027c"+
		"\u0280\u028a\u0290\u0295\u029a\u029d\u02a8\u02b3\u02b8\u02c2\u02ce\u02d9"+
		"\u02dd\u02e8\u030a\u0313\u0319\u031f\u032b\u033a\u0342\u0349\u0350\u0356"+
		"\u035a\u0362\u0364\u0366\u0374\u037b\u0381\u0387\u038a\u038e\u0393\u0395";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}