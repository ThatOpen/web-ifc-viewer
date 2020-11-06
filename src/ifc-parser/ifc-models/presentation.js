import { newObject } from "../parser/parser-map.js";
import { ifcClass } from "../utils/globalProperties.js";
import { ifcDataTypes as d } from "../utils/ifc-data-types.js";
import { getName, ifcTypes as t } from "../utils/ifc-types.js";

newObject({
  [ifcClass]: getName(t.IfcColourRgb),
  Name: d.text,
  Red: d.number,
  Green: d.number,
  Blue: d.number,
});

newObject({
  [ifcClass]: getName(t.IfcMaterialDefinitionRepresentation),
  Name: d.text,
  Description: d.text,
  Representations: d.idSet,
  RepresentedMaterial: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcPresentationStyleAssignment),
  Styles: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcStyledItem),
  Item: d.id,
  Styles: d.idSet,
  Name: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcStyledRepresentation),
  ContextOfItems: d.id,
  RepresentationIdentifier: d.text,
  RepresentationType: d.text,
  Items: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcSurfaceStyle),
  Name: d.text,
  Side: d.enum,
  Styles: d.idSet,
});

newObject({
  [ifcClass]: getName(t.IfcSurfaceStyleRendering),
  SurfaceColour: d.id,
  Transparency: d.ifcValue,
  DiffuseColour: d.ifcValue,
  TransmissionColour: d.ifcValue,
  DiffuseTransmissionColour: d.ifcValue,
  ReflectionColour: d.ifcValue,
  SpecularColour: d.ifcValue,
  SpecularHighlight: d.ifcValue,
  ReflectanceMethod: d.enum,
});

newObject({
  [ifcClass]: getName(t.IfcRepresentationMap),
  MappingOrigin: d.id,
  MappedRepresentation: d.id,
});

newObject({
  [ifcClass]: getName(t.IfcPresentationLayerAssignment),
  Name: d.text,
  Description: d.text,
  AssignedItems: d.idSet,
  Identifier: d.text,
});
