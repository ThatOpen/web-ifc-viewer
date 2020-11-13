import { namedProps as n, pivots } from "../../utils/global-constants.js";
import { getHorizontalRotation } from "./rotation.js";
import { scene } from "../scene/three-scene.js";

function applyTransforms(product, property) {
  const pivots = getPivots(product, property);
  product[n.geometry].forEach((geometry) => applyTransform(geometry, pivots));
}

function applyTransformsTo(product, geometry, property) {
  const pivots = getPivots(product, property);
  applyTransform(geometry, pivots);
}

function applyTransform(geometry, pivots) {
  if (geometry) {
    bindGeometryToPivots(geometry, pivots);
    scene.add(pivots[0]);
    scene.attach(geometry);
    scene.remove(pivots[0]);
  }
}

function bindGeometryToPivots(geometry, pivots) {
  pivots[pivots.length - 1].add(geometry);
}

function getPivots(product, property) {
  const transform = product[property];
  const p = [];
  for (let i = transform[pivots.locations].length - 1; i >= 0; i--) {
    const pivot = new THREE.Object3D();
    // pivot.rotation.z = -getHorizontalRotation(transform[pivots.zRotation][i]);
    // pivot.rotation.x = getHorizontalRotation(transform[pivots.zRotation][i]);
    pivot.rotation.y = getHorizontalRotation(transform[pivots.xRotation][i]);
    const loc = transform[pivots.locations][i];
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

export { applyTransforms, applyTransformsTo };
