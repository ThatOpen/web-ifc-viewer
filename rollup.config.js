import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"


export default {
  input: './src/IFC.js',
  external: ['three'],
  output: {
    file: './build/IFC.js',
    format: 'es',
    globals: {
      three: 'THREE',
    }
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};
