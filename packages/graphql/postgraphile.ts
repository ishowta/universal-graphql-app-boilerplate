import { postgraphile as createPostgraphile } from "postgraphile";
import admin from "firebase-admin";
import { FastifyInstance } from "fastify";
import { record } from "@app/utils/src/common";

const IS_PROD = process.env.NODE_ENV === "production";
const IS_DEV = process.env.NODE_ENV === "development";
const _IS_TEST = process.env.NODE_ENV === "test";

if (!process.env.FIREBASE_CREDENTIALS_PATH) {
  throw new Error("`process.env.FIREBASE_CREDENTIALS_PATH` was not setted!");
}
admin.initializeApp({
  credential: admin.credential.cert(
    // eslint-disable-next-line import/no-dynamic-require
    require(process.env.FIREBASE_CREDENTIALS_PATH)
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
        // ? https://www.graphile.org/postgraphile/postgresql-schema-design/#json-web-tokens
        const rawToken = req.headers.authorization?.split("Bearer ")[1];
        if (rawToken == null) {
          fastify.log.warn(
            "JWT token not setted to header. See https://www.graphile.org/postgraphile/security/#sending-jwts-to-the-server"
          );
          return {};
        }
        try {
          const token = await admin.auth().verifyIdToken(rawToken);
          const recordToPrefixedStrings = (
            rec: Record<string, unknown>,
            prefix: string
          ): [string, string][] => [
            ...(Object.entries(rec)
              .filter(([_, value]) => typeof value === "string")
              .map(([key, value]) => [`${prefix}.${key}`, value]) as [
              string,
              string
            ][]),
            ...Object.entries(rec)
              .filter(
                ([_, value]) => value != null && typeof value === "object"
              )
              .flatMap(([key, value]) =>
                recordToPrefixedStrings(
                  value as Record<string, unknown>,
                  `${prefix}.${key}`
                )
              ),
          ];
          const prefixedToken = record(
            recordToPrefixedStrings(token, "jwt.claims")
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
