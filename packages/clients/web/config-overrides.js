const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// our packages that will now be included in the CRA build step
const appIncludes = [
  resolveApp("src"),
  resolveApp("../../app/src"),
  resolveApp("../../../node_modules"),
];

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => plugin.constructor.name !== "ModuleScopePlugin"
  );

  config.module.rules[0].include = appIncludes;
  config.module.rules[1].oneOf[2].include = appIncludes;
  config.module.rules[1].oneOf[2].options.plugins.push(
    require.resolve("babel-plugin-react-native-web")
  );
  config.module.rules[1].oneOf[2].options.plugins.push(
    require.resolve("@babel/plugin-proposal-class-properties")
  );
  config.module.rules[1].oneOf[2].options.plugins.push(
    require.resolve("babel-plugin-relay")
  );
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== "production" })
  );

  // Load react-native-vector-icons
  config.module.rules.push({
    test: /\.ttf$/,
    loader: 'file-loader',
    include: path.resolve(__dirname, './static/media/[name].[ext]'),
  });

  return config;
};
