module.exports = {
  plugins: [
    "relay",
    [
      "module:react-native-dotenv",
      {
        allowUndefined: false,
        blacklist: null,
        moduleName: "@env",
        path: "../../../.env",
        safe: true,
        whitelist: null,
      },
    ],
  ],
  presets: ["module:metro-react-native-babel-preset"],
};
