/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifckernel/lexical/ifcproject.htm]
 * @param  {IfcGloballyUniqueId} GlobalId [IfcRoot]
 * @param  {IfcOwnerHistory} OwnerHistory [IfcRoot]
 * @param  {IfcLabel} Name [IfcRoot]
 * @param  {IfcText} Description [IfcRoot]
 * @param  {IfcLabel} ObjectType [IfcObject]
 * @param  {IfcLabel} LongName [IfcProject]
 * @param  {IfcLabel} Phase [IfcProject]
 * @param  {[IfcRepresentationContext]} RepresentationContexts [IfcProject]
 * @param  {IfcUnitAssignment} UnitsInContext [IfcProject]
 */

import IfcObject from "./IfcObject";

export default class IfcProject extends IfcObject {
  getIfcProperties() {
    super.getIfcProperties();
    this.longName = this.extractText();
    this.phase = this.extractText();
    this.representationContexts = this.extractIdSet();
    this.unitsInContext = this.extractId();
  }
}
