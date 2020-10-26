# IFC.js

This is a frontend parser between .ifc files and Three.js geometry.

## Introduction

IFC (Industry Foundation Classes) is an open format developed by the [Building Smart](https://www.buildingsmart.org/) for the exchange of information between applications of different developers in the AEC sector. IFC files generally contain much of the relevant information about a building, including all its geometry and the information associated with each element, possibly including measurement, structural, thermal, acoustic, economic or fire resistance data.

This project reads IFC files, structures their data in memory and converts them to Three.js custom geometric entities for display in any browser without depending on communication with a backend.
