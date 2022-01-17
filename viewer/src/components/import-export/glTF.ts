import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group } from 'three';
import { IfcComponent } from '../../base-types';
import { IfcContext } from '../context';

export class GLTFManager extends IfcComponent {
  private context: IfcContext;
  private loader = new GLTFLoader();
  private GLTFModels: { [modelID: number]: Group } = {};

  constructor(context: IfcContext) {
    super(context);
    this.context = context;
  }

  async load(modelID: number, url: string) {
    const loaded = (await this.loader.loadAsync(url)) as GLTF;
    const mesh = loaded.scene;
    this.GLTFModels[modelID] = mesh;
    this.context.getScene().add(mesh);
  }

  getModel(modelID: number) {
    if (!this.GLTFModels[modelID]) {
      throw new Error('The requested GLTF model does not exist!');
    }
    return this.GLTFModels[modelID];
  }
}
