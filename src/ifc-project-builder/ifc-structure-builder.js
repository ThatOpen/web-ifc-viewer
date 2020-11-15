import { ifcTypes as t } from "../utils/ifc-types.js";
import { createIfcItemsFinder } from "./items-finder.js";
import {
  typeValue as v,
  namedProps as n,
  structuredData as s,
} from "../utils/global-constants.js";

function constructProject(ifcData) {
  const finder = createIfcItemsFinder(ifcData);
  bindSpatialToSpatial(finder);
  const elements = bindElementsToSpatial(finder);
  bindVoidsToElements(finder);
  return {
    [s.ifcProject]: finder.findByType(t.IfcProject),
    [s.products]: elements,
  };
}

function bindSpatialToSpatial(finder) {
  const spatialRelations = finder.findByType(t.IfcRelAggregates);
  Object.values(spatialRelations).forEach((e) => {
    e[n.relatingObject][v.value][n.containsSpatial] = e[n.relatedObjects];
  });
}

function bindElementsToSpatial(finder) {
  const elements = [];
  const contained = finder.findByType(t.IfcRelContainedInSpatialStructure);
  Object.values(contained).forEach((e) => {
    e[n.relatingStructure][v.value][n.containsElements] = e[n.relatedElements];
    e[n.relatedElements][v.value].forEach((e) => elements.push(e));
  });
  return elements;
}

function bindVoidsToElements(finder) {
  const voidRelations = finder.findByType(t.IfcRelVoidsElement);
  Object.values(voidRelations).forEach((e) => {
    initializeVoids(e);
    e[n.relatingBuildingElement][v.value][n.openings].push(
      e[n.relatedOpeningElement][v.value]
    );
  });
}

function initializeVoids(voidRelation) {
  if (!voidRelation[n.relatingBuildingElement][v.value][n.openings]) {
    voidRelation[n.relatingBuildingElement][v.value][n.openings] = [];
  }
}

export { constructProject };
