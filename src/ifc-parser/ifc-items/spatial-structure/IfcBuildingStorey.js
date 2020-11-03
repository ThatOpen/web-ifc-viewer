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

function IfcBuildingStorey_Parser($) {
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
      $.SUBRULE($._Number); //Elevation
    });
  };
}

function IfcBuildingStorey_Semantic(parsed) {
  resetCounter();
  return {
    IfcType: "IfcBuildingStorey",
    Guid: { value: getGuid(parsed), type: d.guid },
    OwnerHistory: { value: getExpressId(parsed), type: d.id },
    Name: { value: getIfcText(parsed), type: d.text },
    Description: { value: getIfcText(parsed), type: d.text },
    ObjectType: { value: getIfcText(parsed), type: d.text },
    ObjectPlacement: { value: getExpressId(parsed), type: d.id },
    Representation: { value: getExpressId(parsed), type: d.id },
    LongName: { value: getIfcText(parsed), type: d.text },
    CompositionType: { value: getEnum(parsed), type: d.enum },
    Elevation: { value: getNumber(parsed), type: d.number },
  };
}

export { IfcBuildingStorey_Parser, IfcBuildingStorey_Semantic };
