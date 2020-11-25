# Welcome to IFC.js!

This project is of great interest to the architecture, engineering and construction sector. If you want to join the community, feel free to drop a PR with your suggestions and ideas. 

## Index

  1. What should you know?
  2. Architecture of the code.
  4. How can you contribute?
  5. Adding or modifying code
  6. How does the parser work?

## 1. What should you know?
The concept of app is simple: it parses IFC files and converts them to 3d geometry that can be displayed in browsers. Thus, the code is based on three fundamental topics: parsing, 3d and IFC. Knowing a bit of at least one of these topics is essential to understand the code and be able to contribute.

- The parsing is done with [Chevrotain](https://github.com/SAP/chevrotain), which is a fast Parser Building Toolkit for JavaScript. You can learn about it in the [Chevrotain docs](https://sap.github.io/chevrotain/docs/).

- The 3d is done with [Three.js](https://github.com/mrdoob/three.js/), a well known lightweight 3d library for the web based on WebGL. Some of the most popular resources are [Threejs docs](https://threejs.org/docs/) and [ThreejsFundamentals](https://threejsfundamentals.org/).

- [IFC](https://technical.buildingsmart.org/standards/ifc/) is the most widely used open format for storing building and infrastructure BIM models. The references I use are [the BuildingSMART 2x3 implementation guide](https://standards.buildingsmart.org/documents/Implementation/ifcXML%20Implementation%20Guide%20v2-0.pdf) and [the official IFC documentation.](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2/HTML/link/annex-d.htm)

## 2. Architecture of the code

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

## 3. How can you contribute?
As a general rule, if you are not sure about contributing, I encourage you to fork this repository, try it on your browser and get your feet wet with a PR. You may not be familiar with the three themes on which the application is based. In that case, it is possible to contribute only to some of the parts of the application without worrying about the rest. In general, there are four scenarios in which you can find yourself right now:

-  **You are interested in IFC, but don't know how to code**: As you may know, the IFC schema has a lot of models; you can help me develop the IFC schemas, as well as develop future documentation.

-  **You are interested in 3d and/ or Three.js**: This application is based on the creation of 3d geometry from given data. I suggest you take a look at the geometry creation module to see if you can come up with new ideas or refactorings. 

-  **You are interested in parsing**: The parser module of this app is very concise and self contained. You can also check [this link](https://tomassetti.me/guide-parsing-algorithms-terminology/) to understand how it works.

-  **You only know JavaScript and have never heard of IFC before**: As you can see, 99% of this application is JavaScript. The libraries used are really easy to use, and spending some time with the above mentioned documentation should be more than enough to get you started with this project with the topic that interests you most. 

-  **Other**: Is there something else you can contribute with? Feel free to PR directly or contact me to let me know of your ideas.

## 4. Adding or modifying code

This is a usual project using node and npm. As in any project, you can contribute using  `npm install` `npm run dev` . 

If you find any issue while trying to load an IFC, take a look at the console to see more information about the issue.


## 5. How does the parser work?

If you find difficulties understanding the following information, you should take a look [here](https://tomassetti.me/guide-parsing-algorithms-terminology/) and [here](https://sap.github.io/chevrotain/docs/). Also, if you are not familiar with IFC syntax, you should take a look [here](https://standards.buildingsmart.org/documents/Implementation/ifcXML%20Implementation%20Guide%20v2-0.pdf), especially at the examples.

### 5.1. IFC in a nutshell

Before digging into the implementation of the parser, it is necessary to understand how ifc entities look like. At a basic level, an IFC is nothing more than a list of objects with attributes. Each attribute can be a primitive value (a number, a text, a boolean) or a reference to another object. For example, a point in space in IFC is expressed as follows:

`#6= IFCCARTESIANPOINT((0.,0.,0.));`

All the objects can be broken down in three parts: _express ID_, _ifc class_ and properties. So, the general schema is something like:

`#ID= IFCCLASS(PROPERTIES);`

Note that the properties are always between parenthesis. In this case:

`#6` is the express ID: the unique number that identifies this entity within this file.

`IFCCARTESIANPOINT` is the is the _ifc class_, that is, the type of the data. Points in IFC are expressed as [_IfcCartesianPoint_](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcgeometryresource/lexical/ifccartesianpoint.htm) instances. 

`((0.,0.,0.))` are the properties of this instance. This has two parts:
  
`()` the outer parenthesis always have to enclose the properties of any instance.
  
`(0.,0.,0.)` is a property of type _number set_, whose pattern is a set of numbers separated by commas and surrounded by parenthesis. The points after the zeros are because in IFC all the numbers that are not integers need to have a point for decimals. The point has to be there, even if there are no decimals. 

Finally, `;` means the end of the instance declaration.

So, esentially, what `#6= IFCCARTESIANPOINT((0.,0.,0.));` means is: This is an instance of _IfcCartesianPoint_ with ID _6_ and only one property, of type _number set_, that contains 3 numbers (representing X, Y and Z) whose value is _0_. Not hard, right? However, there are properties that can be references to other objects. For example: 


    #6= IFCCARTESIANPOINT((0.,0.,0.));
    #7= IFCDIRECTION((0.,0.,1.));
    #8= IFCDIRECTION((1.,0.,0.));
    #9= IFCAXIS2PLACEMENT3D(#6,#7,#8);


The _ifc class_ _[IfcAxis2Placement3D](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcgeometryresource/lexical/ifcaxis2placement3d.htm)_ is used to define a coordinate system in space. It has three properties: _position_ , _axis_ (direction of Z axis) and _refDirection_ (direction of X axis). As you can see, these three properties are not expressed directly in the instance of _IfcAxis2Placement3D_, but are references to other objects. This is really handy because it favors the Single Responsibility Principle and allows to have more compact files. As you may have guessed, [_IfcDirection_](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD1/HTML/schema/ifcgeometryresource/lexical/ifcdirection.htm) is an entity similar to _IfcCartesianPoint_, but specific for defining vectors in space. 

We have not mentioned all the types of primitive data that an IFC might contain, but the general idea is allways the same. There are two more things to take into account, though: 

`$` means _undefined_. For example, something like `#9= IFCAXIS2PLACEMENT3D(#6,$,$);` represents a coordinate system in space where the axes are not defined, so they have a default value (0,0,1) for the z direction and (1,0,0) for the x direction.

`*` means that the properties of the parent class are inherited. Yes, IFC is _Object Oriented_, and the structure of entities are organized in a hierarchical inheritance structure. Nonetheless, this type of value is rare and the parser doesn't implement it for now, so you don't have to worry about this.

### 5.2. The parser in a nutshell

The parser is really simple. It is fully based in chevrotain.js, which has a wonderful [documentation](https://sap.github.io/chevrotain/docs/). The parsing process is composed by 3 steps: 

* Definition of the [lexer](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/lexer/lexer.js) : tokens / atomic regular expressions that construct a vocabulary.
* Definition of the [parser](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/parser/parse-process.js) : syntax or conditional structures of regular expressions.
* Definition of the [semantic](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/semantic/semantic.js) : logic to retrieve the desired information and structure it in memory.

(WIP)


