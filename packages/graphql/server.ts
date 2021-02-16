require("dotenv-flow").config({
  path: "../../",
});

import createFastify from "fastify";
import middie from "middie";
import { postgraphile } from "./postgraphile";
import cors from "fastify-cors";

(async () => {
  const fastify = createFastify({
    logger: true,
    disableRequestLogging: true,
  });

  await fastify.register(cors, {
    origin: (origin, cb) => {
      if (
        ["development", "test"].includes(process.env.NODE_ENV!) ||
        origin === process.env.APP_URL
      ) {
        cb(null, true);
        return;
      }
      cb(new Error("Not allowed"), false);
    },
  });

  await fastify.register(middie);

  fastify.use(postgraphile(fastify));

  fastify.listen(5000, (err, address) => {
    if (err) {
      fastify.log.error(err.message);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
  });
})().catch((e) => console.error(e));
