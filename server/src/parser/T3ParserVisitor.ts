// Generated from client/src/extension/modules/parser/T3Parser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { InheritedAtomContext } from "./T3ParserParser";
import { HexAtomContext } from "./T3ParserParser";
import { NumberAtomContext } from "./T3ParserParser";
import { ReferenceAtomContext } from "./T3ParserParser";
import { IdAtomContext } from "./T3ParserParser";
import { DoubleQuotestringAtomContext } from "./T3ParserParser";
import { SingleQuotestringAtomContext } from "./T3ParserParser";
import { RegexpStringAtomContext } from "./T3ParserParser";
import { BooleanAtomContext } from "./T3ParserParser";
import { NilAtomContext } from "./T3ParserParser";
import { ArrayExprContext } from "./T3ParserParser";
import { MemberExprContext } from "./T3ParserParser";
import { IndexExprContext } from "./T3ParserParser";
import { CommaExprContext } from "./T3ParserParser";
import { RangeExprContext } from "./T3ParserParser";
import { DelegatedExpressionContext } from "./T3ParserParser";
import { InheritedExpressionContext } from "./T3ParserParser";
import { TransientExpressionContext } from "./T3ParserParser";
import { PrimaryExprContext } from "./T3ParserParser";
import { CallWithParamsExprContext } from "./T3ParserParser";
import { ExprWithParenExprContext } from "./T3ParserParser";
import { ExprWithAnonymousObjectExprContext } from "./T3ParserParser";
import { ParenExpr2Context } from "./T3ParserParser";
import { LocalExprContext } from "./T3ParserParser";
import { StaticExprContext } from "./T3ParserParser";
import { NewExprContext } from "./T3ParserParser";
import { ReferenceExprContext } from "./T3ParserParser";
import { NotInExprContext } from "./T3ParserParser";
import { IsExprContext } from "./T3ParserParser";
import { InExprContext } from "./T3ParserParser";
import { AssignmentExprContext } from "./T3ParserParser";
import { IfNilExprContext } from "./T3ParserParser";
import { AnonymousObjectExprContext } from "./T3ParserParser";
import { BitwiseExprContext } from "./T3ParserParser";
import { AndOrExprContext } from "./T3ParserParser";
import { PowerOfExprContext } from "./T3ParserParser";
import { MultiplicationExprContext } from "./T3ParserParser";
import { AdditiveExprContext } from "./T3ParserParser";
import { RelationalExprContext } from "./T3ParserParser";
import { EqualityExprContext } from "./T3ParserParser";
import { ArrowExprContext } from "./T3ParserParser";
import { ArrowExpr2Context } from "./T3ParserParser";
import { ArrowExpr3Context } from "./T3ParserParser";
import { UnaryExprContext } from "./T3ParserParser";
import { PostFixExprContext } from "./T3ParserParser";
import { TernaryExprContext } from "./T3ParserParser";
import { AnonymousFunctionExprContext } from "./T3ParserParser";
import { ProgramContext } from "./T3ParserParser";
import { DirectiveContext } from "./T3ParserParser";
import { GrammarDeclarationContext } from "./T3ParserParser";
import { GrammarRulesContext } from "./T3ParserParser";
import { ItemListContext } from "./T3ParserParser";
import { QualifiersContext } from "./T3ParserParser";
import { ItemContext } from "./T3ParserParser";
import { TemplateDeclarationContext } from "./T3ParserParser";
import { EnumDeclarationContext } from "./T3ParserParser";
import { PropertyDeclarationContext } from "./T3ParserParser";
import { DictionaryDeclarationContext } from "./T3ParserParser";
import { ExportDeclarationContext } from "./T3ParserParser";
import { IntrinsicDeclarationContext } from "./T3ParserParser";
import { IntrinsicMethodDeclarationContext } from "./T3ParserParser";
import { ObjectDeclarationContext } from "./T3ParserParser";
import { TemplateExprContext } from "./T3ParserParser";
import { ArrayContext } from "./T3ParserParser";
import { CurlyObjectBodyContext } from "./T3ParserParser";
import { SemiColonEndedObjectBodyContext } from "./T3ParserParser";
import { SuperTypesContext } from "./T3ParserParser";
import { ObjectBodyContext } from "./T3ParserParser";
import { PropertyContext } from "./T3ParserParser";
import { DictionaryPropertyContext } from "./T3ParserParser";
import { PropertySetContext } from "./T3ParserParser";
import { ParamsWithWildcardContext } from "./T3ParserParser";
import { FunctionDeclarationContext } from "./T3ParserParser";
import { FunctionHeadContext } from "./T3ParserParser";
import { CodeBlockContext } from "./T3ParserParser";
import { StatsContext } from "./T3ParserParser";
import { GotoStatementContext } from "./T3ParserParser";
import { BreakStatementContext } from "./T3ParserParser";
import { ContinueStatementContext } from "./T3ParserParser";
import { LabelStatementContext } from "./T3ParserParser";
import { SwitchStatementContext } from "./T3ParserParser";
import { ThrowStatementContext } from "./T3ParserParser";
import { ForInStatementContext } from "./T3ParserParser";
import { ForEachStatementContext } from "./T3ParserParser";
import { ReturnStatementContext } from "./T3ParserParser";
import { DoWhileStatementContext } from "./T3ParserParser";
import { WhileStatementContext } from "./T3ParserParser";
import { ForStatementContext } from "./T3ParserParser";
import { TryCatchStatementContext } from "./T3ParserParser";
import { CallStatementContext } from "./T3ParserParser";
import { EmptyStatementContext } from "./T3ParserParser";
import { SayStatementContext } from "./T3ParserParser";
import { AssignmentStatementContext } from "./T3ParserParser";
import { IfStatementContext } from "./T3ParserParser";
import { EnclosedExprCodeBlockContext } from "./T3ParserParser";
import { ExprContext } from "./T3ParserParser";
import { PrimaryContext } from "./T3ParserParser";
import { IdentifierAtomContext } from "./T3ParserParser";
import { ParamsContext } from "./T3ParserParser";
import { OptionallyTypedOptionalIdContext } from "./T3ParserParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `T3ParserParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface T3ParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInheritedAtom?: (ctx: InheritedAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `hexAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHexAtom?: (ctx: HexAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `numberAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberAtom?: (ctx: NumberAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `referenceAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReferenceAtom?: (ctx: ReferenceAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `idAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdAtom?: (ctx: IdAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `doubleQuotestringAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoubleQuotestringAtom?: (ctx: DoubleQuotestringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `singleQuotestringAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingleQuotestringAtom?: (ctx: SingleQuotestringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegexpStringAtom?: (ctx: RegexpStringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `booleanAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanAtom?: (ctx: BooleanAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `nilAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNilAtom?: (ctx: NilAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `arrayExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayExpr?: (ctx: ArrayExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `memberExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberExpr?: (ctx: MemberExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `indexExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexExpr?: (ctx: IndexExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `commaExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommaExpr?: (ctx: CommaExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `rangeExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRangeExpr?: (ctx: RangeExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `delegatedExpression`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelegatedExpression?: (ctx: DelegatedExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `inheritedExpression`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInheritedExpression?: (ctx: InheritedExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `transientExpression`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTransientExpression?: (ctx: TransientExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `primaryExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimaryExpr?: (ctx: PrimaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `callWithParamsExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallWithParamsExpr?: (ctx: CallWithParamsExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `exprWithParenExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprWithParenExpr?: (ctx: ExprWithParenExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `exprWithAnonymousObjectExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprWithAnonymousObjectExpr?: (ctx: ExprWithAnonymousObjectExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `parenExpr2`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenExpr2?: (ctx: ParenExpr2Context) => Result;

	/**
	 * Visit a parse tree produced by the `localExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocalExpr?: (ctx: LocalExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `staticExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStaticExpr?: (ctx: StaticExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `newExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNewExpr?: (ctx: NewExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `referenceExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReferenceExpr?: (ctx: ReferenceExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `notInExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotInExpr?: (ctx: NotInExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `isExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsExpr?: (ctx: IsExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `inExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInExpr?: (ctx: InExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `assignmentExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentExpr?: (ctx: AssignmentExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ifNilExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfNilExpr?: (ctx: IfNilExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `anonymousObjectExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnonymousObjectExpr?: (ctx: AnonymousObjectExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `bitwiseExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitwiseExpr?: (ctx: BitwiseExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `andOrExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndOrExpr?: (ctx: AndOrExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `powerOfExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPowerOfExpr?: (ctx: PowerOfExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `multiplicationExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicationExpr?: (ctx: MultiplicationExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `additiveExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpr?: (ctx: AdditiveExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `relationalExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelationalExpr?: (ctx: RelationalExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `equalityExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityExpr?: (ctx: EqualityExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `arrowExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowExpr?: (ctx: ArrowExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `arrowExpr2`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowExpr2?: (ctx: ArrowExpr2Context) => Result;

	/**
	 * Visit a parse tree produced by the `arrowExpr3`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowExpr3?: (ctx: ArrowExpr3Context) => Result;

	/**
	 * Visit a parse tree produced by the `unaryExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryExpr?: (ctx: UnaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `postFixExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostFixExpr?: (ctx: PostFixExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ternaryExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTernaryExpr?: (ctx: TernaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `anonymousFunctionExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnonymousFunctionExpr?: (ctx: AnonymousFunctionExprContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirective?: (ctx: DirectiveContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.grammarDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrammarDeclaration?: (ctx: GrammarDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.grammarRules`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrammarRules?: (ctx: GrammarRulesContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.itemList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitItemList?: (ctx: ItemListContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.qualifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiers?: (ctx: QualifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitItem?: (ctx: ItemContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.templateDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemplateDeclaration?: (ctx: TemplateDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.enumDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumDeclaration?: (ctx: EnumDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.propertyDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertyDeclaration?: (ctx: PropertyDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.exportDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExportDeclaration?: (ctx: ExportDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.intrinsicDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntrinsicDeclaration?: (ctx: IntrinsicDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.intrinsicMethodDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntrinsicMethodDeclaration?: (ctx: IntrinsicMethodDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.objectDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectDeclaration?: (ctx: ObjectDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.templateExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemplateExpr?: (ctx: TemplateExprContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray?: (ctx: ArrayContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.curlyObjectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.superTypes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSuperTypes?: (ctx: SuperTypesContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.objectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectBody?: (ctx: ObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.property`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty?: (ctx: PropertyContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.dictionaryProperty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionaryProperty?: (ctx: DictionaryPropertyContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.propertySet`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertySet?: (ctx: PropertySetContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.functionDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.functionHead`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionHead?: (ctx: FunctionHeadContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.codeBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodeBlock?: (ctx: CodeBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.stats`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStats?: (ctx: StatsContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.gotoStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGotoStatement?: (ctx: GotoStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.breakStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreakStatement?: (ctx: BreakStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.continueStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinueStatement?: (ctx: ContinueStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.labelStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLabelStatement?: (ctx: LabelStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.switchStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitchStatement?: (ctx: SwitchStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.throwStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThrowStatement?: (ctx: ThrowStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.forInStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForInStatement?: (ctx: ForInStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.forEachStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForEachStatement?: (ctx: ForEachStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.returnStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnStatement?: (ctx: ReturnStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.doWhileStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoWhileStatement?: (ctx: DoWhileStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.whileStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhileStatement?: (ctx: WhileStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.forStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForStatement?: (ctx: ForStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.tryCatchStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTryCatchStatement?: (ctx: TryCatchStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.callStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallStatement?: (ctx: CallStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.emptyStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptyStatement?: (ctx: EmptyStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.sayStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSayStatement?: (ctx: SayStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.assignmentStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentStatement?: (ctx: AssignmentStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.ifStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStatement?: (ctx: IfStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary?: (ctx: PrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.identifierAtom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierAtom?: (ctx: IdentifierAtomContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.params`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParams?: (ctx: ParamsContext) => Result;

	/**
	 * Visit a parse tree produced by `T3ParserParser.optionallyTypedOptionalId`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptionallyTypedOptionalId?: (ctx: OptionallyTypedOptionalIdContext) => Result;
}

