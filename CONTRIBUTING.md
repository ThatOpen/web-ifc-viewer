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


## 5. How does the parser works?

If you find difficulties understanding the following information, you should take a look [here](https://tomassetti.me/guide-parsing-algorithms-terminology/) and [here](https://sap.github.io/chevrotain/docs/). Also, if you are not familiar with IFC syntax, you should take a look [here](https://standards.buildingsmart.org/documents/Implementation/ifcXML%20Implementation%20Guide%20v2-0.pdf), especially at the examples. Also bear in mind that the parser is ultimately based on [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

### 5.1. IFC in a nutshell

Before digging into the implementation of the parser, it is necessary to understand how ifc entities look like. At a basic level, an IFC is nothing more than a list of objects with attributes. Each attribute can be a primitive value (a number, a text, a boolean) or a reference to another object. For example, a point in space in IFC is expressed as follows:

    #6= IFCCARTESIANPOINT((0.,0.,0.));

All the objects can be broken down in three parts: _express ID_, _ifc class_ and properties. So, the general schema is something like:

    #ID= IFCCLASS(PROPERTIES);

Note that the properties are always between parenthesis. In this case:

`#6` is the express ID: the unique number that identifies this entity within this file.

`IFCCARTESIANPOINT` is the is the _ifc class_, that is, the type of the data. Points in IFC are expressed as [_IfcCartesianPoint_](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcgeometryresource/lexical/ifccartesianpoint.htm) instances. 

`((0.,0.,0.))` are the properties of this instance. This has two parts:
  
`()` the outer parenthesis always have to enclose the properties of any instance.
  
`(0.,0.,0.)` is a property of type _number set_, whose pattern is a set of numbers separated by commas and surrounded by parenthesis. The points after the zeros are because in IFC all the numbers that are not integers need to have a point for decimals. The point has to be there, even if there are no decimals. 

Finally, `;` means the end of the instance declaration.

So, esentially, what `#6= IFCCARTESIANPOINT((0.,0.,0.));` means is: This is an instance of _IfcCartesianPoint_ with ID _6_ and only one property, of type _number set_, that contains 3 numbers (representing X, Y and Z) whose value is _0_. Easy, right? However, there are properties that can be references to other objects. For example: 


    #6= IFCCARTESIANPOINT((0.,0.,0.));
    #7= IFCDIRECTION((0.,0.,1.));
    #8= IFCDIRECTION((1.,0.,0.));
    #9= IFCAXIS2PLACEMENT3D(#6,#7,#8);


The _ifc class_ _[IfcAxis2Placement3D](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/schema/ifcgeometryresource/lexical/ifcaxis2placement3d.htm)_ is used to define a coordinate system in space. It has three properties: _position_ , _axis_ (direction of Z axis) and _refDirection_ (direction of X axis). As you can see, these three properties are not expressed directly in the instance of _IfcAxis2Placement3D_, but are references to other objects. This is really handy because it favors the Single Responsibility Principle and allows to have more compact files. As you may have guessed, [_IfcDirection_](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD1/HTML/schema/ifcgeometryresource/lexical/ifcdirection.htm) is an entity similar to _IfcCartesianPoint_, but specific for defining vectors in space. 

We have not mentioned all the types of primitive data that an IFC might contain, but the general idea is allways the same. There are two more things to take into account, though: 

`$` means _undefined_. For example, something like `#9= IFCAXIS2PLACEMENT3D(#6,$,$);` represents a coordinate system in space where the axes are not defined, so they have a default value (0,0,1) for the z direction and (1,0,0) for the x direction.

`*` means that the properties of the parent class are inherited. Yes, IFC is _Object Oriented_, and the structure of entities are organized in a hierarchical inheritance structure. Nonetheless, this type of value is rare and the parser doesn't implement it for now, so you don't have to worry about this.

### 5.2. The parser step by step

The process has 5 steps: 

1. The [items reader](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/ifc-services/ifc-items-reader.js) will extract the individual entities of the IFC.
2. The [lexer](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/lexer/lexer.js) defines the vocabulary.
3. The [parser](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/parser/parse-process.js) defines the [primitive syntax](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/parser/parser-primitives.js) (structures of tokens) for every data type in IFC.
4. The parser defines the high-level syntax for every IFC class.
5. The parser reads every item of the IFC using the specific syntax for that ifc class. 
6. The [semantics](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/semantic/semantic.js) query the result to retrieve the parsed information and load it in memory.

This might sound confusing at first, but it is actually really simple.

#### 5.2.1. The items reader

Essentially, the mission of the [items reader](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/ifc-services/ifc-items-reader.js) is to extract the individual ifc items from the raw IFC.

As you already now, an IFC file is a plain text file containing an array of items which look like `#ID= IFCCLASS(PROPERTIES);`. Trying to parse an IFC in a "monolithic" way, i.e. extract all its information at once from thousands of lines of text, is a very difficult task. Therefore, this first step will extract each statement, so the task of the parser will be much easier. That is, instead of parsing the following text with one single (and complex) algorithm:

    #6= IFCCARTESIANPOINT((0.,0.,0.));
    #7= IFCDIRECTION((0.,0.,1.));
    #8= IFCDIRECTION((1.,0.,0.));
    #9= IFCAXIS2PLACEMENT3D(#6,#7,#8);
    
The items reader constructs an array with the following structure:

    [{"id": 6, "type": "IFCCARTESIANPOINT", "properties":"(0.,0.,0.)"},
    {"id": 7, "type": "IFCDIRECTION", "properties":"(0.,0.,1.)"},
    {"id": 8, "type": "IFCDIRECTION", "properties":"(1.,0.,0.)"},
    {"id": 9, "type": "IFCAXIS2PLACEMENT3D", "properties":"(#6,#7,#8)"}]

This way, the parser can iterate all the items and extract the information one by one. Extracting the _express ID_ and the _type_ is a trivial task that you can see implemented in the [items reader](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/ifc-services/ifc-items-reader.js) module. Now, extracting the information from the _properties_ is where the difficulty lies, and the rest of the steps of the parser will concentrate on this task. Thus, note that from now on each parsing step is referring exclusively to parsing a single _properties_ field. The code will iterate through this object and apply the following logic to the _properties_ of each item.

#### 5.2.2. The lexer

In short, the mission of the lexer is to define the _words_ that can be found in an IFC. It receives an array of characters (the _properties_ of an ifc item as text) and outputs an array of tokens.

As we have seen, an IFC is a plain text, that is, a long sequence of characters. The lexer defines several tokens or _words_ that make up the vocabulary. Actually, tokens are just small regular expressions that recognize distinguishable units of text to be parsed. For example, the bools in IFC are expressed as `.T.` (true) and `.F.` (false). The token for recognizing bools in IFC would be as follows (following _chevrotain_'s syntax):

    const booleanToken = newToken({
        name: "BooleanToken",
        pattern: /\.T\.|\.F\./,
      })

So, every time that the lexer sees `.T.` or `.F.` in a text, it recognizes it as a token. For example, an input text like `.F..T..T.` would be converted into the following sequence: `BooleanToken BooleanToken BooleanToken` . Note that the name of the token is not important. 

There might be text that need to be ignored; for example, space characters. This is defined using the _chevrotain.lexer.SKIPPED_ flag, which will create _tokens_ that will be ignored by the parser:

     const spaceToken = newToken({
        name: "SpaceToken",
        pattern: /\s+/,
        group: chevrotain.Lexer.SKIPPED,
      })

This is all the [lexer](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/lexer/lexer.js) does; it defines one token for each recognizable unit of text that can be found within an IFC. But instead of defining the tokens one by one (which would be very repetitive), there is an iteration through an object that defines all the names and regular expressions for each token. Actually, there are two objects: one for the read tokens and other for the ignored tokens. 

As you may know, the patterns (_tokens_) to be found within the _properties_ of an _ifc item_ depend on the data type of each property. For example, a property of type number set always looks like this: `(2.,1.)` , whereas a property of type boolean always looks like this: `.T.`. Therefore, most of the tokens defined in the lexer are correspondant to a _data type_. For this reason, the name of the created tokens is linked to a JS object listing all the _data types_. This object is simply used as an _enum_ to ensure nomenclature consistency whenever _data types_ are referred to. Beware: here, _data types_ is only referring to the pattern of the text that represents the property, that is, how a property is supposed to look like. 

#### 5.2.3. The primitive syntax

Now that the vocabulary has been defined, it is necessary to create _syntatic rules_. The term _syntactic rule_ simply means conditional structure of words / tokens. To be able to parse any text, we have to tell the software what the structure of the text is. For example, imagine that we want to parse a sum like the following:

    1+2

In this case, the structure is really simple: `NumberToken PlusSignToken NumberToken` . Previously the _lexer_ had converted the text to an array of tokens. In this step we are telling the parser the sequence of tokens we are expecting, so it can group tokens toguether into recognizable structures (in this case, a _sum expression_). Obviously, this example is really easy, but let's go back to the example of a point in space:

    #6= IFCCARTESIANPOINT((0.,0.,0.));

As mentioned before, the parser is only parsing the _properties_ part, which in this case are `(0.,0.,0.)`. In the [lexer](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/lexer/lexer.js) we have defined tokens like _number_, _coma_, _closingParenthesis_, _openingParenthesis_, etc. To build the syntax, we have to construct a structure that is able to match the pattern of the property of type _number set_. At a high level, it should be something like: 

    number set = 1 OpenParenthesisToken + 1 or more (NumberToken + (optional) CommaToken) + 1 CloseParenthesisToken

The `CommaToken` is optional because the last number of the set is not followed by a comma. How can we express this pattern in _chevrotain_? The syntax is defined [here](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/parser/parser-primitives.js) and looks like this:

    // Check the _chevrotain_'s documentation for further details about the syntax
    function NumberSet_Parser($) {
      return () => {
        $.OR([
          {
            ALT: () => {
              $.CONSUME(v.OpenPar);
              $.MANY(() => {
                $.CONSUME(v[d.number]);
                $.OPTION(() => {
                  $.CONSUME(v.Comma);
                });
              });
              $.CONSUME(v.ClosePar);
            },
          },
          {
            ALT: () => {
              $.CONSUME(v[d.default]);
            },
          },
        ]);
        $.OPTION2(() => {
          $.CONSUME2(v.Comma);
        });
      };
    }

Even though at first glance this might look intimidating, it is simply a conditional tree of tokens, which is somehow a way of creating complex _regular expressions_ using the _tokens_ as building blocks. For example, the `OR` structure allows to define a syntax that can have different tokens, with `ALT` beeing each alternative. Note that here, for example, there is an `OR` statement first that states that a property of type _number set_ can either be something like `(3.1,4.23)` or something like `$` (when the number set is not defined). 

It is important to note that in this structure all the posibilities have to be covered: if the parser finds something that is not expected in this structure, it will throw an error and will be incapable of parsing the text correctly. In other words: note that this last big and verbose chunk of code is _only_ for parsing _number sets_. Of course, this is great if we are parsing something like an _IfcCartesianPoint_ or a _IfcDirection_, which only have one parameter of type _number set_. But imagine that we want to parse an instance of type _IfcProject_, which looks like this:

    #119= IFCPROJECT('1Xsibz5yH5MxqU$tFrpDk0',#41,'0001',$,$,'Name of project','State of project',(#111),#106);

Notice how big (and unmantainable) this structure will become; perhaps hundreds of lines just for one _ifc class_ (_IfcProject_ in this case). And yes, we have to define a _sintactic structure_ to be able to parse all the _ifc classes_, so this is a problem. This is the reason why in the [parser primitives](https://github.com/agviegas/IFC.js/blob/master/src/ifc-parser/parser/parser-primitives.js) module I define one _syntactic structure_ per data type that can be found in an IFC. The idea is that instead of defining a structure for each _ifc class_ , I can use these basic _syntactic structures_ as building blocks to create the _syntactic structure_ for each _ifc class_ dinamically at runtime. This is explained in the next point.

#### 5.2.4. The high level syntax

Basically, now we have a bunch of _syntactic structures_; specifically, one per _data type_. How can we build a structure for each _ifc class_ using this? To me, the answer is the [strategy pattern](https://refactoring.guru/design-patterns/strategy). As mentioned above, the items in the IFC can be seen as a sequence of properties, and each property has a predefined type. For example, _IfcProject_ has the following properties:

    #119= IFCPROJECT(GlobalId, OwnerHistory, Name, Description, ObjectType, LongName, Phase, RepresentationContexts, UnitsInContext);

These properties are of type:

    #119= IFCPROJECT(guid, id, text, text, text, text, text, text, id);
    
So, defining _factory function_ that is able to create _syntactic structures_ taking as argument an array of _data types_, I was be able to define all the _ifc classes_ simply as an array of _data types_ and the factory would automatically create the _syntactic structures_ for them. This is something you can see in any of the files in the [models folder](https://github.com/agviegas/IFC.js/tree/master/src/ifc-parser/ifc-models). Notice how easy it is to add new _ifc classes_. The _newObject_ function is simply constructing the [parser map](https://github.com/agviegas/IFC.js/blob/7301ac217595d1a1309284860e199dd16c31e739/src/ifc-parser/parser/parser-map.js#L6), which maps each _ifc class_ to its correspondant _syntactic structure_. And this is the key of this implementation, explained in the following point.

Notice that in the [models folder](https://github.com/agviegas/IFC.js/tree/master/src/ifc-parser/ifc-models) some of the properties have names imported from the [namedProps](https://github.com/agviegas/IFC.js/blob/7301ac217595d1a1309284860e199dd16c31e739/src/utils/global-constants.js) object. This is simply used as _enum_ for ensuring the naming consistency.

#### 5.2.5. The parsing process

All the previous points come toguether in the [parser process](https://github.com/agviegas/IFC.js/blob/7301ac217595d1a1309284860e199dd16c31e739/src/ifc-parser/parser/parse-process.js) module. This is the module that orchestrates everything and that reflects the steps explained above:

1. The arguments are the _ifc properties_ and the _ifc type_ (both strings) of item to parse. 
2. The lexer converts the _ifc properties_ to an array of tokens.
3. The parser applies the _syntactic structure_ correspondant to the given _ifc type_.

The output is a _chevrotain_ structure that contains the parsed information. Finally, this information is retrieved by the _visitor_, which is an object defined following the _chevrotain_ architecture explained in the following point.

#### 5.2.6. The semantics


## 6. How does the project builder works?

## 7. How does the Ifc to Three.js module works?

(WIP)


