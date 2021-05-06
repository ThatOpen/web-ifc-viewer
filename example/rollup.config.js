import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules (mandatory)

export default {
  input: 'main.js',
  output: [
    {
      format: 'iife',
      file: "build/bundle.js"
    },
  ],
  plugins: [
    resolve(),
  ]
};