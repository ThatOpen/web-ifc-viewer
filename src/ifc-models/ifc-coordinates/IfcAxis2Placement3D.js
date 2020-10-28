/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcgeometryresource/lexical/ifcaxis2placement3d.htm]
 */

import { getIfcDirection } from "./IfcDirection";
import { IfcPlacement } from "./IfcPlacement";
import { baseConstructor } from "../../ifc-utils/ifc-constructor";

class IfcAxis2Placement3D extends IfcPlacement {
  getIfcProperties() {
    super.getIfcProperties();
    this.axis = getIfcDirection(this);
    this.refDirection = getIfcDirection(this);
  }
}

function getIfcAxis2Placement3D(caller) {
  return baseConstructor(caller, IfcAxis2Placement3D);
}

export { getIfcAxis2Placement3D };
