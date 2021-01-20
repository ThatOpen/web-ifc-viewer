const { TypeChecker } = require('esbuild-helpers');

// I would use splitview and have this in own view

const checker_client = TypeChecker({
  basePath: './src',
  name: 'checker_client',
  tsConfig: './tsconfig.json',
  print_summary: true,
  print_runtime: true
});

checker_client.printSettings();
checker_client.inspectAndPrint();
