import { LineBasicMaterial, Vector3, BufferGeometry, Line } from 'three';

export class IfcAlignmentsManager {
  static drawAlignments2D(modelAlignments: any, scene: any) {
    let material = new LineBasicMaterial({ color: 0x0000ff, linewidth: 5 });
    if (modelAlignments.length > 0) {
      const alignment = modelAlignments[0];
      const startH = { x: 0, y: 0, z: 0 };
      const startV = { x: 0, y: 0, z: 0 };
      let finish = false;

      // Finding starting points for vertical and horizontal alignments

      for (let i = 0; i < alignment.horizontal.length; i++) {
        for (let j = 0; j < alignment.horizontal[i].points.length; j++) {
          startH.x = alignment.horizontal[i].points[j].x;
          startH.y = alignment.horizontal[i].points[j].y;
          startH.z = 0;
          finish = true;
          break;
        }
        if (finish) {
          break;
        }
      }
      for (let i = 0; i < alignment.vertical.length; i++) {
        for (let j = 0; j < alignment.vertical[i].points.length; j++) {
          startV.x = alignment.vertical[i].points[j].x;
          startV.y = alignment.vertical[i].points[j].y;
          startV.z = 0;
          finish = true;
          break;
        }
        if (finish) {
          break;
        }
      }

      // Construct Horizontal alignment

      for (let i = 0; i < alignment.horizontal.length; i++) {
        const points = [];
        for (let j = 0; j < alignment.horizontal[i].points.length; j++) {
          points.push(
            new Vector3(
              alignment.horizontal[i].points[j].x - startH.x,
              0,
              -(alignment.horizontal[i].points[j].y - startH.y)
            )
          );
        }
        // console.log(points);
        const geometry = new BufferGeometry().setFromPoints(points);
        const line = new Line(geometry, material);
        scene.add(line);
      }

      // Construct Vertical alignment

      material = new LineBasicMaterial({ color: 0xff0000, linewidth: 5 });
      for (let i = 0; i < alignment.vertical.length; i++) {
        const points = [];
        for (let j = 0; j < alignment.vertical[i].points.length; j++) {
          points.push(
            new Vector3(
              alignment.vertical[i].points[j].x,
              alignment.vertical[i].points[j].y - startV.y,
              0
            )
          );
        }
        const geometry = new BufferGeometry().setFromPoints(points);
        const line = new Line(geometry, material);
        scene.add(line);
      }
    }
  }

  static drawAlignments3D(modelAlignments: any, scene: any) {
    let material = new LineBasicMaterial({ color: 0x0000ff, linewidth: 5 });
    if (modelAlignments.length > 0) {
      const alignment = modelAlignments[0];
      const startH = { x: 0, y: 0, z: 0 };
      const startV = { x: 0, y: 0, z: 0 };
      let finish = false;

      // Finding starting points for vertical and horizontal alignments

      for (let i = 0; i < alignment.horizontal.length; i++) {
        for (let j = 0; j < alignment.horizontal[i].points.length; j++) {
          startH.x = alignment.horizontal[i].points[j].x;
          startH.y = alignment.horizontal[i].points[j].y;
          startH.z = 0;
          finish = true;
          break;
        }
        if (finish) {
          break;
        }
      }
      for (let i = 0; i < alignment.vertical.length; i++) {
        for (let j = 0; j < alignment.vertical[i].points.length; j++) {
          startV.x = alignment.vertical[i].points[j].x;
          startV.y = alignment.vertical[i].points[j].y;
          startV.z = 0;
          finish = true;
          break;
        }
        if (finish) {
          break;
        }
      }

      // Construct 3D polyline from horizontal and vertical polylines

      let lastx = 0;
      let lasty = 0;
      let length = 0;
      material = new LineBasicMaterial({ color: 0xffdd00 });
      for (let i = 0; i < alignment.horizontal.length; i++) {
        const points = [];
        for (let j = 0; j < alignment.horizontal[i].points.length; j++) {
          let alt = 0;
          if (i === 0 && j === 0) {
            lastx = alignment.horizontal[i].points[j].x;
            lasty = alignment.horizontal[i].points[j].y;
          }
          const valueX = alignment.horizontal[i].points[j].x - lastx;
          const valueY = alignment.horizontal[i].points[j].y - lasty;
          lastx = alignment.horizontal[i].points[j].x;
          lasty = alignment.horizontal[i].points[j].y;
          length += Math.sqrt(valueX * valueX + valueY * valueY);
          let first = true;
          let lastAlt = 0;
          let lastX = 0;
          let done = false;
          for (let ii = 0; ii < alignment.vertical.length; ii++) {
            for (let jj = 0; jj < alignment.vertical[ii].points.length; jj++) {
              if (first) {
                first = false;
                alt = alignment.vertical[ii].points[jj].y;
                lastAlt = alignment.vertical[ii].points[jj].y;
                if (alignment.vertical[ii].points[jj].x >= length) {
                  break;
                }
              }
              if (alignment.vertical[ii].points[jj].x >= length) {
                const value1 = alignment.vertical[ii].points[jj].x - lastX;
                const value2 = length - lastX;
                const value3 = value2 / value1;
                alt = lastAlt * (1 - value3) + alignment.vertical[ii].points[jj].y * value3;
                done = true;
                break;
              }
              lastAlt = alignment.vertical[ii].points[jj].y;
              lastX = alignment.vertical[ii].points[jj].x;
            }
            if (done) {
              break;
            }
          }
          points.push(
            new Vector3(
              alignment.horizontal[i].points[j].x - startH.x,
              alt - startV.y,
              -(alignment.horizontal[i].points[j].y - startH.y)
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
