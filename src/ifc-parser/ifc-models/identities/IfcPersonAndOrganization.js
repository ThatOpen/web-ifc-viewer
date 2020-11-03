import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getExpressId,
  getIdSet,
} from "../../semantic/primitiveSemantic.js";

function IfcPersonAndOrganization_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcExpressId); //ThePerson
      $.SUBRULE2($._IfcExpressId); //TheOrganization
      $.SUBRULE3($._IdSet); //Roles
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcPersonAndOrganization_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcPersonAndOrganization",
    ThePerson: { value: getExpressId(parsed), type: d.id },
    TheOrganization: { value: getExpressId(parsed), type: d.id },
    Roles: { value: getIdSet(parsed), type: d.id },
  };
}

export { IfcPersonAndOrganization_Parser, IfcPersonAndOrganization_Semantic };
