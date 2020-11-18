import { getName, ifcTypes } from "../utils/ifc-types.js";
import { itemsReaderValues as i, namedProps as n } from "../utils/global-constants.js";

function findRemainingTypes(items) {
  const remainingTypes = [];
  items.forEach((element) => {
    if (Object.values(ifcTypes).indexOf(element[i.type]) < 0) {
      if (!remainingTypes.includes(element[i.type])) {
        remainingTypes.push(element[i.type]);
      }
    }
  });
  if (remainingTypes.length > 0) console.log(remainingTypes);
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
