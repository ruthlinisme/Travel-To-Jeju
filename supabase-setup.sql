-- Jeju Girls Trip v8 - Supabase setup
-- Supabase Dashboard → SQL Editor → New query → 貼上整段並執行。

create table if not exists public.shared_items (
  id text primary key,
  section text not null check (section in ('itinerary','spots','food','shopping','advances','info')),
  trip_date date null,
  sort_order integer not null default 0,
  payload jsonb not null default '{}'::jsonb,
  updated_by uuid null references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create index if not exists shared_items_section_idx on public.shared_items(section);
create index if not exists shared_items_trip_date_idx on public.shared_items(trip_date);

alter table public.shared_items enable row level security;

drop policy if exists "authenticated can read shared trip" on public.shared_items;
drop policy if exists "authenticated can insert shared trip" on public.shared_items;
drop policy if exists "authenticated can update shared trip" on public.shared_items;
drop policy if exists "authenticated can delete shared trip" on public.shared_items;

create policy "authenticated can read shared trip"
on public.shared_items for select
to authenticated
using (true);

create policy "authenticated can insert shared trip"
on public.shared_items for insert
to authenticated
with check ((select auth.uid()) is not null);

create policy "authenticated can update shared trip"
on public.shared_items for update
to authenticated
using ((select auth.uid()) is not null)
with check ((select auth.uid()) is not null);

create policy "authenticated can delete shared trip"
on public.shared_items for delete
to authenticated
using ((select auth.uid()) is not null);

grant select, insert, update, delete on public.shared_items to authenticated;

do $$
begin
  alter publication supabase_realtime add table public.shared_items;
exception
  when duplicate_object then null;
end $$;


-- v13 migration：讓既有 shared_items 支援 shopping
do $$
declare
  c record;
begin
  for c in
    select conname
    from pg_constraint
    where conrelid = 'public.shared_items'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) like '%section%'
  loop
    execute format('alter table public.shared_items drop constraint %I', c.conname);
  end loop;

  alter table public.shared_items
    add constraint shared_items_section_check
    check (section in ('itinerary','spots','food','shopping','advances','info'));
exception
  when duplicate_object then null;
end $$;
