import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json'
    }
  },
  // These node_modules need to be transpiled
  // https://stackoverflow.com/a/63390125/3466729
  transformIgnorePatterns: ['node_modules/(?!(web-ifc-three|web-ifc|three))']
};
export default config;
