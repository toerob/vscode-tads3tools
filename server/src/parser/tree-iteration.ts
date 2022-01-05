import { ParseTree } from 'antlr4ts/tree/ParseTree';

export function getAllReturnValues(ctx: ParseTree, collect: string[] = []) {
	for (let idx = 0; idx < ctx.childCount; idx++) {
		const childNode = ctx.getChild(idx);
		if (childNode.text === 'return') {
			const node = childNode?.parent?.getChild(1)
			if(node && node.childCount === 3) {
				const grandChild = node.getChild(1);
				collect.push(grandChild.text);
			}
		} else {
			getAllReturnValues(childNode, collect);
		}
	}
	return collect;
}
