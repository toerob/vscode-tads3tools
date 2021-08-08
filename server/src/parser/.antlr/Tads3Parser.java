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
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << GRAMMAR) | (1L << FUNCTION) | (1L << ENUM) | (1L << CLASS) | (1L << TRANSIENT) | (1L << MODIFY) | (1L << REPLACE) | (1L << INTRINSIC) | (1L << PROPERTY) | (1L << DICTIONARY) | (1L << EXPORT) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << HASH) | (1L << PLUS))) != 0) || _la==ID || _la==SEMICOLON) {
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
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public TerminalNode MODIFY() { return getToken(Tads3Parser.MODIFY, 0); }
		public TerminalNode REPLACE() { return getToken(Tads3Parser.REPLACE, 0); }
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
			case PROPERTYSET:
			case EXTERN:
			case STATIC:
			case STRING:
			case IN:
			case STEP:
			case OPERATOR:
			case AT:
			case PLUS:
			case ARROW:
			case ID:
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
			setState(160);
			itemList();
			setState(165);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==BITWISE_OR) {
				{
				{
				setState(161);
				match(BITWISE_OR);
				setState(162);
				itemList();
				}
				}
				setState(167);
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
			setState(169);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
			case 1:
				{
				setState(168);
				qualifiers();
				}
				break;
			}
			setState(174);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(171);
					item(0);
					}
					} 
				}
				setState(176);
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
			setState(177);
			match(LEFT_BRACKET);
			setState(178);
			identifierAtom();
			setState(179);
			match(NR);
			setState(180);
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
			setState(195);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
			case 1:
				{
				setState(183);
				match(LEFT_PAREN);
				setState(185); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(184);
					item(0);
					}
					}
					setState(187); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (BITWISE_OR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0) );
				setState(189);
				match(RIGHT_PAREN);
				}
				break;
			case 2:
				{
				setState(191);
				match(BITWISE_OR);
				setState(192);
				item(3);
				}
				break;
			case 3:
				{
				setState(193);
				expr(0);
				}
				break;
			case 4:
				{
				setState(194);
				match(STAR);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(201);
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
					setState(197);
					if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
					setState(198);
					match(BITWISE_OR);
					}
					} 
				}
				setState(203);
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
			setState(232);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,15,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(204);
				((TemplateDeclarationContext)_localctx).className = identifierAtom();
				setState(205);
				match(TEMPLATE);
				setState(210); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(206);
					((TemplateDeclarationContext)_localctx).expr = expr(0);
					((TemplateDeclarationContext)_localctx).properties.add(((TemplateDeclarationContext)_localctx).expr);
					setState(208);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==OPTIONAL) {
						{
						setState(207);
						match(OPTIONAL);
						}
					}

					}
					}
					setState(212); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0) );
				setState(214);
				match(SEMICOLON);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(216);
				match(STRING);
				setState(217);
				match(TEMPLATE);
				setState(218);
				match(ARITHMETIC_LEFT);
				setState(225);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (IS - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)) | (1L << (STAR - 35)))) != 0)) {
					{
					setState(223);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,13,_ctx) ) {
					case 1:
						{
						setState(219);
						identifierAtom();
						}
						break;
					case 2:
						{
						setState(220);
						match(STAR);
						}
						break;
					case 3:
						{
						setState(221);
						match(IS);
						}
						break;
					case 4:
						{
						setState(222);
						match(IN);
						}
						break;
					}
					}
					setState(227);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(228);
				match(ARITHMETIC_RIGHT);
				setState(229);
				((TemplateDeclarationContext)_localctx).templateId = identifierAtom();
				setState(230);
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
			setState(234);
			match(ENUM);
			setState(236);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==TOKEN) {
				{
				setState(235);
				((EnumDeclarationContext)_localctx).isToken = match(TOKEN);
				}
			}

			setState(238);
			identifierAtom();
			setState(243);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(239);
				match(COMMA);
				setState(240);
				identifierAtom();
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
			setState(251);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(248);
				((PropertyDeclarationContext)_localctx).level = match(PLUS);
				}
				}
				setState(253);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(254);
			((PropertyDeclarationContext)_localctx).isProperty = match(PROPERTY);
			setState(255);
			((PropertyDeclarationContext)_localctx).identifierAtom = identifierAtom();
			((PropertyDeclarationContext)_localctx).identifiers.add(((PropertyDeclarationContext)_localctx).identifierAtom);
			setState(260);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(256);
				match(COMMA);
				setState(257);
				((PropertyDeclarationContext)_localctx).identifierAtom = identifierAtom();
				((PropertyDeclarationContext)_localctx).identifiers.add(((PropertyDeclarationContext)_localctx).identifierAtom);
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
			setState(268);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(265);
				((DictionaryDeclarationContext)_localctx).level = match(PLUS);
				}
				}
				setState(270);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(271);
			match(DICTIONARY);
			setState(273);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PROPERTY) {
				{
				setState(272);
				((DictionaryDeclarationContext)_localctx).isProperty = match(PROPERTY);
				}
			}

			setState(275);
			((DictionaryDeclarationContext)_localctx).identifierAtom = identifierAtom();
			((DictionaryDeclarationContext)_localctx).identifiers.add(((DictionaryDeclarationContext)_localctx).identifierAtom);
			setState(280);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(276);
				match(COMMA);
				setState(277);
				((DictionaryDeclarationContext)_localctx).identifierAtom = identifierAtom();
				((DictionaryDeclarationContext)_localctx).identifiers.add(((DictionaryDeclarationContext)_localctx).identifierAtom);
				}
				}
				setState(282);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(283);
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
			setState(285);
			match(EXPORT);
			setState(286);
			identifierAtom();
			setState(288);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SSTR) {
				{
				setState(287);
				match(SSTR);
				}
			}

			setState(290);
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
			setState(292);
			match(INTRINSIC);
			setState(294);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==CLASS) {
				{
				setState(293);
				match(CLASS);
				}
			}

			setState(297);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(296);
				((IntrinsicDeclarationContext)_localctx).name = identifierAtom();
				}
			}

			setState(300);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==DSTR || _la==SSTR) {
				{
				setState(299);
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

			setState(304);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COLON) {
				{
				setState(302);
				match(COLON);
				setState(303);
				superTypes();
				}
			}

			setState(306);
			match(LEFT_CURLY);
			setState(310);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 34)) & ~0x3f) == 0 && ((1L << (_la - 34)) & ((1L << (STATIC - 34)) | (1L << (STRING - 34)) | (1L << (IN - 34)) | (1L << (STEP - 34)) | (1L << (OPERATOR - 34)) | (1L << (ID - 34)))) != 0)) {
				{
				{
				setState(307);
				((IntrinsicDeclarationContext)_localctx).intrinsicMethodDeclaration = intrinsicMethodDeclaration();
				((IntrinsicDeclarationContext)_localctx).methods.add(((IntrinsicDeclarationContext)_localctx).intrinsicMethodDeclaration);
				}
				}
				setState(312);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(313);
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
			setState(316);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==STATIC) {
				{
				setState(315);
				match(STATIC);
				}
			}

			setState(318);
			identifierAtom();
			{
			setState(319);
			match(LEFT_PAREN);
			setState(321);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(320);
				params();
				}
			}

			setState(323);
			match(RIGHT_PAREN);
			}
			setState(325);
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
			setState(336);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,34,_ctx) ) {
			case 1:
				{
				setState(328);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==MODIFY) {
					{
					setState(327);
					((ObjectDeclarationContext)_localctx).isModify = match(MODIFY);
					}
				}

				}
				break;
			case 2:
				{
				setState(331);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==REPLACE) {
					{
					setState(330);
					((ObjectDeclarationContext)_localctx).isReplace = match(REPLACE);
					}
				}

				}
				break;
			case 3:
				{
				setState(334);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==CLASS) {
					{
					setState(333);
					((ObjectDeclarationContext)_localctx).isClass = match(CLASS);
					}
				}

				}
				break;
			}
			setState(341);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==PLUS) {
				{
				{
				setState(338);
				((ObjectDeclarationContext)_localctx).PLUS = match(PLUS);
				((ObjectDeclarationContext)_localctx).level.add(((ObjectDeclarationContext)_localctx).PLUS);
				}
				}
				setState(343);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(352);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,37,_ctx) ) {
			case 1:
				{
				setState(344);
				superTypes();
				}
				break;
			case 2:
				{
				{
				setState(346);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==TRANSIENT) {
					{
					setState(345);
					((ObjectDeclarationContext)_localctx).isTransient = match(TRANSIENT);
					}
				}

				setState(348);
				((ObjectDeclarationContext)_localctx).id = identifierAtom();
				setState(349);
				match(COLON);
				setState(350);
				superTypes();
				}
				}
				break;
			}
			setState(356);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LEFT_CURLY:
				{
				setState(354);
				curlyObjectBody();
				}
				break;
			case FUNCTION:
			case PROPERTYSET:
			case EXTERN:
			case STATIC:
			case STRING:
			case IN:
			case STEP:
			case OPERATOR:
			case AT:
			case PLUS:
			case ARROW:
			case ID:
			case SEMICOLON:
			case LEFT_BRACKET:
			case DSTR:
			case SSTR:
				{
				setState(355);
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
		public TerminalNode AT() { return getToken(Tads3Parser.AT, 0); }
		public TerminalNode PLUS() { return getToken(Tads3Parser.PLUS, 0); }
		public TerminalNode ARROW() { return getToken(Tads3Parser.ARROW, 0); }
		public TerminalNode LEFT_BRACKET() { return getToken(Tads3Parser.LEFT_BRACKET, 0); }
		public ArrayContext array() {
			return getRuleContext(ArrayContext.class,0);
		}
		public TerminalNode RIGHT_BRACKET() { return getToken(Tads3Parser.RIGHT_BRACKET, 0); }
		public TerminalNode SSTR() { return getToken(Tads3Parser.SSTR, 0); }
		public IdentifierAtomContext identifierAtom() {
			return getRuleContext(IdentifierAtomContext.class,0);
		}
		public TerminalNode DSTR() { return getToken(Tads3Parser.DSTR, 0); }
		public TerminalNode NR() { return getToken(Tads3Parser.NR, 0); }
		public TerminalNode OPTIONAL() { return getToken(Tads3Parser.OPTIONAL, 0); }
		public TerminalNode SEMICOLON() { return getToken(Tads3Parser.SEMICOLON, 0); }
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
		enterRule(_localctx, 32, RULE_templateExpr);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(379);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case SSTR:
				{
				setState(358);
				((TemplateExprContext)_localctx).singleString = match(SSTR);
				setState(360);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,39,_ctx) ) {
				case 1:
					{
					setState(359);
					match(SEMICOLON);
					}
					break;
				}
				}
				break;
			case AT:
				{
				setState(362);
				match(AT);
				setState(363);
				((TemplateExprContext)_localctx).atLocation = identifierAtom();
				}
				break;
			case DSTR:
				{
				setState(364);
				((TemplateExprContext)_localctx).doubleString = match(DSTR);
				setState(366);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
				case 1:
					{
					setState(365);
					match(SEMICOLON);
					}
					break;
				}
				}
				break;
			case PLUS:
				{
				setState(368);
				match(PLUS);
				setState(369);
				((TemplateExprContext)_localctx).number = match(NR);
				}
				break;
			case ARROW:
				{
				setState(370);
				match(ARROW);
				setState(373);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,41,_ctx) ) {
				case 1:
					{
					setState(371);
					((TemplateExprContext)_localctx).connection = identifierAtom();
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
			case LEFT_BRACKET:
				{
				setState(375);
				match(LEFT_BRACKET);
				setState(376);
				array();
				setState(377);
				match(RIGHT_BRACKET);
				}
				break;
			default:
				throw new NoViableAltException(this);
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
			setState(384);
			expr(0);
			setState(389);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,44,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(385);
					match(COMMA);
					setState(386);
					array();
					}
					} 
				}
				setState(391);
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
			setState(392);
			match(LEFT_CURLY);
			setState(393);
			objectBody();
			setState(394);
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
			setState(396);
			objectBody();
			setState(397);
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
			setState(399);
			((SuperTypesContext)_localctx).identifierAtom = identifierAtom();
			((SuperTypesContext)_localctx).superType.add(((SuperTypesContext)_localctx).identifierAtom);
			setState(404);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,45,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(400);
					match(COMMA);
					setState(401);
					superTypes();
					}
					} 
				}
				setState(406);
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
		enterRule(_localctx, 42, RULE_objectBody);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			{
			setState(410);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 49)) & ~0x3f) == 0 && ((1L << (_la - 49)) & ((1L << (AT - 49)) | (1L << (PLUS - 49)) | (1L << (ARROW - 49)) | (1L << (LEFT_BRACKET - 49)) | (1L << (DSTR - 49)) | (1L << (SSTR - 49)))) != 0)) {
				{
				{
				setState(407);
				((ObjectBodyContext)_localctx).templateExpr = templateExpr();
				((ObjectBodyContext)_localctx).template.add(((ObjectBodyContext)_localctx).templateExpr);
				}
				}
				setState(412);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
			setState(418);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (((((_la - 5)) & ~0x3f) == 0 && ((1L << (_la - 5)) & ((1L << (FUNCTION - 5)) | (1L << (PROPERTYSET - 5)) | (1L << (EXTERN - 5)) | (1L << (STATIC - 5)) | (1L << (STRING - 5)) | (1L << (IN - 5)) | (1L << (STEP - 5)) | (1L << (OPERATOR - 5)) | (1L << (ID - 5)))) != 0)) {
				{
				setState(416);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,47,_ctx) ) {
				case 1:
					{
					setState(413);
					((ObjectBodyContext)_localctx).functionDeclaration = functionDeclaration();
					((ObjectBodyContext)_localctx).functions.add(((ObjectBodyContext)_localctx).functionDeclaration);
					}
					break;
				case 2:
					{
					setState(414);
					((ObjectBodyContext)_localctx).property = property();
					((ObjectBodyContext)_localctx).properties.add(((ObjectBodyContext)_localctx).property);
					}
					break;
				case 3:
					{
					setState(415);
					((ObjectBodyContext)_localctx).propertySet = propertySet();
					((ObjectBodyContext)_localctx).propertySets.add(((ObjectBodyContext)_localctx).propertySet);
					}
					break;
				}
				}
				setState(420);
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
			setState(421);
			((PropertyContext)_localctx).id = identifierAtom();
			setState(448);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN:
				{
				setState(422);
				match(ASSIGN);
				setState(424);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,49,_ctx) ) {
				case 1:
					{
					setState(423);
					match(STATIC);
					}
					break;
				}
				setState(428);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,50,_ctx) ) {
				case 1:
					{
					setState(426);
					expr(0);
					}
					break;
				case 2:
					{
					setState(427);
					dictionaryProperty();
					}
					break;
				}
				setState(431);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,51,_ctx) ) {
				case 1:
					{
					setState(430);
					match(SEMICOLON);
					}
					break;
				}
				}
				break;
			case COLON:
				{
				setState(433);
				match(COLON);
				setState(435);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) {
					{
					setState(434);
					((PropertyContext)_localctx).objectName = identifierAtom();
					}
				}

				setState(441);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==COMMA) {
					{
					{
					setState(437);
					match(COMMA);
					setState(438);
					superTypes();
					}
					}
					setState(443);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(444);
				curlyObjectBody();
				setState(446);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,54,_ctx) ) {
				case 1:
					{
					setState(445);
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
			setState(453);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==SSTR) {
				{
				{
				setState(450);
				match(SSTR);
				}
				}
				setState(455);
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
		public TerminalNode PROPERTYSET() { return getToken(Tads3Parser.PROPERTYSET, 0); }
		public ParamsWithWildcardContext paramsWithWildcard() {
			return getRuleContext(ParamsWithWildcardContext.class,0);
		}
		public TerminalNode LEFT_PAREN() { return getToken(Tads3Parser.LEFT_PAREN, 0); }
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
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
			setState(464);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,58,_ctx) ) {
			case 1:
				{
				setState(456);
				match(PROPERTYSET);
				setState(457);
				paramsWithWildcard();
				}
				break;
			case 2:
				{
				setState(458);
				match(PROPERTYSET);
				setState(459);
				match(LEFT_PAREN);
				setState(461);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (((((_la - 24)) & ~0x3f) == 0 && ((1L << (_la - 24)) & ((1L << (TRUE - 24)) | (1L << (NIL - 24)) | (1L << (INHERITED - 24)) | (1L << (STRING - 24)) | (1L << (IN - 24)) | (1L << (STEP - 24)) | (1L << (OPERATOR - 24)) | (1L << (AMP - 24)) | (1L << (ID - 24)) | (1L << (NR - 24)) | (1L << (HEX - 24)) | (1L << (STAR - 24)) | (1L << (DSTR - 24)) | (1L << (SSTR - 24)) | (1L << (RSTR - 24)))) != 0)) {
					{
					setState(460);
					paramsWithWildcard();
					}
				}

				setState(463);
				match(RIGHT_PAREN);
				}
				break;
			}
			setState(466);
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
			setState(470);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case TRUE:
			case NIL:
			case INHERITED:
			case STRING:
			case IN:
			case STEP:
			case OPERATOR:
			case AMP:
			case ID:
			case NR:
			case HEX:
			case DSTR:
			case SSTR:
			case RSTR:
				{
				setState(468);
				((ParamsWithWildcardContext)_localctx).primary = primary();
				((ParamsWithWildcardContext)_localctx).parameters.add(((ParamsWithWildcardContext)_localctx).primary);
				}
				break;
			case STAR:
				{
				setState(469);
				match(STAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(476);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,60,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(472);
					match(COMMA);
					setState(473);
					paramsWithWildcard();
					}
					} 
				}
				setState(478);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,60,_ctx);
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
		try {
			setState(483);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,61,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				{
				setState(479);
				functionHead();
				setState(480);
				codeBlock();
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(482);
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
			setState(485);
			match(OPERATOR);
			setState(492);
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
				setState(486);
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
				setState(487);
				match(LEFT_BRACKET);
				setState(488);
				match(RIGHT_BRACKET);
				setState(490);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==ASSIGN) {
					{
					setState(489);
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
			setState(494);
			match(LEFT_PAREN);
			setState(495);
			params();
			setState(496);
			match(RIGHT_PAREN);
			}
			setState(498);
			match(LEFT_CURLY);
			setState(502);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << STEP) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				{
				setState(499);
				stats();
				}
				}
				setState(504);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(505);
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
			setState(532);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,72,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(508);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==EXTERN) {
					{
					setState(507);
					((FunctionHeadContext)_localctx).isExtern = match(EXTERN);
					}
				}

				setState(511);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==STATIC) {
					{
					setState(510);
					((FunctionHeadContext)_localctx).isStatic = match(STATIC);
					}
				}

				setState(514);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==FUNCTION) {
					{
					setState(513);
					match(FUNCTION);
					}
				}

				setState(516);
				identifierAtom();
				setState(522);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,69,_ctx) ) {
				case 1:
					{
					setState(517);
					match(LEFT_PAREN);
					setState(519);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						setState(518);
						params();
						}
					}

					setState(521);
					match(RIGHT_PAREN);
					}
					break;
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(524);
				match(FUNCTION);
				setState(530);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,71,_ctx) ) {
				case 1:
					{
					setState(525);
					match(LEFT_PAREN);
					setState(527);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						setState(526);
						params();
						}
					}

					setState(529);
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
			setState(543);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,74,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(534);
				match(LEFT_CURLY);
				setState(538);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << STEP) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					{
					setState(535);
					stats();
					}
					}
					setState(540);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(541);
				match(RIGHT_CURLY);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(542);
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
			setState(563);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,75,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(545);
				assignmentStatement();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(546);
				ifStatement();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(547);
				tryCatchStatement();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(548);
				forStatement();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(549);
				doWhileStatement();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(550);
				whileStatement();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(551);
				switchStatement();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(552);
				forInStatement();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(553);
				forEachStatement();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(554);
				sayStatement();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(555);
				emptyStatement();
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(556);
				returnStatement();
				}
				break;
			case 13:
				enterOuterAlt(_localctx, 13);
				{
				setState(557);
				throwStatement();
				}
				break;
			case 14:
				enterOuterAlt(_localctx, 14);
				{
				setState(558);
				labelStatement();
				}
				break;
			case 15:
				enterOuterAlt(_localctx, 15);
				{
				setState(559);
				breakStatement();
				}
				break;
			case 16:
				enterOuterAlt(_localctx, 16);
				{
				setState(560);
				continueStatement();
				}
				break;
			case 17:
				enterOuterAlt(_localctx, 17);
				{
				setState(561);
				gotoStatement();
				}
				break;
			case 18:
				enterOuterAlt(_localctx, 18);
				{
				setState(562);
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
			setState(565);
			match(LEFT_CURLY);
			setState(569);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << STEP) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				{
				setState(566);
				stats();
				}
				}
				setState(571);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(572);
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
			setState(574);
			match(GOTO);
			setState(576);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(575);
				((GotoStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(578);
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
			setState(580);
			match(BREAK);
			setState(582);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(581);
				((BreakStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(584);
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
			setState(586);
			match(CONTINUE);
			setState(588);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) {
				{
				setState(587);
				((ContinueStatementContext)_localctx).label = identifierAtom();
				}
			}

			setState(590);
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
			setState(592);
			identifierAtom();
			setState(593);
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
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode RIGHT_PAREN() { return getToken(Tads3Parser.RIGHT_PAREN, 0); }
		public TerminalNode LEFT_CURLY() { return getToken(Tads3Parser.LEFT_CURLY, 0); }
		public TerminalNode RIGHT_CURLY() { return getToken(Tads3Parser.RIGHT_CURLY, 0); }
		public List<TerminalNode> CASE() { return getTokens(Tads3Parser.CASE); }
		public TerminalNode CASE(int i) {
			return getToken(Tads3Parser.CASE, i);
		}
		public List<PrimaryContext> primary() {
			return getRuleContexts(PrimaryContext.class);
		}
		public PrimaryContext primary(int i) {
			return getRuleContext(PrimaryContext.class,i);
		}
		public List<TerminalNode> COLON() { return getTokens(Tads3Parser.COLON); }
		public TerminalNode COLON(int i) {
			return getToken(Tads3Parser.COLON, i);
		}
		public TerminalNode DEFAULT() { return getToken(Tads3Parser.DEFAULT, 0); }
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
		enterRule(_localctx, 72, RULE_switchStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(595);
			match(SWITCH);
			setState(596);
			match(LEFT_PAREN);
			setState(597);
			expr(0);
			setState(598);
			match(RIGHT_PAREN);
			setState(599);
			match(LEFT_CURLY);
			setState(614);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==CASE) {
				{
				{
				setState(600);
				match(CASE);
				setState(601);
				primary();
				setState(602);
				match(COLON);
				setState(610);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,81,_ctx) ) {
				case 1:
					{
					setState(603);
					codeBlock();
					}
					break;
				case 2:
					{
					setState(607);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << STEP) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						{
						setState(604);
						stats();
						}
						}
						setState(609);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					}
					break;
				}
				}
				}
				setState(616);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(625);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==DEFAULT) {
				{
				setState(617);
				match(DEFAULT);
				setState(618);
				match(COLON);
				setState(622);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << SWITCH) | (1L << FUNCTION) | (1L << THROW) | (1L << NEW) | (1L << FOR) | (1L << TRY) | (1L << TRANSIENT) | (1L << IF) | (1L << DO) | (1L << WHILE) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << RETURN) | (1L << STATIC) | (1L << STRING) | (1L << FOREACH) | (1L << IN) | (1L << STEP) | (1L << BREAK) | (1L << CONTINUE) | (1L << GOTO) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (SEMICOLON - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					{
					setState(619);
					codeBlock();
					}
					}
					setState(624);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
			}

			setState(627);
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
			setState(629);
			match(THROW);
			setState(630);
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
			setState(632);
			match(FOR);
			setState(633);
			match(LEFT_PAREN);
			setState(634);
			match(LOCAL);
			setState(635);
			match(ID);
			setState(636);
			match(IN);
			setState(637);
			expr(0);
			setState(638);
			match(RIGHT_PAREN);
			setState(639);
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
			setState(641);
			match(FOREACH);
			setState(642);
			match(LEFT_PAREN);
			setState(643);
			expr(0);
			setState(644);
			match(IN);
			setState(645);
			expr(0);
			setState(646);
			match(RIGHT_PAREN);
			setState(647);
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
			setState(649);
			match(RETURN);
			setState(651);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(650);
				expr(0);
				}
			}

			setState(653);
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
			setState(655);
			match(DO);
			setState(656);
			codeBlock();
			setState(657);
			match(WHILE);
			setState(658);
			match(LEFT_PAREN);
			setState(660);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(659);
				expr(0);
				}
			}

			setState(662);
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
			setState(664);
			match(WHILE);
			setState(665);
			match(LEFT_PAREN);
			setState(667);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(666);
				expr(0);
				}
			}

			setState(669);
			match(RIGHT_PAREN);
			setState(670);
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
			setState(672);
			match(FOR);
			setState(673);
			match(LEFT_PAREN);
			setState(675);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(674);
				expr(0);
				}
			}

			setState(677);
			match(SEMICOLON);
			setState(679);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(678);
				expr(0);
				}
			}

			setState(681);
			match(SEMICOLON);
			setState(683);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(682);
				expr(0);
				}
			}

			setState(685);
			match(RIGHT_PAREN);
			setState(686);
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
			setState(688);
			match(TRY);
			setState(689);
			codeBlock();
			setState(699);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,92,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(690);
					match(CATCH);
					setState(691);
					match(LEFT_PAREN);
					setState(693);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
						{
						setState(692);
						params();
						}
					}

					setState(695);
					match(RIGHT_PAREN);
					setState(696);
					codeBlock();
					}
					} 
				}
				setState(701);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,92,_ctx);
			}
			setState(704);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,93,_ctx) ) {
			case 1:
				{
				setState(702);
				match(FINALLY);
				setState(703);
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
			setState(706);
			expr(0);
			setState(709);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,94,_ctx) ) {
			case 1:
				{
				setState(707);
				match(DOT);
				setState(708);
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
			setState(712);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
				{
				setState(711);
				expr(0);
				}
			}

			setState(714);
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
			setState(716);
			match(DSTR);
			setState(717);
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
			setState(719);
			match(LOCAL);
			setState(720);
			identifierAtom();
			setState(723);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ASSIGN) {
				{
				setState(721);
				match(ASSIGN);
				setState(722);
				expr(0);
				}
			}

			setState(725);
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
			setState(727);
			match(IF);
			setState(728);
			((IfStatementContext)_localctx).ifExprAndBlock = enclosedExprCodeBlock();
			setState(734);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,97,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(729);
					match(ELSE);
					setState(730);
					match(IF);
					setState(731);
					((IfStatementContext)_localctx).elseIfExprAndBlock = enclosedExprCodeBlock();
					}
					} 
				}
				setState(736);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,97,_ctx);
			}
			setState(739);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,98,_ctx) ) {
			case 1:
				{
				setState(737);
				match(ELSE);
				setState(738);
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
			setState(741);
			match(LEFT_PAREN);
			setState(742);
			((EnclosedExprCodeBlockContext)_localctx).expression = expr(0);
			setState(743);
			match(RIGHT_PAREN);
			setState(744);
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
			setState(787);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,103,_ctx) ) {
			case 1:
				{
				_localctx = new ArrayExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(747);
				match(LEFT_BRACKET);
				setState(749);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(748);
					expr(0);
					}
				}

				setState(751);
				match(RIGHT_BRACKET);
				}
				break;
			case 2:
				{
				_localctx = new DelegatedExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(752);
				match(DELEGATED);
				setState(753);
				expr(35);
				}
				break;
			case 3:
				{
				_localctx = new InheritedExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(754);
				match(INHERITED);
				setState(755);
				expr(34);
				}
				break;
			case 4:
				{
				_localctx = new TransientExpressionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(756);
				match(TRANSIENT);
				setState(757);
				expr(33);
				}
				break;
			case 5:
				{
				_localctx = new PrimaryExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(758);
				primary();
				}
				break;
			case 6:
				{
				_localctx = new ParenExpr2Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(759);
				match(LEFT_PAREN);
				setState(761);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(760);
					expr(0);
					}
				}

				setState(763);
				match(RIGHT_PAREN);
				}
				break;
			case 7:
				{
				_localctx = new LocalExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(764);
				match(LOCAL);
				setState(765);
				expr(26);
				}
				break;
			case 8:
				{
				_localctx = new StaticExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(766);
				match(STATIC);
				setState(767);
				expr(25);
				}
				break;
			case 9:
				{
				_localctx = new NewExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(768);
				match(NEW);
				setState(769);
				expr(24);
				}
				break;
			case 10:
				{
				_localctx = new AnonymousObjectExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(770);
				match(LEFT_CURLY);
				setState(772);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(771);
					params();
					}
				}

				setState(774);
				match(COLON);
				setState(776);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
					{
					setState(775);
					expr(0);
					}
				}

				setState(778);
				match(RIGHT_CURLY);
				}
				break;
			case 11:
				{
				_localctx = new ArrowExpr2Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				{
				setState(779);
				match(ARROW);
				}
				setState(780);
				expr(6);
				}
				break;
			case 12:
				{
				_localctx = new ArrowExpr3Context(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(781);
				match(STAR);
				setState(782);
				match(ARROW);
				setState(783);
				expr(5);
				}
				break;
			case 13:
				{
				_localctx = new UnaryExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(784);
				_la = _input.LA(1);
				if ( !(((((_la - 49)) & ~0x3f) == 0 && ((1L << (_la - 49)) & ((1L << (AT - 49)) | (1L << (AMP - 49)) | (1L << (NOT - 49)) | (1L << (PLUS - 49)) | (1L << (MINUS - 49)) | (1L << (TILDE - 49)))) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(785);
				expr(4);
				}
				break;
			case 14:
				{
				_localctx = new AnonymousFunctionExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(786);
				functionDeclaration();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(918);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,117,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(916);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,116,_ctx) ) {
					case 1:
						{
						_localctx = new MemberExprContext(new ExprContext(_parentctx, _parentState));
						((MemberExprContext)_localctx).prev = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(789);
						if (!(precpred(_ctx, 39))) throw new FailedPredicateException(this, "precpred(_ctx, 39)");
						setState(790);
						match(DOT);
						setState(791);
						((MemberExprContext)_localctx).next = expr(40);
						}
						break;
					case 2:
						{
						_localctx = new CommaExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(792);
						if (!(precpred(_ctx, 37))) throw new FailedPredicateException(this, "precpred(_ctx, 37)");
						setState(793);
						match(COMMA);
						setState(794);
						expr(38);
						}
						break;
					case 3:
						{
						_localctx = new ReferenceExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(795);
						if (!(precpred(_ctx, 23))) throw new FailedPredicateException(this, "precpred(_ctx, 23)");
						setState(796);
						match(AMP);
						setState(797);
						expr(24);
						}
						break;
					case 4:
						{
						_localctx = new NotInExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(798);
						if (!(precpred(_ctx, 22))) throw new FailedPredicateException(this, "precpred(_ctx, 22)");
						setState(799);
						match(LITERAL_NOT);
						setState(800);
						match(IN);
						setState(801);
						expr(23);
						}
						break;
					case 5:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(802);
						if (!(precpred(_ctx, 21))) throw new FailedPredicateException(this, "precpred(_ctx, 21)");
						setState(803);
						match(IS);
						setState(804);
						match(IN);
						setState(805);
						expr(22);
						}
						break;
					case 6:
						{
						_localctx = new IsExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(806);
						if (!(precpred(_ctx, 20))) throw new FailedPredicateException(this, "precpred(_ctx, 20)");
						setState(807);
						match(IS);
						setState(808);
						expr(21);
						}
						break;
					case 7:
						{
						_localctx = new InExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(809);
						if (!(precpred(_ctx, 19))) throw new FailedPredicateException(this, "precpred(_ctx, 19)");
						setState(810);
						match(IN);
						setState(811);
						expr(20);
						}
						break;
					case 8:
						{
						_localctx = new AssignmentExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(812);
						if (!(precpred(_ctx, 18))) throw new FailedPredicateException(this, "precpred(_ctx, 18)");
						setState(813);
						match(ASSIGN);
						setState(814);
						expr(19);
						}
						break;
					case 9:
						{
						_localctx = new IfNilExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(815);
						if (!(precpred(_ctx, 17))) throw new FailedPredicateException(this, "precpred(_ctx, 17)");
						setState(816);
						match(IFNIL);
						setState(817);
						expr(18);
						}
						break;
					case 10:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(818);
						if (!(precpred(_ctx, 15))) throw new FailedPredicateException(this, "precpred(_ctx, 15)");
						setState(819);
						_la = _input.LA(1);
						if ( !(_la==AMP || _la==BITWISE_OR) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(821);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(820);
							match(ASSIGN);
							}
						}

						setState(823);
						expr(16);
						}
						break;
					case 11:
						{
						_localctx = new AndOrExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(824);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						setState(825);
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
						setState(826);
						expr(15);
						}
						break;
					case 12:
						{
						_localctx = new PowerOfExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(827);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						{
						setState(828);
						match(POW);
						}
						setState(830);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(829);
							((PowerOfExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(832);
						expr(14);
						}
						break;
					case 13:
						{
						_localctx = new MultiplicationExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(833);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(834);
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
						setState(836);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(835);
							((MultiplicationExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(838);
						expr(13);
						}
						break;
					case 14:
						{
						_localctx = new AdditiveExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(839);
						if (!(precpred(_ctx, 11))) throw new FailedPredicateException(this, "precpred(_ctx, 11)");
						setState(840);
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
						setState(842);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(841);
							((AdditiveExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(844);
						expr(12);
						}
						break;
					case 15:
						{
						_localctx = new RelationalExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(845);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(846);
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
						setState(847);
						expr(11);
						}
						break;
					case 16:
						{
						_localctx = new EqualityExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(848);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(849);
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
						setState(850);
						expr(10);
						}
						break;
					case 17:
						{
						_localctx = new BitwiseExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(851);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(852);
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
						setState(854);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==ASSIGN) {
							{
							setState(853);
							((BitwiseExprContext)_localctx).isInc = match(ASSIGN);
							}
						}

						setState(856);
						expr(9);
						}
						break;
					case 18:
						{
						_localctx = new ArrowExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(857);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						{
						setState(858);
						match(ARROW);
						}
						setState(859);
						expr(8);
						}
						break;
					case 19:
						{
						_localctx = new TernaryExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(860);
						if (!(precpred(_ctx, 2))) throw new FailedPredicateException(this, "precpred(_ctx, 2)");
						setState(861);
						match(OPTIONAL);
						setState(862);
						expr(0);
						setState(863);
						match(COLON);
						setState(864);
						expr(3);
						}
						break;
					case 20:
						{
						_localctx = new IndexExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(866);
						if (!(precpred(_ctx, 38))) throw new FailedPredicateException(this, "precpred(_ctx, 38)");
						setState(867);
						match(LEFT_BRACKET);
						setState(869);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(868);
							expr(0);
							}
						}

						setState(871);
						match(RIGHT_BRACKET);
						}
						break;
					case 21:
						{
						_localctx = new RangeExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(872);
						if (!(precpred(_ctx, 36))) throw new FailedPredicateException(this, "precpred(_ctx, 36)");
						setState(873);
						match(RANGE);
						setState(874);
						expr(0);
						setState(877);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,110,_ctx) ) {
						case 1:
							{
							setState(875);
							((RangeExprContext)_localctx).hasStep = match(STEP);
							setState(876);
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
						setState(879);
						if (!(precpred(_ctx, 31))) throw new FailedPredicateException(this, "precpred(_ctx, 31)");
						setState(880);
						match(LEFT_PAREN);
						setState(882); 
						_errHandler.sync(this);
						_la = _input.LA(1);
						do {
							{
							{
							setState(881);
							params();
							}
							}
							setState(884); 
							_errHandler.sync(this);
							_la = _input.LA(1);
						} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0) );
						setState(886);
						match(RIGHT_PAREN);
						}
						break;
					case 23:
						{
						_localctx = new ExprWithParenExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(888);
						if (!(precpred(_ctx, 30))) throw new FailedPredicateException(this, "precpred(_ctx, 30)");
						setState(889);
						match(LEFT_PAREN);
						setState(891);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(890);
							expr(0);
							}
						}

						setState(893);
						match(RIGHT_PAREN);
						}
						break;
					case 24:
						{
						_localctx = new ExprWithAnonymousObjectExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(894);
						if (!(precpred(_ctx, 29))) throw new FailedPredicateException(this, "precpred(_ctx, 29)");
						setState(895);
						match(LEFT_CURLY);
						setState(897);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << SPREAD) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(896);
							params();
							}
						}

						setState(899);
						match(COLON);
						setState(901);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << FUNCTION) | (1L << NEW) | (1L << TRANSIENT) | (1L << LOCAL) | (1L << TRUE) | (1L << NIL) | (1L << INHERITED) | (1L << DELEGATED) | (1L << EXTERN) | (1L << STATIC) | (1L << STRING) | (1L << IN) | (1L << STEP) | (1L << OPERATOR) | (1L << AT) | (1L << AMP) | (1L << NOT) | (1L << PLUS) | (1L << MINUS) | (1L << ARROW))) != 0) || ((((_la - 64)) & ~0x3f) == 0 && ((1L << (_la - 64)) & ((1L << (TILDE - 64)) | (1L << (ID - 64)) | (1L << (NR - 64)) | (1L << (HEX - 64)) | (1L << (STAR - 64)) | (1L << (LEFT_PAREN - 64)) | (1L << (LEFT_BRACKET - 64)) | (1L << (DSTR - 64)) | (1L << (SSTR - 64)) | (1L << (RSTR - 64)) | (1L << (LEFT_CURLY - 64)))) != 0)) {
							{
							setState(900);
							expr(0);
							}
						}

						setState(903);
						match(RIGHT_CURLY);
						}
						break;
					case 25:
						{
						_localctx = new ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(904);
						if (!(precpred(_ctx, 28))) throw new FailedPredicateException(this, "precpred(_ctx, 28)");
						setState(905);
						match(COLON);
						setState(906);
						superTypes();
						setState(907);
						curlyObjectBody();
						}
						break;
					case 26:
						{
						_localctx = new PostFixExprContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(909);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(914);
						_errHandler.sync(this);
						switch (_input.LA(1)) {
						case PLUS:
							{
							setState(910);
							match(PLUS);
							setState(911);
							match(PLUS);
							}
							break;
						case MINUS:
							{
							setState(912);
							match(MINUS);
							setState(913);
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
				setState(920);
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
			setState(932);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case INHERITED:
				_localctx = new InheritedAtomContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(921);
				match(INHERITED);
				}
				break;
			case HEX:
				_localctx = new HexAtomContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(922);
				match(HEX);
				}
				break;
			case NR:
				_localctx = new NumberAtomContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(923);
				match(NR);
				}
				break;
			case AMP:
				_localctx = new ReferenceAtomContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(924);
				match(AMP);
				setState(925);
				identifierAtom();
				}
				break;
			case STRING:
			case IN:
			case STEP:
			case OPERATOR:
			case ID:
				_localctx = new IdAtomContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(926);
				identifierAtom();
				}
				break;
			case SSTR:
				_localctx = new DoubleQuotestringAtomContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(927);
				match(SSTR);
				}
				break;
			case DSTR:
				_localctx = new SingleQuotestringAtomContext(_localctx);
				enterOuterAlt(_localctx, 7);
				{
				setState(928);
				match(DSTR);
				}
				break;
			case RSTR:
				_localctx = new RegexpStringAtomContext(_localctx);
				enterOuterAlt(_localctx, 8);
				{
				setState(929);
				match(RSTR);
				}
				break;
			case TRUE:
				_localctx = new BooleanAtomContext(_localctx);
				enterOuterAlt(_localctx, 9);
				{
				setState(930);
				match(TRUE);
				}
				break;
			case NIL:
				_localctx = new NilAtomContext(_localctx);
				enterOuterAlt(_localctx, 10);
				{
				setState(931);
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
			setState(934);
			_la = _input.LA(1);
			if ( !(((((_la - 35)) & ~0x3f) == 0 && ((1L << (_la - 35)) & ((1L << (STRING - 35)) | (1L << (IN - 35)) | (1L << (STEP - 35)) | (1L << (OPERATOR - 35)) | (1L << (ID - 35)))) != 0)) ) {
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
			setState(939);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,119,_ctx) ) {
			case 1:
				{
				setState(936);
				optionallyTypedOptionalId();
				}
				break;
			case 2:
				{
				setState(937);
				match(SPREAD);
				}
				break;
			case 3:
				{
				setState(938);
				array();
				}
				break;
			}
			setState(947);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,121,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(941);
					match(COMMA);
					setState(943);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,120,_ctx) ) {
					case 1:
						{
						setState(942);
						params();
						}
						break;
					}
					}
					} 
				}
				setState(949);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,121,_ctx);
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
			setState(973);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,127,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				{
				setState(953);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,122,_ctx) ) {
				case 1:
					{
					setState(950);
					((OptionallyTypedOptionalIdContext)_localctx).identifier = identifierAtom();
					setState(951);
					match(COLON);
					}
					break;
				}
				setState(956);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,123,_ctx) ) {
				case 1:
					{
					setState(955);
					((OptionallyTypedOptionalIdContext)_localctx).type = identifierAtom();
					}
					break;
				}
				{
				setState(958);
				((OptionallyTypedOptionalIdContext)_localctx).name = identifierAtom();
				}
				setState(960);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==OPTIONAL) {
					{
					setState(959);
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
				setState(962);
				((OptionallyTypedOptionalIdContext)_localctx).identifier = identifierAtom();
				setState(963);
				((OptionallyTypedOptionalIdContext)_localctx).emptyColon = match(COLON);
				setState(965);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==OPTIONAL) {
					{
					setState(964);
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
				setState(967);
				((OptionallyTypedOptionalIdContext)_localctx).identifier = identifierAtom();
				setState(968);
				((OptionallyTypedOptionalIdContext)_localctx).emptyColon = match(COLON);
				setState(969);
				((OptionallyTypedOptionalIdContext)_localctx).hasDefault = match(ASSIGN);
				setState(971);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,126,_ctx) ) {
				case 1:
					{
					setState(970);
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3b\u03d2\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t+\4"+
		",\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64\t"+
		"\64\4\65\t\65\4\66\t\66\4\67\t\67\48\t8\49\t9\3\2\7\2t\n\2\f\2\16\2w\13"+
		"\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3\u0086\n\3\3"+
		"\4\3\4\3\4\3\4\3\4\3\4\3\4\3\5\3\5\5\5\u0091\n\5\3\5\3\5\3\5\3\5\3\5\3"+
		"\5\5\5\u0099\n\5\3\5\3\5\3\5\3\5\3\5\3\5\5\5\u00a1\n\5\3\6\3\6\3\6\7\6"+
		"\u00a6\n\6\f\6\16\6\u00a9\13\6\3\7\5\7\u00ac\n\7\3\7\7\7\u00af\n\7\f\7"+
		"\16\7\u00b2\13\7\3\b\3\b\3\b\3\b\3\b\3\t\3\t\3\t\6\t\u00bc\n\t\r\t\16"+
		"\t\u00bd\3\t\3\t\3\t\3\t\3\t\3\t\5\t\u00c6\n\t\3\t\3\t\7\t\u00ca\n\t\f"+
		"\t\16\t\u00cd\13\t\3\n\3\n\3\n\3\n\5\n\u00d3\n\n\6\n\u00d5\n\n\r\n\16"+
		"\n\u00d6\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\7\n\u00e2\n\n\f\n\16\n\u00e5"+
		"\13\n\3\n\3\n\3\n\3\n\5\n\u00eb\n\n\3\13\3\13\5\13\u00ef\n\13\3\13\3\13"+
		"\3\13\7\13\u00f4\n\13\f\13\16\13\u00f7\13\13\3\13\3\13\3\f\7\f\u00fc\n"+
		"\f\f\f\16\f\u00ff\13\f\3\f\3\f\3\f\3\f\7\f\u0105\n\f\f\f\16\f\u0108\13"+
		"\f\3\f\3\f\3\r\7\r\u010d\n\r\f\r\16\r\u0110\13\r\3\r\3\r\5\r\u0114\n\r"+
		"\3\r\3\r\3\r\7\r\u0119\n\r\f\r\16\r\u011c\13\r\3\r\3\r\3\16\3\16\3\16"+
		"\5\16\u0123\n\16\3\16\3\16\3\17\3\17\5\17\u0129\n\17\3\17\5\17\u012c\n"+
		"\17\3\17\5\17\u012f\n\17\3\17\3\17\5\17\u0133\n\17\3\17\3\17\7\17\u0137"+
		"\n\17\f\17\16\17\u013a\13\17\3\17\3\17\3\20\5\20\u013f\n\20\3\20\3\20"+
		"\3\20\5\20\u0144\n\20\3\20\3\20\3\20\3\20\3\21\5\21\u014b\n\21\3\21\5"+
		"\21\u014e\n\21\3\21\5\21\u0151\n\21\5\21\u0153\n\21\3\21\7\21\u0156\n"+
		"\21\f\21\16\21\u0159\13\21\3\21\3\21\5\21\u015d\n\21\3\21\3\21\3\21\3"+
		"\21\5\21\u0163\n\21\3\21\3\21\5\21\u0167\n\21\3\22\3\22\5\22\u016b\n\22"+
		"\3\22\3\22\3\22\3\22\5\22\u0171\n\22\3\22\3\22\3\22\3\22\3\22\5\22\u0178"+
		"\n\22\3\22\3\22\3\22\3\22\5\22\u017e\n\22\3\22\5\22\u0181\n\22\3\23\3"+
		"\23\3\23\7\23\u0186\n\23\f\23\16\23\u0189\13\23\3\24\3\24\3\24\3\24\3"+
		"\25\3\25\3\25\3\26\3\26\3\26\7\26\u0195\n\26\f\26\16\26\u0198\13\26\3"+
		"\27\7\27\u019b\n\27\f\27\16\27\u019e\13\27\3\27\3\27\3\27\7\27\u01a3\n"+
		"\27\f\27\16\27\u01a6\13\27\3\30\3\30\3\30\5\30\u01ab\n\30\3\30\3\30\5"+
		"\30\u01af\n\30\3\30\5\30\u01b2\n\30\3\30\3\30\5\30\u01b6\n\30\3\30\3\30"+
		"\7\30\u01ba\n\30\f\30\16\30\u01bd\13\30\3\30\3\30\5\30\u01c1\n\30\5\30"+
		"\u01c3\n\30\3\31\7\31\u01c6\n\31\f\31\16\31\u01c9\13\31\3\32\3\32\3\32"+
		"\3\32\3\32\5\32\u01d0\n\32\3\32\5\32\u01d3\n\32\3\32\3\32\3\33\3\33\5"+
		"\33\u01d9\n\33\3\33\3\33\7\33\u01dd\n\33\f\33\16\33\u01e0\13\33\3\34\3"+
		"\34\3\34\3\34\5\34\u01e6\n\34\3\35\3\35\3\35\3\35\3\35\5\35\u01ed\n\35"+
		"\5\35\u01ef\n\35\3\35\3\35\3\35\3\35\3\35\3\35\7\35\u01f7\n\35\f\35\16"+
		"\35\u01fa\13\35\3\35\3\35\3\36\5\36\u01ff\n\36\3\36\5\36\u0202\n\36\3"+
		"\36\5\36\u0205\n\36\3\36\3\36\3\36\5\36\u020a\n\36\3\36\5\36\u020d\n\36"+
		"\3\36\3\36\3\36\5\36\u0212\n\36\3\36\5\36\u0215\n\36\5\36\u0217\n\36\3"+
		"\37\3\37\7\37\u021b\n\37\f\37\16\37\u021e\13\37\3\37\3\37\5\37\u0222\n"+
		"\37\3 \3 \3 \3 \3 \3 \3 \3 \3 \3 \3 \3 \3 \3 \3 \3 \3 \3 \5 \u0236\n "+
		"\3!\3!\7!\u023a\n!\f!\16!\u023d\13!\3!\3!\3\"\3\"\5\"\u0243\n\"\3\"\3"+
		"\"\3#\3#\5#\u0249\n#\3#\3#\3$\3$\5$\u024f\n$\3$\3$\3%\3%\3%\3&\3&\3&\3"+
		"&\3&\3&\3&\3&\3&\3&\7&\u0260\n&\f&\16&\u0263\13&\5&\u0265\n&\7&\u0267"+
		"\n&\f&\16&\u026a\13&\3&\3&\3&\7&\u026f\n&\f&\16&\u0272\13&\5&\u0274\n"+
		"&\3&\3&\3\'\3\'\3\'\3(\3(\3(\3(\3(\3(\3(\3(\3(\3)\3)\3)\3)\3)\3)\3)\3"+
		")\3*\3*\5*\u028e\n*\3*\3*\3+\3+\3+\3+\3+\5+\u0297\n+\3+\3+\3,\3,\3,\5"+
		",\u029e\n,\3,\3,\3,\3-\3-\3-\5-\u02a6\n-\3-\3-\5-\u02aa\n-\3-\3-\5-\u02ae"+
		"\n-\3-\3-\3-\3.\3.\3.\3.\3.\5.\u02b8\n.\3.\3.\7.\u02bc\n.\f.\16.\u02bf"+
		"\13.\3.\3.\5.\u02c3\n.\3/\3/\3/\5/\u02c8\n/\3\60\5\60\u02cb\n\60\3\60"+
		"\3\60\3\61\3\61\3\61\3\62\3\62\3\62\3\62\5\62\u02d6\n\62\3\62\3\62\3\63"+
		"\3\63\3\63\3\63\3\63\7\63\u02df\n\63\f\63\16\63\u02e2\13\63\3\63\3\63"+
		"\5\63\u02e6\n\63\3\64\3\64\3\64\3\64\3\64\3\65\3\65\3\65\5\65\u02f0\n"+
		"\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\5\65\u02fc\n\65"+
		"\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\5\65\u0307\n\65\3\65\3\65"+
		"\5\65\u030b\n\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\5\65\u0316"+
		"\n\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\3\65\3\65\3\65\3\65\3\65\5\65\u0338\n\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\3\65\5\65\u0341\n\65\3\65\3\65\3\65\3\65\5\65\u0347\n\65\3\65\3\65\3"+
		"\65\3\65\5\65\u034d\n\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\3\65\5\65\u0359\n\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\3\65\3\65\3\65\5\65\u0368\n\65\3\65\3\65\3\65\3\65\3\65\3\65\5\65\u0370"+
		"\n\65\3\65\3\65\3\65\6\65\u0375\n\65\r\65\16\65\u0376\3\65\3\65\3\65\3"+
		"\65\3\65\5\65\u037e\n\65\3\65\3\65\3\65\3\65\5\65\u0384\n\65\3\65\3\65"+
		"\5\65\u0388\n\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65\3\65"+
		"\5\65\u0395\n\65\7\65\u0397\n\65\f\65\16\65\u039a\13\65\3\66\3\66\3\66"+
		"\3\66\3\66\3\66\3\66\3\66\3\66\3\66\3\66\5\66\u03a7\n\66\3\67\3\67\38"+
		"\38\38\58\u03ae\n8\38\38\58\u03b2\n8\78\u03b4\n8\f8\168\u03b7\138\39\3"+
		"9\39\59\u03bc\n9\39\59\u03bf\n9\39\39\59\u03c3\n9\39\39\39\59\u03c8\n"+
		"9\39\39\39\39\59\u03ce\n9\59\u03d0\n9\39\2\4\20h:\2\4\6\b\n\f\16\20\22"+
		"\24\26\30\32\34\36 \"$&(*,.\60\62\64\668:<>@BDFHJLNPRTVXZ\\^`bdfhjlnp"+
		"\2\r\3\2ST\b\2\64\649<BCLMYY]^\7\2\63\64\66\6699<<BB\4\2\64\64MM\3\2?"+
		"@\4\2:;LL\4\299<<\4\2XXZ\\\3\2=>\4\2YY]^\7\2%%\'\'**\62\62DD\2\u046b\2"+
		"u\3\2\2\2\4\u0085\3\2\2\2\6\u0087\3\2\2\2\b\u0090\3\2\2\2\n\u00a2\3\2"+
		"\2\2\f\u00ab\3\2\2\2\16\u00b3\3\2\2\2\20\u00c5\3\2\2\2\22\u00ea\3\2\2"+
		"\2\24\u00ec\3\2\2\2\26\u00fd\3\2\2\2\30\u010e\3\2\2\2\32\u011f\3\2\2\2"+
		"\34\u0126\3\2\2\2\36\u013e\3\2\2\2 \u0152\3\2\2\2\"\u017d\3\2\2\2$\u0182"+
		"\3\2\2\2&\u018a\3\2\2\2(\u018e\3\2\2\2*\u0191\3\2\2\2,\u019c\3\2\2\2."+
		"\u01a7\3\2\2\2\60\u01c7\3\2\2\2\62\u01d2\3\2\2\2\64\u01d8\3\2\2\2\66\u01e5"+
		"\3\2\2\28\u01e7\3\2\2\2:\u0216\3\2\2\2<\u0221\3\2\2\2>\u0235\3\2\2\2@"+
		"\u0237\3\2\2\2B\u0240\3\2\2\2D\u0246\3\2\2\2F\u024c\3\2\2\2H\u0252\3\2"+
		"\2\2J\u0255\3\2\2\2L\u0277\3\2\2\2N\u027a\3\2\2\2P\u0283\3\2\2\2R\u028b"+
		"\3\2\2\2T\u0291\3\2\2\2V\u029a\3\2\2\2X\u02a2\3\2\2\2Z\u02b2\3\2\2\2\\"+
		"\u02c4\3\2\2\2^\u02ca\3\2\2\2`\u02ce\3\2\2\2b\u02d1\3\2\2\2d\u02d9\3\2"+
		"\2\2f\u02e7\3\2\2\2h\u0315\3\2\2\2j\u03a6\3\2\2\2l\u03a8\3\2\2\2n\u03ad"+
		"\3\2\2\2p\u03cf\3\2\2\2rt\5\4\3\2sr\3\2\2\2tw\3\2\2\2us\3\2\2\2uv\3\2"+
		"\2\2vx\3\2\2\2wu\3\2\2\2xy\7\2\2\3y\3\3\2\2\2z\u0086\5\24\13\2{\u0086"+
		"\5\22\n\2|\u0086\5\34\17\2}\u0086\5\32\16\2~\u0086\5 \21\2\177\u0086\5"+
		"\26\f\2\u0080\u0086\5\30\r\2\u0081\u0086\5\66\34\2\u0082\u0086\5\b\5\2"+
		"\u0083\u0086\5\6\4\2\u0084\u0086\7N\2\2\u0085z\3\2\2\2\u0085{\3\2\2\2"+
		"\u0085|\3\2\2\2\u0085}\3\2\2\2\u0085~\3\2\2\2\u0085\177\3\2\2\2\u0085"+
		"\u0080\3\2\2\2\u0085\u0081\3\2\2\2\u0085\u0082\3\2\2\2\u0085\u0083\3\2"+
		"\2\2\u0085\u0084\3\2\2\2\u0086\5\3\2\2\2\u0087\u0088\7\65\2\2\u0088\u0089"+
		"\7\61\2\2\u0089\u008a\7D\2\2\u008a\u008b\7O\2\2\u008b\u008c\5h\65\2\u008c"+
		"\u008d\7P\2\2\u008d\7\3\2\2\2\u008e\u0091\7\22\2\2\u008f\u0091\7\23\2"+
		"\2\u0090\u008e\3\2\2\2\u0090\u008f\3\2\2\2\u0090\u0091\3\2\2\2\u0091\u0092"+
		"\3\2\2\2\u0092\u0093\7\3\2\2\u0093\u0098\5l\67\2\u0094\u0095\7O\2\2\u0095"+
		"\u0096\5l\67\2\u0096\u0097\7P\2\2\u0097\u0099\3\2\2\2\u0098\u0094\3\2"+
		"\2\2\u0098\u0099\3\2\2\2\u0099\u009a\3\2\2\2\u009a\u009b\7I\2\2\u009b"+
		"\u009c\5\n\6\2\u009c\u009d\7I\2\2\u009d\u00a0\5*\26\2\u009e\u00a1\5&\24"+
		"\2\u009f\u00a1\5(\25\2\u00a0\u009e\3\2\2\2\u00a0\u009f\3\2\2\2\u00a1\t"+
		"\3\2\2\2\u00a2\u00a7\5\f\7\2\u00a3\u00a4\7M\2\2\u00a4\u00a6\5\f\7\2\u00a5"+
		"\u00a3\3\2\2\2\u00a6\u00a9\3\2\2\2\u00a7\u00a5\3\2\2\2\u00a7\u00a8\3\2"+
		"\2\2\u00a8\13\3\2\2\2\u00a9\u00a7\3\2\2\2\u00aa\u00ac\5\16\b\2\u00ab\u00aa"+
		"\3\2\2\2\u00ab\u00ac\3\2\2\2\u00ac\u00b0\3\2\2\2\u00ad\u00af\5\20\t\2"+
		"\u00ae\u00ad\3\2\2\2\u00af\u00b2\3\2\2\2\u00b0\u00ae\3\2\2\2\u00b0\u00b1"+
		"\3\2\2\2\u00b1\r\3\2\2\2\u00b2\u00b0\3\2\2\2\u00b3\u00b4\7Q\2\2\u00b4"+
		"\u00b5\5l\67\2\u00b5\u00b6\7F\2\2\u00b6\u00b7\7R\2\2\u00b7\17\3\2\2\2"+
		"\u00b8\u00b9\b\t\1\2\u00b9\u00bb\7O\2\2\u00ba\u00bc\5\20\t\2\u00bb\u00ba"+
		"\3\2\2\2\u00bc\u00bd\3\2\2\2\u00bd\u00bb\3\2\2\2\u00bd\u00be\3\2\2\2\u00be"+
		"\u00bf\3\2\2\2\u00bf\u00c0\7P\2\2\u00c0\u00c6\3\2\2\2\u00c1\u00c2\7M\2"+
		"\2\u00c2\u00c6\5\20\t\5\u00c3\u00c6\5h\65\2\u00c4\u00c6\7L\2\2\u00c5\u00b8"+
		"\3\2\2\2\u00c5\u00c1\3\2\2\2\u00c5\u00c3\3\2\2\2\u00c5\u00c4\3\2\2\2\u00c6"+
		"\u00cb\3\2\2\2\u00c7\u00c8\f\6\2\2\u00c8\u00ca\7M\2\2\u00c9\u00c7\3\2"+
		"\2\2\u00ca\u00cd\3\2\2\2\u00cb\u00c9\3\2\2\2\u00cb\u00cc\3\2\2\2\u00cc"+
		"\21\3\2\2\2\u00cd\u00cb\3\2\2\2\u00ce\u00cf\5l\67\2\u00cf\u00d4\7\n\2"+
		"\2\u00d0\u00d2\5h\65\2\u00d1\u00d3\7\67\2\2\u00d2\u00d1\3\2\2\2\u00d2"+
		"\u00d3\3\2\2\2\u00d3\u00d5\3\2\2\2\u00d4\u00d0\3\2\2\2\u00d5\u00d6\3\2"+
		"\2\2\u00d6\u00d4\3\2\2\2\u00d6\u00d7\3\2\2\2\u00d7\u00d8\3\2\2\2\u00d8"+
		"\u00d9\7N\2\2\u00d9\u00eb\3\2\2\2\u00da\u00db\7%\2\2\u00db\u00dc\7\n\2"+
		"\2\u00dc\u00e3\7Y\2\2\u00dd\u00e2\5l\67\2\u00de\u00e2\7L\2\2\u00df\u00e2"+
		"\7,\2\2\u00e0\u00e2\7\'\2\2\u00e1\u00dd\3\2\2\2\u00e1\u00de\3\2\2\2\u00e1"+
		"\u00df\3\2\2\2\u00e1\u00e0\3\2\2\2\u00e2\u00e5\3\2\2\2\u00e3\u00e1\3\2"+
		"\2\2\u00e3\u00e4\3\2\2\2\u00e4\u00e6\3\2\2\2\u00e5\u00e3\3\2\2\2\u00e6"+
		"\u00e7\7]\2\2\u00e7\u00e8\5l\67\2\u00e8\u00e9\7N\2\2\u00e9\u00eb\3\2\2"+
		"\2\u00ea\u00ce\3\2\2\2\u00ea\u00da\3\2\2\2\u00eb\23\3\2\2\2\u00ec\u00ee"+
		"\7\17\2\2\u00ed\u00ef\7\60\2\2\u00ee\u00ed\3\2\2\2\u00ee\u00ef\3\2\2\2"+
		"\u00ef\u00f0\3\2\2\2\u00f0\u00f5\5l\67\2\u00f1\u00f2\7J\2\2\u00f2\u00f4"+
		"\5l\67\2\u00f3\u00f1\3\2\2\2\u00f4\u00f7\3\2\2\2\u00f5\u00f3\3\2\2\2\u00f5"+
		"\u00f6\3\2\2\2\u00f6\u00f8\3\2\2\2\u00f7\u00f5\3\2\2\2\u00f8\u00f9\7N"+
		"\2\2\u00f9\25\3\2\2\2\u00fa\u00fc\79\2\2\u00fb\u00fa\3\2\2\2\u00fc\u00ff"+
		"\3\2\2\2\u00fd\u00fb\3\2\2\2\u00fd\u00fe\3\2\2\2\u00fe\u0100\3\2\2\2\u00ff"+
		"\u00fd\3\2\2\2\u0100\u0101\7\37\2\2\u0101\u0106\5l\67\2\u0102\u0103\7"+
		"J\2\2\u0103\u0105\5l\67\2\u0104\u0102\3\2\2\2\u0105\u0108\3\2\2\2\u0106"+
		"\u0104\3\2\2\2\u0106\u0107\3\2\2\2\u0107\u0109\3\2\2\2\u0108\u0106\3\2"+
		"\2\2\u0109\u010a\7N\2\2\u010a\27\3\2\2\2\u010b\u010d\79\2\2\u010c\u010b"+
		"\3\2\2\2\u010d\u0110\3\2\2\2\u010e\u010c\3\2\2\2\u010e\u010f\3\2\2\2\u010f"+
		"\u0111\3\2\2\2\u0110\u010e\3\2\2\2\u0111\u0113\7 \2\2\u0112\u0114\7\37"+
		"\2\2\u0113\u0112\3\2\2\2\u0113\u0114\3\2\2\2\u0114\u0115\3\2\2\2\u0115"+
		"\u011a\5l\67\2\u0116\u0117\7J\2\2\u0117\u0119\5l\67\2\u0118\u0116\3\2"+
		"\2\2\u0119\u011c\3\2\2\2\u011a\u0118\3\2\2\2\u011a\u011b\3\2\2\2\u011b"+
		"\u011d\3\2\2\2\u011c\u011a\3\2\2\2\u011d\u011e\7N\2\2\u011e\31\3\2\2\2"+
		"\u011f\u0120\7!\2\2\u0120\u0122\5l\67\2\u0121\u0123\7T\2\2\u0122\u0121"+
		"\3\2\2\2\u0122\u0123\3\2\2\2\u0123\u0124\3\2\2\2\u0124\u0125\7N\2\2\u0125"+
		"\33\3\2\2\2\u0126\u0128\7\34\2\2\u0127\u0129\7\20\2\2\u0128\u0127\3\2"+
		"\2\2\u0128\u0129\3\2\2\2\u0129\u012b\3\2\2\2\u012a\u012c\5l\67\2\u012b"+
		"\u012a\3\2\2\2\u012b\u012c\3\2\2\2\u012c\u012e\3\2\2\2\u012d\u012f\t\2"+
		"\2\2\u012e\u012d\3\2\2\2\u012e\u012f\3\2\2\2\u012f\u0132\3\2\2\2\u0130"+
		"\u0131\7I\2\2\u0131\u0133\5*\26\2\u0132\u0130\3\2\2\2\u0132\u0133\3\2"+
		"\2\2\u0133\u0134\3\2\2\2\u0134\u0138\7V\2\2\u0135\u0137\5\36\20\2\u0136"+
		"\u0135\3\2\2\2\u0137\u013a\3\2\2\2\u0138\u0136\3\2\2\2\u0138\u0139\3\2"+
		"\2\2\u0139\u013b\3\2\2\2\u013a\u0138\3\2\2\2\u013b\u013c\7W\2\2\u013c"+
		"\35\3\2\2\2\u013d\u013f\7$\2\2\u013e\u013d\3\2\2\2\u013e\u013f\3\2\2\2"+
		"\u013f\u0140\3\2\2\2\u0140\u0141\5l\67\2\u0141\u0143\7O\2\2\u0142\u0144"+
		"\5n8\2\u0143\u0142\3\2\2\2\u0143\u0144\3\2\2\2\u0144\u0145\3\2\2\2\u0145"+
		"\u0146\7P\2\2\u0146\u0147\3\2\2\2\u0147\u0148\7N\2\2\u0148\37\3\2\2\2"+
		"\u0149\u014b\7\22\2\2\u014a\u0149\3\2\2\2\u014a\u014b\3\2\2\2\u014b\u0153"+
		"\3\2\2\2\u014c\u014e\7\23\2\2\u014d\u014c\3\2\2\2\u014d\u014e\3\2\2\2"+
		"\u014e\u0153\3\2\2\2\u014f\u0151\7\20\2\2\u0150\u014f\3\2\2\2\u0150\u0151"+
		"\3\2\2\2\u0151\u0153\3\2\2\2\u0152\u014a\3\2\2\2\u0152\u014d\3\2\2\2\u0152"+
		"\u0150\3\2\2\2\u0153\u0157\3\2\2\2\u0154\u0156\79\2\2\u0155\u0154\3\2"+
		"\2\2\u0156\u0159\3\2\2\2\u0157\u0155\3\2\2\2\u0157\u0158\3\2\2\2\u0158"+
		"\u0162\3\2\2\2\u0159\u0157\3\2\2\2\u015a\u0163\5*\26\2\u015b\u015d\7\21"+
		"\2\2\u015c\u015b\3\2\2\2\u015c\u015d\3\2\2\2\u015d\u015e\3\2\2\2\u015e"+
		"\u015f\5l\67\2\u015f\u0160\7I\2\2\u0160\u0161\5*\26\2\u0161\u0163\3\2"+
		"\2\2\u0162\u015a\3\2\2\2\u0162\u015c\3\2\2\2\u0163\u0166\3\2\2\2\u0164"+
		"\u0167\5&\24\2\u0165\u0167\5(\25\2\u0166\u0164\3\2\2\2\u0166\u0165\3\2"+
		"\2\2\u0167!\3\2\2\2\u0168\u016a\7T\2\2\u0169\u016b\7N\2\2\u016a\u0169"+
		"\3\2\2\2\u016a\u016b\3\2\2\2\u016b\u017e\3\2\2\2\u016c\u016d\7\63\2\2"+
		"\u016d\u017e\5l\67\2\u016e\u0170\7S\2\2\u016f\u0171\7N\2\2\u0170\u016f"+
		"\3\2\2\2\u0170\u0171\3\2\2\2\u0171\u017e\3\2\2\2\u0172\u0173\79\2\2\u0173"+
		"\u017e\7F\2\2\u0174\u0177\7A\2\2\u0175\u0178\5l\67\2\u0176\u0178\5h\65"+
		"\2\u0177\u0175\3\2\2\2\u0177\u0176\3\2\2\2\u0178\u017e\3\2\2\2\u0179\u017a"+
		"\7Q\2\2\u017a\u017b\5$\23\2\u017b\u017c\7R\2\2\u017c\u017e\3\2\2\2\u017d"+
		"\u0168\3\2\2\2\u017d\u016c\3\2\2\2\u017d\u016e\3\2\2\2\u017d\u0172\3\2"+
		"\2\2\u017d\u0174\3\2\2\2\u017d\u0179\3\2\2\2\u017e\u0180\3\2\2\2\u017f"+
		"\u0181\7\67\2\2\u0180\u017f\3\2\2\2\u0180\u0181\3\2\2\2\u0181#\3\2\2\2"+
		"\u0182\u0187\5h\65\2\u0183\u0184\7J\2\2\u0184\u0186\5$\23\2\u0185\u0183"+
		"\3\2\2\2\u0186\u0189\3\2\2\2\u0187\u0185\3\2\2\2\u0187\u0188\3\2\2\2\u0188"+
		"%\3\2\2\2\u0189\u0187\3\2\2\2\u018a\u018b\7V\2\2\u018b\u018c\5,\27\2\u018c"+
		"\u018d\7W\2\2\u018d\'\3\2\2\2\u018e\u018f\5,\27\2\u018f\u0190\7N\2\2\u0190"+
		")\3\2\2\2\u0191\u0196\5l\67\2\u0192\u0193\7J\2\2\u0193\u0195\5*\26\2\u0194"+
		"\u0192\3\2\2\2\u0195\u0198\3\2\2\2\u0196\u0194\3\2\2\2\u0196\u0197\3\2"+
		"\2\2\u0197+\3\2\2\2\u0198\u0196\3\2\2\2\u0199\u019b\5\"\22\2\u019a\u0199"+
		"\3\2\2\2\u019b\u019e\3\2\2\2\u019c\u019a\3\2\2\2\u019c\u019d\3\2\2\2\u019d"+
		"\u01a4\3\2\2\2\u019e\u019c\3\2\2\2\u019f\u01a3\5\66\34\2\u01a0\u01a3\5"+
		".\30\2\u01a1\u01a3\5\62\32\2\u01a2\u019f\3\2\2\2\u01a2\u01a0\3\2\2\2\u01a2"+
		"\u01a1\3\2\2\2\u01a3\u01a6\3\2\2\2\u01a4\u01a2\3\2\2\2\u01a4\u01a5\3\2"+
		"\2\2\u01a5-\3\2\2\2\u01a6\u01a4\3\2\2\2\u01a7\u01c2\5l\67\2\u01a8\u01aa"+
		"\7E\2\2\u01a9\u01ab\7$\2\2\u01aa\u01a9\3\2\2\2\u01aa\u01ab\3\2\2\2\u01ab"+
		"\u01ae\3\2\2\2\u01ac\u01af\5h\65\2\u01ad\u01af\5\60\31\2\u01ae\u01ac\3"+
		"\2\2\2\u01ae\u01ad\3\2\2\2\u01af\u01b1\3\2\2\2\u01b0\u01b2\7N\2\2\u01b1"+
		"\u01b0\3\2\2\2\u01b1\u01b2\3\2\2\2\u01b2\u01c3\3\2\2\2\u01b3\u01b5\7I"+
		"\2\2\u01b4\u01b6\5l\67\2\u01b5\u01b4\3\2\2\2\u01b5\u01b6\3\2\2\2\u01b6"+
		"\u01bb\3\2\2\2\u01b7\u01b8\7J\2\2\u01b8\u01ba\5*\26\2\u01b9\u01b7\3\2"+
		"\2\2\u01ba\u01bd\3\2\2\2\u01bb\u01b9\3\2\2\2\u01bb\u01bc\3\2\2\2\u01bc"+
		"\u01be\3\2\2\2\u01bd\u01bb\3\2\2\2\u01be\u01c0\5&\24\2\u01bf\u01c1\7N"+
		"\2\2\u01c0\u01bf\3\2\2\2\u01c0\u01c1\3\2\2\2\u01c1\u01c3\3\2\2\2\u01c2"+
		"\u01a8\3\2\2\2\u01c2\u01b3\3\2\2\2\u01c3/\3\2\2\2\u01c4\u01c6\7T\2\2\u01c5"+
		"\u01c4\3\2\2\2\u01c6\u01c9\3\2\2\2\u01c7\u01c5\3\2\2\2\u01c7\u01c8\3\2"+
		"\2\2\u01c8\61\3\2\2\2\u01c9\u01c7\3\2\2\2\u01ca\u01cb\7\24\2\2\u01cb\u01d3"+
		"\5\64\33\2\u01cc\u01cd\7\24\2\2\u01cd\u01cf\7O\2\2\u01ce\u01d0\5\64\33"+
		"\2\u01cf\u01ce\3\2\2\2\u01cf\u01d0\3\2\2\2\u01d0\u01d1\3\2\2\2\u01d1\u01d3"+
		"\7P\2\2\u01d2\u01ca\3\2\2\2\u01d2\u01cc\3\2\2\2\u01d3\u01d4\3\2\2\2\u01d4"+
		"\u01d5\5&\24\2\u01d5\63\3\2\2\2\u01d6\u01d9\5j\66\2\u01d7\u01d9\7L\2\2"+
		"\u01d8\u01d6\3\2\2\2\u01d8\u01d7\3\2\2\2\u01d9\u01de\3\2\2\2\u01da\u01db"+
		"\7J\2\2\u01db\u01dd\5\64\33\2\u01dc\u01da\3\2\2\2\u01dd\u01e0\3\2\2\2"+
		"\u01de\u01dc\3\2\2\2\u01de\u01df\3\2\2\2\u01df\65\3\2\2\2\u01e0\u01de"+
		"\3\2\2\2\u01e1\u01e2\5:\36\2\u01e2\u01e3\5<\37\2\u01e3\u01e6\3\2\2\2\u01e4"+
		"\u01e6\58\35\2\u01e5\u01e1\3\2\2\2\u01e5\u01e4\3\2\2\2\u01e6\67\3\2\2"+
		"\2\u01e7\u01ee\7\62\2\2\u01e8\u01ef\t\3\2\2\u01e9\u01ea\7Q\2\2\u01ea\u01ec"+
		"\7R\2\2\u01eb\u01ed\7E\2\2\u01ec\u01eb\3\2\2\2\u01ec\u01ed\3\2\2\2\u01ed"+
		"\u01ef\3\2\2\2\u01ee\u01e8\3\2\2\2\u01ee\u01e9\3\2\2\2\u01ef\u01f0\3\2"+
		"\2\2\u01f0\u01f1\7O\2\2\u01f1\u01f2\5n8\2\u01f2\u01f3\7P\2\2\u01f3\u01f4"+
		"\3\2\2\2\u01f4\u01f8\7V\2\2\u01f5\u01f7\5> \2\u01f6\u01f5\3\2\2\2\u01f7"+
		"\u01fa\3\2\2\2\u01f8\u01f6\3\2\2\2\u01f8\u01f9\3\2\2\2\u01f9\u01fb\3\2"+
		"\2\2\u01fa\u01f8\3\2\2\2\u01fb\u01fc\7W\2\2\u01fc9\3\2\2\2\u01fd\u01ff"+
		"\7\"\2\2\u01fe\u01fd\3\2\2\2\u01fe\u01ff\3\2\2\2\u01ff\u0201\3\2\2\2\u0200"+
		"\u0202\7$\2\2\u0201\u0200\3\2\2\2\u0201\u0202\3\2\2\2\u0202\u0204\3\2"+
		"\2\2\u0203\u0205\7\7\2\2\u0204\u0203\3\2\2\2\u0204\u0205\3\2\2\2\u0205"+
		"\u0206\3\2\2\2\u0206\u020c\5l\67\2\u0207\u0209\7O\2\2\u0208\u020a\5n8"+
		"\2\u0209\u0208\3\2\2\2\u0209\u020a\3\2\2\2\u020a\u020b\3\2\2\2\u020b\u020d"+
		"\7P\2\2\u020c\u0207\3\2\2\2\u020c\u020d\3\2\2\2\u020d\u0217\3\2\2\2\u020e"+
		"\u0214\7\7\2\2\u020f\u0211\7O\2\2\u0210\u0212\5n8\2\u0211\u0210\3\2\2"+
		"\2\u0211\u0212\3\2\2\2\u0212\u0213\3\2\2\2\u0213\u0215\7P\2\2\u0214\u020f"+
		"\3\2\2\2\u0214\u0215\3\2\2\2\u0215\u0217\3\2\2\2\u0216\u01fe\3\2\2\2\u0216"+
		"\u020e\3\2\2\2\u0217;\3\2\2\2\u0218\u021c\7V\2\2\u0219\u021b\5> \2\u021a"+
		"\u0219\3\2\2\2\u021b\u021e\3\2\2\2\u021c\u021a\3\2\2\2\u021c\u021d\3\2"+
		"\2\2\u021d\u021f\3\2\2\2\u021e\u021c\3\2\2\2\u021f\u0222\7W\2\2\u0220"+
		"\u0222\5> \2\u0221\u0218\3\2\2\2\u0221\u0220\3\2\2\2\u0222=\3\2\2\2\u0223"+
		"\u0236\5b\62\2\u0224\u0236\5d\63\2\u0225\u0236\5Z.\2\u0226\u0236\5X-\2"+
		"\u0227\u0236\5T+\2\u0228\u0236\5V,\2\u0229\u0236\5J&\2\u022a\u0236\5N"+
		"(\2\u022b\u0236\5P)\2\u022c\u0236\5`\61\2\u022d\u0236\5^\60\2\u022e\u0236"+
		"\5R*\2\u022f\u0236\5L\'\2\u0230\u0236\5H%\2\u0231\u0236\5D#\2\u0232\u0236"+
		"\5F$\2\u0233\u0236\5B\"\2\u0234\u0236\5@!\2\u0235\u0223\3\2\2\2\u0235"+
		"\u0224\3\2\2\2\u0235\u0225\3\2\2\2\u0235\u0226\3\2\2\2\u0235\u0227\3\2"+
		"\2\2\u0235\u0228\3\2\2\2\u0235\u0229\3\2\2\2\u0235\u022a\3\2\2\2\u0235"+
		"\u022b\3\2\2\2\u0235\u022c\3\2\2\2\u0235\u022d\3\2\2\2\u0235\u022e\3\2"+
		"\2\2\u0235\u022f\3\2\2\2\u0235\u0230\3\2\2\2\u0235\u0231\3\2\2\2\u0235"+
		"\u0232\3\2\2\2\u0235\u0233\3\2\2\2\u0235\u0234\3\2\2\2\u0236?\3\2\2\2"+
		"\u0237\u023b\7V\2\2\u0238\u023a\5> \2\u0239\u0238\3\2\2\2\u023a\u023d"+
		"\3\2\2\2\u023b\u0239\3\2\2\2\u023b\u023c\3\2\2\2\u023c\u023e\3\2\2\2\u023d"+
		"\u023b\3\2\2\2\u023e\u023f\7W\2\2\u023fA\3\2\2\2\u0240\u0242\7/\2\2\u0241"+
		"\u0243\5l\67\2\u0242\u0241\3\2\2\2\u0242\u0243\3\2\2\2\u0243\u0244\3\2"+
		"\2\2\u0244\u0245\7N\2\2\u0245C\3\2\2\2\u0246\u0248\7-\2\2\u0247\u0249"+
		"\5l\67\2\u0248\u0247\3\2\2\2\u0248\u0249\3\2\2\2\u0249\u024a\3\2\2\2\u024a"+
		"\u024b\7N\2\2\u024bE\3\2\2\2\u024c\u024e\7.\2\2\u024d\u024f\5l\67\2\u024e"+
		"\u024d\3\2\2\2\u024e\u024f\3\2\2\2\u024f\u0250\3\2\2\2\u0250\u0251\7N"+
		"\2\2\u0251G\3\2\2\2\u0252\u0253\5l\67\2\u0253\u0254\7I\2\2\u0254I\3\2"+
		"\2\2\u0255\u0256\7\4\2\2\u0256\u0257\7O\2\2\u0257\u0258\5h\65\2\u0258"+
		"\u0259\7P\2\2\u0259\u0268\7V\2\2\u025a\u025b\7\5\2\2\u025b\u025c\5j\66"+
		"\2\u025c\u0264\7I\2\2\u025d\u0265\5<\37\2\u025e\u0260\5> \2\u025f\u025e"+
		"\3\2\2\2\u0260\u0263\3\2\2\2\u0261\u025f\3\2\2\2\u0261\u0262\3\2\2\2\u0262"+
		"\u0265\3\2\2\2\u0263\u0261\3\2\2\2\u0264\u025d\3\2\2\2\u0264\u0261\3\2"+
		"\2\2\u0265\u0267\3\2\2\2\u0266\u025a\3\2\2\2\u0267\u026a\3\2\2\2\u0268"+
		"\u0266\3\2\2\2\u0268\u0269\3\2\2\2\u0269\u0273\3\2\2\2\u026a\u0268\3\2"+
		"\2\2\u026b\u026c\7\6\2\2\u026c\u0270\7I\2\2\u026d\u026f\5<\37\2\u026e"+
		"\u026d\3\2\2\2\u026f\u0272\3\2\2\2\u0270\u026e\3\2\2\2\u0270\u0271\3\2"+
		"\2\2\u0271\u0274\3\2\2\2\u0272\u0270\3\2\2\2\u0273\u026b\3\2\2\2\u0273"+
		"\u0274\3\2\2\2\u0274\u0275\3\2\2\2\u0275\u0276\7W\2\2\u0276K\3\2\2\2\u0277"+
		"\u0278\7\b\2\2\u0278\u0279\5h\65\2\u0279M\3\2\2\2\u027a\u027b\7\13\2\2"+
		"\u027b\u027c\7O\2\2\u027c\u027d\7\31\2\2\u027d\u027e\7D\2\2\u027e\u027f"+
		"\7\'\2\2\u027f\u0280\5h\65\2\u0280\u0281\7P\2\2\u0281\u0282\5<\37\2\u0282"+
		"O\3\2\2\2\u0283\u0284\7&\2\2\u0284\u0285\7O\2\2\u0285\u0286\5h\65\2\u0286"+
		"\u0287\7\'\2\2\u0287\u0288\5h\65\2\u0288\u0289\7P\2\2\u0289\u028a\5<\37"+
		"\2\u028aQ\3\2\2\2\u028b\u028d\7#\2\2\u028c\u028e\5h\65\2\u028d\u028c\3"+
		"\2\2\2\u028d\u028e\3\2\2\2\u028e\u028f\3\2\2\2\u028f\u0290\7N\2\2\u0290"+
		"S\3\2\2\2\u0291\u0292\7\26\2\2\u0292\u0293\5<\37\2\u0293\u0294\7\27\2"+
		"\2\u0294\u0296\7O\2\2\u0295\u0297\5h\65\2\u0296\u0295\3\2\2\2\u0296\u0297"+
		"\3\2\2\2\u0297\u0298\3\2\2\2\u0298\u0299\7P\2\2\u0299U\3\2\2\2\u029a\u029b"+
		"\7\27\2\2\u029b\u029d\7O\2\2\u029c\u029e\5h\65\2\u029d\u029c\3\2\2\2\u029d"+
		"\u029e\3\2\2\2\u029e\u029f\3\2\2\2\u029f\u02a0\7P\2\2\u02a0\u02a1\5<\37"+
		"\2\u02a1W\3\2\2\2\u02a2\u02a3\7\13\2\2\u02a3\u02a5\7O\2\2\u02a4\u02a6"+
		"\5h\65\2\u02a5\u02a4\3\2\2\2\u02a5\u02a6\3\2\2\2\u02a6\u02a7\3\2\2\2\u02a7"+
		"\u02a9\7N\2\2\u02a8\u02aa\5h\65\2\u02a9\u02a8\3\2\2\2\u02a9\u02aa\3\2"+
		"\2\2\u02aa\u02ab\3\2\2\2\u02ab\u02ad\7N\2\2\u02ac\u02ae\5h\65\2\u02ad"+
		"\u02ac\3\2\2\2\u02ad\u02ae\3\2\2\2\u02ae\u02af\3\2\2\2\u02af\u02b0\7P"+
		"\2\2\u02b0\u02b1\5<\37\2\u02b1Y\3\2\2\2\u02b2\u02b3\7\f\2\2\u02b3\u02bd"+
		"\5<\37\2\u02b4\u02b5\7\r\2\2\u02b5\u02b7\7O\2\2\u02b6\u02b8\5n8\2\u02b7"+
		"\u02b6\3\2\2\2\u02b7\u02b8\3\2\2\2\u02b8\u02b9\3\2\2\2\u02b9\u02ba\7P"+
		"\2\2\u02ba\u02bc\5<\37\2\u02bb\u02b4\3\2\2\2\u02bc\u02bf\3\2\2\2\u02bd"+
		"\u02bb\3\2\2\2\u02bd\u02be\3\2\2\2\u02be\u02c2\3\2\2\2\u02bf\u02bd\3\2"+
		"\2\2\u02c0\u02c1\7\16\2\2\u02c1\u02c3\5<\37\2\u02c2\u02c0\3\2\2\2\u02c2"+
		"\u02c3\3\2\2\2\u02c3[\3\2\2\2\u02c4\u02c7\5h\65\2\u02c5\u02c6\7K\2\2\u02c6"+
		"\u02c8\5\\/\2\u02c7\u02c5\3\2\2\2\u02c7\u02c8\3\2\2\2\u02c8]\3\2\2\2\u02c9"+
		"\u02cb\5h\65\2\u02ca\u02c9\3\2\2\2\u02ca\u02cb\3\2\2\2\u02cb\u02cc\3\2"+
		"\2\2\u02cc\u02cd\7N\2\2\u02cd_\3\2\2\2\u02ce\u02cf\7S\2\2\u02cf\u02d0"+
		"\7N\2\2\u02d0a\3\2\2\2\u02d1\u02d2\7\31\2\2\u02d2\u02d5\5l\67\2\u02d3"+
		"\u02d4\7E\2\2\u02d4\u02d6\5h\65\2\u02d5\u02d3\3\2\2\2\u02d5\u02d6\3\2"+
		"\2\2\u02d6\u02d7\3\2\2\2\u02d7\u02d8\7N\2\2\u02d8c\3\2\2\2\u02d9\u02da"+
		"\7\25\2\2\u02da\u02e0\5f\64\2\u02db\u02dc\7\30\2\2\u02dc\u02dd\7\25\2"+
		"\2\u02dd\u02df\5f\64\2\u02de\u02db\3\2\2\2\u02df\u02e2\3\2\2\2\u02e0\u02de"+
		"\3\2\2\2\u02e0\u02e1\3\2\2\2\u02e1\u02e5\3\2\2\2\u02e2\u02e0\3\2\2\2\u02e3"+
		"\u02e4\7\30\2\2\u02e4\u02e6\5<\37\2\u02e5\u02e3\3\2\2\2\u02e5\u02e6\3"+
		"\2\2\2\u02e6e\3\2\2\2\u02e7\u02e8\7O\2\2\u02e8\u02e9\5h\65\2\u02e9\u02ea"+
		"\7P\2\2\u02ea\u02eb\5<\37\2\u02ebg\3\2\2\2\u02ec\u02ed\b\65\1\2\u02ed"+
		"\u02ef\7Q\2\2\u02ee\u02f0\5h\65\2\u02ef\u02ee\3\2\2\2\u02ef\u02f0\3\2"+
		"\2\2\u02f0\u02f1\3\2\2\2\u02f1\u0316\7R\2\2\u02f2\u02f3\7\36\2\2\u02f3"+
		"\u0316\5h\65%\u02f4\u02f5\7\35\2\2\u02f5\u0316\5h\65$\u02f6\u02f7\7\21"+
		"\2\2\u02f7\u0316\5h\65#\u02f8\u0316\5j\66\2\u02f9\u02fb\7O\2\2\u02fa\u02fc"+
		"\5h\65\2\u02fb\u02fa\3\2\2\2\u02fb\u02fc\3\2\2\2\u02fc\u02fd\3\2\2\2\u02fd"+
		"\u0316\7P\2\2\u02fe\u02ff\7\31\2\2\u02ff\u0316\5h\65\34\u0300\u0301\7"+
		"$\2\2\u0301\u0316\5h\65\33\u0302\u0303\7\t\2\2\u0303\u0316\5h\65\32\u0304"+
		"\u0306\7V\2\2\u0305\u0307\5n8\2\u0306\u0305\3\2\2\2\u0306\u0307\3\2\2"+
		"\2\u0307\u0308\3\2\2\2\u0308\u030a\7I\2\2\u0309\u030b\5h\65\2\u030a\u0309"+
		"\3\2\2\2\u030a\u030b\3\2\2\2\u030b\u030c\3\2\2\2\u030c\u0316\7W\2\2\u030d"+
		"\u030e\7A\2\2\u030e\u0316\5h\65\b\u030f\u0310\7L\2\2\u0310\u0311\7A\2"+
		"\2\u0311\u0316\5h\65\7\u0312\u0313\t\4\2\2\u0313\u0316\5h\65\6\u0314\u0316"+
		"\5\66\34\2\u0315\u02ec\3\2\2\2\u0315\u02f2\3\2\2\2\u0315\u02f4\3\2\2\2"+
		"\u0315\u02f6\3\2\2\2\u0315\u02f8\3\2\2\2\u0315\u02f9\3\2\2\2\u0315\u02fe"+
		"\3\2\2\2\u0315\u0300\3\2\2\2\u0315\u0302\3\2\2\2\u0315\u0304\3\2\2\2\u0315"+
		"\u030d\3\2\2\2\u0315\u030f\3\2\2\2\u0315\u0312\3\2\2\2\u0315\u0314\3\2"+
		"\2\2\u0316\u0398\3\2\2\2\u0317\u0318\f)\2\2\u0318\u0319\7K\2\2\u0319\u0397"+
		"\5h\65*\u031a\u031b\f\'\2\2\u031b\u031c\7J\2\2\u031c\u0397\5h\65(\u031d"+
		"\u031e\f\31\2\2\u031e\u031f\7\64\2\2\u031f\u0397\5h\65\32\u0320\u0321"+
		"\f\30\2\2\u0321\u0322\7+\2\2\u0322\u0323\7\'\2\2\u0323\u0397\5h\65\31"+
		"\u0324\u0325\f\27\2\2\u0325\u0326\7,\2\2\u0326\u0327\7\'\2\2\u0327\u0397"+
		"\5h\65\30\u0328\u0329\f\26\2\2\u0329\u032a\7,\2\2\u032a\u0397\5h\65\27"+
		"\u032b\u032c\f\25\2\2\u032c\u032d\7\'\2\2\u032d\u0397\5h\65\26\u032e\u032f"+
		"\f\24\2\2\u032f\u0330\7E\2\2\u0330\u0397\5h\65\25\u0331\u0332\f\23\2\2"+
		"\u0332\u0333\78\2\2\u0333\u0397\5h\65\24\u0334\u0335\f\21\2\2\u0335\u0337"+
		"\t\5\2\2\u0336\u0338\7E\2\2\u0337\u0336\3\2\2\2\u0337\u0338\3\2\2\2\u0338"+
		"\u0339\3\2\2\2\u0339\u0397\5h\65\22\u033a\u033b\f\20\2\2\u033b\u033c\t"+
		"\6\2\2\u033c\u0397\5h\65\21\u033d\u033e\f\17\2\2\u033e\u0340\7C\2\2\u033f"+
		"\u0341\7E\2\2\u0340\u033f\3\2\2\2\u0340\u0341\3\2\2\2\u0341\u0342\3\2"+
		"\2\2\u0342\u0397\5h\65\20\u0343\u0344\f\16\2\2\u0344\u0346\t\7\2\2\u0345"+
		"\u0347\7E\2\2\u0346\u0345\3\2\2\2\u0346\u0347\3\2\2\2\u0347\u0348\3\2"+
		"\2\2\u0348\u0397\5h\65\17\u0349\u034a\f\r\2\2\u034a\u034c\t\b\2\2\u034b"+
		"\u034d\7E\2\2\u034c\u034b\3\2\2\2\u034c\u034d\3\2\2\2\u034d\u034e\3\2"+
		"\2\2\u034e\u0397\5h\65\16\u034f\u0350\f\f\2\2\u0350\u0351\t\t\2\2\u0351"+
		"\u0397\5h\65\r\u0352\u0353\f\13\2\2\u0353\u0354\t\n\2\2\u0354\u0397\5"+
		"h\65\f\u0355\u0356\f\n\2\2\u0356\u0358\t\13\2\2\u0357\u0359\7E\2\2\u0358"+
		"\u0357\3\2\2\2\u0358\u0359\3\2\2\2\u0359\u035a\3\2\2\2\u035a\u0397\5h"+
		"\65\13\u035b\u035c\f\t\2\2\u035c\u035d\7A\2\2\u035d\u0397\5h\65\n\u035e"+
		"\u035f\f\4\2\2\u035f\u0360\7\67\2\2\u0360\u0361\5h\65\2\u0361\u0362\7"+
		"I\2\2\u0362\u0363\5h\65\5\u0363\u0397\3\2\2\2\u0364\u0365\f(\2\2\u0365"+
		"\u0367\7Q\2\2\u0366\u0368\5h\65\2\u0367\u0366\3\2\2\2\u0367\u0368\3\2"+
		"\2\2\u0368\u0369\3\2\2\2\u0369\u0397\7R\2\2\u036a\u036b\f&\2\2\u036b\u036c"+
		"\7)\2\2\u036c\u036f\5h\65\2\u036d\u036e\7*\2\2\u036e\u0370\5h\65\2\u036f"+
		"\u036d\3\2\2\2\u036f\u0370\3\2\2\2\u0370\u0397\3\2\2\2\u0371\u0372\f!"+
		"\2\2\u0372\u0374\7O\2\2\u0373\u0375\5n8\2\u0374\u0373\3\2\2\2\u0375\u0376"+
		"\3\2\2\2\u0376\u0374\3\2\2\2\u0376\u0377\3\2\2\2\u0377\u0378\3\2\2\2\u0378"+
		"\u0379\7P\2\2\u0379\u0397\3\2\2\2\u037a\u037b\f \2\2\u037b\u037d\7O\2"+
		"\2\u037c\u037e\5h\65\2\u037d\u037c\3\2\2\2\u037d\u037e\3\2\2\2\u037e\u037f"+
		"\3\2\2\2\u037f\u0397\7P\2\2\u0380\u0381\f\37\2\2\u0381\u0383\7V\2\2\u0382"+
		"\u0384\5n8\2\u0383\u0382\3\2\2\2\u0383\u0384\3\2\2\2\u0384\u0385\3\2\2"+
		"\2\u0385\u0387\7I\2\2\u0386\u0388\5h\65\2\u0387\u0386\3\2\2\2\u0387\u0388"+
		"\3\2\2\2\u0388\u0389\3\2\2\2\u0389\u0397\7W\2\2\u038a\u038b\f\36\2\2\u038b"+
		"\u038c\7I\2\2\u038c\u038d\5*\26\2\u038d\u038e\5&\24\2\u038e\u0397\3\2"+
		"\2\2\u038f\u0394\f\5\2\2\u0390\u0391\79\2\2\u0391\u0395\79\2\2\u0392\u0393"+
		"\7<\2\2\u0393\u0395\7<\2\2\u0394\u0390\3\2\2\2\u0394\u0392\3\2\2\2\u0395"+
		"\u0397\3\2\2\2\u0396\u0317\3\2\2\2\u0396\u031a\3\2\2\2\u0396\u031d\3\2"+
		"\2\2\u0396\u0320\3\2\2\2\u0396\u0324\3\2\2\2\u0396\u0328\3\2\2\2\u0396"+
		"\u032b\3\2\2\2\u0396\u032e\3\2\2\2\u0396\u0331\3\2\2\2\u0396\u0334\3\2"+
		"\2\2\u0396\u033a\3\2\2\2\u0396\u033d\3\2\2\2\u0396\u0343\3\2\2\2\u0396"+
		"\u0349\3\2\2\2\u0396\u034f\3\2\2\2\u0396\u0352\3\2\2\2\u0396\u0355\3\2"+
		"\2\2\u0396\u035b\3\2\2\2\u0396\u035e\3\2\2\2\u0396\u0364\3\2\2\2\u0396"+
		"\u036a\3\2\2\2\u0396\u0371\3\2\2\2\u0396\u037a\3\2\2\2\u0396\u0380\3\2"+
		"\2\2\u0396\u038a\3\2\2\2\u0396\u038f\3\2\2\2\u0397\u039a\3\2\2\2\u0398"+
		"\u0396\3\2\2\2\u0398\u0399\3\2\2\2\u0399i\3\2\2\2\u039a\u0398\3\2\2\2"+
		"\u039b\u03a7\7\35\2\2\u039c\u03a7\7G\2\2\u039d\u03a7\7F\2\2\u039e\u039f"+
		"\7\64\2\2\u039f\u03a7\5l\67\2\u03a0\u03a7\5l\67\2\u03a1\u03a7\7T\2\2\u03a2"+
		"\u03a7\7S\2\2\u03a3\u03a7\7U\2\2\u03a4\u03a7\7\32\2\2\u03a5\u03a7\7\33"+
		"\2\2\u03a6\u039b\3\2\2\2\u03a6\u039c\3\2\2\2\u03a6\u039d\3\2\2\2\u03a6"+
		"\u039e\3\2\2\2\u03a6\u03a0\3\2\2\2\u03a6\u03a1\3\2\2\2\u03a6\u03a2\3\2"+
		"\2\2\u03a6\u03a3\3\2\2\2\u03a6\u03a4\3\2\2\2\u03a6\u03a5\3\2\2\2\u03a7"+
		"k\3\2\2\2\u03a8\u03a9\t\f\2\2\u03a9m\3\2\2\2\u03aa\u03ae\5p9\2\u03ab\u03ae"+
		"\7(\2\2\u03ac\u03ae\5$\23\2\u03ad\u03aa\3\2\2\2\u03ad\u03ab\3\2\2\2\u03ad"+
		"\u03ac\3\2\2\2\u03ae\u03b5\3\2\2\2\u03af\u03b1\7J\2\2\u03b0\u03b2\5n8"+
		"\2\u03b1\u03b0\3\2\2\2\u03b1\u03b2\3\2\2\2\u03b2\u03b4\3\2\2\2\u03b3\u03af"+
		"\3\2\2\2\u03b4\u03b7\3\2\2\2\u03b5\u03b3\3\2\2\2\u03b5\u03b6\3\2\2\2\u03b6"+
		"o\3\2\2\2\u03b7\u03b5\3\2\2\2\u03b8\u03b9\5l\67\2\u03b9\u03ba\7I\2\2\u03ba"+
		"\u03bc\3\2\2\2\u03bb\u03b8\3\2\2\2\u03bb\u03bc\3\2\2\2\u03bc\u03be\3\2"+
		"\2\2\u03bd\u03bf\5l\67\2\u03be\u03bd\3\2\2\2\u03be\u03bf\3\2\2\2\u03bf"+
		"\u03c0\3\2\2\2\u03c0\u03c2\5l\67\2\u03c1\u03c3\7\67\2\2\u03c2\u03c1\3"+
		"\2\2\2\u03c2\u03c3\3\2\2\2\u03c3\u03d0\3\2\2\2\u03c4\u03c5\5l\67\2\u03c5"+
		"\u03c7\7I\2\2\u03c6\u03c8\7\67\2\2\u03c7\u03c6\3\2\2\2\u03c7\u03c8\3\2"+
		"\2\2\u03c8\u03d0\3\2\2\2\u03c9\u03ca\5l\67\2\u03ca\u03cb\7I\2\2\u03cb"+
		"\u03cd\7E\2\2\u03cc\u03ce\5h\65\2\u03cd\u03cc\3\2\2\2\u03cd\u03ce\3\2"+
		"\2\2\u03ce\u03d0\3\2\2\2\u03cf\u03bb\3\2\2\2\u03cf\u03c4\3\2\2\2\u03cf"+
		"\u03c9\3\2\2\2\u03d0q\3\2\2\2\u0082u\u0085\u0090\u0098\u00a0\u00a7\u00ab"+
		"\u00b0\u00bd\u00c5\u00cb\u00d2\u00d6\u00e1\u00e3\u00ea\u00ee\u00f5\u00fd"+
		"\u0106\u010e\u0113\u011a\u0122\u0128\u012b\u012e\u0132\u0138\u013e\u0143"+
		"\u014a\u014d\u0150\u0152\u0157\u015c\u0162\u0166\u016a\u0170\u0177\u017d"+
		"\u0180\u0187\u0196\u019c\u01a2\u01a4\u01aa\u01ae\u01b1\u01b5\u01bb\u01c0"+
		"\u01c2\u01c7\u01cf\u01d2\u01d8\u01de\u01e5\u01ec\u01ee\u01f8\u01fe\u0201"+
		"\u0204\u0209\u020c\u0211\u0214\u0216\u021c\u0221\u0235\u023b\u0242\u0248"+
		"\u024e\u0261\u0264\u0268\u0270\u0273\u028d\u0296\u029d\u02a5\u02a9\u02ad"+
		"\u02b7\u02bd\u02c2\u02c7\u02ca\u02d5\u02e0\u02e5\u02ef\u02fb\u0306\u030a"+
		"\u0315\u0337\u0340\u0346\u034c\u0358\u0367\u036f\u0376\u037d\u0383\u0387"+
		"\u0394\u0396\u0398\u03a6\u03ad\u03b1\u03b5\u03bb\u03be\u03c2\u03c7\u03cd"+
		"\u03cf";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}