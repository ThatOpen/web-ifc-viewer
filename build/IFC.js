'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var THREE$1 = require('three');
var chevrotain = require('chevrotain');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE$1);

// export function readIfcFile(cb) {
//   const input = document.querySelector('input[type="file"]');
//   if (!input) return;
//   input.addEventListener(
//     'change',
//     (e) => {
//       readFile(input, cb);
//     },
//     false
//   );
// }
function readIfcFile(file, cb) {
  const reader = new FileReader();

  reader.onload = () => {
    if (cb) {
      cb(reader.result);
    }
  };

  reader.readAsText(file);
}

const namedProps = {
  axis: "Axis",
  axis1: "Axis1",
  axis2: "Axis2",
  axis3: "Axis3",
  bound: "Bound",
  bounds: "Bounds",
  cfsFaces: "CfsFaces",
  coordinates: "Coordinates",
  depth: "Depth",
  dirRatios: "DirectionRatios",
  extDirection: "ExtrudedDirection",
  expressId: "_ExpressId",
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
  orientation: "Orientation",
  outer: "Outer",
  outerCurve: "OuterCurve",
  pivots: "Pivots",
  placementRelTo: "PlacementRelTo",
  points: "Points",
  polygon: "Polygon",
  position: "Position",
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
  SemiAxis1: "SEMIAXIS1",
  SemiAxis2: "SEMIAXIS2",
  sweptArea: "SweptArea",
  transform: "_Transformation",
  transformedGeometry: "_TransformedGeometry",
  transformOfExtrusion: "_TransformationOfExtrusion",
  transformOfMappedItem: "_TransformOfMappedItem",
  trueGeometry: "_trueGeometry",
  undefined: "undefined",
  xDim: "XDim",
  yDim: "YDim"
};
const itemsReaderValues = {
  expressId: "expressId",
  type: "type",
  properties: "properties"
};
const typeValue = {
  type: "type",
  value: "value"
};
const ifcValueType = {
  number: "Number",
  text: "Text",
  enum: "Enum",
  bool: "Boolean",
  singleNumber: "SingleNumber"
};
const geometryTypes = {
  curve2D: "Curve2D",
  sweptSolid: "SweptSolid",
  mappedRepresentation: "MappedRepresentation",
  brep: "Brep"
};
const ifcBoolValues = {
  trueValue: ".T.",
  falseValue: ".F."
};
const structuredData = {
  ifcProject: "IfcProject",
  products: "Products",
  spaces: "Spaces"
};
const pivots = {
  pivots: "Pivots",
  locat: "Locations",
  xAxis: "xRotation",
  yAxis: "yRotation",
  zAxis: "zRotation"
};
const defaultValue = "$";

const ifcTypes = {
  //Building elements
  IfcBuildingElementProxy: "IFCBUILDINGELEMENTPROXY",
  IfcCurtainWall: "IFCCURTAINWALL",
  IfcDoor: "IFCDOOR",
  IfcFurnishingElement: "IFCFURNISHINGELEMENT",
  IfcMappedItem: "IFCMAPPEDITEM",
  IfcMember: "IFCMEMBER",
  IfcPlate: "IFCPLATE",
  IfcRailing: "IFCRAILING",
  IfcSlab: "IFCSLAB",
  IfcOpeningElement: "IFCOPENINGELEMENT",
  IfcStairFlight: "IFCSTAIRFLIGHT",
  IfcStair: "IFCSTAIR",
  IfcWallStandardCase: "IFCWALLSTANDARDCASE",
  IfcWall: "IFCWALL",
  IfcWindow: "IFCWINDOW",
  //Classification
  IfcClassification: "IFCCLASSIFICATION",
  //Contexts
  IfcGeometricRepresentationContext: "IFCGEOMETRICREPRESENTATIONCONTEXT",
  IfcGeometricRepresentationSubContext: "IFCGEOMETRICREPRESENTATIONSUBCONTEXT",
  IfcGridPlacement: "IFCGRIDPLACEMENT",
  IfcLinearPlacement: "IFCLINEARPLACEMENT",
  IfcLocalPlacement: "IFCLOCALPLACEMENT",
  //Geometry
  IfcArbitraryClosedProfileDef: "IFCARBITRARYCLOSEDPROFILEDEF",
  IfcArbitraryProfileDefWithVoids: "IFCARBITRARYPROFILEDEFWITHVOIDS",
  IfcAxis2Placement2D: "IFCAXIS2PLACEMENT2D",
  IfcAxis2Placement3D: "IFCAXIS2PLACEMENT3D",
  IfcBooleanClippingResult: "IFCBOOLEANCLIPPINGRESULT",
  IfcCartesianPoint: "IFCCARTESIANPOINT",
  IfcCartesianTransformationOperator3D: "IFCCARTESIANTRANSFORMATIONOPERATOR3D",
  IfcClosedShell: "IFCCLOSEDSHELL",
  IfcCircleProfileDef: "IFCCIRCLEPROFILEDEF",
  IfcConnectionSurfaceGeometry: "IFCCONNECTIONSURFACEGEOMETRY",
  IfcCurveBoundedPlane: "IFCCURVEBOUNDEDPLANE",
  IfcDirection: "IFCDIRECTION",
  IfcEllipse: "IfcEllipse",
  IfcExtrudedAreaSolid: "IFCEXTRUDEDAREASOLID",
  IfcFaceBound: "IFCFACEBOUND",
  IfcFace: "IFCFACE",
  IfcFaceOuterBound: "IFCFACEOUTERBOUND",
  IfcFacetedBrep: "IFCFACETEDBREP",
  IfcPlane: "IFCPLANE",
  IfcPolygonalBoundedHalfSpace: "IFCPOLYGONALBOUNDEDHALFSPACE",
  IfcPolyline: "IFCPOLYLINE",
  IfcPolyLoop: "IFCPOLYLOOP",
  IfcProductDefinitionShape: "IFCPRODUCTDEFINITIONSHAPE",
  IfcRectangleProfileDef: "IFCRECTANGLEPROFILEDEF",
  IfcShapeRepresentation: "IFCSHAPEREPRESENTATION",
  //Identities
  IfcApplication: "IFCAPPLICATION",
  IfcOrganization: "IFCORGANIZATION",
  IfcOwnerHistory: "IFCOWNERHISTORY",
  IfcPerson: "IFCPERSON",
  IfcPersonAndOrganization: "IFCPERSONANDORGANIZATION",
  IfcPostalAddress: "IFCPOSTALADDRESS",
  //Materials
  IfcMaterial: "IFCMATERIAL",
  IfcMaterialLayer: "IFCMATERIALLAYER",
  IfcMaterialLayerSet: "IFCMATERIALLAYERSET",
  IfcMaterialLayerSetUsage: "IFCMATERIALLAYERSETUSAGE",
  IfcMaterialList: "IFCMATERIALLIST",
  //Presentation
  IfcColourRgb: "IFCCOLOURRGB",
  IfcMaterialDefinitionRepresentation: "IFCMATERIALDEFINITIONREPRESENTATION",
  IfcRepresentationMap: "IFCREPRESENTATIONMAP",
  IfcPresentationLayerAssignment: "IFCPRESENTATIONLAYERASSIGNMENT",
  IfcPresentationStyleAssignment: "IFCPRESENTATIONSTYLEASSIGNMENT",
  IfcStyledItem: "IFCSTYLEDITEM",
  IfcStyledRepresentation: "IFCSTYLEDREPRESENTATION",
  IfcSurfaceStyle: "IFCSURFACESTYLE",
  IfcSurfaceStyleRendering: "IFCSURFACESTYLERENDERING",
  IfcSurfaceStyleShading: "IFCSURFACESTYLESHADING",
  //Properties
  IfcCurtainWallType: "IFCCURTAINWALLTYPE",
  IfcFurnitureType: "IFCFURNITURETYPE",
  IfcDoorLiningProperties: "IFCDOORLININGPROPERTIES",
  IfcDoorPanelProperties: "IFCDOORPANELPROPERTIES",
  IfcDoorStyle: "IFCDOORSTYLE",
  IfcMemberType: "IFCMEMBERTYPE",
  IfcPlateType: "IFCPLATETYPE",
  IfcPropertySet: "IFCPROPERTYSET",
  IfcPropertySingleValue: "IFCPROPERTYSINGLEVALUE",
  IfcSpaceType: "IFCSPACETYPE",
  IfcStairFlightType: "IFCSTAIRFLIGHTTYPE",
  IfcWallType: "IFCWALLTYPE",
  IfcWindowStyle: "IFCWINDOWSTYLE",
  IfcSlabType: "IFCSLABTYPE",
  IfcWindowLiningProperties: "IFCWINDOWLININGPROPERTIES",
  // Relationships
  IfcRelAggregates: "IFCRELAGGREGATES",
  IfcRelAssociatesMaterial: "IFCRELASSOCIATESMATERIAL",
  IfcRelConnectsPathElements: "IFCRELCONNECTSPATHELEMENTS",
  IfcRelContainedInSpatialStructure: "IFCRELCONTAINEDINSPATIALSTRUCTURE",
  IfcRelDefinesByProperties: "IFCRELDEFINESBYPROPERTIES",
  IfcRelDefinesByType: "IFCRELDEFINESBYTYPE",
  IfcRelFillsElement: "IFCRELFILLSELEMENT",
  IfcRelSpaceBoundary: "IFCRELSPACEBOUNDARY",
  IfcRelVoidsElement: "IFCRELVOIDSELEMENT",
  //Spatial structure elements
  IfcBuilding: "IFCBUILDING",
  IfcBuildingStorey: "IFCBUILDINGSTOREY",
  IfcProject: "IFCPROJECT",
  IfcSite: "IFCSITE",
  IfcSpace: "IFCSPACE",
  //Units
  IfcConversionBasedUnit: "IFCCONVERSIONBASEDUNIT",
  IfcDerivedUnit: "IFCDERIVEDUNIT",
  IfcDerivedUnitElement: "IFCDERIVEDUNITELEMENT",
  IfcDimensionalExponents: "IFCDIMENSIONALEXPONENTS",
  IfcMeasureWithUnit: "IFCMEASUREWITHUNIT",
  IfcSIUnit: "IFCSIUNIT",
  IfcUnitAssignment: "IFCUNITASSIGNMENT"
};

function getName(ifcType) {
  return Object.keys(ifcTypes).find(key => ifcTypes[key] === ifcType);
}

const typesParserMap = {};

function newObject(ifcObject) {
  typesParserMap[ifcTypes[ifcObject[namedProps.ifcClass]]] = ifcObject;
}

function parserByType(ifcType) {
  return typesParserMap[ifcType];
}

const ifcDataTypes = {
  asterisk: "Asterisk",
  anything: "Anything",
  bool: "Boolean",
  date: "Date",
  default: "DefaultValue",
  emptyText: "EmptyText",
  enum: "Enum",
  guid: "Guid",
  id: "ExpressId",
  idSet: "ExpressIdSet",
  value: "IfcValue",
  number: "Number",
  numSet: "NumberSet",
  text: "Text",
  textSet: "TextSet"
};

function isDataTypeValid(dataType) {
  if (Object.values(ifcDataTypes).indexOf(dataType) > -1) return true;
  return false;
}

function getAllDataTypes() {
  return Object.values(ifcDataTypes);
}

newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcMappedItem),
  [namedProps.mappingSource]: ifcDataTypes.id,
  [namedProps.mappingTarget]: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcWall),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcWallStandardCase),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcCurtainWall),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcDoor),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text,
  OverallHeight: ifcDataTypes.number,
  OverallWidth: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRailing),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text,
  PredefinedType: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPlate),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcMember),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcSlab),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text,
  PredefinedType: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcOpeningElement),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcWindow),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text,
  OverallHeight: ifcDataTypes.number,
  OverallWidth: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcStair),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text,
  ShapeType: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcStairFlight),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text,
  NumberOfRiser: ifcDataTypes.number,
  NumberOfThreads: ifcDataTypes.number,
  RiserHeight: ifcDataTypes.number,
  TreadLength: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcFurnishingElement),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcBuildingElementProxy),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  Tag: ifcDataTypes.text,
  CompositionType: ifcDataTypes.enum
});

newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcClassification),
  Source: ifcDataTypes.text,
  Edition: ifcDataTypes.text,
  EditionDate: ifcDataTypes.id,
  Name: ifcDataTypes.text
});

newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcGeometricRepresentationContext),
  ContextIdentifier: ifcDataTypes.text,
  ContextType: ifcDataTypes.text,
  CoordinateSpaceDimension: ifcDataTypes.number,
  Precision: ifcDataTypes.number,
  WorldCoordinateSystem: ifcDataTypes.id,
  TrueNorth: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcGeometricRepresentationSubContext),
  ContextIdentifier: ifcDataTypes.text,
  ContextType: ifcDataTypes.text,
  [namedProps.undefined]: ifcDataTypes.asterisk,
  ParentContext: ifcDataTypes.id,
  TargetScale: ifcDataTypes.value,
  TargetView: ifcDataTypes.enum,
  UserDefinedTargetView: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcGridPlacement),
  PlacementLocation: ifcDataTypes.id,
  PlacementRefDirection: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcLinearPlacement),
  PlacementRelTo: ifcDataTypes.id,
  PlacementMeasuredAlong: ifcDataTypes.id,
  Distance: ifcDataTypes.id,
  Orientation: ifcDataTypes.id,
  CartesianPosition: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcLocalPlacement),
  PlacementRelTo: ifcDataTypes.id,
  RelativePlacement: ifcDataTypes.id
});

newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcAxis2Placement2D),
  [namedProps.location]: ifcDataTypes.id,
  [namedProps.refDirection]: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcAxis2Placement3D),
  [namedProps.location]: ifcDataTypes.id,
  [namedProps.axis]: ifcDataTypes.id,
  [namedProps.refDirection]: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcBooleanClippingResult),
  Operator: ifcDataTypes.enum,
  FirstOperand: ifcDataTypes.id,
  SecondOperand: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcEllipse),
  [namedProps.position]: ifcDataTypes.id,
  [namedProps.SemiAxis1]: ifcDataTypes.number,
  [namedProps.SemiAxis2]: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcCartesianPoint),
  [namedProps.coordinates]: ifcDataTypes.numSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcConnectionSurfaceGeometry),
  SurfaceOnRelatingElement: ifcDataTypes.id,
  SurfaceOnRelatedElement: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcCurveBoundedPlane),
  BasisSurface: ifcDataTypes.id,
  OuterBoundary: ifcDataTypes.id,
  InnerBoundaries: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcDirection),
  [namedProps.dirRatios]: ifcDataTypes.numSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcExtrudedAreaSolid),
  [namedProps.sweptArea]: ifcDataTypes.id,
  [namedProps.position]: ifcDataTypes.id,
  [namedProps.extDirection]: ifcDataTypes.id,
  [namedProps.depth]: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPlane),
  Position: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPolygonalBoundedHalfSpace),
  BaseSurface: ifcDataTypes.id,
  AgreementFlag: ifcDataTypes.bool,
  Position: ifcDataTypes.id,
  PolygonalBoundary: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPolyline),
  [namedProps.points]: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcProductDefinitionShape),
  Description: ifcDataTypes.text,
  [namedProps.representationType]: ifcDataTypes.text,
  [namedProps.representations]: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRectangleProfileDef),
  ProfileType: ifcDataTypes.enum,
  ProfileName: ifcDataTypes.text,
  [namedProps.position]: ifcDataTypes.id,
  [namedProps.xDim]: ifcDataTypes.number,
  [namedProps.yDim]: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcCircleProfileDef),
  ProfileType: ifcDataTypes.enum,
  ProfileName: ifcDataTypes.text,
  [namedProps.position]: ifcDataTypes.id,
  [namedProps.radius]: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcArbitraryProfileDefWithVoids),
  ProfileType: ifcDataTypes.enum,
  ProfileName: ifcDataTypes.text,
  [namedProps.outerCurve]: ifcDataTypes.id,
  [namedProps.innerCurves]: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcArbitraryClosedProfileDef),
  ProfileType: ifcDataTypes.enum,
  ProfileName: ifcDataTypes.text,
  [namedProps.outerCurve]: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcShapeRepresentation),
  ContextOfItems: ifcDataTypes.id,
  RepresentationIdentifier: ifcDataTypes.text,
  [namedProps.representationType]: ifcDataTypes.text,
  [namedProps.items]: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcFaceOuterBound),
  [namedProps.bound]: ifcDataTypes.id,
  [namedProps.orientation]: ifcDataTypes.bool
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcFaceBound),
  [namedProps.bound]: ifcDataTypes.id,
  [namedProps.orientation]: ifcDataTypes.bool
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcFace),
  [namedProps.bounds]: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPolyLoop),
  [namedProps.polygon]: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcClosedShell),
  [namedProps.cfsFaces]: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcFacetedBrep),
  [namedProps.outer]: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcCartesianTransformationOperator3D),
  [namedProps.axis1]: ifcDataTypes.id,
  [namedProps.axis2]: ifcDataTypes.id,
  [namedProps.localOrigin]: ifcDataTypes.id,
  [namedProps.scale]: ifcDataTypes.number,
  [namedProps.axis3]: ifcDataTypes.id
});

newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcApplication),
  ApplicationDeveloper: ifcDataTypes.id,
  Version: ifcDataTypes.text,
  ApplicationFullName: ifcDataTypes.text,
  ApplicationIdentifier: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcOrganization),
  Identification: ifcDataTypes.text,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  Roles: ifcDataTypes.idSet,
  Addresses: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcOwnerHistory),
  OwningUser: ifcDataTypes.id,
  OwningApplication: ifcDataTypes.id,
  State: ifcDataTypes.enum,
  ChangeAction: ifcDataTypes.enum,
  LastModifiedDate: ifcDataTypes.date,
  LastModifyingUser: ifcDataTypes.id,
  LastModifyingApplication: ifcDataTypes.id,
  CreationDate: ifcDataTypes.date
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPerson),
  Identification: ifcDataTypes.text,
  FamilyName: ifcDataTypes.text,
  GivenName: ifcDataTypes.text,
  MiddleNames: ifcDataTypes.textSet,
  PrefixTitles: ifcDataTypes.textSet,
  SuffixTitles: ifcDataTypes.textSet,
  Roles: ifcDataTypes.idSet,
  Addresses: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPersonAndOrganization),
  ThePerson: ifcDataTypes.id,
  TheOrganization: ifcDataTypes.id,
  Roles: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPostalAddress),
  Purpose: ifcDataTypes.enum,
  Description: ifcDataTypes.text,
  UserDefinedPurpose: ifcDataTypes.text,
  InternalLocation: ifcDataTypes.text,
  AddressLines: ifcDataTypes.textSet,
  PostalBox: ifcDataTypes.text,
  Town: ifcDataTypes.text,
  Region: ifcDataTypes.text,
  PostalCode: ifcDataTypes.text,
  Country: ifcDataTypes.text
});

newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcMaterial),
  Name: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcMaterialLayer),
  Material: ifcDataTypes.id,
  LayerThickness: ifcDataTypes.number,
  IsVentilated: ifcDataTypes.value
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcMaterialLayerSet),
  MaterialLayers: ifcDataTypes.idSet,
  LayerSetName: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcMaterialLayerSetUsage),
  ForLayerSet: ifcDataTypes.id,
  LayerSetDirection: ifcDataTypes.enum,
  DirectionSense: ifcDataTypes.enum,
  OffsetFromReferenceLine: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcMaterialList),
  Materials: ifcDataTypes.idSet
});

newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcColourRgb),
  Name: ifcDataTypes.text,
  Red: ifcDataTypes.number,
  Green: ifcDataTypes.number,
  Blue: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcMaterialDefinitionRepresentation),
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  [namedProps.representations]: ifcDataTypes.idSet,
  RepresentedMaterial: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPresentationStyleAssignment),
  Styles: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcStyledItem),
  Item: ifcDataTypes.id,
  Styles: ifcDataTypes.idSet,
  Name: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcStyledRepresentation),
  ContextOfItems: ifcDataTypes.id,
  RepresentationIdentifier: ifcDataTypes.text,
  [namedProps.representationType]: ifcDataTypes.text,
  [namedProps.items]: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcSurfaceStyle),
  Name: ifcDataTypes.text,
  Side: ifcDataTypes.enum,
  Styles: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcSurfaceStyleRendering),
  SurfaceColour: ifcDataTypes.id,
  Transparency: ifcDataTypes.value,
  DiffuseColour: ifcDataTypes.value,
  TransmissionColour: ifcDataTypes.value,
  DiffuseTransmissionColour: ifcDataTypes.value,
  ReflectionColour: ifcDataTypes.value,
  SpecularColour: ifcDataTypes.value,
  SpecularHighlight: ifcDataTypes.value,
  ReflectanceMethod: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRepresentationMap),
  [namedProps.mappingOrigin]: ifcDataTypes.id,
  [namedProps.mappedRepresentation]: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPresentationLayerAssignment),
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  AssignedItems: ifcDataTypes.idSet,
  Identifier: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcSurfaceStyleShading),
  SurfaceColour: ifcDataTypes.id
});

newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPropertySet),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  HasProperties: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPropertySingleValue),
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  NominalValue: ifcDataTypes.value,
  Unit: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcSpaceType),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ApplicableOccurrence: ifcDataTypes.text,
  HasPropertySets: ifcDataTypes.idSet,
  RepresentationMaps: ifcDataTypes.idSet,
  Tag: ifcDataTypes.text,
  ElementType: ifcDataTypes.text,
  PredefinedType: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcPlateType),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ApplicableOccurrence: ifcDataTypes.text,
  HasPropertySets: ifcDataTypes.idSet,
  RepresentationMaps: ifcDataTypes.idSet,
  Tag: ifcDataTypes.text,
  ElementType: ifcDataTypes.text,
  PredefinedType: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcMemberType),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ApplicableOccurrence: ifcDataTypes.text,
  HasPropertySets: ifcDataTypes.idSet,
  RepresentationMaps: ifcDataTypes.idSet,
  Tag: ifcDataTypes.text,
  ElementType: ifcDataTypes.text,
  PredefinedType: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcWallType),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ApplicableOccurrence: ifcDataTypes.text,
  HasPropertySets: ifcDataTypes.idSet,
  RepresentationMaps: ifcDataTypes.idSet,
  Tag: ifcDataTypes.text,
  ElementType: ifcDataTypes.text,
  PredefinedType: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcStairFlightType),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ApplicableOccurrence: ifcDataTypes.text,
  HasPropertySets: ifcDataTypes.idSet,
  RepresentationMaps: ifcDataTypes.idSet,
  Tag: ifcDataTypes.text,
  ElementType: ifcDataTypes.text,
  PredefinedType: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcCurtainWallType),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ApplicableOccurrence: ifcDataTypes.text,
  HasPropertySets: ifcDataTypes.idSet,
  RepresentationMaps: ifcDataTypes.idSet,
  Tag: ifcDataTypes.text,
  ElementType: ifcDataTypes.text,
  PredefinedType: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcFurnitureType),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ApplicableOccurrence: ifcDataTypes.text,
  HasPropertySets: ifcDataTypes.idSet,
  RepresentationMaps: ifcDataTypes.idSet,
  Tag: ifcDataTypes.text,
  ElementType: ifcDataTypes.text,
  AssemblyPlace: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcSlabType),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ApplicableOccurrence: ifcDataTypes.text,
  HasPropertySets: ifcDataTypes.idSet,
  RepresentationMaps: ifcDataTypes.idSet,
  Tag: ifcDataTypes.text,
  ElementType: ifcDataTypes.text,
  PredefinedType: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcDoorLiningProperties),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  LiningDepth: ifcDataTypes.number,
  LiningThickness: ifcDataTypes.number,
  ThresholdDepth: ifcDataTypes.number,
  ThresholdThickness: ifcDataTypes.number,
  TransomThickness: ifcDataTypes.number,
  TransomOffset: ifcDataTypes.number,
  LiningOffset: ifcDataTypes.number,
  ThresholdOffset: ifcDataTypes.number,
  CasingThickness: ifcDataTypes.number,
  CasingDepth: ifcDataTypes.number,
  ShapeAspectStyle: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcDoorPanelProperties),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  PanelDepth: ifcDataTypes.number,
  PanelOperation: ifcDataTypes.enum,
  PanelWidth: ifcDataTypes.value,
  PanelPosition: ifcDataTypes.enum,
  ShapeAspectStyle: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcDoorStyle),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ApplicableOccurrence: ifcDataTypes.text,
  HasPropertySets: ifcDataTypes.idSet,
  RepresentationMaps: ifcDataTypes.idSet,
  Tag: ifcDataTypes.text,
  OperationType: ifcDataTypes.enum,
  ConstructionType: ifcDataTypes.enum,
  ParameterTakesPrecedence: ifcDataTypes.bool,
  Sizeable: ifcDataTypes.bool
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcWindowStyle),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ApplicableOccurrence: ifcDataTypes.text,
  HasPropertySets: ifcDataTypes.idSet,
  RepresentationMaps: ifcDataTypes.idSet,
  Tag: ifcDataTypes.text,
  ConstructionType: ifcDataTypes.enum,
  OperationType: ifcDataTypes.enum,
  ParameterTakesPrecedence: ifcDataTypes.bool,
  Sizeable: ifcDataTypes.bool
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcWindowLiningProperties),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  LiningDepth: ifcDataTypes.number,
  LiningThickness: ifcDataTypes.number,
  TransomThickness: ifcDataTypes.number,
  MullionThickness: ifcDataTypes.number,
  FirstTransomOffset: ifcDataTypes.number,
  SecondTransomOffset: ifcDataTypes.number,
  FirstMullionOffset: ifcDataTypes.number,
  SecondMullionOffset: ifcDataTypes.number,
  ShapeAspectStyle: ifcDataTypes.number
});

newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRelAggregates),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  [namedProps.relatingObject]: ifcDataTypes.id,
  [namedProps.relatedObjects]: ifcDataTypes.idSet
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRelContainedInSpatialStructure),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  [namedProps.relatedElements]: ifcDataTypes.idSet,
  [namedProps.relatingStructure]: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRelDefinesByProperties),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  RelatedObjects: ifcDataTypes.idSet,
  RelatingPropertyDefinition: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRelAssociatesMaterial),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  RelatedObjects: ifcDataTypes.idSet,
  RelatingMaterial: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRelDefinesByType),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  [namedProps.relatedObjects]: ifcDataTypes.idSet,
  [namedProps.relatingType]: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRelSpaceBoundary),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  RelatingSpace: ifcDataTypes.id,
  RelatedBuildingElement: ifcDataTypes.id,
  ConnectionGeometry: ifcDataTypes.id,
  PhysicalOrVirtualBoundary: ifcDataTypes.enum,
  InternalOrExternalBoundary: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRelConnectsPathElements),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ConnectionGeometry: ifcDataTypes.id,
  RelatingElement: ifcDataTypes.id,
  RelatedElement: ifcDataTypes.id,
  RelatingPriorities: ifcDataTypes.numSet,
  RelatedPriorities: ifcDataTypes.numSet,
  RelatedConnectionType: ifcDataTypes.enum,
  RelatingConnectionType: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRelVoidsElement),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  [namedProps.relatingBuildingElement]: ifcDataTypes.id,
  [namedProps.relatedOpeningElement]: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcRelFillsElement),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  [namedProps.relatingOpeningElement]: ifcDataTypes.id,
  [namedProps.relatedBuildingElement]: ifcDataTypes.id
});

newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcProject),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  LongName: ifcDataTypes.text,
  Phase: ifcDataTypes.text,
  RepresentationContexts: ifcDataTypes.idSet,
  UnitsInContext: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcSite),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  LongName: ifcDataTypes.text,
  CompositionType: ifcDataTypes.enum,
  RefLatitude: ifcDataTypes.numSet,
  RefLongitude: ifcDataTypes.numSet,
  RefElevation: ifcDataTypes.number,
  LandTitleNumber: ifcDataTypes.text,
  SiteAddress: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcBuilding),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  LongName: ifcDataTypes.text,
  CompositionType: ifcDataTypes.enum,
  ElevationOfRefHeight: ifcDataTypes.number,
  ElevationOfTerrain: ifcDataTypes.number,
  BuildingAddress: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcBuildingStorey),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  LongName: ifcDataTypes.text,
  CompositionType: ifcDataTypes.enum,
  Elevation: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcSpace),
  GlobalId: ifcDataTypes.guid,
  OwnerHistory: ifcDataTypes.id,
  Name: ifcDataTypes.text,
  Description: ifcDataTypes.text,
  ObjectType: ifcDataTypes.text,
  [namedProps.objectPlacement]: ifcDataTypes.id,
  [namedProps.representation]: ifcDataTypes.id,
  LongName: ifcDataTypes.text,
  CompositionType: ifcDataTypes.enum,
  InteriorOrExteriorSpace: ifcDataTypes.enum,
  ElevationWithFlooring: ifcDataTypes.number
});

newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcConversionBasedUnit),
  Dimensions: ifcDataTypes.id,
  UnitType: ifcDataTypes.enum,
  Name: ifcDataTypes.text,
  ConversionFactor: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcDerivedUnit),
  Elements: ifcDataTypes.idSet,
  UnitType: ifcDataTypes.enum,
  UserDefinedType: ifcDataTypes.text
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcDerivedUnitElement),
  Unit: ifcDataTypes.id,
  Exponent: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcDimensionalExponents),
  LengthExponent: ifcDataTypes.number,
  MassExponent: ifcDataTypes.number,
  TimeExponent: ifcDataTypes.number,
  ElectricCurrentExponent: ifcDataTypes.number,
  ThermodynamicTemperatureExponent: ifcDataTypes.number,
  AmountOfSubstanceExponent: ifcDataTypes.number,
  LuminousIntensityExponent: ifcDataTypes.number
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcMeasureWithUnit),
  ValueComponent: ifcDataTypes.value,
  UnitComponent: ifcDataTypes.id
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcSIUnit),
  [namedProps.undefined]: ifcDataTypes.asterisk,
  UnitType: ifcDataTypes.enum,
  Prefix: ifcDataTypes.enum,
  Name: ifcDataTypes.enum
});
newObject({
  [namedProps.ifcClass]: getName(ifcTypes.IfcUnitAssignment),
  Units: ifcDataTypes.idSet
});

const newToken = chevrotain.createToken; //Tokens / vocabulary for constructing the parser primitives

const tokens = [];
const patterns = {
  [ifcDataTypes.id]: /#\d+/,
  [ifcDataTypes.guid]: /'\d[a-zA-Z0-9_$]{21}'(?=[\)|,])/,
  [ifcDataTypes.asterisk]: /\*/,
  [ifcDataTypes.default]: /\$/,
  [ifcDataTypes.emptyText]: /''(?=[\)|,])/,
  [ifcDataTypes.value]: /IFC[A-Z]+?(?=\()/,
  [ifcDataTypes.bool]: /\.T\.|\.F\./,
  [ifcDataTypes.enum]: /\.[A-Z0-9_]+?\./,
  [ifcDataTypes.number]: /[0-9.E-]+/,
  [ifcDataTypes.text]: /'.+?'(?=[\)|,])/,
  EqualSign: /=/,
  OpenPar: /\(/,
  ClosePar: /\)/,
  Semicolon: /;/,
  Comma: /\s*,\s*/,
  [ifcDataTypes.anything]: /.+/
};
const ingoredPatterns = {
  NewLine: /[\n\r]+/,
  WhiteSpace: /\s+/
};

function createTokens() {
  Object.keys(patterns).forEach(e => {
    tokens.push(newToken({
      name: e,
      pattern: patterns[e]
    }));
  });
}

function createIgnoredTokens() {
  Object.keys(ingoredPatterns).forEach(e => {
    tokens.push(newToken({
      name: e,
      pattern: ingoredPatterns[e],
      group: chevrotain.Lexer.SKIPPED
    }));
  });
}

createTokens();
createIgnoredTokens();
const lexer = new chevrotain.Lexer(tokens);
const vocabulary = {};
tokens.forEach(token => {
  vocabulary[token.name] = token;
});

function addPrimitiveParsers($) {
  const parsers = [];
  Object.values(primitiveParsers).forEach(e => {
    if (!parsers.includes(e)) {
      parsers.push(e);
      $.RULE(e.name, e($));
    }
  });
}

const primitiveParsers = {
  [ifcDataTypes.guid]: IfcGuid_Parser,
  [ifcDataTypes.asterisk]: Asterisk_Parser,
  [ifcDataTypes.number]: Number_Parser,
  [ifcDataTypes.date]: Number_Parser,
  [ifcDataTypes.text]: IfcText_Parser,
  [ifcDataTypes.bool]: IfcBool_Parser,
  [ifcDataTypes.enum]: IfcEnum_Parser,
  [ifcDataTypes.id]: IfcExpressId_Parser,
  [ifcDataTypes.idSet]: IdSet_Parser,
  [ifcDataTypes.numSet]: NumberSet_Parser,
  [ifcDataTypes.value]: IfcValue_Parser,
  [ifcDataTypes.textSet]: TextSet_Parser
};

function getParser(dataType) {
  return primitiveParsers[dataType].name;
}

function IfcGuid_Parser($) {
  return () => {
    $.CONSUME(vocabulary[ifcDataTypes.guid]);
    $.OPTION(() => {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function Asterisk_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.OR([{
        ALT: () => {
          $.CONSUME(vocabulary[ifcDataTypes.asterisk]);
        }
      }]);
      $.OPTION(() => {
        $.CONSUME(vocabulary.Comma);
      });
    });
  };
}

function IfcValue_Parser($) {
  return () => {
    $.OR([{
      ALT: () => {
        $.CONSUME(vocabulary.IfcValue);
        $.CONSUME(vocabulary.OpenPar);
        $.OR2([{
          ALT: () => {
            $.CONSUME(vocabulary[ifcDataTypes.number]);
          }
        }, {
          ALT: () => {
            $.CONSUME(vocabulary[ifcDataTypes.emptyText]);
          }
        }, {
          ALT: () => {
            $.CONSUME(vocabulary[ifcDataTypes.text]);
          }
        }, {
          ALT: () => {
            $.CONSUME(vocabulary[ifcDataTypes.bool]);
          }
        }, {
          ALT: () => {
            $.CONSUME(vocabulary[ifcDataTypes.enum]);
          }
        }]);
        $.CONSUME(vocabulary.ClosePar);
      }
    }, {
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.id]);
      }
    }, {
      ALT: () => {
        $.CONSUME2(vocabulary[ifcDataTypes.number]);
      }
    }, {
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.default]);
      }
    }]);
    $.OPTION(() => {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function Number_Parser($) {
  return () => {
    $.OR([{
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.default]);
      }
    }, {
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.number]);
      }
    }]);
    $.OPTION(() => {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function NumberSet_Parser($) {
  return () => {
    $.OR([{
      ALT: () => {
        $.CONSUME(vocabulary.OpenPar);
        $.MANY(() => {
          $.CONSUME(vocabulary[ifcDataTypes.number]);
          $.OPTION(() => {
            $.CONSUME(vocabulary.Comma);
          });
        });
        $.CONSUME(vocabulary.ClosePar);
      }
    }, {
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.default]);
      }
    }]);
    $.OPTION2(() => {
      $.CONSUME2(vocabulary.Comma);
    });
  };
}

function TextSet_Parser($) {
  return () => {
    $.OR([{
      ALT: () => {
        $.CONSUME(vocabulary.OpenPar);
        $.MANY(() => {
          $.OR2([{
            ALT: () => {
              $.CONSUME(vocabulary[ifcDataTypes.emptyText]);
            }
          }, {
            ALT: () => {
              $.CONSUME(vocabulary[ifcDataTypes.text]);
            }
          }]);
          $.OPTION(() => {
            $.CONSUME(vocabulary.Comma);
          });
        });
        $.CONSUME(vocabulary.ClosePar);
      }
    }, {
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.default]);
      }
    }]);
    $.OPTION2(() => {
      $.CONSUME2(vocabulary.Comma);
    });
  };
}

function IdSet_Parser($) {
  return () => {
    $.OR([{
      ALT: () => {
        $.CONSUME(vocabulary.OpenPar);
        $.MANY(() => {
          $.CONSUME(vocabulary[ifcDataTypes.id]);
          $.OPTION(() => {
            $.CONSUME(vocabulary.Comma);
          });
        });
        $.CONSUME(vocabulary.ClosePar);
      }
    }, {
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.default]);
      }
    }]);
    $.OPTION2(() => {
      $.CONSUME2(vocabulary.Comma);
    });
  };
}

function IfcText_Parser($) {
  return () => {
    $.OR([{
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.emptyText]);
      }
    }, {
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.default]);
      }
    }, {
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.text]);
      }
    }]);
    $.OPTION2(() => {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function IfcBool_Parser($) {
  return () => {
    $.OR([{
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.bool]);
      }
    }, {
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.default]);
      }
    }]);
    $.OPTION2(() => {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function IfcEnum_Parser($) {
  return () => {
    $.OR([{
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.enum]);
      }
    }, {
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.default]);
      }
    }]);
    $.OPTION2(() => {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function IfcExpressId_Parser($) {
  return () => {
    $.OR([{
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.id]);
      }
    }, {
      ALT: () => {
        $.CONSUME(vocabulary[ifcDataTypes.default]);
      }
    }]);
    $.OPTION2(() => {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function newParser($, ifcItem) {
  resetParserFactory();
  $.CONSUME(vocabulary.OpenPar);
  createRulesForAllProperties($, ifcItem);
  $.CONSUME(vocabulary.ClosePar);
}

function createRulesForAllProperties($, ifcItem) {
  Object.values(ifcItem).forEach(dataType => {
    if (isDataTypeValid(dataType)) newRule($, dataType);
  });
}

function newRule($, dataType) {
  const rule = `SUBRULE${getIndex(dataType)}`;
  updateCounter(dataType);
  return $[rule]($[primitiveParsers[dataType].name]);
} //The counter is necessary because chevrotain cannot have
//multiple identical SUBRULEs. The repeated methods need to be
//followed by a suffix (f.e. SUBRULE(X), SUBRULE2(X), ...)


let counter = {};

function resetParserFactory() {
  counter = {};
  getAllDataTypes().forEach(e => {
    counter[e] = 0;
  });
}

function updateCounter(dataType) {
  counter[dataType]++;
} //Chevrotain syntax: SUBRULE0(X) is expressed as SUBRULE(X)


function getIndex(dataType) {
  return counter[dataType] === 0 ? "" : counter[dataType];
}

//Contains all the syntactical structures (RULEs)

class IfcParser extends chevrotain.CstParser {
  constructor() {
    super(tokens);
    addPrimitiveParsers(this);
    addParsesForAllIfcTypes(this);
    this.performSelfAnalysis();
  }

} //Creates the syntactical structures (RULEs) for all the IFC Classes


function addParsesForAllIfcTypes($) {
  Object.values(typesParserMap).forEach(e => {
    $.RULE(e[namedProps.ifcClass], () => {
      newParser($, e);
    });
  });
}

const parser = new IfcParser();

const regexp = {
  allNewLines: /\r?\n|\r/g,
  headerSection: /HEADER;.+?(?=ENDSEC;)/,
  dataSection: /DATA;\s+.+(?=ENDSEC;)/,
  singleIfcItems: /#\d+\s*=\s*IFC.+?\);\s*/g,
  expressId: /^#\d+/,
  rawIfcType: /IFC\w+/,
  rawIfcProperties: /\(.+?(?=;)/,
  unicode: /\\X2\\[0-9A-F]+?\\X\d\\/,
  getUnicode: /[0-9A-F]+(?=\\X\d\\)/
};

function unicode(text) {
  while (regexp.unicode.test(text)) {
    const encoded = text.match(regexp.unicode)[0].match(regexp.getUnicode)[0];
    text = text.replace(regexp.unicode, String.fromCharCode(parseInt(encoded, 16)));
  }

  return text;
}

function formatDate(dateAsNumber) {
  if (isNaN(dateAsNumber)) return dateAsNumber;
  const formattedDate = new Date(dateAsNumber * 1000);
  return formattedDate.getTime() ? formattedDate : dateAsNumber;
}

const semanticUnits = {
  [ifcDataTypes.guid]: getGuid,
  [ifcDataTypes.id]: getExpressId,
  [ifcDataTypes.idSet]: getIdSet,
  [ifcDataTypes.text]: getIfcText,
  [ifcDataTypes.textSet]: getTextSet,
  [ifcDataTypes.number]: getNumber,
  [ifcDataTypes.numSet]: getNumberSet,
  [ifcDataTypes.date]: getDate,
  [ifcDataTypes.value]: getIfcValue,
  [ifcDataTypes.bool]: getBool,
  [ifcDataTypes.enum]: getEnum,
  [ifcDataTypes.asterisk]: getAsterisk
};

function getProperty(parsed, type) {
  return semanticUnits[type](parsed);
} //The counter is necessary because chevrotain generates indexed
//parsed structures. F.e. if there are two enums in a IFC Class,
//the first one has index=1, the second one index=2, etc


let counter$1 = {};

function resetSemanticFactory() {
  counter$1 = {
    [ifcDataTypes.guid]: 0,
    [ifcDataTypes.id]: 0,
    [ifcDataTypes.text]: 0,
    [ifcDataTypes.number]: 0,
    [ifcDataTypes.enum]: 0,
    [ifcDataTypes.idSet]: 0,
    [ifcDataTypes.numSet]: 0,
    [ifcDataTypes.value]: 0,
    [ifcDataTypes.textSet]: 0,
    [ifcDataTypes.bool]: 0
  };
}

function getGuid(parsed) {
  return extract(parsed, ifcDataTypes.guid).slice(1, -1);
}

function getBool(parsed) {
  return getValue(parsed, ifcDataTypes.bool, formatBool);
}

function getEnum(parsed) {
  return getValue(parsed, ifcDataTypes.enum, formatEnum);
}

function getNumber(parsed) {
  return getValue(parsed, ifcDataTypes.number, formatNumber);
}

function getDate(parsed) {
  return formatDate(getNumber(parsed));
}

function getExpressId(parsed) {
  return getValue(parsed, ifcDataTypes.id, formatId);
}

function getIfcText(parsed) {
  return getValue(parsed, ifcDataTypes.text, formatText);
}

function getTextSet(parsed) {
  return getSet(parsed, ifcDataTypes.textSet, ifcDataTypes.text, e => unicode(e.image.slice(1, -1)));
}

function getIdSet(parsed) {
  return getSet(parsed, ifcDataTypes.idSet, ifcDataTypes.id, e => Number(e.image.slice(1)));
}

function getNumberSet(parsed) {
  return getSet(parsed, ifcDataTypes.numSet, ifcDataTypes.number, e => Number(e.image));
}

function getIfcValue(parsed) {
  if (isDefaultValue(parsed, ifcDataTypes.value)) return getDefault(parsed, ifcDataTypes.value);
  if (isExpressId(parsed, ifcDataTypes.value)) return getIfcValueId(parsed, ifcDataTypes.value);
  let type = getIfcValueType(parsed);
  const value = formatIfcValue(type, getIfcValueValue(parsed, type));
  return {
    Value: value,
    IfcUnit: getIfcUnit(parsed)
  };
}

function getEmptySet(type) {
  counter$1[type]++;
  return [];
}

function getAsterisk() {
  return "*";
}

function getValue(parsed, type, formatFunction) {
  if (isDefaultValue(parsed, type)) return getDefault(parsed, type);
  if (isEmptyText(parsed, type)) return getEmptyText(type);
  return formatFunction(extract(parsed, type));
}

function getSet(parsed, type, subtype, mapFunction) {
  if (isDefaultValue(parsed, type)) return getDefault(parsed, type);
  if (isEmptySet(parsed, type, subtype)) return getEmptySet(type);
  return parsed[getParser(type)][counter$1[type]++].children[subtype].map(mapFunction);
}

function extract(parsed, type) {
  return getContent(parsed[getParser(type)], type);
}

function getContent(subParsed, type) {
  return subParsed[counter$1[type]++].children[type][0].image;
}

function formatId(id) {
  return Number(id.slice(1));
}

function formatText(text) {
  return unicode(text.slice(1, -1));
}

function formatNumber(number) {
  return Number(number);
}

function formatBool(bool) {
  return bool === ifcBoolValues.trueValue ? true : false;
}

function formatEnum(enumValue) {
  return enumValue.slice(1, -1);
}

function isDefaultValue(parsed, type) {
  return parsed[getParser(type)][counter$1[type]].children[ifcDataTypes.default] ? true : false;
}

function isEmptyText(parsed, type) {
  return parsed[getParser(type)][counter$1[type]].children[ifcDataTypes.emptyText] ? true : false;
}

function isEmptySet(parsed, type, subtype) {
  return parsed[getParser(type)][counter$1[type]].children[subtype] ? false : true;
}

function getDefault(parsed, type) {
  return parsed[getParser(type)][counter$1[type]++].children[ifcDataTypes.default][0].image;
}

function getEmptyText(type) {
  counter$1[type]++;
  return "";
}

function isExpressId(parsed, type) {
  return parsed[getParser(type)][counter$1[type]].children[ifcDataTypes.id] ? true : false;
}

function getIfcValueId(parsed, type) {
  const rawId = parsed[getParser(type)][counter$1[type]++].children[ifcDataTypes.id][0].image;
  return Number(rawId.slice(1));
}

function getIfcValueValue(parsed, type) {
  return parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children[type][0].image;
}

function formatIfcValue(type, value) {
  if (type === ifcValueType.number) return formatNumber(value);
  if (type === ifcValueType.text) return formatText(value);
  if (type === ifcValueType.bool) return formatBool(value);
  if (type === ifcValueType.enum) return formatEnum(value);
  return value;
}

function getIfcValueType(parsed) {
  const data = parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children;
  if (data[ifcDataTypes.number]) return ifcValueType.number;
  if (data[ifcDataTypes.text]) return ifcValueType.text;
  if (data[ifcDataTypes.bool]) return ifcValueType.bool;
  return ifcValueType.enum;
}

function getIfcUnit(parsed) {
  const ifcUnit = parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children[ifcDataTypes.value] ? parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children[ifcDataTypes.value][0].image : "";
  counter$1[ifcDataTypes.value]++;
  return ifcUnit;
}

function newSemantic(parsed, ifcItem) {
  resetSemanticFactory();
  const result = retrieveIfcObjectProperties(parsed, ifcItem);
  addClassName(result, ifcItem);
  cleanUndefinedProperties(result);
  return result;
}

function retrieveIfcObjectProperties(parsed, ifcItem) {
  const result = {};
  Object.keys(ifcItem).forEach(e => {
    if (isDataTypeValid(ifcItem[e])) result[e] = newSemanticUnit(parsed, ifcItem[e]);
  });
  return result;
}

function newSemanticUnit(parsed, dataType) {
  return {
    [typeValue.value]: getProperty(parsed, dataType),
    [typeValue.type]: dataType
  };
}

function addClassName(result, ifcItem) {
  result[namedProps.ifcClass] = ifcItem[namedProps.ifcClass];
}

function cleanUndefinedProperties(ifcItem) {
  if (ifcItem.hasOwnProperty([namedProps.undefined])) delete ifcItem[namedProps.undefined];
}

//When the parser outputs a syntactical structure, the visitor
//handles it with the correspondant method using visit()

const BaseVisitor = parser.getBaseCstVisitorConstructor();

class IfcVisitor extends BaseVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

}

function createPrimitiveSemantic() {
  Object.keys(primitiveParsers).forEach(e => {
    IfcVisitor.prototype[primitiveParsers[e].name] = parsed => {};
  });
}

function createSemantic() {
  Object.values(typesParserMap).forEach(e => {
    IfcVisitor.prototype[e[namedProps.ifcClass]] = parsed => getSemantic(ifcTypes[e[namedProps.ifcClass]], parsed);
  });
}

function getSemantic(ifcType, parsed) {
  const ifcItem = typesParserMap[ifcType];
  return newSemantic(parsed, ifcItem);
}

createPrimitiveSemantic();
createSemantic();
const ifcVisitor = new IfcVisitor();

//1. The lexer tokenizes the input
//2. The tokenized input is given to the parser
//3. The parser is applied using the chosen syntactical structure
//4. The visitor applies semantic rules to the output of the parser

function parse(text, ifcType) {
  const lexingResult = lexer.tokenize(text);
  parser.input = lexingResult.tokens;
  const cstOutput = parser[parserByType(ifcType)[namedProps.ifcClass]]();
  if (parser.errors.length > 0) showErrors(text, ifcType, parser);
  return ifcVisitor.visit(cstOutput);
}

function showErrors(text, ifcType, parser) {
  console.warn(parser.errors);
  console.warn(ifcType);
  console.warn(text);
}

class IfcItemsReader {
  constructor(ifcFile) {
    this.ifcFile = ifcFile;
  }

  readItems() {
    const {
      dataSection
    } = this.extractSections(this.ifcFile);
    return this.constructRawIfcItems(dataSection);
  }

  extractSections() {
    const ifcPlaneText = this.removeAllNewLines(this.ifcFile);
    return {
      headerSection: this.readHeaderSection(ifcPlaneText),
      dataSection: this.readDataSection(ifcPlaneText)
    };
  }

  constructRawIfcItems(dataSection) {
    const flatIfcItemList = this.separateIfcEntities(dataSection);
    return flatIfcItemList.map(e => {
      return {
        [itemsReaderValues.expressId]: this.getId(e),
        [itemsReaderValues.type]: this.getIfcType(e),
        [itemsReaderValues.properties]: this.getIfcRawProperties(e)
      };
    });
  }

  readHeaderSection(ifcLine) {
    return ifcLine.match(regexp.headerSection)[0];
  }

  readDataSection(ifcLine) {
    return ifcLine.match(regexp.dataSection)[0];
  }

  removeAllNewLines(ifcFile) {
    return ifcFile.replace(regexp.allNewLines, " ");
  }

  separateIfcEntities(dataSection) {
    return dataSection.match(regexp.singleIfcItems);
  }

  getId(rawIfcLine) {
    return parseInt(rawIfcLine.match(regexp.expressId).toString().slice(1));
  }

  getIfcType(rawIfcLine) {
    return rawIfcLine.match(regexp.rawIfcType).toString();
  }

  getIfcRawProperties(ifcLine) {
    return ifcLine.match(regexp.rawIfcProperties).toString();
  }

}

function readIfcItems(loadedIfc) {
  const ifcReader = new IfcItemsReader(loadedIfc);
  return ifcReader.readItems();
}

function referenceEntities(items) {
  let key;

  for (key in items) {
    const ifcLine = items[key];

    for (key in ifcLine) {
      const ifcProperty = ifcLine[key];
      referenceSingleItem(ifcProperty, items);
      referenceMultipleItems(ifcProperty, items);
      trimExplicitTypes(ifcLine, key);
    }
  }
}

function referenceSingleItem(ifcProperty, items) {
  if (isSingleItemValid(ifcProperty, items)) ifcProperty[typeValue.value] = items[ifcProperty[typeValue.value]];
}

function isSingleItemValid(ifcProperty, items) {
  return isItemWithReference(ifcProperty) && items.hasOwnProperty(ifcProperty[typeValue.value]);
}

function referenceMultipleItems(ifcProperty, items) {
  if (ifcProperty[typeValue.type] === ifcDataTypes.idSet) {
    const property = ifcProperty;
    const values = [...property[typeValue.value]];
    property[typeValue.value] = values.map(e => {
      return items.hasOwnProperty(e) ? items[e] : e;
    });
  }
}

function isItemWithReference(item) {
  if (item[typeValue.value] === ifcDataTypes[typeValue.value] && !isNaN(item[typeValue.value])) return true;
  if (item[typeValue.type] === ifcDataTypes.id) return true;
  return false;
}

function trimExplicitTypes(ifcLine, key) {
  const value = ifcLine[key][typeValue.value];
  if (value) ifcLine[key] = value;
}

function findRemainingTypes(items) {
  const remainingTypes = [];
  items.forEach(element => {
    if (Object.values(ifcTypes).indexOf(element[itemsReaderValues.type]) < 0) {
      if (!remainingTypes.includes(element[itemsReaderValues.type])) {
        remainingTypes.push(element[itemsReaderValues.type]);
      }
    }
  });
  if (remainingTypes.length > 0) console.log(remainingTypes);
}

function loadIfcFileItems(ifcData) {
  const ifcItems = readIfcItems(ifcData);
  findRemainingTypes(ifcItems);
  return loadItems(ifcItems);
}

function loadItems(ifcData) {
  const loadedItems = {};
  ifcData.map(ifcItem => {
    if (isTypeSupported(ifcItem)) loadedItems[ifcItem[itemsReaderValues.expressId]] = parseAndLoadItem(ifcItem);
  });
  referenceEntities(loadedItems);
  return loadedItems;
}

function parseAndLoadItem(ifcItem) {
  const parsed = parse(ifcItem[itemsReaderValues.properties], ifcItem[itemsReaderValues.type]);
  parsed[namedProps.expressId] = ifcItem[itemsReaderValues.expressId];
  return parsed;
}

function isTypeSupported(ifcItem) {
  return Object.values(ifcTypes).indexOf(ifcItem[itemsReaderValues.type]) > -1;
}

class IfcEntityFinder {
  constructor(ifcData) {
    this.ifcData = ifcData;
  }

  findByType(ifcType) {
    const matches = {};
    Object.keys(this.ifcData).forEach(e => {
      if (this.getType(e) === getName(ifcType)) {
        matches[e] = this.ifcData[e];
      }
    });
    return matches;
  }

  getType(id) {
    return this.ifcData[id][namedProps.ifcClass];
  }

  findAllProducts(spatialStructureElements, elements = []) {
    spatialStructureElements.forEach(spatial => {
      const buildingElementsHere = spatial[namedProps.hasBuildingElements];
      const spatialElementsHere = spatial[namedProps.hasSpatial];
      if (buildingElementsHere) elements.push(...buildingElementsHere);
      if (spatialElementsHere) this.findAllProducts(spatialElementsHere, elements);
    });
    return elements;
  }

}

function createIfcItemsFinder(loadedIfc) {
  return new IfcEntityFinder(loadedIfc);
}

function bindElements(finder, type, relating, related, property) {
  const relations = finder.findByType(type);
  Object.values(relations).forEach(relation => {
    return isArray(relation[relating]) ? bindMultiple(relation, relating, related, property) : bindSingle(relation, relating, related, property);
  });
}

function bindSingle(relation, relating, related, property) {
  if (!relation[relating][property]) relation[relating][property] = [];
  bind(relation[relating][property], relation, related);
}

function bindMultiple(relation, relating, related, property) {
  relation[relating].forEach(e => {
    if (!e[property]) e[property] = [];
    bind(e[property], relation, related);
  });
}

function bind(property, relation, related) {
  return isArray(relation[related]) ? property.push(...relation[related]) : property.push(relation[related]);
}

function isArray(item) {
  return item.constructor === Array;
}

function constructProject(ifcData) {
  const finder = createIfcItemsFinder(ifcData);
  bindAllElements(finder);
  const ifcProjects = getIfcProjects(finder);
  const elements = finder.findAllProducts(ifcProjects);
  const spaces = getIfcSpaces(finder);
  return {
    [structuredData.ifcProject]: ifcProjects,
    [structuredData.products]: elements,
    [structuredData.spaces]: spaces
  };
}

function getIfcProjects(finder) {
  return Object.values(finder.findByType(ifcTypes.IfcProject));
}

function getIfcSpaces(finder) {
  return Object.values(finder.findByType(ifcTypes.IfcSpace));
}

function bindAllElements(finder) {
  bindSpatialToSpatial(finder);
  bindElementsToSpatial(finder);
  bindVoidsToElements(finder);
  bindFillingsToElements(finder);
  bindTypesToElements(finder);
}

function bindSpatialToSpatial(finder) {
  bindElements(finder, ifcTypes.IfcRelAggregates, namedProps.relatingObject, namedProps.relatedObjects, namedProps.hasSpatial);
}

function bindElementsToSpatial(finder) {
  bindElements(finder, ifcTypes.IfcRelContainedInSpatialStructure, namedProps.relatingStructure, namedProps.relatedElements, namedProps.hasBuildingElements);
}

function bindVoidsToElements(finder) {
  bindElements(finder, ifcTypes.IfcRelVoidsElement, namedProps.relatingBuildingElement, namedProps.relatedOpeningElement, namedProps.hasOpenings);
}

function bindFillingsToElements(finder) {
  bindElements(finder, ifcTypes.IfcRelFillsElement, namedProps.relatingOpeningElement, namedProps.relatedBuildingElement, namedProps.hasFillings);
}

function bindTypesToElements(finder) {
  bindElements(finder, ifcTypes.IfcRelDefinesByType, namedProps.relatedObjects, namedProps.relatingType, namedProps.hasType);
}

function resetTransformData(product, property) {
  product[property] = {
    [pivots.locat]: [],
    [pivots.xAxis]: [],
    [pivots.yAxis]: [],
    [pivots.zAxis]: []
  };
}

function trackLocalTransform(product, placement, property) {
  const transform = initializeTransform(product, property);
  const {
    locat,
    xAxis,
    yAxis,
    zAxis
  } = getTransform(placement);
  transform[pivots.locat].push(locat);
  transform[pivots.xAxis].push(xAxis);
  transform[pivots.yAxis].push(yAxis);
  transform[pivots.zAxis].push(zAxis);
}

function initializeTransform(product, property) {
  if (!product[property]) resetTransformData(product, property);
  return product[property];
}

function getTransform(placement) {
  const locat = getLocat(placement);
  const xAxis = getAxisX(placement);
  const zAxis = getAxisZ(placement);
  const yAxis = getAxisY(zAxis, xAxis);
  return {
    locat,
    xAxis,
    yAxis,
    zAxis
  };
}

function getLocat(placement) {
  if (isInvalid(placement[namedProps.location])) return [0, 0, 0];
  const location = placement[namedProps.location][namedProps.coordinates];
  if (location.length === 2) location.push(0);
  return location;
}

function getAxisX(placement) {
  if (isInvalid(placement[namedProps.refDirection])) return [1, 0, 0];
  let x = placement[namedProps.refDirection][namedProps.dirRatios];
  if (x.length === 2) x.push(0);
  return x;
}

function getAxisZ(placement) {
  if (isInvalid(placement[namedProps.axis])) return [0, 0, 1];
  const z = placement[namedProps.axis][namedProps.dirRatios];
  if (z.length === 2) z.push(0);
  return z;
} //In IFC the axis Y is implicit (computed from X and Z)


function getAxisY(X, Z) {
  return [X[1] * Z[2] - X[2] * Z[1], X[2] * Z[0] - X[0] * Z[2], X[0] * Z[1] - X[1] * Z[0]];
}

function isInvalid(prop) {
  if (!prop || prop === defaultValue) return true;
  return false;
}

function applyTransforms(product, property) {
  const pivots = getPivots(product[property]);
  product[namedProps.geometry].forEach(geometry => applyTransform(geometry, pivots));
}

function applyTransformsTo(product, geometry, property) {
  const pivots = getPivots(product[property]);
  applyTransform(geometry, pivots);
  resetTransformData(product, property);
}

function applyTransform(geometry, pivots) {
  const object3D = new THREE.Object3D();

  if (geometry) {
    bindGeometryToPivots(geometry, pivots);
    object3D.add(pivots[0]);
    attachGeometryToScene(geometry, object3D);
    object3D.remove(pivots[0]);
  }
}

function attachGeometryToScene(geometry, object3D) {
  if (geometry.constructor === Array) return geometry.forEach(e => attachGeometryToScene(e, object3D));
  return object3D.attach(geometry);
}

function bindGeometryToPivots(geometry, pivots) {
  if (geometry.constructor === Array) return geometry.forEach(e => bindGeometryToPivots(e, pivots));
  pivots[pivots.length - 1].add(geometry);
}

function getPivots(transform) {
  const pivots$1 = [];
  const locations = transform[pivots.locat] || [];

  for (let i = locations.length - 1; i >= 0; i--) {
    const pivot = new THREE.Object3D();
    pivot.rotation.setFromRotationMatrix(getRotMat(transform, i));
    pivot.position.set(...locations[i]);
    pivots$1.push(pivot);
  }

  bindPivots(pivots$1);
  return pivots$1;
}

function bindPivots(pivots) {
  for (let i = 0; i < pivots.length; i++) {
    if (pivots[i + 1]) pivots[i].add(pivots[i + 1]);
  }
}

function getRotMat(transform, index) {
  const {
    x,
    y,
    z
  } = getTransforms(transform, index);
  const directionMatrix = new THREE.Matrix4();
  const rotationMatrix = new THREE.Matrix4();
  directionMatrix.set(x[0], x[1], x[2], 0, y[0], y[1], y[2], 0, z[0], z[1], z[2], 0, 0, 0, 0, 1);
  rotationMatrix.getInverse(directionMatrix);
  return rotationMatrix;
}

function getTransforms(transform, index) {
  const x = transform[pivots.xAxis][index];
  const y = transform[pivots.yAxis][index];
  const z = transform[pivots.zAxis][index];
  return {
    x,
    y,
    z
  };
}

function applyTransformations(structured) {
  structured[structuredData.products].forEach(product => {
    applyTransform$1(product);
  });
}

function applyTransform$1(product) {
  getTransform$1(product, getPlacement(product));
  applyTransforms(product, namedProps.transform);
  if (product[namedProps.hasOpenings]) product[namedProps.hasOpenings].forEach(opening => {
    getTransform$1(opening, getPlacement(opening));
    applyTransforms(opening, namedProps.transform);
  });
  if (product[namedProps.hasSpatial]) product[namedProps.hasSpatial].forEach(spatial => {
    getTransform$1(spatial, getPlacement(spatial));
    applyTransforms(spatial, namedProps.transform);
  });
} //Gets all the transforms (local origins) recursively


function getTransform$1(product, objPlacement) {
  try {
    const placement = objPlacement[namedProps.relativePlacement];
    trackLocalTransform(product, placement, namedProps.transform);

    if (objPlacement[namedProps.placementRelTo] != defaultValue) {
      getTransform$1(product, objPlacement[namedProps.placementRelTo]);
    }
  } catch (e) {
    console.warn(e);
  }
}

function getPlacement(product) {
  try {
    return product[namedProps.objectPlacement];
  } catch (e) {
    console.warn(e);
  }
}

function createLine(coordinates) {
  const material = new THREE.LineBasicMaterial({
    linecap: "round",
    color: 0xff0000
  });
  const points = [];
  coordinates.forEach(e => {
    points.push(new THREE.Vector3(e[0], e[1]));
  });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  return line;
}

function mapCurve2D(shape) {
  const points = [];
  shape[namedProps.items][0][namedProps.points].forEach(point => {
    points.push(point[namedProps.coordinates]);
  });
  return createLine(points);
}

function createExtrusionsByPoints(points, depth) {
  //Profile
  const shapePoints = [];
  points.forEach(e => shapePoints.push(new THREE.Vector3(e[1], -e[0])));
  var shape = new THREE.Shape(shapePoints);
  return createExtrusion(shape, depth);
}

function createCircularExtrusion(radius, depth) {
  const geometry = new THREE.CylinderGeometry(radius, radius, depth, 64);
  const mesh = new THREE.Mesh(geometry);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.z = depth / 2;
  mesh.updateMatrix();
  return mesh;
}

function createExtrusion(shape, depth) {
  // Material for mesh
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff
  }); //Direction

  var v1 = new THREE.Vector3(0, 0, 0);
  var v2 = new THREE.Vector3(0, 0, depth);
  var path = new THREE.LineCurve3(v1, v2); //Settings

  var extrudeSettings = {
    bevelEnabled: false,
    steps: 1,
    extrudePath: path
  }; //Mesh

  var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function mapRectangleProfileExtrusion(extruded, product) {
  getRectProfileDimensions(extruded);
  const position = extruded.profile[namedProps.position];
  trackLocalTransform(product, position, namedProps.transformOfExtrusion);
  const points = getRectProfilePoints(extruded);
  return createExtrusionsByPoints(points, extruded.depth);
}

function getRectProfilePoints(extruded) {
  const halfWidth = extruded[namedProps.xDim] / 2;
  const halfHeight = extruded[namedProps.yDim] / 2;
  return [[-halfWidth, halfHeight], [halfWidth, halfHeight], [halfWidth, -halfHeight], [-halfWidth, -halfHeight]];
}

function getRectProfileDimensions(extruded) {
  extruded[namedProps.xDim] = extruded.profile[namedProps.xDim];
  extruded[namedProps.yDim] = extruded.profile[namedProps.yDim];
}

function mapArbitraryProfileExtrusion(extruded) {
  const points = getArbitraryProfilePoints(extruded);
  return createExtrusionsByPoints(points, extruded.depth);
}

function getArbitraryProfilePoints(extruded) {
  const profile = extruded.profile;
  const points = profile[namedProps.outerCurve][namedProps.points];
  return points.map(point => {
    const coords = point[namedProps.coordinates];
    return [-coords[0], -coords[1]];
  });
}

function mapArbitraryProfileWithVoidsExtrusion(extruded) {
  const points = getArbitraryProfilePoints$1(extruded);
  return createExtrusionsByPoints(points, extruded.depth);
}

function getArbitraryProfilePoints$1(extruded) {
  const profile = extruded.profile;
  const points = profile[namedProps.outerCurve][namedProps.points];
  return points.map(point => {
    const coords = point[namedProps.coordinates];
    return [-coords[0], -coords[1]];
  });
}

function mapCircleProfileExtrusion(extruded, product) {
  const position = extruded.profile[namedProps.position];
  trackLocalTransform(product, position, namedProps.transformOfExtrusion);
  const radius = extruded.profile[namedProps.radius];
  return createCircularExtrusion(radius, extruded.depth);
}

function mapSweptSolid(shape, product) {
  const items = [];
  shape[namedProps.items].forEach(extruded => items.push(newSolid(product, extruded)));
  return joinAllExtrusions(items);
}

function joinAllExtrusions(items) {
  var singleGeometry = new THREE.Geometry();
  items.forEach(item => {
    item.updateMatrix();
    singleGeometry.merge(item.geometry, item.matrix); // scene.remove(item);
  });
  const result = new THREE.Mesh(singleGeometry); // scene.add(result);

  return result;
} //Beware: the creation of the solid must occur BEFORE trackLocalTransformation()
//Because the local transformations are tracked from inside to outside
//Same logic as IfcLocalPlacement used to locate the products


function newSolid(product, extruded) {
  const extrudedProps = getExtrusionProps(extruded);
  const solid = getExtrusionByType(extrudedProps, product);
  const position = extruded[namedProps.position];
  trackLocalTransform(product, position, namedProps.transformOfExtrusion);
  applyTransformsTo(product, solid, namedProps.transformOfExtrusion);
  return solid;
}

function getExtrusionProps(extruded) {
  return {
    profile: extruded[namedProps.sweptArea],
    ifcClass: extruded[namedProps.sweptArea][namedProps.ifcClass],
    depth: extruded[namedProps.depth],
    direction: extruded[namedProps.extDirection][namedProps.dirRatios]
  };
}

const extrusionTypes = {
  [ifcTypes.IfcRectangleProfileDef]: mapRectangleProfileExtrusion,
  [ifcTypes.IfcCircleProfileDef]: mapCircleProfileExtrusion,
  [ifcTypes.IfcArbitraryClosedProfileDef]: mapArbitraryProfileExtrusion,
  [ifcTypes.IfcArbitraryProfileDefWithVoids]: mapArbitraryProfileWithVoidsExtrusion
};

function getExtrusionByType(extruded, product) {
  return extrusionTypes[extruded.ifcClass.toUpperCase()](extruded, product);
}

function mapMappedRepresentation(shape, product) {
  const representation = shape[namedProps.items][0];
  const target = getMappingTarget(representation);
  const mapped = getMappingSource(product, representation);
  applyTransformation(product, target, mapped);
  return mapped;
} //The concept of mapped representation is that there are several instances
//of the same geometry. Storing the geometries allows to generate them
//only once and them simply create each instance copying the source geometry.


const mappingSources = {};

function getMappingSource(product, representation) {
  const source = representation[namedProps.mappingSource];
  const origin = source[namedProps.mappingOrigin];
  const geometry = isGeometryGenerated(source) ? getGeneratedGeometry(source) : generateGeometry(source, product);
  applyTransformation(product, origin, geometry);
  return geometry;
}

function generateGeometry(source, product) {
  const mappedGeometry = source[namedProps.mappedRepresentation];
  const geometry = getMappedGeometry(mappedGeometry, product);
  mappingSources[source[namedProps.expressId]] = geometry; // scene.remove(geometry);

  return geometry.clone();
}

function isGeometryGenerated(source) {
  return mappingSources[source[namedProps.expressId]] ? true : false;
}

function getGeneratedGeometry(source) {
  return mappingSources[source[namedProps.expressId]].clone();
}

function applyTransformation(product, origin, geometry) {
  trackLocalTransform(product, origin, namedProps.transformOfMappedItem);
  applyTransformsTo(product, geometry, namedProps.transformOfMappedItem);
} //The mapping target defines the transformation of the mapped items
//Generally, the transformation is read from IfcAxis2Placement instances
//This is an exception: data needs to be structured like an IfcAxis2Placement


function getMappingTarget(representation) {
  const target = representation[namedProps.mappingTarget];
  return {
    [namedProps.location]: {
      [namedProps.coordinates]: getTargetOrigin(target)
    },
    [namedProps.refDirection]: {
      [namedProps.dirRatios]: getAxis(target, namedProps.axis1, [1, 0, 0])
    },
    [namedProps.axis]: {
      [namedProps.dirRatios]: getAxis(target, namedProps.axis3, [0, 0, 1])
    },
    [namedProps.scale]: target[namedProps.scale]
  };
}

function getTargetOrigin(target) {
  return target[namedProps.localOrigin][namedProps.coordinates];
}

function getAxis(target, axis, def) {
  const value = target[axis];
  return value === defaultValue ? def : value;
}

function createFace(faceDefinition, stop) {
  //Credit to the following algorithm:
  //https://stackoverflow.com/questions/50272399/three-js-2d-object-in-3d-space-by-vertices/50274103#50274103
  const outerCoords = faceDefinition.outerBounds.bounds[0];
  let outerPoints = getPoints(outerCoords);
  let quaternion = getQuaternions(outerPoints);
  let tempOuterPoints = getTempPoints(outerPoints, quaternion);
  const temp = tempOuterPoints.map(e => new THREE.Vector2(e.x, e.y));

  if (!THREE.ShapeUtils.isClockWise(temp)) {
    outerPoints = getPoints(outerCoords).reverse();
    quaternion = getQuaternions(outerPoints);
    tempOuterPoints = getTempPoints(outerPoints, quaternion);
  }

  const outerShape = new THREE.Shape(tempOuterPoints);
  const allPoints = [...outerPoints];
  if (hasHoles(faceDefinition)) punchHoles(faceDefinition, quaternion, allPoints, outerShape);
  const shapeGeom = new THREE.ShapeGeometry(outerShape, 24);
  const mesh = new THREE.Mesh(shapeGeom);
  mesh.geometry.vertices = allPoints;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
  return mesh;
}

function getPoints(coordinates) {
  return coordinates.map(p => new THREE.Vector3(p[0], p[1], p[2]));
}

function getTempPoints(points, quaternion) {
  return points.map(p => p.clone().applyQuaternion(quaternion));
}

function hasHoles(faceDefinition) {
  return faceDefinition.innerBounds.bounds.length > 0;
}

function punchHoles(faceDefinition, quaternion, allPoints, outerShape) {
  faceDefinition.innerBounds.bounds.forEach(bound => {
    const innerPoints = getPoints(bound);
    const tempInnerPoints = getTempPoints(innerPoints, quaternion);
    const innerShape = new THREE.Path(tempInnerPoints);
    outerShape.holes.push(innerShape);
    allPoints.push(...innerPoints);
  });
} //To find the normal of the face it is necessary to iterate through the vertices
//To make sure that the selected triangle of vertex is valid (not aligned)
//The precission correction is necessary because in a surface with a lot of points
//the triangle used to calculate the normal should be as big as possible to avoid 
//small precision deviations to affect the direction of the normal


function getQuaternions(points) {
  const baseNormal = new THREE.Vector3(0, 0, 1);
  const normal = new THREE.Vector3();
  const precisionCorrection = points.length > 10;
  const corrector1 = precisionCorrection ? Math.ceil(points.length / 2) : 0;
  const corrector2 = precisionCorrection ? Math.ceil(points.length / 4) : 0;
  let i = 0;

  while (normal.x === 0 && normal.y === 0 && normal.z === 0) {
    const tri = new THREE.Triangle(points[2 + i + corrector1], points[1 + i + corrector2], points[0 + i]);
    tri.getNormal(normal);
    i++;
  }

  return new THREE.Quaternion().setFromUnitVectors(normal, baseNormal);
}

function mapBrep(shape, product) {
  const representations = shape[namedProps.items];
  const definitions = [];
  const faces = [];
  representations.forEach(r => definitions.push(...getBrepGeometry(r)));
  definitions.forEach(definition => faces.push(createFace(definition)));
  return joinAllFaces(faces);
}

function joinAllFaces(faces) {
  const joined = new THREE.Geometry();
  faces.forEach(face => joined.merge(face.geometry, face.matrix));
  const material = new THREE.MeshPhongMaterial({
    side: 2
  });
  const mesh = new THREE.Mesh(joined, material);
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
  mesh[namedProps.isBrep] = true;
  return mesh;
}

function getBrepGeometry(representation) {
  const faces = [];
  const ifcFaces = representation[namedProps.outer][namedProps.cfsFaces];
  ifcFaces.forEach(face => faces.push(getAllBounds(face)));
  return faces;
}

function getAllBounds(face) {
  const outerBoundsInfo = filterBounds(face, ifcTypes.IfcFaceOuterBound);
  const innerBoundsInfo = filterBounds(face, ifcTypes.IfcFaceBound);
  const outerBounds = getBounds(outerBoundsInfo);
  const innerBounds = innerBoundsInfo ? getBounds(innerBoundsInfo) : {};
  return {
    outerBounds,
    innerBounds
  };
}

function getBounds(ifcBounds) {
  const bounds = [];
  const orientation = [];
  ifcBounds.forEach(bound => {
    bounds.push(getPoints$1(bound));
    orientation.push(bound[namedProps.orientation]);
  });
  return {
    orientation,
    bounds
  };
}

function getPoints$1(bound) {
  const points = bound[namedProps.bound][namedProps.polygon];
  const coordinates = [];
  points.forEach(point => {
    const coord = point[namedProps.coordinates];
    if (coord) coordinates.push(coord);
  });
  return coordinates;
}

function filterBounds(face, type) {
  return face[namedProps.bounds].filter(e => e[namedProps.ifcClass] === getName(type));
}

const geometryMap = {
  [geometryTypes.curve2D]: mapCurve2D,
  [geometryTypes.sweptSolid]: mapSweptSolid,
  [geometryTypes.mappedRepresentation]: mapMappedRepresentation,
  [geometryTypes.brep]: mapBrep
};

function constructGeometries(structured) {
  structured[structuredData.products].forEach(product => constructGeometry(product));
  structured[structuredData.spaces].forEach(space => constructGeometry(space));
}

function constructGeometry(item) {
  try {
    getRepresentations(item);
    mapRepresentations(item);
  } catch (e) {
    console.warn(e);
  }
}

function getRepresentations(product) {
  getRepresentationValue(product);
  if (product[namedProps.hasOpenings]) product[namedProps.hasOpenings].forEach(opening => {
    getRepresentationValue(opening);
  });
  if (product[namedProps.hasSpatial]) product[namedProps.hasSpatial].forEach(spatial => {
    getRepresentationValue(spatial);
  });
}

function getRepresentationValue(product) {
  try {
    const representations = product[namedProps.representation][namedProps.representations];
    product[namedProps.geomRepresentations] = representations ? representations : [];
  } catch (e) {
    console.warn(e);
  }
}

function mapRepresentations(product) {
  mapProductRepresentations(product);
  if (product[namedProps.hasOpenings]) product[namedProps.hasOpenings].forEach(opening => {
    mapProductRepresentations(opening);
  });
  if (product[namedProps.hasSpatial]) product[namedProps.hasSpatial].forEach(spatial => {
    mapProductRepresentations(spatial);
  });
}

function mapProductRepresentations(product) {
  product[namedProps.geometry] = [];
  product[namedProps.geomRepresentations].forEach(representation => {
    product[namedProps.geometry].push(getMappedGeometry(representation, product));
  });
}

function getMappedGeometry(representation, product) {
  try {
    const representationType = getType(representation);
    return geometryMap[representationType](representation, product);
  } catch (e) {
    console.warn(e);
  }
}

function getType(representation) {
  return representation[namedProps.representationType];
}

//
// Copyright (c) 2011 Evan Wallace (http://madebyevan.com/), under the MIT license.
// THREE.js rework by thrax
// # class CSG
// Holds a binary space partition tree representing a 3D solid. Two solids can
// be combined using the `union()`, `subtract()`, and `intersect()` methods.

class CSG {
  constructor() {
    this.polygons = [];
  }

  clone() {
    var csg = new CSG();
    csg.polygons = this.polygons.map(function (p) {
      return p.clone();
    });
    return csg;
  }

  toPolygons() {
    return this.polygons;
  }

  union(csg) {
    var a = new Node(this.clone().polygons);
    var b = new Node(csg.clone().polygons);
    a.clipTo(b);
    b.clipTo(a);
    b.invert();
    b.clipTo(a);
    b.invert();
    a.build(b.allPolygons());
    return CSG.fromPolygons(a.allPolygons());
  }

  subtract(csg) {
    var a = new Node(this.clone().polygons);
    var b = new Node(csg.clone().polygons);
    a.invert();
    a.clipTo(b);
    b.clipTo(a);
    b.invert();
    b.clipTo(a);
    b.invert();
    a.build(b.allPolygons());
    a.invert();
    return CSG.fromPolygons(a.allPolygons());
  }

  intersect(csg) {
    var a = new Node(this.clone().polygons);
    var b = new Node(csg.clone().polygons);
    a.invert();
    b.clipTo(a);
    b.invert();
    a.clipTo(b);
    b.clipTo(a);
    a.build(b.allPolygons());
    a.invert();
    return CSG.fromPolygons(a.allPolygons());
  } // Return a new CSG solid with solid and empty space switched. This solid is
  // not modified.


  inverse() {
    var csg = this.clone();
    csg.polygons.map(function (p) {
      p.flip();
    });
    return csg;
  }

} // Construct a CSG solid from a list of `Polygon` instances.


CSG.fromPolygons = function (polygons) {
  var csg = new CSG();
  csg.polygons = polygons;
  return csg;
}; // # class Vector
// Represents a 3D vector.
//
// Example usage:
//
//     new CSG.Vector(1, 2, 3);
//     new CSG.Vector([1, 2, 3]);
//     new CSG.Vector({ x: 1, y: 2, z: 3 });


class Vector extends THREE$1.Vector3 {
  constructor(x, y, z) {
    if (arguments.length == 3) super(x, y, z);else if (Array.isArray(x)) super(x[0], x[1], x[2]);else if (typeof x == 'object') super().copy(x);else throw 'Invalid constructor to vector';
  }

  clone() {
    return new Vector(this);
  }

  negated() {
    return this.clone().multiplyScalar(-1);
  }

  plus(a) {
    return this.clone().add(a);
  }

  minus(a) {
    return this.clone().sub(a);
  }

  times(a) {
    return this.clone().multiplyScalar(a);
  }

  dividedBy(a) {
    return this.clone().divideScalar(a);
  }

  lerp(a, t) {
    return this.plus(a.minus(this).times(t));
  }

  unit() {
    return this.dividedBy(this.length());
  }

  cross(a) {
    return THREE$1.Vector3.prototype.cross.call(this.clone(), a);
  }

} // # class Vertex
// Represents a vertex of a polygon. Use your own vertex class instead of this
// one to provide additional features like texture coordinates and vertex
// colors. Custom vertex classes need to provide a `pos` property and `clone()`,
// `flip()`, and `interpolate()` methods that behave analogous to the ones
// defined by `CSG.Vertex`. This class provides `normal` so convenience
// functions like `CSG.sphere()` can return a smooth vertex normal, but `normal`
// is not used anywhere else.


class Vertex {
  constructor(pos, normal, uv) {
    this.pos = new Vector(pos);
    this.normal = new Vector(normal);
    this.uv = new Vector(uv);
  }

  clone() {
    return new Vertex(this.pos.clone(), this.normal.clone(), this.uv.clone());
  } // Invert all orientation-specific data (e.g. vertex normal). Called when the
  // orientation of a polygon is flipped.


  flip() {
    this.normal = this.normal.negated();
  } // Create a new vertex between this vertex and `other` by linearly
  // interpolating all properties using a parameter of `t`. Subclasses should
  // override this to interpolate additional properties.


  interpolate(other, t) {
    return new Vertex(this.pos.lerp(other.pos, t), this.normal.lerp(other.normal, t), this.uv.lerp(other.uv, t));
  }

} // # class Plane
// Represents a plane in 3D space.


class Plane {
  constructor(normal, w) {
    this.normal = normal;
    this.w = w;
  }

  clone() {
    return new Plane(this.normal.clone(), this.w);
  }

  flip() {
    this.normal = this.normal.negated();
    this.w = -this.w;
  } // Split `polygon` by this plane if needed, then put the polygon or polygon
  // fragments in the appropriate lists. Coplanar polygons go into either
  // `coplanarFront` or `coplanarBack` depending on their orientation with
  // respect to this plane. Polygons in front or in back of this plane go into
  // either `front` or `back`.


  splitPolygon(polygon, coplanarFront, coplanarBack, front, back) {
    var COPLANAR = 0;
    var FRONT = 1;
    var BACK = 2;
    var SPANNING = 3; // Classify each point as well as the entire polygon into one of the above
    // four classes.

    var polygonType = 0;
    var types = [];

    for (var i = 0; i < polygon.vertices.length; i++) {
      var t = this.normal.dot(polygon.vertices[i].pos) - this.w;
      var type = t < -Plane.EPSILON ? BACK : t > Plane.EPSILON ? FRONT : COPLANAR;
      polygonType |= type;
      types.push(type);
    } // Put the polygon in the correct list, splitting it when necessary.


    switch (polygonType) {
      case COPLANAR:
        (this.normal.dot(polygon.plane.normal) > 0 ? coplanarFront : coplanarBack).push(polygon);
        break;

      case FRONT:
        front.push(polygon);
        break;

      case BACK:
        back.push(polygon);
        break;

      case SPANNING:
        var f = [],
            b = [];

        for (var i = 0; i < polygon.vertices.length; i++) {
          var j = (i + 1) % polygon.vertices.length;
          var ti = types[i],
              tj = types[j];
          var vi = polygon.vertices[i],
              vj = polygon.vertices[j];
          if (ti != BACK) f.push(vi);
          if (ti != FRONT) b.push(ti != BACK ? vi.clone() : vi);

          if ((ti | tj) == SPANNING) {
            var t = (this.w - this.normal.dot(vi.pos)) / this.normal.dot(vj.pos.minus(vi.pos));
            var v = vi.interpolate(vj, t);
            f.push(v);
            b.push(v.clone());
          }
        }

        if (f.length >= 3) front.push(new Polygon(f, polygon.shared));
        if (b.length >= 3) back.push(new Polygon(b, polygon.shared));
        break;
    }
  }

} // `Plane.EPSILON` is the tolerance used by `splitPolygon()` to decide if a
// point is on the plane.


Plane.EPSILON = 1e-5;

Plane.fromPoints = function (a, b, c) {
  var n = b.minus(a).cross(c.minus(a)).unit();
  return new Plane(n, n.dot(a));
}; // # class Polygon
// Represents a convex polygon. The vertices used to initialize a polygon must
// be coplanar and form a convex loop. They do not have to be `Vertex`
// instances but they must behave similarly (duck typing can be used for
// customization).
//
// Each convex polygon has a `shared` property, which is shared between all
// polygons that are clones of each other or were split from the same polygon.
// This can be used to define per-polygon properties (such as surface color).


class Polygon {
  constructor(vertices, shared) {
    this.vertices = vertices;
    this.shared = shared;
    this.plane = Plane.fromPoints(vertices[0].pos, vertices[1].pos, vertices[2].pos);
  }

  clone() {
    var vertices = this.vertices.map(function (v) {
      return v.clone();
    });
    return new Polygon(vertices, this.shared);
  }

  flip() {
    this.vertices.reverse().map(function (v) {
      v.flip();
    });
    this.plane.flip();
  }

} // # class Node
// Holds a node in a BSP tree. A BSP tree is built from a collection of polygons
// by picking a polygon to split along. That polygon (and all other coplanar
// polygons) are added directly to that node and the other polygons are added to
// the front and/or back subtrees. This is not a leafy BSP tree since there is
// no distinction between internal and leaf nodes.


class Node {
  constructor(polygons) {
    this.plane = null;
    this.front = null;
    this.back = null;
    this.polygons = [];
    if (polygons) this.build(polygons);
  }

  clone() {
    var node = new Node();
    node.plane = this.plane && this.plane.clone();
    node.front = this.front && this.front.clone();
    node.back = this.back && this.back.clone();
    node.polygons = this.polygons.map(function (p) {
      return p.clone();
    });
    return node;
  } // Convert solid space to empty space and empty space to solid space.


  invert() {
    for (var i = 0; i < this.polygons.length; i++) this.polygons[i].flip();

    this.plane.flip();
    if (this.front) this.front.invert();
    if (this.back) this.back.invert();
    var temp = this.front;
    this.front = this.back;
    this.back = temp;
  } // Recursively remove all polygons in `polygons` that are inside this BSP
  // tree.


  clipPolygons(polygons) {
    if (!this.plane) return polygons.slice();
    var front = [],
        back = [];

    for (var i = 0; i < polygons.length; i++) {
      this.plane.splitPolygon(polygons[i], front, back, front, back);
    }

    if (this.front) front = this.front.clipPolygons(front);
    if (this.back) back = this.back.clipPolygons(back);else back = [];
    return front.concat(back);
  } // Remove all polygons in this BSP tree that are inside the other BSP tree
  // `bsp`.


  clipTo(bsp) {
    this.polygons = bsp.clipPolygons(this.polygons);
    if (this.front) this.front.clipTo(bsp);
    if (this.back) this.back.clipTo(bsp);
  } // Return a list of all polygons in this BSP tree.


  allPolygons() {
    var polygons = this.polygons.slice();
    if (this.front) polygons = polygons.concat(this.front.allPolygons());
    if (this.back) polygons = polygons.concat(this.back.allPolygons());
    return polygons;
  } // Build a BSP tree out of `polygons`. When called on an existing tree, the
  // new polygons are filtered down to the bottom of the tree and become new
  // nodes there. Each set of polygons is partitioned using the first polygon
  // (no heuristic is used to pick a good split).


  build(polygons) {
    if (!polygons.length) return;
    if (!this.plane) this.plane = polygons[0].plane.clone();
    var front = [],
        back = [];

    for (var i = 0; i < polygons.length; i++) {
      this.plane.splitPolygon(polygons[i], this.polygons, this.polygons, front, back);
    }

    if (front.length) {
      if (!this.front) this.front = new Node();
      this.front.build(front);
    }

    if (back.length) {
      if (!this.back) this.back = new Node();
      this.back.build(back);
    }
  }

}

CSG.fromGeometry = function (geom) {
  if (geom.isBufferGeometry) geom = new THREE$1.Geometry().fromBufferGeometry(geom);
  var fs = geom.faces;
  var vs = geom.vertices;
  var polys = [];
  var fm = ['a', 'b', 'c'];

  for (var i = 0; i < fs.length; i++) {
    var f = fs[i];
    var vertices = [];

    for (var j = 0; j < 3; j++) vertices.push(new Vertex(vs[f[fm[j]]], f.vertexNormals[j], geom.faceVertexUvs[0][i][j]));

    polys.push(new Polygon(vertices));
  }

  return CSG.fromPolygons(polys);
};

CSG._tmpm3 = new THREE$1.Matrix3();

CSG.fromMesh = function (mesh) {
  var csg = CSG.fromGeometry(mesh.geometry);

  CSG._tmpm3.getNormalMatrix(mesh.matrix);

  for (var i = 0; i < csg.polygons.length; i++) {
    var p = csg.polygons[i];

    for (var j = 0; j < p.vertices.length; j++) {
      var v = p.vertices[j];
      v.pos.applyMatrix4(mesh.matrix);
      v.normal.applyMatrix3(CSG._tmpm3);
    }
  }

  return csg;
};

CSG.toMesh = function (csg, toMatrix) {
  var geom = new THREE$1.Geometry();
  var ps = csg.polygons;
  var vs = geom.vertices;
  var fvuv = geom.faceVertexUvs[0];

  for (var i = 0; i < ps.length; i++) {
    var p = ps[i];
    var pvs = p.vertices;
    var v0 = vs.length;
    var pvlen = pvs.length;

    for (var j = 0; j < pvlen; j++) vs.push(new THREE$1.Vector3().copy(pvs[j].pos));

    for (var j = 3; j <= pvlen; j++) {
      var fc = new THREE$1.Face3();
      var fuv = [];
      fvuv.push(fuv);
      var fnml = fc.vertexNormals;
      fc.a = v0;
      fc.b = v0 + j - 2;
      fc.c = v0 + j - 1;
      fnml.push(new THREE$1.Vector3().copy(pvs[0].normal));
      fnml.push(new THREE$1.Vector3().copy(pvs[j - 2].normal));
      fnml.push(new THREE$1.Vector3().copy(pvs[j - 1].normal));
      fuv.push(new THREE$1.Vector3().copy(pvs[0].uv));
      fuv.push(new THREE$1.Vector3().copy(pvs[j - 2].uv));
      fuv.push(new THREE$1.Vector3().copy(pvs[j - 1].uv));
      fc.normal = new THREE$1.Vector3().copy(p.plane.normal);
      geom.faces.push(fc);
    }
  }

  var inv = new THREE$1.Matrix4().getInverse(toMatrix);
  geom.applyMatrix4(inv);
  geom.verticesNeedUpdate = geom.elementsNeedUpdate = geom.normalsNeedUpdate = true;
  geom.computeBoundingSphere();
  geom.computeBoundingBox();
  var m = new THREE$1.Mesh(geom);
  m.matrix.copy(toMatrix);
  m.matrix.decompose(m.position, m.rotation, m.scale);
  m.updateMatrixWorld();
  return m;
};

CSG.ieval = function (tokens, index = 0) {
  if (typeof tokens === 'string') CSG.currentOp = tokens;else if (tokens instanceof Array) {
    for (let i = 0; i < tokens.length; i++) CSG.ieval(tokens[i], 0);
  } else if (typeof tokens === 'object') {
    var op = CSG.currentOp;
    tokens.updateMatrix();
    tokens.updateMatrixWorld();
    if (!CSG.sourceMesh) CSG.currentPrim = CSG.fromMesh(CSG.sourceMesh = tokens);else {
      CSG.nextPrim = CSG.fromMesh(tokens);
      CSG.currentPrim = CSG.currentPrim[op](CSG.nextPrim);
    }
    if (CSG.doRemove) tokens.parent.remove(tokens);
  } //union,subtract,intersect,inverse
};

CSG.eval = function (tokens, doRemove) {
  //[['add',mesh,mesh,mesh,mesh],['sub',mesh,mesh,mesh,mesh]]
  CSG.currentOp = null;
  CSG.sourceMesh = null;
  CSG.doRemove = doRemove;
  CSG.ieval(tokens);
  var result = CSG.toMesh(CSG.currentPrim, CSG.sourceMesh.matrix);
  result.material = CSG.sourceMesh.material;
  result.castShadow = result.receiveShadow = true;
  return result;
};
// solid `csg`. Neither this solid nor the solid `csg` are modified.
//
//     A.union(B)
//
//     +-------+            +-------+
//     |       |            |       |
//     |   A   |            |       |
//     |    +--+----+   =   |       +----+
//     +----+--+    |       +----+       |
//          |   B   |            |       |
//          |       |            |       |
//          +-------+            +-------+
//
// Return a new CSG solid representing space in this solid but not in the
// solid `csg`. Neither this solid nor the solid `csg` are modified.
//
//     A.subtract(B)
//
//     +-------+            +-------+
//     |       |            |       |
//     |   A   |            |       |
//     |    +--+----+   =   |    +--+
//     +----+--+    |       +----+
//          |   B   |
//          |       |
//          +-------+
//
// Return a new CSG solid representing space both this solid and in the
// solid `csg`. Neither this solid nor the solid `csg` are modified.
//
//     A.intersect(B)
//
//     +-------+
//     |       |
//     |   A   |
//     |    +--+----+   =   +--+
//     +----+--+    |       +--+
//          |   B   |
//          |       |
//          +-------+
//

function applyBooleanOperations(structured) {
  const object3D = new THREE.Object3D();
  structured[structuredData.products].forEach(product => {
    if (product[namedProps.hasOpenings]) {
      for (let i = 0; i < product[namedProps.geometry].length; i++) {
        const geometryItem = product[namedProps.geometry][i];
        const openings = product[namedProps.hasOpenings];

        if (geometryItem.type === 'Mesh' && !geometryItem[namedProps.isBrep]) {
          geometryItem.geometry.computeFaceNormals();
          geometryItem.updateMatrix();
          let bspA = CSG.fromMesh(geometryItem);

          for (let i = 0; i < openings.length; i++) {
            const opening = openings[i][namedProps.geometry][0];
            opening.updateMatrix();
            let bspB = CSG.fromMesh(opening);
            bspA = bspA.subtract(bspB);
          }

          const result = CSG.toMesh(bspA, geometryItem.matrix);
          result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
          result.material = new THREE.MeshPhongMaterial();
          object3D.add(result); // scene.remove(geometryItem);

          product[namedProps.geometry][i] = result;
        }
      }
    }
  });
  return object3D;
}

function applyMaterials(structured) {
  structured[structuredData.products].forEach(product => {
    product[namedProps.geometry].forEach(item => {
      if (item.type === 'Mesh') item.material = getmaterial(product[namedProps.ifcClass]);
      if (item.material.transparent === true) item.renderOrder = 1;
    });
    if (product[namedProps.hasOpenings]) product[namedProps.hasOpenings].forEach(opening => {
      const openingMesh = opening[namedProps.geometry][0];
      openingMesh.material = getmaterial(opening[namedProps.ifcClass]);
    });
    if (product[namedProps.hasSpatial]) product[namedProps.hasSpatial].forEach(spatial => {
      const spatialMesh = spatial[namedProps.geometry][0];
      spatialMesh.material = getmaterial(spatial[namedProps.ifcClass]);
    });
  });
  structured[structuredData.spaces].forEach(space => {
    space[namedProps.geometry].forEach(item => {
      if (item.type === 'Mesh') item.material = getmaterial(space[namedProps.ifcClass]);
    });
  });
}

const colors = {
  black: 0x000000,
  brown: 0xc2893a,
  grey: 0x606060,
  darkBrown: 0x5c3d1e,
  darkBlue: 0x23395d,
  lightBlue: 0xadd8e6,
  white: 0xffffff
};
const materialsMap = {
  [ifcTypes.IfcWall]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey
  },
  [ifcTypes.IfcWallStandardCase]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey
  },
  [ifcTypes.IfcSlab]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.grey
  },
  [ifcTypes.IfcFurnishingElement]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  },
  [ifcTypes.IfcDoor]: {
    material: getDiffuseMat(colors.brown),
    lineColor: colors.darkBrown
  },
  [ifcTypes.IfcRailing]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  },
  [ifcTypes.IfcStair]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  },
  [ifcTypes.IfcStairFlight]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  },
  [ifcTypes.IfcPlate]: {
    material: getTransparentMat(colors.lightBlue, 0.2),
    lineColor: colors.darkBlue
  },
  [ifcTypes.IfcMember]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  },
  [ifcTypes.IfcWindow]: {
    material: getTransparentMat(colors.lightBlue, 0.2),
    lineColor: colors.darkBlue
  },
  [ifcTypes.IfcSpace]: {
    material: getTransparentMat(colors.lightBlue, 0.2),
    lineColor: colors.black
  },
  [ifcTypes.IfcOpeningElement]: {
    material: getTransparentMat(colors.lightBlue, 0),
    lineColor: colors.grey
  },
  [ifcTypes.IfcBuildingElementProxy]: {
    material: getDiffuseMat(colors.white),
    lineColor: colors.darkBrown
  }
};

function getmaterial(ifcType) {
  return materialsMap[ifcTypes[ifcType]].material;
}

function getLineColor(ifcType) {
  return materialsMap[ifcTypes[ifcType]].lineColor;
}

function getTransparentMat(color, opacity = 0.2) {
  return new THREE$1.MeshBasicMaterial({
    color: color,
    side: 2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    opacity: opacity,
    transparent: true,
    depthWrite: false
  });
}

function getDiffuseMat(color) {
  return new THREE$1.MeshLambertMaterial({
    color: color,
    side: 2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
  });
}

function drawEdges(structured) {
  const edges = new THREE.Object3D();
  const products = structured[structuredData.products];
  products.forEach(product => {
    product[namedProps.geometry].forEach(item => {
      const ifcClass = product[namedProps.ifcClass];

      if (item.type === 'Mesh' && ifcClass) {
        const lineColor = getLineColor(ifcClass);
        var geo = new THREE.EdgesGeometry(item.geometry);
        var mat = new THREE.LineBasicMaterial({
          color: lineColor
        });
        var wireframe = new THREE.LineSegments(geo, mat);
        item.add(wireframe);
        edges.attach(wireframe);
        if (product[namedProps.hasOpenings]) product[namedProps.hasOpenings].forEach(opening => {
          opening[namedProps.geometry].forEach(item => {
            var geo2 = new THREE.EdgesGeometry(item.geometry);
            const openingLineColor = getLineColor(opening[namedProps.ifcClass]);
            var openingMat = new THREE.LineBasicMaterial({
              color: openingLineColor
            });
            var wireframe2 = new THREE.LineSegments(geo2, openingMat);
            item.add(wireframe2);
            edges.attach(wireframe2);
          });
        });
      }
    });
    if (product[namedProps.hasSpatial]) product[namedProps.hasSpatial].forEach(spatial => {
      spatial[namedProps.geometry].forEach(item => {
        var geo3 = new THREE.EdgesGeometry(item.geometry);
        const spatialLineColor = getLineColor(spatial[namedProps.ifcClass]);
        var spatialMat = new THREE.LineBasicMaterial({
          color: spatialLineColor
        });
        var wireframe3 = new THREE.LineSegments(geo3, spatialMat);
        item.add(wireframe3);
        edges.attach(wireframe3);
      });
    });
  });
  return edges;
}

function buildGeometry(structured) {
  console.log(structured);
  const object3D = new THREE.Object3D();
  constructGeometries(structured);
  applyTransformations(structured);
  const edges = drawEdges(structured);
  const operations = applyBooleanOperations(structured);
  applyMaterials(structured);
  object3D.add(edges);
  object3D.add(operations);
  return object3D;
}

window.THREE = THREE__namespace;

exports.buildGeometry = buildGeometry;
exports.constructProject = constructProject;
exports.loadIfcFileItems = loadIfcFileItems;
exports.readIfcFile = readIfcFile;
