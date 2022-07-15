import {
  Float32BufferAttribute,
  Line,
  Line3,
  MathUtils,
  Matrix4,
  MeshBasicMaterial,
  PerspectiveCamera,
  Vector2
} from 'three';
import { IFCModel } from 'web-ifc-three/IFC/components/IFCModel';
import { ShapeCaster } from './shape-caster';
import { IfcContext } from '../context';

export enum SelectionWindowMode {
  lasso,
  box
}

export class SelectionWindow {
  toolMode: SelectionWindowMode = SelectionWindowMode.box;
  onSelected?: (model: IFCModel, indices: number[]) => void;
  selectionShape = new Line();

  private dragging = false;

  private selectionPoints: number[] = [];
  private selectionShapeNeedsUpdate = false;
  private selectionNeedsUpdate = false;

  private startX = -Infinity;
  private startY = -Infinity;
  private prevX = -Infinity;
  private prevY = -Infinity;

  private tempVec0 = new Vector2();
  private tempVec1 = new Vector2();
  private tempVec2 = new Vector2();
  private toScreenSpaceMatrix = new Matrix4();
  private lassoSegments: Line3[] = [];

  private caster = new ShapeCaster(this.toScreenSpaceMatrix, this.lassoSegments);

  constructor(private context: IfcContext) {
    this.setupSelectionShape();
    this.updateAll();
  }

  setupSelectionShape() {
    this.selectionShape = new Line();
    const mat = this.selectionShape.material as MeshBasicMaterial;
    mat.depthTest = false;
    mat.color.set(0xff9800).convertSRGBToLinear();
    this.selectionShape.renderOrder = 1;
    this.selectionShape.position.z = -0.2;
    this.selectionShape.scale.setScalar(1);
    this.selectionShape.frustumCulled = false;
    this.context.getCamera().add(this.selectionShape);
  }

  onDragStarted() {
    this.prevX = this.context.mouse.rawPosition.x;
    this.prevY = this.context.mouse.rawPosition.y;
    this.startX = this.context.mouse.position.x;
    this.startY = this.context.mouse.position.y;
    this.selectionPoints.length = 0;
    this.dragging = true;

    const camera = this.context.getCamera();
    if (!camera.parent) {
      this.context.getScene().add(camera);
    }

    if (camera instanceof PerspectiveCamera) {
      const tan = Math.tan((MathUtils.DEG2RAD * camera.fov) / 2);
      const yScale = tan * this.selectionShape.position.z;
      this.selectionShape.scale.set(-yScale * camera.aspect, -yScale, 1);
    }
  }

  onDragFinished() {
    this.dragging = false;
    this.selectionShape.visible = false;
    if (this.selectionPoints.length) {
      this.selectionNeedsUpdate = true;
    }

    this.updateAll();
  }

  onDrag() {
    if (!this.dragging) return;

    const ex = this.context.mouse.rawPosition.x;
    const ey = this.context.mouse.rawPosition.y;

    const nx = this.context.mouse.position.x;
    const ny = this.context.mouse.position.y;

    if (this.toolMode === SelectionWindowMode.box) {
      // set points for the corner of the box
      this.selectionPoints.length = 3 * 5;

      this.selectionPoints[0] = this.startX;
      this.selectionPoints[1] = this.startY;
      this.selectionPoints[2] = 0;

      this.selectionPoints[3] = nx;
      this.selectionPoints[4] = this.startY;
      this.selectionPoints[5] = 0;

      this.selectionPoints[6] = nx;
      this.selectionPoints[7] = ny;
      this.selectionPoints[8] = 0;

      this.selectionPoints[9] = this.startX;
      this.selectionPoints[10] = ny;
      this.selectionPoints[11] = 0;

      this.selectionPoints[12] = this.startX;
      this.selectionPoints[13] = this.startY;
      this.selectionPoints[14] = 0;

      if (ex !== this.prevX || ey !== this.prevY) {
        this.selectionShapeNeedsUpdate = true;
      }

      this.prevX = ex;
      this.prevY = ey;
      this.selectionShape.visible = true;
    } else {
      // If the mouse hasn't moved a lot since the last point
      const mouseDidntMuchMuch = Math.abs(ex - this.prevX) >= 3 || Math.abs(ey - this.prevY) >= 3;
      if (mouseDidntMuchMuch) {
        // Check if the mouse moved in roughly the same direction as the previous point
        // and replace it if so.
        const i = this.selectionPoints.length / 3 - 1;
        const i3 = i * 3;
        let doReplace = false;
        if (this.selectionPoints.length > 3) {
          // prev segment direction
          this.tempVec0.set(this.selectionPoints[i3 - 3], this.selectionPoints[i3 - 3 + 1]);
          this.tempVec1.set(this.selectionPoints[i3], this.selectionPoints[i3 + 1]);
          this.tempVec1.sub(this.tempVec0).normalize();

          // this segment direction
          this.tempVec0.set(this.selectionPoints[i3], this.selectionPoints[i3 + 1]);
          this.tempVec2.set(nx, ny);
          this.tempVec2.sub(this.tempVec0).normalize();

          const dot = this.tempVec1.dot(this.tempVec2);
          doReplace = dot > 0.99;
        }

        if (doReplace) {
          this.selectionPoints[i3] = nx;
          this.selectionPoints[i3 + 1] = ny;
        } else {
          this.selectionPoints.push(nx, ny, 0);
        }

        this.selectionShapeNeedsUpdate = true;
        this.selectionShape.visible = true;

        this.prevX = ex;
        this.prevY = ey;
      }
    }

    this.updateSelectionLasso();
  }

  updateSelectionLasso() {
    if (this.selectionShapeNeedsUpdate) {
      if (this.toolMode === SelectionWindowMode.lasso) {
        const ogLength = this.selectionPoints.length;
        this.selectionPoints.push(
          this.selectionPoints[0],
          this.selectionPoints[1],
          this.selectionPoints[2]
        );

        this.selectionShape.geometry.setAttribute(
          'position',
          new Float32BufferAttribute(this.selectionPoints, 3, false)
        );

        this.selectionPoints.length = ogLength;
      } else {
        this.selectionShape.geometry.setAttribute(
          'position',
          new Float32BufferAttribute(this.selectionPoints, 3, false)
        );
      }

      this.selectionShapeNeedsUpdate = false;
    }
  }

  updateAll() {
    const models = this.context.items.pickableIfcModels;
    models.forEach((model) => {
      this.update(model);
    });
    this.selectionNeedsUpdate = false;
  }

  update(model: IFCModel) {
    if (this.selectionNeedsUpdate && this.selectionPoints.length > 0) {
      this.updateSelection(model);
    }
  }

  updateSelection(model: IFCModel) {
    // TODO: Possible improvements
    // - Correctly handle the camera near clip
    // - Improve line line intersect performance?

    const camera = this.context.getCamera();
    this.toScreenSpaceMatrix
      .copy(model.matrixWorld)
      .premultiply(camera.matrixWorldInverse)
      .premultiply(camera.projectionMatrix);

    // create scratch points and lines to use for selection
    while (this.lassoSegments.length < this.selectionPoints.length) {
      this.lassoSegments.push(new Line3());
    }

    this.lassoSegments.length = this.selectionPoints.length;

    for (let s = 0, l = this.selectionPoints.length; s < l; s += 3) {
      const line = this.lassoSegments[s];
      const sNext = (s + 3) % l;
      line.start.x = this.selectionPoints[s];
      line.start.y = this.selectionPoints[s + 1];

      line.end.x = this.selectionPoints[sNext];
      line.end.y = this.selectionPoints[sNext + 1];
    }

    const indices: number[] = [];
    this.caster.shapeCast(model, indices);
    if (this.onSelected) {
      this.onSelected(model, indices);
    }
  }
}
