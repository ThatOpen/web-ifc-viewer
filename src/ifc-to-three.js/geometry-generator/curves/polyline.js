import { createLine } from '../three-geometry/three-line.js';
import { namedProps as n } from '../../../utils/global-constants.js';

function mapPolyline(shape) {
  const points = [];
  shape[n.points].forEach((point) => {
    points.push(point[n.coordinates]);
  });
  return createLine(points);
}

function mapPolylineShape(shapeRepresentation) {
  const points = getShapePoints(shapeRepresentation[n.points]);
  const shape = new THREE.Shape();
  shape.moveTo(...points[0]);
  points.shift();
  points.forEach((point) => shape.lineTo(...point));
  return shape;
}

function getShapePoints(pointsRepresentation) {
  return pointsRepresentation.map((point) => {
    const coords = point[n.coordinates];
    return [-coords[1], coords[0]];
  });
}

export { mapPolyline, mapPolylineShape };
