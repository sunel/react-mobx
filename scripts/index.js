const path = require('path');
const paths = require('./utils/paths');
const fs = require('fs');

const rootPath = fs.realpathSync(process.cwd());

const loaderNameMatches = function(rule, loader_name) {
  return rule && rule.loader && typeof rule.loader === 'string' &&
    (rule.loader.indexOf(`${path.sep}${loader_name}${path.sep}`) !== -1 ||
    rule.loader.indexOf(`@${loader_name}${path.sep}`) !== -1);
};

const babelLoaderMatcher = function(rule) {
  return loaderNameMatches(rule, 'babel-loader');
};

const eslintLoaderMatcher = function(rule) {
  return loaderNameMatches(rule, 'eslint-loader');
};

const getLoader = function(rules, matcher) {
  let loader;

  rules.some(rule => {
    return (loader = matcher(rule)
      ? rule
      : getLoader(rule.use || rule.oneOf || (Array.isArray(rule.loader) && rule.loader) || [], matcher));
  });

  return loader;
};

const getBabelLoader = function(rules) {
  return getLoader(rules, babelLoaderMatcher);
};

const getEslintLoader = function(rules) {
  return getLoader(rules, eslintLoaderMatcher);
};

const injectBabelPlugin = function(pluginName, config) {
  const loader = getBabelLoader(config.module.rules);
  if (!loader) {
    console.log('babel-loader not found');
    return config;
  }
  // Older versions of webpack have `plugins` on `loader.query` instead of `loader.options`.
  const options = loader.options || loader.query;
  options.plugins =  [pluginName].concat(options.plugins || []);
  return config;
};

const addWebpackAlias = function(alias, config) {
  if (!config.resolve) {
    config.resolve = {};
  }
  if (!config.resolve.alias) {
    config.resolve.alias = {};
  }
  Object.assign(config.resolve.alias, alias);

  return config;
}

const compose = function(...funcs) {
  if (funcs.length === 0) {
    return config => config;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (config, env) => a(b(config, env), env));
};

const existsInRoot = (name) => (
  fs.existsSync(
    path.join(
      rootPath,
      name
    )
  )
)


module.exports = {
  rootPath,
  getLoader,
  loaderNameMatches,
  getBabelLoader,
  getEslintLoader,
  injectBabelPlugin,
  addWebpackAlias,
  compose,
  paths,
  existsInRoot
};
