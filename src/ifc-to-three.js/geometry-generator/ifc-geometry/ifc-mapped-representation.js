import { defaultValue, namedProps as n } from '../../../utils/global-constants.js';
import { applyTransformsToGeometry } from '../../geometry-transformer/local-transform-applier.js';
import { mainObject } from '../../scene/mainObject.js';
import { getMappedGeometry } from '../geometry-map.js';

function mapMappedRepresentation(shape, product) {
  const representation = shape[n.items][0];
  const target = getMappingTarget(representation);
  const mapped = getMappingSource(product, representation);
  applyTransformsToGeometry(mapped, target);
  return mapped;
}

//The concept of mapped representation is that there are several instances
//of the same geometry. Storing the geometries allows to generate them
//only once and them simply create each instance copying the source geometry.

const mappingSources = {};

function getMappingSource(product, representation) {
  const source = representation[n.mappingSource];
  const origin = source[n.mappingOrigin];
  const geometry = isGeometryGenerated(source)
    ? getGeneratedGeometry(source)
    : generateGeometry(source, product);
  applyTransformsToGeometry(geometry, origin);
  return geometry;
}

function generateGeometry(source, product) {
  const mappedGeometry = source[n.mappedRepresentation];
  const geometry = getMappedGeometry(mappedGeometry, product);
  mappingSources[source[n.expressId]] = geometry;
  mainObject.remove(geometry);
  return geometry.clone();
}

function isGeometryGenerated(source) {
  return mappingSources[source[n.expressId]] ? true : false;
}

function getGeneratedGeometry(source) {
  return mappingSources[source[n.expressId]].clone();
}

//The mapping target defines the transformation of the mapped items
//Generally, in IFC the transformation is read from IfcAxis2Placement instances
//This is an exception: data needs to be structured like an IfcAxis2Placement
//to avoid poluting the transformation logic

function getMappingTarget(representation) {
  const target = representation[n.mappingTarget];
  return {
    [n.location]: { [n.coordinates]: getTargetOrigin(target) },
    [n.refDirection]: { [n.dirRatios]: getAxis(target, n.axis1, [1, 0, 0]) },
    [n.axis]: { [n.dirRatios]: getAxis(target, n.axis3, [0, 0, 1]) },
    [n.scale]: target[n.scale]
  };
}

function getTargetOrigin(target) {
  return target[n.localOrigin][n.coordinates];
}

function getAxis(target, axis, def) {
  const value = target[axis];
  return value === defaultValue ? def : value;
}

export { mapMappedRepresentation };
