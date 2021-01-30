import "../ifc-models/building-elements.js";
import "../ifc-models/classification.js";
import "../ifc-models/context.js";
import "../ifc-models/document.js";
import "../ifc-models/geometry.js";
import "../ifc-models/identities.js";
import "../ifc-models/materials.js";
import "../ifc-models/presentation.js";
import "../ifc-models/properties.js";
import "../ifc-models/project.js";
import "../ifc-models/relationships.js";
import "../ifc-models/quantities.js";
import "../ifc-models/systems.js";
import "../ifc-models/spatial-structure.js";
import "../ifc-models/units.js";
import { ifcTypes as t } from "../../utils/ifc-types.js";
import { parse } from "../parser/parse-process.js";
import { readIfcItems } from "./ifc-items-reader.js";
import { bindEntities } from "./ifc-items-referencer.js";
import { findRemainingTypes } from "../../dev/functions-for-development.js";
import { itemsReaderValues as i, namedProps as n } from "../../utils/global-constants.js";

function loadIfcFileItems(ifcData) {
  const ifcItems = readIfcItems(ifcData);
  findRemainingTypes(ifcItems);
  return loadItems(ifcItems);
}

function loadItems(ifcData) {
  const loadedItems = {};
  ifcData.map((ifcItem) => {
    if (isTypeSupported(ifcItem))
      loadedItems[ifcItem[i.expressId]] = parseAndLoadItem(ifcItem);
  });
  bindEntities(loadedItems);
  return loadedItems;
}

function parseAndLoadItem(ifcItem) {
  const parsed = parse(ifcItem[i.properties], ifcItem[i.type]);
  parsed[n.expressId] = ifcItem[i.expressId];
  return parsed;
}

function isTypeSupported(ifcItem) {
  return Object.values(t).indexOf(ifcItem[i.type]) > -1;
}

export { loadIfcFileItems };
