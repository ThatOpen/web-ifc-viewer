import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules (mandatory)
// import { terser } from "rollup-plugin-terser"; // code minification (optional)

export default {
  input: 'src/js/IfcLoader.js',
  output: [
    {
      format: 'cjs',
      file: 'src/js/build/IfcLoader.js'
    },
  ],
  plugins: [
    resolve()
  ]
};