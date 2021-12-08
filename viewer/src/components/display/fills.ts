import { BackSide, Material } from 'three';
import { IFCModel } from 'web-ifc-three/IFC/components/IFCModel';
import { Context } from '../../base-types';
import { IfcManager } from '../ifc';

export class SectionFillManager {
  private readonly fills: { [name: string]: IFCModel };

  constructor(private IFC: IfcManager, private context: Context) {
    this.fills = {};
  }

  get(name: string) {
    return this.fills[name];
  }

  create(name: string, modelID: number, ids: number[], material: Material) {
    if (this.fills[name] !== undefined) throw new Error('The specified fill already exists');
    material.clippingPlanes = this.context.getClippingPlanes();
    const model = this.context.items.ifcModels.find((model) => model.modelID === modelID);
    if (!model) throw new Error('The requested model to fill was not found.');
    this.setupMaterial(material);
    const subset = this.getSubset(modelID, ids, material, name);
    if (!subset) return null;
    this.context.items.ifcModels.push(model);
    this.context.items.pickableIfcModels.push(model);
    model.add(subset);
    this.fills[name] = subset;
    // subset.renderOrder = 2;
    return subset;
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
      customID: name
    }) as IFCModel;
  }
}
