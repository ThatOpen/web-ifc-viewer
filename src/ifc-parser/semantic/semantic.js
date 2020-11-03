import { IfcProject_Semantic } from "../ifc-items/spatial-structure/IfcProject.js";
import { IfcSite_Semantic } from "../ifc-items/spatial-structure/IfcSite.js";
import { IfcBuilding_Semantic } from "../ifc-items/spatial-structure/IfcBuilding.js";
import { parser } from "../parser/parser.js";

const BaseVisitor = parser.getBaseCstVisitorConstructor();

class IfcVisitor extends BaseVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  IfcProject_Parser(parsed) {
    return IfcProject_Semantic(parsed);
  }

  IfcSite_Parser(parsed) {
    return IfcSite_Semantic(parsed);
  }

  IfcBuilding_Parser(parsed) {
    return IfcBuilding_Semantic(parsed);
  }

  _IfcGuid(parsed) {}
  _Number(parsed) {}
  _IdSet(parsed) {}
  _IfcText(parsed) {}
  _IfcEnum(parsed) {}
  _IfcExpressId(parsed) {}
  _NumberSet(parsed) {}
}

const ifcVisitor = new IfcVisitor();

export { ifcVisitor };
