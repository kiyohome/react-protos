---
sidebar_position: 3
description: アプリのディレクトリ構成を案内します。
---

# ディレクトリ構成

```bash
src
├─generated   # GraphQLスキーマから自動生成したコード
├─graphql     # GraphQLのQuery/Mutation
├─hooks       # ページやモーダルに共通する処理（Reactのフック）
├─i18n        # 多言語対応のリソースファイル
└─pages       # ページやモーダル（Reactのコンポーネント）
```

UIライブラリとして[Mantine](https://mantine.dev/)を使うため、Reactコンポはページやモーダルを最小単位とし、機能ごとにディレクトリを分けてまとめます。

```bash
src
└─pages
    ├─events  # イベント操作
    └─groups  # グループ操作
```
