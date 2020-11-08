const namedProps = {
  undefined: "undefined",
  ifcClass: "_IfcClass",
  containsSpatial: "_ContainsSpatialStructures",
  containsElements: "_ContainsElements",
  relatingObject: "RelatingObject",
  relatedObjects: "RelatedObjects",
  relatedElements: "RelatedElements",
  relatingStructure: "RelatingStructure",
  representation: "Representation",
  representations: "Representations",
  representationType: "RepresentationType",
  items: "Items",
  points: "Points",
  coordinates: "Coordinates",
  objectPlacement: "ObjectPlacement",
};

const typeValue = {
  type: "type",
  value: "value",
};

const ifcValueType = {
  number: "Number",
  text: "Text",
  enum: "Enum",
  bool: "Boolean",
  singleNumber: "SingleNumber",
};

const geometryTypes = {
  curve2D: "Curve2D",
  sweptSolid: "SweptSolid",
};

const ifcBoolValues = {
  trueValue: ".T.",
  falseValue: ".F.",
};

const structuredData = {
  ifcProject: "IfcProject",
  products: "Products",
};

export {
  geometryTypes,
  namedProps,
  typeValue,
  ifcValueType,
  ifcBoolValues,
  structuredData,
};
