import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { Material, MeshBasicMaterial, Scene } from 'three';
import { IFCModel } from 'three/examples/jsm/loaders/IFCLoader';
import { Context } from '../../base-types';

export class VisibilityManager {
  private ifc: IFCLoader;
  private context: Context;

  private modelMaterials: {
    [modelID: number]: { model: IFCModel; materials: Material | Material[] };
  } = {};

  private readonly scene: Scene;
  private readonly invisibleMaterial = new MeshBasicMaterial({ visible: false });
  private visibilityID = 'web-ifc-viewer-visibility';

  constructor(loader: IFCLoader, context: Context) {
    this.ifc = loader;
    this.context = context;
    this.scene = this.context.getScene();
  }

  isolateItems(modelID: number, ids: number[], removePrevious = true, material?: Material) {
    this.createIsolationSubset(modelID, ids, removePrevious);
    this.makeIsolatedSubsetPickable(modelID);
    this.changeModelMaterial(modelID, material);
    this.makeModelNotPickable(modelID);
  }

  removeIsolation(modelID: number) {
    this.removeIsolationSubset(modelID);
    this.restoreOriginalModelMaterial(modelID);
    this.makeOriginalModelPickable(modelID);
  }

  private removeIsolationSubset(modelID: number) {
    const subset = this.ifc.ifcManager.getSubset(modelID, undefined, this.visibilityID);
    const index = this.context.items.pickableIfcModels.indexOf(subset);
    if (index >= 0) this.context.items.pickableIfcModels.splice(index);
    this.ifc.ifcManager.removeSubset(modelID, undefined, this.visibilityID);
  }

  private changeModelMaterial(modelID: number, material?: Material) {
    const mesh = this.getMesh(modelID);
    if (mesh) {
      this.modelMaterials[modelID].model = mesh;
      this.modelMaterials[modelID].materials = mesh.material;
      mesh.material = material || this.invisibleMaterial;
    }
  }

  private restoreOriginalModelMaterial(modelID: number) {
    if (this.modelMaterials[modelID]) {
      this.modelMaterials[modelID].model.material = this.modelMaterials[modelID].materials;
    }
  }

  private makeOriginalModelPickable(modelID: number) {
    const originalModel = this.context.items.ifcModels.find((mesh) => mesh.modelID === modelID);
    if (originalModel) {
      this.context.items.pickableIfcModels.push(originalModel);
      return;
    }
    this.modelNotFoundError(modelID);
  }

  private makeModelNotPickable(modelID: number) {
    this.context.items.pickableIfcModels = this.context.items.pickableIfcModels.filter(
      (ifcMesh) => {
        return ifcMesh.modelID !== modelID;
      }
    );
  }

  private makeIsolatedSubsetPickable(model: number) {
    const isolatedItems = this.ifc.ifcManager.getSubset(model, undefined, this.visibilityID);
    if (!isolatedItems) throw new Error('Subset for isolation not found.');
    this.context.items.pickableIfcModels.push(isolatedItems);
  }

  private getMesh(modelID: number) {
    return this.context.items.ifcModels.find((model) => model.modelID === modelID) as IFCModel;
  }

  private createIsolationSubset(modelID: number, ids: number[], removePrevious: boolean) {
    if (ids.length === 0) {
      this.ifc.ifcManager.removeSubset(modelID, undefined, this.visibilityID);
      return;
    }
    this.ifc.ifcManager.createSubset({
      scene: this.scene,
      ids,
      modelID,
      removePrevious,
      customID: this.visibilityID
    });
  }

  private modelNotFoundError(modelID: number) {
    throw new Error(`Model with ID ${modelID} was not found.`);
  }
}
