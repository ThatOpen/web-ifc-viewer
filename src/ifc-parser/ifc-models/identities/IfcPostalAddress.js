import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getIfcText,
  getEnum,
  getTextSet,
} from "../../semantic/primitiveSemantic.js";

function IfcPostalAddress_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcEnum); //Purpose
      $.SUBRULE($._IfcText); //Description
      $.SUBRULE2($._IfcText); //UserDefinedPurpose
      $.SUBRULE3($._IfcText); //InternalLocation
      $.SUBRULE($._TextSet); //AddressLines
      $.SUBRULE4($._IfcText); //PostalBox
      $.SUBRULE5($._IfcText); //Town
      $.SUBRULE6($._IfcText); //Region
      $.SUBRULE7($._IfcText); //PostalCode
      $.SUBRULE8($._IfcText); //Country
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcPostalAddress_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcPostalAddress",
    Purpose: { value: getEnum(parsed), type: d.enum },
    Description: { value: getIfcText(parsed), type: d.text },
    UserDefinedPurpose: { value: getIfcText(parsed), type: d.text },
    InternalLocation: { value: getIfcText(parsed), type: d.text },
    AddressLines: { value: getTextSet(parsed), type: d.textSet },
    PostalBox: { value: getIfcText(parsed), type: d.text },
    Town: { value: getIfcText(parsed), type: d.text },
    Region: { value: getIfcText(parsed), type: d.text },
    PostalCode: { value: getIfcText(parsed), type: d.text },
    Country: { value: getIfcText(parsed), type: d.text },
  };
}

export { IfcPostalAddress_Parser, IfcPostalAddress_Semantic };
