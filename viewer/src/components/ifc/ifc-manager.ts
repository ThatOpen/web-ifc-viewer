import { DoubleSide, Material, MeshLambertMaterial } from 'three';
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

  getSpatialStructure(modelID: number, recursive = false) {
    return this.loader.getSpatialStructure(modelID, recursive);
  }

  getProperties(modelID: number, id: number, indirect: boolean, recursive: boolean) {
    if (modelID == null || id == null) return null;
    const props = this.loader.getItemProperties(modelID, id);
    if (indirect) {
      props.psets = this.loader.getPropertySets(modelID, id, recursive);
      props.type = this.loader.getTypeProperties(modelID, id);
    }
    console.log(props);
    return props;
  }

  prePickIfcItem() {
    const found = this.context.castRayIfc();
    if (!found) return;
    this.preselection.select(found);
  }

  pickIfcItem(indirect: boolean, recursive: boolean) {
    const found = this.context.castRayIfc();
    if (!found) return null;
    const result = this.selection.select(found);
    if (result == null || result.modelID == null || result.id == null) return null;
    return this.getProperties(result.modelID, result.id, indirect, recursive);
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
