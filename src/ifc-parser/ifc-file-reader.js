import React, { useEffect } from "react";
import buildIfcProject from "./ifc-project-builder";

function IfcReader(props) {
  useEffect(() => {
    readInput();
  });

  return (
    <div>
      <input type="file" />
    </div>
  );
}

function readInput() {
  const input = document.querySelector('input[type="file"]');
  if (!input) return;
  input.addEventListener(
    "change",
    (e) => {
      readFile(input);
    },
    false
  );
}

function readFile(input) {
  const reader = new FileReader();
  reader.onload = () => {
    buildIfcProject(reader.result);
  };
  reader.readAsText(input.files[0]);
}

export default IfcReader;
