import { ifcProperties as ifcProps } from "../ifc-utils/ifc-properties-to-read";
import { IfcPropertyExtractor } from "../ifc-utils/ifc-property-reader";

let privateProps = new WeakMap();
class IfcBase {
  constructor(ifcItemsFinder, ifcLine) {
    privateProps.set(this, {
      reader: new IfcPropertyExtractor(ifcItemsFinder, ifcLine),
      ifcLine: ifcLine,
    });
    this.getIfcProperties();
  }

  getIfcProperties() {
    this.expressId = privateProps.get(this).ifcLine.id;
  }

  extractId() {
    return privateProps.get(this).reader.extractId();
  }

  extractIdSet() {
    return privateProps.get(this).reader.extractIdSet();
  }

  extractGuid() {
    return privateProps.get(this).reader.extract(ifcProps.Guid);
  }

  extractText() {
    return privateProps.get(this).reader.extract(ifcProps.Text);
  }

  extractEnum() {
    return privateProps.get(this).reader.extract(ifcProps.Enum);
  }

  extractNumber() {
    return privateProps.get(this).reader.extract(ifcProps.Number);
  }

  extractIfcValue() {
    return privateProps.get(this).reader.extract(ifcProps.IfcValue);
  }

  extractNumberSet() {
    return privateProps.get(this).reader.extract(ifcProps.Numbers);
  }

  getFinder() {
    return privateProps.get(this).reader.getFinder();
  }

  isEmptySet() {
    return privateProps.get(this).reader.isEmptySet();
  }
}

export { IfcBase };
