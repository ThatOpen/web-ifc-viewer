import { namedProps as n } from '../utils/global-constants.js';
import { getName } from '../utils/ifc-types.js';

class IfcEntityFinder {
  constructor(ifcData) {
    const map = new Map();

    // generate map so we can return all types without looping tree again
    Object.keys(ifcData).forEach((e) => {
      const t = ifcData[e][n.ifcClass];
      if (map.has(t)) {
        const x = map.get(t);
        x.push({ p: e, d: ifcData[e] });
      } else {
        const x = [{ p: e, d: ifcData[e] }];
        map.set(t, x);
      }
    });

    this.cache = map;
  }

  findByType(ifcType) {
    const map = this.cache;
    const matches = {};
    if (map.has(getName(ifcType))) {
      const x = map.get(getName(ifcType));
      x.forEach((e) => {
        matches[e.p] = e.d;
      });
    }
    return matches;
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

export { createIfcItemsFinder };
