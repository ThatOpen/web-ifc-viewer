import { ifcDataTypes as d, isDataTypeValid } from "../utils/ifc-data-types.js";
import { ifcClass, undefined } from "../utils/globalProperties.js";
import {
  getGuid,
  getAsterisk,
  getExpressId,
  getIfcText,
  getIdSet,
  getNumber,
  getIfcValue,
  getEnum,
  getNumberSet,
  getDate,
  getTextSet,
  resetSemanticFactory,
  getBool,
} from "./semantic-primitives.js";

//Chooses the semantic primitive correspondant to the given data type

function newSemantic(parsed, ifcItem) {
  resetSemanticFactory();
  const result = {};
  Object.keys(ifcItem).forEach((e) => {
    if (isDataTypeValid(ifcItem[e]))
      result[e] = newSemanticUnit(parsed, ifcItem[e]);
  });
  result[ifcClass] = ifcItem[ifcClass];
  clean(result);
  return result;
}

function newSemanticUnit(parsed, dataType) {
  const semanticUnits = {
    [d.guid]: getGuid,
    [d.id]: getExpressId,
    [d.idSet]: getIdSet,
    [d.text]: getIfcText,
    [d.textSet]: getTextSet,
    [d.number]: getNumber,
    [d.numberSet]: getNumberSet,
    [d.date]: getDate,
    [d.ifcValue]: getIfcValue,
    [d.bool]: getBool,
    [d.enum]: getEnum,
    [d.asterisk]: getAsterisk,
  };
  return { value: semanticUnits[dataType](parsed), type: dataType };
}

function clean(ifcItem) {
  if (ifcItem.hasOwnProperty([undefined])) delete ifcItem[undefined];
}

export { newSemanticUnit as get, newSemantic };
