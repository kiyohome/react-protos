create table groups (
  id serial primary key,
  name text unique
);

create table members (
  group_id bigint references groups,
  user_id uuid references auth.users
);

alter table groups enable row level security;

create policy groups_update_members
  on groups for update using (
    auth.uid() in (
      select user_id from members where group_id = id
    )
  );

create policy groups_delete_members
  on groups for delete using (
    auth.uid() in (
      select user_id from members where group_id = id
    )
  );
