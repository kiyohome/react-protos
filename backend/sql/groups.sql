drop trigger if exists on_group_created on groups;
drop function if exists handle_new_group;
drop policy if exists members_all_same_group_members on members;
drop function if exists is_same_group_members;
drop policy if exists groups_delete_same_group_members on groups;
drop policy if exists groups_update_same_group_members on groups;
drop policy if exists groups_insert_authenticated on groups;
drop policy if exists groups_select_authenticated on groups;
drop table if exists members;
drop table if exists groups;

create table groups (
  id serial primary key,
  name text unique not null,
  owner uuid references profiles not null
);

create table members (
  group_id integer references groups,
  user_id uuid references profiles,
  primary key (group_id, user_id)
);

alter table groups enable row level security;

/*
グループ
SELECT：ログインユーザーのみ
INSERT：ログインユーザーのみ
UPDATE：同じグループのメンバーのみ
DELETE：グループのオーナーのみ
*/

create policy groups_select_authenticated
  on groups
  for select
  to authenticated
  using (true);

create policy groups_insert_authenticated
  on groups
  for insert
  to authenticated
  with check (true);

create policy groups_update_same_group_members
  on groups
  for update
  using (
    auth.uid() in (
      select user_id from members where group_id = id
    )
  );

create policy groups_delete_same_group_members
  on groups
  for delete
  using (auth.uid() = owner);

alter table members enable row level security;

/*
メンバー
SELECT：同じグループのメンバーのみ
INSERT：同じグループのメンバーのみ
UPDATE：同じグループのメンバーのみ
DELETE：同じグループのメンバーのみ
*/

create function is_same_group_members (_user_id uuid, _group_id bigint)
returns bool
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from members m
    where m.user_id = _user_id
    and m.group_id = _group_id
  );
$$;

create policy members_all_same_group_members
  on members
  for all
  using (
    is_same_group_members(auth.uid(), group_id)
  )
  with check (
    is_same_group_members(auth.uid(), group_id)
  );

create function handle_new_group ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into members (group_id, user_id)
  values (new.id, auth.uid());
  return new;
end;
$$;

create trigger on_group_created
  after insert
  on groups
  for each row execute procedure handle_new_group();
