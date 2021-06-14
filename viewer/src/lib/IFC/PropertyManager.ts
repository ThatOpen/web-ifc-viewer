import {
    IfcAPI,
    IFCPROJECT,
    IFCRELAGGREGATES,
    IFCRELCONTAINEDINSPATIALSTRUCTURE,
    IFCRELDEFINESBYPROPERTIES,
    IFCRELDEFINESBYTYPE
} from 'web-ifc';
import { MapFaceIndexID, MapIDFaceIndex } from './BaseDefinitions';

export class PropertyManager {
    private modelID: number;
    private ifcAPI: IfcAPI;
    private mapFaceindexID: MapFaceIndexID;
    private mapIDFaceindex: MapIDFaceIndex;

    constructor(
        modelID: number,
        ifcAPI: IfcAPI,
        mapFaceindexID: MapFaceIndexID,
        mapIDFaceindex: MapIDFaceIndex
    ) {
        this.modelID = modelID;
        this.mapFaceindexID = mapFaceindexID;
        this.mapIDFaceindex = mapIDFaceindex;
        this.ifcAPI = ifcAPI;
    }

    getExpressId(faceIndex: Number) {
        for (let index in this.mapFaceindexID) {
            if (parseInt(index) > faceIndex) return this.mapFaceindexID[index];
        }
        return -1;
    }

    getItemProperties(elementID: number, recursive = false) {
        return this.ifcAPI.GetLine(this.modelID, elementID, recursive);
    }

    getPropertySets(elementID: number, recursive = false) {
        const propSetIds = this.getAllRelatedItemsOfType(
            elementID,
            IFCRELDEFINESBYPROPERTIES,
            'RelatedObjects',
            'RelatingPropertyDefinition'
        );
        return propSetIds.map((id) => this.ifcAPI.GetLine(this.modelID, id, recursive));
    }

    getTypeProperties(elementID: number, recursive = false) {
        const typeId = this.getAllRelatedItemsOfType(
            elementID,
            IFCRELDEFINESBYTYPE,
            'RelatedObjects',
            'RelatingType'
        );
        return typeId.map((id) => this.ifcAPI.GetLine(this.modelID, id, recursive));
    }

    getSpatialStructure() {
        let lines = this.ifcAPI.GetLineIDsWithType(this.modelID, IFCPROJECT);
        let ifcProjectId = lines.get(0);
        let ifcProject = this.ifcAPI.GetLine(this.modelID, ifcProjectId);
        this.getAllSpatialChildren(ifcProject);
        return ifcProject;
    }

    private getAllSpatialChildren(spatialElement: any) {
        const id = spatialElement.expressID;
        const spatialChildrenID = this.getAllRelatedItemsOfType(
            id,
            IFCRELAGGREGATES,
            'RelatingObject',
            'RelatedObjects'
        );
        spatialElement.hasSpatialChildren = spatialChildrenID.map((id) =>
            this.ifcAPI.GetLine(this.modelID, id, false)
        );
        spatialElement.hasChildren = this.getAllRelatedItemsOfType(
            id,
            IFCRELCONTAINEDINSPATIALSTRUCTURE,
            'RelatingStructure',
            'RelatedElements'
        );
        spatialElement.hasSpatialChildren.forEach((child: any) =>
            this.getAllSpatialChildren(child)
        );
    }

    private getAllRelatedItemsOfType(
        elementID: number,
        type: any,
        relation: string,
        relatedProperty: string
    ) {
        const lines = this.ifcAPI.GetLineIDsWithType(this.modelID, type);
        const IDs = [];

        for (let i = 0; i < lines.size(); i++) {
            const relID = lines.get(i);
            const rel = this.ifcAPI.GetLine(this.modelID, relID);
            const relatedItems = rel[relation];
            let foundElement = false;

            if (Array.isArray(relatedItems)) {
                const values = relatedItems.map((item) => item.value);
                foundElement = values.includes(elementID);
            } else foundElement = relatedItems.value === elementID;

            if (foundElement) {
                const element = rel[relatedProperty];
                if (!Array.isArray(element)) IDs.push(element.value);
                else element.forEach((ele) => IDs.push(ele.value));
            }
        }
        return IDs;
    }
}
