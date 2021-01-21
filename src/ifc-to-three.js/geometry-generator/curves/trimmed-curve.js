import { createLine } from '../three-geometry/three-line.js';
import { namedProps as n, ifcUnitsValue as i } from '../../../utils/global-constants.js';
import { ifcTypes as t } from '../../../utils/ifc-types.js';

function mapTrimmedCurve(curve) {
  const typeOfTrimmedCurve = curve[n.basisCurve][n.ifcClass].toUpperCase();
  return trimmedCurvesMap[typeOfTrimmedCurve].line(curve);
}

function mapTrimmedCurveAsShape(shape, curve) {
  const typeOfTrimmedCurve = curve[n.basisCurve][n.ifcClass].toUpperCase();
  return trimmedCurvesMap[typeOfTrimmedCurve].shape(shape, curve);
}

const trimmedCurvesMap = {
  [t.IfcCircle]: { shape: mapTrimmedCircleShape, line: mapTrimmedCircleLine }
};

function mapTrimmedCircleLine(curve) {
  const { x, y, radius, trims } = getCircleInfo(curve);
  const circleCurve = new THREE.EllipseCurve(x, y, radius, radius, trims[0], trims[1], false, 0);
  const points = circleCurve.getPoints(50).map((point) => [point.x, point.y]);
  return createLine(points);
}

//Three.js draw shapes continuously
//(the last point of the current curve is the closest to the first point of the next curve)
//But circles in IFC doesn't follow this rule necessarily
//This logic ensures that the curve is drawn from the closest point to the farthest one

function mapTrimmedCircleShape(shape, curve) {
  const { x, y, radius, trims, ends } = getCircleInfo(curve);
  const currentPoint = [shape.currentPoint.x, shape.currentPoint.y];
  const distancesToNextPoints = getDistancesToNextPoints(currentPoint, ends);
  distancesToNextPoints[0] < distancesToNextPoints[1]
    ? shape.absarc(x, y, radius, trims[0], trims[1], false)
    : shape.absarc(x, y, radius, trims[1], trims[0], true);
}

function getDistancesToNextPoints(currentPoint, ends) {
  return [
    getDistanceBetweenPoints(currentPoint, ends[0]),
    getDistanceBetweenPoints(currentPoint, ends[1])
  ];
}

function getCircleInfo(curve) {
  const location = curve[n.basisCurve][n.position][n.location][n.coordinates];
  const radius = curve[n.basisCurve][n.radius];
  const x = location[0];
  const y = location[1];
  const trims = getCircleTrims(curve);
  const ends = getCircleEnds(x, y, radius, trims);
  return { x, y, radius, trims, ends };
}

function getCircleTrims(curve) {
  return [getCircleTrim(curve, [n.trim1]), getCircleTrim(curve, [n.trim2])];
}

function getCircleTrim(curve, trim) {
  const rotation = curve[n.basisCurve][n.position][n.refDirection][n.dirRatios];
  const offsetAngle = Math.acos(rotation[0]);
  return (curve[trim][0][i.value] * Math.PI) / 180 + offsetAngle;
}

function getCircleEnds(x, y, radius, trims) {
  return [getCircleEnd(x, y, radius, trims[0]), getCircleEnd(x, y, radius, trims[1])];
}

function getCircleEnd(x, y, radius, angle) {
  return [Math.cos(angle) * radius + x, Math.sin(angle) * radius + y];
}

function getDistanceBetweenPoints(point1, point2) {
  const a = point1[0] - point2[0];
  const b = point1[1] - point2[1];
  return Math.sqrt(a * a + b * b);
}

export { mapTrimmedCurve, mapTrimmedCurveAsShape };
