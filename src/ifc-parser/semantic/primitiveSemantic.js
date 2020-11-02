function getGuid(parsed, index) {
  return parsed.IfcGuid[index].image;
}

function getExpressId(parsed, index) {
  return parsed.IfcExpressId[index].children.DefaultValue
    ? parsed.IfcExpressId[index].children.DefaultValue[0].image
    : Number(parsed.IfcExpressId[index].children.ExpressId[0].image.slice(1));
}

function getIfcText(parsed, index) {
  return parsed.IfcText[index].children.DefaultValue
    ? parsed.IfcText[index].children.DefaultValue[0].image
    : parsed.IfcText[index].children.Text[0].image.slice(1, -1);
}

function getIdSet(parsed, index) {
  return parsed.IdSet[index].children.ExpressId
    ? parsed.IdSet[index].children.ExpressId.map((e) =>
        Number(e.image.slice(1))
      )
    : [];
}

export { getGuid, getExpressId, getIfcText, getIdSet };
