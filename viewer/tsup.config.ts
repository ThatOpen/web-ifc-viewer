import { Options, defineConfig } from 'tsup';

function defineOptions({
  format,
  dts,
  globalName
}: Pick<Options, 'format' | 'dts' | 'globalName'>) {
  return {
    entry: ['./src/index.ts'],
    format,
    globalName,
    dts,
    sourcemap: true,
    clean: true
  };
}

const esm: Options = defineOptions({ format: 'esm', dts: true });
const cjs: Options = defineOptions({ format: 'cjs' });
// UMD please see: https://github.com/egoist/tsup/issues/70#issuecomment-660898850
const iife: Options = defineOptions({ format: 'iife', globalName: 'WebIfcViewer' }); 

export default defineConfig([esm, cjs, iife]);
