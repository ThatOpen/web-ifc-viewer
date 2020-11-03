import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
  getIfcText,
  getIdSet,
} from "../../semantic/primitiveSemantic.js";

function IfcOrganization_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcText); //Identification
      $.SUBRULE2($._IfcText); //Name
      $.SUBRULE3($._IfcText); //Description
      $.SUBRULE2($._IdSet); //Roles
      $.SUBRULE3($._IdSet); //Addresses
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcOrganization_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcOrganization",
    Identification: { value: getIfcText(parsed), type: d.text },
    Name: { value: getIfcText(parsed), type: d.text },
    Description: { value: getIfcText(parsed), type: d.text },
    Roles: { value: getIdSet(parsed), type: d.idSet },
    Addresses: { value: getIdSet(parsed), type: d.idSet },
  };
}

export { IfcOrganization_Parser, IfcOrganization_Semantic };
