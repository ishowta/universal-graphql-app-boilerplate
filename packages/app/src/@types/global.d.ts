declare namespace NodeJS {
  type ProcessEnvironment = {
    readonly NODE_ENV: "development" | "production" | "test";
  };
}
