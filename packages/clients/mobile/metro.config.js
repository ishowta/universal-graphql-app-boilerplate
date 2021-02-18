/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 */

const path = require("path");

module.exports = {
  projectRoot: path.resolve(__dirname, "."),
  transformer: {
    getTransformOptions: async () => {
      return {
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      };
    },
  },
  watchFolders: [path.resolve(__dirname, "../../../")],
};
