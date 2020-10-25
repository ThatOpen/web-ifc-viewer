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
    if (this.hasDefaultValue()) return this.extractDefaultValue();
    const id = this.finder.findById(this.parser.getId(this.buffer));
    this.updateBuffer(regexp.expressId);
    return id;
  }

  extractIdSet() {
    if (this.isEmptySet()) return this.extractEmptySet();
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
    if (this.hasDefaultValue()) return this.extractDefaultValue();
    const text = this.parser.getIfcText(this.buffer);
    this.updateBuffer(regexp.text);
    return text;
  }

  extractEnum() {
    if (this.hasDefaultValue()) return this.extractDefaultValue();
    const enumerator = this.parser.getIfcEnum(this.buffer);
    this.updateBuffer(regexp.enum);
    return enumerator;
  }

  extractInteger() {
    if (this.hasDefaultValue()) return this.extractDefaultValue();
    const integer = this.parser.getIfcInteger(this.buffer);
    this.updateBuffer(regexp.integer);
    return integer;
  }

  extractDefaultValue() {
    const defaultValue = this.parser.getDefaultValue(this.buffer);
    this.updateBuffer(regexp.defaultValue);
    return defaultValue;
  }

  extractEmptySet() {
    this.updateBuffer(regexp.emptySet);
    return "";
  }

  hasDefaultValue() {
    return regexp.defaultValue.test(this.buffer);
  }

  isEmptySet() {
    return regexp.emptySet.test(this.buffer);
  }
}
