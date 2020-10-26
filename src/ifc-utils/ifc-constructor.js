import { regexp } from "./items-parser";

function baseConstructor(caller, ifcLine, classToConstruct) {
  return containsDefaultValue(ifcLine)
    ? getDefaultValue(caller, ifcLine)
    : new classToConstruct(caller.finder, ifcLine);
}

function baseMultiConstructor(caller, classToConstruct) {
  return caller.isEmptySet()
    ? caller.extractEmptySet()
    : instantiateClasses(caller, classToConstruct);
}

function containsDefaultValue(ifcLine) {
  return regexp.defaultValue.test(ifcLine);
}

function getDefaultValue(caller, ifcLine) {
  return caller.parser.getDefaultValue(ifcLine);
}

function instantiateClasses(caller, classToConstruct) {
  return caller.extractIdSet().map((e) => {
    return new classToConstruct(caller.finder, e);
  });
}

export { baseConstructor, baseMultiConstructor };
