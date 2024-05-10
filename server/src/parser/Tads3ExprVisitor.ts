import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { Tads3Parser } from "./Tads3Parser";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Tads3Listener } from "./Tads3Listener";
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { RuleNode } from 'antlr4ts/tree/RuleNode';

export enum EvalResultType {
  STRING_TYPE,
  NUMBER_TYPE,
  ID_TYPE,
  NOTHING,
}
export type EvalResult = {
  type?: EvalResultType;
  stringResult?: string;
  numberResult?: number;
  idResult?: string;
  parent?: EvalResult;
  children?: EvalResult[];
  
};

export class T3ExprVisitor
  extends AbstractParseTreeVisitor<EvalResult>
  implements Tads3Listener
{
  protected defaultResult(): EvalResult {
    return {};
  }

  visitTerminal(node: TerminalNode): EvalResult {
    if (node.symbol.type === Tads3Parser.ID) {
      return {
        type: EvalResultType.STRING_TYPE,
        stringResult: node.text,
      };
    }
    if (node.symbol.type === Tads3Parser.NR) {
      return {
        type: EvalResultType.NUMBER_TYPE,
        numberResult: Number.parseInt(node.text) ,
      };
    }
    if (node.symbol.type === Tads3Parser.SSTR
      || node.symbol.type === Tads3Parser.DSTR
    ) {
      return {
        type: EvalResultType.STRING_TYPE,
        stringResult: node.text,
      };
    }
    return {
      type: EvalResultType.NOTHING,
      stringResult: node.text,
    };
  }

  
  protected aggregateResult(aggregate: EvalResult, nextResult: EvalResult): EvalResult {
    nextResult.parent = aggregate;
    /*if(aggregate.children === undefined) {
      aggregate.children = [aggregate];
    } else {
      aggregate.children.push(aggregate);
    }*/
    return nextResult;
  }

  visitChildren(node: RuleNode): EvalResult {
    /*switch(node.payload.type) {
      case MethodCall
    }*/

    return super.visitChildren(node);

    /*visitChildren(node) {
      let result = this.defaultResult();
      let n = node.childCount;
      for (let i = 0; i < n; i++) {
          if (!this.shouldVisitNextChild(node, result)) {
              break;
          }
          let c = node.getChild(i);
          let childResult = c.accept(this);
          result = this.aggregateResult(result, childResult);
      }
      return result;
  }*/
  }
}
