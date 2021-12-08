import { AmbientLight, Color, DirectionalLight, Object3D, Scene } from 'three';
import { IFCModel } from 'web-ifc-three/IFC/components/IFCModel';
import { IfcComponent, ViewerOptions, Context } from '../../base-types';

export class IfcScene extends IfcComponent {
  scene: Scene;
  defaultBackgroundColor = new Color(0xa9a9a9);

  constructor(private context: Context) {
    super(context);
    this.scene = new Scene();
    this.setupScene(context.options);
    this.setupLights();
  }

  add(item: Object3D) {
    this.scene.add(item);
  }

  remove(item: Object3D) {
    this.scene.remove(item);
  }

  addModel(model: IFCModel) {
    this.context.items.ifcModels.push(model);
    this.context.items.pickableIfcModels.push(model);
    this.scene.add(model);
  }

  removeModel(model: IFCModel) {
    let index = this.context.items.ifcModels.indexOf(model);
    if (index >= 0) this.context.items.ifcModels.splice(index, 1);
    index = this.context.items.pickableIfcModels.indexOf(model);
    if (index >= 0) this.context.items.pickableIfcModels.splice(index, 1);
    if (model.parent) model.removeFromParent();
  }

  private setupScene(options?: ViewerOptions) {
    this.scene.background = options?.backgroundColor || this.defaultBackgroundColor;
  }

  private setupLights() {
    const light1 = new DirectionalLight(0xffeeff, 0.8);
    light1.position.set(1, 1, 1);
    this.scene.add(light1);
    const light2 = new DirectionalLight(0xffffff, 0.8);
    light2.position.set(-1, 0.5, -1);
    this.scene.add(light2);
    const ambientLight = new AmbientLight(0xffffee, 0.25);
    this.scene.add(ambientLight);
  }
}
