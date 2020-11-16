const namedProps = {
  axis: "Axis",
  containsElements: "_ContainsElements",
  containsSpatial: "_ContainsSpatialStructures",
  coordinates: "Coordinates",
  depth: "Depth",
  dirRatios: "DirectionRatios",
  extDirection: "ExtrudedDirection",
  geometry: "_Geometry",
  ifcClass: "_IfcClass",
  items: "Items",
  location: "Location",
  objectPlacement: "ObjectPlacement",
  openings: "_Openings",
  outerCurve: "OuterCurve",
  pivots: "Pivots",
  placementRelTo: "PlacementRelTo",
  points: "Points",
  position: "Position",
  profile: "Profile",
  refDirection: "RefDirection",
  relatedElements: "RelatedElements",
  relatedObjects: "RelatedObjects",
  relatedOpeningElement: "RelatedOpeningElement",
  relatingBuildingElement: "RelatingBuildingElement",
  relatingObject: "RelatingObject",
  relatingStructure: "RelatingStructure",
  relativePlacement: "RelativePlacement",
  representation: "Representation",
  representations: "Representations",
  representationType: "RepresentationType",
  geomRepresentations: "_GeometryRepresentations",
  sweptArea: "SweptArea",
  transform: "_Transformation",
  transformedGeometry: "_TransformedGeometry",
  transformOfExtrusion: "_TransformationOfExtrusion",
  trueGeometry: "_trueGeometry",
  undefined: "undefined",
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
  locat: "Locations",
  xAxis: "xRotation",
  yAxis: "yRotation",
  zAxis: "zRotation",
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
