import { ifcDataTypes as d, isDataTypeValid } from "../utils/ifc-data-types.js";
import { ifcClass, undefined } from "../utils/globalProperties.js";
import {
  getSemanticUnit,
  resetSemanticFactory,
} from "./semantic-primitives.js";

//Uses semantic primitives according to the data type of each property

function newSemantic(parsed, ifcItem) {
  resetSemanticFactory();
  const result = getObjectProperties(parsed, ifcItem);
  addClassName(result, ifcItem);
  cleanUndefinedProperties(result);
  return result;
}

function getObjectProperties(parsed, ifcItem) {
  const result = {};
  Object.keys(ifcItem).forEach((e) => {
    if (isDataTypeValid(ifcItem[e]))
      result[e] = newSemanticUnit(parsed, ifcItem[e]);
  });
  return result;
}

function newSemanticUnit(parsed, dataType) {
  return { value: getSemanticUnit(parsed, dataType), type: dataType };
}

function addClassName(result, ifcItem) {
  result[ifcClass] = ifcItem[ifcClass];
}

function cleanUndefinedProperties(ifcItem) {
  if (ifcItem.hasOwnProperty([undefined])) delete ifcItem[undefined];
}

export { newSemantic };
