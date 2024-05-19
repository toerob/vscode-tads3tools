import {
  ObjectDeclarationContext,
  PropertyContext,
  IdAtomContext,
  AssignmentStatementContext,
  FunctionDeclarationContext,
  CurlyObjectBodyContext,
  CodeBlockContext,
  MemberExprContext,
  GrammarDeclarationContext,
  MethodContext,
} from "./Tads2Parser";
import { ScopedEnvironment } from "./ScopedEnvironment";
import {
  CompletionItem,
  DocumentSymbol,
  SymbolKind,
} from "vscode-languageserver";
import { Range } from "vscode-languageserver";
import { Tads2Listener } from "./Tads2Listener";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { getAllReturnValues } from "./tree-iteration";

// TODO: Maybe much easier to just keep a map instead of an object like this?
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

export class Tads2SymbolListener implements Tads2Listener {
  symbols: DocumentSymbol[] = [];

  additionalProperties: Map<DocumentSymbol, ExtendedDocumentSymbolProperties> =
    new Map();

  intrinsicNamesUsed = new Set();

  currentIntrinsicDeclarationSymbol: DocumentSymbol | undefined = undefined;

  currentObjectSymbol: DocumentSymbol | undefined;

  currentFunctionSymbol: DocumentSymbol | undefined;

  currentInnerObjectSymbol: DocumentSymbol | undefined;

  assignmentStatements: DocumentSymbol[] = [];

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

  enterIdAtom(ctx: IdAtomContext) {
    try {
      let name;
      // eslint-disable-next-line prefer-const
      name = ctx?.identifierAtom()?.ID()?.text?.trim();
      if (name !== undefined) {
        this.completionItems.add(CompletionItem.create(name));
        const start = ctx.start.line ?? 1 - 1;
        const stop = ctx.stop?.line ?? 1 - 1;
        //console.error(`${name} added`);
        //this.scopedEnvironment.environment.set(name, new Location(this.currentUri, Range.create(start, 0, stop, 0)));
        try {
          const range = Range.create(start, 0, stop, 0);
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

  /**
   * Create a new scope whenever entering a new code block { ... }
   * TODO: this needs to happen inside various statements as well (while, for etc...)
   * Keep track of new the new scope so we can access them all when doing call hierarchy etc
   * @param ctx
   */
  enterCodeBlock(ctx: CodeBlockContext) {
    //TODO: this.scopedEnvironment = new ScopedEnvironment(this.scopedEnvironment);
    //TODO: this.scopedEnvironments.push(this.scopedEnvironment);
  }

  /**
   * Go back to the enclosing scope when leaving a code block { ... }
   * @param ctx
   */
  exitCodeBlock(ctx: CodeBlockContext) {
    //TODO: this.scopedEnvironment = this.scopedEnvironment.getEnclosingEnvironment();
  }

  enterAssignmentStatement(ctx: AssignmentStatementContext) {
    const name = ctx.identifierAtom()?.ID()?.text?.trim();
    const start = (ctx.start.line ?? 1) - 1;
    const stop = (ctx.stop?.line ?? 1) - 1;
    const range = Range.create(start, 0, stop, 0);
    const detail = "";
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
    }
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

  enterObjectDeclaration(ctx: ObjectDeclarationContext) {
    let name: string =
      ctx.identifierAtom()?.ID()?.text?.toString() ?? "unnamed";
    const start = (ctx.start.line ?? 1) - 1;
    const stop = (ctx.stop?.line ?? 1) - 1;
    const range = Range.create(start, 0, stop, 0);
    let level = 0;
    if (ctx._level) {
      level = ctx._level.length;
    }
    if (name === "unnamed") {
      name = ctx.superTypes()?.identifierAtom()?.ID()?.toString() ?? "unnamed";
    }
    const detail = ctx.superTypes()?.payload?.text ?? "object";

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

  enterMemberExpr(ctx: MemberExprContext) {
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

  visitErrorNode(ctx: any) {
    console.error(`*** ERROR NODE in (${this.currentUri})***`);
  }

  exitCurlyObjectBody(ctx: CurlyObjectBodyContext) {
    this.currentInnerObjectSymbol = undefined;
  }

  enterProperty(ctx: PropertyContext) {
    let name: string;
    if (ctx.identifierAtom()) {
      name = ctx.identifierAtom().text ?? "unnamed";
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

    // ------------------------------------------
    // Special handling for Doors
    // TODO: arrowConnection should be renamed
    // ------------------------------------------
    if (this.currentObjectSymbol && name.match("other[Ss]ide|masterObject")) {
      if (this.currentObjectSymbol) {
        //this.currentObjectSymbol.arrowConnection = detail;
        const prop: ExtendedDocumentSymbolProperties | undefined =
          this.additionalProperties.get(this.currentObjectSymbol);
        if (prop) {
          prop.arrowConnection = detail;
        }
      }
    }
    //------------------------------------------

    if (this.currentInnerObjectSymbol) {
      this.currentInnerObjectSymbol.children?.push(symbol);
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

  enterFunctionDeclaration(ctx: FunctionDeclarationContext) {
    try {
      let name: string =
        ctx.identifierAtom()?.ID()?.text.toString() ?? "anonymous function";
      const start = ctx.start.line - 1;
      const range = Range.create(start, 0, start, 0);
      const props = new ExtendedDocumentSymbolProperties();
      const detail = "function";
      const symbol = DocumentSymbol.create(
        name,
        detail,
        SymbolKind.Function,
        range,
        range,
        []
      );
      this.symbols.push(symbol);
      this.currentFunctionSymbol = symbol;
      this.additionalProperties.set(symbol, props);
    } catch (err) {
      console.error(err);
    }
  }

  enterMethod(ctx: MethodContext) {
    try {
      let name: string =
        ctx.identifierAtom()?.ID()?.text.toString() ?? "anonymous function";
      const start = ctx.start.line - 1;
      const range = Range.create(start, 0, start, 0);
      const props = new ExtendedDocumentSymbolProperties();
      let kind: SymbolKind = SymbolKind.Method;
      if (this.currentObjectSymbol) {
        let detail = ctx.params()?.text
          ? "(" + ctx.params()?.text + ")"
          : "method";
        if (this.currentPropertySetName) {
          name = this.currentPropertySetName.replace("*", name);
        }

        // Try evaluating the direction if it is evaluated inside a method.
        if (name.match(/(north|south|east|west|ne|nw|se|sw|up|down|in|out)/)) {
          if (ctx.codeBlock()) {
            const returnValues = getAllReturnValues(
              ctx.codeBlock() as ParseTree
            );
            const filteredReturnValues =
              returnValues.filter((x) => x !== "nil") ?? [];
            if (filteredReturnValues && filteredReturnValues.length === 1) {
              detail = filteredReturnValues.join(",");
              if (detail.startsWith("(") && detail.endsWith(")")) {
                detail = detail.substring(1, detail.length - 1);
              }
              /*
							TODO: the value found might point to another property function that 
							needs to be evaluated to get the map location reference (room).
							
							This needs to be done in another pass after the listener is done 
							so that all symbols are already parsed in beforehand.
							*/
            }
          }
        }

        const symbol = DocumentSymbol.create(
          name,
          detail,
          kind,
          range,
          range,
          []
        );
        props.parent = this.currentObjectSymbol;

        this.currentObjectSymbol.children?.push(symbol);
        this.currentFunctionSymbol = symbol;
        this.additionalProperties.set(symbol, props);
      }
    } catch (err) {
      console.error(err);
    }
  }

  exitFunctionDeclaration(ctx: FunctionDeclarationContext) {
    try {
      if (ctx.stop && ctx.stop.line && ctx.stop.charPositionInLine) {
        if (this.currentFunctionSymbol?.range) {
          const range = Range.create(
            this.currentFunctionSymbol.range.start.line,
            this.currentFunctionSymbol.range.start.character,
            ctx.stop.line,
            ctx.stop.charPositionInLine
          );
          this.currentFunctionSymbol.range = range;
        }
      }
      this.currentFunctionSymbol = undefined;
    } catch (err) {
      console.error(err);
    }
  }
}
