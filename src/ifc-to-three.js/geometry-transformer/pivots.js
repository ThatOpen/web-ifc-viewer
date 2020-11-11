import { pivots } from "../../utils/global-constants.js";
import { getHorizontalRotation } from "./rotation.js";

function getPivots(transform) {
  console.log(transform);
  const p = [];
  for (let i = transform[pivots.locations].length - 1; i >= 0; i--) {
    const pivot = new THREE.Object3D();
    const loc = transform[pivots.locations][i];
    pivot.rotation.y = getHorizontalRotation(transform[pivots.xRotation][i]);
    pivot.position.set(loc[1], loc[2], loc[0]);
    p.push(pivot);
  }
  bindPivots(p);
  return p;
}

function bindPivots(pivots) {
  for (let i = 0; i < pivots.length; i++) {
    if (pivots[i + 1]) pivots[i].add(pivots[i + 1]);
  }
}

export { getPivots };
