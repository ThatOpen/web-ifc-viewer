module.exports = {
  lintOnSave: true,

  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {
      fix: false,
      files: ['src/**/*.vue']
    }
  }
};
