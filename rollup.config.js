import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules (mandatory)
// import { terser } from "rollup-plugin-terser"; // code minification (optional)
import serve from 'rollup-plugin-serve'

export default {
  input: 'example/main.js',
  output: [
    {
      format: 'cjs',
      file: 'example/build/bundle.js'
    },
  ],
  plugins: [
    resolve(),
    serve('example')
  ],
  watch: {
    include: "example/main.js"
  }
};