import { regexp_spatial } from "../ifc-regexp";
import { ifcTypes } from "../ifc-types";

class SpatialStructureFinder {
  constructor(ifcData, generalFinder) {
    this.ifcData = ifcData;
    this.baseFinder = generalFinder;
  }

  findIfcSites(idIfcProject) {
    return this.baseFinder
      .findByType(ifcTypes.ifcRelAggregates)
      .filter((e) =>
        e.properties.match(regexp_spatial.getIfcSites(idIfcProject))
      )
      .map((e) => {
        return this.findIfcSite(e);
      })[0];
  }

  findIfcSite(e) {
    return e.properties
      .match(regexp_spatial.isolateIfcSites)[0]
      .slice(1, -1)
      .split(",")
      .map((f) => {
        return this.baseFinder.findById(Number(f.slice(1)));
      });
  }
}

export { SpatialStructureFinder };
