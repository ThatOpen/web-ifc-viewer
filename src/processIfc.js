import { ifcTypes } from "./ifc-parser/utils/ifc-types.js";
import { createIfcItemsFinder } from "./ifc-parser/utils/items-finder.js";
import { parse } from "./ifc-parser/parser/parse-process.js";

function loadIfcFileItems(ifcItems) {
  const finder = createIfcItemsFinder(ifcItems);
  const loadedItems = {};
  finder.ifcData.map((ifcItem) => {
    if (isTypeSupported(ifcItem))
      loadedItems[ifcItem.expressId] = load(finder, ifcItem);
  });
  console.log(loadedItems);
}

function load(finder, ifcItem) {
  const foundItem = finder.findById(ifcItem.expressId);
  return parse(foundItem.properties, ifcItem.type);
}

function isTypeSupported(ifcItem) {
  return Object.values(ifcTypes).indexOf(ifcItem.type) > -1;
}

export { loadIfcFileItems };
