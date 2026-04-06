/**
 * Grammar declaration parsing tests.
 *
 * TADS3 grammar declarations have the form:
 *   grammar prodName(tag): rules : SuperClass
 *       method() { body }
 *       property = value
 *   ;
 *
 * These tests verify that the SLL fast-path handles all grammar body forms
 * without falling back to LL mode.  Each regression case is noted with the
 * root cause that was fixed.
 */
import { describe, it, expect } from '@jest/globals';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { BailErrorStrategy } from 'antlr4ts/BailErrorStrategy';
import { Tads3v2Lexer } from '../../../src/parser/Tads3v2Lexer';
import { Tads3v2Parser } from '../../../src/parser/Tads3v2Parser';
import { assertParses } from './parseHelper';

function sllSucceeds(src: string): boolean {
  const lexer  = new Tads3v2Lexer(CharStreams.fromString(src));
  const tokens = new CommonTokenStream(lexer);
  tokens.fill();
  const parser = new Tads3v2Parser(tokens);
  parser.removeErrorListeners();
  parser.interpreter.setPredictionMode(PredictionMode.SLL);
  parser.errorHandler = new BailErrorStrategy();
  try {
    parser.program();
    return true;
  } catch {
    return false;
  }
}

describe('grammar declaration — SLL fast-path (no fallback)', () => {
  it('grammar with plain property body parses in SLL mode', () => {
    expect(sllSucceeds(`
grammar predicate(OopsOnly):
    ('oops' | 'o')
    : OopsIAction
    verbPhrase = 'oops/correcting'
;`)).toBe(true);
  });

  it('grammar with arrow rule and property body parses in SLL mode', () => {
    expect(sllSucceeds(`
grammar predicate(ExitsMode):
    'exits' 'on'->on_
    : ExitsModeAction
    verbPhrase = 'turn/turning off exits display'
;`)).toBe(true);
  });

  it('grammar with inline rule and property on same line parses in SLL mode', () => {
    expect(sllSucceeds(`
grammar predicate(Hint): 'hint' | 'hints' : HintAction verbPhrase = 'show/showing hints'
;`)).toBe(true);
  });

  it('grammar with method body and braceless if-statement parses in SLL mode', () => {
    // Regression: line 6301 of adv3 en_us.t — braceless if body inside a grammar method
    expect(sllSucceeds(`
grammar simpleNounPhrase(number): literalAdjPhrase->adj_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
        results.noteAdjEnding();
        local lst = adj_.getVocabMatchList(resolver, results, extraFlags);
        if (resolver.isGlobalScope)
            lst = adj_.addNounMatchList(lst, resolver, results, extraFlags);
        return lst;
    }
;`)).toBe(true);
  });

  it('grammar with two method bodies parses in SLL mode', () => {
    expect(sllSucceeds(`
grammar simpleNounPhrase(number): literalAdjPhrase->adj_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags) { return adj_.getVocabMatchList(resolver, results, extraFlags); }
    getAdjustedTokens() { return adj_.getAdjustedTokens(); }
;`)).toBe(true);
  });
});

// ── Full parse correctness ─────────────────────────────────────────────────────

describe('grammar declaration — full parse (SLL→LL)', () => {
  it('grammar with no body', () => {
    assertParses(`grammar predicate(Hint): 'hint' | 'hints' : HintAction ;`);
  });

  it('grammar with verbPhrase property', () => {
    assertParses(`
grammar predicate(OopsOnly):
    ('oops' | 'o')
    : OopsIAction
    verbPhrase = 'oops/correcting'
;`);
  });

  it('grammar with multiple alternatives and property', () => {
    assertParses(`
grammar predicate(ExitsMode):
    'exits' ('on'->on_ | 'all'->on_ | 'off'->off_ | 'none'->off_)
    : ExitsModeAction
    verbPhrase = 'turn/turning off exits display'
;`);
  });

  it('grammar with two methods and complex bodies', () => {
    assertParses(`
grammar simpleNounPhrase(number): literalAdjPhrase->adj_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
        results.noteAdjEnding();
        local lst = adj_.getVocabMatchList(resolver, results,
                                           extraFlags);
        if (resolver.isGlobalScope)
            lst = adj_.addNounMatchList(lst, resolver, results, extraFlags);
        return lst;
    }
    getAdjustedTokens()
    {
        return adj_.getAdjustedTokens();
    }
;`);
  });

  it('grammar with curly-brace body', () => {
    assertParses(`
grammar nounPhrase(main): noun->noun_ : BasicProd {
    getVocabMatchList(resolver, results, extraFlags)
    {
        return noun_.getVocabMatchList(resolver, results, extraFlags);
    }
}`);
  });

  it('modify grammar', () => {
    assertParses(`
modify grammar predicate(Go):
    'go' singleDir->dirMatch
    : GoProd
;`);
  });
});
