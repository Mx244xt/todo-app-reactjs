# Todo App with ReactJs
  <img src="https://data-m244.s3.amazonaws.com/todo-app-reactjs/Login.gif" alt="ログイン" width="49%" /> <img src="https://data-m244.s3.amazonaws.com/todo-app-reactjs/Edit_check_task.gif" alt="タスク編集" width="49%" />
  <img src="https://data-m244.s3.amazonaws.com/todo-app-reactjs/Create_new_account.gif" alt="新規アカウント作成" width="49%" /> <img src="https://data-m244.s3.amazonaws.com/todo-app-reactjs/Forgot_password_send.gif" alt="パスワード再設定" width="49%" />

## サイト概要

登録しているユーザーのみログインできる。 Todo アプリサイトです。

ログインユーザーごとに、Todo リストの出しわけを行います。

ログイン機能には firebase Auth、データベースには firbase Store を使用しています。

利用される場合は、下記にサンプルアカウントまたは新規アカウント作成を行ってください。

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

- TypeScript

### ライブラリ
- React
- Tailwind CSS
- React Hooks Form
- zod
- React Cookie
- React Toastify
- dnd kit sortable
- date fns
- uuid

### インフラ

AWS

- IAM
- S3
- API Gateway
- Lambda
- Cloud Front
- Route 53

Firebase

- Authentication
- Cloud Firestore

## インフラ構成図

<img src="https://data-m244.s3.amazonaws.com/todo-app-react/TodoAppReact_Infrastructure.jpg" alt="インフラ構成図" width="80%" />

## 機能

ユーザー認証機能:

- ログイン画面
  - 入力バリデーション
  - パスワード表示/非表示
  - アカウント新規作成
  - パスワード再設定
- Todo画面:
  - タスクの作成
  - 入力バリデーション
  - タスクの編集
  - タスクの削除
  - タスクの完了チェック
  - タスクのメモ入力
  - タスクの期限設定
  - 更新完了トースト
  - ソート機能
  - 並べ替え
  - 完了済み 表示/非表示
  - サインアウト