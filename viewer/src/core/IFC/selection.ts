import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { IfcMesh } from 'web-ifc-three/IFC/BaseDefinitions';
import * as THREE from 'three';

export class IfcSelection {
  private ifcLoader: IFCLoader;
  private selected: number;
  private modelID: number;
  private material: THREE.Material | undefined;
  private scene: THREE.Scene;

  constructor(ifcLoader: IFCLoader, scene: THREE.Scene, material?: THREE.Material) {
    this.ifcLoader = ifcLoader;
    this.selected = -1;
    this.modelID = -1;
    this.scene = scene;
    this.material = material;
  }

  select = (event: any, item: THREE.Intersection) => {
    if (this.selected == item.faceIndex || item.faceIndex == null) return;
    this.selected = item.faceIndex;
    const mesh = item.object as IfcMesh;
    const id = this.ifcLoader.getExpressId(mesh.geometry, item.faceIndex);
    if (id == undefined) return null;
    this.removePreviousSelection(mesh);
    this.modelID = mesh.modelID;
    this.newSelection(id);
    return id;
  }

  selectProps = (event: any, item: THREE.Intersection) => {
    const id = this.select(event, item);
    if(id) return this.getProperties(id);
    return null;
  }
  
  getProperties(id: number){
    const props = this.ifcLoader.getItemProperties(this.modelID, id);
    props.psets = this.ifcLoader.getPropertySets(this.modelID, id, true);
    props.type = this.ifcLoader.getTypeProperties(this.modelID, id);
    console.log(props);
    return props;
  }

  newSelection = (id: number) => {
    this.ifcLoader.createSubset({
      scene: this.scene,
      modelID: this.modelID,
      ids: [id],
      removePrevious: true,
      material: this.material
    });
  }

  removePreviousSelection(mesh: IfcMesh) {
    if (this.modelID != undefined && this.modelID != mesh.modelID) {
      this.ifcLoader.removeSubset(this.modelID, this.scene, this.material);
    }
  }
}
