// Generated from server/src/parser/Tads3v2.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `Tads3v2Parser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface Tads3v2Visitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `eqNeqSuffix`
	 * labeled alternative in `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqNeqSuffix?: (ctx: EqNeqSuffixContext) => Result;

	/**
	 * Visit a parse tree produced by the `isInSuffix`
	 * labeled alternative in `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsInSuffix?: (ctx: IsInSuffixContext) => Result;

	/**
	 * Visit a parse tree produced by the `notInSuffix`
	 * labeled alternative in `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotInSuffix?: (ctx: NotInSuffixContext) => Result;

	/**
	 * Visit a parse tree produced by the `inheritedAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInheritedAtom?: (ctx: InheritedAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `hexAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHexAtom?: (ctx: HexAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `numberAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberAtom?: (ctx: NumberAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `referenceAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReferenceAtom?: (ctx: ReferenceAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `idAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdAtom?: (ctx: IdAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `singleQuoteStringAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingleQuoteStringAtom?: (ctx: SingleQuoteStringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `doubleQuoteStringAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoubleQuoteStringAtom?: (ctx: DoubleQuoteStringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `regexpStringAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegexpStringAtom?: (ctx: RegexpStringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `booleanAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanAtom?: (ctx: BooleanAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `nilAtom`
	 * labeled alternative in `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNilAtom?: (ctx: NilAtomContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirective?: (ctx: DirectiveContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.pragmaDirective`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPragmaDirective?: (ctx: PragmaDirectiveContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.grammarRules`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrammarRules?: (ctx: GrammarRulesContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.itemList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitItemList?: (ctx: ItemListContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.qualifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiers?: (ctx: QualifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitItem?: (ctx: ItemContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.templateDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemplateDeclaration?: (ctx: TemplateDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.enumDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumDeclaration?: (ctx: EnumDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.propertyDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertyDeclaration?: (ctx: PropertyDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.dictionaryDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionaryDeclaration?: (ctx: DictionaryDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.exportDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExportDeclaration?: (ctx: ExportDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.intrinsicDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntrinsicDeclaration?: (ctx: IntrinsicDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.intrinsicMethodDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntrinsicMethodDeclaration?: (ctx: IntrinsicMethodDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.objectDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectDeclaration?: (ctx: ObjectDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.grammarDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrammarDeclaration?: (ctx: GrammarDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.templateDefItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemplateDefItem?: (ctx: TemplateDefItemContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.templateDefToken`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemplateDefToken?: (ctx: TemplateDefTokenContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.templateExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemplateExpr?: (ctx: TemplateExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.templatePrefixOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemplatePrefixOp?: (ctx: TemplatePrefixOpContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray?: (ctx: ArrayContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.argExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgExpr?: (ctx: ArgExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.curlyObjectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCurlyObjectBody?: (ctx: CurlyObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.semiColonEndedObjectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSemiColonEndedObjectBody?: (ctx: SemiColonEndedObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.superTypes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSuperTypes?: (ctx: SuperTypesContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.objectBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectBody?: (ctx: ObjectBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.property`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty?: (ctx: PropertyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.dictionaryProperty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionaryProperty?: (ctx: DictionaryPropertyContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.propertySet`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertySet?: (ctx: PropertySetContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.paramsWithWildcard`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamsWithWildcard?: (ctx: ParamsWithWildcardContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.functionDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.operatorOverride`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperatorOverride?: (ctx: OperatorOverrideContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.functionHead`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionHead?: (ctx: FunctionHeadContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.codeBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodeBlock?: (ctx: CodeBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.stats`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStats?: (ctx: StatsContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.innerCodeBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInnerCodeBlock?: (ctx: InnerCodeBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.gotoStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGotoStatement?: (ctx: GotoStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.breakStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreakStatement?: (ctx: BreakStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.continueStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinueStatement?: (ctx: ContinueStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.labelStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLabelStatement?: (ctx: LabelStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.switchStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitchStatement?: (ctx: SwitchStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.switchCase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitchCase?: (ctx: SwitchCaseContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.throwStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThrowStatement?: (ctx: ThrowStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.forInStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForInStatement?: (ctx: ForInStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.forEachStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForEachStatement?: (ctx: ForEachStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.returnStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnStatement?: (ctx: ReturnStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.doWhileStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDoWhileStatement?: (ctx: DoWhileStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.whileStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhileStatement?: (ctx: WhileStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.forStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForStatement?: (ctx: ForStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.forUpdate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForUpdate?: (ctx: ForUpdateContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.forInit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForInit?: (ctx: ForInitContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.forInitItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForInitItem?: (ctx: ForInitItemContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.tryCatchStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTryCatchStatement?: (ctx: TryCatchStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.emptyStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptyStatement?: (ctx: EmptyStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.sayStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSayStatement?: (ctx: SayStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.assignmentStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentStatement?: (ctx: AssignmentStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.localVarDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocalVarDecl?: (ctx: LocalVarDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.ifStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStatement?: (ctx: IfStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.enclosedExprCodeBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnclosedExprCodeBlock?: (ctx: EnclosedExprCodeBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.assignmentExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentExpr?: (ctx: AssignmentExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.assignmentOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentOp?: (ctx: AssignmentOpContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.conditionalExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionalExpr?: (ctx: ConditionalExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.ifNilExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfNilExpr?: (ctx: IfNilExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.logicalOrExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalOrExpr?: (ctx: LogicalOrExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.logicalAndExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalAndExpr?: (ctx: LogicalAndExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.bitwiseOrExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitwiseOrExpr?: (ctx: BitwiseOrExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.bitwiseXorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitwiseXorExpr?: (ctx: BitwiseXorExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.bitwiseAndExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitwiseAndExpr?: (ctx: BitwiseAndExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.equalityExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityExpr?: (ctx: EqualityExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.equalitySuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualitySuffix?: (ctx: EqualitySuffixContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.relationalExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelationalExpr?: (ctx: RelationalExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.relationalOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelationalOp?: (ctx: RelationalOpContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.shiftExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShiftExpr?: (ctx: ShiftExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.additiveExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpr?: (ctx: AdditiveExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.multiplicativeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicativeExpr?: (ctx: MultiplicativeExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.unaryExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryExpr?: (ctx: UnaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.prefixOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrefixOp?: (ctx: PrefixOpContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.postfixExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostfixExpr?: (ctx: PostfixExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.postfixSuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostfixSuffix?: (ctx: PostfixSuffixContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.primaryExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimaryExpr?: (ctx: PrimaryExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary?: (ctx: PrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.memberExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberExpr?: (ctx: MemberExprContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.identifierAtom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierAtom?: (ctx: IdentifierAtomContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.softKeyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSoftKeyword?: (ctx: SoftKeywordContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.params`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParams?: (ctx: ParamsContext) => Result;

	/**
	 * Visit a parse tree produced by `Tads3v2Parser.param`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam?: (ctx: ParamContext) => Result;
}

