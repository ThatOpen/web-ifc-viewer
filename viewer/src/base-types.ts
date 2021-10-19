import {
  Camera,
  Color,
  Intersection,
  Material,
  Object3D,
  Plane,
  Renderer,
  Scene,
  Vector2,
  Vector3,
  Mesh,
  MOUSE
} from 'three';
import { IfcMesh } from 'web-ifc-three/IFC/BaseDefinitions';
import { Animator } from './components/context/animator';
import { OrbitControl } from './components/context/camera/OrbitControl';
import { FirstPersonControl } from './components/context/camera/FirstPersonControl';
import { IfcCamera } from './components/context/camera/camera';
import { LiteEvent } from './utils/LiteEvent';
import { IfcEvents } from './components/context/ifcEvent';
import { IfcRenderer } from './components/context/renderer/renderer';

export interface MouseButtons {
  left: MOUSE;
  middle: MOUSE;
  right: MOUSE;
}

export enum NavigationModes {
  Orbit,
  FirstPerson
}

export enum CameraProjections {
  Perspective,
  Orthographic
}

export interface NavigationMode {
  mode: NavigationModes;
  toggle: (active: boolean, options?: any) => void;
  enabled: boolean;
  projection: CameraProjections;
  onChange: LiteEvent<any>;
  onUnlock: LiteEvent<any>;
  onChangeProjection: LiteEvent<Camera>;
}

export interface NavModeManager {
  [NavigationModes.Orbit]: OrbitControl;
  [NavigationModes.FirstPerson]: FirstPersonControl;
}

export interface ViewerOptions {
  container: HTMLElement;
  preselectMaterial?: Material;
  selectMaterial?: Material;
  backgroundColor?: Color;
  panWithMMB?: boolean;
}

interface Component {
  update: (_delta: number) => void;
  dispose: () => void;
}

export interface Items {
  components: Component[];
  ifcModels: IfcMesh[];
  pickableIfcModels: IfcMesh[];
}

export interface Context {
  items: Items;
  options: ViewerOptions;

  events: IfcEvents;
  renderer: IfcRenderer;

  getScene: () => Scene;
  getCamera: () => Camera;
  getRenderer: () => Renderer;
  getDomElement: () => HTMLElement;
  getDomElement2D: () => HTMLElement;
  getDimensions: () => Vector2;
  getClippingPlanes: () => Plane[];
  getAnimator: () => Animator;
  getCenter: (mesh: Mesh) => Vector3;
  ifcCamera: IfcCamera;

  fitToFrame: () => void;
  toggleCameraControls: (active: boolean) => void;
  addComponent: (component: Component) => void;
  addClippingPlane: (plane: Plane) => void;
  removeClippingPlane: (plane: Plane) => void;
  castRay: (items: Object3D[]) => Intersection[];
  castRayIfc: () => Intersection | null;
}

export abstract class IfcComponent implements Component {
  protected constructor(context: Context) {
    context.addComponent(this);
  }

  update(_delta: number) {
  }

  dispose() {
  }
}

export interface fpsControl {
  active: boolean;
  keys: string[];
}

export interface fpsControls {
  forward: fpsControl;
  back: fpsControl;
  right: fpsControl;
  left: fpsControl;
  up: fpsControl;
  down: fpsControl;
}

export enum dimension {
  x = 'x',
  y = 'y',
  z = 'z'
}
