import { applyTransformations } from "./geometry-transformer/transformation.js";
import { constructGeometry } from "./geometry-generator/geometry-mapper.js";
import { applyBooleanOperations } from "./geometry-operator/boolean-operator.js";

function buildGeometry(structured) {
  console.log(structured);
  constructGeometry(structured);
  applyTransformations(structured);
  applyBooleanOperations(structured);
}

export { buildGeometry };
