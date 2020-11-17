import {
    defaultValue,
  namedProps as n,
  typeValue as v,
} from "../../utils/global-constants.js";
import { applyTransforms } from "../geometry-transformer/local-transform-applier.js";
import { trackLocalTransform } from "../geometry-transformer/local-transform-tracker.js";
import { getMappedGeometry } from "./geometry-mapper.js";

function mapMappedRepresentation(shape, product) {
  const representation = shape[n.items][v.value][0];
  console.log(representation);
  const target = getMappingTarget(representation);
  getMappingSource(product, representation);
}

function getMappingSource(product, representation){
    const source = representation[n.mappingSource][v.value];
    const origin = source[n.mappingOrigin][v.value];
    const mappedGeometry = source[n.mappedRepresentation][v.value];
    const geometry = getMappedGeometry(mappedGeometry);
    // trackLocalTransform(product, origin, n.transformOfMappedItem);
    // applyTransforms(product, geometry, n.transformOfMappedItem);
    return geometry;
}

function getMappingTarget(representation){
    const target = representation[n.mappingTarget][v.value];
    return {
        x:      getTargetAxis(target, n.axis1, [1,0,0]),
        y:      getTargetAxis(target, n.axis2, [0,1,0]),
        z:      getTargetAxis(target, n.axis3, [1,0,1]),
        origin: getTargetOrigin(target),
        scale:  target[n.scale][v.value],
    }
}

function getTargetOrigin(target){
    return target[n.localOrigin][v.value][n.coordinates][v.value];
}

function getTargetAxis(target, axis, def){
    const value = target[axis][v.value];
    return value === defaultValue ? def : value;
}

export { mapMappedRepresentation };
