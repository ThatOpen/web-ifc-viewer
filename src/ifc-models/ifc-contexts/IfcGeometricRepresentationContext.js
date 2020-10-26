/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifcrepresentationresource/lexical/ifcGeometricrepresentationcontext.htm]
 */
import { IfcRepresentationContext } from "./IfcRepresentationContext";
import { getIfcAxis2Placement3D } from "../ifc-coordinates/IfcAxis2Placement3D";
import { getIfcDirection } from "../ifc-coordinates/IfcDirection";
import { baseMultiConstructor } from "../../ifc-utils/ifc-constructor";

class IfcGeometricRepresentationContext extends IfcRepresentationContext {
  getIfcProperties() {
    super.getIfcProperties();
    this.coordinationSpaceDimension = this.extractNumber();
    this.precision = this.extractNumber();
    this.worldCoordinateSystem = getIfcAxis2Placement3D(this, this.extractId());
    this.trueNorth = getIfcDirection(this, this.extractId());
  }
}

function getIfcGeometricRepresentationContexts(caller) {
  return baseMultiConstructor(caller, IfcGeometricRepresentationContext);
}

export { getIfcGeometricRepresentationContexts };
