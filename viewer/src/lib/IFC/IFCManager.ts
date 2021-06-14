import * as WebIFC from 'web-ifc';
import { IFCParser } from './IFCParser';
import { DisplayManager } from './DisplayManager';
import { ItemPicker } from './ItemPicker';
import { PropertyManager } from './PropertyManager';
import { Display, MapFaceIndexID, MapIDFaceIndex } from './BaseDefinitions';
import { BufferGeometry, Intersection, Mesh, Scene } from 'three';

export class IFCManager {

    private modelID: number;
    private ifcAPI: WebIFC.IfcAPI;
    private mapFaceindexID: MapFaceIndexID;
    private mapIDFaceindex: MapIDFaceIndex;
    private parser: IFCParser;
    private display: DisplayManager;
    private properties: PropertyManager;
    private picker: ItemPicker;

    constructor() {
        this.modelID = 0;
        this.ifcAPI = new WebIFC.IfcAPI();
        this.mapFaceindexID = {};
        this.mapIDFaceindex = {};
        this.parser = new IFCParser(this.ifcAPI, this.mapFaceindexID, this.mapIDFaceindex);
        this.display = new DisplayManager(this.mapIDFaceindex);
        this.properties = new PropertyManager(this.modelID, this.ifcAPI, this.mapFaceindexID, this.mapIDFaceindex);
        this.picker = new ItemPicker(this.display);
    }

    parse(buffer: any) {
        return this.parser.parse(buffer);
    }

    setWasmPath(path: string) {
        this.ifcAPI.SetWasmPath(path);
    }

    pickItem(items: Intersection[], geometry: BufferGeometry, pickTransparent = true) {
        return this.picker.pickItem(items, geometry, pickTransparent);
    }

    setItemsDisplay(items: number[], mesh: Mesh, state: Display, scene: Scene) {
        this.display.setItemsDisplay(items, mesh, state, scene);
    }

    getExpressId(faceIndex: number) {
        return this.properties.getExpressId(faceIndex);
    }

    getItemProperties(id: number, recursive = false) {
        return this.properties.getItemProperties(id, recursive);
    }

    getPropertySets(id: number, recursive = false) {
        return this.properties.getPropertySets(id, recursive);
    }

    getTypeProperties(id: number, recursive = false) {
        return this.properties.getTypeProperties(id, recursive);
    }

    getSpatialStructure() {
        return this.properties.getSpatialStructure();
    }
}
