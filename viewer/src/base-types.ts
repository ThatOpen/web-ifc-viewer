import { Color, Material, Object3D } from 'three';

export abstract class Component {
  update(_delta: number) {}
}

export interface ViewerOptions {
  container: HTMLElement;
  preselectMaterial?: Material;
  selectMaterial?: Material;
  backgroundColor?: Color;
}

export interface Items {
  components: Component[];
  ifcModels: Object3D[];
}
