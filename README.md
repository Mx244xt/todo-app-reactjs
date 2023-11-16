# Todo App with ReactJs

## サイト概要

firebase で登録しているユーザーのみログインできる。 Todo アプリサイトです。

ログインユーザーごとに、Todo リストの出しわけを行います。

ログイン機能には firebase Auth、データベースには firbase Store を使用しています。

利用される場合は、Googleでログインまたは、下記にサンプルアカウントを記載していますので、そちらでもログインして頂けます。

内容は不適切な内容でない限り追加修正など自由に行ってください。

### サイト URL

<https://todo-app.mx244.com/>

サンプルアカウント
email: masuda@example.com
pass: Abc@1234

### 制作背景

React、TypeScript、firebase の学習のため作成。

## 使用技術

### 使用言語

- TypeScript : <https://www.typescriptlang.org/>

### フレームワーク

- .js : <https://ja.react.dev/>

### ライブラリ

- Tailwind CSS : <https://tailwindcss.com/>
- React Hooks Form : <https://react-hook-form.com/>
- zod : <https://www.npmjs.com/package/zod>
- React Cookie : <https://www.npmjs.com/package/react-cookie>
- React Toastify : <https://fkhadra.github.io/react-toastify/introduction>
- dnd kit sortable : <https://docs.dndkit.com/presets/sortable>
- date fns : <https://date-fns.org/>
- uuid : <https://www.npmjs.com/package/uuid>

### インフラ

AWS： <https://docs.aws.amazon.com/?nc2=h_ql_doc_do>

- IAM : <https://docs.aws.amazon.com/singlesignon/?icmpid=docs_homepage_security>
- S3 : <https://docs.aws.amazon.com/s3/?icmpid=docs_homepage_featuredsvcs>
- API Gateway : <https://docs.aws.amazon.com/apigateway/?icmpid=docs_homepage_networking>
- Lambda : <https://docs.aws.amazon.com/lambda/?icmpid=docs_homepage_compute>
- Cloud Front : <https://docs.aws.amazon.com/cloudfront/?icmpid=docs_homepage_networking>
- Route 53 : <https://docs.aws.amazon.com/route53/?icmpid=docs_homepage_networking>

Firebase : <https://firebase.google.com/?hl=ja>

- Authentication : <https://firebase.google.com/docs/auth?hl=ja>
- Cloud Firestore : <https://firebase.google.com/docs/firestore?hl=ja>

## インフラ構成図

<img src="https://data-m244.s3.amazonaws.com/todo-app-react/TodoAppReact_Infrastructure.jpg" alt="インフラ構成図" width="80%" />

## 機能

ユーザー認証機能:

- ログイン画面
  - 入力バリデーション
  - パスワード表示/非表示
  - アカウント新規作成
  - パスワード再設定
  <img src="https://data-m244.s3.amazonaws.com/todo-app-react/todo-toppage.png" alt="ログイン画面" width="50%" />

Todo画面:
- 新規作成
- 編集
- 削除
- 完了チェック
- メモ入力欄
- 期限設定
- ソート機能
- 並べ替え
- 完了済み 表示/非表示
- サインアウト
  <img src="https://data-m244.s3.amazonaws.com/todo-app-react/todopage.png" alt="Todo画面" width="50%" />
