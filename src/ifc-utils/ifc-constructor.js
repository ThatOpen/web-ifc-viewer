import { getDefaultValue, isDefaultValue } from "./items-parser";

function baseConstructor(caller, ifcLine, classToConstruct) {
  return isDefaultValue(ifcLine)
    ? getDefaultValue(ifcLine)
    : new classToConstruct(caller.getFinder(), ifcLine);
}

function baseMultiConstructor(caller, classToConstruct) {
  return caller.isEmptySet()
    ? caller.extractEmptySet()
    : instantiateClasses(caller, classToConstruct);
}

function instantiateClasses(caller, classToConstruct) {
  return caller.extractIdSet().map((e) => {
    return new classToConstruct(caller.getFinder(), e);
  });
}

export { baseConstructor, baseMultiConstructor };
