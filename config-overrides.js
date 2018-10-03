const { compose, injectBabelPlugin, addWebpackAlias } = require('./scripts');
const path = require('path');
const uniq = require('lodash/uniq');
const concat = require('lodash/concat');

const reactHotLoader = function(config, env) {
  if (env === 'production') {
    return config;
  }
  return injectBabelPlugin(['react-hot-loader/babel'], config);
}

const decorators = function(config, env) {
  return injectBabelPlugin(["@babel/plugin-proposal-decorators", { legacy: true }], config);
}

module.exports = function override(config, env) {

  config.resolve.modules = uniq(concat((config.resolve.modules || []), [
    path.resolve(__dirname, 'src')
  ]));

  const alias = {};

  if (env === "production") {
    console.log("⚡ Production build with Preact");
    Object.assign(alias, {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    });
  }

  addWebpackAlias(alias, config);

  const rewires = compose(
    reactHotLoader,
    decorators
  );
  
  return rewires(config, env);
}