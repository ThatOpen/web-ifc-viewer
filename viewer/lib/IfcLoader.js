import { IfcAPI } from 'web-ifc/web-ifc-api';
import {
  FileLoader,
  Loader,
  Object3D,
  Mesh,
  Color,
  MeshPhongMaterial,
  DoubleSide,
  Matrix4,
  BufferGeometry,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  BufferAttribute
} from 'three/build/three.module';

var IfcLoader = function (manager) {
  Loader.call(this, manager);
};

var ifcAPI = new IfcAPI();
ifcAPI.Init();

var modelID;

var materials = {};

IfcLoader.prototype = Object.assign(Object.create(Loader.prototype), {
  varructor: IfcLoader,

  load: function (url, onLoad, onProgress, onError) {
    var scope = this;

    var loader = new FileLoader(scope.manager);
    loader.setPath(scope.path);
    loader.setResponseType('arraybuffer');
    loader.setRequestHeader(scope.requestHeader);
    loader.setWithCredentials(scope.withCredentials);
    loader.load(
      url,
      function (buffer) {
        try {
          onLoad(scope.parse(buffer));
        } catch (e) {
          if (onError) {
            onError(e);
          } else {
            console.error(e);
          }

          scope.manager.itemError(url);
        }
      },
      onProgress,
      onError
    );
  },

  getPropertiesById: function(expressID){
    return ifcAPI.GetLine(modelID, expressID);
  },

  parse: (function () {
    return function (buffer) {
      var data = new Uint8Array(buffer);
      modelID = ifcAPI.OpenModel('example.ifc', data);
      return loadAllGeometry(modelID);

      function loadAllGeometry(modelID) {
        var flatMeshes = getFlatMeshes(modelID);
        var mainObject = new Object3D();
        for (var i = 0; i < flatMeshes.size(); i++) {
          var placedGeometries = flatMeshes.get(i).geometries;
          for (var j = 0; j < placedGeometries.size(); j++){
            const mesh = getPlacedGeometry(modelID, placedGeometries.get(j))
            mesh.expressID = flatMeshes.get(i).expressID;
            mainObject.add(mesh);
          }
        }
        return mainObject;
      }

      function getFlatMeshes(modelID) {
        var flatMeshes = ifcAPI.LoadAllGeometry(modelID);
        return flatMeshes;
      }

      function getPlacedGeometry(modelID, placedGeometry) {
        var geometry = getBufferGeometry(modelID, placedGeometry);
        var material = getMaterial(placedGeometry.color);
        var mesh = new Mesh(geometry, material);
        mesh.expressID = placedGeometry.expressID;
        mesh.matrix = getMeshMatrix(placedGeometry.flatTransformation);
        mesh.matrixAutoUpdate = false;
        return mesh;
      }

      function getBufferGeometry(modelID, placedGeometry) {
        var geometry = ifcAPI.GetGeometry(modelID, placedGeometry.geometryExpressID);
        var verts = ifcAPI.GetVertexArray(geometry.GetVertexData(), geometry.GetVertexDataSize());
        var indices = ifcAPI.GetIndexArray(geometry.GetIndexData(), geometry.GetIndexDataSize());
        var bufferGeometry = ifcGeometryToBuffer(verts, indices);
        return bufferGeometry;
      }

      function getMeshMatrix(matrix) {
        var mat = new Matrix4();
        mat.fromArray(matrix);
        return mat;
      }

      function ifcGeometryToBuffer(vertexData, indexData) {
        var geometry = new BufferGeometry();
        var buffer32 = new InterleavedBuffer(vertexData, 6);
        geometry.setAttribute('position', new InterleavedBufferAttribute(buffer32, 3, 0));
        geometry.setAttribute('normal', new InterleavedBufferAttribute(buffer32, 3, 3));
        geometry.setIndex(new BufferAttribute(indexData, 1));
        return geometry;
      }

      function getMaterial(color) {
        var id = `${color.x}${color.y}${color.z}${color.w}`;
        if(!materials[id]) {
          var col = new Color(color.x, color.y, color.z);
          var newMaterial = new MeshPhongMaterial({ color: col, side: DoubleSide });
          newMaterial.transparent = color.w !== 1;
          if (newMaterial.transparent) newMaterial.opacity = color.w;
          materials[id] = newMaterial;
        }
        return materials[id];
      }
    };
    materials = {};
  })()
});

export { IfcLoader };
