import { CONTAINED, INTERSECTED, NOT_INTERSECTED } from 'three-mesh-bvh';

export class SelectionWindow {
  toolMode = 'lasso';
  liveUpdate = false;
  wireframe = false;
  displayHelper = false;
  helperDepth = 10;
  rotate = true;

  selectionShape = new THREE.Line();

  selectionPoints = [];
  dragging = false;
  selectionShapeNeedsUpdate = false;
  selectionNeedsUpdate = false;

  // handle building lasso shape
  startX = -Infinity;
  startY = -Infinity;
  prevX = -Infinity;
  prevY = -Infinity;

  tempVec0 = new THREE.Vector2();
  tempVec1 = new THREE.Vector2();
  tempVec2 = new THREE.Vector2();

  toScreenSpaceMatrix = new THREE.Matrix4();
  lassoSegments = [];

  caster = new ShapeCaster(this.toScreenSpaceMatrix, this.lassoSegments);

  constructor(scene, camera, meshes, onSelectedCallback) {
    this.scene = scene;
    this.camera = camera;
    this.meshes = meshes;
    this.onSelected = onSelectedCallback;

    this.setupSelectionShape();
    this.updateAll(meshes);
  }

  setupSelectionShape() {
    this.selectionShape = new THREE.Line();
    this.selectionShape.material.color.set(0xff9800).convertSRGBToLinear();
    this.selectionShape.renderOrder = 1;
    this.selectionShape.position.z = -0.2;
    this.selectionShape.depthTest = false;
    this.selectionShape.scale.setScalar(1);
    this.selectionShape.frustumCulled = false;
    this.camera.add(this.selectionShape);
  }

  onDragStarted(pointerEvent) {
    this.prevX = pointerEvent.clientX;
    this.prevY = pointerEvent.clientY;
    this.startX = (pointerEvent.clientX / window.innerWidth) * 2 - 1;
    this.startY = -((pointerEvent.clientY / window.innerHeight) * 2 - 1);
    this.selectionPoints.length = 0;
    this.dragging = true;

    const yScale =
      Math.tan((THREE.MathUtils.DEG2RAD * this.camera.fov) / 2) * this.selectionShape.position.z;
    this.selectionShape.scale.set(-yScale * this.camera.aspect, -yScale, 1);
  }

  onDragFinished() {
    this.selectionShape.visible = false;
    this.dragging = false;
    if (this.selectionPoints.length) {
      this.selectionNeedsUpdate = true;
    }

    this.updateAll(this.meshes);
  }

  onDrag(pointerEvent) {
    // If the left mouse button is not pressed
    if ((1 & pointerEvent.buttons) === 0) {
      return;
    }

    const ex = pointerEvent.clientX;
    const ey = pointerEvent.clientY;

    const nx = (pointerEvent.clientX / window.innerWidth) * 2 - 1;
    const ny = -((pointerEvent.clientY / window.innerHeight) * 2 - 1);

    if (this.toolMode === 'box') {
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
      if (this.liveUpdate) {
        this.selectionNeedsUpdate = true;
      }
    } else {
      // If the mouse hasn't moved a lot since the last point
      if (Math.abs(ex - this.prevX) >= 3 || Math.abs(ey - this.prevY) >= 3) {
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

        if (this.liveUpdate) {
          this.selectionNeedsUpdate = true;
        }
      }
    }

    this.updateSelectionLasso();
  }

  updateSelectionLasso() {
    if (this.selectionShapeNeedsUpdate) {
      if (this.toolMode === 'lasso') {
        const ogLength = this.selectionPoints.length;
        this.selectionPoints.push(
          this.selectionPoints[0],
          this.selectionPoints[1],
          this.selectionPoints[2]
        );

        this.selectionShape.geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(this.selectionPoints, 3, false)
        );

        this.selectionPoints.length = ogLength;
      } else {
        this.selectionShape.geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(this.selectionPoints, 3, false)
        );
      }

      this.selectionShapeNeedsUpdate = false;
    }
  }

  updateAll(meshes) {
    meshes.forEach((mesh) => {
      this.update(mesh);
    });
  }

  update(mesh) {
    if (this.selectionNeedsUpdate) {
      this.selectionNeedsUpdate = false;
      if (this.selectionPoints.length > 0) {
        this.updateSelection(mesh);
      }
    }
  }

  updateSelection(mesh) {
    // TODO: Possible improvements
    // - Correctly handle the camera near clip
    // - Improve line line intersect performance?

    this.toScreenSpaceMatrix
      .copy(mesh.matrixWorld)
      .premultiply(this.camera.matrixWorldInverse)
      .premultiply(this.camera.projectionMatrix);

    // create scratch points and lines to use for selection
    while (this.lassoSegments.length < this.selectionPoints.length) {
      this.lassoSegments.push(new THREE.Line3());
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

    const indices = [];
    this.caster.shapeCast(mesh, indices);
    this.onSelected(mesh, indices);
  }
}
