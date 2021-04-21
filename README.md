# IFC.js

This library converts any browser into an IFC viewer. It parses IFC entities to WebGL geometry through THREE.js.
It is based on [web-ifc-three](https://github.com/tomvandig/web-ifc-three), which is the three adaptation of [web-ifc](https://github.com/tomvandig/web-ifc).

[Try it here!](https://agviegas.github.io/web-ifc-viewer/)

## Documentation

Take a look at the [documentation](https://agviegas.github.io/ifcjs-docs/#/) to see what this library is about, guides and more.

## Community

Join the [Discord channel](https://discord.gg/g7Uzn2KSwB) to meet other people interested in this project!

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
