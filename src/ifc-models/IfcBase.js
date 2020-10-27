import { IfcPropertyExtractor } from "../ifc-utils/ifc-property-extractor";
import { ParseUtils } from "../ifc-utils/items-parser";

class IfcBase {
  constructor(ifcItemsFinder, rawIfcItem) {
    this.finder = ifcItemsFinder;
    this.ifcLine = rawIfcItem;
    this.parser = new ParseUtils();
    this.reader = new IfcPropertyExtractor(this);
    this.getIfcProperties();
  }

  getIfcProperties() {
    this.id = this.ifcLine.id;
    this.buffer = this.ifcLine.properties;
  }

  extractId() {
    return this.reader.extractId();
  }

  extractIdSet() {
    return this.reader.extractIdSet();
  }

  extractGuid() {
    return this.reader.extract(this.reader.select.Guid);
  }

  extractText() {
    return this.reader.extract(this.reader.select.Text);
  }

  extractEnum() {
    return this.reader.extract(this.reader.select.Enum);
  }

  extractNumber() {
    return this.reader.extract(this.reader.select.Number);
  }

  extractIfcValue() {
    return this.reader.extract(this.reader.select.IfcValue);
  }

  extractNumberSet() {
    return this.reader.extract(this.reader.select.NumberSet);
  }

  isEmptySet() {
    return this.reader.isEmptySet();
  }
}

export { IfcBase };
