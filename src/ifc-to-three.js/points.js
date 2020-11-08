import { scene } from "./scene.js";

const sprite = new THREE.TextureLoader().load(
  "../../resources/images/point.png"
);

function createPoint(coordinates) {
  var dotGeometry = new THREE.Geometry();
  dotGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
  var dotMaterial = new THREE.PointsMaterial({
    size: 10,
    map: sprite,
    sizeAttenuation: false,
    alphaTest: 0.5,
  });

  dotMaterial.color.setRGB(1, 0.3, 0.3);
  var dot = new THREE.Points(dotGeometry, dotMaterial);
  dot.position.x = dot.position.x + coordinates[0];
  dot.position.z = dot.position.z + coordinates[1];
  dot.position.y = dot.position.y + coordinates[3] ? coordinates[3] : 0;
  scene.add(dot);
}

export { createPoint };
