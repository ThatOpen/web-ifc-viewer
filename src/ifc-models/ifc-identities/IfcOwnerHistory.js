/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcutilityresource/lexical/ifcownerhistory.htm]
 */

import { IfcBase, baseConstructor } from "../IfcBase";
import { getIfcApplication } from "./IfcApplication";

class IfcOwnerHistory extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.owningUser = this.extractId();
    this.owningApplication = getIfcApplication(this, this.extractId());
    this.state = this.extractEnum();
    this.changeAction = this.extractEnum();
    this.lastModifiedDate = this.extractNumber();
    this.lastModifiyingUser = this.extractId();
    this.lastModifyingApplication = this.extractId();
    this.creationDate = this.extractNumber();
  }
}

function getIfcOwnerHistory(caller, ifcLine) {
  return baseConstructor(caller, ifcLine, IfcOwnerHistory);
}

export { getIfcOwnerHistory };
