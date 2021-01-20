import { typeValue as v } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

function referenceEntities(items: any) {
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

function referenceSingleItem(ifcProperty: any, items: any) {
  if (isSingleItemValid(ifcProperty, items))
    ifcProperty[v.value] = items[ifcProperty[v.value]];
}

function isSingleItemValid(ifcProperty: any, items: any) {
  return (
    isItemWithReference(ifcProperty) &&
    items.hasOwnProperty(ifcProperty[v.value])
  );
}

function referenceMultipleItems(ifcProperty: any, items: any) {
  if (ifcProperty[v.type] === d.idSet) {
    const property = ifcProperty;
    const values = [...property[v.value]];
    property[v.value] = values.map((e) => {
      return items.hasOwnProperty(e) ? items[e] : e;
    });
  }
}

function isItemWithReference(item: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (item[v.value] === d[v.value] && !isNaN(item[v.value])) return true;
  if (item[v.type] === d.id) return true;
  return false;
}

function trimExplicitTypes(ifcLine: any, key: any) {
  const value = ifcLine[key][v.value];
  if (value) ifcLine[key] = value;
}

export { referenceEntities };
