-- The recurring/one_off distinction (and its `period` column) was dropped
-- at the user's request: the app never auto-generates recurring entries,
-- so the concept only added friction. Every income entry now just has a
-- single required entry_date.
alter table public.income_entries drop constraint income_entries_type_dates_chk;
alter table public.income_entries alter column entry_date set not null;
alter table public.income_entries drop column income_type;
alter table public.income_entries drop column period;
