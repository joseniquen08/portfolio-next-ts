alter table public.credit_cards
  add constraint payment_day_range
  check (
    (default_payment_day is null)
    or (default_payment_day >= 1 and default_payment_day <= 31)
  );
