/**
 * [https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcgeometryresource/lexical/ifcplacement.htm]
 */

import { IfcGeometricRepresentationItem } from "../ifc-contexts/IfcGeometricRepresentationItem";
import { getIfcCartesianPoint } from "./IfcCartesianPoint";

class IfcPlacement extends IfcGeometricRepresentationItem {
  getIfcProperties() {
    super.getIfcProperties();
    this.location = getIfcCartesianPoint(this, this.extractId());
  }
}

export { IfcPlacement };
