import { scene } from "../scene/three-scene.js";
import { createPoint } from "./three-points.js";

function createFace(faceDefinition) {
  const coordinates = faceDefinition.coordinates;

  //Credit to the following algorithm:
  //https://stackoverflow.com/questions/50272399/three-js-2d-object-in-3d-space-by-vertices/50274103#50274103

  var points = [];
  coordinates.forEach((p) => {
    points.push(new THREE.Vector3(p[0], p[1], p[2]));
  });

  var tri = new THREE.Triangle(points[2], points[1], points[0]);
  var normal = new THREE.Vector3();
  tri.getNormal(normal);
  var baseNormal = new THREE.Vector3(0, 0, 1);
  var quaternion = new THREE.Quaternion().setFromUnitVectors(
    normal,
    baseNormal
  );

  var tempPoints = [];
  points.forEach((p) => {
    tempPoints.push(p.clone().applyQuaternion(quaternion));
  });

  var shape = new THREE.Shape(tempPoints);
  var shapeGeom = new THREE.ShapeGeometry(shape, 24);

  //If the given array doesn't have the expected order 
  //The faces could not be generated
  //Retry this with the inverse order
  if (shapeGeom.faces.length === 0) {
    const inverseCoords = [...coordinates].reverse();
    return createFace({coordinates: inverseCoords});
  }

  var mesh = new THREE.Mesh(
    shapeGeom,
    new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    })
  );
  mesh.geometry.vertices = points;
  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
  return mesh;
}

export { createFace };
