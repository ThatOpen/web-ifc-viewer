# Welcome to IFC.js!

This project is of great interest to the architecture, engineering and construction sector. If you want to join the community, feel free to drop a PR with your suggestions and ideas. The general architecture of the code is explained below.

## What should you know?
The concept of app is simple: it parses IFC files and converts them to 3d geometry that can be displayed in browsers. Thus, the code is based on three fundamental topics: parsing, 3d and IFC. Knowing a bit of at least one of these topics is essential to understand the code and be able to contribute.

- The parsing is done with [Chevrotain](https://github.com/SAP/chevrotain), which is a fast Parser Building Toolkit for JavaScript. You can learn about it in the [Chevrotain docs](https://sap.github.io/chevrotain/docs/).

- The 3d is done with [Three.js](https://github.com/mrdoob/three.js/), a well known lightweight 3d library for the web based on WebGL. Some of the most popular resources are [Threejs docs](https://threejs.org/docs/) and [ThreejsFundamentals](https://threejsfundamentals.org/).

- [IFC](https://technical.buildingsmart.org/standards/ifc/) is the most widely used open format for storing building and infrastructure BIM models. The references I use are [the BuildingSMART 2x3 implementation guide](https://standards.buildingsmart.org/documents/Implementation/ifcXML%20Implementation%20Guide%20v2-0.pdf) and [the official IFC documentation.](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2/HTML/link/annex-d.htm)

## Architecture of the code

The code is composed of 3 decoupled parts, each one responsible of a single task:

The `IFC PARSER` is the part of the code that reads IFC files, converts them into token sequences, structures them according to a syntax and loads them into memory according to some semantic rules. The output is a JavaScript object with all entities and their attributes in the form of their respective data type.

The `IFC PROJECT BUILDER` is responsible for receiving the parser output and structuring the IFC project data. For example, it builds the spatial structure (associating the entities IfcProject - IfcSite - IfcBuilding - IfcBuildingStorey - IfcSpace) and converts the indirect IfcRel relations into references to the entities loaded in memory.

The `IFC TO THREEJS` generates the Three.js geometry that is displayed in the browser. In IFC there are different types of geometrical representation (extrusion, limit definition, etc) that correspond to geometry defined in Three.js. This part of the code maps both geometric definitions using the output of the project builder as input. For example, this creates a _ExtrudeGeometry_ (Three.js) for each _IfcSweptAreaSolid_ of the given IFC file.

````                                                                                                                 
                 +------------+       +------------------------+       +-----------------+                            
                 |            |       |                        |       |                 |                            
 IFC FILE ------>| IFC PARSER |------>|  IFC PROJECT BUILDER   |------>| IFC TO THREE.JS |------> THREE.JS GEOMETRY   
                 |            |       |                        |       |                 |                            
                 +------------+       +------------------------+       +-----------------+                            
````
This architecture is reflected in the folder structure of the code. Each part is divided in several sub-tasks that perform atomic actions inside the **src** folder. Additionally, here are other folders that serve other purposes:
-  **libs** contains resources outside of npm, like the logic for the smooth navigation.
-  **resources** contains screenshots and icons.
-  **dev** contains functions for development (for example, a function that tells the ifc models of the readed IFC file that have not been implemented yet).
-  **styles** contains basic CSS code for the GUI.
-  **utils** contains common code, like global variables or the logic for converting UNICODE text.

````
IFC.js
├───libs
├───resources
└───src
    ├───dev
    ├───ifc-parser
    │   ├───ifc-models
    │   ├───ifc-services
    │   ├───lexer
    │   ├───parser
    │   └───semantic
    ├───ifc-project-builder
    ├───ifc-to-three.js
    │   ├───geometry-generator
    │   ├───geometry-operator
    │   ├───geometry-transformer
    │   └───scene
    ├───styles
    └───utils
````

## How can you contribute?
As a general rule, if you are not sure about contributing, I encourage you to fork this repository, try it on your browser and get your feet wet with a PR. You may not be familiar with the three themes on which the application is based. In that case, it is possible to contribute only to some of the parts of the application without worrying about the rest. In general, there are four scenarios in which you can find yourself right now:

-  **You are interested in IFC, but don't know how to code**: As you may know, the IFC schema has a lot of models; you can help me develop the IFC schemas, as well as develop future documentation.

-  **You are interested in 3d and/ or Three.js**: This application is based on the creation of 3d geometry from given data. I suggest you take a look at the geometry creation module to see if you can come up with new ideas or refactorings. 

-  **You are interested in parsing**: The parser module of this app is very concise and self contained. You can also check [this link](https://tomassetti.me/guide-parsing-algorithms-terminology/) to understand how it works.

-  **You only know JavaScript and have never heard of IFC before**: As you can see, 99% of this application is JavaScript. The libraries used are really easy to use, and spending some time with the above mentioned documentation should be more than enough to get you started with this project with the topic that interests you most. 

-  **Other**: Is there something else you can contribute with? Feel free to PR directly or contact me to let me know of your ideas.

## Adding or modifying code

This is a usual project using node and npm. As in any project, you can contribute using  `npm install` `npm run dev` .
