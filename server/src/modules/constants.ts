export const TADS3_KEYWORDS = [
  "grammar",
  "switch",
  "case",
  "default",
  "function",
  "throw",
  "new",
  "template",
  "for",
  "try",
  "catch",
  "finally",
  "enum",
  "class",
  "transient",
  "modify",
  "replace",
  "propertyset",
  "if",
  "do",
  "while",
  "else",
  "local",
  "true",
  "nil",
  "intrinsic",
  "inherited",
  "delegated",
  "property",
  "dictionary",
  "export",
  "extern",
  "return",
  "static",
  "string",
  "foreach",
  "in",
  "...",
  "..",
  "step",
  "not",
  "is",
  "break",
  "continue",
  "goto",
  "token",
  "pragma",
  "operator",
];

export const NEW_INSTANCE_REGEXP = /\s*new\s+([a-zA-Z][a-zA-Z0-9]*)?$/;
export const NEW_ASSIGNMENT_REGEXP = /(.*)\s*[=]\s*new\s*(.*)\s*\(/;
export const PROPERTY_REGEXP =
  /([a-zA-Z][a-zA-Z0-9]*)(\s*[(].*[)])?\s*[.]\s*([a-zA-Z][a-zA-Z0-9]*)?$/;

export const ID = "[a-zA-Z0-9_]+";
const DIR =
  "(north|south|east|west|northeast|northwest|southeast|southwest|up|down|in|out)";
export const WS = "\\s*";
export const DIRECTION_ASSIGNMENT_REGEXP = new RegExp(
  `^${WS}${DIR}${WS}=${WS}(${ID})?`
);

// TODO: Remove once satisfied
//const newAssignmentRegexp2 = /[=]\s*new\s*(.*)\s*\(/;
//const propertyRegexp = /([a-zA-Z][a-zA-Z0-9]*)[.]\s*([a-zA-Z][a-zA-Z0-9]*)?$/;

