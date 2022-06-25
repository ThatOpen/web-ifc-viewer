import { Intersection, Material, Mesh, Scene } from 'three';
import { IfcMesh } from 'web-ifc-three/IFC/BaseDefinitions';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { IfcComponent } from '../../../base-types';
import { IfcContext } from '../../context';

export class IfcSelection extends IfcComponent {
  material?: Material;
  meshes = new Set<Mesh>();

  // True only for prepick
  fastRemovePrevious = false;
  renderOrder = 0;

  private modelIDs = new Set<number>();
  private selectedFaces: { [modelID: number]: Set<number> } = {};
  private loader: IFCLoader;
  private readonly scene: Scene;

  constructor(private context: IfcContext, loader: IFCLoader, material?: Material) {
    super(context);
    this.scene = context.getScene();
    this.loader = loader;
    if (material) this.material = material;
  }

  dispose() {
    this.meshes.forEach((mesh) => {
      mesh.removeFromParent();
      mesh.geometry.dispose();
    });
    this.material?.dispose();
    (this.meshes as any) = null;
    (this.material as any) = null;
    (this.scene as any) = null;
    (this.loader as any) = null;
    (this.context as any) = null;
  }

  pick = async (item: Intersection, focusSelection = false, removePrevious = true) => {
    const mesh = item.object as IfcMesh;

    if (item.faceIndex === undefined || this.selectedFaces[mesh.modelID]?.has(item.faceIndex)) {
      return null;
    }

    const id = this.loader.ifcManager.getExpressId(mesh.geometry, item.faceIndex);
    if (id === undefined) return null;

    if (removePrevious) {
      if (this.fastRemovePrevious) {
        this.toggleVisibility(false);
        this.modelIDs.clear();
        this.selectedFaces = {};
      } else {
        this.unpick();
      }
    }

    if (!this.selectedFaces[mesh.modelID]) this.selectedFaces[mesh.modelID] = new Set<number>();
    this.selectedFaces[mesh.modelID].add(item.faceIndex);
    this.modelIDs.add(mesh.modelID);
    const selected = this.newSelection(mesh.modelID, [id], removePrevious);

    selected.position.copy(mesh.position);
    selected.rotation.copy(mesh.rotation);
    selected.scale.copy(mesh.scale);

    selected.visible = true;
    selected.renderOrder = this.renderOrder;

    if (focusSelection) {
      await this.focusSelection(selected);
    }

    return { modelID: mesh.modelID, id };
  };

  unpick() {
    for (const modelID of this.modelIDs) {
      this.loader.ifcManager.removeSubset(modelID, this.material);
    }
    this.modelIDs.clear();
    this.meshes.clear();
    this.selectedFaces = {};
  }

  pickByID = async (
    modelID: number,
    ids: number[],
    focusSelection = false,
    removePrevious = true
  ) => {
    if (removePrevious) {
      this.modelIDs.clear();
    }
    this.modelIDs.add(modelID);
    const mesh = this.newSelection(modelID, ids, removePrevious);
    mesh.renderOrder = this.renderOrder;
    if (focusSelection) await this.focusSelection(mesh);
  };

  newSelection = (modelID: number, ids: number[], removePrevious: boolean) => {
    const mesh = this.loader.ifcManager.createSubset({
      scene: this.scene,
      modelID,
      ids,
      removePrevious,
      material: this.material
    });
    if (mesh) {
      this.meshes.add(mesh);
      this.context.renderer.postProduction.excludedItems.add(mesh);
    }
    return mesh;
  };

  toggleVisibility(visible: boolean) {
    this.meshes.forEach((mesh) => (mesh.visible = visible));
  }

  private async focusSelection(mesh: Mesh) {
    const postproductionActive = this.context.renderer.postProduction.active;
    this.context.renderer.postProduction.active = false;

    await this.context.ifcCamera.targetItem(mesh);

    this.context.renderer.postProduction.active = postproductionActive;
  }
}
