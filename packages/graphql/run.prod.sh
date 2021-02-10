#!/bin/bash

. ../../scripts/loadenv.sh

postgraphile \
  --subscriptions \
  --retry-on-init-fail \
  --dynamic-json \
  --no-setof-functions-contain-nulls \
  --no-ignore-rbac \
  --no-ignore-indexes \
  --extended-errors errcode \
  --append-plugins @graphile-contrib/pg-simplify-inflector \
  --disable-graphiql \
  --enable-query-batching \
  --disable-query-log \ # our default logging has performance issues, but do make sure you have a logging system in place!
  --legacy-relations omit \
  --connection $DATABASE_URL \
  --schema public
