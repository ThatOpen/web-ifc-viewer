# IFC.js

This library converts any browser into an IFC viewer. It parses IFC entities to WebGL geometry through THREE.js.
It is based on [web-ifc-three](https://github.com/tomvandig/web-ifc-three), which is the three adaptation of [web-ifc](https://github.com/tomvandig/web-ifc).

[Try it here!](https://agviegas.github.io/web-ifc-viewer/)

## Why this library if THREE.js already has a loader in a separate repository?

Almost all IFC viewers and BIM tools have the same common tools for navigation, selection, menus, etc. This library contains all the boilerplate code that allows you to create BIM tools in Three in a few minutes and in a simple way. 

## Introduction

IFC (Industry Foundation Classes) is an open format developed by the [Building Smart](https://www.buildingsmart.org/) for the exchange of information between applications of different developers in the AEC sector. IFC files generally contain much of the relevant information about a building, including all its geometry and the information associated with each element, possibly including measurement, structural, thermal, acoustic, economic or fire resistance data.

This project uses [web-ifc](https://github.com/tomvandig/web-ifc) to read IFC files, structure their data in memory and convert them to Three.js custom geometric entities for display in any browser. Even though there are many libraries capable of parsing IFC formats, almost all of them depend on communication with a server, with all the disadvantages that this entails. The development of the parser entirely in JavaScript and WASM in [web-ifc-three](https://github.com/tomvandig/web-ifc-three) makes it possible to decentralise parsing, so that each client is able to read an IFC file and display its geometry and parameters to the user on its own.

## Contribution

Do you want to contribute to make this even better? Bear in mind that this project is split in three repositories, so you might want to contribute to the part that interests you most.

- [web-ifc](https://github.com/tomvandig/web-ifc) if you are interested in low-level IFC parsing, WebAssembly, Emscripten, C++.

- [web-ifc-three](https://github.com/tomvandig/web-ifc-three) if you want to help us with the Three.js geometry generation.

- This repository if you have ideas about cool tools that could help others develop BIM applications!

- You can 

## Testing files
You can find the IFC files for testing [here](https://github.com/agviegas/test-ifc-files).

## Issues

You can refer your issue to the specific repository: 

- [web-ifc](https://github.com/tomvandig/web-ifc) if you have any problem with the parsing / loading (items not being readed / loaded correctly, information missing).

- [web-ifc-three](https://github.com/tomvandig/web-ifc-three) if you have any problem with the adaptation we did for Three.js (efficiency, Three geometry generation, etc).

- This repository if you have any problem with the boilerplate code it offers to develop BIM viewers.

## Build

`npm run build` to generate a bundle with your changes in the code

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
