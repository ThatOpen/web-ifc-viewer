function createPoint(coordinates) {
  var dotGeometry = new THREE.Geometry();
  dotGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
  var dotMaterial = new THREE.PointsMaterial({
    size: 10,
    sizeAttenuation: false,
    alphaTest: 0.5
  });

  dotMaterial.color.setRGB(1, 0.3, 0.3);
  var dot = new THREE.Points(dotGeometry, dotMaterial);
  dot.position.x = dot.position.x + coordinates[0];
  dot.position.y = dot.position.y + coordinates[1];
  dot.position.z = dot.position.z + coordinates[2];
  return point;
}

export { createPoint };
