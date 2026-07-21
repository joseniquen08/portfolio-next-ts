create table public.credit_limit_changes (
  id uuid default gen_random_uuid() not null,
  user_id uuid default auth.uid() not null,
  card_id uuid not null,
  amount numeric(12,2) not null,
  currency text not null,
  effective_date date not null default current_date,
  note text,
  created_at timestamptz default now() not null,
  constraint credit_limit_changes_pkey primary key (id),
  constraint credit_limit_changes_card_id_fkey
    foreign key (card_id) references public.credit_cards(id) on delete cascade,
  constraint credit_limit_changes_user_id_fkey
    foreign key (user_id) references auth.users(id) on delete cascade,
  constraint credit_limit_changes_amount_positive check (amount > 0),
  constraint credit_limit_changes_currency_check
    check (currency = any (array['PEN','USD','EUR','GBP']))
);

alter table public.credit_limit_changes enable row level security;

create policy "Solo propietario" on public.credit_limit_changes
  using ((auth.uid() = user_id)) with check ((auth.uid() = user_id));

grant select, insert, update, delete on public.credit_limit_changes to authenticated;

create index credit_limit_changes_card_id_idx
  on public.credit_limit_changes using btree (card_id);
