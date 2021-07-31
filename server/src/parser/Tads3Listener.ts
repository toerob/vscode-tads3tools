// Generated from server/src/parser/Tads3.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
import { FunctionHeadContext } from "./Tads3Parser";
import { CodeBlockContext } from "./Tads3Parser";
import { StatsContext } from "./Tads3Parser";
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
 * This interface defines a complete listener for a parse tree produced by
 * `Tads3Parser`.
 */
export interface Tads3Listener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterInheritedAtom?: (ctx: InheritedAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitInheritedAtom?: (ctx: InheritedAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `hexAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterHexAtom?: (ctx: HexAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `hexAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitHexAtom?: (ctx: HexAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `numberAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterNumberAtom?: (ctx: NumberAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `numberAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitNumberAtom?: (ctx: NumberAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `referenceAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterReferenceAtom?: (ctx: ReferenceAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `referenceAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitReferenceAtom?: (ctx: ReferenceAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `idAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterIdAtom?: (ctx: IdAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `idAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitIdAtom?: (ctx: IdAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `doubleQuotestringAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterDoubleQuotestringAtom?: (ctx: DoubleQuotestringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `doubleQuotestringAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitDoubleQuotestringAtom?: (ctx: DoubleQuotestringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `singleQuotestringAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterSingleQuotestringAtom?: (ctx: SingleQuotestringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `singleQuotestringAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitSingleQuotestringAtom?: (ctx: SingleQuotestringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterRegexpStringAtom?: (ctx: RegexpStringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitRegexpStringAtom?: (ctx: RegexpStringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `booleanAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterBooleanAtom?: (ctx: BooleanAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `booleanAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitBooleanAtom?: (ctx: BooleanAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `nilAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterNilAtom?: (ctx: NilAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `nilAtom`
	 * labeled alternative in `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitNilAtom?: (ctx: NilAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `arrayExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrayExpr?: (ctx: ArrayExprContext) => void;
	/**
	 * Exit a parse tree produced by the `arrayExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrayExpr?: (ctx: ArrayExprContext) => void;

	/**
	 * Enter a parse tree produced by the `memberExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterMemberExpr?: (ctx: MemberExprContext) => void;
	/**
	 * Exit a parse tree produced by the `memberExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitMemberExpr?: (ctx: MemberExprContext) => void;

	/**
	 * Enter a parse tree produced by the `indexExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterIndexExpr?: (ctx: IndexExprContext) => void;
	/**
	 * Exit a parse tree produced by the `indexExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitIndexExpr?: (ctx: IndexExprContext) => void;

	/**
	 * Enter a parse tree produced by the `commaExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterCommaExpr?: (ctx: CommaExprContext) => void;
	/**
	 * Exit a parse tree produced by the `commaExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitCommaExpr?: (ctx: CommaExprContext) => void;

	/**
	 * Enter a parse tree produced by the `rangeExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterRangeExpr?: (ctx: RangeExprContext) => void;
	/**
	 * Exit a parse tree produced by the `rangeExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitRangeExpr?: (ctx: RangeExprContext) => void;

	/**
	 * Enter a parse tree produced by the `delegatedExpression`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterDelegatedExpression?: (ctx: DelegatedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `delegatedExpression`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitDelegatedExpression?: (ctx: DelegatedExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `inheritedExpression`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterInheritedExpression?: (ctx: InheritedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `inheritedExpression`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitInheritedExpression?: (ctx: InheritedExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `transientExpression`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterTransientExpression?: (ctx: TransientExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `transientExpression`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitTransientExpression?: (ctx: TransientExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `primaryExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterPrimaryExpr?: (ctx: PrimaryExprContext) => void;
	/**
	 * Exit a parse tree produced by the `primaryExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitPrimaryExpr?: (ctx: PrimaryExprContext) => void;

	/**
	 * Enter a parse tree produced by the `callWithParamsExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterCallWithParamsExpr?: (ctx: CallWithParamsExprContext) => void;
	/**
	 * Exit a parse tree produced by the `callWithParamsExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitCallWithParamsExpr?: (ctx: CallWithParamsExprContext) => void;

	/**
	 * Enter a parse tree produced by the `exprWithParenExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterExprWithParenExpr?: (ctx: ExprWithParenExprContext) => void;
	/**
	 * Exit a parse tree produced by the `exprWithParenExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitExprWithParenExpr?: (ctx: ExprWithParenExprContext) => void;

	/**
	 * Enter a parse tree produced by the `exprWithAnonymousObjectExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterExprWithAnonymousObjectExpr?: (ctx: ExprWithAnonymousObjectExprContext) => void;
	/**
	 * Exit a parse tree produced by the `exprWithAnonymousObjectExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitExprWithAnonymousObjectExpr?: (ctx: ExprWithAnonymousObjectExprContext) => void;

	/**
	 * Enter a parse tree produced by the `parenExpr2`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterParenExpr2?: (ctx: ParenExpr2Context) => void;
	/**
	 * Exit a parse tree produced by the `parenExpr2`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitParenExpr2?: (ctx: ParenExpr2Context) => void;

	/**
	 * Enter a parse tree produced by the `localExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterLocalExpr?: (ctx: LocalExprContext) => void;
	/**
	 * Exit a parse tree produced by the `localExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitLocalExpr?: (ctx: LocalExprContext) => void;

	/**
	 * Enter a parse tree produced by the `staticExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterStaticExpr?: (ctx: StaticExprContext) => void;
	/**
	 * Exit a parse tree produced by the `staticExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitStaticExpr?: (ctx: StaticExprContext) => void;

	/**
	 * Enter a parse tree produced by the `newExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterNewExpr?: (ctx: NewExprContext) => void;
	/**
	 * Exit a parse tree produced by the `newExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitNewExpr?: (ctx: NewExprContext) => void;

	/**
	 * Enter a parse tree produced by the `referenceExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterReferenceExpr?: (ctx: ReferenceExprContext) => void;
	/**
	 * Exit a parse tree produced by the `referenceExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitReferenceExpr?: (ctx: ReferenceExprContext) => void;

	/**
	 * Enter a parse tree produced by the `notInExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterNotInExpr?: (ctx: NotInExprContext) => void;
	/**
	 * Exit a parse tree produced by the `notInExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitNotInExpr?: (ctx: NotInExprContext) => void;

	/**
	 * Enter a parse tree produced by the `isExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterIsExpr?: (ctx: IsExprContext) => void;
	/**
	 * Exit a parse tree produced by the `isExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitIsExpr?: (ctx: IsExprContext) => void;

	/**
	 * Enter a parse tree produced by the `inExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterInExpr?: (ctx: InExprContext) => void;
	/**
	 * Exit a parse tree produced by the `inExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitInExpr?: (ctx: InExprContext) => void;

	/**
	 * Enter a parse tree produced by the `assignmentExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterAssignmentExpr?: (ctx: AssignmentExprContext) => void;
	/**
	 * Exit a parse tree produced by the `assignmentExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitAssignmentExpr?: (ctx: AssignmentExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ifNilExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterIfNilExpr?: (ctx: IfNilExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ifNilExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitIfNilExpr?: (ctx: IfNilExprContext) => void;

	/**
	 * Enter a parse tree produced by the `anonymousObjectExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterAnonymousObjectExpr?: (ctx: AnonymousObjectExprContext) => void;
	/**
	 * Exit a parse tree produced by the `anonymousObjectExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitAnonymousObjectExpr?: (ctx: AnonymousObjectExprContext) => void;

	/**
	 * Enter a parse tree produced by the `bitwiseExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterBitwiseExpr?: (ctx: BitwiseExprContext) => void;
	/**
	 * Exit a parse tree produced by the `bitwiseExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitBitwiseExpr?: (ctx: BitwiseExprContext) => void;

	/**
	 * Enter a parse tree produced by the `andOrExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterAndOrExpr?: (ctx: AndOrExprContext) => void;
	/**
	 * Exit a parse tree produced by the `andOrExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitAndOrExpr?: (ctx: AndOrExprContext) => void;

	/**
	 * Enter a parse tree produced by the `powerOfExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterPowerOfExpr?: (ctx: PowerOfExprContext) => void;
	/**
	 * Exit a parse tree produced by the `powerOfExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitPowerOfExpr?: (ctx: PowerOfExprContext) => void;

	/**
	 * Enter a parse tree produced by the `multiplicationExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterMultiplicationExpr?: (ctx: MultiplicationExprContext) => void;
	/**
	 * Exit a parse tree produced by the `multiplicationExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitMultiplicationExpr?: (ctx: MultiplicationExprContext) => void;

	/**
	 * Enter a parse tree produced by the `additiveExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpr?: (ctx: AdditiveExprContext) => void;
	/**
	 * Exit a parse tree produced by the `additiveExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpr?: (ctx: AdditiveExprContext) => void;

	/**
	 * Enter a parse tree produced by the `relationalExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterRelationalExpr?: (ctx: RelationalExprContext) => void;
	/**
	 * Exit a parse tree produced by the `relationalExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitRelationalExpr?: (ctx: RelationalExprContext) => void;

	/**
	 * Enter a parse tree produced by the `equalityExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpr?: (ctx: EqualityExprContext) => void;
	/**
	 * Exit a parse tree produced by the `equalityExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpr?: (ctx: EqualityExprContext) => void;

	/**
	 * Enter a parse tree produced by the `arrowExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrowExpr?: (ctx: ArrowExprContext) => void;
	/**
	 * Exit a parse tree produced by the `arrowExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrowExpr?: (ctx: ArrowExprContext) => void;

	/**
	 * Enter a parse tree produced by the `arrowExpr2`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrowExpr2?: (ctx: ArrowExpr2Context) => void;
	/**
	 * Exit a parse tree produced by the `arrowExpr2`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrowExpr2?: (ctx: ArrowExpr2Context) => void;

	/**
	 * Enter a parse tree produced by the `arrowExpr3`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrowExpr3?: (ctx: ArrowExpr3Context) => void;
	/**
	 * Exit a parse tree produced by the `arrowExpr3`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrowExpr3?: (ctx: ArrowExpr3Context) => void;

	/**
	 * Enter a parse tree produced by the `unaryExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterUnaryExpr?: (ctx: UnaryExprContext) => void;
	/**
	 * Exit a parse tree produced by the `unaryExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitUnaryExpr?: (ctx: UnaryExprContext) => void;

	/**
	 * Enter a parse tree produced by the `postFixExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterPostFixExpr?: (ctx: PostFixExprContext) => void;
	/**
	 * Exit a parse tree produced by the `postFixExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitPostFixExpr?: (ctx: PostFixExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ternaryExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterTernaryExpr?: (ctx: TernaryExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ternaryExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitTernaryExpr?: (ctx: TernaryExprContext) => void;

	/**
	 * Enter a parse tree produced by the `anonymousFunctionExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterAnonymousFunctionExpr?: (ctx: AnonymousFunctionExprContext) => void;
	/**
	 * Exit a parse tree produced by the `anonymousFunctionExpr`
	 * labeled alternative in `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitAnonymousFunctionExpr?: (ctx: AnonymousFunctionExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.directive`.
	 * @param ctx the parse tree
	 */
	enterDirective?: (ctx: DirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.directive`.
	 * @param ctx the parse tree
	 */
	exitDirective?: (ctx: DirectiveContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.grammarDeclaration`.
	 * @param ctx the parse tree
	 */
	enterGrammarDeclaration?: (ctx: GrammarDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.grammarDeclaration`.
	 * @param ctx the parse tree
	 */
	exitGrammarDeclaration?: (ctx: GrammarDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.grammarRules`.
	 * @param ctx the parse tree
	 */
	enterGrammarRules?: (ctx: GrammarRulesContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.grammarRules`.
	 * @param ctx the parse tree
	 */
	exitGrammarRules?: (ctx: GrammarRulesContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.itemList`.
	 * @param ctx the parse tree
	 */
	enterItemList?: (ctx: ItemListContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.itemList`.
	 * @param ctx the parse tree
	 */
	exitItemList?: (ctx: ItemListContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.qualifiers`.
	 * @param ctx the parse tree
	 */
	enterQualifiers?: (ctx: QualifiersContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.qualifiers`.
	 * @param ctx the parse tree
	 */
	exitQualifiers?: (ctx: QualifiersContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.item`.
	 * @param ctx the parse tree
	 */
	enterItem?: (ctx: ItemContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.item`.
	 * @param ctx the parse tree
	 */
	exitItem?: (ctx: ItemContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.templateDeclaration`.
	 * @param ctx the parse tree
	 */
	enterTemplateDeclaration?: (ctx: TemplateDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.templateDeclaration`.
	 * @param ctx the parse tree
	 */
	exitTemplateDeclaration?: (ctx: TemplateDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.enumDeclaration`.
	 * @param ctx the parse tree
	 */
	enterEnumDeclaration?: (ctx: EnumDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.enumDeclaration`.
	 * @param ctx the parse tree
	 */
	exitEnumDeclaration?: (ctx: EnumDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.propertyDeclaration`.
	 * @param ctx the parse tree
	 */
	enterPropertyDeclaration?: (ctx: PropertyDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.propertyDeclaration`.
	 * @param ctx the parse tree
	 */
	exitPropertyDeclaration?: (ctx: PropertyDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 */
	enterDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 */
	exitDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.exportDeclaration`.
	 * @param ctx the parse tree
	 */
	enterExportDeclaration?: (ctx: ExportDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.exportDeclaration`.
	 * @param ctx the parse tree
	 */
	exitExportDeclaration?: (ctx: ExportDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.intrinsicDeclaration`.
	 * @param ctx the parse tree
	 */
	enterIntrinsicDeclaration?: (ctx: IntrinsicDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.intrinsicDeclaration`.
	 * @param ctx the parse tree
	 */
	exitIntrinsicDeclaration?: (ctx: IntrinsicDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.intrinsicMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	enterIntrinsicMethodDeclaration?: (ctx: IntrinsicMethodDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.intrinsicMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	exitIntrinsicMethodDeclaration?: (ctx: IntrinsicMethodDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.objectDeclaration`.
	 * @param ctx the parse tree
	 */
	enterObjectDeclaration?: (ctx: ObjectDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.objectDeclaration`.
	 * @param ctx the parse tree
	 */
	exitObjectDeclaration?: (ctx: ObjectDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.templateExpr`.
	 * @param ctx the parse tree
	 */
	enterTemplateExpr?: (ctx: TemplateExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.templateExpr`.
	 * @param ctx the parse tree
	 */
	exitTemplateExpr?: (ctx: TemplateExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.array`.
	 * @param ctx the parse tree
	 */
	enterArray?: (ctx: ArrayContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.array`.
	 * @param ctx the parse tree
	 */
	exitArray?: (ctx: ArrayContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.curlyObjectBody`.
	 * @param ctx the parse tree
	 */
	enterCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.curlyObjectBody`.
	 * @param ctx the parse tree
	 */
	exitCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 */
	enterSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 */
	exitSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.superTypes`.
	 * @param ctx the parse tree
	 */
	enterSuperTypes?: (ctx: SuperTypesContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.superTypes`.
	 * @param ctx the parse tree
	 */
	exitSuperTypes?: (ctx: SuperTypesContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.objectBody`.
	 * @param ctx the parse tree
	 */
	enterObjectBody?: (ctx: ObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.objectBody`.
	 * @param ctx the parse tree
	 */
	exitObjectBody?: (ctx: ObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.property`.
	 * @param ctx the parse tree
	 */
	enterProperty?: (ctx: PropertyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.property`.
	 * @param ctx the parse tree
	 */
	exitProperty?: (ctx: PropertyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.dictionaryProperty`.
	 * @param ctx the parse tree
	 */
	enterDictionaryProperty?: (ctx: DictionaryPropertyContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.dictionaryProperty`.
	 * @param ctx the parse tree
	 */
	exitDictionaryProperty?: (ctx: DictionaryPropertyContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.propertySet`.
	 * @param ctx the parse tree
	 */
	enterPropertySet?: (ctx: PropertySetContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.propertySet`.
	 * @param ctx the parse tree
	 */
	exitPropertySet?: (ctx: PropertySetContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 */
	enterParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 */
	exitParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	enterFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	exitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.functionHead`.
	 * @param ctx the parse tree
	 */
	enterFunctionHead?: (ctx: FunctionHeadContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.functionHead`.
	 * @param ctx the parse tree
	 */
	exitFunctionHead?: (ctx: FunctionHeadContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.codeBlock`.
	 * @param ctx the parse tree
	 */
	enterCodeBlock?: (ctx: CodeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.codeBlock`.
	 * @param ctx the parse tree
	 */
	exitCodeBlock?: (ctx: CodeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.stats`.
	 * @param ctx the parse tree
	 */
	enterStats?: (ctx: StatsContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.stats`.
	 * @param ctx the parse tree
	 */
	exitStats?: (ctx: StatsContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.gotoStatement`.
	 * @param ctx the parse tree
	 */
	enterGotoStatement?: (ctx: GotoStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.gotoStatement`.
	 * @param ctx the parse tree
	 */
	exitGotoStatement?: (ctx: GotoStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.breakStatement`.
	 * @param ctx the parse tree
	 */
	enterBreakStatement?: (ctx: BreakStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.breakStatement`.
	 * @param ctx the parse tree
	 */
	exitBreakStatement?: (ctx: BreakStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.continueStatement`.
	 * @param ctx the parse tree
	 */
	enterContinueStatement?: (ctx: ContinueStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.continueStatement`.
	 * @param ctx the parse tree
	 */
	exitContinueStatement?: (ctx: ContinueStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.labelStatement`.
	 * @param ctx the parse tree
	 */
	enterLabelStatement?: (ctx: LabelStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.labelStatement`.
	 * @param ctx the parse tree
	 */
	exitLabelStatement?: (ctx: LabelStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.switchStatement`.
	 * @param ctx the parse tree
	 */
	enterSwitchStatement?: (ctx: SwitchStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.switchStatement`.
	 * @param ctx the parse tree
	 */
	exitSwitchStatement?: (ctx: SwitchStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.throwStatement`.
	 * @param ctx the parse tree
	 */
	enterThrowStatement?: (ctx: ThrowStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.throwStatement`.
	 * @param ctx the parse tree
	 */
	exitThrowStatement?: (ctx: ThrowStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.forInStatement`.
	 * @param ctx the parse tree
	 */
	enterForInStatement?: (ctx: ForInStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.forInStatement`.
	 * @param ctx the parse tree
	 */
	exitForInStatement?: (ctx: ForInStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.forEachStatement`.
	 * @param ctx the parse tree
	 */
	enterForEachStatement?: (ctx: ForEachStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.forEachStatement`.
	 * @param ctx the parse tree
	 */
	exitForEachStatement?: (ctx: ForEachStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.returnStatement`.
	 * @param ctx the parse tree
	 */
	enterReturnStatement?: (ctx: ReturnStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.returnStatement`.
	 * @param ctx the parse tree
	 */
	exitReturnStatement?: (ctx: ReturnStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.doWhileStatement`.
	 * @param ctx the parse tree
	 */
	enterDoWhileStatement?: (ctx: DoWhileStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.doWhileStatement`.
	 * @param ctx the parse tree
	 */
	exitDoWhileStatement?: (ctx: DoWhileStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.whileStatement`.
	 * @param ctx the parse tree
	 */
	enterWhileStatement?: (ctx: WhileStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.whileStatement`.
	 * @param ctx the parse tree
	 */
	exitWhileStatement?: (ctx: WhileStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.forStatement`.
	 * @param ctx the parse tree
	 */
	enterForStatement?: (ctx: ForStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.forStatement`.
	 * @param ctx the parse tree
	 */
	exitForStatement?: (ctx: ForStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.tryCatchStatement`.
	 * @param ctx the parse tree
	 */
	enterTryCatchStatement?: (ctx: TryCatchStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.tryCatchStatement`.
	 * @param ctx the parse tree
	 */
	exitTryCatchStatement?: (ctx: TryCatchStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.callStatement`.
	 * @param ctx the parse tree
	 */
	enterCallStatement?: (ctx: CallStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.callStatement`.
	 * @param ctx the parse tree
	 */
	exitCallStatement?: (ctx: CallStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.emptyStatement`.
	 * @param ctx the parse tree
	 */
	enterEmptyStatement?: (ctx: EmptyStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.emptyStatement`.
	 * @param ctx the parse tree
	 */
	exitEmptyStatement?: (ctx: EmptyStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.sayStatement`.
	 * @param ctx the parse tree
	 */
	enterSayStatement?: (ctx: SayStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.sayStatement`.
	 * @param ctx the parse tree
	 */
	exitSayStatement?: (ctx: SayStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.assignmentStatement`.
	 * @param ctx the parse tree
	 */
	enterAssignmentStatement?: (ctx: AssignmentStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.assignmentStatement`.
	 * @param ctx the parse tree
	 */
	exitAssignmentStatement?: (ctx: AssignmentStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.ifStatement`.
	 * @param ctx the parse tree
	 */
	enterIfStatement?: (ctx: IfStatementContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.ifStatement`.
	 * @param ctx the parse tree
	 */
	exitIfStatement?: (ctx: IfStatementContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 */
	enterEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 */
	exitEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	enterPrimary?: (ctx: PrimaryContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.primary`.
	 * @param ctx the parse tree
	 */
	exitPrimary?: (ctx: PrimaryContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.identifierAtom`.
	 * @param ctx the parse tree
	 */
	enterIdentifierAtom?: (ctx: IdentifierAtomContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.identifierAtom`.
	 * @param ctx the parse tree
	 */
	exitIdentifierAtom?: (ctx: IdentifierAtomContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.params`.
	 * @param ctx the parse tree
	 */
	enterParams?: (ctx: ParamsContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.params`.
	 * @param ctx the parse tree
	 */
	exitParams?: (ctx: ParamsContext) => void;

	/**
	 * Enter a parse tree produced by `Tads3Parser.optionallyTypedOptionalId`.
	 * @param ctx the parse tree
	 */
	enterOptionallyTypedOptionalId?: (ctx: OptionallyTypedOptionalIdContext) => void;
	/**
	 * Exit a parse tree produced by `Tads3Parser.optionallyTypedOptionalId`.
	 * @param ctx the parse tree
	 */
	exitOptionallyTypedOptionalId?: (ctx: OptionallyTypedOptionalIdContext) => void;
}

