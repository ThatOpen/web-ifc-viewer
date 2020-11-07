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
  bool: "Boolean",
  ifcValue: "IfcValue",
  asterisk: "Asterisk",
};

function isDataTypeValid(dataType) {
  if (Object.values(ifcDataTypes).indexOf(dataType) > -1) return true;
  return false;
}

function getAllDataTypes() {
  return Object.values(ifcDataTypes);
}

export { ifcDataTypes, isDataTypeValid, getAllDataTypes };
