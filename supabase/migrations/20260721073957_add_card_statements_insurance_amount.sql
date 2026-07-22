alter table public.card_statements
  add column insurance_amount numeric(12,2) not null default 0,
  add constraint card_statements_insurance_nonneg check (insurance_amount >= 0);
