// Generated from server/src/parser/Tads2.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { InheritedAtomContext } from "./Tads2Parser";
import { HexAtomContext } from "./Tads2Parser";
import { NumberAtomContext } from "./Tads2Parser";
import { ReferenceAtomContext } from "./Tads2Parser";
import { IdAtomContext } from "./Tads2Parser";
import { SingleQuotestringAtomContext } from "./Tads2Parser";
import { DoubleQuotestringAtomContext } from "./Tads2Parser";
import { RegexpStringAtomContext } from "./Tads2Parser";
import { BooleanAtomContext } from "./Tads2Parser";
import { NilAtomContext } from "./Tads2Parser";
import { ArrayExprContext } from "./Tads2Parser";
import { MemberExprContext } from "./Tads2Parser";
import { IndexExprContext } from "./Tads2Parser";
import { CommaExprContext } from "./Tads2Parser";
import { RangeExprContext } from "./Tads2Parser";
import { DelegatedExpressionContext } from "./Tads2Parser";
import { InheritedExpressionContext } from "./Tads2Parser";
import { TransientExpressionContext } from "./Tads2Parser";
import { PrimaryExprContext } from "./Tads2Parser";
import { CallWithParamsExprContext } from "./Tads2Parser";
import { ExprWithParenExprContext } from "./Tads2Parser";
import { ExprWithAnonymousObjectExprContext } from "./Tads2Parser";
import { ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext } from "./Tads2Parser";
import { ParenExpr2Context } from "./Tads2Parser";
import { LocalExprContext } from "./Tads2Parser";
import { StaticExprContext } from "./Tads2Parser";
import { NewExprContext } from "./Tads2Parser";
import { ReferenceExprContext } from "./Tads2Parser";
import { NotInExprContext } from "./Tads2Parser";
import { IsExprContext } from "./Tads2Parser";
import { InExprContext } from "./Tads2Parser";
import { AssignmentExprContext } from "./Tads2Parser";
import { IfNilExprContext } from "./Tads2Parser";
import { AnonymousObjectExprContext } from "./Tads2Parser";
import { BitwiseExprContext } from "./Tads2Parser";
import { AndOrExprContext } from "./Tads2Parser";
import { PowerOfExprContext } from "./Tads2Parser";
import { MultiplicationExprContext } from "./Tads2Parser";
import { AdditiveExprContext } from "./Tads2Parser";
import { RelationalExprContext } from "./Tads2Parser";
import { EqualityExprContext } from "./Tads2Parser";
import { NotEqualityExprContext } from "./Tads2Parser";
import { LiteralNotAndORContext } from "./Tads2Parser";
import { LiteralNotAndOR2Context } from "./Tads2Parser";
import { ArrowExprContext } from "./Tads2Parser";
import { ArrowExpr2Context } from "./Tads2Parser";
import { ArrowExpr3Context } from "./Tads2Parser";
import { UnaryExprContext } from "./Tads2Parser";
import { PostFixExprContext } from "./Tads2Parser";
import { TernaryExprContext } from "./Tads2Parser";
import { AnonymousFunctionExprContext } from "./Tads2Parser";
import { ProgramContext } from "./Tads2Parser";
import { DirectiveContext } from "./Tads2Parser";
import { SpecialWordsDirectiveContext } from "./Tads2Parser";
import { FormatStringDirectiveContext } from "./Tads2Parser";
import { CompoundWordDirectiveContext } from "./Tads2Parser";
import { GrammarDeclarationContext } from "./Tads2Parser";
import { GrammarRulesContext } from "./Tads2Parser";
import { ItemListContext } from "./Tads2Parser";
import { QualifiersContext } from "./Tads2Parser";
import { ItemContext } from "./Tads2Parser";
import { EnumDeclarationContext } from "./Tads2Parser";
import { PropertyDeclarationContext } from "./Tads2Parser";
import { DictionaryDeclarationContext } from "./Tads2Parser";
import { ExportDeclarationContext } from "./Tads2Parser";
import { FunctionDeclarationContext } from "./Tads2Parser";
import { ObjectDeclarationContext } from "./Tads2Parser";
import { ArrayContext } from "./Tads2Parser";
import { CurlyObjectBodyContext } from "./Tads2Parser";
import { SemiColonEndedObjectBodyContext } from "./Tads2Parser";
import { SuperTypesContext } from "./Tads2Parser";
import { ObjectBodyContext } from "./Tads2Parser";
import { PropertyContext } from "./Tads2Parser";
import { ParamsWithWildcardContext } from "./Tads2Parser";
import { MethodContext } from "./Tads2Parser";
import { CodeBlockContext } from "./Tads2Parser";
import { StatsContext } from "./Tads2Parser";
import { InnerCodeBlockContext } from "./Tads2Parser";
import { GotoStatementContext } from "./Tads2Parser";
import { BreakStatementContext } from "./Tads2Parser";
import { ContinueStatementContext } from "./Tads2Parser";
import { LabelStatementContext } from "./Tads2Parser";
import { SwitchStatementContext } from "./Tads2Parser";
import { ThrowStatementContext } from "./Tads2Parser";
import { ForInStatementContext } from "./Tads2Parser";
import { ForEachStatementContext } from "./Tads2Parser";
import { PassStatementContext } from "./Tads2Parser";
import { DeleteStatementContext } from "./Tads2Parser";
import { ReturnStatementContext } from "./Tads2Parser";
import { DoWhileStatementContext } from "./Tads2Parser";
import { WhileStatementContext } from "./Tads2Parser";
import { ForStatementContext } from "./Tads2Parser";
import { TryCatchStatementContext } from "./Tads2Parser";
import { CallStatementContext } from "./Tads2Parser";
import { EmptyStatementContext } from "./Tads2Parser";
import { SayStatementContext } from "./Tads2Parser";
import { AssignmentStatementContext } from "./Tads2Parser";
import { IfStatementContext } from "./Tads2Parser";
import { EnclosedExprCodeBlockContext } from "./Tads2Parser";
import { ExprContext } from "./Tads2Parser";
import { PrimaryContext } from "./Tads2Parser";
import { IdentifierAtomContext } from "./Tads2Parser";
import { ParamsContext } from "./Tads2Parser";
import { OptionallyTypedOptionalIdContext } from "./Tads2Parser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `Tads2Parser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface Tads2Visitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInheritedAtom?: (ctx: InheritedAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `hexAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHexAtom?: (ctx: HexAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `numberAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberAtom?: (ctx: NumberAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `referenceAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReferenceAtom?: (ctx: ReferenceAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `idAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdAtom?: (ctx: IdAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `singleQuotestringAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingleQuotestringAtom?: (ctx: SingleQuotestringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `doubleQuotestringAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoubleQuotestringAtom?: (ctx: DoubleQuotestringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegexpStringAtom?: (ctx: RegexpStringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `booleanAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanAtom?: (ctx: BooleanAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `nilAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNilAtom?: (ctx: NilAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `arrayExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayExpr?: (ctx: ArrayExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `memberExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberExpr?: (ctx: MemberExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `indexExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexExpr?: (ctx: IndexExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `commaExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommaExpr?: (ctx: CommaExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `rangeExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRangeExpr?: (ctx: RangeExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `delegatedExpression`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelegatedExpression?: (ctx: DelegatedExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `inheritedExpression`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInheritedExpression?: (ctx: InheritedExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `transientExpression`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTransientExpression?: (ctx: TransientExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `primaryExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimaryExpr?: (ctx: PrimaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `callWithParamsExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallWithParamsExpr?: (ctx: CallWithParamsExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `exprWithParenExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprWithParenExpr?: (ctx: ExprWithParenExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `exprWithAnonymousObjectExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprWithAnonymousObjectExpr?: (ctx: ExprWithAnonymousObjectExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `exprWithAnonymousObjectUsingMultipleSuperTypesExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprWithAnonymousObjectUsingMultipleSuperTypesExpr?: (ctx: ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `parenExpr2`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenExpr2?: (ctx: ParenExpr2Context) => Result;

	/**
	 * Visit a parse tree produced by the `localExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocalExpr?: (ctx: LocalExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `staticExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStaticExpr?: (ctx: StaticExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `newExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNewExpr?: (ctx: NewExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `referenceExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReferenceExpr?: (ctx: ReferenceExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `notInExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotInExpr?: (ctx: NotInExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `isExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsExpr?: (ctx: IsExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `inExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInExpr?: (ctx: InExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `assignmentExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentExpr?: (ctx: AssignmentExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ifNilExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfNilExpr?: (ctx: IfNilExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `anonymousObjectExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnonymousObjectExpr?: (ctx: AnonymousObjectExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `bitwiseExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitwiseExpr?: (ctx: BitwiseExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `andOrExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndOrExpr?: (ctx: AndOrExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `powerOfExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPowerOfExpr?: (ctx: PowerOfExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `multiplicationExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicationExpr?: (ctx: MultiplicationExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `additiveExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpr?: (ctx: AdditiveExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `relationalExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelationalExpr?: (ctx: RelationalExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `equalityExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityExpr?: (ctx: EqualityExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `notEqualityExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotEqualityExpr?: (ctx: NotEqualityExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `literalNotAndOR`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteralNotAndOR?: (ctx: LiteralNotAndORContext) => Result;

	/**
	 * Visit a parse tree produced by the `literalNotAndOR2`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteralNotAndOR2?: (ctx: LiteralNotAndOR2Context) => Result;

	/**
	 * Visit a parse tree produced by the `arrowExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowExpr?: (ctx: ArrowExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `arrowExpr2`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowExpr2?: (ctx: ArrowExpr2Context) => Result;

	/**
	 * Visit a parse tree produced by the `arrowExpr3`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrowExpr3?: (ctx: ArrowExpr3Context) => Result;

	/**
	 * Visit a parse tree produced by the `unaryExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryExpr?: (ctx: UnaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `postFixExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostFixExpr?: (ctx: PostFixExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ternaryExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTernaryExpr?: (ctx: TernaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `anonymousFunctionExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnonymousFunctionExpr?: (ctx: AnonymousFunctionExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirective?: (ctx: DirectiveContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.specialWordsDirective`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecialWordsDirective?: (ctx: SpecialWordsDirectiveContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.formatStringDirective`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormatStringDirective?: (ctx: FormatStringDirectiveContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.compoundWordDirective`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompoundWordDirective?: (ctx: CompoundWordDirectiveContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.grammarDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrammarDeclaration?: (ctx: GrammarDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.grammarRules`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrammarRules?: (ctx: GrammarRulesContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.itemList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitItemList?: (ctx: ItemListContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.qualifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiers?: (ctx: QualifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitItem?: (ctx: ItemContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.enumDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumDeclaration?: (ctx: EnumDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.propertyDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertyDeclaration?: (ctx: PropertyDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.exportDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExportDeclaration?: (ctx: ExportDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.functionDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.objectDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectDeclaration?: (ctx: ObjectDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray?: (ctx: ArrayContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.curlyObjectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.superTypes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSuperTypes?: (ctx: SuperTypesContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.objectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectBody?: (ctx: ObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.property`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty?: (ctx: PropertyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.method`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethod?: (ctx: MethodContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.codeBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodeBlock?: (ctx: CodeBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.stats`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStats?: (ctx: StatsContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.innerCodeBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInnerCodeBlock?: (ctx: InnerCodeBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.gotoStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGotoStatement?: (ctx: GotoStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.breakStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreakStatement?: (ctx: BreakStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.continueStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinueStatement?: (ctx: ContinueStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.labelStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLabelStatement?: (ctx: LabelStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.switchStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitchStatement?: (ctx: SwitchStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.throwStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThrowStatement?: (ctx: ThrowStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.forInStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForInStatement?: (ctx: ForInStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.forEachStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForEachStatement?: (ctx: ForEachStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.passStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPassStatement?: (ctx: PassStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.deleteStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeleteStatement?: (ctx: DeleteStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.returnStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnStatement?: (ctx: ReturnStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.doWhileStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoWhileStatement?: (ctx: DoWhileStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.whileStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhileStatement?: (ctx: WhileStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.forStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForStatement?: (ctx: ForStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.tryCatchStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTryCatchStatement?: (ctx: TryCatchStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.callStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallStatement?: (ctx: CallStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.emptyStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptyStatement?: (ctx: EmptyStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.sayStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSayStatement?: (ctx: SayStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.assignmentStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentStatement?: (ctx: AssignmentStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.ifStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStatement?: (ctx: IfStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary?: (ctx: PrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.identifierAtom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierAtom?: (ctx: IdentifierAtomContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.params`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParams?: (ctx: ParamsContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads2Parser.optionallyTypedOptionalId`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptionallyTypedOptionalId?: (ctx: OptionallyTypedOptionalIdContext) => Result;
}

