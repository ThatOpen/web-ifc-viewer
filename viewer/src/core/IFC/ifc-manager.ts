import { IFCLoader } from 'web-ifc-three/IFCLoader';
import * as THREE from 'three';
// import { IfcSelection } from './selection';
// import { IFCRaycaster } from '../../components/raycaster';

export class IfcManager {
  private loader: IFCLoader;
  private models: THREE.Object3D[];
  // private caster: IFCRaycaster;
  // private preselection: IfcSelection;
  // private selection: IfcSelection;

  constructor(ifc_objects: THREE.Object3D[]) {
    this.loader = new IFCLoader();
    this.models = ifc_objects;
    // this.caster = new IFCRaycaster();

    // this.preselection = new IfcSelection(this.loader, this.models);
    // this.selection = new IfcSelection(this.loader, this.models);
  }

  async loadIfc(file: File, scene: THREE.Scene) {
    const url = URL.createObjectURL(file);
    try {
      const object = await this.loader.loadAsync(url);
      this.models.push(object);
      // @ts-ignore
      scene.add(object);
    } catch (err) {
      console.error('Error loading IFC.');
      console.error(err);
    }
  }

  select() {}

  preselect() {}

  setModelDisplay() {}
}
