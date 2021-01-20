const { TypeChecker } = require('esbuild-helpers');

const TEST = process.argv[2] === 'test';
const TEST_WATCH = process.argv[2] === 'test' && process.argv[3] === 'watch';

if (TEST) {
  const checker_client = TypeChecker({
    basePath: './src',
    name: 'checker_client',
    tsConfig: './tsconfig.json',
    print_summary: true,
    print_runtime: true
  });

  checker_client.printSettings();
  checker_client.inspectAndPrint();

  if (TEST_WATCH) {
    checker_client.worker_watch('./');
  }
}
