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

const dataTypesSet = new Set();
Object.values(ifcDataTypes).forEach((e) => dataTypesSet.add(e));

const dataTypesArray = Array.from(dataTypesSet);

function isDataTypeValid(dataType) {
  return dataTypesSet.has(dataType);
}

function getAllDataTypes() {
  return dataTypesArray;
}

export { ifcDataTypes, isDataTypeValid, getAllDataTypes };
