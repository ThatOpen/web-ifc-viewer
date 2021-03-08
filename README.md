# IFC.js

This library converts any browser into an IFC viewer. It parses IFC entities to WebGL geometry through THREE.js.
It is based on [web-ifc-three](https://github.com/tomvandig/web-ifc-three), which is the three adaptation of [web-ifc](https://github.com/tomvandig/web-ifc).

## Why this library if THREE.js already has a loader in a separate repository?

Almost all IFC viewers and BIM tools have the same common tools for navigation, selection, menus, etc. This library contains all the boilerplate code that allows you to create BIM tools in Three in a few minutes and in a simple way. 

## Try it

[Application](https://agviegas.github.io/IFC.js/)

## Introduction

IFC (Industry Foundation Classes) is an open format developed by the [Building Smart](https://www.buildingsmart.org/) for the exchange of information between applications of different developers in the AEC sector. IFC files generally contain much of the relevant information about a building, including all its geometry and the information associated with each element, possibly including measurement, structural, thermal, acoustic, economic or fire resistance data.

This project uses [web-ifc](https://github.com/tomvandig/web-ifc) to read IFC files, structure their data in memory and convert them to Three.js custom geometric entities for display in any browser. Even though there are many libraries capable of parsing IFC formats, almost all of them depend on communication with a server, with all the disadvantages that this entails. The development of the parser entirely in JavaScript and WASM in [web-ifc-three](https://github.com/tomvandig/web-ifc-three) makes it possible to decentralise parsing, so that each client is able to read an IFC file and display its geometry and parameters to the user on its own.

## Contribution

Check the [CONTRIBUTING](https://github.com/agviegas/IFC.js/blob/master/CONTRIBUTING.md) documentation to find out how to take part in this project.

### Testing files
You can find the IFC files for testing [here](https://drive.google.com/drive/folders/1wXLaf1wPaWzfEwWzu7kNTdJoOUqU6K0E?usp=sharing).

Build:

`npm run build` to generate a bundle with your changes in the code

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
