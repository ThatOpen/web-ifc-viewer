<p align="center">
  <a href="https://ifcjs.github.io/info/">ifc.js</a>
  |
  <a href="https://ifcjs.github.io/info/docs/Guide/web-ifc-viewer/Introduction">documentation</a>
  |
  <a href="https://ifcjs.github.io/web-ifc-viewer/example/index">demo</a>
  |
  <a href="https://discord.gg/FXfyR4XrKT">discord</a>
  |
  <a href="https://github.com/IFCjs/web-ifc-viewer/tree/master/example">usage example</a>
  |
  <a href="https://www.npmjs.com/package/web-ifc-viewer">npm package</a>
</p>

<img src="banner.png">
<h1>web-ifc-viewer <img src="https://ifcjs.github.io/info/img/logo.svg" width="32"></h1>

![npm](https://img.shields.io/npm/dw/web-ifc-viewer)
![opencollective](https://opencollective.com/ifcjs/tiers/badge.svg)

This library is an extension of [web-ifc-three](https://github.com/IFCjs/web-ifc-three), which is the official `IFCLoader` for [THREE.js](https://github.com/mrdoob/three.js/). This doesn't only parse and generate the Three.js geometry of IFC models in JavaScript, but also provides multiple tools to easily build BIM tools, such as 3d dimensions, clipping planes, 2D plan navigation and generation, etc.

## Status

**web-ifc-viewer** offers multiple tools to create awesome BIM tools in no time. While the tools are quite stable, the state of this repository is tightly coupled with the state of [web-ifc-three](https://github.com/IFCjs/web-ifc-three) and [web-ifc](https://github.com/tomvandig/web-ifc). 

Check out their `README` files to better understand where the project currently is.

## Demo 

Test IFC.js Web IFCviewer with your IFC models in our [online Demo](https://ifcjs.github.io/web-ifc-viewer/example/index)

## Documentation

Check out [our official docs](https://github.com/IFCjs/web-ifc-viewer/blob/master/CONTRIBUTING.md) for API reference, guides and tutorials.

## Install

`npm install web-ifc-viewer` or `yarn add web-ifc-viewer`

## Quick setup

First, create a JavaScript file that imports the library and creates a scene:

```js
import { IfcViewerAPI } from 'web-ifc-viewer';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container });
viewer.axes.setAxes();
viewer.grid.setGrid();

const input = document.getElementById("file-input");

input.addEventListener("change",

  async (changed) => {
   
    const file = changed.target.files[0];
    const ifcURL = URL.createObjectURL(file);
    viewer.IFC.loadIfcUrl(ifcURL);
  },

  false
);
```

You can bundle this file using any bundler. This is an example configuration file using [rollup](https://rollupjs.org/guide/en/):

```js
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'index.js',
  output: {
    file: "bundle.js",
    format: 'esm'
  },
  plugins: [ resolve() ]
};
```

Now you display it in an HTML page like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="icon" type="image/png" href="./favicon.ico" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="./styles.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IFC.js</title>
  </head>
  <body>
    <input type="file" id="file-input" accept=".ifc, .ifcXML, .ifcZIP">
    <div id="viewer-container"></div>
    <script src="./bundle.js"></script>
  </body>
</html>
```

## Content

This project consists of the following folders:

- **viewer**: contains the source code.

- **example**: contains one example of how to use the library.

## Contributing

Want to help out? Great!

Please checkout [our contribution suggestsions](https://github.com/IFCjs/web-ifc-viewer/blob/master/CONTRIBUTING.md) or speak to us directly in [Discord](https://discord.gg/FXfyR4XrKT).


