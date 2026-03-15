import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { Tads3Lexer } from "../../src/parser/Tads3Lexer";
import { Tads3SymbolListener } from "../../src/parser/Tads3SymbolListener";
import { Tads3Parser } from "../../src/parser/Tads3Parser";
import { it, expect } from "@jest/globals";
import path from "path";
import * as fs from "fs";
import { SymbolKind } from "vscode-languageserver";
import { readFileSync } from "fs";

function parseTextWithTads3SymbolListener(text: string) {
  const input = CharStreams.fromString(text);
  const lexer = new Tads3Lexer(input);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Tads3Parser(tokenStream);
  const parseTreeWalker = new ParseTreeWalker();
  const listener = new Tads3SymbolListener();
  const parseTree = parser.program();
  parseTreeWalker.walk(listener, parseTree);
  return { parseTree, listener };
}

describe("Complete Game parsing integration tests", () => {
  it("parses actor.t and verifies all classes and functions", () => {
    // Arrange
    const preprocessedDoc = readFileSync("tests/fixtures/actor.t").toString();

    // Act
    const { listener } = parseTextWithTads3SymbolListener(preprocessedDoc);

    // Assert
    const classNames = listener.symbols.filter((x) => x.kind === SymbolKind.Class).map((x) => x.name);

    const expectedClassNames = [ 
      "Topic", "FollowInfo", "Posture", "TopicDatabase", "ActorTopicDatabase", "SuggestedTopic", 
      "SuggestedTopicTree", "SuggestedAskTopic", "SuggestedTellTopic", "SuggestedAskForTopic", 
      "SuggestedGiveTopic", "SuggestedShowTopic", "SuggestedYesTopic", "SuggestedNoTopic", 
      "ConvNode", "ConvType", "TopicEntry", "TopicGroup", "AltTopic", "TopicMatchTopic", 
      "AskTellTopic", "AskTopic", "TellTopic", "AskForTopic", "AskAboutForTopic", 
      "AskTellAboutForTopic", "ThingMatchTopic", "GiveShowTopic", "GiveTopic", "ShowTopic", 
      "TopicOrThingMatchTopic", "AskTellShowTopic", "AskTellGiveShowTopic", "CommandTopic", 
      "MiscTopic", "HelloTopic", "ImpHelloTopic", "ActorHelloTopic", "ByeTopic", "ImpByeTopic", 
      "BoredByeTopic", "LeaveByeTopic", "ActorByeTopic", "HelloGoodbyeTopic", "YesNoTopic", 
      "YesTopic", "NoTopic", "DefaultTopic", "DefaultCommandTopic", "DefaultAskTopic", 
      "DefaultTellTopic", "DefaultAskTellTopic", "DefaultGiveTopic", "DefaultShowTopic", 
      "DefaultGiveShowTopic", "DefaultAskForTopic", "DefaultAnyTopic", "SpecialTopic", 
      "InitiateTopic", "DefaultInitiateTopic", "ActorState", "ConversationReadyState", 
      "InConversationState", "BoredomAgendaItem", "HermitActorState", "AccompanyingState", 
      "AccompanyingInTravelState", "PendingConvInfo", "AgendaItem", "ConvAgendaItem", 
      "DelayedAgendaItem", "Actor", "UntakeableActor", "Person", "PendingResponseInfo", 
      "PendingCommandInfo", "PendingCommandToks", "PendingCommandAction", "PendingCommandMarker",
    ];

    for (let i = 0; i < classNames.length; i++) {
      expect(expectedClassNames[i]).toBe(classNames[i]);
    }

    const expectedFunctionNames = ["setPlayer", "setRootPOV"];
    const functionNames = listener.symbols.filter((x) => x.kind === SymbolKind.Function).map((x) => x.name);
    for (let i = 0; i < functionNames.length; i++) {
      expect(expectedFunctionNames[i]).toBe(functionNames[i]);
    }
  });
});
