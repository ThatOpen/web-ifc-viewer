import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  input: 'main.js',
  output: {
    file: "build/main.js",
    format: 'iife'
  },
  plugins: [ resolve(),  nodePolyfills(), commonjs() ]
};