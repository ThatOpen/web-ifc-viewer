import {
  defaultValue as def,
  namedProps as n,
  pivots as p,
  typeValue as t,
} from "../../utils/global-constants.js";

function trackLocalTransform(product, placement, property) {
  const transform = initializeTransform(product, property);
  transform[p.locations].push(getLocation(placement));
  transform[p.xRotation].push(getAxisX(placement));
  transform[p.zRotation].push(getAxisZ(placement));
}

function trackProfileTransform(product, profile) {
  const transform = initializeTransform(product, n.transformOfExtrusion);
  const position = profile[n.position][t.value];
  const location = position[n.location][t.value][n.coordinates][t.value];
  const xRot = getAxisX(position);
  transform[p.locations].push([location[0], location[1], 0]);
  transform[p.xRotation].push([xRot[0], xRot[1], 0]);
  transform[p.zRotation].push([0, 0, 1]);
}

function initializeTransform(product, property) {
  if (!product[property])
    product[property] = {
      [p.locations]: [],
      [p.xRotation]: [],
      [p.zRotation]: [],
    };
  return product[property];
}

function getLocation(placement) {
  return placement[n.location][t.value][n.coordinates][t.value];
}

function getAxisX(placement) {
  if (placement[n.refDirection][t.value] === def) return [1, 0, 0];
  return placement[n.refDirection][t.value][n.dirRatios][t.value];
}

function getAxisZ(placement) {
  if (!placement[n.axis] || placement[n.axis][t.value] === def)
    return [0, 0, 1];
  return placement[n.axis][t.value][n.dirRatios][t.value];
}

export { trackLocalTransform, trackProfileTransform };
