drop trigger if exists on_auth_user_created on auth.users;
drop function if exists handle_new_user;
drop policy if exists profiles_delete_myself on profiles;
drop policy if exists profiles_update_myself on profiles;
drop policy if exists profiles_select_authenticated on profiles;
drop table if exists profiles;

create table profiles (
  id uuid references auth.users primary key,
  nickname text unique not null,
  avatar_url text
);

alter table profiles enable row level security;

/*
プロファイル
SELECT：ログインユーザーのみ
INSERT：許可なし（トリガーのみ）
UPDATE：自分のみ
DELETE：自分のみ
*/

create policy profiles_select_authenticated
  on profiles
  for select
  to authenticated
  using (true);

create policy profiles_update_myself
  on profiles
  for update
  using (auth.uid() = id);

create policy profiles_delete_myself
  on profiles
  for delete
  using (auth.uid() = id);

create function handle_new_user ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, nickname)
  values (new.id, new.raw_user_meta_data->>'nickname');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert
  on auth.users
  for each row execute procedure handle_new_user();
