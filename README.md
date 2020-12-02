# IFC.js

<a href="url"><img src="https://github.com/agviegas/IFC.js/blob/master/resources/images/logo.jpg"  height="256" width="256" ></a>

This is a frontend parser between .ifc files and Three.js geometry.

## Try it

[Application](https://ifc-js.vercel.app)

[Example 01](https://ifc-js.vercel.app/#/sample1)

[Example 02](https://ifc-js.vercel.app/#/sample2)

## Introduction

IFC (Industry Foundation Classes) is an open format developed by the [Building Smart](https://www.buildingsmart.org/) for the exchange of information between applications of different developers in the AEC sector. IFC files generally contain much of the relevant information about a building, including all its geometry and the information associated with each element, possibly including measurement, structural, thermal, acoustic, economic or fire resistance data.

This project reads IFC files, structures their data in memory and converts them to Three.js custom geometric entities for display in any browser. Even though there are many libraries capable of parsing IFC formats, almost all of them depend on communication with a server, with all the disadvantages that this entails. The development of the parser entirely in JavaScript makes it possible to decentralise parsing, so that each client is able to read an IFC file and display its geometry and parameters to the user on its own.

<a href="url"><img src="https://github.com/agviegas/IFC.js/blob/master/resources/images/20201124_screenshot.jpg"  ></a>
<a href="url"><img src="https://github.com/agviegas/IFC.js/blob/master/resources/images/20201130_screenshot.jpg"  ></a>

## Contribution

Check the [CONTRIBUTING](https://github.com/agviegas/IFC.js/blob/master/CONTRIBUTING.md) documentation to find out how to take part in this project.

Core:
`npm install`

`npm run watch` for watching core changes

Demo:

`cd demo`
`npm install`
`npm run serve`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
