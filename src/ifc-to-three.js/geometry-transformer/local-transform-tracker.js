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
  transform[p.locations].push(getLocation(position));
  transform[p.xRotation].push(getAxisX(position));
  transform[p.zRotation].push([0, 1, 0]);
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
  const loc = placement[n.location][t.value][n.coordinates][t.value];
  const translatedLoc = [loc[1], loc[2], loc[0]];
  return translatedLoc.map((e) => (e === undefined ? 0 : e));
}

function getAxisX(placement) {
  if (placement[n.refDirection][t.value] === def) return [0, 0, 1];
  const xRot = placement[n.refDirection][t.value][n.dirRatios][t.value];
  const translatedXRot = [xRot[1], xRot[2], xRot[0]];
  return translatedXRot.map((e) => (e === undefined ? 0 : e));
}

function getAxisZ(placement) {
  if (!placement[n.axis] || placement[n.axis][t.value] === def)
    return [0, 1, 0];
  const zRot = placement[n.axis][t.value][n.dirRatios][t.value];
  const translatedZRot = [zRot[1], zRot[2], zRot[0]];
  return translatedZRot.map((e) => (e === undefined ? 0 : e));
}

export { trackLocalTransform, trackProfileTransform };
