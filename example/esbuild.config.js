import * as NodeModulesPolyfills  from '@esbuild-plugins/node-modules-polyfill';
import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ["main.js"],
  format: "cjs",
  target: "es2018",
  outfile: "build/main.js",
  bundle: true,
  plugins: [
    NodeModulesPolyfills.NodeModulesPolyfillPlugin(),
    // babel()
  ],
})