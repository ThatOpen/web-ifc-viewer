/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcproductextension/lexical/ifcbuilding.htm]
 */

import { baseConstructorNoExtraction } from "../../ifc-utils/ifc-constructors";
import { IfcSpatialStructureElement } from "../ifc-base-classes/IfcSpatialStructureElement";

class IfcBuildingStorey extends IfcSpatialStructureElement {
  getIfcProperties() {
    super.getIfcProperties();
    this.elevation = this.extractNumber();
  }
}

function getIfcBuildingStorey(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcBuildingStorey, ifcLine);
}

export { getIfcBuildingStorey };
