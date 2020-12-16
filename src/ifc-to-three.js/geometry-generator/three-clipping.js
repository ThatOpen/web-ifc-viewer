function createClippingBox(orientation) {
  const geometry = new THREE.BoxBufferGeometry(30, 30, 5);
  const mesh = new THREE.Mesh(geometry);
  const direction = orientation ? -1 : 1;
  mesh.position.z += 2.5 * direction;
  mesh.updateMatrix();
  return mesh;
}

export { createClippingBox };
