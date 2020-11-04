import "../../../node_modules/chevrotain/lib/chevrotain.js";
import { tokens, vocabulary as v } from "../lexer/lexer.js";
import { addPrimitiveParsers } from "../ifc-models/primitives.js";
import { addSpatialStructureParsers } from "../ifc-models/spatial-structure/_spatial-structure.js";
import { addGeometryParsers } from "../ifc-models/geometry/_geometry.js";
import { addUnitsParsers } from "../ifc-models/units/_units.js";
import { addContextParsers } from "../ifc-models/context/_context.js";
import { addIdentitiesParsers } from "../ifc-models/identities/_identities.js";
import { addRelationshipParsers } from "../ifc-models/relationship/_relationship.js";

const CstParser = chevrotain.CstParser;

class IfcParser extends CstParser {
  constructor() {
    super(tokens);

    const $ = this;

    addPrimitiveParsers($);
    addSpatialStructureParsers($);
    addGeometryParsers($);
    addUnitsParsers($);
    addContextParsers($);
    addIdentitiesParsers($);
    addRelationshipParsers($);

    this.performSelfAnalysis();
  }
}

const parser = new IfcParser();

export { parser };
