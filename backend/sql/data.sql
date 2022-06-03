insert into groups (name) values ('会津若松');
insert into groups (name) values ('喜多方');
insert into groups (name) values ('湊');

insert into members (group_id, user_id) values (1, 'KIユーザー');
insert into members (group_id, user_id)  values (1, 'CKユーザー');
insert into members (group_id, user_id)  values (2, 'Aユーザー');
insert into members (group_id, user_id)  values (3, 'CKユーザー');

insert into events (name, group_id) values ('さくらまつり', 1);
insert into events (name, group_id) values ('会津祭り', 1);
insert into events (name, group_id) values ('鶴ヶ城マラソン', 1);
insert into events (name, group_id) values ('恋人坂祭り', 2);
insert into events (name, group_id) values ('ラーメン祭り', 2);
insert into events (name, group_id) values ('白鳥祭り', 3);

insert into event_schedules (event_id, start_date, end_date) values (1, '2022/04/03 13:00:00+09:00', '2022/04/03 19:00:00+09:00');
insert into event_schedules (event_id, start_date, end_date) values (1, '2022/04/04 13:00:00+09:00', '2022/04/04 18:00:00+09:00');
insert into event_schedules (event_id, start_date, end_date) values (2, '2022/09/22 13:00:00+09:00', '2022/09/22 19:00:00+09:00');
insert into event_schedules (event_id, start_date, end_date) values (2, '2022/09/23 13:00:00+09:00', '2022/09/23 20:00:00+09:00');
insert into event_schedules (event_id, start_date, end_date) values (2, '2022/09/24 13:00:00+09:00', '2022/09/24 21:00:00+09:00');
insert into event_schedules (event_id, start_date, end_date) values (3, '2022/10/05 08:45:00+09:00', '2022/10/05 13:30:00+09:00');
insert into event_schedules (event_id, start_date, end_date) values (4, '2022/09/21 17:00:00+09:00', '2022/09/21 22:00:00+09:00');
insert into event_schedules (event_id, start_date, end_date) values (5, '2022/11/13 11:00:00+09:00', '2022/11/13 19:00:00+09:00');
insert into event_schedules (event_id, start_date, end_date) values (5, '2022/11/14 11:00:00+09:00', '2022/11/14 21:00:00+09:00');
insert into event_schedules (event_id, start_date, end_date) values (5, '2022/11/15 11:00:00+09:00', '2022/11/15 18:00:00+09:00');
insert into event_schedules (event_id, start_date, end_date) values (6, '2022/02/14 10:00:00+09:00', '2022/02/14 14:00:00+09:00');
