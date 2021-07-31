// Generated from /Users/tomasoberg/repos/vscode-tads3tools/server/src/parser/Tads3.g4 by ANTLR 4.8
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class Tads3Lexer extends Lexer {
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
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"GRAMMAR", "SWITCH", "CASE", "DEFAULT", "FUNCTION", "THROW", "NEW", "TEMPLATE", 
			"FOR", "TRY", "CATCH", "FINALLY", "ENUM", "CLASS", "TRANSIENT", "MODIFY", 
			"REPLACE", "PROPERTYSET", "IF", "DO", "WHILE", "ELSE", "LOCAL", "TRUE", 
			"NIL", "INTRINSIC", "INHERITED", "DELEGATED", "PROPERTY", "DICTIONARY", 
			"EXPORT", "EXTERN", "RETURN", "STATIC", "STRING", "FOREACH", "IN", "SPREAD", 
			"RANGE", "STEP", "LITERAL_NOT", "IS", "BREAK", "CONTINUE", "GOTO", "TOKEN", 
			"AT", "AMP", "HASH", "NOT", "OPTIONAL", "IFNIL", "PLUS", "DIV", "MOD", 
			"MINUS", "NEQ", "EQ", "AND", "OR", "ARROW", "TILDE", "POW", "ID", "ASSIGN", 
			"NR", "HEX", "OCT", "COLON", "COMMA", "DOT", "STAR", "BITWISE_OR", "SEMICOLON", 
			"LEFT_PAREN", "RIGHT_PAREN", "LEFT_BRACKET", "RIGHT_BRACKET", "DSTR", 
			"SSTR", "RSTR", "SINGLE_QUOTED_STRING", "DOUBLE_QUOTED_STRING", "STRING_STRUCTURE", 
			"LEFT_CURLY", "RIGHT_CURLY", "LTEQ", "ARITHMETIC_LEFT", "LT", "GTEQ", 
			"GT", "ARITHMETIC_RIGHT", "LOGICAL_RIGHT_SHIFT", "COMMENT", "LINE_COMMENT", 
			"WS", "ANY", "SingleStringCharacter", "DoubleStringCharacter", "LineContinuation", 
			"ESCAPED_CHAR"
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


	public Tads3Lexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "Tads3.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2`\u02d3\b\1\4\2\t"+
		"\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t+\4"+
		",\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64\t"+
		"\64\4\65\t\65\4\66\t\66\4\67\t\67\48\t8\49\t9\4:\t:\4;\t;\4<\t<\4=\t="+
		"\4>\t>\4?\t?\4@\t@\4A\tA\4B\tB\4C\tC\4D\tD\4E\tE\4F\tF\4G\tG\4H\tH\4I"+
		"\tI\4J\tJ\4K\tK\4L\tL\4M\tM\4N\tN\4O\tO\4P\tP\4Q\tQ\4R\tR\4S\tS\4T\tT"+
		"\4U\tU\4V\tV\4W\tW\4X\tX\4Y\tY\4Z\tZ\4[\t[\4\\\t\\\4]\t]\4^\t^\4_\t_\4"+
		"`\t`\4a\ta\4b\tb\4c\tc\4d\td\4e\te\4f\tf\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3"+
		"\2\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\4\3\4\3\4\3\4\3\4\3\5\3\5\3\5\3\5\3\5"+
		"\3\5\3\5\3\5\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\7\3\7\3\7\3\7\3\7\3"+
		"\7\3\b\3\b\3\b\3\b\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\t\3\n\3\n\3\n\3\n"+
		"\3\13\3\13\3\13\3\13\3\f\3\f\3\f\3\f\3\f\3\f\3\r\3\r\3\r\3\r\3\r\3\r\3"+
		"\r\3\r\3\16\3\16\3\16\3\16\3\16\3\17\3\17\3\17\3\17\3\17\3\17\3\20\3\20"+
		"\3\20\3\20\3\20\3\20\3\20\3\20\3\20\3\20\3\21\3\21\3\21\3\21\3\21\3\21"+
		"\3\21\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\23\3\23\3\23\3\23\3\23"+
		"\3\23\3\23\3\23\3\23\3\23\3\23\3\23\3\24\3\24\3\24\3\25\3\25\3\25\3\26"+
		"\3\26\3\26\3\26\3\26\3\26\3\27\3\27\3\27\3\27\3\27\3\30\3\30\3\30\3\30"+
		"\3\30\3\30\3\31\3\31\3\31\3\31\3\31\3\32\3\32\3\32\3\32\3\33\3\33\3\33"+
		"\3\33\3\33\3\33\3\33\3\33\3\33\3\33\3\34\3\34\3\34\3\34\3\34\3\34\3\34"+
		"\3\34\3\34\3\34\3\35\3\35\3\35\3\35\3\35\3\35\3\35\3\35\3\35\3\35\3\36"+
		"\3\36\3\36\3\36\3\36\3\36\3\36\3\36\3\36\3\37\3\37\3\37\3\37\3\37\3\37"+
		"\3\37\3\37\3\37\3\37\3\37\3 \3 \3 \3 \3 \3 \3 \3!\3!\3!\3!\3!\3!\3!\3"+
		"\"\3\"\3\"\3\"\3\"\3\"\3\"\3#\3#\3#\3#\3#\3#\3#\3$\3$\3$\3$\3$\3$\3$\3"+
		"%\3%\3%\3%\3%\3%\3%\3%\3&\3&\3&\3\'\3\'\3\'\3\'\3(\3(\3(\3)\3)\3)\3)\3"+
		")\3*\3*\3*\3*\3+\3+\3+\3,\3,\3,\3,\3,\3,\3-\3-\3-\3-\3-\3-\3-\3-\3-\3"+
		".\3.\3.\3.\3.\3/\3/\3/\3/\3/\3/\3\60\3\60\3\61\3\61\3\62\3\62\3\63\3\63"+
		"\3\64\3\64\3\65\3\65\3\65\3\66\3\66\3\67\3\67\38\38\39\39\3:\3:\3:\3;"+
		"\3;\3;\3<\3<\3<\3=\3=\3=\3>\3>\3>\3?\3?\3@\3@\3A\3A\7A\u0223\nA\fA\16"+
		"A\u0226\13A\3B\3B\3C\6C\u022b\nC\rC\16C\u022c\3C\3C\7C\u0231\nC\fC\16"+
		"C\u0234\13C\3D\3D\3D\6D\u0239\nD\rD\16D\u023a\3E\3E\6E\u023f\nE\rE\16"+
		"E\u0240\3F\3F\3G\3G\3H\3H\3I\3I\3J\3J\3K\3K\3L\3L\3M\3M\3N\3N\3O\3O\3"+
		"P\3P\3Q\3Q\3R\3R\3R\3S\3S\3S\3S\3S\3S\3S\3S\3S\3S\3S\3S\3S\5S\u026b\n"+
		"S\3T\3T\3T\3T\3T\3T\3T\3T\3T\3T\3T\3T\3T\5T\u027a\nT\3U\3U\3U\7U\u027f"+
		"\nU\fU\16U\u0282\13U\3U\3U\3U\7U\u0287\nU\fU\16U\u028a\13U\3V\3V\3W\3"+
		"W\3X\3X\3X\3Y\3Y\3Y\3Z\3Z\3[\3[\3[\3\\\3\\\3]\3]\3]\3^\3^\3^\3^\3_\3_"+
		"\3_\3_\7_\u02a8\n_\f_\16_\u02ab\13_\3_\3_\3_\3_\3_\3`\3`\3`\3`\7`\u02b6"+
		"\n`\f`\16`\u02b9\13`\3`\3`\3a\6a\u02be\na\ra\16a\u02bf\3a\3a\3b\3b\3c"+
		"\3c\5c\u02c8\nc\3d\3d\5d\u02cc\nd\3e\3e\3e\3f\3f\3f\6\u0232\u0280\u0288"+
		"\u02a9\2g\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33"+
		"\17\35\20\37\21!\22#\23%\24\'\25)\26+\27-\30/\31\61\32\63\33\65\34\67"+
		"\359\36;\37= ?!A\"C#E$G%I&K\'M(O)Q*S+U,W-Y.[/]\60_\61a\62c\63e\64g\65"+
		"i\66k\67m8o9q:s;u<w=y>{?}@\177A\u0081B\u0083C\u0085D\u0087E\u0089F\u008b"+
		"G\u008dH\u008fI\u0091J\u0093K\u0095L\u0097M\u0099N\u009bO\u009dP\u009f"+
		"Q\u00a1R\u00a3S\u00a5\2\u00a7\2\u00a9\2\u00abT\u00adU\u00afV\u00b1W\u00b3"+
		"X\u00b5Y\u00b7Z\u00b9[\u00bb\\\u00bd]\u00bf^\u00c1_\u00c3`\u00c5\2\u00c7"+
		"\2\u00c9\2\u00cb\2\3\2\16\5\2C\\aac|\6\2\62;C\\aac|\3\2\62;\3\2\62\62"+
		"\5\2\62;CHch\3\2\629\4\2\f\f\17\17\5\2\13\f\17\17\"\"\6\2\f\f\17\17))"+
		"^^\6\2\f\f\17\17$$^^\5\2\f\f\17\17\u202a\u202b\t\2$$))^^ddppttvv\2\u02db"+
		"\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2"+
		"\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2"+
		"\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3\2\2\2\2#\3\2"+
		"\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2\2\2+\3\2\2\2\2-\3\2\2\2\2/\3\2\2"+
		"\2\2\61\3\2\2\2\2\63\3\2\2\2\2\65\3\2\2\2\2\67\3\2\2\2\29\3\2\2\2\2;\3"+
		"\2\2\2\2=\3\2\2\2\2?\3\2\2\2\2A\3\2\2\2\2C\3\2\2\2\2E\3\2\2\2\2G\3\2\2"+
		"\2\2I\3\2\2\2\2K\3\2\2\2\2M\3\2\2\2\2O\3\2\2\2\2Q\3\2\2\2\2S\3\2\2\2\2"+
		"U\3\2\2\2\2W\3\2\2\2\2Y\3\2\2\2\2[\3\2\2\2\2]\3\2\2\2\2_\3\2\2\2\2a\3"+
		"\2\2\2\2c\3\2\2\2\2e\3\2\2\2\2g\3\2\2\2\2i\3\2\2\2\2k\3\2\2\2\2m\3\2\2"+
		"\2\2o\3\2\2\2\2q\3\2\2\2\2s\3\2\2\2\2u\3\2\2\2\2w\3\2\2\2\2y\3\2\2\2\2"+
		"{\3\2\2\2\2}\3\2\2\2\2\177\3\2\2\2\2\u0081\3\2\2\2\2\u0083\3\2\2\2\2\u0085"+
		"\3\2\2\2\2\u0087\3\2\2\2\2\u0089\3\2\2\2\2\u008b\3\2\2\2\2\u008d\3\2\2"+
		"\2\2\u008f\3\2\2\2\2\u0091\3\2\2\2\2\u0093\3\2\2\2\2\u0095\3\2\2\2\2\u0097"+
		"\3\2\2\2\2\u0099\3\2\2\2\2\u009b\3\2\2\2\2\u009d\3\2\2\2\2\u009f\3\2\2"+
		"\2\2\u00a1\3\2\2\2\2\u00a3\3\2\2\2\2\u00ab\3\2\2\2\2\u00ad\3\2\2\2\2\u00af"+
		"\3\2\2\2\2\u00b1\3\2\2\2\2\u00b3\3\2\2\2\2\u00b5\3\2\2\2\2\u00b7\3\2\2"+
		"\2\2\u00b9\3\2\2\2\2\u00bb\3\2\2\2\2\u00bd\3\2\2\2\2\u00bf\3\2\2\2\2\u00c1"+
		"\3\2\2\2\2\u00c3\3\2\2\2\3\u00cd\3\2\2\2\5\u00d5\3\2\2\2\7\u00dc\3\2\2"+
		"\2\t\u00e1\3\2\2\2\13\u00e9\3\2\2\2\r\u00f2\3\2\2\2\17\u00f8\3\2\2\2\21"+
		"\u00fc\3\2\2\2\23\u0105\3\2\2\2\25\u0109\3\2\2\2\27\u010d\3\2\2\2\31\u0113"+
		"\3\2\2\2\33\u011b\3\2\2\2\35\u0120\3\2\2\2\37\u0126\3\2\2\2!\u0130\3\2"+
		"\2\2#\u0137\3\2\2\2%\u013f\3\2\2\2\'\u014b\3\2\2\2)\u014e\3\2\2\2+\u0151"+
		"\3\2\2\2-\u0157\3\2\2\2/\u015c\3\2\2\2\61\u0162\3\2\2\2\63\u0167\3\2\2"+
		"\2\65\u016b\3\2\2\2\67\u0175\3\2\2\29\u017f\3\2\2\2;\u0189\3\2\2\2=\u0192"+
		"\3\2\2\2?\u019d\3\2\2\2A\u01a4\3\2\2\2C\u01ab\3\2\2\2E\u01b2\3\2\2\2G"+
		"\u01b9\3\2\2\2I\u01c0\3\2\2\2K\u01c8\3\2\2\2M\u01cb\3\2\2\2O\u01cf\3\2"+
		"\2\2Q\u01d2\3\2\2\2S\u01d7\3\2\2\2U\u01db\3\2\2\2W\u01de\3\2\2\2Y\u01e4"+
		"\3\2\2\2[\u01ed\3\2\2\2]\u01f2\3\2\2\2_\u01f8\3\2\2\2a\u01fa\3\2\2\2c"+
		"\u01fc\3\2\2\2e\u01fe\3\2\2\2g\u0200\3\2\2\2i\u0202\3\2\2\2k\u0205\3\2"+
		"\2\2m\u0207\3\2\2\2o\u0209\3\2\2\2q\u020b\3\2\2\2s\u020d\3\2\2\2u\u0210"+
		"\3\2\2\2w\u0213\3\2\2\2y\u0216\3\2\2\2{\u0219\3\2\2\2}\u021c\3\2\2\2\177"+
		"\u021e\3\2\2\2\u0081\u0220\3\2\2\2\u0083\u0227\3\2\2\2\u0085\u022a\3\2"+
		"\2\2\u0087\u0235\3\2\2\2\u0089\u023c\3\2\2\2\u008b\u0242\3\2\2\2\u008d"+
		"\u0244\3\2\2\2\u008f\u0246\3\2\2\2\u0091\u0248\3\2\2\2\u0093\u024a\3\2"+
		"\2\2\u0095\u024c\3\2\2\2\u0097\u024e\3\2\2\2\u0099\u0250\3\2\2\2\u009b"+
		"\u0252\3\2\2\2\u009d\u0254\3\2\2\2\u009f\u0256\3\2\2\2\u00a1\u0258\3\2"+
		"\2\2\u00a3\u025a\3\2\2\2\u00a5\u026a\3\2\2\2\u00a7\u0279\3\2\2\2\u00a9"+
		"\u0288\3\2\2\2\u00ab\u028b\3\2\2\2\u00ad\u028d\3\2\2\2\u00af\u028f\3\2"+
		"\2\2\u00b1\u0292\3\2\2\2\u00b3\u0295\3\2\2\2\u00b5\u0297\3\2\2\2\u00b7"+
		"\u029a\3\2\2\2\u00b9\u029c\3\2\2\2\u00bb\u029f\3\2\2\2\u00bd\u02a3\3\2"+
		"\2\2\u00bf\u02b1\3\2\2\2\u00c1\u02bd\3\2\2\2\u00c3\u02c3\3\2\2\2\u00c5"+
		"\u02c7\3\2\2\2\u00c7\u02cb\3\2\2\2\u00c9\u02cd\3\2\2\2\u00cb\u02d0\3\2"+
		"\2\2\u00cd\u00ce\7i\2\2\u00ce\u00cf\7t\2\2\u00cf\u00d0\7c\2\2\u00d0\u00d1"+
		"\7o\2\2\u00d1\u00d2\7o\2\2\u00d2\u00d3\7c\2\2\u00d3\u00d4\7t\2\2\u00d4"+
		"\4\3\2\2\2\u00d5\u00d6\7u\2\2\u00d6\u00d7\7y\2\2\u00d7\u00d8\7k\2\2\u00d8"+
		"\u00d9\7v\2\2\u00d9\u00da\7e\2\2\u00da\u00db\7j\2\2\u00db\6\3\2\2\2\u00dc"+
		"\u00dd\7e\2\2\u00dd\u00de\7c\2\2\u00de\u00df\7u\2\2\u00df\u00e0\7g\2\2"+
		"\u00e0\b\3\2\2\2\u00e1\u00e2\7f\2\2\u00e2\u00e3\7g\2\2\u00e3\u00e4\7h"+
		"\2\2\u00e4\u00e5\7c\2\2\u00e5\u00e6\7w\2\2\u00e6\u00e7\7n\2\2\u00e7\u00e8"+
		"\7v\2\2\u00e8\n\3\2\2\2\u00e9\u00ea\7h\2\2\u00ea\u00eb\7w\2\2\u00eb\u00ec"+
		"\7p\2\2\u00ec\u00ed\7e\2\2\u00ed\u00ee\7v\2\2\u00ee\u00ef\7k\2\2\u00ef"+
		"\u00f0\7q\2\2\u00f0\u00f1\7p\2\2\u00f1\f\3\2\2\2\u00f2\u00f3\7v\2\2\u00f3"+
		"\u00f4\7j\2\2\u00f4\u00f5\7t\2\2\u00f5\u00f6\7q\2\2\u00f6\u00f7\7y\2\2"+
		"\u00f7\16\3\2\2\2\u00f8\u00f9\7p\2\2\u00f9\u00fa\7g\2\2\u00fa\u00fb\7"+
		"y\2\2\u00fb\20\3\2\2\2\u00fc\u00fd\7v\2\2\u00fd\u00fe\7g\2\2\u00fe\u00ff"+
		"\7o\2\2\u00ff\u0100\7r\2\2\u0100\u0101\7n\2\2\u0101\u0102\7c\2\2\u0102"+
		"\u0103\7v\2\2\u0103\u0104\7g\2\2\u0104\22\3\2\2\2\u0105\u0106\7h\2\2\u0106"+
		"\u0107\7q\2\2\u0107\u0108\7t\2\2\u0108\24\3\2\2\2\u0109\u010a\7v\2\2\u010a"+
		"\u010b\7t\2\2\u010b\u010c\7{\2\2\u010c\26\3\2\2\2\u010d\u010e\7e\2\2\u010e"+
		"\u010f\7c\2\2\u010f\u0110\7v\2\2\u0110\u0111\7e\2\2\u0111\u0112\7j\2\2"+
		"\u0112\30\3\2\2\2\u0113\u0114\7h\2\2\u0114\u0115\7k\2\2\u0115\u0116\7"+
		"p\2\2\u0116\u0117\7c\2\2\u0117\u0118\7n\2\2\u0118\u0119\7n\2\2\u0119\u011a"+
		"\7{\2\2\u011a\32\3\2\2\2\u011b\u011c\7g\2\2\u011c\u011d\7p\2\2\u011d\u011e"+
		"\7w\2\2\u011e\u011f\7o\2\2\u011f\34\3\2\2\2\u0120\u0121\7e\2\2\u0121\u0122"+
		"\7n\2\2\u0122\u0123\7c\2\2\u0123\u0124\7u\2\2\u0124\u0125\7u\2\2\u0125"+
		"\36\3\2\2\2\u0126\u0127\7v\2\2\u0127\u0128\7t\2\2\u0128\u0129\7c\2\2\u0129"+
		"\u012a\7p\2\2\u012a\u012b\7u\2\2\u012b\u012c\7k\2\2\u012c\u012d\7g\2\2"+
		"\u012d\u012e\7p\2\2\u012e\u012f\7v\2\2\u012f \3\2\2\2\u0130\u0131\7o\2"+
		"\2\u0131\u0132\7q\2\2\u0132\u0133\7f\2\2\u0133\u0134\7k\2\2\u0134\u0135"+
		"\7h\2\2\u0135\u0136\7{\2\2\u0136\"\3\2\2\2\u0137\u0138\7t\2\2\u0138\u0139"+
		"\7g\2\2\u0139\u013a\7r\2\2\u013a\u013b\7n\2\2\u013b\u013c\7c\2\2\u013c"+
		"\u013d\7e\2\2\u013d\u013e\7g\2\2\u013e$\3\2\2\2\u013f\u0140\7r\2\2\u0140"+
		"\u0141\7t\2\2\u0141\u0142\7q\2\2\u0142\u0143\7r\2\2\u0143\u0144\7g\2\2"+
		"\u0144\u0145\7t\2\2\u0145\u0146\7v\2\2\u0146\u0147\7{\2\2\u0147\u0148"+
		"\7u\2\2\u0148\u0149\7g\2\2\u0149\u014a\7v\2\2\u014a&\3\2\2\2\u014b\u014c"+
		"\7k\2\2\u014c\u014d\7h\2\2\u014d(\3\2\2\2\u014e\u014f\7f\2\2\u014f\u0150"+
		"\7q\2\2\u0150*\3\2\2\2\u0151\u0152\7y\2\2\u0152\u0153\7j\2\2\u0153\u0154"+
		"\7k\2\2\u0154\u0155\7n\2\2\u0155\u0156\7g\2\2\u0156,\3\2\2\2\u0157\u0158"+
		"\7g\2\2\u0158\u0159\7n\2\2\u0159\u015a\7u\2\2\u015a\u015b\7g\2\2\u015b"+
		".\3\2\2\2\u015c\u015d\7n\2\2\u015d\u015e\7q\2\2\u015e\u015f\7e\2\2\u015f"+
		"\u0160\7c\2\2\u0160\u0161\7n\2\2\u0161\60\3\2\2\2\u0162\u0163\7v\2\2\u0163"+
		"\u0164\7t\2\2\u0164\u0165\7w\2\2\u0165\u0166\7g\2\2\u0166\62\3\2\2\2\u0167"+
		"\u0168\7p\2\2\u0168\u0169\7k\2\2\u0169\u016a\7n\2\2\u016a\64\3\2\2\2\u016b"+
		"\u016c\7k\2\2\u016c\u016d\7p\2\2\u016d\u016e\7v\2\2\u016e\u016f\7t\2\2"+
		"\u016f\u0170\7k\2\2\u0170\u0171\7p\2\2\u0171\u0172\7u\2\2\u0172\u0173"+
		"\7k\2\2\u0173\u0174\7e\2\2\u0174\66\3\2\2\2\u0175\u0176\7k\2\2\u0176\u0177"+
		"\7p\2\2\u0177\u0178\7j\2\2\u0178\u0179\7g\2\2\u0179\u017a\7t\2\2\u017a"+
		"\u017b\7k\2\2\u017b\u017c\7v\2\2\u017c\u017d\7g\2\2\u017d\u017e\7f\2\2"+
		"\u017e8\3\2\2\2\u017f\u0180\7f\2\2\u0180\u0181\7g\2\2\u0181\u0182\7n\2"+
		"\2\u0182\u0183\7g\2\2\u0183\u0184\7i\2\2\u0184\u0185\7c\2\2\u0185\u0186"+
		"\7v\2\2\u0186\u0187\7g\2\2\u0187\u0188\7f\2\2\u0188:\3\2\2\2\u0189\u018a"+
		"\7r\2\2\u018a\u018b\7t\2\2\u018b\u018c\7q\2\2\u018c\u018d\7r\2\2\u018d"+
		"\u018e\7g\2\2\u018e\u018f\7t\2\2\u018f\u0190\7v\2\2\u0190\u0191\7{\2\2"+
		"\u0191<\3\2\2\2\u0192\u0193\7f\2\2\u0193\u0194\7k\2\2\u0194\u0195\7e\2"+
		"\2\u0195\u0196\7v\2\2\u0196\u0197\7k\2\2\u0197\u0198\7q\2\2\u0198\u0199"+
		"\7p\2\2\u0199\u019a\7c\2\2\u019a\u019b\7t\2\2\u019b\u019c\7{\2\2\u019c"+
		">\3\2\2\2\u019d\u019e\7g\2\2\u019e\u019f\7z\2\2\u019f\u01a0\7r\2\2\u01a0"+
		"\u01a1\7q\2\2\u01a1\u01a2\7t\2\2\u01a2\u01a3\7v\2\2\u01a3@\3\2\2\2\u01a4"+
		"\u01a5\7g\2\2\u01a5\u01a6\7z\2\2\u01a6\u01a7\7v\2\2\u01a7\u01a8\7g\2\2"+
		"\u01a8\u01a9\7t\2\2\u01a9\u01aa\7p\2\2\u01aaB\3\2\2\2\u01ab\u01ac\7t\2"+
		"\2\u01ac\u01ad\7g\2\2\u01ad\u01ae\7v\2\2\u01ae\u01af\7w\2\2\u01af\u01b0"+
		"\7t\2\2\u01b0\u01b1\7p\2\2\u01b1D\3\2\2\2\u01b2\u01b3\7u\2\2\u01b3\u01b4"+
		"\7v\2\2\u01b4\u01b5\7c\2\2\u01b5\u01b6\7v\2\2\u01b6\u01b7\7k\2\2\u01b7"+
		"\u01b8\7e\2\2\u01b8F\3\2\2\2\u01b9\u01ba\7u\2\2\u01ba\u01bb\7v\2\2\u01bb"+
		"\u01bc\7t\2\2\u01bc\u01bd\7k\2\2\u01bd\u01be\7p\2\2\u01be\u01bf\7i\2\2"+
		"\u01bfH\3\2\2\2\u01c0\u01c1\7h\2\2\u01c1\u01c2\7q\2\2\u01c2\u01c3\7t\2"+
		"\2\u01c3\u01c4\7g\2\2\u01c4\u01c5\7c\2\2\u01c5\u01c6\7e\2\2\u01c6\u01c7"+
		"\7j\2\2\u01c7J\3\2\2\2\u01c8\u01c9\7k\2\2\u01c9\u01ca\7p\2\2\u01caL\3"+
		"\2\2\2\u01cb\u01cc\7\60\2\2\u01cc\u01cd\7\60\2\2\u01cd\u01ce\7\60\2\2"+
		"\u01ceN\3\2\2\2\u01cf\u01d0\7\60\2\2\u01d0\u01d1\7\60\2\2\u01d1P\3\2\2"+
		"\2\u01d2\u01d3\7u\2\2\u01d3\u01d4\7v\2\2\u01d4\u01d5\7g\2\2\u01d5\u01d6"+
		"\7r\2\2\u01d6R\3\2\2\2\u01d7\u01d8\7p\2\2\u01d8\u01d9\7q\2\2\u01d9\u01da"+
		"\7v\2\2\u01daT\3\2\2\2\u01db\u01dc\7k\2\2\u01dc\u01dd\7u\2\2\u01ddV\3"+
		"\2\2\2\u01de\u01df\7d\2\2\u01df\u01e0\7t\2\2\u01e0\u01e1\7g\2\2\u01e1"+
		"\u01e2\7c\2\2\u01e2\u01e3\7m\2\2\u01e3X\3\2\2\2\u01e4\u01e5\7e\2\2\u01e5"+
		"\u01e6\7q\2\2\u01e6\u01e7\7p\2\2\u01e7\u01e8\7v\2\2\u01e8\u01e9\7k\2\2"+
		"\u01e9\u01ea\7p\2\2\u01ea\u01eb\7w\2\2\u01eb\u01ec\7g\2\2\u01ecZ\3\2\2"+
		"\2\u01ed\u01ee\7i\2\2\u01ee\u01ef\7q\2\2\u01ef\u01f0\7v\2\2\u01f0\u01f1"+
		"\7q\2\2\u01f1\\\3\2\2\2\u01f2\u01f3\7v\2\2\u01f3\u01f4\7q\2\2\u01f4\u01f5"+
		"\7m\2\2\u01f5\u01f6\7g\2\2\u01f6\u01f7\7p\2\2\u01f7^\3\2\2\2\u01f8\u01f9"+
		"\7B\2\2\u01f9`\3\2\2\2\u01fa\u01fb\7(\2\2\u01fbb\3\2\2\2\u01fc\u01fd\7"+
		"%\2\2\u01fdd\3\2\2\2\u01fe\u01ff\7#\2\2\u01fff\3\2\2\2\u0200\u0201\7A"+
		"\2\2\u0201h\3\2\2\2\u0202\u0203\7A\2\2\u0203\u0204\7A\2\2\u0204j\3\2\2"+
		"\2\u0205\u0206\7-\2\2\u0206l\3\2\2\2\u0207\u0208\7\61\2\2\u0208n\3\2\2"+
		"\2\u0209\u020a\7\'\2\2\u020ap\3\2\2\2\u020b\u020c\7/\2\2\u020cr\3\2\2"+
		"\2\u020d\u020e\7#\2\2\u020e\u020f\7?\2\2\u020ft\3\2\2\2\u0210\u0211\7"+
		"?\2\2\u0211\u0212\7?\2\2\u0212v\3\2\2\2\u0213\u0214\7(\2\2\u0214\u0215"+
		"\7(\2\2\u0215x\3\2\2\2\u0216\u0217\7~\2\2\u0217\u0218\7~\2\2\u0218z\3"+
		"\2\2\2\u0219\u021a\7/\2\2\u021a\u021b\7@\2\2\u021b|\3\2\2\2\u021c\u021d"+
		"\7\u0080\2\2\u021d~\3\2\2\2\u021e\u021f\7`\2\2\u021f\u0080\3\2\2\2\u0220"+
		"\u0224\t\2\2\2\u0221\u0223\t\3\2\2\u0222\u0221\3\2\2\2\u0223\u0226\3\2"+
		"\2\2\u0224\u0222\3\2\2\2\u0224\u0225\3\2\2\2\u0225\u0082\3\2\2\2\u0226"+
		"\u0224\3\2\2\2\u0227\u0228\7?\2\2\u0228\u0084\3\2\2\2\u0229\u022b\t\4"+
		"\2\2\u022a\u0229\3\2\2\2\u022b\u022c\3\2\2\2\u022c\u022a\3\2\2\2\u022c"+
		"\u022d\3\2\2\2\u022d\u0232\3\2\2\2\u022e\u022f\13\2\2\2\u022f\u0231\t"+
		"\4\2\2\u0230\u022e\3\2\2\2\u0231\u0234\3\2\2\2\u0232\u0233\3\2\2\2\u0232"+
		"\u0230\3\2\2\2\u0233\u0086\3\2\2\2\u0234\u0232\3\2\2\2\u0235\u0236\t\5"+
		"\2\2\u0236\u0238\7z\2\2\u0237\u0239\t\6\2\2\u0238\u0237\3\2\2\2\u0239"+
		"\u023a\3\2\2\2\u023a\u0238\3\2\2\2\u023a\u023b\3\2\2\2\u023b\u0088\3\2"+
		"\2\2\u023c\u023e\7\62\2\2\u023d\u023f\t\7\2\2\u023e\u023d\3\2\2\2\u023f"+
		"\u0240\3\2\2\2\u0240\u023e\3\2\2\2\u0240\u0241\3\2\2\2\u0241\u008a\3\2"+
		"\2\2\u0242\u0243\7<\2\2\u0243\u008c\3\2\2\2\u0244\u0245\7.\2\2\u0245\u008e"+
		"\3\2\2\2\u0246\u0247\7\60\2\2\u0247\u0090\3\2\2\2\u0248\u0249\7,\2\2\u0249"+
		"\u0092\3\2\2\2\u024a\u024b\7~\2\2\u024b\u0094\3\2\2\2\u024c\u024d\7=\2"+
		"\2\u024d\u0096\3\2\2\2\u024e\u024f\7*\2\2\u024f\u0098\3\2\2\2\u0250\u0251"+
		"\7+\2\2\u0251\u009a\3\2\2\2\u0252\u0253\7]\2\2\u0253\u009c\3\2\2\2\u0254"+
		"\u0255\7_\2\2\u0255\u009e\3\2\2\2\u0256\u0257\5\u00a7T\2\u0257\u00a0\3"+
		"\2\2\2\u0258\u0259\5\u00a5S\2\u0259\u00a2\3\2\2\2\u025a\u025b\7T\2\2\u025b"+
		"\u025c\5\u00a5S\2\u025c\u00a4\3\2\2\2\u025d\u025e\7)\2\2\u025e\u025f\5"+
		"\u00a9U\2\u025f\u0260\7)\2\2\u0260\u026b\3\2\2\2\u0261\u0262\7)\2\2\u0262"+
		"\u0263\7)\2\2\u0263\u0264\7)\2\2\u0264\u0265\3\2\2\2\u0265\u0266\5\u00a9"+
		"U\2\u0266\u0267\7)\2\2\u0267\u0268\7)\2\2\u0268\u0269\7)\2\2\u0269\u026b"+
		"\3\2\2\2\u026a\u025d\3\2\2\2\u026a\u0261\3\2\2\2\u026b\u00a6\3\2\2\2\u026c"+
		"\u026d\7$\2\2\u026d\u026e\5\u00a9U\2\u026e\u026f\7$\2\2\u026f\u027a\3"+
		"\2\2\2\u0270\u0271\7$\2\2\u0271\u0272\7$\2\2\u0272\u0273\7$\2\2\u0273"+
		"\u0274\3\2\2\2\u0274\u0275\5\u00a9U\2\u0275\u0276\7$\2\2\u0276\u0277\7"+
		"$\2\2\u0277\u0278\7$\2\2\u0278\u027a\3\2\2\2\u0279\u026c\3\2\2\2\u0279"+
		"\u0270\3\2\2\2\u027a\u00a8\3\2\2\2\u027b\u0287\5\u00cbf\2\u027c\u0280"+
		"\5\u00b1Y\2\u027d\u027f\13\2\2\2\u027e\u027d\3\2\2\2\u027f\u0282\3\2\2"+
		"\2\u0280\u0281\3\2\2\2\u0280\u027e\3\2\2\2\u0281\u0283\3\2\2\2\u0282\u0280"+
		"\3\2\2\2\u0283\u0284\5\u00b9]\2\u0284\u0287\3\2\2\2\u0285\u0287\13\2\2"+
		"\2\u0286\u027b\3\2\2\2\u0286\u027c\3\2\2\2\u0286\u0285\3\2\2\2\u0287\u028a"+
		"\3\2\2\2\u0288\u0289\3\2\2\2\u0288\u0286\3\2\2\2\u0289\u00aa\3\2\2\2\u028a"+
		"\u0288\3\2\2\2\u028b\u028c\7}\2\2\u028c\u00ac\3\2\2\2\u028d\u028e\7\177"+
		"\2\2\u028e\u00ae\3\2\2\2\u028f\u0290\7>\2\2\u0290\u0291\7?\2\2\u0291\u00b0"+
		"\3\2\2\2\u0292\u0293\7>\2\2\u0293\u0294\7>\2\2\u0294\u00b2\3\2\2\2\u0295"+
		"\u0296\7>\2\2\u0296\u00b4\3\2\2\2\u0297\u0298\7@\2\2\u0298\u0299\7?\2"+
		"\2\u0299\u00b6\3\2\2\2\u029a\u029b\7@\2\2\u029b\u00b8\3\2\2\2\u029c\u029d"+
		"\7@\2\2\u029d\u029e\7@\2\2\u029e\u00ba\3\2\2\2\u029f\u02a0\7@\2\2\u02a0"+
		"\u02a1\7@\2\2\u02a1\u02a2\7@\2\2\u02a2\u00bc\3\2\2\2\u02a3\u02a4\7\61"+
		"\2\2\u02a4\u02a5\7,\2\2\u02a5\u02a9\3\2\2\2\u02a6\u02a8\13\2\2\2\u02a7"+
		"\u02a6\3\2\2\2\u02a8\u02ab\3\2\2\2\u02a9\u02aa\3\2\2\2\u02a9\u02a7\3\2"+
		"\2\2\u02aa\u02ac\3\2\2\2\u02ab\u02a9\3\2\2\2\u02ac\u02ad\7,\2\2\u02ad"+
		"\u02ae\7\61\2\2\u02ae\u02af\3\2\2\2\u02af\u02b0\b_\2\2\u02b0\u00be\3\2"+
		"\2\2\u02b1\u02b2\7\61\2\2\u02b2\u02b3\7\61\2\2\u02b3\u02b7\3\2\2\2\u02b4"+
		"\u02b6\n\b\2\2\u02b5\u02b4\3\2\2\2\u02b6\u02b9\3\2\2\2\u02b7\u02b5\3\2"+
		"\2\2\u02b7\u02b8\3\2\2\2\u02b8\u02ba\3\2\2\2\u02b9\u02b7\3\2\2\2\u02ba"+
		"\u02bb\b`\2\2\u02bb\u00c0\3\2\2\2\u02bc\u02be\t\t\2\2\u02bd\u02bc\3\2"+
		"\2\2\u02be\u02bf\3\2\2\2\u02bf\u02bd\3\2\2\2\u02bf\u02c0\3\2\2\2\u02c0"+
		"\u02c1\3\2\2\2\u02c1\u02c2\ba\3\2\u02c2\u00c2\3\2\2\2\u02c3\u02c4\13\2"+
		"\2\2\u02c4\u00c4\3\2\2\2\u02c5\u02c8\n\n\2\2\u02c6\u02c8\5\u00c9e\2\u02c7"+
		"\u02c5\3\2\2\2\u02c7\u02c6\3\2\2\2\u02c8\u00c6\3\2\2\2\u02c9\u02cc\n\13"+
		"\2\2\u02ca\u02cc\5\u00c9e\2\u02cb\u02c9\3\2\2\2\u02cb\u02ca\3\2\2\2\u02cc"+
		"\u00c8\3\2\2\2\u02cd\u02ce\7^\2\2\u02ce\u02cf\t\f\2\2\u02cf\u00ca\3\2"+
		"\2\2\u02d0\u02d1\7^\2\2\u02d1\u02d2\t\r\2\2\u02d2\u00cc\3\2\2\2\22\2\u0224"+
		"\u022c\u0232\u023a\u0240\u026a\u0279\u0280\u0286\u0288\u02a9\u02b7\u02bf"+
		"\u02c7\u02cb\4\b\2\2\2\3\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}