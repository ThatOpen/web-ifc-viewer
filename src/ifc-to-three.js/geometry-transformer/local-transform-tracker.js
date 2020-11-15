import {
  defaultValue as def,
  namedProps as n,
  pivots as p,
  typeValue as t,
} from "../../utils/global-constants.js";

function trackLocalTransform(product, placement, property) {
  const transform = initializeTransform(product, property);
  const { locat, xAxis, yAxis, zAxis } = getTransform(placement);
  transform[p.locat].push(locat);
  transform[p.xAxis].push(xAxis);
  transform[p.yAxis].push(yAxis);
  transform[p.zAxis].push(zAxis);
}

function initializeTransform(product, property) {
  if (!product[property])
  product[property] = {
      [p.locat] : [],
      [p.xAxis] : [],
      [p.yAxis] : [],
      [p.zAxis] : [],
    };
  return product[property];
}

function getTransform(placement) {
  const locat = getLocat(placement);
  const xAxis = getAxisX(placement);
  const zAxis = getAxisZ(placement);
  const yAxis = getAxisY(zAxis, xAxis);
  return {locat, xAxis, yAxis, zAxis  };
}

function getLocat(placement) {
  const location = placement[n.location][t.value][n.coordinates][t.value];
  return location.map((e) => (e === undefined ? 0 : e));
}

function getAxisX(placement) {
  if (isInvalid(placement[n.refDirection])) return [1, 0, 0];
  const x = placement[n.refDirection][t.value][n.dirRatios][t.value];
  const xAxis = [x[0], -x[1], x[2]]
  return xAxis.map((e) => (e === undefined ? 0 : e));
}

function getAxisZ(placement) {
  if (isInvalid(placement[n.axis])) return [0, 0, 1];
  const IfcAxisZ = placement[n.axis][t.value][n.dirRatios][t.value];
  return IfcAxisZ.map((e) => (e === undefined ? 0 : e));
}

//In IFC the axis Y is implicit (computed from X and Z)

function getAxisY(X, Z) {
  return [
    X[1] * Z[2] - X[2] * Z[1],
    X[2] * Z[0] - X[0] * Z[2],
    X[0] * Z[1] - X[1] * Z[0],
  ];
}

function isInvalid(prop) {
  if (!prop || prop[t.value] === def) return true;
  return false;
}

export { trackLocalTransform };
