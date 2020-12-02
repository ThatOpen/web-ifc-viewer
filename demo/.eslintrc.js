module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    THREE: true
  },
  plugins: ['prettier'],
  rules: {
    'template-curly-spacing': 'off',
    indent: 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ],
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: false
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'arrow-parens': 'off',
    'function-paren-newline': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: true
      }
    ],
    'no-console': 'off',
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false,
        'control-character-in-input-stream': false
      }
    ],
    'vue/no-use-v-if-with-v-for': [
      'error',
      {
        allowUsingIterationVar: true // default: false
      }
    ],
    'max-len': [
      'warn',
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true
      }
    ],
    'no-param-reassign': [
      2,
      {
        props: false
      }
    ]
  }
};
