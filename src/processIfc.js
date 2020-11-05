import { ifcTypes } from "./ifc-parser/utils/ifc-types.js";
import { createIfcItemsFinder } from "./ifc-parser/utils/items-finder.js";
import { parse } from "./ifc-parser/parser/parse-process.js";
import { ifcDataTypes } from "./ifc-parser/utils/ifc-data-types.js";
import { findRemainingTypes } from "./find-remaining-types.js";

function loadIfcFileItems(ifcItems) {
  const finder = createIfcItemsFinder(ifcItems);
  findRemainingTypes(finder.ifcData);
  const loadedItems = {};
  finder.ifcData.map((ifcItem) => {
    if (isTypeSupported(ifcItem))
      loadedItems[ifcItem.expressId] = load(finder, ifcItem);
  });
  referenceEntities(loadedItems);
}

function load(finder, ifcItem) {
  const foundItem = finder.findById(ifcItem.expressId);
  return parse(foundItem.properties, ifcItem.type);
}

function referenceEntities(items) {
  let key;
  for (key in items) {
    const ifcLine = items[key];
    for (key in ifcLine) {
      referenceSingleItem(key, ifcLine, items);
      referenceMultipleItems(key, ifcLine, items);
    }
  }
  console.log(items);
}

function referenceSingleItem(key, ifcLine, items) {
  if (
    ifcLine[key].type === ifcDataTypes.id &&
    items.hasOwnProperty(ifcLine[key].value)
  ) {
    ifcLine[key].value = items[ifcLine[key].value];
  }
}

function referenceMultipleItems(key, ifcLine, items) {
  if (ifcLine[key].type === ifcDataTypes.idSet) {
    const property = ifcLine[key];
    const values = [...property.value];
    property.value = values.map((e) => {
      return items.hasOwnProperty(e) ? items[e] : e;
    });
  }
}

function isTypeSupported(ifcItem) {
  return Object.values(ifcTypes).indexOf(ifcItem.type) > -1;
}

export { loadIfcFileItems };
