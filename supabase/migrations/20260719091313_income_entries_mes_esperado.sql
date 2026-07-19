-- `entry_date` conflated the grouping-anchor and exact-day roles. Replace it
-- with `mes_esperado` (month-only anchor, "YYYY-MM") for grouping; the exact
-- due day and paid day are already covered by the existing `expected_date`
-- and `paid_date` columns. Backfill categorically from `entry_date` so every
-- existing row stays in the same visible month bucket (no reshuffling of
-- historical financial data).
alter table public.income_entries
  add column mes_esperado text
    check (mes_esperado ~ '^\d{4}-(0[1-9]|1[0-2])$');

update public.income_entries
  set mes_esperado = to_char(entry_date, 'YYYY-MM');

alter table public.income_entries
  alter column mes_esperado set not null;

alter table public.income_entries
  drop column entry_date;
