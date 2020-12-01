import { getParser } from "../parser/parser-primitives.js";
import { formatDate, unicode } from "../../utils/format.js";
import {
  ifcBoolValues,
  ifcValueType as v,
} from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

//Each method retrieves information from a given parsed data type

const semanticUnits = {
  [d.guid]: getGuid,
  [d.id]: getExpressId,
  [d.idSet]: getIdSet,
  [d.text]: getIfcText,
  [d.textSet]: getTextSet,
  [d.number]: getNumber,
  [d.numSet]: getNumberSet,
  [d.date]: getDate,
  [d.value]: getIfcValue,
  [d.bool]: getBool,
  [d.enum]: getEnum,
  [d.asterisk]: getAsterisk,
};

function getProperty(parsed, type) {
  return semanticUnits[type](parsed);
}

//The counter is necessary because chevrotain generates indexed
//parsed structures. F.e. if there are two enums in a IFC Class,
//the first one has index=1, the second one index=2, etc

let counter = {};

function resetSemanticFactory() {
  counter = {
    [d.guid]: 0,
    [d.id]: 0,
    [d.text]: 0,
    [d.number]: 0,
    [d.enum]: 0,
    [d.idSet]: 0,
    [d.numSet]: 0,
    [d.value]: 0,
    [d.textSet]: 0,
    [d.bool]: 0,
  };
}

function getGuid(parsed) {
  return extract(parsed, d.guid).slice(1, -1);
}

function getBool(parsed) {
  return getValue(parsed, d.bool, formatBool);
}

function getEnum(parsed) {
  return getValue(parsed, d.enum, formatEnum);
}

function getNumber(parsed) {
  return getValue(parsed, d.number, formatNumber);
}

function getDate(parsed) {
  return formatDate(getNumber(parsed));
}

function getExpressId(parsed) {
  return getValue(parsed, d.id, formatId);
}

function getIfcText(parsed) {
  return getValue(parsed, d.text, formatText);
}

function getTextSet(parsed) {
  return getSet(parsed, d.textSet, d.text, (e) =>
    unicode(e.image.slice(1, -1))
  );
}

function getIdSet(parsed) {
  return getSet(parsed, d.idSet, d.id, (e) => Number(e.image.slice(1)));
}

function getNumberSet(parsed) {
  return getSet(parsed, d.numSet, d.number, (e) => Number(e.image));
}

function getIfcValue(parsed) {
  if (isDefaultValue(parsed, d.value)) return getDefault(parsed, d.value);
  if (isExpressId(parsed, d.value)) return getIfcValueId(parsed, d.value);
  let type = getIfcValueType(parsed);
  const value = formatIfcValue(type, getIfcValueValue(parsed, type));
  return { Value: value, IfcUnit: getIfcUnit(parsed) };
}

function getEmptySet(type) {
  counter[type]++;
  return [];
}

function getAsterisk() {
  return "*";
}

function getValue(parsed, type, formatFunction) {
  if (isDefaultValue(parsed, type)) return getDefault(parsed, type);
  return formatFunction(extract(parsed, type));
}

function getSet(parsed, type, subtype, mapFunction) {
  if (isDefaultValue(parsed, type)) return getDefault(parsed, type);
  if (isEmptySet(parsed, type, subtype)) return getEmptySet(type);
  return parsed[getParser(type)][counter[type]++].children[subtype].map(
    mapFunction
  );
}

function extract(parsed, type) {
  return getContent(parsed[getParser(type)], type);
}

function getContent(subParsed, type) {
  return subParsed[counter[type]++].children[type][0].image;
}

function formatId(id) {
  return Number(id.slice(1));
}

function formatText(text) {
  return unicode(text.slice(1, -1));
}

function formatNumber(number) {
  return Number(number);
}

function formatBool(bool) {
  return bool === ifcBoolValues.trueValue ? true : false;
}

function formatEnum(enumValue) {
  return enumValue.slice(1, -1);
}

function isDefaultValue(parsed, type) {
  return parsed[getParser(type)][counter[type]].children[d.default]
    ? true
    : false;
}

function isEmptySet(parsed, type, subtype) {
  return parsed[getParser(type)][counter[type]].children[subtype]
    ? false
    : true;
}

function getDefault(parsed, type) {
  return parsed[getParser(type)][counter[type]++].children[d.default][0].image;
}

function isExpressId(parsed, type) {
  return parsed[getParser(type)][counter[type]].children[d.id] ? true : false;
}

function getIfcValueId(parsed, type) {
  const rawId =
    parsed[getParser(type)][counter[type]++].children[d.id][0].image;
  return Number(rawId.slice(1));
}

function getIfcValueValue(parsed, type) {
  return parsed[getParser(d.value)][counter[d.value]].children[type][0].image;
}

function formatIfcValue(type, value) {
  if (type === v.number) return formatNumber(value);
  if (type === v.text) return formatText(value);
  if (type === v.bool) return formatBool(value);
  if (type === v.enum) return formatEnum(value);
  return value;
}

function getIfcValueType(parsed) {
  const data = parsed[getParser(d.value)][counter[d.value]].children;
  if (data[d.number]) return v.number;
  if (data[d.text]) return v.text;
  if (data[d.bool]) return v.bool;
  return v.enum;
}

function getIfcUnit(parsed) {
  const ifcUnit = parsed[getParser(d.value)][counter[d.value]].children[d.value]
    ? parsed[getParser(d.value)][counter[d.value]].children[d.value][0].image
    : "";
  counter[d.value]++;
  return ifcUnit;
}

export { resetSemanticFactory, getProperty };
