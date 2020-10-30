/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcgeometricconstraintresource/lexical/ifclocalplacement.htm]
 */

import { baseConstructorNoExtraction } from "../../ifc-utils/ifc-constructors";
import { getIfcAxis2Placement3D } from "./IfcAxis2Placement3D";
import { IfcObjectPlacement } from "./IfcObjectPlacement";
import { getIfcObjectPlacement } from "./IfcObjectPlacementFactory";

class IfcLocalPlacement extends IfcObjectPlacement {
  getIfcProperties() {
    super.getIfcProperties();
    this.placementRelTo = getIfcObjectPlacement(this);
    this.relativePlacement = getIfcAxis2Placement3D(this);
  }
}

function getIfcLocalPlacement(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcLocalPlacement, ifcLine);
}

export { getIfcLocalPlacement };
