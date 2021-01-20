import { mapRectangleProfileExtrusion } from "../extrusions/rectangle-profile-extrusion.js";
import { ifcTypes as t } from "../../../utils/ifc-types.js";
import { applyTransformsToGeometry } from "../../geometry-transformer/local-transform-applier.js";
import { namedProps as n } from "../../../utils/global-constants.js";
import { mainObject } from "../../scene/mainObject.js";
import { mapArbitraryProfileExtrusion, mapArbitraryProfileWithVoidsExtrusion } from "../extrusions/arbitrary-profile-extrusion.js";
import { mapCircleHollowProfileExtrusion, mapCircleProfileExtrusion } from "../extrusions/circle-profile-extrusion.js";

function mapSweptSolid(shape: any, product: any) {
  const items: any = [];
  shape[n.items].forEach((extruded: any) => items.push(mapExtrudedAreaSolid(extruded, product)));
  return joinAllExtrusions(items);
}

function joinAllExtrusions(items: any){
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  var singleGeometry = new THREE.Geometry();
  items.forEach((item: any) => {
    item.updateMatrix();
    singleGeometry.merge(item.geometry, item.matrix);
    mainObject.remove(item);
  })
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const result = new THREE.Mesh(singleGeometry);
  mainObject.add(result);
  return result;
}

function mapExtrudedAreaSolid(extruded: any, product: any) {
  const extrudedProps = getExtrusionProps(extruded);
  const solid = getExtrusionByType(extrudedProps, product);
  const position = extruded[n.position];
  applyTransformsToGeometry(solid, position);
  return solid;
}

function getExtrusionProps(extruded: any) {
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
};

function getExtrusionByType(extruded: any, product: any) {
  return extrusionTypes[extruded.ifcClass.toUpperCase()](extruded, product);
}

export { mapSweptSolid, mapExtrudedAreaSolid};
