import { newObject } from '../parser/parser-map.js';
import { namedProps as n } from '../../utils/global-constants.js';
import { ifcDataTypes as d } from '../../utils/ifc-data-types.js';
import { getName, ifcTypes as t } from '../../utils/ifc-types.js';

newObject({
  [n.ifcClass]: getName(t.IfcColourRgb),
  Name: d.text,
  Red: d.number,
  Green: d.number,
  Blue: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcMaterialDefinitionRepresentation),
  Name: d.text,
  Description: d.text,
  [n.representations]: d.idSet,
  RepresentedMaterial: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcPresentationStyleAssignment),
  Styles: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcStyledItem),
  Item: d.id,
  Styles: d.idSet,
  Name: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcStyledRepresentation),
  ContextOfItems: d.id,
  RepresentationIdentifier: d.text,
  [n.representationType]: d.text,
  [n.items]: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcSurfaceStyle),
  Name: d.text,
  Side: d.enum,
  Styles: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcSurfaceStyleRendering),
  SurfaceColour: d.id,
  Transparency: d.value,
  DiffuseColour: d.value,
  TransmissionColour: d.value,
  DiffuseTransmissionColour: d.value,
  ReflectionColour: d.value,
  SpecularColour: d.value,
  SpecularHighlight: d.value,
  ReflectanceMethod: d.enum
});

newObject({
  [n.ifcClass]: getName(t.IfcRepresentationMap),
  [n.mappingOrigin]: d.id,
  [n.mappedRepresentation]: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcPresentationLayerAssignment),
  Name: d.text,
  Description: d.text,
  AssignedItems: d.idSet,
  Identifier: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcSurfaceStyleShading),
  SurfaceColour: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcDraughtingPreDefinedCurveFont),
  CurvePattern: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcCurveStyle),
  Name: d.text,
  CurveFont: d.id,
  CurveWidth: d.value,
  CurveColour: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcFillAreaStyleHatching),
  HatchLineAppearance: d.id,
  StartOfNextHatchLine: d.value,
  PointOfReferenceHatchLine: d.id,
  PatternStart: d.id,
  HatchLineAngle: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcFillAreaStyle),
  Name: d.text,
  FillStyles: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcCurveStyleFontPattern),
  VisibleSegmentLength: d.number,
  InvisibleSegmentLength: d.number
});

newObject({
  [n.ifcClass]: getName(t.IfcCurveStyleFont),
  Name: d.text,
  PatternList: d.idSet
});

newObject({
  [n.ifcClass]: getName(t.IfcTextStyleFontModel),
  Name: d.text,
  FontFamily: d.textSet,
  FontStyle: d.text,
  FontVariant: d.text,
  FontWeight: d.number,
  FontSize: d.value
});

newObject({
  [n.ifcClass]: getName(t.IfcTextStyleForDefinedFont),
  Colour: d.id,
  BackgroundColour: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcTextStyle),
  Name: d.text,
  TextCharacterAppearance: d.id,
  TextStyle: d.id,
  TextFontStyle: d.id
});

newObject({
  [n.ifcClass]: getName(t.IfcTextLiteralWithExtent),
  Literal: d.text,
  Placement: d.id,
  Path: d.enum,
  Extent: d.id,
  BoxAlignment: d.text
});

newObject({
  [n.ifcClass]: getName(t.IfcAnnotationFillArea),
  OuterBoundary: d.id,
  InnerBoundaries: d.idSet,
});
