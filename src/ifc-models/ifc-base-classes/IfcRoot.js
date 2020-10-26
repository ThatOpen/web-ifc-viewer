/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifckernel/lexical/ifcroot.htm]
 */

import { IfcBase } from "../IfcBase";
import { getIfcOwnerHistory } from "../ifc-identities/IfcOwnerHistory";

export default class IfcRoot extends IfcBase {
  constructor(ifcItemsFinder, rawIfcItem) {
    super(ifcItemsFinder, rawIfcItem);
    console.log(this);
  }

  getIfcProperties() {
    super.getIfcProperties();
    this.globalId = this.extractGuid();
    this.ownerHistory = getIfcOwnerHistory(this, this.extractId());
    this.name = this.extractText();
    this.description = this.extractText();
  }
}
