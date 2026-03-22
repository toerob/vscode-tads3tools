import { describe, it, expect } from "@jest/globals";
import { parseLocalDecl } from "./parseHelper";
import { AssignmentOpKind, AstNode } from "../../../src/parser/ast/nodes";

const num = (v: string): AstNode => ({ kind: "Number", value: v });
const id = (name: string): AstNode => ({ kind: "Identifier", name });
const paren = (inner: AstNode): AstNode => ({ kind: "Paren", inner });
const bin = (op: string, left: AstNode, right: AstNode): AstNode => ({
  kind: "BinaryOp",
  op: op as never,
  left,
  right,
});

const decl = (name: string, init: AstNode | null): AstNode => ({ kind: "LocalDecl", name, init });
const str = (v: string, q: "single" | "double" = "single"): AstNode =>
  ({ kind: "String", quoteStyle: q, value: q === "single" ? `'${v}'` : `"${v}"` });

const unary = (op: string, operand: AstNode): AstNode => ({ kind: "UnaryOp", op: op as never, operand });

const assign = (op: AssignmentOpKind, target: AstNode, value: AstNode): AstNode => ({
  kind: "Assignment",
  op,
  target,
  value,
});

// ── declaration without initializer ──────────────────────────────────────────

describe("assignmentStatement → no initializer", () => {
  it("parses local x;", () => {
    expect(parseLocalDecl("local x;")).toMatchObject(decl("x", null));
  });
});

// ── declaration with initializer ─────────────────────────────────────────────

describe("assignmentStatement → with initializer", () => {
  it("parses local x = 10;", () => {
    expect(parseLocalDecl("local x = 10;")).toMatchObject(decl("x", num("10")));
  });

  it("parses local x = 'TEXT';", () => {
    expect(parseLocalDecl("local x = 'TEXT';")).toMatchObject(
      decl("x", str("TEXT")));
  });

  it("parses local x = 10 * (23 + x);", () => {
    expect(parseLocalDecl("local x = 10 * (23 + x);")).toMatchObject(
      decl("x", bin("*", num("10"), paren(bin("+", num("23"), id("x"))))),
    );
  });

  it("parses local y = new PendingCommandToks(startOfSentence, issuer, toks);", () => {
    expect(parseLocalDecl("local y = new PendingCommandToks(startOfSentence, issuer, toks);")).toMatchObject(
      decl("y", {
        kind: "NewExpr",
        expr: {
          kind: "Call",
          callee: id("PendingCommandToks"),
          args: [id("startOfSentence"), id("issuer"), id("toks")],
        },
      }),
    );
  });

  it("parses local toks = topic.topicProd.getOrigTokenList().mapAll({x: ((x)[1])});", () => {
    expect(
      parseLocalDecl("local toks = topic.topicProd.getOrigTokenList().mapAll({x: ((x)[1])});"),
    ).toMatchObject(
      decl("toks", {
        kind: "Call",
        callee: {
          kind: "MemberAccess",
          object: {
            kind: "Call",
            callee: {
              kind: "MemberAccess",
              object: {
                kind: "MemberAccess",
                object: id("topic"),
                member: id("topicProd"),
              },
              member: id("getOrigTokenList"),
            },
            args: [],
          },
          member: id("mapAll"),
        },
        args: [
          {
            kind: "Lambda",
            params: [{ kind: 'Param', name: 'x' }] as any,
            body: {
              kind: "Paren",
              inner: {
                kind: "IndexAccess",
                object: { kind: "Paren", inner: id("x") },
                index: num("1"),
              },
            },
          },
        ],
      }),
    );
  });
});

