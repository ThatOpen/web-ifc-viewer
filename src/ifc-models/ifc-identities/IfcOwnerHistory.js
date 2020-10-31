/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcutilityresource/lexical/ifcownerhistory.htm]
 */

import { IfcBase } from "../IfcBase";
import { baseConstructor } from "../../ifc-utils/ifc-constructors";
import { getIfcApplication } from "./IfcApplication";

class IfcOwnerHistory extends IfcBase {
  getIfcProperties() {
    super.getIfcProperties();
    this.owningUser = this.extractId();
    this.owningApplication = getIfcApplication(this, this.extractId());
    this.state = this.extractEnum();
    this.changeAction = this.extractEnum();
    this.lastModifiedDate = this.extractDate();
    this.lastModifiyingUser = this.extractId();
    this.lastModifyingApplication = this.extractId();
    this.creationDate = this.extractDate();
  }
}

function getIfcOwnerHistory(caller, ifcLine) {
  return baseConstructor(caller, IfcOwnerHistory, ifcLine);
}

export { getIfcOwnerHistory };
