// Generated from server/src/parser/Tads2.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `Tads2Parser`.
 */
export interface Tads2Listener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterInheritedAtom?: (ctx: InheritedAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitInheritedAtom?: (ctx: InheritedAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `hexAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterHexAtom?: (ctx: HexAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `hexAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitHexAtom?: (ctx: HexAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `numberAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterNumberAtom?: (ctx: NumberAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `numberAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitNumberAtom?: (ctx: NumberAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `referenceAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterReferenceAtom?: (ctx: ReferenceAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `referenceAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitReferenceAtom?: (ctx: ReferenceAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `idAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterIdAtom?: (ctx: IdAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `idAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitIdAtom?: (ctx: IdAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `singleQuotestringAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterSingleQuotestringAtom?: (ctx: SingleQuotestringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `singleQuotestringAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitSingleQuotestringAtom?: (ctx: SingleQuotestringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `doubleQuotestringAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterDoubleQuotestringAtom?: (ctx: DoubleQuotestringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `doubleQuotestringAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitDoubleQuotestringAtom?: (ctx: DoubleQuotestringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterRegexpStringAtom?: (ctx: RegexpStringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitRegexpStringAtom?: (ctx: RegexpStringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `booleanAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterBooleanAtom?: (ctx: BooleanAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `booleanAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitBooleanAtom?: (ctx: BooleanAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `nilAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterNilAtom?: (ctx: NilAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `nilAtom`
	 * labeled alternative in `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitNilAtom?: (ctx: NilAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `arrayExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrayExpr?: (ctx: ArrayExprContext) => void;
	/**
	 * Exit a parse tree produced by the `arrayExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrayExpr?: (ctx: ArrayExprContext) => void;

	/**
	 * Enter a parse tree produced by the `memberExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterMemberExpr?: (ctx: MemberExprContext) => void;
	/**
	 * Exit a parse tree produced by the `memberExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitMemberExpr?: (ctx: MemberExprContext) => void;

	/**
	 * Enter a parse tree produced by the `indexExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterIndexExpr?: (ctx: IndexExprContext) => void;
	/**
	 * Exit a parse tree produced by the `indexExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitIndexExpr?: (ctx: IndexExprContext) => void;

	/**
	 * Enter a parse tree produced by the `commaExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterCommaExpr?: (ctx: CommaExprContext) => void;
	/**
	 * Exit a parse tree produced by the `commaExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitCommaExpr?: (ctx: CommaExprContext) => void;

	/**
	 * Enter a parse tree produced by the `rangeExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterRangeExpr?: (ctx: RangeExprContext) => void;
	/**
	 * Exit a parse tree produced by the `rangeExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitRangeExpr?: (ctx: RangeExprContext) => void;

	/**
	 * Enter a parse tree produced by the `delegatedExpression`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterDelegatedExpression?: (ctx: DelegatedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `delegatedExpression`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitDelegatedExpression?: (ctx: DelegatedExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `inheritedExpression`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterInheritedExpression?: (ctx: InheritedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `inheritedExpression`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitInheritedExpression?: (ctx: InheritedExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `transientExpression`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterTransientExpression?: (ctx: TransientExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `transientExpression`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitTransientExpression?: (ctx: TransientExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `primaryExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterPrimaryExpr?: (ctx: PrimaryExprContext) => void;
	/**
	 * Exit a parse tree produced by the `primaryExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitPrimaryExpr?: (ctx: PrimaryExprContext) => void;

	/**
	 * Enter a parse tree produced by the `callWithParamsExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterCallWithParamsExpr?: (ctx: CallWithParamsExprContext) => void;
	/**
	 * Exit a parse tree produced by the `callWithParamsExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitCallWithParamsExpr?: (ctx: CallWithParamsExprContext) => void;

	/**
	 * Enter a parse tree produced by the `exprWithParenExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterExprWithParenExpr?: (ctx: ExprWithParenExprContext) => void;
	/**
	 * Exit a parse tree produced by the `exprWithParenExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitExprWithParenExpr?: (ctx: ExprWithParenExprContext) => void;

	/**
	 * Enter a parse tree produced by the `exprWithAnonymousObjectExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterExprWithAnonymousObjectExpr?: (ctx: ExprWithAnonymousObjectExprContext) => void;
	/**
	 * Exit a parse tree produced by the `exprWithAnonymousObjectExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitExprWithAnonymousObjectExpr?: (ctx: ExprWithAnonymousObjectExprContext) => void;

	/**
	 * Enter a parse tree produced by the `exprWithAnonymousObjectUsingMultipleSuperTypesExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterExprWithAnonymousObjectUsingMultipleSuperTypesExpr?: (ctx: ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext) => void;
	/**
	 * Exit a parse tree produced by the `exprWithAnonymousObjectUsingMultipleSuperTypesExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitExprWithAnonymousObjectUsingMultipleSuperTypesExpr?: (ctx: ExprWithAnonymousObjectUsingMultipleSuperTypesExprContext) => void;

	/**
	 * Enter a parse tree produced by the `parenExpr2`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterParenExpr2?: (ctx: ParenExpr2Context) => void;
	/**
	 * Exit a parse tree produced by the `parenExpr2`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitParenExpr2?: (ctx: ParenExpr2Context) => void;

	/**
	 * Enter a parse tree produced by the `localExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterLocalExpr?: (ctx: LocalExprContext) => void;
	/**
	 * Exit a parse tree produced by the `localExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitLocalExpr?: (ctx: LocalExprContext) => void;

	/**
	 * Enter a parse tree produced by the `staticExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterStaticExpr?: (ctx: StaticExprContext) => void;
	/**
	 * Exit a parse tree produced by the `staticExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitStaticExpr?: (ctx: StaticExprContext) => void;

	/**
	 * Enter a parse tree produced by the `newExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterNewExpr?: (ctx: NewExprContext) => void;
	/**
	 * Exit a parse tree produced by the `newExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitNewExpr?: (ctx: NewExprContext) => void;

	/**
	 * Enter a parse tree produced by the `referenceExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterReferenceExpr?: (ctx: ReferenceExprContext) => void;
	/**
	 * Exit a parse tree produced by the `referenceExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitReferenceExpr?: (ctx: ReferenceExprContext) => void;

	/**
	 * Enter a parse tree produced by the `notInExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterNotInExpr?: (ctx: NotInExprContext) => void;
	/**
	 * Exit a parse tree produced by the `notInExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitNotInExpr?: (ctx: NotInExprContext) => void;

	/**
	 * Enter a parse tree produced by the `isExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterIsExpr?: (ctx: IsExprContext) => void;
	/**
	 * Exit a parse tree produced by the `isExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitIsExpr?: (ctx: IsExprContext) => void;

	/**
	 * Enter a parse tree produced by the `inExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterInExpr?: (ctx: InExprContext) => void;
	/**
	 * Exit a parse tree produced by the `inExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitInExpr?: (ctx: InExprContext) => void;

	/**
	 * Enter a parse tree produced by the `assignmentExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterAssignmentExpr?: (ctx: AssignmentExprContext) => void;
	/**
	 * Exit a parse tree produced by the `assignmentExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitAssignmentExpr?: (ctx: AssignmentExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ifNilExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterIfNilExpr?: (ctx: IfNilExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ifNilExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitIfNilExpr?: (ctx: IfNilExprContext) => void;

	/**
	 * Enter a parse tree produced by the `anonymousObjectExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterAnonymousObjectExpr?: (ctx: AnonymousObjectExprContext) => void;
	/**
	 * Exit a parse tree produced by the `anonymousObjectExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitAnonymousObjectExpr?: (ctx: AnonymousObjectExprContext) => void;

	/**
	 * Enter a parse tree produced by the `bitwiseExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterBitwiseExpr?: (ctx: BitwiseExprContext) => void;
	/**
	 * Exit a parse tree produced by the `bitwiseExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitBitwiseExpr?: (ctx: BitwiseExprContext) => void;

	/**
	 * Enter a parse tree produced by the `andOrExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterAndOrExpr?: (ctx: AndOrExprContext) => void;
	/**
	 * Exit a parse tree produced by the `andOrExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitAndOrExpr?: (ctx: AndOrExprContext) => void;

	/**
	 * Enter a parse tree produced by the `powerOfExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterPowerOfExpr?: (ctx: PowerOfExprContext) => void;
	/**
	 * Exit a parse tree produced by the `powerOfExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitPowerOfExpr?: (ctx: PowerOfExprContext) => void;

	/**
	 * Enter a parse tree produced by the `multiplicationExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterMultiplicationExpr?: (ctx: MultiplicationExprContext) => void;
	/**
	 * Exit a parse tree produced by the `multiplicationExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitMultiplicationExpr?: (ctx: MultiplicationExprContext) => void;

	/**
	 * Enter a parse tree produced by the `additiveExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpr?: (ctx: AdditiveExprContext) => void;
	/**
	 * Exit a parse tree produced by the `additiveExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpr?: (ctx: AdditiveExprContext) => void;

	/**
	 * Enter a parse tree produced by the `relationalExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterRelationalExpr?: (ctx: RelationalExprContext) => void;
	/**
	 * Exit a parse tree produced by the `relationalExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitRelationalExpr?: (ctx: RelationalExprContext) => void;

	/**
	 * Enter a parse tree produced by the `equalityExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpr?: (ctx: EqualityExprContext) => void;
	/**
	 * Exit a parse tree produced by the `equalityExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpr?: (ctx: EqualityExprContext) => void;

	/**
	 * Enter a parse tree produced by the `notEqualityExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterNotEqualityExpr?: (ctx: NotEqualityExprContext) => void;
	/**
	 * Exit a parse tree produced by the `notEqualityExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitNotEqualityExpr?: (ctx: NotEqualityExprContext) => void;

	/**
	 * Enter a parse tree produced by the `literalNotAndOR`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterLiteralNotAndOR?: (ctx: LiteralNotAndORContext) => void;
	/**
	 * Exit a parse tree produced by the `literalNotAndOR`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitLiteralNotAndOR?: (ctx: LiteralNotAndORContext) => void;

	/**
	 * Enter a parse tree produced by the `literalNotAndOR2`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterLiteralNotAndOR2?: (ctx: LiteralNotAndOR2Context) => void;
	/**
	 * Exit a parse tree produced by the `literalNotAndOR2`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitLiteralNotAndOR2?: (ctx: LiteralNotAndOR2Context) => void;

	/**
	 * Enter a parse tree produced by the `arrowExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrowExpr?: (ctx: ArrowExprContext) => void;
	/**
	 * Exit a parse tree produced by the `arrowExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrowExpr?: (ctx: ArrowExprContext) => void;

	/**
	 * Enter a parse tree produced by the `arrowExpr2`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrowExpr2?: (ctx: ArrowExpr2Context) => void;
	/**
	 * Exit a parse tree produced by the `arrowExpr2`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrowExpr2?: (ctx: ArrowExpr2Context) => void;

	/**
	 * Enter a parse tree produced by the `arrowExpr3`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrowExpr3?: (ctx: ArrowExpr3Context) => void;
	/**
	 * Exit a parse tree produced by the `arrowExpr3`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrowExpr3?: (ctx: ArrowExpr3Context) => void;

	/**
	 * Enter a parse tree produced by the `unaryExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterUnaryExpr?: (ctx: UnaryExprContext) => void;
	/**
	 * Exit a parse tree produced by the `unaryExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitUnaryExpr?: (ctx: UnaryExprContext) => void;

	/**
	 * Enter a parse tree produced by the `postFixExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterPostFixExpr?: (ctx: PostFixExprContext) => void;
	/**
	 * Exit a parse tree produced by the `postFixExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitPostFixExpr?: (ctx: PostFixExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ternaryExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterTernaryExpr?: (ctx: TernaryExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ternaryExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitTernaryExpr?: (ctx: TernaryExprContext) => void;

	/**
	 * Enter a parse tree produced by the `anonymousFunctionExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterAnonymousFunctionExpr?: (ctx: AnonymousFunctionExprContext) => void;
	/**
	 * Exit a parse tree produced by the `anonymousFunctionExpr`
	 * labeled alternative in `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitAnonymousFunctionExpr?: (ctx: AnonymousFunctionExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.directive`.
	 * @param ctx the parse tree
	 */
	enterDirective?: (ctx: DirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.directive`.
	 * @param ctx the parse tree
	 */
	exitDirective?: (ctx: DirectiveContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.specialWordsDirective`.
	 * @param ctx the parse tree
	 */
	enterSpecialWordsDirective?: (ctx: SpecialWordsDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.specialWordsDirective`.
	 * @param ctx the parse tree
	 */
	exitSpecialWordsDirective?: (ctx: SpecialWordsDirectiveContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.formatStringDirective`.
	 * @param ctx the parse tree
	 */
	enterFormatStringDirective?: (ctx: FormatStringDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.formatStringDirective`.
	 * @param ctx the parse tree
	 */
	exitFormatStringDirective?: (ctx: FormatStringDirectiveContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.compoundWordDirective`.
	 * @param ctx the parse tree
	 */
	enterCompoundWordDirective?: (ctx: CompoundWordDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.compoundWordDirective`.
	 * @param ctx the parse tree
	 */
	exitCompoundWordDirective?: (ctx: CompoundWordDirectiveContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.grammarDeclaration`.
	 * @param ctx the parse tree
	 */
	enterGrammarDeclaration?: (ctx: GrammarDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.grammarDeclaration`.
	 * @param ctx the parse tree
	 */
	exitGrammarDeclaration?: (ctx: GrammarDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.grammarRules`.
	 * @param ctx the parse tree
	 */
	enterGrammarRules?: (ctx: GrammarRulesContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.grammarRules`.
	 * @param ctx the parse tree
	 */
	exitGrammarRules?: (ctx: GrammarRulesContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.itemList`.
	 * @param ctx the parse tree
	 */
	enterItemList?: (ctx: ItemListContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.itemList`.
	 * @param ctx the parse tree
	 */
	exitItemList?: (ctx: ItemListContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.qualifiers`.
	 * @param ctx the parse tree
	 */
	enterQualifiers?: (ctx: QualifiersContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.qualifiers`.
	 * @param ctx the parse tree
	 */
	exitQualifiers?: (ctx: QualifiersContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.item`.
	 * @param ctx the parse tree
	 */
	enterItem?: (ctx: ItemContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.item`.
	 * @param ctx the parse tree
	 */
	exitItem?: (ctx: ItemContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.enumDeclaration`.
	 * @param ctx the parse tree
	 */
	enterEnumDeclaration?: (ctx: EnumDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.enumDeclaration`.
	 * @param ctx the parse tree
	 */
	exitEnumDeclaration?: (ctx: EnumDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.propertyDeclaration`.
	 * @param ctx the parse tree
	 */
	enterPropertyDeclaration?: (ctx: PropertyDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.propertyDeclaration`.
	 * @param ctx the parse tree
	 */
	exitPropertyDeclaration?: (ctx: PropertyDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 */
	enterDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 */
	exitDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.exportDeclaration`.
	 * @param ctx the parse tree
	 */
	enterExportDeclaration?: (ctx: ExportDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.exportDeclaration`.
	 * @param ctx the parse tree
	 */
	exitExportDeclaration?: (ctx: ExportDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	enterFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	exitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.objectDeclaration`.
	 * @param ctx the parse tree
	 */
	enterObjectDeclaration?: (ctx: ObjectDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.objectDeclaration`.
	 * @param ctx the parse tree
	 */
	exitObjectDeclaration?: (ctx: ObjectDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.array`.
	 * @param ctx the parse tree
	 */
	enterArray?: (ctx: ArrayContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.array`.
	 * @param ctx the parse tree
	 */
	exitArray?: (ctx: ArrayContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.curlyObjectBody`.
	 * @param ctx the parse tree
	 */
	enterCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.curlyObjectBody`.
	 * @param ctx the parse tree
	 */
	exitCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 */
	enterSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 */
	exitSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.superTypes`.
	 * @param ctx the parse tree
	 */
	enterSuperTypes?: (ctx: SuperTypesContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.superTypes`.
	 * @param ctx the parse tree
	 */
	exitSuperTypes?: (ctx: SuperTypesContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.objectBody`.
	 * @param ctx the parse tree
	 */
	enterObjectBody?: (ctx: ObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.objectBody`.
	 * @param ctx the parse tree
	 */
	exitObjectBody?: (ctx: ObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.property`.
	 * @param ctx the parse tree
	 */
	enterProperty?: (ctx: PropertyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.property`.
	 * @param ctx the parse tree
	 */
	exitProperty?: (ctx: PropertyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 */
	enterParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 */
	exitParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.method`.
	 * @param ctx the parse tree
	 */
	enterMethod?: (ctx: MethodContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.method`.
	 * @param ctx the parse tree
	 */
	exitMethod?: (ctx: MethodContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.codeBlock`.
	 * @param ctx the parse tree
	 */
	enterCodeBlock?: (ctx: CodeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.codeBlock`.
	 * @param ctx the parse tree
	 */
	exitCodeBlock?: (ctx: CodeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.stats`.
	 * @param ctx the parse tree
	 */
	enterStats?: (ctx: StatsContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.stats`.
	 * @param ctx the parse tree
	 */
	exitStats?: (ctx: StatsContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.innerCodeBlock`.
	 * @param ctx the parse tree
	 */
	enterInnerCodeBlock?: (ctx: InnerCodeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.innerCodeBlock`.
	 * @param ctx the parse tree
	 */
	exitInnerCodeBlock?: (ctx: InnerCodeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.gotoStatement`.
	 * @param ctx the parse tree
	 */
	enterGotoStatement?: (ctx: GotoStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.gotoStatement`.
	 * @param ctx the parse tree
	 */
	exitGotoStatement?: (ctx: GotoStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.breakStatement`.
	 * @param ctx the parse tree
	 */
	enterBreakStatement?: (ctx: BreakStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.breakStatement`.
	 * @param ctx the parse tree
	 */
	exitBreakStatement?: (ctx: BreakStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.continueStatement`.
	 * @param ctx the parse tree
	 */
	enterContinueStatement?: (ctx: ContinueStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.continueStatement`.
	 * @param ctx the parse tree
	 */
	exitContinueStatement?: (ctx: ContinueStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.labelStatement`.
	 * @param ctx the parse tree
	 */
	enterLabelStatement?: (ctx: LabelStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.labelStatement`.
	 * @param ctx the parse tree
	 */
	exitLabelStatement?: (ctx: LabelStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.switchStatement`.
	 * @param ctx the parse tree
	 */
	enterSwitchStatement?: (ctx: SwitchStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.switchStatement`.
	 * @param ctx the parse tree
	 */
	exitSwitchStatement?: (ctx: SwitchStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.throwStatement`.
	 * @param ctx the parse tree
	 */
	enterThrowStatement?: (ctx: ThrowStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.throwStatement`.
	 * @param ctx the parse tree
	 */
	exitThrowStatement?: (ctx: ThrowStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.forInStatement`.
	 * @param ctx the parse tree
	 */
	enterForInStatement?: (ctx: ForInStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.forInStatement`.
	 * @param ctx the parse tree
	 */
	exitForInStatement?: (ctx: ForInStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.forEachStatement`.
	 * @param ctx the parse tree
	 */
	enterForEachStatement?: (ctx: ForEachStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.forEachStatement`.
	 * @param ctx the parse tree
	 */
	exitForEachStatement?: (ctx: ForEachStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.passStatement`.
	 * @param ctx the parse tree
	 */
	enterPassStatement?: (ctx: PassStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.passStatement`.
	 * @param ctx the parse tree
	 */
	exitPassStatement?: (ctx: PassStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.deleteStatement`.
	 * @param ctx the parse tree
	 */
	enterDeleteStatement?: (ctx: DeleteStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.deleteStatement`.
	 * @param ctx the parse tree
	 */
	exitDeleteStatement?: (ctx: DeleteStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.returnStatement`.
	 * @param ctx the parse tree
	 */
	enterReturnStatement?: (ctx: ReturnStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.returnStatement`.
	 * @param ctx the parse tree
	 */
	exitReturnStatement?: (ctx: ReturnStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.doWhileStatement`.
	 * @param ctx the parse tree
	 */
	enterDoWhileStatement?: (ctx: DoWhileStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.doWhileStatement`.
	 * @param ctx the parse tree
	 */
	exitDoWhileStatement?: (ctx: DoWhileStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.whileStatement`.
	 * @param ctx the parse tree
	 */
	enterWhileStatement?: (ctx: WhileStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.whileStatement`.
	 * @param ctx the parse tree
	 */
	exitWhileStatement?: (ctx: WhileStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.forStatement`.
	 * @param ctx the parse tree
	 */
	enterForStatement?: (ctx: ForStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.forStatement`.
	 * @param ctx the parse tree
	 */
	exitForStatement?: (ctx: ForStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.tryCatchStatement`.
	 * @param ctx the parse tree
	 */
	enterTryCatchStatement?: (ctx: TryCatchStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.tryCatchStatement`.
	 * @param ctx the parse tree
	 */
	exitTryCatchStatement?: (ctx: TryCatchStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.callStatement`.
	 * @param ctx the parse tree
	 */
	enterCallStatement?: (ctx: CallStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.callStatement`.
	 * @param ctx the parse tree
	 */
	exitCallStatement?: (ctx: CallStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.emptyStatement`.
	 * @param ctx the parse tree
	 */
	enterEmptyStatement?: (ctx: EmptyStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.emptyStatement`.
	 * @param ctx the parse tree
	 */
	exitEmptyStatement?: (ctx: EmptyStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.sayStatement`.
	 * @param ctx the parse tree
	 */
	enterSayStatement?: (ctx: SayStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.sayStatement`.
	 * @param ctx the parse tree
	 */
	exitSayStatement?: (ctx: SayStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.assignmentStatement`.
	 * @param ctx the parse tree
	 */
	enterAssignmentStatement?: (ctx: AssignmentStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.assignmentStatement`.
	 * @param ctx the parse tree
	 */
	exitAssignmentStatement?: (ctx: AssignmentStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.ifStatement`.
	 * @param ctx the parse tree
	 */
	enterIfStatement?: (ctx: IfStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.ifStatement`.
	 * @param ctx the parse tree
	 */
	exitIfStatement?: (ctx: IfStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 */
	enterEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 */
	exitEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterPrimary?: (ctx: PrimaryContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitPrimary?: (ctx: PrimaryContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.identifierAtom`.
	 * @param ctx the parse tree
	 */
	enterIdentifierAtom?: (ctx: IdentifierAtomContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.identifierAtom`.
	 * @param ctx the parse tree
	 */
	exitIdentifierAtom?: (ctx: IdentifierAtomContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.params`.
	 * @param ctx the parse tree
	 */
	enterParams?: (ctx: ParamsContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.params`.
	 * @param ctx the parse tree
	 */
	exitParams?: (ctx: ParamsContext) => void;

	/**
	 * Enter a parse tree produced by `Tads2Parser.optionallyTypedOptionalId`.
	 * @param ctx the parse tree
	 */
	enterOptionallyTypedOptionalId?: (ctx: OptionallyTypedOptionalIdContext) => void;
	/**
	 * Exit a parse tree produced by `Tads2Parser.optionallyTypedOptionalId`.
	 * @param ctx the parse tree
	 */
	exitOptionallyTypedOptionalId?: (ctx: OptionallyTypedOptionalIdContext) => void;
}

