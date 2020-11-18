import { scene } from "../scene/three-scene.js";
import {
  structuredData as s,
  namedProps as n,
} from "../../utils/global-constants.js";

function applyBooleanOperations(structured) {
  structured[s.products].forEach((product) => {
    if (product[n.hasOpenings]) {
      var openings = product[n.hasOpenings];

      var wall = product[n.geometry][1];
      var bsp_A = new ThreeBSP(wall);
      var bsp_Subtraction = bsp_A;

      for (let i = 0; i < openings.length; i++) {
        var opening = openings[i][n.geometry][0];
        console.log(opening);
        const opening2 = opening.clone();
        opening2.position.z = 3;
        var bsp_Y = new ThreeBSP(opening);
        var bsp_Subtraction = bsp_Subtraction.subtract(bsp_Y);
        // scene.remove(opening);
      }

      var bsp_mesh = bsp_Subtraction.toMesh();
      bsp_mesh.material = new THREE.MeshPhongMaterial();
      bsp_mesh.geometry.computeFaceNormals();


      scene.add(bsp_mesh);
      scene.remove(wall);
    }
  });
}

export { applyBooleanOperations };
