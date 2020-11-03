import { IfcConversionBasedUnit_Parser } from "./IfcConversionBasedUnit.js";
import { IfcDerivedUnit_Parser } from "./IfcDerivedUnit.js";
import { IfcDerivedUnitElement_Parser } from "./IfcDerivedUnitElement.js";
import { IfcDimensionalExponents_Parser } from "./IfcDimensionalExponents.js";
import { IfcMeasureWithUnit_Parser } from "./IfcMeasureWithUnit.js";
import { IfcSIUnit_Parser } from "./IfcSIUnit.js";
import { IfcUnitAssignment_Parser } from "./IfcUnitAssignment.js";

function addUnitsParsers($) {
  $.RULE("IfcUnitAssignment_Parser", IfcUnitAssignment_Parser($));
  $.RULE("IfcSIUnit_Parser", IfcSIUnit_Parser($));
  $.RULE("IfcDerivedUnit_Parser", IfcDerivedUnit_Parser($));
  $.RULE("IfcDerivedUnitElement_Parser", IfcDerivedUnitElement_Parser($));
  $.RULE("IfcMeasureWithUnit_Parser", IfcMeasureWithUnit_Parser($));
  $.RULE("IfcDimensionalExponents_Parser", IfcDimensionalExponents_Parser($));
  $.RULE("IfcConversionBasedUnit_Parser", IfcConversionBasedUnit_Parser($));
}

export { addUnitsParsers };
