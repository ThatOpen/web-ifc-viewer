import { SpatialStructureFinder } from "./spatial-structure-finder";

class IfcEntityFinder {
  constructor(ifcData) {
    this.ifcData = ifcData;
    this.spatialFinder = new SpatialStructureFinder(ifcData, this);
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
}

export { IfcEntityFinder };
