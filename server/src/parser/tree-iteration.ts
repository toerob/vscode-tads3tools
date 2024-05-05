import { ParseTree } from "antlr4ts/tree/ParseTree";

export function getAllReturnValues(ctx: ParseTree, collect: string[] = []) {
  for (let idx = 0; idx < ctx.childCount; idx++) {
    const childNode = ctx.getChild(idx);
    if (childNode.text === "return") {
      const node = childNode?.parent?.getChild(1);
      if (node) {
        collect.push(node.text);
      }
    } else {
      getAllReturnValues(childNode, collect);
    }
  }
  return collect;
}
