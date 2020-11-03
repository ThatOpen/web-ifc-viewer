import { vocabulary as v } from "../../lexer/lexer.js";
import { ifcDataTypes as d } from "../../utils/ifc-data-types.js";
import {
  resetCounter,
  getGuid,
  getExpressId,
  getIfcText,
  getNumber,
  getEnum,
} from "../../semantic/primitiveSemantic.js";

function IfcSpace_Parser($) {
  return () => {
    $.AT_LEAST_ONE(() => {
      $.CONSUME(v.OpenPar);
      $.SUBRULE($._IfcGuid); //GlobalId
      $.SUBRULE($._IfcExpressId); //OwnerHistory
      $.SUBRULE($._IfcText); //Name
      $.SUBRULE2($._IfcText); //Description
      $.SUBRULE3($._IfcText); //ObjectType
      $.SUBRULE2($._IfcExpressId); //ObjectPlacement
      $.SUBRULE3($._IfcExpressId); //Representation
      $.SUBRULE4($._IfcText); //LongName
      $.SUBRULE($._IfcEnum); //CompositionType
      $.SUBRULE2($._IfcEnum); //InteriorOrExteriorSpace
      $.SUBRULE($._Number); //ElevationWithFlooring
    });
  };
}

function IfcSpace_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcSpace",
    Guid: { value: getGuid(parsed), type: d.guid },
    OwnerHistory: { value: getExpressId(parsed), type: d.id },
    Name: { value: getIfcText(parsed), type: d.text },
    Description: { value: getIfcText(parsed), type: d.text },
    ObjectType: { value: getIfcText(parsed), type: d.text },
    ObjectPlacement: { value: getExpressId(parsed), type: d.id },
    Representation: { value: getExpressId(parsed), type: d.id },
    LongName: { value: getIfcText(parsed), type: d.text },
    CompositionType: { value: getEnum(parsed), type: d.enum },
    InteriorOrExteriorSpace: { value: getEnum(parsed), type: d.enum },
    ElevationWithFlooring: { value: getNumber(parsed), type: d.number },
  };
}

export { IfcSpace_Parser, IfcSpace_Semantic };
