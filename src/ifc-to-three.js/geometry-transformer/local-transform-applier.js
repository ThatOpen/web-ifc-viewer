import { namedProps as n, pivots as p } from '../../utils/global-constants.js';
import { resetTransformData } from './local-transform-reseter.js';

function applyTransforms(product, property) {
  const pivots = getPivots(product[property]);
  product[n.geometry].forEach((geometry) => applyTransform(geometry, pivots));
}

function applyTransformsTo(product, geometry, property) {
  const pivots = getPivots(product[property]);
  applyTransform(geometry, pivots);
  resetTransformData(product, property);
}

function applyTransform(geometry, pivots) {
  const object3D = new THREE.Object3D();
  if (geometry) {
    bindGeometryToPivots(geometry, pivots);
    object3D.add(pivots[0]);
    attachGeometryToScene(geometry, object3D);
    object3D.remove(pivots[0]);
  }
}

function attachGeometryToScene(geometry, object3D) {
  if (geometry.constructor === Array)
    return geometry.forEach((e) => attachGeometryToScene(e, object3D));
  return object3D.attach(geometry);
}

function bindGeometryToPivots(geometry, pivots) {
  if (geometry.constructor === Array)
    return geometry.forEach((e) => bindGeometryToPivots(e, pivots));
  pivots[pivots.length - 1].add(geometry);
}

function getPivots(transform) {
  const pivots = [];
  const locations = transform[p.locat] || [];
  for (let i = locations.length - 1; i >= 0; i--) {
    const pivot = new THREE.Object3D();
    pivot.rotation.setFromRotationMatrix(getRotMat(transform, i));
    pivot.position.set(...locations[i]);
    pivots.push(pivot);
  }
  bindPivots(pivots);
  return pivots;
}

function bindPivots(pivots) {
  for (let i = 0; i < pivots.length; i++) {
    if (pivots[i + 1]) pivots[i].add(pivots[i + 1]);
  }
}

function getRotMat(transform, index) {
  const { x, y, z } = getTransforms(transform, index);
  const directionMatrix = new THREE.Matrix4();
  const rotationMatrix = new THREE.Matrix4();
  directionMatrix.set(
    x[0],
    x[1],
    x[2],
    0,
    y[0],
    y[1],
    y[2],
    0,
    z[0],
    z[1],
    z[2],
    0,
    0,
    0,
    0,
    1
  );
  rotationMatrix.getInverse(directionMatrix);
  return rotationMatrix;
}

function getTransforms(transform, index) {
  const x = transform[p.xAxis][index];
  const y = transform[p.yAxis][index];
  const z = transform[p.zAxis][index];
  return { x, y, z };
}

export { applyTransforms, applyTransformsTo };
