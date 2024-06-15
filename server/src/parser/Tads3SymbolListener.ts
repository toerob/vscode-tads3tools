import { ParserRuleContext } from "antlr4ts";
import { Interval } from "antlr4ts/misc/Interval";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import {
  CompletionItem,
  DocumentSymbol,
  Position,
  Range,
  SymbolInformation,
  SymbolKind
} from "vscode-languageserver";
import { DocumentSymbolWithScope, ExpressionType } from "../modules/types";
import { ScopedEnvironment } from "./ScopedEnvironment";
import { Tads3Listener } from "./Tads3Listener";
import {
  AssignmentExprContext,
  AssignmentStatementContext,
  CallWithParamsExprContext,
  CurlyObjectBodyContext,
  FunctionDeclarationContext,
  GrammarDeclarationContext,
  IdAtomContext,
  IntrinsicDeclarationContext,
  IntrinsicMethodDeclarationContext,
  MemberExprContext,
  NewExprContext,
  ObjectDeclarationContext,
  ParamsContext,
  PropertyContext,
  PropertySetContext,
  TemplateDeclarationContext,
} from "./Tads3Parser";
import { T3StringVisitor } from "./Tads3StringVisitor";
//import { DocumentUri } from 'vscode-languageserver-textdocument';

export class ExtendedDocumentSymbolProperties {
  level: number | undefined;
  arrowConnection: string | undefined;
  at: string | undefined = undefined;
  objectScope: any | undefined;
  functionScope: any | undefined;
  symbol: any | undefined;
  isClass: boolean | undefined;
  isAssignment: boolean | undefined;
  isModification: boolean | undefined;
  isReplacement: boolean | undefined;
  shortName: string | undefined;
  parent: DocumentSymbol | undefined;
  superClassRoot: string | undefined;
  travelConnectorMap = new Map();
}

//export type 


export class Tads3SymbolListener implements Tads3Listener {
  public constructor(private documentUri: string = '') { }
  symbols: DocumentSymbol[] = [];

  symbolParameters: Map<string, DocumentSymbol[]> = new Map();

  additionalProperties: Map<DocumentSymbol, ExtendedDocumentSymbolProperties> =
    new Map();

  intrinsicNamesUsed = new Set();

  currentIntrinsicDeclarationSymbol: DocumentSymbol | undefined = undefined;

  currentObjectSymbol: DocumentSymbol | undefined;

  currentFunctionSymbol: DocumentSymbol | undefined;

  currentInnerObjectSymbol: DocumentSymbol | undefined;

  currentAssignment: DocumentSymbol | undefined;

  public assignmentStatements: DocumentSymbol[] = [];

  lastObjectLevelMap: Map<number, DocumentSymbol> = new Map();

  completionItems: Set<CompletionItem> = new Set();

  currentPropertySetName: string | undefined;

  validateSymbolPlacing = false;

  preprocessedText: string | undefined;

  inc = 0;

  inheritanceMap: any = new Map();

  symbolToTweak: any = undefined;

  callbackToRun: any = undefined;

  progressCallback: any;

  scopedEnvironment: ScopedEnvironment | undefined;

  currentUri!: string;

  scopedEnvironments: any;

  localKeywords: Map<string, Range[]> = new Map();

  memberCallChains = new Map();

  public readonly stringVisitor = new T3StringVisitor({ hideSemicolon: true });

  // This cannot be a map since we can have several nested assignments, plus scope within different locations

  public readonly expressionSymbols: Map<string, DocumentSymbolWithScope[]> =
    new Map();

  enterIdAtom(ctx: IdAtomContext) {
    try {
      let name;
      // eslint-disable-next-line prefer-const
      name = ctx?.identifierAtom()?.ID()?.text?.trim();
      if (name !== undefined) {
        this.completionItems.add(CompletionItem.create(name));
        const stop = ctx.stop?.line ?? 0;
        try {
          const range = Range.create(stop, 0, stop, 0);

          // Note: localKeywords are used by the reference provider solely
          if (!this.localKeywords.has(name)) { 
            this.localKeywords.set(name, [range]);
          } else {
            this.localKeywords.get(name)?.push(range);
          }

          
        } catch (err) {
          console.error(`enterIdAtom ${err}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }


  enterCallWithParamsExpr(ctx: CallWithParamsExprContext) {
    const name = ctx.expr()?.text;
    if (name === undefined) {
      return;
    }
    const start = (ctx.start.line ?? 1) - 1; // TODO: handle 0 that becomes -1
    const stop = (ctx.stop?.line ?? 1) - 1;  // ODO: handle 0 that becomes -1
    const range = Range.create(start, 0, stop, 0);
    const symbol = DocumentSymbol.create(
      name,
      "invocation",
      SymbolKind.Method,
      range,
      range,
      []
    );
    this.currentAssignment = symbol;

    // Store method invocations together with is call chain inside expressionSymbols.
    this.addOrChangeExpression(name, start, {
      documentSymbol: symbol,
      callChainStr: this.currentCallChain,
      expressionType: ExpressionType.METHOD_INVOCATION,
    });
  }

  enterAssignmentStatement(ctx: AssignmentStatementContext) {
    const name = ctx.identifierAtom()?.ID()?.text?.trim();
    const start = (ctx.start.line ?? 1) - 1;
    const stop = (ctx.stop?.line ?? 1) - 1;
    const range = Range.create(start, 0, stop, 0);

    let detail;
    try {
      detail = this.stringVisitor.visit(ctx as ParseTree);
    } catch (err) {
      console.error("You shall not pass!");
    }

    if (name !== undefined) {
      const symbol = DocumentSymbol.create(
        name,
        detail,
        SymbolKind.Variable,
        range,
        range,
        []
      );

      const additionalProps = new ExtendedDocumentSymbolProperties();
      additionalProps.objectScope = this.currentObjectSymbol;
      additionalProps.functionScope = this.currentFunctionSymbol;
      this.additionalProperties.set(symbol, additionalProps);
      this.assignmentStatements.push(symbol);
      this.currentAssignment = symbol;

      this.addOrChangeExpression(name, start, {
        documentSymbol: symbol,
        expressionType: ExpressionType.LOCAL_ASSIGNMENT,
      });
    }
  }

  enterNewExpr(ctx: NewExprContext) {
    if (this.currentAssignment) {
      // In case we happen upon a "new expr()" and there's already an ongoing
      // assignmentStatement (e.g: "local x = new ClassName(x) ")  (see enterAssignmentStatement)
      // Then add the class instance type and its constructor parameters

      const currentAssignmentScope = this.getExpressionSymbol(
        this.currentAssignment
      );
      const newInvocationText = ctx.expr().text;
      if (currentAssignmentScope && newInvocationText) {
        const parts = newInvocationText.split("(");
        if (parts && parts.length > 1) {
          const instanceType = parts[0] ?? undefined;
          const constructorArgs = parts[1].split(")")[0] ?? undefined;
          currentAssignmentScope.instanceType = instanceType;
          currentAssignmentScope.constructorArgs = constructorArgs;
        }
      }
    }
  }

  exitNewExpr(ctx: NewExprContext) {
    this.currentAssignment = undefined;
  }

  exitAssignmentExpr(ctx: AssignmentExprContext) {
    this.currentAssignment = undefined;
  }

  enterGrammarDeclaration(ctx: GrammarDeclarationContext) {
    const identifiers = ctx.identifierAtom();
    const firstIdentifierStr =
      identifiers && identifiers.length > 0
        ? identifiers[0].ID()?.text
        : undefined;
    const name = firstIdentifierStr ?? "unnamed";
    const start = (ctx.start.line ?? 1) - 1;
    const stop = (ctx.stop?.line ?? 1) - 1;
    const range = Range.create(start, 0, stop, 0);
    const detail = "grammar";
    const symbol = DocumentSymbol.create(
      name,
      detail,
      SymbolKind.Struct,
      range,
      range,
      []
    );
    this.symbols.push(symbol);
    this.currentObjectSymbol = symbol;
  }

  exitGrammarDeclaration(ctx: GrammarDeclarationContext) {
    this.currentObjectSymbol = undefined;
  }

  enterParams(ctx: ParamsContext) {
    /*if(ctx.text === 'toString') {
      console.log('toString parent=',ctx.parent?.text);
    }
    console.log(ctx.text);*/
    /*for(const param of ctx.params()) {
      const name = param.text;
      const range = createRangeFromContext(ctx);
      const symbol = DocumentSymbol.create(name, 'parameter', SymbolKind.Variable,range,range);
      this.addOrChangeExpression(name, param.start.line , {
        documentSymbol: symbol,
        expressionType: ExpressionType.METHOD_PARAMETER,
      });
    }*/
  }

  enterObjectDeclaration(ctx: ObjectDeclarationContext) {
    // Use the given name, and if it doesn't exist give it the name anonymous. Count name 'object' as anonymous too.
    const hasName =
      !!ctx.identifierAtom() && ctx.identifierAtom()!.text !== "object";
    let name = hasName ? ctx.identifierAtom()!.text : "anonymous";

    const start = (ctx.start.line ?? 1) - 1;
    const stop = (ctx.stop?.line ?? 1) - 1;
    const range = Range.create(start, 0, stop, 0);
    let level = 0;
    if (ctx._level) {
      level = ctx._level.length;
    }

    let meta: string = "";
    if (ctx._isModify) {
      meta = "(modified) ";
    }
    if (ctx._isReplace) {
      meta = "(replaced) ";
    }

    let detail = ctx.superTypes()?.payload?.text ?? `${meta}object`;

    const additionalProps = new ExtendedDocumentSymbolProperties();

    if (ctx._isClass) {
      additionalProps.isClass = true;
      const superClassNames = detail.split(",");
      for (const superClassName of superClassNames) {
        this.inheritanceMap.set(name, superClassName);
      }
    }

    const symbol = DocumentSymbol.create(
      name,
      detail,
      ctx._isClass ? SymbolKind.Class : SymbolKind.Object,
      range,
      range,
      []
    );
    this.currentObjectSymbol = symbol;

    additionalProps.level = level;

    if (ctx._isModify) {
      additionalProps.isModification = true;
    }
    if (ctx._isReplace) {
      additionalProps.isReplacement = true;
    }

    try {
      const body = ctx.semiColonEndedObjectBody() ?? ctx.curlyObjectBody();
      if (body) {
        for (const template of body?.objectBody()?.templateExpr()) {
          if (template?.text) {
            if (template.text.startsWith("->")) {
              const arrowConnection = template.text.replace("->", "");
              additionalProps.arrowConnection = arrowConnection
                ? arrowConnection
                : additionalProps.arrowConnection;
            } else if (template.text.startsWith("@")) {
              const at = template.text.replace("@", "");
              additionalProps.at = at ? at : additionalProps.arrowConnection;
            }
          }
          const shortName = template._singleString?.text;
          additionalProps.shortName = shortName
            ? shortName.substr(1, shortName.length - 2)
            : additionalProps.shortName;
        }
      }
    } catch (err) {
      console.error(err);
    }

    if (level > 0) {
      const lastObjectOneLevelBelow = this.lastObjectLevelMap.get(level - 1);
      if (lastObjectOneLevelBelow) {
        lastObjectOneLevelBelow.children?.push(symbol);
        additionalProps.parent = lastObjectOneLevelBelow;
      } else {
        this.symbols.push(symbol);
      }
    } else {
      this.symbols.push(symbol);
    }
    if (!ctx._isClass) {
      this.lastObjectLevelMap.set(level, symbol);
    }
    this.additionalProperties.set(symbol, additionalProps);
  }

  exitObjectDeclaration(ctx: ObjectDeclarationContext) {
    this.currentObjectSymbol = undefined;
    this.callbackToRun = undefined;
  }

  enterPropertySet(ctx: PropertySetContext) {
    if (ctx._prefix === undefined) {
      const firstParameter = ctx.paramsWithWildcard()?._parameters[0];
      if (firstParameter && firstParameter.children) {
        let name = firstParameter.children[0]?.toString();
        if (name.length > 2 && name.startsWith("'") && name.endsWith("'")) {
          name = name.substring(1, name.length - 1) ?? "";
        }
        this.currentPropertySetName = name;
      }
    } else {
      let name = ctx._prefix?.text ?? "";
      if (name.length > 2 && name.startsWith("'") && name.endsWith("'")) {
        name = name.substring(1, name.length - 1);
      }
      const parameters = ctx.paramsWithWildcard()?.text;
      if (parameters) {
        name += "(" + (ctx.paramsWithWildcard()?.text ?? "") + ")";
      }
      this.currentPropertySetName = name;
    }
  }

  currentCallChain: string | undefined;

  exitMemberExpr(ctx: MemberExprContext) {
    this.currentCallChain = ctx.text;
  }

  enterMemberExpr(ctx: MemberExprContext) {
    this.currentCallChain = ctx.text;

    // TODO: remove safely when above is done, this is probably not needed anymore
    const memberCallChain = ctx._prev ? ctx._prev.text.split(".") : [];
    const procedure = ctx._next?.text;
    //console.error(`MemberExpr: [ ${memberCallChain} ]  ->(${procedure} ())   Line: ${ctx.start.line} - ${ctx.stop.line}`);
    const previousArray = this.memberCallChains.get(procedure);
    if (previousArray) {
      this.memberCallChains.set(procedure, [
        ...previousArray,
        {
          line: ctx.start.line,
          memberChain: memberCallChain,
        },
      ]);
    } else {
      this.memberCallChains.set(procedure, [
        {
          line: ctx.start.line,
          memberChain: memberCallChain,
        },
      ]);
    }
  }

  exitPropertySet(ctx: PropertySetContext) {
    this.currentPropertySetName = undefined;
  }

  visitErrorNode(ctx: ErrorNode) {
    /*console.debug(
      `Problem parsing token "${ctx.toStringTree()}" on line ${ctx.payload.line} in (${this.currentUri})`
    );*/
  }

  exitCurlyObjectBody(ctx: CurlyObjectBodyContext) {
    this.currentInnerObjectSymbol = undefined;
  }

  enterProperty(ctx: PropertyContext) {
    let name: string;
    if (ctx.identifierAtom()?.length > 0) {
      name = ctx.identifierAtom()[0].text ?? "unnamed";
    } else {
      name = "unnamed";
    }
    let detail = "property";
    //let isDirection = false;
    let isAssignment = false;
    let isInnerObject = false;
    if (ctx.ASSIGN()) {
      isAssignment = true;
      const line = ctx.payload.text;
      const split = line.split(/=/);
      if (split.length > 1) {
        //isDirection = split[0].trim().match(/north|northeast|northwest|south|southeast|southwest|east|west|up|down|in|out/) !== undefined;
        detail = split[1].trim();
      }
    } else if (ctx.COLON()) {
      const line = ctx.payload.text;
      const split = line.split(/:/);
      if (split.length > 1) {
        detail = split[1].trim();
      }
      isInnerObject = true;
      //ctx.curlyObjectBody()?.children[1].payload.getChild(0).identifierAtom()[0].text
    }
    const start = ctx.start.line - 1;
    if (name === undefined || name === "") {
      console.error(`Couldn't process symbol at row ${start}`);
      return;
    }
    const stop = (ctx.stop?.line ?? 1) - 1 ?? start;
    const startCharacter = ctx.start?.charPositionInLine ?? 0;
    const stopCharacter = ctx.stop?.charPositionInLine ?? 0;
    const range = Range.create(start, startCharacter, stop, stopCharacter); // TODO: stop character here.

    const additionalProps = new ExtendedDocumentSymbolProperties();
    const symbol = DocumentSymbol.create(
      name,
      detail,
      isInnerObject ? SymbolKind.Object : SymbolKind.Property,
      range,
      range,
      []
    );
    additionalProps.isAssignment = isAssignment;

    /*
		// Creates a callback to return to this object whenever a property named destination is found
		// This is made effectively unusable afterwards here and exitObjectDeclaration since then the scope 
		// is over
		*/

    // ------------------------------------------
    // Special handling for TravelConnectors
    // ------------------------------------------
    if (detail.includes("TravelConnector")) {
      symbol.kind = SymbolKind.TypeParameter;
      this.callbackToRun = (destination: any) => {
        this.symbolToTweak = symbol;
        this.symbolToTweak.detail = "TravelConnector";
        // We keep track of a travellerConnectorMap inside each object, so we can use that value
        // directly whenever a travelConnector is in use

        if (this.currentObjectSymbol) {
          this.additionalProperties
            .get(this.currentObjectSymbol)
            ?.travelConnectorMap.set(symbol, destination);
        }
        //console.error(`Fetching destination for ${this.symbolToTweak.name}'s TravelConnector: ${destination}`);
      };
    }
    if (this.callbackToRun && name === "destination") {
      //console.error(`Found a destination for a travelConnector: ${detail}`);
      this.callbackToRun(detail);
      this.callbackToRun = undefined;
    }
    //------------------------------------------

    // ------------------------------------------
    // Special handling for Doors
    // TODO: arrowConnection should be renamed
    // ------------------------------------------
    if (
      this.currentObjectSymbol &&
      (name === "otherSide" || name === "masterObject")
    ) {
      if (this.currentObjectSymbol) {
        //this.currentObjectSymbol.arrowConnection = detail;
        const prop = this.additionalProperties.get(this.currentObjectSymbol);
        if (prop?.arrowConnection) {
          prop.arrowConnection = detail;
        }
      }
    }
    //------------------------------------------
    if (this.currentInnerObjectSymbol) {
      this.currentInnerObjectSymbol.children?.push(symbol);

      // TODO states=[] goes into LMentionable.. check with THing
    } else if (this.currentObjectSymbol) {
      additionalProps.parent = this.currentObjectSymbol;

      this.currentObjectSymbol.children?.push(symbol);
    }
    if (isInnerObject) {
      this.currentInnerObjectSymbol = symbol;
    }

    if (name && additionalProps.parent) {
      this.additionalProperties.set(symbol, additionalProps);
    }
  }

  // TODO: Naturally repeats, make a set instead of array,
  // then add to symbols afterwards
  enterIntrinsicDeclaration(ctx: IntrinsicDeclarationContext) {
    const name = ctx.identifierAtom()?.ID()?.text?.trim() ?? "unnamed";
    const start = (ctx.start.line ?? 1) - 1;
    const stop = (ctx.stop?.line ?? 1) - 1;
    const range = Range.create(start, 0, stop, 0);
    const detail = ctx.DSTR()?.text;
    if (name && !this.intrinsicNamesUsed.has(name)) {
      this.intrinsicNamesUsed.add(name);
      const symbol = DocumentSymbol.create(
        name,
        detail,
        SymbolKind.Interface,
        range,
        range,
        []
      );
      this.currentIntrinsicDeclarationSymbol = symbol;
      if (!this.symbols.includes(symbol)) {
        this.symbols.push(symbol);
      }
    }
  }

  // TODO: Naturally repeats, make a set instead of array,
  // then add to symbols afterwards
  exitIntrinsicDeclaration(ctx: IntrinsicDeclarationContext) {
    this.currentIntrinsicDeclarationSymbol = undefined;
  }

  // TODO: take care of symbolParameters too... 
  // "this.symbolParameters.set(symbol.name, parameters);""
  enterIntrinsicMethodDeclaration(ctx: IntrinsicMethodDeclarationContext) {
    const name = ctx.identifierAtom()?.ID()?.text?.trim();
    const start = (ctx.start.line ?? 1) - 1;
    const stop = (ctx.stop?.line ?? 1) - 1;
    const range = Range.create(start, 0, stop, 0);
    const detail = "";
    if (name && this.currentIntrinsicDeclarationSymbol) {
      const symbol = DocumentSymbol.create(
        name,
        detail,
        SymbolKind.Function,
        range,
        range,
        []
      );
      this.currentIntrinsicDeclarationSymbol.children ??= [];

      const parameters = createParameterSymbols(ctx.params());
      symbol.detail = parameters.map(x=>x.name).join(',');
      this.symbolParameters.set(name, parameters);

      if (!this.currentIntrinsicDeclarationSymbol.children.includes(symbol)) {
        this.currentIntrinsicDeclarationSymbol.children.push(symbol);
      }
    }


  }

  enterFunctionDeclaration(ctx: FunctionDeclarationContext) {
    try {
      let name: string =
        ctx.functionHead()?.identifierAtom()?.ID()?.text.toString() ??
        "anonymous function";
      const range = createRangeFromContext(ctx);
      const props = new ExtendedDocumentSymbolProperties();
      let symbol = undefined;

      if (this.currentObjectSymbol) {
        if (this.currentPropertySetName) {
          name = this.currentPropertySetName.replace("*", name);
        }
        symbol = DocumentSymbol.create(
          name,
          'method',
          SymbolKind.Method,
          range,
          range,
          []
        );

        props.parent = this.currentObjectSymbol;

        this.currentObjectSymbol.children?.push(symbol);
        this.currentFunctionSymbol = symbol;
        this.additionalProperties.set(symbol, props);
      } else {
        symbol = DocumentSymbol.create(
          name,
          'function',
          SymbolKind.Function,
          range,
          range,
          []
        );
        this.symbols.push(symbol);
        this.currentFunctionSymbol = symbol;
        this.additionalProperties.set(symbol, props);
      }

      const params = ctx.functionHead()?.params();
      if(params) {
        const parameters = createParameterSymbols(ctx.functionHead()?.params());
        symbol.detail = parameters.map(x=>x.name).join(',');
        this.symbolParameters.set(symbol.name, parameters);
  
        for (const symbol of parameters) {
          const additionalProps = new ExtendedDocumentSymbolProperties();
          additionalProps.objectScope = this.currentObjectSymbol;
          additionalProps.functionScope = this.currentFunctionSymbol;
          this.additionalProperties.set(symbol, additionalProps);
          this.assignmentStatements.push(symbol);
        }
      }

    } catch (err) {
      console.error(err);
    }
  }

  enterTemplateDeclaration(ctx: TemplateDeclarationContext) {
    const name = ctx._className?.ID()?.text;
    if (name) {
      let detail;
      const a = ctx.start.startIndex;
      const b = ctx.stop?.stopIndex;
      if (a !== undefined && b !== undefined) {
        const interval = new Interval(a, b);
        detail = ctx.start.inputStream?.getText(interval) ?? "template";
      }
      const start = (ctx.start.line ?? 1) - 1;
      const stop = (ctx.stop?.line ?? 1) - 1;
      const range = Range.create(start, 0, stop, 0);
      const symbol = DocumentSymbol.create(
        name,
        detail,
        SymbolKind.TypeParameter,
        range,
        range
      );
      this.symbols.push(symbol);
    }
  }

  // Helper functions - relocate
  addOrChangeExpression(
    name: string,
    line: number,
    update: DocumentSymbolWithScope
  ) {
    let dec = this.expressionSymbols.get(name);
    if (dec === undefined) {
      this.expressionSymbols.set(name, [update]);
      return;
    }
    let ref = dec?.find((x) => x.documentSymbol?.range.start.line === line);
    if (ref) {
      ref = { ...ref, ...update };
    } else {
      dec?.push(update);
    }
  }

  getExpressionSymbol(
    symbol: DocumentSymbol
  ): DocumentSymbolWithScope | undefined {
    return (
      this.expressionSymbols
        ?.get(symbol.name)
        ?.find(
          (x) =>
            (x.documentSymbol?.range?.start?.line ?? 0) ===
            symbol.range.start.line
        ) ?? undefined
    );
  }

  getClosestAssignmentDeclaration(
    symbolName: any,
    position: Position
  ): DocumentSymbolWithScope | undefined {
    const declarationsSortedByLine = this.expressionSymbols
      ?.get(symbolName)
      ?.filter(
        (
          x // Doubt this check is needed: x.expressionType === ExpressionType.LOCAL_ASSIGNMENT &&
        ) => (x.documentSymbol?.range?.start?.line ?? 0) <= position.line
      ) // Filter everything grater than the current line
      ?.sort(
        (a, b) =>
          (a.documentSymbol?.range?.start?.line ?? 0) -
          (b.documentSymbol?.range?.start?.line ?? 0)
      )
      .reverse();

    // Get the "greatest" line of them
    return declarationsSortedByLine?.[0] ?? undefined;
  }
}

export function createRangeFromContext(ctx: ParserRuleContext, name?: string): Range {
  const start = (ctx.start.line ?? 1) - 1;
  const stop = (ctx.stop?.line ?? ctx.start.line ?? 1) - 1;
  const startCharacter = ctx.start?.charPositionInLine ?? 0;
  const stopCharacter = startCharacter + (name? name.length : ctx.text.length) - 1;  //(ctx.start.stopIndex -ctx.start.startIndex); // ctx.text.length - 1 // ctx.stop?.charPositionInLine ?? 0;
  return Range.create(start, startCharacter, stop, stopCharacter);
}

function createParameterSymbols(paramsContext: ParamsContext|undefined) {
  const x = [];
  let currentParam = paramsContext;
  let counter = 0;
  while(currentParam) {
    if(currentParam.childCount>0) {
      const text = currentParam.getChild(0).text;
      const ruleCtx = currentParam.getRuleContext(0, ParserRuleContext);
      const range = createRangeFromContext(ruleCtx);
      const s = DocumentSymbol.create(text, counter.toString(), SymbolKind.Variable, range, range);        
      x.push(s);
      counter++;
    }
    currentParam = currentParam._tail;
  }
  return x;  
}
