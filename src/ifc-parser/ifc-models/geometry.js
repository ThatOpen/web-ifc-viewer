import { newObject } from "../parser/parser-map.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [n.ifcClass]: getName(t.IfcAxis2Placement2D),
  Location: d.id,
  RefDirection: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcAxis2Placement3D),
  Location: d.id,
  Axis: d.id,
  RefDirection: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcBooleanClippingResult),
  Operator: d.enum,
  FirstOperand: d.id,
  SecondOperand: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcCartesianPoint),
  [n.coordinates]: d.numberSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcConnectionSurfaceGeometry),
  SurfaceOnRelatingElement: d.id,
  SurfaceOnRelatedElement: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcCurveBoundedPlane),
  BasisSurface: d.id,
  OuterBoundary: d.id,
  InnerBoundaries: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcDirection),
  DirectionRatios: d.numberSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcExtrudedAreaSolid),
  SweptArea: d.id,
  Position: d.id,
  ExtrudedDirection: d.id,
  Depth: d.number,
});

newObject({
  [n.ifcClass]: getName(t.IfcPlane),
  Position: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcPolygonalBoundedHalfSpace),
  BaseSurface: d.id,
  AgreementFlag: d.bool,
  Position: d.id,
  PolygonalBoundary: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcPolyline),
  [n.points]: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcProductDefinitionShape),
  Description: d.text,
  [n.representationType]: d.text,
  [n.representations]: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcRectangleProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  Position: d.id,
  XDim: d.number,
  YDim: d.number,
});

newObject({
  [n.ifcClass]: getName(t.IfcShapeRepresentation),
  ContextOfItems: d.id,
  RepresentationIdentifier: d.text,
  [n.representationType]: d.text,
  [n.items]: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcFaceOuterBound),
  Bound: d.id,
  Orientation: d.bool,
});

newObject({
  [n.ifcClass]: getName(t.IfcFace),
  Bounds: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcPolyLoop),
  Polygon: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcClosedShell),
  CfsFaces: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcFacetedBrep),
  Outer: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcCartesianTransformationOperator3D),
  Axis1: d.id,
  Axis2: d.id,
  LocalOrigin: d.id,
  Scale: d.number,
  Axis3: d.id,
});
