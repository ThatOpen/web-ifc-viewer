import { ifcUnitsValue as i, typeValue as v } from '../../utils/global-constants.js';
import { ifcDataTypes as d } from '../../utils/ifc-data-types.js';

//This module substitutes the IDs of the loaded entities by the actual entity with that ID

function bindEntities(items) {
  for (let item in items) {
    const ifcItem = items[item];
    for (let property in ifcItem) {
      bindProperty(ifcItem[property], items);
      trimExplicitTypes(ifcItem, property);
    }
  }
}

function bindProperty(ifcProperty, items) {
  bindIdProperty(ifcProperty, items);
  bindIdSetProperty(ifcProperty, items);
  bindValueSetProperty(ifcProperty, items);
}

function bindIdProperty(ifcProperty, items) {
  const id = ifcProperty[v.value];
  if (ifcProperty[v.type] === d.id && items.hasOwnProperty(id)) ifcProperty[v.value] = items[id];
}

function bindIdSetProperty(ifcProperty, items) {
  if (ifcProperty[v.type] === d.idSet) {
    const values = [...ifcProperty[v.value]];
    ifcProperty[v.value] = values.map((e) => (items.hasOwnProperty(e) ? items[e] : e));
  }
}

//IfcValues can also contains IDs (not always)

function bindValueSetProperty(ifcProperty, items) {
  if (ifcProperty[v.type] === d.valueSet && ifcProperty[v.value][0][i.unit] === d.id)
    ifcProperty[v.value] = ifcProperty[v.value].map((e) => {
      if (items.hasOwnProperty(e[i.value])) e[i.value] = items[e[i.value]];
      return e;
    });
}

function trimExplicitTypes(ifcLine, key) {
  const value = ifcLine[key][v.value];
  if (value) ifcLine[key] = value;
}

export { bindEntities };
