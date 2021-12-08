import { Intersection, Material, Mesh, Scene } from 'three';
import { IfcMesh } from 'web-ifc-three/IFC/BaseDefinitions';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { IfcComponent, Context } from '../../base-types';

export class IfcSelection extends IfcComponent {
  mesh: Mesh | null = null;
  material: Material;
  private selected: number;
  private modelID: number;
  private loader: IFCLoader;
  private readonly scene: Scene;

  constructor(private context: Context, loader: IFCLoader, material: Material) {
    super(context);
    this.scene = context.getScene();
    this.loader = loader;
    this.material = material;
    this.selected = -1;
    this.modelID = -1;
  }

  pick = async (item: Intersection, focusSelection = false) => {
    if (this.selected === item.faceIndex || item.faceIndex == null) return null;
    this.selected = item.faceIndex;
    const mesh = item.object as IfcMesh;
    const id = await this.loader.ifcManager.getExpressId(mesh.geometry, item.faceIndex);
    if (id === undefined) return null;
    this.hideSelection(mesh);
    this.modelID = mesh.modelID;
    this.newSelection([id]);
    if (focusSelection) this.focusSelection();
    return { modelID: this.modelID, id };
  };

  unpick() {
    this.mesh = null;
    const model = this.context.items.ifcModels[this.modelID];
    this.loader.ifcManager.removeSubset(this.modelID, model, this.material);
  }

  pickByID = (modelID: number, ids: number[], focusSelection = false) => {
    this.modelID = modelID;
    this.newSelection(ids);
    if (focusSelection) this.focusSelection();
  };

  newSelection = (ids: number[]) => {
    const mesh = this.loader.ifcManager.createSubset({
      scene: this.scene,
      modelID: this.modelID,
      ids,
      removePrevious: true,
      material: this.material
    });
    if (mesh) {
      this.mesh = mesh;
      this.mesh.visible = true;
    }
  };

  hideSelection(mesh?: IfcMesh) {
    if (this.mesh && this.modelID !== undefined && this.modelID !== mesh?.modelID) {
      this.mesh.visible = false;
    }
  }

  private focusSelection() {
    if (this.mesh) {
      this.context.ifcCamera.targetItem(this.mesh);
    }
  }
}
