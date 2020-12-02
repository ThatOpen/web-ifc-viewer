import CSG from '../../libs/CSGMesh.js';
import { structuredData as s, namedProps as n } from '../../utils/global-constants.js';

function applyBooleanOperations(structured) {
  const object3D = new THREE.Object3D();
  structured[s.products].forEach((product) => {
    if (product[n.hasOpenings]) {
      for (let i = 0; i < product[n.geometry].length; i++) {
        const geometryItem = product[n.geometry][i];
        const openings = product[n.hasOpenings];

        if (geometryItem.type === 'Mesh' && !geometryItem[n.isBrep]) {
          geometryItem.geometry.computeFaceNormals();
          geometryItem.updateMatrix();
          let bspA = CSG.fromMesh(geometryItem);

          for (let i = 0; i < openings.length; i++) {
            const opening = openings[i][n.geometry][0];
            opening.updateMatrix();
            let bspB = CSG.fromMesh(opening);
            bspA = bspA.subtract(bspB);
          }

          const result = CSG.toMesh(bspA, geometryItem.matrix);
          result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);

          result.material = new THREE.MeshPhongMaterial();
          object3D.add(result);
          // scene.remove(geometryItem);
          product[n.geometry][i] = result;
        }
      }
    }
  });

  return object3D;
}

export { applyBooleanOperations };
