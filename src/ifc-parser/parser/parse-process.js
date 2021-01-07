import { lexer } from "../lexer/lexer.js";
import { parser } from "./parser.js";
import { ifcVisitor } from "../semantic/semantic.js";
import { parserByType } from "./parser-map.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcTypes } from "../../utils/ifc-types.js";

//The parsing process consists of 4 steps:
//1. The lexer tokenizes the input
//2. The tokenized input is given to the parser
//3. The parser is applied using the chosen syntactical structure
//4. The visitor applies semantic rules to the output of the parser

function parse(text, ifcType) {
  const lexingResult = lexer.tokenize(text);
  parser.input = lexingResult.tokens;
  const cstOutput = parser[parserByType(ifcType)[n.ifcClass]]();
  if (parser.errors.length > 0) showErrors(text, ifcType, parser);
  return ifcVisitor.visit(cstOutput);
}

function showErrors(text, ifcType, parser) {
  console.warn(parser.errors);
  console.warn(`Error while parsing item: ${text} of type ${ifcType}`);
}

export { parse };
