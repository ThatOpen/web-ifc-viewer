/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifckernel/lexical/ifcproduct.htm]
 */

import { getIfcObjectPlacement } from "../ifc-coordinates/IfcObjectPlacementFactory";
import { IfcObject } from "./IfcObject";

class IfcProduct extends IfcObject {
  getIfcProperties() {
    super.getIfcProperties();
    this.objectPlacement = getIfcObjectPlacement(this);
    this.representation = this.extractId();
  }
}

export { IfcProduct };
