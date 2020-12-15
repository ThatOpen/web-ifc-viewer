"use strict"

// ## License
// 
// Copyright (c) 2011 Evan Wallace (http://madebyevan.com/), under the MIT license.
// THREE.js rework by thrax


// # class CSG
// Holds a binary space partition tree representing a 3D solid. Two solids can
// be combined using the `union()`, `subtract()`, and `intersect()` methods.

class CSG {
    constructor() {
        this.polygons = [];
    }
    clone() {
        var csg = new CSG();
        csg.polygons = this.polygons.map(function(p) {
            return p.clone();
        });
        return csg;
    }

    toPolygons() {
        return this.polygons;
    }

    union(csg) {
        var a = new Node(this.clone().polygons);
        var b = new Node(csg.clone().polygons);
        a.clipTo(b);
        b.clipTo(a);
        b.invert();
        b.clipTo(a);
        b.invert();
        a.build(b.allPolygons());
        return CSG.fromPolygons(a.allPolygons());
    }

    subtract(csg) {
        var a = new Node(this.clone().polygons);
        var b = new Node(csg.clone().polygons);
        a.invert();
        a.clipTo(b);
        b.clipTo(a);
        b.invert();
        b.clipTo(a);
        b.invert();
        a.build(b.allPolygons());
        a.invert();
        return CSG.fromPolygons(a.allPolygons());
    }

    intersect(csg) {
        var a = new Node(this.clone().polygons);
        var b = new Node(csg.clone().polygons);
        a.invert();
        b.clipTo(a);
        b.invert();
        a.clipTo(b);
        b.clipTo(a);
        a.build(b.allPolygons());
        a.invert();
        return CSG.fromPolygons(a.allPolygons());
    }

    // Return a new CSG solid with solid and empty space switched. This solid is
    // not modified.
    inverse() {
        var csg = this.clone();
        csg.polygons.map(function(p) {
            p.flip();
        });
        return csg;
    }
}

// Construct a CSG solid from a list of `Polygon` instances.
CSG.fromPolygons=function(polygons) {
    var csg = new CSG();
    csg.polygons = polygons;
    return csg;
}

// # class Vector

// Represents a 3D vector.
// 
// Example usage:
// 
//     new CSG.Vector(1, 2, 3);
//     new CSG.Vector([1, 2, 3]);
//     new CSG.Vector({ x: 1, y: 2, z: 3 });

class Vector extends THREE.Vector3 {
    constructor(x, y, z) {
        if (arguments.length == 3)
            super(x, y, z)
        else if (Array.isArray(x))
            super(x[0], x[1], x[2])
        else if (typeof x == 'object')
            super().copy(x)
        else
            throw "Invalid constructor to vector"
    }

    clone() {
        return new Vector(this)
    }
    negated() {
        return this.clone().multiplyScalar(-1)
    }
    plus(a) {
        return this.clone().add(a);
    }
    minus(a) {
        return this.clone().sub(a)
    }
    times(a) {
        return this.clone().multiplyScalar(a)
    }
    dividedBy(a) {
        return this.clone().divideScalar(a)
    }
    lerp(a, t) {
        return this.plus(a.minus(this).times(t))
    }
    unit() {
        return this.dividedBy(this.length())
    }
    cross(a) {
        return THREE.Vector3.prototype.cross.call(this.clone(), a)
    }
}

// # class Vertex

// Represents a vertex of a polygon. Use your own vertex class instead of this
// one to provide additional features like texture coordinates and vertex
// colors. Custom vertex classes need to provide a `pos` property and `clone()`,
// `flip()`, and `interpolate()` methods that behave analogous to the ones
// defined by `CSG.Vertex`. This class provides `normal` so convenience
// functions like `CSG.sphere()` can return a smooth vertex normal, but `normal`
// is not used anywhere else.

class Vertex {

    constructor(pos, normal, uv) {
        this.pos = new Vector(pos);
        this.normal = new Vector(normal);
        this.uv = new Vector(uv);
    }

    clone() {
        return new Vertex(this.pos.clone(),this.normal.clone(),this.uv.clone());
    }

    // Invert all orientation-specific data (e.g. vertex normal). Called when the
    // orientation of a polygon is flipped.
    flip() {
        this.normal = this.normal.negated();
    }

    // Create a new vertex between this vertex and `other` by linearly
    // interpolating all properties using a parameter of `t`. Subclasses should
    // override this to interpolate additional properties.
    interpolate(other, t) {
        return new Vertex(this.pos.lerp(other.pos, t),this.normal.lerp(other.normal, t),this.uv.lerp(other.uv, t))
    }
}
;
// # class Plane

// Represents a plane in 3D space.

class Plane {
    constructor(normal, w) {
        this.normal = normal;
        this.w = w;
    }

    clone() {
        return new Plane(this.normal.clone(),this.w);
    }

    flip() {
        this.normal = this.normal.negated();
        this.w = -this.w;
    }

    // Split `polygon` by this plane if needed, then put the polygon or polygon
    // fragments in the appropriate lists. Coplanar polygons go into either
    // `coplanarFront` or `coplanarBack` depending on their orientation with
    // respect to this plane. Polygons in front or in back of this plane go into
    // either `front` or `back`.
    splitPolygon(polygon, coplanarFront, coplanarBack, front, back) {
        var COPLANAR = 0;
        var FRONT = 1;
        var BACK = 2;
        var SPANNING = 3;

        // Classify each point as well as the entire polygon into one of the above
        // four classes.
        var polygonType = 0;
        var types = [];
        for (var i = 0; i < polygon.vertices.length; i++) {
            var t = this.normal.dot(polygon.vertices[i].pos) - this.w;
            var type = (t < -Plane.EPSILON) ? BACK : (t > Plane.EPSILON) ? FRONT : COPLANAR;
            polygonType |= type;
            types.push(type);
        }

        // Put the polygon in the correct list, splitting it when necessary.
        switch (polygonType) {
        case COPLANAR:
            (this.normal.dot(polygon.plane.normal) > 0 ? coplanarFront : coplanarBack).push(polygon);
            break;
        case FRONT:
            front.push(polygon);
            break;
        case BACK:
            back.push(polygon);
            break;
        case SPANNING:
            var f = []
              , b = [];
            for (var i = 0; i < polygon.vertices.length; i++) {
                var j = (i + 1) % polygon.vertices.length;
                var ti = types[i]
                  , tj = types[j];
                var vi = polygon.vertices[i]
                  , vj = polygon.vertices[j];
                if (ti != BACK)
                    f.push(vi);
                if (ti != FRONT)
                    b.push(ti != BACK ? vi.clone() : vi);
                if ((ti | tj) == SPANNING) {
                    var t = (this.w - this.normal.dot(vi.pos)) / this.normal.dot(vj.pos.minus(vi.pos));
                    var v = vi.interpolate(vj, t);
                    f.push(v);
                    b.push(v.clone());
                }
            }
            if (f.length >= 3)
                front.push(new Polygon(f,polygon.shared));
            if (b.length >= 3)
                back.push(new Polygon(b,polygon.shared));
            break;
        }
    }

}

// `Plane.EPSILON` is the tolerance used by `splitPolygon()` to decide if a
// point is on the plane.
Plane.EPSILON = 1e-5;

Plane.fromPoints = function(a, b, c) {
    var n = b.minus(a).cross(c.minus(a)).unit();
    return new Plane(n,n.dot(a));
}


// # class Polygon

// Represents a convex polygon. The vertices used to initialize a polygon must
// be coplanar and form a convex loop. They do not have to be `Vertex`
// instances but they must behave similarly (duck typing can be used for
// customization).
// 
// Each convex polygon has a `shared` property, which is shared between all
// polygons that are clones of each other or were split from the same polygon.
// This can be used to define per-polygon properties (such as surface color).

class Polygon {

    constructor(vertices, shared) {
        this.vertices = vertices;
        this.shared = shared;
        this.plane = Plane.fromPoints(vertices[0].pos, vertices[1].pos, vertices[2].pos);
    }

    clone() {
        var vertices = this.vertices.map(function(v) {
            return v.clone();
        });
        return new Polygon(vertices,this.shared);
    }
    flip() {
        this.vertices.reverse().map(function(v) {
            v.flip();
        });
        this.plane.flip();
    }
}

// # class Node

// Holds a node in a BSP tree. A BSP tree is built from a collection of polygons
// by picking a polygon to split along. That polygon (and all other coplanar
// polygons) are added directly to that node and the other polygons are added to
// the front and/or back subtrees. This is not a leafy BSP tree since there is
// no distinction between internal and leaf nodes.

class Node {
    constructor(polygons) {
        this.plane = null;
        this.front = null;
        this.back = null;
        this.polygons = [];
        if (polygons)
            this.build(polygons);
    }
    clone() {
        var node = new Node();
        node.plane = this.plane && this.plane.clone();
        node.front = this.front && this.front.clone();
        node.back = this.back && this.back.clone();
        node.polygons = this.polygons.map(function(p) {
            return p.clone();
        });
        return node;
    }

    // Convert solid space to empty space and empty space to solid space.
    invert() {
        for (var i = 0; i < this.polygons.length; i++)
            this.polygons[i].flip();
        
        this.plane.flip();
        if (this.front)
            this.front.invert();
        if (this.back)
            this.back.invert();
        var temp = this.front;
        this.front = this.back;
        this.back = temp;
    }

    // Recursively remove all polygons in `polygons` that are inside this BSP
    // tree.
    clipPolygons(polygons) {
        if (!this.plane)
            return polygons.slice();
        var front = []
          , back = [];
        for (var i = 0; i < polygons.length; i++) {
            this.plane.splitPolygon(polygons[i], front, back, front, back);
        }
        if (this.front)
            front = this.front.clipPolygons(front);
        if (this.back)
            back = this.back.clipPolygons(back);
        else
            back = [];
        return front.concat(back);
    }

    // Remove all polygons in this BSP tree that are inside the other BSP tree
    // `bsp`.
    clipTo(bsp) {
        this.polygons = bsp.clipPolygons(this.polygons);
        if (this.front)
            this.front.clipTo(bsp);
        if (this.back)
            this.back.clipTo(bsp);
    }

    // Return a list of all polygons in this BSP tree.
    allPolygons() {
        var polygons = this.polygons.slice();
        if (this.front)
            polygons = polygons.concat(this.front.allPolygons());
        if (this.back)
            polygons = polygons.concat(this.back.allPolygons());
        return polygons;
    }

    // Build a BSP tree out of `polygons`. When called on an existing tree, the
    // new polygons are filtered down to the bottom of the tree and become new
    // nodes there. Each set of polygons is partitioned using the first polygon
    // (no heuristic is used to pick a good split).
    build(polygons) {
        if (!polygons.length)
            return;
        if (!this.plane)
            this.plane = polygons[0].plane.clone();
        var front = []
          , back = [];
        for (var i = 0; i < polygons.length; i++) {
            this.plane.splitPolygon(polygons[i], this.polygons, this.polygons, front, back);
        }
        if (front.length) {
            if (!this.front)
                this.front = new Node();
            this.front.build(front);
        }
        if (back.length) {
            if (!this.back)
                this.back = new Node();
            this.back.build(back);
        }
    }
}

CSG.fromGeometry=function(geom){
    if(geom.isBufferGeometry)
        geom = new THREE.Geometry().fromBufferGeometry(geom)
    var fs = geom.faces;
    var vs = geom.vertices;
    var polys=[]
    var fm=['a','b','c']
    for(var i=0;i<fs.length;i++){
        var f = fs[i];
        var vertices=[]
        for(var j=0;j<3;j++) vertices.push(new Vertex(vs[f[fm[j]]],f.vertexNormals[j],geom.faceVertexUvs[0][i][j]))
        polys.push(new Polygon(vertices))
    }
    return CSG.fromPolygons(polys)
}
CSG._tmpm3 = new THREE.Matrix3();
CSG.fromMesh=function(mesh){

    var csg = CSG.fromGeometry(mesh.geometry)
    CSG._tmpm3.getNormalMatrix(mesh.matrix);
    for(var i=0;i<csg.polygons.length;i++){
        var p = csg.polygons[i]
        for(var j=0;j<p.vertices.length;j++){
            var v=p.vertices[j]
            v.pos.applyMatrix4(mesh.matrix);
            v.normal.applyMatrix3(CSG._tmpm3);
        }
    }
    return csg;
}

CSG.toMesh=function(csg,toMatrix){
    var geom = new THREE.Geometry();
    var ps = csg.polygons;
    var vs = geom.vertices;
    var fvuv = geom.faceVertexUvs[0]
    for(var i=0;i<ps.length;i++){
        var p = ps[i]
        var pvs=p.vertices;
        var v0=vs.length;
        var pvlen=pvs.length
        
        for(var j=0;j<pvlen;j++)
            vs.push(new THREE.Vector3().copy(pvs[j].pos))


        for(var j=3;j<=pvlen;j++){
            var fc = new THREE.Face3();
            var fuv = []
            fvuv.push(fuv)
            var fnml = fc.vertexNormals;
            fc.a=v0;
            fc.b=v0+j-2;
            fc.c=v0+j-1;

            fnml.push(new THREE.Vector3().copy(pvs[0].normal))
            fnml.push(new THREE.Vector3().copy(pvs[j-2].normal))
            fnml.push(new THREE.Vector3().copy(pvs[j-1].normal))
            fuv.push(new THREE.Vector3().copy(pvs[0].uv))
            fuv.push(new THREE.Vector3().copy(pvs[j-2].uv))
            fuv.push(new THREE.Vector3().copy(pvs[j-1].uv))

            fc.normal = new THREE.Vector3().copy(p.plane.normal)
            geom.faces.push(fc)
        }
    }
    var inv = new THREE.Matrix4().getInverse(toMatrix);
    geom.applyMatrix4(inv);
    geom.verticesNeedUpdate = geom.elementsNeedUpdate = geom.normalsNeedUpdate = true;
    geom.computeBoundingSphere();
    geom.computeBoundingBox();
    var m = new THREE.Mesh(geom);
    m.matrix.copy(toMatrix);
    m.matrix.decompose(m.position,m.rotation,m.scale)
    m.updateMatrixWorld();
    return m
}


CSG.ieval=function(tokens,index=0){
    if(typeof tokens === 'string')
        CSG.currentOp=tokens;
    else if(tokens instanceof Array){
        for(let i=0;i<tokens.length;i++)CSG.ieval(tokens[i],0);
    }else if(typeof tokens==='object'){
        var op=CSG.currentOp;
        tokens.updateMatrix();
        tokens.updateMatrixWorld();
        if(!CSG.sourceMesh)
            CSG.currentPrim =  CSG.fromMesh(CSG.sourceMesh = tokens);
        else{
            CSG.nextPrim = CSG.fromMesh(tokens);
            CSG.currentPrim = CSG.currentPrim[op](CSG.nextPrim);
        }
        if(CSG.doRemove)tokens.parent.remove(tokens);
    }//union,subtract,intersect,inverse
}

CSG.eval=function(tokens,doRemove){//[['add',mesh,mesh,mesh,mesh],['sub',mesh,mesh,mesh,mesh]]
    CSG.currentOp=null;
    CSG.sourceMesh=null;
    CSG.doRemove=doRemove;
    CSG.ieval(tokens)
    var result = CSG.toMesh( CSG.currentPrim, CSG.sourceMesh.matrix );
    result.material = CSG.sourceMesh.material;
    result.castShadow  = result.receiveShadow = true;
    return result;
}

export default CSG
// Return a new CSG solid representing space in either this solid or in the
// solid `csg`. Neither this solid nor the solid `csg` are modified.
// 
//     A.union(B)
// 
//     +-------+            +-------+
//     |       |            |       |
//     |   A   |            |       |
//     |    +--+----+   =   |       +----+
//     +----+--+    |       +----+       |
//          |   B   |            |       |
//          |       |            |       |
//          +-------+            +-------+
// 
// Return a new CSG solid representing space in this solid but not in the
// solid `csg`. Neither this solid nor the solid `csg` are modified.
// 
//     A.subtract(B)
// 
//     +-------+            +-------+
//     |       |            |       |
//     |   A   |            |       |
//     |    +--+----+   =   |    +--+
//     +----+--+    |       +----+
//          |   B   |
//          |       |
//          +-------+
// 
// Return a new CSG solid representing space both this solid and in the
// solid `csg`. Neither this solid nor the solid `csg` are modified.
// 
//     A.intersect(B)
// 
//     +-------+
//     |       |
//     |   A   |
//     |    +--+----+   =   +--+
//     +----+--+    |       +--+
//          |   B   |
//          |       |
//          +-------+
// 
