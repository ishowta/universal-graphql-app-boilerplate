/*
Most of this setup based on graphile-starter (https://github.com/graphile/starter/blob/main/%40app/db/migrations/committed/000001.sql)
 */
-- Clear
DROP owned BY postgraphile CASCADE;

DROP owned BY anonymous CASCADE;

DROP owned BY authenticated_user CASCADE;

-- Setup logger
SET client_min_messages TO WARNING;

-- Setup extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Setup role
DROP ROLE IF EXISTS anonymous;

CREATE ROLE anonymous;

DROP ROLE IF EXISTS authenticated_user;

CREATE ROLE authenticated_user;

GRANT anonymous TO postgraphile;

GRANT authenticated_user TO postgraphile;

-- Setup schema used by app
CREATE SCHEMA app_public;

CREATE SCHEMA app_hidden;

CREATE SCHEMA app_private;

-- grant access only authenticated user
REVOKE ALL ON SCHEMA public FROM public;

ALTER DEFAULT privileges REVOKE ALL ON sequences FROM public;

ALTER DEFAULT privileges REVOKE ALL ON functions FROM public;

GRANT ALL ON SCHEMA public TO postgraphile;

GRANT usage ON SCHEMA public, app_public, app_hidden TO authenticated_user;

ALTER DEFAULT privileges IN SCHEMA public, app_public, app_hidden GRANT usage,
SELECT
    ON sequences TO authenticated_user;

ALTER DEFAULT privileges IN SCHEMA public, app_public, app_hidden GRANT EXECUTE ON functions TO authenticated_user;

-- Utils
CREATE OR REPLACE FUNCTION app_public.current_user_id ()
    RETURNS text
    AS $$
    SELECT
        current_setting('jwt.claims.uid', TRUE);

$$
LANGUAGE sql
STABLE
SECURITY DEFINER;

CREATE OR REPLACE FUNCTION app_public.current_user_username ()
    RETURNS text
    AS $$
    SELECT
        current_setting('jwt.claims.name', TRUE);

$$
LANGUAGE sql
STABLE
SECURITY DEFINER;

