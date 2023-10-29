import { z } from "zod";

const PASSWORD = new RegExp("^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@;:])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@;:])|(?=.*[a-z])(?=.*[0-9])(?=.*[!@;:]))([a-zA-Z0-9!@;:]){8,}$");

export const LoginFormValidationShema = z.object({
  email: z
    .string()
    .nonempty("メールアドレスを入力してください。")
    .email("メールアドレス形式で入力してください。"),
  password: z
    .string()
    .nonempty("パスワードを入力してください。"),
  login: z
    .unknown()
});

export type LoginFormType = z.infer<typeof LoginFormValidationShema>;

export const accountFormValidationShema = z.object({
  confirmCode: z
    .string()
    .nonempty("確認コードを入力してください。"),
  email: z
    .string()
    .nonempty("メールアドレスを入力してください。")
    .email("メールアドレス形式で入力してください。"),
  password: z
    .string()
    .nonempty("パスワードを入力してください。")
    .min(6, "パスワードは6文字以上で入力してください。")
    .regex(PASSWORD, "英大文字,英小文字,数字,記号をのうち3種類を含めてください。"),
  passwordConfirm: z
    .string()
    .nonempty("パスワード確認を入力してください。"),
})
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

export type accountFormType = z.infer<typeof accountFormValidationShema>;

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