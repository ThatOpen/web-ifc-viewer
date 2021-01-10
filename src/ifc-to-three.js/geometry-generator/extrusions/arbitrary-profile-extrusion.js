import { createExtrusionsByPoints } from '../three-extrusion.js';
import { namedProps as n } from '../../../utils/global-constants.js';
import { ifcTypes as t } from '../../../utils/ifc-types.js';

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

let isFirstSegment = true;

function mapCompositeCurveExtrusion(extruded) {
  console.warn(extruded);
  const shape = new THREE.Shape();
  const segmentsRepresentation = extruded.profile[n.outerCurve][n.segments];
  segmentsRepresentation.forEach((curve) => mapCompositeCurveSegment(shape, curve));
  isFirstSegment = true;
  return new THREE.Mesh(new THREE.BoxGeometry());
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
  console.error('Polyline: ', curve);
  const points = curve[n.points];
  if (isFirstSegment) return mapFirstPolylineSegment(shape, points);
  points.forEach((point) => shape.lineTo(...point[n.coordinates]));
}

function mapTrimmedCurveSegment(shape, curve) {
  console.error('TrimmedCurve: ', curve);
  const basisCurve = curve[n.basisCurve];
  const typeOfTrimmedCurve = basisCurve[n.ifcClass].toUpperCase();
  trimmedCurvesMap[typeOfTrimmedCurve](shape, curve);
}

const trimmedCurvesMap = {
  [t.IfcCircle]: mapTrimmedCircleCurve
};

function mapTrimmedCircleCurve(shape, curve) {
  console.error('TrimmedCircle: ', curve);
}

//If the segment is the first one of the curve, the origin of the shape
//Needs to be set as the first point of this segment

function mapFirstPolylineSegment(shape, points) {
  shape.moveTo(...points[0][n.coordinates]);
  points.shift();
  isFirstSegment = false;
}

function mapFirstTrimmedCurveSegment(shape, points) {
  isFirstSegment = false;
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

export { mapArbitraryProfileExtrusion, mapArbitraryProfileWithVoidsExtrusion };
