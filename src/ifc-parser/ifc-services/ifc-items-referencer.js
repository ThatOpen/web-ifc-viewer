import { typeValue as v } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

function referenceEntities(items) {
  let key;
  for (key in items) {
    const ifcLine = items[key];
    for (key in ifcLine) {
      const ifcProperty = ifcLine[key];
      referenceSingleItem(ifcProperty, items);
      referenceMultipleItems(ifcProperty, items);
      trimExplicitTypes(ifcLine, key);
    }
  }
}

function referenceSingleItem(ifcProperty, items) {
  if (isSingleItemValid(ifcProperty, items))
    ifcProperty[v.value] = items[ifcProperty[v.value]];
}

function isSingleItemValid(ifcProperty, items) {
  return (
    isItemWithReference(ifcProperty) &&
    items.hasOwnProperty(ifcProperty[v.value])
  );
}

function referenceMultipleItems(ifcProperty, items) {
  if (ifcProperty[v.type] === d.idSet) {
    const property = ifcProperty;
    const values = [...property[v.value]];
    property[v.value] = values.map((e) => {
      return items.hasOwnProperty(e) ? items[e] : e;
    });
  }
}

function isItemWithReference(item) {
  if (item[v.value] === d[v.value] && !isNaN(item[v.value])) return true;
  if (item[v.type] === d.id) return true;
  return false;
}

function trimExplicitTypes(ifcLine, key) {
  const value = ifcLine[key][v.value];
  if (value) ifcLine[key] = value;
}

export { referenceEntities };
