import { regexp, ParseUtils } from "../ifc-utils/items-parser";

export default class IfcBase {
  constructor(ifcItemsFinder, rawIfcItem) {
    this.finder = ifcItemsFinder;
    this.ifcLine = rawIfcItem;
    this.parser = new ParseUtils();
    this.getIfcProperties();
  }

  getIfcProperties() {
    this.id = this.ifcLine.id;
    this.buffer = this.ifcLine.properties;
  }

  updateBuffer(filter) {
    this.buffer = this.buffer.replace(filter, "");
    this.buffer = this.buffer.replace(regexp.initialComma, "");
  }

  extractId() {
    const id = this.finder.findById(this.parser.getId(this.buffer));
    this.updateBuffer(regexp.expressId);
    return id;
  }

  extractIdSet() {
    let idSet = this.parser.getIdSet(this.buffer);
    idSet = idSet.map((e) => {
      return this.finder.findById(e);
    });
    this.updateBuffer(regexp.expressIdSet);
    return idSet;
  }

  extractGuid() {
    const guid = this.parser.getGuid(this.buffer);
    this.updateBuffer(regexp.guid);
    return guid;
  }

  extractText() {
    const text = this.parser.getIfcText(this.buffer);
    this.updateBuffer(regexp.text);
    return text;
  }
}
