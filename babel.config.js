module.exports = {
  plugins: [
    ['@babel/plugin-proposal-decorators', {
      // decoratorsBeforeExport: true,
      legacy: true,
    }],
    '@babel/plugin-proposal-class-properties',
  ]
}
