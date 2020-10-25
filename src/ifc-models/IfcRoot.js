/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifckernel/lexical/ifcroot.htm]
 */

import IfcBase from "./IfcBase";

export default class IfcRoot extends IfcBase {
  constructor(ifcItemsFinder, rawIfcItem) {
    super(ifcItemsFinder, rawIfcItem);
    console.log(this);
  }

  getIfcProperties() {
    super.getIfcProperties();
    this.globalId = this.extractGuid();
    this.ownerHistory = this.extractId();
    this.name = this.extractText();
    this.description = this.extractText();
  }
}
