create table profiles (
  id uuid references auth.users primary key,
  nickname text unique,
  avatar_url text
);

alter table profiles enable row level security;

create policy profiles_select_everyone
  on profiles for select using (true);

create policy profiles_update_own
  on profiles for update using (auth.uid() = id);

create policy profiles_delete_own
  on profiles for delete using (auth.uid() = id);

create function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into profiles (id, nickname)
  values (new.id, new.raw_user_meta_data->>'nickname');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
