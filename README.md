# IFC.js

<a href="url"><img src="https://github.com/agviegas/IFC.js/blob/master/img/logo.jpg"  height="256" width="256" ></a>

This library converts any browser into an IFC viewer. It parses IFC entities to WebGL geometry through THREE.js.

## Try it

[Application](https://agviegas.github.io/IFC.js/examples/00/)

[Example 01](https://agviegas.github.io/IFC.js/examples/01/)

[Example 02](https://agviegas.github.io/IFC.js/examples/02/)

## Introduction

IFC (Industry Foundation Classes) is an open format developed by the [Building Smart](https://www.buildingsmart.org/) for the exchange of information between applications of different developers in the AEC sector. IFC files generally contain much of the relevant information about a building, including all its geometry and the information associated with each element, possibly including measurement, structural, thermal, acoustic, economic or fire resistance data.

This project reads IFC files, structures their data in memory and converts them to Three.js custom geometric entities for display in any browser. Even though there are many libraries capable of parsing IFC formats, almost all of them depend on communication with a server, with all the disadvantages that this entails. The development of the parser entirely in JavaScript makes it possible to decentralise parsing, so that each client is able to read an IFC file and display its geometry and parameters to the user on its own.

<a href="url"><img src="https://github.com/agviegas/IFC.js/blob/master/img/20201124_screenshot.jpg"  ></a>
<a href="url"><img src="https://github.com/agviegas/IFC.js/blob/master/img/20201130_screenshot.jpg"  ></a>

## Contribution

Check the [CONTRIBUTING](https://github.com/agviegas/IFC.js/blob/master/CONTRIBUTING.md) documentation to find out how to take part in this project.

### Testing files
You can find the IFC files for testing [here](https://drive.google.com/drive/folders/1wXLaf1wPaWzfEwWzu7kNTdJoOUqU6K0E?usp=sharing).

Core:

`npm run build` for generating the build files.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
