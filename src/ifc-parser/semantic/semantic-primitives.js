import { formatDate, solveUnicode } from "../utils/format.js";
import { ifcBoolValues, ifcValueType } from "../utils/globalProperties.js";

//Each method retrieves information from a given parsed data type

function getGuid(parsed) {
  return parsed._IfcGuid[counter["guid"]++].children.IfcGuid[0].image.slice(
    1,
    -1
  );
}

function getAsterisk() {
  return "*";
}

function getBool(parsed) {
  if (parsed._IfcBool[counter["bool"]].children.DefaultValue)
    parsed._IfcBool[counter["bool"]++].children.DefaultValue[0].image;

  const ifcBool = parsed._IfcBool[counter["bool"]++].children.Boolean[0].image;

  return ifcBool === ifcBoolValues.trueValue ? true : false;
}

function getEnum(parsed) {
  return parsed._IfcEnum[counter["ifcEnum"]].children.DefaultValue
    ? parsed._IfcEnum[counter["ifcEnum"]++].children.DefaultValue[0].image
    : parsed._IfcEnum[counter["ifcEnum"]++].children.Enum[0].image.slice(1, -1);
}

function getNumber(parsed) {
  return parsed._Number[counter["number"]].children.DefaultValue
    ? parsed._Number[counter["number"]++].children.DefaultValue[0].image
    : Number(parsed._Number[counter["number"]++].children.Number[0].image);
}

function getDate(parsed) {
  return formatDate(getNumber(parsed));
}

function getExpressId(parsed) {
  return parsed._IfcExpressId[counter["expressId"]].children.DefaultValue
    ? parsed._IfcExpressId[counter["expressId"]++].children.DefaultValue[0]
        .image
    : Number(
        parsed._IfcExpressId[
          counter["expressId"]++
        ].children.ExpressId[0].image.slice(1)
      );
}

function getIfcText(parsed) {
  if (parsed._IfcText[counter["ifcText"]].children.DefaultValue)
    return parsed._IfcText[counter["ifcText"]++].children.DefaultValue[0].image;

  if (parsed._IfcText[counter["ifcText"]].children.EmptyText) {
    counter["ifcText"]++;
    return "";
  }

  return solveUnicode(
    parsed._IfcText[counter["ifcText"]++].children.Text[0].image.slice(1, -1)
  );
}

function getTextSet(parsed) {
  if (parsed._TextSet[counter["textSet"]].children.DefaultValue)
    return parsed._TextSet[counter["textSet"]++].children.DefaultValue[0].image;

  if (parsed._TextSet[counter["textSet"]].children.Text)
    return parsed._TextSet[counter["textSet"]++].children.Text.map((e) =>
      solveUnicode(e.image.slice(1, -1))
    );

  counter["textSet"]++;
  return [];
}

function getIdSet(parsed) {
  if (parsed._IdSet[counter["idSet"]].children.DefaultValue)
    return parsed._IdSet[counter["idSet"]++].children.DefaultValue[0].image;

  if (parsed._IdSet[counter["idSet"]].children.ExpressId)
    return parsed._IdSet[counter["idSet"]++].children.ExpressId.map((e) =>
      Number(e.image.slice(1))
    );

  counter["idSet"]++;
  return [];
}

function getNumberSet(parsed) {
  if (parsed._NumberSet[counter["numberSet"]].children.Number)
    return parsed._NumberSet[counter["numberSet"]++].children.Number.map((e) =>
      Number(e.image)
    );

  counter["numberSet"]++;
  return [];
}

function getIfcValue(parsed) {
  if (parsed._IfcValue[counter["ifcValue"]].children.DefaultValue)
    return parsed._IfcValue[counter["ifcValue"]++].children.DefaultValue[0]
      .image;

  let type = getIfcValueType(parsed);
  let value = parsed._IfcValue[counter["ifcValue"]].children[type][0].image;
  value = formatIfcValue(value, type);

  return {
    Value: value,
    IfcUnit: parsed._IfcValue[counter["ifcValue"]++].children.IfcValue[0].image,
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
  return parsed._IfcValue[counter["ifcValue"]].children.Number
    ? ifcValueType.number
    : parsed._IfcValue[counter["ifcValue"]].children.Text
    ? ifcValueType.text
    : parsed._IfcValue[counter["ifcValue"]].children.Boolean
    ? ifcValueType.bool
    : ifcValueType.enum;
}

//The counter is necessary because chevrotain generates indexed
//parsed structures. F.e. if there are two enums in a IFC Class,
//the first one has index=1, the second one index=2, etc

let counter = {};

function resetSemanticFactory() {
  counter = {
    guid: 0,
    expressId: 0,
    ifcText: 0,
    number: 0,
    ifcEnum: 0,
    idSet: 0,
    numberSet: 0,
    ifcValue: 0,
    textSet: 0,
    bool: 0,
  };
}

export {
  resetSemanticFactory,
  getAsterisk,
  getGuid,
  getNumber,
  getDate,
  getNumberSet,
  getBool,
  getEnum,
  getExpressId,
  getIfcText,
  getTextSet,
  getIdSet,
  getIfcValue,
};
