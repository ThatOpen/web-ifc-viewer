import { exportGeometryAsObj } from '../../src/IFC.js';

function exportFile() {
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

const exportButton = document.getElementById('exportFile');
exportButton.addEventListener('click', exportFile);
