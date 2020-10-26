import { regexp } from "./items-parser";

function baseConstructor(caller, ifcLine, classToConstruct) {
  return regexp.defaultValue.test(ifcLine)
    ? caller.parser.getDefaultValue(ifcLine)
    : new classToConstruct(caller.finder, ifcLine);
}

function baseMultiConstructor(caller, classToConstruct) {
  return caller.isEmptySet()
    ? caller.extractEmptySet()
    : caller.extractIdSet().map((e) => {
        return new classToConstruct(caller.finder, e);
      });
}

export { baseConstructor, baseMultiConstructor };
