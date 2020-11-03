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
  return parsed._IfcGuid[counter["guid"]++].children.IfcGuid[0].image.slice(
    1,
    -1
  );
}

function getEnum(parsed) {
  return parsed._IfcEnum[counter["ifcEnum"]++].children.Enum[0].image;
}

function getNumber(parsed) {
  return parsed._Number[counter["number"]].children.DefaultValue
    ? parsed._Number[counter["number"]++].children.DefaultValue[0].image
    : Number(parsed._Number[counter["number"]++].children.Number[0].image);
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

  return parsed._IfcText[counter["ifcText"]++].children.Text[0].image.slice(
    1,
    -1
  );
}

function getIdSet(parsed) {
  if (parsed._IdSet[counter["idSet"]].children.ExpressId)
    return parsed._IdSet[counter["idSet"]++].children.ExpressId.map((e) =>
      Number(e.image.slice(1))
    );

  counter["idSet"]++;
  return [];
}

function getNumberSet(parsed) {
  if (parsed._NumberSet[counter["numberSet"]].children.Number)
    return parsed._NumberSet[counter["numberSet"]].children.Number.map((e) =>
      Number(e.image)
    );

  counter["numberSet"]++;
  return [];
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
