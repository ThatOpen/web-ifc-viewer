import { getParser } from "../parser/parser-primitives.js";
import { formatDate, unicode } from "./format.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  ifcBoolValues,
  ifcValueType as v,
  ifcUnitsValue as i 
} from "../../utils/global-constants.js";

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
  [d.valueSet]: getValueSet,
};

function getProperty(parsed: any, type: any) {
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
    [d.valueSet]: 0,
  };
}

function getBool(parsed: any) {
  return getValue(parsed, d.bool, formatBool);
}

function getEnum(parsed: any) {
  return getValue(parsed, d.enum, formatEnum);
}

function getNumber(parsed: any) {
  return getValue(parsed, d.number, formatNumber);
}

function getDate(parsed: any) {
  return formatDate(getNumber(parsed));
}

function getExpressId(parsed: any) {
  return getValue(parsed, d.id, formatId);
}

function getIfcText(parsed: any) {
  return getValue(parsed, d.text, formatText);
}

function getTextSet(parsed: any) {
  return getSet(parsed, d.textSet, d.text, (e: any) => unicode(e.image.slice(1, -1))
  );
}

function getIdSet(parsed: any) {
  return getSet(parsed, d.idSet, d.id, (e: any) => Number(e.image.slice(1)));
}

function getNumberSet(parsed: any) {
  return getSet(parsed, d.numSet, d.number, (e: any) => Number(e.image));
}

function getValueSet(parsed: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const valueSet = parsed[getParser(d.valueSet)][counter[d.valueSet]++];
  const values = valueSet.children[getParser(d.value)];
  return values.map((ifcValue: any) => {
    const valueProps = ifcValue.children;
    let type = getIfcValueType(valueProps);
    const value = valueProps[type][0].image;
    const formattedValue = formatIfcValue(type, value);
    const unit = valueProps[d.value] ? valueProps[d.value][0].image : "";
    return { [i.value]: formattedValue, [i.unit]: unit };
  });
}

function getIfcValue(parsed: any) {
  if (isDefaultValue(parsed, d.value)) return getDefault(parsed, d.value);
  if (isExpressId(parsed, d.value)) return getIfcValueId(parsed, d.value);
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const data = parsed[getParser(d.value)][counter[d.value]].children;
  let type = getIfcValueType(data);
  const value = formatIfcValue(type, getIfcValueValue(parsed, type));
  return { Value: value, IfcUnit: getIfcUnit(parsed) };
}

function getEmptySet(type: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  counter[type]++;
  return [];
}

function getAsterisk() {
  return "*";
}

function getValue(parsed: any, type: any, formatFunction: any) {
  if (isDefaultValue(parsed, type)) return getDefault(parsed, type);
  return formatFunction(extract(parsed, type));
}

function getSet(parsed: any, type: any, subtype: any, mapFunction: any) {
  if (isDefaultValue(parsed, type)) return getDefault(parsed, type);
  if (isEmptySet(parsed, type, subtype)) return getEmptySet(type);
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return parsed[getParser(type)][counter[type]++].children[subtype].map(
    mapFunction
  );
}

function extract(parsed: any, type: any) {
  return getContent(parsed[getParser(type)], type);
}

function getContent(subParsed: any, type: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return subParsed[counter[type]++].children[type][0].image;
}

function formatId(id: any) {
  return Number(id.slice(1));
}

function formatText(text: any) {
  return unicode(text.slice(1, -1));
}

function formatNumber(number: any) {
  return Number(number);
}

function formatBool(bool: any) {
  return bool === ifcBoolValues.trueValue ? true : false;
}

function formatEnum(enumValue: any) {
  return enumValue.slice(1, -1);
}

function isDefaultValue(parsed: any, type: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return parsed[getParser(type)][counter[type]].children[d.default]
    ? true
    : false;
}

function isEmptySet(parsed: any, type: any, subtype: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return parsed[getParser(type)][counter[type]].children[subtype]
    ? false
    : true;
}

function getDefault(parsed: any, type: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return parsed[getParser(type)][counter[type]++].children[d.default][0].image;
}

function isExpressId(parsed: any, type: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return parsed[getParser(type)][counter[type]].children[d.id] ? true : false;
}

function getIfcValueId(parsed: any, type: any) {
  const rawId =
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    parsed[getParser(type)][counter[type]++].children[d.id][0].image;
  return Number(rawId.slice(1));
}

function getIfcValueValue(parsed: any, type: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return parsed[getParser(d.value)][counter[d.value]].children[type][0].image;
}

function formatIfcValue(type: any, value: any) {
  if (type === v.number) return formatNumber(value);
  if (type === v.text) return formatText(value);
  if (type === v.bool) return formatBool(value);
  if (type === v.enum) return formatEnum(value);
  return value;
}

function getIfcValueType(data: any) {
  if (data[d.number]) return v.number;
  if (data[d.text]) return v.text;
  if (data[d.bool]) return v.bool;
  return v.enum;
}

function getIfcUnit(parsed: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const ifcUnit = parsed[getParser(d.value)][counter[d.value]].children[d.value]
    ? // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      parsed[getParser(d.value)][counter[d.value]].children[d.value][0].image
    : "";
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  counter[d.value]++;
  return ifcUnit;
}

export { resetSemanticFactory, getProperty };
