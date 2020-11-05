const ifcTypes = {
  //Spatial structure elements
  IfcProject: "IFCPROJECT",
  IfcSite: "IFCSITE",
  IfcBuildingStorey: "IFCBUILDINGSTOREY",
  IfcBuilding: "IFCBUILDING",
  IfcSpace: "IFCSPACE",
  //Properties
  IfcSpaceType: "IFCSPACETYPE",
  IfcPropertySingleValue: "IFCPROPERTYSINGLEVALUE",
  IfcPropertySet: "IFCPROPERTYSET",
  //Geometry
  IfcDirection: "IFCDIRECTION",
  IfcCartesianPoint: "IFCCARTESIANPOINT",
  IfcAxis2Placement3D: "IFCAXIS2PLACEMENT3D",
  IfcAxis2Placement2D: "IFCAXIS2PLACEMENT2D",
  IfcPolyline: "IFCPOLYLINE",
  IfcRectangleProfileDef: "IFCRECTANGLEPROFILEDEF",
  IfcExtrudedAreaSolid: "IFCEXTRUDEDAREASOLID",
  IfcShapeRepresentation: "IFCSHAPEREPRESENTATION",
  IfcProductDefinitionShape: "IFCPRODUCTDEFINITIONSHAPE",
  IfcCurveBoundedPlane: "IFCCURVEBOUNDEDPLANE",
  IfcConnectionSurfaceGeometry: "IFCCONNECTIONSURFACEGEOMETRY",
  IfcPolygonalBoundedHalfSpace: "IFCPOLYGONALBOUNDEDHALFSPACE",
  IfcPlane: "IFCPLANE",
  IfcBooleanClippingResult: "IFCBOOLEANCLIPPINGRESULT",
  //Units
  IfcUnitAssignment: "IFCUNITASSIGNMENT",
  IfcSIUnit: "IFCSIUNIT",
  IfcDerivedUnitElement: "IFCDERIVEDUNITELEMENT",
  IfcDerivedUnit: "IFCDERIVEDUNIT",
  IfcMeasureWithUnit: "IFCMEASUREWITHUNIT",
  IfcDimensionalExponents: "IFCDIMENSIONALEXPONENTS",
  IfcConversionBasedUnit: "IFCCONVERSIONBASEDUNIT",
  //Contexts
  IfcGeometricRepresentationContext: "IFCGEOMETRICREPRESENTATIONCONTEXT",
  IfcGeometricRepresentationSubContext: "IFCGEOMETRICREPRESENTATIONSUBCONTEXT",
  IfcLocalPlacement: "IFCLOCALPLACEMENT",
  IfcGridPlacement: "IFCGRIDPLACEMENT",
  IfcLinearPlacement: "IFCLINEARPLACEMENT",
  //Identities
  IfcApplication: "IFCAPPLICATION",
  IfcOrganization: "IFCORGANIZATION",
  IfcOwnerHistory: "IFCOWNERHISTORY",
  IfcPerson: "IFCPERSON",
  IfcPersonAndOrganization: "IFCPERSONANDORGANIZATION",
  IfcPostalAddress: "IFCPOSTALADDRESS",
  // Relationships
  IfcRelAggregates: "IFCRELAGGREGATES",
  IfcRelContainedInSpatialStructure: "IFCRELCONTAINEDINSPATIALSTRUCTURE",
  IfcRelDefinesByProperties: "IFCRELDEFINESBYPROPERTIES",
  //Presentation
  IfcColourRgb: "IFCCOLOURRGB",
  IfcSurfaceStyleRendering: "IFCSURFACESTYLERENDERING",
  //Building elements
  IfcWallStandardCase: "IFCWALLSTANDARDCASE",
  // IfcWall: "IFCWALL",
  // IfcDoor: "IFCDOOR",
  // IfcSlab: "IFCSLAB",
};

function getName(ifcType) {
  return Object.keys(ifcTypes).find((key) => ifcTypes[key] === ifcType);
}

export { ifcTypes, getName };
