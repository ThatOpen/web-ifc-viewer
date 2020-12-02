import { newObject } from "../parser/parser-map.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";

newObject({
  [n.ifcClass]: getName(t.IfcColourRgb),
  Name: d.text,
  Red: d.number,
  Green: d.number,
  Blue: d.number,
});

newObject({
  [n.ifcClass]: getName(t.IfcMaterialDefinitionRepresentation),
  Name: d.text,
  Description: d.text,
  [n.representations]: d.idSet,
  RepresentedMaterial: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcPresentationStyleAssignment),
  Styles: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcStyledItem),
  Item: d.id,
  Styles: d.idSet,
  Name: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcStyledRepresentation),
  ContextOfItems: d.id,
  RepresentationIdentifier: d.text,
  [n.representationType]: d.text,
  [n.items]: d.idSet,
});

newObject({
  [n.ifcClass]: getName(t.IfcSurfaceStyle),
  Name: d.text,
  Side: d.enum,
  Styles: d.idSet,
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
  ReflectanceMethod: d.enum,
});

newObject({
  [n.ifcClass]: getName(t.IfcRepresentationMap),
  [n.mappingOrigin]: d.id,
  [n.mappedRepresentation]: d.id,
});

newObject({
  [n.ifcClass]: getName(t.IfcPresentationLayerAssignment),
  Name: d.text,
  Description: d.text,
  AssignedItems: d.idSet,
  Identifier: d.text,
});

newObject({
  [n.ifcClass]: getName(t.IfcSurfaceStyleShading),
  SurfaceColour: d.id,
});