import { vocabulary as v } from "../lexer/lexer.js";
import { ifcDataTypes as d } from "../utils/ifc-data-types.js";

function newParser($, ifcItem) {
  resetParserFactory();
  $.CONSUME(v.OpenPar);
  Object.values(ifcItem).forEach((dataType) => {
    newRule($, dataType);
  });
  $.CONSUME(v.ClosePar);
}

function newRule($, dataType) {
  const ruleMap = {
    [d.guid]: $._IfcGuid,
    [d.id]: $._IfcExpressId,
    [d.idSet]: $._IdSet,
    [d.text]: $._IfcText,
    [d.textSet]: $._TextSet,
    [d.number]: $._Number,
    [d.date]: $._Number,
    [d.numberSet]: $._NumberSet,
    [d.enum]: $._IfcEnum,
    [d.ifcValue]: $._IfcValue,
    [d.asterisk]: $._Asterisk,
  };
  const rule = `SUBRULE${getIndex(dataType)}`;
  counter[dataType]++;
  return $[rule](ruleMap[dataType]);
}

function getIndex(dataType) {
  return counter[dataType] === 0 ? "" : counter[dataType];
}

let counter = {};

function resetParserFactory() {
  counter = {
    [d.guid]: 0,
    [d.id]: 0,
    [d.idSet]: 0,
    [d.text]: 0,
    [d.textSet]: 0,
    [d.number]: 0,
    [d.date]: 0,
    [d.numberSet]: 0,
    [d.enum]: 0,
    [d.ifcValue]: 0,
    [d.asterisk]: 0,
  };
}

export { newParser, resetParserFactory };
