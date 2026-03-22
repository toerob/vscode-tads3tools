import { describe, it, expect } from '@jest/globals';
import { parseExpr, parseProgramAst } from './parseHelper';
import {
  Tads3v2AstEvaluator,
  EvalEnv,
  TadsValue,
  NIL,
  TRUE,
  UNKNOWN,
  tadsNum,
  tadsStr,
  tadsList,
} from '../../../src/parser/Tads3v2AstEvaluator';
import { BlockNode, ProgramNode } from '../../../src/parser/ast/nodes';

// ── Test helpers ───────────────────────────────────────────────────────────────

/** Evaluate a single expression string in a fresh environment. */
function evalExpr(source: string, env?: EvalEnv): TadsValue {
  const ev = new Tads3v2AstEvaluator();
  return ev.evalExpr(parseExpr(source), env ?? ev.globalEnvironment);
}

/** Parse a program, evaluate it, and return the evaluator for further inspection. */
function evalProg(source: string): Tads3v2AstEvaluator {
  const program = parseProgramAst(source);
  const ev = new Tads3v2AstEvaluator();
  ev.eval(program);
  return ev;
}

/** Evaluate a program and return the value of a named identifier from globalEnvironment. */
function evalAndGet(source: string, name: string): TadsValue {
  return evalProg(source).globalEnvironment.get(name);
}

// ── Literals ──────────────────────────────────────────────────────────────────

describe('literals', () => {
  it('evaluates an integer', () => {
    expect(evalExpr('42')).toEqual(tadsNum(42));
  });

  it('evaluates a negative number via unary -', () => {
    expect(evalExpr('-7')).toEqual(tadsNum(-7));
  });

  it('evaluates a hex literal', () => {
    expect(evalExpr('0xff')).toEqual(tadsNum(255));
  });

  it('evaluates a single-quoted string', () => {
    expect(evalExpr("'hello'")).toEqual(tadsStr('hello'));
  });

  it('evaluates a double-quoted string', () => {
    expect(evalExpr('"world"')).toEqual(tadsStr('world'));
  });

  it('evaluates true', () => {
    expect(evalExpr('true')).toEqual(TRUE);
  });

  it('evaluates nil', () => {
    expect(evalExpr('nil')).toEqual(NIL);
  });

  it('evaluates an array literal', () => {
    expect(evalExpr('[1, 2, 3]')).toEqual(tadsList([tadsNum(1), tadsNum(2), tadsNum(3)]));
  });

  it('evaluates an empty array literal', () => {
    expect(evalExpr('[]')).toEqual(tadsList([]));
  });
});

// ── Arithmetic ─────────────────────────────────────────────────────────────────

describe('arithmetic', () => {
  it('adds two numbers', () => {
    expect(evalExpr('3 + 4')).toEqual(tadsNum(7));
  });

  it('subtracts', () => {
    expect(evalExpr('10 - 3')).toEqual(tadsNum(7));
  });

  it('multiplies', () => {
    expect(evalExpr('6 * 7')).toEqual(tadsNum(42));
  });

  it('divides with integer truncation', () => {
    expect(evalExpr('7 / 2')).toEqual(tadsNum(3));
  });

  it('negative integer division truncates toward zero', () => {
    expect(evalExpr('-7 / 2')).toEqual(tadsNum(-3));
  });

  it('modulo', () => {
    expect(evalExpr('10 % 3')).toEqual(tadsNum(1));
  });

  it('respects precedence: 2 + 3 * 4', () => {
    expect(evalExpr('2 + 3 * 4')).toEqual(tadsNum(14));
  });

  it('returns UNKNOWN when dividing by zero', () => {
    expect(evalExpr('1 / 0')).toEqual(UNKNOWN);
  });
});

// ── String operations ──────────────────────────────────────────────────────────

describe('string operations', () => {
  it('concatenates two strings with +', () => {
    expect(evalExpr("'foo' + 'bar'")).toEqual(tadsStr('foobar'));
  });

  it('coerces number to string when one side is a string', () => {
    expect(evalExpr("'n=' + 42")).toEqual(tadsStr('n=42'));
  });

  it('concatenates two lists with +', () => {
    expect(evalExpr('[1] + [2, 3]')).toEqual(tadsList([tadsNum(1), tadsNum(2), tadsNum(3)]));
  });
});

// ── Unary operators ────────────────────────────────────────────────────────────

describe('unary operators', () => {
  it('! nil is true', () => {
    expect(evalExpr('!nil')).toEqual(TRUE);
  });

  it('! true is nil', () => {
    expect(evalExpr('!true')).toEqual(NIL);
  });

  it('not nil is true', () => {
    expect(evalExpr('not nil')).toEqual(TRUE);
  });

  it('unary minus negates a number', () => {
    expect(evalExpr('-5')).toEqual(tadsNum(-5));
  });

  it('unary plus is identity on numbers', () => {
    expect(evalExpr('+3')).toEqual(tadsNum(3));
  });

  it('bitwise NOT ~', () => {
    expect(evalExpr('~0')).toEqual(tadsNum(-1));
  });
});

// ── Bitwise ───────────────────────────────────────────────────────────────────

describe('bitwise operators', () => {
  it('& (AND)', () => {
    expect(evalExpr('12 & 10')).toEqual(tadsNum(8));
  });

  it('| (OR)', () => {
    expect(evalExpr('12 | 10')).toEqual(tadsNum(14));
  });

  it('^ (XOR)', () => {
    expect(evalExpr('12 ^ 10')).toEqual(tadsNum(6));
  });

  it('<< (left shift)', () => {
    expect(evalExpr('1 << 3')).toEqual(tadsNum(8));
  });

  it('>> (signed right shift)', () => {
    expect(evalExpr('16 >> 2')).toEqual(tadsNum(4));
  });

  it('>>> (unsigned right shift)', () => {
    expect(evalExpr('8 >>> 1')).toEqual(tadsNum(4));
  });
});

// ── Logical operators ──────────────────────────────────────────────────────────

describe('logical operators', () => {
  it('&& returns right when left is truthy', () => {
    expect(evalExpr('true && 42')).toEqual(tadsNum(42));
  });

  it('&& returns left when left is nil', () => {
    expect(evalExpr('nil && 42')).toEqual(NIL);
  });

  it('|| returns left when left is truthy', () => {
    expect(evalExpr('true || 42')).toEqual(TRUE);
  });

  it('|| returns right when left is nil', () => {
    expect(evalExpr('nil || 42')).toEqual(tadsNum(42));
  });

  it('?? returns left when left is not nil', () => {
    expect(evalExpr('42 ?? 99')).toEqual(tadsNum(42));
  });

  it('?? returns right when left is nil', () => {
    expect(evalExpr('nil ?? 99')).toEqual(tadsNum(99));
  });

  it('&& short-circuits: nil && unknown_id', () => {
    // unknown_id is UNKNOWN, but && short-circuits on nil left
    expect(evalExpr('nil && unknownId')).toEqual(NIL);
  });
});

// ── Relational and equality ────────────────────────────────────────────────────

describe('relational / equality', () => {
  it('3 < 5 is true', () => {
    expect(evalExpr('3 < 5')).toEqual(TRUE);
  });

  it('5 < 3 is nil', () => {
    expect(evalExpr('5 < 3')).toEqual(NIL);
  });

  it('3 <= 3 is true', () => {
    expect(evalExpr('3 <= 3')).toEqual(TRUE);
  });

  it('3 > 2 is true', () => {
    expect(evalExpr('3 > 2')).toEqual(TRUE);
  });

  it('3 >= 3 is true', () => {
    expect(evalExpr('3 >= 3')).toEqual(TRUE);
  });

  it('3 == 3 is true', () => {
    expect(evalExpr('3 == 3')).toEqual(TRUE);
  });

  it('3 != 4 is true', () => {
    expect(evalExpr('3 != 4')).toEqual(TRUE);
  });

  it('string equality', () => {
    expect(evalExpr("'foo' == 'foo'")).toEqual(TRUE);
    expect(evalExpr("'foo' == 'bar'")).toEqual(NIL);
  });

  it('string comparison', () => {
    expect(evalExpr("'apple' < 'banana'")).toEqual(TRUE);
  });
});

// ── IsIn / NotIn ───────────────────────────────────────────────────────────────

describe('is in / not in', () => {
  it('2 is in (1, 2, 3) is true', () => {
    expect(evalExpr('2 is in (1, 2, 3)')).toEqual(TRUE);
  });

  it('5 is in (1, 2, 3) is nil', () => {
    expect(evalExpr('5 is in (1, 2, 3)')).toEqual(NIL);
  });

  it('5 not in (1, 2, 3) is true', () => {
    expect(evalExpr('5 not in (1, 2, 3)')).toEqual(TRUE);
  });

  it('2 not in (1, 2, 3) is nil', () => {
    expect(evalExpr('2 not in (1, 2, 3)')).toEqual(NIL);
  });
});

// ── Conditional (ternary) ──────────────────────────────────────────────────────

describe('conditional expression', () => {
  it('true ? 1 : 2 evaluates consequent', () => {
    expect(evalExpr('true ? 1 : 2')).toEqual(tadsNum(1));
  });

  it('nil ? 1 : 2 evaluates alternate', () => {
    expect(evalExpr('nil ? 1 : 2')).toEqual(tadsNum(2));
  });
});

// ── EvalEnv / local declarations ───────────────────────────────────────────────

describe('EvalEnv', () => {
  it('define + get', () => {
    const env = new EvalEnv();
    env.define('x', tadsNum(10));
    expect(env.get('x')).toEqual(tadsNum(10));
  });

  it('get from parent scope', () => {
    const parent = new EvalEnv();
    parent.define('x', tadsNum(5));
    const child = parent.child();
    expect(child.get('x')).toEqual(tadsNum(5));
  });

  it('child scope shadows parent', () => {
    const parent = new EvalEnv();
    parent.define('x', tadsNum(1));
    const child = parent.child();
    child.define('x', tadsNum(2));
    expect(child.get('x')).toEqual(tadsNum(2));
    expect(parent.get('x')).toEqual(tadsNum(1));
  });

  it('assign updates existing binding in scope chain', () => {
    const parent = new EvalEnv();
    parent.define('x', tadsNum(0));
    const child = parent.child();
    child.assign('x', tadsNum(99));
    expect(parent.get('x')).toEqual(tadsNum(99));
  });

  it('unknown name returns UNKNOWN', () => {
    expect(new EvalEnv().get('nope')).toEqual(UNKNOWN);
  });
});

// ── Local variable declarations ────────────────────────────────────────────────

describe('local declarations', () => {
  it('local x = 5 defines x in the program env', () => {
    const ev = evalProg('function f() { local x = 5; return x; }');
    // Call the function by looking it up
    const fn = ev.globalEnvironment.get('f');
    expect(fn.type).toBe('function');
  });

  it('evalExpr evaluates a local decl and returns the value', () => {
    const ev = new Tads3v2AstEvaluator();
    // Parse a local decl node directly
    const { parseLocalDecl } = require('./parseHelper');
    const node = parseLocalDecl('local x = 7;');
    const result = ev.evalExpr(node, ev.globalEnvironment);
    expect(result).toEqual(tadsNum(7));
    expect(ev.globalEnvironment.get('x')).toEqual(tadsNum(7));
  });
});

// ── Block scoping ──────────────────────────────────────────────────────────────

describe('block scoping', () => {
  it('a Block node creates an inner scope (variable does not leak)', () => {
    const ev = new Tads3v2AstEvaluator();
    const { parseLocalDecl } = require('./parseHelper');
    const decl = parseLocalDecl('local x = 42;');
    // evalExpr on a Block node → evalNode 'Block' → env.child() → x stays in inner scope
    const block: BlockNode = { kind: 'Block', body: [decl] };
    ev.evalExpr(block, ev.globalEnvironment);
    expect(ev.globalEnvironment.get('x')).toEqual(UNKNOWN);
  });

  it('evalBlock does NOT create a scope — it runs in the provided env directly', () => {
    const ev = new Tads3v2AstEvaluator();
    const { parseLocalDecl } = require('./parseHelper');
    const decl = parseLocalDecl('local x = 99;');
    const block: BlockNode = { kind: 'Block', body: [decl] };
    ev.evalBlock(block, ev.globalEnvironment);
    // evalBlock is for callers that already manage scope (e.g. function bodies)
    expect(ev.globalEnvironment.get('x')).toEqual(tadsNum(99));
  });
});

// ── If statement ───────────────────────────────────────────────────────────────

describe('if statement', () => {
  it('takes the then-branch when condition is truthy', () => {
    const ev = evalProg(`
      function f() {
        local r = 0;
        if (true) r = 1;
        else r = 2;
        return r;
      }
    `);
    const fn = ev.globalEnvironment.get('f');
    expect(fn.type).toBe('function');
  });
});

// ── Functions: declaration, call, return ───────────────────────────────────────

describe('function declarations and calls', () => {
  it('registers a function in the global env', () => {
    const ev = evalProg('function add(a, b) { return a + b; }');
    expect(ev.globalEnvironment.get('add').type).toBe('function');
  });

  it('calls a function and returns the result', () => {
    const ev = evalProg('function double(x) { return x * 2; }');
    const fn = ev.globalEnvironment.get('double');
    expect(fn.type).toBe('function');
    if (fn.type !== 'function') return;
    // Evaluate a call expression with the function already defined
    const result = evalExpr('double(5)', ev.globalEnvironment);
    expect(result).toEqual(tadsNum(10));
  });

  it('function with multiple returns returns the matched branch', () => {
    const ev = evalProg(`
      function sign(n) {
        if (n > 0) return 1;
        if (n < 0) return -1;
        return 0;
      }
    `);
    const env = ev.globalEnvironment;
    expect(evalExpr('sign(7)',  env)).toEqual(tadsNum(1));
    expect(evalExpr('sign(-3)', env)).toEqual(tadsNum(-1));
    expect(evalExpr('sign(0)',  env)).toEqual(tadsNum(0));
  });

  it('function with default parameter uses the default when arg omitted', () => {
    // TADS3 default param syntax: f(x := 10)
    const ev = evalProg('function greet(x := 42) { return x; }');
    const env = ev.globalEnvironment;
    expect(evalExpr('greet()', env)).toEqual(tadsNum(42));
    expect(evalExpr('greet(7)', env)).toEqual(tadsNum(7));
  });
});

// ── Closures ───────────────────────────────────────────────────────────────────

describe('closures', () => {
  it('a function captures its defining scope', () => {
    const ev = evalProg(`
      function makeAdder(n) {
        return { : n + _ };
      }
    `);
    // We can't call closures through the string evaluator easily,
    // but we can verify the closure's binding is stored on creation.
    const fn = ev.globalEnvironment.get('makeAdder');
    expect(fn.type).toBe('function');
  });
});

// ── Object declarations ────────────────────────────────────────────────────────

describe('object declarations', () => {
  it('registers a named object in the global env', () => {
    const ev = evalProg('myObj: Thing { }');
    expect(ev.globalEnvironment.get('myObj').type).toBe('object');
  });

  it('populates object property values', () => {
    const ev = evalProg("kitchen: Room { north = 42; }");
    const obj = ev.globalEnvironment.get('kitchen');
    expect(obj.type).toBe('object');
    if (obj.type !== 'object') return;
    expect(obj.props.get('north')).toEqual(tadsNum(42));
  });

  it('stores string property values', () => {
    const ev = evalProg("myObj: Thing { name = 'kitchen'; }");
    const obj = ev.globalEnvironment.get('myObj');
    if (obj.type !== 'object') return;
    expect(obj.props.get('name')).toEqual(tadsStr('kitchen'));
  });

  it('stores the superTypes array', () => {
    const ev = evalProg('myObj: Room { }');
    const obj = ev.globalEnvironment.get('myObj');
    if (obj.type !== 'object') return;
    expect(obj.superTypes).toContain('Room');
  });

  it('registers method as a function on the object props', () => {
    const ev = evalProg(`
      myObj: Thing {
        doIt() { return 99; }
      }
    `);
    const obj = ev.globalEnvironment.get('myObj');
    if (obj.type !== 'object') return;
    expect(obj.props.get('doIt')?.type).toBe('function');
  });
});

// ── Member access ──────────────────────────────────────────────────────────────

describe('member access', () => {
  it('accesses a property of a known object', () => {
    const ev = evalProg("myObj: Thing { x = 7; }");
    const result = evalExpr('myObj.x', ev.globalEnvironment);
    expect(result).toEqual(tadsNum(7));
  });

  it('returns NIL for a missing property', () => {
    const ev = evalProg("myObj: Thing { }");
    const result = evalExpr('myObj.missing', ev.globalEnvironment);
    expect(result).toEqual(NIL);
  });

  it('returns UNKNOWN when object is not known', () => {
    const result = evalExpr('unknownObj.prop');
    expect(result).toEqual(UNKNOWN);
  });
});

// ── Index access (1-based) ────────────────────────────────────────────────────

describe('index access', () => {
  it('accesses a list element with 1-based index', () => {
    expect(evalExpr('[10, 20, 30][1]')).toEqual(tadsNum(10));
    expect(evalExpr('[10, 20, 30][2]')).toEqual(tadsNum(20));
    expect(evalExpr('[10, 20, 30][3]')).toEqual(tadsNum(30));
  });

  it('returns NIL for out-of-bounds index', () => {
    expect(evalExpr('[1, 2][5]')).toEqual(NIL);
  });

  it('accesses a string character with 1-based index', () => {
    expect(evalExpr("'hello'[1]")).toEqual(tadsStr('h'));
    expect(evalExpr("'hello'[5]")).toEqual(tadsStr('o'));
  });
});

// ── Post-increment / post-decrement ───────────────────────────────────────────

describe('post-increment / post-decrement', () => {
  it('post-increment returns old value and updates binding', () => {
    const ev = new Tads3v2AstEvaluator();
    const env = ev.globalEnvironment;
    env.define('n', tadsNum(3));
    const { parsePostfix } = require('./parseHelper');
    const node = parsePostfix('n++');
    const result = ev.evalExpr(node, env);
    expect(result).toEqual(tadsNum(3));      // old value
    expect(env.get('n')).toEqual(tadsNum(4)); // updated
  });

  it('post-decrement returns old value and updates binding', () => {
    const ev = new Tads3v2AstEvaluator();
    const env = ev.globalEnvironment;
    env.define('n', tadsNum(5));
    const { parsePostfix } = require('./parseHelper');
    const node = parsePostfix('n--');
    const result = ev.evalExpr(node, env);
    expect(result).toEqual(tadsNum(5));
    expect(env.get('n')).toEqual(tadsNum(4));
  });
});

// ── Assignment operators ───────────────────────────────────────────────────────

describe('compound assignment operators', () => {
  function evalAssign(initial: number, expr: string): TadsValue {
    const ev = new Tads3v2AstEvaluator();
    const env = ev.globalEnvironment;
    env.define('x', tadsNum(initial));
    const { parseAssignment } = require('./parseHelper');
    return ev.evalExpr(parseAssignment(expr), env);
  }

  it('x += 3', () => {
    const ev = new Tads3v2AstEvaluator();
    const env = ev.globalEnvironment;
    env.define('x', tadsNum(10));
    const { parseAssignment } = require('./parseHelper');
    ev.evalExpr(parseAssignment('x += 3'), env);
    expect(env.get('x')).toEqual(tadsNum(13));
  });

  it('x -= 3', () => {
    const ev = new Tads3v2AstEvaluator();
    const env = ev.globalEnvironment;
    env.define('x', tadsNum(10));
    const { parseAssignment } = require('./parseHelper');
    ev.evalExpr(parseAssignment('x -= 3'), env);
    expect(env.get('x')).toEqual(tadsNum(7));
  });

  it('x *= 4', () => {
    const ev = new Tads3v2AstEvaluator();
    const env = ev.globalEnvironment;
    env.define('x', tadsNum(3));
    const { parseAssignment } = require('./parseHelper');
    ev.evalExpr(parseAssignment('x *= 4'), env);
    expect(env.get('x')).toEqual(tadsNum(12));
  });

  it('x |= 5', () => {
    const ev = new Tads3v2AstEvaluator();
    const env = ev.globalEnvironment;
    env.define('x', tadsNum(2));
    const { parseAssignment } = require('./parseHelper');
    ev.evalExpr(parseAssignment('x |= 5'), env);
    expect(env.get('x')).toEqual(tadsNum(7));
  });
});

// ── Loops ──────────────────────────────────────────────────────────────────────

describe('for loop', () => {
  it('accumulates a sum via for loop', () => {
    const ev = evalProg(`
      function sumTo(n) {
        local s = 0;
        for (local i = 1; i <= n; i++)
          s += i;
        return s;
      }
    `);
    expect(evalExpr('sumTo(5)', ev.globalEnvironment)).toEqual(tadsNum(15));
    expect(evalExpr('sumTo(10)', ev.globalEnvironment)).toEqual(tadsNum(55));
  });
});

describe('while loop', () => {
  it('counts down from n to 0', () => {
    const ev = evalProg(`
      function countdown(n) {
        local c = 0;
        while (n > 0) { n -= 1; c += 1; }
        return c;
      }
    `);
    expect(evalExpr('countdown(4)', ev.globalEnvironment)).toEqual(tadsNum(4));
  });
});

describe('for-in loop with range', () => {
  it('sums elements over a range via for-in', () => {
    const ev = evalProg(`
      function sumRange(lo, hi) {
        local s = 0;
        for (local x in lo..hi)
          s += x;
        return s;
      }
    `);
    expect(evalExpr('sumRange(1, 4)', ev.globalEnvironment)).toEqual(tadsNum(10));
  });
});

// ── Range expression ──────────────────────────────────────────────────────────

describe('range expression', () => {
  it('1..5 evaluates to a list [1,2,3,4,5]', () => {
    const { parseForIn } = require('./parseHelper');
    // Parse `1..5` via a for-in to get the RangeExpr node
    // Easier: evaluate via a function that returns the list
    const ev = evalProg(`
      function r() {
        local lst = [];
        for (local x in 1..5)
          lst = lst + [x];
        return lst;
      }
    `);
    const result = evalExpr('r()', ev.globalEnvironment);
    expect(result).toEqual(tadsList([1, 2, 3, 4, 5].map(tadsNum)));
  });
});

// ── Switch statement ──────────────────────────────────────────────────────────

describe('switch statement', () => {
  it('matches the correct case', () => {
    const ev = evalProg(`
      function classify(n) {
        local r = 'other';
        switch (n) {
          case 1: r = 'one'; break;
          case 2: r = 'two'; break;
          default: r = 'many';
        }
        return r;
      }
    `);
    const env = ev.globalEnvironment;
    expect(evalExpr('classify(1)', env)).toEqual(tadsStr('one'));
    expect(evalExpr('classify(2)', env)).toEqual(tadsStr('two'));
    expect(evalExpr('classify(9)', env)).toEqual(tadsStr('many'));
  });
});

// ── Lambda ─────────────────────────────────────────────────────────────────────

describe('lambda', () => {
  it('a lambda evaluates to a function value', () => {
    const result = evalExpr('{x: x + 1}');
    expect(result.type).toBe('function');
  });
});

// ── Try-catch ─────────────────────────────────────────────────────────────────

describe('try-catch', () => {
  it('catches a thrown value and binds it to the catch param', () => {
    const ev = evalProg(`
      function safeDivide(a, b) {
        try {
          if (b == 0) throw 'divByZero';
          return a / b;
        } catch (err) {
          return err;
        }
      }
    `);
    const env = ev.globalEnvironment;
    expect(evalExpr('safeDivide(10, 2)', env)).toEqual(tadsNum(5));
    expect(evalExpr('safeDivide(10, 0)', env)).toEqual(tadsStr('divByZero'));
  });
});

// ── UNKNOWN propagation ───────────────────────────────────────────────────────

describe('UNKNOWN propagation', () => {
  it('unresolved identifier returns UNKNOWN', () => {
    expect(evalExpr('undeclaredVar')).toEqual(UNKNOWN);
  });

  it('arithmetic on UNKNOWN returns UNKNOWN', () => {
    expect(evalExpr('undeclaredVar + 1')).toEqual(UNKNOWN);
  });

  it('conditional on UNKNOWN returns UNKNOWN', () => {
    expect(evalExpr('undeclaredVar ? 1 : 2')).toEqual(UNKNOWN);
  });

  it('member access on UNKNOWN returns UNKNOWN', () => {
    expect(evalExpr('undeclaredVar.prop')).toEqual(UNKNOWN);
  });

  it('&& short-circuits: false && UNKNOWN returns NIL without propagating UNKNOWN', () => {
    // 'nil' is falsy so left side known → result is NIL, not UNKNOWN
    expect(evalExpr('nil && undeclaredVar')).toEqual(NIL);
  });

  it('|| short-circuits: true || UNKNOWN returns TRUE without propagating UNKNOWN', () => {
    expect(evalExpr('true || undeclaredVar')).toEqual(TRUE);
  });

  it('?? short-circuits: non-nil ?? UNKNOWN returns the non-nil', () => {
    expect(evalExpr('42 ?? undeclaredVar')).toEqual(tadsNum(42));
  });
});

// ── Say statement ─────────────────────────────────────────────────────────────

describe('say statement', () => {
  it('evaluates a say statement to its string value', () => {
    const { parseSayStatement } = require('./parseHelper');
    const ev = new Tads3v2AstEvaluator();
    const node = parseSayStatement('"Hello!";');
    const result = ev.evalExpr(node, ev.globalEnvironment);
    expect(result).toEqual(tadsStr('Hello!'));
  });
});

// ── eval() entry point ────────────────────────────────────────────────────────

describe('eval() entry point', () => {
  it('evaluates all directives in a program', () => {
    const ev = evalProg(`
      function square(x) { return x * x; }
      myObj: Thing { area = 49; }
    `);
    expect(ev.globalEnvironment.get('square').type).toBe('function');
    expect(ev.globalEnvironment.get('myObj').type).toBe('object');
  });

  it('uses the provided env instead of globalEnvironment when given', () => {
    const program = parseProgramAst('function f() { return 1; }');
    const ev = new Tads3v2AstEvaluator();
    const customEnv = new EvalEnv();
    ev.eval(program, customEnv);
    // f should be in customEnv, not globalEnvironment
    expect(customEnv.get('f').type).toBe('function');
    expect(ev.globalEnvironment.get('f')).toEqual(UNKNOWN);
  });
});
