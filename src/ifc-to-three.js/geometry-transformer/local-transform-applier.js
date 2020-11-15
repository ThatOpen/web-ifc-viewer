import { namedProps as n, pivots } from "../../utils/global-constants.js";
import { getHorizontalRotation, getVerticalRotation } from "./rotation.js";
import { createAxes, scene } from "../scene/three-scene.js";

function applyTransforms(product, property) {
  const pivots = getPivots(product, property);
  product[n.geometry].forEach((geometry) => applyTransform(geometry, pivots));
}

function applyTransformsTo(product, geometry, property) {
  const pivots = getPivots(product, property);
  applyTransform(geometry, pivots);
}

function applyTransform(geometry, pivots) {
  showLocalOrigins(pivots);
  if (geometry) {
    bindGeometryToPivots(geometry, pivots);
    scene.add(pivots[0]);
    scene.attach(geometry);
    // scene.remove(pivots[0]);
  }
}

function bindGeometryToPivots(geometry, pivots) {
  pivots[pivots.length - 1].add(geometry);
}

function getPivots(product, property) {
  const transform = product[property];
  const locations = transform[pivots.locations] || [];
  const p = [];
  for (let i = locations.length - 1; i >= 0; i--) {
    const pivot = new THREE.Object3D();
    // pivot.rotation.z = getVerticalRotation(transform[pivots.zRotation][i]);
    pivot.rotation.y = getHorizontalRotation(transform[pivots.xRotation][i]);
    pivot.position.set(...locations[i]);
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

function showLocalOrigins(pivots) {
  pivots.forEach((pivot) => pivot.add(createAxes()));
}

export { applyTransforms, applyTransformsTo };
