// Config file for running Rollup in "normal" mode (non-watch)

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

const GLOBALS = {
  three: 'THREE',
  chevrotain: 'chevrotain'
};

const EXTERNAL = ['three'];

export default {
  input: 'src/index.js',
  external: EXTERNAL,

  output: [
    {
      file: pkg.main,
      format: 'cjs',
      globals: GLOBALS
    },
    {
      file: pkg.module,
      format: 'esm',
      globals: GLOBALS
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'IFC',
      globals: GLOBALS
    }
  ],
  plugins: [
    commonjs(),
    json(),
    babel({
      exclude: 'node_modules/**'
    }),
    globals(GLOBALS),
    builtins(),
    copy({
      targets: [
        {
          src: 'build/**',
          dest: 'examples/libs'
        }
      ]
    })
  ]
};
