import { createCircularExtrusion, createTubularExtrusion } from '../three-geometry/three-extrusion.js';
import { namedProps as n } from '../../../utils/global-constants.js';
import { applyTransformsToGeometry } from '../../geometry-transformer/local-transform-applier.js';

function mapCircleProfileExtrusion(extruded) {
  const { position, radius } = getProperties(extruded);
  const cylinder = createCircularExtrusion(radius, extruded.depth);
  applyTransformsToGeometry(cylinder, position);
  return cylinder;
}

function mapCircleHollowProfileExtrusion(extruded) {
  const { position, radius, thickness } = getProperties(extruded);
  const tube = createTubularExtrusion(radius, extruded.depth, extruded.direction, thickness);
  applyTransformsToGeometry(tube, position);
  return tube;
}

function getProperties(extruded) {
  return {
    position: extruded.profile[n.position],
    radius: extruded.profile[n.radius],
    thickness: extruded.profile[n.wallThickness]
  };
}

export { mapCircleProfileExtrusion, mapCircleHollowProfileExtrusion };
