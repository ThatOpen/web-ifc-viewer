/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcproductextension/lexical/ifcsite.htm]
 */

import { baseConstructorNoExtraction } from "../../ifc-utils/ifc-constructor";
import { IfcSpatialStructureElement } from "../ifc-base-classes/IfcSpatialStructureElement";

class IfcSite extends IfcSpatialStructureElement {
  getIfcProperties() {
    super.getIfcProperties();
    this.refLatitude = this.extractNumberSet();
    this.refLongitude = this.extractNumberSet();
    this.refElevation = this.extractNumber();
    this.landTitleNumber = this.extractText();
    this.siteAddress = this.extractId();
  }
}

function getIfcSite(caller, ifcLine) {
  return baseConstructorNoExtraction(caller, IfcSite, ifcLine);
}

export { getIfcSite };
