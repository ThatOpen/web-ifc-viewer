const namedProps = {
  axis: "Axis",
  containsElements: "_ContainsElements",
  containsSpatial: "_ContainsSpatialStructures",
  coordinates: "Coordinates",
  dirRatios: "DirectionRatios",
  ifcClass: "_IfcClass",
  items: "Items",
  location: "Location",
  objectPlacement: "ObjectPlacement",
  placementRelTo: "PlacementRelTo",
  points: "Points",
  rawRepresentation: "_RawRepresentation",
  rawGeometry: "_RawGeometry",
  refDirection: "RefDirection",
  relatedElements: "RelatedElements",
  relatedObjects: "RelatedObjects",
  relatingObject: "RelatingObject",
  relatingStructure: "RelatingStructure",
  relativePlacement: "RelativePlacement",
  representation: "Representation",
  representations: "Representations",
  representationType: "RepresentationType",
  transform: "_Transformation",
  transformedGeometry: "_TransformedGeometry",
  trueGeometry: "_trueGeometry",
  undefined: "undefined",
  depth: "Depth",
  extDirection: "ExtrudedDirection",
  position: "Position",
  sweptArea: "SweptArea",
  xDim: "XDim",
  yDim: "YDim",
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

const pivots = {
  pivots: "Pivots",
  locations: "Locations",
  xRotation: "xRotation",
  zRotation: "zRotation",
};

const defaultValue = "$";

export {
  pivots,
  geometryTypes,
  namedProps,
  typeValue,
  ifcValueType,
  ifcBoolValues,
  structuredData,
  defaultValue,
};
