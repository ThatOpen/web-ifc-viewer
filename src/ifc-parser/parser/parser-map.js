import { namedProps as n } from "../../utils/global-constants.js";
import { ifcTypes } from "../../utils/ifc-types.js";

const typesParserMap = {};

function newObject(ifcObject) {
  typesParserMap[ifcTypes[ifcObject[n.ifcClass]]] = ifcObject;
}

function parserByType(ifcType) {
  return typesParserMap[ifcType];
}

export { parserByType, typesParserMap, newObject };
