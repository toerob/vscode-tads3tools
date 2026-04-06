import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { ShallowParser } from "../../src/modules/ShallowParser";
import { beforeAll, it, expect, describe } from "@jest/globals";
import { DocumentSymbol, SymbolKind } from "vscode-languageserver";
import { readFileSync } from "fs";
import { Tads3Lexer } from '../../src/parser/Tads3Lexer';
import { Tads3Parser } from '../../src/parser/Tads3Parser';
import { Tads3SymbolListener } from '../../src/parser/Tads3SymbolListener';

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

function findSymbol(symbols: DocumentSymbol[], name: string): DocumentSymbol | undefined {
  return symbols.find((s) => s.name === name);
}

function findMethod(parent: DocumentSymbol, name: string): DocumentSymbol | undefined {
  return parent.children?.find((c) => c.name === name && c.kind === SymbolKind.Method);
}

function findProperty(parent: DocumentSymbol, name: string): DocumentSymbol | undefined {
  return parent.children?.find((c) => c.name === name && c.kind === SymbolKind.Property);
}

describe("Standard library parsing integration tests", () => {
  let listener: Tads3SymbolListener;

  beforeAll(() => {
    const preprocessedDoc = readFileSync("tests/fixtures/actor.t").toString();
    const result = parseTextWithTads3SymbolListener(preprocessedDoc);
    listener = result.listener;
  });

  it("parses actor.t and verifies all classes and functions", () => {
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

  it("verifies PendingConvInfo has construct method with correct range and properties", () => {
    // class PendingConvInfo: object   (line 1961)
    //   construct(state, node, turns) (line 1962)  -- start:1961, stop:1968
    //   state_ = nil                  (line 1970)
    //   node_ = nil                   (line 1971)
    //   time_ = nil                   (line 1972)
    const cls = findSymbol(listener.symbols, "PendingConvInfo");
    expect(cls).toBeDefined();
    expect(cls!.kind).toBe(SymbolKind.Class);

    const construct = findMethod(cls!, "construct");
    expect(construct).toBeDefined();
    expect(construct!.range.start.line).toBe(1962 - 1);
    expect(construct!.range.end.line).toBe(1969 - 1);

    expect(findProperty(cls!, "state_")).toBeDefined();
    expect(findProperty(cls!, "node_")).toBeDefined();
    expect(findProperty(cls!, "time_")).toBeDefined();
  });

  it("verifies AgendaItem methods including inline and multi-line forms", () => {
    // class AgendaItem: object              (line 1976)
    //   getActor() { return location; }     (line 1977) -- inline, start=stop=1976
    //   invokeItem() { }                    (line 1982) -- inline, start=stop=1981
    //   resetItem()                         (line 1983) -- multi-line body, stop at } on 1988 → 1987
    //   initiallyActive = nil               (line 1978) -- property
    //   isReady = true                      (line 1979) -- property
    //   isDone = nil                        (line 1980) -- property
    //   agendaOrder = 100                   (line 1981) -- property
    const cls = findSymbol(listener.symbols, "AgendaItem");
    expect(cls).toBeDefined();

    const getActor = findMethod(cls!, "getActor");
    expect(getActor).toBeDefined();
    expect(getActor!.range.start.line).toBe(1977 - 1);
    expect(getActor!.range.end.line).toBe(1977 - 1); // single-line body

    const invokeItem = findMethod(cls!, "invokeItem");
    expect(invokeItem).toBeDefined();
    expect(invokeItem!.range.start.line).toBe(1982 - 1);
    expect(invokeItem!.range.end.line).toBe(1982 - 1); // single-line body

    const resetItem = findMethod(cls!, "resetItem");
    expect(resetItem).toBeDefined();
    expect(resetItem!.range.start.line).toBe(1983 - 1);
    expect(resetItem!.range.end.line).toBe(1988 - 1); // } closes body

    expect(findProperty(cls!, "initiallyActive")).toBeDefined();
    expect(findProperty(cls!, "isReady")).toBeDefined();
    expect(findProperty(cls!, "isDone")).toBeDefined();
    expect(findProperty(cls!, "agendaOrder")).toBeDefined();
  });

  it("verifies ActorHelloTopic has noteInvocation method with correct range and properties", () => {
    // class ActorHelloTopic: MiscTopic  (line 1246)
    //   noteInvocation(fromActor)        (line 1251) -- start:1250, } on 1255 → stop:1254
    //   includeInList = ...              (line 1247) -- property
    //   matchList = ...                  (line 1248) -- property
    //   matchScore = 200                 (line 1249) -- property
    //   impliesGreeting = nil            (line 1250) -- property
    const cls = findSymbol(listener.symbols, "ActorHelloTopic");
    expect(cls).toBeDefined();

    const noteInvocation = findMethod(cls!, "noteInvocation");
    expect(noteInvocation).toBeDefined();
    expect(noteInvocation!.range.start.line).toBe(1251 - 1);
    expect(noteInvocation!.range.end.line).toBe(1255 - 1);

    expect(findProperty(cls!, "includeInList")).toBeDefined();
    expect(findProperty(cls!, "matchList")).toBeDefined();
    expect(findProperty(cls!, "matchScore")).toBeDefined();
    expect(findProperty(cls!, "impliesGreeting")).toBeDefined();
  });

  it("verifies TopicMatchTopic.matchTopic handles nested blocks and lambdas without spurious children", () => {
    // matchTopic(fromActor, topic) at line 999 contains:
    //   - nested if/else blocks
    //   - a lambda {x: findMatchObj(x, topic)} inside indexWhich(...)
    // None of these should produce extra Method children; only methods explicitly declared in the class body should appear.
    const cls = findSymbol(listener.symbols, "TopicMatchTopic");
    expect(cls).toBeDefined();

    const matchTopic = findMethod(cls!, "matchTopic");
    expect(matchTopic).toBeDefined();
    expect(matchTopic!.range.start.line).toBe(999 - 1);
    expect(matchTopic!.range.end.line).toBe(1028 - 1);

    const findMatchObj = findMethod(cls!, "findMatchObj");
    expect(findMatchObj).toBeDefined();
    expect(findMatchObj!.range.start.line).toBe(1029 - 1);

    // The lambda {x: ...} inside matchTopic must not produce a spurious Method child
    const methodNames = cls!.children?.filter((c) => c.kind === SymbolKind.Method).map((c) => c.name) ?? [];
    expect(methodNames).not.toContain("x");
  });

  it("verifies Actor propertyset generates correctly prefixed method names", () => {
    // propertyset '*DobjTellAbout' (line 3825) is inside Actor class.
    // Methods inside the propertyset get the prefix applied:
    //   verify()  → verifyDobjTellAbout   (line 3828, } on 3831)
    //   check()   → checkDobjTellAbout    (line 3832, } on 3836)
    //   action()  → actionDobjTellAbout   (line 3837, } on 3841)
    const cls = findSymbol(listener.symbols, "Actor");
    expect(cls).toBeDefined();

    const verify = findMethod(cls!, "verifyDobjTellAbout");
    expect(verify).toBeDefined();
    expect(verify!.range.start.line).toBe(3828 - 1);
    expect(verify!.range.end.line).toBe(3831 - 1);

    const check = findMethod(cls!, "checkDobjTellAbout");
    expect(check).toBeDefined();
    expect(check!.range.start.line).toBe(3832 - 1);
    expect(check!.range.end.line).toBe(3836 - 1);

    const action = findMethod(cls!, "actionDobjTellAbout");
    expect(action).toBeDefined();
    expect(action!.range.start.line).toBe(3837 - 1);
    expect(action!.range.end.line).toBe(3841 - 1);
  });

  it("verifies Actor.handleConversation range covers its nested if block", () => {
    // handleConversation(actor, topic, convType)  (line 3843)
    //   if (!handleTopic(...))                     (line 3846)
    //   {                                          (line 3847)
    //       defaultConvResponse(...);              (line 3848)
    //   }                                          (line 3849)
    // }                                            (line 3850) → stop: 3849
    const cls = findSymbol(listener.symbols, "Actor");
    expect(cls).toBeDefined();

    const handleConversation = findMethod(cls!, "handleConversation");
    expect(handleConversation).toBeDefined();
    expect(handleConversation!.range.start.line).toBe(3843 - 1);
    expect(handleConversation!.range.end.line).toBe(3850 - 1);
  });

  it("verifies setPlayer is a top-level function with correct range", () => {
    // setPlayer(actor)  (line 3966) → start: 3965
    // }                 (line 3970) → stop: 3969
    const setPlayer = findSymbol(listener.symbols, "setPlayer");
    expect(setPlayer).toBeDefined();
    expect(setPlayer!.kind).toBe(SymbolKind.Function);
    expect(setPlayer!.range.start.line).toBe(3966 - 1);
    expect(setPlayer!.range.end.line).toBe(3970 - 1);

    // Must not be a child of any class/object
    for (const sym of listener.symbols) {
      if (sym.children) {
        expect(sym.children.find((c) => c.name === "setPlayer")).toBeUndefined();
      }
    }
  });
});

describe("ShallowParser structural analysis of actor.t", () => {
  // Map<lineNumber(1-based), LineContext>
  let entries: ReturnType<InstanceType<typeof ShallowParser>["structurize"]>;

  beforeAll(() => {
    const code = readFileSync("tests/fixtures/actor.t").toString();
    entries = new ShallowParser().structurize(code);
  });

  // Shorthand helpers
  function line(n: number) {
    return entries.get(n)!;
  }

  it("tracks ActorHelloTopic class declaration, method brace, and semicolon close", () => {
    // Line 1246: class ActorHelloTopic: MiscTopic  — object starts here
    expect(line(1246).stateBefore).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(line(1246).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1246).events).toEqual({ startsObject: true, endsObject: false, opensBrace: false });
    expect(line(1246).objectId).toBe("ActorHelloTopic");

    // Line 1251: noteInvocation(fromActor)  — method signature, no brace yet
    expect(line(1251).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1251).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1251).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
    expect(line(1251).owner).toBe("ActorHelloTopic");

    // Line 1252: {  — opens method body
    expect(line(1252).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1252).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(1252).events).toEqual({ startsObject: false, endsObject: false, opensBrace: true });

    // Line 1253: inherited(fromActor);  — inside method body
    expect(line(1253).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(1253).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(1253).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

    // Line 1255: }  — closes method body, stays inside object
    expect(line(1255).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(1255).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1255).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

    // Line 1256: ;  — ends ActorHelloTopic
    expect(line(1256).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1256).stateAfter).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(line(1256).events).toEqual({ startsObject: false, endsObject: true, opensBrace: false });
  });

  it("tracks PendingConvInfo.construct multi-line method body from open brace to close", () => {
    // Line 1961: class PendingConvInfo: object  — starts here
    expect(line(1961).stateBefore).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(line(1961).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1961).events).toEqual({ startsObject: true, endsObject: false, opensBrace: false });

    // Line 1962: construct(state, node, turns)  — method signature
    expect(line(1962).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1962).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1962).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

    // Line 1963: {  — opens construct body
    expect(line(1963).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1963).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(1963).events).toEqual({ startsObject: false, endsObject: false, opensBrace: true });

    // Line 1968: time_ = ...;  — inside construct body
    expect(line(1968).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(1968).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(1968).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

    // Line 1969: }  — closes construct body; objectDepth stays at 1
    expect(line(1969).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(1969).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1969).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

    // Line 1970: state_ = nil  — property back at object level
    expect(line(1970).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1970).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });

    // Line 1973: ;  — ends PendingConvInfo
    expect(line(1973).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1973).stateAfter).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(line(1973).events).toEqual({ startsObject: false, endsObject: true, opensBrace: false });
  });

  it("tracks AgendaItem: inline method bodies open and close brace on the same line", () => {
    // Line 1976: class AgendaItem: object
    expect(line(1976).stateBefore).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(line(1976).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1976).events).toEqual({ startsObject: true, endsObject: false, opensBrace: false });

    // Line 1977: getActor() { return location; }  — { and } on same line, depth returns to 0
    expect(line(1977).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1977).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1977).events).toEqual({ startsObject: false, endsObject: false, opensBrace: true });

    // Line 1982: invokeItem() { }  — same pattern as getActor
    expect(line(1982).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1982).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1982).events).toEqual({ startsObject: false, endsObject: false, opensBrace: true });

    // Line 1983: resetItem()  — signature; brace follows on next line
    expect(line(1983).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1983).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1983).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

    // Line 1984: {  — opens resetItem body
    expect(line(1984).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1984).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(1984).events).toEqual({ startsObject: false, endsObject: false, opensBrace: true });

    // Line 1988: }  — closes resetItem body
    expect(line(1988).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(1988).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1988).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

    // Line 1989: ;  — closes AgendaItem
    expect(line(1989).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1989).stateAfter).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(line(1989).events).toEqual({ startsObject: false, endsObject: true, opensBrace: false });
  });

  it("tracks TopicMatchTopic.matchTopic: lambda brace {x: ...} does not disrupt depth", () => {
    // Line 1000: {  — opens matchTopic body; braceDepth 0→1
    expect(line(1000).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(1000).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });

    // Line 1003: {  — opens outer if block; braceDepth 1→2
    expect(line(1003).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(1003).stateAfter).toEqual({ objectDepth: 1, braceDepth: 2 });

    // Line 1004: {  — opens inner if block; braceDepth 2→3
    expect(line(1004).stateBefore).toEqual({ objectDepth: 1, braceDepth: 2 });
    expect(line(1004).stateAfter).toEqual({ objectDepth: 1, braceDepth: 3 });

    // Line 1005: if (matchObj.indexWhich({x: findMatchObj(x, topic)}) != nil)
    // Lambda {x: ...} opens and closes on this line — depth returns to 3.
    // The x: inside the lambda must NOT be misread as an object declaration.
    expect(line(1005).stateBefore).toEqual({ objectDepth: 1, braceDepth: 3 });
    expect(line(1005).stateAfter).toEqual({ objectDepth: 1, braceDepth: 3 });
    expect(line(1005).events.startsObject).toBe(false);

    // Line 1028: }  — closes matchTopic body; braceDepth 1→0
    expect(line(1028).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
  });

  it("tracks Actor propertyset '*DobjTellAbout': nested method braces and depth", () => {
    // Line 3826: {  — opens propertyset block; braceDepth 0→1 (Actor is objectDepth 1)
    expect(line(3826).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(3826).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(3826).events).toEqual({ startsObject: false, endsObject: false, opensBrace: true });

    // Line 3828: verify()  — method signature inside propertyset; braceDepth stays 1
    expect(line(3828).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(3828).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(3828).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

    // Line 3829: {  — opens verify body; braceDepth 1→2
    expect(line(3829).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(3829).stateAfter).toEqual({ objectDepth: 1, braceDepth: 2 });
    expect(line(3829).events).toEqual({ startsObject: false, endsObject: false, opensBrace: true });

    // Line 3830: verifyNotSelf(...)  — inside verify body
    expect(line(3830).stateBefore).toEqual({ objectDepth: 1, braceDepth: 2 });
    expect(line(3830).stateAfter).toEqual({ objectDepth: 1, braceDepth: 2 });

    // Line 3831: }  — closes verify body; braceDepth 2→1
    expect(line(3831).stateBefore).toEqual({ objectDepth: 1, braceDepth: 2 });
    expect(line(3831).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });

    // Line 3832: check()  — already tested in shallow-parser-tests2.spec.ts; confirm here too
    expect(line(3832).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(3832).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(3832).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

    // Line 3842: }  — closes propertyset block; braceDepth 1→0
    expect(line(3842).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(3842).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
  });

  it("tracks Actor.handleConversation: method body with nested if block", () => {
    // Line 3843: handleConversation(actor, topic, convType)  — method sig
    expect(line(3843).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(3843).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(3843).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
    expect(line(3843).owner).toBe("Actor");

    // Line 3844: {  — opens method body
    expect(line(3844).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(3844).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(3844).events).toEqual({ startsObject: false, endsObject: false, opensBrace: true });

    // Line 3847: {  — opens if block body
    expect(line(3847).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(3847).stateAfter).toEqual({ objectDepth: 1, braceDepth: 2 });
    expect(line(3847).events).toEqual({ startsObject: false, endsObject: false, opensBrace: true });

    // Line 3848: defaultConvResponse(...)  — inside if block
    expect(line(3848).stateBefore).toEqual({ objectDepth: 1, braceDepth: 2 });
    expect(line(3848).stateAfter).toEqual({ objectDepth: 1, braceDepth: 2 });

    // Line 3849: }  — closes if block; braceDepth 2→1
    expect(line(3849).stateBefore).toEqual({ objectDepth: 1, braceDepth: 2 });
    expect(line(3849).stateAfter).toEqual({ objectDepth: 1, braceDepth: 1 });

    // Line 3850: }  — closes method body; braceDepth 1→0
    expect(line(3850).stateBefore).toEqual({ objectDepth: 1, braceDepth: 1 });
    expect(line(3850).stateAfter).toEqual({ objectDepth: 1, braceDepth: 0 });
  });

  it("tracks Actor class closing semicolon returning to global scope", () => {
    // Line 3876: ;  — ends Actor (objectDepth 1→0)
    expect(line(3876).stateBefore).toEqual({ objectDepth: 1, braceDepth: 0 });
    expect(line(3876).stateAfter).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(line(3876).events).toEqual({ startsObject: false, endsObject: true, opensBrace: false });
    expect(line(3876).objectId).toBe("Actor");
  });

  it("tracks setPlayer global function: global scope, brace open/close", () => {
    // Line 3966: setPlayer(actor)  — function signature at global scope
    expect(line(3966).stateBefore).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(line(3966).stateAfter).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(line(3966).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

    // Line 3967: {  — opens function body
    expect(line(3967).stateBefore).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(line(3967).stateAfter).toEqual({ objectDepth: 0, braceDepth: 1 });
    expect(line(3967).events).toEqual({ startsObject: false, endsObject: false, opensBrace: true });

    // Line 3968: libGlobal.playerChar = actor;  — inside function body
    expect(line(3968).stateBefore).toEqual({ objectDepth: 0, braceDepth: 1 });
    expect(line(3968).stateAfter).toEqual({ objectDepth: 0, braceDepth: 1 });
    expect(line(3968).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });

    // Line 3970: }  — closes function body; back to global scope
    expect(line(3970).stateBefore).toEqual({ objectDepth: 0, braceDepth: 1 });
    expect(line(3970).stateAfter).toEqual({ objectDepth: 0, braceDepth: 0 });
    expect(line(3970).events).toEqual({ startsObject: false, endsObject: false, opensBrace: false });
  });
});
