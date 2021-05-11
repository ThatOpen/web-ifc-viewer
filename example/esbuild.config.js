import * as NodeModulesPolyfills  from '@esbuild-plugins/node-modules-polyfill';
import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ["main.js"],
  outfile: "build/main.js",
  bundle: true,
  plugins: [
    NodeModulesPolyfills.NodeModulesPolyfillPlugin(),
  ],
})