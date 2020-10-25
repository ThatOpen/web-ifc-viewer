import { ParseUtils } from "../ifc-utils/items-parser";

class IfcItemsReader {
  constructor(ifcFile) {
    this.ifcFile = ifcFile;
    this.parser = new ParseUtils();
  }

  readItems() {
    const { dataSection } = this.extractSections(this.ifcFile);
    return this.constructRawIfcItems(dataSection);
  }

  extractSections() {
    const ifcPlaneText = this.parser.removeAllNewLines(this.ifcFile);
    return {
      headerSection: this.parser.getHeaderSection(ifcPlaneText),
      dataSection: this.parser.getDataSection(ifcPlaneText),
    };
  }

  constructRawIfcItems(dataSection) {
    const flatIfcItemList = this.parser.separateIfcEntities(dataSection);
    return flatIfcItemList.map((e) => {
      return {
        id: this.parser.getId(e),
        type: this.parser.getIfcType(e),
        properties: this.parser.getIfcRawProperties(e),
      };
    });
  }
}

function readIfcItems(loadedIfc) {
  const ifcReader = new IfcItemsReader(loadedIfc);
  return ifcReader.readItems();
}

export { IfcItemsReader, readIfcItems };
