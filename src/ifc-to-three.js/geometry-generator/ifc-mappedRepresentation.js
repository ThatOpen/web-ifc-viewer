import { defaultValue, namedProps as n } from "../../utils/global-constants.js";
import { applyTransformsTo } from "../geometry-transformer/local-transform-applier.js";
import { trackLocalTransform } from "../geometry-transformer/local-transform-tracker.js";
import { getMappedGeometry } from "./geometry-mapper.js";

function mapMappedRepresentation(shape, product) {
  const representation = shape[n.items][0];
  const target = getMappingTarget(representation);
  const mapped = getMappingSource(product, representation);
  applyTransformation(product, target, mapped);
  return mapped;
}

function getMappingSource(product, representation) {
  const source = representation[n.mappingSource];
  const origin = source[n.mappingOrigin];
  const mappedGeometry = source[n.mappedRepresentation];
  const geometry = getMappedGeometry(mappedGeometry, product);
  applyTransformation(product, origin, geometry);
  return geometry;
}

function applyTransformation(product, origin, geometry) {
  trackLocalTransform(product, origin, n.transformOfMappedItem);
  applyTransformsTo(product, geometry, n.transformOfMappedItem);
}

//The mapping target defines the transformation of the mapped items
//Generally, the transformation is read from IfcAxis2Placement instances
//This is an exception: data needs to be structured like an IfcAxis2Placement

function getMappingTarget(representation) {
  const target = representation[n.mappingTarget];
  return {
    [n.location]: { [n.coordinates]: getTargetOrigin(target) },
    [n.refDirection]: { [n.dirRatios]: getAxis(target, n.axis1, [1, 0, 0]) },
    [n.axis]: { [n.dirRatios]: getAxis(target, n.axis3, [0, 0, 1]) },
    [n.scale]: target[n.scale],
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
