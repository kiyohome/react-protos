---
sidebar_position: 5
description: アプリのルーティングを案内します。
---

# ルーティング

一覧ページや詳細ページはリンクの共有やブックマークできるようにパスを設けます。
操作を行うモーダルは利用目的がないため基本的にパスを設けません。
例外的にサインインとサインアップのみリンクを共有するケースがあるためパスを設けます。
一覧ページは「対象の名前」、詳細ページは「対象の名前/ID」をパスとします。

```bash
# イベント一覧
http://localhost:3000/events

# イベント詳細
http://localhost:3000/events/1

# サインイン
http://localhost:3000/signin
```

ルーティングには[React Router](https://reactrouter.com/)を使います。
ルーティングを変えたい場合は[RouterConfig](https://github.com/kiyohome/react-protos/blob/main/src/RouterConfig.tsx)を変更します。

```jsx
<Route path="/" element={<AppLayout />}>
  <Route index element={<WelcomePage />} />
  <Route path="signup" element={<SignUpPage />} />
  <Route path="signin" element={<SignInPage />} />
  <Route path="*" element={<PageNotFoundPage />} />
</Route>
```

サインインが必要なページは[AccessControl](https://github.com/kiyohome/react-protos/blob/main/src/pages/AccessControl.tsx)で囲みます。

```jsx
<Route
  path="groups"
  element={
    <AccessControl>
      <GroupsPage />
    </AccessControl>
  }
/>
```
