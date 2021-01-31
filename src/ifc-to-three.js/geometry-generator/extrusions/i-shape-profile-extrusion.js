import { createIShapeExtrusion } from '../three-geometry/three-extrusion.js';
import { namedProps as n } from '../../../utils/global-constants.js';
import { applyTransformsToGeometry } from '../../geometry-transformer/local-transform-applier.js';

function mapIShapeProfileExtrusion(props) {
  const position = props.profile[n.position];
  const geometry = createIShapeExtrusion(props.profile, props.depth, props.direction);
  applyTransformsToGeometry(geometry, position);
  return geometry;
}

export { mapIShapeProfileExtrusion };
