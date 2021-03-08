import "../lib/js/web-ifc-api"

THREE.IfcLoader = function (manager) {
  THREE.Loader.call(this, manager);
};

var ifcAPI = new IfcAPI();

THREE.IfcLoader.prototype = Object.assign(Object.create(THREE.Loader.prototype), {
  constructor: THREE.IfcLoader,

  load: async function (url, onLoad, onProgress, onError) {
    var scope = this;

    await ifcAPI.Init();

    var loader = new THREE.FileLoader(scope.manager);
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

  parse: (function () {
    return function (buffer) {
      var data = new Uint8Array(buffer);
      var modelID = ifcAPI.OpenModel('example.ifc', data);
      return loadAllGeometry(modelID);

      function loadAllGeometry(modelID) {
        var flatMeshes = getFlatMeshes(modelID);
        var mainObject = new THREE.Object3D();
        for (var i = 0; i < flatMeshes.size(); i++) {
          var placedGeometries = flatMeshes.get(i).geometries;
          for (var j = 0; j < placedGeometries.size(); j++)
            mainObject.add(getPlacedGeometry(modelID, placedGeometries.get(j)));
        }
        return mainObject;
      }

      function getFlatMeshes(modelID) {
        var flatMeshes = ifcAPI.LoadAllGeometry(modelID);
        return flatMeshes;
      }

      function getPlacedGeometry(modelID, placedGeometry) {
        var geometry = getBufferGeometry(modelID, placedGeometry);
        var material = getMeshMaterial(placedGeometry.color);
        var mesh = new THREE.Mesh(geometry, material);
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

      function getMeshMaterial(color) {
        var col = new THREE.Color(color.x, color.y, color.z);
        var material = new THREE.MeshPhongMaterial({ color: col, side: THREE.DoubleSide });
        material.transparent = color.w !== 1;
        if (material.transparent) material.opacity = color.w;
        return material;
      }

      function getMeshMatrix(matrix) {
        var mat = new THREE.Matrix4();
        mat.fromArray(matrix);
        // mat.elements[15 - 3] *= 0.001;
        // mat.elements[15 - 2] *= 0.001;
        // mat.elements[15 - 1] *= 0.001;
        return mat;
      }

      function ifcGeometryToBuffer(vertexData, indexData) {
        var geometry = new THREE.BufferGeometry();
        var buffer32 = new THREE.InterleavedBuffer(vertexData, 6);
        geometry.setAttribute('position', new THREE.InterleavedBufferAttribute(buffer32, 3, 0));
        geometry.setAttribute('normal', new THREE.InterleavedBufferAttribute(buffer32, 3, 3));
        geometry.setIndex(new THREE.BufferAttribute(indexData, 1));
        return geometry;
      }
    };
  })()
});
