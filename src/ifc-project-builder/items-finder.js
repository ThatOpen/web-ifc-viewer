import { namedProps as n } from '../utils/global-constants.js';
import { getName } from '../utils/ifc-types.js';

class IfcEntityFinder {
  constructor(ifcData) {
    this.ifcData = ifcData;
  }

  findByType(ifcType) {
    const matches = {};
    Object.keys(this.ifcData).forEach((e) => {
      if (this.getType(e) === getName(ifcType)) {
        matches[e] = this.ifcData[e];
      }
    });
    return matches;
  }

  getType(id) {
    return this.ifcData[id][n.ifcClass];
  }

  findAllProducts(spatialStructureElements, elements = []) {
    spatialStructureElements.forEach((spatial) => {
      const buildingElementsHere = spatial[n.hasBuildingElements];
      const spatialElementsHere = spatial[n.hasSpatial];
      if (buildingElementsHere) elements.push(...buildingElementsHere);
      if (spatialElementsHere) this.findAllProducts(spatialElementsHere, elements);
    });
    return elements;
  }
}

function createIfcItemsFinder(loadedIfc) {
  return new IfcEntityFinder(loadedIfc);
}

export { IfcEntityFinder, createIfcItemsFinder };
