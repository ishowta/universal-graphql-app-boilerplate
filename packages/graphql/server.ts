// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
require("dotenv-flow").config({
  path: "../../",
});

import createFastify from "fastify";
import cors from "fastify-cors";
import middie from "middie";
import { postgraphile } from "./postgraphile";

(async (): Promise<void> => {
  const fastify = createFastify({
    disableRequestLogging: true,
    logger: true,
  });

  await fastify.register(cors, {
    origin: (origin, callback) => {
      if (process.env.NODE_ENV == null) throw new Error("NODE_ENV not setted");
      if (
        ["development", "test"].includes(process.env.NODE_ENV) ||
        origin === process.env.APP_URL
      ) {
        callback(null, true);

        return;
      }
      callback(new Error("Not allowed"), false);
    },
  });

  await fastify.register(middie);

  await fastify.use(postgraphile(fastify));

  fastify.listen(5_000, (error, address) => {
    // TODO: what
    if ((error as Error | null) == null) {
      fastify.log.error(error.message);
      throw new Error(error.message);
    }
    fastify.log.info(`server listening on ${address}`);
  });
})().catch(() => {
  return undefined;
});
