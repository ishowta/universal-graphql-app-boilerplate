// For

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "relay",
    [
      "module:react-native-dotenv",
      {
        moduleName: "react-native-dotenv",
        path: "./.env"
        blacklist: null,
        whitelist: null
        safe: true,
        allowUndefined: false
      },
    ],
  ],
};
