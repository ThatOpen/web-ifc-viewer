import { createCircularExtrusion, createTubularExtrusion } from '../three-geometry/three-extrusion.js';
import { namedProps as n } from '../../../utils/global-constants.js';
import { applyTransformsToGeometry } from '../../geometry-transformer/local-transform-applier.js';

function mapCircleProfileExtrusion(extruded: any) {
  const { position, radius } = getProperties(extruded);
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
  const cylinder = createCircularExtrusion(radius, extruded.depth);
  applyTransformsToGeometry(cylinder, position);
  return cylinder;
}

function mapCircleHollowProfileExtrusion(extruded: any) {
  const { position, radius, thickness } = getProperties(extruded);
  const tube = createTubularExtrusion(radius, extruded.depth, extruded.direction, thickness);
  applyTransformsToGeometry(tube, position);
  return tube;
}

function getProperties(extruded: any) {
  return {
    position: extruded.profile[n.position],
    radius: extruded.profile[n.radius],
    thickness: extruded.profile[n.wallThickness]
  };
}

export { mapCircleProfileExtrusion, mapCircleHollowProfileExtrusion };
