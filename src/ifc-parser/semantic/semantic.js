import { parser } from "../parser/parser.js";
import { typesParserMap } from "../parser/parser-map.js";
import { newSemantic } from "./semantic-factory.js";
import { ifcTypes as t } from "../utils/ifc-types.js";

//Chevrotain requires a method per syntactical structure of the parser
//When the parser outputs a syntactical structure, the visitor
//handles it with the correspondant method using visit()

const BaseVisitor = parser.getBaseCstVisitorConstructor();

class IfcVisitor extends BaseVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  //Spatial structure elements

  IfcProject(parsed) {
    return getSemantic(t.IfcProject, parsed);
  }

  IfcSite(parsed) {
    return getSemantic(t.IfcSite, parsed);
  }

  IfcBuilding(parsed) {
    return getSemantic(t.IfcBuilding, parsed);
  }

  IfcBuildingStorey(parsed) {
    return getSemantic(t.IfcBuildingStorey, parsed);
  }

  IfcSpace(parsed) {
    return getSemantic(t.IfcSpace, parsed);
  }

  //Properties

  IfcSpaceType(parsed) {
    return getSemantic(t.IfcSpaceType, parsed);
  }

  IfcPropertySingleValue(parsed) {
    return getSemantic(t.IfcPropertySingleValue, parsed);
  }

  IfcPropertySet(parsed) {
    return getSemantic(t.IfcPropertySet, parsed);
  }

  //Geometry

  IfcDirection(parsed) {
    return getSemantic(t.IfcDirection, parsed);
  }

  IfcCartesianPoint(parsed) {
    return getSemantic(t.IfcCartesianPoint, parsed);
  }

  IfcAxis2Placement3D(parsed) {
    return getSemantic(t.IfcAxis2Placement3D, parsed);
  }

  IfcAxis2Placement2D(parsed) {
    return getSemantic(t.IfcAxis2Placement2D, parsed);
  }

  IfcPolyline(parsed) {
    return getSemantic(t.IfcPolyline, parsed);
  }

  IfcRectangleProfileDef(parsed) {
    return getSemantic(t.IfcRectangleProfileDef, parsed);
  }

  IfcExtrudedAreaSolid(parsed) {
    return getSemantic(t.IfcExtrudedAreaSolid, parsed);
  }

  IfcShapeRepresentation(parsed) {
    return getSemantic(t.IfcShapeRepresentation, parsed);
  }

  IfcProductDefinitionShape(parsed) {
    return getSemantic(t.IfcProductDefinitionShape, parsed);
  }

  IfcPlane(parsed) {
    return getSemantic(t.IfcPlane, parsed);
  }

  IfcCurveBoundedPlane(parsed) {
    return getSemantic(t.IfcCurveBoundedPlane, parsed);
  }

  IfcConnectionSurfaceGeometry(parsed) {
    return getSemantic(t.IfcConnectionSurfaceGeometry, parsed);
  }

  IfcPolygonalBoundedHalfSpace(parsed) {
    return getSemantic(t.IfcPolygonalBoundedHalfSpace, parsed);
  }

  IfcBooleanClippingResult(parsed) {
    return getSemantic(t.IfcBooleanClippingResult, parsed);
  }

  //Units

  IfcUnitAssignment(parsed) {
    return getSemantic(t.IfcUnitAssignment, parsed);
  }

  IfcSIUnit(parsed) {
    return getSemantic(t.IfcSIUnit, parsed);
  }

  IfcDerivedUnit(parsed) {
    return getSemantic(t.IfcDerivedUnit, parsed);
  }

  IfcDerivedUnitElement(parsed) {
    return getSemantic(t.IfcDerivedUnitElement, parsed);
  }

  IfcMeasureWithUnit(parsed) {
    return getSemantic(t.IfcMeasureWithUnit, parsed);
  }

  IfcDimensionalExponents(parsed) {
    return getSemantic(t.IfcDimensionalExponents, parsed);
  }

  IfcConversionBasedUnit(parsed) {
    return getSemantic(t.IfcConversionBasedUnit, parsed);
  }

  //Contexts

  IfcGeometricRepresentationContext(parsed) {
    return getSemantic(t.IfcGeometricRepresentationContext, parsed);
  }

  IfcGeometricRepresentationSubContext(parsed) {
    return getSemantic(t.IfcGeometricRepresentationSubContext, parsed);
  }

  IfcLinearPlacement(parsed) {
    return getSemantic(t.IfcLinearPlacement, parsed);
  }

  IfcGridPlacement(parsed) {
    return getSemantic(t.IfcGridPlacement, parsed);
  }

  IfcLocalPlacement(parsed) {
    return getSemantic(t.IfcLocalPlacement, parsed);
  }

  //Identities

  IfcOrganization(parsed) {
    return getSemantic(t.IfcOrganization, parsed);
  }

  IfcApplication(parsed) {
    return getSemantic(t.IfcApplication, parsed);
  }

  IfcOwnerHistory(parsed) {
    return getSemantic(t.IfcOwnerHistory, parsed);
  }

  IfcPerson(parsed) {
    return getSemantic(t.IfcPerson, parsed);
  }

  IfcPersonAndOrganization(parsed) {
    return getSemantic(t.IfcPersonAndOrganization, parsed);
  }

  IfcPostalAddress(parsed) {
    return getSemantic(t.IfcPostalAddress, parsed);
  }

  //Relationships

  IfcRelAggregates(parsed) {
    return getSemantic(t.IfcRelAggregates, parsed);
  }

  IfcRelContainedInSpatialStructure(parsed) {
    return getSemantic(t.IfcRelContainedInSpatialStructure, parsed);
  }

  IfcRelDefinesByProperties(parsed) {
    return getSemantic(t.IfcRelDefinesByProperties, parsed);
  }

  //Building elements

  IfcWallStandardCase(parsed) {
    return getSemantic(t.IfcWallStandardCase, parsed);
  }

  _IfcGuid(parsed) {}
  _Number(parsed) {}
  _IdSet(parsed) {}
  _IfcText(parsed) {}
  _IfcEnum(parsed) {}
  _IfcExpressId(parsed) {}
  _NumberSet(parsed) {}
  _Asterisk(parsed) {}
  _IfcValue(parsed) {}
  _TextSet(parsed) {}
  _IfcBool(parsed) {}
}

function getSemantic(ifcType, parsed) {
  const ifcItem = typesParserMap[ifcType];
  return newSemantic(parsed, ifcItem);
}

const ifcVisitor = new IfcVisitor();

export { ifcVisitor };
