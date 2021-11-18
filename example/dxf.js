import Drawing from 'dxf-writer'

export function exportDXF() {

  let d = new Drawing();
  d.setUnits('Meters');
  d.addLayer('l_green', Drawing.ACI.GREEN, 'CONTINUOUS');
  d.setActiveLayer('l_green');

  const atributes = window.asdfasdf;
  const coordinates = atributes.position.array;

  // console.log(coordinates);

  for(let i = 0; i < coordinates.length - 5; i += 6) {
    const start = [coordinates[i], coordinates[i + 2]];
    const end = [coordinates[i + 3], coordinates[i + 5]];
    if(start[0] === 0 && start[1] === 0 && end[0] === 0 && end[1] === 0) continue;
    d.drawLine(start[0], start[1], end[0], end[1]);
  }

  const saveLink = document.createElement('a');
  const blob = new Blob([d.toDxfString()], {type: "application/dxf"});
  saveLink.href  = URL.createObjectURL(blob);
  saveLink.download = "data.dxf";
  saveLink.click();
}


