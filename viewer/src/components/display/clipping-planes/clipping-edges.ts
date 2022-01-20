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
  IFCCOLUMN,
  IFCDOOR,
  IFCFURNISHINGELEMENT,
  IFCMEMBER,
  IFCPLATE,
  IFCROOF,
  IFCSLAB,
  IFCSTAIRFLIGHT,
  IFCWALL,
  IFCWALLSTANDARDCASE,
  IFCWINDOW
} from 'web-ifc';
import { IfcManager } from '../../ifc';
import { IfcContext } from '../../context';

export interface Style {
  ids: number[];
  categories: number[];
  subsets: Mesh[];
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

export class ClippingEdges {
  static readonly styles: StyleList = {};
  static forceStyleUpdate = false;
  edges: EdgesItems = {};

  private static invisibleMaterial = new MeshBasicMaterial({ visible: false });
  private static defaultMaterial = new LineMaterial({ color: 0x000000, linewidth: 0.001 });
  // Helpers
  private static readonly basicEdges = new LineSegments();
  private isVisible = true;
  private inverseMatrix = new Matrix4();
  private localPlane = new Plane();
  private tempLine = new Line3();
  private tempVector = new Vector3();
  private context: IfcContext;
  private clippingPlane: Plane;
  private ifc: IfcManager;
  private stylesInitialized = false;

  constructor(context: IfcContext, clippingPlane: Plane, ifc: IfcManager) {
    this.context = context;
    this.clippingPlane = clippingPlane;
    this.ifc = ifc;
  }

  get visible() {
    return this.isVisible;
  }

  set visible(visible: boolean) {
    this.isVisible = visible;
    const allEdges = Object.values(this.edges);
    allEdges.forEach((edges) => {
      edges.mesh.visible = visible;
      if (visible) this.context.getScene().add(edges.mesh);
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

  remove() {
    const edges = Object.values(this.edges);
    edges.forEach((edge) => {
      edge.generatorGeometry.dispose();
      edge.mesh.geometry.dispose();
      // @ts-ignore
      edge.mesh.geometry = undefined;
      if (edge.mesh.parent) {
        edge.mesh.removeFromParent();
      }
    });
  }

  async updateEdges() {
    if (!this.stylesInitialized) {
      await this.createDefaultStyles();
    }

    if (ClippingEdges.forceStyleUpdate) {
      await this.updateStylesGeometry();
      ClippingEdges.forceStyleUpdate = false;
    }

    // TODO: This is temporary; probably the edges object need to be located in the scene
    // Need to solve Z-fighting with models in that case
    // const model = this.context.items.ifcModels[0];

    Object.keys(ClippingEdges.styles).forEach((styleName) => {
      this.drawEdges(styleName);
    });
  }

  // Creates a new style that applies to all clipping edges
  async newStyle(
    styleName: string,
    categories: number[],
    material = ClippingEdges.defaultMaterial
  ) {
    const subsets: Mesh[] = [];
    const ids = this.context.items.ifcModels.map((model) => model.modelID);

    for (let i = 0; i < ids.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      subsets.push(await this.newSubset(styleName, ids[i], categories));
    }

    material.clippingPlanes = this.context.getClippingPlanes();
    ClippingEdges.styles[styleName] = {
      ids,
      categories,
      material,
      subsets
    };
  }

  async updateStylesGeometry() {
    const styleNames = Object.keys(ClippingEdges.styles);
    for (let i = 0; i < styleNames.length; i++) {
      const name = styleNames[i];
      const style = ClippingEdges.styles[name];

      const ids = this.context.items.ifcModels.map((model) => model.modelID);

      style.subsets.length = 0;

      for (let i = 0; i < ids.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        style.subsets.push(await this.newSubset(name, ids[i], style.categories));
      }
    }
  }

  // Creates some basic styles so that users don't have to create it each time
  private async createDefaultStyles() {
    if (Object.keys(ClippingEdges.styles).length === 0) {
      await this.newStyle(
        'thick',
        [IFCWALLSTANDARDCASE, IFCWALL, IFCSLAB, IFCSTAIRFLIGHT, IFCCOLUMN, IFCBEAM, IFCROOF],
        new LineMaterial({ color: 0x000000, linewidth: 0.0015 })
      );

      await this.newStyle(
        'thin',
        [IFCWINDOW, IFCPLATE, IFCMEMBER, IFCDOOR, IFCFURNISHINGELEMENT],
        new LineMaterial({ color: 0x333333, linewidth: 0.001 })
      );

      this.stylesInitialized = true;
    }
  }

  // Creates a new subset. This allows to apply a style just to a specific set of items
  private async newSubset(styleName: string, modelID: number, categories: number[]) {
    const ids = await this.getItemIDs(modelID, categories);
    const manager = this.ifc.loader.ifcManager;
    if (ids.length > 0) {
      return manager.createSubset({
        modelID,
        ids,
        customID: styleName,
        material: ClippingEdges.invisibleMaterial,
        removePrevious: true,
        scene: this.context.getScene(),
        applyBVH: true
      });
    }
    const subset = manager.getSubset(modelID, ClippingEdges.invisibleMaterial, styleName);
    if (subset) {
      manager.clearSubset(modelID, styleName, ClippingEdges.invisibleMaterial);
      return subset;
    }
    return new Mesh();
  }

  private async getItemIDs(modelID: number, categories: number[]) {
    const ids: number[] = [];
    for (let j = 0; j < categories.length; j++) {
      // eslint-disable-next-line no-await-in-loop
      const found = await this.ifc.getAllItemsOfType(modelID, categories[j], false);
      ids.push(...found);
    }
    const visibleItems = this.getVisibileItems(modelID);
    return ids.filter((id) => visibleItems.has(id));
  }

  private getVisibileItems(modelID: number) {
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

    const notEmptySubsets = style.subsets.filter((subset) => subset.geometry);
    notEmptySubsets.forEach((subset) => {
      if (!subset.geometry.boundsTree)
        throw new Error('Boundstree not found for clipping edges subset.');

      this.inverseMatrix.copy(subset.matrixWorld).invert();
      this.localPlane.copy(this.clippingPlane).applyMatrix4(this.inverseMatrix);

      subset.geometry.boundsTree.shapecast({
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
            posAttr.setXYZ(index, this.tempVector.x, this.tempVector.y, this.tempVector.z);
            count++;
            index++;
          }

          this.tempLine.start.copy(tri.b);
          this.tempLine.end.copy(tri.c);
          if (this.localPlane.intersectLine(this.tempLine, this.tempVector)) {
            posAttr.setXYZ(index, this.tempVector.x, this.tempVector.y, this.tempVector.z);
            count++;
            index++;
          }

          this.tempLine.start.copy(tri.c);
          this.tempLine.end.copy(tri.a);
          if (this.localPlane.intersectLine(this.tempLine, this.tempVector)) {
            posAttr.setXYZ(index, this.tempVector.x, this.tempVector.y, this.tempVector.z);
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
      this.context.getScene().add(edges.mesh);
    }
  }
}
