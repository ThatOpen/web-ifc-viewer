import { geometryTypes as g, namedProps as n } from '../../utils/global-constants.js';
import { mapCurve2D } from './ifc-curve2d.js';
import { mapSweptSolid } from './ifc-sweptSolid.js';
import { mapMappedRepresentation } from './ifc-mappedRepresentation.js';
import { mapBrep } from './ifc-brep.js';

const geometryMap = {
  [g.curve2D]: mapCurve2D,
  [g.sweptSolid]: mapSweptSolid,
  [g.mappedRepresentation]: mapMappedRepresentation,
  [g.brep]: mapBrep
};

function getMappedGeometry(representation, product) {
  try {
    const representationType = getType(representation);
    return geometryMap[representationType](representation, product);
  } catch (e) {
    console.warn(e);
  }
}

function getType(representation) {
  return representation[n.representationType];
}

export { getMappedGeometry };
