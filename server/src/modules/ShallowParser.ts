/*
 *  Simple parser for TADS3 objects detailing hierarchy
 */
import { CharStreams, CommonTokenStream, Token } from "antlr4ts";
import { Tads3Lexer } from "../parser/Tads3Lexer";

type BlockKind = "object" | "function" | "block";

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

    // Initialize map with empty entries for all lines
    for (let i = 0; i < lines.length; i++) {
      tokensPerLine.set(i + 1, {
        stateBefore: undefined,
        events: { startsObject: false, endsObject: false, opensBrace: false },
        stateAfter: { objectDepth: 0, braceDepth: 0 },
        objectId: undefined,
        owner: undefined,
        rawText: lines[i], //.substring(0, 20) + '...', // Limit to first 20 chars
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
    };

    let currentLine = -1;
    let lastLineWithObject = -1;
    let lastObjectBodyLine = -1;
    let currentEntry: LineContext | undefined;
    let currentObjectId: string | undefined; // Cache top of objectIds stack
    let tokensSize = tokens.size;
    let lastProcessedLine = -1; // Track last line where we processed tokens

    for (let idx = 0; idx < tokensSize; idx++) {
      const token = tokens.get(idx);
      if (token.type === Token.EOF) break;

      const line = token.line;

      // When we move to a new line, update the previous line's entry
      if (line !== currentLine) {
        if (currentLine !== -1 && currentEntry) {
          currentEntry.stateAfter = { objectDepth: state.objectDepth, braceDepth: state.braceDepth };
        }

        // Backfill owner and objectId for lines between last processed line and current line
        // This handles multi-line tokens (like multi-line strings)
        if (lastProcessedLine > 0 && lastProcessedLine < line - 1) {
          for (let fillLine = lastProcessedLine + 1; fillLine < line; fillLine++) {
            const fillEntry = tokensPerLine.get(fillLine);
            if (fillEntry && lastLineWithObject !== fillLine) {
              if (fillEntry.owner === undefined) {
                fillEntry.owner = state.owner;
              }
              if (fillEntry.objectId === undefined && currentObjectId) {
                fillEntry.objectId = currentObjectId;
              }
            }
          }
        }

        // Get/create entry for new line
        currentEntry = tokensPerLine.get(line);
        if (currentEntry && !currentEntry.stateBefore) {
          currentEntry.stateBefore = { objectDepth: state.objectDepth, braceDepth: state.braceDepth };
        }
        currentLine = line;
      }

      if (!currentEntry) continue;

      // Process each token type
      if (token.type === Tads3Lexer.ID) {
        // Check if this looks like an object declaration: "name : Type"
        // Skip whitespace to find the next token
        let nextIdx = idx + 1;
        const tokenCount = tokensSize;
        while (nextIdx < tokenCount && tokens.get(nextIdx).type === Tads3Lexer.WS) {
          nextIdx++;
        }

        if (nextIdx < tokenCount) {
          const next = tokens.get(nextIdx);

          if (next.type === Tads3Lexer.COLON && token.text) {
            // Found "name :" pattern - object declaration
            const objectName = token.text;
            currentEntry.events.startsObject = true;
            currentEntry.objectId = objectName;

            if (state.objectDepth === 0) {
              currentEntry.owner = undefined;
            } else {
              currentEntry.owner = state.owner;
            }

            lastLineWithObject = line;
            state.objectIds.push(objectName);
            currentObjectId = objectName; // Cache it
            state.objectDepth += 1;
            lastObjectBodyLine = line;

            // Check if next token after type is LEFT_CURLY
            let checkIdx = nextIdx + 1;
            while (checkIdx < tokenCount && tokens.get(checkIdx).type === Tads3Lexer.WS) {
              checkIdx++;
            }
            const tokenAfterType = tokens.get(checkIdx);

            // For inline objects (no braces), set owner immediately
            if (tokenAfterType && tokenAfterType.type !== Tads3Lexer.LEFT_CURLY) {
              state.owner = objectName;
            }

            currentEntry.stateBefore = {
              objectDepth: state.objectDepth - 1,
              braceDepth: state.braceDepth,
            };
          }
        }
      } else if (token.type === Tads3Lexer.LEFT_CURLY) {
        currentEntry.events.opensBrace = true;
        state.braceDepth += 1;

        const isObjectBodyBrace = line === lastObjectBodyLine;
        state.blockStack.push({
          kind: isObjectBodyBrace ? "object" : "block",
          objectId: isObjectBodyBrace ? currentObjectId : undefined,
        });

        // Set owner when entering body
        if (currentObjectId && lastLineWithObject !== line) {
          state.owner = currentObjectId;
          currentEntry.owner = state.owner;
        }
      } else if (token.type === Tads3Lexer.RIGHT_CURLY) {
        state.braceDepth -= 1;
        const frame = state.blockStack.pop();

        // Only close objects that are object bodies, not method blocks
        if (frame?.kind === "object" && state.braceDepth === 0 && state.objectIds.length > 0) {
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

      // Update line entry
      if (!currentEntry.objectId && currentObjectId) {
        currentEntry.objectId = currentObjectId;
      }

      // Set owner for non-declaration lines
      if (currentEntry.owner === undefined && lastLineWithObject !== line) {
        currentEntry.owner = state.owner;
      }

      currentEntry.stateAfter = { objectDepth: state.objectDepth, braceDepth: state.braceDepth };
      lastProcessedLine = line; // Track that we processed this line
    }

    return tokensPerLine;
  }
}
