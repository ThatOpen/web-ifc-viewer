import { scene } from "../scene/three-scene.js";

function createFace(faceDefinition) {
  const coordinates = faceDefinition.coordinates;
  const orientation = faceDefinition.orientation ? [0,0,1] : [0,0,-1];
  const length = coordinates.length;
  const faces = [];

//Credit to the following algorithm: 
//https://stackoverflow.com/questions/50272399/three-js-2d-object-in-3d-space-by-vertices/50274103#50274103
  
  var points = [];
  coordinates.forEach(p => {
    points.push(new THREE.Vector3(p[0], p[1], p[2]));
  });
  
  var tri = new THREE.Triangle(points[2], points[1], points[0]);
  var normal = new THREE.Vector3();
  tri.getNormal(normal);
  
  var baseNormal = new THREE.Vector3(0, 0, 1);
  var quaternion = new THREE.Quaternion().setFromUnitVectors(normal, baseNormal);
  
  var tempPoints = [];
  points.forEach(p => {
    tempPoints.push(p.clone().applyQuaternion(quaternion));
  })
  
  var shape = new THREE.Shape(tempPoints);
  var shapeGeom = new THREE.ShapeGeometry(shape);
  var mesh = new THREE.Mesh(shapeGeom, new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
  }));

  mesh.geometry.vertices = points;
  mesh.geometry.computeVertexNormals();
  return mesh;
}

  
export { createFace };
