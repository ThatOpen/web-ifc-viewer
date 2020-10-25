/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifckernel/lexical/ifcobject.htm]
 * @param  {IfcGloballyUniqueId} GlobalId [IfcRoot]
 * @param  {IfcOwnerHistory} OwnerHistory [IfcRoot]
 * @param  {IfcLabel} Name [IfcRoot]
 * @param  {IfcText} Description [IfcRoot]
 * @param  {IfcLabel} ObjectType [IfcObject]
 */

import IfcObjectDefinition from "./IfcObjectDefinition";

export default class IfcObject extends IfcObjectDefinition {
  constructor(ifcItemsFinder, ifcType) {
    super(ifcItemsFinder, ifcType);
    console.log("IfcObject here!");
  }

  getIfcProperties() {
    super.getIfcProperties();
    this.objectType = this.extractText();
  }
}
