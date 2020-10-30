/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcgeometricconstraintresource/lexical/ifclinearplacement.htm]
 */

import { baseConstructorNoExtraction } from "../../ifc-utils/ifc-constructors";
import { IfcObjectPlacement } from "./IfcObjectPlacement";

class IfcLinearPlacement extends IfcObjectPlacement {
  getIfcProperties() {
    super.getIfcProperties();
    this.placementRelTo = this.extractId();
    this.distance = this.extractId();
    this.orientation = this.extractId();
    this.cartesianPosition = this.extractId();
  }
}

function getIfcLinearPlacement(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcLinearPlacement, ifcLine);
}

export { getIfcLinearPlacement };
