-- income_entries was created by pasting raw DDL into the SQL Editor, which
-- (unlike creating a table through the Table Editor UI) does not auto-grant
-- table privileges to `authenticated` — it only kept the default
-- REFERENCES/TRIGGER/TRUNCATE grants. Every other table in this schema has
-- SELECT/INSERT/UPDATE/DELETE granted to `authenticated`; this brings
-- income_entries in line so the app (which relies on RLS, not GRANTs, for
-- row-level authorization) can actually read/write it.
grant select, insert, update, delete on public.income_entries to authenticated;
