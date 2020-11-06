import { newObject } from "../parser/parser-map.js";
import { ifcClass } from "../utils/globalProperties.js";
import { ifcDataTypes as d } from "../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(t.IfcAxis2Placement2D),
  Location: d.id,
  RefDirection: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcAxis2Placement3D),
  Location: d.id,
  Axis: d.id,
  RefDirection: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcBooleanClippingResult),
  Operator: d.enum,
  FirstOperand: d.id,
  SecondOperand: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcCartesianPoint),
  Coordinates: d.numberSet,
});

newObject({
  [ifcClass]: getName(t.IfcConnectionSurfaceGeometry),
  SurfaceOnRelatingElement: d.id,
  SurfaceOnRelatedElement: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcCurveBoundedPlane),
  BasisSurface: d.id,
  OuterBoundary: d.id,
  InnerBoundaries: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcDirection),
  DirectionRatios: d.numberSet,
});

newObject({
  [ifcClass]: getName(t.IfcExtrudedAreaSolid),
  SweptArea: d.id,
  Position: d.id,
  ExtrudedDirection: d.id,
  Depth: d.number,
});

newObject({
  [ifcClass]: getName(t.IfcPlane),
  Position: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcPolygonalBoundedHalfSpace),
  BaseSurface: d.id,
  AgreementFlag: d.bool,
  Position: d.id,
  PolygonalBoundary: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcPolyline),
  Points: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcProductDefinitionShape),
  Description: d.text,
  RepresentationType: d.text,
  Representations: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcRectangleProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  Position: d.id,
  XDim: d.number,
  YDim: d.number,
});

newObject({
  [ifcClass]: getName(t.IfcShapeRepresentation),
  ContextOfItems: d.id,
  RepresentationIdentifier: d.text,
  RepresentationType: d.text,
  Items: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcFaceOuterBound),
  Bound: d.id,
  Orientation: d.bool,
});

newObject({
  [ifcClass]: getName(t.IfcFace),
  Bounds: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcPolyLoop),
  Polygon: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcClosedShell),
  CfsFaces: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcFacetedBrep),
  Outer: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcCartesianTransformationOperator3D),
  Axis1: d.id,
  Axis2: d.id,
  LocalOrigin: d.id,
  Scale: d.number,
  Axis3: d.id,
});
