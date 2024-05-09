import {
  LocationLink,
  TextDocuments,
  Position,
  TextDocumentIdentifier,
} from "vscode-languageserver";
import { flattenTreeToArray, TadsSymbolManager } from "./symbol-manager";
import {
  compareStringReverse,
  getWordAtPosition,
  withinQuote,
} from "./text-utils";
import { DefinitionParams, Location, Range } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { SymbolKind } from "vscode-languageserver";
import { getDefineMacrosMap } from "../parser/preprocessor";
import { connection } from "../server";
import { DocumentSymbol } from "vscode";
import { preprocessedFilesCacheMap } from "../server";
import { TextDocument } from "vscode-languageserver-textdocument";
import { extractCurrentLineFromDocument } from "./utils";

const onWindowsPlatform = process.platform === "win32";

export async function onDefinition(
  { textDocument, position }: DefinitionParams,
  documents: TextDocuments<TextDocument>,
  symbolManager: TadsSymbolManager
) {
  try {
    const locations: Location[] = [];
    const currentDoc = documents.get(textDocument.uri);
    if (currentDoc) {
      const quote = withinQuote(currentDoc, position);
      if (quote) {
        // Left TODO: Quotes holds no definition per se. Unless it is an template inline expression  '<<' .* '>>'
        // in which case we can parse that expression here.
        /*
			const inlineExpression = interpolatedExpressionRegExp.exec(quote.quoteString);
			if(inlineExpression) {
				const str = inlineExpression[1];
				const input = CharStreams.fromString(str);
				const lexer = new Tads3Lexer(input);
				const tokenStream = new CommonTokenStream(lexer);
				const parser = new Tads3Parser(tokenStream);
				const parseTree = parser.expr();
				console.log(parseTree.ruleContext);
			}*/

        return locations;
      }

      let symbolName = getWordAtPosition(currentDoc, position);

      if (symbolName) {
        const fsPath = URI.parse(textDocument.uri).fsPath;

        if (symbolName === "object") {
          return locations;
        }

        // TODO: this should adhere to the new way of using locateMemberHierarchically instead
        if (symbolName === "inherited") {
          const containingObject = symbolManager.findContainingObject(
            fsPath,
            position
          );
          if (
            containingObject.kind === SymbolKind.Object ||
            containingObject.kind === SymbolKind.Class
          ) {
            const foundSuperTypes = [];
            const superTypeSymbolNames = containingObject.detail.split(",");
            for (const superTypeName of superTypeSymbolNames) {
              if (superTypeName === "object") {
                continue;
              }
              foundSuperTypes.push(symbolManager.findSymbol(superTypeName));
              const { filePath, symbol } =
                symbolManager.findSymbol(superTypeName);
              if (filePath && symbol) {
                const fileUri = URI.file(filePath).toString();
                locations.push(Location.create(fileUri, symbol.range));
              }
            }
            return locations;
          }
        }

        // TODO: this should adhere to the new way of using locateMemberHierarchically instead
        if (symbolName === "self") {
          const containingObject = symbolManager.findContainingObject(
            fsPath,
            position
          );
          if (containingObject) {
            const toOfContainingObjectRange = Range.create(
              containingObject.range.start.line,
              containingObject.range.start.character,
              containingObject.range.start.line,
              containingObject.range.start.character
            );
            const locationLink = LocationLink.create(
              textDocument.uri,
              containingObject.range,
              toOfContainingObjectRange
            );
            if (locationLink) {
              return [locationLink];
            }
          }
        }

        // TODO: need to handle propertySets in a more general way than this:

        // Not sure if this should be here since it is a bit too hardwired and only works for
        // adv3: If ctrl-clicking "Examine" in dobjFor(Examine) "Examine" will be replaced with
        // what the preprocessed version of it is, e.g:  "sentinelDobjExamine"
        // But leaving it as is for now.

        const currentLine = currentDoc.getText(
          Range.create(position.line, 0, position.line + 1, 0)
        );
        const dobjForRegexp = /[id]objFor[(](.*)[)]/;
        const result = dobjForRegexp.exec(currentLine);
        if (result && result[1] === symbolName) {
          //const fsPath = URI.parse(textDocument.uri).fsPath;
          //const prepRows = preprocessedFilesCacheMap.get(fsPath)?.split(/\n/) ?? [];
          //const prepLine = (prepRows[position.line]) ?? '';
          symbolName = "sentinelDobj" + symbolName;
        }

        // ====================================================================================
        // This old way of looking up definitions should not be used now. If we have reached
        // the bottom of an inheritance chain the way up is only by using references, not by
        // definitions.
        // ====================================================================================
        /*
        connection.console.debug(`Searching definition(s) for word: ${symbolName}`);
        for (const filePathKey of symbolManager.symbols.keys()) {
          const localSymbols = symbolManager.symbols.get(filePathKey);
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
        }*/
        // ====================================================================================

        // First check for objects or classes definitions
        const objectsAndClasses = symbolManager.findAllSymbols(
          symbolName,[SymbolKind.Class, SymbolKind.Object]
        );

        for (const superClass of objectsAndClasses) {
          if (superClass.symbol.name === symbolName) {
            connection.console.debug(
              `Found ${superClass.symbol.kind} in ${superClass.filePath}`
            );
            const location = Location.create(
              superClass.filePath,
              superClass.symbol.range
            );
            locations.push(location);
          }
        }
        if (locations.length > 0) {
          return locations;
        }
        

        // Next, check for members
        const member = locateMemberHierarchically(
          symbolName,
          fsPath,
          position,
          currentDoc
        );
        if (member) {
          return member;
        }
      }

      // If no symbols have been found yet, take a look at the macro definitions
      if (locations.length === 0) {
        //connection.console.debug(`Searching macro definition(s) for word: ${symbolName}`);
        const macro = getDefineMacrosMap().get(symbolName);
        if (macro) {
          connection.console.debug(
            `Found macro definition(s) for word: ${symbolName} within ${macro.uri} on row ${macro.row}`
          );
          locations.push(
            Location.create(
              macro.uri,
              Range.create(
                macro.row,
                0,
                macro.endLine,
                macro.row + symbolName.length
              )
            )
          );
        }
      }

      /*
      if (locations.length === 0) {
        connection.console.debug(
          `No definition(s) found for word: ${symbolName}.`
        );
      }*/

      // TODO: figure out if there's a need to use the old way or not
      // Filter out the current selection itself;
      return locations.filter(
        (location) => !sameDocumentPosition(textDocument, location, position)
      );
    }

    function sameDocumentPosition(
      textDocument: TextDocumentIdentifier,
      defMatchLocation: Location,
      cursorPosition: Position
    ) {
      const sameUri = onWindowsPlatform
        ? textDocument.uri.toLowerCase() === defMatchLocation.uri.toLowerCase()
        : textDocument.uri === defMatchLocation.uri;
      return (
        sameUri &&
        defMatchLocation.range.start.line <= cursorPosition.line &&
        defMatchLocation.range.end.line >= cursorPosition.line &&
        defMatchLocation.range.start.character <= cursorPosition.character &&
        defMatchLocation.range.end.character >= cursorPosition.character
      );
    }

    function locateMemberHierarchically(
      symbolName: string,
      fsPath: string,
      position: Position,
      document: TextDocument
    ): Location[] | undefined {
      let containingObject = undefined;

      const currentLineStr = extractCurrentLineFromDocument(
        position.line,
        document
      );

      // TODO: To be 100% correct this assignment should be parsed and evaluated instead,
      // using a visitor per assignment whilst the listener traverses the parse tree.
      const memberCallRegExp = new RegExp(
        `([a-zA-Z]+[a-zA-Z0-9]*)\\s*.\\s*${symbolName}\\s*[(.]`
      );

      const memberCallMatch = memberCallRegExp.exec(currentLineStr);
      if (memberCallMatch) {
        // Since this is a member call, look within the parent too for symbol
        const parentName = memberCallMatch[1];
        const potentialParents = symbolManager.findAllSymbols(parentName);
        for (const potentialParent of potentialParents) {
          // TODO: verify member is within instance:
          const foundMemberSymbol =
            potentialParent?.symbol?.children?.filter(
              (x) => x.name === symbolName
            ) ?? [];
          if (foundMemberSymbol.length > 0) {
            // TODO: Decide which parent should be the containing object, for now we just grab the first
            containingObject = potentialParent?.symbol;
            fsPath = potentialParent.filePath;

            connection.console
              .debug(`Found definition within a member call chain: 
              [${containingObject.name}].${symbolName}, going there. `);
          }
        }
      }

      // IF no containingObject was found via member call chain,
      // try to find it within the class itself
      // First try to locate the member's parent
      containingObject ??= symbolManager.findContainingObject(fsPath, position);

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
          position.line !== memberWithinInstance?.range?.start?.line
        ) {
          return [Location.create(fsPath, memberWithinInstance.range)];
        }

        // Otherwise get the superclass symbol name of the containing object from its detail property
        const superclasses = symbolManager.findAllSymbols(
          containingObject.detail,
          [SymbolKind.Class, SymbolKind.Object]
        );

        
        // Sort by compilation order
        const compiledFilesList = [
          ...preprocessedFilesCacheMap.keys(),
        ].reverse();
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
          const memberWithinSuperClass =
            superClassAndUri?.symbol?.children?.find(
              (x) => x.name === symbolName
            );

          // Return the location of the superclass method definition
          if (memberWithinSuperClass) {
            // Skip this symbol if it turns out to be the one we started via
            if (superClassAndUri.filePath === fsPath) {
              //connection.console.debug("Same path we are already in");
              if (memberWithinSuperClass.range.start.line == position.line) {
                connection.console.debug(
                  "Same position as starting position, skipping"
                );
                continue;
              }
            }

            const loc = Location.create(
              superClassAndUri.filePath,
              memberWithinSuperClass.range
            );
            return [loc];
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}
