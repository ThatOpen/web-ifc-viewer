import { getName, haveIfcType } from '../utils/ifc-types.js';
import { itemsReaderValues as i, namedProps as n } from '../utils/global-constants.js';

function findRemainingTypes(items) {
  const remainingTypes = new Set();
  items.forEach((element) => {
    if (haveIfcType(element[i.type]) < 0) {
      if (!remainingTypes.has(element[i.type])) {
        remainingTypes.add(element[i.type]);
      }
    }
  });
  if (remainingTypes.size > 0)
    console.log('Error: the following classes are not implemented: ', remainingTypes);
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
