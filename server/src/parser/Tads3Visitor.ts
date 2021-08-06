// Generated from server/src/parser/Tads3.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { InheritedAtomContext } from "./Tads3Parser";
import { HexAtomContext } from "./Tads3Parser";
import { NumberAtomContext } from "./Tads3Parser";
import { ReferenceAtomContext } from "./Tads3Parser";
import { IdAtomContext } from "./Tads3Parser";
import { DoubleQuotestringAtomContext } from "./Tads3Parser";
import { SingleQuotestringAtomContext } from "./Tads3Parser";
import { RegexpStringAtomContext } from "./Tads3Parser";
import { BooleanAtomContext } from "./Tads3Parser";
import { NilAtomContext } from "./Tads3Parser";
import { ArrayExprContext } from "./Tads3Parser";
import { MemberExprContext } from "./Tads3Parser";
import { IndexExprContext } from "./Tads3Parser";
import { CommaExprContext } from "./Tads3Parser";
import { RangeExprContext } from "./Tads3Parser";
import { DelegatedExpressionContext } from "./Tads3Parser";
import { InheritedExpressionContext } from "./Tads3Parser";
import { TransientExpressionContext } from "./Tads3Parser";
import { PrimaryExprContext } from "./Tads3Parser";
import { CallWithParamsExprContext } from "./Tads3Parser";
import { ExprWithParenExprContext } from "./Tads3Parser";
import { ExprWithAnonymousObjectExprContext } from "./Tads3Parser";
import { ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext } from "./Tads3Parser";
import { ParenExpr2Context } from "./Tads3Parser";
import { LocalExprContext } from "./Tads3Parser";
import { StaticExprContext } from "./Tads3Parser";
import { NewExprContext } from "./Tads3Parser";
import { ReferenceExprContext } from "./Tads3Parser";
import { NotInExprContext } from "./Tads3Parser";
import { IsExprContext } from "./Tads3Parser";
import { InExprContext } from "./Tads3Parser";
import { AssignmentExprContext } from "./Tads3Parser";
import { IfNilExprContext } from "./Tads3Parser";
import { AnonymousObjectExprContext } from "./Tads3Parser";
import { BitwiseExprContext } from "./Tads3Parser";
import { AndOrExprContext } from "./Tads3Parser";
import { PowerOfExprContext } from "./Tads3Parser";
import { MultiplicationExprContext } from "./Tads3Parser";
import { AdditiveExprContext } from "./Tads3Parser";
import { RelationalExprContext } from "./Tads3Parser";
import { EqualityExprContext } from "./Tads3Parser";
import { ArrowExprContext } from "./Tads3Parser";
import { ArrowExpr2Context } from "./Tads3Parser";
import { ArrowExpr3Context } from "./Tads3Parser";
import { UnaryExprContext } from "./Tads3Parser";
import { PostFixExprContext } from "./Tads3Parser";
import { TernaryExprContext } from "./Tads3Parser";
import { AnonymousFunctionExprContext } from "./Tads3Parser";
import { ProgramContext } from "./Tads3Parser";
import { DirectiveContext } from "./Tads3Parser";
import { PragmaDirectiveContext } from "./Tads3Parser";
import { GrammarDeclarationContext } from "./Tads3Parser";
import { GrammarRulesContext } from "./Tads3Parser";
import { ItemListContext } from "./Tads3Parser";
import { QualifiersContext } from "./Tads3Parser";
import { ItemContext } from "./Tads3Parser";
import { TemplateDeclarationContext } from "./Tads3Parser";
import { EnumDeclarationContext } from "./Tads3Parser";
import { PropertyDeclarationContext } from "./Tads3Parser";
import { DictionaryDeclarationContext } from "./Tads3Parser";
import { ExportDeclarationContext } from "./Tads3Parser";
import { IntrinsicDeclarationContext } from "./Tads3Parser";
import { IntrinsicMethodDeclarationContext } from "./Tads3Parser";
import { ObjectDeclarationContext } from "./Tads3Parser";
import { TemplateExprContext } from "./Tads3Parser";
import { ArrayContext } from "./Tads3Parser";
import { CurlyObjectBodyContext } from "./Tads3Parser";
import { SemiColonEndedObjectBodyContext } from "./Tads3Parser";
import { SuperTypesContext } from "./Tads3Parser";
import { ObjectBodyContext } from "./Tads3Parser";
import { PropertyContext } from "./Tads3Parser";
import { DictionaryPropertyContext } from "./Tads3Parser";
import { PropertySetContext } from "./Tads3Parser";
import { ParamsWithWildcardContext } from "./Tads3Parser";
import { FunctionDeclarationContext } from "./Tads3Parser";
import { OperatorOverrideContext } from "./Tads3Parser";
import { FunctionHeadContext } from "./Tads3Parser";
import { CodeBlockContext } from "./Tads3Parser";
import { StatsContext } from "./Tads3Parser";
import { InnerCodeBlockContext } from "./Tads3Parser";
import { GotoStatementContext } from "./Tads3Parser";
import { BreakStatementContext } from "./Tads3Parser";
import { ContinueStatementContext } from "./Tads3Parser";
import { LabelStatementContext } from "./Tads3Parser";
import { SwitchStatementContext } from "./Tads3Parser";
import { ThrowStatementContext } from "./Tads3Parser";
import { ForInStatementContext } from "./Tads3Parser";
import { ForEachStatementContext } from "./Tads3Parser";
import { ReturnStatementContext } from "./Tads3Parser";
import { DoWhileStatementContext } from "./Tads3Parser";
import { WhileStatementContext } from "./Tads3Parser";
import { ForStatementContext } from "./Tads3Parser";
import { TryCatchStatementContext } from "./Tads3Parser";
import { CallStatementContext } from "./Tads3Parser";
import { EmptyStatementContext } from "./Tads3Parser";
import { SayStatementContext } from "./Tads3Parser";
import { AssignmentStatementContext } from "./Tads3Parser";
import { IfStatementContext } from "./Tads3Parser";
import { EnclosedExprCodeBlockContext } from "./Tads3Parser";
import { ExprContext } from "./Tads3Parser";
import { PrimaryContext } from "./Tads3Parser";
import { IdentifierAtomContext } from "./Tads3Parser";
import { ParamsContext } from "./Tads3Parser";
import { OptionallyTypedOptionalIdContext } from "./Tads3Parser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `Tads3Parser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface Tads3Visitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInheritedAtom?: (ctx: InheritedAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `hexAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHexAtom?: (ctx: HexAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `numberAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberAtom?: (ctx: NumberAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `referenceAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReferenceAtom?: (ctx: ReferenceAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `idAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdAtom?: (ctx: IdAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `doubleQuotestringAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoubleQuotestringAtom?: (ctx: DoubleQuotestringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `singleQuotestringAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingleQuotestringAtom?: (ctx: SingleQuotestringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegexpStringAtom?: (ctx: RegexpStringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `booleanAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanAtom?: (ctx: BooleanAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `nilAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNilAtom?: (ctx: NilAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `arrayExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayExpr?: (ctx: ArrayExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `memberExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberExpr?: (ctx: MemberExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `indexExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexExpr?: (ctx: IndexExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `commaExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommaExpr?: (ctx: CommaExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `rangeExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRangeExpr?: (ctx: RangeExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `delegatedExpression`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelegatedExpression?: (ctx: DelegatedExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `inheritedExpression`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInheritedExpression?: (ctx: InheritedExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `transientExpression`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTransientExpression?: (ctx: TransientExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `primaryExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimaryExpr?: (ctx: PrimaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `callWithParamsExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallWithParamsExpr?: (ctx: CallWithParamsExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `exprWithParenExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprWithParenExpr?: (ctx: ExprWithParenExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `exprWithAnonymousObjectExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprWithAnonymousObjectExpr?: (ctx: ExprWithAnonymousObjectExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `exprWithAnonymousObjectUsingMultipleSuperTypesExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprWithAnonymousObjectUsingMultipleSuperTypesExpr?: (ctx: ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `parenExpr2`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenExpr2?: (ctx: ParenExpr2Context) => Result;

	/**
	 * Visit a parse tree produced by the `localExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocalExpr?: (ctx: LocalExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `staticExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStaticExpr?: (ctx: StaticExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `newExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNewExpr?: (ctx: NewExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `referenceExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReferenceExpr?: (ctx: ReferenceExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `notInExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotInExpr?: (ctx: NotInExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `isExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsExpr?: (ctx: IsExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `inExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInExpr?: (ctx: InExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `assignmentExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentExpr?: (ctx: AssignmentExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ifNilExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfNilExpr?: (ctx: IfNilExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `anonymousObjectExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnonymousObjectExpr?: (ctx: AnonymousObjectExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `bitwiseExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitwiseExpr?: (ctx: BitwiseExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `andOrExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndOrExpr?: (ctx: AndOrExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `powerOfExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPowerOfExpr?: (ctx: PowerOfExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `multiplicationExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicationExpr?: (ctx: MultiplicationExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `additiveExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpr?: (ctx: AdditiveExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `relationalExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelationalExpr?: (ctx: RelationalExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `equalityExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityExpr?: (ctx: EqualityExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `arrowExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowExpr?: (ctx: ArrowExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `arrowExpr2`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowExpr2?: (ctx: ArrowExpr2Context) => Result;

	/**
	 * Visit a parse tree produced by the `arrowExpr3`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowExpr3?: (ctx: ArrowExpr3Context) => Result;

	/**
	 * Visit a parse tree produced by the `unaryExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryExpr?: (ctx: UnaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `postFixExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostFixExpr?: (ctx: PostFixExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ternaryExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTernaryExpr?: (ctx: TernaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `anonymousFunctionExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnonymousFunctionExpr?: (ctx: AnonymousFunctionExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirective?: (ctx: DirectiveContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.pragmaDirective`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPragmaDirective?: (ctx: PragmaDirectiveContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.grammarDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrammarDeclaration?: (ctx: GrammarDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.grammarRules`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrammarRules?: (ctx: GrammarRulesContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.itemList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitItemList?: (ctx: ItemListContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.qualifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiers?: (ctx: QualifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitItem?: (ctx: ItemContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.templateDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemplateDeclaration?: (ctx: TemplateDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.enumDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumDeclaration?: (ctx: EnumDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.propertyDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertyDeclaration?: (ctx: PropertyDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.exportDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExportDeclaration?: (ctx: ExportDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.intrinsicDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntrinsicDeclaration?: (ctx: IntrinsicDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.intrinsicMethodDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntrinsicMethodDeclaration?: (ctx: IntrinsicMethodDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.objectDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectDeclaration?: (ctx: ObjectDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.templateExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemplateExpr?: (ctx: TemplateExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray?: (ctx: ArrayContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.curlyObjectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.superTypes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSuperTypes?: (ctx: SuperTypesContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.objectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectBody?: (ctx: ObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.property`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty?: (ctx: PropertyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.dictionaryProperty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionaryProperty?: (ctx: DictionaryPropertyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.propertySet`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertySet?: (ctx: PropertySetContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.functionDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.operatorOverride`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperatorOverride?: (ctx: OperatorOverrideContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.functionHead`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionHead?: (ctx: FunctionHeadContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.codeBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodeBlock?: (ctx: CodeBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.stats`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStats?: (ctx: StatsContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.innerCodeBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInnerCodeBlock?: (ctx: InnerCodeBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.gotoStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGotoStatement?: (ctx: GotoStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.breakStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreakStatement?: (ctx: BreakStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.continueStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinueStatement?: (ctx: ContinueStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.labelStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLabelStatement?: (ctx: LabelStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.switchStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitchStatement?: (ctx: SwitchStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.throwStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThrowStatement?: (ctx: ThrowStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.forInStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForInStatement?: (ctx: ForInStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.forEachStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForEachStatement?: (ctx: ForEachStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.returnStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnStatement?: (ctx: ReturnStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.doWhileStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoWhileStatement?: (ctx: DoWhileStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.whileStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhileStatement?: (ctx: WhileStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.forStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForStatement?: (ctx: ForStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.tryCatchStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTryCatchStatement?: (ctx: TryCatchStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.callStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallStatement?: (ctx: CallStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.emptyStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptyStatement?: (ctx: EmptyStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.sayStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSayStatement?: (ctx: SayStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.assignmentStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentStatement?: (ctx: AssignmentStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.ifStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStatement?: (ctx: IfStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary?: (ctx: PrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.identifierAtom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierAtom?: (ctx: IdentifierAtomContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.params`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParams?: (ctx: ParamsContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3Parser.optionallyTypedOptionalId`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptionallyTypedOptionalId?: (ctx: OptionallyTypedOptionalIdContext) => Result;
}

