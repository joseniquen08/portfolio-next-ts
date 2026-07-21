create or replace function public.reorder_credit_cards(ordered_ids uuid[])
returns void
language sql
security invoker
set search_path = public
as $$
  update public.credit_cards as c
  set sort_order = r.idx - 1
  from unnest(ordered_ids) with ordinality as r(id, idx)
  where c.id = r.id and c.user_id = auth.uid();
$$;

grant execute on function public.reorder_credit_cards(uuid[]) to authenticated;
