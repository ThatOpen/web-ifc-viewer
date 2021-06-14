import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { OpaqueShader } from './Shaders';
import { IfcAPI, PlacedGeometry, Color as ifcColor } from 'web-ifc';
import {
    Mesh,
    Color,
    MeshLambertMaterial,
    DoubleSide,
    Matrix4,
    BufferGeometry,
    BufferAttribute,
    Material
} from 'three';
import {
    GeometriesByMaterial,
    MapFaceIndexID,
    MapIDFaceIndex
} from './BaseDefinitions';

export class IFCParser {
    private modelID: number;
    private ifcAPI: IfcAPI;
    private mapFaceindexID: MapFaceIndexID;
    private mapIDFaceindex: MapIDFaceIndex;
    private geometryByMaterials: GeometriesByMaterial;

    constructor(ifcAPI: IfcAPI, mapFaceindexID: MapFaceIndexID, mapIDFaceindex: MapIDFaceIndex) {
        this.modelID = -1;
        this.mapFaceindexID = mapFaceindexID;
        this.mapIDFaceindex = mapIDFaceindex;
        this.geometryByMaterials = {};
        this.ifcAPI = ifcAPI;
    }

    async parse(buffer: any) {
        if (this.ifcAPI.wasmModule === undefined) {
            await this.ifcAPI.Init();
        }
        const data = new Uint8Array(buffer);
        this.modelID = this.ifcAPI.OpenModel(data);
        return this.loadAllGeometry();
    }

    private loadAllGeometry() {
        this.saveAllPlacedGeometriesByMaterial();
        return this.generateAllGeometriesByMaterial();
    }

    private generateAllGeometriesByMaterial() {
        const { materials, geometries } = this.getMaterialsAndGeometries();
        const allGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries, true);
        this.storeFaceindicesByExpressIDs();
        return new Mesh(allGeometry, materials);
    }

    private storeFaceindicesByExpressIDs() {
        let previous = 0;

        for (let index in this.mapFaceindexID) {
            const current = parseInt(index);
            const id = this.mapFaceindexID[current];

            var faceIndices = [];
            for (let j = previous; j < current; j++) {
                faceIndices.push(j);
            }

            previous = current;

            if (!this.mapIDFaceindex[id]) this.mapIDFaceindex[id] = [];
            this.mapIDFaceindex[id].push(...faceIndices);
        }
    }

    private getMaterialsAndGeometries() {
        const materials = [];
        const geometries = [];
        let totalFaceCount = 0;

        for (let i in this.geometryByMaterials) {
            materials.push(this.geometryByMaterials[i].material);
            const currentGeometries = this.geometryByMaterials[i].geometry;
            geometries.push(BufferGeometryUtils.mergeBufferGeometries(currentGeometries));

            for (let j in this.geometryByMaterials[i].indices) {
                const globalIndex = parseInt(j, 10) + totalFaceCount;
                this.mapFaceindexID[globalIndex] = this.geometryByMaterials[i].indices[j];
            }

            totalFaceCount += this.geometryByMaterials[i].lastIndex;
        }

        return { materials, geometries };
    }

    private saveAllPlacedGeometriesByMaterial() {
        const flatMeshes = this.ifcAPI.LoadAllGeometry(this.modelID);

        for (let i = 0; i < flatMeshes.size(); i++) {
            const flatMesh = flatMeshes.get(i);
            const productId = flatMesh.expressID;
            const placedGeometries = flatMesh.geometries;

            for (let j = 0; j < placedGeometries.size(); j++) {
                this.savePlacedGeometryByMaterial(placedGeometries.get(j), productId);
            }
        }
    }

    private savePlacedGeometryByMaterial(placedGeometry: PlacedGeometry, productId: number) {
        const geometry = this.getBufferGeometry(placedGeometry);
        geometry.computeVertexNormals();
        const matrix = this.getMeshMatrix(placedGeometry.flatTransformation);
        geometry.applyMatrix4(matrix);
        this.saveGeometryByMaterial(geometry, placedGeometry, productId);
    }

    private getBufferGeometry(placedGeometry: PlacedGeometry) {
        const geometry = this.ifcAPI.GetGeometry(this.modelID, placedGeometry.geometryExpressID);
        const verts = this.ifcAPI.GetVertexArray(
            geometry.GetVertexData(),
            geometry.GetVertexDataSize()
        );
        const indices = this.ifcAPI.GetIndexArray(
            geometry.GetIndexData(),
            geometry.GetIndexDataSize()
        );
        return this.ifcGeometryToBuffer(verts, indices);
    }

    private getMeshMatrix(matrix: number[]) {
        const mat = new Matrix4();
        mat.fromArray(matrix);
        return mat;
    }

    private ifcGeometryToBuffer(vertexData: any, indexData: any) {
        const geometry = new BufferGeometry();
        const { vertices, normals } = this.extractVertexData(vertexData);
        geometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
        geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
        geometry.setIndex(new BufferAttribute(indexData, 1));
        return geometry;
    }

    private extractVertexData(vertexData: any) {
        const vertices = [];
        const normals = [];
        let isNormalData = false;

        for (let i = 0; i < vertexData.length; i++) {
            isNormalData ? normals.push(vertexData[i]) : vertices.push(vertexData[i]);
            if ((i + 1) % 3 == 0) isNormalData = !isNormalData;
        }

        return { vertices, normals };
    }

    private saveGeometryByMaterial(geometry: BufferGeometry, placedGeometry: PlacedGeometry, productId: number) {
        if(!geometry.index) return;
        const color = placedGeometry.color;
        const colorID = `${color.x}${color.y}${color.z}${color.w}`;
        this.createMaterial(colorID, color);
        const currentGeometry = this.geometryByMaterials[colorID];
        currentGeometry.geometry.push(geometry);
        currentGeometry.lastIndex += geometry.index.count / 3;
        currentGeometry.indices[currentGeometry.lastIndex] = productId;
    }

    private createMaterial(colorID: string, color: ifcColor) {
        if (!this.geometryByMaterials[colorID]) {
            const col = new Color(color.x, color.y, color.z);
            const newMaterial = new MeshLambertMaterial({ color: col, side: DoubleSide });
            newMaterial.onBeforeCompile = OpaqueShader;
            newMaterial.transparent = color.w !== 1;
            if (newMaterial.transparent) newMaterial.opacity = color.w;
            this.geometryByMaterials[colorID] = this.newGeometryByMaterial(newMaterial);
        }
    }

    private newGeometryByMaterial(newMaterial: Material) {
        return {
            material: newMaterial,
            geometry: [],
            indices: {},
            lastIndex: 0
        };
    }
}
