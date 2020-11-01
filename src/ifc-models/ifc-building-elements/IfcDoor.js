/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2_TC1/HTML/schema/ifcsharedbldgelements/lexical/ifcdoor.htm]
 */
import {
  baseConstructor,
  getItemByType,
  registerConstructorByType,
} from "../../ifc-utils/ifc-constructors.js";
import { IfcBuildingElement } from "../ifc-base-classes/IfcBuildingElement.js";
import { ifcTypes as t } from "../../ifc-utils/ifc-types.js";

class IfcDoor extends IfcBuildingElement {
  getIfcProperties() {
    super.getIfcProperties();
    this.overallHeight = this.extractNumber();
    this.overallWidth = this.extractNumber();
  }
}

function getIfcDoor(caller, ifcLine) {
  return baseConstructor(caller, IfcDoor, ifcLine);
}

registerConstructorByType(t.ifcDoor, getIfcDoor);
