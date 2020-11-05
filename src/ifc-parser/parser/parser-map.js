import { IfcApplication } from "../ifc-models/identities/IfcApplication.js";
import { IfcOrganization } from "../ifc-models/identities/IfcOrganization.js";
import { IfcOwnerHistory } from "../ifc-models/identities/IfcOwnerHistory.js";
import { IfcPerson } from "../ifc-models/identities/IfcPerson.js";
import { IfcPersonAndOrganization } from "../ifc-models/identities/IfcPersonAndOrganization.js";
import { IfcPostalAddress } from "../ifc-models/identities/IfcPostalAddress.js";
import { IfcRelAggregates } from "../ifc-models/relationship/IfcRelAggregates.js";
import { IfcRelContainedInSpatialStructure } from "../ifc-models/relationship/IfcRelContainedInSpatialStructure.js";
import { IfcBuilding } from "../ifc-models/spatial-structure/IfcBuilding.js";
import { IfcBuildingStorey } from "../ifc-models/spatial-structure/IfcBuildingStorey.js";
import { IfcProject } from "../ifc-models/spatial-structure/IfcProject.js";
import { IfcSite } from "../ifc-models/spatial-structure/IfcSite.js";
import { IfcSpace } from "../ifc-models/spatial-structure/IfcSpace.js";
import { IfcDerivedUnit } from "../ifc-models/units/IfcDerivedUnit.js";
import { IfcDerivedUnitElement } from "../ifc-models/units/IfcDerivedUnitElement.js";
import { IfcMeasureWithUnit } from "../ifc-models/units/IfcMeasureWithUnit.js";
import { IfcSIUnit } from "../ifc-models/units/IfcSIUnit.js";
import { IfcUnitAssignment } from "../ifc-models/units/IfcUnitAssignment.js";
import { IfcDimensionalExponents } from "../ifc-models/units/IfcDimensionalExponents.js";
import { IfcConversionBasedUnit } from "../ifc-models/units/IfcConversionBasedUnit.js";
import { ifcTypes as t } from "../utils/ifc-types.js";
import { IfcDirection } from "../ifc-models/geometry/IfcDirection.js";
import { IfcCartesianPoint } from "../ifc-models/geometry/IfcCartesianPoint.js";
import { IfcAxis2Placement3D } from "../ifc-models/geometry/IfcAxis2Placement3D.js";
import { IfcAxis2Placement2D } from "../ifc-models/geometry/IfcAxis2Placement2D.js";
import { IfcPolyline } from "../ifc-models/geometry/IfcPolyline.js";
import { IfcGeometricRepresentationSubContext } from "../ifc-models/context/IfcGeometricRepresentationSubContext.js";
import { IfcGeometricRepresentationContext } from "../ifc-models/context/IfcGeometricRepresentationContext.js";
import { IfcLocalPlacement } from "../ifc-models/context/IfcLocalPlacement.js";
import { IfcGridPlacement } from "../ifc-models/context/IfcGridPlacement.js";
import { IfcLinearPlacement } from "../ifc-models/context/IfcLinearPlacement.js";
import { IfcWallStandardCase } from "../ifc-models/building-elements/IfcWallStandardCase.js";
import { IfcRectangleProfileDef } from "../ifc-models/geometry/IfcRectangleProfileDef.js";
import { IfcExtrudedAreaSolid } from "../ifc-models/geometry/IfcExtrudedAreaSolid.js";
import { IfcShapeRepresentation } from "../ifc-models/geometry/IfcShapeRepresentation.js";
import { IfcProductDefinitionShape } from "../ifc-models/geometry/IfcProductDefinitionShape.js";
import { IfcSpaceType } from "../ifc-models/properties/IfcSpaceType.js";
import { IfcPlane } from "../ifc-models/geometry/IfcPlane.js";
import { IfcCurveBoundedPlane } from "../ifc-models/geometry/IfcCurveBoundedPlane.js";
import { IfcConnectionSurfaceGeometry } from "../ifc-models/geometry/IfcConnectionSurfaceGeometry.js";
import { IfcPropertySingleValue } from "../ifc-models/properties/IfcPropertySingleValue.js";
import { IfcPropertySet } from "../ifc-models/properties/IfcPropertySet.js";
import { IfcRelDefinesByProperties } from "../ifc-models/relationship/IfcRelDefinesByProperties.js";
import { IfcPolygonalBoundedHalfSpace } from "../ifc-models/geometry/IfcPolygonalBoundedHalfSpace.js";
import { IfcBooleanClippingResult } from "../ifc-models/geometry/IfcBooleanClippingResult.js";
import { IfcColourRgb } from "../ifc-models/presentation/IfcColourRGB.js";
import { IfcSurfaceStyleRendering } from "../ifc-models/presentation/IfcSurfaceStyleRendering.js";

const typesParserMap = {
  //Spatial structure elements
  [t.IfcProject]: IfcProject,
  [t.IfcSite]: IfcSite,
  [t.IfcBuilding]: IfcBuilding,
  [t.IfcBuildingStorey]: IfcBuildingStorey,
  [t.IfcSpace]: IfcSpace,

  //Properties
  [t.IfcSpaceType]: IfcSpaceType,
  [t.IfcPropertySingleValue]: IfcPropertySingleValue,
  [t.IfcPropertySet]: IfcPropertySet,

  //Geometry
  [t.IfcDirection]: IfcDirection,
  [t.IfcCartesianPoint]: IfcCartesianPoint,
  [t.IfcAxis2Placement3D]: IfcAxis2Placement3D,
  [t.IfcAxis2Placement2D]: IfcAxis2Placement2D,
  [t.IfcPolyline]: IfcPolyline,
  [t.IfcRectangleProfileDef]: IfcRectangleProfileDef,
  [t.IfcExtrudedAreaSolid]: IfcExtrudedAreaSolid,
  [t.IfcShapeRepresentation]: IfcShapeRepresentation,
  [t.IfcProductDefinitionShape]: IfcProductDefinitionShape,
  [t.IfcPlane]: IfcPlane,
  [t.IfcConnectionSurfaceGeometry]: IfcConnectionSurfaceGeometry,
  [t.IfcCurveBoundedPlane]: IfcCurveBoundedPlane,
  [t.IfcPolygonalBoundedHalfSpace]: IfcPolygonalBoundedHalfSpace,
  [t.IfcBooleanClippingResult]: IfcBooleanClippingResult,

  //Units
  [t.IfcUnitAssignment]: IfcUnitAssignment,
  [t.IfcSIUnit]: IfcSIUnit,
  [t.IfcDerivedUnit]: IfcDerivedUnit,
  [t.IfcDerivedUnitElement]: IfcDerivedUnitElement,
  [t.IfcMeasureWithUnit]: IfcMeasureWithUnit,
  [t.IfcDimensionalExponents]: IfcDimensionalExponents,
  [t.IfcConversionBasedUnit]: IfcConversionBasedUnit,

  //Contexts
  [t.IfcLinearPlacement]: IfcLinearPlacement,
  [t.IfcGridPlacement]: IfcGridPlacement,
  [t.IfcLocalPlacement]: IfcLocalPlacement,
  [t.IfcGeometricRepresentationContext]: IfcGeometricRepresentationContext,
  [t.IfcGeometricRepresentationSubContext]: IfcGeometricRepresentationSubContext,

  //Identities
  [t.IfcApplication]: IfcApplication,
  [t.IfcOrganization]: IfcOrganization,
  [t.IfcOwnerHistory]: IfcOwnerHistory,
  [t.IfcPerson]: IfcPerson,
  [t.IfcPersonAndOrganization]: IfcPersonAndOrganization,
  [t.IfcPostalAddress]: IfcPostalAddress,

  //Relationships
  [t.IfcRelAggregates]: IfcRelAggregates,
  [t.IfcRelContainedInSpatialStructure]: IfcRelContainedInSpatialStructure,
  [t.IfcRelDefinesByProperties]: IfcRelDefinesByProperties,

  //Presentation
  [t.IfcColourRgb]: IfcColourRgb,
  [t.IfcSurfaceStyleRendering]: IfcSurfaceStyleRendering,

  //Building elements
  [t.IfcWallStandardCase]: IfcWallStandardCase,
};

function parserByType(ifcType) {
  return typesParserMap[ifcType];
}

export { parserByType, typesParserMap };
