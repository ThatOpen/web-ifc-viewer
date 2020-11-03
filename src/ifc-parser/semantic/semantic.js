import { parser } from "../parser/parser.js";
import { IfcProject_Semantic } from "../ifc-models/spatial-structure/IfcProject.js";
import { IfcSite_Semantic } from "../ifc-models/spatial-structure/IfcSite.js";
import { IfcBuilding_Semantic } from "../ifc-models/spatial-structure/IfcBuilding.js";
import { IfcBuildingStorey_Semantic } from "../ifc-models/spatial-structure/IfcBuildingStorey.js";
import { IfcSpace_Semantic } from "../ifc-models/spatial-structure/IfcSpace.js";
import { IfcDirection_Semantic } from "../ifc-models/geometry/IfcDirection.js";
import { IfcCartesianPoint_Semantic } from "../ifc-models/geometry/IfcCartesianPoint.js";
import { IfcAxis2Placement3D_Semantic } from "../ifc-models/geometry/IfcAxis2Placement3D.js";
import { IfcUnitAssignment_Semantic } from "../ifc-models/units/IfcUnitAssignment.js";
import { IfcSIUnit_Semantic } from "../ifc-models/units/IfcSIUnit.js";
import { IfcDerivedUnit_Semantic } from "../ifc-models/units/IfcDerivedUnit.js";
import { IfcDerivedUnitElement_Semantic } from "../ifc-models/units/IfcDerivedUnitElement.js";
import { IfcMeasureWithUnit_Semantic } from "../ifc-models/units/IfcMeasureWithUnit.js";
import { IfcDimensionalExponents_Semantic } from "../ifc-models/units/IfcDimensionalExponents.js";
import { IfcConversionBasedUnit_Semantic } from "../ifc-models/units/IfcConversionBasedUnit.js";
import { IfcGeometricRepresentationContext_Semantic } from "../ifc-models/context/IfcGeometricRepresentationContext.js";
import { IfcLinearPlacement_Semantic } from "../ifc-models/context/IfcLinearPlacement.js";
import { IfcGridPlacement_Semantic } from "../ifc-models/context/IfcGridPlacement.js";
import { IfcLocalPlacement_Semantic } from "../ifc-models/context/IfcLocalPlacement.js";
import { IfcAxis2Placement2D_Semantic } from "../ifc-models/geometry/IfcAxis2Placement2D.js";
import { IfcPolyline_Semantic } from "../ifc-models/geometry/IfcPolyline.js";
import { IfcOrganization_Semantic } from "../ifc-models/identities/IfcOrganization.js";
import { IfcApplication_Semantic } from "../ifc-models/identities/IfcApplication.js";
import { IfcOwnerHistory_Semantic } from "../ifc-models/identities/IfcOwnerHistory.js";
import {
  IfcPerson_Parser,
  IfcPerson_Semantic,
} from "../ifc-models/identities/IfcPerson.js";
import { IfcPersonAndOrganization_Semantic } from "../ifc-models/identities/IfcPersonAndOrganization.js";

const BaseVisitor = parser.getBaseCstVisitorConstructor();

class IfcVisitor extends BaseVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  //Spatial structure elements

  IfcProject_Parser(parsed) {
    return IfcProject_Semantic(parsed);
  }

  IfcSite_Parser(parsed) {
    return IfcSite_Semantic(parsed);
  }

  IfcBuilding_Parser(parsed) {
    return IfcBuilding_Semantic(parsed);
  }

  IfcBuildingStorey_Parser(parsed) {
    return IfcBuildingStorey_Semantic(parsed);
  }

  IfcSpace_Parser(parsed) {
    return IfcSpace_Semantic(parsed);
  }

  //Geometry

  IfcDirection_Parser(parsed) {
    return IfcDirection_Semantic(parsed);
  }

  IfcCartesianPoint_Parser(parsed) {
    return IfcCartesianPoint_Semantic(parsed);
  }

  IfcAxis2Placement3D_Parser(parsed) {
    return IfcAxis2Placement3D_Semantic(parsed);
  }

  IfcAxis2Placement2D_Parser(parsed) {
    return IfcAxis2Placement2D_Semantic(parsed);
  }

  IfcPolyline_Parser(parsed) {
    return IfcPolyline_Semantic(parsed);
  }

  //Units

  IfcUnitAssignment_Parser(parsed) {
    return IfcUnitAssignment_Semantic(parsed);
  }

  IfcSIUnit_Parser(parsed) {
    return IfcSIUnit_Semantic(parsed);
  }

  IfcDerivedUnit_Parser(parsed) {
    return IfcDerivedUnit_Semantic(parsed);
  }

  IfcDerivedUnitElement_Parser(parsed) {
    return IfcDerivedUnitElement_Semantic(parsed);
  }

  IfcMeasureWithUnit_Parser(parsed) {
    return IfcMeasureWithUnit_Semantic(parsed);
  }

  IfcDimensionalExponents_Parser(parsed) {
    return IfcDimensionalExponents_Semantic(parsed);
  }

  IfcConversionBasedUnit_Parser(parsed) {
    return IfcConversionBasedUnit_Semantic(parsed);
  }

  //Contexts

  IfcGeometricRepresentationContext_Parser(parsed) {
    return IfcGeometricRepresentationContext_Semantic(parsed);
  }

  IfcLinearPlacement_Parser(parsed) {
    return IfcLinearPlacement_Semantic(parsed);
  }

  IfcGridPlacement_Parser(parsed) {
    return IfcGridPlacement_Semantic(parsed);
  }

  IfcLocalPlacement_Parser(parsed) {
    return IfcLocalPlacement_Semantic(parsed);
  }

  //Identities

  IfcOrganization_Parser(parsed) {
    return IfcOrganization_Semantic(parsed);
  }

  IfcApplication_Parser(parsed) {
    return IfcApplication_Semantic(parsed);
  }

  IfcOwnerHistory_Parser(parsed) {
    return IfcOwnerHistory_Semantic(parsed);
  }

  IfcPerson_Parser(parsed) {
    return IfcPerson_Semantic(parsed);
  }

  IfcPersonAndOrganization_Parser(parsed) {
    return IfcPersonAndOrganization_Semantic(parsed);
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
}

const ifcVisitor = new IfcVisitor();

export { ifcVisitor };
