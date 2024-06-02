
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

grammar Tads3;


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

templateDeclaration:
    className=identifierAtom TEMPLATE (properties+=expr isOptional+=OPTIONAL?)+ SEMICOLON
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

objectDeclaration:
    (isClass=CLASS? | isModify=MODIFY? | isReplace=REPLACE?)
    level+=PLUS*
    isTransient=TRANSIENT?
    ( superTypes | ( id=identifierAtom (COLON superTypes)? ) )
    (curlyObjectBody | semiColonEndedObjectBody)
;

/*
objectDeclaration:
    (isClass=CLASS? | isModify=MODIFY? | isReplace=REPLACE?)
    level+=PLUS*
    (superTypes | isTransient=TRANSIENT?
     (isAnon=ID?
        (
          id=identifierAtom
          (COLON superTypes)?
        )?
     )
    (curlyObjectBody | semiColonEndedObjectBody)
  )
;*/

// TODO: merge objectDeclaration with grammarDeclaration, and maybe intrinsic too
/*
         *   Parse and skip the colon, if required.  All objects except
         *   anonymous objects and grammar rule definitions have the colon;
         *   for anonymous objects and grammar definitions, the caller is
         *   required to advance us to the class list before parsing the
         *   object body.
*/
grammarDeclaration:
    (isModify=MODIFY | isReplace=REPLACE)? GRAMMAR prodName=identifierAtom (LEFT_PAREN tag=identifierAtom RIGHT_PAREN)? COLON
    grammarRules COLON
    (
        superTypes
        (curlyObjectBody | semiColonEndedObjectBody)
    )?
;



templateExpr:
    (singleString=SSTR SEMICOLON?
    | AT atLocation=expr
    | doubleString=DSTR SEMICOLON?
    | ARROW (connection=identifierAtom|expression=expr) //TODO: test expression=expr
    | op=(ARROW|PLUS|MINUS|STAR|DIV|MOD|AMP|NOT|TILDE) (id=identifierAtom|expression=expr)
    | LEFT_BRACKET array RIGHT_BRACKET
    )  OPTIONAL?
;

array:
    expr (COMMA array)*;

curlyObjectBody:
    LEFT_CURLY objectBody RIGHT_CURLY;

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
    (ASSIGN STATIC? (expr|dictionaryProperty) SEMICOLON?
    | COLON objectName=identifierAtom? (COMMA superTypes)*  curlyObjectBody SEMICOLON?)
;

dictionaryProperty:
    SSTR*
;

propertySet:
    (PROPERTYSET paramsWithWildcard
    |PROPERTYSET prefix=SSTR? LEFT_PAREN paramsWithWildcard? RIGHT_PAREN)
    curlyObjectBody
;

paramsWithWildcard:
    (parameters+=primary|STAR) (COMMA paramsWithWildcard)*
;

functionDeclaration:
   (isModify=MODIFY?|isReplace=REPLACE?) (functionHead codeBlock)
   | operatorOverride
;

operatorOverride:
    OPERATOR
       ((PLUS|MINUS|STAR|DIV|MOD|POW|ARITHMETIC_LEFT|LOGICAL_RIGHT_SHIFT|ARITHMETIC_RIGHT|TILDE|BITWISE_OR|AMP)
       |(LEFT_BRACKET RIGHT_BRACKET ASSIGN?))
           (LEFT_PAREN params RIGHT_PAREN)
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
    SWITCH LEFT_PAREN expr RIGHT_PAREN LEFT_CURLY
        (((CASE expr)|DEFAULT) COLON (codeBlock|stats*))*
    RIGHT_CURLY
;


throwStatement:
    THROW expr;

forInStatement:
    FOR LEFT_PAREN LOCAL ID IN expr RIGHT_PAREN codeBlock;

forEachStatement:
    FOREACH LEFT_PAREN expr IN expr RIGHT_PAREN codeBlock;

returnStatement: RETURN expr? SEMICOLON;

doWhileStatement:
    DO codeBlock WHILE LEFT_PAREN expr? RIGHT_PAREN
;

whileStatement:
    WHILE LEFT_PAREN expr? RIGHT_PAREN codeBlock
;

forStatement:
    FOR LEFT_PAREN expr? SEMICOLON expr? SEMICOLON expr? RIGHT_PAREN codeBlock
;



tryCatchStatement:
    TRY codeBlock
    (CATCH LEFT_PAREN params? RIGHT_PAREN codeBlock)*
    (FINALLY codeBlock)?;


callStatement:
    expr (DOT callStatement)?;

emptyStatement:
    expr? SEMICOLON;

sayStatement: DSTR SEMICOLON;

assignmentStatement:
    LOCAL identifierAtom (ASSIGN expr)? SEMICOLON;

ifStatement:
    IF ifExprAndBlock=enclosedExprCodeBlock
    (ELSE IF elseIfExprAndBlock=enclosedExprCodeBlock)*
    (ELSE elseBlock=codeBlock)?
;

enclosedExprCodeBlock:
    LEFT_PAREN expression=expr RIGHT_PAREN codeBlock
;

expr:
 LEFT_BRACKET expr? RIGHT_BRACKET                   #arrayExpr
 | prev=expr DOT next=expr                          #memberExpr
 | expr LEFT_BRACKET expr? RIGHT_BRACKET            #indexExpr
 | expr COMMA expr                                  #commaExpr
 | expr RANGE expr (hasStep=STEP expr)?             #rangeExpr
 | DELEGATED expr                                   #delegatedExpression
 | INHERITED expr                                   #inheritedExpression
 | TRANSIENT expr                                   #transientExpression
 | primary                                          #primaryExpr
 | expr LEFT_PAREN params+ RIGHT_PAREN              #callWithParamsExpr
 | expr LEFT_PAREN expr? RIGHT_PAREN                #exprWithParenExpr
 | ID curlyObjectBody                               #exprWithAnonymousObjectExpr2
 | expr LEFT_CURLY params? COLON expr? RIGHT_CURLY  #exprWithAnonymousObjectExpr
 | expr COLON superTypes curlyObjectBody            #exprWithAnonymousObjectUsingMultipleSuperTypesExpr
 | LEFT_PAREN expr? RIGHT_PAREN                     #parenExpr2
 | LOCAL expr                                       #localExpr
 | STATIC expr                                      #staticExpr
 | NEW expr                                         #newExpr
 | expr AMP expr                                    #referenceExpr
 | expr LITERAL_NOT IN expr                         #notInExpr
 | expr IS IN expr                                  #isExpr
 | expr IS expr                                     #isExpr
 | expr IN expr                                     #inExpr
 | expr ASSIGN expr                                 #assignmentExpr
 | expr IFNIL expr                                  #ifNilExpr

 | LEFT_CURLY params? COLON expr? RIGHT_CURLY       #anonymousObjectExpr
 | expr (BITWISE_OR|AMP) ASSIGN? expr               #bitwiseExpr
 | expr op=(AND|OR) expr                            #andOrExpr
 | expr (POW) isInc=ASSIGN? expr                    #powerOfExpr

 | expr (ARROW) expr                                #arrowExpr //Is it enough with only arrowExpr2?
 |  (ARROW) expr                                    #arrowExpr2
 | STAR ARROW expr                                  #arrowExpr3 // Special case, we could add STAR into the primary also, but since this can only happen inside an array(?) this seems safer to do

 | expr op=(STAR | DIV | MOD) isInc=ASSIGN? expr    #multiplicationExpr
 | expr op=(PLUS | MINUS) isInc=ASSIGN? expr        #additiveExpr
 | expr op=(LTEQ | GTEQ | LT | GT) expr             #relationalExpr
 | expr op=(EQ | NEQ) expr                          #equalityExpr
 | expr op=(ARITHMETIC_LEFT
            |ARITHMETIC_RIGHT
            | LOGICAL_RIGHT_SHIFT)
            isInc=ASSIGN? expr                      #bitwiseExpr


 | (AT|AMP|NOT|PLUS|MINUS|TILDE|STAR) expr               #unaryExpr
 |  expr (PLUS PLUS|MINUS MINUS)                      #postFixExpr
 |  expr OPTIONAL expr COLON expr                   #ternaryExpr
 | functionDeclaration                  #anonymousFunctionExpr
 //| expr params                          #callExpr // NOt sure about this

;

primary:
 INHERITED      #inheritedAtom
 //| BIN          #binAtom
 | HEX               #hexAtom
 | NR                 #numberAtom
 | AMP identifierAtom #referenceAtom
 | identifierAtom     #idAtom
 | SSTR               #doubleQuotestringAtom
 | DSTR                #singleQuotestringAtom
 | RSTR         #regexpStringAtom
 | TRUE         #booleanAtom
 | NIL          #nilAtom
 ;

identifierAtom:
    ID
    | IN
    | IS
    | STEP
    | STRING
    | OPERATOR
;

params:
    ( optionallyTypedOptionalId|SPREAD|array) (hasMore=COMMA tail=params?)*
;

optionallyTypedOptionalId:
    ((identifier=identifierAtom COLON)? (type=identifierAtom)? (name=identifierAtom) optional=OPTIONAL?)
    | (identifier=identifierAtom emptyColon=COLON optional=OPTIONAL?)
    | (identifier=identifierAtom emptyColon=COLON hasDefault=ASSIGN defaultValue=expr? )
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

NR: [0-9]+(.[0-9])*?;

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
