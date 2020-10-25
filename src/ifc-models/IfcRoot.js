/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifckernel/lexical/ifcroot.htm]
 * @param  {IfcGloballyUniqueId} GlobalId [IfcRoot]
 * @param  {IfcOwnerHistory} OwnerHistory [IfcRoot]
 * @param  {IfcLabel} Name [IfcRoot]
 * @param  {IfcText} Description [IfcRoot]
 */

import { regexp, ParseUtils } from "../ifc-utils/regexp";

export default class IfcRoot {
  constructor(ifcItemsFinder, ifcType) {
    this.finder = ifcItemsFinder;
    this.parser = new ParseUtils();
    this.getRawIfcProperties(ifcType);
    this.getIfcProperties();
    console.log(this);
  }

  updateIfcRawProps(filter) {
    this.ifcRawProps = this.ifcRawProps.replace(filter, "");
    this.ifcRawProps = this.ifcRawProps.replace(regexp.initialComma, "");
  }

  getRawIfcProperties(ifcType) {
    const rawIfcLine = this.finder.findFirstByType(ifcType);
    this.id = rawIfcLine.id;
    this.ifcRawProps = rawIfcLine.properties;
  }

  getIfcProperties() {
    this.globalId = this.extractGuid();
    this.ownerHistory = this.extractId();
    this.name = this.extractText();
    this.description = this.extractText();
  }

  extractId() {
    const id = this.finder.findById(this.parser.getId(this.ifcRawProps));
    this.updateIfcRawProps(regexp.expressId);
    return id;
  }

  extractIdSet() {
    let idSet = this.parser.getIdSet(this.ifcRawProps);
    idSet = idSet.map((e) => {
      return this.finder.findById(e);
    });
    this.updateIfcRawProps(regexp.expressIdSet);
    return idSet;
  }

  extractGuid() {
    const guid = this.parser.getGuid(this.ifcRawProps);
    this.updateIfcRawProps(regexp.guid);
    return guid;
  }

  extractText() {
    const text = this.parser.getIfcText(this.ifcRawProps);
    this.updateIfcRawProps(regexp.text);
    return text;
  }
}
