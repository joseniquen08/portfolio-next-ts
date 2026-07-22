create table public.statement_advances (
  id uuid default gen_random_uuid() not null,
  user_id uuid default auth.uid() not null,
  statement_id uuid not null,
  amount numeric(12,2) not null,
  currency text not null,
  advance_date date not null default current_date,
  note text,
  created_at timestamptz default now() not null,
  constraint statement_advances_pkey primary key (id),
  constraint statement_advances_statement_id_fkey
    foreign key (statement_id) references public.card_statements(id) on delete cascade,
  constraint statement_advances_user_id_fkey
    foreign key (user_id) references auth.users(id) on delete cascade,
  constraint statement_advances_amount_positive check (amount > 0),
  constraint statement_advances_currency_check
    check (currency = any (array['PEN','USD','EUR','GBP']))
);

alter table public.statement_advances enable row level security;

create policy "Solo propietario" on public.statement_advances
  using ((auth.uid() = user_id)) with check ((auth.uid() = user_id));

grant select, insert, update, delete on public.statement_advances to authenticated;

create index statement_advances_statement_id_idx
  on public.statement_advances using btree (statement_id);
