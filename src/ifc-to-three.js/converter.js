import { applyTransformations } from './geometry-transformer/transformation.js';
import { constructGeometries } from './geometry-generator/geometry-map.js';
import { subtractOpenings } from './geometry-operator/openings-subtractor.js';
import { applyMaterials } from './scene/materials.js';
import { drawEdges } from './scene/edges.js';
import { applyScale } from './geometry-transformer/units-applier.js';

function buildGeometry(structured) {
  console.log(structured);
  console.time('constructGeometries');
  constructGeometries(structured);
  console.timeEnd('constructGeometries');
  console.time('applyTransformation');
  applyTransformations(structured);
  console.timeEnd('applyTransformation');
  console.time('drawEdges');
  drawEdges(structured);
  console.timeEnd('drawEdges');
  console.time('subtractOpenings');
  subtractOpenings(structured);
  console.timeEnd('subtractOpenings');
  console.time('applyMaterials');
  applyMaterials(structured);
  console.timeEnd('applyMaterials');
  console.time('applyScale');
  applyScale(structured);
  console.timeEnd('applyScale');
  return structured;
}

export { buildGeometry };
