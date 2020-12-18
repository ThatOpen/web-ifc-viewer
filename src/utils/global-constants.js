const namedProps = {
  agreementFlag: "AgreementFlag",
  axis: "Axis",
  axis1: "Axis1",
  axis2: "Axis2",
  axis3: "Axis3",
  baseSurface: "BaseSurface",
  bound: "Bound",
  bounds: "Bounds",
  cfsFaces: "CfsFaces",
  coordinates: "Coordinates",
  depth: "Depth",
  dirRatios: "DirectionRatios",
  elements: "Elements",
  extDirection: "ExtrudedDirection",
  expressId: "_ExpressId",
  fbsmFaces: "FbsmFaces",
  firstOperand: "FirstOperand",
  geometry: "_Geometry",
  geomRepresentations: "_GeometryRepresentations",
  hasBuildingElements: "_HasBuildingElements",
  hasFillings: "_HasFillings",
  hasOpenings: "_HasOpenings",
  hasSpatial: "_HasSpatialStructures",
  hasType: "_HasType",
  ifcClass: "_IfcClass",
  innerCurves: "InnerCurves",
  isBrep: "_IsBrep",
  items: "Items",
  location: "Location",
  localOrigin: "LocalOrigin",
  mappingOrigin: "MappingOrigin:",
  mappedRepresentation: "MappedRepresentation:",
  mappingSource: "MappingSource",
  mappingTarget: "MappingTarget",
  objectPlacement: "ObjectPlacement",
  operator: "Operator",
  orientation: "Orientation",
  outer: "Outer",
  outerCurve: "OuterCurve",
  pivots: "Pivots",
  placementRelTo: "PlacementRelTo",
  points: "Points",
  polygon: "Polygon",
  polygonalBoundary: "PolygonalBoundary",
  position: "Position",
  prefix: "Prefix",
  profile: "Profile",
  radius: "Radius",
  refDirection: "RefDirection",
  relatedBuildingElement: "RelatedBuildingElement",
  relatedElements: "RelatedElements",
  relatedObjects: "RelatedObjects",
  relatedOpeningElement: "RelatedOpeningElement",
  relatingBuildingElement: "RelatingBuildingElement",
  relatingObject: "RelatingObject",
  relatingOpeningElement: "RelatingOpeningElement",
  relatingStructure: "RelatingStructure",
  relatingType: "RelatingType",
  relativePlacement: "RelativePlacement",
  representation: "Representation",
  representations: "Representations",
  representationType: "RepresentationType",
  scale: "Scale",
  secondOperand: "SecondOperand",
  semiAxis1: "SEMIAXIS1",
  semiAxis2: "SEMIAXIS2",
  sweptArea: "SweptArea",
  transform: "_Transformation",
  transformedGeometry: "_TransformedGeometry",
  transformOfExtrusion: "_TransformationOfExtrusion",
  transformOfClippingVolume: "_TransformationOfClippingVolume",
  transformOfMappedItem: "_TransformOfMappedItem",
  trueGeometry: "_trueGeometry",
  undefined: "undefined",
  units: "Units",
  unitType: "UnitType",
  xDim: "XDim",
  yDim: "YDim",
};

const itemsReaderValues = {
  expressId: "expressId",
  type: "type",
  properties: "properties",
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
  mappedRepresentation: "MappedRepresentation",
  brep: "Brep",
  geometricSet: "GeometricSet",
  clipping: "Clipping",
  extrudedAreaSolid: "IfcExtrudedAreaSolid",
  surfaceModel: "SurfaceModel"
};

const ifcBoolValues = {
  trueValue: ".T.",
  falseValue: ".F.",
};

const structuredData = {
  ifcProject: "IfcProject",
  products: "Products",
  spaces: "Spaces",
  units: "Units",
  mainObject: "MainObject",
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
  itemsReaderValues,
};
