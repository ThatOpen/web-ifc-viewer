// Config file for running Rollup in "normal" mode (non-watch)

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';
import pkg from '../package.json';

const GLOBALS = {
  three: 'THREE'
};

export default {
  input: 'src/IFC.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      external: ['three'],
      globals: GLOBALS
    },
    {
      file: pkg.module,
      format: 'es',
      external: ['three'],
      globals: GLOBALS
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'IFC',
      external: ['three'],
      globals: GLOBALS
    }
  ],
  external: ['three'],
  plugins: [
    commonjs(),
    json(),
    babel({
      exclude: 'node_modules/**'
    }),
    globals({
      THREE: 'three'
    }),
    builtins()
  ]
};
