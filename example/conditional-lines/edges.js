import { EdgesGeometry, MeshBasicMaterial, LineBasicMaterial, LineSegments, DoubleSide, ShaderMaterial, Mesh } from 'three';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2';
import { LineMaterial } from 'three/examples/jsm/lines/linematerial';
import {ConditionalEdgesGeometry} from './ConditionalEdgesGeometry';
import {ConditionalEdgesShader} from './ConditionalEdgesShader';
import {ConditionalLineSegmentsGeometry} from './Lines2/ConditionalLineSegmentsGeometry';
import {ConditionalLineMaterial} from './Lines2/ConditionalLineMaterial';

let threshhold = 70;
const LIGHT_LINES = 0x455A64;

export function updateModel(model, scene, renderer) {

  scene.remove(model);

  const backgroundModel = model.clone();

  const whiteMaterial = new MeshBasicMaterial({ color: 0xffffff });
  whiteMaterial.side = DoubleSide;
  whiteMaterial.polygonOffset = true;
  whiteMaterial.polygonOffsetFactor = 1;
  whiteMaterial.polygonOffsetUnits = 1;

  backgroundModel.material = whiteMaterial;
  backgroundModel.renderOrder = 2;

  scene.add(backgroundModel);

  initEdgesModel(model, scene);
  initConditionalModel(model, scene, renderer);

}

function initEdgesModel(model, scene) {

  const edgesModel = model.clone();

  // store the model and add it to the scene to display
  // behind the lines
  // scene.add( edgesModel );

  const lineGeom = new EdgesGeometry(edgesModel.geometry, threshhold);
  const lineMat = new LineBasicMaterial({ color: 0x000000 });
  const line = new LineSegments(lineGeom, lineMat);

  const thickLineGeom = new LineSegmentsGeometry().fromEdgesGeometry(lineGeom);
  const thickLines = new LineSegments2(thickLineGeom, new LineMaterial({ color: 0x000000, linewidth: 0.001 }));

  scene.add(line);
  scene.add(thickLines);

}

function initConditionalModel(model, scene, renderer) {

  const geom = model.geometry.clone();

  for ( const key in geom.attributes ) {
    if ( key !== 'position' ) {
      geom.deleteAttribute( key );
    }
  }

  const conditionalEdgesMesh = new Mesh();

  // Create the conditional edges geometry and associated material
  const lineGeom = new ConditionalEdgesGeometry(geom);
  const material = new ShaderMaterial(ConditionalEdgesShader);
  material.uniforms.diffuse.value.set(LIGHT_LINES);

  // Create the line segments objects and replace the mesh
  const line = new LineSegments(lineGeom, material);

  const thickLineGeom = new ConditionalLineSegmentsGeometry().fromConditionalEdgesGeometry(lineGeom);
  const thickLines = new LineSegments2(thickLineGeom, new ConditionalLineMaterial({
    color: LIGHT_LINES,
    linewidth: 0.001
  }));

  conditionalEdgesMesh.add(line);
  conditionalEdgesMesh.add(thickLines);

  scene.add(conditionalEdgesMesh);
}