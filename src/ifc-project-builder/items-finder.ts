import { namedProps as n } from "../utils/global-constants.js";
import { getName } from "../utils/ifc-types.js";

class IfcEntityFinder {
  ifcData: any;
  constructor(ifcData: any) {
    this.ifcData = ifcData;
  }

  findByType(ifcType: any) {
    const matches = {};
    Object.keys(this.ifcData).forEach((e) => {
      if (this.getType(e) === getName(ifcType)) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        matches[e] = this.ifcData[e];
      }
    });
    return matches;
  }

  getType(id: any) {
    return this.ifcData[id][n.ifcClass];
  }

  findAllProducts(spatialStructureElements: any, elements = []) {
    spatialStructureElements.forEach((spatial: any) => {
      const buildingElementsHere = spatial[n.hasBuildingElements];
      const spatialElementsHere = spatial[n.hasSpatial];
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
      if (buildingElementsHere) elements.push(...buildingElementsHere);
      if (spatialElementsHere) this.findAllProducts(spatialElementsHere, elements);
    });
    return elements;
  }
}

function createIfcItemsFinder(loadedIfc: any) {
  return new IfcEntityFinder(loadedIfc);
}

export { createIfcItemsFinder };
