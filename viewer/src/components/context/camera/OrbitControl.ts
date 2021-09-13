import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Box3, MathUtils, Mesh, MOUSE, PerspectiveCamera, Vector3 } from 'three';
import { Context, IfcComponent, NavigationMode } from '../../../base-types';

export class OrbitControl extends IfcComponent implements NavigationMode {
  orbitControls: OrbitControls;
  enabled = true;
  private previousScale = 0;
  private startView = {
    target: new Vector3(),
    camera: new Vector3(20, 20, 20)
  };

  constructor(private context: Context, private camera: PerspectiveCamera) {
    super(context);
    this.orbitControls = new OrbitControls(this.camera, context.getDomElement());
    this.orbitControls.minDistance = 10;
    this.orbitControls.maxDistance = 500;
    this.setupOrbitControls();
  }

  get target() {
    return this.orbitControls.target;
  }

  set minDistance(min: number) {
    this.orbitControls.minDistance = min;
  }

  set maxDistance(max: number) {
    this.orbitControls.maxDistance = max;
  }

  set homeView({ camera, target }: { camera: Vector3; target: Vector3 }) {
    this.startView.camera = camera;
    this.startView.target = target;
  }

  update(_delta: number) {
    if (this.enabled) {
      this.orbitControls.update();
    }
  }

  toggle(active: boolean) {
    // const preventAdjustment = options?.preventTargetAdjustment || false;
    if (active) {
      this.adjustTarget();
    }
    this.enabled = active;
    this.orbitControls.enabled = active;
  }

  targetItem(mesh: Mesh, useScaleFactor = true, limit = 3) {
    const center = this.context.getCenter(mesh);
    const target = this.orbitControls.target;
    let offset = new Vector3().subVectors(this.camera.position, target);
    if (useScaleFactor) {
      offset = this.applyScaleToFocus(mesh, offset, limit);
    }
    const endPosition = new Vector3().addVectors(offset, center);
    this.context.getAnimator().move(target, center);
    this.context.getAnimator().move(this.camera.position, endPosition);
  }

  goToHomeView() {
    this.context.getAnimator().move(this.camera.position, this.startView.camera);
    this.context.getAnimator().move(this.orbitControls.target, this.startView.target);
  }

  fitModelToFrame() {
    if (!this.enabled) return;
    const scene = this.context.getScene();
    const box = new Box3().setFromObject(scene.children[scene.children.length - 1]);
    const boxSize = box.getSize(new Vector3()).length();
    const boxCenter = box.getCenter(new Vector3());

    const halfSizeToFitOnScreen = boxSize * 0.5;
    const halfFovY = MathUtils.degToRad(this.camera.fov * 0.5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);

    const direction = new Vector3()
      .subVectors(this.camera.position, boxCenter)
      .multiply(new Vector3(1, 0, 1))
      .normalize();

    this.camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);

    // set target to newest loaded model
    this.orbitControls.target.copy(boxCenter);
    this.orbitControls.update();
  }

  private adjustTarget() {
    const cameraDir = new Vector3();
    this.camera.getWorldDirection(cameraDir);
    cameraDir.multiplyScalar(20);
    const center = new Vector3().addVectors(cameraDir, this.camera.position);
    this.orbitControls.target.set(center.x, center.y, center.z);
  }

  private setupOrbitControls() {
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor *= 2;
    const panWithMMB = this.context.options.panWithMMB || true;
    if (panWithMMB) {
      this.orbitControls.mouseButtons = {
        RIGHT: MOUSE.RIGHT,
        MIDDLE: MOUSE.RIGHT,
        LEFT: MOUSE.LEFT
      };
    }
  }


  private applyScaleToFocus(mesh: Mesh, offset: Vector3, limit: number) {
    const scale = this.getMeshScale(mesh, limit);
    if (this.previousScale !== 0) {
      offset = offset.multiplyScalar(scale / this.previousScale);
    }
    this.previousScale = scale;
    return offset;
  }

  private getMeshScale(mesh: Mesh, limit: number) {
    const scaleVector = new Vector3();
    mesh.geometry.boundingBox?.getSize(scaleVector);
    const scale = scaleVector.length();
    if (this.previousScale === 0) return scale;
    if (scale > this.previousScale * limit) return this.previousScale * limit;
    if (scale < this.previousScale / limit) return this.previousScale / limit;
    return scale;
  }
}
