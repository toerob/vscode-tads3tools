/**
 * Tests using the preprocessed actor.t fixture.
 *
 * actor.t is the adv3 actor.t library file run through the TADS3 preprocessor,
 * so it contains only real post-preprocessor syntax — no macros like dobjFor().
 * This makes it an ideal ground-truth corpus for the Tads3v2 grammar.
 */
import { describe, it } from "@jest/globals";
import { assertParses, assertParsesFile } from "../parseHelper";

// ── whole-file smoke test ─────────────────────────────────────────────────────

describe("actor.t fixture — whole-file parse", () => {
  it("parses the entire preprocessed actor.t with zero syntax errors", () => {
    assertParsesFile("tests/fixtures/actor.t");
  });
});

// ── targeted excerpts — verbatim from actor.t ────────────────────────────────
//
// These are copy-pasted from the fixture so they are known-good preprocessed
// syntax.  They let us pinpoint exactly which construct is tested.

describe("actor.t fixture — semicolon-terminated class bodies", () => {
  // actor.t lines 2-6
  it("class with property and method, no braces", () => {
    assertParses(
      `class Topic: VocabObject
          isKnown = true
          canBeSensed(sense, trans, ambient) { return nil; }
              canResolvePossessive = nil
      ;`,
    );
  });

  // actor.t lines 8-12
  it("class with nil-valued properties, no braces", () => {
    assertParses(
      `class FollowInfo: object
          obj = nil
          connector = nil
          sourceLocation = nil
      ;`,
    );
  });

  // actor.t lines 13-16
  it("class with two no-arg methods, no braces", () => {
    assertParses(
      `class Posture: object
          tryMakingPosture(loc) { }
          setActorToPosture(actor, loc) { }
      ;`,
    );
  });
});

describe("actor.t fixture — named objects, no braces", () => {
  // actor.t lines 17-20 (simplified — method bodies are very long on one line)
  it("named object with methods, semicolon-terminated", () => {
    assertParses(
      `standing: Posture
          tryMakingPosture(loc) { return nil; }
          setActorToPosture(actor, loc) { }
      ;`,
    );
  });
});

describe("actor.t fixture — propertyset inside object body", () => {
  // Extracted from actor.t lines 3707-3714 (inline one-liner form)
  it("property followed immediately by propertyset on same conceptual line", () => {
    assertParses(
      `class Actor: object
          sentinelDobjTake = nil
          propertyset '*DobjTake' { verify() { inherited(); } }
      ;`,
    );
  });

  // Extracted from actor.t lines 3715-3721 (multi-line propertyset body)
  it("propertyset with multi-line braced body", () => {
    assertParses(
      `class Actor: object
          propertyset '*IobjThrowTo'
          {
              verify()
              {
                  inherited();
              }
          }
      ;`,
    );
  });

  // Extracted from actor.t lines 3736-3744 (propertyset with multiple methods)
  it("propertyset with property and method inside", () => {
    assertParses(
      `class Actor: object
          propertyset '*DobjKiss'
          {
              preCond = [touchObj]
              verify()
              {
                  inherited();
              }
              action() { }
          }
      ;`,
    );
  });
});

describe("actor.t fixture — top-level function", () => {
  // actor.t lines 3966-3970
  it("top-level function without function keyword", () => {
    assertParses(
      `setPlayer(actor)
      {
          libGlobal.playerChar = actor;
          setRootPOV(actor, actor);
      }`,
    );
  });
});
