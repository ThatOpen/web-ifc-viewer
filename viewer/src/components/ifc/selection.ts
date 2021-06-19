import { Intersection, Material, Scene } from 'three';
import { IfcMesh } from 'web-ifc-three/IFC/BaseDefinitions';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { Component } from '../../base-types';

export class IfcSelection extends Component {
  private selected: number;
  private modelID: number;
  private material: Material | undefined;
  private loader: IFCLoader;
  private scene: Scene;

  constructor(scene: Scene, loader: IFCLoader, material: Material | undefined) {
    super();
    this.scene = scene;
    this.loader = loader;
    this.material = material;
    this.selected = -1;
    this.modelID = -1;
  }

  select = (item: Intersection) => {
    if (this.selected === item.faceIndex || item.faceIndex == null) return null;
    this.selected = item.faceIndex;
    const mesh = item.object as IfcMesh;
    const id = this.loader.getExpressId(mesh.geometry, item.faceIndex);
    if (id === undefined) return null;
    this.removePreviousSelection(mesh);
    this.modelID = mesh.modelID;
    this.newSelection(id);
    return { modelID: this.modelID, id };
  };

  newSelection = (id: number) => {
    this.loader.createSubset({
      scene: this.scene,
      modelID: this.modelID,
      ids: [id],
      removePrevious: true,
      material: this.material
    });
  };

  removePreviousSelection(mesh: IfcMesh) {
    if (this.modelID !== undefined && this.modelID !== mesh.modelID) {
      this.loader.removeSubset(this.modelID, this.scene, this.material);
    }
  }
}
