import { getDefaultValue, isDefaultValue } from "./ifc-property-constants";

function baseConstructor(caller, classToConstruct) {
  return caller.isDefaultValue()
    ? caller.extractDefaultValue()
    : new classToConstruct(caller.getFinder(), caller.extractId());
}

function baseConstructorNoExtraction(caller, classToConstruct, ifcLine) {
  return isDefaultValue(ifcLine)
    ? getDefaultValue(ifcLine)
    : new classToConstruct(caller.getFinder(), ifcLine);
}

function baseMultiConstructor(caller, classToConstruct) {
  return caller.isEmptySet()
    ? caller.extractEmptySet()
    : caller.extractIdSet().map((e) => {
        return new classToConstruct(caller.getFinder(), e);
      });
}

export { baseConstructor, baseConstructorNoExtraction, baseMultiConstructor };
