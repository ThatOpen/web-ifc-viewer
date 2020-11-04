import { ifcTypes as t } from "../utils/ifc-types.js";

function parserByType(ifcType) {
  const typesParserMap = {
    //Spatial structure elements
    [t.IfcProject]: "IfcProject_Parser",
    [t.IfcSite]: "IfcSite_Parser",
    [t.IfcBuilding]: "IfcBuilding_Parser",
    [t.IfcBuildingStorey]: "IfcBuildingStorey_Parser",
    [t.IfcSpace]: "IfcSpace_Parser",
    //Geometry
    [t.IfcDirection]: "IfcDirection_Parser",
    [t.IfcCartesianPoint]: "IfcCartesianPoint_Parser",
    [t.IfcAxis2Placement3D]: "IfcAxis2Placement3D_Parser",
    [t.IfcAxis2Placement2D]: "IfcAxis2Placement2D_Parser",
    [t.IfcPolyline]: "IfcPolyline_Parser",
    //Units
    [t.IfcUnitAssignment]: "IfcUnitAssignment_Parser",
    [t.IfcSIUnit]: "IfcSIUnit_Parser",
    [t.IfcDerivedUnit]: "IfcDerivedUnit_Parser",
    [t.IfcDerivedUnitElement]: "IfcDerivedUnitElement_Parser",
    [t.IfcMeasureWithUnit]: "IfcMeasureWithUnit_Parser",
    [t.IfcDimensionalExponents]: "IfcDimensionalExponents_Parser",
    [t.IfcConversionBasedUnit]: "IfcConversionBasedUnit_Parser",
    //Contexts
    [t.IfcLinearPlacement]: "IfcLinearPlacement_Parser",
    [t.IfcGridPlacement]: "IfcGridPlacement_Parser",
    [t.IfcLocalPlacement]: "IfcLocalPlacement_Parser",
    [t.IfcGeometricRepresentationContext]:
      "IfcGeometricRepresentationContext_Parser",
    [t.IfcGeometricRepresentationSubContext]:
      "IfcGeometricRepresentationSubContext_Parser",
    //Identities
    [t.IfcOrganization]: "IfcOrganization_Parser",
    [t.IfcApplication]: "IfcApplication_Parser",
    [t.IfcOwnerHistory]: "IfcOwnerHistory_Parser",
    [t.IfcPerson]: "IfcPerson_Parser",
    [t.IfcPersonAndOrganization]: "IfcPersonAndOrganization_Parser",
    [t.IfcPostalAddress]: "IfcPostalAddress_Parser",
    //Relationships
    [t.IfcRelAggregates]: "IfcRelAggregates_Parser",
    [t.IfcRelContainedInSpatialStructure]:
      "IfcRelContainedInSpatialStructure_Parser",
  };
  return typesParserMap[ifcType];
}

export { parserByType };
