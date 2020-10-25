/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcutilityresource/lexical/ifcownerhistory.htm]
 */

import IfcBase from "./IfcBase";
import { getIfcApplication } from "./IfcApplication";

class IfcOwnerHistory extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.owningUser = this.extractId();
    this.owningApplication = getIfcApplication(this.finder, this.extractId());
    this.state = this.extractEnum();
    this.changeAction = this.extractEnum();
    this.lastModifiedDate = this.extractInteger();
    this.lastModifiyingUser = this.extractId();
    this.lastModifyingApplication = this.extractId();
    this.creationDate = this.extractInteger();
  }
}

function getIfcOwnerHistory(ifcItemsFinder, rawIfcItem) {
  return new IfcOwnerHistory(ifcItemsFinder, rawIfcItem);
}

export { getIfcOwnerHistory };
