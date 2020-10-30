const base = require('./base');
const merge = require('lodash.merge');
const { resolveEnvVariables } = require('./helpers');

const env = resolveEnvVariables(process.argv[3]);

console.warn(
  `%c La configuración de Webpack es de %c${env.NODE_ENV}`,
  'color: green; font-style: italic; font-size: 20px',
  'color: red; font-weight: bold'
);

module.exports = merge(base(env), {
  // externals: ["zone.js"],
});
