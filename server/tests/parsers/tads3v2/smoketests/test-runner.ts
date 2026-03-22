const { CharStreams, CommonTokenStream } = require("antlr4ts");
const { Tads3v2Lexer } = require("./out/parser/Tads3v2Lexer");
const { Tads3v2Parser } = require("./out/parser/Tads3v2Parser");
const fs = require("fs");

for (const file of ["tests/fixtures/en-us.t"]) {
  const src = fs.readFileSync(file, "utf-8");
  const lexer = new Tads3v2Lexer(CharStreams.fromString(src));
  const tokens = new CommonTokenStream(lexer);
  const parser = new Tads3v2Parser(tokens);
  parser.removeErrorListeners();
  const errors: any[] = [];
  parser.addErrorListener({
    syntaxError(r: any, s: any, line: number, col: any, msg: any) {
      errors.push({ line, col, msg, ctx: src.split("\n")[line - 1]?.trim() });
    },
  });
  parser.program();
  if (errors.length) {
    console.log("=== " + file + " ===");
    errors.forEach((e) => console.log("  line " + e.line + ":" + e.col + " " + e.msg + "\n    " + e.ctx));
  }
}
