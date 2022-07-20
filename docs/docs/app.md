---
sidebar_position: 4
---

# アプリ

プロジェクトを動作確認するために作成したアプリのスペックです。

## スペック

イベントを作成し参加者を募集するアプリです。

- 誰でもサインアップしてユーザーになれます。
- イベントの作成者しかイベントを操作できないと困るのでイベントはグループで管理します。
- イベントの作成や変更を行うには、グループを新しく作るか、既にあるグループのオーナーに連絡してグループのメンバーに追加してもらう必要があります。
- 誰でもグループを作成し、作成した人がオーナーになります。
- あるグループのメンバーが作成したイベントは同じグループのメンバーであれば誰でも操作できます。
- オーナーだけがグループの変更やメンバーの変更を行えます。

## 出来ているもの

- サインイン、サインアップ、サインアウト
- グループのCRUD

## これから

- イベントのCRUD
- イベントへの参加

## データモデル

[Entity Relationship Diagrams](https://mermaid-js.github.io/mermaid/#/entityRelationshipDiagram?id=entity-relationship-diagrams)

```mermaid
erDiagram

  users ||--|| profiles: ""
  profiles ||--o{ members: ""
  groups ||--o{ members: ""
  groups ||--o{ events: ""
  events ||--o{ event_schedules: ""

  users {
    id uuid PK
    email varchar
  }

  profiles {
    id uuid PK
    nickname text
    avator_url text
  }

  members {
    group_id integer PK
    user_id uuid PK
  }

  groups {
    id serial PK
    name text
  }

  events {
    id serial PK
    name text
    group_id integer
  }

  event_schedules {
    id serial PK
    event_id integer
    start_date timestamptz
    end_date timestamptz
  }
```

## 認可ルール

### profiles

|操作|できる人|
|---|---|
|SELECT|サインイン済みユーザーのみ|
|INSERT|誰でも（＝サインアップ）|
|UPDATE|自分のみ|
|DELETE|自分のみ|

### groups

|操作|できる人|
|---|---|
|SELECT|サインイン済みユーザーのみ|
|INSERT|サインイン済みユーザーのみ|
|UPDATE|オーナーのみ|
|DELETE|オーナーのみ|

### members

|操作|できる人|
|---|---|
|SELECT|同じグループのメンバーのみ|
|INSERT|オーナーのみ|
|UPDATE|いない|
|DELETE|オーナーのみ|

### events、event_schedules

|操作|できる人|
|---|---|
|SELECT|同じグループのメンバーのみ|
|INSERT|同じグループのメンバーのみ|
|UPDATE|同じグループのメンバーのみ|
|DELETE|同じグループのメンバーのみ|
