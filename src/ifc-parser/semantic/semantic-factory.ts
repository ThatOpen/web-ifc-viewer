import { isDataTypeValid } from "../../utils/ifc-data-types.js";
import { typeValue, namedProps as n } from "../../utils/global-constants.js";
import { getProperty, resetSemanticFactory } from "./semantic-primitives.js";

//Uses semantic primitives according to the data type of each property

function newSemantic(parsed: any, ifcItem: any) {
  resetSemanticFactory();
  const result = retrieveIfcObjectProperties(parsed, ifcItem);
  addClassName(result, ifcItem);
  cleanUndefinedProperties(result);
  return result;
}

function retrieveIfcObjectProperties(parsed: any, ifcItem: any) {
  const result = {};
  Object.keys(ifcItem).forEach((e) => {
    if (isDataTypeValid(ifcItem[e]))
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      result[e] = newSemanticUnit(parsed, ifcItem[e]);
  });
  return result;
}

function newSemanticUnit(parsed: any, dataType: any) {
  return {
    [typeValue.value]: getProperty(parsed, dataType),
    [typeValue.type]: dataType,
  };
}

function addClassName(result: any, ifcItem: any) {
  result[n.ifcClass] = ifcItem[n.ifcClass];
}

function cleanUndefinedProperties(ifcItem: any) {
  if (ifcItem.hasOwnProperty([n.undefined])) delete ifcItem[n.undefined];
}

export { newSemantic };
