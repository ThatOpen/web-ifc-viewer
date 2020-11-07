import { ifcClass } from "../../utils/globalProperties.js";
import { ifcTypes } from "../../utils/ifc-types.js";

const typesParserMap = {};

function newObject(ifcObject) {
  typesParserMap[ifcTypes[ifcObject[ifcClass]]] = ifcObject;
}

function parserByType(ifcType) {
  return typesParserMap[ifcType];
}

export { parserByType, typesParserMap, newObject };
