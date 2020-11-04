import { lexer } from "../lexer/lexer.js";
import { parser } from "./parser.js";
import { ifcVisitor } from "../semantic/semantic.js";
import { parserByType } from "./parser-map.js";

function parse(text, ifcType) {
  const lexingResult = lexer.tokenize(text);
  parser.input = lexingResult.tokens;
  const cstOutput = parser[parserByType(ifcType).name]();
  return ifcVisitor.visit(cstOutput);

  //   if (parser.errors.length > 0) {
  //     throw new Error("sad sad panda, Parsing errors detected");
  //   }
}

export { parse };
