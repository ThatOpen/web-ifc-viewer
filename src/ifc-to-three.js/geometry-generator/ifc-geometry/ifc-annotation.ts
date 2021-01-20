import { namedProps as n } from '../../../utils/global-constants.js';

function mapAnnotation(shape: any) {
    //TODO
  console.log("TODO:", shape);
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'THREE'.
  return new THREE.Object3D();
}

export { mapAnnotation };
