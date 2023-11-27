import FormBody from '../base/FormBody';
import { ButtonFrom, InputForm, InputPassword, Loading } from '../uiComponents';
import usePasswordReset from './hooks/usePasswordReset';

const PasswordResetFrom = () => {
  const {
    state: { isLoading, errors },
    action: { register, handleSubmit, backToLoginForm, passwordReset }
  } = usePasswordReset();
  return (
    <FormBody title='パスワード再設定' submitEvent={handleSubmit(passwordReset)}>
      <InputForm
        title="メールアドレス"
        type="email"
        id="email"
        register={register("email")}
        errors={errors}
        placeholder='todo@example.com'
      />
      <InputPassword
        title="新パスワード"
        id="password"
        register={register("password")}
        errors={errors}
        placeholder='Abc@1234。'
      />
      <InputPassword
        title="新パスワード確認"
        id="passwordConfirm"
        register={register("passwordConfirm")}
        errors={errors}
        placeholder='Abc@1234'
      />
      <div className='m-5'></div>
      {isLoading && <Loading />}
      <ButtonFrom
        title="パスワード再設定"
        type="submit"
        icon='/images/create_user_icon.png'
        textColor="text-white"
        bgColor='bg-blue-500'
        disabled={false}
      />
      <div className='m-5'></div>
      <ButtonFrom
        title="キャンセル"
        type="button"
        icon='/images/back_icon.png'
        textColor="text-black"
        bgColor='bg-slate-300'
        clickEvent={backToLoginForm}
        disabled={false}
      />
    </FormBody>
  );
};

export default PasswordResetFrom;