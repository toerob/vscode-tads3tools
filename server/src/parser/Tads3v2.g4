
/*

Tads3 grammar defintion

The MIT License (MIT)

Copyright (c) 2021 Tomas Öberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */

grammar Tads3v2;


program:
    directives+=directive*
    EOF
;

directive:
    enumDeclaration
    | templateDeclaration
    | intrinsicDeclaration
    | exportDeclaration
    | objectDeclaration
    | propertyDeclaration
    | dictionaryDeclaration
    | functionDeclaration
    | grammarDeclaration
    | pragmaDirective
    | SEMICOLON
;


pragmaDirective:
    HASH PRAGMA ID LEFT_PAREN (expr) RIGHT_PAREN
;

grammarRules:
    itemList (BITWISE_OR itemList)*
;

itemList:
    qualifiers?  (item)*
;
qualifiers:
    LEFT_BRACKET identifierAtom NR RIGHT_BRACKET
;

item:
    LEFT_PAREN item+ RIGHT_PAREN
    | item BITWISE_OR
    | BITWISE_OR item
    | expr
    | STAR
;

templateDeclaration
    // Object template definition:  ClassName template item1? | item2 ... ;
    // Each item is a "defining token" (sstr/dstr/[]/op) followed by a property name.
    // '?' marks the item optional; '|' groups the item with the next as alternatives.
    : className=identifierAtom TEMPLATE items+=templateDefItem+ SEMICOLON
    // String template definition:  string template << tokens >> funcName ;
    | STRING TEMPLATE ARITHMETIC_LEFT (identifierAtom|STAR|IS|IN)* ARITHMETIC_RIGHT templateId=identifierAtom SEMICOLON
;

enumDeclaration:
    ENUM isToken=TOKEN? identifierAtom (COMMA identifierAtom)* SEMICOLON
;


propertyDeclaration:
    level=PLUS* isProperty=PROPERTY identifiers+=identifierAtom (COMMA identifiers+=identifierAtom)* SEMICOLON;

dictionaryDeclaration:
    level=PLUS* DICTIONARY isProperty=PROPERTY? identifiers+=identifierAtom (COMMA identifiers+=identifierAtom)* SEMICOLON;

exportDeclaration: EXPORT identifierAtom SSTR? SEMICOLON;

intrinsicDeclaration: INTRINSIC CLASS? name=identifierAtom? (SSTR|DSTR)? (COLON superTypes)?
    LEFT_CURLY
        methods+=intrinsicMethodDeclaration*
    RIGHT_CURLY
;

intrinsicMethodDeclaration: STATIC? identifierAtom (LEFT_PAREN params? RIGHT_PAREN) SEMICOLON;

objectDeclaration
    // modify: no colon, no superclass list (compiler skips both for modify)
    : isModify=MODIFY id=identifierAtom
      (curlyObjectBody | semiColonEndedObjectBody)
    // named / anonymous / class / replace / plus objects
    | isReplace=REPLACE? isClass=CLASS?
      level+=PLUS*
      isTransient=TRANSIENT?
      (
          id=identifierAtom COLON superTypes?   // named:     name ':' supers?  — must come first
          | superTypes                           // anonymous: supers directly (no name, no colon)
      )
      (curlyObjectBody | semiColonEndedObjectBody)
;
grammarDeclaration:
    (isModify=MODIFY | isReplace=REPLACE)? GRAMMAR prodName=identifierAtom (LEFT_PAREN tag=identifierAtom RIGHT_PAREN)? COLON
    grammarRules COLON
    (
        superTypes
        (curlyObjectBody | semiColonEndedObjectBody)
    )?
;



// One slot in a template DEFINITION.
// 'value' is the defining token (sstr/dstr/[id]/op id/inherited).
// '?' marks the slot optional; '|' marks it as an alternative to the following slot.
templateDefItem:
    value=templateDefToken optional=OPTIONAL? alternative=BITWISE_OR?
;

// The defining token determines which template is matched at the use site.
templateDefToken:
    SSTR                                              // 'propName'  — string names the property
    | DSTR                                            // "propName"
    | LEFT_BRACKET name=identifierAtom RIGHT_BRACKET  // [listProp]
    | templatePrefixOp name=identifierAtom            // op propName  (@ + - * / % -> & ! ~ ,)
    | INHERITED                                       // inherit from superclass templates
;

// Inline template value used inside an object body.
// The defining token is consumed (for operator forms it is skipped);
// for string/list forms the literal itself is the value.
// No '?' suffix here — optional marking is only in the definition.
templateExpr:
    SSTR                                // 'string value'
    | DSTR                              // "double-quoted value"
    | LEFT_BRACKET array? RIGHT_BRACKET // [list]
    | templatePrefixOp primaryExpr      // op value  — op skipped, primaryExpr is the value
;

// Operators that can prefix a template slot.
// COMMA is included: the compiler parses ',propName' in definitions and ', value' at use sites.
templatePrefixOp
    : AT | PLUS | MINUS | STAR | DIV | MOD | ARROW | AMP | NOT | TILDE | COMMA
;

array:
    argExpr (COMMA argExpr)*;

argExpr:
    name=ID COLON expr SPREAD?  // named/labeled argument — plain ID only keeps SLL to 2-token lookahead
    | expr SPREAD?              // positional (or spread: expr...)
;

// Templates can appear before OR after the '{' (compiler calls parse_obj_template
// at both positions).  We capture both: the outer list covers the common case
// "Room 'name' { ... }", the inner list (inside objectBody) covers the rare case
// "Room { 'name' ... }".
curlyObjectBody:
    template+=templateExpr*
    LEFT_CURLY objectBody SEMICOLON? RIGHT_CURLY;

semiColonEndedObjectBody:
    objectBody
    SEMICOLON
;

superTypes:
    superType+=identifierAtom (COMMA superTypes)* ;

objectBody:
    (template+=templateExpr*)

    (functions+=functionDeclaration
    | properties+=property
    | propertySets+=propertySet
    )*
;



property:
    id=identifierAtom
    (ASSIGN STATIC? (expr|dictionaryProperty)
    | COLON objectName=identifierAtom? (COMMA superTypes)*  curlyObjectBody)
;

dictionaryProperty:
    SSTR*
;

propertySet:
    PROPERTYSET prefix=SSTR (LEFT_PAREN paramsWithWildcard? RIGHT_PAREN)?
    curlyObjectBody
;

paramsWithWildcard:
    (identifierAtom | STAR) (COMMA (identifierAtom | STAR))*
;

functionDeclaration:
   (isModify=MODIFY | isReplace=REPLACE)? (functionHead codeBlock)
   | operatorOverride
;

operatorOverride:
    OPERATOR
       ( (PLUS|MINUS|STAR|DIV|MOD|POW|ARITHMETIC_LEFT|LOGICAL_RIGHT_SHIFT|ARITHMETIC_RIGHT|TILDE|BITWISE_OR|AMP)
       | LEFT_BRACKET RIGHT_BRACKET ASSIGN?
       | identifierAtom )                    // e.g. 'operator negate()'
           LEFT_PAREN params? RIGHT_PAREN
           LEFT_CURLY stats* RIGHT_CURLY;

functionHead:
     isExtern=EXTERN? isStatic=STATIC? FUNCTION? identifierAtom (LEFT_PAREN params? RIGHT_PAREN)?
     | FUNCTION (LEFT_PAREN params? RIGHT_PAREN)?
 ;

codeBlock:
   LEFT_CURLY stats* RIGHT_CURLY
   | stats
;

stats:
    assignmentStatement
    | ifStatement
    | tryCatchStatement
    | forStatement
    | doWhileStatement
    | whileStatement
    | switchStatement
    | forInStatement
    | forEachStatement
    | sayStatement
    | emptyStatement
    | returnStatement
    | throwStatement
    | labelStatement
    | breakStatement
    | continueStatement
    | gotoStatement
    | innerCodeBlock
;

innerCodeBlock:
    LEFT_CURLY stats* RIGHT_CURLY
;

gotoStatement:
    GOTO label=identifierAtom? SEMICOLON;

breakStatement:
    BREAK label=identifierAtom? SEMICOLON
;

continueStatement:
    CONTINUE label=identifierAtom? SEMICOLON
;

labelStatement:
    identifierAtom COLON;



switchStatement:
    SWITCH LEFT_PAREN discriminant=expr RIGHT_PAREN LEFT_CURLY
        cases+=switchCase*
    RIGHT_CURLY
;

switchCase:
    (CASE test=expr | isDefault=DEFAULT) COLON body+=stats*
;


throwStatement:
    THROW expr SEMICOLON;

forInStatement:
    FOR LEFT_PAREN LOCAL identifierAtom IN iterable=expr
        (SEMICOLON cond=expr? SEMICOLON forUpdate?)?
        RIGHT_PAREN codeBlock;

forEachStatement:
    FOREACH LEFT_PAREN expr IN expr RIGHT_PAREN codeBlock;

returnStatement: RETURN expr? SEMICOLON;

doWhileStatement:
    DO codeBlock WHILE LEFT_PAREN expr? RIGHT_PAREN SEMICOLON
;

whileStatement:
    WHILE LEFT_PAREN expr? RIGHT_PAREN codeBlock
;

forStatement:
    FOR LEFT_PAREN forInit? SEMICOLON cond=expr? SEMICOLON forUpdate? RIGHT_PAREN codeBlock
;

forUpdate:
    expr (COMMA expr)*   // one or more comma-separated update expressions
;

forInit:
    forInitItem (COMMA forInitItem)*
;

forInitItem:
    LOCAL localVarDecl
    | expr
;

tryCatchStatement:
    TRY codeBlock
    (CATCH LEFT_PAREN params? RIGHT_PAREN codeBlock)*
    (FINALLY codeBlock)?;


emptyStatement:
    expr? SEMICOLON;

sayStatement: DSTR SEMICOLON;

assignmentStatement:
    LOCAL localVarDecl (COMMA localVarDecl)* SEMICOLON;

localVarDecl:
    identifierAtom (ASSIGN expr)?
;

ifStatement:
    IF ifExprAndBlock=enclosedExprCodeBlock
    (ELSE IF elseIfExprAndBlock=enclosedExprCodeBlock)*
    (ELSE elseBlock=codeBlock)?
;

enclosedExprCodeBlock:
    LEFT_PAREN expression=expr RIGHT_PAREN codeBlock
;

// ── Expression hierarchy (lowest → highest precedence) ─────────────────────

expr
    : assignmentExpr
    ;

assignmentExpr
    : conditionalExpr (assignmentOp assignmentExpr)?
    ;

assignmentOp
    : ASSIGN
    | PLUS                ASSIGN
    | MINUS               ASSIGN
    | STAR                ASSIGN
    | DIV                 ASSIGN
    | MOD                 ASSIGN
    | BITWISE_OR          ASSIGN
    | AMP                 ASSIGN
    | POW                 ASSIGN
    | ARITHMETIC_LEFT     ASSIGN
    | ARITHMETIC_RIGHT    ASSIGN
    | LOGICAL_RIGHT_SHIFT ASSIGN
    ;

conditionalExpr
    : ifNilExpr (OPTIONAL expr COLON conditionalExpr)?
    ;

ifNilExpr
    : logicalOrExpr (IFNIL logicalOrExpr)*
    ;

logicalOrExpr
    : logicalAndExpr (OR logicalAndExpr)*
    ;

logicalAndExpr
    : bitwiseOrExpr (AND bitwiseOrExpr)*
    ;

bitwiseOrExpr
    : bitwiseXorExpr (BITWISE_OR bitwiseXorExpr)*
    ;

bitwiseXorExpr
    : bitwiseAndExpr (POW bitwiseAndExpr)*     // '^' is bitwise XOR in TADS3
    ;

bitwiseAndExpr
    : equalityExpr (AMP equalityExpr)*
    ;

equalityExpr
    : relationalExpr equalitySuffix*
    ;

equalitySuffix
    : (EQ | NEQ) relationalExpr                    #eqNeqSuffix
    | IS IN LEFT_PAREN array RIGHT_PAREN            #isInSuffix
    | LITERAL_NOT IN LEFT_PAREN array RIGHT_PAREN   #notInSuffix
    ;

relationalExpr
    : shiftExpr (relationalOp shiftExpr)*
    ;

relationalOp
    : LT | GT | LTEQ | GTEQ
    ;

shiftExpr
    : additiveExpr ((ARITHMETIC_LEFT | ARITHMETIC_RIGHT | LOGICAL_RIGHT_SHIFT) additiveExpr)*
    ;

additiveExpr
    : multiplicativeExpr ((PLUS | MINUS) multiplicativeExpr)*
    ;

multiplicativeExpr
    : unaryExpr ((STAR | DIV | MOD) unaryExpr)*
    ;

unaryExpr
    : prefixOp  unaryExpr
    | NEW        unaryExpr
    | DELEGATED  unaryExpr
    | INHERITED  unaryExpr
    | TRANSIENT  unaryExpr
    | LOCAL      unaryExpr
    | STATIC     unaryExpr
    | postfixExpr
    ;

prefixOp
    : NOT | PLUS | MINUS | TILDE | STAR | AMP | AT | LITERAL_NOT
    ;

postfixExpr
    : primaryExpr postfixSuffix*
    ;

postfixSuffix
    : DOT memberExpr
    | LEFT_BRACKET expr? RIGHT_BRACKET
    | LEFT_PAREN array? RIGHT_PAREN
    | PLUS PLUS
    | MINUS MINUS
    | ARROW expr
    | RANGE expr (STEP expr)?   // only valid inside for..in: for (x in from..to step s)
    | LEFT_CURLY params? COLON expr? RIGHT_CURLY
    | COLON superTypes curlyObjectBody
    | curlyObjectBody
    ;

primaryExpr
    : LEFT_PAREN array? RIGHT_PAREN   // (expr) or (a, b, ...) comma-expr / old-style list
    | LEFT_BRACKET array? RIGHT_BRACKET
    | LEFT_CURLY params? COLON expr? RIGHT_CURLY
    | ARROW expr
    | STAR ARROW expr
    | DOT identifierAtom              // .prop  — shorthand for self.prop
    | FUNCTION (LEFT_PAREN params? RIGHT_PAREN)? codeBlock  // anonymous function expression — FUNCTION keyword required so SLL can distinguish from identifierAtom
    | primary
    ;

primary
    : INHERITED          #inheritedAtom
    | HEX                #hexAtom
    | NR                 #numberAtom
    | AMP identifierAtom #referenceAtom
    | identifierAtom     #idAtom
    | SSTR               #singleQuoteStringAtom
    | DSTR               #doubleQuoteStringAtom
    | RSTR               #regexpStringAtom
    | TRUE               #booleanAtom
    | NIL                #nilAtom
    ;

memberExpr:
    identifierAtom                          // foo.bar
    | LEFT_PAREN expr RIGHT_PAREN           // foo.(expr)  — dynamic property
;

identifierAtom:
    ID
    | softKeyword
;

// Keywords that TADS3 allows to be used as identifiers in many contexts.
// Extend as new real-world cases are discovered.
softKeyword:
    IN | STRING
;

params:
    param (COMMA param)*
;

// Fully explicit alternatives — no optional chains — keeps SLL prediction ≤3 tokens.
param:
    SPREAD                                                                    // ...
    | LEFT_BRACKET name=identifierAtom RIGHT_BRACKET                         // [name]
    | name=identifierAtom COLON ASSIGN defaultValue=expr                     // x:=expr
    | name=identifierAtom ASSIGN defaultValue=expr                           // x=expr
    | label=identifierAtom COLON OPTIONAL                                    // label:?
    | label=identifierAtom COLON                                             // label:  (name == label)
    | label=identifierAtom COLON type=identifierAtom name=identifierAtom optional=OPTIONAL?  // label: Type name[?]
    | label=identifierAtom COLON name=identifierAtom optional=OPTIONAL?      // label: name[?]
    | type=identifierAtom name=identifierAtom optional=OPTIONAL?             // Type name[?]
    | name=identifierAtom optional=OPTIONAL?                                 // name[?]
;

//LINE: '#line ' [0-9]+ .~('\n')* ->skip;
GRAMMAR : 'grammar';
SWITCH: 'switch';
CASE: 'case';
DEFAULT: 'default';
FUNCTION : 'function';
THROW : 'throw';
NEW : 'new';
TEMPLATE : 'template';
FOR: 'for';
TRY: 'try';
CATCH: 'catch';
FINALLY: 'finally';
ENUM : 'enum';
CLASS: 'class';
TRANSIENT : 'transient';
MODIFY: 'modify';
REPLACE: 'replace';
PROPERTYSET: 'propertyset';
IF: 'if';
DO : 'do';
WHILE : 'while';
ELSE: 'else';
LOCAL : 'local';
TRUE: 'true';
NIL: 'nil';
INTRINSIC: 'intrinsic';
INHERITED: 'inherited';
DELEGATED : 'delegated';
PROPERTY: 'property';
DICTIONARY: 'dictionary';
EXPORT: 'export';
EXTERN: 'extern';
RETURN : 'return';
STATIC: 'static';
STRING :  'string';
FOREACH : 'foreach';
IN: 'in';
SPREAD: '...';
RANGE: '..';
STEP: 'step';
LITERAL_NOT: 'not';
IS: 'is';
BREAK : 'break';
CONTINUE: 'continue';
GOTO  : 'goto';
TOKEN: 'token';
PRAGMA: 'pragma';
OPERATOR : 'operator';

AT: '@';
AMP: '&';
HASH: '#';
NOT: '!';
OPTIONAL: '?';
IFNIL: '??';
PLUS: '+';
DIV: '/';
MOD: '%';
MINUS: '-';
NEQ: '!=';
EQ: '==';
AND: '&&';
OR: '||';
ARROW : '->';
TILDE: '~';
POW: '^';

ID: [a-zA-Z_][a-zA-Z_0-9]*;
ASSIGN: '=';

NR: [0-9]+ ('.' [0-9]+)?;

HEX: [0]'x'[A-Fa-f0-9]+;
OCT: '0' [0-7]+;


COLON: ':';
COMMA: ',';
DOT: '.';
STAR : '*';

BITWISE_OR: '|';
SEMICOLON: ';';
LEFT_PAREN: '(';
RIGHT_PAREN: ')';
LEFT_BRACKET: '[';
RIGHT_BRACKET: ']';

DSTR : DOUBLE_QUOTED_STRING;
SSTR : SINGLE_QUOTED_STRING;
RSTR: 'R' (DOUBLE_QUOTED_STRING|SINGLE_QUOTED_STRING);

fragment SINGLE_QUOTED_STRING: '\'' STRING_STRUCTURE '\'' | '\'\'\'' STRING_STRUCTURE '\'\'\'';

fragment DOUBLE_QUOTED_STRING: '"' STRING_STRUCTURE '"' | '"""' STRING_STRUCTURE '"""';

fragment STRING_STRUCTURE: (ESCAPED_CHAR|(ARITHMETIC_LEFT(.*?)ARITHMETIC_RIGHT)|.)*?;


LEFT_CURLY: '{';
RIGHT_CURLY: '}';

LTEQ: '<=';
ARITHMETIC_LEFT : '<<';
LT: '<';

GTEQ: '>=';
GT: '>';

ARITHMETIC_RIGHT : '>>';
LOGICAL_RIGHT_SHIFT : '>>>';


COMMENT: '/*' .*? '*/' -> skip;
LINE_COMMENT : '//' ~[\r\n]* -> skip;
WS : [ \r\t\n]+ -> channel(HIDDEN) ;

ANY: .;

fragment SingleStringCharacter:
    ~['\\\r\n]
    | LineContinuation
    ;
fragment DoubleStringCharacter:
    ~["\\\r\n]
    | LineContinuation
;
fragment LineContinuation: '\\' [\r\n\u2028\u2029];

fragment ESCAPED_CHAR: '\\' ('"'|'\''|'n'|'t'|'r'|'b'|'\\');
