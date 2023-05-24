import { LineBasicMaterial, Vector3, BufferGeometry, Line } from 'three';

export class IfcCrossSectionsManager {
  static drawSections(crossSections: any, scene: any) {
    console.log(crossSections);
    const material = new LineBasicMaterial({ color: 0x0000ff, linewidth: 5 });
    for (let c = 0; c < crossSections.length; c++) {
      const crossSection = crossSections[c];
      // Construct sections
      for (let i = 0; i < crossSection.curves.length; i++) {
        const points = [];
        for (let j = 0; j < crossSection.curves[i].points.length; j++) {
          points.push(
            new Vector3(
              crossSection.curves[i].points[j].x,
              crossSection.curves[i].points[j].z,
              -crossSection.curves[i].points[j].y
            )
          );
        }
        const geometry = new BufferGeometry().setFromPoints(points);
        const line = new Line(geometry, material);
        scene.add(line);
      }
    }
  }
}
