const namedProps = {
    agreementFlag: "AgreementFlag",
    axis: "Axis",
    axis1: "Axis1",
    axis2: "Axis2",
    axis3: "Axis3",
    baseSurface: "BaseSurface",
    basisCurve: "BasisCurve",
    bound: "Bound",
    bounds: "Bounds",
    cfsFaces: "CfsFaces",
    coordinates: "Coordinates",
    corner: "Corner",
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
    parentCurve: "ParentCurve",
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
    segments: "Segments",
    senseAgreement: "SenseAgreement",
    semiAxis1: "SemiAxis1",
    semiAxis2: "SemiAxis2",
    sweptArea: "SweptArea",
    transform: "_Transformation",
    trim1: "Trim1",
    trim2: "Trim2",
    trueGeometry: "_trueGeometry",
    undefined: "undefined",
    units: "Units",
    unitType: "UnitType",
    wallThickness: "WallThickness",
    xDim: "XDim",
    yDim: "YDim",
    zDim: "ZDim",
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
const ifcUnitsValue = {
    value: "Value",
    unit: "IfcUnit"
};
const ifcValueType = {
    number: "Number",
    text: "Text",
    enum: "Enum",
    bool: "Boolean",
    singleNumber: "SingleNumber",
};
const geometryTypes = {
    annotation2D: "Annotation2D",
    curve2D: "Curve2D",
    sweptSolid: "SweptSolid",
    mappedRepresentation: "MappedRepresentation",
    brep: "Brep",
    geometricSet: "GeometricSet",
    clipping: "Clipping",
    extrudedAreaSolid: "IfcExtrudedAreaSolid",
    surfaceModel: "SurfaceModel",
    boundingBox: "BoundingBox",
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

const ifcTypes = {
    //Building elements
    IfcBuildingElementProxy: "IFCBUILDINGELEMENTPROXY",
    IfcBeam: "IFCBEAM",
    IfcColumn: "IFCCOLUMN",
    IfcCovering: "IFCCOVERING",
    IfcCurtainWall: "IFCCURTAINWALL",
    IfcDoor: "IFCDOOR",
    IfcEquipmentElement: "IFCEQUIPMENTELEMENT",
    IfcFlowTerminal: "IFCFLOWTERMINAL",
    IfcFooting: "IFCFOOTING",
    IfcFurnishingElement: "IFCFURNISHINGELEMENT",
    IfcMappedItem: "IFCMAPPEDITEM",
    IfcMember: "IFCMEMBER",
    IfcPlate: "IFCPLATE",
    IfcRailing: "IFCRAILING",
    IfcSlab: "IFCSLAB",
    IfcOpeningElement: "IFCOPENINGELEMENT",
    IfcRoof: "IFCROOF",
    IfcStairFlight: "IFCSTAIRFLIGHT",
    IfcStair: "IFCSTAIR",
    IfcWallStandardCase: "IFCWALLSTANDARDCASE",
    IfcWall: "IFCWALL",
    IfcWindow: "IFCWINDOW",
    //Classification
    IfcClassification: "IFCCLASSIFICATION",
    IfcClassificationReference: "IFCCLASSIFICATIONREFERENCE",
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
    IfcBoundingBox: "IFCBOUNDINGBOX",
    IfcCartesianPoint: "IFCCARTESIANPOINT",
    IfcCartesianTransformationOperator3D: "IFCCARTESIANTRANSFORMATIONOPERATOR3D",
    IfcCircle: "IFCCIRCLE",
    IfcCircleHollowProfileDef: "IFCCIRCLEHOLLOWPROFILEDEF",
    IfcClosedShell: "IFCCLOSEDSHELL",
    IfcCircleProfileDef: "IFCCIRCLEPROFILEDEF",
    IfcCompositeCurve: "IFCCOMPOSITECURVE",
    IfcCompositeCurveSegment: "IFCCOMPOSITECURVESEGMENT",
    IfcConnectedFaceSet: "IFCCONNECTEDFACESET",
    IfcConnectionSurfaceGeometry: "IFCCONNECTIONSURFACEGEOMETRY",
    IfcCurveBoundedPlane: "IFCCURVEBOUNDEDPLANE",
    IfcDirection: "IFCDIRECTION",
    IfcEllipse: "IFCELLIPSE",
    IfcExtrudedAreaSolid: "IFCEXTRUDEDAREASOLID",
    IfcFaceBound: "IFCFACEBOUND",
    IfcFace: "IFCFACE",
    IfcFaceBasedSurfaceModel: "IFCFACEBASEDSURFACEMODEL",
    IfcFaceOuterBound: "IFCFACEOUTERBOUND",
    IfcFacetedBrep: "IFCFACETEDBREP",
    IfcGeometricCurveSet: "IFCGEOMETRICCURVESET",
    IfcGeometricSet: "IFCGEOMETRICSET",
    IfcHalfSpaceSolid: "IFCHALFSPACESOLID",
    IfcIShapeProfileDef: "IFCISHAPEPROFILEDEF",
    IfcPlanarExtent: "IFCPLANAREXTENT",
    IfcPlane: "IFCPLANE",
    IfcPolygonalBoundedHalfSpace: "IFCPOLYGONALBOUNDEDHALFSPACE",
    IfcPolyline: "IFCPOLYLINE",
    IfcPolyLoop: "IFCPOLYLOOP",
    IfcProductDefinitionShape: "IFCPRODUCTDEFINITIONSHAPE",
    IfcRectangleProfileDef: "IFCRECTANGLEPROFILEDEF",
    IfcShapeRepresentation: "IFCSHAPEREPRESENTATION",
    IfcTrimmedCurve: "IFCTRIMMEDCURVE",
    IfcArbitraryOpenProfileDef: "IFCARBITRARYOPENPROFILEDEF",
    IfcSurfaceOfLinearExtrusion: "IFCSURFACEOFLINEAREXTRUSION",
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
    IfcAnnotation: "IFCANNOTATION",
    IfcAnnotationFillArea: "IFCANNOTATIONFILLAREA",
    IfcColourRgb: "IFCCOLOURRGB",
    IfcCurveStyle: "IFCCURVESTYLE",
    IfcCurveStyleFont: "IFCCURVESTYLEFONT",
    IfcCurveStyleFontPattern: "IFCCURVESTYLEFONTPATTERN",
    IfcDraughtingPreDefinedCurveFont: "IFCDRAUGHTINGPREDEFINEDCURVEFONT",
    IfcFillAreaStyle: "IFCFILLAREASTYLE",
    IfcFillAreaStyleHatching: "IFCFILLAREASTYLEHATCHING",
    IfcMaterialDefinitionRepresentation: "IFCMATERIALDEFINITIONREPRESENTATION",
    IfcRepresentationMap: "IFCREPRESENTATIONMAP",
    IfcPresentationLayerAssignment: "IFCPRESENTATIONLAYERASSIGNMENT",
    IfcPresentationStyleAssignment: "IFCPRESENTATIONSTYLEASSIGNMENT",
    IfcStyledItem: "IFCSTYLEDITEM",
    IfcStyledRepresentation: "IFCSTYLEDREPRESENTATION",
    IfcSurfaceStyle: "IFCSURFACESTYLE",
    IfcSurfaceStyleRendering: "IFCSURFACESTYLERENDERING",
    IfcSurfaceStyleShading: "IFCSURFACESTYLESHADING",
    IfcTextLiteralWithExtent: "IFCTEXTLITERALWITHEXTENT",
    IfcTextStyle: "IFCTEXTSTYLE",
    IfcTextStyleFontModel: "IFCTEXTSTYLEFONTMODEL",
    IfcTextStyleForDefinedFont: "IFCTEXTSTYLEFORDEFINEDFONT",
    //Project
    IfcActor: "IFCACTOR",
    //Properties
    IfcAirTerminalType: "IFCAIRTERMINALTYPE",
    IfcBuildingElementProxyType: "IFCBUILDINGELEMENTPROXYTYPE",
    IfcColumnType: "IFCCOLUMNTYPE",
    IfcCoveringType: "IFCCOVERINGTYPE",
    IfcCurtainWallType: "IFCCURTAINWALLTYPE",
    IfcFurnitureType: "IFCFURNITURETYPE",
    IfcDistributionElementType: "IFCDISTRIBUTIONELEMENTTYPE",
    IfcDoorType: "IFCDOORTYPE",
    IfcDoorLiningProperties: "IFCDOORLININGPROPERTIES",
    IfcDoorPanelProperties: "IFCDOORPANELPROPERTIES",
    IfcDoorStyle: "IFCDOORSTYLE",
    IfcLightFixtureType: "IFCLIGHTFIXTURETYPE",
    IfcMemberType: "IFCMEMBERTYPE",
    IfcPlateType: "IFCPLATETYPE",
    IfcPropertySet: "IFCPROPERTYSET",
    IfcPropertySingleValue: "IFCPROPERTYSINGLEVALUE",
    IfcSanitaryTerminalType: "IFCSANITARYTERMINALTYPE",
    IfcSpaceType: "IFCSPACETYPE",
    IfcStairFlightType: "IFCSTAIRFLIGHTTYPE",
    IfcSystemFurnitureElementType: "IFCSYSTEMFURNITUREELEMENTTYPE",
    IfcWallType: "IFCWALLTYPE",
    IfcWindowStyle: "IFCWINDOWSTYLE",
    IfcSlabType: "IFCSLABTYPE",
    IfcWindowLiningProperties: "IFCWINDOWLININGPROPERTIES",
    //Quantities
    IfcElementQuantity: "IFCELEMENTQUANTITY",
    IfcQuantityArea: "IFCQUANTITYAREA",
    IfcQuantityLength: "IFCQUANTITYLENGTH",
    IfcQuantityVolume: "IFCQUANTITYVOLUME",
    // Relationships
    IfcRelAggregates: "IFCRELAGGREGATES",
    IfcRelAssignsToActor: "IFCRELASSIGNSTOACTOR",
    IfcRelAssignsToGroup: "IFCRELASSIGNSTOGROUP",
    IfcRelAssociatesClassification: "IFCRELASSOCIATESCLASSIFICATION",
    IfcRelAssociatesMaterial: "IFCRELASSOCIATESMATERIAL",
    IfcRelConnectsPathElements: "IFCRELCONNECTSPATHELEMENTS",
    IfcRelConnectsPortToElement: "IFCRELCONNECTSPORTTOELEMENT",
    IfcRelContainedInSpatialStructure: "IFCRELCONTAINEDINSPATIALSTRUCTURE",
    IfcRelDefinesByProperties: "IFCRELDEFINESBYPROPERTIES",
    IfcRelDefinesByType: "IFCRELDEFINESBYTYPE",
    IfcRelFillsElement: "IFCRELFILLSELEMENT",
    IfcGroup: "IFCGROUP",
    IfcRelSpaceBoundary: "IFCRELSPACEBOUNDARY",
    IfcRelServicesBuildings: "IFCRELSERVICESBUILDINGS",
    IfcRelVoidsElement: "IFCRELVOIDSELEMENT",
    //Spatial structure elements
    IfcBuilding: "IFCBUILDING",
    IfcBuildingStorey: "IFCBUILDINGSTOREY",
    IfcProject: "IFCPROJECT",
    IfcSite: "IFCSITE",
    IfcSpace: "IFCSPACE",
    //Systems
    IfcDistributionPort: "IFCDISTRIBUTIONPORT",
    IfcSystem: "IFCSYSTEM",
    //Units
    IfcConversionBasedUnit: "IFCCONVERSIONBASEDUNIT",
    IfcDerivedUnit: "IFCDERIVEDUNIT",
    IfcDerivedUnitElement: "IFCDERIVEDUNITELEMENT",
    IfcDimensionalExponents: "IFCDIMENSIONALEXPONENTS",
    IfcMeasureWithUnit: "IFCMEASUREWITHUNIT",
    IfcSIUnit: "IFCSIUNIT",
    IfcUnitAssignment: "IFCUNITASSIGNMENT",
};
function getName(ifcType) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return Object.keys(ifcTypes).find((key) => ifcTypes[key] === ifcType);
}

const typesParserMap = {};
function newObject(ifcObject) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    typesParserMap[ifcTypes[ifcObject[namedProps.ifcClass]]] = ifcObject;
}
function parserByType(ifcType) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return typesParserMap[ifcType];
}

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
function isDataTypeValid(dataType) {
    if (Object.values(ifcDataTypes).indexOf(dataType) > -1)
        return true;
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
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    [namedProps.objectPlacement]: ifcDataTypes.id,
    [namedProps.representation]: ifcDataTypes.id,
    Tag: ifcDataTypes.text
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcBeam),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    [namedProps.objectPlacement]: ifcDataTypes.id,
    [namedProps.representation]: ifcDataTypes.id,
    Tag: ifcDataTypes.text
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcFooting),
    GlobalId: ifcDataTypes.text,
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
    [namedProps.ifcClass]: getName(ifcTypes.IfcWallStandardCase),
    GlobalId: ifcDataTypes.text,
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
    GlobalId: ifcDataTypes.text,
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
    GlobalId: ifcDataTypes.text,
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
    GlobalId: ifcDataTypes.text,
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
    GlobalId: ifcDataTypes.text,
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
    GlobalId: ifcDataTypes.text,
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
    GlobalId: ifcDataTypes.text,
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
    GlobalId: ifcDataTypes.text,
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
    GlobalId: ifcDataTypes.text,
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
    GlobalId: ifcDataTypes.text,
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
    [namedProps.ifcClass]: getName(ifcTypes.IfcRoof),
    GlobalId: ifcDataTypes.text,
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
    [namedProps.ifcClass]: getName(ifcTypes.IfcColumn),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    [namedProps.objectPlacement]: ifcDataTypes.id,
    [namedProps.representation]: ifcDataTypes.id,
    Tag: ifcDataTypes.text
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcStairFlight),
    GlobalId: ifcDataTypes.text,
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
    [namedProps.ifcClass]: getName(ifcTypes.IfcFlowTerminal),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    [namedProps.objectPlacement]: ifcDataTypes.id,
    [namedProps.representation]: ifcDataTypes.id,
    Tag: ifcDataTypes.text
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcFurnishingElement),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    [namedProps.objectPlacement]: ifcDataTypes.id,
    [namedProps.representation]: ifcDataTypes.id,
    Tag: ifcDataTypes.text
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcCovering),
    GlobalId: ifcDataTypes.text,
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
    [namedProps.ifcClass]: getName(ifcTypes.IfcBuildingElementProxy),
    GlobalId: ifcDataTypes.text,
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
    [namedProps.ifcClass]: getName(ifcTypes.IfcEquipmentElement),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    [namedProps.objectPlacement]: ifcDataTypes.id,
    [namedProps.representation]: ifcDataTypes.id,
    Tag: ifcDataTypes.text
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcAnnotation),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    [namedProps.objectPlacement]: ifcDataTypes.id,
    [namedProps.representation]: ifcDataTypes.id,
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcClassification),
    Source: ifcDataTypes.text,
    Edition: ifcDataTypes.text,
    EditionDate: ifcDataTypes.id,
    Name: ifcDataTypes.text,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcClassificationReference),
    Location: ifcDataTypes.text,
    ItemReference: ifcDataTypes.text,
    Name: ifcDataTypes.text,
    ReferencedSource: ifcDataTypes.id,
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcGeometricRepresentationContext),
    ContextIdentifier: ifcDataTypes.text,
    ContextType: ifcDataTypes.text,
    CoordinateSpaceDimension: ifcDataTypes.number,
    Precision: ifcDataTypes.number,
    WorldCoordinateSystem: ifcDataTypes.id,
    TrueNorth: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcGeometricRepresentationSubContext),
    ContextIdentifier: ifcDataTypes.text,
    ContextType: ifcDataTypes.text,
    [namedProps.undefined]: ifcDataTypes.asterisk,
    ParentContext: ifcDataTypes.id,
    TargetScale: ifcDataTypes.value,
    TargetView: ifcDataTypes.enum,
    UserDefinedTargetView: ifcDataTypes.text,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcGridPlacement),
    PlacementLocation: ifcDataTypes.id,
    PlacementRefDirection: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcLinearPlacement),
    PlacementRelTo: ifcDataTypes.id,
    PlacementMeasuredAlong: ifcDataTypes.id,
    Distance: ifcDataTypes.id,
    Orientation: ifcDataTypes.id,
    CartesianPosition: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcLocalPlacement),
    PlacementRelTo: ifcDataTypes.id,
    RelativePlacement: ifcDataTypes.id,
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
    [namedProps.operator]: ifcDataTypes.enum,
    [namedProps.firstOperand]: ifcDataTypes.id,
    [namedProps.secondOperand]: ifcDataTypes.id
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcEllipse),
    [namedProps.position]: ifcDataTypes.id,
    [namedProps.semiAxis1]: ifcDataTypes.number,
    [namedProps.semiAxis2]: ifcDataTypes.number
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcIShapeProfileDef),
    ProfileType: ifcDataTypes.enum,
    ProfileName: ifcDataTypes.text,
    Position: ifcDataTypes.id,
    OverallWidth: ifcDataTypes.number,
    OverallDepth: ifcDataTypes.number,
    WebThickness: ifcDataTypes.number,
    FlangeThickness: ifcDataTypes.number,
    FilletRadius: ifcDataTypes.number
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
    [namedProps.baseSurface]: ifcDataTypes.id,
    [namedProps.agreementFlag]: ifcDataTypes.bool,
    [namedProps.position]: ifcDataTypes.id,
    [namedProps.polygonalBoundary]: ifcDataTypes.id
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
    [namedProps.ifcClass]: getName(ifcTypes.IfcCircleHollowProfileDef),
    ProfileType: ifcDataTypes.enum,
    ProfileName: ifcDataTypes.text,
    [namedProps.position]: ifcDataTypes.id,
    [namedProps.radius]: ifcDataTypes.number,
    [namedProps.wallThickness]: ifcDataTypes.number
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
    [namedProps.ifcClass]: getName(ifcTypes.IfcSurfaceOfLinearExtrusion),
    SweptCurve: ifcDataTypes.id,
    Position: ifcDataTypes.id,
    ExtrudedDirection: ifcDataTypes.id,
    Depth: ifcDataTypes.number
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcArbitraryOpenProfileDef),
    ProfileType: ifcDataTypes.enum,
    ProfileName: ifcDataTypes.text,
    Curve: ifcDataTypes.id
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcGeometricSet),
    Elements: ifcDataTypes.idSet
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcGeometricCurveSet),
    [namedProps.elements]: ifcDataTypes.idSet
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcConnectedFaceSet),
    CfsFaces: ifcDataTypes.idSet
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcFaceBasedSurfaceModel),
    FbsmFaces: ifcDataTypes.idSet
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcHalfSpaceSolid),
    [namedProps.baseSurface]: ifcDataTypes.id,
    [namedProps.agreementFlag]: ifcDataTypes.bool
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcCompositeCurveSegment),
    Transition: ifcDataTypes.enum,
    SameSense: ifcDataTypes.bool,
    [namedProps.parentCurve]: ifcDataTypes.id
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcCircle),
    Position: ifcDataTypes.id,
    Radius: ifcDataTypes.number
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcTrimmedCurve),
    [namedProps.basisCurve]: ifcDataTypes.id,
    [namedProps.trim1]: ifcDataTypes.valueSet,
    [namedProps.trim2]: ifcDataTypes.valueSet,
    [namedProps.senseAgreement]: ifcDataTypes.bool,
    MasterRepresentation: ifcDataTypes.enum
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcCompositeCurve),
    [namedProps.segments]: ifcDataTypes.idSet,
    SelfIntersect: ifcDataTypes.bool
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcBoundingBox),
    [namedProps.corner]: ifcDataTypes.id,
    [namedProps.xDim]: ifcDataTypes.number,
    [namedProps.yDim]: ifcDataTypes.number,
    [namedProps.zDim]: ifcDataTypes.number
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcPlanarExtent),
    SizeInX: ifcDataTypes.number,
    SizeInY: ifcDataTypes.number
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcApplication),
    ApplicationDeveloper: ifcDataTypes.id,
    Version: ifcDataTypes.text,
    ApplicationFullName: ifcDataTypes.text,
    ApplicationIdentifier: ifcDataTypes.text,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcOrganization),
    Identification: ifcDataTypes.text,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    Roles: ifcDataTypes.idSet,
    Addresses: ifcDataTypes.idSet,
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
    CreationDate: ifcDataTypes.date,
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
    Addresses: ifcDataTypes.idSet,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcPersonAndOrganization),
    ThePerson: ifcDataTypes.id,
    TheOrganization: ifcDataTypes.id,
    Roles: ifcDataTypes.idSet,
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
    Country: ifcDataTypes.text,
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcMaterial),
    Name: ifcDataTypes.text,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcMaterialLayer),
    Material: ifcDataTypes.id,
    LayerThickness: ifcDataTypes.number,
    IsVentilated: ifcDataTypes.value,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcMaterialLayerSet),
    MaterialLayers: ifcDataTypes.idSet,
    LayerSetName: ifcDataTypes.text,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcMaterialLayerSetUsage),
    ForLayerSet: ifcDataTypes.id,
    LayerSetDirection: ifcDataTypes.enum,
    DirectionSense: ifcDataTypes.enum,
    OffsetFromReferenceLine: ifcDataTypes.number,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcMaterialList),
    Materials: ifcDataTypes.idSet,
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcColourRgb),
    Name: ifcDataTypes.text,
    Red: ifcDataTypes.number,
    Green: ifcDataTypes.number,
    Blue: ifcDataTypes.number
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcCurveStyleFontPattern),
    VisibleSegmentLength: ifcDataTypes.number,
    InvisibleSegmentLength: ifcDataTypes.number
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcCurveStyle),
    Name: ifcDataTypes.text,
    CurveFont: ifcDataTypes.id,
    CurveWidth: ifcDataTypes.value,
    CurveColour: ifcDataTypes.id
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcFillAreaStyle),
    Name: ifcDataTypes.text,
    FillStyles: ifcDataTypes.idSet
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcFillAreaStyleHatching),
    HatchLineAppearance: ifcDataTypes.id,
    StartOfNextHatchLine: ifcDataTypes.value,
    PointOfReferenceHatchLine: ifcDataTypes.id,
    PatternStart: ifcDataTypes.id,
    HatchLineAngle: ifcDataTypes.number
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcCurveStyleFont),
    Name: ifcDataTypes.text,
    PatternList: ifcDataTypes.idSet
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcDraughtingPreDefinedCurveFont),
    Name: ifcDataTypes.text
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
    [namedProps.ifcClass]: getName(ifcTypes.IfcTextStyleFontModel),
    Name: ifcDataTypes.text,
    FontFamily: ifcDataTypes.textSet,
    FontStyle: ifcDataTypes.text,
    FontVariant: ifcDataTypes.text,
    FontWeight: ifcDataTypes.number,
    FontSize: ifcDataTypes.value
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcTextStyleForDefinedFont),
    Colour: ifcDataTypes.id,
    BackgroundColour: ifcDataTypes.id
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcTextStyle),
    Name: ifcDataTypes.text,
    TextCharacterAppearance: ifcDataTypes.id,
    TextStyle: ifcDataTypes.id,
    TextFontStyle: ifcDataTypes.id
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcTextLiteralWithExtent),
    Literal: ifcDataTypes.text,
    Placement: ifcDataTypes.id,
    Path: ifcDataTypes.enum,
    Extent: ifcDataTypes.id,
    BoxAlignment: ifcDataTypes.text
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcAnnotationFillArea),
    OuterBoundary: ifcDataTypes.id,
    InnerBoundaries: ifcDataTypes.idSet,
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcPropertySet),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    HasProperties: ifcDataTypes.idSet,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcPropertySingleValue),
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    NominalValue: ifcDataTypes.value,
    Unit: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcSpaceType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcColumnType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcPlateType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcMemberType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcWallType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcStairFlightType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcCoveringType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcCurtainWallType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcFurnitureType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    AssemblyPlace: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcDoorType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
    OperationType: ifcDataTypes.enum,
    ParameterTakesPrecedence: ifcDataTypes.bool,
    UserDefinedOperationType: ifcDataTypes.text,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcSlabType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcBuildingElementProxyType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcSanitaryTerminalType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcAirTerminalType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcLightFixtureType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
    PredefinedType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcSystemFurnitureElementType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcDistributionElementType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ApplicableOccurrence: ifcDataTypes.text,
    HasPropertySets: ifcDataTypes.idSet,
    RepresentationMaps: ifcDataTypes.idSet,
    Tag: ifcDataTypes.text,
    ElementType: ifcDataTypes.text,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcDoorLiningProperties),
    GlobalId: ifcDataTypes.text,
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
    ShapeAspectStyle: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcDoorPanelProperties),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    PanelDepth: ifcDataTypes.number,
    PanelOperation: ifcDataTypes.enum,
    PanelWidth: ifcDataTypes.value,
    PanelPosition: ifcDataTypes.enum,
    ShapeAspectStyle: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcDoorStyle),
    GlobalId: ifcDataTypes.text,
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
    Sizeable: ifcDataTypes.bool,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcWindowStyle),
    GlobalId: ifcDataTypes.text,
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
    Sizeable: ifcDataTypes.bool,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcWindowLiningProperties),
    GlobalId: ifcDataTypes.text,
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
    ShapeAspectStyle: ifcDataTypes.number,
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcActor),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    TheActor: ifcDataTypes.id,
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelAggregates),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    [namedProps.relatingObject]: ifcDataTypes.id,
    [namedProps.relatedObjects]: ifcDataTypes.idSet,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelContainedInSpatialStructure),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    [namedProps.relatedElements]: ifcDataTypes.idSet,
    [namedProps.relatingStructure]: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelDefinesByProperties),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    RelatedObjects: ifcDataTypes.idSet,
    RelatingPropertyDefinition: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelAssociatesMaterial),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    RelatedObjects: ifcDataTypes.idSet,
    RelatingMaterial: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelAssociatesClassification),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    RelatedObjects: ifcDataTypes.idSet,
    RelatingClassification: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelDefinesByType),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    [namedProps.relatedObjects]: ifcDataTypes.idSet,
    [namedProps.relatingType]: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelSpaceBoundary),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    RelatingSpace: ifcDataTypes.id,
    RelatedBuildingElement: ifcDataTypes.id,
    ConnectionGeometry: ifcDataTypes.id,
    PhysicalOrVirtualBoundary: ifcDataTypes.enum,
    InternalOrExternalBoundary: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelConnectsPathElements),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ConnectionGeometry: ifcDataTypes.id,
    RelatingElement: ifcDataTypes.id,
    RelatedElement: ifcDataTypes.id,
    RelatingPriorities: ifcDataTypes.numSet,
    RelatedPriorities: ifcDataTypes.numSet,
    RelatedConnectionType: ifcDataTypes.enum,
    RelatingConnectionType: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelVoidsElement),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    [namedProps.relatingBuildingElement]: ifcDataTypes.id,
    [namedProps.relatedOpeningElement]: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelFillsElement),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    [namedProps.relatingOpeningElement]: ifcDataTypes.id,
    [namedProps.relatedBuildingElement]: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelConnectsPortToElement),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    RelatingPort: ifcDataTypes.id,
    RelatedElement: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelAssignsToGroup),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    RelatedObjects: ifcDataTypes.idSet,
    RelatedObjectsType: ifcDataTypes.enum,
    RelatingGroup: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelServicesBuildings),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    RelatingSystem: ifcDataTypes.id,
    RelatedBuildings: ifcDataTypes.idSet,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcGroup),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcRelAssignsToActor),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    RelatedObjects: ifcDataTypes.idSet,
    RelatedObjectsType: ifcDataTypes.enum,
    RelatingActor: ifcDataTypes.id,
    ActingRole: ifcDataTypes.id,
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcQuantityArea),
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    Unit: ifcDataTypes.id,
    AreaValue: ifcDataTypes.number,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcQuantityLength),
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    Unit: ifcDataTypes.id,
    LengthValue: ifcDataTypes.number,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcQuantityVolume),
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    Unit: ifcDataTypes.id,
    VolumeValue: ifcDataTypes.number,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcElementQuantity),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    MethodOfMeasurement: ifcDataTypes.text,
    Quantities: ifcDataTypes.idSet,
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcDistributionPort),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    [namedProps.objectPlacement]: ifcDataTypes.id,
    [namedProps.representation]: ifcDataTypes.id,
    FlowDirection: ifcDataTypes.enum
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcSystem),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcProject),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    LongName: ifcDataTypes.text,
    Phase: ifcDataTypes.text,
    RepresentationContexts: ifcDataTypes.idSet,
    UnitsInContext: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcSite),
    GlobalId: ifcDataTypes.text,
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
    SiteAddress: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcBuilding),
    GlobalId: ifcDataTypes.text,
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
    BuildingAddress: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcBuildingStorey),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    [namedProps.objectPlacement]: ifcDataTypes.id,
    [namedProps.representation]: ifcDataTypes.id,
    LongName: ifcDataTypes.text,
    CompositionType: ifcDataTypes.enum,
    Elevation: ifcDataTypes.number,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcSpace),
    GlobalId: ifcDataTypes.text,
    OwnerHistory: ifcDataTypes.id,
    Name: ifcDataTypes.text,
    Description: ifcDataTypes.text,
    ObjectType: ifcDataTypes.text,
    [namedProps.objectPlacement]: ifcDataTypes.id,
    [namedProps.representation]: ifcDataTypes.id,
    LongName: ifcDataTypes.text,
    CompositionType: ifcDataTypes.enum,
    InteriorOrExteriorSpace: ifcDataTypes.enum,
    ElevationWithFlooring: ifcDataTypes.number,
});

newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcConversionBasedUnit),
    Dimensions: ifcDataTypes.id,
    [namedProps.unitType]: ifcDataTypes.enum,
    Name: ifcDataTypes.text,
    ConversionFactor: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcDerivedUnit),
    Elements: ifcDataTypes.idSet,
    [namedProps.unitType]: ifcDataTypes.enum,
    UserDefinedType: ifcDataTypes.text,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcDerivedUnitElement),
    Unit: ifcDataTypes.id,
    Exponent: ifcDataTypes.number,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcDimensionalExponents),
    LengthExponent: ifcDataTypes.number,
    MassExponent: ifcDataTypes.number,
    TimeExponent: ifcDataTypes.number,
    ElectricCurrentExponent: ifcDataTypes.number,
    ThermodynamicTemperatureExponent: ifcDataTypes.number,
    AmountOfSubstanceExponent: ifcDataTypes.number,
    LuminousIntensityExponent: ifcDataTypes.number,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcMeasureWithUnit),
    ValueComponent: ifcDataTypes.value,
    UnitComponent: ifcDataTypes.id,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcSIUnit),
    [namedProps.undefined]: ifcDataTypes.asterisk,
    [namedProps.unitType]: ifcDataTypes.enum,
    [namedProps.prefix]: ifcDataTypes.enum,
    Name: ifcDataTypes.enum,
});
newObject({
    [namedProps.ifcClass]: getName(ifcTypes.IfcUnitAssignment),
    [namedProps.units]: ifcDataTypes.idSet,
});

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'chevrotain'.
const newToken = chevrotain.createToken;
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'chevrotain'.
const Lexer = chevrotain.Lexer;
//Tokens / vocabulary for constructing the parser primitives
const tokens = [];
const patterns = {
    [ifcDataTypes.id]: /#\d+/,
    [ifcDataTypes.asterisk]: /\*/,
    [ifcDataTypes.default]: /\$/,
    [ifcDataTypes.value]: /IFC[A-Z]+?(?=\()/,
    [ifcDataTypes.bool]: /\.T\.|\.F\./,
    [ifcDataTypes.enum]: /\.[A-Z0-9_]+?\./,
    [ifcDataTypes.number]: /[0-9.E-]+/,
    [ifcDataTypes.text]: /'.*?'(?=[\)|,])/,
    EqualSign: /=/,
    OpenPar: /\(/,
    ClosePar: /\)/,
    Semicolon: /;/,
    Comma: /\s*,\s*/,
    [ifcDataTypes.anything]: /.+/,
};
const ingoredPatterns = {
    NewLine: /[\n\r]+/,
    WhiteSpace: /\s+/,
};
(function createTokens() {
    Object.keys(patterns).forEach((e) => {
        tokens.push(newToken({
            name: e,
            pattern: patterns[e],
        }));
    });
})();
(function createIgnoredTokens() {
    Object.keys(ingoredPatterns).forEach((e) => {
        tokens.push(newToken({
            name: e,
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            pattern: ingoredPatterns[e],
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'chevrotain'.
            group: chevrotain.Lexer.SKIPPED,
        }));
    });
})();
const lexer = new Lexer(tokens);
const vocabulary = {};
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'token' implicitly has an 'any' type.
tokens.forEach((token) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    vocabulary[token.name] = token;
});

//Basic syntactical structures (one structure per data type)
function addPrimitiveParsers($) {
    const parsers = [];
    Object.values(primitiveParsers).forEach((e) => {
        if (!parsers.includes(e)) {
            parsers.push(e);
            $.RULE(e.name, e($));
        }
    });
}
const primitiveParsers = {
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
    [ifcDataTypes.valueSet]: ValueSet_Parser,
    [ifcDataTypes.textSet]: TextSet_Parser,
};
function getParser(dataType) {
    return primitiveParsers[dataType].name;
}
function Asterisk_Parser($) {
    return () => {
        $.AT_LEAST_ONE(() => {
            $.OR([
                {
                    ALT: () => {
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        $.CONSUME(vocabulary[ifcDataTypes.asterisk]);
                    },
                },
            ]);
            $.OPTION(() => {
                $.CONSUME(vocabulary.Comma);
            });
        });
    };
}
function IfcValue_Parser($) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    $.CONSUME(vocabulary.IfcValue);
                    $.CONSUME(vocabulary.OpenPar);
                    $.OR2([
                        {
                            ALT: () => {
                                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                $.CONSUME(vocabulary[ifcDataTypes.number]);
                            },
                        },
                        {
                            ALT: () => {
                                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                $.CONSUME(vocabulary[ifcDataTypes.text]);
                            },
                        },
                        {
                            ALT: () => {
                                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                $.CONSUME(vocabulary[ifcDataTypes.bool]);
                            },
                        },
                        {
                            ALT: () => {
                                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                $.CONSUME(vocabulary[ifcDataTypes.enum]);
                            },
                        },
                    ]);
                    $.CONSUME(vocabulary.ClosePar);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.id]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME2(vocabulary[ifcDataTypes.number]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.default]);
                },
            },
        ]);
        $.OPTION(() => {
            $.CONSUME(vocabulary.Comma);
        });
    };
}
function Number_Parser($) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.default]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.number]);
                },
            },
        ]);
        $.OPTION(() => {
            $.CONSUME(vocabulary.Comma);
        });
    };
}
function NumberSet_Parser($) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    $.CONSUME(vocabulary.OpenPar);
                    $.MANY(() => {
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        $.CONSUME(vocabulary[ifcDataTypes.number]);
                        $.OPTION(() => {
                            $.CONSUME(vocabulary.Comma);
                        });
                    });
                    $.CONSUME(vocabulary.ClosePar);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME2(vocabulary.Comma);
        });
    };
}
function TextSet_Parser($) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    $.CONSUME(vocabulary.OpenPar);
                    $.MANY(() => {
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        $.CONSUME(vocabulary[ifcDataTypes.text]);
                        $.OPTION(() => {
                            $.CONSUME(vocabulary.Comma);
                        });
                    });
                    $.CONSUME(vocabulary.ClosePar);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME2(vocabulary.Comma);
        });
    };
}
function IdSet_Parser($) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    $.CONSUME(vocabulary.OpenPar);
                    $.MANY(() => {
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        $.CONSUME(vocabulary[ifcDataTypes.id]);
                        $.OPTION(() => {
                            $.CONSUME(vocabulary.Comma);
                        });
                    });
                    $.CONSUME(vocabulary.ClosePar);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME2(vocabulary.Comma);
        });
    };
}
function ValueSet_Parser($) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    $.CONSUME(vocabulary.OpenPar);
                    $.MANY(() => {
                        $.SUBRULE($.IfcValue_Parser);
                        $.OPTION(() => {
                            $.CONSUME(vocabulary.Comma);
                        });
                    });
                    $.CONSUME(vocabulary.ClosePar);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME2(vocabulary.Comma);
        });
    };
}
function IfcText_Parser($) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.default]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.text]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME(vocabulary.Comma);
        });
    };
}
function IfcBool_Parser($) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.bool]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME(vocabulary.Comma);
        });
    };
}
function IfcEnum_Parser($) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.enum]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME(vocabulary.Comma);
        });
    };
}
function IfcExpressId_Parser($) {
    return () => {
        $.OR([
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.id]);
                },
            },
            {
                ALT: () => {
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    $.CONSUME(vocabulary[ifcDataTypes.default]);
                },
            },
        ]);
        $.OPTION2(() => {
            $.CONSUME(vocabulary.Comma);
        });
    };
}

//Creates a syntactical structure (RULEs) given an IFC Class
function newParser($, ifcItem) {
    resetParserFactory();
    $.CONSUME(vocabulary.OpenPar);
    createRulesForAllProperties($, ifcItem);
    $.CONSUME(vocabulary.ClosePar);
}
function createRulesForAllProperties($, ifcItem) {
    Object.values(ifcItem).forEach((dataType) => {
        if (isDataTypeValid(dataType))
            newRule($, dataType);
    });
}
function newRule($, dataType) {
    const rule = `SUBRULE${getIndex(dataType)}`;
    updateCounter(dataType);
    return $[rule]($[primitiveParsers[dataType].name]);
}
//The counter is necessary because chevrotain cannot have
//multiple identical SUBRULEs. The repeated methods need to be
//followed by a suffix (f.e. SUBRULE(X), SUBRULE2(X), ...)
let counter = {};
function resetParserFactory() {
    counter = {};
    getAllDataTypes().forEach((e) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        counter[e] = 0;
    });
}
function updateCounter(dataType) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    counter[dataType]++;
}
//Chevrotain syntax: SUBRULE0(X) is expressed as SUBRULE(X)
function getIndex(dataType) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return counter[dataType] === 0 ? "" : counter[dataType];
}

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'chevrotain'.
const CstParser = chevrotain.CstParser;
//Contains all the syntactical structures (RULEs)
class IfcParser extends CstParser {
    constructor() {
        super(tokens);
        addPrimitiveParsers(this);
        addParsesForAllIfcTypes(this);
        this.performSelfAnalysis();
    }
}
//Creates the syntactical structures (RULEs) for all the IFC Classes
function addParsesForAllIfcTypes($) {
    Object.values(typesParserMap).forEach((e) => {
        $.RULE(e[namedProps.ifcClass], () => {
            newParser($, e);
        });
    });
}
const parser = new IfcParser();

const r = {
    unicode: /\\X2\\[0-9A-F]+?\\X\d\\/,
    getUnicode: /[0-9A-F]+(?=\\X\d\\)/,
};
function unicode(text) {
    while (r.unicode.test(text)) {
        const encoded = text.match(r.unicode)[0].match(r.getUnicode)[0];
        text = text.replace(r.unicode, String.fromCharCode(parseInt(encoded, 16)));
    }
    return text;
}
function formatDate(dateAsNumber) {
    if (isNaN(dateAsNumber))
        return dateAsNumber;
    const formattedDate = new Date(dateAsNumber * 1000);
    return formattedDate.getTime() ? formattedDate : dateAsNumber;
}

//Each method retrieves information from a given parsed data type
const semanticUnits = {
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
    [ifcDataTypes.asterisk]: getAsterisk,
    [ifcDataTypes.valueSet]: getValueSet,
};
function getProperty(parsed, type) {
    return semanticUnits[type](parsed);
}
//The counter is necessary because chevrotain generates indexed
//parsed structures. F.e. if there are two enums in a IFC Class,
//the first one has index=1, the second one index=2, etc
let counter$1 = {};
function resetSemanticFactory() {
    counter$1 = {
        [ifcDataTypes.id]: 0,
        [ifcDataTypes.text]: 0,
        [ifcDataTypes.number]: 0,
        [ifcDataTypes.enum]: 0,
        [ifcDataTypes.idSet]: 0,
        [ifcDataTypes.numSet]: 0,
        [ifcDataTypes.value]: 0,
        [ifcDataTypes.textSet]: 0,
        [ifcDataTypes.bool]: 0,
        [ifcDataTypes.valueSet]: 0,
    };
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
    return getSet(parsed, ifcDataTypes.textSet, ifcDataTypes.text, (e) => unicode(e.image.slice(1, -1)));
}
function getIdSet(parsed) {
    return getSet(parsed, ifcDataTypes.idSet, ifcDataTypes.id, (e) => Number(e.image.slice(1)));
}
function getNumberSet(parsed) {
    return getSet(parsed, ifcDataTypes.numSet, ifcDataTypes.number, (e) => Number(e.image));
}
function getValueSet(parsed) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const valueSet = parsed[getParser(ifcDataTypes.valueSet)][counter$1[ifcDataTypes.valueSet]++];
    const values = valueSet.children[getParser(ifcDataTypes.value)];
    return values.map((ifcValue) => {
        const valueProps = ifcValue.children;
        let type = getIfcValueType(valueProps);
        const value = valueProps[type][0].image;
        const formattedValue = formatIfcValue(type, value);
        const unit = valueProps[ifcDataTypes.value] ? valueProps[ifcDataTypes.value][0].image : "";
        return { [ifcUnitsValue.value]: formattedValue, [ifcUnitsValue.unit]: unit };
    });
}
function getIfcValue(parsed) {
    if (isDefaultValue(parsed, ifcDataTypes.value))
        return getDefault(parsed, ifcDataTypes.value);
    if (isExpressId(parsed, ifcDataTypes.value))
        return getIfcValueId(parsed, ifcDataTypes.value);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const data = parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children;
    let type = getIfcValueType(data);
    const value = formatIfcValue(type, getIfcValueValue(parsed, type));
    return { Value: value, IfcUnit: getIfcUnit(parsed) };
}
function getEmptySet(type) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    counter$1[type]++;
    return [];
}
function getAsterisk() {
    return "*";
}
function getValue(parsed, type, formatFunction) {
    if (isDefaultValue(parsed, type))
        return getDefault(parsed, type);
    return formatFunction(extract(parsed, type));
}
function getSet(parsed, type, subtype, mapFunction) {
    if (isDefaultValue(parsed, type))
        return getDefault(parsed, type);
    if (isEmptySet(parsed, type, subtype))
        return getEmptySet(type);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return parsed[getParser(type)][counter$1[type]++].children[subtype].map(mapFunction);
}
function extract(parsed, type) {
    return getContent(parsed[getParser(type)], type);
}
function getContent(subParsed, type) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return parsed[getParser(type)][counter$1[type]].children[ifcDataTypes.default]
        ? true
        : false;
}
function isEmptySet(parsed, type, subtype) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return parsed[getParser(type)][counter$1[type]].children[subtype]
        ? false
        : true;
}
function getDefault(parsed, type) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return parsed[getParser(type)][counter$1[type]++].children[ifcDataTypes.default][0].image;
}
function isExpressId(parsed, type) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return parsed[getParser(type)][counter$1[type]].children[ifcDataTypes.id] ? true : false;
}
function getIfcValueId(parsed, type) {
    const rawId = 
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    parsed[getParser(type)][counter$1[type]++].children[ifcDataTypes.id][0].image;
    return Number(rawId.slice(1));
}
function getIfcValueValue(parsed, type) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children[type][0].image;
}
function formatIfcValue(type, value) {
    if (type === ifcValueType.number)
        return formatNumber(value);
    if (type === ifcValueType.text)
        return formatText(value);
    if (type === ifcValueType.bool)
        return formatBool(value);
    if (type === ifcValueType.enum)
        return formatEnum(value);
    return value;
}
function getIfcValueType(data) {
    if (data[ifcDataTypes.number])
        return ifcValueType.number;
    if (data[ifcDataTypes.text])
        return ifcValueType.text;
    if (data[ifcDataTypes.bool])
        return ifcValueType.bool;
    return ifcValueType.enum;
}
function getIfcUnit(parsed) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const ifcUnit = parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children[ifcDataTypes.value]
        ? // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            parsed[getParser(ifcDataTypes.value)][counter$1[ifcDataTypes.value]].children[ifcDataTypes.value][0].image
        : "";
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    counter$1[ifcDataTypes.value]++;
    return ifcUnit;
}

//Uses semantic primitives according to the data type of each property
function newSemantic(parsed, ifcItem) {
    resetSemanticFactory();
    const result = retrieveIfcObjectProperties(parsed, ifcItem);
    addClassName(result, ifcItem);
    cleanUndefinedProperties(result);
    return result;
}
function retrieveIfcObjectProperties(parsed, ifcItem) {
    const result = {};
    Object.keys(ifcItem).forEach((e) => {
        if (isDataTypeValid(ifcItem[e]))
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            result[e] = newSemanticUnit(parsed, ifcItem[e]);
    });
    return result;
}
function newSemanticUnit(parsed, dataType) {
    return {
        [typeValue.value]: getProperty(parsed, dataType),
        [typeValue.type]: dataType,
    };
}
function addClassName(result, ifcItem) {
    result[namedProps.ifcClass] = ifcItem[namedProps.ifcClass];
}
function cleanUndefinedProperties(ifcItem) {
    if (ifcItem.hasOwnProperty([namedProps.undefined]))
        delete ifcItem[namedProps.undefined];
}

//Chevrotain requires a method per syntactical structure of the parser
//When the parser outputs a syntactical structure, the visitor
//handles it with the correspondant method using visit()
const BaseVisitor = parser.getBaseCstVisitorConstructor();
class IfcVisitor extends BaseVisitor {
    constructor() {
        super();
        this.validateVisitor();
    }
}
(function createPrimitiveSemantic() {
    Object.keys(primitiveParsers).forEach((e) => {
        IfcVisitor.prototype[primitiveParsers[e].name] = (parsed) => { };
    });
})();
(function createSemantic() {
    Object.values(typesParserMap).forEach((e) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        IfcVisitor.prototype[e[namedProps.ifcClass]] = (parsed) => getSemantic(ifcTypes[e[namedProps.ifcClass]], parsed);
    });
})();
function getSemantic(ifcType, parsed) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const ifcItem = typesParserMap[ifcType];
    return newSemantic(parsed, ifcItem);
}
const ifcVisitor = new IfcVisitor();

//The parsing process consists of 4 steps:
//1. The lexer tokenizes the input
//2. The tokenized input is given to the parser
//3. The parser is applied using the chosen syntactical structure
//4. The visitor applies semantic rules to the output of the parser
function parse(text, ifcType) {
    const lexingResult = lexer.tokenize(text);
    parser.input = lexingResult.tokens;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const cstOutput = parser[parserByType(ifcType)[namedProps.ifcClass]]();
    if (parser.errors.length > 0)
        showErrors(text, ifcType, parser);
    return ifcVisitor.visit(cstOutput);
}
function showErrors(text, ifcType, parser) {
    console.warn(parser.errors);
    console.warn(`Error while parsing item: ${text} of type ${ifcType}`);
}

const regexp = {
    allNewLines: /\r?\n|\r/g,
    headerSection: /HEADER;.+?(?=ENDSEC;)/,
    dataSection: /DATA;\s+.+(?=ENDSEC;)/,
    singleIfcItems: /#\d+\s*=\s*IFC.+?\)(;\s*(?=#\d*)|;\s*$)/g,
    expressId: /^#\d+/,
    rawIfcType: /IFC\w+/,
    rawIfcProperties: /\(.+?(?=;\s*$)/,
};
function readIfcItems(loadedIfc) {
    const { dataSection } = extractSections(loadedIfc);
    return constructRawIfcItems(dataSection);
}
function extractSections(loadedIfc) {
    const ifcPlaneText = removeAllNewLines(loadedIfc);
    return {
        headerSection: readHeaderSection(ifcPlaneText),
        dataSection: readDataSection(ifcPlaneText),
    };
}
function constructRawIfcItems(dataSection) {
    const flatIfcItemList = separateIfcEntities(dataSection);
    return flatIfcItemList.map((e) => {
        return {
            [itemsReaderValues.expressId]: getId(e),
            [itemsReaderValues.type]: getIfcType(e),
            [itemsReaderValues.properties]: getIfcRawProperties(e),
        };
    });
}
function separateIfcEntities(dataSection) {
    return dataSection.match(regexp.singleIfcItems);
}
function readHeaderSection(ifcLine) {
    return ifcLine.match(regexp.headerSection)[0];
}
function readDataSection(ifcLine) {
    return ifcLine.match(regexp.dataSection)[0];
}
function removeAllNewLines(ifcFile) {
    return ifcFile.replace(regexp.allNewLines, " ");
}
function getId(rawIfcLine) {
    return parseInt(rawIfcLine.match(regexp.expressId).toString().slice(1));
}
function getIfcType(rawIfcLine) {
    return rawIfcLine.match(regexp.rawIfcType).toString();
}
function getIfcRawProperties(ifcLine) {
    return ifcLine.match(regexp.rawIfcProperties).toString();
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
    if (isSingleItemValid(ifcProperty, items))
        ifcProperty[typeValue.value] = items[ifcProperty[typeValue.value]];
}
function isSingleItemValid(ifcProperty, items) {
    return (isItemWithReference(ifcProperty) &&
        items.hasOwnProperty(ifcProperty[typeValue.value]));
}
function referenceMultipleItems(ifcProperty, items) {
    if (ifcProperty[typeValue.type] === ifcDataTypes.idSet) {
        const property = ifcProperty;
        const values = [...property[typeValue.value]];
        property[typeValue.value] = values.map((e) => {
            return items.hasOwnProperty(e) ? items[e] : e;
        });
    }
}
function isItemWithReference(item) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (item[typeValue.value] === ifcDataTypes[typeValue.value] && !isNaN(item[typeValue.value]))
        return true;
    if (item[typeValue.type] === ifcDataTypes.id)
        return true;
    return false;
}
function trimExplicitTypes(ifcLine, key) {
    const value = ifcLine[key][typeValue.value];
    if (value)
        ifcLine[key] = value;
}

function findRemainingTypes(items) {
    const remainingTypes = [];
    items.forEach((element) => {
        if (Object.values(ifcTypes).indexOf(element[itemsReaderValues.type]) < 0) {
            if (!remainingTypes.includes(element[itemsReaderValues.type])) {
                remainingTypes.push(element[itemsReaderValues.type]);
            }
        }
    });
    if (remainingTypes.length > 0)
        console.log('Error: the following classes are not implemented: ', remainingTypes);
}

function loadIfcFileItems(ifcData) {
    const ifcItems = readIfcItems(ifcData);
    findRemainingTypes(ifcItems);
    return loadItems(ifcItems);
}
function loadItems(ifcData) {
    const loadedItems = {};
    ifcData.map((ifcItem) => {
        if (isTypeSupported(ifcItem))
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            loadedItems[ifcItem[itemsReaderValues.expressId]] = parseAndLoadItem(ifcItem);
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
        Object.keys(this.ifcData).forEach((e) => {
            if (this.getType(e) === getName(ifcType)) {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                matches[e] = this.ifcData[e];
            }
        });
        return matches;
    }
    getType(id) {
        return this.ifcData[id][namedProps.ifcClass];
    }
    findAllProducts(spatialStructureElements, elements = []) {
        spatialStructureElements.forEach((spatial) => {
            const buildingElementsHere = spatial[namedProps.hasBuildingElements];
            const spatialElementsHere = spatial[namedProps.hasSpatial];
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            if (buildingElementsHere)
                elements.push(...buildingElementsHere);
            if (spatialElementsHere)
                this.findAllProducts(spatialElementsHere, elements);
        });
        return elements;
    }
}
function createIfcItemsFinder(loadedIfc) {
    return new IfcEntityFinder(loadedIfc);
}

function bindElements(finder, type, relating, related, property) {
    const relations = finder.findByType(type);
    Object.values(relations).forEach((relation) => {
        return isArray(relation[relating])
            ? bindMultiple(relation, relating, related, property)
            : bindSingle(relation, relating, related, property);
    });
}
function bindSingle(relation, relating, related, property) {
    if (!relation[relating][property])
        relation[relating][property] = [];
    bind(relation[relating][property], relation, related);
}
function bindMultiple(relation, relating, related, property) {
    relation[relating].forEach((e) => {
        if (!e[property])
            e[property] = [];
        bind(e[property], relation, related);
    });
}
function bind(property, relation, related) {
    return isArray(relation[related])
        ? property.push(...relation[related])
        : property.push(relation[related]);
}
function isArray(item) {
    return item.constructor === Array;
}

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
const mainObject = new THREE.Object3D();

function constructProject(ifcData) {
    const finder = createIfcItemsFinder(ifcData);
    bindAllElements(finder);
    const ifcProjects = get(finder, ifcTypes.IfcProject);
    const elements = finder.findAllProducts(ifcProjects);
    const spaces = get(finder, ifcTypes.IfcSpace);
    const units = get(finder, ifcTypes.IfcUnitAssignment)[0];
    return {
        [structuredData.ifcProject]: ifcProjects,
        [structuredData.products]: elements,
        [structuredData.spaces]: spaces,
        [structuredData.units]: units,
        [structuredData.mainObject]: mainObject,
    };
}
function get(finder, type) {
    return Object.values(finder.findByType(type));
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

function trackLocalTransform(product, placement, property) {
    const transform = initializeTransform(product, property);
    const { locat, xAxis, yAxis, zAxis } = getTransform(placement);
    transform[pivots.locat].push(locat);
    transform[pivots.xAxis].push(xAxis);
    transform[pivots.yAxis].push(yAxis);
    transform[pivots.zAxis].push(zAxis);
}
function initializeTransform(product, property) {
    if (!product[property])
        product[property] = {
            [pivots.locat]: [],
            [pivots.xAxis]: [],
            [pivots.yAxis]: [],
            [pivots.zAxis]: []
        };
    return product[property];
}
function getTransform(placement) {
    const locat = getLocat(placement);
    const xAxis = getAxisX(placement);
    const zAxis = getAxisZ(placement);
    const yAxis = getAxisY(zAxis, xAxis);
    return { locat, xAxis, yAxis, zAxis };
}
function getTransformOfGeometry(placement) {
    const { locat, xAxis, yAxis, zAxis } = getTransform(placement);
    return { [pivots.locat]: [locat], [pivots.xAxis]: [xAxis], [pivots.yAxis]: [yAxis], [pivots.zAxis]: [zAxis] };
}
function getLocat(placement) {
    if (isInvalid(placement[namedProps.location]))
        return [0, 0, 0];
    const location = placement[namedProps.location][namedProps.coordinates];
    if (location.length === 2)
        location.push(0);
    return location;
}
function getAxisX(placement) {
    if (isInvalid(placement[namedProps.refDirection]))
        return [1, 0, 0];
    let x = placement[namedProps.refDirection][namedProps.dirRatios];
    if (x.length === 2)
        x.push(0);
    return x;
}
function getAxisZ(placement) {
    if (isInvalid(placement[namedProps.axis]))
        return [0, 0, 1];
    const z = placement[namedProps.axis][namedProps.dirRatios];
    if (z.length === 2)
        z.push(0);
    return z;
}
//In IFC the axis Y is implicit (computed from X and Z)
function getAxisY(X, Z) {
    return [X[1] * Z[2] - X[2] * Z[1], X[2] * Z[0] - X[0] * Z[2], X[0] * Z[1] - X[1] * Z[0]];
}
function isInvalid(prop) {
    if (!prop || prop === defaultValue)
        return true;
    return false;
}

function applyTransforms(product, property) {
    const pivots = getPivots(product[property]);
    product[namedProps.geometry].forEach((geometry) => applyTransform(geometry, pivots));
}
function applyTransformsToGeometry(geometry, placement) {
    const transform = getTransformOfGeometry(placement);
    const pivots = getPivots(transform);
    applyTransform(geometry, pivots);
}
function applyTransform(geometry, pivots) {
    if (geometry) {
        bindGeometryToPivots(geometry, pivots);
        mainObject.add(pivots[0]);
        attachGeometryToScene(geometry);
        mainObject.remove(pivots[0]);
    }
}
// @ts-expect-error ts-migrate(7023) FIXME: 'attachGeometryToScene' implicitly has return type... Remove this comment to see the full error message
function attachGeometryToScene(geometry) {
    if (geometry.constructor === Array)
        return geometry.forEach((e) => attachGeometryToScene(e));
    return mainObject.attach(geometry);
}
// @ts-expect-error ts-migrate(7023) FIXME: 'bindGeometryToPivots' implicitly has return type ... Remove this comment to see the full error message
function bindGeometryToPivots(geometry, pivots) {
    if (geometry.constructor === Array)
        return geometry.forEach((e) => bindGeometryToPivots(e, pivots));
    pivots[pivots.length - 1].add(geometry);
}
function getPivots(transform) {
    const pivots$1 = [];
    const locations = transform[pivots.locat] || [];
    for (let i = locations.length - 1; i >= 0; i--) {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
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
        if (pivots[i + 1])
            pivots[i].add(pivots[i + 1]);
    }
}
function getRotMat(transform, index) {
    const { x, y, z } = getTransforms(transform, index);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const directionMatrix = new THREE.Matrix4();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const rotationMatrix = new THREE.Matrix4();
    directionMatrix.set(x[0], x[1], x[2], 0, y[0], y[1], y[2], 0, z[0], z[1], z[2], 0, 0, 0, 0, 1);
    rotationMatrix.getInverse(directionMatrix);
    return rotationMatrix;
}
function getTransforms(transform, index) {
    const x = transform[pivots.xAxis][index];
    const y = transform[pivots.yAxis][index];
    const z = transform[pivots.zAxis][index];
    return { x, y, z };
}

function applyTransformations(structured) {
    structured[structuredData.products].forEach((product) => {
        applyTransform$1(product);
    });
}
function applyTransform$1(product) {
    getTransforms$1(product, getPlacement(product));
    applyTransforms(product, namedProps.transform);
    applyTransformToItems(product[namedProps.hasOpenings]);
    applyTransformToItems(product[namedProps.hasSpatial]);
}
function applyTransformToItems(items) {
    if (items)
        items.forEach((item) => {
            getTransforms$1(item, getPlacement(item));
            applyTransforms(item, namedProps.transform);
        });
}
//Gets all the transforms (local origins) recursively
function getTransforms$1(product, objPlacement) {
    try {
        const placement = objPlacement[namedProps.relativePlacement];
        trackLocalTransform(product, placement, namedProps.transform);
        if (objPlacement[namedProps.placementRelTo] != defaultValue)
            getTransforms$1(product, objPlacement[namedProps.placementRelTo]);
    }
    catch (e) {
        console.warn(e);
    }
}
function getPlacement(product) {
    try {
        return product[namedProps.objectPlacement];
    }
    catch (e) {
        console.warn(e);
    }
}

function createLine(coordinates) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const material = new THREE.LineBasicMaterial({
        linecap: "round",
        color: 0xff0000,
    });
    const points = [];
    coordinates.forEach((e) => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
        points.push(new THREE.Vector3(e[0], e[1]));
    });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const line = new THREE.Line(geometry, material);
    return line;
}

function mapCurve2D(shape) {
    return mapCurve(shape[namedProps.items][0]);
}
function mapCurve(shape) {
    const ifcClass = shape[namedProps.ifcClass].toUpperCase();
    return curve2DMap[ifcClass](shape);
}
const curve2DMap = {
    [ifcTypes.IfcPolyline]: mapPolyline,
    [ifcTypes.IfcTrimmedCurve]: mapTrimmedCurve,
};
function mapPolyline(shape) {
    const points = [];
    shape[namedProps.points].forEach((point) => {
        points.push(point[namedProps.coordinates]);
    });
    return createLine(points);
}
function mapTrimmedCurve(shape) {
    //TODO
    console.log("TODO:", shape);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    return new THREE.Object3D();
}

function createExtrusionsByPoints(points, depth, dir = [0, 0, 1], holes) {
    const shapePoints = [];
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    points.forEach((e) => shapePoints.push(new THREE.Vector3(e[1], -e[0])));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const shape = new THREE.Shape(shapePoints);
    if (holes)
        holes.forEach((hole) => shape.holes.push(hole));
    return createExtrusion(shape, depth, dir);
}
function createCircularExtrusion(radius, depth, dir = [0, 0, 1], thickness) {
    const segments = 36;
    const outerShape = createCircularShape(radius, segments);
    if (thickness) {
        const innerShape = createCircularShape(radius - thickness, segments);
        outerShape.holes.push(innerShape);
    }
    return createExtrusion(outerShape, depth, (dir = [0, 0, 1]));
}
function createTubularExtrusion(radius, depth, dir = [0, 0, 1], thickness) {
    return createCircularExtrusion(radius, depth, dir, thickness);
}
function createCircularShape(radius, segments) {
    const coordinates = getCircleCoordinates(radius, segments);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const shape = new THREE.Shape();
    shape.moveTo(...coordinates[0]);
    coordinates.forEach((point) => shape.lineTo(...point));
    return shape;
}
function getCircleCoordinates(radius, steps) {
    const coords = [];
    for (let i = 0; i < steps; i++) {
        coords.push([
            radius * Math.cos(2 * Math.PI * (i / steps)),
            radius * Math.sin(2 * Math.PI * (i / steps))
        ]);
    }
    coords.push([...coords[0]]);
    return coords;
}
function createExtrusion(shape, depth, dir = [0, 0, 1]) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const extrudeSettings = getExtrudeSettings(depth, dir);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    applyExtrusionDirection(dir, geometry);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const mesh = new THREE.Mesh(geometry, material);
    mesh.updateMatrix();
    return mesh;
}
function getExtrudeSettings(depth, dir) {
    const path = getVerticalDirection(depth, dir);
    return {
        bevelEnabled: false,
        steps: 1,
        extrudePath: path
    };
}
//To define the direction of the extrusion:
// x and y are applied as a skew operation (transform matrix)
// z is applied in the vertical direction
function applyExtrusionDirection(dir, geometry) {
    const matrix = getTransformMatrix(dir);
    geometry.applyMatrix4(matrix);
}
function getTransformMatrix(dir) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const matrix = new THREE.Matrix4();
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const direction = new THREE.Vector3(dir[0], dir[1], dir[2]);
    const Syx = 0, Sxy = 0, Sxz = 0, Syz = 0;
    const Szx = direction.y, Szy = direction.x;
    return matrix.set(1, Syx, Szx, 0, Sxy, 1, Szy, 0, Sxz, Syz, 1, 0, 0, 0, 0, 1);
}
function getVerticalDirection(depth, dir) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const v1 = new THREE.Vector3(0, 0, 0);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const v2 = new THREE.Vector3(0, 0, depth * dir[2]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    return new THREE.LineCurve3(v1, v2);
}

function mapRectangleProfileExtrusion(extruded, product) {
    getRectProfileDimensions(extruded);
    const position = extruded.profile[namedProps.position];
    const points = getRectProfilePoints(extruded);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    const geometry = createExtrusionsByPoints(points, extruded.depth, extruded.direction);
    applyTransformsToGeometry(geometry, position);
    return geometry;
}
function getRectProfilePoints(extruded) {
    const halfWidth = extruded[namedProps.xDim] / 2;
    const halfHeight = extruded[namedProps.yDim] / 2;
    return [
        [-halfWidth, halfHeight],
        [halfWidth, halfHeight],
        [halfWidth, -halfHeight],
        [-halfWidth, -halfHeight],
    ];
}
function getRectProfileDimensions(extruded) {
    extruded[namedProps.xDim] = extruded.profile[namedProps.xDim];
    extruded[namedProps.yDim] = extruded.profile[namedProps.yDim];
}

function mapArbitraryProfileExtrusion(props) {
    return mapExtrusionByTypeOfProfile(props);
}
function mapArbitraryProfileWithVoidsExtrusion(props) {
    props.holes = getInnerVoids(props);
    return mapExtrusionByTypeOfProfile(props);
}
function getInnerVoids(props) {
    const shapes = [];
    const innerCurvesRep = props.profile[namedProps.innerCurves];
    innerCurvesRep.forEach((curveRep) => {
        const typeOfProfile = curveRep[namedProps.ifcClass].toUpperCase();
        shapes.push(extrusionCurvesMap[typeOfProfile].shape(curveRep));
    });
    return shapes;
}
function mapExtrusionByTypeOfProfile(props) {
    const typeOfProfile = props.profile[namedProps.outerCurve][namedProps.ifcClass].toUpperCase();
    return extrusionCurvesMap[typeOfProfile].extrusion(props);
}
const extrusionCurvesMap = {
    [ifcTypes.IfcPolyline]: { extrusion: mapPolylineExtrusion, shape: mapPolylineShape },
    [ifcTypes.IfcCompositeCurve]: { extrusion: mapCompositeCurveExtrusion, shape: mapCompositeCurveShape }
};
function mapPolylineShape(shapeRepresentation) {
    const points = getShapePoints(shapeRepresentation[namedProps.points]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const shape = new THREE.Shape();
    shape.moveTo(...points[0]);
    points.shift();
    points.forEach((point) => shape.lineTo(...point));
    return shape;
}
function getShapePoints(pointsRepresentation) {
    return pointsRepresentation.map((point) => {
        const coords = point[namedProps.coordinates];
        return [-coords[1], coords[0]];
    });
}
function mapPolylineExtrusion(props) {
    const profileRepresentation = props.profile;
    const pointsRepresentation = profileRepresentation[namedProps.outerCurve][namedProps.points];
    const points = getExtrusionPoints(pointsRepresentation);
    return createExtrusionsByPoints(points, props.depth, props.direction, props.holes);
}
function mapCompositeCurveShape(shapeRepresentation) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const shape = new THREE.Shape();
    const segmentsRepresentation = shapeRepresentation[namedProps.segments];
    segmentsRepresentation.forEach((curve) => mapCompositeCurveSegment(shape, curve));
    resetFirstCompositeCurve();
    return shape;
}
function mapCompositeCurveExtrusion(props) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const shape = new THREE.Shape();
    const segmentsRepresentation = props.profile[namedProps.outerCurve][namedProps.segments];
    segmentsRepresentation.forEach((curve) => mapCompositeCurveSegment(shape, curve));
    resetFirstCompositeCurve();
    if (props.holes)
        props.holes.forEach((hole) => shape.holes.push(hole));
    const extrusion = createExtrusion(shape, props.depth, props.direction);
    extrusion.rotation.z += Math.PI / 2;
    extrusion.updateMatrix();
    return extrusion;
}
function mapCompositeCurveSegment(shape, segmentRepresentation) {
    const curve = segmentRepresentation[namedProps.parentCurve];
    const typeOfCurve = curve[namedProps.ifcClass].toUpperCase();
    compositeCurvesMap[typeOfCurve](shape, curve);
}
const compositeCurvesMap = {
    [ifcTypes.IfcPolyline]: mapPolylineSegment,
    [ifcTypes.IfcTrimmedCurve]: mapTrimmedCurveSegment
};
function mapPolylineSegment(shape, curve) {
    const points = curve[namedProps.points];
    if (isFirstSegmentOfCompositeCurve) {
        shape.moveTo(...points[0][namedProps.coordinates]);
        points.shift();
        isFirstSegmentOfCompositeCurve = false;
    }
    points.forEach((point) => shape.lineTo(...point[namedProps.coordinates]));
}
function mapTrimmedCurveSegment(shape, curve) {
    const typeOfTrimmedCurve = curve[namedProps.basisCurve][namedProps.ifcClass].toUpperCase();
    trimmedCurvesMap[typeOfTrimmedCurve](shape, curve);
}
const trimmedCurvesMap = {
    [ifcTypes.IfcCircle]: mapTrimmedCircleCurve
};
//Three.js draw shapes continuously
//(the last point of the current curve is the closest to the first point of the next curve)
//But circles in IFC doesn't follow this pattern necessarily
//This function computes the closest point of the next arc
//To determine wether to draw the circle clockwise or counter-clockwise
function mapTrimmedCircleCurve(shape, curve) {
    const { x, y, radius, trims, ends } = getCircleInfo(curve);
    const currentPoint = [shape.currentPoint.x, shape.currentPoint.y];
    const distancesToNextPoints = getDistancesToNextPoints(currentPoint, ends);
    distancesToNextPoints[0] < distancesToNextPoints[1]
        ? shape.absarc(x, y, radius, trims[0], trims[1], false)
        : shape.absarc(x, y, radius, trims[1], trims[0], true);
}
function getDistancesToNextPoints(currentPoint, ends) {
    return [
        getDistanceBetweenPoints(currentPoint, ends[0]),
        getDistanceBetweenPoints(currentPoint, ends[1])
    ];
}
function getCircleInfo(curve) {
    const location = curve[namedProps.basisCurve][namedProps.position][namedProps.location][namedProps.coordinates];
    const radius = curve[namedProps.basisCurve][namedProps.radius];
    const x = location[0];
    const y = location[1];
    const trims = getTrimmedCircleTrims(curve);
    const ends = getTrimmedCircleEnds(x, y, radius, trims);
    return { x, y, radius, trims, ends };
}
function getTrimmedCircleTrims(curve) {
    return [getTrimmedCircleTrim(curve, [namedProps.trim1]), getTrimmedCircleTrim(curve, [namedProps.trim2])];
}
function getTrimmedCircleTrim(curve, trim) {
    const rotation = curve[namedProps.basisCurve][namedProps.position][namedProps.refDirection][namedProps.dirRatios];
    const offsetAngle = Math.acos(rotation[0]);
    return (curve[trim][0][ifcUnitsValue.value] * Math.PI) / 180 + offsetAngle;
}
function getTrimmedCircleEnds(x, y, radius, trims) {
    return [getCirclePoint(x, y, radius, trims[0]), getCirclePoint(x, y, radius, trims[1])];
}
function getCirclePoint(x, y, radius, angle) {
    return [Math.cos(angle) * radius + x, Math.sin(angle) * radius + y];
}
function getDistanceBetweenPoints(point1, point2) {
    const a = point1[0] - point2[0];
    const b = point1[1] - point2[1];
    return Math.sqrt(a * a + b * b);
}
function getExtrusionPoints(pointsRepresentation) {
    return pointsRepresentation.map((point) => {
        const coords = point[namedProps.coordinates];
        return [-coords[0], -coords[1]];
    });
}
//Three.js needs to know the first point of the first curve to create a shape
let isFirstSegmentOfCompositeCurve = true;
function resetFirstCompositeCurve() {
    isFirstSegmentOfCompositeCurve = true;
}

function mapCircleProfileExtrusion(extruded) {
    const { position, radius } = getProperties(extruded);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
    const cylinder = createCircularExtrusion(radius, extruded.depth);
    applyTransformsToGeometry(cylinder, position);
    return cylinder;
}
function mapCircleHollowProfileExtrusion(extruded) {
    const { position, radius, thickness } = getProperties(extruded);
    const tube = createTubularExtrusion(radius, extruded.depth, extruded.direction, thickness);
    applyTransformsToGeometry(tube, position);
    return tube;
}
function getProperties(extruded) {
    return {
        position: extruded.profile[namedProps.position],
        radius: extruded.profile[namedProps.radius],
        thickness: extruded.profile[namedProps.wallThickness]
    };
}

function mapSweptSolid(shape, product) {
    const items = [];
    shape[namedProps.items].forEach((extruded) => items.push(mapExtrudedAreaSolid(extruded, product)));
    return joinAllExtrusions(items);
}
function joinAllExtrusions(items) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    var singleGeometry = new THREE.Geometry();
    items.forEach((item) => {
        item.updateMatrix();
        singleGeometry.merge(item.geometry, item.matrix);
        mainObject.remove(item);
    });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const result = new THREE.Mesh(singleGeometry);
    mainObject.add(result);
    return result;
}
function mapExtrudedAreaSolid(extruded, product) {
    const extrudedProps = getExtrusionProps(extruded);
    const solid = getExtrusionByType(extrudedProps, product);
    const position = extruded[namedProps.position];
    applyTransformsToGeometry(solid, position);
    return solid;
}
function getExtrusionProps(extruded) {
    return {
        profile: extruded[namedProps.sweptArea],
        ifcClass: extruded[namedProps.sweptArea][namedProps.ifcClass],
        depth: extruded[namedProps.depth],
        direction: extruded[namedProps.extDirection][namedProps.dirRatios],
    };
}
const extrusionTypes = {
    [ifcTypes.IfcRectangleProfileDef]: mapRectangleProfileExtrusion,
    [ifcTypes.IfcCircleProfileDef]: mapCircleProfileExtrusion,
    [ifcTypes.IfcCircleHollowProfileDef]: mapCircleHollowProfileExtrusion,
    [ifcTypes.IfcArbitraryClosedProfileDef]: mapArbitraryProfileExtrusion,
    [ifcTypes.IfcArbitraryProfileDefWithVoids]: mapArbitraryProfileWithVoidsExtrusion,
};
function getExtrusionByType(extruded, product) {
    return extrusionTypes[extruded.ifcClass.toUpperCase()](extruded, product);
}

// @ts-expect-error ts-migrate(7023) FIXME: 'mapMappedRepresentation' implicitly has return ty... Remove this comment to see the full error message
function mapMappedRepresentation(shape, product) {
    const representation = shape[namedProps.items][0];
    const target = getMappingTarget(representation);
    // @ts-expect-error ts-migrate(7022) FIXME: 'mapped' implicitly has type 'any' because it does... Remove this comment to see the full error message
    const mapped = getMappingSource(product, representation);
    applyTransformsToGeometry(mapped, target);
    return mapped;
}
//The concept of mapped representation is that there are several instances
//of the same geometry. Storing the geometries allows to generate them
//only once and them simply create each instance copying the source geometry.
const mappingSources = {};
// @ts-expect-error ts-migrate(7023) FIXME: 'getMappingSource' implicitly has return type 'any... Remove this comment to see the full error message
function getMappingSource(product, representation) {
    const source = representation[namedProps.mappingSource];
    const origin = source[namedProps.mappingOrigin];
    // @ts-expect-error ts-migrate(7022) FIXME: 'geometry' implicitly has type 'any' because it do... Remove this comment to see the full error message
    const geometry = isGeometryGenerated(source)
        ? getGeneratedGeometry(source)
        : generateGeometry(source, product);
    applyTransformsToGeometry(geometry, origin);
    return geometry;
}
// @ts-expect-error ts-migrate(7023) FIXME: 'generateGeometry' implicitly has return type 'any... Remove this comment to see the full error message
function generateGeometry(source, product) {
    const mappedGeometry = source[namedProps.mappedRepresentation];
    // @ts-expect-error ts-migrate(7022) FIXME: 'geometry' implicitly has type 'any' because it do... Remove this comment to see the full error message
    const geometry = getMappedGeometry(mappedGeometry, product);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    mappingSources[source[namedProps.expressId]] = geometry;
    mainObject.remove(geometry);
    return geometry.clone();
}
function isGeometryGenerated(source) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return mappingSources[source[namedProps.expressId]] ? true : false;
}
function getGeneratedGeometry(source) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return mappingSources[source[namedProps.expressId]].clone();
}
//The mapping target defines the transformation of the mapped items
//Generally, in IFC the transformation is read from IfcAxis2Placement instances
//This is an exception: data needs to be structured like an IfcAxis2Placement
//to avoid poluting the transformation logic
function getMappingTarget(representation) {
    const target = representation[namedProps.mappingTarget];
    return {
        [namedProps.location]: { [namedProps.coordinates]: getTargetOrigin(target) },
        [namedProps.refDirection]: { [namedProps.dirRatios]: getAxis(target, namedProps.axis1, [1, 0, 0]) },
        [namedProps.axis]: { [namedProps.dirRatios]: getAxis(target, namedProps.axis3, [0, 0, 1]) },
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

//Credit to the following algorithm:
//https://stackoverflow.com/questions/50272399/three-js-2d-object-in-3d-space-by-vertices/50274103#50274103
function createFace(faceDefinition) {
    const coordinates = faceDefinition.outerBounds.bounds[0];
    let outerPoints = getPoints(coordinates);
    let { tempOuterPoints, quaternion } = getProjectedPointsAndQuaternion(outerPoints);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const outerShape = new THREE.Shape(tempOuterPoints);
    const allPoints = [...outerPoints];
    if (hasHoles(faceDefinition))
        punchHoles(faceDefinition, quaternion, allPoints, outerShape);
    return createGeometry(outerShape, allPoints);
}
function createGeometry(outerShape, allPoints) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const shapeGeom = new THREE.ShapeGeometry(outerShape, 24);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const mesh = new THREE.Mesh(shapeGeom);
    mesh.geometry.vertices = allPoints;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
    return mesh;
}
function getPoints(coordinates) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    return coordinates.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
}
function getTempPoints(points, quaternion) {
    return points.map((p) => p.clone().applyQuaternion(quaternion));
}
function hasHoles(faceDefinition) {
    return faceDefinition.innerBounds.bounds.length > 0;
}
function punchHoles(faceDefinition, quaternion, allPoints, outerShape) {
    faceDefinition.innerBounds.bounds.forEach((bound) => {
        const innerPoints = getPoints(bound);
        const tempInnerPoints = getTempPoints(innerPoints, quaternion);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
        const innerShape = new THREE.Path(tempInnerPoints);
        outerShape.holes.push(innerShape);
        allPoints.push(...innerPoints);
    });
}
//To implement this algorithm successfully (see link above)
// the selected triangle of vertices needs to fulfill the following points to work:
// 1. It must be a valid triangle (its vertices are not aligned)
// 2. Its area should be as big as possible to increment the precission of its normal vector
// 3. The generated 2d surface has its points defined clockwise
function getProjectedPointsAndQuaternion(points) {
    const triangles = getAllTriangles(points); //1
    sortTrianglesByArea(triangles); //2
    return getQuatAndPoints(triangles, points); //3
}
function getAllTriangles(points) {
    const triangles = [];
    let i = 1;
    while (i + 1 < points.length) {
        const { vector, triangle } = getTriangleVector(points, i);
        if (isVectorValid(vector))
            triangles.push({ area: triangle.getArea(), triangle });
        i++;
    }
    return triangles;
}
function getTriangleVector(points, i) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const triangle = new THREE.Triangle(points[i + 1], points[i], points[0]);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const vector = new THREE.Vector3();
    triangle.getNormal(vector);
    return { vector, triangle };
}
function sortTrianglesByArea(triangles) {
    triangles.sort((a, b) => (a.area > b.area ? 1 : b.area > a.area ? -1 : 0)).reverse();
}
function isVectorValid(vector) {
    return vector.x != 0 || vector.y != 0 || vector.z != 0;
}
function getQuatAndPoints(triangles, points) {
    const props = initializeProperties();
    while (props.isClockWise === false)
        selectAnotherTriangle(props, points, triangles);
    return { tempOuterPoints: props.tempOuterPoints, quaternion: props.quaternion };
}
function selectAnotherTriangle(props, points, triangles) {
    const tri = triangles[props.selectedTriangle];
    tri.triangle.getNormal(props.normal);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    props.quaternion = new THREE.Quaternion().setFromUnitVectors(props.normal, props.baseNormal);
    props.tempOuterPoints = getTempPoints(points, props.quaternion);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const projected = props.tempOuterPoints.map((point) => new THREE.Vector2(point.x, point.y));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    props.isClockWise = THREE.ShapeUtils.isClockWise(projected);
    props.selectedTriangle++;
}
function initializeProperties() {
    return {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
        baseNormal: new THREE.Vector3(0, 0, 1),
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
        normal: new THREE.Vector3(),
        selectedTriangle: 0,
        tempOuterPoints: [],
        quaternion: {},
        isClockWise: false
    };
}

function mapBrep(shape) {
    const representations = shape[namedProps.items];
    const definitions = [];
    representations.forEach((r) => definitions.push(...getGeometry(r[namedProps.outer][namedProps.cfsFaces])));
    return createAndJoinFaces(definitions);
}
function mapSurfaceModel(shape) {
    const faceSets = shape[namedProps.items][0][namedProps.fbsmFaces];
    const definitions = [];
    faceSets.forEach((faceSet) => definitions.push(...getGeometry(faceSet[namedProps.cfsFaces])));
    return createAndJoinFaces(definitions);
}
function createAndJoinFaces(definitions) {
    const faces = [];
    definitions.forEach((definition) => faces.push(createFace(definition)));
    return joinAllFaces(faces);
}
function joinAllFaces(faces) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const joined = new THREE.Geometry();
    faces.forEach((face) => joined.merge(face.geometry, face.matrix));
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const material = new THREE.MeshPhongMaterial({ side: 2 });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const mesh = new THREE.Mesh(joined, material);
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
    mesh[namedProps.isBrep] = true;
    return mesh;
}
function getGeometry(faceSet) {
    const faces = [];
    faceSet.forEach((face) => faces.push(getAllBounds(face)));
    return faces;
}
function getAllBounds(face) {
    const outerBoundsInfo = filterBounds(face, ifcTypes.IfcFaceOuterBound);
    const innerBoundsInfo = filterBounds(face, ifcTypes.IfcFaceBound);
    const outerBounds = getBounds(outerBoundsInfo);
    const innerBounds = innerBoundsInfo ? getBounds(innerBoundsInfo) : {};
    return { outerBounds, innerBounds };
}
function getBounds(ifcBounds) {
    const bounds = [];
    const orientation = [];
    ifcBounds.forEach((bound) => {
        bounds.push(getPoints$1(bound));
        orientation.push(bound[namedProps.orientation]);
    });
    return { orientation, bounds };
}
function getPoints$1(bound) {
    const points = bound[namedProps.bound][namedProps.polygon];
    const coordinates = [];
    points.forEach((point) => {
        const coord = point[namedProps.coordinates];
        if (coord)
            coordinates.push(coord);
    });
    return coordinates;
}
function filterBounds(face, type) {
    return face[namedProps.bounds].filter((e) => e[namedProps.ifcClass] === getName(type));
}

function mapGeometricSet(shape) {
    const curves = shape[namedProps.items][0][namedProps.elements];
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const result = new THREE.Object3D();
    result.children = [...curves.map((e) => mapCurve(e))];
    return result;
}

function createClippingBox(orientation) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const geometry = new THREE.BoxBufferGeometry(100000, 100000, 100000);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const mesh = new THREE.Mesh(geometry);
    const direction = orientation ? -1 : 1;
    mesh.position.z += 50000 * direction;
    mesh.updateMatrix();
    return mesh;
}

// ## License
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
        csg.polygons = this.polygons.map(function(p) {
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
    }

    // Return a new CSG solid with solid and empty space switched. This solid is
    // not modified.
    inverse() {
        var csg = this.clone();
        csg.polygons.map(function(p) {
            p.flip();
        });
        return csg;
    }
}

// Construct a CSG solid from a list of `Polygon` instances.
CSG.fromPolygons=function(polygons) {
    var csg = new CSG();
    csg.polygons = polygons;
    return csg;
};

// # class Vector

// Represents a 3D vector.
// 
// Example usage:
// 
//     new CSG.Vector(1, 2, 3);
//     new CSG.Vector([1, 2, 3]);
//     new CSG.Vector({ x: 1, y: 2, z: 3 });

class Vector extends THREE.Vector3 {
    constructor(x, y, z) {
        if (arguments.length == 3)
            super(x, y, z);
        else if (Array.isArray(x))
            super(x[0], x[1], x[2]);
        else if (typeof x == 'object')
            super().copy(x);
        else
            throw "Invalid constructor to vector"
    }

    clone() {
        return new Vector(this)
    }
    negated() {
        return this.clone().multiplyScalar(-1)
    }
    plus(a) {
        return this.clone().add(a);
    }
    minus(a) {
        return this.clone().sub(a)
    }
    times(a) {
        return this.clone().multiplyScalar(a)
    }
    dividedBy(a) {
        return this.clone().divideScalar(a)
    }
    lerp(a, t) {
        return this.plus(a.minus(this).times(t))
    }
    unit() {
        return this.dividedBy(this.length())
    }
    cross(a) {
        return THREE.Vector3.prototype.cross.call(this.clone(), a)
    }
}

// # class Vertex

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
        return new Vertex(this.pos.clone(),this.normal.clone(),this.uv.clone());
    }

    // Invert all orientation-specific data (e.g. vertex normal). Called when the
    // orientation of a polygon is flipped.
    flip() {
        this.normal = this.normal.negated();
    }

    // Create a new vertex between this vertex and `other` by linearly
    // interpolating all properties using a parameter of `t`. Subclasses should
    // override this to interpolate additional properties.
    interpolate(other, t) {
        return new Vertex(this.pos.lerp(other.pos, t),this.normal.lerp(other.normal, t),this.uv.lerp(other.uv, t))
    }
}
// # class Plane

// Represents a plane in 3D space.

class Plane {
    constructor(normal, w) {
        this.normal = normal;
        this.w = w;
    }

    clone() {
        return new Plane(this.normal.clone(),this.w);
    }

    flip() {
        this.normal = this.normal.negated();
        this.w = -this.w;
    }

    // Split `polygon` by this plane if needed, then put the polygon or polygon
    // fragments in the appropriate lists. Coplanar polygons go into either
    // `coplanarFront` or `coplanarBack` depending on their orientation with
    // respect to this plane. Polygons in front or in back of this plane go into
    // either `front` or `back`.
    splitPolygon(polygon, coplanarFront, coplanarBack, front, back) {
        var COPLANAR = 0;
        var FRONT = 1;
        var BACK = 2;
        var SPANNING = 3;

        // Classify each point as well as the entire polygon into one of the above
        // four classes.
        var polygonType = 0;
        var types = [];
        for (var i = 0; i < polygon.vertices.length; i++) {
            var t = this.normal.dot(polygon.vertices[i].pos) - this.w;
            var type = (t < -Plane.EPSILON) ? BACK : (t > Plane.EPSILON) ? FRONT : COPLANAR;
            polygonType |= type;
            types.push(type);
        }

        // Put the polygon in the correct list, splitting it when necessary.
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
            var f = []
              , b = [];
            for (var i = 0; i < polygon.vertices.length; i++) {
                var j = (i + 1) % polygon.vertices.length;
                var ti = types[i]
                  , tj = types[j];
                var vi = polygon.vertices[i]
                  , vj = polygon.vertices[j];
                if (ti != BACK)
                    f.push(vi);
                if (ti != FRONT)
                    b.push(ti != BACK ? vi.clone() : vi);
                if ((ti | tj) == SPANNING) {
                    var t = (this.w - this.normal.dot(vi.pos)) / this.normal.dot(vj.pos.minus(vi.pos));
                    var v = vi.interpolate(vj, t);
                    f.push(v);
                    b.push(v.clone());
                }
            }
            if (f.length >= 3)
                front.push(new Polygon(f,polygon.shared));
            if (b.length >= 3)
                back.push(new Polygon(b,polygon.shared));
            break;
        }
    }

}

// `Plane.EPSILON` is the tolerance used by `splitPolygon()` to decide if a
// point is on the plane.
Plane.EPSILON = 1e-5;

Plane.fromPoints = function(a, b, c) {
    var n = b.minus(a).cross(c.minus(a)).unit();
    return new Plane(n,n.dot(a));
};


// # class Polygon

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
        var vertices = this.vertices.map(function(v) {
            return v.clone();
        });
        return new Polygon(vertices,this.shared);
    }
    flip() {
        this.vertices.reverse().map(function(v) {
            v.flip();
        });
        this.plane.flip();
    }
}

// # class Node

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
        if (polygons)
            this.build(polygons);
    }
    clone() {
        var node = new Node();
        node.plane = this.plane && this.plane.clone();
        node.front = this.front && this.front.clone();
        node.back = this.back && this.back.clone();
        node.polygons = this.polygons.map(function(p) {
            return p.clone();
        });
        return node;
    }

    // Convert solid space to empty space and empty space to solid space.
    invert() {
        for (var i = 0; i < this.polygons.length; i++)
            this.polygons[i].flip();
        
        this.plane.flip();
        if (this.front)
            this.front.invert();
        if (this.back)
            this.back.invert();
        var temp = this.front;
        this.front = this.back;
        this.back = temp;
    }

    // Recursively remove all polygons in `polygons` that are inside this BSP
    // tree.
    clipPolygons(polygons) {
        if (!this.plane)
            return polygons.slice();
        var front = []
          , back = [];
        for (var i = 0; i < polygons.length; i++) {
            this.plane.splitPolygon(polygons[i], front, back, front, back);
        }
        if (this.front)
            front = this.front.clipPolygons(front);
        if (this.back)
            back = this.back.clipPolygons(back);
        else
            back = [];
        return front.concat(back);
    }

    // Remove all polygons in this BSP tree that are inside the other BSP tree
    // `bsp`.
    clipTo(bsp) {
        this.polygons = bsp.clipPolygons(this.polygons);
        if (this.front)
            this.front.clipTo(bsp);
        if (this.back)
            this.back.clipTo(bsp);
    }

    // Return a list of all polygons in this BSP tree.
    allPolygons() {
        var polygons = this.polygons.slice();
        if (this.front)
            polygons = polygons.concat(this.front.allPolygons());
        if (this.back)
            polygons = polygons.concat(this.back.allPolygons());
        return polygons;
    }

    // Build a BSP tree out of `polygons`. When called on an existing tree, the
    // new polygons are filtered down to the bottom of the tree and become new
    // nodes there. Each set of polygons is partitioned using the first polygon
    // (no heuristic is used to pick a good split).
    build(polygons) {
        if (!polygons.length)
            return;
        if (!this.plane)
            this.plane = polygons[0].plane.clone();
        var front = []
          , back = [];
        for (var i = 0; i < polygons.length; i++) {
            this.plane.splitPolygon(polygons[i], this.polygons, this.polygons, front, back);
        }
        if (front.length) {
            if (!this.front)
                this.front = new Node();
            this.front.build(front);
        }
        if (back.length) {
            if (!this.back)
                this.back = new Node();
            this.back.build(back);
        }
    }
}

CSG.fromGeometry=function(geom){
    if(geom.isBufferGeometry)
        geom = new THREE.Geometry().fromBufferGeometry(geom);
    var fs = geom.faces;
    var vs = geom.vertices;
    var polys=[];
    var fm=['a','b','c'];
    for(var i=0;i<fs.length;i++){
        var f = fs[i];
        var vertices=[];
        for(var j=0;j<3;j++) vertices.push(new Vertex(vs[f[fm[j]]],f.vertexNormals[j],geom.faceVertexUvs[0][i][j]));
        polys.push(new Polygon(vertices));
    }
    return CSG.fromPolygons(polys)
};
CSG._tmpm3 = new THREE.Matrix3();
CSG.fromMesh=function(mesh){

    var csg = CSG.fromGeometry(mesh.geometry);
    CSG._tmpm3.getNormalMatrix(mesh.matrix);
    for(var i=0;i<csg.polygons.length;i++){
        var p = csg.polygons[i];
        for(var j=0;j<p.vertices.length;j++){
            var v=p.vertices[j];
            v.pos.applyMatrix4(mesh.matrix);
            v.normal.applyMatrix3(CSG._tmpm3);
        }
    }
    return csg;
};

CSG.toMesh=function(csg,toMatrix){
    var geom = new THREE.Geometry();
    var ps = csg.polygons;
    var vs = geom.vertices;
    var fvuv = geom.faceVertexUvs[0];
    for(var i=0;i<ps.length;i++){
        var p = ps[i];
        var pvs=p.vertices;
        var v0=vs.length;
        var pvlen=pvs.length;
        
        for(var j=0;j<pvlen;j++)
            vs.push(new THREE.Vector3().copy(pvs[j].pos));


        for(var j=3;j<=pvlen;j++){
            var fc = new THREE.Face3();
            var fuv = [];
            fvuv.push(fuv);
            var fnml = fc.vertexNormals;
            fc.a=v0;
            fc.b=v0+j-2;
            fc.c=v0+j-1;

            fnml.push(new THREE.Vector3().copy(pvs[0].normal));
            fnml.push(new THREE.Vector3().copy(pvs[j-2].normal));
            fnml.push(new THREE.Vector3().copy(pvs[j-1].normal));
            fuv.push(new THREE.Vector3().copy(pvs[0].uv));
            fuv.push(new THREE.Vector3().copy(pvs[j-2].uv));
            fuv.push(new THREE.Vector3().copy(pvs[j-1].uv));

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
    m.matrix.decompose(m.position,m.rotation,m.scale);
    m.updateMatrixWorld();
    return m
};


CSG.ieval=function(tokens,index=0){
    if(typeof tokens === 'string')
        CSG.currentOp=tokens;
    else if(tokens instanceof Array){
        for(let i=0;i<tokens.length;i++)CSG.ieval(tokens[i],0);
    }else if(typeof tokens==='object'){
        var op=CSG.currentOp;
        tokens.updateMatrix();
        tokens.updateMatrixWorld();
        if(!CSG.sourceMesh)
            CSG.currentPrim =  CSG.fromMesh(CSG.sourceMesh = tokens);
        else {
            CSG.nextPrim = CSG.fromMesh(tokens);
            CSG.currentPrim = CSG.currentPrim[op](CSG.nextPrim);
        }
        if(CSG.doRemove)tokens.parent.remove(tokens);
    }//union,subtract,intersect,inverse
};

CSG.eval=function(tokens,doRemove){//[['add',mesh,mesh,mesh,mesh],['sub',mesh,mesh,mesh,mesh]]
    CSG.currentOp=null;
    CSG.sourceMesh=null;
    CSG.doRemove=doRemove;
    CSG.ieval(tokens);
    var result = CSG.toMesh( CSG.currentPrim, CSG.sourceMesh.matrix );
    result.material = CSG.sourceMesh.material;
    result.castShadow  = result.receiveShadow = true;
    return result;
};
// Return a new CSG solid representing space in either this solid or in the
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

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '../.... Remove this comment to see the full error message
function applyBoolDifferences(baseMesh, clipMeshes) {
    preventCoplanarSurfaces(baseMesh);
    let operand1 = CSG.fromMesh(baseMesh);
    for (let i = 0; i < clipMeshes.length; i++) {
        const clipMesh = clipMeshes[i];
        clipMesh.updateMatrix();
        const operand2 = CSG.fromMesh(clipMesh);
        operand1 = subtractVolume(operand1, operand2, baseMesh, clipMesh);
    }
    return operand1;
}
//Ugly, but avoids crashes of CSG operations due to face superpositions
function preventCoplanarSurfaces(baseMesh) {
    const factor = 0.99999;
    baseMesh.scale.x *= factor;
    baseMesh.scale.y *= factor;
    baseMesh.scale.z *= factor;
    baseMesh.updateMatrix();
}
//Sometimes (uncommon) the CSG library fails and swaps the functionality of subtract and intersects
//This rectifies the result if it is an intersection instead of a subtraction
function subtractVolume(operand1, operand2, baseMesh, clippingMesh) {
    const result = operand1.subtract(operand2);
    const resultMesh = CSG.toMesh(result, baseMesh.matrix);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const boundingBox1 = new THREE.Box3().setFromObject(resultMesh);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const boundingBox2 = new THREE.Box3().setFromObject(clippingMesh);
    if (areBoundingBoxesEqual(boundingBox1, boundingBox2))
        return operand1.intersect(operand2);
    return result;
}
function areBoundingBoxesEqual(boundingBox1, boundingBox2) {
    return (isPointEqual(boundingBox1.max, boundingBox2.max, 2) &&
        isPointEqual(boundingBox1.min, boundingBox2.min, 2));
}
function isPointEqual(point1, point2, precission) {
    return (point1.x.toFixed(precission) == point2.x.toFixed(precission) &&
        point1.y.toFixed(precission) == point2.y.toFixed(precission) &&
        point1.z.toFixed(precission) == point2.z.toFixed(precission));
}

// @ts-expect-error ts-migrate(7023) FIXME: 'mapClipping' implicitly has return type 'any' bec... Remove this comment to see the full error message
function mapClipping(shape, product) {
    const { clippingReps, bodyRep } = getClippingRepresentations(shape);
    // @ts-expect-error ts-migrate(7022) FIXME: 'mainGeometry' implicitly has type 'any' because i... Remove this comment to see the full error message
    const mainGeometry = getMappedGeometry(bodyRep, product);
    const clippingGeometries = createClippingVolumes(clippingReps);
    const booleanResult = applyBoolDifferences(mainGeometry, clippingGeometries);
    return generateResultMesh(booleanResult, mainGeometry, clippingGeometries);
}
function generateResultMesh(booleanResult, mainGeometry, clippingGeometries) {
    const result = CSG.toMesh(booleanResult, mainGeometry.matrix);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    result.material = new THREE.MeshPhongMaterial();
    mainObject.remove(mainGeometry);
    clippingGeometries.forEach((clippingGeo) => mainObject.remove(clippingGeo));
    return result;
}
function getClippingRepresentations(shape) {
    const clippingReps = [];
    let bodyRep = shape[namedProps.items][0];
    while (bodyRep[namedProps.ifcClass] == 'IfcBooleanClippingResult') {
        clippingReps.push(bodyRep[namedProps.secondOperand]);
        bodyRep = bodyRep[namedProps.firstOperand];
    }
    return { clippingReps, bodyRep };
}
function createClippingVolumes(clippingRepresentations) {
    const clippingGeometries = [];
    clippingRepresentations.forEach((clippingRep) => clippingGeometries.push(createClippingVolume(clippingRep)));
    return clippingGeometries;
}
function createClippingVolume(clippingRep) {
    if (clippingRep[namedProps.ifcClass].toUpperCase() === ifcTypes.IfcHalfSpaceSolid)
        return mapIfcHalfSpaceSolid(clippingRep);
    return mapIfcPolygonalBoundedHalfSpace(clippingRep);
}
function mapIfcHalfSpaceSolid(clippingRep) {
    let orientation = clippingRep[namedProps.agreementFlag];
    if (typeof orientation != 'boolean')
        orientation = orientation.value;
    const clippingGeom = createClippingBox(orientation);
    const position = clippingRep[namedProps.baseSurface][namedProps.position];
    applyTransformsToGeometry(clippingGeom, position);
    return clippingGeom;
}
function mapIfcPolygonalBoundedHalfSpace(clippingRep) {
    const clippingGeom = mapIfcHalfSpaceSolid(clippingRep);
    const boundingGeom = getBoundingGeometry(clippingRep);
    const result = applyBoundingToGeometry(clippingGeom, boundingGeom);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    result.material = new THREE.MeshPhongMaterial();
    mainObject.remove(clippingGeom);
    mainObject.remove(boundingGeom);
    result.add(clippingGeom);
    return result;
}
function applyBoundingToGeometry(clippingGeom, boundingGeom) {
    let bspA = CSG.fromMesh(clippingGeom);
    let bspB = CSG.fromMesh(boundingGeom);
    let geomResult = bspA.intersect(bspB);
    return CSG.toMesh(geomResult, clippingGeom.matrix);
}
function getBoundingGeometry(clippingRep) {
    const points = getBoundingPoints(clippingRep);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
    const boundingGeom = createExtrusionsByPoints(points, 1000000);
    const boundPosition = clippingRep[namedProps.position];
    applyTransformsToGeometry(boundingGeom, boundPosition);
    boundingGeom.position.z -= 500000;
    boundingGeom.updateMatrix();
    return boundingGeom;
}
function getBoundingPoints(clippingRep) {
    return clippingRep[namedProps.polygonalBoundary][namedProps.points].map((point) => {
        const coords = point[namedProps.coordinates];
        return [-coords[0], -coords[1]];
    });
}

function mapBoundingBox(shape) {
    const representation = shape[namedProps.items][0];
    const dims = getBoundingBoxDimensions(representation);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const boundingBox = new THREE.BoxGeometry(dims.x, dims.y, dims.z);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const mesh = new THREE.Mesh(boundingBox);
    setBoundingBoxPosition(mesh, representation, dims);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    return new THREE.Object3D();
}
function setBoundingBoxPosition(mesh, representation, dims) {
    const bottomLeftCorner = representation[namedProps.corner][namedProps.coordinates];
    mesh.position.set(bottomLeftCorner[0], bottomLeftCorner[1], bottomLeftCorner[2]);
    mesh.position.x += dims.x / 2;
    mesh.position.y += dims.y / 2;
    mesh.position.z += dims.z / 2;
}
function getBoundingBoxDimensions(representation) {
    return {
        x: representation[namedProps.xDim],
        y: representation[namedProps.yDim],
        z: representation[namedProps.zDim]
    };
}

function mapAnnotation(shape) {
    //TODO
    console.log("TODO:", shape);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    return new THREE.Object3D();
}

function constructGeometries(structured) {
    structured[structuredData.products].forEach((product) => constructGeometry(product));
    structured[structuredData.spaces].forEach((space) => constructGeometry(space));
}
function constructGeometry(item) {
    try {
        getRepresentations(item);
        mapRepresentations(item);
    }
    catch (e) {
        console.warn(e);
    }
}
function getRepresentations(product) {
    getRepresentationValue(product);
    getRepresentationOfItem(product[namedProps.hasOpenings]);
    getRepresentationOfItem(product[namedProps.hasSpatial]);
}
function getRepresentationOfItem(items) {
    if (items)
        items.forEach((item) => getRepresentationValue(item));
}
function getRepresentationValue(product) {
    try {
        const representations = product[namedProps.representation][namedProps.representations];
        product[namedProps.geomRepresentations] = representations ? representations : [];
    }
    catch (e) {
        console.warn(e);
    }
}
function mapRepresentations(product) {
    mapProductRepresentations(product);
    mapRepresentationsOfItems(product[namedProps.hasOpenings]);
    mapRepresentationsOfItems(product[namedProps.hasSpatial]);
}
function mapRepresentationsOfItems(items) {
    if (items)
        items.forEach((item) => mapProductRepresentations(item));
}
function mapProductRepresentations(product) {
    product[namedProps.geometry] = [];
    product[namedProps.geomRepresentations].forEach((representation) => {
        const generatedGeometry = getMappedGeometry(representation, product);
        generatedGeometry._Data = product;
        product[namedProps.geometry].push(generatedGeometry);
    });
}
// @ts-expect-error ts-migrate(7022) FIXME: 'geometryMap' implicitly has type 'any' because it... Remove this comment to see the full error message
const geometryMap = {
    [geometryTypes.curve2D]: mapCurve2D,
    [geometryTypes.sweptSolid]: mapSweptSolid,
    [geometryTypes.mappedRepresentation]: mapMappedRepresentation,
    [geometryTypes.brep]: mapBrep,
    [geometryTypes.geometricSet]: mapGeometricSet,
    [geometryTypes.clipping]: mapClipping,
    [geometryTypes.extrudedAreaSolid]: mapExtrudedAreaSolid,
    [geometryTypes.surfaceModel]: mapSurfaceModel,
    [geometryTypes.boundingBox]: mapBoundingBox,
    [geometryTypes.annotation2D]: mapAnnotation
};
// @ts-expect-error ts-migrate(7023) FIXME: 'getMappedGeometry' implicitly has return type 'an... Remove this comment to see the full error message
function getMappedGeometry(representation, product) {
    const type = getType(representation);
    try {
        return geometryMap[type](representation, product);
    }
    catch (e) {
        console.warn(`Error with item ${product[namedProps.ifcClass]} of type ${type}: ${e}`);
    }
}
function getType(representation) {
    const type = representation[namedProps.representationType];
    return type ? type : representation[namedProps.ifcClass];
}

function subtractOpenings(structured) {
    structured[structuredData.products].forEach((product) => {
        try {
            if (product[namedProps.hasOpenings])
                applyBooleanOperation(product);
        }
        catch (e) {
            console.warn('Error with CSG operations with: ', product, e);
        }
    });
}
function applyBooleanOperation(product) {
    for (let i = 0; i < product[namedProps.geometry].length; i++) {
        const geometryItem = product[namedProps.geometry][i];
        if (geometryItem.type === 'Mesh' && !geometryItem[namedProps.isBrep])
            product[namedProps.geometry][i] = applyBooleanOperationOnMesh(product, geometryItem);
    }
}
function applyBooleanOperationOnMesh(product, geometry) {
    const openings = getOpenings(product);
    const resultGeom = applyBoolDifferences(geometry, openings);
    const result = CSG.toMesh(resultGeom, geometry.matrix);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    result.material = new THREE.MeshPhongMaterial();
    addResultToScene(geometry, openings, result);
    return result;
}
function addResultToScene(geometryItem, openings, result) {
    result._Data = geometryItem._Data; //Reference to parsed IFC information
    result.attach(...openings);
    result.attach(...geometryItem.children);
    mainObject.add(result);
    mainObject.remove(geometryItem);
}
function getOpenings(product) {
    const openingsReps = product[namedProps.hasOpenings];
    const openings = [];
    for (let i = 0; i < openingsReps.length; i++)
        openings.push(openingsReps[i][namedProps.geometry][0]);
    return openings;
}

function getMaterial(ifcType) {
    try {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return materialsMap[ifcTypes[ifcType]].material;
    }
    catch (e) {
        console.warn(`The type ${ifcType} doesn't have a material implemented.`);
    }
}
function getLineColor(ifcType) {
    try {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return materialsMap[ifcTypes[ifcType]].lineColor;
    }
    catch (_a) {
        return materialsMap[ifcTypes.IfcWall];
    }
}
function getDiffuseMat(color) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    return new THREE.MeshLambertMaterial({
        ...getBaseSettings(color)
    });
}
function getTransparentMat(color, opacity = 0.2) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    return new THREE.MeshBasicMaterial({
        ...getBaseSettings(color),
        opacity: opacity,
        transparent: true,
        depthWrite: false
    });
}
function getBaseSettings(color) {
    return {
        color: color,
        side: 2,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
    };
}
const colors = {
    black: 0x000000,
    brown: 0xc2893a,
    red: 0xff0000,
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
    [ifcTypes.IfcSite]: {
        material: getDiffuseMat(colors.white),
        lineColor: colors.grey
    },
    [ifcTypes.IfcSlab]: {
        material: getDiffuseMat(colors.white),
        lineColor: colors.grey
    },
    [ifcTypes.IfcCovering]: {
        material: getDiffuseMat(colors.white),
        lineColor: colors.grey
    },
    [ifcTypes.IfcRoof]: {
        material: getDiffuseMat(colors.white),
        lineColor: colors.grey
    },
    [ifcTypes.IfcEquipmentElement]: {
        material: getDiffuseMat(colors.white),
        lineColor: colors.grey
    },
    [ifcTypes.IfcFurnishingElement]: {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
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
    [ifcTypes.IfcColumn]: {
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
    [ifcTypes.IfcFlowTerminal]: {
        material: getDiffuseMat(colors.white),
        lineColor: colors.grey
    },
    [ifcTypes.IfcWindow]: {
        material: getTransparentMat(colors.lightBlue, 0.2),
        lineColor: colors.darkBlue
    },
    [ifcTypes.IfcSpace]: {
        material: getTransparentMat(colors.lightBlue, 0),
        lineColor: colors.black
    },
    [ifcTypes.IfcOpeningElement]: {
        material: getTransparentMat(colors.lightBlue, 0),
        lineColor: colors.black
    },
    [ifcTypes.IfcBuildingElementProxy]: {
        material: getDiffuseMat(colors.white),
        lineColor: colors.darkBrown
    },
};

function applyMaterials(structured) {
    applyMaterialOnSpaces(structured);
    structured[structuredData.products].forEach((product) => {
        applyMaterialOnMesh(product);
        applyMaterialOnOpenings(product);
        applyMaterialOnSubElements(product);
    });
}
function applyMaterialOnSpaces(structured) {
    structured[structuredData.spaces].forEach((space) => space[namedProps.geometry].forEach((item) => getMeshMaterial(item, space[namedProps.ifcClass])));
}
function applyMaterialOnMesh(product) {
    product[namedProps.geometry].forEach((item) => {
        getMeshMaterial(item, product[namedProps.ifcClass]);
    });
}
function applyMaterialOnOpenings(product) {
    applyMaterialOnItem(product[namedProps.hasOpenings]);
}
function applyMaterialOnSubElements(product) {
    applyMaterialOnItem(product[namedProps.hasSpatial]);
}
function getMeshMaterial(item, ifcType) {
    if (item.type === 'Mesh')
        item.material = getMaterial(ifcType);
    if (item.material && item.material.transparent === true)
        item.renderOrder = 1;
}
function applyMaterialOnItem(items) {
    if (items)
        items.forEach((prop) => {
            const mesh = prop[namedProps.geometry][0];
            mesh.material = getMaterial(prop[namedProps.ifcClass]);
        });
}

function drawEdges(structured) {
    structured[structuredData.products].forEach((product) => {
        generateEdgesOnProduct(product);
        generateEdgesOnItems(product[namedProps.hasSpatial]);
        generateEdgesOnItems(product[namedProps.hasOpenings]);
    });
}
function generateEdgesOnProduct(product) {
    product[namedProps.geometry].forEach((item) => {
        const ifcClass = product[namedProps.ifcClass];
        if (item.type === 'Mesh' && ifcClass)
            createEdgesOfItem(ifcClass, item);
    });
}
function generateEdgesOnItems(items) {
    if (items)
        items.forEach((item) => item[namedProps.geometry].forEach((geometry) => createEdgesOfItem(item[namedProps.ifcClass], geometry)));
}
function createEdgesOfItem(ifcClass, item) {
    const lineColor = getLineColor(ifcClass);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const geometry = new THREE.EdgesGeometry(item.geometry);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const material = new THREE.LineBasicMaterial({ color: lineColor });
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const wireframe = new THREE.LineSegments(geometry, material);
    item.add(wireframe);
}

function applyScale(structured) {
    const units = structured[structuredData.units][namedProps.units];
    const scale = getUnitScale(units);
    if (scale === 1)
        return;
    applyScaleOnItems(scale, structured);
}
function applyScaleOnItems(scale, structured) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const axis = new THREE.Object3D();
    mainObject.add(axis);
    const geometries = getALlGeometries(structured);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'geometry' implicitly has an 'any' type.
    geometries.forEach((geometry) => {
        axis.attach(geometry);
        axis.scale.set(scale, scale, scale);
        mainObject.attach(geometry);
        axis.scale.set(1, 1, 1);
    });
}
function getALlGeometries(structured) {
    const allGeometry = [];
    structured[structuredData.products].forEach((product) => getGeometry$1(product, allGeometry));
    return allGeometry;
}
function getGeometry$1(product, allGeometry) {
    allGeometry.push(...product[namedProps.geometry]);
    if (product[namedProps.hasSpatial])
        product[namedProps.hasSpatial].forEach((spatial) => getGeometry$1(spatial, allGeometry));
}
function getUnitScale(units) {
    const lengthUnit = units.filter((unitType) => {
        return unitType[namedProps.unitType] === 'LENGTHUNIT';
    })[0];
    const prefix = lengthUnit[namedProps.prefix];
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return unitMap[prefix];
}
const unitMap = {
    EXA: 100000000,
    PETA: 10000000,
    TERA: 1000000,
    GIGA: 100000,
    MEGA: 10000,
    KILO: 1000,
    HECTO: 100,
    DECA: 10,
    $: 1,
    DECI: 0.1,
    CENTI: 0.01,
    MILLI: 0.001,
    MICRO: 0.0001,
    NANO: 0.00001,
    PICO: 0.000001,
    FEMTO: 0.0000001,
    ATTO: 0.00000001
};

function buildGeometry(structured) {
    console.log(structured);
    constructGeometries(structured);
    applyTransformations(structured);
    drawEdges(structured);
    subtractOpenings(structured);
    applyMaterials(structured);
    applyScale(structured);
    return structured;
}

function loadIfc(ifcData) {
    const loaded = loadIfcFileItems(ifcData);
    const structured = constructProject(loaded);
    return buildGeometry(structured);
}

export { loadIfc };
//# sourceMappingURL=IFC.module.js.map
