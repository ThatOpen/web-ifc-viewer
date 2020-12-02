import { applyTransformations } from './geometry-transformer/transformation.js';
import { constructGeometries } from './geometry-generator/geometry-mapper.js';
import { applyBooleanOperations } from './geometry-operator/boolean-operator.js';
import { applyMaterials } from './scene/materials.js';
import { drawEdges } from './scene/edges.js';

function buildGeometry(structured) {
  console.log(structured);
  const object3D = new THREE.Object3D();
  constructGeometries(structured);
  applyTransformations(structured);
  const edges = drawEdges(structured);
  const operations = applyBooleanOperations(structured);
  applyMaterials(structured);

  object3D.add(edges);
  object3D.add(operations);

  return object3D;
}

export { buildGeometry };
