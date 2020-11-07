import { ifcClass } from "../utils/globalProperties.js";
import { getName } from "../utils/ifc-types.js";

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
    return this.ifcData[id][ifcClass];
  }

  // findByTypes(ifcTypes) {
  //   const matches = {};
  //   Object.keys(this.ifcData).forEach((e) => {
  //     ifcTypes.forEach((j) => {
  //       if (this.getType(e) === getName(j)) {
  //         matches[e] = this.ifcData[e];
  //       }
  //     });
  //   });
  //   return matches;
  // }
}

function createIfcItemsFinder(loadedIfc) {
  return new IfcEntityFinder(loadedIfc);
}

export { IfcEntityFinder, createIfcItemsFinder };
