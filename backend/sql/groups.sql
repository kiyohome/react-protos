drop policy if exists members_all_same_group_members on members;
drop function if exists is_same_group_members
drop policy if exists groups_delete_same_group_members on groups;
drop policy if exists groups_update_same_group_members on groups;
drop policy if exists groups_insert_authenticated on groups;
drop policy if exists groups_select_same_group_members on groups;
drop table if exists members;
drop table if exists groups;

create table groups (
  id serial primary key,
  name text unique not null
);

create table members (
  group_id bigint references groups,
  user_id uuid references auth.users,
  primary key (group_id, user_id)
);

alter table groups enable row level security;

/*
グループ
SELECT：同じグループのメンバーのみ
INSERT：ログインユーザーのみ
UPDATE：同じグループのメンバーのみ
DELETE：同じグループのメンバーのみ
*/

create policy groups_select_same_group_members
  on groups
  for select
  using (
    auth.uid() in (
      select user_id from members where group_id = id
    )
  );

create policy groups_insert_authenticated
  on groups
  for insert
  to authenticated;

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
  using (
    auth.uid() in (
      select user_id from members where group_id = id
    )
  );

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
