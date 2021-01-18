function createExtrusionsByPoints(points, depth, dir = [0, 0, 1], holes) {
  const shapePoints = [];
  points.forEach((e) => shapePoints.push(new THREE.Vector3(e[1], -e[0])));
  const shape = new THREE.Shape(shapePoints);
  if (holes) holes.forEach((hole) => shape.holes.push(hole));
  return createExtrusion(shape, depth, dir);
}

function createCircularExtrusion(radius, depth, dir = [0, 0, 1], thickness) {
  const segments = 36;
  const outerShape = createCircularShape(radius, segments);
  if (thickness) {
    const innerShape = createCircularShape(radius - thickness, segments);
    outerShape.holes.push(innerShape);
  }
  return createExtrusion(outerShape, depth, (dir = [0, 0, 1]));
}

function createTubularExtrusion(radius, depth, dir = [0, 0, 1], thickness) {
  return createCircularExtrusion(radius, depth, dir, thickness);
}

function createCircularShape(radius, segments) {
  const coordinates = getCircleCoordinates(radius, segments);
  const shape = new THREE.Shape();
  shape.moveTo(...coordinates[0]);
  coordinates.shift;
  coordinates.forEach((point) => shape.lineTo(...point));
  return shape;
}

function getCircleCoordinates(radius, steps) {
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

function createExtrusion(shape, depth, dir = [0, 0, 1]) {
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const extrudeSettings = getExtrudeSettings(depth, dir);
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  applyExtrusionDirection(dir, geometry);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.updateMatrix();
  return mesh;
}

function getExtrudeSettings(depth, dir) {
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

function applyExtrusionDirection(dir, geometry) {
  const matrix = getTransformMatrix(dir);
  geometry.applyMatrix4(matrix);
}

function getTransformMatrix(dir) {
  const matrix = new THREE.Matrix4();
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

function getVerticalDirection(depth, dir) {
  const v1 = new THREE.Vector3(0, 0, 0);
  const v2 = new THREE.Vector3(0, 0, depth * dir[2]);
  return new THREE.LineCurve3(v1, v2);
}

export {
  createExtrusionsByPoints,
  createCircularExtrusion,
  createTubularExtrusion,
  createExtrusion
};
