import { readIfcItems } from "./ifc-items-reader.js";
import { ifcTypes } from "./ifc-types.js";

class IfcEntityFinder {
  constructor(ifcData) {
    this.ifcData = ifcData;
  }

  findById(idToFind) {
    const foundItem = this.ifcData.find((e) => e.expressId === idToFind);
    return foundItem ? foundItem : idToFind;
  }

  findByType(typeToFind) {
    return this.ifcData.filter((e) => e.type === typeToFind);
  }

  findFirstByType(typeToFind) {
    return this.findByType(typeToFind)[0];
  }

  findIfcRelAggregates() {
    return this.findByType(ifcTypes.ifcRelAggregates);
  }

  findIfcRelContainedInSpatialStructure() {
    return this.findByType(ifcTypes.ifcRelContainedInSpatialStructure);
  }
}

function createIfcItemsFinder(loadedIfc) {
  return new IfcEntityFinder(readIfcItems(loadedIfc));
}

export { IfcEntityFinder, createIfcItemsFinder };
