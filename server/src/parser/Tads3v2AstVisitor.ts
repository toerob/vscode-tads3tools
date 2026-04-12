import { ParserRuleContext } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { ScopedEnvironment } from './ScopedEnvironment';
import { MapNodeData } from '../modules/mapcrawling/MapNodeData';
import { Tads3v2Visitor } from './Tads3v2Visitor';
import {
  AdditiveExprContext,
  ArrayContext,
  AssignmentExprContext,
  AssignmentStatementContext,
  LocalVarDeclContext,
  BreakStatementContext,
  CodeBlockContext,
  ContinueStatementContext,
  DoWhileStatementContext,
  EmptyStatementContext,
  EnclosedExprCodeBlockContext,
  ExprContext,
  ForEachStatementContext,
  ForInStatementContext,
  ForStatementContext,
  ForInitContext,
  ForInitItemContext,
  ForUpdateContext,
  GotoStatementContext,
  ParamContext,
  ParamsContext,
  IfStatementContext,
  InnerCodeBlockContext,
  LabelStatementContext,
  ReturnStatementContext,
  SayStatementContext,
  SwitchCaseContext,
  SwitchStatementContext,
  ThrowStatementContext,
  TryCatchStatementContext,
  WhileStatementContext,
  BitwiseAndExprContext,
  BitwiseOrExprContext,
  BitwiseXorExprContext,
  ConditionalExprContext,
  EqualityExprContext,
  EqNeqSuffixContext,
  IsInSuffixContext,
  NotInSuffixContext,
  IfNilExprContext,
  LogicalAndExprContext,
  LogicalOrExprContext,
  RelationalExprContext,
  RelationalOpContext,
  ShiftExprContext,
  BooleanAtomContext,
  HexAtomContext,
  IdAtomContext,
  InheritedAtomContext,
  MultiplicativeExprContext,
  NilAtomContext,
  NumberAtomContext,
  MemberExprContext,
  PostfixExprContext,
  PostfixSuffixContext,
  PrefixOpContext,
  PrimaryExprContext,
  ReferenceAtomContext,
  RegexpStringAtomContext,
  SingleQuoteStringAtomContext,
  DoubleQuoteStringAtomContext,
  Tads3v2Parser,
  UnaryExprContext,
  ProgramContext,
  ObjectDeclarationContext,
  ObjectBodyContext,
  CurlyObjectBodyContext,
  SemiColonEndedObjectBodyContext,
  SuperTypesContext,
  PropertyContext,
  PropertySetContext,
  ParamsWithWildcardContext,
  FunctionDeclarationContext,
  FunctionHeadContext,
  OperatorOverrideContext,
  TemplateDeclarationContext,
  TemplateDefItemContext,
  TemplateDefTokenContext,
  TemplatePrefixOpContext,
  IntrinsicDeclarationContext,
} from './Tads3v2Parser';
import {
  AssignmentNode,
  AssignmentOpKind,
  AstNode,
  BlockNode,
  BreakStmtNode,
  CatchClause,
  ConditionalNode,
  ContinueStmtNode,
  DoWhileStmtNode,
  ForEachStmtNode,
  ForInStmtNode,
  ForStmtNode,
  GotoStmtNode,
  IfBranch,
  IfStmtNode,
  IsInNode,
  LabelStmtNode,
  CaseClause,
  SwitchStmtNode,
  LocalDeclNode,
  LocalDeclListNode,
  NotInNode,
  ReturnStmtNode,
  SayStmtNode,
  ThrowStmtNode,
  TryCatchNode,
  WhileStmtNode,
  SourceRange,
  AnonObjectNode,
  BinaryOpKind,
  BinaryOpNode,
  AnonObjectTypedNode,
  ArrowNode,
  ArrowOpNode,
  ArrayLiteralNode,
  BooleanNode,
  CallNode,
  DelegatedExprNode,
  FunctionExprNode,
  HexNode,
  IdentifierNode,
  IndexAccessNode,
  InheritedCallNode,
  InheritedNode,
  LambdaCallNode,
  LambdaNode,
  ParamNode,
  LocalExprNode,
  MemberAccessNode,
  NewExprNode,
  NilNode,
  NumberNode,
  ParenNode,
  PostDecrementNode,
  PostIncrementNode,
  RangeExprNode,
  ReferenceNode,
  RegexpNode,
  StarArrowNode,
  StaticExprNode,
  StringNode,
  TransientExprNode,
  UnaryOpKind,
  UnaryOpNode,
  ProgramNode,
  ObjectDeclNode,
  ObjectBodyNode,
  PropertyDeclNode,
  FunctionDeclNode,
  OperatorOverrideNode,
  PropertySetNode,
  TemplateDeclNode,
  TemplateItemNode,
  TemplateTokenKind,
  IntrinsicDeclNode,
  IntrinsicMethodNode,
} from './ast/nodes';
import { createContext } from 'vm';

export class Tads3v2AstVisitor
  extends AbstractParseTreeVisitor<AstNode>
  implements Tads3v2Visitor<AstNode>
{
  /** name → 1-based ANTLR line numbers (matches the old listener's convention; downstream subtracts 1) */
  readonly keywordLines: Map<string, number[]> = new Map();

  /** class name → supertype name (last supertype wins, matching old listener behavior) */
  readonly inheritanceMap: Map<string, string> = new Map();

  /** object name → map-editor metadata (keyed by name, stable across reparsing) */
  readonly mapData: Map<string, MapNodeData> = new Map();

  /** Root scope; child scopes are pushed/popped around object/function bodies */
  readonly globalEnvironment: ScopedEnvironment = new ScopedEnvironment();
  private currentScope: ScopedEnvironment = this.globalEnvironment;
  private currentObjectId: string | null = null;
  /** Tracks the last object id seen at each nesting level (number of leading '+' signs).
   *  Used to resolve the parent of sequential sibling objects at the same level. */
  private lastObjectIdAtLevel: Map<number, string | null> = new Map();

  protected defaultResult(): AstNode {
    return { kind: 'Unhandled' };
  }

  /** Wrap every rule-context visit result with a source range. */
  visit(tree: ParseTree): AstNode {
    const node = super.visit(tree);
    if (tree instanceof ParserRuleContext && tree.start) {
      const start = tree.start;
      const stop  = tree.stop ?? start;
      const range: SourceRange = {
        start: { line: start.line - 1, character: start.charPositionInLine },
        end:   {
          line: stop.line - 1,
          character: stop.charPositionInLine + (stop.text?.length ?? 0),
        },
      };
      return { ...node, range };
    }
    return node;
  }

  // ── primary labeled alternatives ─────────────────────────────────────────

  visitInheritedAtom(_ctx: InheritedAtomContext): InheritedNode {
    return { kind: 'Inherited' };
  }

  visitHexAtom(ctx: HexAtomContext): HexNode {
    return { kind: 'Hex', value: ctx.HEX().text };
  }

  visitNumberAtom(ctx: NumberAtomContext): NumberNode {
    return { kind: 'Number', value: ctx.NR().text };
  }

  visitReferenceAtom(ctx: ReferenceAtomContext): ReferenceNode {
    return { kind: 'Reference', name: ctx.identifierAtom().text };
  }

  visitIdAtom(ctx: IdAtomContext): IdentifierNode {
    const name = ctx.identifierAtom().text;
    const line = ctx.identifierAtom().start.line; // 1-based
    const existing = this.keywordLines.get(name);
    if (existing) existing.push(line);
    else this.keywordLines.set(name, [line]);
    return { kind: 'Identifier', name };
  }

  visitSingleQuoteStringAtom(ctx: SingleQuoteStringAtomContext): StringNode {
    return { kind: 'String', quoteStyle: 'single', value: ctx.SSTR().text };
  }

  visitDoubleQuoteStringAtom(ctx: DoubleQuoteStringAtomContext): StringNode {
    return { kind: 'String', quoteStyle: 'double', value: ctx.DSTR().text };
  }

  visitRegexpStringAtom(ctx: RegexpStringAtomContext): RegexpNode {
    return { kind: 'Regexp', value: ctx.RSTR().text };
  }

  visitBooleanAtom(_ctx: BooleanAtomContext): BooleanNode {
    return { kind: 'Boolean', value: true };
  }

  visitNilAtom(_ctx: NilAtomContext): NilNode {
    return { kind: 'Nil' };
  }

  // ── primaryExpr (dispatches by which child is present) ───────────────────

  visitPrimaryExpr(ctx: PrimaryExprContext): AstNode {
    // ( array? )  — single paren expr or comma-list (a, b, ...)
    if (ctx.LEFT_PAREN()) {
      const arrayCtx = ctx.array();
      if (!arrayCtx) return { kind: 'Paren', inner: null } satisfies ParenNode;
      const elems = arrayCtx.argExpr().map(a => this.visit(a.expr()));
      if (elems.length === 1) return { kind: 'Paren', inner: elems[0] } satisfies ParenNode;
      return { kind: 'ArrayLiteral', elements: elems } satisfies ArrayLiteralNode;
    }

    // [ array? ]
    if (ctx.LEFT_BRACKET()) {
      return this.visitArrayLiteral(ctx.array());
    }

    // { params? : expr? }  — lambda
    if (ctx.LEFT_CURLY()) {
      const paramsCtx = ctx.params();
      const params = paramsCtx ? this.visitParamList(paramsCtx) : [];
      const bodyCtx = ctx.expr();
      const body = bodyCtx ? this.visit(bodyCtx) : null;
      return { kind: 'Lambda', params, body } satisfies LambdaNode;
    }

    // * -> expr
    if (ctx.STAR()) {
      const target = this.visit(ctx.expr()!);
      return { kind: 'StarArrow', target } satisfies StarArrowNode;
    }

    // -> expr  (no STAR)
    if (ctx.ARROW()) {
      const target = this.visit(ctx.expr()!);
      return { kind: 'Arrow', target } satisfies ArrowNode;
    }

    // anonymous function expression:  function(params) { ... }
    if (ctx.FUNCTION()) {
      return { kind: 'FunctionExpr' } satisfies FunctionExprNode;
    }

    // primary — delegate; the labeled-alternative visitor methods handle it
    const primaryCtx = ctx.primary();
    if (primaryCtx) {
      return this.visit(primaryCtx);
    }

    return this.defaultResult();
  }

  // ── shiftExpr / additiveExpr / multiplicativeExpr ────────────────────────

  visitCodeBlock(ctx: CodeBlockContext): AstNode {
    const body = ctx.stats().map(s => this.visit(s));
    return { kind: 'Block', body } satisfies BlockNode;
  }

  visitIfStatement(ctx: IfStatementContext): AstNode {
    const branches = ctx.enclosedExprCodeBlock();
    const condition  = this.visit(branches[0].expr());
    const consequent = this.visit(branches[0].codeBlock());
    const elseIfs: IfBranch[] = branches.slice(1).map(b => ({
      condition:  this.visit(b.expr()),
      consequent: this.visit(b.codeBlock()),
    }));
    const elseCtx  = ctx.codeBlock();
    const alternate = elseCtx ? this.visit(elseCtx) : null;
    return { kind: 'IfStmt', condition, consequent, elseIfs, alternate } satisfies IfStmtNode;
  }

  visitTryCatchStatement(ctx: TryCatchStatementContext): AstNode {
    const blocks     = ctx.codeBlock();
    const catchCount = ctx.CATCH().length;
    const hasFinally = !!ctx.FINALLY();

    const body = this.visit(blocks[0]);

    const catchParams = ctx.params();
    const catches: CatchClause[] = [];
    for (let i = 0; i < catchCount; i++) {
      catches.push({
        params: catchParams[i] ? this.visitParamList(catchParams[i]) : [],
        body:   this.visit(blocks[i + 1]),
      });
    }

    const finallyBlock = hasFinally ? this.visit(blocks[blocks.length - 1]) : null;

    return { kind: 'TryCatch', body, catches, finallyBlock } satisfies TryCatchNode;
  }

  visitReturnStatement(ctx: ReturnStatementContext): AstNode {
    const exprCtx = ctx.expr();
    const value = exprCtx ? this.visit(exprCtx) : null;
    return { kind: 'ReturnStmt', value } satisfies ReturnStmtNode;
  }

  visitThrowStatement(ctx: ThrowStatementContext): AstNode {
    return { kind: 'ThrowStmt', value: this.visit(ctx.expr()) } satisfies ThrowStmtNode;
  }

  visitWhileStatement(ctx: WhileStatementContext): AstNode {
    const exprCtx = ctx.expr();
    const condition = exprCtx ? this.visit(exprCtx) : null;
    const body = this.visit(ctx.codeBlock());
    return { kind: 'WhileStmt', condition, body } satisfies WhileStmtNode;
  }

  visitDoWhileStatement(ctx: DoWhileStatementContext): AstNode {
    const exprCtx = ctx.expr();
    const body = this.visit(ctx.codeBlock());
    const condition = exprCtx ? this.visit(exprCtx) : null;
    return { kind: 'DoWhileStmt', body, condition } satisfies DoWhileStmtNode;
  }

  visitForStatement(ctx: ForStatementContext): AstNode {
    const initCtx   = ctx.forInit();
    const init      = initCtx ? this.visit(initCtx) : null;
    const condition = ctx._cond ? this.visit(ctx._cond) : null;
    // forUpdate is zero or more comma-separated expressions; fold into a Block if multiple
    const updateCtx = ctx.forUpdate();
    let update: AstNode | null = null;
    if (updateCtx) {
      const exprs = updateCtx.expr().map(e => this.visit(e));
      update = exprs.length === 1 ? exprs[0] : { kind: 'Block', body: exprs } satisfies BlockNode;
    }
    const body = this.visit(ctx.codeBlock());
    return { kind: 'ForStmt', init, condition, update, body } satisfies ForStmtNode;
  }

  visitForInit(ctx: ForInitContext): AstNode {
    const items = ctx.forInitItem();
    const nodes = items.map(item => this.visitForInitItem(item));
    if (nodes.length === 1) return nodes[0];
    // Multiple init items — collect any local decls; if all are locals, return LocalDeclList.
    const decls: LocalDeclNode[] = nodes.filter((n): n is LocalDeclNode => n.kind === 'LocalDecl');
    if (decls.length === nodes.length) {
      return { kind: 'LocalDeclList', decls } satisfies LocalDeclListNode;
    }
    // Mixed local + expression inits: wrap in a block of statements.
    return { kind: 'Block', body: nodes } satisfies BlockNode;
  }

  visitForInitItem(ctx: ForInitItemContext): AstNode {
    const exprCtx = ctx.expr();
    if (exprCtx) return this.visit(exprCtx);
    const d = ctx.localVarDecl()!;
    const name = d.identifierAtom().text;
    const initCtx = d.expr();
    const init = initCtx ? this.visit(initCtx) : null;
    return { kind: 'LocalDecl', name, init } satisfies LocalDeclNode;
  }

  visitForInStatement(ctx: ForInStatementContext): AstNode {
    const name = ctx.identifierAtom().text;
    const iterable = this.visit(ctx._iterable);
    const body = this.visit(ctx.codeBlock());
    return { kind: 'ForInStmt', name, iterable, body } satisfies ForInStmtNode;
  }

  visitForEachStatement(ctx: ForEachStatementContext): AstNode {
    const exprs = ctx.expr();
    const variable = this.visit(exprs[0]);
    const iterable = this.visit(exprs[1]);
    const body = this.visit(ctx.codeBlock());
    return { kind: 'ForEachStmt', variable, iterable, body } satisfies ForEachStmtNode;
  }

  visitBreakStatement(ctx: BreakStatementContext): AstNode {
    const labelCtx = ctx.identifierAtom();
    return { kind: 'BreakStmt', label: labelCtx ? labelCtx.text : null } satisfies BreakStmtNode;
  }

  visitContinueStatement(ctx: ContinueStatementContext): AstNode {
    const labelCtx = ctx.identifierAtom();
    return { kind: 'ContinueStmt', label: labelCtx ? labelCtx.text : null } satisfies ContinueStmtNode;
  }

  visitGotoStatement(ctx: GotoStatementContext): AstNode {
    const labelCtx = ctx.identifierAtom();
    return { kind: 'GotoStmt', label: labelCtx ? labelCtx.text : null } satisfies GotoStmtNode;
  }

  visitLabelStatement(ctx: LabelStatementContext): AstNode {
    return { kind: 'LabelStmt', name: ctx.identifierAtom().text } satisfies LabelStmtNode;
  }

  visitInnerCodeBlock(ctx: InnerCodeBlockContext): AstNode {
    const body = ctx.stats().map(s => this.visit(s));
    return { kind: 'Block', body } satisfies BlockNode;
  }

  visitSwitchStatement(ctx: SwitchStatementContext): AstNode {
    const discriminant = this.visit(ctx._discriminant);
    const cases: CaseClause[] = ctx._cases.map(c => ({
      test: c._test ? this.visit(c._test) : null,
      body: c._body.map(s => this.visit(s)),
    }));
    return { kind: 'SwitchStmt', discriminant, cases } satisfies SwitchStmtNode;
  }

  // SwitchCaseContext is visited inline above; this satisfies the Visitor interface
  visitSwitchCase(_ctx: SwitchCaseContext): AstNode {
    return this.defaultResult();
  }

  visitSayStatement(ctx: SayStatementContext): AstNode {
    return { kind: 'SayStmt', value: ctx.DSTR().text } satisfies SayStmtNode;
  }

  visitEmptyStatement(ctx: EmptyStatementContext): AstNode {
    const exprCtx = ctx.expr();
    return exprCtx ? this.visit(exprCtx) : this.defaultResult();
  }

  visitAssignmentStatement(ctx: AssignmentStatementContext): AstNode {
    const decls = ctx.localVarDecl();
    const toLocalDecl = (d: LocalVarDeclContext): LocalDeclNode => {
      const name = d.identifierAtom().text;
      const initCtx = d.expr();
      const init = initCtx ? this.visit(initCtx) : null;
      return { kind: 'LocalDecl', name, init } satisfies LocalDeclNode;
    };
    if (decls.length === 1) return toLocalDecl(decls[0]);
    return { kind: 'LocalDeclList', decls: decls.map(toLocalDecl) } satisfies LocalDeclListNode;
  }

  visitExpr(ctx: ExprContext): AstNode {
    return this.visit(ctx.assignmentExpr());
  }

  visitAssignmentExpr(ctx: AssignmentExprContext): AstNode {
    if (!ctx.assignmentOp()) {
      return this.visit(ctx.conditionalExpr());
    }
    const target = this.visit(ctx.conditionalExpr());
    const op     = ctx.assignmentOp()!.text as AssignmentOpKind;
    const value  = this.visit(ctx.assignmentExpr()!);
    return { kind: 'Assignment', op, target, value } satisfies AssignmentNode;
  }

  visitConditionalExpr(ctx: ConditionalExprContext): AstNode {
    if (!ctx.OPTIONAL()) {
      return this.visit(ctx.ifNilExpr());
    }
    const condition  = this.visit(ctx.ifNilExpr());
    const consequent = this.visit(ctx.expr()!);
    const alternate  = this.visit(ctx.conditionalExpr()!);
    return { kind: 'Conditional', condition, consequent, alternate } satisfies ConditionalNode;
  }

  visitBitwiseAndExpr(ctx: BitwiseAndExprContext): AstNode {
    const operands = ctx.equalityExpr().map(c => this.visit(c));
    const ops = this.interleaved(ctx, operands.length);
    return this.foldBinary(operands, ops);
  }

  visitBitwiseXorExpr(ctx: BitwiseXorExprContext): AstNode {
    const operands = ctx.bitwiseAndExpr().map(c => this.visit(c));
    const ops = this.interleaved(ctx, operands.length);
    return this.foldBinary(operands, ops);
  }

  visitBitwiseOrExpr(ctx: BitwiseOrExprContext): AstNode {
    const operands = ctx.bitwiseXorExpr().map(c => this.visit(c));
    const ops = this.interleaved(ctx, operands.length);
    return this.foldBinary(operands, ops);
  }

  visitLogicalAndExpr(ctx: LogicalAndExprContext): AstNode {
    const operands = ctx.bitwiseOrExpr().map(c => this.visit(c));
    const ops = this.interleaved(ctx, operands.length);
    return this.foldBinary(operands, ops);
  }

  visitLogicalOrExpr(ctx: LogicalOrExprContext): AstNode {
    const operands = ctx.logicalAndExpr().map(c => this.visit(c));
    const ops = this.interleaved(ctx, operands.length);
    return this.foldBinary(operands, ops);
  }

  visitIfNilExpr(ctx: IfNilExprContext): AstNode {
    const operands = ctx.logicalOrExpr().map(c => this.visit(c));
    const ops = this.interleaved(ctx, operands.length);
    return this.foldBinary(operands, ops);
  }

  visitEqualityExpr(ctx: EqualityExprContext): AstNode {
    let result = this.visit(ctx.relationalExpr());
    for (const suffix of ctx.equalitySuffix()) {
      if (suffix instanceof EqNeqSuffixContext) {
        const op: BinaryOpKind = suffix.EQ() ? '==' : '!=';
        const right = this.visit(suffix.relationalExpr());
        result = { kind: 'BinaryOp', op, left: result, right } satisfies BinaryOpNode;
      } else if (suffix instanceof IsInSuffixContext) {
        const values = suffix.array().argExpr().map(a => this.visit(a.expr()));
        result = { kind: 'IsIn', operand: result, values } satisfies IsInNode;
      } else if (suffix instanceof NotInSuffixContext) {
        const values = suffix.array().argExpr().map(a => this.visit(a.expr()));
        result = { kind: 'NotIn', operand: result, values } satisfies NotInNode;
      }
    }
    return result;
  }

  visitRelationalExpr(ctx: RelationalExprContext): AstNode {
    const operands = ctx.shiftExpr().map(c => this.visit(c));
    const ops = ctx.relationalOp().map(c => this.relationalOpKind(c));
    return this.foldBinary(operands, ops);
  }

  private relationalOpKind(ctx: RelationalOpContext): BinaryOpKind {
    if (ctx.LT())   return '<';
    if (ctx.GT())   return '>';
    if (ctx.LTEQ()) return '<=';
    return '>='; // GTEQ
  }

  visitShiftExpr(ctx: ShiftExprContext): AstNode {
    const operands = ctx.additiveExpr().map(c => this.visit(c));
    const ops = this.interleaved(ctx, operands.length);
    return this.foldBinary(operands, ops);
  }

  visitAdditiveExpr(ctx: AdditiveExprContext): AstNode {
    const operands = ctx.multiplicativeExpr().map(c => this.visit(c));
    const ops = this.interleaved(ctx, operands.length);
    return this.foldBinary(operands, ops);
  }

  visitMultiplicativeExpr(ctx: MultiplicativeExprContext): AstNode {
    const operands = ctx.unaryExpr().map(c => this.visit(c));
    const ops = this.interleaved(ctx, operands.length);
    return this.foldBinary(operands, ops);
  }

  // ── unaryExpr ────────────────────────────────────────────────────────────

  visitUnaryExpr(ctx: UnaryExprContext): AstNode {
    if (ctx.postfixExpr()) {
      return this.visit(ctx.postfixExpr()!);
    }

    const operand = this.visit(ctx.unaryExpr()!);

    if (ctx.prefixOp()) {
      const op = this.prefixOpKind(ctx.prefixOp()!);
      return { kind: 'UnaryOp', op, operand } satisfies UnaryOpNode;
    }
    if (ctx.NEW())       return { kind: 'NewExpr',       expr: operand } satisfies NewExprNode;
    if (ctx.DELEGATED()) return { kind: 'DelegatedExpr', expr: operand } satisfies DelegatedExprNode;
    if (ctx.INHERITED()) return { kind: 'InheritedCall', expr: operand } satisfies InheritedCallNode;
    if (ctx.TRANSIENT()) return { kind: 'TransientExpr', expr: operand } satisfies TransientExprNode;
    if (ctx.LOCAL())     return { kind: 'LocalExpr',     expr: operand } satisfies LocalExprNode;
    if (ctx.STATIC())    return { kind: 'StaticExpr',    expr: operand } satisfies StaticExprNode;

    return this.defaultResult();
  }

  private prefixOpKind(ctx: PrefixOpContext): UnaryOpKind {
    if (ctx.NOT())         return '!';
    if (ctx.PLUS())        return '+';
    if (ctx.MINUS())       return '-';
    if (ctx.TILDE())       return '~';
    if (ctx.STAR())        return '*';
    if (ctx.AMP())         return '&';
    if (ctx.AT())          return '@';
    return 'not'; // LITERAL_NOT
  }

  visitMemberExpr(ctx: MemberExprContext): AstNode {
    if (ctx.identifierAtom()) {
      return { kind: 'Identifier', name: ctx.identifierAtom()!.text } satisfies IdentifierNode;
    }
    // LEFT_PAREN expr RIGHT_PAREN — dynamic property
    const inner = ctx.expr();
    return { kind: 'Paren', inner: inner ? this.visit(inner) : null } satisfies ParenNode;
  }

  // ── postfixExpr ──────────────────────────────────────────────────────────

  visitPostfixExpr(ctx: PostfixExprContext): AstNode {
    let node = this.visit(ctx.primaryExpr());
    for (const suffix of ctx.postfixSuffix()) {
      node = this.applyPostfixSuffix(node, suffix);
    }
    return node;
  }

  private applyPostfixSuffix(object: AstNode, ctx: PostfixSuffixContext): AstNode {
    // expr.member  or  expr.(expr)
    if (ctx.DOT()) {
      const member = this.visitMemberExpr(ctx.memberExpr()!);
      return { kind: 'MemberAccess', object, member } satisfies MemberAccessNode;
    }

    // expr[idx?]
    if (ctx.LEFT_BRACKET()) {
      const exprs = ctx.expr();
      const index = exprs.length > 0 ? this.visit(exprs[0]) : null;
      return { kind: 'IndexAccess', object, index } satisfies IndexAccessNode;
    }

    // expr(args)
    if (ctx.LEFT_PAREN()) {
      const args = ctx.array() ? ctx.array()!.argExpr().map(a => this.visit(a.expr())) : [];
      return { kind: 'Call', callee: object, args } satisfies CallNode;
    }

    // expr++
    if (ctx.PLUS().length > 0) {
      return { kind: 'PostIncrement', object } satisfies PostIncrementNode;
    }

    // expr--
    if (ctx.MINUS().length > 0) {
      return { kind: 'PostDecrement', object } satisfies PostDecrementNode;
    }

    // expr -> target
    if (ctx.ARROW()) {
      const exprs = ctx.expr();
      const target = this.visit(exprs[0]);
      return { kind: 'ArrowOp', object, target } satisfies ArrowOpNode;
    }

    // expr..end [step s]  — range for for..in loops
    if (ctx.RANGE()) {
      const exprs = ctx.expr();
      const end = this.visit(exprs[0]);
      const step = exprs.length > 1 ? this.visit(exprs[1]) : null;
      return { kind: 'RangeExpr', object, end, step } satisfies RangeExprNode;
    }

    // expr { params? : body? }  — lambda call
    if (ctx.LEFT_CURLY()) {
      const paramsCtx = ctx.params();
      const params = paramsCtx ? this.visitParamList(paramsCtx) : [];
      const exprs = ctx.expr();
      const body = exprs.length > 0 ? this.visit(exprs[0]) : null;
      return { kind: 'LambdaCall', callee: object, params, body } satisfies LambdaCallNode;
    }

    // expr : SuperType { body }
    if (ctx.COLON()) {
      const superType = ctx.superTypes()!.text;
      return { kind: 'AnonObjectTyped', object, superType } satisfies AnonObjectTypedNode;
    }

    // expr { body }
    return { kind: 'AnonObject', object } satisfies AnonObjectNode;
  }

  // ── params ────────────────────────────────────────────────────────────────

  visitParam(ctx: ParamContext): AstNode {
    return this.buildParam(ctx);
  }

  private visitParamList(ctx: ParamsContext): ParamNode[] {
    return ctx.param().map(p => this.buildParam(p));
  }

  private buildParam(ctx: ParamContext): ParamNode {
    if (ctx.SPREAD()) {
      return { kind: 'Param', spread: true, label: null, paramType: null, name: null, optional: false, defaultValue: null };
    }

    // [name]  — list/variadic parameter
    if (ctx.LEFT_BRACKET()) {
      const name = ctx._name?.text ?? '';
      return { kind: 'Param', spread: false, label: null, paramType: null, name, optional: false, defaultValue: null };
    }

    // x:=expr  and  x=expr
    if (ctx.ASSIGN()) {
      const name = ctx._name?.text ?? '';
      const defaultValue = ctx._defaultValue ? this.visit(ctx._defaultValue) : null;
      return { kind: 'Param', spread: false, label: null, paramType: null, name, optional: false, defaultValue };
    }

    const label     = ctx._label ? ctx._label.text : null;
    const paramType = ctx._type  ? ctx._type.text  : null;
    const optional  = !!ctx.OPTIONAL();

    // label:  and  label:?  — bare label; name is implicitly the label itself
    if (ctx.COLON() && !ctx._name) {
      return { kind: 'Param', spread: false, label, paramType: null, name: label ?? '', optional, defaultValue: null };
    }

    // All remaining: label: Type name[?]  |  label: name[?]  |  Type name[?]  |  name[?]
    const name = ctx._name?.text ?? '';
    return { kind: 'Param', spread: false, label, paramType, name, optional, defaultValue: null };
  }

  // ── source range helper ───────────────────────────────────────────────────

  private rangeOf(ctx: ParserRuleContext): SourceRange {
    const start = ctx.start;
    const stop  = ctx.stop ?? ctx.start;
    return {
      start: { line: start.line - 1, character: start.charPositionInLine },
      end:   { line: stop.line  - 1, character: stop.charPositionInLine + (stop.text?.length ?? 0) },
    };
  }

  // ── top-level declarations ────────────────────────────────────────────────

  visitProgram(ctx: ProgramContext): AstNode {
    const directives = ctx.directive().map(d => this.visit(d));
    return { kind: 'Program', directives } satisfies ProgramNode;
  }

  visitIntrinsicDeclaration(ctx: IntrinsicDeclarationContext): AstNode {
    const isClass = !!ctx.CLASS();
    const intrinsicName = ctx._name
      ? ctx._name.text
      : this.stripQuotes(ctx.SSTR()?.text ?? ctx.DSTR()?.text ?? '');
    const superTypes = ctx.superTypes() ? this.collectSuperTypes(ctx.superTypes()!) : [];

    // Scope tracking mirrors object declarations (without mapData/level handling).
    const outerScope = this.currentScope;
    const innerScope = new ScopedEnvironment({}, outerScope);
    this.currentScope = innerScope;
    
    const methods = ctx.intrinsicMethodDeclaration().map(m => {
      const methodName = m.identifierAtom().text;
      innerScope.envs[methodName] = methodName;
      const paramsCtx = m.params();
      const params = paramsCtx ? this.visitParamList(paramsCtx) : [];
      return {
        kind: 'IntrinsicMethodDecl',
        isStatic: !!m.STATIC(),
        name: methodName,
        params,
        range: this.rangeOf(m),
      } satisfies IntrinsicMethodNode;
    });

    this.currentScope = outerScope;

    if (intrinsicName) {
      outerScope.envs[intrinsicName] = intrinsicName;
      if (isClass) {
        for (const superType of superTypes) {
          this.inheritanceMap.set(intrinsicName, superType);
        }
      }
    }

    return {
      kind: 'IntrinsicDecl',
      isClass,
      name: intrinsicName,
      superTypes,
      methods,
      range: this.rangeOf(ctx),
    } satisfies IntrinsicDeclNode;
  }

  private stripQuotes(raw: string): string {
    if (raw.length < 2) return raw;
    const first = raw[0];
    const last = raw[raw.length - 1];
    if ((first === "'" && last === "'") || (first === '"' && last === '"')) {
      return raw.slice(1, -1);
    }
    return raw;
  }

  visitObjectDeclaration(ctx: ObjectDeclarationContext): AstNode {
    const isModify   = !!ctx.MODIFY();
    const isReplace  = !!ctx.REPLACE();
    const isClass    = !!ctx.CLASS();
    const isTransient = !!ctx.TRANSIENT();
    const level      = ctx.PLUS().length;

    // Name: for modify, identifierAtom() returns the single object name.
    // For named objects, _id is set (there is a COLON in the source).
    // For anonymous objects (no COLON), there is no _id.
    const id = ctx._id ? ctx._id.text : (isModify && ctx.identifierAtom() ? ctx.identifierAtom()!.text : null);

    const superTypes = ctx.superTypes() ? this.collectSuperTypes(ctx.superTypes()!) : [];

    // Scope tracking + map data
    const outerScope = this.currentScope;
    const outerObjectId = this.currentObjectId;
    const innerScope = new ScopedEnvironment({}, outerScope);
    this.currentScope = innerScope;
    this.currentObjectId = id;

    // Resolve parent via level-indexed tracking: the parent is the last object seen one level up.
    // This correctly handles sequential sibling objects (e.g. +thing1 followed by +door1 — both
    // children of the preceding level-0 object), which a simple save/restore of currentObjectId
    // cannot handle since each object is visited independently.
    const parentId = level > 0 ? (this.lastObjectIdAtLevel.get(level - 1) ?? null) : null;
    if (id) {
      this.lastObjectIdAtLevel.set(level, id);
    }

    // Create MapNodeData entry before visiting body so visitProperty can populate assignedProperties
    if (id) {
      this.mapData.set(id, {
        level,
        isClass,
        parentName: parentId ?? undefined,
        travelConnectorMap: new Map(),
        assignedProperties: new Set(),
      });
    }

    const body = this.buildObjectBody(ctx.curlyObjectBody()?.objectBody() ?? ctx.semiColonEndedObjectBody()?.objectBody()!);
    this.currentScope = outerScope;
    this.currentObjectId = outerObjectId;

    // Register in outer scope and populate inheritanceMap for classes
    if (id) {
      outerScope.envs[id] = id;
      if (isClass) {
        for (const superType of superTypes) {
          this.inheritanceMap.set(id, superType);
        }
      }
    }

    return { kind: 'ObjectDecl', isModify, isReplace, isClass, isTransient, level, id, superTypes, body, range: this.rangeOf(ctx) } satisfies ObjectDeclNode;
  }

  private buildObjectBody(ctx: ObjectBodyContext): ObjectBodyNode {
    // Extract otherSide from template expressions: `->targetName` on the object body.
    // e.g. `myDoor: Door ->masterDoor;` — the `->masterDoor` is a template expr.
    if (this.currentObjectId) {
      const mapEntry = this.mapData.get(this.currentObjectId);
      if (mapEntry) {
        for (const tmpl of ctx.templateExpr()) {
          const op = tmpl.templatePrefixOp()?.text;
          if (op === '->') {
            const target = tmpl.primaryExpr()?.text;
            if (target) mapEntry.otherSide = target;
          }
        }
      }
    }

    const items: AstNode[] = [
      ...ctx.property().map(p => this.visit(p)),
      ...ctx.functionDeclaration().map(f => this.visit(f)),
      ...ctx.propertySet().map(ps => this.visit(ps)),
    ];
    return { kind: 'ObjectBody', items } satisfies ObjectBodyNode;
  }

  visitProperty(ctx: PropertyContext): AstNode {
    const name = ctx._id.text;
    this.currentScope.envs[name] = name;

    // name: [SuperType] { body }  — nested inline object
    if (ctx.COLON()) {
      const nestedSuperType = ctx._objectName ? ctx._objectName.text : null;
      const bodyCtx = ctx.curlyObjectBody();
      const nestedBody = bodyCtx ? this.buildObjectBody(bodyCtx.objectBody()) : { kind: 'ObjectBody' as const, items: [] };
      return { kind: 'PropertyDecl', name, isStatic: false, value: null, nestedSuperType, nestedBody, range: this.rangeOf(ctx) } satisfies PropertyDeclNode;
    }

    // name = [static] (expr | dictionaryProperty)  — assignment-style property.
    // Grammar guarantees we are in the ASSIGN branch here (only two alternatives: ASSIGN or COLON).
    // Record in the parent's assignedProperties so map-mapping can identify directional exits.
    if (this.currentObjectId) {
      const mapEntry = this.mapData.get(this.currentObjectId);
      if (mapEntry) {
        mapEntry.assignedProperties.add(name);
        // otherSide / masterObject both identify the paired door object.
        if (name === 'otherSide' || name === 'masterObject') {
          const target = ctx.expr()?.text;
          if (target) mapEntry.otherSide = target;
        }
      }
    }

    // name = [static] expr
    const isStatic = !!ctx.STATIC();
    const exprCtx = ctx.expr();
    const value = exprCtx ? this.visit(exprCtx) : null;
    return { kind: 'PropertyDecl', name, isStatic, value, nestedSuperType: null, nestedBody: null, range: this.rangeOf(ctx) } satisfies PropertyDeclNode;
  }

  visitFunctionDeclaration(ctx: FunctionDeclarationContext): AstNode {
    // operator override
    const opCtx = ctx.operatorOverride();
    if (opCtx) return this.visitOperatorOverride(opCtx);

    const isModify  = !!ctx.MODIFY();
    const isReplace = !!ctx.REPLACE();
    const head      = ctx.functionHead()!;
    const isStatic  = !!head.STATIC();
    const isExtern  = !!head.EXTERN();
    const name      = head.identifierAtom()?.text ?? null;
    const params    = head.params() ? this.visitParamList(head.params()!) : [];
    const body      = ctx.codeBlock() ? this.visit(ctx.codeBlock()!) : null;
    if (name) this.currentScope.envs[name] = name;
    return { kind: 'FunctionDecl', isModify, isReplace, isStatic, isExtern, name, params, body, range: this.rangeOf(ctx) } satisfies FunctionDeclNode;
  }

  visitOperatorOverride(ctx: OperatorOverrideContext): AstNode {
    // Reconstruct the operator text from whichever tokens are present
    let op: string;
    if (ctx.LEFT_BRACKET()) {
      op = ctx.ASSIGN() ? '[]=' : '[]';
    } else if (ctx.identifierAtom()) {
      op = ctx.identifierAtom()!.text;
    } else {
      // One of the arithmetic/bitwise tokens
      const child = ctx.children?.find(c => {
        const t = c.text;
        return t !== 'operator' && t !== '(' && t !== ')' && t !== '{' && t !== '}';
      });
      op = child?.text ?? '?';
    }
    const params = ctx.params() ? this.visitParamList(ctx.params()!) : [];
    const stats  = ctx.stats().map(s => this.visit(s));
    const body: BlockNode = { kind: 'Block', body: stats };
    return { kind: 'OperatorOverride', op, params, body, range: this.rangeOf(ctx) } satisfies OperatorOverrideNode;
  }

  visitTemplateDeclaration(ctx: TemplateDeclarationContext): TemplateDeclNode {
    // String template form: string template << ... >> funcName ;
    if (ctx.STRING()) {
      return { kind: 'TemplateDecl', className: null, items: [], range: this.rangeOf(ctx) };
    }
    // Object template form: ClassName template items... ;
    const className = ctx._className?.text ?? null;
    const items: TemplateItemNode[] = ctx.templateDefItem().map(item => this.defItemToNode(item));
    return { kind: 'TemplateDecl', className, items, range: this.rangeOf(ctx) };
  }

  private defItemToNode(ctx: TemplateDefItemContext): TemplateItemNode {
    const optional      = !!ctx.OPTIONAL();
    const isAlternative = !!ctx.BITWISE_OR();
    const { propName, tokenKind, op } = this.defTokenInfo(ctx.templateDefToken());
    return op !== undefined
      ? { propName, tokenKind, op, optional, isAlternative }
      : { propName, tokenKind, optional, isAlternative };
  }

  private defTokenInfo(ctx: TemplateDefTokenContext): { propName: string | null; tokenKind: TemplateTokenKind; op?: string } {
    if (ctx.INHERITED())        return { propName: null,                          tokenKind: 'inherited' };
    if (ctx.SSTR())             return { propName: ctx.SSTR()!.text.slice(1, -1), tokenKind: 'sstr' };
    if (ctx.DSTR())             return { propName: ctx.DSTR()!.text.slice(1, -1), tokenKind: 'dstr' };
    if (ctx.LEFT_BRACKET())     return { propName: ctx.identifierAtom()?.text ?? null, tokenKind: 'list' };
    if (ctx.templatePrefixOp()) return { propName: ctx.identifierAtom()?.text ?? null, tokenKind: 'op', op: ctx.templatePrefixOp()!.text };
    return { propName: null, tokenKind: 'inherited' };
  }

  visitPropertySet(ctx: PropertySetContext): AstNode {
    const pattern = ctx.SSTR().text;
    const paramNames = ctx.paramsWithWildcard()
      ? this.collectParamsWithWildcard(ctx.paramsWithWildcard()!)
      : [];
    const body = this.buildObjectBody(ctx.curlyObjectBody().objectBody());
    return { kind: 'PropertySet', pattern, paramNames, body, range: this.rangeOf(ctx) } satisfies PropertySetNode;
  }

  private collectSuperTypes(ctx: SuperTypesContext): string[] {
    const result: string[] = [ctx.identifierAtom().text];
    for (const child of ctx.superTypes()) {
      result.push(...this.collectSuperTypes(child));
    }
    return result;
  }

  private collectParamsWithWildcard(ctx: ParamsWithWildcardContext): string[] {
    // paramsWithWildcard: (identifierAtom | STAR) (COMMA (identifierAtom | STAR))*
    // children alternate: item COMMA item COMMA ...
    const names: string[] = [];
    if (!ctx.children) return names;
    for (const child of ctx.children) {
      const t = child.text;
      if (t !== ',') names.push(t);
    }
    return names;
  }

  // ── helpers ───────────────────────────────────────────────────────────────

  /** Extract operator tokens sitting between operands (children at odd indices). */
  private interleaved(ctx: { children?: import('antlr4ts/tree').ParseTree[] }, operandCount: number): BinaryOpKind[] {
    if (operandCount <= 1 || !ctx.children) return [];
    const ops: BinaryOpKind[] = [];
    for (let i = 1; i < ctx.children.length; i += 2) {
      ops.push(ctx.children[i].text as BinaryOpKind);
    }
    return ops;
  }

  /** Left-fold operands with operators into a left-associative BinaryOp tree. */
  private foldBinary(operands: AstNode[], ops: BinaryOpKind[]): AstNode {
    let acc = operands[0];
    for (let i = 0; i < ops.length; i++) {
      acc = { kind: 'BinaryOp', op: ops[i], left: acc, right: operands[i + 1] } satisfies BinaryOpNode;
    }
    return acc;
  }

  private visitArrayLiteral(arrayCtx: ArrayContext | undefined): ArrayLiteralNode {
    if (!arrayCtx) {
      return { kind: 'ArrayLiteral', elements: [] };
    }
    const elements = arrayCtx.argExpr().map(a => this.visit(a.expr()));
    return { kind: 'ArrayLiteral', elements };
  }
}
