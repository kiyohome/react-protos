drop policy if exists event_schedules_all_same_group_members on event_schedules;
drop policy if exists events_delete_same_group_members on events;
drop policy if exists events_update_same_group_members on events;
drop policy if exists events_insert_authenticated on events;
drop policy if exists events_select_same_group_members on events;
drop table if exists event_schedules;
drop table if exists events;

create table events (
  id serial primary key,
  name text unique not null,
  group_id bigint references groups
);

create table event_schedules (
  id serial primary key,
  event_id bigint references events,
  start_date timestamptz not null,
  end_date timestamptz not null
);

alter table events enable row level security;

/*
イベント
SELECT：同じグループのメンバーのみ
INSERT：ログインユーザーのみ
UPDATE：同じグループのメンバーのみ
DELETE：同じグループのメンバーのみ
*/

create policy events_select_same_group_members
  on events
  for select
  using (
    group_id in (
      select m.group_id from members m where m.user_id = auth.uid()
    )
  );

create policy events_insert_authenticated
  on events
  for insert
  to authenticated;

create policy events_update_same_group_members
  on events
  for update
  using (
    group_id in (
      select m.group_id from members m where m.user_id = auth.uid()
    )
  );

create policy events_delete_same_group_members
  on events
  for delete
  using (
    group_id in (
      select m.group_id from members m where m.user_id = auth.uid()
    )
  );

alter table event_schedules enable row level security;

/*
イベント予定
SELECT：同じグループのメンバーのみ
INSERT：同じグループのメンバーのみ
UPDATE：同じグループのメンバーのみ
DELETE：同じグループのメンバーのみ
*/

create policy event_schedules_all_same_group_members
  on event_schedules
  for all
  using (
    (select e.group_id from events e where e.id = event_id)
    in
    (select m.group_id from members m where m.user_id = auth.uid())
  )
  with check (
    (select e.group_id from events e where e.id = event_id)
    in
    (select m.group_id from members m where m.user_id = auth.uid())
  );
