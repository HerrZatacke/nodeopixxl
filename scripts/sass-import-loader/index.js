const sassImportLoader = source => (
  `@import 'src/web/scss/imports/variables';\n@import 'src/web/scss/imports/mixins';\n${source}`
);

module.exports = sassImportLoader;
