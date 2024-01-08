import { z } from "zod";

const PASSWORD = new RegExp("^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@;:])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@;:])|(?=.*[a-z])(?=.*[0-9])(?=.*[!@;:]))([a-zA-Z0-9!@;:]){8,}$");

export const emailValidationShema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスを入力してください。")
    .email("メールアドレス形式で入力してください。"),
});
export type emailFromType = z.infer<typeof emailValidationShema>;

export const newPasswordValidationShema = z.object({
  password: z
    .string()
    .nonempty("パスワードを入力してください。")
    .min(6, "パスワードは6文字以上で入力してください。")
    .regex(PASSWORD, "英大文字,英小文字,数字,記号をのうち3種類を含めてください。"),
  passwordConfirm: z
    .string()
    .nonempty("パスワード確認を入力してください。"),
});

export const actionCodeValidationShema = z.object({
  code: z
    .string()
    .nonempty("認証コードが無効です。")
});


export const LoginFormValidationShema = emailValidationShema.extend({
  password: z
    .string()
    .nonempty("パスワードを入力してください。"),
  login: z
    .unknown()
});
export type LoginFormType = z.infer<typeof LoginFormValidationShema>;

export const newAccountFormValidationShema = emailValidationShema.merge(newPasswordValidationShema)
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        code: 'custom',
        message: 'パスワードとパスワード確認が一致しません',
      });
      return;
    }
  });
export type newAccountFormType = z.infer<typeof newAccountFormValidationShema>;

export const newPasswordFormValidationShema = actionCodeValidationShema.merge(newPasswordValidationShema)
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        code: 'custom',
        message: 'パスワードとパスワード確認が一致しません',
      });
      return;
    }
  });
export type newPasswordFromType = z.infer<typeof newPasswordFormValidationShema>;

export const todoValidationShema = z.object({
  todo: z
    .string()
    .min(1, "１文字以上入力してください。")
    .max(100, "100文字以内で入力してください。"),
});

export type todoFormType = z.infer<typeof todoValidationShema>;

export const TodoListValidationShema = z.object({
  todoList: z
    .unknown()
});

export type todoListType = z.infer<typeof TodoListValidationShema>;