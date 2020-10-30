const path = require('path');

const rootPath = path.resolve(__dirname, '../../');

exports.resolveFromRootPath = (...args) => path.join(rootPath, ...args);

exports.resolveEnvVariables = (env) => ({
  NODE_ENV:
    env === '--prod'
      ? (process.env.NODE_ENV = 'production')
      : (process.env.NODE_ENV = 'development'),
});
