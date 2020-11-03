import { ifcTypes } from "../utils/ifc-types.js";

function parserByType(ifcType) {
  const typesParserMap = {
    [ifcTypes.IfcProject]: "IfcProject_Parser",
    [ifcTypes.IfcSite]: "IfcSite_Parser",
    [ifcTypes.IfcBuilding]: "IfcBuilding_Parser",
  };
  return typesParserMap[ifcType];
}

export { parserByType };
