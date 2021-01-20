const { TypeChecker, client } = require('esbuild-helpers');

const TEST = process.argv[2] === 'test';
const TEST_WATCH = process.argv[2] === 'test' && process.argv[3] === 'watch';

/**
 *  build if not just test
 */
if (!TEST && !TEST_WATCH) {
  client(
    { watch: './src/**/*.ts' },
    {
      color: true,
      define: {
        DEVELOPMENT: true
      },
      entryPoints: ['./src/IFC.ts'],
      outfile: './devBuild/IFC.js',
      minify: false,
      bundle: true,
      platform: 'browser',
      format: 'esm',
      sourcemap: true,
      logLevel: 'warning',
      incremental: true
    }
  );
  
  // I havent added simple way for this in esbuild-helper..
  const liveServer = require('live-server');
  liveServer.start({open:"/examples/00/"});
}


/**
 *  type checker if TEST or nothing is set
 */
if (TEST || (!TEST && !TEST_WATCH)) {
  const checker_client = TypeChecker({
    basePath: './src',
    name: 'checker_client',
    tsConfig: './tsconfig.json'
  });

  checker_client.printSettings();
  checker_client.inspectAndPrint();

  if (TEST_WATCH || (!TEST && !TEST_WATCH)) {
    checker_client.worker_watch('./');
  }
}
