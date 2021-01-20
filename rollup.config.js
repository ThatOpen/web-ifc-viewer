import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/IFC.ts',
  external: ['three', 'chevrotain'],
  output: [
    {
      file: './build/IFC.module.js',
      format: 'es',
      sourcemap: true,
      globals: {
        three: 'THREE',
        chevrotain: 'chevrotain'
      }
    },
    {
      file: './build/IFC.js',
      format: 'iife',
      name: 'IFCjs',
      sourcemap: true,
      globals: {
        three: 'THREE',
        chevrotain: 'chevrotain'
      }
    }
  ],
  plugins: [
    typescript({tsconfig:'./src/tsconfig.json'})
  ]
};
