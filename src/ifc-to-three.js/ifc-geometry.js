import { getTransformations } from "./ifc-reference.js";
import { getRepresentations } from "./ifc-representation.js";

function buildGeometry(structured) {
  console.log(structured);
  const reps = getRepresentations(structured);
  getTransformations(structured);
}

export { buildGeometry };
