/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcproductextension/lexical/ifcbuilding.htm]
 */

import {
  baseConstructor,
  registerConstructorByType,
} from "../../ifc-utils/ifc-constructors";
import { ifcTypes as t } from "../../ifc-utils/ifc-types";
import { IfcSpatialStructureElement } from "../ifc-base-classes/IfcSpatialStructureElement";

class IfcBuildingStorey extends IfcSpatialStructureElement {
  getIfcProperties() {
    super.getIfcProperties();
    this.elevation = this.extractNumber();
  }
}

function getIfcBuildingStorey(caller, ifcLine) {
  return baseConstructor(caller, IfcBuildingStorey, ifcLine);
}

registerConstructorByType(t.ifcBuildingStorey, getIfcBuildingStorey);

export { getIfcBuildingStorey };
