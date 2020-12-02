import { ifcTypes as t } from "../utils/ifc-types.js";
import { createIfcItemsFinder } from "./items-finder.js";
import { bindElements } from "./ifc-elements-binder.js";
import {
  namedProps as n,
  structuredData as s,
} from "../utils/global-constants.js";

function constructProject(ifcData) {
  const finder = createIfcItemsFinder(ifcData);
  bindAllElements(finder);
  const ifcProjects = get(finder, t.IfcProject);
  const elements = finder.findAllProducts(ifcProjects);
  const spaces = get(finder, t.IfcSpace);
  const units = get(finder, t.IfcUnitAssignment)[0];
  return {
    [s.ifcProject]: ifcProjects,
    [s.products]: elements,
    [s.spaces]: spaces,
    [s.units]: units,
  };
}

function get(finder, type){
  return Object.values(finder.findByType(type));
}

function bindAllElements(finder) {
  bindSpatialToSpatial(finder);
  bindElementsToSpatial(finder);
  bindVoidsToElements(finder);
  bindFillingsToElements(finder);
  bindTypesToElements(finder);
}

function bindSpatialToSpatial(finder) {
  bindElements(
    finder,
    t.IfcRelAggregates,
    n.relatingObject,
    n.relatedObjects,
    n.hasSpatial
  );
}

function bindElementsToSpatial(finder) {
  bindElements(
    finder,
    t.IfcRelContainedInSpatialStructure,
    n.relatingStructure,
    n.relatedElements,
    n.hasBuildingElements
  );
}

function bindVoidsToElements(finder) {
  bindElements(
    finder,
    t.IfcRelVoidsElement,
    n.relatingBuildingElement,
    n.relatedOpeningElement,
    n.hasOpenings
  );
}

function bindFillingsToElements(finder) {
  bindElements(
    finder,
    t.IfcRelFillsElement,
    n.relatingOpeningElement,
    n.relatedBuildingElement,
    n.hasFillings
  );
}

function bindTypesToElements(finder) {
  bindElements(
    finder,
    t.IfcRelDefinesByType,
    n.relatedObjects,
    n.relatingType,
    n.hasType
  );
}

export { constructProject };
