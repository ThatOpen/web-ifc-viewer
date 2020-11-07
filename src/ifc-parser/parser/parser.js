import "../../../node_modules/chevrotain/lib/chevrotain.js";
import { tokens, vocabulary as v } from "../lexer/lexer.js";
import { addPrimitiveParsers } from "./parser-primitives.js";
import { typesParserMap } from "./parser-map.js";
import { newParser } from "./parser-factory.js";
import { ifcClass } from "../../utils/globalProperties.js";

const CstParser = chevrotain.CstParser;

//Contains all the syntactical structures (RULEs)

class IfcParser extends CstParser {
  constructor() {
    super(tokens);

    addPrimitiveParsers(this);
    addParsesForAllIfcTypes(this);

    this.performSelfAnalysis();
  }
}

//Creates the syntactical structures (RULEs) for all the IFC Classes

function addParsesForAllIfcTypes($) {
  Object.values(typesParserMap).forEach((e) => {
    $.RULE(e[ifcClass], () => {
      newParser($, e);
    });
  });
}

const parser = new IfcParser();

export { parser };
