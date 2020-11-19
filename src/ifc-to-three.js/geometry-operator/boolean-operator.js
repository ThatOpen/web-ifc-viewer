import { scene } from "../scene/three-scene.js";
import CSG from "../../../libs/CSGMesh.js";
import {
  structuredData as s,
  namedProps as n,
} from "../../utils/global-constants.js";

function applyBooleanOperations(structured) {
  structured[s.products].forEach((product) => {
    if (product[n.hasOpenings]) {

      var openings = product[n.hasOpenings];
      var wall = product[n.geometry][1];
      var result = wall;

      for (let i = 0; i < openings.length; i++) {
        var opening = openings[i][n.geometry][0];
        
        result.updateMatrix();
        var bspA = CSG.fromMesh(result);
        opening.updateMatrix();
        var bspB = CSG.fromMesh(opening);
        
        var subtracted = bspA.subtract(bspB);
        result = CSG.toMesh(subtracted, wall.matrix);
        
        opening.material = new THREE.MeshPhongMaterial({color: 0xff0000});
        scene.remove(opening);
      }

      result.geometry = new THREE.BufferGeometry().fromGeometry(result.geometry);
      result.material = new THREE.MeshPhongMaterial();
      scene.add(result);
      scene.remove(wall);
      product[n.geometry][1] = result;
    }
  });
}

export { applyBooleanOperations };
