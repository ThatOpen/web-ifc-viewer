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
  [t.IfcCircle]: { shape: mapTrimmedCircleShape, line: mapTrimmedCircleLine },
  [t.IfcEllipse]: { shape: mapTrimmedEllipseShape, line: mapTrimmedCircleLine }
};

function mapTrimmedCircleLine(curve) {
  const { x, y, radius, trims } = getCircleInfo(curve);
  const circleCurve = new THREE.EllipseCurve(x, y, radius, radius, trims[0], trims[1], false, 0);
  const points = circleCurve.getPoints(50).map((point) => [point.x, point.y]);
  return createLine(points);
}

function mapTrimmedEllipseLine(curve){
  //TODO
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

function mapTrimmedEllipseShape(shape, curve) {
  const { x, y, a, b, trims, ends } = getEllipseInfo(curve);
  const currentPoint = [shape.currentPoint.x, shape.currentPoint.y];
  const distancesToNextPoints = getDistancesToNextPoints(currentPoint, ends);
  distancesToNextPoints[0] < distancesToNextPoints[1]
    ? shape.absellipse(x, y, a, b, trims[0], trims[1], false)
    : shape.absellipse(x, y, a, b, trims[1], trims[0], true);
}

function getCircleInfo(curve) {
  const radius = curve[n.basisCurve][n.radius];
  const { x, y } = getCurveLocation(curve);
  const trims = getCurveTrims(curve);
  const ends = getCircleEnds(x, y, radius, trims);
  return { x, y, radius, trims, ends };
}

function getEllipseInfo(curve) {
  const { x, y } = getCurveLocation(curve);
  const a = curve[n.basisCurve][n.semiAxis1];
  const b = curve[n.basisCurve][n.semiAxis2];
  const trims = getCurveTrims(curve);
  const ends = getEllipseEnds(x, y, a, b, trims);
  return { x, y, a, b, trims, ends };
}

function getCurveLocation(curve) {
  const loc = curve[n.basisCurve][n.position][n.location][n.coordinates];
  return { x: loc[0], y: loc[1] };
}

function getCurveTrims(curve) {
  return [getCurveTrim(curve, [n.trim1]), getCurveTrim(curve, [n.trim2])];
}

function getCurveTrim(curve, trim) {
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

function getEllipseEnds(x, y, a, b, trims) {
  return [
    getEllipseEnd(x, y, a, b, trims[0]),
    getEllipseEnd(x, y, a, b, trims[1])
  ];
}

function getEllipseEnd(x, y, a, b, trim) {
  const radiansAngle = trim * Math.PI / 180;
  const factor = trim > 3*Math.PI/2 || trim < Math.PI/2 ? -1 : 1;
  const endX = (a * b) / Math.sqrt(b*b + a*a*Math.tan(radiansAngle)) * factor;
  const endY = x * Math.tan(radiansAngle);
  return {endX, endY}
}

function getDistancesToNextPoints(currentPoint, ends) {
  return [
    getDistanceBetweenPoints(currentPoint, ends[0]),
    getDistanceBetweenPoints(currentPoint, ends[1])
  ];
}

function getDistanceBetweenPoints(point1, point2) {
  const a = point1[0] - point2[0];
  const b = point1[1] - point2[1];
  return Math.sqrt(a * a + b * b);
}

export { mapTrimmedCurve, mapTrimmedCurveAsShape };
