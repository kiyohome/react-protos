create table public.profiles (
  id uuid references auth.users not null primary key,
  nickname text unique,
  avatar_url text
);

alter table public.profiles enable row level security;

create policy profiles_select_everyone
  on public.profiles for select using (true);

create policy profiles_insert_own
  on public.profiles for insert with check (auth.uid() = id);

create policy profiles_update_own
  on public.profiles for update using (auth.uid() = id);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, new.raw_user_meta_data->>'nickname');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
