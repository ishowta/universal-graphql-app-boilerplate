#!/bin/bash

cd docker-entrypoint-initdb.d

psql -U postgres -d postgres -f ./setup.pgsql
psql -U postgres -d postgres -f ./schema.pgsql
psql -U postgres -d postgres -f ./controllers/*.pgsql
psql -U postgres -d postgres -f ./seeds.pgsql
