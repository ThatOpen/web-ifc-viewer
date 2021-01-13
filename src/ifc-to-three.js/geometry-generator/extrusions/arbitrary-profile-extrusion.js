import { createExtrusion, createExtrusionsByPoints } from '../three-extrusion.js';
import { ifcTypes as t } from '../../../utils/ifc-types.js';
import { namedProps as n, ifcUnitsValue as i } from '../../../utils/global-constants.js';
import {scene} from '../../../../examples/00/three-scene.js'

function mapArbitraryProfileExtrusion(extruded) {
  return mapExtrusionByTypeOfProfile(extruded);
}

function mapArbitraryProfileWithVoidsExtrusion(extruded) {
  // getInnerVoids(extruded);
  return mapExtrusionByTypeOfProfile(extruded);
}

function mapExtrusionByTypeOfProfile(extruded) {
  const typeOfProfile = extruded.profile[n.outerCurve][n.ifcClass].toUpperCase();
  return extrusionCurvesMap[typeOfProfile](extruded);
}

const extrusionCurvesMap = {
  [t.IfcPolyline]: mapPolylineExtrusion,
  [t.IfcCompositeCurve]: mapCompositeCurveExtrusion
};

function mapPolylineExtrusion(extruded) {
  const points = getArbitraryProfilePoints(extruded);
  return createExtrusionsByPoints(points, extruded.depth);
}

function mapCompositeCurveExtrusion(extruded) {
  const shape = new THREE.Shape();
  const segmentsRepresentation = extruded.profile[n.outerCurve][n.segments];
  segmentsRepresentation.forEach((curve) => mapCompositeCurveSegment(shape, curve));
  resetFirstCompositeCurve();
  const extrusion = createExtrusion(shape, extruded.depth, extruded.direction);
  extrusion.rotation.z += Math.PI / 2;
  extrusion.updateMatrix();
  return extrusion;
}

function mapCompositeCurveSegment(shape, segmentRepresentation) {
  const curve = segmentRepresentation[n.parentCurve];
  const typeOfCurve = curve[n.ifcClass].toUpperCase();
  compositeCurvesMap[typeOfCurve](shape, curve);
}

const compositeCurvesMap = {
  [t.IfcPolyline]: mapPolylineSegment,
  [t.IfcTrimmedCurve]: mapTrimmedCurveSegment
};

function mapPolylineSegment(shape, curve) {
  const points = curve[n.points];
  if (isFirstSegmentOfCompositeCurve) {
    shape.moveTo(...points[0][n.coordinates]);
    points.shift();
    isFirstSegmentOfCompositeCurve = false;
  }
  points.forEach((point) => shape.lineTo(...point[n.coordinates]));
}

function mapTrimmedCurveSegment(shape, curve) {
  const typeOfTrimmedCurve = curve[n.basisCurve][n.ifcClass].toUpperCase();
  trimmedCurvesMap[typeOfTrimmedCurve](shape, curve);
}

const trimmedCurvesMap = {
  [t.IfcCircle]: mapTrimmedCircleCurve
};

//Three.js draw shapes continuously 
//(the last point of the current curve is the closest to the first point of the next curve)
//But circles in IFC doesn't follow this pattern necessarily
//This function computes the closest point of the next arc
//To determine wether to draw the circle clockwise or counter-clockwise

function mapTrimmedCircleCurve(shape, curve) {
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
  const trims = getTrimmedCircleTrims(curve);
  const ends = getTrimmedCircleEnds(x, y, radius, trims);
  return { x, y, radius, trims, ends };
}

function getTrimmedCircleTrims(curve) {
  return [getTrimmedCircleTrim(curve, [n.trim1]), getTrimmedCircleTrim(curve, [n.trim2])];
}

function getTrimmedCircleTrim(curve, trim) {
  const rotation = curve[n.basisCurve][n.position][n.refDirection][n.dirRatios];
  const offsetAngle = Math.acos(rotation[0]);
  return (curve[trim][0][i.value] * Math.PI) / 180 + offsetAngle;
}

function getTrimmedCircleEnds(x, y, radius, trims) {
  return [getCirclePoint(x, y, radius, trims[0]), getCirclePoint(x, y, radius, trims[1])];
}

function getCirclePoint(x, y, radius, angle) {
  return [Math.cos(angle) * radius + x, Math.sin(angle) * radius + y];
}

function getDistanceBetweenPoints(point1, point2) {
  const a = point1[0] - point2[0];
  const b = point1[1] - point2[1];
  return Math.sqrt(a * a + b * b);
}

function getArbitraryProfilePoints(extruded) {
  const profileRepresentation = extruded.profile;
  const pointsRepresentation = profileRepresentation[n.outerCurve][n.points];
  return getPoints(pointsRepresentation);
}

function getPoints(pointsRepresentation) {
  return pointsRepresentation.map((point) => {
    const coords = point[n.coordinates];
    return [-coords[0], -coords[1]];
  });
}

function getInnerVoids(extruded) {
  //TODO
  console.log('TODO:', extruded);
  return new THREE.Object3D();
}

//Three.js needs to know the first point of the first curve to create a shape

let isFirstSegmentOfCompositeCurve = true;

function resetFirstCompositeCurve() {
  isFirstSegmentOfCompositeCurve = true;
}

export { mapArbitraryProfileExtrusion, mapArbitraryProfileWithVoidsExtrusion };
