import { mainObject } from "../../scene/mainObject.js";

function createPoint(coordinates: any) {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const dotGeometry = new THREE.Geometry();
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  dotGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const dotMaterial = new THREE.PointsMaterial({
    size: 10,
    sizeAttenuation: false,
    alphaTest: 0.5,
  });

  dotMaterial.color.setRGB(1, 0.3, 0.3);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  const dot = new THREE.Points(dotGeometry, dotMaterial);
  dot.position.x = dot.position.x + coordinates[0];
  dot.position.y = dot.position.y + coordinates[1];
  dot.position.z = dot.position.z + coordinates[2];
  mainObject.add(dot);
}

export { createPoint };
