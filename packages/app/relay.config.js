module.exports = {
  customScalars: {
    UUID: "String",
  },

  // artifactDirectory: "./src/__generated__", //? https://github.com/facebook/relay/issues/3272
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],

  extensions: ["ts", "tsx"],

  language: "typescript",

  schema: "../graphql/schema.graphql",
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: "./src",
};
