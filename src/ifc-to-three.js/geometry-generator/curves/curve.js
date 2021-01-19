import { createLine } from "../three-geometry/three-line.js";
import { namedProps as n } from "../../../utils/global-constants.js";
import { ifcTypes as t } from "../../../utils/ifc-types.js";

function mapCurve2D(shape) {
  return mapCurve(shape[n.items][0]);
}

function mapCurve(shape){
  const ifcClass = shape[n.ifcClass].toUpperCase();
  return curve2DMap[ifcClass](shape);
}

const curve2DMap = {
  [t.IfcPolyline]: mapPolyline,
  [t.IfcTrimmedCurve]: mapTrimmedCurve,
}

function mapPolyline(shape){
  const points = [];
  shape[n.points].forEach((point) => {
    points.push(point[n.coordinates]);
  });
  return createLine(points);
}

function mapTrimmedCurve(shape){
  //TODO
  console.log("TODO:", shape);
  return new THREE.Object3D();
}

export { mapCurve, mapCurve2D };