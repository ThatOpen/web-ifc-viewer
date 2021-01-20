import { defaultValue, namedProps as n } from '../../../utils/global-constants.js';
import { applyTransformsToGeometry } from '../../geometry-transformer/local-transform-applier.js';
import { mainObject } from '../../scene/mainObject.js';
import { getMappedGeometry } from '../geometry-map.js';

// @ts-expect-error ts-migrate(7023) FIXME: 'mapMappedRepresentation' implicitly has return ty... Remove this comment to see the full error message
function mapMappedRepresentation(shape: any, product: any) {
  const representation = shape[n.items][0];
  const target = getMappingTarget(representation);
  // @ts-expect-error ts-migrate(7022) FIXME: 'mapped' implicitly has type 'any' because it does... Remove this comment to see the full error message
  const mapped = getMappingSource(product, representation);
  applyTransformsToGeometry(mapped, target);
  return mapped;
}

//The concept of mapped representation is that there are several instances
//of the same geometry. Storing the geometries allows to generate them
//only once and them simply create each instance copying the source geometry.

const mappingSources = {};

// @ts-expect-error ts-migrate(7023) FIXME: 'getMappingSource' implicitly has return type 'any... Remove this comment to see the full error message
function getMappingSource(product: any, representation: any) {
  const source = representation[n.mappingSource];
  const origin = source[n.mappingOrigin];
  // @ts-expect-error ts-migrate(7022) FIXME: 'geometry' implicitly has type 'any' because it do... Remove this comment to see the full error message
  const geometry = isGeometryGenerated(source)
    ? getGeneratedGeometry(source)
    : generateGeometry(source, product);
  applyTransformsToGeometry(geometry, origin);
  return geometry;
}

// @ts-expect-error ts-migrate(7023) FIXME: 'generateGeometry' implicitly has return type 'any... Remove this comment to see the full error message
function generateGeometry(source: any, product: any) {
  const mappedGeometry = source[n.mappedRepresentation];
  // @ts-expect-error ts-migrate(7022) FIXME: 'geometry' implicitly has type 'any' because it do... Remove this comment to see the full error message
  const geometry = getMappedGeometry(mappedGeometry, product);
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  mappingSources[source[n.expressId]] = geometry;
  mainObject.remove(geometry);
  return geometry.clone();
}

function isGeometryGenerated(source: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return mappingSources[source[n.expressId]] ? true : false;
}

function getGeneratedGeometry(source: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return mappingSources[source[n.expressId]].clone();
}

//The mapping target defines the transformation of the mapped items
//Generally, in IFC the transformation is read from IfcAxis2Placement instances
//This is an exception: data needs to be structured like an IfcAxis2Placement
//to avoid poluting the transformation logic

function getMappingTarget(representation: any) {
  const target = representation[n.mappingTarget];
  return {
    [n.location]: { [n.coordinates]: getTargetOrigin(target) },
    [n.refDirection]: { [n.dirRatios]: getAxis(target, n.axis1, [1, 0, 0]) },
    [n.axis]: { [n.dirRatios]: getAxis(target, n.axis3, [0, 0, 1]) },
    [n.scale]: target[n.scale]
  };
}

function getTargetOrigin(target: any) {
  return target[n.localOrigin][n.coordinates];
}

function getAxis(target: any, axis: any, def: any) {
  const value = target[axis];
  return value === defaultValue ? def : value;
}

export { mapMappedRepresentation };
