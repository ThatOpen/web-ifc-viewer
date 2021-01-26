import { isDataTypeValid } from '../../utils/ifc-data-types.js';
import { typeValue, namedProps as n } from '../../utils/global-constants.js';
import { getProperty, resetSemanticFactory } from './semantic-primitives.js';

//Uses semantic primitives according to the data type of each property

function newSemantic(parsed, ifcItem) {
  resetSemanticFactory();
  const result = retrieveIfcObjectProperties(parsed, ifcItem);
  addClassName(result, ifcItem);
  cleanUndefinedProperties(result);
  return result;
}

function retrieveIfcObjectProperties(parsed, ifcItem) {
  const result = {};
  Object.keys(ifcItem).forEach((e) => {
    if (isDataTypeValid(ifcItem[e])) result[e] = newSemanticUnit(parsed, ifcItem[e]);
  });
  return result;
}

function newSemanticUnit(parsed, dataType) {
  return {
    [typeValue.value]: getProperty(parsed, dataType),
    [typeValue.type]: dataType
  };
}

function addClassName(result, ifcItem) {
  result[n.ifcClass] = ifcItem[n.ifcClass];
}

function cleanUndefinedProperties(ifcItem) {
  Object.keys(ifcItem).forEach((prop) => {
    if (prop.includes(n.undefined)){
      delete ifcItem[prop];
    } 
  });
}

export { newSemantic };
