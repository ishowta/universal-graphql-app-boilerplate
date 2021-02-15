CREATE TABLE app_public.users (
    id text PRIMARY KEY DEFAULT app_public.current_user_id (),
    username text NOT NULL CHECK (length(username) >= 1 AND length(username) <= 24) DEFAULT app_public.current_user_username (),
    created_at timestamp NOT NULL DEFAULT now()
);

