/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcproductextension/lexical/ifcspatialelement.htm]
 */

import { IfcProduct } from "./IfcProduct";

class IfcSpatialElement extends IfcProduct {
  getIfcProperties() {
    super.getIfcProperties();
    this.longName = this.extractText();
  }
}

export { IfcSpatialElement };
