import { IFCLoader } from 'web-ifc-three/IFCLoader';
import * as THREE from 'three';
import { IFCRaycaster } from '../../components/raycaster';
import { IfcSelection } from './selection';

export class IfcManager {
  private loader: IFCLoader;
  private models: THREE.Object3D[];
  private caster: IFCRaycaster;
  private scene: THREE.Scene;
  private preselection: IfcSelection;
  private selection: IfcSelection;

  private preselectMat = new THREE.MeshLambertMaterial({
    color: 0xffccff,
    transparent: true,
    opacity: 0.5,
    depthTest: false,
    side: THREE.DoubleSide
  });

  private selectMat = new THREE.MeshLambertMaterial({
    color: 0xff33ff,
    transparent: true,
    opacity: 0.3,
    depthTest: false,
    side: THREE.DoubleSide
  });

  constructor(
    ifcObjects: THREE.Object3D[],
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) {
    this.loader = new IFCLoader();
    this.models = ifcObjects;
    this.scene = scene;
    this.caster = new IFCRaycaster(this.models, camera, renderer);
    this.preselection = new IfcSelection(this.loader, this.scene, this.preselectMat);
    this.selection = new IfcSelection(this.loader, this.scene, this.selectMat);
  }

  async loadIfc(file: File, scene: THREE.Scene) {
    const url = URL.createObjectURL(file);
    await this.loadIfcUrl(url, scene);
  }

  async loadIfcUrl(url: string, scene: THREE.Scene) {
    try {
      const object = await this.loader.loadAsync(url);
      this.models.push(object);
      // @ts-ignore
      scene.add(object);
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

  preselect(event: any) {
    this.caster.castRay(event, this.preselection.select);
  }

  select(event: any, indirect: boolean, recursive: boolean) {
    const result = this.caster.castRay(event, this.selection.select);
    if (result == null || result.modelID == null || result.id == null) return null;
    return this.getProperties(result.modelID, result.id, indirect, recursive);
  }
}
