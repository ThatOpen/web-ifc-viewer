/**
 * [https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcsharedbldgelements/lexical/ifcwall.htm]
 */
import {
  baseConstructor,
  getItemByType,
  registerConstructorByType,
} from "../../ifc-utils/ifc-constructors.js";
import { IfcBuildingElement } from "../ifc-base-classes/IfcBuildingElement.js";
import { ifcTypes as t } from "../../ifc-utils/ifc-types.js";

class IfcWall extends IfcBuildingElement {
  getIfcProperties() {
    super.getIfcProperties();
    this.predefinedType = this.extractEnum();
  }
}

function getIfcWall(caller, ifcLine) {
  return baseConstructor(caller, IfcWall, ifcLine);
}

registerConstructorByType(t.ifcWall, getIfcWall);

export { IfcWall };
