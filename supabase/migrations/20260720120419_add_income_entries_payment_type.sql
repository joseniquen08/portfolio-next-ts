-- Introduces "avance" vs "pago_final" as a distinct concept from the old
-- recurring/one_off income_type dropped in 20260719082025 — this is about
-- how a job gets paid (partial advances that later settle into one final
-- payment), not about recurrence.
--
-- The link is stored on the advance, not the final: an "avance" optionally
-- points forward to the "pago_final" it belongs to via linked_final_id.
-- Picking the link from the advance side (against a small, identifiable
-- list of that job's pago_final rows) avoids the ambiguity of trying to
-- pick advances out of an undifferentiated pool from the final's side when
-- a job has multiple concurrent settlement rounds.
alter table public.income_entries
  add column payment_type text not null default 'pago_final',
  add column linked_final_id uuid references public.income_entries(id) on delete set null;

alter table public.income_entries
  add constraint income_entries_payment_type_check
    check (payment_type = any (array['avance', 'pago_final']));

-- Only an "avance" can carry a link; a "pago_final" can't point to another final.
alter table public.income_entries
  add constraint income_entries_linked_final_only_on_avance_chk
    check (payment_type = 'avance' or linked_final_id is null);

alter table public.income_entries
  alter column payment_type drop default;
