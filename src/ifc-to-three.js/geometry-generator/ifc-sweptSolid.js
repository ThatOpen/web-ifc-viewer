import { mapRectangleProfileExtrusion } from "./ifc-profileRectangle.js";
import { ifcTypes as t } from "../../utils/ifc-types.js";
import { mapArbitraryProfileExtrusion } from "./ifc-profileArbitrary.js";
import { applyTransformsToGeometry } from "../geometry-transformer/local-transform-applier.js";
import { namedProps as n } from "../../utils/global-constants.js";
import { mapArbitraryProfileWithVoidsExtrusion } from "./ifc-profileArbitraryWithVoids.js";
import { mainObject } from "../scene/mainObject.js";
import { mapCircleProfileExtrusion } from "./ifc-profileCircle.js";

function mapSweptSolid(shape, product) {
  const items = [];
  shape[n.items].forEach((extruded) => items.push(mapExtrudedAreaSolid(extruded, product)));
  return joinAllExtrusions(items);
}

function joinAllExtrusions(items){
  var singleGeometry = new THREE.Geometry();
  items.forEach((item)=>{
    item.updateMatrix();
    singleGeometry.merge(item.geometry, item.matrix);
    mainObject.remove(item);
  })
  const result = new THREE.Mesh(singleGeometry);
  mainObject.add(result);
  return result;
}

function mapExtrudedAreaSolid(extruded, product) {
  const extrudedProps = getExtrusionProps(extruded);
  const solid = getExtrusionByType(extrudedProps, product);
  const position = extruded[n.position];
  applyTransformsToGeometry(solid, position);
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

export { mapSweptSolid, mapExtrudedAreaSolid};
