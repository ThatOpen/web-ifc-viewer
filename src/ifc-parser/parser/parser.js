import "../../../node_modules/chevrotain/lib/chevrotain.js";
import { tokens, vocabulary as v } from "../lexer/lexer.js";
import { addPrimitiveParsers } from "../ifc-items/Primitives.js";
import { addSpatialStructureParser } from "../ifc-items/spatial-structure/SpatialStructure.js";

const CstParser = chevrotain.CstParser;

class IfcParser extends CstParser {
  constructor() {
    super(tokens);

    const $ = this;

    addPrimitiveParsers($);
    addSpatialStructureParser($);

    this.performSelfAnalysis();
  }
}

const parser = new IfcParser();

export { parser };
