import { scene } from "../scene/three-scene.js";
import CSG from "../../../libs/CSGMesh.js";
import {
  structuredData as s,
  namedProps as n,
} from "../../utils/global-constants.js";

function applyBooleanOperations(structured) {
  structured[s.products].forEach((product) => {
    if (product[n.hasOpenings]) {
      for (let i = 0; i < product[n.geometry].length; i++) {
        const geometryItem = product[n.geometry][i];
        const openings = product[n.hasOpenings];

        if (geometryItem.type === "Mesh" && !geometryItem[n.isBrep]) {
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
          result.geometry = new THREE.BufferGeometry().fromGeometry(
            result.geometry
          );

          for (let i = 0; i < openings.length; i++) {
            const opening = openings[i][n.geometry][0];
            result.attach(opening);
          }

          result.material = new THREE.MeshPhongMaterial();
          scene.add(result);
          scene.remove(geometryItem);
          product[n.geometry][i] = result;
        }
      }
    }
  });
}

export { applyBooleanOperations };
