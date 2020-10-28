/**
 * [https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcgeometryresource/lexical/ifcaxis2placement3d.htm]
 */

import { IfcGeometricRepresentationItem } from "../ifc-contexts/IfcGeometricRepresentationItem";
import { getIfcCartesianPoint } from "./IfcCartesianPoint";

class IfcPlacement extends IfcGeometricRepresentationItem {
  getIfcProperties() {
    super.getIfcProperties();
    this.location = getIfcCartesianPoint(this);
  }
}

export { IfcPlacement };
