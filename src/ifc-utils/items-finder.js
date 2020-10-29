import { ifcTypes } from "./ifc-types";

class IfcEntityFinder {
  constructor(ifcData) {
    this.ifcData = ifcData;
  }

  findByType(typeToFind) {
    return this.ifcData.filter((e) => e.type === typeToFind);
  }

  findFirstByType(typeToFind) {
    return this.findByType(typeToFind)[0];
  }

  findById(idToFind) {
    const foundItem = this.ifcData.find((e) => e.id === idToFind);
    return foundItem ? foundItem : idToFind;
  }

  getSpatial() {
    return this.spatialFinder;
  }

  findIfcRelAggregates() {
    return this.findByType(ifcTypes.ifcRelAggregates);
  }
}

export { IfcEntityFinder };
