import { applyTransformations } from './geometry-transformer/transformation.js';
import { constructGeometries } from './geometry-generator/geometry-map.js';
import { subtractOpenings } from './geometry-operator/openings-subtractor.js';
import { applyMaterials } from './scene/materials.js';
import { drawEdges } from './scene/edges.js';
import { applyScale } from './geometry-transformer/units-applier.js';

function buildGeometry(structured: any) {
  console.log(structured);
  constructGeometries(structured);
  applyTransformations(structured);
  drawEdges(structured);
  subtractOpenings(structured);
  applyMaterials(structured);
  applyScale(structured);
  return structured;
}

export { buildGeometry };
