let counter = {};

function resetCounter() {
  counter = {
    guid: 0,
    expressId: 0,
    ifcText: 0,
    number: 0,
    ifcEnum: 0,
    idSet: 0,
    numberSet: 0,
  };
}

function getGuid(parsed) {
  const result = parsed.IfcGuid_Primitive[
    counter["guid"]
  ].children.IfcGuid[0].image.slice(1, -1);
  counter["guid"]++;
  return result;
}

function getEnum(parsed) {
  const result =
    parsed.IfcEnum_Primitive[counter["ifcEnum"]].children.Enum[0].image;
  counter["ifcEnum"]++;
  return result;
}

function getNumber(parsed) {
  const result = parsed.Number_Primitive[counter["number"]].children
    .DefaultValue
    ? parsed.Number_Primitive[counter["number"]].children.DefaultValue[0].image
    : Number(
        parsed.Number_Primitive[counter["number"]].children.Number[0].image
      );
  counter["number"]++;
  return result;
}

function getExpressId(parsed) {
  const result = parsed.IfcExpressId_Primitive[counter["expressId"]].children
    .DefaultValue
    ? parsed.IfcExpressId_Primitive[counter["expressId"]].children
        .DefaultValue[0].image
    : Number(
        parsed.IfcExpressId_Primitive[
          counter["expressId"]
        ].children.ExpressId[0].image.slice(1)
      );
  counter["expressId"]++;
  return result;
}

function getIfcText(parsed) {
  const result = parsed.IfcText_Primitive[counter["ifcText"]].children
    .DefaultValue
    ? parsed.IfcText_Primitive[counter["ifcText"]].children.DefaultValue[0]
        .image
    : parsed.IfcText_Primitive[counter["ifcText"]].children.Text[0].image.slice(
        1,
        -1
      );
  counter["ifcText"]++;
  return result;
}

function getIdSet(parsed) {
  const result = parsed.IdSet_Primitive[counter["idSet"]].children.ExpressId
    ? parsed.IdSet_Primitive[counter["idSet"]].children.ExpressId.map((e) =>
        Number(e.image.slice(1))
      )
    : [];
  counter["idSet"]++;
  return result;
}

function getNumberSet(parsed) {
  const result = parsed.NumberSet_Primitive[counter["numberSet"]].children
    .Number
    ? parsed.NumberSet_Primitive[
        counter["numberSet"]
      ].children.Number.map((e) => Number(e.image))
    : [];
  counter["numberSet"]++;
  return result;
}

export {
  resetCounter,
  getGuid,
  getNumber,
  getNumberSet,
  getEnum,
  getExpressId,
  getIfcText,
  getIdSet,
};
