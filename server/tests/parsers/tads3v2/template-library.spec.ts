/**
 * Real template declarations extracted verbatim from the adv3 and adv3Lite
 * library header files.  These drive grammar correctness for templateDeclaration.
 */
import { describe, it } from '@jest/globals';
import { assertParses } from './parseHelper';

// ── adv3 templates (adv3.h lines 1596-1747) ──────────────────────────────────

describe('adv3 library templates', () => {
  it('MultiLoc template [locationList]', () => {
    assertParses('MultiLoc template [locationList];');
  });

  it('StyleTag template with optional slots', () => {
    assertParses("StyleTag template 'tagName' 'openText'? 'closeText'?;");
  });

  it('Footnote template "desc"', () => {
    assertParses('Footnote template "desc";');
  });

  it('Achievement template +points? "desc"', () => {
    assertParses('Achievement template +points? "desc";');
  });

  it('EventList template [eventList]', () => {
    assertParses('EventList template [eventList];');
  });

  it('ShuffledEventList template [firstEvents] [eventList]', () => {
    assertParses('ShuffledEventList template [firstEvents] [eventList];');
  });

  it('SyncEventList template ->masterObject inherited', () => {
    assertParses('SyncEventList template ->masterObject inherited;');
  });

  it('ShuffledList template [valueList]', () => {
    assertParses('ShuffledList template [valueList];');
  });

  it('Tip template "desc"', () => {
    assertParses('Tip template "desc";');
  });

  it('MenuItem template with optional heading', () => {
    assertParses("MenuItem template 'title' 'heading'?;");
  });

  it('MenuTopicItem template with list', () => {
    assertParses("MenuTopicItem template 'title' 'heading'? [menuContents];");
  });

  it('MenuLongTopicItem template', () => {
    assertParses("MenuLongTopicItem template 'title' 'heading'? 'menuContents';");
  });

  it('Goal template with optional -> and []', () => {
    assertParses("Goal template ->closeWhenAchieved? 'title' 'heading'? [menuContents];");
  });

  it('Hint template with optional list', () => {
    assertParses("Hint template 'hintText' [referencedGoals]?;");
  });

  it('TopicEntry template — matchObj alternatives and optional response', () => {
    assertParses(
      "TopicEntry template\n" +
      "  +matchScore?\n" +
      "  @matchObj | [matchObj] | 'matchPattern'\n" +
      '  "topicResponse" | [eventList] ?;'
    );
  });

  it('TopicEntry template — ShuffledEventList variant', () => {
    assertParses(
      "TopicEntry template\n" +
      "  +matchScore?\n" +
      "  @matchObj | [matchObj] | 'matchPattern'\n" +
      '  [firstEvents] [eventList];'
    );
  });

  it('TopicEntry template — matchObj+pattern combination', () => {
    assertParses(
      "TopicEntry template\n" +
      "  +matchScore?\n" +
      "  @matchObj | [matchObj]\n" +
      "  'matchPattern'\n" +
      '  "topicResponse" | [eventList] ?;'
    );
  });

  it('TopicEntry template — matchObj+pattern ShuffledEventList', () => {
    assertParses(
      "TopicEntry template\n" +
      "  +matchScore?\n" +
      "  @matchObj | [matchObj]\n" +
      "  'matchPattern'\n" +
      '  [firstEvents] [eventList];'
    );
  });

  it('MiscTopic template "topicResponse" | [eventList]', () => {
    assertParses('MiscTopic template "topicResponse" | [eventList];');
  });

  it('MiscTopic template [firstEvents] [eventList]', () => {
    assertParses('MiscTopic template [firstEvents] [eventList];');
  });

  it('SpecialTopic template with keyword list alternative', () => {
    assertParses(
      "SpecialTopic template\n" +
      "  'name'\n" +
      "  [keywordList] | 'matchPat'\n" +
      '  "topicResponse" | [eventList] ?;'
    );
  });

  it('SpecialTopic template — ShuffledEventList variant', () => {
    assertParses(
      "SpecialTopic template\n" +
      "  'name'\n" +
      "  [keywordList] | 'matchPat'\n" +
      '  [firstEvents] [eventList];'
    );
  });

  it('DefaultTopic template "topicResponse" | [eventList]', () => {
    assertParses('DefaultTopic template "topicResponse" | [eventList];');
  });

  it('DefaultTopic template [firstEvents] [eventList]', () => {
    assertParses('DefaultTopic template [firstEvents] [eventList];');
  });

  it('AltTopic template string or list', () => {
    assertParses('AltTopic template "topicResponse" | [eventList];');
  });

  it('TopicGroup template +matchScoreAdjustment', () => {
    assertParses('TopicGroup template +matchScoreAdjustment;');
  });

  it("ConvNode template 'name'", () => {
    assertParses("ConvNode template 'name';");
  });
});

// ── adv3Lite templates (advlite.h lines 832-992) ─────────────────────────────

describe('adv3Lite library templates', () => {
  it('Achievement template +points? "desc"', () => {
    assertParses('Achievement template +points? "desc";');
  });

  it('StyleTag template', () => {
    assertParses("StyleTag template 'tagName' 'openText'? 'closeText'?;");
  });

  it('Thing template with vocab, optional location and desc', () => {
    assertParses("Thing template 'vocab' @location? \"desc\"?;");
  });

  it('Topic template with optional familiar flag', () => {
    assertParses("Topic template 'vocab' @familiar?;");
  });

  it('Room template — title + vocab + optional desc', () => {
    assertParses("Room template 'roomTitle' 'vocab' \"desc\"?;");
  });

  it('Room template — title + optional desc', () => {
    assertParses("Room template 'roomTitle' \"desc\"?;");
  });

  it('Region template [rooms]', () => {
    assertParses('Region template [rooms];');
  });

  it('Door template — vocab first', () => {
    assertParses("Door template 'vocab' @location? \"desc\"? ->otherSide;");
  });

  it('Door template — arrow first', () => {
    assertParses("Door template ->otherSide 'vocab' @location? \"desc\"?;");
  });

  it('Door template — arrow in middle (1)', () => {
    assertParses("Door template 'vocab' @location? ->otherSide \"desc\"?;");
  });

  it('Door template — arrow in middle (2)', () => {
    assertParses("Door template 'vocab' ->otherSide @location? \"desc\"?;");
  });

  it('TravelConnector template — full', () => {
    assertParses("TravelConnector template 'vocab'? @location? \"desc\"? ->destination;");
  });

  it('TravelConnector template — arrow + travelDesc', () => {
    assertParses('TravelConnector template ->destination "travelDesc";');
  });

  it('Enterable template inherited ->connector', () => {
    assertParses('Enterable template inherited ->connector;');
  });

  it('Enterable template ->connector inherited', () => {
    assertParses('Enterable template ->connector inherited;');
  });

  it('Unthing template with vocab', () => {
    assertParses("Unthing template 'vocab' @location? 'notHereMsg'?;");
  });

  it('Unthing template with @unObject', () => {
    assertParses("Unthing template @unObject @location? 'notHereMsg'?;");
  });

  it('SensoryEmanation template inherited [eventList]?', () => {
    assertParses('SensoryEmanation template inherited [eventList]?;');
  });

  it('ActorState template — specialDesc + stateDesc alternative', () => {
    assertParses("ActorState template @location? \"specialDesc\" 'stateDesc' | \"stateDesc\" ? ;");
  });

  it('ActorState template @location', () => {
    assertParses('ActorState template @location;');
  });

  it('TopicGroup template — convKeys alternatives with ?', () => {
    assertParses("TopicGroup template @location? +scoreBoost? 'convKeys' | [convKeys] ? ;");
  });

  it('TopicEntry template — full adv3Lite version', () => {
    assertParses(
      "TopicEntry template\n" +
      "   ->location?\n" +
      "   +matchScore?\n" +
      "   @matchObj | [matchObj] | 'matchPattern'\n" +
      '   "topicResponse" | [eventList] ?;'
    );
  });

  it('TopicEntry template — ShuffledEventList adv3Lite', () => {
    assertParses(
      "TopicEntry template\n" +
      "    ->location?\n" +
      "   +matchScore?\n" +
      "   @matchObj | [matchObj] | 'matchPattern'\n" +
      '   [firstEvents] [eventList];'
    );
  });

  it('ActorTopicEntry template', () => {
    assertParses('ActorTopicEntry template ->location? +matchScore? "topicResponse" | [eventList];');
  });

  it('QueryTopic template — response or list', () => {
    assertParses(
      "QueryTopic template\n" +
      "   ->location?\n" +
      "   +matchScore? 'matchPattern'\n" +
      '    "topicResponse" | [eventList] ?;'
    );
  });

  it('QueryTopic template — ShuffledEventList', () => {
    assertParses(
      "QueryTopic template\n" +
      "    ->location?\n" +
      "    +matchScore? 'matchPattern'\n" +
      '    [firstEvents] [eventList];'
    );
  });

  it('SayTopic template', () => {
    assertParses(
      "SayTopic template\n" +
      "    ->location?\n" +
      "    +matchScore?\n" +
      "    'tTag' 'extraVocab'\n" +
      '    "topicResponse" | [eventList] ?;'
    );
  });

  it('CommandTopic template — @dobj @iobj? form', () => {
    assertParses(
      "CommandTopic template ->location? +matchScore?\n" +
      "    @matchObj | [matchObj]\n" +
      '    @matchDobj @matchIobj? "topicResponse" | [eventList]? ;'
    );
  });

  it('CommandTopic template — [matchDobj] @matchIobj form', () => {
    assertParses(
      "CommandTopic template ->location? +matchScore?\n" +
      "    @matchObj | [matchObj] [matchDobj] @matchIobj \"topicResponse\" | [eventList]? ;"
    );
  });

  it('DefaultTopic, DefaultConsultTopic, DefaultThought templates', () => {
    assertParses('DefaultTopic template ->location? "topicResponse" | [eventList];');
    assertParses('DefaultConsultTopic template ->location? "topicResponse" | [eventList];');
    assertParses('DefaultThought template ->location? "topicResponse" | [eventList];');
  });

  it('MiscTopic template — response or list', () => {
    assertParses('MiscTopic template ->location? "topicResponse" | [eventList];');
  });

  it('MiscTopic template — [firstEvents] [eventList]', () => {
    assertParses('MiscTopic template ->location? [firstEvents] [eventList];');
  });

  it('NodeContinuationTopic templates', () => {
    assertParses('NodeContinuationTopic template ->location? "topicResponse" | [eventList];');
    assertParses('NodeContinuationTopic template ->location? [firstEvents] [eventList];');
  });

  it('AltTopic templates', () => {
    assertParses('AltTopic template ->location? "topicResponse" | [eventList];');
    assertParses('AltTopic template ->location? [firstEvents] [eventList];');
  });

  it('AgendaItem template @location', () => {
    assertParses('AgendaItem template @location;');
  });

  it('ProxyActor template @location', () => {
    assertParses('ProxyActor template @location;');
  });

  it('ProxyRoom templates', () => {
    assertParses("ProxyRoom template 'vocab'? \"desc\"? ->destination;");
    assertParses("ProxyRoom template 'vocab'? ->destination \"desc\"?;");
  });

  it("Doer template 'cmd'", () => {
    assertParses("Doer template 'cmd';");
  });

  it('RemapCmd template', () => {
    assertParses("RemapCmd template 'cmd' @where? 'remappedCmd'?;");
  });

  it('Test templates', () => {
    assertParses("Test template 'testName' [testList] @location? [testHolding]?;");
    assertParses("Test template 'testName' [testList] [testHolding]? @location?;");
  });
});
