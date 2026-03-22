// Generated from server/src/parser/Tads3v2.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { EqNeqSuffixContext } from "./Tads3v2Parser";
import { IsInSuffixContext } from "./Tads3v2Parser";
import { NotInSuffixContext } from "./Tads3v2Parser";
import { InheritedAtomContext } from "./Tads3v2Parser";
import { HexAtomContext } from "./Tads3v2Parser";
import { NumberAtomContext } from "./Tads3v2Parser";
import { ReferenceAtomContext } from "./Tads3v2Parser";
import { IdAtomContext } from "./Tads3v2Parser";
import { SingleQuoteStringAtomContext } from "./Tads3v2Parser";
import { DoubleQuoteStringAtomContext } from "./Tads3v2Parser";
import { RegexpStringAtomContext } from "./Tads3v2Parser";
import { BooleanAtomContext } from "./Tads3v2Parser";
import { NilAtomContext } from "./Tads3v2Parser";
import { ProgramContext } from "./Tads3v2Parser";
import { DirectiveContext } from "./Tads3v2Parser";
import { PragmaDirectiveContext } from "./Tads3v2Parser";
import { GrammarRulesContext } from "./Tads3v2Parser";
import { ItemListContext } from "./Tads3v2Parser";
import { QualifiersContext } from "./Tads3v2Parser";
import { ItemContext } from "./Tads3v2Parser";
import { TemplateDeclarationContext } from "./Tads3v2Parser";
import { EnumDeclarationContext } from "./Tads3v2Parser";
import { PropertyDeclarationContext } from "./Tads3v2Parser";
import { DictionaryDeclarationContext } from "./Tads3v2Parser";
import { ExportDeclarationContext } from "./Tads3v2Parser";
import { IntrinsicDeclarationContext } from "./Tads3v2Parser";
import { IntrinsicMethodDeclarationContext } from "./Tads3v2Parser";
import { ObjectDeclarationContext } from "./Tads3v2Parser";
import { GrammarDeclarationContext } from "./Tads3v2Parser";
import { TemplateDefItemContext } from "./Tads3v2Parser";
import { TemplateDefTokenContext } from "./Tads3v2Parser";
import { TemplateExprContext } from "./Tads3v2Parser";
import { TemplatePrefixOpContext } from "./Tads3v2Parser";
import { ArrayContext } from "./Tads3v2Parser";
import { ArgExprContext } from "./Tads3v2Parser";
import { CurlyObjectBodyContext } from "./Tads3v2Parser";
import { SemiColonEndedObjectBodyContext } from "./Tads3v2Parser";
import { SuperTypesContext } from "./Tads3v2Parser";
import { ObjectBodyContext } from "./Tads3v2Parser";
import { PropertyContext } from "./Tads3v2Parser";
import { DictionaryPropertyContext } from "./Tads3v2Parser";
import { PropertySetContext } from "./Tads3v2Parser";
import { ParamsWithWildcardContext } from "./Tads3v2Parser";
import { FunctionDeclarationContext } from "./Tads3v2Parser";
import { OperatorOverrideContext } from "./Tads3v2Parser";
import { FunctionHeadContext } from "./Tads3v2Parser";
import { CodeBlockContext } from "./Tads3v2Parser";
import { StatsContext } from "./Tads3v2Parser";
import { InnerCodeBlockContext } from "./Tads3v2Parser";
import { GotoStatementContext } from "./Tads3v2Parser";
import { BreakStatementContext } from "./Tads3v2Parser";
import { ContinueStatementContext } from "./Tads3v2Parser";
import { LabelStatementContext } from "./Tads3v2Parser";
import { SwitchStatementContext } from "./Tads3v2Parser";
import { SwitchCaseContext } from "./Tads3v2Parser";
import { ThrowStatementContext } from "./Tads3v2Parser";
import { ForInStatementContext } from "./Tads3v2Parser";
import { ForEachStatementContext } from "./Tads3v2Parser";
import { ReturnStatementContext } from "./Tads3v2Parser";
import { DoWhileStatementContext } from "./Tads3v2Parser";
import { WhileStatementContext } from "./Tads3v2Parser";
import { ForStatementContext } from "./Tads3v2Parser";
import { ForUpdateContext } from "./Tads3v2Parser";
import { ForInitContext } from "./Tads3v2Parser";
import { ForInitItemContext } from "./Tads3v2Parser";
import { TryCatchStatementContext } from "./Tads3v2Parser";
import { EmptyStatementContext } from "./Tads3v2Parser";
import { SayStatementContext } from "./Tads3v2Parser";
import { AssignmentStatementContext } from "./Tads3v2Parser";
import { LocalVarDeclContext } from "./Tads3v2Parser";
import { IfStatementContext } from "./Tads3v2Parser";
import { EnclosedExprCodeBlockContext } from "./Tads3v2Parser";
import { ExprContext } from "./Tads3v2Parser";
import { AssignmentExprContext } from "./Tads3v2Parser";
import { AssignmentOpContext } from "./Tads3v2Parser";
import { ConditionalExprContext } from "./Tads3v2Parser";
import { IfNilExprContext } from "./Tads3v2Parser";
import { LogicalOrExprContext } from "./Tads3v2Parser";
import { LogicalAndExprContext } from "./Tads3v2Parser";
import { BitwiseOrExprContext } from "./Tads3v2Parser";
import { BitwiseXorExprContext } from "./Tads3v2Parser";
import { BitwiseAndExprContext } from "./Tads3v2Parser";
import { EqualityExprContext } from "./Tads3v2Parser";
import { EqualitySuffixContext } from "./Tads3v2Parser";
import { RelationalExprContext } from "./Tads3v2Parser";
import { RelationalOpContext } from "./Tads3v2Parser";
import { ShiftExprContext } from "./Tads3v2Parser";
import { AdditiveExprContext } from "./Tads3v2Parser";
import { MultiplicativeExprContext } from "./Tads3v2Parser";
import { UnaryExprContext } from "./Tads3v2Parser";
import { PrefixOpContext } from "./Tads3v2Parser";
import { PostfixExprContext } from "./Tads3v2Parser";
import { PostfixSuffixContext } from "./Tads3v2Parser";
import { PrimaryExprContext } from "./Tads3v2Parser";
import { PrimaryContext } from "./Tads3v2Parser";
import { MemberExprContext } from "./Tads3v2Parser";
import { IdentifierAtomContext } from "./Tads3v2Parser";
import { SoftKeywordContext } from "./Tads3v2Parser";
import { ParamsContext } from "./Tads3v2Parser";
import { ParamContext } from "./Tads3v2Parser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `Tads3v2Parser`.
 */
export interface Tads3v2Listener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `eqNeqSuffix`
	 * labeled alternative in `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 */
	enterEqNeqSuffix?: (ctx: EqNeqSuffixContext) => void;
	/**
	 * Exit a parse tree produced by the `eqNeqSuffix`
	 * labeled alternative in `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 */
	exitEqNeqSuffix?: (ctx: EqNeqSuffixContext) => void;

	/**
	 * Enter a parse tree produced by the `isInSuffix`
	 * labeled alternative in `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 */
	enterIsInSuffix?: (ctx: IsInSuffixContext) => void;
	/**
	 * Exit a parse tree produced by the `isInSuffix`
	 * labeled alternative in `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 */
	exitIsInSuffix?: (ctx: IsInSuffixContext) => void;

	/**
	 * Enter a parse tree produced by the `notInSuffix`
	 * labeled alternative in `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 */
	enterNotInSuffix?: (ctx: NotInSuffixContext) => void;
	/**
	 * Exit a parse tree produced by the `notInSuffix`
	 * labeled alternative in `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 */
	exitNotInSuffix?: (ctx: NotInSuffixContext) => void;

	/**
	 * Enter a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterInheritedAtom?: (ctx: InheritedAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitInheritedAtom?: (ctx: InheritedAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `hexAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterHexAtom?: (ctx: HexAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `hexAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitHexAtom?: (ctx: HexAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `numberAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterNumberAtom?: (ctx: NumberAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `numberAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitNumberAtom?: (ctx: NumberAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `referenceAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterReferenceAtom?: (ctx: ReferenceAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `referenceAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitReferenceAtom?: (ctx: ReferenceAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `idAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterIdAtom?: (ctx: IdAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `idAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitIdAtom?: (ctx: IdAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `singleQuoteStringAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterSingleQuoteStringAtom?: (ctx: SingleQuoteStringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `singleQuoteStringAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitSingleQuoteStringAtom?: (ctx: SingleQuoteStringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `doubleQuoteStringAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterDoubleQuoteStringAtom?: (ctx: DoubleQuoteStringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `doubleQuoteStringAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitDoubleQuoteStringAtom?: (ctx: DoubleQuoteStringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterRegexpStringAtom?: (ctx: RegexpStringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitRegexpStringAtom?: (ctx: RegexpStringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `booleanAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterBooleanAtom?: (ctx: BooleanAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `booleanAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitBooleanAtom?: (ctx: BooleanAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `nilAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterNilAtom?: (ctx: NilAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `nilAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitNilAtom?: (ctx: NilAtomContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.directive`.
	 * @param ctx the parse tree
	 */
	enterDirective?: (ctx: DirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.directive`.
	 * @param ctx the parse tree
	 */
	exitDirective?: (ctx: DirectiveContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.pragmaDirective`.
	 * @param ctx the parse tree
	 */
	enterPragmaDirective?: (ctx: PragmaDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.pragmaDirective`.
	 * @param ctx the parse tree
	 */
	exitPragmaDirective?: (ctx: PragmaDirectiveContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.grammarRules`.
	 * @param ctx the parse tree
	 */
	enterGrammarRules?: (ctx: GrammarRulesContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.grammarRules`.
	 * @param ctx the parse tree
	 */
	exitGrammarRules?: (ctx: GrammarRulesContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.itemList`.
	 * @param ctx the parse tree
	 */
	enterItemList?: (ctx: ItemListContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.itemList`.
	 * @param ctx the parse tree
	 */
	exitItemList?: (ctx: ItemListContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.qualifiers`.
	 * @param ctx the parse tree
	 */
	enterQualifiers?: (ctx: QualifiersContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.qualifiers`.
	 * @param ctx the parse tree
	 */
	exitQualifiers?: (ctx: QualifiersContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.item`.
	 * @param ctx the parse tree
	 */
	enterItem?: (ctx: ItemContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.item`.
	 * @param ctx the parse tree
	 */
	exitItem?: (ctx: ItemContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.templateDeclaration`.
	 * @param ctx the parse tree
	 */
	enterTemplateDeclaration?: (ctx: TemplateDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.templateDeclaration`.
	 * @param ctx the parse tree
	 */
	exitTemplateDeclaration?: (ctx: TemplateDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.enumDeclaration`.
	 * @param ctx the parse tree
	 */
	enterEnumDeclaration?: (ctx: EnumDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.enumDeclaration`.
	 * @param ctx the parse tree
	 */
	exitEnumDeclaration?: (ctx: EnumDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.propertyDeclaration`.
	 * @param ctx the parse tree
	 */
	enterPropertyDeclaration?: (ctx: PropertyDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.propertyDeclaration`.
	 * @param ctx the parse tree
	 */
	exitPropertyDeclaration?: (ctx: PropertyDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 */
	enterDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 */
	exitDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.exportDeclaration`.
	 * @param ctx the parse tree
	 */
	enterExportDeclaration?: (ctx: ExportDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.exportDeclaration`.
	 * @param ctx the parse tree
	 */
	exitExportDeclaration?: (ctx: ExportDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.intrinsicDeclaration`.
	 * @param ctx the parse tree
	 */
	enterIntrinsicDeclaration?: (ctx: IntrinsicDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.intrinsicDeclaration`.
	 * @param ctx the parse tree
	 */
	exitIntrinsicDeclaration?: (ctx: IntrinsicDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.intrinsicMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	enterIntrinsicMethodDeclaration?: (ctx: IntrinsicMethodDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.intrinsicMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	exitIntrinsicMethodDeclaration?: (ctx: IntrinsicMethodDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.objectDeclaration`.
	 * @param ctx the parse tree
	 */
	enterObjectDeclaration?: (ctx: ObjectDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.objectDeclaration`.
	 * @param ctx the parse tree
	 */
	exitObjectDeclaration?: (ctx: ObjectDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.grammarDeclaration`.
	 * @param ctx the parse tree
	 */
	enterGrammarDeclaration?: (ctx: GrammarDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.grammarDeclaration`.
	 * @param ctx the parse tree
	 */
	exitGrammarDeclaration?: (ctx: GrammarDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.templateDefItem`.
	 * @param ctx the parse tree
	 */
	enterTemplateDefItem?: (ctx: TemplateDefItemContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.templateDefItem`.
	 * @param ctx the parse tree
	 */
	exitTemplateDefItem?: (ctx: TemplateDefItemContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.templateDefToken`.
	 * @param ctx the parse tree
	 */
	enterTemplateDefToken?: (ctx: TemplateDefTokenContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.templateDefToken`.
	 * @param ctx the parse tree
	 */
	exitTemplateDefToken?: (ctx: TemplateDefTokenContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.templateExpr`.
	 * @param ctx the parse tree
	 */
	enterTemplateExpr?: (ctx: TemplateExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.templateExpr`.
	 * @param ctx the parse tree
	 */
	exitTemplateExpr?: (ctx: TemplateExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.templatePrefixOp`.
	 * @param ctx the parse tree
	 */
	enterTemplatePrefixOp?: (ctx: TemplatePrefixOpContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.templatePrefixOp`.
	 * @param ctx the parse tree
	 */
	exitTemplatePrefixOp?: (ctx: TemplatePrefixOpContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.array`.
	 * @param ctx the parse tree
	 */
	enterArray?: (ctx: ArrayContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.array`.
	 * @param ctx the parse tree
	 */
	exitArray?: (ctx: ArrayContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.argExpr`.
	 * @param ctx the parse tree
	 */
	enterArgExpr?: (ctx: ArgExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.argExpr`.
	 * @param ctx the parse tree
	 */
	exitArgExpr?: (ctx: ArgExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.curlyObjectBody`.
	 * @param ctx the parse tree
	 */
	enterCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.curlyObjectBody`.
	 * @param ctx the parse tree
	 */
	exitCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 */
	enterSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 */
	exitSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.superTypes`.
	 * @param ctx the parse tree
	 */
	enterSuperTypes?: (ctx: SuperTypesContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.superTypes`.
	 * @param ctx the parse tree
	 */
	exitSuperTypes?: (ctx: SuperTypesContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.objectBody`.
	 * @param ctx the parse tree
	 */
	enterObjectBody?: (ctx: ObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.objectBody`.
	 * @param ctx the parse tree
	 */
	exitObjectBody?: (ctx: ObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.property`.
	 * @param ctx the parse tree
	 */
	enterProperty?: (ctx: PropertyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.property`.
	 * @param ctx the parse tree
	 */
	exitProperty?: (ctx: PropertyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.dictionaryProperty`.
	 * @param ctx the parse tree
	 */
	enterDictionaryProperty?: (ctx: DictionaryPropertyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.dictionaryProperty`.
	 * @param ctx the parse tree
	 */
	exitDictionaryProperty?: (ctx: DictionaryPropertyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.propertySet`.
	 * @param ctx the parse tree
	 */
	enterPropertySet?: (ctx: PropertySetContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.propertySet`.
	 * @param ctx the parse tree
	 */
	exitPropertySet?: (ctx: PropertySetContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 */
	enterParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 */
	exitParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	enterFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	exitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.operatorOverride`.
	 * @param ctx the parse tree
	 */
	enterOperatorOverride?: (ctx: OperatorOverrideContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.operatorOverride`.
	 * @param ctx the parse tree
	 */
	exitOperatorOverride?: (ctx: OperatorOverrideContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.functionHead`.
	 * @param ctx the parse tree
	 */
	enterFunctionHead?: (ctx: FunctionHeadContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.functionHead`.
	 * @param ctx the parse tree
	 */
	exitFunctionHead?: (ctx: FunctionHeadContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.codeBlock`.
	 * @param ctx the parse tree
	 */
	enterCodeBlock?: (ctx: CodeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.codeBlock`.
	 * @param ctx the parse tree
	 */
	exitCodeBlock?: (ctx: CodeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.stats`.
	 * @param ctx the parse tree
	 */
	enterStats?: (ctx: StatsContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.stats`.
	 * @param ctx the parse tree
	 */
	exitStats?: (ctx: StatsContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.innerCodeBlock`.
	 * @param ctx the parse tree
	 */
	enterInnerCodeBlock?: (ctx: InnerCodeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.innerCodeBlock`.
	 * @param ctx the parse tree
	 */
	exitInnerCodeBlock?: (ctx: InnerCodeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.gotoStatement`.
	 * @param ctx the parse tree
	 */
	enterGotoStatement?: (ctx: GotoStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.gotoStatement`.
	 * @param ctx the parse tree
	 */
	exitGotoStatement?: (ctx: GotoStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.breakStatement`.
	 * @param ctx the parse tree
	 */
	enterBreakStatement?: (ctx: BreakStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.breakStatement`.
	 * @param ctx the parse tree
	 */
	exitBreakStatement?: (ctx: BreakStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.continueStatement`.
	 * @param ctx the parse tree
	 */
	enterContinueStatement?: (ctx: ContinueStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.continueStatement`.
	 * @param ctx the parse tree
	 */
	exitContinueStatement?: (ctx: ContinueStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.labelStatement`.
	 * @param ctx the parse tree
	 */
	enterLabelStatement?: (ctx: LabelStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.labelStatement`.
	 * @param ctx the parse tree
	 */
	exitLabelStatement?: (ctx: LabelStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.switchStatement`.
	 * @param ctx the parse tree
	 */
	enterSwitchStatement?: (ctx: SwitchStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.switchStatement`.
	 * @param ctx the parse tree
	 */
	exitSwitchStatement?: (ctx: SwitchStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.switchCase`.
	 * @param ctx the parse tree
	 */
	enterSwitchCase?: (ctx: SwitchCaseContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.switchCase`.
	 * @param ctx the parse tree
	 */
	exitSwitchCase?: (ctx: SwitchCaseContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.throwStatement`.
	 * @param ctx the parse tree
	 */
	enterThrowStatement?: (ctx: ThrowStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.throwStatement`.
	 * @param ctx the parse tree
	 */
	exitThrowStatement?: (ctx: ThrowStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.forInStatement`.
	 * @param ctx the parse tree
	 */
	enterForInStatement?: (ctx: ForInStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.forInStatement`.
	 * @param ctx the parse tree
	 */
	exitForInStatement?: (ctx: ForInStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.forEachStatement`.
	 * @param ctx the parse tree
	 */
	enterForEachStatement?: (ctx: ForEachStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.forEachStatement`.
	 * @param ctx the parse tree
	 */
	exitForEachStatement?: (ctx: ForEachStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.returnStatement`.
	 * @param ctx the parse tree
	 */
	enterReturnStatement?: (ctx: ReturnStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.returnStatement`.
	 * @param ctx the parse tree
	 */
	exitReturnStatement?: (ctx: ReturnStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.doWhileStatement`.
	 * @param ctx the parse tree
	 */
	enterDoWhileStatement?: (ctx: DoWhileStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.doWhileStatement`.
	 * @param ctx the parse tree
	 */
	exitDoWhileStatement?: (ctx: DoWhileStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.whileStatement`.
	 * @param ctx the parse tree
	 */
	enterWhileStatement?: (ctx: WhileStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.whileStatement`.
	 * @param ctx the parse tree
	 */
	exitWhileStatement?: (ctx: WhileStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.forStatement`.
	 * @param ctx the parse tree
	 */
	enterForStatement?: (ctx: ForStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.forStatement`.
	 * @param ctx the parse tree
	 */
	exitForStatement?: (ctx: ForStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.forUpdate`.
	 * @param ctx the parse tree
	 */
	enterForUpdate?: (ctx: ForUpdateContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.forUpdate`.
	 * @param ctx the parse tree
	 */
	exitForUpdate?: (ctx: ForUpdateContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.forInit`.
	 * @param ctx the parse tree
	 */
	enterForInit?: (ctx: ForInitContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.forInit`.
	 * @param ctx the parse tree
	 */
	exitForInit?: (ctx: ForInitContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.forInitItem`.
	 * @param ctx the parse tree
	 */
	enterForInitItem?: (ctx: ForInitItemContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.forInitItem`.
	 * @param ctx the parse tree
	 */
	exitForInitItem?: (ctx: ForInitItemContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.tryCatchStatement`.
	 * @param ctx the parse tree
	 */
	enterTryCatchStatement?: (ctx: TryCatchStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.tryCatchStatement`.
	 * @param ctx the parse tree
	 */
	exitTryCatchStatement?: (ctx: TryCatchStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.emptyStatement`.
	 * @param ctx the parse tree
	 */
	enterEmptyStatement?: (ctx: EmptyStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.emptyStatement`.
	 * @param ctx the parse tree
	 */
	exitEmptyStatement?: (ctx: EmptyStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.sayStatement`.
	 * @param ctx the parse tree
	 */
	enterSayStatement?: (ctx: SayStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.sayStatement`.
	 * @param ctx the parse tree
	 */
	exitSayStatement?: (ctx: SayStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.assignmentStatement`.
	 * @param ctx the parse tree
	 */
	enterAssignmentStatement?: (ctx: AssignmentStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.assignmentStatement`.
	 * @param ctx the parse tree
	 */
	exitAssignmentStatement?: (ctx: AssignmentStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.localVarDecl`.
	 * @param ctx the parse tree
	 */
	enterLocalVarDecl?: (ctx: LocalVarDeclContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.localVarDecl`.
	 * @param ctx the parse tree
	 */
	exitLocalVarDecl?: (ctx: LocalVarDeclContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.ifStatement`.
	 * @param ctx the parse tree
	 */
	enterIfStatement?: (ctx: IfStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.ifStatement`.
	 * @param ctx the parse tree
	 */
	exitIfStatement?: (ctx: IfStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 */
	enterEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 */
	exitEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.assignmentExpr`.
	 * @param ctx the parse tree
	 */
	enterAssignmentExpr?: (ctx: AssignmentExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.assignmentExpr`.
	 * @param ctx the parse tree
	 */
	exitAssignmentExpr?: (ctx: AssignmentExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.assignmentOp`.
	 * @param ctx the parse tree
	 */
	enterAssignmentOp?: (ctx: AssignmentOpContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.assignmentOp`.
	 * @param ctx the parse tree
	 */
	exitAssignmentOp?: (ctx: AssignmentOpContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.conditionalExpr`.
	 * @param ctx the parse tree
	 */
	enterConditionalExpr?: (ctx: ConditionalExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.conditionalExpr`.
	 * @param ctx the parse tree
	 */
	exitConditionalExpr?: (ctx: ConditionalExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.ifNilExpr`.
	 * @param ctx the parse tree
	 */
	enterIfNilExpr?: (ctx: IfNilExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.ifNilExpr`.
	 * @param ctx the parse tree
	 */
	exitIfNilExpr?: (ctx: IfNilExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.logicalOrExpr`.
	 * @param ctx the parse tree
	 */
	enterLogicalOrExpr?: (ctx: LogicalOrExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.logicalOrExpr`.
	 * @param ctx the parse tree
	 */
	exitLogicalOrExpr?: (ctx: LogicalOrExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.logicalAndExpr`.
	 * @param ctx the parse tree
	 */
	enterLogicalAndExpr?: (ctx: LogicalAndExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.logicalAndExpr`.
	 * @param ctx the parse tree
	 */
	exitLogicalAndExpr?: (ctx: LogicalAndExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.bitwiseOrExpr`.
	 * @param ctx the parse tree
	 */
	enterBitwiseOrExpr?: (ctx: BitwiseOrExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.bitwiseOrExpr`.
	 * @param ctx the parse tree
	 */
	exitBitwiseOrExpr?: (ctx: BitwiseOrExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.bitwiseXorExpr`.
	 * @param ctx the parse tree
	 */
	enterBitwiseXorExpr?: (ctx: BitwiseXorExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.bitwiseXorExpr`.
	 * @param ctx the parse tree
	 */
	exitBitwiseXorExpr?: (ctx: BitwiseXorExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.bitwiseAndExpr`.
	 * @param ctx the parse tree
	 */
	enterBitwiseAndExpr?: (ctx: BitwiseAndExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.bitwiseAndExpr`.
	 * @param ctx the parse tree
	 */
	exitBitwiseAndExpr?: (ctx: BitwiseAndExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.equalityExpr`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpr?: (ctx: EqualityExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.equalityExpr`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpr?: (ctx: EqualityExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 */
	enterEqualitySuffix?: (ctx: EqualitySuffixContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 */
	exitEqualitySuffix?: (ctx: EqualitySuffixContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.relationalExpr`.
	 * @param ctx the parse tree
	 */
	enterRelationalExpr?: (ctx: RelationalExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.relationalExpr`.
	 * @param ctx the parse tree
	 */
	exitRelationalExpr?: (ctx: RelationalExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.relationalOp`.
	 * @param ctx the parse tree
	 */
	enterRelationalOp?: (ctx: RelationalOpContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.relationalOp`.
	 * @param ctx the parse tree
	 */
	exitRelationalOp?: (ctx: RelationalOpContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.shiftExpr`.
	 * @param ctx the parse tree
	 */
	enterShiftExpr?: (ctx: ShiftExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.shiftExpr`.
	 * @param ctx the parse tree
	 */
	exitShiftExpr?: (ctx: ShiftExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.additiveExpr`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpr?: (ctx: AdditiveExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.additiveExpr`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpr?: (ctx: AdditiveExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.multiplicativeExpr`.
	 * @param ctx the parse tree
	 */
	enterMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.multiplicativeExpr`.
	 * @param ctx the parse tree
	 */
	exitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.unaryExpr`.
	 * @param ctx the parse tree
	 */
	enterUnaryExpr?: (ctx: UnaryExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.unaryExpr`.
	 * @param ctx the parse tree
	 */
	exitUnaryExpr?: (ctx: UnaryExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.prefixOp`.
	 * @param ctx the parse tree
	 */
	enterPrefixOp?: (ctx: PrefixOpContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.prefixOp`.
	 * @param ctx the parse tree
	 */
	exitPrefixOp?: (ctx: PrefixOpContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.postfixExpr`.
	 * @param ctx the parse tree
	 */
	enterPostfixExpr?: (ctx: PostfixExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.postfixExpr`.
	 * @param ctx the parse tree
	 */
	exitPostfixExpr?: (ctx: PostfixExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.postfixSuffix`.
	 * @param ctx the parse tree
	 */
	enterPostfixSuffix?: (ctx: PostfixSuffixContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.postfixSuffix`.
	 * @param ctx the parse tree
	 */
	exitPostfixSuffix?: (ctx: PostfixSuffixContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.primaryExpr`.
	 * @param ctx the parse tree
	 */
	enterPrimaryExpr?: (ctx: PrimaryExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.primaryExpr`.
	 * @param ctx the parse tree
	 */
	exitPrimaryExpr?: (ctx: PrimaryExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterPrimary?: (ctx: PrimaryContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitPrimary?: (ctx: PrimaryContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.memberExpr`.
	 * @param ctx the parse tree
	 */
	enterMemberExpr?: (ctx: MemberExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.memberExpr`.
	 * @param ctx the parse tree
	 */
	exitMemberExpr?: (ctx: MemberExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.identifierAtom`.
	 * @param ctx the parse tree
	 */
	enterIdentifierAtom?: (ctx: IdentifierAtomContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.identifierAtom`.
	 * @param ctx the parse tree
	 */
	exitIdentifierAtom?: (ctx: IdentifierAtomContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.softKeyword`.
	 * @param ctx the parse tree
	 */
	enterSoftKeyword?: (ctx: SoftKeywordContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.softKeyword`.
	 * @param ctx the parse tree
	 */
	exitSoftKeyword?: (ctx: SoftKeywordContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.params`.
	 * @param ctx the parse tree
	 */
	enterParams?: (ctx: ParamsContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.params`.
	 * @param ctx the parse tree
	 */
	exitParams?: (ctx: ParamsContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3v2Parser.param`.
	 * @param ctx the parse tree
	 */
	enterParam?: (ctx: ParamContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3v2Parser.param`.
	 * @param ctx the parse tree
	 */
	exitParam?: (ctx: ParamContext) => void;
}

