import "../../../node_modules/chevrotain/lib/chevrotain.js";
import { tokens, vocabulary as v } from "../lexer/lexer.js";
import { addPrimitiveParsers } from "../ifc-models/primitives.js";
import { typesParserMap } from "./parser-map.js";
import { newParser } from "./parser-factory.js";
import { ifcClass } from "../utils/globalProperties.js";

const CstParser = chevrotain.CstParser;

class IfcParser extends CstParser {
  constructor() {
    super(tokens);

    addPrimitiveParsers(this);
    addParsesForAllIfcTypes(this);

    this.performSelfAnalysis();
  }
}

function addParsesForAllIfcTypes($) {
  Object.values(typesParserMap).forEach((e) => {
    $.RULE(e[ifcClass], () => {
      newParser($, e);
    });
  });
}

const parser = new IfcParser();

export { parser };
