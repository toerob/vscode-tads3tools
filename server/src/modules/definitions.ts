import {
  LocationLink,
  TextDocuments,
  Position,
  TextDocumentIdentifier,
  DocumentSymbol,
} from "vscode-languageserver";
import { TadsSymbolManager, flattenTreeToArray } from "./symbol-manager";
import { compareStringReverse, getWordAtPosition } from "./text-utils";
import { DefinitionParams, Location, Range } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { SymbolKind } from "vscode-languageserver";
import { getDefineMacrosMap } from "../parser/preprocessor";
import { connection } from "../server";
import { preprocessedFilesCacheMap } from "../server";
import { TextDocument } from "vscode-languageserver-textdocument";
import {
  extractCurrentLineFromDocument,
} from "./utils";

//import { logElapsedTimeUsingConnection } from './logging';

const onWindowsPlatform = process.platform === "win32";

function windowsSafeUri(fsPath: string) {
  return onWindowsPlatform ? URI.file(fsPath)?.path : fsPath;
}

export async function onDefinition(
  { textDocument: textDoc, position: pos }: DefinitionParams,
  docs: TextDocuments<TextDocument>,
  sm: TadsSymbolManager
) {
  // ------------------------------------------------------------
  // Preparations and quick checks
  // ------------------------------------------------------------
  const methodStartTime = Date.now();

  const currentDoc = docs.get(textDoc.uri);

  if (currentDoc === undefined) return [];

  const currentLine = currentDoc.getText(
    Range.create(pos.line, 0, pos.line + 1, 0)
  );

  let symbolName = getWordAtPosition(currentDoc, pos);

  if (symbolName === undefined) return [];
  if (symbolName === "object") return [];

  const fsPath = URI.parse(textDoc.uri).fsPath;

  const lambdaExprRegExp = /[{]\s*(\w+\s*([,]\s*\w+)*)\s*[:]/;
  const isWithinLambda = lambdaExprRegExp.exec(currentLine);
  if (isWithinLambda) {
    const params = isWithinLambda[1].split(",").map((x) => x.trim()) ?? [];
    if (params.length > 0) {
      const matchedParam = params.find((x) => x === symbolName);
      if (matchedParam) {
        connection.console.log(
          `Matched parameter within lambda ${matchedParam}`
        );
        const lambdaParamsStart = isWithinLambda.index + 1;
        const location = Location.create(
          windowsSafeUri(fsPath),
          Range.create(pos.line, lambdaParamsStart, pos.line, lambdaParamsStart)
        );
        return [location];
      }
    }
  }

  // ------------------------------------------------------------
  // 1. Check for local assignment declarations
  // ------------------------------------------------------------

  // Before checking for locals we must decide if we are within an object definition's code block range or not.
  // Otherwise we won't find inner properties of anyonmous objects contained within a code block range.
  const isWithinCodeBlock = sm.isPositionWithinCodeBlock(fsPath, pos);

  if (isWithinCodeBlock) {
    const locals = findLocals(sm, symbolName, fsPath, pos);
    if (locals.length > 0) {
      return locals;
    }
  }

  // ------------------------------------------------------------
  // 2. look for possible inherited members within a superclass
  // ------------------------------------------------------------
  if (symbolName === "inherited") {
    const inherited = findInherited(sm, fsPath, pos);
    if (inherited.length > 0) {
      return inherited;
    }
  }

  // ------------------------------------------------------------
  // 3. Look for self object, i.e the enclosing object
  // ------------------------------------------------------------
  if (symbolName === "self") {
    const selfs = findSelf(sm, textDoc.uri, fsPath, pos);
    if (selfs.length > 0) {
      return selfs;
    }
  }

  symbolName = expandSentielDobj(currentLine, symbolName);

  // ------------------------------------------------------------
  // 4. Look globally for objects or classes definitions
  // ------------------------------------------------------------
  const objects = findObjects(sm, symbolName);
  if (objects.length > 0) {
    return objects;
  }

  // ------------------------------------------------------------
  // 5. Look for members within this object and superclasses
  // ------------------------------------------------------------
  const members = findMembers(sm, pos, symbolName, fsPath, currentDoc);
  if (members.length > 0) {
    return members;
  }

  // ------------------------------------------------------------
  // 6. Look globally for macros definitions
  // ------------------------------------------------------------
  const macros = findMacros(symbolName);
  if (macros.length > 0) {
    return macros;
  }
  return [];
}

function findMembers(
  sm: TadsSymbolManager,
  pos: Position,
  symbolName: string,
  fsPath: string,
  document: TextDocument
): Location[] {
  // TODO: there's might be possible to refine everything here now with the new structure DocumentSymbolWithScope
  let containingObject = undefined;

  // NOTE: To be 100% correct this assignment should be parsed and evaluated instead,
  // using a visitor per assignment while the listener traverses the parse tree.

  // TODO: duplicate code here, this is done in the beginning too.
  const currentLineStr = extractCurrentLineFromDocument(pos.line, document);

  // ************************************************
  // TODO: this can probably replace the code below, test it:
  // ************************************************
  /*
  const closestAssignment = sm.getClosestAssignmentDeclaration(
    fsPath,
    symbolName,
    pos
  );
  if (closestAssignment?.documentSymbol) {
    console.log("Replace with THIS:");
    return [
      Location.create(
        windowsSafeUri(fsPath),
        closestAssignment.documentSymbol?.range
      ),
    ];
  }*/

  // TODO: look for parameters within a method in addition to local assignments
  // Look for local assignments (TODO: fix correct scope)
  const locals =
    sm.assignmentStatements.get(fsPath)?.filter((x) => x.name === symbolName) ??
    [];

  if (locals.length > 0) {
    const containingObject = sm.findContainingObject(fsPath, pos);
    if (containingObject) {
      const containingMethod = containingObject.children?.find((x) =>
        isPositionWithinRange(pos, x.range)
      );

      if (containingMethod) {
        // TODO: find/make a rangeIntersects method
        // TODO: there can be competing local assignments, but for now take only the first found:
        const closeAssignment = locals.find((x) =>
          isRangeWithin(x.range, containingMethod.range)
        );

        if (closeAssignment) {
          if (closeAssignment.detail === "parameter") {
            const startAlignedParameterRange = alignRangeToStart(
              closeAssignment.range
            );
            return [
              Location.create(
                windowsSafeUri(fsPath),
                startAlignedParameterRange
              ),
            ];
          }
          return [
            Location.create(windowsSafeUri(fsPath), closeAssignment.range),
          ];
        }
      }
    }
  }

  const memberCallRegExp = new RegExp(
    `([a-zA-Z][a-zA-Z0-9]*)\\s*([(].*[)])?\\s*[.]\\s*\\b(${symbolName})\\b\\s*`
  );
  const memberCallMatch = memberCallRegExp.exec(currentLineStr);

  if (memberCallMatch) {
    // Since this is a member call, look within the parent too for the symbol
    const parentName = memberCallMatch[1];

    const isInvocatingMethodCall =
      memberCallMatch.length >= 2 && memberCallMatch[2] ? true : false;
    if (isInvocatingMethodCall) {
      connection.console.debug(
        `Can not yet handle evaluating methods ${parentName}${memberCallMatch[2]} in a method call chain. `
      );
      return fetchSymbolGlobally(symbolName, sm);
    }

    const closestAssignment = sm.getClosestAssignmentDeclaration(
      fsPath,
      parentName,
      pos
    );
    if (closestAssignment?.documentSymbol) {
      if (closestAssignment?.instanceType) {
        // TODO: fetch the property/method hierarcially correct. Make it reusable

        if (closestAssignment?.instanceType) {
          const { filePath, symbol } = sm.findSymbol(
            closestAssignment.instanceType
          );
          const definitionWithinSuperClass = symbol?.children?.find(
            (x) => x.name === symbolName
          );
          if (filePath && definitionWithinSuperClass) {
            return [
              Location.create(
                windowsSafeUri(filePath),
                definitionWithinSuperClass.range
              ),
            ];
          }
        }
      }
    }

    // If the owner of the symbol cannot be found, try fetch by old strategy
    // NOTE: It might lead to the wrong definition
    const owner = sm.findSymbol(parentName, true);
    if (owner?.symbol === undefined) {
      connection.console.debug(
        `Can not find the ${owner} in the member call chain. `
      );
      return fetchSymbolGlobally(symbolName, sm);
    }

    if (owner?.symbol?.kind === SymbolKind.Property) {
      // TODO: in case we have a indirect reference by a property, we need to try to determine its type here
      connection.console.log(
        `${symbolName} is a member of ${owner.symbol.name} which is a property, will try to determine its type`
      );
      sm.findSymbol(fsPath);

      // TODO: first check for exzpressionsymbols
      const expressionSymbols =
        sm.expressionSymbols.get(owner.filePath)?.get(owner.symbol.name) ?? []; // TODO: store the assign

      const latestExpressionSymbols =
        expressionSymbols
          ?.sort(
            (a, b) =>
              (a.documentSymbol?.range?.start?.line ?? 0) -
              (b.documentSymbol?.range?.start?.line ?? 0)
          )
          .reverse() ?? [];
      const closestExpressionSymbol = latestExpressionSymbols?.[0];
      // TODO: handle the rest...

      // Then look for other symbols, in order to find anonymous objects accesses as well.
      const localSymbols =
        sm
          .findAllSymbols(owner.symbol.name)
          .filter((x) => compareStringReverse(x.filePath, owner.filePath)) ??
        [];
      const latestSymbolsFirst =
        localSymbols
          .sort((a, b) => a.symbol.range.start.line - b.symbol.range.start.line)
          .reverse() ?? [];
      const closestSymbol = latestSymbolsFirst?.[0];
      if (closestSymbol) {
        // Look for the instanceType, first by searching for the closest expression to this position
        let instanceTypeName;
        if (closestSymbol?.symbol?.detail) {
          // TODO: use the method to find the closest expression instead of this:
          const test =
            sm.expressionSymbols
              .get(closestSymbol.filePath)
              ?.get(closestSymbol.symbol.detail) ?? []; // TODO: store the assign
          console.log(test);
          instanceTypeName = test[0]?.instanceType;
        } else {
          // Otherwise we check the detail of the symbol
          instanceTypeName = closestSymbol.symbol.detail;
        }

        if (instanceTypeName) {
          const { filePath, symbol } = sm.findAllSymbols(instanceTypeName, [
            SymbolKind.Interface,
            SymbolKind.Class,
            SymbolKind.Object,
          ])?.[0];
          if (filePath && symbol) {
            // TODO: find the members within the symbolDefinition corresponding to the symbolName
            const memberWithinDefinition = symbol?.children?.find(
              (x) => x.name === symbolName
            );

            if (memberWithinDefinition) {
              return [
                Location.create(
                  windowsSafeUri(filePath),
                  memberWithinDefinition.range
                ),
              ];
            }
          }
        }
      }
      // NOTE: when storing nameless objects the have the same name in the symbols collection

      //sm.findSymbol(owner.symbol.name);
    }

    const isObjectOrClass =
      owner?.symbol?.kind &&
      (owner.symbol.kind === SymbolKind.Object ||
        owner.symbol.kind === SymbolKind.Class);
    if (!isObjectOrClass) {
      connection.console.debug(
        `Can not handle anything else but objects and classes. `
      );
      return fetchSymbolGlobally(symbolName, sm);
    }

    //symbolManager.assignmentStatements.get(symbolName);

    // Add inheritance chain and check in ascending order where the method first occurs after the clicked instance:
    const superClassNames = sm.getInheritanceChainFor(parentName);

    for (const superClassName of superClassNames) {
      const potentialParent = sm.findSymbol(superClassName, true);
      // TODO: verify member is within instance:
      const foundMemberSymbol =
        potentialParent?.symbol?.children?.filter(
          (x) => x.name === symbolName
        ) ?? [];

      if (
        foundMemberSymbol.length > 0 &&
        potentialParent.symbol &&
        potentialParent.filePath
      ) {
        // TODO: Decide which parent should be the containing object, for now we just grab the first
        containingObject = potentialParent?.symbol;
        fsPath = potentialParent?.filePath;

        connection.console.debug(`Found definition within a member call chain: 
          [${containingObject.name}].${symbolName}, going there. `);
        break;
      }
    }
  }

  // IF no containingObject was found via member call chain (_but it is still *matches* a member call chain_)
  // try to find it within the class itself
  // First try to locate the member's parent
  containingObject ??= sm.findContainingObject(fsPath, pos);

  // TODO: If the containing object is not found in this file, check for static references globally so we can cover cases like:   "LitUnlit.appliesTo(self)"
  // where LitUnlit is an object defined elsewhere and being referenced from within another objects method

  // symbolManager.findSymbol('appliesTo')
  // symbolManager.findAllSymbols('appliesTo')

  if (containingObject?.detail) {
    // First check the containing object for a method definition
    const memberWithinInstance = containingObject?.children?.find(
      (x: DocumentSymbol) => x.name === symbolName
    );

    // If the line of that method definition is not the same as the clicked position: go there!
    if (
      memberWithinInstance &&
      pos.line !== memberWithinInstance?.range?.start?.line
    ) {
      // TODO: this might fail if the file isn't saved and recompiled. Rethink how this can be checked

      return [
        Location.create(
          onWindowsPlatform ? URI.file(fsPath)?.path : fsPath,
          memberWithinInstance.range
        ),
      ];
    }

    // Otherwise get the superclass symbol name of the containing object from its detail property
    const superclasses = sm.findAllSymbols(containingObject.detail, [
      SymbolKind.Interface,
      SymbolKind.Class,
      SymbolKind.Object,
    ]);

    // Sort by compilation order
    const compiledFilesList = [...preprocessedFilesCacheMap.keys()].reverse();
    let orderedSuperClasses = [];
    for (const compiledFile of compiledFilesList) {
      const foundEntry = superclasses.find((x) =>
        compareStringReverse(x.filePath, compiledFile)
      );
      if (foundEntry) {
        // TODO: don't add methodWithinInstance into orderedSuperClasses
        orderedSuperClasses.push(foundEntry);
      }
    }

    // If modification/replacement - sort in compilation ordering
    // NOTE: ExtendedDocumentSymbolProperties holds info about
    // isModification / isReplacement
    for (const superClassAndUri of orderedSuperClasses) {
      // Locate the method within the superclass's children
      const memberWithinSuperClass = superClassAndUri?.symbol?.children?.find(
        (x) => x.name === symbolName
      );

      // Return the location of the superclass method definition
      if (memberWithinSuperClass) {
        // Skip this symbol if it turns out to be the one we started via
        if (superClassAndUri.filePath === fsPath) {
          //connection.console.debug("Same path we are already in");
          if (memberWithinSuperClass.range.start.line == pos.line) {
            connection.console.debug(
              "Same position as starting position, skipping"
            );
            continue;
          }
        }

        const loc = Location.create(
          onWindowsPlatform
            ? URI.file(superClassAndUri.filePath)?.path
            : superClassAndUri.filePath,
          memberWithinSuperClass.range
        );
        return [loc];
      }
    }
  }

  // Finally, let's handle the other cases so we can click on properties and such, but it needs to be last so it doesn't interfere
  // with inherited lookups.
  if (memberCallMatch === null) {
    // If this wasn't a member call at all, look for regular function calls or property access
    const functionSymbols = sm.findAllSymbols(symbolName, [
      SymbolKind.Function,
      SymbolKind.Property,
      SymbolKind.Method,
    ]);
    if (functionSymbols.length > 0) {
      const symbols = functionSymbols
        .filter((x) => !isSameFileAndLine(x, fsPath, pos))
        .map((x) =>
          Location.create(windowsSafeUri(x.filePath), x.symbol.range)
        );
      return symbols;
    }
  }

  return [];
}

function alignRangeToStart(range: Range) {
  return Range.create(
    range.start.line,
    range.start.character,
    range.start.line,
    range.start.character
  );
}

function isSameFileAndLine(
  x: { symbol: DocumentSymbol; filePath: string },
  fsPath: string,
  position: Position
): unknown {
  return (
    compareStringReverse(x.filePath, fsPath) &&
    x.symbol.range.start.line === position.line
  );
}

function fetchSymbolGlobally(
  symbolName: string,
  sm: TadsSymbolManager
): Location[] {
  const locations = [];
  connection.console.debug(
    `Searching definition(s) for word: ${symbolName} using (global) strategy`
  );
  for (const filePathKey of sm.symbols.keys()) {
    const localSymbols = sm.symbols.get(filePathKey);
    if (localSymbols) {
      const symbol = flattenTreeToArray(localSymbols).find(
        (x) => x.name === symbolName
      );
      if (symbol !== undefined) {
        connection.console.debug(
          `Found definition of ${symbolName} in ${filePathKey} at line: ${symbol.range.start.line}`
        );
        const filePath = URI.file(filePathKey).toString();
        locations.push(Location.create(filePath, symbol.range));
      }
    }
  }
  return locations;
}

function isRangeWithin(range: Range, containingRange: Range): boolean {
  if (range.start.line < containingRange.start.line) {
    return false;
  }
  if (range.end.line > containingRange.end.line) {
    return false;
  }

  if (range.start.line === containingRange.start.line) {
    return range.start.character >= containingRange.start.character;
  }

  if (range.end.line === containingRange.end.line) {
    return range.end.character <= containingRange.end.character;
  }
  return true;
}

function isPositionWithinRange(
  position: Position,
  containingRange: Range
): boolean {
  if (position.line < containingRange.start.line) {
    return false;
  }
  if (position.line > containingRange.end.line) {
    return false;
  }

  if (position.line === containingRange.start.line) {
    return position.character >= containingRange.start.character;
  }

  if (position.line === containingRange.end.line) {
    return position.character <= containingRange.end.character;
  }
  return true;
}

function findLocals(
  sm: TadsSymbolManager,
  symbolName: string,
  fsPath: string,
  position: Position
): Location[] {
  const locations = [];
  const localAssignmentDeclarations = sm.getClosestAssignmentDeclaration(
    fsPath,
    symbolName,
    position
  );
  if (localAssignmentDeclarations?.documentSymbol) {
    const location = Location.create(
      windowsSafeUri(fsPath),
      localAssignmentDeclarations.documentSymbol.range
    );
    locations.push(location);
  }
  return locations;
}

function findInherited(
  sm: TadsSymbolManager,
  fsPath: string,
  position: Position
): Location[] {
  const locations = [];
  const containingObject = sm.findContainingObject(fsPath, position);
  const enclosingMethod = sm.findClosestSymbolKindByPosition(
    fsPath,
    [SymbolKind.Method, SymbolKind.Function],
    position
  );
  if (containingObject) {
    if (enclosingMethod && containingObject?.detail) {
      const containingObjectKinds = sm.findAllSymbols(containingObject.detail, [
        SymbolKind.Interface,
        SymbolKind.Class,
        SymbolKind.Object,
      ]);

      // TODO: Get the inheritance chain, and find the next symbol in line for containingObject
      // TODO: same as in row 352, make reusable
      // (Here we just cheat and might get several results)
      for (const containingObjectKind of containingObjectKinds) {
        const inheritedMethods =
          containingObjectKind.symbol?.children?.filter(
            (x) => x.name === enclosingMethod.name
          ) ?? [];
        for (const inheritedMethod of inheritedMethods) {
          if (inheritedMethod) {
            // Skip the position we're currently at if it's in the same file
            // and within the current method's scope
            if (
              compareStringReverse(containingObjectKind.filePath, fsPath) &&
              isPositionWithinRange(position, inheritedMethod.range)
            ) {
              continue;
            }

            const fp = onWindowsPlatform
              ? URI.file(containingObjectKind.filePath)?.path
              : containingObjectKind.filePath;
            locations.push(Location.create(fp, inheritedMethod.range));
          }
        }
      }
      if (locations.length > 0) {
        return locations;
      }
    }

    if (
      enclosingMethod &&
      (containingObject.kind === SymbolKind.Object ||
        containingObject.kind === SymbolKind.Class)
    ) {
      const foundSuperTypes = [];
      const superTypeSymbolNames = containingObject.detail?.split(",") ?? [];
      for (const superTypeName of superTypeSymbolNames) {
        if (superTypeName === "object") {
          continue;
        }

        foundSuperTypes.push(sm.findSymbol(superTypeName));
        const { filePath, symbol } = sm.findSymbol(superTypeName);
        if (filePath && symbol) {
          const fileUri = onWindowsPlatform
            ? URI.file(filePath)?.path
            : filePath;
          locations.push(Location.create(fileUri, symbol.range));
        }
      }
    }
  }
  return locations;
}

function findSelf(
  sm: TadsSymbolManager,
  uri: string,
  fsPath: string,
  position: Position
): LocationLink[] {
  const containingObject = sm.findContainingObject(fsPath, position);
  if (containingObject) {
    const toOfContainingObjectRange = Range.create(
      containingObject.range.start.line,
      containingObject.range.start.character,
      containingObject.range.start.line,
      containingObject.range.start.character
    );
    const locationLink = LocationLink.create(
      uri,
      containingObject.range,
      toOfContainingObjectRange
    );
    return [locationLink];
  }
  return [];
}

function findObjects(sm: TadsSymbolManager, symbolName: string): Location[] {
  const locations = [];
  const objectsAndClasses = sm.findAllSymbols(symbolName, [
    SymbolKind.Interface,
    SymbolKind.Class,
    SymbolKind.Object,
  ]);

  for (const superClass of objectsAndClasses) {
    if (superClass.symbol.name === symbolName) {
      connection.console.debug(
        `Found ${superClass.symbol.kind} in ${superClass.filePath}`
      );
      const location = Location.create(
        windowsSafeUri(superClass.filePath),
        superClass.symbol.range
      );
      locations.push(location);
    }
  }
  return locations;
}

function findMacros(symbolName: any): Location[] {
  const locations = [];
  const macro = getDefineMacrosMap().get(symbolName);
  if (macro) {
    connection.console.debug(
      `Found macro definition(s) for word: ${symbolName} within ${macro.uri} on row ${macro.row}`
    );
    locations.push(
      Location.create(
        macro.uri,
        Range.create(macro.row, 0, macro.endLine, macro.row + symbolName.length)
      )
    );
  }
  return locations;
}

function expandSentielDobj(currentLine: string, symbolName: any): any {
  // TODO: need to handle propertySets in a more general way than this:
  // Not sure if this should be here since it is a bit too hardwired and only works for
  // adv3: If ctrl-clicking "Examine" in dobjFor(Examine) "Examine" will be replaced with
  // what the preprocessed version of it is, e.g:  "sentinelDobjExamine"
  // But leaving it as is for now.
  const dobjForRegexp = /[id]objFor[(](.*)[)]/;
  const result = dobjForRegexp.exec(currentLine);
  if (result && result[1] === symbolName) {
    //const fsPath = URI.parse(textDocument.uri).fsPath;
    //const prepRows = preprocessedFilesCacheMap.get(fsPath)?.split(/\n/) ?? [];
    //const prepLine = (prepRows[position.line]) ?? '';
    return `sentinelDobj${symbolName}`;
  }
  return symbolName;
}

// Uncertain of the need, but keep it
function sameDocumentPosition(
  onWindowsPlatform: boolean,
  textDocument: TextDocumentIdentifier,
  loc: Location,
  pos: Position
) {
  const sameUri = onWindowsPlatform
    ? textDocument.uri.toLowerCase() === loc.uri.toLowerCase()
    : textDocument.uri === loc.uri;
  return (
    sameUri &&
    loc.range.start.line <= pos.line &&
    loc.range.end.line >= pos.line &&
    loc.range.start.character <= pos.character &&
    loc.range.end.character >= pos.character
  );
}

/*
LEFTOVERS:
// Left TODO: Quotes holds no definition per se. Unless it is an template inline expression  '<<' .* '>>'
// in which case we can parse that expression here.

const inlineExpression = interpolatedExpressionRegExp.exec(quote.quoteString);
if(inlineExpression) {
  const str = inlineExpression[1];
  const input = CharStreams.fromString(str);
  const lexer = new Tads3Lexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Tads3Parser(tokenStream);
  const parseTree = parser.expr();
  console.log(parseTree.ruleContext);
  */
