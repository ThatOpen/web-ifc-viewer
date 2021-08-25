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
import { IfcMesh } from 'web-ifc-three/IFC/BaseDefinitions';

export interface ViewerOptions {
  container: HTMLElement;
  preselectMaterial?: Material;
  selectMaterial?: Material;
  backgroundColor?: Color;
  panWithMMB?: boolean;
}

interface Component {
  update: (_delta: number) => void;
}

export interface Items {
  components: Component[];
  ifcModels: IfcMesh[];
  pickableIfcModels: IfcMesh[];
}

export interface Context {
  items: Items;
  options: ViewerOptions;

  getScene: () => Scene;
  getCamera: () => Camera;
  getRenderer: () => Renderer;
  getDomElement: () => HTMLElement;
  getDomElement2D: () => HTMLElement;
  getDimensions: () => Vector2;
  getClippingPlanes: () => Plane[];

  fitToFrame: () => void;
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
