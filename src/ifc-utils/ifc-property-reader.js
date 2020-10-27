import { ifcProperties as props } from "./ifc-properties-to-read";
import { regexp } from "./ifc-regexp";
import { ParseUtils } from "./items-parser";

class IfcPropertyExtractor {
  constructor(ifcEntityFinder, ifcLine) {
    this.buffer = ifcLine.properties;
    this.finder = ifcEntityFinder;
    this.parser = new ParseUtils();
    this.getPropertiesToRead();
  }

  getPropertiesToRead() {
    props.Id = { get: this.parser.getId, filter: regexp.expressId };
    props.IdSet = { get: this.parser.getIdSet, filter: regexp.expressIdSet };
    props.Guid = { get: this.parser.getGuid, filter: regexp.guid };
    props.Text = { get: this.parser.getIfcText, filter: regexp.text };
    props.Enum = { get: this.parser.getIfcEnum, filter: regexp.enum };
    props.Number = { get: this.parser.getIfcNumber, filter: regexp.Number };
    props.IfcValue = { get: this.parser.getIfcValue, filter: regexp.ifcValue };
    props.Numbers = { get: this.parser.getNumberSet, filter: regexp.numberSet };
    props.Asterisk = { get: this.parser.getAsterisk, filter: regexp.asterisk };
    props.Default = { get: this.parser.default, filter: regexp.default };
    props.Empty = { get: () => "", filter: regexp.emptySet };
  }

  updateBuffer(filter) {
    this.buffer = this.buffer.replace(filter, "");
    this.buffer = this.buffer.replace(regexp.initialComma, "");
  }

  extract(ifcProp) {
    if (this.parser.isDefaultValue(this.buffer)) ifcProp = props.Default;
    if (this.parser.isAsterisk(this.buffer)) ifcProp = props.Asterisk;
    if (this.isEmptySet()) ifcProp = props.Empty;
    const extractedProperty = ifcProp.get(this.buffer);
    this.updateBuffer(ifcProp.filter);
    return extractedProperty;
  }

  extractId() {
    return this.finder.findById(this.extract(props.Id));
  }

  extractIdSet() {
    if (this.isEmptySet()) return this.extract(props.Empty);
    return this.extract(props.IdSet).map((e) => {
      return this.finder.findById(e);
    });
  }

  isEmptySet() {
    return this.parser.isEmptySet(this.buffer);
  }

  getFinder() {
    return this.finder;
  }
}

export { IfcPropertyExtractor };
