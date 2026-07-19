-- Dropped at the user's request: the "one recurring entry per job per
-- period" guard turned out to be unwanted friction, not a useful safety
-- net — a job can now have multiple income entries in the same period.
drop index if exists public.income_entries_recurring_period_uq;
