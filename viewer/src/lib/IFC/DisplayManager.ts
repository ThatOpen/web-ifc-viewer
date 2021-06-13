import { Display, MapIDFaceIndex, TransparentMesh, VertexProps } from './BaseDefinitions';
import { BufferAttribute, BufferGeometry, Material, Mesh, Scene } from 'three';
import { TransparentShader } from './Shaders';

export class DisplayManager {
    private mapIDFaceindex: MapIDFaceIndex;

    constructor(mapIDFaceindex: MapIDFaceIndex) {
        this.mapIDFaceindex = mapIDFaceindex;
    }

    setItemsDisplay(ids: number[], mesh: Mesh, state: Display, scene: Scene) {
        const geometry = mesh.geometry;
        this.setupVisibility(geometry);

        const faceIndicesArray = ids.map((id) => this.mapIDFaceindex[id]);
        const faceIndices = ([] as number[]).concat(...faceIndicesArray);
        faceIndices.forEach((faceIndex) => this.setFaceDisplay(geometry, faceIndex, state));

        geometry.attributes[VertexProps.r].needsUpdate = true;
        geometry.attributes[VertexProps.g].needsUpdate = true;
        geometry.attributes[VertexProps.b].needsUpdate = true;
        geometry.attributes[VertexProps.a].needsUpdate = true;
        geometry.attributes[VertexProps.h].needsUpdate = true;

        if (state.a != 1) this.setupTransparency(mesh as TransparentMesh, scene);
    }

    setupVisibility(geometry: BufferGeometry) {
        if (!geometry.attributes[VertexProps.r]) {
            const zeros = new Float32Array(geometry.getAttribute('position').count);
            geometry.setAttribute(VertexProps.r, new BufferAttribute(zeros.slice(), 1));
            geometry.setAttribute(VertexProps.g, new BufferAttribute(zeros.slice(), 1));
            geometry.setAttribute(VertexProps.b, new BufferAttribute(zeros.slice(), 1));
            geometry.setAttribute(VertexProps.a, new BufferAttribute(zeros.slice().fill(1), 1));
            geometry.setAttribute(VertexProps.h, new BufferAttribute(zeros, 1));
        }
    }

    private setFaceDisplay(geometry: BufferGeometry, index: number, state: Display) {
        if (!geometry.index) return;
        const geoIndex = geometry.index.array;
        this.setFaceAttribute(geometry, VertexProps.r, state.r, index, geoIndex);
        this.setFaceAttribute(geometry, VertexProps.g, state.g, index, geoIndex);
        this.setFaceAttribute(geometry, VertexProps.b, state.b, index, geoIndex);
        this.setFaceAttribute(geometry, VertexProps.a, state.a, index, geoIndex);
        this.setFaceAttribute(geometry, VertexProps.h, state.h, index, geoIndex);
    }

    private setFaceAttribute(
        geometry: BufferGeometry,
        attr: string,
        state: number,
        index: number,
        geoIndex: ArrayLike<number>
    ) {
        geometry.attributes[attr].setX(geoIndex[3 * index], state);
        geometry.attributes[attr].setX(geoIndex[3 * index + 1], state);
        geometry.attributes[attr].setX(geoIndex[3 * index + 2], state);
    }

    private setupTransparency(mesh: TransparentMesh, scene: Scene) {
        if (mesh.transparentMesh) return;
        const transMesh = mesh.clone();

        const transparentMaterials: Material[] = [];

        if (Array.isArray(transMesh.material)) {
            transMesh.material.forEach((mat) => {
                transparentMaterials.push(this.newTransparent(mat));
            });
            transMesh.material = transparentMaterials;
        } else {
            transMesh.material = this.newTransparent(transMesh.material);
        }

        scene.add(transMesh);
        mesh.transparentMesh = transMesh;
    }

    private newTransparent(mat: Material) {
        const newMat = mat.clone();
        newMat.transparent = true;
        // newMat.depthTest = false;
        newMat.onBeforeCompile = TransparentShader;
        return newMat;
    }
}
