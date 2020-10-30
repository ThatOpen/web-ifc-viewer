/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifcproductextension/lexical/ifcspace.htm]
 */

import { baseConstructorNoExtraction } from "../../ifc-utils/ifc-constructors";
import { IfcSpatialStructureElement } from "../ifc-base-classes/IfcSpatialStructureElement";

class IfcSpace extends IfcSpatialStructureElement {
  getIfcProperties() {
    super.getIfcProperties();
    this.interiorOrExteriorSpace = this.extractEnum();
    this.elevationWithFlooring = this.extractNumber();
  }
}

function getIfcSpace(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcSpace, ifcLine);
}

export { getIfcSpace };
