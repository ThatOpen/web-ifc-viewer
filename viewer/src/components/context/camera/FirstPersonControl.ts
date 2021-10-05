import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { Camera, Vector3 } from 'three';
import {
  CameraProjections,
  Context,
  dimension,
  IfcComponent,
  NavigationMode,
  NavigationModes
} from '../../../base-types';
import { IfcCamera } from './camera';
import { LiteEvent } from '../../../utils/LiteEvent';

export class FirstPersonControl extends IfcComponent implements NavigationMode {
  controls: PointerLockControls;
  enabled = false;
  readonly mode = NavigationModes.FirstPerson;

  private prevTime = performance.now();
  private velocity = new Vector3();
  private direction = new Vector3();
  private speed = 200;

  public readonly onChange = new LiteEvent();
  public readonly onUnlock = new LiteEvent();
  public readonly onChangeProjection = new LiteEvent<Camera>();

  private keyBinding = {
    forward: {
      active: false,
      keys: ['KeyW', 'ArrowUp']
    },
    back: {
      active: false,
      keys: ['KeyS', 'ArrowDown']
    },
    right: {
      active: false,
      keys: ['KeyD', 'ArrowRight']
    },
    left: {
      active: false,
      keys: ['KeyA', 'ArrowLeft']
    },
    up: {
      active: false,
      keys: ['KeyR']
    },
    down: {
      active: false,
      keys: ['KeyF']
    }
  };

  private controlsMap = {
    [dimension.z]: [this.keyBinding.forward, this.keyBinding.back],
    [dimension.x]: [this.keyBinding.right, this.keyBinding.left],
    [dimension.y]: [this.keyBinding.up, this.keyBinding.down]
  };

  private readonly dimensions = [dimension.x, dimension.y, dimension.z];

  constructor(context: Context, camera: Camera, ifcCamera: IfcCamera) {
    super(context);
    this.controls = new PointerLockControls(camera, context.getDomElement());
    this.controls.addEventListener('unlock', (event: any) => {
      ifcCamera.setNavigationMode(NavigationModes.Orbit);
      this.onUnlock.trigger(event);
    });
    this.controls.addEventListener('change', (event: any) => {
      this.onChange.trigger(event);
    });
    context.getScene().add(this.controls.getObject());
  }

  toggle(active: boolean) {
    this.enabled = active;
    if (active) this.enable();
    else this.disable();
  }

  update(_delta: number) {
    if (this.enabled && this.controls.isLocked) {
      const currentTime = performance.now();
      const delta = (currentTime - this.prevTime) / 1000;
      this.move(delta);
      this.prevTime = currentTime;
    }
  }

  get projection() {
    return CameraProjections.Perspective;
  }

  /**
   * @deprecated Use onChange.on() instead.
   */
  submitOnChange(action: (event: any) => void) {
    this.onChange.on(action);
  }

  /**
   * @deprecated Use onChange.on() instead.
   */
  submitOnUnlock(action: (event: any) => void) {
    this.onUnlock.on(action);
  }

  private enable() {
    if (!this.controls.isLocked) this.controls.lock();
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  private disable() {
    if (this.controls.isLocked) this.controls.unlock();
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const found = this.getControl(event);
    if (found) found.active = true;
  };

  private onKeyUp = (event: KeyboardEvent) => {
    const found = this.getControl(event);
    if (found) found.active = false;
  };

  private move(delta: number) {
    this.applySmoothDeceleration(delta);
    this.updateDirections();
    this.updateVelocity(delta);
    this.moveCamera(delta);
  }

  private applySmoothDeceleration(delta: number) {
    this.dimensions.forEach((dim) => {
      this.velocity[dim] -= this.velocity[dim] * 10.0 * delta;
    });
  }

  private updateDirections() {
    this.dimensions.forEach((dim) => this.updateDirection(dim));
    this.direction.normalize(); // this ensures consistent movements in all directions
  }

  private updateDirection(dim: dimension) {
    const controls = this.controlsMap[dim];
    const oneDirection = controls[0];
    const oppositeDirection = controls[1];
    this.direction[dim] = Number(oneDirection.active) - Number(oppositeDirection.active);
  }

  private updateVelocity(delta: number) {
    this.dimensions.forEach((dimension) => {
      const controls = this.controlsMap[dimension];
      const isActive = controls.find((control) => control.active);
      if (isActive) {
        this.velocity[dimension] -= this.direction[dimension] * this.speed * delta;
      }
    });
  }

  private moveCamera(delta: number) {
    this.controls.moveRight(-this.velocity.x * delta);
    this.controls.moveForward(-this.velocity.z * delta);
    this.controls.getObject().position.y -= this.velocity.y * delta;
  }

  private getControl(event: KeyboardEvent) {
    const controlValues = Object.values(this.keyBinding);
    return controlValues.find((control) => control.keys.indexOf(event.code) > -1);
  }
}
