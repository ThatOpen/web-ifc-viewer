import { DoubleSide, Material, Mesh, MeshLambertMaterial } from 'three';
import { IFCModel } from 'web-ifc-three/IFC/components/IFCModel';
import { IfcSelection } from './selection';
import { IfcManager } from '../ifc-manager';
import { IfcContext } from '../../context';

export class IfcSelector {
  preselection: IfcSelection;
  selection: IfcSelection;
  highlight: IfcSelection;
  defHighlightMat: Material;

  private readonly defPreselectMat: Material;
  private readonly defSelectMat: Material;
  private readonly userDataField = 'ifcjsFadedModel';

  constructor(private context: IfcContext, private ifc: IfcManager) {
    this.defSelectMat = this.initializeDefMaterial(0xff33ff, 0.3);
    this.defPreselectMat = this.initializeDefMaterial(0xff55ff, 0.5);
    this.defHighlightMat = this.initializeDefMaterial(0xeeeeee, 0.05);

    this.preselection = new IfcSelection(context, this.ifc.loader, this.defPreselectMat);
    this.preselection.fastRemovePrevious = true;
    this.selection = new IfcSelection(context, this.ifc.loader, this.defSelectMat);
    this.highlight = new IfcSelection(context, this.ifc.loader);
    this.highlight.renderOrder = -1;
  }

  dispose() {
    this.defPreselectMat?.dispose();
    (this.defHighlightMat as any) = null;
    this.defSelectMat?.dispose();
    (this.defSelectMat as any) = null;
    this.defHighlightMat?.dispose();
    (this.defHighlightMat as any) = null;

    this.preselection.dispose();
    (this.preselection as any) = null;
    this.selection.dispose();
    (this.selection as any) = null;
    this.highlight.dispose();
    (this.highlight as any) = null;
  }

  /**
   * Highlights the item pointed by the cursor.
   */
  async prePickIfcItem() {
    const found = this.context.castRayIfc();
    // This is more efficient than destroying and recreating the subset when the user hovers away
    if (!found) {
      this.preselection.toggleVisibility(false);
      return;
    }

    await this.preselection.pick(found);
  }

  /**
   * Highlights the item pointed by the cursor and gets is properties.
   * @focusSelection If true, animate the perspectiveCamera to focus the current selection
   * @removePrevious whether to remove the previous subset
   */
  async pickIfcItem(focusSelection = false, removePrevious = true) {
    const found = this.context.castRayIfc();
    if (!found) return null;
    const result = await this.selection.pick(found, focusSelection, removePrevious);
    if (result == null || result.modelID == null || result.id == null) return null;

    return result;
  }

  /**
   * Highlights the item pointed by the cursor and gets is properties, without applying any material to it.
   * @focusSelection If true, animate the perspectiveCamera to focus the current selection
   * @removePrevious whether to remove the previous subset
   */
  async highlightIfcItem(focusSelection = false, removePrevious = true) {
    const found = this.context.castRayIfc();
    if (!found) return null;

    this.fadeAwayModels();

    const result = await this.highlight.pick(found, focusSelection, removePrevious);
    if (result == null || result.modelID == null || result.id == null) return null;

    return result;
  }

  /**
   * Highlights the item with the given ID with the picking material.
   * @modelID ID of the IFC model.
   * @id Express ID of the item.
   * @focusSelection If true, animate the perspectiveCamera to focus the current selection
   * @removePrevious whether to remove the previous subset
   */
  async pickIfcItemsByID(
    modelID: number,
    ids: number[],
    focusSelection = false,
    removePrevious = true
  ) {
    await this.selection.pickByID(modelID, ids, focusSelection, removePrevious);
  }

  /**
   * Highlights the item with the given ID with the prepicking material.
   * @modelID ID of the IFC model.
   * @id Express ID of the item.
   * @focusSelection If true, animate the perspectiveCamera to focus the current selection
   * @removePrevious whether to remove the previous subset
   */
  async prepickIfcItemsByID(
    modelID: number,
    ids: number[],
    focusSelection = false,
    removePrevious = true
  ) {
    await this.preselection.pickByID(modelID, ids, focusSelection, removePrevious);
  }

  /**
   * Highlights the item with the given ID and fades away the model.
   * @modelID ID of the IFC model.
   * @id Express ID of the item.
   * @focusSelection If true, animate the perspectiveCamera to focus the current selection
   * @removePrevious whether to remove the previous subset
   */
  async highlightIfcItemsByID(
    modelID: number,
    ids: number[],
    focusSelection = false,
    removePrevious = true
  ) {
    this.fadeAwayModels();
    await this.highlight.pickByID(modelID, ids, focusSelection, removePrevious);
  }

  /**
   * Unapplies the picking material.
   */
  unpickIfcItems() {
    this.selection.unpick();
  }

  /**
   * Unapplies the prepicking material.
   */
  unPrepickIfcItems() {
    this.preselection.unpick();
  }

  /**
   * Unapplies the highlight material, removing the fading of the model
   */
  unHighlightIfcItems() {
    this.context.items.ifcModels.forEach((model) => this.unHighlightItem(model));
    this.highlight.unpick();
    if (this.context.renderer.postProduction.active) {
      this.context.renderer.postProduction.visible = true;
    }
  }

  private unHighlightItem(model: IFCModel) {
    const fadedModel = model.userData[this.userDataField];
    if (fadedModel && fadedModel.parent) {
      fadedModel.parent.add(model);
      fadedModel.removeFromParent();
    }
  }

  private fadeAwayModels() {
    this.context.items.ifcModels.forEach((model) => {
      if (!model.userData[this.userDataField]) {
        const mesh = new Mesh(model.geometry, this.defHighlightMat);
        model.userData[this.userDataField] = mesh;
        this.context.renderer.postProduction.excludedItems.add(mesh);
      }

      if (model.parent) {
        const fadedMesh = model.userData[this.userDataField];
        fadedMesh.position.copy(model.position);
        fadedMesh.rotation.copy(model.rotation);
        fadedMesh.scale.copy(model.scale);
        model.parent.add(fadedMesh);
        model.removeFromParent();
      }
    });
  }

  private initializeDefMaterial(color: number, opacity: number) {
    const planes = this.context.getClippingPlanes();
    return new MeshLambertMaterial({
      color,
      opacity,
      transparent: true,
      depthTest: false,
      side: DoubleSide,
      clippingPlanes: planes
    });
  }
}
