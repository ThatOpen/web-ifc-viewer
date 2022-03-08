import { BackSide, Material } from 'three';
import { IFCModel } from 'web-ifc-three/IFC/components/IFCModel';
import { IfcManager } from '../ifc';
import { IfcContext } from '../context';
import { disposeMeshRecursively } from '../../utils/ThreeUtils';

export class SectionFillManager {
  readonly fills: { [name: string]: IFCModel };

  private existMessage = 'The specified fill already exists';

  constructor(private IFC: IfcManager, private context: IfcContext) {
    this.fills = {};
  }

  dispose() {
    const fills = Object.values(this.fills);
    fills.forEach((fill) => disposeMeshRecursively(fill));
    (this.fills as any) = null;
  }

  create(name: string, modelID: number, ids: number[], material: Material) {
    if (this.fills[name] !== undefined) throw new Error(this.existMessage);
    material.clippingPlanes = this.context.getClippingPlanes();
    const model = this.context.items.ifcModels.find((model) => model.modelID === modelID);
    if (!model) throw new Error('The requested model to fill was not found.');

    this.setupMaterial(material);
    const subset = this.getSubset(modelID, ids, material, name);
    if (!subset) return null;
    this.context.items.pickableIfcModels.push(subset);

    subset.position.copy(model.position);
    subset.rotation.copy(model.rotation);
    this.context.getScene().add(subset);
    this.fills[name] = subset;
    // subset.renderOrder = 2;
    return subset;
  }

  createFromMesh(name: string, mesh: IFCModel) {
    if (this.fills[name] !== undefined) throw new Error(this.existMessage);
    const planes = this.context.getClippingPlanes();
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((material) => {
        material.clippingPlanes = planes;
      });
    } else {
      mesh.material.clippingPlanes = planes;
    }
    this.fills[name] = mesh;
  }

  delete(name: string) {
    const subset = this.fills[name];
    delete this.fills[name];
    this.context.scene.removeModel(subset);
    subset.geometry.dispose();
  }

  private setupMaterial(material: Material) {
    material.clippingPlanes = this.context.getClippingPlanes();
    material.side = BackSide;
    material.polygonOffset = true;
    material.polygonOffsetFactor = -1;
    material.polygonOffsetUnits = 1;
  }

  private getSubset(modelID: number, ids: number[], material: Material, name: string) {
    return this.IFC.loader.ifcManager.createSubset({
      modelID,
      ids,
      scene: this.context.getScene(),
      removePrevious: true,
      material,
      applyBVH: true,
      customID: name
    }) as IFCModel;
  }
}
