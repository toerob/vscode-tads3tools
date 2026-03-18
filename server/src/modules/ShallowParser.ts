/*
 *  Simple parser for TADS3 objects detailing hierarchy
 */
import { CharStreams, CommonTokenStream, Token } from "antlr4ts";
import { Tads3Lexer } from "../parser/Tads3Lexer";

type BlockKind = "object" | "function" | "method" | "block";

interface BlockFrame {
  kind: BlockKind | null;
  objectId?: string;
}

interface ParseState {
  objectDepth: number;
  braceDepth: number;
  objectIds: string[];
  blockStack: BlockFrame[];
  owner: string | undefined;
  /** Objects declared but not yet associated with a '{'. */
  pendingBraceStack: Array<{ name: string; seenPropOrMethod: boolean }>;
}

interface LineContext {
  stateBefore: { objectDepth: number; braceDepth: number } | undefined;
  events: {
    startsObject: boolean;
    endsObject: boolean;
    opensBrace: boolean;
  };
  stateAfter: { objectDepth: number; braceDepth: number };
  objectId: string | undefined;
  owner: string | undefined;
  rawText: string;
}

export class ShallowParser {
  constructor() {}

  structurize(text: string) {
    const lines = text.split(/\r?\n/);
    const tokensPerLine = new Map<number, LineContext>();

    for (let i = 0; i < lines.length; i++) {
      tokensPerLine.set(i + 1, {
        stateBefore: undefined,
        events: { startsObject: false, endsObject: false, opensBrace: false },
        stateAfter: { objectDepth: 0, braceDepth: 0 },
        objectId: undefined,
        owner: undefined,
        rawText: lines[i],
      });
    }

    const input = CharStreams.fromString(text + "\n");
    const lexer = new Tads3Lexer(input);
    const tokens = new CommonTokenStream(lexer);
    tokens.fill();

    const state: ParseState = {
      objectDepth: 0,
      braceDepth: 0,
      objectIds: [],
      blockStack: [],
      owner: undefined,
      pendingBraceStack: [],
    };

    let currentLine = -1;
    let lastLineWithObject = -1;
    let currentEntry: LineContext | undefined;
    let currentObjectId: string | undefined;
    const tokensSize = tokens.size;
    let lastProcessedLine = -1;
    // Line number of the most recent method/function signature (ID followed by '(' or '{' at
    // line start with braceDepth 0). Used to classify the following '{' as "method".
    let methodSigLine = -1;

    for (let idx = 0; idx < tokensSize; idx++) {
      const token = tokens.get(idx);
      if (token.type === Token.EOF) break;

      const line = token.line;

      if (line !== currentLine) {
        if (currentLine !== -1 && currentEntry) {
          currentEntry.stateAfter = { objectDepth: state.objectDepth, braceDepth: state.braceDepth };
        }

        // Backfill owner and objectId for lines skipped by multi-line tokens
        if (lastProcessedLine > 0 && lastProcessedLine < line - 1) {
          for (let fillLine = lastProcessedLine + 1; fillLine < line; fillLine++) {
            const fillEntry = tokensPerLine.get(fillLine);
            if (fillEntry && lastLineWithObject !== fillLine) {
              if (fillEntry.owner === undefined) fillEntry.owner = state.owner;
              if (fillEntry.objectId === undefined && currentObjectId) fillEntry.objectId = currentObjectId;
            }
          }
        }

        currentEntry = tokensPerLine.get(line);
        if (currentEntry && !currentEntry.stateBefore) {
          currentEntry.stateBefore = { objectDepth: state.objectDepth, braceDepth: state.braceDepth };
        }
        currentLine = line;
      }

      if (!currentEntry) continue;

      if (token.type === Tads3Lexer.ID) {
        // Skip ahead past whitespace to find the next meaningful token
        let nextIdx = idx + 1;
        while (nextIdx < tokensSize && tokens.get(nextIdx).type === Tads3Lexer.WS) nextIdx++;

        if (nextIdx >= tokensSize) continue;

        const next = tokens.get(nextIdx);
        const lineText = lines[line - 1].trimStart();
        // Match optional prefixes: intrinsic class, class, grammar, +/*/# symbols, or bare ID
        const leadingSymbolMatch = lineText.match(
          /^(?:intrinsic\s+(?:class\s+)?|class\s+|grammar\s+|((?:[+*#-]+)\s*)?)([a-zA-Z_][a-zA-Z0-9_]*)/,
        );
        // Also verify the token is at the expected column so we don't false-positive on
        // identifiers that share a name with the line-start token but appear later in the line
        // (e.g. `foo = (... .foo : bar)` where `.foo :` looks like an object declaration).
        const leadingIndent = lines[line - 1].length - lineText.length;
        const prefixLen = leadingSymbolMatch ? leadingSymbolMatch[0].length - leadingSymbolMatch[2].length : 0;
        const expectedCol = leadingIndent + prefixLen;
        const isLineStart = !!(
          leadingSymbolMatch &&
          leadingSymbolMatch[2] === token.text &&
          token.charPositionInLine === expectedCol
        );

        if (next.type === Tads3Lexer.COLON && token.text && isLineStart) {
          // ── Object declaration: name : superclass ──
          const objectName = token.text;
          currentEntry.events.startsObject = true;
          currentEntry.objectId = objectName;
          currentEntry.owner = state.objectDepth === 0 ? undefined : state.owner;

          lastLineWithObject = line;
          state.objectIds.push(objectName);
          currentObjectId = objectName;
          state.objectDepth += 1;

          // Push a pending-brace entry; it will be consumed when the matching '{' is seen.
          // seenPropOrMethod tracks whether any property/method appeared before that '{',
          // which would mean the object is inline-style (terminated by ';').
          state.pendingBraceStack.push({ name: objectName, seenPropOrMethod: false });

          // Record stateBefore for the declaration line (before objectDepth increment)
          currentEntry.stateBefore = { objectDepth: state.objectDepth - 1, braceDepth: state.braceDepth };

          // For inline objects (no immediate '{'), set owner so body lines get the right owner
          let checkIdx = nextIdx + 1;
          while (checkIdx < tokensSize && tokens.get(checkIdx).type === Tads3Lexer.WS) checkIdx++;
          const tokenAfterColon = tokens.get(checkIdx);
          if (tokenAfterColon && tokenAfterColon.type !== Tads3Lexer.LEFT_CURLY) {
            state.owner = objectName;
          }
        } else if (isLineStart && state.braceDepth === 0) {
          // ── Potential method/function signature: name(...) or name { ──
          if (next.type === Tads3Lexer.LEFT_PAREN || next.type === Tads3Lexer.LEFT_CURLY) {
            // Mark pending object as having seen a method before its '{' was found
            if (state.pendingBraceStack.length > 0) {
              state.pendingBraceStack[state.pendingBraceStack.length - 1].seenPropOrMethod = true;
            }
            methodSigLine = line;
          }
        }
      } else if (token.type === Tads3Lexer.ASSIGN) {
        // Property assignment '=' at the top level of an object body means inline-style
        if (state.braceDepth === 0 && state.pendingBraceStack.length > 0) {
          state.pendingBraceStack[state.pendingBraceStack.length - 1].seenPropOrMethod = true;
        }
      } else if (token.type === Tads3Lexer.DSTR) {
        // Double-quoted string used as inline property shorthand (e.g. desc) at top level
        if (state.braceDepth === 0 && state.pendingBraceStack.length > 0) {
          state.pendingBraceStack[state.pendingBraceStack.length - 1].seenPropOrMethod = true;
        }
      } else if (token.type === Tads3Lexer.LEFT_CURLY) {
        currentEntry.events.opensBrace = true;
        state.braceDepth += 1;

        // Determine what kind of block this '{' opens
        const pending =
          state.pendingBraceStack.length > 0
            ? state.pendingBraceStack[state.pendingBraceStack.length - 1]
            : null;

        let frameKind: BlockKind;
        let frameObjectId: string | undefined;

        if (pending && !pending.seenPropOrMethod) {
          // This '{' opens the body of the most recently declared object
          state.pendingBraceStack.pop();
          frameKind = "object";
          frameObjectId = currentObjectId;
          // Set owner so that lines inside the body carry the right owner
          if (currentObjectId) {
            state.owner = currentObjectId;
            if (lastLineWithObject !== line) {
              currentEntry.owner = state.owner;
            }
          }
        } else if (methodSigLine !== -1 && (methodSigLine === line || methodSigLine === line - 1)) {
          // '{' immediately follows a method/function signature (same or previous line)
          frameKind = "method";
          methodSigLine = -1;
        } else {
          frameKind = "block";
        }

        state.blockStack.push({ kind: frameKind, objectId: frameObjectId });

        if (frameKind !== "object" && currentObjectId && lastLineWithObject !== line) {
          currentEntry.owner = state.owner;
        }
      } else if (token.type === Tads3Lexer.RIGHT_CURLY) {
        state.braceDepth -= 1;
        const frame = state.blockStack.pop();

        if (frame?.kind === "object" && state.objectIds.length > 0) {
          currentEntry.events.endsObject = true;
          currentEntry.objectId = currentObjectId;

          state.objectIds.pop();
          state.objectDepth -= 1;

          const prevLen = state.objectIds.length;
          if (prevLen > 0) {
            currentObjectId = state.objectIds[prevLen - 1];
            state.owner = currentObjectId;
          } else {
            currentObjectId = undefined;
            state.owner = undefined;
          }
        } else if (currentObjectId && state.braceDepth > 0) {
          currentEntry.owner = state.owner;
        }
      } else if (token.type === Tads3Lexer.SEMICOLON) {
        if (state.braceDepth === 0 && state.objectIds.length > 0) {
          currentEntry.events.endsObject = true;
          currentEntry.objectId = currentObjectId;

          // The inline object never received a '{', so clear its pending-brace entry
          if (
            state.pendingBraceStack.length > 0 &&
            state.pendingBraceStack[state.pendingBraceStack.length - 1].name === currentObjectId
          ) {
            state.pendingBraceStack.pop();
          }

          state.objectIds.pop();
          state.objectDepth -= 1;

          const prevLen = state.objectIds.length;
          if (prevLen > 0) {
            currentObjectId = state.objectIds[prevLen - 1];
            state.owner = currentObjectId;
          } else {
            currentObjectId = undefined;
            state.owner = undefined;
          }
        }
      }

      // Propagate objectId and owner to lines that haven't been set yet
      if (!currentEntry.objectId && currentObjectId) {
        currentEntry.objectId = currentObjectId;
      }
      if (currentEntry.owner === undefined && lastLineWithObject !== line) {
        currentEntry.owner = state.owner;
      }

      currentEntry.stateAfter = { objectDepth: state.objectDepth, braceDepth: state.braceDepth };
      lastProcessedLine = line;
    }

    return tokensPerLine;
  }
}
