import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getGuid,
  getExpressId,
  getIfcText,
  getNumber,
  getEnum,
  getNumberSet,
  getIdSet,
  getTextSet,
} from "../../semantic/primitiveSemantic.js";

function IfcPerson_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcText); //Identification
      $.SUBRULE2($._IfcText); //FamilyName
      $.SUBRULE3($._IfcText); //GivenName
      $.SUBRULE4($._TextSet); //MiddleNames
      $.SUBRULE5($._TextSet); //PrefixTitles
      $.SUBRULE6($._TextSet); //SuffixTitles
      $.SUBRULE($._IdSet); //Roles
      $.SUBRULE2($._IdSet); //Addresses
      $.CONSUME(v.ClosePar);
    });
  };
}

function IfcPerson_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcPerson",
    Identification: { value: getIfcText(parsed), type: d.text },
    FamilyName: { value: getIfcText(parsed), type: d.text },
    GivenName: { value: getIfcText(parsed), type: d.text },
    MiddleNames: { value: getTextSet(parsed), type: d.textSet },
    PrefixTitles: { value: getTextSet(parsed), type: d.textSet },
    SuffixTitles: { value: getTextSet(parsed), type: d.textSet },
    Roles: { value: getIdSet(parsed), type: d.id },
    Addresses: { value: getIdSet(parsed), type: d.id },
  };
}

export { IfcPerson_Parser, IfcPerson_Semantic };
