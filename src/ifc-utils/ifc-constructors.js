import { getDefaultValue, isDefaultValue } from "./ifc-property-constants";

function baseConstructor(caller, classToConstruct, ifcLine) {
  if (isDefaultValue(ifcLine)) return getDefaultValue(ifcLine);
  if (caller.isLoaded(ifcLine)) return caller.getLoaded(ifcLine);
  return new classToConstruct(caller.getFinder(), ifcLine);
}

function baseMultiConstructor(caller, classToConstruct) {
  if (caller.isEmptySet()) return caller.extractEmptySet();
  return caller.extractIdSet().map((e) => {
    if (caller.isLoaded(e)) return caller.getLoaded(e);
    return new classToConstruct(caller.getFinder(), e);
  });
}

const constructorsByType = {};

function registerConstructorByType(type, constructor) {
  constructorsByType[type] = constructor;
}

function getItemByType(caller, ifcLine) {
  if (isDefaultValue(ifcLine)) return getDefaultValue(ifcLine);
  return constructorsByType[ifcLine.type](caller, ifcLine);
}

export {
  baseConstructor,
  baseMultiConstructor,
  registerConstructorByType,
  getItemByType,
};
