import { ifcTypes } from "../utils/ifc-types.js";
import { createIfcItemsFinder } from "./items-finder.js";
import {
  relatingObject,
  relatedObjects,
  value,
  contains,
} from "../utils/globalProperties.js";

function constructProject(ifcData) {
  constructSpatialStructure(ifcData);
}

function constructSpatialStructure(ifcData) {
  const finder = createIfcItemsFinder(ifcData);

  const spatialRelations = finder.findByType(ifcTypes.IfcRelAggregates);
  Object.values(spatialRelations).forEach((e) => {
    e[relatingObject][value][contains] = e[relatedObjects];
  });

  const ifcProject = finder.findByType(ifcTypes.IfcProject);
  console.log(ifcProject);
}

export { constructProject };
