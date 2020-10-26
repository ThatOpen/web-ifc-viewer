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

  extractProperty(action, filter) {
    if (this.isDefaultValue()) return this.extractDefaultValue();
    if (this.isAsterisk()) return this.extractAsterisk();
    if (this.isEmptySet()) return this.extractEmptySet();
    const property = action(this.buffer);
    this.updateBuffer(filter);
    return property;
  }

  extractId() {
    return this.finder.findById(
      this.extractProperty(this.parser.getId, regexp.expressId)
    );
  }

  extractGuid() {
    return this.extractProperty(this.parser.getGuid, regexp.guid);
  }

  extractText() {
    return this.extractProperty(this.parser.getIfcText, regexp.text);
  }

  extractEnum() {
    return this.extractProperty(this.parser.getIfcEnum, regexp.enum);
  }

  extractNumber() {
    return this.extractProperty(this.parser.getIfcNumber, regexp.realNumber);
  }

  extractIfcValue() {
    return this.extractProperty(this.parser.getIfcValue, regexp.ifcValue);
  }

  extractNumberSet() {
    return this.extractProperty(this.parser.getNumberSet, regexp.realNumberSet);
  }

  extractIdSet() {
    if (this.isEmptySet()) return this.extractEmptySet();
    return this.extractProperty(this.parser.getIdSet, regexp.expressIdSet).map(
      (e) => {
        return this.finder.findById(e);
      }
    );
  }

  extractAsterisk() {
    if (this.isEmptySet()) return this.extractEmptySet();
    const asterisk = this.parser.getIfcAsterisk(this.buffer);
    this.updateBuffer(regexp.asterisk);
    return asterisk;
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

export { IfcBase };
