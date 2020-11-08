import { getParser } from "../parser/parser-primitives.js";
import { formatDate, solveUnicode } from "../../utils/format.js";
import { ifcBoolValues, ifcValueType } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

//Each method retrieves information from a given parsed data type

const semanticUnits = {
  [d.guid]: getGuid,
  [d.id]: getExpressId,
  [d.idSet]: getIdSet,
  [d.text]: getIfcText,
  [d.textSet]: getTextSet,
  [d.number]: getNumber,
  [d.numberSet]: getNumberSet,
  [d.date]: getDate,
  [d.ifcValue]: getIfcValue,
  [d.bool]: getBool,
  [d.enum]: getEnum,
  [d.asterisk]: getAsterisk,
};

function getProperty(parsed, dataType) {
  return semanticUnits[dataType](parsed);
}

function getGuid(parsed) {
  return parsed[getParser(d.guid).name][
    counter[d.guid]++
  ].children.IfcGuid[0].image.slice(1, -1);
}

function getAsterisk() {
  return "*";
}

function getBool(parsed) {
  if (parsed[getParser(d.bool).name][counter[d.bool]].children.DefaultValue)
    parsed[getParser(d.bool).name][counter[d.bool]++].children.DefaultValue[0]
      .image;

  const ifcBool =
    parsed[getParser(d.bool).name][counter[d.bool]++].children.Boolean[0].image;

  return ifcBool === ifcBoolValues.trueValue ? true : false;
}

function getEnum(parsed) {
  return parsed[getParser(d.enum).name][counter[d.enum]].children.DefaultValue
    ? parsed[getParser(d.enum).name][counter[d.enum]++].children.DefaultValue[0]
        .image
    : parsed[getParser(d.enum).name][
        counter[d.enum]++
      ].children.Enum[0].image.slice(1, -1);
}

function getNumber(parsed) {
  return parsed[getParser(d.number).name][counter[d.number]].children
    .DefaultValue
    ? parsed[getParser(d.number).name][counter[d.number]++].children
        .DefaultValue[0].image
    : Number(
        parsed[getParser(d.number).name][counter[d.number]++].children.Number[0]
          .image
      );
}

function getDate(parsed) {
  return formatDate(getNumber(parsed));
}

function getExpressId(parsed) {
  return parsed[getParser(d.id).name][counter[d.id]].children.DefaultValue
    ? parsed[getParser(d.id).name][counter[d.id]++].children.DefaultValue[0]
        .image
    : Number(
        parsed[getParser(d.id).name][
          counter[d.id]++
        ].children.ExpressId[0].image.slice(1)
      );
}

function getIfcText(parsed) {
  if (parsed[getParser(d.text).name][counter[d.text]].children.DefaultValue)
    return parsed[getParser(d.text).name][counter[d.text]++].children
      .DefaultValue[0].image;

  if (parsed[getParser(d.text).name][counter[d.text]].children.EmptyText) {
    counter[d.text]++;
    return "";
  }

  return solveUnicode(
    parsed[getParser(d.text).name][
      counter[d.text]++
    ].children.Text[0].image.slice(1, -1)
  );
}

function getTextSet(parsed) {
  if (
    parsed[getParser(d.textSet).name][counter[d.textSet]].children.DefaultValue
  )
    return parsed[getParser(d.textSet).name][counter[d.textSet]++].children
      .DefaultValue[0].image;

  if (parsed[getParser(d.textSet).name][counter[d.textSet]].children.Text)
    return parsed[getParser(d.textSet).name][
      counter[d.textSet]++
    ].children.Text.map((e) => solveUnicode(e.image.slice(1, -1)));

  counter[d.textSet]++;
  return [];
}

function getIdSet(parsed) {
  if (parsed[getParser(d.idSet).name][counter[d.idSet]].children.DefaultValue)
    return parsed[getParser(d.idSet).name][counter[d.idSet]++].children
      .DefaultValue[0].image;

  if (parsed[getParser(d.idSet).name][counter[d.idSet]].children.ExpressId)
    return parsed[getParser(d.idSet).name][
      counter[d.idSet]++
    ].children.ExpressId.map((e) => Number(e.image.slice(1)));

  counter[d.idSet]++;
  return [];
}

function getNumberSet(parsed) {
  if (parsed[getParser(d.numberSet).name][counter[d.numberSet]].children.Number)
    return parsed[getParser(d.numberSet).name][
      counter[d.numberSet]++
    ].children.Number.map((e) => Number(e.image));

  counter[d.numberSet]++;
  return [];
}

function getIfcValue(parsed) {
  if (
    parsed[getParser(d.ifcValue).name][counter[d.ifcValue]].children
      .DefaultValue
  )
    return parsed[getParser(d.ifcValue).name][counter[d.ifcValue]++].children
      .DefaultValue[0].image;

  if (
    parsed[getParser(d.ifcValue).name][counter[d.ifcValue]].children.ExpressId
  )
    return Number(
      parsed[getParser(d.ifcValue).name][
        counter[d.ifcValue]++
      ].children.ExpressId[0].image.slice(1)
    );

  let type = getIfcValueType(parsed);
  let value =
    parsed[getParser(d.ifcValue).name][counter[d.ifcValue]].children[type][0]
      .image;
  value = formatIfcValue(value, type);

  return {
    Value: value,
    IfcUnit: getIfcUnit(parsed),
  };
}

function formatIfcValue(value, type) {
  if (type === ifcValueType.number) return Number(value);
  if (type === ifcValueType.text) return solveUnicode(value.slice(1, -1));
  if (type === ifcValueType.bool)
    return value === ifcBoolValues.trueValue ? true : false;
  return value;
}

function getIfcValueType(parsed) {
  return parsed[getParser(d.ifcValue).name][counter[d.ifcValue]].children.Number
    ? ifcValueType.number
    : parsed[getParser(d.ifcValue).name][counter[d.ifcValue]].children.Text
    ? ifcValueType.text
    : parsed[getParser(d.ifcValue).name][counter[d.ifcValue]].children.Boolean
    ? ifcValueType.bool
    : ifcValueType.enum;
}

function getIfcUnit(parsed) {
  const ifcUnit = parsed[getParser(d.ifcValue).name][counter[d.ifcValue]]
    .children.IfcValue
    ? parsed[getParser(d.ifcValue).name][counter[d.ifcValue]].children
        .IfcValue[0].image
    : "";
  counter[d.ifcValue]++;
  return ifcUnit;
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
    [d.numberSet]: 0,
    [d.ifcValue]: 0,
    [d.textSet]: 0,
    [d.bool]: 0,
  };
}

export { resetSemanticFactory, getProperty };
