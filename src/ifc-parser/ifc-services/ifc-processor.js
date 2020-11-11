import "../ifc-models/building-elements.js";
import "../ifc-models/classification.js";
import "../ifc-models/context.js";
import "../ifc-models/geometry.js";
import "../ifc-models/identities.js";
import "../ifc-models/materials.js";
import "../ifc-models/presentation.js";
import "../ifc-models/properties.js";
import "../ifc-models/relationships.js";
import "../ifc-models/spatial-structure.js";
import "../ifc-models/units.js";
import { ifcTypes as t } from "../../utils/ifc-types.js";
import { parse } from "../parser/parse-process.js";
import { readIfcItems } from "./ifc-items-reader.js";
import { referenceEntities } from "./ifc-items-referencer.js";
import { findRemainingTypes } from "../../dev/functions-for-development.js";

function loadIfcFileItems(ifcData) {
  const ifcItems = readIfcItems(ifcData);
  findRemainingTypes(ifcItems);
  return loadItems(ifcItems);
}

function loadItems(ifcItems) {
  const loadedItems = {};
  ifcItems.map((ifcItem) => {
    if (isTypeSupported(ifcItem))
      loadedItems[ifcItem.expressId] = parseAndLoadItem(ifcItems, ifcItem);
  });
  referenceEntities(loadedItems);
  return loadedItems;
}

function parseAndLoadItem(ifcData, ifcItem) {
  const foundItem = findById(ifcItem.expressId, ifcData);
  return parse(foundItem.properties, ifcItem.type);
}

function findById(idToFind, ifcItems) {
  const foundItem = ifcItems.find((e) => e.expressId === idToFind);
  return foundItem ? foundItem : idToFind;
}

function isTypeSupported(ifcItem) {
  return Object.values(t).indexOf(ifcItem.type) > -1;
}

export { loadIfcFileItems };
