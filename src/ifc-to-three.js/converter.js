import {
  namedProps as n,
  structuredData as s,
} from "../utils/global-constants.js";
import { applyTransformations } from "./geometry-transformer/transformation.js";
import { getRepresentations } from "./geometry-generator/geometry-mapper.js";
import { scene } from "./scene/three-scene.js";

function buildGeometry(structured) {
  getRepresentations(structured);
  applyTransformations(structured);
  structured[s.products].forEach((e) => {
    scene.add(e[n.trueGeometry]);
  });
}

export { buildGeometry };
