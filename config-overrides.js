const { compose } = require('react-app-rewired');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireMobX = require('react-app-rewire-mobx');
const path = require('path');
const uniq = require('lodash/uniq');
const concat = require('lodash/concat');

module.exports = function override(config, env) {

  config.resolve.modules = uniq(concat((config.resolve.modules || []), [
    path.resolve(__dirname, 'src')
  ]));

  if (env === "production") {
    console.log("⚡ Production build with Preact");
    config.resolve.alias = Object.assign(config.resolve.alias, {
      "react": "preact-compat",
      "react-dom": "preact-compat",
      "mobx-react": "mobx-preact"
    });
  }

  const rewires = compose(
    rewireReactHotLoader,
    rewireMobX
  );

  return rewires(config, env);
}