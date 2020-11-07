import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

function referenceEntities(items) {
  let key;
  for (key in items) {
    const ifcLine = items[key];
    for (key in ifcLine) {
      referenceSingleItem(key, ifcLine, items);
      referenceMultipleItems(key, ifcLine, items);
    }
  }
}

function referenceSingleItem(key, ifcLine, items) {
  if (
    isItemWithReference(ifcLine[key]) &&
    items.hasOwnProperty(ifcLine[key].value)
  ) {
    ifcLine[key].value = items[ifcLine[key].value];
  }
}

function referenceMultipleItems(key, ifcLine, items) {
  if (ifcLine[key].type === d.idSet) {
    const property = ifcLine[key];
    const values = [...property.value];
    property.value = values.map((e) => {
      return items.hasOwnProperty(e) ? items[e] : e;
    });
  }
}

function isItemWithReference(item) {
  if (item.type === d.ifcValue && !isNaN(item.value)) return true;
  if (item.type === d.id) return true;
  return false;
}

export { referenceEntities };
