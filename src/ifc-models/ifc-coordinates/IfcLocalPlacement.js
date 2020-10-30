/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcgeometricconstraintresource/lexical/ifclocalplacement.htm]
 */

import { baseConstructor } from "../../ifc-utils/ifc-constructors";
import { getIfcAxis2Placement3D } from "./IfcAxis2Placement3D";
import { IfcObjectPlacement } from "./IfcObjectPlacement";

//TODO: the attribute placementRelTo has to be solved through IfcObjectPlacement to select the correct subtype
class IfcLocalPlacement extends IfcObjectPlacement {
  getIfcProperties() {
    super.getIfcProperties();
    this.placementRelTo = getIfcLocalPlacement(this);
    this.relativePlacement = getIfcAxis2Placement3D(this);
  }
}

function getIfcLocalPlacement(caller) {
  return baseConstructor(caller, IfcLocalPlacement);
}

export { getIfcLocalPlacement };
