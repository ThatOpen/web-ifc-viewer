import { IfcGeometricRepresentationContext_Parser } from "./IfcGeometricRepresentationContext.js";
import { IfcGeometricRepresentationSubContext_Parser } from "./IfcGeometricRepresentationSubcontext.js";
import { IfcGridPlacement_Parser } from "./IfcGridPlacement.js";
import { IfcLinearPlacement_Parser } from "./IfcLinearPlacement.js";
import { IfcLocalPlacement_Parser } from "./IfcLocalPlacement.js";

function addContextParsers($) {
  $.RULE(
    "IfcGeometricRepresentationContext_Parser",
    IfcGeometricRepresentationContext_Parser($)
  );
  $.RULE("IfcLinearPlacement_Parser", IfcLinearPlacement_Parser($));
  $.RULE("IfcGridPlacement_Parser", IfcGridPlacement_Parser($));
  $.RULE("IfcLocalPlacement_Parser", IfcLocalPlacement_Parser($));
  $.RULE(
    "IfcGeometricRepresentationSubContext_Parser",
    IfcGeometricRepresentationSubContext_Parser($)
  );
}

export { addContextParsers };
