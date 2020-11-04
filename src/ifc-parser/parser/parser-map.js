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

const typesParserMap = {
  //Spatial structure elements

  [t.IfcProject]: { name: "IfcProject", item: IfcProject },
  [t.IfcSite]: { name: "IfcSite", item: IfcSite },
  [t.IfcBuilding]: { name: "IfcBuilding", item: IfcBuilding },
  [t.IfcBuildingStorey]: { name: "IfcBuildingStorey", item: IfcBuildingStorey },
  [t.IfcSpace]: { name: "IfcSpace", item: IfcSpace },

  //Geometry

  [t.IfcDirection]: { name: "IfcDirection", item: IfcDirection },
  [t.IfcCartesianPoint]: { name: "IfcCartesianPoint", item: IfcCartesianPoint },
  [t.IfcAxis2Placement3D]: {
    name: "IfcAxis2Placement3D",
    item: IfcAxis2Placement3D,
  },
  [t.IfcAxis2Placement2D]: {
    name: "IfcAxis2Placement2D",
    item: IfcAxis2Placement2D,
  },
  [t.IfcPolyline]: { name: "IfcPolyline", item: IfcPolyline },

  //Units

  [t.IfcUnitAssignment]: { name: "IfcUnitAssignment", item: IfcUnitAssignment },
  [t.IfcSIUnit]: { name: "IfcSIUnit", item: IfcSIUnit },
  [t.IfcDerivedUnit]: { name: "IfcDerivedUnit", item: IfcDerivedUnit },
  [t.IfcDerivedUnitElement]: {
    name: "IfcDerivedUnitElement",
    item: IfcDerivedUnitElement,
  },
  [t.IfcMeasureWithUnit]: {
    name: "IfcMeasureWithUnit",
    item: IfcMeasureWithUnit,
  },
  [t.IfcDimensionalExponents]: {
    name: "IfcDimensionalExponents",
    item: IfcDimensionalExponents,
  },
  [t.IfcConversionBasedUnit]: {
    name: "IfcConversionBasedUnit",
    item: IfcConversionBasedUnit,
  },

  //Contexts

  [t.IfcLinearPlacement]: {
    name: "IfcLinearPlacement",
    item: IfcLinearPlacement,
  },
  [t.IfcGridPlacement]: { name: "IfcGridPlacement", item: IfcGridPlacement },
  [t.IfcLocalPlacement]: { name: "IfcLocalPlacement", item: IfcLocalPlacement },
  [t.IfcGeometricRepresentationContext]: {
    name: "IfcGeometricRepresentationContext",
    item: IfcGeometricRepresentationContext,
  },
  [t.IfcGeometricRepresentationSubContext]: {
    name: "IfcGeometricRepresentationSubContext",
    item: IfcGeometricRepresentationSubContext,
  },

  //Identities

  [t.IfcApplication]: { name: "IfcApplication", item: IfcApplication },
  [t.IfcOrganization]: { name: "IfcOrganization", item: IfcOrganization },
  [t.IfcOwnerHistory]: { name: "IfcOwnerHistory", item: IfcOwnerHistory },
  [t.IfcPerson]: { name: "IfcPerson", item: IfcPerson },
  [t.IfcPersonAndOrganization]: {
    name: "IfcPersonAndOrganization",
    item: IfcPersonAndOrganization,
  },
  [t.IfcPostalAddress]: { name: "IfcPostalAddress", item: IfcPostalAddress },

  //Relationships

  [t.IfcRelAggregates]: { name: "IfcRelAggregates", item: IfcRelAggregates },
  [t.IfcRelContainedInSpatialStructure]: {
    name: "IfcRelContainedInSpatialStructure",
    item: IfcRelContainedInSpatialStructure,
  },

  //Building elements
  [t.IfcWallStandardCase]: {
    name: "IfcWallStandardCase",
    item: IfcWallStandardCase,
  },
};

function parserByType(ifcType) {
  return typesParserMap[ifcType];
}

export { parserByType, typesParserMap };
