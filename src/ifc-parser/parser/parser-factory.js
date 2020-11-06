import { vocabulary as v } from "../lexer/lexer.js";
import { primitiveParsers } from "./parser-primitives.js";
import { isDataTypeValid, getAllDataTypes } from "../utils/ifc-data-types.js";

//Creates a syntactical structure (RULEs) given an IFC Class

function createNewParser($, ifcItem) {
  resetParserFactory();
  $.CONSUME(v.OpenPar);
  createRulesForAllProperties($, ifcItem);
  $.CONSUME(v.ClosePar);
}

function createRulesForAllProperties($, ifcItem) {
  Object.values(ifcItem).forEach((dataType) => {
    if (isDataTypeValid(dataType)) newRule($, dataType);
  });
}

function newRule($, dataType) {
  const rule = `SUBRULE${getIndex(dataType)}`;
  updateCounter(dataType);
  return $[rule]($[primitiveParsers[dataType].name]);
}

//The counter is necessary because chevrotain cannot have
//multiple identical SUBRULES. The repeated methods need to be
//followed by a suffix (f.e. SUBRULE(X), SUBRULE2(X), ...)

let counter = {};

function resetParserFactory() {
  counter = {};
  getAllDataTypes().forEach((e) => {
    counter[e] = 0;
  });
}

function getIndex(dataType) {
  return counter[dataType] === 0 ? "" : counter[dataType];
}

function updateCounter(dataType) {
  counter[dataType]++;
}

export { createNewParser as newParser, resetParserFactory };
