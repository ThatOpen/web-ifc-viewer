function createExtrusionsByPoints(points: any, depth: any, dir = [0, 0, 1], holes: any) {
  const shapePoints: any = [];
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  points.forEach((e: any) => shapePoints.push(new THREE.Vector3(e[1], -e[0])));
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const shape = new THREE.Shape(shapePoints);
  if (holes) holes.forEach((hole: any) => shape.holes.push(hole));
  return createExtrusion(shape, depth, dir);
}

function createCircularExtrusion(radius: any, depth: any, dir = [0, 0, 1], thickness: any) {
  const segments = 36;
  const outerShape = createCircularShape(radius, segments);
  if (thickness) {
    const innerShape = createCircularShape(radius - thickness, segments);
    outerShape.holes.push(innerShape);
  }
  return createExtrusion(outerShape, depth, (dir = [0, 0, 1]));
}

function createTubularExtrusion(radius: any, depth: any, dir = [0, 0, 1], thickness: any) {
  return createCircularExtrusion(radius, depth, dir, thickness);
}

function createCircularShape(radius: any, segments: any) {
  const coordinates = getCircleCoordinates(radius, segments);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const shape = new THREE.Shape();
  shape.moveTo(...coordinates[0]);
  coordinates.shift;
  coordinates.forEach((point) => shape.lineTo(...point));
  return shape;
}

function getCircleCoordinates(radius: any, steps: any) {
  const coords = [];
  for (let i = 0; i < steps; i++) {
    coords.push([
      radius * Math.cos(2 * Math.PI * (i / steps)),
      radius * Math.sin(2 * Math.PI * (i / steps))
    ]);
  }
  coords.push([...coords[0]]);
  return coords;
}

function createExtrusion(shape: any, depth: any, dir = [0, 0, 1]) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const extrudeSettings = getExtrudeSettings(depth, dir);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  applyExtrusionDirection(dir, geometry);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const mesh = new THREE.Mesh(geometry, material);
  mesh.updateMatrix();
  return mesh;
}

function getExtrudeSettings(depth: any, dir: any) {
  const path = getVerticalDirection(depth, dir);
  return {
    bevelEnabled: false,
    steps: 1,
    extrudePath: path
  };
}

//To define the direction of the extrusion:
// x and y are applied as a skew operation (transform matrix)
// z is applied in the vertical direction

function applyExtrusionDirection(dir: any, geometry: any) {
  const matrix = getTransformMatrix(dir);
  geometry.applyMatrix4(matrix);
}

function getTransformMatrix(dir: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const matrix = new THREE.Matrix4();
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const direction = new THREE.Vector3(dir[0], dir[1], dir[2]);
  const Syx = 0,
    Sxy = 0,
    Sxz = 0,
    Syz = 0;
  const Szx = direction.y,
    Szy = direction.x;
    return matrix.set(   1, Syx,  Szx,  0, 
                       Sxy,   1,  Szy,  0, 
                       Sxz, Syz,    1,  0, 
                         0,   0,    0,  1);
}

function getVerticalDirection(depth: any, dir: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const v1 = new THREE.Vector3(0, 0, 0);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const v2 = new THREE.Vector3(0, 0, depth * dir[2]);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  return new THREE.LineCurve3(v1, v2);
}

export {
  createExtrusionsByPoints,
  createCircularExtrusion,
  createTubularExtrusion,
  createExtrusion
};
