import { applyTransformations } from "./geometry-transformer/transformation.js";
import { constructGeometry } from "./geometry-generator/geometry-mapper.js";
import { applyBooleanOperations } from "./geometry-operator/boolean-operator.js";
import { applycolors, drawEdges } from "./scene/materials.js";
import { scene } from "./scene/three-scene.js";

function buildGeometry(structured) {
  console.log(structured);
  constructGeometry(structured);
  applyTransformations(structured);
  drawEdges(structured);
  applyBooleanOperations(structured);
  applycolors(structured);
}

export { buildGeometry };
