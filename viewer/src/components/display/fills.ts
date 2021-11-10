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
    this.setupMaterial(material);
    const subset = this.getSubset(modelID, ids, material);
    if (!subset) return null;
    this.context.scene.addModel(subset);
    this.fills[name] = subset;
    return subset;
  }

  delete(name: string) {
    const subset = this.fills[name];
    delete this.fills[name];
    this.context.scene.removeModel(subset);
    if (subset.parent) subset.removeFromParent();
    subset.geometry.dispose();
  }

  private setupMaterial(material: Material) {
    material.clippingPlanes = this.context.getClippingPlanes();
    material.side = BackSide;
    material.polygonOffset = true;
    material.polygonOffsetFactor = -1;
    material.polygonOffsetUnits = 1;
  }

  private getSubset(modelID: number, ids: number[], material: Material) {
    return this.IFC.loader.ifcManager.createSubset({
      modelID,
      ids,
      scene: this.context.getScene(),
      removePrevious: true,
      material
    }) as IFCModel;
  }
}
