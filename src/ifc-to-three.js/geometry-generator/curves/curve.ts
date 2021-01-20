import { createLine } from "../three-geometry/three-line.js";
import { namedProps as n } from "../../../utils/global-constants.js";
import { ifcTypes as t } from "../../../utils/ifc-types.js";

function mapCurve2D(shape: any) {
  return mapCurve(shape[n.items][0]);
}

function mapCurve(shape: any){
  const ifcClass = shape[n.ifcClass].toUpperCase();
  return curve2DMap[ifcClass](shape);
}

const curve2DMap = {
  [t.IfcPolyline]: mapPolyline,
  [t.IfcTrimmedCurve]: mapTrimmedCurve,
}

function mapPolyline(shape: any){
  const points: any = [];
  shape[n.points].forEach((point: any) => {
    points.push(point[n.coordinates]);
  });
  return createLine(points);
}

function mapTrimmedCurve(shape: any){
  //TODO
  console.log("TODO:", shape);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  return new THREE.Object3D();
}

export { mapCurve, mapCurve2D };