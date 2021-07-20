import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { Material, MeshBasicMaterial, Scene } from 'three';
import { IfcMesh } from 'web-ifc-three/IFC/BaseDefinitions';
import { Context } from '../../base-types';

export class VisibilityManager {
  private ifc: IFCLoader;
  private context: Context;
  private modelMaterials: { [modelID: number]: Material | Material[] } = {};
  private readonly scene: Scene;
  private readonly invisibleMaterial = new MeshBasicMaterial({ visible: false });

  constructor(loader: IFCLoader, context: Context) {
    this.ifc = loader;
    this.context = context;
    this.scene = this.context.getScene();
  }

  isolateItems(modelID: number, ids: number[], removePrevious = true, material?: Material) {
    this.isolate(modelID, ids, removePrevious);
    this.changeModelMaterial(modelID, material);
    this.makeIsolatedItemsPickable(modelID);
  }

  removeIsolation(modelID: number) {
    const mesh = this.context.items.ifcModels.find((ifcMesh) => ifcMesh.modelID === modelID);
    if (mesh) {
      this.ifc.ifcManager.removeSubset(modelID, this.scene);
      this.context.items.pickableIfcModels.push(mesh);
      this.restoreModelMaterial(modelID);
      this.makeOriginalModelPickable(modelID);
    }
  }

  private changeModelMaterial(modelID: number, material?: Material) {
    const mesh = this.getMesh(modelID);
    if (mesh) {
      this.modelMaterials[mesh.modelID] = mesh.material;
      mesh.material = material || this.invisibleMaterial;
    }
  }

  private restoreModelMaterial(modelID: number) {
    const mesh = this.getMesh(modelID);
    if (this.modelMaterials[modelID] && mesh) {
      mesh.material = this.modelMaterials[modelID];
    }
  }

  private makeOriginalModelPickable(model: number) {
    const originalModel = this.context.items.ifcModels.find((mesh) => mesh.modelID === model);
    if (originalModel) {
      this.removePickableItem(model);
      this.context.items.pickableIfcModels.push(originalModel);
    }
  }

  private removePickableItem(modelID: number) {
    this.context.items.pickableIfcModels = this.context.items.pickableIfcModels.filter(
      (ifcMesh) => {
        return ifcMesh.modelID !== modelID;
      }
    );
  }

  private makeIsolatedItemsPickable(model: number) {
    this.removePickableItem(model);
    const isolatedItems = this.ifc.ifcManager.getSubset(model) as IfcMesh;
    if (isolatedItems) {
      isolatedItems.modelID = model;
      this.context.items.pickableIfcModels.push(isolatedItems);
    }
  }

  private getMesh(modelID: number) {
    return this.context.items.ifcModels.find((model) => model.modelID === modelID);
  }

  private isolate(modelID: number, ids: number[], removePrevious: boolean) {
    this.ifc.ifcManager.createSubset({
      scene: this.scene,
      ids,
      modelID,
      removePrevious
    });
  }
}
