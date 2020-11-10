import {
  defaultValue,
  geometryTypes as g,
  namedProps as n,
  pivots as p,
  structuredData as s,
  typeValue as t,
} from "../utils/global-constants.js";
import { getName, ifcTypes } from "../utils/ifc-types.js";
import { getPivots } from "./ifc-pivots.js";
import { createExtrusion } from "./three-extrudes.js";
import { createLine } from "./three-lines.js";

function getRepresentations(structured) {
  structured[s.products].forEach((product) => {
    product[n.rawRepresentation] =
      product[n.representation][t.value][n.representations][t.value];
    mapRepresentation(product);
  });
}

function mapRepresentation(product) {
  const geometries = [];
  product[n.rawRepresentation].forEach((e) => {
    geometries.push(geometryMap[e[n.representationType][t.value]](e));
  });
  product[n.rawGeometry] = geometries;
}

const geometryMap = {
  [g.curve2D]: mapCurve2D,
  [g.sweptSolid]: mapSweptSolid,
};

function mapCurve2D(shape) {
  const points = [];
  shape[n.items][t.value][0][n.points][t.value].forEach((e) => {
    points.push(mapPoint(e));
  });
  return createLine(points);
}

function mapPoint(point) {
  return point[n.coordinates][t.value];
}

function mapSweptSolid(shape) {
  // const extruded = getExtrusionProps(shape);
  // if (extruded.ifcClass === getName(ifcTypes.IfcRectangleProfileDef))
  //   return mapRectangleProfileExtrusion(extruded);
}

function mapRectangleProfileExtrusion(extruded) {
  getRectProfileProps(extruded);
  const points = getRectangleProfilePoints(extruded);
  const pivots = getPivots(extruded.pivots);
  return createExtrusion(points, extruded.depth, pivots);
}

function getRectangleProfilePoints(extruded) {
  const xDim = extruded[n.xDim] / 2;
  const yDim = extruded[n.yDim] / 2;
  return [
    [-xDim, yDim],
    [xDim, yDim],
    [xDim, -yDim],
    [-xDim, -yDim],
  ];
}

function getExtrusionProps(shape) {
  const extruded = shape[n.items][t.value][0];
  const position = extruded[n.position][t.value];
  return {
    profile: extruded[n.sweptArea][t.value],
    ifcClass: extruded[n.sweptArea][t.value][n.ifcClass],
    depth: extruded[n.depth][t.value],
    direction: extruded[n.extDirection][t.value][n.dirRatios][t.value],
    pivots: {
      [p.locations]: [position[n.location][t.value][n.coordinates][t.value]],
      [p.xRotation]: [getExtrusionXAxis(position)],
      [p.zRotation]: [getExtrusionZAxis(position)],
    },
  };
}

function getExtrusionZAxis(position) {
  return position[n.axis][t.value] === defaultValue
    ? [0, 0, 1]
    : position[n.axis][t.value][n.dirRatios][t.value];
}

function getExtrusionXAxis(position) {
  return position[n.refDirection][t.value] === defaultValue
    ? [1, 0, 0]
    : position[n.refDirection][t.value][n.dirRatios][t.value];
}

function getRectProfileProps(extruded) {
  const profile = extruded.profile;
  extruded[n.xDim] = profile[n.xDim][t.value];
  extruded[n.yDim] = profile[n.yDim][t.value];

  const position = profile[n.position][t.value];
  const location = position[n.location][t.value][n.coordinates][t.value];
  extruded.pivots[p.locations].push([location[0], location[1], 0]);
  extruded.pivots[p.xRotation].push(
    position[n.refDirection][t.value][n.dirRatios][t.value]
  );
  extruded.pivots[p.zRotation].push([0, 0, 1]);
}

export { getRepresentations };
