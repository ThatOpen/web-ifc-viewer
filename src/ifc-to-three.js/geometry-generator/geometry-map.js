import { geometryTypes as g, namedProps as n } from '../../utils/global-constants.js';
import { mapCurve2D } from './ifc-curve2d.js';
import { mapExtrudedAreaSolid, mapSweptSolid } from './ifc-sweptSolid.js';
import { mapMappedRepresentation } from './ifc-mappedRepresentation.js';
import { mapBrep } from './ifc-brep.js';
import { mapGeometricSet } from './ifc-geometricSet.js';
import { mapClipping } from './ifc-clipping.js';

const geometryMap = {
  [g.curve2D]: mapCurve2D,
  [g.sweptSolid]: mapSweptSolid,
  [g.mappedRepresentation]: mapMappedRepresentation,
  [g.brep]: mapBrep,
  [g.geometricSet]: mapGeometricSet,
  [g.clipping]: mapClipping,
  [g.extrudedAreaSolid]: mapExtrudedAreaSolid,
};

function getMappedGeometry(representation, product) {
  const type = getType(representation);
  try {
    return geometryMap[type](representation, product);
  } catch (e) {
    console.warn(`Error with item ${product[n.ifcClass]} of type ${type}: ${e}`);
  }
}

function getType(representation) {
  const type = representation[n.representationType];
  return type ? type : representation[n.ifcClass];
}

export { getMappedGeometry };
