import { IfcProject_Semantic } from "../ifc-items/spatial-structure/IfcProject.js";
import { IfcSite_Semantic } from "../ifc-items/spatial-structure/IfcSite.js";
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

  IfcGuid_Primitive(parsed) {}
  Number_Primitive(parsed) {}
  IdSet_Primitive(parsed) {}
  IfcText_Primitive(parsed) {}
  IfcEnum_Primitive(parsed) {}
  IfcExpressId_Primitive(parsed) {}
  NumberSet_Primitive(parsed) {}
}

const ifcVisitor = new IfcVisitor();

export { ifcVisitor };
