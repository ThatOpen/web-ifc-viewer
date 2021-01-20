import { namedProps as n } from "../../utils/global-constants.js";
import { ifcTypes } from "../../utils/ifc-types.js";

const typesParserMap = {};

function newObject(ifcObject: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  typesParserMap[ifcTypes[ifcObject[n.ifcClass]]] = ifcObject;
}

function parserByType(ifcType: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return typesParserMap[ifcType];
}

export { parserByType, typesParserMap, newObject };
