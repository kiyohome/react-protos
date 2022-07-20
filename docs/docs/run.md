---
sidebar_position: 3
---

# 動かすまで

アプリを動かすまでの手順です。

1. [Supabase](https://supabase.com/docs/)でプロジェクトを作ります。
1. git cloneしたプロジェクトのルート直下に.envファイルを作成して環境変数を設定します。
  ```
  VITE_SUPABASE_URL=Supabaseで作ったプロジェクトのURL
  VITE_SUPABASE_ENDPOINT=Supabaseで作ったプロジェクトのGraphQLのURL
  VITE_SUPABASE_ANON_KEY=Supabaseで作ったプロジェクトのAPIキー（anonキー）
  VITE_SUPABASE_PERSIST_SESSION=no
  ```
1. Supabaseのダッシュボードから次のSQLを実行してテーブルやポリシー等を作成します。
    - [SQLでlikeを使えるようにSupabaseをカスタマイズ](./backend/sql/like_operation.sql)
    - [アプリのDDL](./backend/sql/all.sql)
1. 次のコマンドでアプリを起動します。
  ```
  $ yarn
  $ yarn dev
  ```
