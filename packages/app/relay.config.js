module.exports = {
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: "./src",
  schema: "../graphql/schema.graphql",
  customScalars: {
    UUID: "String",
  },
  language: "typescript",
  //artifactDirectory: "./src/__generated__", //? https://github.com/facebook/relay/issues/3272
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
  extensions: ["ts", "tsx"],
};
