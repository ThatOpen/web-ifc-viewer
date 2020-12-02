// Config file for running Rollup in "watch" mode
// This adds a sanity check to help ourselves to run 'rollup -w' as needed.

import rollupGitVersion from 'rollup-plugin-git-version';
import gitRev from 'git-rev-sync';

const branch = gitRev.branch();
const rev = gitRev.short();
const version = `${require('../package.json').version}+${branch}.${rev}`;

const banner = `/* @preserve
 * IndoorJS ${version}, a JS library for interactive indoor maps. https://mudin.github.io/indoorjs
 * (c) 2019 Mudin Ibrahim
 */
`;

export default {
  input: 'src/Indoor.js',
  output: {
    file: 'dist/indoor.js',
    format: 'umd',
    name: 'Indoor',
    banner,
    sourcemap: true
  },
  legacy: true, // Needed to create files loadable by IE8
  plugins: [rollupGitVersion()]
};
