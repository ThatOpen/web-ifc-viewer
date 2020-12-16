function createClippingBox(clippingRep) {
  //const geometry = new THREE.BoxBufferGeometry(100, 100, 20);
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const mesh = new THREE.Mesh(geometry);

  // TODO Use direction (normal) from half space solid to determine rotation of the box
  // mesh.rotation.x =  ...
  // Offset in z direction so that base/top of box is cutting surface
  //mesh.position.z = 10;
  mesh.updateMatrix();
  return mesh;
}

export { createClippingBox };
