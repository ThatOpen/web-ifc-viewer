import { ifcTypes } from "../utils/ifc-types.js";

function parserByType(ifcType) {
  const typesParserMap = {
    [ifcTypes.IfcProject]: "IfcProject_Parser",
  };
  return typesParserMap[ifcType];
}

export { parserByType };
