import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";

const IfcGeometricRepresentationContext = {
  ContextIdentifier: d.text,
  ContextType: d.text,
  CoordinateSpaceDimension: d.number,
  Precision: d.number,
  WorldCoordinateSystem: d.id,
  TrueNorth: d.id,
};

export { IfcGeometricRepresentationContext };
