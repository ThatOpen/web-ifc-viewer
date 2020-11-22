import { mapRectangleProfileExtrusion } from "./ifc-profileRectangle.js";
import { getName, ifcTypes as t } from "../../utils/ifc-types.js";
import { mapArbitraryProfileExtrusion } from "./ifc-profileArbitrary.js";
import { trackLocalTransform } from "../geometry-transformer/local-transform-tracker.js";
import { applyTransformsTo } from "../geometry-transformer/local-transform-applier.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { mapArbitraryProfileWithVoidsExtrusion } from "./ifc-profileArbitraryWithVoids.js";
import { scene } from "../scene/three-scene.js";
import { mapCircleProfileExtrusion } from "./ifc-profileCircle.js";

function mapSweptSolid(shape, product) {
  const items = [];
  shape[n.items].forEach((extruded) => items.push(newSolid(product, extruded)));
  return joinAllExtrusions(items);
}

function joinAllExtrusions(items){
  var singleGeometry = new THREE.Geometry();
  items.forEach((item)=>{
    item.updateMatrix();
    singleGeometry.merge(item.geometry, item.matrix);
    scene.remove(item);
  })
  const result = new THREE.Mesh(singleGeometry);
  scene.add(result);
  return result;
}

//Beware: the creation of the solid must occur BEFORE trackLocalTransformation()
//Because the local transformations are tracked from inside to outside
//Same logic as IfcLocalPlacement used to locate the products

function newSolid(product, extruded) {
  const extrudedProps = getExtrusionProps(extruded);
  const solid = getExtrusionByType(extrudedProps, product);
  const position = extruded[n.position];
  trackLocalTransform(product, position, n.transformOfExtrusion);
  applyTransformsTo(product, solid, n.transformOfExtrusion);
  return solid;
}

function getExtrusionProps(extruded) {
  return {
    profile: extruded[n.sweptArea],
    ifcClass: extruded[n.sweptArea][n.ifcClass],
    depth: extruded[n.depth],
    direction: extruded[n.extDirection][n.dirRatios],
  };
}

const extrusionTypes = {
  [t.IfcRectangleProfileDef]: mapRectangleProfileExtrusion,
  [t.IfcCircleProfileDef]: mapCircleProfileExtrusion,
  [t.IfcArbitraryClosedProfileDef]: mapArbitraryProfileExtrusion,
  [t.IfcArbitraryProfileDefWithVoids]: mapArbitraryProfileWithVoidsExtrusion,
};

function getExtrusionByType(extruded, product) {
  return extrusionTypes[extruded.ifcClass.toUpperCase()](extruded, product);
}

export { mapSweptSolid };
