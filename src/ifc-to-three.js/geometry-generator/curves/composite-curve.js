import { namedProps as n, ifcUnitsValue as i } from '../../../utils/global-constants.js';
import { ifcTypes as t } from '../../../utils/ifc-types.js';
import { mapTrimmedCurveAsShape } from './trimmed-curve.js';

function mapCompositeCurveShape(props, segments) {
  const shape = new THREE.Shape();
  const segmentsRepresentation = segments || props[n.segments];
  segmentsRepresentation.forEach((curve) => mapCompositeCurveSegment(shape, curve));
  resetFirstCompositeCurve();
  return shape;
}

function mapCompositeCurveSegment(shape, segmentRepresentation) {
  const curve = segmentRepresentation[n.parentCurve];
  const typeOfCurve = curve[n.ifcClass].toUpperCase();
  compositeCurvesMap[typeOfCurve](shape, curve);
}

const compositeCurvesMap = {
  [t.IfcPolyline]: mapPolylineSegment,
  [t.IfcTrimmedCurve]: mapTrimmedCurveAsShape
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

let isFirstSegmentOfCompositeCurve = true;

function resetFirstCompositeCurve() {
  isFirstSegmentOfCompositeCurve = true;
}

export { mapCompositeCurveShape };
