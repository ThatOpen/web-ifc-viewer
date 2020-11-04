import { ifcDataTypes as d } from "../utils/ifc-data-types.js";
import { undefined } from "../utils/undefined.js";
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
} from "./semantic-primitives.js";

function newSemantic(parsed, ifcItem, name) {
  resetSemanticFactory();
  const result = {};
  Object.keys(ifcItem).forEach((e) => {
    result[e] = get(parsed, ifcItem[e]);
  });
  clean(result);
  return { IfcType: name, ...result };
}

function get(parsed, dataType) {
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
    [d.enum]: getEnum,
    [d.asterisk]: getAsterisk,
  };
  return { value: semanticUnits[dataType](parsed), type: dataType };
}

function clean(ifcItem) {
  if (ifcItem.hasOwnProperty([undefined])) return delete ifcItem[undefined];
}

export { get, newSemantic };
