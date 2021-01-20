import { namedProps as n, pivots as p } from "../../utils/global-constants.js";
import { mainObject } from "../scene/mainObject.js";
import { getTransformOfGeometry } from "./local-transform-tracker.js";

function applyTransforms(product: any, property: any) {
  const pivots = getPivots(product[property]);
  product[n.geometry].forEach((geometry: any) => applyTransform(geometry, pivots));
}

function applyTransformsTo(product: any, geometry: any, property: any) {
  const pivots = getPivots(product[property]);
  applyTransform(geometry, pivots);
  resetTransformData(product, property);
}

function resetTransformData(product: any, property: any) {
  product[property] = {
    [p.locat]: [],
    [p.xAxis]: [],
    [p.yAxis]: [],
    [p.zAxis]: [],
  };
}

function applyTransformsToGeometry(geometry: any, placement: any){
  const transform = getTransformOfGeometry(placement);
  const pivots = getPivots(transform);
  applyTransform(geometry, pivots);
}

function applyTransform(geometry: any, pivots: any) {
  if (geometry) {
    bindGeometryToPivots(geometry, pivots);
    mainObject.add(pivots[0]);
    attachGeometryToScene(geometry);
    mainObject.remove(pivots[0]);
  }
}

// @ts-expect-error ts-migrate(7023) FIXME: 'attachGeometryToScene' implicitly has return type... Remove this comment to see the full error message
function attachGeometryToScene(geometry: any) {
  if (geometry.constructor === Array)
    return geometry.forEach((e) => attachGeometryToScene(e));
  return mainObject.attach(geometry);
}

// @ts-expect-error ts-migrate(7023) FIXME: 'bindGeometryToPivots' implicitly has return type ... Remove this comment to see the full error message
function bindGeometryToPivots(geometry: any, pivots: any) {
  if (geometry.constructor === Array)
    return geometry.forEach((e) => bindGeometryToPivots(e, pivots));
  pivots[pivots.length - 1].add(geometry);
}

function getPivots(transform: any) {
  const pivots = [];
  const locations = transform[p.locat] || [];
  for (let i = locations.length - 1; i >= 0; i--) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
    const pivot = new THREE.Object3D();
    pivot.rotation.setFromRotationMatrix(getRotMat(transform, i));
    pivot.position.set(...locations[i]);
    pivots.push(pivot);
  }
  bindPivots(pivots);
  return pivots;
}

function bindPivots(pivots: any) {
  for (let i = 0; i < pivots.length; i++) {
    if (pivots[i + 1]) pivots[i].add(pivots[i + 1]);
  }
}

function getRotMat(transform: any, index: any) {
  const { x, y, z } = getTransforms(transform, index);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const directionMatrix = new THREE.Matrix4();
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const rotationMatrix = new THREE.Matrix4();
  directionMatrix.set(
    x[0], x[1], x[2], 0,
    y[0], y[1], y[2], 0,
    z[0], z[1], z[2], 0,
      0,    0,    0,  1
  );
  rotationMatrix.getInverse(directionMatrix);
  return rotationMatrix;
}

function getTransforms(transform: any, index: any) {
  const x = transform[p.xAxis][index];
  const y = transform[p.yAxis][index];
  const z = transform[p.zAxis][index];
  return { x, y, z };
}

export { applyTransforms, applyTransformsTo, applyTransformsToGeometry };
