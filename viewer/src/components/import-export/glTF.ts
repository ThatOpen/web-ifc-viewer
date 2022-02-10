import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group } from 'three';
import { IfcComponent } from '../../base-types';
import { IfcContext } from '../context';

export class GLTFManager extends IfcComponent {
  GLTFModels: { [modelID: number]: Group } = {};

  private context: IfcContext;
  private loader = new GLTFLoader();

  constructor(context: IfcContext) {
    super(context);
    this.context = context;
  }

  async load(url: string) {
    const loaded = (await this.loader.loadAsync(url)) as GLTF;
    const mesh = loaded.scene;
    const modelID = Object.keys(this.GLTFModels).length;
    this.GLTFModels[modelID] = mesh;
    this.context.getScene().add(mesh);
  }
}
