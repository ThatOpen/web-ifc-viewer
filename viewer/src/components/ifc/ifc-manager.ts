import { DoubleSide, Material, MeshLambertMaterial, Scene } from 'three';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { Component, Items, ViewerOptions } from '../../base-types';
import { IfcRaycaster } from '../scene/raycaster';
import { IfcSelection } from './selection';

export class IfcManager extends Component {
  loader: IFCLoader;
  private scene: Scene;
  private items: Items;
  private caster: IfcRaycaster;
  private preselection: IfcSelection;
  private selection: IfcSelection;
  private selectMat: Material | undefined;
  private preselectMat: Material | undefined;
  private defPreselectMat: Material;
  private defSelectMat: Material;

  constructor(items: Items, scene: Scene, raycaster: IfcRaycaster, options: ViewerOptions) {
    super();
    this.scene = scene;
    this.items = items;
    this.caster = raycaster;
    this.loader = new IFCLoader();
    this.defSelectMat = this.initializeDefMaterial(0xff33ff, 0.3);
    this.defPreselectMat = this.initializeDefMaterial(0xffccff, 0.5);
    this.selectMat = options.selectMaterial || this.defSelectMat;
    this.preselectMat = options.preselectMaterial || this.defPreselectMat;
    this.preselection = new IfcSelection(scene, this.loader, this.preselectMat);
    this.selection = new IfcSelection(scene, this.loader, this.selectMat);
  }

  async loadIfc(file: File) {
    const url = URL.createObjectURL(file);
    await this.loadIfcUrl(url);
  }

  async loadIfcUrl(url: string) {
    try {
      const object = await this.loader.loadAsync(url);
      this.items.ifcModels.push(object);
      this.scene.add(object);
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
    const found = this.caster.castRayIfc();
    if (!found) return;
    this.preselection.select(found);
  }

  pickIfcItem(indirect: boolean, recursive: boolean) {
    const found = this.caster.castRayIfc();
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
