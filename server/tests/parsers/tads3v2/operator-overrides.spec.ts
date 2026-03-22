import { describe, it } from '@jest/globals';
import { assertParses } from './parseHelper';

// ── operator overrides ────────────────────────────────────────────────────────
//
// All forms drawn from beliefcalcs.t and the OperatorOverloading spec.

describe('operator overrides', () => {
  it('parses operator &(x)  — bitwise AND', () => {
    assertParses(`class BelVal: object operator &(x) { return x; }; `);
  });

  it('parses operator |(x)  — bitwise OR', () => {
    assertParses(`class BelVal: object operator |(x) { return x; }; `);
  });

  it('parses operator -(x)  — binary minus', () => {
    assertParses(`class BelVal: object operator -(x) { return x; }; `);
  });

  it('parses operator +(x)  — binary plus', () => {
    assertParses(`class BelVal: object operator +(x) { return x; }; `);
  });

  it('parses operator *(x)  — multiplication', () => {
    assertParses(`class BelVal: object operator *(x) { return x; }; `);
  });

  it('parses operator ~()   — bitwise NOT (zero args)', () => {
    assertParses(`class BelVal: object operator ~() { return 0; }; `);
  });

  it('parses operator negate()  — unary minus override', () => {
    assertParses(`class BelVal: object operator negate() { return 0; }; `);
  });

  it('parses operator [](x)  — subscript read', () => {
    assertParses(`class BelVal: object operator [](x) { return x; }; `);
  });

  it('parses operator []=(x, v)  — subscript write', () => {
    assertParses(`class BelVal: object operator []=(x, v) { return v; }; `);
  });

  it('parses operator >>(x)  — right-shift', () => {
    assertParses(`class BelVal: object operator >>(x) { return x; }; `);
  });

  it('parses operator <<(x)  — left-shift', () => {
    assertParses(`class BelVal: object operator <<(x) { return x; }; `);
  });

  it('parses operator >>>(x)  — unsigned right-shift', () => {
    assertParses(`class BelVal: object operator >>>(x) { return x; }; `);
  });

  it('parses the full BelVal class from beliefcalcs.t', () => {
    assertParses(`
      class BelVal: object
        operator &(x)   { return x; }
        operator |(x)   { return x; }
        operator -(x)   { return x; }
        operator [](x)  { return x; }
        operator *(x)   { return x; }
        operator ~()    { return 0; }
        operator +(x)   { return x; }
        operator >>(x)  { return x; }
        operator <<(x)  { return x; }
        operator >>>(x) { return x; }
      ;
    `);
  });
});
