const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  const newConfig = {
    ...config,
    plugins: [...config.plugins, new MonacoWebpackPlugin({})],
  };
  return newConfig;
};
