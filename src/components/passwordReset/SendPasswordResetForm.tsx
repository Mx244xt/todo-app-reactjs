
import FormBody from '../base/FormBody';
import { ButtonFrom, InputForm, Loading } from '../uiComponents';
import usePasswordReset from './hooks/usePasswordReset';

const SendPasswordResetForm = () => {
  const {
    state: { isLoading, errors },
    action: { register, handleSubmit, backToLoginForm, passwordReset }
  } = usePasswordReset();

  return (
    <FormBody title='パスワード再設定メール送信' submitEvent={handleSubmit(passwordReset)}>
      <InputForm
        title="メールアドレス"
        type="email"
        id="email"
        register={register("email")}
        errors={errors}
        placeholder='todo@example.com'
      />
      <div className='m-5'></div>
      {isLoading && <Loading />}
      <ButtonFrom
        title="メールを送信"
        type="submit"
        icon='/images/create_user_icon.png'
        textColor="text-white"
        bgColor='bg-blue-500'
        disabled={false}
      />
      <div className='m-5'></div>
      <ButtonFrom
        title="戻る"
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

export default SendPasswordResetForm;