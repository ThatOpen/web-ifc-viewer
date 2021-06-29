import { DoubleSide, Material, MeshLambertMaterial } from 'three';
import { IfcMesh } from 'web-ifc-three/IFC/BaseDefinitions';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { IfcComponent, Context } from '../../base-types';
import { IfcSelection } from './selection';

export class IfcManager extends IfcComponent {
  loader: IFCLoader;
  private context: Context;
  private preselection: IfcSelection;
  private selection: IfcSelection;
  private selectMat: Material | undefined;
  private preselectMat: Material | undefined;
  private defPreselectMat: Material;
  private defSelectMat: Material;

  constructor(context: Context) {
    super(context);
    this.context = context;
    this.loader = new IFCLoader();
    this.defSelectMat = this.initializeDefMaterial(0xff33ff, 0.3);
    this.defPreselectMat = this.initializeDefMaterial(0xffccff, 0.5);
    this.selectMat = context.options.selectMaterial || this.defSelectMat;
    this.preselectMat = context.options.preselectMaterial || this.defPreselectMat;
    this.preselection = new IfcSelection(context, this.loader, this.preselectMat);
    this.selection = new IfcSelection(context, this.loader, this.selectMat);
  }

  async loadIfc(file: File) {
    const url = URL.createObjectURL(file);
    await this.loadIfcUrl(url);
  }

  async loadIfcUrl(url: string) {
    try {
      const object = await this.loader.loadAsync(url);
      this.context.items.ifcModels.push(object);
      this.context.getScene().add(object);
    } catch (err) {
      console.error('Error loading IFC.');
      console.error(err);
    }
  }

  setWasmPath(path: string) {
    this.loader.setWasmPath(path);
  }

  getSpatialStructure(modelID: number) {
    return this.loader.getSpatialStructure(modelID);
  }

  getProperties(modelID: number, id: number, indirect: boolean) {
    if (modelID == null || id == null) return null;
    const props = this.loader.getItemProperties(modelID, id);
    if (indirect) {
      props.psets = this.loader.getPropertySets(modelID, id);
      props.type = this.loader.getTypeProperties(modelID, id);
    }
    console.log(props);
    return props;
  }

  getModelId() {
    const found = this.context.castRayIfc();
    if (!found) return null;
    const mesh = found.object as IfcMesh;
    if (!mesh || typeof mesh.modelID !== 'number') return null;
    return mesh.modelID;
  }

  getAllItemsOfType(modelID: number, type: number, verbose = true) {
    return this.loader.getAllItemsOfType(modelID, type, verbose);
  }

  prePickIfcItem() {
    const found = this.context.castRayIfc();
    if (!found) {
      this.preselection.removeSelectionOfOtherModel();
      return;
    }
    this.preselection.pick(found);
  }

  pickIfcItem() {
    const found = this.context.castRayIfc();
    if (!found) return null;
    const result = this.selection.pick(found);
    if (result == null || result.modelID == null || result.id == null) return null;
    return result;
  }

  pickIfcItemByID(modelID: number, id: number) {
    this.selection.pickByID(modelID, id);
  }

  private initializeDefMaterial(color: number, opacity: number) {
    return new MeshLambertMaterial({
      color,
      opacity,
      transparent: true,
      depthTest: false,
      side: DoubleSide
    });
  }
}
