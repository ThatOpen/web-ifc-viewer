/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcgeometryresource/lexical/ifccartesianpoint.htm]
 */

import { IfcPoint } from "./IfcPoint";
import { baseConstructor } from "../../ifc-utils/ifc-constructors";

class IfcCartesianPoint extends IfcPoint {
  getIfcProperties() {
    super.getIfcProperties();
    this.coordinates = this.extractNumberSet();
  }
}

function getIfcCartesianPoint(caller) {
  return baseConstructor(caller, IfcCartesianPoint);
}

export { getIfcCartesianPoint };
