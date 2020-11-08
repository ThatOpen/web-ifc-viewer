import { scene } from "./three-scene.js";

function createExtruded(points, depth) {
  // Material for mesh
  var material = new THREE.MeshPhongMaterial({ color: 0xffffff });

  const shapePoints = [];
  points.forEach((e) => {
    console.log(e);
    shapePoints.push(new THREE.Vector3(e[0], e[1]));
  });

  // Shape to extrude
  var shape = new THREE.Shape(shapePoints);

  var v1 = new THREE.Vector3(0, 0, 0);
  var v2 = new THREE.Vector3(0, depth, 0);
  var path = new THREE.LineCurve3(v1, v2);
  var extrudeSettings2 = {
    bevelEnabled: false,
    steps: 1,
    extrudePath: path,
  };
  var geometry2 = new THREE.ExtrudeGeometry(shape, extrudeSettings2);
  var mesh2 = new THREE.Mesh(geometry2, material);
  scene.add(mesh2);
}
export { createExtruded };
