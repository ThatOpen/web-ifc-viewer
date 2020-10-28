/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifckernel/lexical/ifcroot.htm]
 */

import { IfcBase } from "../IfcBase";
import { getIfcOwnerHistory } from "../ifc-identities/IfcOwnerHistory";

class IfcRoot extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.globalId = this.extractGuid();
    this.ownerHistory = getIfcOwnerHistory(this);
    this.name = this.extractText();
    this.description = this.extractText();
  }
}

export { IfcRoot };
