import { record } from "@app/utils/src/common";
import type { FastifyInstance } from "fastify";
import admin from "firebase-admin";
import { postgraphile as createPostgraphile } from "postgraphile";

const IS_PROD = process.env.NODE_ENV === "production";
const IS_DEV = process.env.NODE_ENV === "development";
// const IS_TEST = process.env.NODE_ENV === "test";

if (process.env.FIREBASE_CREDENTIALS_PATH == null) {
  throw new Error("`process.env.FIREBASE_CREDENTIALS_PATH` was not setted!");
}
admin.initializeApp({
  credential: admin.credential.cert(
    require(process.env.FIREBASE_CREDENTIALS_PATH!)
  ),
});

export const postgraphile = (
  fastify: FastifyInstance
): ReturnType<typeof createPostgraphile> => {
  return createPostgraphile(process.env.DATABASE_URL, ["app_public"], {
    allowExplain: !IS_PROD,
    appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
    disableQueryLog: IS_PROD,
    dynamicJson: true,
    enableCors: true,
    enableQueryBatching: true,
    enhanceGraphiql: !IS_PROD,
    exportGqlSchemaPath: IS_PROD ? undefined : "schema.graphql",
    extendedErrors: IS_PROD ? ["errcode"] : ["hint", "detail", "errcode"],
    graphiql: !IS_PROD,
    ignoreIndexes: false,
    ignoreRBAC: false,
    // our default logging has performance issues, but do make sure you have a logging system in place!
    legacyRelations: "omit",

    pgSettings: async (request) => {
      const generateJWTClaims = async (): Promise<
        Record<string, string | null>
      > => {
        // ? https://www.graphile.org/postgraphile/postgresql-schema-design/#json-web-tokens
        const rawToken = request.headers.authorization?.split("Bearer ")[1];
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
          ): Array<[string, string]> => {
            return [
              ...(Object.entries(rec)
                .filter(([_, value]) => {
                  return typeof value === "string";
                })
                .map(([key, value]) => {
                  return [`${prefix}.${key}`, value];
                }) as Array<[string, string]>),
              ...Object.entries(rec)
                .filter(([_, value]) => {
                  return value != null && typeof value === "object";
                })
                .flatMap(([key, value]) => {
                  return recordToPrefixedStrings(
                    value as Record<string, unknown>,
                    `${prefix}.${key}`
                  );
                }),
            ];
          };
          const prefixedToken = record(
            recordToPrefixedStrings(token, "jwt.claims")
          );
          prefixedToken["jwt.claims.role"] = "authenticated_user";

          return prefixedToken;
        } catch {
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

    setofFunctionsContainNulls: false,

    showErrorStack: IS_PROD ? undefined : "json",

    subscriptions: true,
    watchPg: IS_DEV,
  });
};
