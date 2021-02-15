ALTER TABLE app_public.users enable ROW level SECURITY;

CREATE POLICY select_users ON app_public.users FOR SELECT USING (TRUE);

CREATE POLICY insert_users ON app_public.users FOR INSERT WITH CHECK (id = app_public.current_user_id ());

CREATE POLICY update_users ON app_public.users FOR UPDATE USING (id = app_public.current_user_id ());

CREATE POLICY delete_users ON app_public.users FOR DELETE USING (id = app_public.current_user_id ());

GRANT SELECT ON app_public.users TO authenticated_user;

GRANT INSERT (username) ON app_public.users TO authenticated_user;

GRANT UPDATE (username) ON app_public.users TO authenticated_user;

GRANT DELETE ON app_public.users TO authenticated_user;

