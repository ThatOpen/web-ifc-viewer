import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group } from 'three';
import { Context, IfcComponent } from '../../base-types';

export class GLTFManager extends IfcComponent {
  private context: Context;
  private loader = new GLTFLoader();
  private GLTFModels: { [modelID: number]: Group } = {};

  constructor(context: Context) {
    super(context);
    this.context = context;
  }

  async load(modelID: number, url: string) {
    const loaded = (await this.loader.loadAsync(url)) as GLTF;
    const mesh = loaded.scene;
    this.GLTFModels[modelID] = mesh;
    this.context.getScene().add(mesh);
  }

  dispose() {
    const models = Object.values(this.GLTFModels);
    models.forEach((model) => {
      if (model.parent) {
        model.parent.remove(model);
      }
    });
  }

  getModel(modelID: number) {
    if (!this.GLTFModels[modelID]) {
      throw new Error('The requested GLTF model does not exist!');
    }
    return this.GLTFModels[modelID];
  }
}
