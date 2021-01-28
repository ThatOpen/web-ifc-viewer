import { exportGeometryAsObj } from '../../src/IFC.js';

function exportFileAsObj() {
  const result = exportGeometryAsObj();
  saveArrayBuffer(result, 'ifcjsExport.obj');
}

const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link);

function save(blob, filename) {
  link.href = URL.createObjectURL(blob)
  link.download = filename;
  link.click();
}

function saveArrayBuffer(buffer, filename) {
  save(new Blob([buffer], {type: 'application/octet-stream'}), filename);
}

if (document.getElementById('exportFileAsObj')) {
  const exportButton = document.getElementById('exportFileAsObj');
  exportButton.addEventListener('click', exportFileAsObj);
}
