import { IfcPropertyExtractor } from "../ifc-utils/ifc-property-extractor";
import * as p from "../ifc-utils/ifc-property-readers";
import { solveUnicode } from "../ifc-utils/ifc-unicode";

let privateProperties = new WeakMap();
class IfcBase {
  constructor(ifcItemsFinder, ifcLine) {
    privateProperties.set(this, {
      reader: new IfcPropertyExtractor(ifcItemsFinder, ifcLine),
      ifcLine: ifcLine,
    });
    this.getIfcProperties();
  }

  getIfcProperties() {
    this.expressId = privateProperties.get(this).ifcLine.id;
  }

  extractId() {
    return this.getReader().useIdReader();
  }

  extractIdSet() {
    return this.getReader().useIdSetReader();
  }

  extractGuid() {
    return this.getReader().use(p.GuidReader);
  }

  extractText() {
    return solveUnicode(this.getReader().use(p.TextReader));
  }

  extractEnum() {
    return this.getReader().use(p.EnumReader);
  }

  extractNumber() {
    return this.getReader().use(p.NumberReader);
  }

  extractIfcValue() {
    return this.getReader().use(p.IfcValueReader);
  }

  extractNumberSet() {
    return this.getReader().use(p.numberSetReader);
  }

  extractDefaultValue() {
    return this.getReader().use(p.defaultValueReader);
  }

  extractDate() {
    const found = this.getReader().use(p.NumberReader);
    const formatted = new Date(found * 1000);
    return formatted.getTime() ? formatted : found;
  }

  getFinder() {
    return this.getReader().getFinder();
  }

  getReader() {
    return privateProperties.get(this).reader;
  }

  isDefaultValue() {
    return this.getReader().isDefaultValue();
  }

  isEmptySet() {
    return this.getReader().isEmptySet();
  }
}

export { IfcBase };
