const ifcDataTypes = {
  guid: "Guid",
  id: "ExpressId",
  idSet: "ExpressIdSet",
  text: "Text",
  textSet: "TextSet",
  number: "Number",
  date: "Date",
  numberSet: "NumberSet",
  enum: "Enum",
  ifcValue: "IfcValue",
  asterisk: "Asterisk",
};

function isDataTypeValid(dataType) {
  if (Object.values(ifcDataTypes).indexOf(dataType) > -1) return true;
  return false;
}

export { ifcDataTypes, isDataTypeValid };
