import {
  namedProps as n,
  structuredData as s,
} from "../utils/global-constants.js";
import { applyTransformations } from "./ifc-reference.js";
import { getRepresentations } from "./ifc-representation.js";
import { scene } from "./three-scene.js";

function buildGeometry(structured) {
  console.log(structured);
  getRepresentations(structured);
  applyTransformations(structured);
  structured[s.products].forEach((e) => {
    scene.add(e[n.trueGeometry]);
  });
}

export { buildGeometry };
