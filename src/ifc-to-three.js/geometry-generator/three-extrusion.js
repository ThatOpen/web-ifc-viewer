function createExtrusionsByPoints(points, depth, dir = [0,0,1]) {
  //Profile
  const shapePoints = [];
  points.forEach((e) => shapePoints.push(new THREE.Vector3(e[1], -e[0])));
  var shape = new THREE.Shape(shapePoints);
  return createExtrusion(shape, depth, dir);
}

function createCircularExtrusion(radius, depth) {
  const geometry = new THREE.CylinderGeometry(radius, radius, depth, 64);
  const mesh = new THREE.Mesh(geometry);
  mesh.rotation.x =  Math.PI / 2;
  mesh.position.z = depth / 2;
  mesh.updateMatrix();
  return mesh;
}

function createExtrusion(shape, depth, dir = [0,0,1]) {
  // Material for mesh
  var material = new THREE.MeshPhongMaterial({ color: 0xffffff });

  //Direction
  var v1 = new THREE.Vector3(0, 0, 0);
  var v2 = new THREE.Vector3(0, 0, depth);
  var path = new THREE.LineCurve3(v1, v2);

  //Settings
  var extrudeSettings = {
    bevelEnabled: false,
    steps: 1,
    extrudePath: path,
  };

  //Mesh
  var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  //Extrusion direction
  var matrix = new THREE.Matrix4();
  var direction = new THREE.Vector3(dir[0], dir[1], dir[2]);

  var Syx = 0,
    Szx = direction.y,
    Sxy = 0,
    Szy = direction.x,
    Sxz = 0,
    Syz = 0;
  
      matrix.set(   1,   Syx,  Szx,   0,
                  Sxy,     1,  Szy,   0,
                  Sxz,   Syz,    1,   0,
                    0,     0,    0,   1);

  geometry.applyMatrix4( matrix );

  var mesh = new THREE.Mesh(geometry, material);
  mesh.updateMatrix();
  return mesh;
}

export { createExtrusionsByPoints, createCircularExtrusion };
