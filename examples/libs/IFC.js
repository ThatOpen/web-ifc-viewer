'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chevrotain = require('chevrotain');

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
  var reader = new FileReader();

  reader.onload = function onload() {
    if (cb) {
      cb(reader.result);
    }
  };

  reader.readAsText(file);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var namedProps = {
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
var itemsReaderValues = {
  expressId: "expressId",
  type: "type",
  properties: "properties"
};
var typeValue = {
  type: "type",
  value: "value"
};
var ifcValueType = {
  number: "Number",
  text: "Text",
  "enum": "Enum",
  bool: "Boolean",
  singleNumber: "SingleNumber"
};
var geometryTypes = {
  curve2D: "Curve2D",
  sweptSolid: "SweptSolid",
  mappedRepresentation: "MappedRepresentation",
  brep: "Brep"
};
var ifcBoolValues = {
  trueValue: ".T.",
  falseValue: ".F."
};
var structuredData = {
  ifcProject: "IfcProject",
  products: "Products",
  spaces: "Spaces"
};
var pivots = {
  pivots: "Pivots",
  locat: "Locations",
  xAxis: "xRotation",
  yAxis: "yRotation",
  zAxis: "zRotation"
};
var defaultValue = "$";

var ifcTypes = {
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
  return Object.keys(ifcTypes).find(function (key) {
    return ifcTypes[key] === ifcType;
  });
}

var typesParserMap = {};

function newObject(ifcObject) {
  typesParserMap[ifcTypes[ifcObject[namedProps.ifcClass]]] = ifcObject;
}

function parserByType(ifcType) {
  return typesParserMap[ifcType];
}

var ifcDataTypes = {
  asterisk: "Asterisk",
  anything: "Anything",
  bool: "Boolean",
  date: "Date",
  "default": "DefaultValue",
  emptyText: "EmptyText",
  "enum": "Enum",
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

var _newObject, _newObject2, _newObject3, _newObject4, _newObject5, _newObject6, _newObject7, _newObject8, _newObject9, _newObject10, _newObject11, _newObject12, _newObject13, _newObject14, _newObject15;
newObject((_newObject = {}, _defineProperty(_newObject, namedProps.ifcClass, getName(ifcTypes.IfcMappedItem)), _defineProperty(_newObject, namedProps.mappingSource, ifcDataTypes.id), _defineProperty(_newObject, namedProps.mappingTarget, ifcDataTypes.id), _newObject));
newObject((_newObject2 = {}, _defineProperty(_newObject2, namedProps.ifcClass, getName(ifcTypes.IfcWall)), _defineProperty(_newObject2, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject2, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject2, "Name", ifcDataTypes.text), _defineProperty(_newObject2, "Description", ifcDataTypes.text), _defineProperty(_newObject2, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject2, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject2, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject2, "Tag", ifcDataTypes.text), _newObject2));
newObject((_newObject3 = {}, _defineProperty(_newObject3, namedProps.ifcClass, getName(ifcTypes.IfcWallStandardCase)), _defineProperty(_newObject3, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject3, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject3, "Name", ifcDataTypes.text), _defineProperty(_newObject3, "Description", ifcDataTypes.text), _defineProperty(_newObject3, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject3, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject3, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject3, "Tag", ifcDataTypes.text), _newObject3));
newObject((_newObject4 = {}, _defineProperty(_newObject4, namedProps.ifcClass, getName(ifcTypes.IfcCurtainWall)), _defineProperty(_newObject4, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject4, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject4, "Name", ifcDataTypes.text), _defineProperty(_newObject4, "Description", ifcDataTypes.text), _defineProperty(_newObject4, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject4, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject4, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject4, "Tag", ifcDataTypes.text), _newObject4));
newObject((_newObject5 = {}, _defineProperty(_newObject5, namedProps.ifcClass, getName(ifcTypes.IfcDoor)), _defineProperty(_newObject5, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject5, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject5, "Name", ifcDataTypes.text), _defineProperty(_newObject5, "Description", ifcDataTypes.text), _defineProperty(_newObject5, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject5, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject5, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject5, "Tag", ifcDataTypes.text), _defineProperty(_newObject5, "OverallHeight", ifcDataTypes.number), _defineProperty(_newObject5, "OverallWidth", ifcDataTypes.number), _newObject5));
newObject((_newObject6 = {}, _defineProperty(_newObject6, namedProps.ifcClass, getName(ifcTypes.IfcRailing)), _defineProperty(_newObject6, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject6, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject6, "Name", ifcDataTypes.text), _defineProperty(_newObject6, "Description", ifcDataTypes.text), _defineProperty(_newObject6, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject6, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject6, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject6, "Tag", ifcDataTypes.text), _defineProperty(_newObject6, "PredefinedType", ifcDataTypes["enum"]), _newObject6));
newObject((_newObject7 = {}, _defineProperty(_newObject7, namedProps.ifcClass, getName(ifcTypes.IfcPlate)), _defineProperty(_newObject7, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject7, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject7, "Name", ifcDataTypes.text), _defineProperty(_newObject7, "Description", ifcDataTypes.text), _defineProperty(_newObject7, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject7, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject7, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject7, "Tag", ifcDataTypes.text), _newObject7));
newObject((_newObject8 = {}, _defineProperty(_newObject8, namedProps.ifcClass, getName(ifcTypes.IfcMember)), _defineProperty(_newObject8, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject8, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject8, "Name", ifcDataTypes.text), _defineProperty(_newObject8, "Description", ifcDataTypes.text), _defineProperty(_newObject8, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject8, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject8, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject8, "Tag", ifcDataTypes.text), _newObject8));
newObject((_newObject9 = {}, _defineProperty(_newObject9, namedProps.ifcClass, getName(ifcTypes.IfcSlab)), _defineProperty(_newObject9, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject9, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject9, "Name", ifcDataTypes.text), _defineProperty(_newObject9, "Description", ifcDataTypes.text), _defineProperty(_newObject9, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject9, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject9, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject9, "Tag", ifcDataTypes.text), _defineProperty(_newObject9, "PredefinedType", ifcDataTypes["enum"]), _newObject9));
newObject((_newObject10 = {}, _defineProperty(_newObject10, namedProps.ifcClass, getName(ifcTypes.IfcOpeningElement)), _defineProperty(_newObject10, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject10, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject10, "Name", ifcDataTypes.text), _defineProperty(_newObject10, "Description", ifcDataTypes.text), _defineProperty(_newObject10, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject10, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject10, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject10, "Tag", ifcDataTypes.text), _newObject10));
newObject((_newObject11 = {}, _defineProperty(_newObject11, namedProps.ifcClass, getName(ifcTypes.IfcWindow)), _defineProperty(_newObject11, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject11, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject11, "Name", ifcDataTypes.text), _defineProperty(_newObject11, "Description", ifcDataTypes.text), _defineProperty(_newObject11, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject11, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject11, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject11, "Tag", ifcDataTypes.text), _defineProperty(_newObject11, "OverallHeight", ifcDataTypes.number), _defineProperty(_newObject11, "OverallWidth", ifcDataTypes.number), _newObject11));
newObject((_newObject12 = {}, _defineProperty(_newObject12, namedProps.ifcClass, getName(ifcTypes.IfcStair)), _defineProperty(_newObject12, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject12, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject12, "Name", ifcDataTypes.text), _defineProperty(_newObject12, "Description", ifcDataTypes.text), _defineProperty(_newObject12, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject12, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject12, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject12, "Tag", ifcDataTypes.text), _defineProperty(_newObject12, "ShapeType", ifcDataTypes["enum"]), _newObject12));
newObject((_newObject13 = {}, _defineProperty(_newObject13, namedProps.ifcClass, getName(ifcTypes.IfcStairFlight)), _defineProperty(_newObject13, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject13, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject13, "Name", ifcDataTypes.text), _defineProperty(_newObject13, "Description", ifcDataTypes.text), _defineProperty(_newObject13, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject13, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject13, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject13, "Tag", ifcDataTypes.text), _defineProperty(_newObject13, "NumberOfRiser", ifcDataTypes.number), _defineProperty(_newObject13, "NumberOfThreads", ifcDataTypes.number), _defineProperty(_newObject13, "RiserHeight", ifcDataTypes.number), _defineProperty(_newObject13, "TreadLength", ifcDataTypes.number), _newObject13));
newObject((_newObject14 = {}, _defineProperty(_newObject14, namedProps.ifcClass, getName(ifcTypes.IfcFurnishingElement)), _defineProperty(_newObject14, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject14, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject14, "Name", ifcDataTypes.text), _defineProperty(_newObject14, "Description", ifcDataTypes.text), _defineProperty(_newObject14, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject14, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject14, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject14, "Tag", ifcDataTypes.text), _newObject14));
newObject((_newObject15 = {}, _defineProperty(_newObject15, namedProps.ifcClass, getName(ifcTypes.IfcBuildingElementProxy)), _defineProperty(_newObject15, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject15, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject15, "Name", ifcDataTypes.text), _defineProperty(_newObject15, "Description", ifcDataTypes.text), _defineProperty(_newObject15, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject15, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject15, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject15, "Tag", ifcDataTypes.text), _defineProperty(_newObject15, "CompositionType", ifcDataTypes["enum"]), _newObject15));

var _newObject$1;
newObject((_newObject$1 = {}, _defineProperty(_newObject$1, namedProps.ifcClass, getName(ifcTypes.IfcClassification)), _defineProperty(_newObject$1, "Source", ifcDataTypes.text), _defineProperty(_newObject$1, "Edition", ifcDataTypes.text), _defineProperty(_newObject$1, "EditionDate", ifcDataTypes.id), _defineProperty(_newObject$1, "Name", ifcDataTypes.text), _newObject$1));

var _newObject$2, _newObject2$1, _newObject3$1, _newObject4$1, _newObject5$1;
newObject((_newObject$2 = {}, _defineProperty(_newObject$2, namedProps.ifcClass, getName(ifcTypes.IfcGeometricRepresentationContext)), _defineProperty(_newObject$2, "ContextIdentifier", ifcDataTypes.text), _defineProperty(_newObject$2, "ContextType", ifcDataTypes.text), _defineProperty(_newObject$2, "CoordinateSpaceDimension", ifcDataTypes.number), _defineProperty(_newObject$2, "Precision", ifcDataTypes.number), _defineProperty(_newObject$2, "WorldCoordinateSystem", ifcDataTypes.id), _defineProperty(_newObject$2, "TrueNorth", ifcDataTypes.id), _newObject$2));
newObject((_newObject2$1 = {}, _defineProperty(_newObject2$1, namedProps.ifcClass, getName(ifcTypes.IfcGeometricRepresentationSubContext)), _defineProperty(_newObject2$1, "ContextIdentifier", ifcDataTypes.text), _defineProperty(_newObject2$1, "ContextType", ifcDataTypes.text), _defineProperty(_newObject2$1, namedProps.undefined, ifcDataTypes.asterisk), _defineProperty(_newObject2$1, "ParentContext", ifcDataTypes.id), _defineProperty(_newObject2$1, "TargetScale", ifcDataTypes.value), _defineProperty(_newObject2$1, "TargetView", ifcDataTypes["enum"]), _defineProperty(_newObject2$1, "UserDefinedTargetView", ifcDataTypes.text), _newObject2$1));
newObject((_newObject3$1 = {}, _defineProperty(_newObject3$1, namedProps.ifcClass, getName(ifcTypes.IfcGridPlacement)), _defineProperty(_newObject3$1, "PlacementLocation", ifcDataTypes.id), _defineProperty(_newObject3$1, "PlacementRefDirection", ifcDataTypes.id), _newObject3$1));
newObject((_newObject4$1 = {}, _defineProperty(_newObject4$1, namedProps.ifcClass, getName(ifcTypes.IfcLinearPlacement)), _defineProperty(_newObject4$1, "PlacementRelTo", ifcDataTypes.id), _defineProperty(_newObject4$1, "PlacementMeasuredAlong", ifcDataTypes.id), _defineProperty(_newObject4$1, "Distance", ifcDataTypes.id), _defineProperty(_newObject4$1, "Orientation", ifcDataTypes.id), _defineProperty(_newObject4$1, "CartesianPosition", ifcDataTypes.id), _newObject4$1));
newObject((_newObject5$1 = {}, _defineProperty(_newObject5$1, namedProps.ifcClass, getName(ifcTypes.IfcLocalPlacement)), _defineProperty(_newObject5$1, "PlacementRelTo", ifcDataTypes.id), _defineProperty(_newObject5$1, "RelativePlacement", ifcDataTypes.id), _newObject5$1));

var _newObject$3, _newObject2$2, _newObject3$2, _newObject4$2, _newObject5$2, _newObject6$1, _newObject7$1, _newObject8$1, _newObject9$1, _newObject10$1, _newObject11$1, _newObject12$1, _newObject13$1, _newObject14$1, _newObject15$1, _newObject16, _newObject17, _newObject18, _newObject19, _newObject20, _newObject21, _newObject22, _newObject23, _newObject24, _newObject25;
newObject((_newObject$3 = {}, _defineProperty(_newObject$3, namedProps.ifcClass, getName(ifcTypes.IfcAxis2Placement2D)), _defineProperty(_newObject$3, namedProps.location, ifcDataTypes.id), _defineProperty(_newObject$3, namedProps.refDirection, ifcDataTypes.id), _newObject$3));
newObject((_newObject2$2 = {}, _defineProperty(_newObject2$2, namedProps.ifcClass, getName(ifcTypes.IfcAxis2Placement3D)), _defineProperty(_newObject2$2, namedProps.location, ifcDataTypes.id), _defineProperty(_newObject2$2, namedProps.axis, ifcDataTypes.id), _defineProperty(_newObject2$2, namedProps.refDirection, ifcDataTypes.id), _newObject2$2));
newObject((_newObject3$2 = {}, _defineProperty(_newObject3$2, namedProps.ifcClass, getName(ifcTypes.IfcBooleanClippingResult)), _defineProperty(_newObject3$2, "Operator", ifcDataTypes["enum"]), _defineProperty(_newObject3$2, "FirstOperand", ifcDataTypes.id), _defineProperty(_newObject3$2, "SecondOperand", ifcDataTypes.id), _newObject3$2));
newObject((_newObject4$2 = {}, _defineProperty(_newObject4$2, namedProps.ifcClass, getName(ifcTypes.IfcEllipse)), _defineProperty(_newObject4$2, namedProps.position, ifcDataTypes.id), _defineProperty(_newObject4$2, namedProps.SemiAxis1, ifcDataTypes.number), _defineProperty(_newObject4$2, namedProps.SemiAxis2, ifcDataTypes.number), _newObject4$2));
newObject((_newObject5$2 = {}, _defineProperty(_newObject5$2, namedProps.ifcClass, getName(ifcTypes.IfcCartesianPoint)), _defineProperty(_newObject5$2, namedProps.coordinates, ifcDataTypes.numSet), _newObject5$2));
newObject((_newObject6$1 = {}, _defineProperty(_newObject6$1, namedProps.ifcClass, getName(ifcTypes.IfcConnectionSurfaceGeometry)), _defineProperty(_newObject6$1, "SurfaceOnRelatingElement", ifcDataTypes.id), _defineProperty(_newObject6$1, "SurfaceOnRelatedElement", ifcDataTypes.id), _newObject6$1));
newObject((_newObject7$1 = {}, _defineProperty(_newObject7$1, namedProps.ifcClass, getName(ifcTypes.IfcCurveBoundedPlane)), _defineProperty(_newObject7$1, "BasisSurface", ifcDataTypes.id), _defineProperty(_newObject7$1, "OuterBoundary", ifcDataTypes.id), _defineProperty(_newObject7$1, "InnerBoundaries", ifcDataTypes.idSet), _newObject7$1));
newObject((_newObject8$1 = {}, _defineProperty(_newObject8$1, namedProps.ifcClass, getName(ifcTypes.IfcDirection)), _defineProperty(_newObject8$1, namedProps.dirRatios, ifcDataTypes.numSet), _newObject8$1));
newObject((_newObject9$1 = {}, _defineProperty(_newObject9$1, namedProps.ifcClass, getName(ifcTypes.IfcExtrudedAreaSolid)), _defineProperty(_newObject9$1, namedProps.sweptArea, ifcDataTypes.id), _defineProperty(_newObject9$1, namedProps.position, ifcDataTypes.id), _defineProperty(_newObject9$1, namedProps.extDirection, ifcDataTypes.id), _defineProperty(_newObject9$1, namedProps.depth, ifcDataTypes.number), _newObject9$1));
newObject((_newObject10$1 = {}, _defineProperty(_newObject10$1, namedProps.ifcClass, getName(ifcTypes.IfcPlane)), _defineProperty(_newObject10$1, "Position", ifcDataTypes.id), _newObject10$1));
newObject((_newObject11$1 = {}, _defineProperty(_newObject11$1, namedProps.ifcClass, getName(ifcTypes.IfcPolygonalBoundedHalfSpace)), _defineProperty(_newObject11$1, "BaseSurface", ifcDataTypes.id), _defineProperty(_newObject11$1, "AgreementFlag", ifcDataTypes.bool), _defineProperty(_newObject11$1, "Position", ifcDataTypes.id), _defineProperty(_newObject11$1, "PolygonalBoundary", ifcDataTypes.id), _newObject11$1));
newObject((_newObject12$1 = {}, _defineProperty(_newObject12$1, namedProps.ifcClass, getName(ifcTypes.IfcPolyline)), _defineProperty(_newObject12$1, namedProps.points, ifcDataTypes.idSet), _newObject12$1));
newObject((_newObject13$1 = {}, _defineProperty(_newObject13$1, namedProps.ifcClass, getName(ifcTypes.IfcProductDefinitionShape)), _defineProperty(_newObject13$1, "Description", ifcDataTypes.text), _defineProperty(_newObject13$1, namedProps.representationType, ifcDataTypes.text), _defineProperty(_newObject13$1, namedProps.representations, ifcDataTypes.idSet), _newObject13$1));
newObject((_newObject14$1 = {}, _defineProperty(_newObject14$1, namedProps.ifcClass, getName(ifcTypes.IfcRectangleProfileDef)), _defineProperty(_newObject14$1, "ProfileType", ifcDataTypes["enum"]), _defineProperty(_newObject14$1, "ProfileName", ifcDataTypes.text), _defineProperty(_newObject14$1, namedProps.position, ifcDataTypes.id), _defineProperty(_newObject14$1, namedProps.xDim, ifcDataTypes.number), _defineProperty(_newObject14$1, namedProps.yDim, ifcDataTypes.number), _newObject14$1));
newObject((_newObject15$1 = {}, _defineProperty(_newObject15$1, namedProps.ifcClass, getName(ifcTypes.IfcCircleProfileDef)), _defineProperty(_newObject15$1, "ProfileType", ifcDataTypes["enum"]), _defineProperty(_newObject15$1, "ProfileName", ifcDataTypes.text), _defineProperty(_newObject15$1, namedProps.position, ifcDataTypes.id), _defineProperty(_newObject15$1, namedProps.radius, ifcDataTypes.number), _newObject15$1));
newObject((_newObject16 = {}, _defineProperty(_newObject16, namedProps.ifcClass, getName(ifcTypes.IfcArbitraryProfileDefWithVoids)), _defineProperty(_newObject16, "ProfileType", ifcDataTypes["enum"]), _defineProperty(_newObject16, "ProfileName", ifcDataTypes.text), _defineProperty(_newObject16, namedProps.outerCurve, ifcDataTypes.id), _defineProperty(_newObject16, namedProps.innerCurves, ifcDataTypes.idSet), _newObject16));
newObject((_newObject17 = {}, _defineProperty(_newObject17, namedProps.ifcClass, getName(ifcTypes.IfcArbitraryClosedProfileDef)), _defineProperty(_newObject17, "ProfileType", ifcDataTypes["enum"]), _defineProperty(_newObject17, "ProfileName", ifcDataTypes.text), _defineProperty(_newObject17, namedProps.outerCurve, ifcDataTypes.id), _newObject17));
newObject((_newObject18 = {}, _defineProperty(_newObject18, namedProps.ifcClass, getName(ifcTypes.IfcShapeRepresentation)), _defineProperty(_newObject18, "ContextOfItems", ifcDataTypes.id), _defineProperty(_newObject18, "RepresentationIdentifier", ifcDataTypes.text), _defineProperty(_newObject18, namedProps.representationType, ifcDataTypes.text), _defineProperty(_newObject18, namedProps.items, ifcDataTypes.idSet), _newObject18));
newObject((_newObject19 = {}, _defineProperty(_newObject19, namedProps.ifcClass, getName(ifcTypes.IfcFaceOuterBound)), _defineProperty(_newObject19, namedProps.bound, ifcDataTypes.id), _defineProperty(_newObject19, namedProps.orientation, ifcDataTypes.bool), _newObject19));
newObject((_newObject20 = {}, _defineProperty(_newObject20, namedProps.ifcClass, getName(ifcTypes.IfcFaceBound)), _defineProperty(_newObject20, namedProps.bound, ifcDataTypes.id), _defineProperty(_newObject20, namedProps.orientation, ifcDataTypes.bool), _newObject20));
newObject((_newObject21 = {}, _defineProperty(_newObject21, namedProps.ifcClass, getName(ifcTypes.IfcFace)), _defineProperty(_newObject21, namedProps.bounds, ifcDataTypes.idSet), _newObject21));
newObject((_newObject22 = {}, _defineProperty(_newObject22, namedProps.ifcClass, getName(ifcTypes.IfcPolyLoop)), _defineProperty(_newObject22, namedProps.polygon, ifcDataTypes.idSet), _newObject22));
newObject((_newObject23 = {}, _defineProperty(_newObject23, namedProps.ifcClass, getName(ifcTypes.IfcClosedShell)), _defineProperty(_newObject23, namedProps.cfsFaces, ifcDataTypes.idSet), _newObject23));
newObject((_newObject24 = {}, _defineProperty(_newObject24, namedProps.ifcClass, getName(ifcTypes.IfcFacetedBrep)), _defineProperty(_newObject24, namedProps.outer, ifcDataTypes.id), _newObject24));
newObject((_newObject25 = {}, _defineProperty(_newObject25, namedProps.ifcClass, getName(ifcTypes.IfcCartesianTransformationOperator3D)), _defineProperty(_newObject25, namedProps.axis1, ifcDataTypes.id), _defineProperty(_newObject25, namedProps.axis2, ifcDataTypes.id), _defineProperty(_newObject25, namedProps.localOrigin, ifcDataTypes.id), _defineProperty(_newObject25, namedProps.scale, ifcDataTypes.number), _defineProperty(_newObject25, namedProps.axis3, ifcDataTypes.id), _newObject25));

var _newObject$4, _newObject2$3, _newObject3$3, _newObject4$3, _newObject5$3, _newObject6$2;
newObject((_newObject$4 = {}, _defineProperty(_newObject$4, namedProps.ifcClass, getName(ifcTypes.IfcApplication)), _defineProperty(_newObject$4, "ApplicationDeveloper", ifcDataTypes.id), _defineProperty(_newObject$4, "Version", ifcDataTypes.text), _defineProperty(_newObject$4, "ApplicationFullName", ifcDataTypes.text), _defineProperty(_newObject$4, "ApplicationIdentifier", ifcDataTypes.text), _newObject$4));
newObject((_newObject2$3 = {}, _defineProperty(_newObject2$3, namedProps.ifcClass, getName(ifcTypes.IfcOrganization)), _defineProperty(_newObject2$3, "Identification", ifcDataTypes.text), _defineProperty(_newObject2$3, "Name", ifcDataTypes.text), _defineProperty(_newObject2$3, "Description", ifcDataTypes.text), _defineProperty(_newObject2$3, "Roles", ifcDataTypes.idSet), _defineProperty(_newObject2$3, "Addresses", ifcDataTypes.idSet), _newObject2$3));
newObject((_newObject3$3 = {}, _defineProperty(_newObject3$3, namedProps.ifcClass, getName(ifcTypes.IfcOwnerHistory)), _defineProperty(_newObject3$3, "OwningUser", ifcDataTypes.id), _defineProperty(_newObject3$3, "OwningApplication", ifcDataTypes.id), _defineProperty(_newObject3$3, "State", ifcDataTypes["enum"]), _defineProperty(_newObject3$3, "ChangeAction", ifcDataTypes["enum"]), _defineProperty(_newObject3$3, "LastModifiedDate", ifcDataTypes.date), _defineProperty(_newObject3$3, "LastModifyingUser", ifcDataTypes.id), _defineProperty(_newObject3$3, "LastModifyingApplication", ifcDataTypes.id), _defineProperty(_newObject3$3, "CreationDate", ifcDataTypes.date), _newObject3$3));
newObject((_newObject4$3 = {}, _defineProperty(_newObject4$3, namedProps.ifcClass, getName(ifcTypes.IfcPerson)), _defineProperty(_newObject4$3, "Identification", ifcDataTypes.text), _defineProperty(_newObject4$3, "FamilyName", ifcDataTypes.text), _defineProperty(_newObject4$3, "GivenName", ifcDataTypes.text), _defineProperty(_newObject4$3, "MiddleNames", ifcDataTypes.textSet), _defineProperty(_newObject4$3, "PrefixTitles", ifcDataTypes.textSet), _defineProperty(_newObject4$3, "SuffixTitles", ifcDataTypes.textSet), _defineProperty(_newObject4$3, "Roles", ifcDataTypes.idSet), _defineProperty(_newObject4$3, "Addresses", ifcDataTypes.idSet), _newObject4$3));
newObject((_newObject5$3 = {}, _defineProperty(_newObject5$3, namedProps.ifcClass, getName(ifcTypes.IfcPersonAndOrganization)), _defineProperty(_newObject5$3, "ThePerson", ifcDataTypes.id), _defineProperty(_newObject5$3, "TheOrganization", ifcDataTypes.id), _defineProperty(_newObject5$3, "Roles", ifcDataTypes.idSet), _newObject5$3));
newObject((_newObject6$2 = {}, _defineProperty(_newObject6$2, namedProps.ifcClass, getName(ifcTypes.IfcPostalAddress)), _defineProperty(_newObject6$2, "Purpose", ifcDataTypes["enum"]), _defineProperty(_newObject6$2, "Description", ifcDataTypes.text), _defineProperty(_newObject6$2, "UserDefinedPurpose", ifcDataTypes.text), _defineProperty(_newObject6$2, "InternalLocation", ifcDataTypes.text), _defineProperty(_newObject6$2, "AddressLines", ifcDataTypes.textSet), _defineProperty(_newObject6$2, "PostalBox", ifcDataTypes.text), _defineProperty(_newObject6$2, "Town", ifcDataTypes.text), _defineProperty(_newObject6$2, "Region", ifcDataTypes.text), _defineProperty(_newObject6$2, "PostalCode", ifcDataTypes.text), _defineProperty(_newObject6$2, "Country", ifcDataTypes.text), _newObject6$2));

var _newObject$5, _newObject2$4, _newObject3$4, _newObject4$4, _newObject5$4;
newObject((_newObject$5 = {}, _defineProperty(_newObject$5, namedProps.ifcClass, getName(ifcTypes.IfcMaterial)), _defineProperty(_newObject$5, "Name", ifcDataTypes.text), _newObject$5));
newObject((_newObject2$4 = {}, _defineProperty(_newObject2$4, namedProps.ifcClass, getName(ifcTypes.IfcMaterialLayer)), _defineProperty(_newObject2$4, "Material", ifcDataTypes.id), _defineProperty(_newObject2$4, "LayerThickness", ifcDataTypes.number), _defineProperty(_newObject2$4, "IsVentilated", ifcDataTypes.value), _newObject2$4));
newObject((_newObject3$4 = {}, _defineProperty(_newObject3$4, namedProps.ifcClass, getName(ifcTypes.IfcMaterialLayerSet)), _defineProperty(_newObject3$4, "MaterialLayers", ifcDataTypes.idSet), _defineProperty(_newObject3$4, "LayerSetName", ifcDataTypes.text), _newObject3$4));
newObject((_newObject4$4 = {}, _defineProperty(_newObject4$4, namedProps.ifcClass, getName(ifcTypes.IfcMaterialLayerSetUsage)), _defineProperty(_newObject4$4, "ForLayerSet", ifcDataTypes.id), _defineProperty(_newObject4$4, "LayerSetDirection", ifcDataTypes["enum"]), _defineProperty(_newObject4$4, "DirectionSense", ifcDataTypes["enum"]), _defineProperty(_newObject4$4, "OffsetFromReferenceLine", ifcDataTypes.number), _newObject4$4));
newObject((_newObject5$4 = {}, _defineProperty(_newObject5$4, namedProps.ifcClass, getName(ifcTypes.IfcMaterialList)), _defineProperty(_newObject5$4, "Materials", ifcDataTypes.idSet), _newObject5$4));

var _newObject$6, _newObject2$5, _newObject3$5, _newObject4$5, _newObject5$5, _newObject6$3, _newObject7$2, _newObject8$2, _newObject9$2, _newObject10$2;
newObject((_newObject$6 = {}, _defineProperty(_newObject$6, namedProps.ifcClass, getName(ifcTypes.IfcColourRgb)), _defineProperty(_newObject$6, "Name", ifcDataTypes.text), _defineProperty(_newObject$6, "Red", ifcDataTypes.number), _defineProperty(_newObject$6, "Green", ifcDataTypes.number), _defineProperty(_newObject$6, "Blue", ifcDataTypes.number), _newObject$6));
newObject((_newObject2$5 = {}, _defineProperty(_newObject2$5, namedProps.ifcClass, getName(ifcTypes.IfcMaterialDefinitionRepresentation)), _defineProperty(_newObject2$5, "Name", ifcDataTypes.text), _defineProperty(_newObject2$5, "Description", ifcDataTypes.text), _defineProperty(_newObject2$5, namedProps.representations, ifcDataTypes.idSet), _defineProperty(_newObject2$5, "RepresentedMaterial", ifcDataTypes.id), _newObject2$5));
newObject((_newObject3$5 = {}, _defineProperty(_newObject3$5, namedProps.ifcClass, getName(ifcTypes.IfcPresentationStyleAssignment)), _defineProperty(_newObject3$5, "Styles", ifcDataTypes.idSet), _newObject3$5));
newObject((_newObject4$5 = {}, _defineProperty(_newObject4$5, namedProps.ifcClass, getName(ifcTypes.IfcStyledItem)), _defineProperty(_newObject4$5, "Item", ifcDataTypes.id), _defineProperty(_newObject4$5, "Styles", ifcDataTypes.idSet), _defineProperty(_newObject4$5, "Name", ifcDataTypes.id), _newObject4$5));
newObject((_newObject5$5 = {}, _defineProperty(_newObject5$5, namedProps.ifcClass, getName(ifcTypes.IfcStyledRepresentation)), _defineProperty(_newObject5$5, "ContextOfItems", ifcDataTypes.id), _defineProperty(_newObject5$5, "RepresentationIdentifier", ifcDataTypes.text), _defineProperty(_newObject5$5, namedProps.representationType, ifcDataTypes.text), _defineProperty(_newObject5$5, namedProps.items, ifcDataTypes.idSet), _newObject5$5));
newObject((_newObject6$3 = {}, _defineProperty(_newObject6$3, namedProps.ifcClass, getName(ifcTypes.IfcSurfaceStyle)), _defineProperty(_newObject6$3, "Name", ifcDataTypes.text), _defineProperty(_newObject6$3, "Side", ifcDataTypes["enum"]), _defineProperty(_newObject6$3, "Styles", ifcDataTypes.idSet), _newObject6$3));
newObject((_newObject7$2 = {}, _defineProperty(_newObject7$2, namedProps.ifcClass, getName(ifcTypes.IfcSurfaceStyleRendering)), _defineProperty(_newObject7$2, "SurfaceColour", ifcDataTypes.id), _defineProperty(_newObject7$2, "Transparency", ifcDataTypes.value), _defineProperty(_newObject7$2, "DiffuseColour", ifcDataTypes.value), _defineProperty(_newObject7$2, "TransmissionColour", ifcDataTypes.value), _defineProperty(_newObject7$2, "DiffuseTransmissionColour", ifcDataTypes.value), _defineProperty(_newObject7$2, "ReflectionColour", ifcDataTypes.value), _defineProperty(_newObject7$2, "SpecularColour", ifcDataTypes.value), _defineProperty(_newObject7$2, "SpecularHighlight", ifcDataTypes.value), _defineProperty(_newObject7$2, "ReflectanceMethod", ifcDataTypes["enum"]), _newObject7$2));
newObject((_newObject8$2 = {}, _defineProperty(_newObject8$2, namedProps.ifcClass, getName(ifcTypes.IfcRepresentationMap)), _defineProperty(_newObject8$2, namedProps.mappingOrigin, ifcDataTypes.id), _defineProperty(_newObject8$2, namedProps.mappedRepresentation, ifcDataTypes.id), _newObject8$2));
newObject((_newObject9$2 = {}, _defineProperty(_newObject9$2, namedProps.ifcClass, getName(ifcTypes.IfcPresentationLayerAssignment)), _defineProperty(_newObject9$2, "Name", ifcDataTypes.text), _defineProperty(_newObject9$2, "Description", ifcDataTypes.text), _defineProperty(_newObject9$2, "AssignedItems", ifcDataTypes.idSet), _defineProperty(_newObject9$2, "Identifier", ifcDataTypes.text), _newObject9$2));
newObject((_newObject10$2 = {}, _defineProperty(_newObject10$2, namedProps.ifcClass, getName(ifcTypes.IfcSurfaceStyleShading)), _defineProperty(_newObject10$2, "SurfaceColour", ifcDataTypes.id), _newObject10$2));

var _newObject$7, _newObject2$6, _newObject3$6, _newObject4$6, _newObject5$6, _newObject6$4, _newObject7$3, _newObject8$3, _newObject9$3, _newObject10$3, _newObject11$2, _newObject12$2, _newObject13$2, _newObject14$2, _newObject15$2;
newObject((_newObject$7 = {}, _defineProperty(_newObject$7, namedProps.ifcClass, getName(ifcTypes.IfcPropertySet)), _defineProperty(_newObject$7, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject$7, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject$7, "Name", ifcDataTypes.text), _defineProperty(_newObject$7, "Description", ifcDataTypes.text), _defineProperty(_newObject$7, "HasProperties", ifcDataTypes.idSet), _newObject$7));
newObject((_newObject2$6 = {}, _defineProperty(_newObject2$6, namedProps.ifcClass, getName(ifcTypes.IfcPropertySingleValue)), _defineProperty(_newObject2$6, "Name", ifcDataTypes.text), _defineProperty(_newObject2$6, "Description", ifcDataTypes.text), _defineProperty(_newObject2$6, "NominalValue", ifcDataTypes.value), _defineProperty(_newObject2$6, "Unit", ifcDataTypes.id), _newObject2$6));
newObject((_newObject3$6 = {}, _defineProperty(_newObject3$6, namedProps.ifcClass, getName(ifcTypes.IfcSpaceType)), _defineProperty(_newObject3$6, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject3$6, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject3$6, "Name", ifcDataTypes.text), _defineProperty(_newObject3$6, "Description", ifcDataTypes.text), _defineProperty(_newObject3$6, "ApplicableOccurrence", ifcDataTypes.text), _defineProperty(_newObject3$6, "HasPropertySets", ifcDataTypes.idSet), _defineProperty(_newObject3$6, "RepresentationMaps", ifcDataTypes.idSet), _defineProperty(_newObject3$6, "Tag", ifcDataTypes.text), _defineProperty(_newObject3$6, "ElementType", ifcDataTypes.text), _defineProperty(_newObject3$6, "PredefinedType", ifcDataTypes["enum"]), _newObject3$6));
newObject((_newObject4$6 = {}, _defineProperty(_newObject4$6, namedProps.ifcClass, getName(ifcTypes.IfcPlateType)), _defineProperty(_newObject4$6, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject4$6, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject4$6, "Name", ifcDataTypes.text), _defineProperty(_newObject4$6, "Description", ifcDataTypes.text), _defineProperty(_newObject4$6, "ApplicableOccurrence", ifcDataTypes.text), _defineProperty(_newObject4$6, "HasPropertySets", ifcDataTypes.idSet), _defineProperty(_newObject4$6, "RepresentationMaps", ifcDataTypes.idSet), _defineProperty(_newObject4$6, "Tag", ifcDataTypes.text), _defineProperty(_newObject4$6, "ElementType", ifcDataTypes.text), _defineProperty(_newObject4$6, "PredefinedType", ifcDataTypes["enum"]), _newObject4$6));
newObject((_newObject5$6 = {}, _defineProperty(_newObject5$6, namedProps.ifcClass, getName(ifcTypes.IfcMemberType)), _defineProperty(_newObject5$6, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject5$6, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject5$6, "Name", ifcDataTypes.text), _defineProperty(_newObject5$6, "Description", ifcDataTypes.text), _defineProperty(_newObject5$6, "ApplicableOccurrence", ifcDataTypes.text), _defineProperty(_newObject5$6, "HasPropertySets", ifcDataTypes.idSet), _defineProperty(_newObject5$6, "RepresentationMaps", ifcDataTypes.idSet), _defineProperty(_newObject5$6, "Tag", ifcDataTypes.text), _defineProperty(_newObject5$6, "ElementType", ifcDataTypes.text), _defineProperty(_newObject5$6, "PredefinedType", ifcDataTypes["enum"]), _newObject5$6));
newObject((_newObject6$4 = {}, _defineProperty(_newObject6$4, namedProps.ifcClass, getName(ifcTypes.IfcWallType)), _defineProperty(_newObject6$4, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject6$4, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject6$4, "Name", ifcDataTypes.text), _defineProperty(_newObject6$4, "Description", ifcDataTypes.text), _defineProperty(_newObject6$4, "ApplicableOccurrence", ifcDataTypes.text), _defineProperty(_newObject6$4, "HasPropertySets", ifcDataTypes.idSet), _defineProperty(_newObject6$4, "RepresentationMaps", ifcDataTypes.idSet), _defineProperty(_newObject6$4, "Tag", ifcDataTypes.text), _defineProperty(_newObject6$4, "ElementType", ifcDataTypes.text), _defineProperty(_newObject6$4, "PredefinedType", ifcDataTypes["enum"]), _newObject6$4));
newObject((_newObject7$3 = {}, _defineProperty(_newObject7$3, namedProps.ifcClass, getName(ifcTypes.IfcStairFlightType)), _defineProperty(_newObject7$3, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject7$3, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject7$3, "Name", ifcDataTypes.text), _defineProperty(_newObject7$3, "Description", ifcDataTypes.text), _defineProperty(_newObject7$3, "ApplicableOccurrence", ifcDataTypes.text), _defineProperty(_newObject7$3, "HasPropertySets", ifcDataTypes.idSet), _defineProperty(_newObject7$3, "RepresentationMaps", ifcDataTypes.idSet), _defineProperty(_newObject7$3, "Tag", ifcDataTypes.text), _defineProperty(_newObject7$3, "ElementType", ifcDataTypes.text), _defineProperty(_newObject7$3, "PredefinedType", ifcDataTypes["enum"]), _newObject7$3));
newObject((_newObject8$3 = {}, _defineProperty(_newObject8$3, namedProps.ifcClass, getName(ifcTypes.IfcCurtainWallType)), _defineProperty(_newObject8$3, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject8$3, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject8$3, "Name", ifcDataTypes.text), _defineProperty(_newObject8$3, "Description", ifcDataTypes.text), _defineProperty(_newObject8$3, "ApplicableOccurrence", ifcDataTypes.text), _defineProperty(_newObject8$3, "HasPropertySets", ifcDataTypes.idSet), _defineProperty(_newObject8$3, "RepresentationMaps", ifcDataTypes.idSet), _defineProperty(_newObject8$3, "Tag", ifcDataTypes.text), _defineProperty(_newObject8$3, "ElementType", ifcDataTypes.text), _defineProperty(_newObject8$3, "PredefinedType", ifcDataTypes["enum"]), _newObject8$3));
newObject((_newObject9$3 = {}, _defineProperty(_newObject9$3, namedProps.ifcClass, getName(ifcTypes.IfcFurnitureType)), _defineProperty(_newObject9$3, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject9$3, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject9$3, "Name", ifcDataTypes.text), _defineProperty(_newObject9$3, "Description", ifcDataTypes.text), _defineProperty(_newObject9$3, "ApplicableOccurrence", ifcDataTypes.text), _defineProperty(_newObject9$3, "HasPropertySets", ifcDataTypes.idSet), _defineProperty(_newObject9$3, "RepresentationMaps", ifcDataTypes.idSet), _defineProperty(_newObject9$3, "Tag", ifcDataTypes.text), _defineProperty(_newObject9$3, "ElementType", ifcDataTypes.text), _defineProperty(_newObject9$3, "AssemblyPlace", ifcDataTypes["enum"]), _newObject9$3));
newObject((_newObject10$3 = {}, _defineProperty(_newObject10$3, namedProps.ifcClass, getName(ifcTypes.IfcSlabType)), _defineProperty(_newObject10$3, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject10$3, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject10$3, "Name", ifcDataTypes.text), _defineProperty(_newObject10$3, "Description", ifcDataTypes.text), _defineProperty(_newObject10$3, "ApplicableOccurrence", ifcDataTypes.text), _defineProperty(_newObject10$3, "HasPropertySets", ifcDataTypes.idSet), _defineProperty(_newObject10$3, "RepresentationMaps", ifcDataTypes.idSet), _defineProperty(_newObject10$3, "Tag", ifcDataTypes.text), _defineProperty(_newObject10$3, "ElementType", ifcDataTypes.text), _defineProperty(_newObject10$3, "PredefinedType", ifcDataTypes["enum"]), _newObject10$3));
newObject((_newObject11$2 = {}, _defineProperty(_newObject11$2, namedProps.ifcClass, getName(ifcTypes.IfcDoorLiningProperties)), _defineProperty(_newObject11$2, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject11$2, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject11$2, "Name", ifcDataTypes.text), _defineProperty(_newObject11$2, "Description", ifcDataTypes.text), _defineProperty(_newObject11$2, "LiningDepth", ifcDataTypes.number), _defineProperty(_newObject11$2, "LiningThickness", ifcDataTypes.number), _defineProperty(_newObject11$2, "ThresholdDepth", ifcDataTypes.number), _defineProperty(_newObject11$2, "ThresholdThickness", ifcDataTypes.number), _defineProperty(_newObject11$2, "TransomThickness", ifcDataTypes.number), _defineProperty(_newObject11$2, "TransomOffset", ifcDataTypes.number), _defineProperty(_newObject11$2, "LiningOffset", ifcDataTypes.number), _defineProperty(_newObject11$2, "ThresholdOffset", ifcDataTypes.number), _defineProperty(_newObject11$2, "CasingThickness", ifcDataTypes.number), _defineProperty(_newObject11$2, "CasingDepth", ifcDataTypes.number), _defineProperty(_newObject11$2, "ShapeAspectStyle", ifcDataTypes.id), _newObject11$2));
newObject((_newObject12$2 = {}, _defineProperty(_newObject12$2, namedProps.ifcClass, getName(ifcTypes.IfcDoorPanelProperties)), _defineProperty(_newObject12$2, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject12$2, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject12$2, "Name", ifcDataTypes.text), _defineProperty(_newObject12$2, "Description", ifcDataTypes.text), _defineProperty(_newObject12$2, "PanelDepth", ifcDataTypes.number), _defineProperty(_newObject12$2, "PanelOperation", ifcDataTypes["enum"]), _defineProperty(_newObject12$2, "PanelWidth", ifcDataTypes.value), _defineProperty(_newObject12$2, "PanelPosition", ifcDataTypes["enum"]), _defineProperty(_newObject12$2, "ShapeAspectStyle", ifcDataTypes.id), _newObject12$2));
newObject((_newObject13$2 = {}, _defineProperty(_newObject13$2, namedProps.ifcClass, getName(ifcTypes.IfcDoorStyle)), _defineProperty(_newObject13$2, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject13$2, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject13$2, "Name", ifcDataTypes.text), _defineProperty(_newObject13$2, "Description", ifcDataTypes.text), _defineProperty(_newObject13$2, "ApplicableOccurrence", ifcDataTypes.text), _defineProperty(_newObject13$2, "HasPropertySets", ifcDataTypes.idSet), _defineProperty(_newObject13$2, "RepresentationMaps", ifcDataTypes.idSet), _defineProperty(_newObject13$2, "Tag", ifcDataTypes.text), _defineProperty(_newObject13$2, "OperationType", ifcDataTypes["enum"]), _defineProperty(_newObject13$2, "ConstructionType", ifcDataTypes["enum"]), _defineProperty(_newObject13$2, "ParameterTakesPrecedence", ifcDataTypes.bool), _defineProperty(_newObject13$2, "Sizeable", ifcDataTypes.bool), _newObject13$2));
newObject((_newObject14$2 = {}, _defineProperty(_newObject14$2, namedProps.ifcClass, getName(ifcTypes.IfcWindowStyle)), _defineProperty(_newObject14$2, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject14$2, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject14$2, "Name", ifcDataTypes.text), _defineProperty(_newObject14$2, "Description", ifcDataTypes.text), _defineProperty(_newObject14$2, "ApplicableOccurrence", ifcDataTypes.text), _defineProperty(_newObject14$2, "HasPropertySets", ifcDataTypes.idSet), _defineProperty(_newObject14$2, "RepresentationMaps", ifcDataTypes.idSet), _defineProperty(_newObject14$2, "Tag", ifcDataTypes.text), _defineProperty(_newObject14$2, "ConstructionType", ifcDataTypes["enum"]), _defineProperty(_newObject14$2, "OperationType", ifcDataTypes["enum"]), _defineProperty(_newObject14$2, "ParameterTakesPrecedence", ifcDataTypes.bool), _defineProperty(_newObject14$2, "Sizeable", ifcDataTypes.bool), _newObject14$2));
newObject((_newObject15$2 = {}, _defineProperty(_newObject15$2, namedProps.ifcClass, getName(ifcTypes.IfcWindowLiningProperties)), _defineProperty(_newObject15$2, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject15$2, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject15$2, "Name", ifcDataTypes.text), _defineProperty(_newObject15$2, "Description", ifcDataTypes.text), _defineProperty(_newObject15$2, "LiningDepth", ifcDataTypes.number), _defineProperty(_newObject15$2, "LiningThickness", ifcDataTypes.number), _defineProperty(_newObject15$2, "TransomThickness", ifcDataTypes.number), _defineProperty(_newObject15$2, "MullionThickness", ifcDataTypes.number), _defineProperty(_newObject15$2, "FirstTransomOffset", ifcDataTypes.number), _defineProperty(_newObject15$2, "SecondTransomOffset", ifcDataTypes.number), _defineProperty(_newObject15$2, "FirstMullionOffset", ifcDataTypes.number), _defineProperty(_newObject15$2, "SecondMullionOffset", ifcDataTypes.number), _defineProperty(_newObject15$2, "ShapeAspectStyle", ifcDataTypes.number), _newObject15$2));

var _newObject$8, _newObject2$7, _newObject3$7, _newObject4$7, _newObject5$7, _newObject6$5, _newObject7$4, _newObject8$4, _newObject9$4;
newObject((_newObject$8 = {}, _defineProperty(_newObject$8, namedProps.ifcClass, getName(ifcTypes.IfcRelAggregates)), _defineProperty(_newObject$8, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject$8, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject$8, "Name", ifcDataTypes.text), _defineProperty(_newObject$8, "Description", ifcDataTypes.text), _defineProperty(_newObject$8, namedProps.relatingObject, ifcDataTypes.id), _defineProperty(_newObject$8, namedProps.relatedObjects, ifcDataTypes.idSet), _newObject$8));
newObject((_newObject2$7 = {}, _defineProperty(_newObject2$7, namedProps.ifcClass, getName(ifcTypes.IfcRelContainedInSpatialStructure)), _defineProperty(_newObject2$7, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject2$7, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject2$7, "Name", ifcDataTypes.text), _defineProperty(_newObject2$7, "Description", ifcDataTypes.text), _defineProperty(_newObject2$7, namedProps.relatedElements, ifcDataTypes.idSet), _defineProperty(_newObject2$7, namedProps.relatingStructure, ifcDataTypes.id), _newObject2$7));
newObject((_newObject3$7 = {}, _defineProperty(_newObject3$7, namedProps.ifcClass, getName(ifcTypes.IfcRelDefinesByProperties)), _defineProperty(_newObject3$7, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject3$7, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject3$7, "Name", ifcDataTypes.text), _defineProperty(_newObject3$7, "Description", ifcDataTypes.text), _defineProperty(_newObject3$7, "RelatedObjects", ifcDataTypes.idSet), _defineProperty(_newObject3$7, "RelatingPropertyDefinition", ifcDataTypes.id), _newObject3$7));
newObject((_newObject4$7 = {}, _defineProperty(_newObject4$7, namedProps.ifcClass, getName(ifcTypes.IfcRelAssociatesMaterial)), _defineProperty(_newObject4$7, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject4$7, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject4$7, "Name", ifcDataTypes.text), _defineProperty(_newObject4$7, "Description", ifcDataTypes.text), _defineProperty(_newObject4$7, "RelatedObjects", ifcDataTypes.idSet), _defineProperty(_newObject4$7, "RelatingMaterial", ifcDataTypes.id), _newObject4$7));
newObject((_newObject5$7 = {}, _defineProperty(_newObject5$7, namedProps.ifcClass, getName(ifcTypes.IfcRelDefinesByType)), _defineProperty(_newObject5$7, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject5$7, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject5$7, "Name", ifcDataTypes.text), _defineProperty(_newObject5$7, "Description", ifcDataTypes.text), _defineProperty(_newObject5$7, namedProps.relatedObjects, ifcDataTypes.idSet), _defineProperty(_newObject5$7, namedProps.relatingType, ifcDataTypes.id), _newObject5$7));
newObject((_newObject6$5 = {}, _defineProperty(_newObject6$5, namedProps.ifcClass, getName(ifcTypes.IfcRelSpaceBoundary)), _defineProperty(_newObject6$5, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject6$5, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject6$5, "Name", ifcDataTypes.text), _defineProperty(_newObject6$5, "Description", ifcDataTypes.text), _defineProperty(_newObject6$5, "RelatingSpace", ifcDataTypes.id), _defineProperty(_newObject6$5, "RelatedBuildingElement", ifcDataTypes.id), _defineProperty(_newObject6$5, "ConnectionGeometry", ifcDataTypes.id), _defineProperty(_newObject6$5, "PhysicalOrVirtualBoundary", ifcDataTypes["enum"]), _defineProperty(_newObject6$5, "InternalOrExternalBoundary", ifcDataTypes["enum"]), _newObject6$5));
newObject((_newObject7$4 = {}, _defineProperty(_newObject7$4, namedProps.ifcClass, getName(ifcTypes.IfcRelConnectsPathElements)), _defineProperty(_newObject7$4, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject7$4, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject7$4, "Name", ifcDataTypes.text), _defineProperty(_newObject7$4, "Description", ifcDataTypes.text), _defineProperty(_newObject7$4, "ConnectionGeometry", ifcDataTypes.id), _defineProperty(_newObject7$4, "RelatingElement", ifcDataTypes.id), _defineProperty(_newObject7$4, "RelatedElement", ifcDataTypes.id), _defineProperty(_newObject7$4, "RelatingPriorities", ifcDataTypes.numSet), _defineProperty(_newObject7$4, "RelatedPriorities", ifcDataTypes.numSet), _defineProperty(_newObject7$4, "RelatedConnectionType", ifcDataTypes["enum"]), _defineProperty(_newObject7$4, "RelatingConnectionType", ifcDataTypes["enum"]), _newObject7$4));
newObject((_newObject8$4 = {}, _defineProperty(_newObject8$4, namedProps.ifcClass, getName(ifcTypes.IfcRelVoidsElement)), _defineProperty(_newObject8$4, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject8$4, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject8$4, "Name", ifcDataTypes.text), _defineProperty(_newObject8$4, "Description", ifcDataTypes.text), _defineProperty(_newObject8$4, namedProps.relatingBuildingElement, ifcDataTypes.id), _defineProperty(_newObject8$4, namedProps.relatedOpeningElement, ifcDataTypes.id), _newObject8$4));
newObject((_newObject9$4 = {}, _defineProperty(_newObject9$4, namedProps.ifcClass, getName(ifcTypes.IfcRelFillsElement)), _defineProperty(_newObject9$4, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject9$4, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject9$4, "Name", ifcDataTypes.text), _defineProperty(_newObject9$4, "Description", ifcDataTypes.text), _defineProperty(_newObject9$4, namedProps.relatingOpeningElement, ifcDataTypes.id), _defineProperty(_newObject9$4, namedProps.relatedBuildingElement, ifcDataTypes.id), _newObject9$4));

var _newObject$9, _newObject2$8, _newObject3$8, _newObject4$8, _newObject5$8;
newObject((_newObject$9 = {}, _defineProperty(_newObject$9, namedProps.ifcClass, getName(ifcTypes.IfcProject)), _defineProperty(_newObject$9, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject$9, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject$9, "Name", ifcDataTypes.text), _defineProperty(_newObject$9, "Description", ifcDataTypes.text), _defineProperty(_newObject$9, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject$9, "LongName", ifcDataTypes.text), _defineProperty(_newObject$9, "Phase", ifcDataTypes.text), _defineProperty(_newObject$9, "RepresentationContexts", ifcDataTypes.idSet), _defineProperty(_newObject$9, "UnitsInContext", ifcDataTypes.id), _newObject$9));
newObject((_newObject2$8 = {}, _defineProperty(_newObject2$8, namedProps.ifcClass, getName(ifcTypes.IfcSite)), _defineProperty(_newObject2$8, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject2$8, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject2$8, "Name", ifcDataTypes.text), _defineProperty(_newObject2$8, "Description", ifcDataTypes.text), _defineProperty(_newObject2$8, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject2$8, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject2$8, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject2$8, "LongName", ifcDataTypes.text), _defineProperty(_newObject2$8, "CompositionType", ifcDataTypes["enum"]), _defineProperty(_newObject2$8, "RefLatitude", ifcDataTypes.numSet), _defineProperty(_newObject2$8, "RefLongitude", ifcDataTypes.numSet), _defineProperty(_newObject2$8, "RefElevation", ifcDataTypes.number), _defineProperty(_newObject2$8, "LandTitleNumber", ifcDataTypes.text), _defineProperty(_newObject2$8, "SiteAddress", ifcDataTypes.id), _newObject2$8));
newObject((_newObject3$8 = {}, _defineProperty(_newObject3$8, namedProps.ifcClass, getName(ifcTypes.IfcBuilding)), _defineProperty(_newObject3$8, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject3$8, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject3$8, "Name", ifcDataTypes.text), _defineProperty(_newObject3$8, "Description", ifcDataTypes.text), _defineProperty(_newObject3$8, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject3$8, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject3$8, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject3$8, "LongName", ifcDataTypes.text), _defineProperty(_newObject3$8, "CompositionType", ifcDataTypes["enum"]), _defineProperty(_newObject3$8, "ElevationOfRefHeight", ifcDataTypes.number), _defineProperty(_newObject3$8, "ElevationOfTerrain", ifcDataTypes.number), _defineProperty(_newObject3$8, "BuildingAddress", ifcDataTypes.id), _newObject3$8));
newObject((_newObject4$8 = {}, _defineProperty(_newObject4$8, namedProps.ifcClass, getName(ifcTypes.IfcBuildingStorey)), _defineProperty(_newObject4$8, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject4$8, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject4$8, "Name", ifcDataTypes.text), _defineProperty(_newObject4$8, "Description", ifcDataTypes.text), _defineProperty(_newObject4$8, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject4$8, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject4$8, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject4$8, "LongName", ifcDataTypes.text), _defineProperty(_newObject4$8, "CompositionType", ifcDataTypes["enum"]), _defineProperty(_newObject4$8, "Elevation", ifcDataTypes.number), _newObject4$8));
newObject((_newObject5$8 = {}, _defineProperty(_newObject5$8, namedProps.ifcClass, getName(ifcTypes.IfcSpace)), _defineProperty(_newObject5$8, "GlobalId", ifcDataTypes.guid), _defineProperty(_newObject5$8, "OwnerHistory", ifcDataTypes.id), _defineProperty(_newObject5$8, "Name", ifcDataTypes.text), _defineProperty(_newObject5$8, "Description", ifcDataTypes.text), _defineProperty(_newObject5$8, "ObjectType", ifcDataTypes.text), _defineProperty(_newObject5$8, namedProps.objectPlacement, ifcDataTypes.id), _defineProperty(_newObject5$8, namedProps.representation, ifcDataTypes.id), _defineProperty(_newObject5$8, "LongName", ifcDataTypes.text), _defineProperty(_newObject5$8, "CompositionType", ifcDataTypes["enum"]), _defineProperty(_newObject5$8, "InteriorOrExteriorSpace", ifcDataTypes["enum"]), _defineProperty(_newObject5$8, "ElevationWithFlooring", ifcDataTypes.number), _newObject5$8));

var _newObject$a, _newObject2$9, _newObject3$9, _newObject4$9, _newObject5$9, _newObject6$6, _newObject7$5;
newObject((_newObject$a = {}, _defineProperty(_newObject$a, namedProps.ifcClass, getName(ifcTypes.IfcConversionBasedUnit)), _defineProperty(_newObject$a, "Dimensions", ifcDataTypes.id), _defineProperty(_newObject$a, "UnitType", ifcDataTypes["enum"]), _defineProperty(_newObject$a, "Name", ifcDataTypes.text), _defineProperty(_newObject$a, "ConversionFactor", ifcDataTypes.id), _newObject$a));
newObject((_newObject2$9 = {}, _defineProperty(_newObject2$9, namedProps.ifcClass, getName(ifcTypes.IfcDerivedUnit)), _defineProperty(_newObject2$9, "Elements", ifcDataTypes.idSet), _defineProperty(_newObject2$9, "UnitType", ifcDataTypes["enum"]), _defineProperty(_newObject2$9, "UserDefinedType", ifcDataTypes.text), _newObject2$9));
newObject((_newObject3$9 = {}, _defineProperty(_newObject3$9, namedProps.ifcClass, getName(ifcTypes.IfcDerivedUnitElement)), _defineProperty(_newObject3$9, "Unit", ifcDataTypes.id), _defineProperty(_newObject3$9, "Exponent", ifcDataTypes.number), _newObject3$9));
newObject((_newObject4$9 = {}, _defineProperty(_newObject4$9, namedProps.ifcClass, getName(ifcTypes.IfcDimensionalExponents)), _defineProperty(_newObject4$9, "LengthExponent", ifcDataTypes.number), _defineProperty(_newObject4$9, "MassExponent", ifcDataTypes.number), _defineProperty(_newObject4$9, "TimeExponent", ifcDataTypes.number), _defineProperty(_newObject4$9, "ElectricCurrentExponent", ifcDataTypes.number), _defineProperty(_newObject4$9, "ThermodynamicTemperatureExponent", ifcDataTypes.number), _defineProperty(_newObject4$9, "AmountOfSubstanceExponent", ifcDataTypes.number), _defineProperty(_newObject4$9, "LuminousIntensityExponent", ifcDataTypes.number), _newObject4$9));
newObject((_newObject5$9 = {}, _defineProperty(_newObject5$9, namedProps.ifcClass, getName(ifcTypes.IfcMeasureWithUnit)), _defineProperty(_newObject5$9, "ValueComponent", ifcDataTypes.value), _defineProperty(_newObject5$9, "UnitComponent", ifcDataTypes.id), _newObject5$9));
newObject((_newObject6$6 = {}, _defineProperty(_newObject6$6, namedProps.ifcClass, getName(ifcTypes.IfcSIUnit)), _defineProperty(_newObject6$6, namedProps.undefined, ifcDataTypes.asterisk), _defineProperty(_newObject6$6, "UnitType", ifcDataTypes["enum"]), _defineProperty(_newObject6$6, "Prefix", ifcDataTypes["enum"]), _defineProperty(_newObject6$6, "Name", ifcDataTypes["enum"]), _newObject6$6));
newObject((_newObject7$5 = {}, _defineProperty(_newObject7$5, namedProps.ifcClass, getName(ifcTypes.IfcUnitAssignment)), _defineProperty(_newObject7$5, "Units", ifcDataTypes.idSet), _newObject7$5));

var _patterns;

var tokens = [];
var patterns = (_patterns = {}, _defineProperty(_patterns, ifcDataTypes.id, /#\d+/), _defineProperty(_patterns, ifcDataTypes.guid, /'\d[a-zA-Z0-9_$]{21}'(?=[\)|,])/), _defineProperty(_patterns, ifcDataTypes.asterisk, /\*/), _defineProperty(_patterns, ifcDataTypes["default"], /\$/), _defineProperty(_patterns, ifcDataTypes.emptyText, /''(?=[\)|,])/), _defineProperty(_patterns, ifcDataTypes.value, /IFC[A-Z]+?(?=\()/), _defineProperty(_patterns, ifcDataTypes.bool, /\.T\.|\.F\./), _defineProperty(_patterns, ifcDataTypes["enum"], /\.[A-Z0-9_]+?\./), _defineProperty(_patterns, ifcDataTypes.number, /[0-9.E-]+/), _defineProperty(_patterns, ifcDataTypes.text, /'.+?'(?=[\)|,])/), _defineProperty(_patterns, "EqualSign", /=/), _defineProperty(_patterns, "OpenPar", /\(/), _defineProperty(_patterns, "ClosePar", /\)/), _defineProperty(_patterns, "Semicolon", /;/), _defineProperty(_patterns, "Comma", /\s*,\s*/), _defineProperty(_patterns, ifcDataTypes.anything, /.+/), _patterns);
var ingoredPatterns = {
  NewLine: /[\n\r]+/,
  WhiteSpace: /\s+/
};

function createTokens() {
  Object.keys(patterns).forEach(function (e) {
    tokens.push(chevrotain.createToken({
      name: e,
      pattern: patterns[e]
    }));
  });
}

function createIgnoredTokens() {
  Object.keys(ingoredPatterns).forEach(function (e) {
    tokens.push(chevrotain.createToken({
      name: e,
      pattern: ingoredPatterns[e],
      group: chevrotain.Lexer.SKIPPED
    }));
  });
}

createTokens();
createIgnoredTokens();
var lexer = new chevrotain.Lexer(tokens);
var vocabulary = {};
tokens.forEach(function (token) {
  vocabulary[token.name] = token;
});

var _primitiveParsers;

function addPrimitiveParsers($) {
  var parsers = [];
  Object.values(primitiveParsers).forEach(function (e) {
    if (!parsers.includes(e)) {
      parsers.push(e);
      $.RULE(e.name, e($));
    }
  });
}

var primitiveParsers = (_primitiveParsers = {}, _defineProperty(_primitiveParsers, ifcDataTypes.guid, IfcGuid_Parser), _defineProperty(_primitiveParsers, ifcDataTypes.asterisk, Asterisk_Parser), _defineProperty(_primitiveParsers, ifcDataTypes.number, Number_Parser), _defineProperty(_primitiveParsers, ifcDataTypes.date, Number_Parser), _defineProperty(_primitiveParsers, ifcDataTypes.text, IfcText_Parser), _defineProperty(_primitiveParsers, ifcDataTypes.bool, IfcBool_Parser), _defineProperty(_primitiveParsers, ifcDataTypes["enum"], IfcEnum_Parser), _defineProperty(_primitiveParsers, ifcDataTypes.id, IfcExpressId_Parser), _defineProperty(_primitiveParsers, ifcDataTypes.idSet, IdSet_Parser), _defineProperty(_primitiveParsers, ifcDataTypes.numSet, NumberSet_Parser), _defineProperty(_primitiveParsers, ifcDataTypes.value, IfcValue_Parser), _defineProperty(_primitiveParsers, ifcDataTypes.textSet, TextSet_Parser), _primitiveParsers);

function getParser(dataType) {
  return primitiveParsers[dataType].name;
}

function IfcGuid_Parser($) {
  return function () {
    $.CONSUME(vocabulary[ifcDataTypes.guid]);
    $.OPTION(function () {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function Asterisk_Parser($) {
  return function () {
    $.AT_LEAST_ONE(function () {
      $.OR([{
        ALT: function ALT() {
          $.CONSUME(vocabulary[ifcDataTypes.asterisk]);
        }
      }]);
      $.OPTION(function () {
        $.CONSUME(vocabulary.Comma);
      });
    });
  };
}

function IfcValue_Parser($) {
  return function () {
    $.OR([{
      ALT: function ALT() {
        $.CONSUME(vocabulary.IfcValue);
        $.CONSUME(vocabulary.OpenPar);
        $.OR2([{
          ALT: function ALT() {
            $.CONSUME(vocabulary[ifcDataTypes.number]);
          }
        }, {
          ALT: function ALT() {
            $.CONSUME(vocabulary[ifcDataTypes.emptyText]);
          }
        }, {
          ALT: function ALT() {
            $.CONSUME(vocabulary[ifcDataTypes.text]);
          }
        }, {
          ALT: function ALT() {
            $.CONSUME(vocabulary[ifcDataTypes.bool]);
          }
        }, {
          ALT: function ALT() {
            $.CONSUME(vocabulary[ifcDataTypes["enum"]]);
          }
        }]);
        $.CONSUME(vocabulary.ClosePar);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes.id]);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME2(vocabulary[ifcDataTypes.number]);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes["default"]]);
      }
    }]);
    $.OPTION(function () {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function Number_Parser($) {
  return function () {
    $.OR([{
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes["default"]]);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes.number]);
      }
    }]);
    $.OPTION(function () {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function NumberSet_Parser($) {
  return function () {
    $.OR([{
      ALT: function ALT() {
        $.CONSUME(vocabulary.OpenPar);
        $.MANY(function () {
          $.CONSUME(vocabulary[ifcDataTypes.number]);
          $.OPTION(function () {
            $.CONSUME(vocabulary.Comma);
          });
        });
        $.CONSUME(vocabulary.ClosePar);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes["default"]]);
      }
    }]);
    $.OPTION2(function () {
      $.CONSUME2(vocabulary.Comma);
    });
  };
}

function TextSet_Parser($) {
  return function () {
    $.OR([{
      ALT: function ALT() {
        $.CONSUME(vocabulary.OpenPar);
        $.MANY(function () {
          $.OR2([{
            ALT: function ALT() {
              $.CONSUME(vocabulary[ifcDataTypes.emptyText]);
            }
          }, {
            ALT: function ALT() {
              $.CONSUME(vocabulary[ifcDataTypes.text]);
            }
          }]);
          $.OPTION(function () {
            $.CONSUME(vocabulary.Comma);
          });
        });
        $.CONSUME(vocabulary.ClosePar);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes["default"]]);
      }
    }]);
    $.OPTION2(function () {
      $.CONSUME2(vocabulary.Comma);
    });
  };
}

function IdSet_Parser($) {
  return function () {
    $.OR([{
      ALT: function ALT() {
        $.CONSUME(vocabulary.OpenPar);
        $.MANY(function () {
          $.CONSUME(vocabulary[ifcDataTypes.id]);
          $.OPTION(function () {
            $.CONSUME(vocabulary.Comma);
          });
        });
        $.CONSUME(vocabulary.ClosePar);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes["default"]]);
      }
    }]);
    $.OPTION2(function () {
      $.CONSUME2(vocabulary.Comma);
    });
  };
}

function IfcText_Parser($) {
  return function () {
    $.OR([{
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes.emptyText]);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes["default"]]);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes.text]);
      }
    }]);
    $.OPTION2(function () {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function IfcBool_Parser($) {
  return function () {
    $.OR([{
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes.bool]);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes["default"]]);
      }
    }]);
    $.OPTION2(function () {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function IfcEnum_Parser($) {
  return function () {
    $.OR([{
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes["enum"]]);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes["default"]]);
      }
    }]);
    $.OPTION2(function () {
      $.CONSUME(vocabulary.Comma);
    });
  };
}

function IfcExpressId_Parser($) {
  return function () {
    $.OR([{
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes.id]);
      }
    }, {
      ALT: function ALT() {
        $.CONSUME(vocabulary[ifcDataTypes["default"]]);
      }
    }]);
    $.OPTION2(function () {
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
  Object.values(ifcItem).forEach(function (dataType) {
    if (isDataTypeValid(dataType)) newRule($, dataType);
  });
}

function newRule($, dataType) {
  var rule = "SUBRULE".concat(getIndex(dataType));
  updateCounter(dataType);
  return $[rule]($[primitiveParsers[dataType].name]);
} //The counter is necessary because chevrotain cannot have
//multiple identical SUBRULEs. The repeated methods need to be
//followed by a suffix (f.e. SUBRULE(X), SUBRULE2(X), ...)


var counter = {};

function resetParserFactory() {
  counter = {};
  getAllDataTypes().forEach(function (e) {
    counter[e] = 0;
  });
}

function updateCounter(dataType) {
  counter[dataType]++;
} //Chevrotain syntax: SUBRULE0(X) is expressed as SUBRULE(X)


function getIndex(dataType) {
  return counter[dataType] === 0 ? "" : counter[dataType];
}

var IfcParser = /*#__PURE__*/function (_CstParser) {
  _inherits(IfcParser, _CstParser);

  var _super = _createSuper(IfcParser);

  function IfcParser() {
    var _this;

    _classCallCheck(this, IfcParser);

    _this = _super.call(this, tokens);
    addPrimitiveParsers(_assertThisInitialized(_this));
    addParsesForAllIfcTypes(_assertThisInitialized(_this));

    _this.performSelfAnalysis();

    return _this;
  }

  return IfcParser;
}(chevrotain.CstParser); //Creates the syntactical structures (RULEs) for all the IFC Classes


function addParsesForAllIfcTypes($) {
  Object.values(typesParserMap).forEach(function (e) {
    $.RULE(e[namedProps.ifcClass], function () {
      newParser($, e);
    });
  });
}

var parser = new IfcParser();

var regexp = {
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
    var encoded = text.match(regexp.unicode)[0].match(regexp.getUnicode)[0];
    text = text.replace(regexp.unicode, String.fromCharCode(parseInt(encoded, 16)));
  }

  return text;
}

function formatDate(dateAsNumber) {
  if (isNaN(dateAsNumber)) return dateAsNumber;
  var formattedDate = new Date(dateAsNumber * 1000);
  return formattedDate.getTime() ? formattedDate : dateAsNumber;
}

var _semanticUnits;

var semanticUnits = (_semanticUnits = {}, _defineProperty(_semanticUnits, ifcDataTypes.guid, getGuid), _defineProperty(_semanticUnits, ifcDataTypes.id, getExpressId), _defineProperty(_semanticUnits, ifcDataTypes.idSet, getIdSet), _defineProperty(_semanticUnits, ifcDataTypes.text, getIfcText), _defineProperty(_semanticUnits, ifcDataTypes.textSet, getTextSet), _defineProperty(_semanticUnits, ifcDataTypes.number, getNumber), _defineProperty(_semanticUnits, ifcDataTypes.numSet, getNumberSet), _defineProperty(_semanticUnits, ifcDataTypes.date, getDate), _defineProperty(_semanticUnits, ifcDataTypes.value, getIfcValue), _defineProperty(_semanticUnits, ifcDataTypes.bool, getBool), _defineProperty(_semanticUnits, ifcDataTypes["enum"], getEnum), _defineProperty(_semanticUnits, ifcDataTypes.asterisk, getAsterisk), _semanticUnits);

function getProperty(parsed, type) {
  return semanticUnits[type](parsed);
} //The counter is necessary because chevrotain generates indexed
//parsed structures. F.e. if there are two enums in a IFC Class,
//the first one has index=1, the second one index=2, etc


var counter$1 = {};

function resetSemanticFactory() {
  var _counter;

  counter$1 = (_counter = {}, _defineProperty(_counter, ifcDataTypes.guid, 0), _defineProperty(_counter, ifcDataTypes.id, 0), _defineProperty(_counter, ifcDataTypes.text, 0), _defineProperty(_counter, ifcDataTypes.number, 0), _defineProperty(_counter, ifcDataTypes["enum"], 0), _defineProperty(_counter, ifcDataTypes.idSet, 0), _defineProperty(_counter, ifcDataTypes.numSet, 0), _defineProperty(_counter, ifcDataTypes.value, 0), _defineProperty(_counter, ifcDataTypes.textSet, 0), _defineProperty(_counter, ifcDataTypes.bool, 0), _counter);
}

function getGuid(parsed) {
  return extract(parsed, ifcDataTypes.guid).slice(1, -1);
}

function getBool(parsed) {
  return getValue(parsed, ifcDataTypes.bool, formatBool);
}

function getEnum(parsed) {
  return getValue(parsed, ifcDataTypes["enum"], formatEnum);
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
  return getSet(parsed, ifcDataTypes.textSet, ifcDataTypes.text, function (e) {
    return unicode(e.image.slice(1, -1));
  });
}

function getIdSet(parsed) {
  return getSet(parsed, ifcDataTypes.idSet, ifcDataTypes.id, function (e) {
    return Number(e.image.slice(1));
  });
}

function getNumberSet(parsed) {
  return getSet(parsed, ifcDataTypes.numSet, ifcDataTypes.number, function (e) {
    return Number(e.image);
  });
}

function getIfcValue(parsed) {
  if (isDefaultValue(parsed, ifcDataTypes.value)) return getDefault(parsed, ifcDataTypes.value);
  if (isExpressId(parsed, ifcDataTypes.value)) return getIfcValueId(parsed, ifcDataTypes.value);
  var type = getIfcValueType(parsed);
  var value = formatIfcValue(type, getIfcValueValue(parsed, type));
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
  return parsed[getParser(type)][counter$1[type]].children[ifcDataTypes["default"]] ? true : false;
}

function isEmptyText(parsed, type) {
  return parsed[getParser(type)][counter$1[type]].children[ifcDataTypes.emptyText] ? true : false;
}

function isEmptySet(parsed, type, subtype) {
  return parsed[getParser(type)][counter$1[type]].children[subtype] ? false : true;
}

function getDefault(parsed, type) {
  return parsed[getParser(type)][counter$1[type]++].children[ifcDataTypes["default"]][0].image;
}

function getEmptyText(type) {
  counter$1[type]++;
  return "";
}

function isExpressId(parsed, type) {
  return parsed[getParser(type)][counter$1[type]].children[ifcDataTypes.id] ? true : false;
}

function getIfcValueId(parsed, type) {
  var rawId = parsed[getParser(type)][counter$1[type]++].children[ifcDataTypes.id][0].image;
  return Number(rawId.slice(1));
}

function getIfcValueValue(parsed, type) {
  return parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children[type][0].image;
}

function formatIfcValue(type, value) {
  if (type === ifcValueType.number) return formatNumber(value);
  if (type === ifcValueType.text) return formatText(value);
  if (type === ifcValueType.bool) return formatBool(value);
  if (type === ifcValueType["enum"]) return formatEnum(value);
  return value;
}

function getIfcValueType(parsed) {
  var data = parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children;
  if (data[ifcDataTypes.number]) return ifcValueType.number;
  if (data[ifcDataTypes.text]) return ifcValueType.text;
  if (data[ifcDataTypes.bool]) return ifcValueType.bool;
  return ifcValueType["enum"];
}

function getIfcUnit(parsed) {
  var ifcUnit = parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children[ifcDataTypes.value] ? parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children[ifcDataTypes.value][0].image : "";
  counter$1[ifcDataTypes.value]++;
  return ifcUnit;
}

function newSemantic(parsed, ifcItem) {
  resetSemanticFactory();
  var result = retrieveIfcObjectProperties(parsed, ifcItem);
  addClassName(result, ifcItem);
  cleanUndefinedProperties(result);
  return result;
}

function retrieveIfcObjectProperties(parsed, ifcItem) {
  var result = {};
  Object.keys(ifcItem).forEach(function (e) {
    if (isDataTypeValid(ifcItem[e])) result[e] = newSemanticUnit(parsed, ifcItem[e]);
  });
  return result;
}

function newSemanticUnit(parsed, dataType) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, typeValue.value, getProperty(parsed, dataType)), _defineProperty(_ref, typeValue.type, dataType), _ref;
}

function addClassName(result, ifcItem) {
  result[namedProps.ifcClass] = ifcItem[namedProps.ifcClass];
}

function cleanUndefinedProperties(ifcItem) {
  if (ifcItem.hasOwnProperty([namedProps.undefined])) delete ifcItem[namedProps.undefined];
}

//When the parser outputs a syntactical structure, the visitor
//handles it with the correspondant method using visit()

var BaseVisitor = parser.getBaseCstVisitorConstructor();

var IfcVisitor = /*#__PURE__*/function (_BaseVisitor) {
  _inherits(IfcVisitor, _BaseVisitor);

  var _super = _createSuper(IfcVisitor);

  function IfcVisitor() {
    var _this;

    _classCallCheck(this, IfcVisitor);

    _this = _super.call(this);

    _this.validateVisitor();

    return _this;
  }

  return IfcVisitor;
}(BaseVisitor);

function createPrimitiveSemantic() {
  Object.keys(primitiveParsers).forEach(function (e) {
    IfcVisitor.prototype[primitiveParsers[e].name] = function (parsed) {};
  });
}

function createSemantic() {
  Object.values(typesParserMap).forEach(function (e) {
    IfcVisitor.prototype[e[namedProps.ifcClass]] = function (parsed) {
      return getSemantic(ifcTypes[e[namedProps.ifcClass]], parsed);
    };
  });
}

function getSemantic(ifcType, parsed) {
  var ifcItem = typesParserMap[ifcType];
  return newSemantic(parsed, ifcItem);
}

createPrimitiveSemantic();
createSemantic();
var ifcVisitor = new IfcVisitor();

//1. The lexer tokenizes the input
//2. The tokenized input is given to the parser
//3. The parser is applied using the chosen syntactical structure
//4. The visitor applies semantic rules to the output of the parser

function parse(text, ifcType) {
  var lexingResult = lexer.tokenize(text);
  parser.input = lexingResult.tokens;
  var cstOutput = parser[parserByType(ifcType)[namedProps.ifcClass]]();
  if (parser.errors.length > 0) showErrors(text, ifcType, parser);
  return ifcVisitor.visit(cstOutput);
}

function showErrors(text, ifcType, parser) {
  console.warn(parser.errors);
  console.warn(ifcType);
  console.warn(text);
}

var IfcItemsReader = /*#__PURE__*/function () {
  function IfcItemsReader(ifcFile) {
    _classCallCheck(this, IfcItemsReader);

    this.ifcFile = ifcFile;
  }

  _createClass(IfcItemsReader, [{
    key: "readItems",
    value: function readItems() {
      var _this$extractSections = this.extractSections(this.ifcFile),
          dataSection = _this$extractSections.dataSection;

      return this.constructRawIfcItems(dataSection);
    }
  }, {
    key: "extractSections",
    value: function extractSections() {
      var ifcPlaneText = this.removeAllNewLines(this.ifcFile);
      return {
        headerSection: this.readHeaderSection(ifcPlaneText),
        dataSection: this.readDataSection(ifcPlaneText)
      };
    }
  }, {
    key: "constructRawIfcItems",
    value: function constructRawIfcItems(dataSection) {
      var _this = this;

      var flatIfcItemList = this.separateIfcEntities(dataSection);
      return flatIfcItemList.map(function (e) {
        var _ref;

        return _ref = {}, _defineProperty(_ref, itemsReaderValues.expressId, _this.getId(e)), _defineProperty(_ref, itemsReaderValues.type, _this.getIfcType(e)), _defineProperty(_ref, itemsReaderValues.properties, _this.getIfcRawProperties(e)), _ref;
      });
    }
  }, {
    key: "readHeaderSection",
    value: function readHeaderSection(ifcLine) {
      return ifcLine.match(regexp.headerSection)[0];
    }
  }, {
    key: "readDataSection",
    value: function readDataSection(ifcLine) {
      return ifcLine.match(regexp.dataSection)[0];
    }
  }, {
    key: "removeAllNewLines",
    value: function removeAllNewLines(ifcFile) {
      return ifcFile.replace(regexp.allNewLines, " ");
    }
  }, {
    key: "separateIfcEntities",
    value: function separateIfcEntities(dataSection) {
      return dataSection.match(regexp.singleIfcItems);
    }
  }, {
    key: "getId",
    value: function getId(rawIfcLine) {
      return parseInt(rawIfcLine.match(regexp.expressId).toString().slice(1));
    }
  }, {
    key: "getIfcType",
    value: function getIfcType(rawIfcLine) {
      return rawIfcLine.match(regexp.rawIfcType).toString();
    }
  }, {
    key: "getIfcRawProperties",
    value: function getIfcRawProperties(ifcLine) {
      return ifcLine.match(regexp.rawIfcProperties).toString();
    }
  }]);

  return IfcItemsReader;
}();

function readIfcItems(loadedIfc) {
  var ifcReader = new IfcItemsReader(loadedIfc);
  return ifcReader.readItems();
}

function referenceEntities(items) {
  var key;

  for (key in items) {
    var ifcLine = items[key];

    for (key in ifcLine) {
      var ifcProperty = ifcLine[key];
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
    var property = ifcProperty;

    var values = _toConsumableArray(property[typeValue.value]);

    property[typeValue.value] = values.map(function (e) {
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
  var value = ifcLine[key][typeValue.value];
  if (value) ifcLine[key] = value;
}

function findRemainingTypes(items) {
  var remainingTypes = [];
  items.forEach(function (element) {
    if (Object.values(ifcTypes).indexOf(element[itemsReaderValues.type]) < 0) {
      if (!remainingTypes.includes(element[itemsReaderValues.type])) {
        remainingTypes.push(element[itemsReaderValues.type]);
      }
    }
  });
  if (remainingTypes.length > 0) console.log(remainingTypes);
}

function loadIfcFileItems(ifcData) {
  var ifcItems = readIfcItems(ifcData);
  findRemainingTypes(ifcItems);
  return loadItems(ifcItems);
}

function loadItems(ifcData) {
  var loadedItems = {};
  ifcData.map(function (ifcItem) {
    if (isTypeSupported(ifcItem)) loadedItems[ifcItem[itemsReaderValues.expressId]] = parseAndLoadItem(ifcItem);
  });
  referenceEntities(loadedItems);
  return loadedItems;
}

function parseAndLoadItem(ifcItem) {
  var parsed = parse(ifcItem[itemsReaderValues.properties], ifcItem[itemsReaderValues.type]);
  parsed[namedProps.expressId] = ifcItem[itemsReaderValues.expressId];
  return parsed;
}

function isTypeSupported(ifcItem) {
  return Object.values(ifcTypes).indexOf(ifcItem[itemsReaderValues.type]) > -1;
}

var IfcEntityFinder = /*#__PURE__*/function () {
  function IfcEntityFinder(ifcData) {
    _classCallCheck(this, IfcEntityFinder);

    this.ifcData = ifcData;
  }

  _createClass(IfcEntityFinder, [{
    key: "findByType",
    value: function findByType(ifcType) {
      var _this = this;

      var matches = {};
      Object.keys(this.ifcData).forEach(function (e) {
        if (_this.getType(e) === getName(ifcType)) {
          matches[e] = _this.ifcData[e];
        }
      });
      return matches;
    }
  }, {
    key: "getType",
    value: function getType(id) {
      return this.ifcData[id][namedProps.ifcClass];
    }
  }, {
    key: "findAllProducts",
    value: function findAllProducts(spatialStructureElements) {
      var _this2 = this;

      var elements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      spatialStructureElements.forEach(function (spatial) {
        var buildingElementsHere = spatial[namedProps.hasBuildingElements];
        var spatialElementsHere = spatial[namedProps.hasSpatial];
        if (buildingElementsHere) elements.push.apply(elements, _toConsumableArray(buildingElementsHere));
        if (spatialElementsHere) _this2.findAllProducts(spatialElementsHere, elements);
      });
      return elements;
    }
  }]);

  return IfcEntityFinder;
}();

function createIfcItemsFinder(loadedIfc) {
  return new IfcEntityFinder(loadedIfc);
}

function bindElements(finder, type, relating, related, property) {
  var relations = finder.findByType(type);
  Object.values(relations).forEach(function (relation) {
    return isArray(relation[relating]) ? bindMultiple(relation, relating, related, property) : bindSingle(relation, relating, related, property);
  });
}

function bindSingle(relation, relating, related, property) {
  if (!relation[relating][property]) relation[relating][property] = [];
  bind(relation[relating][property], relation, related);
}

function bindMultiple(relation, relating, related, property) {
  relation[relating].forEach(function (e) {
    if (!e[property]) e[property] = [];
    bind(e[property], relation, related);
  });
}

function bind(property, relation, related) {
  return isArray(relation[related]) ? property.push.apply(property, _toConsumableArray(relation[related])) : property.push(relation[related]);
}

function isArray(item) {
  return item.constructor === Array;
}

function constructProject(ifcData) {
  var _ref;

  var finder = createIfcItemsFinder(ifcData);
  bindAllElements(finder);
  var ifcProjects = getIfcProjects(finder);
  var elements = finder.findAllProducts(ifcProjects);
  var spaces = getIfcSpaces(finder);
  return _ref = {}, _defineProperty(_ref, structuredData.ifcProject, ifcProjects), _defineProperty(_ref, structuredData.products, elements), _defineProperty(_ref, structuredData.spaces, spaces), _ref;
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
  var _product$property;

  product[property] = (_product$property = {}, _defineProperty(_product$property, pivots.locat, []), _defineProperty(_product$property, pivots.xAxis, []), _defineProperty(_product$property, pivots.yAxis, []), _defineProperty(_product$property, pivots.zAxis, []), _product$property);
}

function trackLocalTransform(product, placement, property) {
  var transform = initializeTransform(product, property);

  var _getTransform = getTransform(placement),
      locat = _getTransform.locat,
      xAxis = _getTransform.xAxis,
      yAxis = _getTransform.yAxis,
      zAxis = _getTransform.zAxis;

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
  var locat = getLocat(placement);
  var xAxis = getAxisX(placement);
  var zAxis = getAxisZ(placement);
  var yAxis = getAxisY(zAxis, xAxis);
  return {
    locat: locat,
    xAxis: xAxis,
    yAxis: yAxis,
    zAxis: zAxis
  };
}

function getLocat(placement) {
  if (isInvalid(placement[namedProps.location])) return [0, 0, 0];
  var location = placement[namedProps.location][namedProps.coordinates];
  if (location.length === 2) location.push(0);
  return location;
}

function getAxisX(placement) {
  if (isInvalid(placement[namedProps.refDirection])) return [1, 0, 0];
  var x = placement[namedProps.refDirection][namedProps.dirRatios];
  if (x.length === 2) x.push(0);
  return x;
}

function getAxisZ(placement) {
  if (isInvalid(placement[namedProps.axis])) return [0, 0, 1];
  var z = placement[namedProps.axis][namedProps.dirRatios];
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
  var pivots = getPivots(product[property]);
  product[namedProps.geometry].forEach(function (geometry) {
    return applyTransform(geometry, pivots);
  });
}

function applyTransformsTo(product, geometry, property) {
  var pivots = getPivots(product[property]);
  applyTransform(geometry, pivots);
  resetTransformData(product, property);
}

function applyTransform(geometry, pivots) {
  var object3D = new THREE.Object3D();

  if (geometry) {
    bindGeometryToPivots(geometry, pivots);
    object3D.add(pivots[0]);
    attachGeometryToScene(geometry, object3D);
    object3D.remove(pivots[0]);
  }
}

function attachGeometryToScene(geometry, object3D) {
  if (geometry.constructor === Array) return geometry.forEach(function (e) {
    return attachGeometryToScene(e, object3D);
  });
  return object3D.attach(geometry);
}

function bindGeometryToPivots(geometry, pivots) {
  if (geometry.constructor === Array) return geometry.forEach(function (e) {
    return bindGeometryToPivots(e, pivots);
  });
  pivots[pivots.length - 1].add(geometry);
}

function getPivots(transform) {
  var pivots$1 = [];
  var locations = transform[pivots.locat] || [];

  for (var i = locations.length - 1; i >= 0; i--) {
    var _pivot$position;

    var pivot = new THREE.Object3D();
    pivot.rotation.setFromRotationMatrix(getRotMat(transform, i));

    (_pivot$position = pivot.position).set.apply(_pivot$position, _toConsumableArray(locations[i]));

    pivots$1.push(pivot);
  }

  bindPivots(pivots$1);
  return pivots$1;
}

function bindPivots(pivots) {
  for (var i = 0; i < pivots.length; i++) {
    if (pivots[i + 1]) pivots[i].add(pivots[i + 1]);
  }
}

function getRotMat(transform, index) {
  var _getTransforms = getTransforms(transform, index),
      x = _getTransforms.x,
      y = _getTransforms.y,
      z = _getTransforms.z;

  var directionMatrix = new THREE.Matrix4();
  var rotationMatrix = new THREE.Matrix4();
  directionMatrix.set(x[0], x[1], x[2], 0, y[0], y[1], y[2], 0, z[0], z[1], z[2], 0, 0, 0, 0, 1);
  rotationMatrix.getInverse(directionMatrix);
  return rotationMatrix;
}

function getTransforms(transform, index) {
  var x = transform[pivots.xAxis][index];
  var y = transform[pivots.yAxis][index];
  var z = transform[pivots.zAxis][index];
  return {
    x: x,
    y: y,
    z: z
  };
}

function applyTransformations(structured) {
  structured[structuredData.products].forEach(function (product) {
    applyTransform$1(product);
  });
}

function applyTransform$1(product) {
  getTransform$1(product, getPlacement(product));
  applyTransforms(product, namedProps.transform);
  if (product[namedProps.hasOpenings]) product[namedProps.hasOpenings].forEach(function (opening) {
    getTransform$1(opening, getPlacement(opening));
    applyTransforms(opening, namedProps.transform);
  });
  if (product[namedProps.hasSpatial]) product[namedProps.hasSpatial].forEach(function (spatial) {
    getTransform$1(spatial, getPlacement(spatial));
    applyTransforms(spatial, namedProps.transform);
  });
} //Gets all the transforms (local origins) recursively


function getTransform$1(product, objPlacement) {
  try {
    var placement = objPlacement[namedProps.relativePlacement];
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
  var material = new THREE.LineBasicMaterial({
    linecap: "round",
    color: 0xff0000
  });
  var points = [];
  coordinates.forEach(function (e) {
    points.push(new THREE.Vector3(e[0], e[1]));
  });
  var geometry = new THREE.BufferGeometry().setFromPoints(points);
  var line = new THREE.Line(geometry, material);
  return line;
}

function mapCurve2D(shape) {
  var points = [];
  shape[namedProps.items][0][namedProps.points].forEach(function (point) {
    points.push(point[namedProps.coordinates]);
  });
  return createLine(points);
}

function createExtrusionsByPoints(points, depth) {
  //Profile
  var shapePoints = [];
  points.forEach(function (e) {
    return shapePoints.push(new THREE.Vector3(e[1], -e[0]));
  });
  var shape = new THREE.Shape(shapePoints);
  return createExtrusion(shape, depth);
}

function createCircularExtrusion(radius, depth) {
  var geometry = new THREE.CylinderGeometry(radius, radius, depth, 64);
  var mesh = new THREE.Mesh(geometry);
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
  var position = extruded.profile[namedProps.position];
  trackLocalTransform(product, position, namedProps.transformOfExtrusion);
  var points = getRectProfilePoints(extruded);
  return createExtrusionsByPoints(points, extruded.depth);
}

function getRectProfilePoints(extruded) {
  var halfWidth = extruded[namedProps.xDim] / 2;
  var halfHeight = extruded[namedProps.yDim] / 2;
  return [[-halfWidth, halfHeight], [halfWidth, halfHeight], [halfWidth, -halfHeight], [-halfWidth, -halfHeight]];
}

function getRectProfileDimensions(extruded) {
  extruded[namedProps.xDim] = extruded.profile[namedProps.xDim];
  extruded[namedProps.yDim] = extruded.profile[namedProps.yDim];
}

function mapArbitraryProfileExtrusion(extruded) {
  var points = getArbitraryProfilePoints(extruded);
  return createExtrusionsByPoints(points, extruded.depth);
}

function getArbitraryProfilePoints(extruded) {
  var profile = extruded.profile;
  var points = profile[namedProps.outerCurve][namedProps.points];
  return points.map(function (point) {
    var coords = point[namedProps.coordinates];
    return [-coords[0], -coords[1]];
  });
}

function mapArbitraryProfileWithVoidsExtrusion(extruded) {
  var points = getArbitraryProfilePoints$1(extruded);
  return createExtrusionsByPoints(points, extruded.depth);
}

function getArbitraryProfilePoints$1(extruded) {
  var profile = extruded.profile;
  var points = profile[namedProps.outerCurve][namedProps.points];
  return points.map(function (point) {
    var coords = point[namedProps.coordinates];
    return [-coords[0], -coords[1]];
  });
}

function mapCircleProfileExtrusion(extruded, product) {
  var position = extruded.profile[namedProps.position];
  trackLocalTransform(product, position, namedProps.transformOfExtrusion);
  var radius = extruded.profile[namedProps.radius];
  return createCircularExtrusion(radius, extruded.depth);
}

var _extrusionTypes;

function mapSweptSolid(shape, product) {
  var items = [];
  shape[namedProps.items].forEach(function (extruded) {
    return items.push(newSolid(product, extruded));
  });
  return joinAllExtrusions(items);
}

function joinAllExtrusions(items) {
  var singleGeometry = new THREE.Geometry();
  items.forEach(function (item) {
    item.updateMatrix();
    singleGeometry.merge(item.geometry, item.matrix); // scene.remove(item);
  });
  var result = new THREE.Mesh(singleGeometry); // scene.add(result);

  return result;
} //Beware: the creation of the solid must occur BEFORE trackLocalTransformation()
//Because the local transformations are tracked from inside to outside
//Same logic as IfcLocalPlacement used to locate the products


function newSolid(product, extruded) {
  var extrudedProps = getExtrusionProps(extruded);
  var solid = getExtrusionByType(extrudedProps, product);
  var position = extruded[namedProps.position];
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

var extrusionTypes = (_extrusionTypes = {}, _defineProperty(_extrusionTypes, ifcTypes.IfcRectangleProfileDef, mapRectangleProfileExtrusion), _defineProperty(_extrusionTypes, ifcTypes.IfcCircleProfileDef, mapCircleProfileExtrusion), _defineProperty(_extrusionTypes, ifcTypes.IfcArbitraryClosedProfileDef, mapArbitraryProfileExtrusion), _defineProperty(_extrusionTypes, ifcTypes.IfcArbitraryProfileDefWithVoids, mapArbitraryProfileWithVoidsExtrusion), _extrusionTypes);

function getExtrusionByType(extruded, product) {
  return extrusionTypes[extruded.ifcClass.toUpperCase()](extruded, product);
}

function mapMappedRepresentation(shape, product) {
  var representation = shape[namedProps.items][0];
  var target = getMappingTarget(representation);
  var mapped = getMappingSource(product, representation);
  applyTransformation(product, target, mapped);
  return mapped;
} //The concept of mapped representation is that there are several instances
//of the same geometry. Storing the geometries allows to generate them
//only once and them simply create each instance copying the source geometry.


var mappingSources = {};

function getMappingSource(product, representation) {
  var source = representation[namedProps.mappingSource];
  var origin = source[namedProps.mappingOrigin];
  var geometry = isGeometryGenerated(source) ? getGeneratedGeometry(source) : generateGeometry(source, product);
  applyTransformation(product, origin, geometry);
  return geometry;
}

function generateGeometry(source, product) {
  var mappedGeometry = source[namedProps.mappedRepresentation];
  var geometry = getMappedGeometry(mappedGeometry, product);
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
  var _ref;

  var target = representation[namedProps.mappingTarget];
  return _ref = {}, _defineProperty(_ref, namedProps.location, _defineProperty({}, namedProps.coordinates, getTargetOrigin(target))), _defineProperty(_ref, namedProps.refDirection, _defineProperty({}, namedProps.dirRatios, getAxis(target, namedProps.axis1, [1, 0, 0]))), _defineProperty(_ref, namedProps.axis, _defineProperty({}, namedProps.dirRatios, getAxis(target, namedProps.axis3, [0, 0, 1]))), _defineProperty(_ref, namedProps.scale, target[namedProps.scale]), _ref;
}

function getTargetOrigin(target) {
  return target[namedProps.localOrigin][namedProps.coordinates];
}

function getAxis(target, axis, def) {
  var value = target[axis];
  return value === defaultValue ? def : value;
}

function createFace(faceDefinition, stop) {
  //Credit to the following algorithm:
  //https://stackoverflow.com/questions/50272399/three-js-2d-object-in-3d-space-by-vertices/50274103#50274103
  var outerCoords = faceDefinition.outerBounds.bounds[0];
  var outerPoints = getPoints(outerCoords);
  var quaternion = getQuaternions(outerPoints);
  var tempOuterPoints = getTempPoints(outerPoints, quaternion);
  var temp = tempOuterPoints.map(function (e) {
    return new THREE.Vector2(e.x, e.y);
  });

  if (!THREE.ShapeUtils.isClockWise(temp)) {
    outerPoints = getPoints(outerCoords).reverse();
    quaternion = getQuaternions(outerPoints);
    tempOuterPoints = getTempPoints(outerPoints, quaternion);
  }

  var outerShape = new THREE.Shape(tempOuterPoints);

  var allPoints = _toConsumableArray(outerPoints);

  if (hasHoles(faceDefinition)) punchHoles(faceDefinition, quaternion, allPoints, outerShape);
  var shapeGeom = new THREE.ShapeGeometry(outerShape, 24);
  var mesh = new THREE.Mesh(shapeGeom);
  mesh.geometry.vertices = allPoints;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
  return mesh;
}

function getPoints(coordinates) {
  return coordinates.map(function (p) {
    return new THREE.Vector3(p[0], p[1], p[2]);
  });
}

function getTempPoints(points, quaternion) {
  return points.map(function (p) {
    return p.clone().applyQuaternion(quaternion);
  });
}

function hasHoles(faceDefinition) {
  return faceDefinition.innerBounds.bounds.length > 0;
}

function punchHoles(faceDefinition, quaternion, allPoints, outerShape) {
  faceDefinition.innerBounds.bounds.forEach(function (bound) {
    var innerPoints = getPoints(bound);
    var tempInnerPoints = getTempPoints(innerPoints, quaternion);
    var innerShape = new THREE.Path(tempInnerPoints);
    outerShape.holes.push(innerShape);
    allPoints.push.apply(allPoints, _toConsumableArray(innerPoints));
  });
} //To find the normal of the face it is necessary to iterate through the vertices
//To make sure that the selected triangle of vertex is valid (not aligned)
//The precission correction is necessary because in a surface with a lot of points
//the triangle used to calculate the normal should be as big as possible to avoid 
//small precision deviations to affect the direction of the normal


function getQuaternions(points) {
  var baseNormal = new THREE.Vector3(0, 0, 1);
  var normal = new THREE.Vector3();
  var precisionCorrection = points.length > 10;
  var corrector1 = precisionCorrection ? Math.ceil(points.length / 2) : 0;
  var corrector2 = precisionCorrection ? Math.ceil(points.length / 4) : 0;
  var i = 0;

  while (normal.x === 0 && normal.y === 0 && normal.z === 0) {
    var tri = new THREE.Triangle(points[2 + i + corrector1], points[1 + i + corrector2], points[0 + i]);
    tri.getNormal(normal);
    i++;
  }

  return new THREE.Quaternion().setFromUnitVectors(normal, baseNormal);
}

function mapBrep(shape, product) {
  var representations = shape[namedProps.items];
  var definitions = [];
  var faces = [];
  representations.forEach(function (r) {
    return definitions.push.apply(definitions, _toConsumableArray(getBrepGeometry(r)));
  });
  definitions.forEach(function (definition) {
    return faces.push(createFace(definition));
  });
  return joinAllFaces(faces);
}

function joinAllFaces(faces) {
  var joined = new THREE.Geometry();
  faces.forEach(function (face) {
    return joined.merge(face.geometry, face.matrix);
  });
  var material = new THREE.MeshPhongMaterial({
    side: 2
  });
  var mesh = new THREE.Mesh(joined, material);
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
  mesh[namedProps.isBrep] = true;
  return mesh;
}

function getBrepGeometry(representation) {
  var faces = [];
  var ifcFaces = representation[namedProps.outer][namedProps.cfsFaces];
  ifcFaces.forEach(function (face) {
    return faces.push(getAllBounds(face));
  });
  return faces;
}

function getAllBounds(face) {
  var outerBoundsInfo = filterBounds(face, ifcTypes.IfcFaceOuterBound);
  var innerBoundsInfo = filterBounds(face, ifcTypes.IfcFaceBound);
  var outerBounds = getBounds(outerBoundsInfo);
  var innerBounds = innerBoundsInfo ? getBounds(innerBoundsInfo) : {};
  return {
    outerBounds: outerBounds,
    innerBounds: innerBounds
  };
}

function getBounds(ifcBounds) {
  var bounds = [];
  var orientation = [];
  ifcBounds.forEach(function (bound) {
    bounds.push(getPoints$1(bound));
    orientation.push(bound[namedProps.orientation]);
  });
  return {
    orientation: orientation,
    bounds: bounds
  };
}

function getPoints$1(bound) {
  var points = bound[namedProps.bound][namedProps.polygon];
  var coordinates = [];
  points.forEach(function (point) {
    var coord = point[namedProps.coordinates];
    if (coord) coordinates.push(coord);
  });
  return coordinates;
}

function filterBounds(face, type) {
  return face[namedProps.bounds].filter(function (e) {
    return e[namedProps.ifcClass] === getName(type);
  });
}

var _geometryMap;
var geometryMap = (_geometryMap = {}, _defineProperty(_geometryMap, geometryTypes.curve2D, mapCurve2D), _defineProperty(_geometryMap, geometryTypes.sweptSolid, mapSweptSolid), _defineProperty(_geometryMap, geometryTypes.mappedRepresentation, mapMappedRepresentation), _defineProperty(_geometryMap, geometryTypes.brep, mapBrep), _geometryMap);

function constructGeometries(structured) {
  structured[structuredData.products].forEach(function (product) {
    return constructGeometry(product);
  });
  structured[structuredData.spaces].forEach(function (space) {
    return constructGeometry(space);
  });
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
  if (product[namedProps.hasOpenings]) product[namedProps.hasOpenings].forEach(function (opening) {
    getRepresentationValue(opening);
  });
  if (product[namedProps.hasSpatial]) product[namedProps.hasSpatial].forEach(function (spatial) {
    getRepresentationValue(spatial);
  });
}

function getRepresentationValue(product) {
  try {
    var representations = product[namedProps.representation][namedProps.representations];
    product[namedProps.geomRepresentations] = representations ? representations : [];
  } catch (e) {
    console.warn(e);
  }
}

function mapRepresentations(product) {
  mapProductRepresentations(product);
  if (product[namedProps.hasOpenings]) product[namedProps.hasOpenings].forEach(function (opening) {
    mapProductRepresentations(opening);
  });
  if (product[namedProps.hasSpatial]) product[namedProps.hasSpatial].forEach(function (spatial) {
    mapProductRepresentations(spatial);
  });
}

function mapProductRepresentations(product) {
  product[namedProps.geometry] = [];
  product[namedProps.geomRepresentations].forEach(function (representation) {
    product[namedProps.geometry].push(getMappedGeometry(representation, product));
  });
}

function getMappedGeometry(representation, product) {
  try {
    var representationType = getType(representation);
    return geometryMap[representationType](representation, product);
  } catch (e) {
    console.warn(e);
  }
}

function getType(representation) {
  return representation[namedProps.representationType];
}

var CSG = /*#__PURE__*/function () {
  function CSG() {
    _classCallCheck(this, CSG);

    this.polygons = [];
  }

  _createClass(CSG, [{
    key: "clone",
    value: function clone() {
      var csg = new CSG();
      csg.polygons = this.polygons.map(function (p) {
        return p.clone();
      });
      return csg;
    }
  }, {
    key: "toPolygons",
    value: function toPolygons() {
      return this.polygons;
    }
  }, {
    key: "union",
    value: function union(csg) {
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
  }, {
    key: "subtract",
    value: function subtract(csg) {
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
  }, {
    key: "intersect",
    value: function intersect(csg) {
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

  }, {
    key: "inverse",
    value: function inverse() {
      var csg = this.clone();
      csg.polygons.map(function (p) {
        p.flip();
      });
      return csg;
    }
  }]);

  return CSG;
}(); // Construct a CSG solid from a list of `Polygon` instances.


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


var Vector = /*#__PURE__*/function (_THREE$Vector) {
  _inherits(Vector, _THREE$Vector);

  var _super = _createSuper(Vector);

  function Vector(x, y, z) {
    var _this;

    _classCallCheck(this, Vector);

    if (arguments.length == 3) _this = _super.call(this, x, y, z);else if (Array.isArray(x)) _this = _super.call(this, x[0], x[1], x[2]);else if (_typeof(x) == 'object') (_this = _super.call(this)).copy(x);else throw 'Invalid constructor to vector';
    return _possibleConstructorReturn(_this);
  }

  _createClass(Vector, [{
    key: "clone",
    value: function clone() {
      return new Vector(this);
    }
  }, {
    key: "negated",
    value: function negated() {
      return this.clone().multiplyScalar(-1);
    }
  }, {
    key: "plus",
    value: function plus(a) {
      return this.clone().add(a);
    }
  }, {
    key: "minus",
    value: function minus(a) {
      return this.clone().sub(a);
    }
  }, {
    key: "times",
    value: function times(a) {
      return this.clone().multiplyScalar(a);
    }
  }, {
    key: "dividedBy",
    value: function dividedBy(a) {
      return this.clone().divideScalar(a);
    }
  }, {
    key: "lerp",
    value: function lerp(a, t) {
      return this.plus(a.minus(this).times(t));
    }
  }, {
    key: "unit",
    value: function unit() {
      return this.dividedBy(this.length());
    }
  }, {
    key: "cross",
    value: function cross(a) {
      return THREE.Vector3.prototype.cross.call(this.clone(), a);
    }
  }]);

  return Vector;
}(THREE.Vector3); // # class Vertex
// Represents a vertex of a polygon. Use your own vertex class instead of this
// one to provide additional features like texture coordinates and vertex
// colors. Custom vertex classes need to provide a `pos` property and `clone()`,
// `flip()`, and `interpolate()` methods that behave analogous to the ones
// defined by `CSG.Vertex`. This class provides `normal` so convenience
// functions like `CSG.sphere()` can return a smooth vertex normal, but `normal`
// is not used anywhere else.


var Vertex = /*#__PURE__*/function () {
  function Vertex(pos, normal, uv) {
    _classCallCheck(this, Vertex);

    this.pos = new Vector(pos);
    this.normal = new Vector(normal);
    this.uv = new Vector(uv);
  }

  _createClass(Vertex, [{
    key: "clone",
    value: function clone() {
      return new Vertex(this.pos.clone(), this.normal.clone(), this.uv.clone());
    } // Invert all orientation-specific data (e.g. vertex normal). Called when the
    // orientation of a polygon is flipped.

  }, {
    key: "flip",
    value: function flip() {
      this.normal = this.normal.negated();
    } // Create a new vertex between this vertex and `other` by linearly
    // interpolating all properties using a parameter of `t`. Subclasses should
    // override this to interpolate additional properties.

  }, {
    key: "interpolate",
    value: function interpolate(other, t) {
      return new Vertex(this.pos.lerp(other.pos, t), this.normal.lerp(other.normal, t), this.uv.lerp(other.uv, t));
    }
  }]);

  return Vertex;
}(); // # class Plane
// Represents a plane in 3D space.


var Plane = /*#__PURE__*/function () {
  function Plane(normal, w) {
    _classCallCheck(this, Plane);

    this.normal = normal;
    this.w = w;
  }

  _createClass(Plane, [{
    key: "clone",
    value: function clone() {
      return new Plane(this.normal.clone(), this.w);
    }
  }, {
    key: "flip",
    value: function flip() {
      this.normal = this.normal.negated();
      this.w = -this.w;
    } // Split `polygon` by this plane if needed, then put the polygon or polygon
    // fragments in the appropriate lists. Coplanar polygons go into either
    // `coplanarFront` or `coplanarBack` depending on their orientation with
    // respect to this plane. Polygons in front or in back of this plane go into
    // either `front` or `back`.

  }, {
    key: "splitPolygon",
    value: function splitPolygon(polygon, coplanarFront, coplanarBack, front, back) {
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
  }]);

  return Plane;
}(); // `Plane.EPSILON` is the tolerance used by `splitPolygon()` to decide if a
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


var Polygon = /*#__PURE__*/function () {
  function Polygon(vertices, shared) {
    _classCallCheck(this, Polygon);

    this.vertices = vertices;
    this.shared = shared;
    this.plane = Plane.fromPoints(vertices[0].pos, vertices[1].pos, vertices[2].pos);
  }

  _createClass(Polygon, [{
    key: "clone",
    value: function clone() {
      var vertices = this.vertices.map(function (v) {
        return v.clone();
      });
      return new Polygon(vertices, this.shared);
    }
  }, {
    key: "flip",
    value: function flip() {
      this.vertices.reverse().map(function (v) {
        v.flip();
      });
      this.plane.flip();
    }
  }]);

  return Polygon;
}(); // # class Node
// Holds a node in a BSP tree. A BSP tree is built from a collection of polygons
// by picking a polygon to split along. That polygon (and all other coplanar
// polygons) are added directly to that node and the other polygons are added to
// the front and/or back subtrees. This is not a leafy BSP tree since there is
// no distinction between internal and leaf nodes.


var Node = /*#__PURE__*/function () {
  function Node(polygons) {
    _classCallCheck(this, Node);

    this.plane = null;
    this.front = null;
    this.back = null;
    this.polygons = [];
    if (polygons) this.build(polygons);
  }

  _createClass(Node, [{
    key: "clone",
    value: function clone() {
      var node = new Node();
      node.plane = this.plane && this.plane.clone();
      node.front = this.front && this.front.clone();
      node.back = this.back && this.back.clone();
      node.polygons = this.polygons.map(function (p) {
        return p.clone();
      });
      return node;
    } // Convert solid space to empty space and empty space to solid space.

  }, {
    key: "invert",
    value: function invert() {
      for (var i = 0; i < this.polygons.length; i++) {
        this.polygons[i].flip();
      }

      this.plane.flip();
      if (this.front) this.front.invert();
      if (this.back) this.back.invert();
      var temp = this.front;
      this.front = this.back;
      this.back = temp;
    } // Recursively remove all polygons in `polygons` that are inside this BSP
    // tree.

  }, {
    key: "clipPolygons",
    value: function clipPolygons(polygons) {
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

  }, {
    key: "clipTo",
    value: function clipTo(bsp) {
      this.polygons = bsp.clipPolygons(this.polygons);
      if (this.front) this.front.clipTo(bsp);
      if (this.back) this.back.clipTo(bsp);
    } // Return a list of all polygons in this BSP tree.

  }, {
    key: "allPolygons",
    value: function allPolygons() {
      var polygons = this.polygons.slice();
      if (this.front) polygons = polygons.concat(this.front.allPolygons());
      if (this.back) polygons = polygons.concat(this.back.allPolygons());
      return polygons;
    } // Build a BSP tree out of `polygons`. When called on an existing tree, the
    // new polygons are filtered down to the bottom of the tree and become new
    // nodes there. Each set of polygons is partitioned using the first polygon
    // (no heuristic is used to pick a good split).

  }, {
    key: "build",
    value: function build(polygons) {
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
  }]);

  return Node;
}();

CSG.fromGeometry = function (geom) {
  if (geom.isBufferGeometry) geom = new THREE.Geometry().fromBufferGeometry(geom);
  var fs = geom.faces;
  var vs = geom.vertices;
  var polys = [];
  var fm = ['a', 'b', 'c'];

  for (var i = 0; i < fs.length; i++) {
    var f = fs[i];
    var vertices = [];

    for (var j = 0; j < 3; j++) {
      vertices.push(new Vertex(vs[f[fm[j]]], f.vertexNormals[j], geom.faceVertexUvs[0][i][j]));
    }

    polys.push(new Polygon(vertices));
  }

  return CSG.fromPolygons(polys);
};

CSG._tmpm3 = new THREE.Matrix3();

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
  var geom = new THREE.Geometry();
  var ps = csg.polygons;
  var vs = geom.vertices;
  var fvuv = geom.faceVertexUvs[0];

  for (var i = 0; i < ps.length; i++) {
    var p = ps[i];
    var pvs = p.vertices;
    var v0 = vs.length;
    var pvlen = pvs.length;

    for (var j = 0; j < pvlen; j++) {
      vs.push(new THREE.Vector3().copy(pvs[j].pos));
    }

    for (var j = 3; j <= pvlen; j++) {
      var fc = new THREE.Face3();
      var fuv = [];
      fvuv.push(fuv);
      var fnml = fc.vertexNormals;
      fc.a = v0;
      fc.b = v0 + j - 2;
      fc.c = v0 + j - 1;
      fnml.push(new THREE.Vector3().copy(pvs[0].normal));
      fnml.push(new THREE.Vector3().copy(pvs[j - 2].normal));
      fnml.push(new THREE.Vector3().copy(pvs[j - 1].normal));
      fuv.push(new THREE.Vector3().copy(pvs[0].uv));
      fuv.push(new THREE.Vector3().copy(pvs[j - 2].uv));
      fuv.push(new THREE.Vector3().copy(pvs[j - 1].uv));
      fc.normal = new THREE.Vector3().copy(p.plane.normal);
      geom.faces.push(fc);
    }
  }

  var inv = new THREE.Matrix4().getInverse(toMatrix);
  geom.applyMatrix4(inv);
  geom.verticesNeedUpdate = geom.elementsNeedUpdate = geom.normalsNeedUpdate = true;
  geom.computeBoundingSphere();
  geom.computeBoundingBox();
  var m = new THREE.Mesh(geom);
  m.matrix.copy(toMatrix);
  m.matrix.decompose(m.position, m.rotation, m.scale);
  m.updateMatrixWorld();
  return m;
};

CSG.ieval = function (tokens) {
  if (typeof tokens === 'string') CSG.currentOp = tokens;else if (tokens instanceof Array) {
    for (var i = 0; i < tokens.length; i++) {
      CSG.ieval(tokens[i], 0);
    }
  } else if (_typeof(tokens) === 'object') {
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
  var object3D = new THREE.Object3D();
  structured[structuredData.products].forEach(function (product) {
    if (product[namedProps.hasOpenings]) {
      for (var i = 0; i < product[namedProps.geometry].length; i++) {
        var geometryItem = product[namedProps.geometry][i];
        var openings = product[namedProps.hasOpenings];

        if (geometryItem.type === 'Mesh' && !geometryItem[namedProps.isBrep]) {
          geometryItem.geometry.computeFaceNormals();
          geometryItem.updateMatrix();
          var bspA = CSG.fromMesh(geometryItem);

          for (var _i = 0; _i < openings.length; _i++) {
            var opening = openings[_i][namedProps.geometry][0];
            opening.updateMatrix();
            var bspB = CSG.fromMesh(opening);
            bspA = bspA.subtract(bspB);
          }

          var result = CSG.toMesh(bspA, geometryItem.matrix);
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

var _materialsMap;

function applyMaterials(structured) {
  structured[structuredData.products].forEach(function (product) {
    product[namedProps.geometry].forEach(function (item) {
      if (item.type === 'Mesh') item.material = getmaterial(product[namedProps.ifcClass]);
      if (item.material.transparent === true) item.renderOrder = 1;
    });
    if (product[namedProps.hasOpenings]) product[namedProps.hasOpenings].forEach(function (opening) {
      var openingMesh = opening[namedProps.geometry][0];
      openingMesh.material = getmaterial(opening[namedProps.ifcClass]);
    });
    if (product[namedProps.hasSpatial]) product[namedProps.hasSpatial].forEach(function (spatial) {
      var spatialMesh = spatial[namedProps.geometry][0];
      spatialMesh.material = getmaterial(spatial[namedProps.ifcClass]);
    });
  });
  structured[structuredData.spaces].forEach(function (space) {
    space[namedProps.geometry].forEach(function (item) {
      if (item.type === 'Mesh') item.material = getmaterial(space[namedProps.ifcClass]);
    });
  });
}

var colors = {
  black: 0x000000,
  brown: 0xc2893a,
  grey: 0x606060,
  darkBrown: 0x5c3d1e,
  darkBlue: 0x23395d,
  lightBlue: 0xadd8e6,
  white: 0xffffff
};
var materialsMap = (_materialsMap = {}, _defineProperty(_materialsMap, ifcTypes.IfcWall, {
  material: getDiffuseMat(colors.white),
  lineColor: colors.grey
}), _defineProperty(_materialsMap, ifcTypes.IfcWallStandardCase, {
  material: getDiffuseMat(colors.white),
  lineColor: colors.grey
}), _defineProperty(_materialsMap, ifcTypes.IfcSlab, {
  material: getDiffuseMat(colors.white),
  lineColor: colors.grey
}), _defineProperty(_materialsMap, ifcTypes.IfcFurnishingElement, {
  material: getDiffuseMat(colors.white),
  lineColor: colors.darkBrown
}), _defineProperty(_materialsMap, ifcTypes.IfcDoor, {
  material: getDiffuseMat(colors.brown),
  lineColor: colors.darkBrown
}), _defineProperty(_materialsMap, ifcTypes.IfcRailing, {
  material: getDiffuseMat(colors.white),
  lineColor: colors.darkBrown
}), _defineProperty(_materialsMap, ifcTypes.IfcStair, {
  material: getDiffuseMat(colors.white),
  lineColor: colors.darkBrown
}), _defineProperty(_materialsMap, ifcTypes.IfcStairFlight, {
  material: getDiffuseMat(colors.white),
  lineColor: colors.darkBrown
}), _defineProperty(_materialsMap, ifcTypes.IfcPlate, {
  material: getTransparentMat(colors.lightBlue, 0.2),
  lineColor: colors.darkBlue
}), _defineProperty(_materialsMap, ifcTypes.IfcMember, {
  material: getDiffuseMat(colors.white),
  lineColor: colors.darkBrown
}), _defineProperty(_materialsMap, ifcTypes.IfcWindow, {
  material: getTransparentMat(colors.lightBlue, 0.2),
  lineColor: colors.darkBlue
}), _defineProperty(_materialsMap, ifcTypes.IfcSpace, {
  material: getTransparentMat(colors.lightBlue, 0.2),
  lineColor: colors.black
}), _defineProperty(_materialsMap, ifcTypes.IfcOpeningElement, {
  material: getTransparentMat(colors.lightBlue, 0),
  lineColor: colors.grey
}), _defineProperty(_materialsMap, ifcTypes.IfcBuildingElementProxy, {
  material: getDiffuseMat(colors.white),
  lineColor: colors.darkBrown
}), _materialsMap);

function getmaterial(ifcType) {
  return materialsMap[ifcTypes[ifcType]].material;
}

function getLineColor(ifcType) {
  return materialsMap[ifcTypes[ifcType]].lineColor;
}

function getTransparentMat(color) {
  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;
  return new THREE.MeshBasicMaterial({
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
  return new THREE.MeshLambertMaterial({
    color: color,
    side: 2,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
  });
}

function drawEdges(structured) {
  var edges = new THREE.Object3D();
  var products = structured[structuredData.products];
  products.forEach(function (product) {
    product[namedProps.geometry].forEach(function (item) {
      var ifcClass = product[namedProps.ifcClass];

      if (item.type === 'Mesh' && ifcClass) {
        var lineColor = getLineColor(ifcClass);
        var geo = new THREE.EdgesGeometry(item.geometry);
        var mat = new THREE.LineBasicMaterial({
          color: lineColor
        });
        var wireframe = new THREE.LineSegments(geo, mat);
        item.add(wireframe);
        edges.attach(wireframe);
        if (product[namedProps.hasOpenings]) product[namedProps.hasOpenings].forEach(function (opening) {
          opening[namedProps.geometry].forEach(function (item) {
            var geo2 = new THREE.EdgesGeometry(item.geometry);
            var openingLineColor = getLineColor(opening[namedProps.ifcClass]);
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
    if (product[namedProps.hasSpatial]) product[namedProps.hasSpatial].forEach(function (spatial) {
      spatial[namedProps.geometry].forEach(function (item) {
        var geo3 = new THREE.EdgesGeometry(item.geometry);
        var spatialLineColor = getLineColor(spatial[namedProps.ifcClass]);
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
  var object3D = new THREE.Object3D();
  constructGeometries(structured);
  applyTransformations(structured);
  var edges = drawEdges(structured);
  var operations = applyBooleanOperations(structured);
  applyMaterials(structured);
  object3D.add(edges);
  object3D.add(operations);
  return object3D;
}

exports.buildGeometry = buildGeometry;
exports.constructProject = constructProject;
exports.loadIfcFileItems = loadIfcFileItems;
exports.readIfcFile = readIfcFile;
