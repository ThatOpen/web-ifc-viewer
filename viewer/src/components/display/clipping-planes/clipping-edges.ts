import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import {
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  Line3,
  LineSegments,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Plane,
  Vector3
} from 'three';
import {
  IFCBEAM,
  IFCBUILDINGELEMENTPROXY,
  IFCCOLUMN,
  IFCDOOR,
  IFCFOOTING,
  IFCFURNISHINGELEMENT,
  IFCMEMBER,
  IFCPLATE,
  IFCPROXY,
  IFCROOF,
  IFCSLAB,
  IFCSTAIRFLIGHT,
  IFCWALL,
  IFCWALLSTANDARDCASE,
  IFCWINDOW
} from 'web-ifc';
import { IFCModel } from 'web-ifc-three/IFC/components/IFCModel';
import { IfcManager } from '../../ifc';
import { IfcContext } from '../../context';

export interface Style {
  ids: number[];
  categories: number[];
  meshes: Mesh[];
  material: LineMaterial;
}

export interface StyleList {
  [styleName: string]: Style;
}

export interface EdgesItems {
  [styleName: string]: {
    generatorGeometry: BufferGeometry;
    mesh: LineSegments2;
  };
}

export interface Model extends Mesh {
  modelID: number;
}

export class ClippingEdges {
  static readonly styles: StyleList = {};
  static forceStyleUpdate = false;
  static createDefaultIfcStyles = true;
  static edgesParent: any = null;
  private static invisibleMaterial = new MeshBasicMaterial({ visible: false });
  private static defaultMaterial = new LineMaterial({ color: 0x000000, linewidth: 0.001 });
  static context: IfcContext;
  static ifc: IfcManager;

  // Helpers
  private static basicEdges = new LineSegments();
  edges: EdgesItems = {};

  private isVisible = true;
  private inverseMatrix = new Matrix4();
  private localPlane = new Plane();
  private tempLine = new Line3();
  private tempVector = new Vector3();
  private readonly clippingPlane: Plane;
  private stylesInitialized = false;

  constructor(clippingPlane: Plane) {
    this.clippingPlane = clippingPlane;
  }

  get visible() {
    return this.isVisible;
  }

  set visible(visible: boolean) {
    this.isVisible = visible;
    const allEdges = Object.values(this.edges);
    allEdges.forEach((edges) => {
      edges.mesh.visible = visible;
      if (visible) ClippingEdges.context.getScene().add(edges.mesh);
      else edges.mesh.removeFromParent();
    });
    if (visible) this.updateEdges();
  }

  // Initializes the helper geometry used to compute the vertices
  private static newGeneratorGeometry() {
    // create line geometry with enough data to hold 100000 segments
    const generatorGeometry = new BufferGeometry();
    const linePosAttr = new BufferAttribute(new Float32Array(300000), 3, false);
    linePosAttr.setUsage(DynamicDrawUsage);
    generatorGeometry.setAttribute('position', linePosAttr);
    return generatorGeometry;
  }

  dispose() {
    Object.values(this.edges).forEach((edge) => {
      if (edge.generatorGeometry.boundsTree) edge.generatorGeometry.disposeBoundsTree();
      edge.generatorGeometry.dispose();
      if (edge.mesh.geometry.boundsTree) edge.mesh.geometry.disposeBoundsTree();
      edge.mesh.geometry.dispose();
      edge.mesh.removeFromParent();
      (edge.mesh as any) = null;
    });

    (this.edges as any) = null;
    (this.clippingPlane as any) = null;
  }

  disposeStylesAndHelpers() {
    if (ClippingEdges.basicEdges) {
      ClippingEdges.basicEdges.removeFromParent();
      ClippingEdges.basicEdges.geometry.dispose();
      (ClippingEdges.basicEdges as any) = null;
      ClippingEdges.basicEdges = new LineSegments();
    }

    (ClippingEdges.context as any) = null;
    (ClippingEdges.ifc as any) = null;
    ClippingEdges.edgesParent = undefined;

    if (!ClippingEdges.styles) return;
    const styles = Object.values(ClippingEdges.styles);

    styles.forEach((style) => {
      style.ids.length = 0;
      style.meshes.forEach((mesh) => {
        mesh.removeFromParent();
        mesh.geometry.dispose();
        if (mesh.geometry.boundsTree) mesh.geometry.disposeBoundsTree();
        if (Array.isArray(mesh.material)) mesh.material.forEach((mat) => mat.dispose());
        else mesh.material.dispose();
      });
      style.meshes.length = 0;
      style.categories.length = 0;
      style.material.dispose();
    });

    (ClippingEdges.styles as any) = null;
    (ClippingEdges.styles as any) = {};
  }

  async updateEdges() {
    if (ClippingEdges.createDefaultIfcStyles) {
      await this.updateIfcStyles();
    }

    if (ClippingEdges.forceStyleUpdate) {
      this.updateSubsetsTranformation();
    }

    Object.keys(ClippingEdges.styles).forEach((styleName) => {
      try {
        // this can trow error if there is an empty mesh, we still want to update other edges so we catch ere
        this.drawEdges(styleName);
      } catch (e: unknown) {
        console.error('error in drawing edges', e);
      }
    });
  }

  // Creates a new style that applies to all clipping edges for IFC models
  static async newStyle(
    styleName: string,
    categories: number[],
    material = ClippingEdges.defaultMaterial
  ) {
    const subsets: Mesh[] = [];
    const models = ClippingEdges.context.items.ifcModels;

    for (let i = 0; i < models.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const subset = await ClippingEdges.newSubset(styleName, models[i], categories);
      if (subset) {
        subsets.push(subset);
      }
    }

    material.clippingPlanes = ClippingEdges.context.getClippingPlanes();
    ClippingEdges.styles[styleName] = {
      ids: models.map((model) => model.modelID),
      categories,
      material,
      meshes: subsets
    };
  }

  // Creates a new style that applies to all clipping edges for generic models
  static async newStyleFromMesh(
    styleName: string,
    meshes: Model[],
    material = ClippingEdges.defaultMaterial
  ) {
    const ids = meshes.map((mesh) => mesh.modelID);

    meshes.forEach((mesh) => {
      if (!mesh.geometry.boundsTree) mesh.geometry.computeBoundsTree();
    });

    material.clippingPlanes = ClippingEdges.context.getClippingPlanes();
    ClippingEdges.styles[styleName] = {
      ids,
      categories: [],
      material,
      meshes
    };
  }

  async updateStylesIfcGeometry() {
    const styleNames = Object.keys(ClippingEdges.styles);
    for (let i = 0; i < styleNames.length; i++) {
      const name = styleNames[i];
      const style = ClippingEdges.styles[name];

      const models = ClippingEdges.context.items.ifcModels;

      style.meshes.length = 0;

      for (let i = 0; i < models.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const subset = await ClippingEdges.newSubset(name, models[i], style.categories);
        if (subset) {
          style.meshes.push(subset);
        }
      }
    }
  }

  private updateSubsetsTranformation() {
    const styleNames = Object.keys(ClippingEdges.styles);
    for (let i = 0; i < styleNames.length; i++) {
      const styleName = styleNames[i];
      const style = ClippingEdges.styles[styleName];
      style.meshes.forEach((mesh) => {
        const model = ClippingEdges.context.items.ifcModels.find(
          (model) => model.modelID === (mesh as IFCModel).modelID
        );

        if (model) {
          mesh.position.copy(model.position);
          mesh.rotation.copy(model.rotation);
          mesh.scale.copy(model.scale);
        }
      });
    }
    ClippingEdges.forceStyleUpdate = false;
  }

  private async updateIfcStyles() {
    if (!this.stylesInitialized) {
      await this.createDefaultIfcStyles();
    }

    if (ClippingEdges.forceStyleUpdate) {
      await this.updateStylesIfcGeometry();
      ClippingEdges.forceStyleUpdate = false;
    }
  }

  // Creates some basic styles so that users don't have to create it each time
  private async createDefaultIfcStyles() {
    if (Object.keys(ClippingEdges.styles).length === 0) {
      await ClippingEdges.newStyle(
        'thick',
        [
          IFCWALLSTANDARDCASE,
          IFCWALL,
          IFCSLAB,
          IFCSTAIRFLIGHT,
          IFCCOLUMN,
          IFCBEAM,
          IFCROOF,
          IFCBUILDINGELEMENTPROXY,
          IFCPROXY
        ],
        new LineMaterial({ color: 0x000000, linewidth: 0.0015 })
      );

      await ClippingEdges.newStyle(
        'thin',
        [
          IFCWINDOW,
          IFCPLATE,
          IFCMEMBER,
          IFCDOOR,
          IFCFURNISHINGELEMENT,
          IFCPROXY,
          IFCBUILDINGELEMENTPROXY,
          IFCFOOTING
        ],
        new LineMaterial({ color: 0x333333, linewidth: 0.001 })
      );

      this.stylesInitialized = true;
    }
  }

  // Creates a new subset. This allows to apply a style just to a specific set of items
  private static async newSubset(styleName: string, model: IFCModel, categories: number[]) {
    const modelID = model.modelID;
    const ids = await this.getItemIDs(modelID, categories);

    // If no items were found, no geometry is created for this style
    if (!ids.length) return null;

    const manager = this.ifc.loader.ifcManager;
    let subset;

    if (ids.length > 0) {
      subset = manager.createSubset({
        modelID,
        ids,
        customID: styleName,
        material: ClippingEdges.invisibleMaterial,
        removePrevious: true,
        scene: ClippingEdges.context.getScene(),
        applyBVH: true
      });
    } else {
      subset = manager.getSubset(modelID, ClippingEdges.invisibleMaterial, styleName);
    }
    subset.position.copy(model.position);
    subset.rotation.copy(model.rotation);
    subset.scale.copy(model.scale);
    return subset;
  }

  private static async getItemIDs(modelID: number, categories: number[]) {
    const ids: number[] = [];
    for (let j = 0; j < categories.length; j++) {
      // eslint-disable-next-line no-await-in-loop
      const found = await this.ifc.getAllItemsOfType(modelID, categories[j], false);
      ids.push(...found);
    }
    const visibleItems = this.getVisibileItems(modelID);
    return ids.filter((id) => visibleItems.has(id));
  }

  private static getVisibileItems(modelID: number) {
    const visibleItems = new Set<number>();
    const model = this.context.items.ifcModels.find((model) => model.modelID === modelID);
    if (!model) throw new Error('IFC model was not found for computing clipping edges.');
    if (!model.geometry.index) throw new Error('Indices were not found for clipping edges.');
    const indices = new Set<number>(model.geometry.index.array as Uint8Array);
    indices.forEach((index) => {
      visibleItems.add(model.geometry.attributes.expressID.getX(index));
    });
    return visibleItems;
  }

  // Creates the geometry of the clipping edges
  private newThickEdges(styleName: string) {
    const material = ClippingEdges.styles[styleName].material;
    const thickLineGeometry = new LineSegmentsGeometry();
    const thickEdges = new LineSegments2(thickLineGeometry, material);
    thickEdges.material.polygonOffset = true;
    thickEdges.material.polygonOffsetFactor = -2;
    thickEdges.material.polygonOffsetUnits = 1;
    thickEdges.renderOrder = 3;
    return thickEdges;
  }

  // Source: https://gkjohnson.github.io/three-mesh-bvh/example/bundle/clippedEdges.html
  private drawEdges(styleName: string) {
    const style = ClippingEdges.styles[styleName];

    // if (!style.subsets.geometry.boundsTree) return;

    if (!this.edges[styleName]) {
      this.edges[styleName] = {
        generatorGeometry: ClippingEdges.newGeneratorGeometry(),
        mesh: this.newThickEdges(styleName)
      };
    }

    const edges = this.edges[styleName];

    let index = 0;
    const posAttr = edges.generatorGeometry.attributes.position;
    // @ts-ignore
    posAttr.array.fill(0);

    const notEmptyMeshes = style.meshes.filter((subset) => subset.geometry);
    notEmptyMeshes.forEach((mesh) => {
      if (!mesh.geometry.boundsTree) {
        throw new Error('Boundstree not found for clipping edges subset.');
      }

      this.inverseMatrix.copy(mesh.matrixWorld).invert();
      this.localPlane.copy(this.clippingPlane).applyMatrix4(this.inverseMatrix);

      mesh.geometry.boundsTree.shapecast({
        intersectsBounds: (box: any) => {
          return this.localPlane.intersectsBox(box) as any;
        },

        // @ts-ignore
        intersectsTriangle: (tri: any) => {
          // check each triangle edge to see if it intersects with the plane. If so then
          // add it to the list of segments.
          let count = 0;
          this.tempLine.start.copy(tri.a);
          this.tempLine.end.copy(tri.b);
          if (this.localPlane.intersectLine(this.tempLine, this.tempVector)) {
            const result = this.tempVector.applyMatrix4(mesh.matrixWorld);
            posAttr.setXYZ(index, result.x, result.y, result.z);
            count++;
            index++;
          }

          this.tempLine.start.copy(tri.b);
          this.tempLine.end.copy(tri.c);
          if (this.localPlane.intersectLine(this.tempLine, this.tempVector)) {
            const result = this.tempVector.applyMatrix4(mesh.matrixWorld);
            posAttr.setXYZ(index, result.x, result.y, result.z);
            count++;
            index++;
          }

          this.tempLine.start.copy(tri.c);
          this.tempLine.end.copy(tri.a);
          if (this.localPlane.intersectLine(this.tempLine, this.tempVector)) {
            const result = this.tempVector.applyMatrix4(mesh.matrixWorld);
            posAttr.setXYZ(index, result.x, result.y, result.z);
            count++;
            index++;
          }

          // If we only intersected with one or three sides then just remove it. This could be handled
          // more gracefully.
          if (count !== 2) {
            index -= count;
          }
        }
      });
    });

    // set the draw range to only the new segments and offset the lines so they don't intersect with the geometry
    edges.mesh.geometry.setDrawRange(0, index);
    edges.mesh.position.copy(this.clippingPlane.normal).multiplyScalar(0.0001);
    posAttr.needsUpdate = true;

    // Update the edges geometry only if there is no NaN in the output (which means there's been an error)
    if (!Number.isNaN(edges.generatorGeometry.attributes.position.array[0])) {
      ClippingEdges.basicEdges.geometry = edges.generatorGeometry;
      edges.mesh.geometry.fromLineSegments(ClippingEdges.basicEdges);
      const parent = ClippingEdges.edgesParent || ClippingEdges.context.getScene();
      parent.add(edges.mesh);
      ClippingEdges.context.renderer.postProduction.excludedItems.add(edges.mesh);
    }
  }
}
