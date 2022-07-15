import { LineSegments, EdgesGeometry, Material, Mesh } from 'three';
import { Subset } from 'web-ifc-three/IFC/components/subsets/SubsetManager';
import { IfcContext } from '../context';
import { disposeMeshRecursively } from '../../utils/ThreeUtils';

export class Edges {
  threshold = 30;
  private readonly edges: {
    [name: string]: {
      edges: LineSegments;
      originalMaterials: Material | Material[];
      baseMaterial: Material | undefined;
      model: Mesh;
      active: boolean;
    };
  };

  constructor(private context: IfcContext) {
    this.edges = {};
  }

  private static setupModelMaterial(material: Material) {
    material.polygonOffset = true;
    material.polygonOffsetFactor = 1;
    material.polygonOffsetUnits = 1;
  }

  dispose() {
    const allEdges = Object.values(this.edges);
    allEdges.forEach((item) => {
      disposeMeshRecursively(item.edges as any);
      if (Array.isArray(item.originalMaterials)) {
        item.originalMaterials.forEach((mat) => mat.dispose());
      } else item.originalMaterials.dispose();
      if (item.baseMaterial) item.baseMaterial.dispose();
    });
    (this.edges as any) = null;
  }

  getAll() {
    return Object.keys(this.edges);
  }

  get(name: string) {
    return this.edges[name];
  }

  create(name: string, modelID: number, lineMaterial: Material, material?: Material) {
    const model = this.context.items.ifcModels.find((model) => model.modelID === modelID);
    if (!model) return;
    this.createFromMesh(name, model, lineMaterial, material);
  }

  // use this to create edges of a subset this implements a todo of allowing subsets of edges
  createFromSubset(name: string, subset: Subset, lineMaterial: Material, material?: Material) {
    this.createFromMesh(name, subset, lineMaterial, material);
  }

  createFromMesh(name: string, mesh: Mesh, lineMaterial: Material, material?: Material) {
    const planes = this.context.getClippingPlanes();
    lineMaterial.clippingPlanes = planes;
    if (material) material.clippingPlanes = planes;
    this.setupModelMaterials(mesh);
    const geo = new EdgesGeometry(mesh.geometry, this.threshold);
    lineMaterial.clippingPlanes = this.context.getClippingPlanes();
    this.edges[name] = {
      edges: new LineSegments(geo, lineMaterial),
      originalMaterials: mesh.material,
      baseMaterial: material,
      model: mesh,
      active: false
    };
  }

  toggle(name: string, active?: boolean) {
    const selected = this.edges[name];
    if (!selected) return;
    if (active === undefined) active = !selected.active;
    selected.active = active;
    if (active) {
      const pos = selected.model.position;
      const rot = selected.model.rotation;
      selected.edges.position.set(pos.x, pos.y, pos.z);
      selected.edges.rotation.set(rot.x, rot.y, rot.z);
      if (selected.baseMaterial) selected.model.material = selected.baseMaterial;
      this.context.getScene().add(selected.edges);
      return;
    }
    if (selected.baseMaterial) selected.model.material = selected.originalMaterials;
    selected.edges.removeFromParent();
  }

  private setupModelMaterials(model: Mesh) {
    if (Array.isArray(model.material)) {
      model.material.forEach((mat) => Edges.setupModelMaterial(mat));
      return;
    }
    Edges.setupModelMaterial(model.material);
  }
}
