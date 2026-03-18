export type AstNodeKind =
  // ── primary ────────────────────────────────────────────────────────────────
  | 'Identifier'
  | 'Number'
  | 'Hex'
  | 'String'
  | 'Regexp'
  | 'Boolean'
  | 'Nil'
  | 'Inherited'
  | 'Reference'     // &foo
  | 'Paren'         // (expr)
  | 'ArrayLiteral'  // [a, b, ...]
  | 'Lambda'        // { params : expr }
  | 'Param'         // a single parameter declaration
  | 'Arrow'         // -> expr
  | 'StarArrow'     // * -> expr
  | 'FunctionExpr'  // anonymous function declaration
  // ── binary arithmetic ──────────────────────────────────────────────────────
  | 'BinaryOp'
  // ── unary ──────────────────────────────────────────────────────────────────
  | 'UnaryOp'       // ! + - ~ * & @ not
  | 'NewExpr'       // new expr
  | 'DelegatedExpr' // delegated expr
  | 'InheritedCall' // inherited expr  (call parent method; cf. Inherited primary atom)
  | 'TransientExpr' // transient expr
  | 'LocalExpr'     // local expr  (inline local decl in for-loop init)
  | 'StaticExpr'    // static expr
  // ── postfix ────────────────────────────────────────────────────────────────
  | 'MemberAccess'    // expr.member
  | 'IndexAccess'     // expr[idx?]
  | 'Call'            // expr(args)
  | 'PostIncrement'   // expr++
  | 'PostDecrement'   // expr--
  | 'ArrowOp'         // expr -> target
  | 'RangeExpr'       // expr..end [step s]  — only valid inside for..in
  | 'LambdaCall'      // expr { params : body }
  | 'AnonObjectTyped' // expr : SuperType { body }
  | 'AnonObject'      // expr { body }
  // ── ternary ────────────────────────────────────────────────────────────────
  | 'Conditional'     // cond ? then : else
  // ── meta ───────────────────────────────────────────────────────────────────
  | 'Unhandled'       // visitor not yet implemented for this grammar rule
  // ── statements ─────────────────────────────────────────────────────────────
  | 'LocalDecl'       // local x = expr?
  | 'LocalDeclList'   // local x, y = expr?, z
  | 'Block'           // { stats* }
  | 'IfStmt'          // if (cond) block [else if (cond) block]* [else block]
  | 'SayStmt'         // "text";  — TADS3 output statement
  | 'TryCatch'        // try block (catch (...) block)* (finally block)?
  | 'ReturnStmt'      // return expr?
  | 'ThrowStmt'       // throw expr
  | 'WhileStmt'       // while (cond) block
  | 'DoWhileStmt'     // do block while (cond)
  | 'ForStmt'         // for (init?; cond?; update?) block
  | 'ForInStmt'       // for (local name in iterable) block
  | 'ForEachStmt'     // foreach (variable in iterable) block
  | 'BreakStmt'       // break label?
  | 'ContinueStmt'    // continue label?
  | 'GotoStmt'        // goto label?
  | 'LabelStmt'       // label:
  | 'SwitchStmt'      // switch (expr) { case v: ... default: ... }
  // ── set membership ─────────────────────────────────────────────────────────
  | 'IsIn'            // expr is in (v1, v2, ...)
  | 'NotIn'           // expr not in (v1, v2, ...)
  // ── assignment ─────────────────────────────────────────────────────────────
  | 'Assignment'      // target op value  (=  +=  -=  *=  /=  %=  |=  &=  ^=  <<=  >>=  >>>=)
  // ── top-level declarations ─────────────────────────────────────────────────
  | 'Program'         // top-level program
  | 'ObjectDecl'      // named / anonymous / class / modify / replace object
  | 'ObjectBody'      // collected properties + methods + propertysets inside an object
  | 'PropertyDecl'    // name = expr  OR  name: SuperType { body }
  | 'FunctionDecl'    // function / method declaration (top-level or inside object body)
  | 'OperatorOverride'// operator+(...) { }
  | 'PropertySet'     // propertyset 'pattern' { }
  | 'TemplateDecl';   // ClassName template 'prop'? @prop ... ;   OR   string template << >> func;

export interface SourcePosition {
  /** 0-based line number */
  line: number;
  /** 0-based character offset */
  character: number;
}

export interface SourceRange {
  start: SourcePosition;
  end: SourcePosition;
}

interface BaseNode {
  kind: AstNodeKind;
  range?: SourceRange;
  /** Index signature so AstNode satisfies Record<string, unknown> for Jest's toMatchObject. */
  [key: string]: unknown;
}

export interface IdentifierNode extends BaseNode {
  kind: 'Identifier';
  name: string;
}

export interface NumberNode extends BaseNode {
  kind: 'Number';
  value: string;
}

export interface HexNode extends BaseNode {
  kind: 'Hex';
  value: string;
}

export interface StringNode extends BaseNode {
  kind: 'String';
  quoteStyle: 'single' | 'double' | 'regexp';
  value: string;
}

export interface RegexpNode extends BaseNode {
  kind: 'Regexp';
  value: string;
}

export interface BooleanNode extends BaseNode {
  kind: 'Boolean';
  value: true;
}

export interface NilNode extends BaseNode {
  kind: 'Nil';
}

export interface InheritedNode extends BaseNode {
  kind: 'Inherited';
}

export interface ReferenceNode extends BaseNode {
  kind: 'Reference';
  name: string;
}

export interface ParenNode extends BaseNode {
  kind: 'Paren';
  inner: AstNode | null;
}

export interface ArrayLiteralNode extends BaseNode {
  kind: 'ArrayLiteral';
  elements: AstNode[];
}

export interface ParamNode extends BaseNode {
  kind: 'Param';
  /** Present when the param is `...` */
  spread: boolean;
  /** `label:` prefix, e.g. `label: Type name` */
  label: string | null;
  /** Type annotation, e.g. `RuntimeError` in `catch (RuntimeError e)` */
  paramType: string | null;
  /** The parameter name; null only when spread */
  name: string | null;
  /** true when the param is marked `?` */
  optional: boolean;
  /** Default value expression, e.g. `x := 5` */
  defaultValue: AstNode | null;
}

export interface LambdaNode extends BaseNode {
  kind: 'Lambda';
  params: ParamNode[];
  body: AstNode | null;
}

export interface ArrowNode extends BaseNode {
  kind: 'Arrow';
  target: AstNode;
}

export interface StarArrowNode extends BaseNode {
  kind: 'StarArrow';
  target: AstNode;
}

export interface FunctionExprNode extends BaseNode {
  kind: 'FunctionExpr';
}

// Grows as we add higher-level rules; listed in precedence order (low→high)
export type BinaryOpKind =
  | '+'  | '-'           // additive
  | '*'  | '/'  | '%'    // multiplicative
  | '<<' | '>>' | '>>>'  // shift
  | '<'  | '>'  | '<=' | '>='  // relational comparison
  | '==' | '!='                // equality
  | '&'                        // bitwise AND
  | '^'                        // bitwise XOR
  | '|'                        // bitwise OR
  | '&&'                       // logical AND
  | '||'                       // logical OR
  | '??';                      // if-nil

export interface BinaryOpNode extends BaseNode {
  kind: 'BinaryOp';
  op: BinaryOpKind;
  left: AstNode;
  right: AstNode;
}

export type UnaryOpKind = '!' | '+' | '-' | '~' | '*' | '&' | '@' | 'not';

export interface UnaryOpNode extends BaseNode {
  kind: 'UnaryOp';
  op: UnaryOpKind;
  operand: AstNode;
}

export interface NewExprNode extends BaseNode {
  kind: 'NewExpr';
  expr: AstNode;
}

export interface DelegatedExprNode extends BaseNode {
  kind: 'DelegatedExpr';
  expr: AstNode;
}

export interface InheritedCallNode extends BaseNode {
  kind: 'InheritedCall';
  expr: AstNode;
}

export interface TransientExprNode extends BaseNode {
  kind: 'TransientExpr';
  expr: AstNode;
}

export interface LocalExprNode extends BaseNode {
  kind: 'LocalExpr';
  expr: AstNode;
}

export interface StaticExprNode extends BaseNode {
  kind: 'StaticExpr';
  expr: AstNode;
}

export interface MemberAccessNode extends BaseNode {
  kind: 'MemberAccess';
  object: AstNode;
  /** Identifier for simple `foo.bar`; any expression for computed `foo.(expr)` */
  member: AstNode;
}

export interface IndexAccessNode extends BaseNode {
  kind: 'IndexAccess';
  object: AstNode;
  index: AstNode | null;
}

export interface CallNode extends BaseNode {
  kind: 'Call';
  callee: AstNode;
  args: AstNode[];
}

export interface PostIncrementNode extends BaseNode {
  kind: 'PostIncrement';
  object: AstNode;
}

export interface PostDecrementNode extends BaseNode {
  kind: 'PostDecrement';
  object: AstNode;
}

export interface ArrowOpNode extends BaseNode {
  kind: 'ArrowOp';
  object: AstNode;
  target: AstNode;
}

export interface RangeExprNode extends BaseNode {
  kind: 'RangeExpr';
  object: AstNode;
  end: AstNode;
  step: AstNode | null;
}

export interface LambdaCallNode extends BaseNode {
  kind: 'LambdaCall';
  callee: AstNode;
  params: ParamNode[];
  body: AstNode | null;
}

export interface AnonObjectTypedNode extends BaseNode {
  kind: 'AnonObjectTyped';
  object: AstNode;
  superType: string;
}

export interface AnonObjectNode extends BaseNode {
  kind: 'AnonObject';
  object: AstNode;
}

export interface ConditionalNode extends BaseNode {
  kind: 'Conditional';
  condition: AstNode;
  consequent: AstNode;
  alternate: AstNode;
}

export interface UnhandledNode extends BaseNode {
  kind: 'Unhandled';
}

export interface BlockNode extends BaseNode {
  kind: 'Block';
  body: AstNode[];
}

export interface IfBranch {
  condition: AstNode;
  consequent: AstNode;
}

export interface IfStmtNode extends BaseNode {
  kind: 'IfStmt';
  condition: AstNode;
  consequent: AstNode;
  elseIfs: IfBranch[];
  alternate: AstNode | null;
}

export interface CatchClause {
  params: ParamNode[];
  body: AstNode;
}

export interface TryCatchNode extends BaseNode {
  kind: 'TryCatch';
  body: AstNode;
  catches: CatchClause[];
  finallyBlock: AstNode | null;
}

export interface SayStmtNode extends BaseNode {
  kind: 'SayStmt';
  value: string;
}

export interface ReturnStmtNode extends BaseNode {
  kind: 'ReturnStmt';
  value: AstNode | null;
}

export interface ThrowStmtNode extends BaseNode {
  kind: 'ThrowStmt';
  value: AstNode;
}

export interface WhileStmtNode extends BaseNode {
  kind: 'WhileStmt';
  condition: AstNode | null;
  body: AstNode;
}

export interface DoWhileStmtNode extends BaseNode {
  kind: 'DoWhileStmt';
  body: AstNode;
  condition: AstNode | null;
}

export interface ForStmtNode extends BaseNode {
  kind: 'ForStmt';
  init: AstNode | null;
  condition: AstNode | null;
  update: AstNode | null;
  body: AstNode;
}

export interface ForInStmtNode extends BaseNode {
  kind: 'ForInStmt';
  name: string;
  iterable: AstNode;
  body: AstNode;
}

export interface ForEachStmtNode extends BaseNode {
  kind: 'ForEachStmt';
  variable: AstNode;
  iterable: AstNode;
  body: AstNode;
}

export interface BreakStmtNode extends BaseNode {
  kind: 'BreakStmt';
  label: string | null;
}

export interface ContinueStmtNode extends BaseNode {
  kind: 'ContinueStmt';
  label: string | null;
}

export interface GotoStmtNode extends BaseNode {
  kind: 'GotoStmt';
  label: string | null;
}

export interface LabelStmtNode extends BaseNode {
  kind: 'LabelStmt';
  name: string;
}

export interface CaseClause {
  /** null → default clause */
  test: AstNode | null;
  body: AstNode[];
}

export interface SwitchStmtNode extends BaseNode {
  kind: 'SwitchStmt';
  discriminant: AstNode;
  cases: CaseClause[];
}

export interface LocalDeclNode extends BaseNode {
  kind: 'LocalDecl';
  name: string;
  init: AstNode | null;
}

export interface LocalDeclListNode extends BaseNode {
  kind: 'LocalDeclList';
  decls: LocalDeclNode[];
}

export interface IsInNode extends BaseNode {
  kind: 'IsIn';
  operand: AstNode;
  values: AstNode[];
}

export interface NotInNode extends BaseNode {
  kind: 'NotIn';
  operand: AstNode;
  values: AstNode[];
}

export type AssignmentOpKind =
  | '=' | '+=' | '-=' | '*=' | '/=' | '%='
  | '|=' | '&=' | '^=' | '<<=' | '>>=' | '>>>=';

export interface AssignmentNode extends BaseNode {
  kind: 'Assignment';
  op: AssignmentOpKind;
  target: AstNode;
  value: AstNode;
}

export interface ProgramNode extends BaseNode {
  kind: 'Program';
  directives: AstNode[];
}

export interface ObjectDeclNode extends BaseNode {
  kind: 'ObjectDecl';
  /** `modify` prefix — modify an existing object in place */
  isModify: boolean;
  /** `replace` prefix — replace an existing object entirely */
  isReplace: boolean;
  /** `class` keyword present */
  isClass: boolean;
  /** `transient` keyword present */
  isTransient: boolean;
  /** Number of `+` level prefixes */
  level: number;
  /** Object name; null for anonymous objects */
  id: string | null;
  /** Superclass / supertype names */
  superTypes: string[];
  body: ObjectBodyNode;
}

export interface ObjectBodyNode extends BaseNode {
  kind: 'ObjectBody';
  /** Properties, methods, and propertysets in source order */
  items: AstNode[];
}

export interface PropertyDeclNode extends BaseNode {
  kind: 'PropertyDecl';
  name: string;
  /** `static` modifier present on a value property */
  isStatic: boolean;
  /** Value expression for `name = expr` form; null for nested-object form */
  value: AstNode | null;
  /** Supertype name for `name: SuperType { body }` form */
  nestedSuperType: string | null;
  /** Body for `name: SuperType { body }` form */
  nestedBody: ObjectBodyNode | null;
}

export interface FunctionDeclNode extends BaseNode {
  kind: 'FunctionDecl';
  isModify: boolean;
  isReplace: boolean;
  isStatic: boolean;
  isExtern: boolean;
  /** Function / method name; null for anonymous function expressions */
  name: string | null;
  params: ParamNode[];
  body: AstNode | null;
}

export interface OperatorOverrideNode extends BaseNode {
  kind: 'OperatorOverride';
  /** Operator text, e.g. `+`, `[]`, `[]=` */
  op: string;
  params: ParamNode[];
  body: AstNode;
}

export interface PropertySetNode extends BaseNode {
  kind: 'PropertySet';
  /** The SSTR pattern, e.g. `'*DobjTake'` */
  pattern: string;
  /** Wildcard / identifier parameter names from the optional `(...)` list */
  paramNames: string[];
  body: ObjectBodyNode;
}

/** Discriminates how a template slot is delimited / prefixed in source. */
export type TemplateTokenKind =
  | 'sstr'      // 'propName'  — single-quoted string names the property
  | 'dstr'      // "propName"  — double-quoted string names the property
  | 'list'      // [propName]  — list property
  | 'op'        // opPropName  — operator-prefixed (@ + - * / % -> & ! ~ ,)
  | 'inherited';// inherited   — expand from superclass template

/** A single slot in an object template definition, e.g. `'name'?` or `@location` or `inherited`. */
export interface TemplateItemNode {
  /** The property name this slot binds to, or null for `inherited`. */
  propName: string | null;
  /** How the slot is delimited/prefixed in source. */
  tokenKind: TemplateTokenKind;
  /** The operator character(s) for `op` slots, e.g. `@`, `->`. */
  op?: string;
  /** True when the slot is marked optional (`?`). */
  optional: boolean;
  /** True when the slot is followed by `|` (is an alternative to the next slot). */
  isAlternative: boolean;
}

export interface TemplateDeclNode extends BaseNode {
  kind: 'TemplateDecl';
  /**
   * The class this template belongs to, e.g. `Thing`.
   * Null for the `string template << ... >> funcName ;` form.
   */
  className: string | null;
  items: TemplateItemNode[];
}

export type AstNode =
  | UnhandledNode
  | IdentifierNode
  | NumberNode
  | HexNode
  | StringNode
  | RegexpNode
  | BooleanNode
  | NilNode
  | InheritedNode
  | ReferenceNode
  | ParenNode
  | ArrayLiteralNode
  | ParamNode
  | LambdaNode
  | ArrowNode
  | StarArrowNode
  | FunctionExprNode
  | BinaryOpNode
  | UnaryOpNode
  | NewExprNode
  | DelegatedExprNode
  | InheritedCallNode
  | TransientExprNode
  | LocalExprNode
  | StaticExprNode
  | MemberAccessNode
  | IndexAccessNode
  | CallNode
  | PostIncrementNode
  | PostDecrementNode
  | ArrowOpNode
  | RangeExprNode
  | LambdaCallNode
  | AnonObjectTypedNode
  | AnonObjectNode
  | BlockNode
  | IfStmtNode
  | SayStmtNode
  | TryCatchNode
  | ReturnStmtNode
  | ThrowStmtNode
  | WhileStmtNode
  | DoWhileStmtNode
  | ForStmtNode
  | ForInStmtNode
  | ForEachStmtNode
  | BreakStmtNode
  | ContinueStmtNode
  | GotoStmtNode
  | LabelStmtNode
  | SwitchStmtNode
  | LocalDeclNode
  | LocalDeclListNode
  | ConditionalNode
  | IsInNode
  | NotInNode
  | AssignmentNode
  | ProgramNode
  | ObjectDeclNode
  | ObjectBodyNode
  | PropertyDeclNode
  | FunctionDeclNode
  | OperatorOverrideNode
  | PropertySetNode
  | TemplateDeclNode;
