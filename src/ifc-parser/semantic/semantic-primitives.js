import { getParser } from '../parser/parser-primitives.js';
import { formatDate, unicode } from './format.js';
import { ifcDataTypes as d } from '../../utils/ifc-data-types.js';
import {
  ifcBoolValues,
  ifcValueType as v,
  ifcUnitsValue as i
} from '../../utils/global-constants.js';

//Each method retrieves information from a given parsed data type

const semanticUnits = {
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
  [d.valueSet]: getValueSet
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
    [d.id]: 0,
    [d.text]: 0,
    [d.number]: 0,
    [d.enum]: 0,
    [d.idSet]: 0,
    [d.numSet]: 0,
    [d.value]: 0,
    [d.textSet]: 0,
    [d.bool]: 0,
    [d.valueSet]: 0
  };
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
  return getSet(parsed, d.textSet, d.text, (e) => unicode(e.image.slice(1, -1)));
}

function getIdSet(parsed) {
  return getSet(parsed, d.idSet, d.id, (e) => Number(e.image.slice(1)));
}

function getNumberSet(parsed) {
  return getSet(parsed, d.numSet, d.number, (e) => Number(e.image));
}

function getValueSet(parsed) {
  const valueSet = parsed[getParser(d.valueSet)][counter[d.valueSet]++];
  const values = valueSet.children[getParser(d.value)];
  return values.map((ifcValue) => {
    const valueProps = ifcValue.children;
    let type = getIfcValueType(valueProps);
    const value = valueProps[type][0].image;
    const formattedValue = formatIfcValue(type, value);
    const unit = valueProps[d.value] ? valueProps[d.value][0].image : getTypeName(type);
    return { [i.value]: formattedValue, [i.unit]: unit };
  });
}

function getIfcValue(parsed) {
  if (isDefaultValue(parsed, d.value)) return getDefault(parsed, d.value);
  if (isExpressId(parsed, d.value)) return getIfcValueId(parsed, d.value);
  const data = parsed[getParser(d.value)][counter[d.value]].children;
  let type = getIfcValueType(data);
  const value = formatIfcValue(type, getIfcValueValue(parsed, type));
  const unit = getIfcUnit(parsed) || getTypeName(type);
  return { [i.value]: value, [i.unit]: unit };
}

function getTypeName(type){
  return type.toString();
}

function getEmptySet(type) {
  counter[type]++;
  return [];
}

function getAsterisk() {
  return '*';
}

function getValue(parsed, type, formatFunction) {
  try {
    if (isDefaultValue(parsed, type)) return getDefault(parsed, type);
    return formatFunction(extract(parsed, type));
  } catch (e) {
    return getAsterisk();
  }
}

function getSet(parsed, type, subtype, mapFunction) {
  if (isDefaultValue(parsed, type)) return getDefault(parsed, type);
  if (isEmptySet(parsed, type, subtype)) return getEmptySet(type);
  return parsed[getParser(type)][counter[type]++].children[subtype].map(mapFunction);
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
  return parsed[getParser(type)][counter[type]].children[d.default] ? true : false;
}

function isEmptySet(parsed, type, subtype) {
  return parsed[getParser(type)][counter[type]].children[subtype] ? false : true;
}

function getDefault(parsed, type) {
  return parsed[getParser(type)][counter[type]++].children[d.default][0].image;
}

function isExpressId(parsed, type) {
  return parsed[getParser(type)][counter[type]].children[d.id] ? true : false;
}

function getIfcValueId(parsed, type) {
  const rawId = parsed[getParser(type)][counter[type]++].children[d.id][0].image;
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
  if (type === v.id) return formatId(value);
  return value;
}

function getIfcValueType(data) {
  if (data[d.number]) return v.number;
  if (data[d.text]) return v.text;
  if (data[d.bool]) return v.bool;
  if (data[d.id]) return v.id;
  return v.enum;
}

function getIfcUnit(parsed) {
  const ifcUnit = parsed[getParser(d.value)][counter[d.value]].children[d.value]
    ? parsed[getParser(d.value)][counter[d.value]].children[d.value][0].image
    : '';
  counter[d.value]++;
  return ifcUnit;
}

export { resetSemanticFactory, getProperty };
