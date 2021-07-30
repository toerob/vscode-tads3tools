// Generated from client/src/extension/modules/parser/T3Parser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `T3ParserParser`.
 */
export interface T3ParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	enterInheritedAtom?: (ctx: InheritedAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	exitInheritedAtom?: (ctx: InheritedAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `hexAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	enterHexAtom?: (ctx: HexAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `hexAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	exitHexAtom?: (ctx: HexAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `numberAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	enterNumberAtom?: (ctx: NumberAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `numberAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	exitNumberAtom?: (ctx: NumberAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `referenceAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	enterReferenceAtom?: (ctx: ReferenceAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `referenceAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	exitReferenceAtom?: (ctx: ReferenceAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `idAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	enterIdAtom?: (ctx: IdAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `idAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	exitIdAtom?: (ctx: IdAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `doubleQuotestringAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	enterDoubleQuotestringAtom?: (ctx: DoubleQuotestringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `doubleQuotestringAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	exitDoubleQuotestringAtom?: (ctx: DoubleQuotestringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `singleQuotestringAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	enterSingleQuotestringAtom?: (ctx: SingleQuotestringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `singleQuotestringAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	exitSingleQuotestringAtom?: (ctx: SingleQuotestringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	enterRegexpStringAtom?: (ctx: RegexpStringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	exitRegexpStringAtom?: (ctx: RegexpStringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `booleanAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	enterBooleanAtom?: (ctx: BooleanAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `booleanAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	exitBooleanAtom?: (ctx: BooleanAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `nilAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	enterNilAtom?: (ctx: NilAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `nilAtom`
	 * labeled alternative in `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	exitNilAtom?: (ctx: NilAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `arrayExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrayExpr?: (ctx: ArrayExprContext) => void;
	/**
	 * Exit a parse tree produced by the `arrayExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrayExpr?: (ctx: ArrayExprContext) => void;

	/**
	 * Enter a parse tree produced by the `memberExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterMemberExpr?: (ctx: MemberExprContext) => void;
	/**
	 * Exit a parse tree produced by the `memberExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitMemberExpr?: (ctx: MemberExprContext) => void;

	/**
	 * Enter a parse tree produced by the `indexExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterIndexExpr?: (ctx: IndexExprContext) => void;
	/**
	 * Exit a parse tree produced by the `indexExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitIndexExpr?: (ctx: IndexExprContext) => void;

	/**
	 * Enter a parse tree produced by the `commaExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterCommaExpr?: (ctx: CommaExprContext) => void;
	/**
	 * Exit a parse tree produced by the `commaExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitCommaExpr?: (ctx: CommaExprContext) => void;

	/**
	 * Enter a parse tree produced by the `rangeExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterRangeExpr?: (ctx: RangeExprContext) => void;
	/**
	 * Exit a parse tree produced by the `rangeExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitRangeExpr?: (ctx: RangeExprContext) => void;

	/**
	 * Enter a parse tree produced by the `delegatedExpression`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterDelegatedExpression?: (ctx: DelegatedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `delegatedExpression`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitDelegatedExpression?: (ctx: DelegatedExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `inheritedExpression`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterInheritedExpression?: (ctx: InheritedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `inheritedExpression`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitInheritedExpression?: (ctx: InheritedExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `transientExpression`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterTransientExpression?: (ctx: TransientExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `transientExpression`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitTransientExpression?: (ctx: TransientExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `primaryExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterPrimaryExpr?: (ctx: PrimaryExprContext) => void;
	/**
	 * Exit a parse tree produced by the `primaryExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitPrimaryExpr?: (ctx: PrimaryExprContext) => void;

	/**
	 * Enter a parse tree produced by the `callWithParamsExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterCallWithParamsExpr?: (ctx: CallWithParamsExprContext) => void;
	/**
	 * Exit a parse tree produced by the `callWithParamsExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitCallWithParamsExpr?: (ctx: CallWithParamsExprContext) => void;

	/**
	 * Enter a parse tree produced by the `exprWithParenExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExprWithParenExpr?: (ctx: ExprWithParenExprContext) => void;
	/**
	 * Exit a parse tree produced by the `exprWithParenExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExprWithParenExpr?: (ctx: ExprWithParenExprContext) => void;

	/**
	 * Enter a parse tree produced by the `exprWithAnonymousObjectExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExprWithAnonymousObjectExpr?: (ctx: ExprWithAnonymousObjectExprContext) => void;
	/**
	 * Exit a parse tree produced by the `exprWithAnonymousObjectExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExprWithAnonymousObjectExpr?: (ctx: ExprWithAnonymousObjectExprContext) => void;

	/**
	 * Enter a parse tree produced by the `parenExpr2`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterParenExpr2?: (ctx: ParenExpr2Context) => void;
	/**
	 * Exit a parse tree produced by the `parenExpr2`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitParenExpr2?: (ctx: ParenExpr2Context) => void;

	/**
	 * Enter a parse tree produced by the `localExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterLocalExpr?: (ctx: LocalExprContext) => void;
	/**
	 * Exit a parse tree produced by the `localExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitLocalExpr?: (ctx: LocalExprContext) => void;

	/**
	 * Enter a parse tree produced by the `staticExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterStaticExpr?: (ctx: StaticExprContext) => void;
	/**
	 * Exit a parse tree produced by the `staticExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitStaticExpr?: (ctx: StaticExprContext) => void;

	/**
	 * Enter a parse tree produced by the `newExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterNewExpr?: (ctx: NewExprContext) => void;
	/**
	 * Exit a parse tree produced by the `newExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitNewExpr?: (ctx: NewExprContext) => void;

	/**
	 * Enter a parse tree produced by the `referenceExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterReferenceExpr?: (ctx: ReferenceExprContext) => void;
	/**
	 * Exit a parse tree produced by the `referenceExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitReferenceExpr?: (ctx: ReferenceExprContext) => void;

	/**
	 * Enter a parse tree produced by the `notInExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterNotInExpr?: (ctx: NotInExprContext) => void;
	/**
	 * Exit a parse tree produced by the `notInExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitNotInExpr?: (ctx: NotInExprContext) => void;

	/**
	 * Enter a parse tree produced by the `isExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterIsExpr?: (ctx: IsExprContext) => void;
	/**
	 * Exit a parse tree produced by the `isExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitIsExpr?: (ctx: IsExprContext) => void;

	/**
	 * Enter a parse tree produced by the `inExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterInExpr?: (ctx: InExprContext) => void;
	/**
	 * Exit a parse tree produced by the `inExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitInExpr?: (ctx: InExprContext) => void;

	/**
	 * Enter a parse tree produced by the `assignmentExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterAssignmentExpr?: (ctx: AssignmentExprContext) => void;
	/**
	 * Exit a parse tree produced by the `assignmentExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitAssignmentExpr?: (ctx: AssignmentExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ifNilExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterIfNilExpr?: (ctx: IfNilExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ifNilExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitIfNilExpr?: (ctx: IfNilExprContext) => void;

	/**
	 * Enter a parse tree produced by the `anonymousObjectExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterAnonymousObjectExpr?: (ctx: AnonymousObjectExprContext) => void;
	/**
	 * Exit a parse tree produced by the `anonymousObjectExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitAnonymousObjectExpr?: (ctx: AnonymousObjectExprContext) => void;

	/**
	 * Enter a parse tree produced by the `bitwiseExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterBitwiseExpr?: (ctx: BitwiseExprContext) => void;
	/**
	 * Exit a parse tree produced by the `bitwiseExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitBitwiseExpr?: (ctx: BitwiseExprContext) => void;

	/**
	 * Enter a parse tree produced by the `andOrExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterAndOrExpr?: (ctx: AndOrExprContext) => void;
	/**
	 * Exit a parse tree produced by the `andOrExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitAndOrExpr?: (ctx: AndOrExprContext) => void;

	/**
	 * Enter a parse tree produced by the `powerOfExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterPowerOfExpr?: (ctx: PowerOfExprContext) => void;
	/**
	 * Exit a parse tree produced by the `powerOfExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitPowerOfExpr?: (ctx: PowerOfExprContext) => void;

	/**
	 * Enter a parse tree produced by the `multiplicationExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterMultiplicationExpr?: (ctx: MultiplicationExprContext) => void;
	/**
	 * Exit a parse tree produced by the `multiplicationExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitMultiplicationExpr?: (ctx: MultiplicationExprContext) => void;

	/**
	 * Enter a parse tree produced by the `additiveExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpr?: (ctx: AdditiveExprContext) => void;
	/**
	 * Exit a parse tree produced by the `additiveExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpr?: (ctx: AdditiveExprContext) => void;

	/**
	 * Enter a parse tree produced by the `relationalExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterRelationalExpr?: (ctx: RelationalExprContext) => void;
	/**
	 * Exit a parse tree produced by the `relationalExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitRelationalExpr?: (ctx: RelationalExprContext) => void;

	/**
	 * Enter a parse tree produced by the `equalityExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpr?: (ctx: EqualityExprContext) => void;
	/**
	 * Exit a parse tree produced by the `equalityExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpr?: (ctx: EqualityExprContext) => void;

	/**
	 * Enter a parse tree produced by the `arrowExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrowExpr?: (ctx: ArrowExprContext) => void;
	/**
	 * Exit a parse tree produced by the `arrowExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrowExpr?: (ctx: ArrowExprContext) => void;

	/**
	 * Enter a parse tree produced by the `arrowExpr2`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrowExpr2?: (ctx: ArrowExpr2Context) => void;
	/**
	 * Exit a parse tree produced by the `arrowExpr2`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrowExpr2?: (ctx: ArrowExpr2Context) => void;

	/**
	 * Enter a parse tree produced by the `arrowExpr3`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterArrowExpr3?: (ctx: ArrowExpr3Context) => void;
	/**
	 * Exit a parse tree produced by the `arrowExpr3`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitArrowExpr3?: (ctx: ArrowExpr3Context) => void;

	/**
	 * Enter a parse tree produced by the `unaryExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterUnaryExpr?: (ctx: UnaryExprContext) => void;
	/**
	 * Exit a parse tree produced by the `unaryExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitUnaryExpr?: (ctx: UnaryExprContext) => void;

	/**
	 * Enter a parse tree produced by the `postFixExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterPostFixExpr?: (ctx: PostFixExprContext) => void;
	/**
	 * Exit a parse tree produced by the `postFixExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitPostFixExpr?: (ctx: PostFixExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ternaryExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterTernaryExpr?: (ctx: TernaryExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ternaryExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitTernaryExpr?: (ctx: TernaryExprContext) => void;

	/**
	 * Enter a parse tree produced by the `anonymousFunctionExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterAnonymousFunctionExpr?: (ctx: AnonymousFunctionExprContext) => void;
	/**
	 * Exit a parse tree produced by the `anonymousFunctionExpr`
	 * labeled alternative in `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitAnonymousFunctionExpr?: (ctx: AnonymousFunctionExprContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.directive`.
	 * @param ctx the parse tree
	 */
	enterDirective?: (ctx: DirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.directive`.
	 * @param ctx the parse tree
	 */
	exitDirective?: (ctx: DirectiveContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.grammarDeclaration`.
	 * @param ctx the parse tree
	 */
	enterGrammarDeclaration?: (ctx: GrammarDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.grammarDeclaration`.
	 * @param ctx the parse tree
	 */
	exitGrammarDeclaration?: (ctx: GrammarDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.grammarRules`.
	 * @param ctx the parse tree
	 */
	enterGrammarRules?: (ctx: GrammarRulesContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.grammarRules`.
	 * @param ctx the parse tree
	 */
	exitGrammarRules?: (ctx: GrammarRulesContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.itemList`.
	 * @param ctx the parse tree
	 */
	enterItemList?: (ctx: ItemListContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.itemList`.
	 * @param ctx the parse tree
	 */
	exitItemList?: (ctx: ItemListContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.qualifiers`.
	 * @param ctx the parse tree
	 */
	enterQualifiers?: (ctx: QualifiersContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.qualifiers`.
	 * @param ctx the parse tree
	 */
	exitQualifiers?: (ctx: QualifiersContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.item`.
	 * @param ctx the parse tree
	 */
	enterItem?: (ctx: ItemContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.item`.
	 * @param ctx the parse tree
	 */
	exitItem?: (ctx: ItemContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.templateDeclaration`.
	 * @param ctx the parse tree
	 */
	enterTemplateDeclaration?: (ctx: TemplateDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.templateDeclaration`.
	 * @param ctx the parse tree
	 */
	exitTemplateDeclaration?: (ctx: TemplateDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.enumDeclaration`.
	 * @param ctx the parse tree
	 */
	enterEnumDeclaration?: (ctx: EnumDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.enumDeclaration`.
	 * @param ctx the parse tree
	 */
	exitEnumDeclaration?: (ctx: EnumDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.propertyDeclaration`.
	 * @param ctx the parse tree
	 */
	enterPropertyDeclaration?: (ctx: PropertyDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.propertyDeclaration`.
	 * @param ctx the parse tree
	 */
	exitPropertyDeclaration?: (ctx: PropertyDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 */
	enterDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 */
	exitDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.exportDeclaration`.
	 * @param ctx the parse tree
	 */
	enterExportDeclaration?: (ctx: ExportDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.exportDeclaration`.
	 * @param ctx the parse tree
	 */
	exitExportDeclaration?: (ctx: ExportDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.intrinsicDeclaration`.
	 * @param ctx the parse tree
	 */
	enterIntrinsicDeclaration?: (ctx: IntrinsicDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.intrinsicDeclaration`.
	 * @param ctx the parse tree
	 */
	exitIntrinsicDeclaration?: (ctx: IntrinsicDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.intrinsicMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	enterIntrinsicMethodDeclaration?: (ctx: IntrinsicMethodDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.intrinsicMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	exitIntrinsicMethodDeclaration?: (ctx: IntrinsicMethodDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.objectDeclaration`.
	 * @param ctx the parse tree
	 */
	enterObjectDeclaration?: (ctx: ObjectDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.objectDeclaration`.
	 * @param ctx the parse tree
	 */
	exitObjectDeclaration?: (ctx: ObjectDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.templateExpr`.
	 * @param ctx the parse tree
	 */
	enterTemplateExpr?: (ctx: TemplateExprContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.templateExpr`.
	 * @param ctx the parse tree
	 */
	exitTemplateExpr?: (ctx: TemplateExprContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.array`.
	 * @param ctx the parse tree
	 */
	enterArray?: (ctx: ArrayContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.array`.
	 * @param ctx the parse tree
	 */
	exitArray?: (ctx: ArrayContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.curlyObjectBody`.
	 * @param ctx the parse tree
	 */
	enterCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.curlyObjectBody`.
	 * @param ctx the parse tree
	 */
	exitCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 */
	enterSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 */
	exitSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.superTypes`.
	 * @param ctx the parse tree
	 */
	enterSuperTypes?: (ctx: SuperTypesContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.superTypes`.
	 * @param ctx the parse tree
	 */
	exitSuperTypes?: (ctx: SuperTypesContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.objectBody`.
	 * @param ctx the parse tree
	 */
	enterObjectBody?: (ctx: ObjectBodyContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.objectBody`.
	 * @param ctx the parse tree
	 */
	exitObjectBody?: (ctx: ObjectBodyContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.property`.
	 * @param ctx the parse tree
	 */
	enterProperty?: (ctx: PropertyContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.property`.
	 * @param ctx the parse tree
	 */
	exitProperty?: (ctx: PropertyContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.dictionaryProperty`.
	 * @param ctx the parse tree
	 */
	enterDictionaryProperty?: (ctx: DictionaryPropertyContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.dictionaryProperty`.
	 * @param ctx the parse tree
	 */
	exitDictionaryProperty?: (ctx: DictionaryPropertyContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.propertySet`.
	 * @param ctx the parse tree
	 */
	enterPropertySet?: (ctx: PropertySetContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.propertySet`.
	 * @param ctx the parse tree
	 */
	exitPropertySet?: (ctx: PropertySetContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 */
	enterParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 */
	exitParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	enterFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	exitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.functionHead`.
	 * @param ctx the parse tree
	 */
	enterFunctionHead?: (ctx: FunctionHeadContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.functionHead`.
	 * @param ctx the parse tree
	 */
	exitFunctionHead?: (ctx: FunctionHeadContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.codeBlock`.
	 * @param ctx the parse tree
	 */
	enterCodeBlock?: (ctx: CodeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.codeBlock`.
	 * @param ctx the parse tree
	 */
	exitCodeBlock?: (ctx: CodeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.stats`.
	 * @param ctx the parse tree
	 */
	enterStats?: (ctx: StatsContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.stats`.
	 * @param ctx the parse tree
	 */
	exitStats?: (ctx: StatsContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.gotoStatement`.
	 * @param ctx the parse tree
	 */
	enterGotoStatement?: (ctx: GotoStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.gotoStatement`.
	 * @param ctx the parse tree
	 */
	exitGotoStatement?: (ctx: GotoStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.breakStatement`.
	 * @param ctx the parse tree
	 */
	enterBreakStatement?: (ctx: BreakStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.breakStatement`.
	 * @param ctx the parse tree
	 */
	exitBreakStatement?: (ctx: BreakStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.continueStatement`.
	 * @param ctx the parse tree
	 */
	enterContinueStatement?: (ctx: ContinueStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.continueStatement`.
	 * @param ctx the parse tree
	 */
	exitContinueStatement?: (ctx: ContinueStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.labelStatement`.
	 * @param ctx the parse tree
	 */
	enterLabelStatement?: (ctx: LabelStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.labelStatement`.
	 * @param ctx the parse tree
	 */
	exitLabelStatement?: (ctx: LabelStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.switchStatement`.
	 * @param ctx the parse tree
	 */
	enterSwitchStatement?: (ctx: SwitchStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.switchStatement`.
	 * @param ctx the parse tree
	 */
	exitSwitchStatement?: (ctx: SwitchStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.throwStatement`.
	 * @param ctx the parse tree
	 */
	enterThrowStatement?: (ctx: ThrowStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.throwStatement`.
	 * @param ctx the parse tree
	 */
	exitThrowStatement?: (ctx: ThrowStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.forInStatement`.
	 * @param ctx the parse tree
	 */
	enterForInStatement?: (ctx: ForInStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.forInStatement`.
	 * @param ctx the parse tree
	 */
	exitForInStatement?: (ctx: ForInStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.forEachStatement`.
	 * @param ctx the parse tree
	 */
	enterForEachStatement?: (ctx: ForEachStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.forEachStatement`.
	 * @param ctx the parse tree
	 */
	exitForEachStatement?: (ctx: ForEachStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.returnStatement`.
	 * @param ctx the parse tree
	 */
	enterReturnStatement?: (ctx: ReturnStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.returnStatement`.
	 * @param ctx the parse tree
	 */
	exitReturnStatement?: (ctx: ReturnStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.doWhileStatement`.
	 * @param ctx the parse tree
	 */
	enterDoWhileStatement?: (ctx: DoWhileStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.doWhileStatement`.
	 * @param ctx the parse tree
	 */
	exitDoWhileStatement?: (ctx: DoWhileStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.whileStatement`.
	 * @param ctx the parse tree
	 */
	enterWhileStatement?: (ctx: WhileStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.whileStatement`.
	 * @param ctx the parse tree
	 */
	exitWhileStatement?: (ctx: WhileStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.forStatement`.
	 * @param ctx the parse tree
	 */
	enterForStatement?: (ctx: ForStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.forStatement`.
	 * @param ctx the parse tree
	 */
	exitForStatement?: (ctx: ForStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.tryCatchStatement`.
	 * @param ctx the parse tree
	 */
	enterTryCatchStatement?: (ctx: TryCatchStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.tryCatchStatement`.
	 * @param ctx the parse tree
	 */
	exitTryCatchStatement?: (ctx: TryCatchStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.callStatement`.
	 * @param ctx the parse tree
	 */
	enterCallStatement?: (ctx: CallStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.callStatement`.
	 * @param ctx the parse tree
	 */
	exitCallStatement?: (ctx: CallStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.emptyStatement`.
	 * @param ctx the parse tree
	 */
	enterEmptyStatement?: (ctx: EmptyStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.emptyStatement`.
	 * @param ctx the parse tree
	 */
	exitEmptyStatement?: (ctx: EmptyStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.sayStatement`.
	 * @param ctx the parse tree
	 */
	enterSayStatement?: (ctx: SayStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.sayStatement`.
	 * @param ctx the parse tree
	 */
	exitSayStatement?: (ctx: SayStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.assignmentStatement`.
	 * @param ctx the parse tree
	 */
	enterAssignmentStatement?: (ctx: AssignmentStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.assignmentStatement`.
	 * @param ctx the parse tree
	 */
	exitAssignmentStatement?: (ctx: AssignmentStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.ifStatement`.
	 * @param ctx the parse tree
	 */
	enterIfStatement?: (ctx: IfStatementContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.ifStatement`.
	 * @param ctx the parse tree
	 */
	exitIfStatement?: (ctx: IfStatementContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 */
	enterEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 */
	exitEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	enterPrimary?: (ctx: PrimaryContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.primary`.
	 * @param ctx the parse tree
	 */
	exitPrimary?: (ctx: PrimaryContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.identifierAtom`.
	 * @param ctx the parse tree
	 */
	enterIdentifierAtom?: (ctx: IdentifierAtomContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.identifierAtom`.
	 * @param ctx the parse tree
	 */
	exitIdentifierAtom?: (ctx: IdentifierAtomContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.params`.
	 * @param ctx the parse tree
	 */
	enterParams?: (ctx: ParamsContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.params`.
	 * @param ctx the parse tree
	 */
	exitParams?: (ctx: ParamsContext) => void;

	/**
	 * Enter a parse tree produced by `T3ParserParser.optionallyTypedOptionalId`.
	 * @param ctx the parse tree
	 */
	enterOptionallyTypedOptionalId?: (ctx: OptionallyTypedOptionalIdContext) => void;
	/**
	 * Exit a parse tree produced by `T3ParserParser.optionallyTypedOptionalId`.
	 * @param ctx the parse tree
	 */
	exitOptionallyTypedOptionalId?: (ctx: OptionallyTypedOptionalIdContext) => void;
}

