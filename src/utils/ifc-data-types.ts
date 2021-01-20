const ifcDataTypes = {
  asterisk: "Asterisk",
  anything: "Anything",
  bool: "Boolean",
  date: "Date",
  default: "DefaultValue",
  enum: "Enum",
  id: "ExpressId",
  idSet: "ExpressIdSet",
  value: "IfcValue",
  number: "Number",
  numSet: "NumberSet",
  valueSet: "ValueSet",
  text: "Text",
  textSet: "TextSet",
};

function isDataTypeValid(dataType: any) {
  if (Object.values(ifcDataTypes).indexOf(dataType) > -1) return true;
  return false;
}

function getAllDataTypes() {
  return Object.values(ifcDataTypes);
}

export { ifcDataTypes, isDataTypeValid, getAllDataTypes };
