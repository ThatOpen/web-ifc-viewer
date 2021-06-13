import { BufferGeometry, Material, Mesh } from "three";

export const VertexProps = {
    r: "red",
    g: "green",
    b: "blue",
    a: "alfa",
    h: "highlighted"
}

export interface Display {
    r: number;
    g: number;
    b: number;
    a: number;
    h: 0 | 1;
}

export interface TransparentMesh extends Mesh {
    transparentMesh: Mesh;
}

export type GeometryByMaterial = {
    material: Material;
    geometry: BufferGeometry[];
    indices: {[keys: number]: number};
    lastIndex: number;
};

export interface GeometriesByMaterial {
    [key: string]: GeometryByMaterial
}

export type MapFaceIndexID = { [key: number]: number };
export type MapIDFaceIndex = { [key: number]: number[] };