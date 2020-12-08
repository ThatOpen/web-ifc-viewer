function createExtrusionsByPoints(points, depth) {
  //Profile
  const shapePoints = [];
  points.forEach((e) => shapePoints.push(new THREE.Vector3(e[1], -e[0])));
  var shape = new THREE.Shape(shapePoints);
  return createExtrusion(shape, depth);
}

function createCircularExtrusion(radius, depth) {
  const geometry = new THREE.CylinderGeometry(radius, radius, depth, 64);
  const mesh = new THREE.Mesh(geometry);
  mesh.rotation.x =  Math.PI / 2;
  mesh.position.z = depth / 2;
  mesh.updateMatrix();
  return mesh;
}

function createExtrusion(shape, depth) {
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
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

export { createExtrusionsByPoints, createCircularExtrusion };
