import { regexp, ParseUtils } from "../ifc-utils/items-parser";

class IfcBase {
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
    if (this.isDefaultValue()) return this.extractDefaultValue();
    if (this.isAsterisk()) return this.extractAsterisk();
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
    if (this.isDefaultValue()) return this.extractDefaultValue();
    const text = this.parser.getIfcText(this.buffer);
    this.updateBuffer(regexp.text);
    return text;
  }

  extractEnum() {
    if (this.isDefaultValue()) return this.extractDefaultValue();
    const enumerator = this.parser.getIfcEnum(this.buffer);
    this.updateBuffer(regexp.enum);
    return enumerator;
  }

  extractNumber() {
    if (this.isDefaultValue()) return this.extractDefaultValue();
    const realNumber = this.parser.getIfcNumber(this.buffer);
    this.updateBuffer(regexp.realNumber);
    return realNumber;
  }

  extractNumberSet() {
    if (this.isEmptySet()) return this.extractEmptySet();
    const numberSet = this.parser.getIfcNumberSet(this.buffer);
    this.updateBuffer(regexp.realNumberSet);
    return numberSet;
  }

  extractAsterisk() {
    if (this.isEmptySet()) return this.extractEmptySet();
    const asterisk = this.parser.getIfcAsterisk(this.buffer);
    this.updateBuffer(regexp.asterisk);
    return asterisk;
  }

  extractIfcValue() {
    if (this.isEmptySet()) return this.extractEmptySet();
    const ifcValue = this.parser.getIfcValue(this.buffer);
    this.updateBuffer(regexp.ifcValue);
    return ifcValue;
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

  isDefaultValue() {
    return regexp.defaultValue.test(this.buffer);
  }

  isAsterisk() {
    return regexp.asterisk.test(this.buffer);
  }

  isEmptySet() {
    return regexp.emptySet.test(this.buffer);
  }
}

function baseConstructor(caller, ifcLine, classToConstruct) {
  return regexp.defaultValue.test(ifcLine)
    ? caller.parser.getDefaultValue(ifcLine)
    : new classToConstruct(caller.finder, ifcLine);
}

function baseMultiConstructor(caller, classToConstruct) {
  return caller.isEmptySet()
    ? caller.extractEmptySet()
    : caller.extractIdSet().map((e) => {
        return new classToConstruct(caller.finder, e);
      });
}

export { IfcBase, baseConstructor, baseMultiConstructor };
