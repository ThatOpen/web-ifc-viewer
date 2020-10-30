/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcgeometricconstraintresource/lexical/ifcgridplacement.htm]
 */

import { baseConstructorNoExtraction } from "../../ifc-utils/ifc-constructors";
import { IfcObjectPlacement } from "./IfcObjectPlacement";

class IfcGridPlacement extends IfcObjectPlacement {
  getIfcProperties() {
    super.getIfcProperties();
    this.placementLocation = this.extractId();
    this.placementRefDirection = this.extractId();
  }
}

function getIfcGridPlacement(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcGridPlacement, ifcLine);
}

export { getIfcGridPlacement };
