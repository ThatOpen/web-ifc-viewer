import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { WebIfcAPI } from 'web-ifc-three/IFC/BaseDefinitions';
import { IfcContext } from '../context';
import { geometryTypes } from './geometry-types';

export type Progress = (progress: number, total: number) => void;

export class IfcProperties {
  private readonly context: IfcContext;
  private readonly loader: IFCLoader;
  private webIfc?: WebIfcAPI;

  constructor(context: IfcContext, loader: IFCLoader) {
    this.context = context;
    this.loader = loader;
  }

  dispose() {
    (this.context as any) = null;
    (this.loader as any) = null;
    (this.webIfc as any) = null;
  }

  /**
   * Serializes all the properties of an IFC (exluding the geometry) into an array of Blobs.
   * This is useful for populating databases with IFC data.
   * @modelID ID of the IFC model whose properties to extract.
   * @maxSize (optional) maximum number of entities for each Blob. If not defined, it's infinite (only one Blob will be created).
   * @event (optional) callback called every time a 10% of entities are serialized into Blobs.
   */
  async serializeAllProperties(modelID: number, maxSize?: number, event?: Progress) {
    if (!this.webIfc) this.webIfc = this.loader.ifcManager.ifcAPI;
    const model = this.context.items.ifcModels.find((model) => model.modelID === modelID);
    if (!model) throw new Error('The requested model was not found.');
    const blobs: Blob[] = [];
    await this.getPropertiesAsBlobs(modelID, blobs, maxSize, event);
    return blobs;
  }

  private async getPropertiesAsBlobs(
    modelID: number,
    blobs: Blob[],
    maxSize?: number,
    event?: Progress
  ) {
    const geometriesIDs = await this.getAllGeometriesIDs(modelID);
    let properties = await this.initializePropertiesObject(modelID);
    const allLinesIDs = await this.webIfc!.GetAllLines(modelID);
    const linesCount = allLinesIDs.size();
    let lastEvent = 0.1;

    let counter = 0;
    for (let i = 0; i < linesCount; i++) {
      const id = allLinesIDs.get(i);
      if (!geometriesIDs.has(id)) {
        // eslint-disable-next-line no-await-in-loop
        await this.getItemProperty(modelID, id, properties);
        counter++;
      }
      if (maxSize && counter > maxSize) {
        blobs.push(new Blob([JSON.stringify(properties)], { type: 'application/json' }));
        properties = {};
        counter = 0;
      }
      if (event && i / linesCount > lastEvent) {
        event(i, linesCount);
        lastEvent += 0.1;
      }
    }

    blobs.push(new Blob([JSON.stringify(properties)], { type: 'application/json' }));
  }

  private async getItemProperty(modelID: number, id: number, properties: any) {
    // eslint-disable-next-line no-await-in-loop
    const props = await this.webIfc!.GetLine(modelID, id);
    delete props.expressID;
    this.formatItemProperties(props);
    properties[id] = props;
  }

  private formatItemProperties(props: any) {
    Object.keys(props).forEach((key) => {
      const value = props[key];
      if (value && value.value !== undefined) props[key] = value.value;
      else if (Array.isArray(value))
        props[key] = value.map((item) => {
          if (item && item.value) return item.value;
          return item;
        });
    });
  }

  private async initializePropertiesObject(modelID: number): Promise<any> {
    return {
      0: await this.webIfc!.GetCoordinationMatrix(modelID)
    };
  }

  private async getAllGeometriesIDs(modelID: number) {
    const geometriesIDs = new Set<number>();
    const geomTypesArray = Array.from(geometryTypes);
    for (let i = 0; i < geomTypesArray.length; i++) {
      const category = geomTypesArray[i];
      // eslint-disable-next-line no-await-in-loop
      const ids = await this.webIfc!.GetLineIDsWithType(modelID, category);
      const idsSize = ids.size();
      for (let j = 0; j < idsSize; j++) {
        geometriesIDs.add(ids.get(j));
      }
    }
    return geometriesIDs;
  }
}
