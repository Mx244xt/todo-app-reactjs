# Todo App with ReactJs

## サイト概要

firebase で登録しているユーザーのみログインできる。 Todo アプリサイトです。

ログインユーザーごとに、Todo リストの出しわけを行います。

ログイン機能には firebase Auth、データベースには firbase Store を使用しています。

利用される場合は、Googleでログインまたは、下記にサンプルアカウントを記載していますので、そちらでもログインして頂けます。

内容は不適切な内容でない限り追加修正など自由に行ってください。

サンプルアカウント
email: masuda@example.com
pass: Abc@1234

### サイト URL

<https://todo-next.mx244.com/>

### 制作背景

Nextjs、TypeScript、firebase の学習のため作成。

## 使用技術

### 使用言語

- TypeScript : <https://www.typescriptlang.org/>

### フレームワーク

- Next.js : <https://nextjs.org/>

### ライブラリ

- Tailwind CSS : <https://tailwindcss.com/>
- React Hooks Form : <https://react-hook-form.com/>
- uuid : <https://www.npmjs.com/package/uuid>
- zod : <https://www.npmjs.com/package/zod>
- react-firebase-hooks : <https://github.com/CSFrequency/react-firebase-hooks>

### インフラ

Firebase : <https://firebase.google.com/?hl=ja>

- Authentication : <https://firebase.google.com/docs/auth?hl=ja>
- Cloud Firestore : <https://firebase.google.com/docs/firestore?hl=ja>

## インフラ構成図

<img src="https://data-m244.s3.amazonaws.com/todo-app-react/TodoAppReact_Infrastructure.jpg" alt="インフラ構成図" width="80%" />

## 機能

ユーザー認証機能:

- ログイン
  - 入力バリデーション
- サインアウト
  <img src="https://data-m244.s3.amazonaws.com/todo-app-react/todopage.png" alt="ログイン画面" width="50%" />

Todo 機能:

- 新規作成
- 編集
- 削除
- 完了チェック
  <img src="https://data-m244.s3.amazonaws.com/todo-app-react/todopage.png" alt="Todo画面" width="50%" />
