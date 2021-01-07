import { createCircularExtrusion } from '../three-extrusion.js';
import { namedProps as n } from '../../../utils/global-constants.js';
import { applyTransformsToGeometry } from '../../geometry-transformer/local-transform-applier.js';

function mapCircleProfileExtrusion(extruded) {
  const position = extruded.profile[n.position];
  const radius = extruded.profile[n.radius];
  const cylinder = createCircularExtrusion(radius, extruded.depth);
  applyTransformsToGeometry(cylinder, position);
  return cylinder;
}

function mapCircleHollowProfileExtrusion(extruded) {
  //TODO
  console.log("TODO:", extruded);
  return new THREE.Object3D();
}

export { mapCircleProfileExtrusion, mapCircleHollowProfileExtrusion };
