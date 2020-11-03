import { IfcAxis2Placement2D_Parser } from "./IfcAxis2Placement2D.js";
import { IfcAxis2Placement3D_Parser } from "./IfcAxis2Placement3D.js";
import { IfcCartesianPoint_Parser } from "./IfcCartesianPoint.js";
import { IfcDirection_Parser } from "./IfcDirection.js";
import { IfcPolyline_Parser } from "./IfcPolyline.js";

function addGeometryParsers($) {
  $.RULE("IfcDirection_Parser", IfcDirection_Parser($));
  $.RULE("IfcCartesianPoint_Parser", IfcCartesianPoint_Parser($));
  $.RULE("IfcAxis2Placement3D_Parser", IfcAxis2Placement3D_Parser($));
  $.RULE("IfcAxis2Placement2D_Parser", IfcAxis2Placement2D_Parser($));
  $.RULE("IfcPolyline_Parser", IfcPolyline_Parser($));
}

export { addGeometryParsers };
