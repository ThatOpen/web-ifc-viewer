import { IfcProject_Semantic } from "../ifc-items/spatial-structure/IfcProject.js";
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

  IdSet(parsed) {}
  IfcText(parsed) {}
  IfcExpressId(parsed) {}
}

const ifcVisitor = new IfcVisitor();

export { ifcVisitor };
