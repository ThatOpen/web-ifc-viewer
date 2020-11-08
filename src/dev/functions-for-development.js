import { getName, ifcTypes } from "../ifc-parser/utils/ifc-types.js";
import { namedProps as n } from "../utils/global-constants.js";

function findRemainingTypes(items) {
  const remainingTypes = [];
  items.forEach((element) => {
    if (Object.values(ifcTypes).indexOf(element.type) < 0) {
      if (!remainingTypes.includes(element.type)) {
        remainingTypes.push(element.type);
      }
    }
  });
  console.log(remainingTypes);
}

function filterItems(items, filter) {
  let key;
  for (key in items) {
    const ifcLine = items[key];
    if (ifcLine && ifcLine[n.ifcClass] != getName(filter)) {
      delete items[key];
    }
  }
}

export { findRemainingTypes, filterItems };
