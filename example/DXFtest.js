// mesh
import {
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  Mesh,
  WebGLRenderTarget,
  MeshBasicMaterial,
  LinearFilter,
  NearestFilter,
  RGBAFormat,
  FloatType
} from 'three';
import Drawing from 'dxf-writer';
import { IfcViewerAPI } from 'web-ifc-viewer';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
// viewer.addAxes();
// viewer.addGrid();

const scene = viewer.context.getScene();

const geometry = new BoxGeometry().toNonIndexed();
console.log(geometry);

const positionAttribute = geometry.getAttribute( 'position' );

const colors = [];
const color = new Color();
const colorMap = {};

for ( let i = 0; i < positionAttribute.count; i += 3 ) {

  color.set( Math.random() * 0xffffff );

  // define the same color for each vertex of a triangle

  colors.push( color.r, color.g, color.b );
  colors.push( color.r, color.g, color.b );
  colors.push( color.r, color.g, color.b );

  const red = (color.r * 255).toFixed(0);
  const green = (color.g * 255).toFixed(0);
  const blue = (color.b * 255).toFixed(0);
  colorMap[`${red}${green}${blue}`] = i;
}

console.log(colorMap);

const renderer = viewer.context.getRenderer();
const camera = viewer.context.getCamera();

const dims = viewer.context.getDimensions();
const target = new WebGLRenderTarget(dims.width, dims.height, { minFilter: LinearFilter, magFilter: NearestFilter, format: RGBAFormat, type: FloatType });


const visibleFaces = new Set();

window.ondblclick = () => {
  const read = new Float32Array(4 * dims.width * dims.height);

  renderer.setRenderTarget(target);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);
  renderer.readRenderTargetPixels(target, 0, 0, dims.width, dims.height, read);

  for(let i = 0; i < read.length; i+=4) {
    const red = (read[i] * 255).toFixed(0);
    const green = (read[i + 1] * 255).toFixed(0);
    const blue = (read[i + 2] * 255).toFixed(0);
    const result = `${red}${green}${blue}`;

    if(colorMap[result] !== undefined) {
      const foundColor = colorMap[result];
      visibleFaces.add(foundColor);
    }
  }

  const foundArray = Array.from(visibleFaces);

  console.log(foundArray);

  foundArray.forEach(index => {

  })

}




// define the new attribute

geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

const whiteMaterial = new MeshBasicMaterial({vertexColors: true});

const boxMesh = new Mesh(geometry, whiteMaterial);
scene.add(boxMesh);

// const cameraPosition = viewer.context.getCamera().position;
//
// const coords = boxgeom.attributes.position.array;
// const indices = boxgeom.indices;
//
// const edges = {};
//
// for (let j = 0; j < indices.length; j += 3) {
//
//   const index1 = indices[j];
//   const index2 = indices[j + 1];
//   const index3 = indices[j + 2];
//
//   const v1 = new Vector3(coords[index1], coords[index1 + 1], coords[index1 + 2]);
//   const v2 = new Vector3(coords[index2], coords[index2 + 1], coords[index2 + 2]);
//   const v3 = new Vector3(coords[index3], coords[index3 + 1], coords[index3 + 2]);
//
//   // Dir = (B - A) x (C - A)
//   // Norm = Dir / len(Dir)
//   const AminusB = v2.sub(v1);
//   const CminusA = v3.sub(v1);
//   const direction = AminusB.cross(CminusA);
//   const normal = direction.normalize();
// }
//
// const raycaster = new Raycaster();
//
// function isVertexVisible(vertex) {
//   const dir = vertex.sub(cameraPosition).normalize();
//   raycaster.set(cameraPosition, dir);
//   const intersects = raycaster.intersectObject(boxMesh);
//   if(intersects.length >= 0) return false;
//   return intersects[0].equals(vertex);
// }
//
// const drawing = new Drawing();
// drawing.setUnits('Meters');
//
// drawing.drawText(10, 0, 10, 0, 'Hello World'); // draw text in the default layer named "0"
// drawing.addLayer('l_green', Drawing.ACI.GREEN, 'CONTINUOUS');
// drawing.setActiveLayer('l_green');
// drawing.drawText(20, -70, 10, 0, 'go green!');
//
// drawing.addLayer('l_yellow', Drawing.ACI.YELLOW, 'DOTTED')
//   .setActiveLayer('l_yellow')
//   .drawCircle(50, -30, 25);
//
// const result = drawing.toDxfString();

function ExportToDXF(filename) {

  // const drawing = new Drawing();
  // drawing.setUnits('Meters');
  // drawing.drawText(10, 0, 10, 0, 'Hello World'); // draw text in the default layer named "0"
  // drawing.addLayer('l_green', Drawing.ACI.GREEN, 'CONTINUOUS');
  // drawing.setActiveLayer('l_green');
  // drawing.drawText(20, -70, 10, 0, 'go green!');
  //
  // drawing.addLayer('l_yellow', Drawing.ACI.YELLOW, 'DOTTED')
  //   .setActiveLayer('l_yellow')
  //   .drawCircle(50, -30, 25);
  //
  // const result = drawing.toDxfString()
  //
  // const dxfBlob = new Blob([result], { type: "application/dxf" });
  // const dxfURL = URL.createObjectURL(dxfBlob);
  // const downloadLink = document.createElement("a");
  //
  // downloadLink.href = dxfURL;
  // downloadLink.download = filename;
  // document.body.appendChild(downloadLink);
  // downloadLink.click();
  // document.body.removeChild(downloadLink);
}