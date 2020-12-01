const ifcDataTypes = {
  asterisk: "Asterisk",
  anything: "Anything",
  bool: "Boolean",
  date: "Date",
  default: "DefaultValue",
  enum: "Enum",
  guid: "Guid",
  id: "ExpressId",
  idSet: "ExpressIdSet",
  value: "IfcValue",
  number: "Number",
  numSet: "NumberSet",
  text: "Text",
  textSet: "TextSet",
};

function isDataTypeValid(dataType) {
  if (Object.values(ifcDataTypes).indexOf(dataType) > -1) return true;
  return false;
}

function getAllDataTypes() {
  return Object.values(ifcDataTypes);
}

export { ifcDataTypes, isDataTypeValid, getAllDataTypes };
