const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { resolveFromRootPath } = require('./helpers');

module.exports = (env) => ({
  context: resolveFromRootPath('src'),

  output: {
    publicPath: 'http://localhost:3009/',
    uniqueName: 'testangular',
  },
  optimization: {
    runtimeChunk: false,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'testangular',
      filename: 'remoteEntry.js',
      remotes: {
        eventBus:
          env.NODE_ENV === 'production'
            ? 'eventBus@http://myDomain.org/remoteEntry.js'
            : 'eventBus@http://localhost:3003/remoteEntry.js',
      },
      exposes: {
        AppModule: resolveFromRootPath('./src/app/app.module.ts'),
      },
      shared: {
        '@angular/animations': {
          singleton: true,
          requiredVersion: '11.0.0-rc.1',
        },
        '@angular/cdk': {
          singleton: true,
          requiredVersion: '11.0.0-rc.0'
        },
        '@angular/common': {
          singleton: true,
          requiredVersion: '11.0.0-rc.1',
        },
        '@angular/compiler': {
          singleton: true,
          requiredVersion: '11.0.0-rc.1',
        },
        '@angular/core': {
          singleton: true,
          requiredVersion: '11.0.0-rc.1'
        },
        '@angular/forms': {
          singleton: true,
          requiredVersion: '11.0.0-rc.1'
        },
        '@angular/material': {
          singleton: true,
          requiredVersion: '11.0.0-rc.0',
        },
        '@angular/platform-browser': {
          singleton: true,
          requiredVersion: '11.0.0-rc.1',
        },
        '@angular/platform-browser-dynamic': {
          singleton: true,
          requiredVersion: '11.0.0-rc.1',
        },
        '@angular/router': {
          singleton: true,
          requiredVersion: '11.0.0-rc.1',
        },
        'zone.js': {
          singleton: true,
          requiredVersion: '0.10.2'
        },
      },
    }),
  ],
});
