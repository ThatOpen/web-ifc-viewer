import { newObject } from '../parser/parser-map.js';
import { namedProps as n } from '../../utils/global-constants.js';
import { ifcDataTypes as d } from '../../utils/ifc-data-types.js';
import { getName, ifcTypes as t } from '../../utils/ifc-types.js';

newObject({
  [n.ifcClass]: getName(t.IfcAxis2Placement2D),
  [n.location]: d.id,
  [n.refDirection]: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcAxis2Placement3D),
  [n.location]: d.id,
  [n.axis]: d.id,
  [n.refDirection]: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcBooleanClippingResult),
  [n.operator]: d.enum,
  [n.firstOperand]: d.id,
  [n.secondOperand]: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcEllipse),
  [n.position]: d.id,
  [n.semiAxis1]: d.number,
  [n.semiAxis2]: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcIShapeProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  [n.position]: d.id,
  [n.overallWidth]: d.number,
  [n.overallDepth]: d.number,
  [n.webThickness]: d.number,
  [n.flangeThickness]: d.number,
  [n.filletRadius]: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcLShapeProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  Position: d.id,
  Depth: d.number,
  Width: d.number,
  Thickness: d.number,
  FilletRadius: d.number,
  EdgeRadius: d.number,
  LegSlope: d.number,
  CentreOfGravityInX: d.number,
  CentreOfGravityInY: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcCartesianPoint),
  [n.coordinates]: d.numSet
});

newObject({
  [n.ifcClass]: getName(t.IfcConnectionSurfaceGeometry),
  SurfaceOnRelatingElement: d.id,
  SurfaceOnRelatedElement: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcCurveBoundedPlane),
  BasisSurface: d.id,
  OuterBoundary: d.id,
  InnerBoundaries: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcDirection),
  [n.dirRatios]: d.numSet
});

newObject({
  [n.ifcClass]: getName(t.IfcExtrudedAreaSolid),
  [n.sweptArea]: d.id,
  [n.position]: d.id,
  [n.extDirection]: d.id,
  [n.depth]: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcSweptDiskSolid),
  [n.directrix]: d.id,
  [n.radius]: d.number,
  [n.innerRadius]: d.number,
  [n.startParam]: d.number,
  [n.endParam]: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcPlane),
  Position: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcPolygonalBoundedHalfSpace),
  [n.baseSurface]: d.id,
  [n.agreementFlag]: d.bool,
  [n.position]: d.id,
  [n.polygonalBoundary]: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcPolyline),
  [n.points]: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcProductDefinitionShape),
  Description: d.text,
  [n.representationType]: d.text,
  [n.representations]: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcRectangleProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  [n.position]: d.id,
  [n.xDim]: d.number,
  [n.yDim]: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcCircleProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  [n.position]: d.id,
  [n.radius]: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcCircleHollowProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  [n.position]: d.id,
  [n.radius]: d.number,
  [n.wallThickness]: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcRectangleHollowProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  [n.position]: d.id,
  [n.xDim]: d.number,
  [n.yDim]: d.number,
  [n.wallThickness]: d.number,
  [n.innerFilletRadius]: d.number,
  [n.outerFilletRadius]: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcArbitraryProfileDefWithVoids),
  ProfileType: d.enum,
  ProfileName: d.text,
  [n.outerCurve]: d.id,
  [n.innerCurves]: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcArbitraryClosedProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  [n.outerCurve]: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcShapeRepresentation),
  ContextOfItems: d.id,
  RepresentationIdentifier: d.text,
  [n.representationType]: d.text,
  [n.items]: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcFaceOuterBound),
  [n.bound]: d.id,
  [n.orientation]: d.bool
});

newObject({
  [n.ifcClass]: getName(t.IfcFaceBound),
  [n.bound]: d.id,
  [n.orientation]: d.bool
});

newObject({
  [n.ifcClass]: getName(t.IfcFace),
  [n.bounds]: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcPolyLoop),
  [n.polygon]: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcClosedShell),
  [n.cfsFaces]: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcFacetedBrep),
  [n.outer]: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcCartesianTransformationOperator3D),
  [n.axis1]: d.id,
  [n.axis2]: d.id,
  [n.localOrigin]: d.id,
  [n.scale]: d.number,
  [n.axis3]: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcSurfaceOfLinearExtrusion),
  SweptCurve: d.id,
  Position: d.id,
  ExtrudedDirection: d.id,
  Depth: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcArbitraryOpenProfileDef),
  ProfileType: d.enum,
  ProfileName: d.text,
  Curve: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcGeometricSet),
  Elements: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcGeometricCurveSet),
  [n.elements]: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcConnectedFaceSet),
  CfsFaces: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcFaceBasedSurfaceModel),
  FbsmFaces: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcHalfSpaceSolid),
  [n.baseSurface]: d.id,
  [n.agreementFlag]: d.bool
});

newObject({
  [n.ifcClass]: getName(t.IfcCompositeCurveSegment),
  Transition: d.enum,
  SameSense: d.bool,
  [n.parentCurve]: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcCircle),
  Position: d.id,
  Radius: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcTrimmedCurve),
  [n.basisCurve]: d.id,
  [n.trim1]: d.valueSet,
  [n.trim2]: d.valueSet,
  [n.senseAgreement]: d.bool,
  MasterRepresentation: d.enum
});

newObject({
  [n.ifcClass]: getName(t.IfcCompositeCurve),
  [n.segments]: d.idSet,
  SelfIntersect: d.bool
});

newObject({
  [n.ifcClass]: getName(t.IfcBoundingBox),
  [n.corner]: d.id,
  [n.xDim]: d.number,
  [n.yDim]: d.number,
  [n.zDim]: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcPlanarExtent),
  SizeInX: d.number,
  SizeInY: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcVector),
  Orientation: d.id,
  Magnitude: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcLine),
  Pnt: d.id,
  Dir: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcOpenShell),
  CfsFaces: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcShellBasedSurfaceModel),
  SbsmBoundary: d.idSet,
});