import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
  input: 'dist/index.js',
  output: {
    file: 'dist/web-ifc-viewer.umd.js',
    format: 'umd',
    name: 'WebIFCViewer',
    sourcemap: true,
    globals: {
      three: 'THREE',
    },
  },
  external: ['three'],
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
  ],
};
