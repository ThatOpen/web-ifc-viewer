import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { Material, Scene } from 'three';
import { Context } from '../../base-types';

export class VisibilityManager {
  private loader: IFCLoader;
  private context: Context;
  private modelMaterials: { [modelID: number]: Material | Material[] } = {};
  private readonly scene: Scene;

  constructor(loader: IFCLoader, context: Context) {
    this.loader = loader;
    this.context = context;
    this.scene = this.context.getScene();
  }

  isolateItems(modelID: number, ids: number[], material?: Material) {
    this.isolate(modelID, ids, true);
    if (material) {
      this.changeModelMaterial(modelID, material);
    }
  }

  addToIsolatedItems(modelID: number, ids: number[], material?: Material) {
    this.isolate(modelID, ids, false);
    if (material) {
      this.changeModelMaterial(modelID, material);
    }
  }

  removeIsolation(modelID: number) {
    const mesh = this.context.items.ifcModels.find((ifcMesh) => ifcMesh.modelID === modelID);
    if (mesh) {
      this.loader.ifcManager.removeSubset(modelID, this.scene);
      this.context.items.pickableIfcModels.push(mesh);
      this.restoreModelMaterial(modelID);
    }
  }

  private changeModelMaterial(modelID: number, material: Material) {
    const mesh = this.getMesh(modelID);
    if (mesh) {
      this.modelMaterials[mesh.modelID] = mesh.material;
      mesh.material = material;
    }
  }

  private restoreModelMaterial(modelID: number) {
    const mesh = this.getMesh(modelID);
    if (this.modelMaterials[modelID] && mesh) {
      mesh.material = this.modelMaterials[modelID];
    }
  }

  private removePickableItem(modelID: number) {
    this.context.items.pickableIfcModels = this.context.items.pickableIfcModels.filter(
      (ifcMesh) => {
        return ifcMesh.modelID !== modelID;
      }
    );
  }

  private getMesh(modelID: number) {
    return this.context.items.ifcModels.find((model) => model.modelID === modelID);
  }

  private isolate(modelID: number, ids: number[], removePrevious: boolean) {
    this.removePickableItem(modelID);
    this.loader.ifcManager.createSubset({
      scene: this.scene,
      ids,
      modelID,
      removePrevious
    });
  }
}
