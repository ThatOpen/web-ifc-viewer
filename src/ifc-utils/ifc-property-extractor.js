import { regexp } from "./items-parser";

class IfcPropertyExtractor {
  constructor(ifcBaseClass) {
    this.base = ifcBaseClass;
    this.select = {
      Id: { action: this.base.parser.getId, filter: regexp.expressId },
      IdSet: { action: this.base.parser.getIdSet, filter: regexp.expressIdSet },
      Guid: { action: this.base.parser.getGuid, filter: regexp.guid },
      Text: { action: this.base.parser.getIfcText, filter: regexp.text },
      Enum: { action: this.base.parser.getIfcEnum, filter: regexp.enum },
      Number: { action: this.base.parser.getIfcNumber, filter: regexp.Number },
      IfcValue: {
        action: this.base.parser.getIfcValue,
        filter: regexp.ifcValue,
      },
      NumberSet: {
        action: this.base.parser.getNumberSet,
        filter: regexp.numberSet,
      },
    };
  }

  updateBuffer(filter) {
    this.base.buffer = this.base.buffer.replace(filter, "");
    this.base.buffer = this.base.buffer.replace(regexp.initialComma, "");
  }

  extract({ action, filter }) {
    if (this.isDefaultValue()) return this.extractDefaultValue();
    if (this.isAsterisk()) return this.extractAsterisk();
    if (this.isEmptySet()) return this.extractEmptySet();
    const property = action(this.base.buffer);
    this.updateBuffer(filter);
    return property;
  }

  extractId() {
    return this.base.finder.findById(this.extract(this.select.Id));
  }

  extractIdSet() {
    if (this.isEmptySet()) return this.extractEmptySet();
    return this.extract(this.select.IdSet).map((e) => {
      return this.base.finder.findById(e);
    });
  }

  extractAsterisk() {
    if (this.isEmptySet()) return this.extractEmptySet();
    const asterisk = this.base.parser.getIfcAsterisk(this.base.buffer);
    this.updateBuffer(regexp.asterisk);
    return asterisk;
  }

  extractDefaultValue() {
    const defaultValue = this.base.parser.getDefaultValue(this.base.buffer);
    this.updateBuffer(regexp.defaultValue);
    return defaultValue;
  }

  extractEmptySet() {
    this.updateBuffer(regexp.emptySet);
    return "";
  }

  isDefaultValue() {
    return regexp.defaultValue.test(this.base.buffer);
  }

  isAsterisk() {
    return regexp.asterisk.test(this.base.buffer);
  }

  isEmptySet() {
    return regexp.emptySet.test(this.base.buffer);
  }
}

export { IfcPropertyExtractor };
