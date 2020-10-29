/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcproductextension/lexical/ifcbuilding.htm]
 */

import { baseConstructorNoExtraction } from "../../ifc-utils/ifc-constructor";
import { IfcSpatialStructureElement } from "../ifc-base-classes/IfcSpatialStructureElement";

class IfcBuilding extends IfcSpatialStructureElement {
  getIfcProperties() {
    super.getIfcProperties();
    this.elevationOfRefHeight = this.extractNumber();
    this.elevationOfTerrain = this.extractNumber();
    this.buildingAddress = this.extractId();
  }
}

function getIfcBuilding(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcBuilding, ifcLine);
}

export { getIfcBuilding };
