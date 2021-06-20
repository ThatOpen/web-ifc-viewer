import {
  Camera,
  Color,
  Intersection,
  Material,
  Object3D,
  Plane,
  Renderer,
  Scene,
  Vector2
} from 'three';

export interface ViewerOptions {
  container: HTMLElement;
  preselectMaterial?: Material;
  selectMaterial?: Material;
  backgroundColor?: Color;
}

interface Component {
  update: (_delta: number) => void;
}

export interface Items {
  components: Component[];
  ifcModels: Object3D[];
}

export interface Context {
  items: Items;
  options: ViewerOptions;

  getScene: () => Scene;
  getCamera: () => Camera;
  getRenderer: () => Renderer;
  getDomElement: () => HTMLElement;
  getDimensions: () => Vector2;
  getClippingPlanes: () => Plane[];

  addComponent: (component: Component) => void;
  addClippingPlane: (plane: Plane) => void;
  removeClippingPlane: (plane: Plane) => void;
  castRay: (items: Object3D[]) => Intersection[];
  castRayIfc: () => Intersection;
  toggleCameraControls: (active: boolean) => void;
}

export abstract class IfcComponent implements Component {
  constructor(context: Context) {
    context.addComponent(this);
  }

  update(_delta: number) {}
}
