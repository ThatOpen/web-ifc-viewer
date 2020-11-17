import { newObject } from "../parser/parser-map.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [n.ifcClass]: getName(t.IfcAxis2Placement2D),
  [n.location]: d.id,
  [n.refDirection]: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcAxis2Placement3D),
  [n.location]: d.id,
  [n.axis]: d.id,
  [n.refDirection]: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcBooleanClippingResult),
  Operator: d.enum,
  FirstOperand: d.id,
  SecondOperand: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcCartesianPoint),
  [n.coordinates]: d.numSet,
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
  [n.dirRatios]: d.numSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcExtrudedAreaSolid),
  [n.sweptArea]: d.id,
  [n.position]: d.id,
  [n.extDirection]: d.id,
  [n.depth]: d.number,
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
  [n.position]: d.id,
  [n.xDim]: d.number,
  [n.yDim]: d.number,
});

newObject({
  [n.ifcClass]: getName(t.IfcArbitraryClosedProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  [n.outerCurve]: d.id,
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
  [n.axis1]: d.id,
  [n.axis2]: d.id,
  [n.localOrigin]: d.id,
  [n.scale]: d.number,
  [n.axis3]: d.id,
});
