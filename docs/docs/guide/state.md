---
sidebar_position: 6
description: アプリのステート管理を案内します。
---

# ステート管理

## アプリケーションステート

アプリ全体に渡って保持するステートです。
アプリケーションステートの仕組みとして[AppStateフック](https://github.com/kiyohome/react-protos/blob/main/src/hooks/AppState.ts)を用意しています。

```jsx
// 引数はキーと初期値。戻り値は[値, セッター]
const useUser = () => useAppState('user', new User(...));
```

今回のアプリではサインイン済みのユーザーをアプリケーションステートとして保持して、どの機能からでもユーザーステートにアクセスできるようにします。
ユーザーステートへのアクセスには[Userフック](https://github.com/kiyohome/react-protos/blob/main/src/hooks/User.ts)を使います。

```jsx
const [user, setUser] = useUser();

// ユーザーの設定
setUser(new User(...));

// ユーザーの参照
user.id
user.name
user.avatarUrl
```

## サーバーステート

API呼び出しで取得したアプリデータのステートです。
サーバーステートには[React Query](https://react-query.tanstack.com/)を使います。

APIにはGraphQLを使い、React Queryを使ったAPI呼び出しのコードは自動生成します。
そのため、アプリ実装ではReact QueryのuseQueryやuseMutationを直接呼び出すことはありません。
データ更新後はQueryClient.invalidateQueriesを呼び出しキャッシュを更新します。

```jsx
// データ取得
const [user] = useUser();
const graphQLClient = useGraphQLClient();
const { data: findGroupsQuery } = useFindGroupsQuery(graphQLClient, {
  userId: user.id,
});

// データ更新
const graphQLClient = useGraphQLClient();
const changeGroupMutation = useChangeGroupMutation(graphQLClient);
const queryClient = useQueryClient();
const submit = async (values: typeof form.values) => {
  const input = { ...values };

  const onSuccess = async () => {
    await queryClient.invalidateQueries([
      'findGroups',
      { userId: user.id },
    ]);
  };

  await changeGroupMutation.mutateAsync({ groupId, input }, { onSuccess });
};
```

## コンポーネントステート

ページやモーダル単位のステートはMantineの[use-set-state](https://mantine.dev/hooks/use-set-state/)を使います。

```jsx
const [state, setState] = useSetState({
  addGroupOpened: false,
  changeMembersOpened: false,
  changeGroupOpened: false,
  removeGroupOpened: false,
  groupId: -1,
});


setState({ addGroupOpened: true })
```

## フォームステート

入力フォームのステートはMantineの[use-form](https://mantine.dev/form/use-form/)を使います。

```jsx
const form = useForm({
  initialValues: {
    name: '',
  },
});

const submit = async (values: typeof form.values) => {
  // valuesを使った処理
};

<form onSubmit={form.onSubmit(submit)} noValidate>
  <TextInput
    required
    type="text"
    label={t('name')}
    description={t('group.name.description')}
    {...form.getInputProps('name')}
  />
  <Group position="right" mt="md">
    <Button type="submit" size="sm">
      {t('add')}
    </Button>
  </Group>
</form>
```
