import { createExtrusion, createExtrusionsByPoints } from '../three-geometry/three-extrusion.js';
import { ifcTypes as t } from '../../../utils/ifc-types.js';
import { namedProps as n } from '../../../utils/global-constants.js';
import { mapPolylineShape } from '../curves/polyline.js';
import { mapCompositeCurveShape } from '../curves/composite-curve.js';

function mapArbitraryProfileExtrusion(props) {
  return mapExtrusionByTypeOfProfile(props);
}

function mapArbitraryProfileWithVoidsExtrusion(props) {
    props.holes = getInnerVoids(props);
    return mapExtrusionByTypeOfProfile(props);
}

function getInnerVoids(props) {
  const shapes = [];
  const innerCurvesRep = props.profile[n.innerCurves];
  innerCurvesRep.forEach((curveRep) => {
    const typeOfProfile = curveRep[n.ifcClass].toUpperCase();
    shapes.push(extrusionCurvesMap[typeOfProfile].shape(curveRep));
  });
  return shapes;
}

function mapExtrusionByTypeOfProfile(props) {
  const typeOfProfile = props.profile[n.outerCurve][n.ifcClass].toUpperCase();
  return extrusionCurvesMap[typeOfProfile].extrusion(props);
}

const extrusionCurvesMap = {
  [t.IfcPolyline]: { extrusion: mapPolylineExtrusion, shape: mapPolylineShape },
  [t.IfcCompositeCurve]: { extrusion: mapCompositeCurveExtrusion, shape: mapCompositeCurveShape }
};

function mapPolylineExtrusion(props) {
  const profileRepresentation = props.profile;
  const pointsRepresentation = profileRepresentation[n.outerCurve][n.points];
  const points = getExtrusionPoints(pointsRepresentation);
  return createExtrusionsByPoints(points, props.depth, props.direction, props.holes);
}

function mapCompositeCurveExtrusion(props) {
  const segments = props.profile[n.outerCurve][n.segments];
  const shape = mapCompositeCurveShape(props, segments);
  if (props.holes) props.holes.forEach((hole) => shape.holes.push(hole));
  const extrusion = createExtrusion(shape, props.depth, props.direction);
  extrusion.rotation.z += Math.PI / 2;
  extrusion.updateMatrix();
  return extrusion;
}

function getExtrusionPoints(pointsRepresentation) {
  return pointsRepresentation.map((point) => {
    const coords = point[n.coordinates];
    return [-coords[0], -coords[1]];
  });
}

export { mapArbitraryProfileExtrusion, mapArbitraryProfileWithVoidsExtrusion };
