import { mapRectangleProfileExtrusion } from "../extrusions/rectangle-profile-extrusion.js";
import { ifcTypes as t } from "../../../utils/ifc-types.js";
import { applyTransformsToGeometry } from "../../geometry-transformer/local-transform-applier.js";
import { namedProps as n } from "../../../utils/global-constants.js";
import { mainObject } from "../../scene/mainObject.js";
import { mapArbitraryProfileExtrusion, mapArbitraryProfileWithVoidsExtrusion } from "../extrusions/arbitrary-profile-extrusion.js";
import { mapCircleHollowProfileExtrusion, mapCircleProfileExtrusion } from "../extrusions/circle-profile-extrusion.js";
import { mapIShapeProfileExtrusion } from "../extrusions/i-shape-profile-extrusion.js";

function mapSweptSolid(shape) {
  const items = [];
  shape[n.items].forEach((extruded) => items.push(mapExtrudedAreaSolid(extruded)));
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

function mapExtrudedAreaSolid(extruded) {
  const extrudedProps = getExtrusionProps(extruded);
  const solid = getExtrusionByType(extrudedProps);
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
  [t.IfcCircleHollowProfileDef]: mapCircleHollowProfileExtrusion,
  [t.IfcArbitraryClosedProfileDef]: mapArbitraryProfileExtrusion,
  [t.IfcArbitraryProfileDefWithVoids]: mapArbitraryProfileWithVoidsExtrusion,
  [t.IfcIShapeProfileDef]: mapIShapeProfileExtrusion,
};

function getExtrusionByType(extruded, product) {
  return extrusionTypes[extruded.ifcClass.toUpperCase()](extruded, product);
}

export { mapSweptSolid, mapExtrudedAreaSolid};
