import { postgraphile as createPostgraphile } from "postgraphile";
import dotenv from "dotenv-flow";
import admin from "firebase-admin";
import { FastifyInstance } from "fastify";
import { record } from "@app/utils/src/common";

const IS_PROD = process.env.NODE_ENV === "production";
const IS_DEV = process.env.NODE_ENV === "development";
const IS_TEST = process.env.NODE_ENV === "test";

admin.initializeApp({
  credential: admin.credential.cert(
    require(process.env.FIREBASE_CREDENTIALS_PATH!)
  ),
});

export const postgraphile = (fastify: FastifyInstance) =>
  createPostgraphile(process.env.DATABASE_URL, ["app_public"], {
    subscriptions: true,
    watchPg: IS_DEV,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    showErrorStack: IS_PROD ? undefined : "json",
    extendedErrors: IS_PROD ? ["errcode"] : ["hint", "detail", "errcode"],
    appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
    exportGqlSchemaPath: IS_PROD ? undefined : "schema.graphql",
    graphiql: !IS_PROD,
    enhanceGraphiql: !IS_PROD,
    allowExplain: !IS_PROD,
    enableQueryBatching: true,
    disableQueryLog: IS_PROD, // our default logging has performance issues, but do make sure you have a logging system in place!
    legacyRelations: "omit",
    enableCors: true,
    pgSettings: async (req) => {
      const generateJWTClaims = async () => {
        //? https://www.graphile.org/postgraphile/postgresql-schema-design/#json-web-tokens
        const rawToken = req.headers.authorization?.split("Bearer ")[1];
        if (rawToken == null) {
          fastify.log.warn(
            "JWT token not setted to header. See https://www.graphile.org/postgraphile/security/#sending-jwts-to-the-server"
          );
          return {};
        }
        try {
          const token = await admin.auth().verifyIdToken(rawToken);
          // TODO: Expand nested claims
          const prefixedToken = record(
            Object.entries(token)
              .filter(([key, value]) => typeof value === "string")
              .map(([key, value]) => [`jwt.claims.${key}`, value])
          );
          prefixedToken["jwt.claims.role"] = "authenticated_user";
          return prefixedToken;
        } catch (err) {
          fastify.log.warn("Detect invalid JWT token!");
          return {};
        }
      };
      const jwtClaims = await generateJWTClaims();
      return {
        role: jwtClaims["jwt.claims.role"] ?? "anonymous",
        ...jwtClaims,
      };
    },
  });
