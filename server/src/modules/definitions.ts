import {
  LocationLink,
  TextDocumentIdentifier,
  TextDocuments,
  Position,
} from "vscode-languageserver";
import { flattenTreeToArray, TadsSymbolManager } from "./symbol-manager";
import { getWordAtPosition, withinQuote } from "./text-utils";
import { DefinitionParams, Location, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { SymbolKind } from "vscode-languageserver";
import { getDefineMacrosMap } from "../parser/preprocessor";
import { connection } from "../server";
import { DocumentSymbol } from "vscode";
import { findAncestor, textChangeRangeIsUnchanged } from "typescript";
import { preprocessedFilesCacheMap } from "../server";

const interpolatedExpressionRegExp = /[<][<](.*)[>][>]/g;

const onWindowsPlatform = process.platform === "win32";

export async function onDefinition(
  { textDocument, position }: DefinitionParams,
  documents: TextDocuments<TextDocument>,
  symbolManager: TadsSymbolManager
) {
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

      //connection.console.debug(`Searching definition(s) for word: ${symbolName}`);
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
      }

      if (locations.length > 0) {
        const member = locateMemberInSuperClass(symbolName, fsPath, position);
        if (member) {
          return [member];
        }

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

        if (locations.length == 0) {
          connection.console.debug(
            `No definition(s) found for word: ${symbolName}.`
          );
        }
      }
    }

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

  function locateMemberInSuperClass(
    symbolName: string,
    fsPath: string,
    position: Position
  ): Location | undefined {
    // Locate the member's parent
    const containingObject = symbolManager.findContainingObject(
      fsPath,
      position
    );

    if (containingObject.detail) {
      // First check the containing object for a method definition
      const methodWithinInstance = containingObject?.children?.find(
        (x: DocumentSymbol) => x.name === symbolName
      );

      // If the line of that method definition is not the same as the clicked position: go there!
      if (
        methodWithinInstance &&
        position.line !== methodWithinInstance?.range?.start?.line
      ) {
        return Location.create(fsPath, methodWithinInstance.range);
      }

      // Otherwise get the superclass symbol name of the containing object from its detail property
      const superclasses = symbolManager.findAllSymbol(
        containingObject.detail,
        [SymbolKind.Class, SymbolKind.Object]
      );

      // Order by compilation order
      const compiledFilesList = [...preprocessedFilesCacheMap.keys()].reverse();
      let orderedSuperClasses = [];
      for (const compiledFile of compiledFilesList) {
        const foundEntry = superclasses.find(
          (x) => x[0].filePath === compiledFile
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
        const superClassSymbol = superClassAndUri[0].symbol;
        const filePath = superClassAndUri[0].filePath;

        // Locate the method within the superclass's children
        const methodWithinSuperClass = superClassSymbol?.children?.find(
          (x) => x.name === symbolName
        );

        // Return the location of the superclass method definition
        if (methodWithinSuperClass) {
          // Skip this symbol if it turns out to be the one we started via
          if (filePath === fsPath) {
            connection.console.debug("Same path we are already in");
            if (methodWithinSuperClass.range.start.line == position.line) {
              connection.console.debug("Same line, skipping");
              continue;
            }
          }

          const loc = Location.create(filePath, methodWithinSuperClass.range);
          return loc;
        }
      }
    }
  }
}
