import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import {
  Tads3Parser,
} from "./Tads3Parser";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Tads3Listener } from './Tads3Listener';
  
type T3StringVisitorOptions = {
  hideSemicolon?: boolean 
}

export class T3StringVisitor extends AbstractParseTreeVisitor<string>  implements Tads3Listener {
  
  static nodesToPrefix = [
    Tads3Parser.TRANSIENT, 
    Tads3Parser.LOCAL,
    Tads3Parser.NEW,
    Tads3Parser.COMMA,
    Tads3Parser.ID, 
    Tads3Parser.ASSIGN
  ];    

  public constructor(public readonly options: T3StringVisitorOptions) {
    super();
  }

  protected defaultResult(): string {
    return '';
  }

  visitTerminal(node: TerminalNode): string {
    
    if(node.symbol.type === Tads3Parser.SEMICOLON
      && this.options.hideSemicolon) {
      return '';
    }
    if(T3StringVisitor.nodesToPrefix.indexOf(node.symbol.type)) {
      return ` ${node.text}`;
    }
    return node.text;
  }
  
  protected aggregateResult(aggregate: string, nextResult: string): string {
      return aggregate + nextResult;
  }

}
