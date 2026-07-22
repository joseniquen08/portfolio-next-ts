-- Replace the single effective_date with a validity range (start_date, end_date).
-- NULL start_date means "Inicial" (unknown/unbounded start, only valid for the
-- earliest record of a card). NULL end_date means "Actual" (currently in effect).
-- Ranges are non-overlapping and contiguous per card: at most one open (end_date
-- IS NULL) record, at most one unbounded-start (start_date IS NULL) record.

alter table public.credit_limit_changes
  rename column effective_date to start_date;

alter table public.credit_limit_changes
  alter column start_date drop not null,
  alter column start_date drop default;

alter table public.credit_limit_changes
  add column end_date date;

alter table public.credit_limit_changes
  add constraint credit_limit_changes_range_order
  check (end_date is null or start_date is null or end_date > start_date);

-- Inserts a new credit-limit record for a card, maintaining non-overlapping,
-- contiguous validity ranges:
--   * First record for a card: inserted as-is (start_date may be NULL/"Inicial"),
--     end_date NULL ("Actual").
--   * Subsequent records: p_start_date is required. The existing record whose
--     range currently contains p_start_date is found and split — its end_date
--     is shrunk to p_start_date, and the new record inherits whatever that
--     record's end_date used to be (NULL if it was the open/current one, or a
--     real date if a historical range is being subdivided).
create or replace function public.add_credit_limit_change(
  p_card_id uuid,
  p_amount numeric,
  p_currency text,
  p_start_date date,
  p_note text
)
returns public.credit_limit_changes
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_containing public.credit_limit_changes;
  v_new public.credit_limit_changes;
begin
  if not exists (
    select 1 from public.credit_limit_changes
    where card_id = p_card_id and user_id = auth.uid()
  ) then
    insert into public.credit_limit_changes (card_id, amount, currency, start_date, end_date, note)
    values (p_card_id, p_amount, p_currency, p_start_date, null, p_note)
    returning * into v_new;
    return v_new;
  end if;

  if p_start_date is null then
    raise exception 'start_date is required once a card already has credit limit history';
  end if;

  select * into v_containing
  from public.credit_limit_changes
  where card_id = p_card_id and user_id = auth.uid()
    and (start_date is null or start_date <= p_start_date)
    and (end_date is null or end_date > p_start_date)
  limit 1;

  if v_containing.id is null then
    raise exception 'no existing range covers this start date';
  end if;

  update public.credit_limit_changes
  set end_date = p_start_date
  where id = v_containing.id;

  insert into public.credit_limit_changes (card_id, amount, currency, start_date, end_date, note)
  values (p_card_id, p_amount, p_currency, p_start_date, v_containing.end_date, p_note)
  returning * into v_new;

  return v_new;
end;
$$;

grant execute on function public.add_credit_limit_change(uuid, numeric, text, date, text) to authenticated;

-- Deletes a credit-limit record and re-stitches the gap by extending the
-- immediately-preceding range (the one whose end_date equals the deleted
-- record's start_date) to cover the deleted record's end_date. If the
-- deleted record was the earliest ("Inicial", start_date IS NULL), no
-- record can be extended backward and the gap is left as genuinely unknown.
create or replace function public.delete_credit_limit_change(p_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_row public.credit_limit_changes;
begin
  select * into v_row from public.credit_limit_changes
  where id = p_id and user_id = auth.uid();

  if v_row.id is null then
    raise exception 'credit limit change not found';
  end if;

  update public.credit_limit_changes
  set end_date = v_row.end_date
  where card_id = v_row.card_id and user_id = auth.uid()
    and end_date = v_row.start_date;

  delete from public.credit_limit_changes where id = p_id;
end;
$$;

grant execute on function public.delete_credit_limit_change(uuid) to authenticated;
