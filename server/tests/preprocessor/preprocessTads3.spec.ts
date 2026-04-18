import { readFileSync } from "fs";
import { join } from "path";
import * as childProcess from "child_process";
import { describe, it, expect, jest } from "@jest/globals";
import { wholeLineRegExp } from "../../src/parser/preprocessor";
import { preprocessTads3Files } from "../../src/parser/preprocessor";
import { CaseInsensitiveMap } from "../../src/modules/CaseInsensitiveMap";

// ── Helpers ───────────────────────────────────────────────────────────────────

const FIXTURES = join(__dirname, "../fixtures/preprocessor");
const CRLF_REGRESSION_FIXTURES = join(FIXTURES, "crlf-regression");

function readLines(filePath: string): string[] {
  // Use plain \n split so 0-based array indices correspond 1:1 to file line numbers.
  // wholeLineRegExp requires a preceding character and would mis-index files that
  // start with a newline (as the preprocessed fixtures do).
  return readFileSync(filePath, "utf-8").split("\n");
}

function fixture(name: string) {
  return {
    preprocessed:   readLines(join(FIXTURES, `${name}.preprocessed.t`)),
    unpreprocessed: readLines(join(FIXTURES, `${name}.unpreprocessed.t`)),
  };
}

function countMatches(lines: string[], pattern: RegExp): number {
  return lines.filter(l => pattern.test(l)).length;
}

/**
 * Mocks t3make preprocessor output by intercepting child_process.exec calls and emitting the provided output string as stdout, followed by a close event. 
 */
function mockExecWithOutput(output: string) {
  return jest.spyOn(childProcess, "exec").mockImplementation(() => {
    let stdoutDataHandler: ((data: string) => void) | undefined;
    let closeHandler: (() => void) | undefined;

    const child = {
      stdout: {
        on: (event: string, cb: (data: string) => void) => {
          if (event === "data") stdoutDataHandler = cb;
          return child.stdout;
        },
      },
      on: (event: string, cb: () => void) => {
        if (event === "close") closeHandler = cb;
        return child;
      },
    } as any;

    process.nextTick(() => {
      stdoutDataHandler?.(output);
      closeHandler?.();
    });

    return child;
  });
}

// ── preprocessTads3Files regression tests ───────────────────────────────────

describe("preprocessTads3Files — CRLF compatibility", () => {
  it("parses CRLF t3make output with CaseInsensitiveMap cache and preserves line mapping", async () => {
    const gameFile = join(CRLF_REGRESSION_FIXTURES, "main.t");
    const makefile = join(CRLF_REGRESSION_FIXTURES, "Makefile.t3m");
    const compilerOutput =
      `#line 1 \"${gameFile}\"\r\n` +
      `first\r\n` +
      `#line 3 \"${gameFile}\"\r\n` +
      `third\r\n`;

    const execSpy = mockExecWithOutput(compilerOutput);
    try {
      const cache = new CaseInsensitiveMap<string, string>();
      await preprocessTads3Files(makefile, cache, "t3make");

      const mapped = cache.get(gameFile);
      const mappedUpper = cache.get(gameFile.toUpperCase());

      expect(mapped).toBeTruthy();
      expect(mappedUpper).toBe(mapped);

      const lines = mapped!.split("\n");
      expect(lines[0]).toBe("first");
      expect(lines[1]).toBe("");
      expect(lines[2]).toBe("third");
    } finally {
      execSpy.mockRestore();
    }
  });

  it("keeps #charset placeholder row when compiler output is CRLF", async () => {
    const gameFile = join(CRLF_REGRESSION_FIXTURES, "charset.t");
    const makefile = join(CRLF_REGRESSION_FIXTURES, "Makefile.t3m");
    const compilerOutput =
      `#line 1 \"${gameFile}\"\r\n` +
      `#charset \"us-ascii\"\r\n` +
      `payload\r\n` +
      `tail\r\n`;

    const execSpy = mockExecWithOutput(compilerOutput);
    try {
      const cache = new Map<string, string>();
      await preprocessTads3Files(makefile, cache, "t3make");

      const mapped = cache.get(gameFile);
      expect(mapped).toBeTruthy();

      const lines = mapped!.split("\n");
      expect(lines[0]).toBe("");
      expect(lines[1]).toBe("payload");
      expect(lines[2]).toBe("tail");
    } finally {
      execSpy.mockRestore();
    }
  });

  it("handles CRLF output switching between multiple files and supports case-insensitive key lookup", async () => {
    const fileA = join(CRLF_REGRESSION_FIXTURES, "a.t");
    const fileB = join(CRLF_REGRESSION_FIXTURES, "b.t");
    const makefile = join(CRLF_REGRESSION_FIXTURES, "Makefile.t3m");

    const compilerOutput =
      `#line 1 \"${fileA}\"\r\n` +
      `A-one\r\n` +
      `#line 1 \"${fileB}\"\r\n` +
      `B-one\r\n` +
      `#line 3 \"${fileA}\"\r\n` +
      `A-three\r\n` +
      `#line 3 \"${fileB}\"\r\n` +
      `B-three\r\n`;

    const execSpy = mockExecWithOutput(compilerOutput);
    try {
      const cache = new CaseInsensitiveMap<string, string>();
      await preprocessTads3Files(makefile, cache, "t3make");

      const mappedA = cache.get(fileA);
      const mappedB = cache.get(fileB);
      const mappedAUpper = cache.get(fileA.toUpperCase());
      const mappedBUpper = cache.get(fileB.toUpperCase());

      expect(mappedA).toBeTruthy();
      expect(mappedB).toBeTruthy();
      expect(mappedAUpper).toBe(mappedA);
      expect(mappedBUpper).toBe(mappedB);

      const linesA = mappedA!.split("\n");
      const linesB = mappedB!.split("\n");
      expect(linesA[0]).toBe("A-one");
      expect(linesA[1]).toBe("");
      expect(linesA[2]).toBe("A-three");
      expect(linesB[0]).toBe("B-one");
      expect(linesB[1]).toBe("");
      expect(linesB[2]).toBe("B-three");
    } finally {
      execSpy.mockRestore();
    }
  });

});

// ── Line count invariant ──────────────────────────────────────────────────────
//
// The preprocessor must preserve line count so that LSP position mapping stays
// valid (line N in the preprocessed cache == line N in the original source).
// There is a known off-by-one at the very last line; we allow a tolerance of 1.

describe("preprocessor output — line count invariant", () => {
  it("actions.t: preprocessed line count exactly matches original", () => {
    const { preprocessed, unpreprocessed } = fixture("actions");
    expect(preprocessed.length).toBe(unpreprocessed.length);
  });

  it("thing.t: preprocessed line count exactly matches original", () => {
    const { preprocessed, unpreprocessed } = fixture("thing");
    expect(preprocessed.length).toBe(unpreprocessed.length);
  });
});

// ── Directive removal ─────────────────────────────────────────────────────────
//
// After preprocessing, raw source directives must not appear in the output.
// #line markers are consumed during parsing; #charset lines are replaced with
// blank lines; #include / #define are expanded away by the compiler.

describe.each(["actions", "thing"])("preprocessor output — directives removed", (name) => {
  it(`${name}.t: no #line markers remain`, () => {
    const { preprocessed } = fixture(name);
    expect(countMatches(preprocessed, /^#line\s+\d+/)).toBe(0);
  });

  it(`${name}.t: no #charset directives remain`, () => {
    const { preprocessed } = fixture(name);
    expect(countMatches(preprocessed, /^#charset\b/)).toBe(0);
  });

  it(`${name}.t: no #include directives remain`, () => {
    const { preprocessed } = fixture(name);
    expect(countMatches(preprocessed, /^#include\b/)).toBe(0);
  });
});

// ── Line position alignment ───────────────────────────────────────────────────
//
// The preprocessor replaces directives with blank lines to keep positions in
// sync. Lines that survive preprocessing must appear at the exact same line
// number in both the original and the preprocessed output.

describe("preprocessor output — line position alignment", () => {
  it("actions.t: execAction declarations are on the same line numbers in both files", () => {
    const { preprocessed, unpreprocessed } = fixture("actions");
    const preLines  = preprocessed.map((l, i) => ({ i, l })).filter(x => /execAction\(\)/.test(x.l)).map(x => x.i);
    const origLines = unpreprocessed.map((l, i) => ({ i, l })).filter(x => /execAction\(\)/.test(x.l)).map(x => x.i);
    expect(preLines).toEqual(origLines);
  });

  it("thing.t: class SenseInfo is on line 31 in both preprocessed and unpreprocessed", () => {
    const { preprocessed, unpreprocessed } = fixture("thing");
    // Lines are 0-indexed here; line 31 in the file = index 30
    expect(preprocessed[30]).toBe("class SenseInfo: object");
    expect(unpreprocessed[30]).toBe("class SenseInfo: object");
  });

  it("actions.t: DebugAction class declaration is on line 19 in both files", () => {
    const { preprocessed, unpreprocessed } = fixture("actions");
    // Line 19 in file = index 18
    expect(preprocessed[18]).toBe("class DebugAction:IAction     baseActionClass = DebugAction");
    // Unpreprocessed has the original macro call on the same line
    expect(unpreprocessed[18]).toBe("DefineIAction(Debug)");
  });
});

// ── Macro expansion counts ────────────────────────────────────────────────────
//
// Every Define*Action macro call in the source must produce an expanded class
// declaration. We count both sides and verify the expansion is complete.

describe("preprocessor output — macro expansion", () => {
  it("actions.t: all Define*Action macros are gone from the preprocessed output", () => {
    const { preprocessed } = fixture("actions");
    expect(countMatches(preprocessed, /\bDefine[A-Za-z]*Action\s*\(/)).toBe(0);
  });

  it("actions.t: preprocessed output contains exactly 220 expanded class ...Action: declarations", () => {
    const { preprocessed } = fixture("actions");
    expect(countMatches(preprocessed, /^class [A-Za-z]+Action:/)).toBe(220);
  });

  it("actions.t: 30 execAction occurrences are present after expansion", () => {
    const { preprocessed } = fixture("actions");
    expect(countMatches(preprocessed, /execAction\(\)/)).toBe(30);
  });

  it("thing.t: 12 top-level class declarations survive preprocessing", () => {
    const { preprocessed } = fixture("thing");
    expect(countMatches(preprocessed, /^class /)).toBe(12);
  });

  it("thing.t: lookAroundShowExits property appears exactly twice (declaration + usage)", () => {
    const { preprocessed } = fixture("thing");
    expect(preprocessed.filter(l => l.includes("lookAroundShowExits")).length).toBe(2);
  });
});

// ── dobjFor / iobjFor macro expansion ────────────────────────────────────────
//
// dobjFor(X) expands to:  sentinelDobjX = __objref(XAction, warn)  propertyset '*DobjX'
// iobjFor(X) expands to:  sentinelIobjX = __objref(XAction, warn)  propertyset '*IobjX'
// The macro call sites must be completely gone and replaced with sentinel lines.

describe("preprocessor output — dobjFor/iobjFor expansion (thing.t)", () => {
  it("all dobjFor(...) macro calls are gone from the preprocessed output", () => {
    const { preprocessed } = fixture("thing");
    expect(countMatches(preprocessed, /\bdobjFor\s*\(/)).toBe(0);
  });

  it("all iobjFor(...) macro calls are gone from the preprocessed output", () => {
    const { preprocessed } = fixture("thing");
    expect(countMatches(preprocessed, /\biobjFor\s*\(/)).toBe(0);
  });

  it("preprocessed output contains exactly 111 sentinelDobj* entries", () => {
    const { preprocessed } = fixture("thing");
    expect(countMatches(preprocessed, /sentinelDobj/)).toBe(111);
  });

  it("preprocessed output contains exactly 33 sentinelIobj* entries", () => {
    const { preprocessed } = fixture("thing");
    expect(countMatches(preprocessed, /sentinelIobj/)).toBe(33);
  });

  it("dobjFor(Examine) on line 8039 expands to sentinelDobjExamine on the same line", () => {
    const { preprocessed, unpreprocessed } = fixture("thing");
    // 0-based index 8038 = line 8039 in file
    expect(unpreprocessed[8038].trim()).toBe("dobjFor(Examine)");
    expect(preprocessed[8038]).toMatch(/^\s+sentinelDobjExamine = __objref\(ExamineAction, warn\)/);
  });

  it("iobjFor(TakeFrom) on line 8743 expands to sentinelIobjTakeFrom on the same line", () => {
    const { preprocessed, unpreprocessed } = fixture("thing");
    expect(unpreprocessed[8742].trim()).toBe("iobjFor(TakeFrom)");
    expect(preprocessed[8742]).toMatch(/^\s+sentinelIobjTakeFrom = __objref\(TakeFromAction, warn\)/);
  });

  it("snapshot: dobjFor(Examine) block expands to the expected propertyset header", () => {
    const { preprocessed } = fixture("thing");
    expect(preprocessed[8038]).toBe(
      "    sentinelDobjExamine = __objref(ExamineAction, warn)     propertyset '*DobjExamine'"
    );
  });
});

// ── Snapshot: first expanded block ───────────────────────────────────────────
//
// The DebugAction block is the first macro-expanded object in actions.t.
// Its content and indentation must be preserved exactly as produced by t3make.

describe("preprocessor output — snapshot: DebugAction block", () => {
  it("lines 19–28 of actions.preprocessed.t match the expected expanded block", () => {
    const { preprocessed } = fixture("actions");
    const block = preprocessed.slice(18, 28);
    expect(block).toEqual([
      "class DebugAction:IAction     baseActionClass = DebugAction",
      "    execAction()",
      "    {",
      "         ",
      "        if (t3DebugTrace(1))",
      "            t3DebugTrace(2);",
      "        else",
      "            \"Debugger not present. \";",
      "    }",
      ";",
    ]);
  });
});
