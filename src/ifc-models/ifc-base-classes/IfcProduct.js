/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifckernel/lexical/ifcproduct.htm]
 */

import { getIfcLocalPlacement } from "../ifc-coordinates/IfcLocalPlacement";
import { IfcObject } from "./IfcObject";

class IfcProduct extends IfcObject {
  getIfcProperties() {
    super.getIfcProperties();
    this.objectPlacement = getIfcLocalPlacement(this);
    this.representation = this.extractId();
  }
}

export { IfcProduct };
